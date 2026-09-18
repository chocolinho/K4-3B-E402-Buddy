# Bản mẫu CP2 + CP3

**Mức độ bản mẫu:** Có thể bấm thử; CP3 có backend gọi AI thật

Ở CP2 có thể mở trực tiếp [prototype/index.html](prototype/index.html). Ở CP3 phải chạy local server để nút **Phân tích bằng AI** gọi backend mà không làm lộ API key:

```powershell
python ai/server.py
```

Sau đó mở `http://127.0.0.1:8000`. Xem [hướng dẫn CP3](ai/README.md) để cấu hình `.env`, chạy 20 test case và quay video.

## Bố cục màn hình

1. Hàng đợi ưu tiên xuất hiện ngay đầu màn hình, kèm số liệu của phiên hiện tại.
2. Tab trạng thái, tìm kiếm, bộ lọc nguồn/tình huống và sắp xếp giúp TA quét nhanh 10 case.
3. Mỗi case có một hành động chính, confidence dạng thanh kèm hướng dẫn và nhãn nguồn rõ ràng.
4. Side panel hai cột hiển thị timeline hội thoại, bằng chứng, structured output, policy và lịch sử quyết định.
5. TA có thể xác nhận, ghi đè hoặc hoàn tác; mọi thao tác được lưu trong audit trail của phiên.
6. Chế độ **Demo nhanh**, dashboard phiên và phím tắt hỗ trợ video/pitch và hàng đợi lớn.

Prototype có 10 tình huống được rút gọn từ các pattern trong `k4_messages.csv`: câu hỏi lặp, câu trả lời ở luồng khác, trả lời sai intent, thiếu grounding, thiếu attachment và message do bot gửi. Tên người gửi được thay bằng định danh giả; link gốc bị loại bỏ; message ID ẩn danh chỉ được giữ để nhóm đối chiếu nguồn.

## Tương tác hoạt động thật

- Điều hướng và lọc danh sách câu hỏi.
- Rà soát trạng thái kèm số lượng tổng hợp.
- Hộp thoại xem ngữ cảnh.
- Sửa thủ công thành đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`).
- Tìm kiếm, lọc theo loại nguồn/tình huống và sắp xếp theo ưu tiên hoặc confidence.
- Audit trail, hoàn tác, số lần AI phân tích và tỷ lệ TA ghi đè.
- Quyết định, kết quả phân tích và lịch sử của TA được giữ trong phiên trình duyệt hiện tại bằng `sessionStorage`.

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
