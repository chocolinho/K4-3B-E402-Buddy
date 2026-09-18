# CP3 runs

Khi chạy prototype/evaluation, thư mục này nhận:

- `cp3-trace.jsonl`: mỗi dòng là một input/output trace, không chứa API key;
- `cp3-eval-*.json`: báo cáo số lượng pass/fail và kết quả từng case.

Chỉ commit trace đã được kiểm tra là dữ liệu giả lập hoặc đã ẩn danh. Không commit dữ liệu Discord thô hay thông tin nhận dạng cá nhân.

## Run được giữ cho CP3

- `cp3-eval-20260918-110517.json`: baseline đầu tiên, 14/20 pass, 0 fallback; được khôi phục từ trace gốc và có trường provenance.
- `cp3-eval-20260918-120303.json`: challenge set cuối, 19/20 pass, 0 fallback; đây là số đo chính thức để nộp.
