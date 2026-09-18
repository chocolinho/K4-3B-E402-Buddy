"""Local HTTP server for the Buddy CP3 prototype and AI endpoint."""

from __future__ import annotations

import argparse
import json
import mimetypes
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

from classifier import classify_case, get_settings


AI_DIR = Path(__file__).resolve().parent
PROTOTYPE_DIR = AI_DIR.parent / "prototype"
MAX_BODY_BYTES = 128 * 1024


class BuddyHandler(BaseHTTPRequestHandler):
    server_version = "BuddyCP3/1.0"

    def log_message(self, format: str, *args: object) -> None:
        print(f"[{self.log_date_time_string()}] {format % args}")

    def send_json(self, payload: dict, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler API
        path = urlparse(self.path).path
        if path == "/api/health":
            settings = get_settings()
            self.send_json({
                "ok": True,
                "provider": settings["provider"],
                "model": settings["model"],
                "api_key_configured": bool(settings["api_key"]),
                "confidence_threshold": settings["threshold"],
            })
            return

        relative = "index.html" if path in {"", "/"} else unquote(path.lstrip("/"))
        requested = (PROTOTYPE_DIR / relative).resolve()
        try:
            requested.relative_to(PROTOTYPE_DIR.resolve())
        except ValueError:
            self.send_error(403, "Forbidden")
            return
        if not requested.is_file():
            self.send_error(404, "Not found")
            return

        body = requested.read_bytes()
        content_type = mimetypes.guess_type(requested.name)[0] or "application/octet-stream"
        self.send_response(200)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8" if content_type.startswith("text/") else content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler API
        if urlparse(self.path).path != "/api/analyze":
            self.send_error(404, "Not found")
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            if content_length <= 0 or content_length > MAX_BODY_BYTES:
                raise ValueError("Kích thước request không hợp lệ.")
            payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
            if not isinstance(payload, dict):
                raise ValueError("Request body phải là một JSON object.")
            result = classify_case(payload)
            self.send_json(result)
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError) as exc:
            self.send_json({"error": str(exc)}, status=400)


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(description="Chạy Buddy CP3 prototype với backend AI đã cấu hình.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=8000, type=int)
    args = parser.parse_args()

    settings = get_settings()
    server = ThreadingHTTPServer((args.host, args.port), BuddyHandler)
    print(f"Buddy CP3: http://{args.host}:{args.port}")
    print(f"AI provider/model: {settings['provider']} / {settings['model']}")
    print(f"API key: {'đã cấu hình' if settings['api_key'] else 'CHƯA CẤU HÌNH - sẽ dùng fallback uncertain'}")
    print("Nhấn Ctrl+C để dừng.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nĐã dừng server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
