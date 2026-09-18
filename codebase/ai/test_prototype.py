import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
PROTOTYPE = ROOT / "codebase" / "prototype"


class PrototypeContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (PROTOTYPE / "index.html").read_text(encoding="utf-8")
        cls.css = (PROTOTYPE / "style.css").read_text(encoding="utf-8")
        cls.script = (PROTOTYPE / "script.js").read_text(encoding="utf-8")

    def test_primary_work_queue_and_drawer_exist(self):
        for element_id in ("queue", "question-list", "detail-dialog", "review-progress"):
            self.assertIn(f'id="{element_id}"', self.html)

    def test_search_filter_sort_and_metrics_exist(self):
        for element_id in ("search-input", "scenario-filter", "source-filter", "sort-select", "metrics-dialog"):
            self.assertIn(f'id="{element_id}"', self.html)

    def test_human_control_and_audit_are_implemented(self):
        for symbol in ("setHumanDecision", "undoHumanDecision", "appendAudit", "auditFor"):
            self.assertIn(f"function {symbol}", self.script)

    def test_api_contract_is_unchanged(self):
        for field in ("question", "thread_context", "related_messages", "source_reference"):
            self.assertIn(f"{field}:", self.script)
        self.assertIn('fetch("/api/analyze"', self.script)

    def test_responsive_and_reduced_motion_rules_exist(self):
        self.assertIn("@media (max-width: 380px)", self.css)
        self.assertIn("@media (max-width: 680px)", self.css)
        self.assertIn("prefers-reduced-motion: reduce", self.css)

    def test_twenty_anonymized_mock_cases_are_declared(self):
        case_ids = re.findall(r'id: "(q-\d+)"', self.script)
        self.assertEqual(len(case_ids), 20)
        self.assertEqual(len(set(case_ids)), 20)
        self.assertIn("20 tình huống mô phỏng", self.html)
        self.assertIn("đã ẩn danh", self.html)


if __name__ == "__main__":
    unittest.main()
