# Bản mẫu CP2 + CP3

**Mức độ bản mẫu:** Có thể bấm thử; CP3 có backend gọi AI thật

Ở CP2 có thể mở trực tiếp [prototype/index.html](prototype/index.html). Ở CP3 phải chạy local server để nút **Phân tích bằng AI** gọi backend mà không làm lộ API key:

```powershell
python ai/server.py
```

Sau đó mở `http://127.0.0.1:8000`. Xem [hướng dẫn CP3](ai/README.md) để cấu hình `.env`, chạy 20 test case và quay video.

## Bố cục màn hình

1. Phần giới thiệu nói rõ khả năng và giới hạn của bản mẫu.
2. Thanh luồng CP2 thể hiện `Tin nhắn Discord → AI phân loại → TA rà soát → TA quyết định`.
3. Ba thẻ tổng quan vừa hiển thị số lượng vừa đóng vai trò bộ lọc.
4. Hàng đợi ưu tiên hiển thị tình huống, đề xuất ban đầu, lý do, độ tin cậy và nguồn giả lập.
5. Hộp thoại ngữ cảnh cho phép so sánh đề xuất của AI với quyết định hiện tại của TA.

Prototype có 10 tình huống được rút gọn từ các pattern trong `k4_messages.csv`: câu hỏi lặp, câu trả lời ở luồng khác, trả lời sai intent, thiếu grounding, thiếu attachment và message do bot gửi. Tên người gửi được thay bằng định danh giả; link gốc bị loại bỏ; message ID ẩn danh chỉ được giữ để nhóm đối chiếu nguồn.

## Tương tác hoạt động thật

- Điều hướng và lọc danh sách câu hỏi.
- Rà soát trạng thái kèm số lượng tổng hợp.
- Hộp thoại xem ngữ cảnh.
- Sửa thủ công thành đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`).
- Quyết định sửa của TA được giữ trong phiên trình duyệt hiện tại bằng `sessionStorage` (bộ nhớ theo phiên).

## Hoạt động giả lập

- Nhận dữ liệu từ Discord.
- Kết quả phân loại của AI.
- Điểm tin cậy.
- Truy xuất luồng thảo luận/ngữ cảnh và liên kết nguồn.

## Trạng thái của AI

- `resolved`: đã xử lý.
- `unresolved`: chưa xử lý.
- `uncertain`: chưa chắc chắn, cần TA kiểm tra.

Tất cả hội thoại hiển thị vẫn là dữ liệu giả lập. Các quyết định ban đầu là mock CP2; khi bấm **Phân tích bằng AI**, quyết định của case đó được thay bằng kết quả API thật và có nhãn provider thật. Hệ thống không bao giờ tự gửi tin nhắn.

Nếu API lỗi, backend trả `uncertain` với nhãn `Fallback` để TA kiểm tra. Fallback không được tính là bằng chứng AI thật.

Xem [luồng hoạt động](flowchart/README.md) và [đặc tả sản phẩm](../spec.md).
