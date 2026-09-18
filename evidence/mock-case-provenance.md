# Nguồn gốc 20 tình huống mô phỏng

Các case dưới đây được tổng hợp từ failure pattern trong `k4_messages.csv`. Repository không chứa tệp CSV hoặc hội thoại gốc. Nội dung hiển thị đã được rút gọn/viết lại; tên người gửi được thay bằng định danh giả; URL và thông tin nhận dạng bị loại bỏ. Mã message ẩn danh được giữ để nhóm đối chiếu nội bộ.

| Case | Pattern | Tham chiếu ẩn danh | Cách biến đổi |
|---|---|---|---|
| q-201 | Đã trả lời ở nơi khác | channel_10 · M18056, M58005, M42137 | Gom các câu cùng intent, rút gọn đáp án. |
| q-202 | Câu hỏi lặp đã có đáp án | channel_10 · M07653, M14873, M45837, M33935 | Tổng hợp hai luồng hỏi deadline daily. |
| q-203 | Hướng dẫn lệnh | channel_10 · M02135, M02793, M63853 | Rút gọn thao tác chọn/đổi đề tài. |
| q-204 | Bot trả lời không nhất quán | channel_10 · M37242, M55412, M59182, M11596 | Ghép hai phản hồi khác chất lượng cho cùng intent. |
| q-205 | Người hỏi xác nhận đã tự xử lý | channel_08 · M44947, M94723, M28055 | Viết lại nội dung kỹ thuật, giữ kết thúc đã khắc phục. |
| q-206 | Phản hồi sai intent | channel_10 · M41736, M11802 | Tách nhu cầu “cách nộp” khỏi câu trả lời về thời gian. |
| q-207 | Không có nguồn deadline | channel_10 · M07416, M28485 | Rút gọn câu hỏi và hướng dẫn kiểm tra nguồn chính thức. |
| q-208 | Hướng dẫn chưa khắc phục hậu quả | channel_10 · M45740, M51183 | Viết lại tình huống đặt sai tên Zoom. |
| q-209 | Thiếu nội dung attachment | channel_08 · M51326 | Không sử dụng nội dung ảnh; chỉ giữ tín hiệu có attachment. |
| q-210 | Tin nhắn do bot gửi | channel_10 · M42137 | Giữ nội dung rút gọn và cờ nguồn bot. |
| q-211 | Nguồn cộng đồng về đăng nhập Zoom | channel_11 · M27034, M66739 | Bỏ attachment và thông tin cá nhân; diễn đạt lại câu hỏi. |
| q-212 | Tham gia workshop nhưng thiếu XP | channel_11 · M69343, M42138 | Rút gọn câu hỏi và phản hồi điều kiện chung. |
| q-213 | Điểm danh QR cần xác minh | channel_11 · M37211, M57346, M51989 | Gộp chuỗi hỏi thêm lớp/buổi học. |
| q-214 | AI Logs chưa xuất hiện | channel_10 · M53517, M44218 | Rút gọn hướng dẫn kỹ thuật thành bước kiểm tra. |
| q-215 | Lệnh daily không hoạt động | channel_10 · M65205, M91046 | Loại mention và tên thread cụ thể; giữ quy trình. |
| q-216 | Push muộn vì lỗi commit | channel_10 · M40677, M00595 | Loại chi tiết cá nhân; giữ ranh giới cần policy chính thức. |
| q-217 | Xin duyệt đề tài ngoài Project Bank | channel_10 · M16663, M31822 | Rút gọn quy trình tạo ticket. |
| q-218 | Team bốn người có bị ghép thêm | channel_02 · M88368, M97423 | Viết lại câu hỏi, giữ tính phụ thuộc tình hình. |
| q-219 | Tra cứu và chọn đề tài | channel_10 · M90646, M82926 | Rút gọn về hai lệnh cần thiết. |
| q-220 | Không có thông tin book phòng | channel_10 · M45220, M49356 | Bỏ link/chi tiết ngoài phạm vi, giữ việc thiếu nguồn chính thức. |

## Quy tắc sử dụng

- Không dùng bảng này để suy ngược danh tính người gửi.
- Không đưa CSV hoặc đoạn chat đầy đủ vào repository public.
- Khi gọi API, chỉ gửi nội dung case đã rút gọn cần cho quyết định hiện tại.
- Các nhãn trạng thái trong prototype phục vụ demo UI; phép đo CP3 chính thức vẫn dùng `eval/golden-set.json`.
