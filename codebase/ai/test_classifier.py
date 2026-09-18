import json
import os
import unittest
from unittest import mock

import classifier


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def read(self):
        return json.dumps(self.payload).encode("utf-8")


def gemini_payload(output):
    return {
        "candidates": [
            {"content": {"parts": [{"text": json.dumps(output, ensure_ascii=False)}]}}
        ]
    }


def openrouter_payload(output):
    return {
        "choices": [
            {"message": {"role": "assistant", "content": json.dumps(output, ensure_ascii=False)}}
        ]
    }


class ClassifierTests(unittest.TestCase):
    def test_extracts_structured_output(self):
        output = classifier.extract_structured_output(gemini_payload({
            "status": "resolved",
            "confidence": 0.92,
            "reason": "Có câu trả lời chính thức.",
            "source_reference": "thread-002",
        }))
        self.assertEqual(output["status"], "resolved")
        self.assertEqual(output["confidence"], 0.92)

    def test_low_confidence_requires_review(self):
        output, adjustment = classifier.apply_automation_policy({
            "status": "resolved",
            "confidence": 0.48,
            "reason": "Có vẻ đã trả lời.",
            "source_reference": "thread-003",
        }, 0.65)
        self.assertEqual(output["status"], "uncertain")
        self.assertEqual(adjustment["original_status"], "resolved")

    @mock.patch("classifier.urllib.request.urlopen")
    def test_real_call_path_returns_gemini_result(self, urlopen):
        urlopen.return_value = FakeResponse(gemini_payload({
            "status": "unresolved",
            "confidence": 0.91,
            "reason": "Chưa có phản hồi đáng tin cậy.",
            "source_reference": "thread-004",
        }))
        with mock.patch.dict(os.environ, {
            "AI_PROVIDER": "gemini",
            "GEMINI_API_KEY": "test-key-not-real",
            "GEMINI_MODEL": "test-model",
            "BUDDY_CONFIDENCE_THRESHOLD": "0.65",
        }):
            output = classifier.classify_case({
                "question": "Có TA hỗ trợ em không ạ?",
                "thread_context": [],
                "related_messages": [],
                "source_reference": "thread-004",
            }, trace=False)

        self.assertFalse(output["fallback"])
        self.assertEqual(output["status"], "unresolved")
        self.assertEqual(output["provider"], "gemini")

    def test_missing_key_falls_back_to_uncertain(self):
        with mock.patch.dict(os.environ, {"AI_PROVIDER": "gemini", "GEMINI_API_KEY": ""}):
            output = classifier.classify_case({
                "question": "Test?",
                "thread_context": [],
                "related_messages": [],
            }, trace=False)
        self.assertTrue(output["fallback"])
        self.assertEqual(output["status"], "uncertain")

    @mock.patch("classifier.urllib.request.urlopen")
    def test_openrouter_call_path_returns_structured_result(self, urlopen):
        urlopen.return_value = FakeResponse(openrouter_payload({
            "status": "resolved",
            "confidence": 0.88,
            "reason": "Đã có phản hồi phù hợp.",
            "source_reference": "thread-005",
        }))
        with mock.patch.dict(os.environ, {
            "AI_PROVIDER": "openrouter",
            "OPENROUTER_API_KEY": "test-key-not-real",
            "OPENROUTER_MODEL": "qwen/qwen3.8-27b:free",
            "BUDDY_CONFIDENCE_THRESHOLD": "0.65",
        }):
            output = classifier.classify_case({
                "question": "Em làm được rồi ạ.",
                "thread_context": ["TA: Em thử lại nhé.", "Học viên: Em làm được rồi ạ."],
                "related_messages": [],
                "source_reference": "thread-005",
            }, trace=False)

        self.assertFalse(output["fallback"])
        self.assertEqual(output["status"], "resolved")
        self.assertEqual(output["provider"], "openrouter")
        request = urlopen.call_args.args[0]
        self.assertEqual(request.full_url, "https://openrouter.ai/api/v1/chat/completions")
        self.assertTrue(request.get_header("Authorization").startswith("Bearer "))


if __name__ == "__main__":
    unittest.main()
