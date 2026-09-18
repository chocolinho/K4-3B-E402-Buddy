"""Run the CP3 golden set through the configured real AI provider."""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from classifier import REPO_ROOT, classify_case, get_settings


DEFAULT_CASES = REPO_ROOT / "eval" / "golden-set.json"
DEFAULT_MARKDOWN = REPO_ROOT / "eval" / "cp3-results.md"


def env_number(name: str, default: str, cast: type) -> Any:
    value = os.getenv(name, default)
    try:
        return cast(value)
    except ValueError as exc:
        raise ValueError(f"{name} có giá trị không hợp lệ: {value!r}") from exc


def retry_wait_seconds(reason: str, attempt: int, request_delay: float) -> float | None:
    if "HTTP 429" in reason:
        # Free-tier quotas are measured in a rolling request window. A full minute
        # is deliberately conservative and avoids turning fallback into a score.
        return 65.0
    if "HTTP 503" in reason:
        return max(10.0 * attempt, request_delay)
    return None


def load_cases(path: Path) -> list[dict[str, Any]]:
    raw = path.read_text(encoding="utf-8-sig").strip()
    if raw.startswith("```"):
        raise ValueError(
            f"{path} đang chứa Markdown code fence. Hãy xóa dòng ```json ở đầu và ``` ở cuối."
        )
    if not raw:
        raise ValueError(f"{path} đang rỗng.")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path} không phải JSON hợp lệ tại dòng {exc.lineno}, cột {exc.colno}: {exc.msg}"
        ) from exc
    if not isinstance(data, list) or not data:
        raise ValueError("Golden set phải là một mảng JSON không rỗng.")

    seen_ids: set[str] = set()
    for index, case in enumerate(data, 1):
        if not isinstance(case, dict):
            raise ValueError(f"Case #{index} không phải JSON object.")
        case_id = str(case.get("id", "")).strip()
        expected = str(case.get("expected_status", "")).strip()
        if not case_id or case_id in seen_ids:
            raise ValueError(f"Case #{index} thiếu id hoặc id bị trùng: {case_id!r}")
        if expected not in {"resolved", "unresolved", "uncertain"}:
            raise ValueError(f"Case {case_id} có expected_status không hợp lệ.")
        seen_ids.add(case_id)
    return data


def write_markdown(report: dict[str, Any], path: Path) -> None:
    summary = report["summary"]
    lines = [
        "# Kết quả đo CP3",
        "",
        f"- Thời điểm (UTC): `{report['timestamp']}`",
        f"- Provider/model: `{report['provider']} / {report['model']}`",
        f"- Tổng số case: **{summary['total']}**",
        f"- Pass: **{summary['passed']}**",
        f"- Fail: **{summary['failed']}**",
        f"- API fallback: **{summary['fallbacks']}**",
        f"- Pass rate: **{summary['pass_rate_percent']:.1f}%**",
        f"- Kết quả hợp lệ để báo cáo: **{'Có' if summary['valid_run'] else 'Không'}**",
        "",
        "> Một run chỉ hợp lệ khi mọi case đều nhận được phản hồi AI thật; fallback không được tính là phép đo AI.",
        "",
        "| Case | Failure mode | Expected | Predicted | Kết quả | Confidence |",
        "|---|---|---|---|---|---:|",
    ]
    for item in report["results"]:
        lines.append(
            f"| {item['id']} | {item.get('failure_mode', '')} | {item['expected_status']} | "
            f"{item['predicted_status']} | {'PASS' if item['passed'] else 'FAIL'} | "
            f"{item['confidence']:.2f} |"
        )
    lines.extend([
        "",
        "## Case sai cần phân tích",
        "",
    ])
    failed = [item for item in report["results"] if not item["passed"]]
    if not failed:
        lines.append("Không có case sai trong lượt chạy này.")
    else:
        for item in failed:
            lines.extend([
                f"### {item['id']}",
                "",
                f"- Expected: `{item['expected_status']}`",
                f"- Predicted: `{item['predicted_status']}`",
                f"- Reason: {item['reason']}",
                "- Phân tích của nhóm: _bổ sung sau khi Long rà soát product behavior._",
                "",
            ])
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    # get_settings() also loads .env, so delay/retry defaults below honor the
    # project-local configuration instead of only process-level variables.
    settings = get_settings()
    parser = argparse.ArgumentParser(description="Chạy golden set CP3 bằng provider AI đã cấu hình.")
    parser.add_argument("--cases", type=Path, default=DEFAULT_CASES)
    parser.add_argument("--output", type=Path, help="Đường dẫn JSON report; mặc định tạo trong runs/.")
    parser.add_argument("--markdown", type=Path, default=DEFAULT_MARKDOWN)
    parser.add_argument(
        "--delay",
        type=float,
        default=env_number("BUDDY_EVAL_DELAY_SECONDS", "13", float),
        help="Số giây nghỉ giữa hai case; mặc định lấy từ .env hoặc 13.",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=env_number("BUDDY_EVAL_RETRIES", "2", int),
        help="Số lần thử lại cho HTTP 429/503; mặc định 2.",
    )
    args = parser.parse_args()

    if args.delay < 0 or args.retries < 0:
        parser.error("--delay và --retries không được là số âm.")

    if not settings["api_key"]:
        print(f"Thiếu {settings['key_name']}. Hãy cập nhật .env rồi chạy lại.")
        return 2

    cases = load_cases(args.cases)
    results: list[dict[str, Any]] = []
    for index, case in enumerate(cases, 1):
        if index > 1 and args.delay:
            print(f"Nghỉ {args.delay:g}s để tránh vượt rate limit...", flush=True)
            time.sleep(args.delay)
        print(f"[{index}/{len(cases)}] {case['id']}...", end=" ", flush=True)
        output = classify_case(case)
        attempt = 0
        while output.get("fallback") and attempt < args.retries:
            attempt += 1
            wait_seconds = retry_wait_seconds(output["reason"], attempt, args.delay)
            if wait_seconds is None:
                break
            print(
                f"API bận/quá quota; chờ {wait_seconds:g}s rồi thử lại "
                f"({attempt}/{args.retries})...",
                flush=True,
            )
            time.sleep(wait_seconds)
            output = classify_case(case)
        passed = output["status"] == case["expected_status"] and not output.get("fallback")
        results.append({
            "id": case["id"],
            "failure_mode": case.get("failure_mode", ""),
            "expected_status": case["expected_status"],
            "predicted_status": output["status"],
            "confidence": output["confidence"],
            "reason": output["reason"],
            "source_reference": output["source_reference"],
            "fallback": bool(output.get("fallback")),
            "passed": passed,
        })
        print("PASS" if passed else "FAIL")

    passed_count = sum(item["passed"] for item in results)
    fallback_count = sum(item["fallback"] for item in results)
    total = len(results)
    timestamp = datetime.now(timezone.utc).isoformat()
    report = {
        "timestamp": timestamp,
        "provider": settings["provider"],
        "model": settings["model"],
        "confidence_threshold": settings["threshold"],
        "cases_file": str(args.cases),
        "summary": {
            "total": total,
            "passed": passed_count,
            "failed": total - passed_count,
            "fallbacks": fallback_count,
            "pass_rate_percent": round(passed_count / total * 100, 2),
            "valid_run": fallback_count == 0,
        },
        "results": results,
    }

    if args.output:
        output_path = args.output
    else:
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        output_path = REPO_ROOT / "runs" / f"cp3-eval-{stamp}.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    args.markdown.parent.mkdir(parents=True, exist_ok=True)
    write_markdown(report, args.markdown)

    print(f"\nRun {total} cases: {passed_count} pass, {total - passed_count} fail")
    print(f"Pass rate = {report['summary']['pass_rate_percent']:.1f}%")
    print(f"JSON: {output_path}")
    print(f"Markdown: {args.markdown}")
    if fallback_count:
        print("CẢNH BÁO: run không hợp lệ vì có API fallback.")
        return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
