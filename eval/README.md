# Đánh giá CP3

CP2 sử dụng các ví dụ giả lập cố định và chưa dùng AI thật. Ở CP3, nhóm cần tạo một bộ dữ liệu chuẩn có phiên bản bằng dữ liệu giả lập, bao phủ các ca kiểm thử khó dưới đây; xác định trạng thái mong đợi trước khi chạy hệ thống và báo cáo kết quả thực tế mà không thay đổi tiêu chuẩn đạt sau đó.

1. Nhiều người hỏi cùng một ý định bằng cách diễn đạt khác nhau.
2. Câu hỏi đã được trả lời ở luồng thảo luận khác.
3. Tin nhắn của bot/hệ thống bị nhận diện nhầm là câu hỏi.
4. Cùng một người gửi lặp lại một vấn đề.
5. Câu hỏi mơ hồ hoặc thiếu ngữ cảnh.
6. Không tìm thấy căn cứ hoặc câu trả lời liên quan.
7. Câu hỏi nằm ngoài phạm vi.
8. TA tự sửa phân loại của AI.

Không đưa dữ liệu Discord thô hoặc thông tin nhận dạng cá nhân vào thư mục này.

## Golden set

[`golden-set.json`](golden-set.json) chứa 20 case giả lập, đã gắn nhãn mong đợi trước khi chạy AI. Nhóm cần rà soát từng nhãn và thay bằng bộ test đã chuẩn bị nếu bộ đó có bằng chứng tốt hơn. Không đổi nhãn sau khi xem kết quả chỉ để tăng pass rate.

Metadata được ghi trực tiếp trong từng case để rubric có thể kiểm tra:

- `difficulty_class`: lớp ① failure/no-grounding, ② low-confidence/ambiguous, ③ out-of-scope hoặc ④ domain-specific.
- `case_tier`: 10 case thường (`common`), 7 case khó (`hard`), 3 case hiếm (`rare`).
- `origin`: 15 case từ pattern/chatlog thật đã ẩn danh và 5 case tổng hợp để ép policy ở biên.

Phân bố theo bốn lớp: ① có 6 case, ② có 7 case, ③ có 2 case, ④ có 5 case. Việc bổ sung metadata không thay đổi input, expected label hoặc quality bar đã khóa.

Chạy phép đo thật bằng:

```powershell
python codebase/ai/run_eval.py
```

Kết quả sẽ được ghi vào `runs/` và `cp3-results.md`. Xem hướng dẫn đầy đủ tại [`codebase/ai/README.md`](../codebase/ai/README.md).
