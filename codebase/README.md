# Mã nguồn giao diện & Bản mẫu tương tác (CP2 Codebase)

Thư mục này chứa mã nguồn bản mẫu tương tác tĩnh (Interactive Clickable Prototype) phục vụ Checkpoint 2 (CP2) của nhóm **Buddy (Phòng E402)**.

## Cấu trúc thư mục

- `prototype/index.html`: Giao diện Dashboard rà soát cuối ngày dành cho TA/Mod trên nền Web tĩnh (HTML/CSS/JS).
- `prototype/triage_engine.js`: Bộ dữ liệu giả lập và engine điều hướng trạng thái 3 mức (`RESOLVED` / `UNRESOLVED` / `UNCERTAIN`).
- `flowchart/user_journey_flow.svg`: Sơ đồ luồng trải nghiệm vector SVG đầy đủ các bước nhập liệu, điểm gọi AI và 4 nhánh xử lý.
- `flowchart/README.md`: Tài liệu đặc tả luồng hành trình chi tiết bằng sơ đồ Mermaid.

## Mức độ Prototype nhắm tới

- **Mức:** `Mock` (Bản mẫu tương tác tĩnh).
- **Phần chạy thật trên trình duyệt:**
  - Toàn bộ luồng bấm điều hướng, lọc tab trạng thái (*Tất cả / Cần xử lý gấp / Cần duyệt / Đã xong*).
  - Khung xem ngữ cảnh hội thoại liên quan (Thread context).
  - Thao tác 1-Click của TA: Chuyển đổi trạng thái, sửa ghi đè (Override), gửi câu trả lời chuẩn (Canonical Reply).
  - Bộ đếm thời gian thực cập nhật trên thanh KPI Bar.
- **Phần chạy giả lập (Mock):**
  - Dữ liệu 6 case câu hỏi Discord K4 (được trích xuất từ 1.092 tin nhắn thật trong `data/discord-pack/`).
  - Quyết định phân loại của AI, điểm tự tin (confidence) và câu giải thích lý do (reasoning). *Phần này sẽ được thay thế bằng lời gọi API mô hình thật tại CP3.*

## Hướng dẫn mở và kiểm tra

1. Mở trực tiếp file `codebase/prototype/index.html` (hoặc `prototype/discord_ta_triage.html`) trên bất kỳ trình duyệt nào (Chrome, Edge).
2. Hoặc khởi chạy qua máy chủ nội bộ:
   ```bash
   python -m http.server 8000
   ```
   Truy cập: `http://localhost:8000/codebase/prototype/index.html`.
