# Bản mẫu CP2

**Mức độ bản mẫu:** Mô phỏng / Có thể bấm thử

Mở trực tiếp [prototype/index.html](prototype/index.html) bằng trình duyệt. Không cần máy chủ, bước đóng gói, khung phát triển, giao diện lập trình ứng dụng bên ngoài hoặc kết nối mạng.

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

Tất cả hội thoại hiển thị đều là dữ liệu giả lập. Bản mô phỏng CP2 không gọi AI thật và không bao giờ gửi tin nhắn.

Xem [luồng hoạt động](flowchart/README.md) và [đặc tả sản phẩm](../spec.md).
