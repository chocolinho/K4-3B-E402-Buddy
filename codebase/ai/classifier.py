"""API-backed classifier for the Buddy CP3 prototype.

The module intentionally uses only the Python standard library so the demo can
run without installing packages. API keys are read from the environment or a
local .env file and are never included in traces.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


AI_DIR = Path(__file__).resolve().parent
REPO_ROOT = AI_DIR.parents[1]
PROMPT_PATH = AI_DIR / "prompt.md"
TRACE_PATH = REPO_ROOT / "runs" / "cp3-trace.jsonl"
VALID_STATUSES = {"resolved", "unresolved", "uncertain"}
DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite"
DEFAULT_OPENROUTER_MODEL = "qwen/qwen3.8-27b:free"

OUTPUT_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "status": {
            "type": "string",
            "enum": ["resolved", "unresolved", "uncertain"],
            "description": "Trạng thái xử lý của câu hỏi hỗ trợ.",
        },
        "confidence": {
            "type": "number",
            "minimum": 0,
            "maximum": 1,
            "description": "Độ tin cậy từ 0 đến 1.",
        },
        "reason": {
            "type": "string",
            "description": "Lý do ngắn gọn bằng tiếng Việt dựa trên bằng chứng.",
        },
        "source_reference": {
            "type": "string",
            "description": "Tham chiếu nguồn từ input; để trống khi không có căn cứ.",
        },
    },
    "required": ["status", "confidence", "reason", "source_reference"],
    "additionalProperties": False,
}


class ConfigurationError(RuntimeError):
    """Raised when the local provider configuration is incomplete."""


class ProviderResponseError(RuntimeError):
    """Raised when an AI provider returns an unusable response."""


def load_dotenv(path: Path | None = None) -> None:
    """Load simple KEY=VALUE pairs without overriding existing environment vars."""
    env_path = path or (REPO_ROOT / ".env")
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ.setdefault(key, value)


def get_settings() -> dict[str, Any]:
    load_dotenv()
    provider = os.getenv("AI_PROVIDER", "gemini").strip().lower() or "gemini"
    if provider not in {"gemini", "openrouter"}:
        raise ConfigurationError("AI_PROVIDER chỉ hỗ trợ gemini hoặc openrouter.")

    threshold_text = os.getenv("BUDDY_CONFIDENCE_THRESHOLD", "0.65")
    try:
        threshold = float(threshold_text)
    except ValueError as exc:
        raise ConfigurationError("BUDDY_CONFIDENCE_THRESHOLD phải là số từ 0 đến 1.") from exc
    if not 0 <= threshold <= 1:
        raise ConfigurationError("BUDDY_CONFIDENCE_THRESHOLD phải nằm trong khoảng 0 đến 1.")

    if provider == "openrouter":
        key_name = "OPENROUTER_API_KEY"
        model = os.getenv("OPENROUTER_MODEL", DEFAULT_OPENROUTER_MODEL).strip() or DEFAULT_OPENROUTER_MODEL
    else:
        key_name = "GEMINI_API_KEY"
        model = os.getenv("GEMINI_MODEL", DEFAULT_GEMINI_MODEL).strip() or DEFAULT_GEMINI_MODEL

    return {
        "provider": provider,
        "key_name": key_name,
        "api_key": os.getenv(key_name, "").strip(),
        "model": model,
        "threshold": threshold,
    }


def normalize_input(case: dict[str, Any]) -> dict[str, Any]:
    question = str(case.get("question", "")).strip()
    if not question:
        raise ValueError("question là bắt buộc.")

    def clean_messages(field: str) -> list[str]:
        value = case.get(field, [])
        if not isinstance(value, list):
            raise ValueError(f"{field} phải là một mảng chuỗi.")
        return [str(item).strip() for item in value if str(item).strip()]

    return {
        "id": str(case.get("id", "interactive")).strip() or "interactive",
        "question": question,
        "thread_context": clean_messages("thread_context"),
        "related_messages": clean_messages("related_messages"),
        "source_reference": str(case.get("source_reference", "")).strip(),
    }


def gemini_schema(value: Any) -> Any:
    """Convert standard JSON Schema types to Gemini's REST schema spelling."""
    if isinstance(value, dict):
        converted = {}
        for key, item in value.items():
            if key == "additionalProperties":
                continue
            if key == "type" and isinstance(item, str):
                converted[key] = item.upper()
            else:
                converted[key] = gemini_schema(item)
        return converted
    if isinstance(value, list):
        return [gemini_schema(item) for item in value]
    return value


def build_request(case: dict[str, Any], settings: dict[str, Any]) -> tuple[str, dict[str, Any], dict[str, str]]:
    instruction = PROMPT_PATH.read_text(encoding="utf-8")
    user_payload = json.dumps(case, ensure_ascii=False, indent=2)
    user_message = "Phân loại tình huống sau. Chỉ dùng dữ liệu trong JSON này.\n\n" + user_payload

    if settings["provider"] == "openrouter":
        body = {
            "model": settings["model"],
            "messages": [
                {"role": "system", "content": instruction},
                {"role": "user", "content": user_message},
            ],
            "temperature": 0,
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "buddy_triage_decision",
                    "strict": True,
                    "schema": OUTPUT_SCHEMA,
                },
            },
            "provider": {"require_parameters": True},
        }
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": f"Bearer {settings['api_key']}",
        }
        return "https://openrouter.ai/api/v1/chat/completions", body, headers

    body = {
        "system_instruction": {"parts": [{"text": instruction}]},
        "contents": [{"role": "user", "parts": [{"text": user_message}]}],
        "generationConfig": {
            "temperature": 0,
            "response_mime_type": "application/json",
            "response_schema": gemini_schema(OUTPUT_SCHEMA),
        },
    }
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "x-goog-api-key": settings["api_key"],
    }
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings['model']}:generateContent"
    return url, body, headers


def extract_structured_output(api_response: dict[str, Any], provider: str = "gemini") -> dict[str, Any]:
    try:
        if provider == "openrouter":
            content = api_response["choices"][0]["message"]["content"]
            if isinstance(content, list):
                text = "".join(
                    str(part.get("text", "")) for part in content if isinstance(part, dict)
                ).strip()
            else:
                text = str(content).strip()
        else:
            parts = api_response["candidates"][0]["content"]["parts"]
            text = "".join(part.get("text", "") for part in parts).strip()
        output = json.loads(text)
    except (KeyError, IndexError, TypeError, json.JSONDecodeError) as exc:
        raise ProviderResponseError(f"{provider} không trả về JSON hợp lệ theo schema.") from exc

    status = str(output.get("status", "")).lower().strip()
    if status not in VALID_STATUSES:
        raise ProviderResponseError(f"Trạng thái không hợp lệ: {status or '(trống)'}")
    try:
        confidence = float(output.get("confidence"))
    except (TypeError, ValueError) as exc:
        raise ProviderResponseError("confidence không phải là số.") from exc
    if not 0 <= confidence <= 1:
        raise ProviderResponseError("confidence nằm ngoài khoảng 0 đến 1.")

    reason = str(output.get("reason", "")).strip()
    if not reason:
        raise ProviderResponseError("reason bị trống.")

    return {
        "status": status,
        "confidence": round(confidence, 4),
        "reason": reason,
        "source_reference": str(output.get("source_reference", "")).strip(),
    }


def apply_automation_policy(output: dict[str, Any], threshold: float) -> tuple[dict[str, Any], dict[str, Any] | None]:
    result = dict(output)
    if result["status"] in {"resolved", "unresolved"} and result["confidence"] < threshold:
        original_status = result["status"]
        result["status"] = "uncertain"
        result["reason"] = (
            f"Policy chuyển từ {original_status} sang uncertain vì confidence "
            f"{result['confidence']:.2f} thấp hơn ngưỡng {threshold:.2f}. "
            f"Lý do gốc: {result['reason']}"
        )
        return result, {
            "rule": "low_confidence_requires_human_review",
            "original_status": original_status,
            "threshold": threshold,
        }
    return result, None


def append_trace(trace: dict[str, Any], path: Path = TRACE_PATH) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as stream:
        stream.write(json.dumps(trace, ensure_ascii=False) + "\n")


def fallback_output(provider: str, message: str) -> dict[str, Any]:
    return {
        "status": "uncertain",
        "confidence": 0.0,
        "reason": f"AI tạm thời không khả dụng; cần TA kiểm tra thủ công. Chi tiết: {message}",
        "source_reference": "",
        "fallback": True,
        "provider": provider,
    }


def classify_case(case: dict[str, Any], *, timeout: float = 30, trace: bool = True) -> dict[str, Any]:
    normalized = normalize_input(case)
    settings = get_settings()
    started = time.perf_counter()
    trace_record: dict[str, Any] = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "provider": settings["provider"],
        "model": settings["model"],
        "input": normalized,
    }

    try:
        if not settings["api_key"]:
            raise ConfigurationError(f"Thiếu {settings['key_name']} trong .env hoặc biến môi trường.")

        url, body, headers = build_request(normalized, settings)
        request = urllib.request.Request(
            url,
            data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=timeout) as response:
            api_response = json.loads(response.read().decode("utf-8"))

        raw_output = extract_structured_output(api_response, settings["provider"])
        output, policy_adjustment = apply_automation_policy(raw_output, settings["threshold"])
        output.update({
            "fallback": False,
            "provider": settings["provider"],
            "model": settings["model"],
        })
        trace_record.update({
            "success": True,
            "raw_output": raw_output,
            "policy_adjustment": policy_adjustment,
            "output": output,
        })
    except urllib.error.HTTPError as exc:
        try:
            details = exc.read().decode("utf-8")
            api_error = json.loads(details).get("error", {}).get("message", details)
        except (UnicodeDecodeError, json.JSONDecodeError):
            api_error = f"HTTP {exc.code}"
        output = fallback_output(settings["provider"], f"{settings['provider']} API lỗi HTTP {exc.code}: {api_error}")
        trace_record.update({"success": False, "error_type": "http_error", "output": output})
    except (ConfigurationError, ProviderResponseError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
        output = fallback_output(settings["provider"], str(exc))
        trace_record.update({"success": False, "error_type": type(exc).__name__, "output": output})

    trace_record["elapsed_ms"] = round((time.perf_counter() - started) * 1000)
    if trace:
        append_trace(trace_record)
    return output


def main() -> int:
    # Windows PowerShell may expose a legacy code page (for example CP1252),
    # which cannot print Vietnamese JSON. Keep CLI output consistently UTF-8.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(description="Phân loại một case hỗ trợ bằng provider đã cấu hình.")
    parser.add_argument("--input", type=Path, help="File JSON chứa một case.")
    parser.add_argument("--question", help="Câu hỏi để thử nhanh.")
    args = parser.parse_args()

    if args.input:
        case = json.loads(args.input.read_text(encoding="utf-8"))
    elif args.question:
        case = {"question": args.question, "thread_context": [], "related_messages": []}
    else:
        parser.error("Cần --input hoặc --question.")

    result = classify_case(case)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 2 if result.get("fallback") else 0


if __name__ == "__main__":
    raise SystemExit(main())
