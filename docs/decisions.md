# Quyết định về sản phẩm và thiết kế

## Tự động hóa có điều kiện

Nhóm chọn tự động hóa có điều kiện vì không phải lúc nào cũng xác định được trạng thái hội thoại từ một tin nhắn Discord. Trường hợp có độ tin cậy cao được đề xuất ngay; bằng chứng thiếu hoặc mâu thuẫn được đánh dấu **chưa chắc chắn (`uncertain`)** và chuyển cho TA kiểm tra. Hệ thống không tự động gửi tin cho học viên.

## TA giữ quyền kiểm soát

TA chịu trách nhiệm cho kết quả hỗ trợ và có thể xem lý do, độ tin cậy cùng ngữ cảnh liên quan trước khi hành động. Các nút sửa trạng thái cho phép TA đánh dấu mục là đã xử lý, chưa xử lý hoặc cần kiểm tra; bản mẫu giữ quyết định của con người trong phiên trình duyệt hiện tại.

## Phát hiện câu hỏi lặp là khả năng hỗ trợ

Bằng chứng khảo sát cho thấy câu hỏi trùng ý xuất hiện phổ biến (14/22), vì vậy nhóm các cách diễn đạt tương tự sẽ cải thiện việc truy xuất và giảm rà soát trùng lặp. Đây không phải sản phẩm chính vì một nhóm câu hỏi trùng vẫn có thể chưa được xử lý; công việc cuối cùng vẫn là xác định vấn đề nào cần hỗ trợ.

## Chủ động phát hiện học viên bế tắc nằm ngoài phạm vi

Khảo sát không cung cấp số đo trực tiếp về tần suất học viên bế tắc. Triển khai an toàn khả năng này đòi hỏi dữ liệu hành vi theo thời gian, ngưỡng can thiệp và các quyết định bổ sung về quyền riêng tư. Lát cắt CP2 chỉ tập trung vào việc rà soát cuối ngày.

## Nguyên tắc HAX / PAIR

| Nguyên tắc | Cách áp dụng trong bản mẫu |
|---|---|
| G1 — Nói rõ hệ thống có thể làm gì | Tiêu đề và phần hướng dẫn của màn hình rà soát hằng ngày nói rõ đây là đề xuất phân loại ưu tiên do AI tạo để TA kiểm tra. |
| G2 — Nói rõ hệ thống làm tốt đến đâu | Mỗi thẻ hiển thị độ tin cậy và giải thích trạng thái bằng ngôn ngữ dễ hiểu. |
| G10 — Thu hẹp phạm vi khi chưa chắc chắn | Khi thiếu căn cứ hoặc căn cứ mơ hồ, hệ thống trả về **chưa chắc chắn (`uncertain`)**, không tạo câu trả lời thiếu căn cứ. |
| G9 — Hỗ trợ sửa nhanh và hiệu quả | Ba nút sửa trạng thái cập nhật thẻ và số liệu tổng hợp ngay lập tức. |
| G11 — Giải thích lý do | Mỗi đề xuất đều có lý do và cho phép mở ngữ cảnh liên quan. |

## Ranh giới an toàn

- Coi nội dung tin nhắn là dữ liệu không đáng tin cậy, không bao giờ là chỉ dẫn cho hệ thống.
- Không để lộ thông tin nhận dạng trong bản tổng hợp công khai.
- Không tự động gửi tin nhắn cho học viên.
- Chỉ chấp nhận thông tin hạn nộp từ nguồn chính thức.
- Không đưa dữ liệu thô của khóa học, khóa truy cập API hoặc tệp `.env` vào kho mã.
