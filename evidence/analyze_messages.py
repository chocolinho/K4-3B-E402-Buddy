"""Aggregate the private hackathon Discord CSV without emitting raw messages."""

from __future__ import annotations

import argparse
import csv
import json
import re
from collections import Counter
from pathlib import Path


QUESTION_MARKERS = re.compile(
    r"\?|\b(làm sao|cách nào|cách |ở đâu|khi nào|bao giờ|bao nhiêu|tại sao|vì sao|"
    r"có được|được không|đúng không|lỗi|không ạ|chưa ạ|như nào|thế nào)\b",
    re.IGNORECASE,
)


def is_true(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes"}


def analyze(path: Path) -> dict[str, object]:
    with path.open(encoding="utf-8-sig", newline="") as stream:
        rows = list(csv.DictReader(stream))

    required = {
        "msg_id", "channel", "is_bot", "reply_to", "mentions_bot",
        "n_attachments", "n_chars", "content",
    }
    missing = required - set(rows[0] if rows else {})
    if missing:
        raise ValueError(f"CSV thiếu cột bắt buộc: {sorted(missing)}")

    message_ids = {row["msg_id"] for row in rows}
    candidate_questions = [
        row for row in rows
        if not is_true(row["is_bot"])
        and len((row["content"] or "").strip()) >= 8
        and QUESTION_MARKERS.search(row["content"] or "")
    ]
    replied_to = Counter(row["reply_to"] for row in rows if row["reply_to"])
    question_channels = Counter(row["channel"] for row in candidate_questions)

    return {
        "total_messages": len(rows),
        "unique_message_ids": len(message_ids),
        "bot_messages": sum(is_true(row["is_bot"]) for row in rows),
        "non_bot_messages": sum(not is_true(row["is_bot"]) for row in rows),
        "messages_with_attachments": sum(int(row["n_attachments"] or 0) > 0 for row in rows),
        "attachment_count": sum(int(row["n_attachments"] or 0) for row in rows),
        "messages_mentioning_bot": sum(is_true(row["mentions_bot"]) for row in rows),
        "direct_replies": sum(bool(row["reply_to"]) for row in rows),
        "candidate_questions": len(candidate_questions),
        "candidate_questions_with_direct_reply": sum(replied_to[row["msg_id"]] > 0 for row in candidate_questions),
        "candidate_question_channels": dict(sorted(question_channels.items())),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Đếm aggregate từ k4_messages.csv mà không in nội dung chat.")
    parser.add_argument("csv_path", type=Path, help="Đường dẫn cục bộ tới k4_messages.csv")
    args = parser.parse_args()
    print(json.dumps(analyze(args.csv_path), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
