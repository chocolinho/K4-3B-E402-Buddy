# Khung ý tưởng CP1 — Rà soát hỗ trợ trên Discord

## 1. Nhánh + chủ đề

Nhánh B – B2: Tính năng mới cho TA/học viên trên Discord.  
Trọng tâm: giúp TA rà soát các vấn đề học viên còn cần hỗ trợ vào cuối ngày.

## 2. Người thực hiện công việc

TA/Mod rà soát Discord vào cuối ngày để xác định những câu hỏi hoặc vấn đề của học viên vẫn cần hỗ trợ.

## 3. Nỗi đau

TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán; câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, dẫn đến phản hồi chậm và tốn thời gian rà soát thủ công.

## 4. Bằng chứng ban đầu

Mẫu khảo sát: 22 người trả lời.

- 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách.
- 9/22 (40,9%) từng không chắc câu hỏi đã được trả lời hay chưa.
- 9/22 (40,9%) từng gặp câu hỏi đã được trả lời ở luồng thảo luận/kênh khác.
- 13/22 (59,1%) mất ít nhất 5 phút cho mỗi lần rà soát.
- 14/22 (63,6%) thực hiện việc rà soát ít nhất 3 lần/tuần.
- 16/22 (72,8%) thường xuyên hoặc thỉnh thoảng trực tiếp hỗ trợ câu hỏi.

Xem [tóm tắt khảo sát](../evidence/survey-summary.md) và [bảng so sánh tác động](../evidence/impact-table.md).

## 5. Lát cắt sản phẩm trong một câu

Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`) dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ.

## 6. Mức độ tự động hóa + người dùng sẵn sàng thử

**Tự động hóa có điều kiện:** độ tin cậy cao → hiển thị đề xuất của AI; độ tin cậy thấp hoặc thiếu ngữ cảnh → đánh dấu chưa chắc chắn (`uncertain`) → yêu cầu TA kiểm tra. Hệ thống không bao giờ tự động nhắn cho học viên và TA luôn có thể sửa phân loại của AI.

Người dùng sẵn sàng tham gia kiểm chứng:

- Nguyễn Tiến Phát
- Nguyễn Đình Lâm Phúc
- Nguyễn Việt Hoàng

## 7. Phân công nhóm

- Nguyễn Đình Thái: quyết định của AI, tính khả thi kỹ thuật, bản mẫu và đánh giá.
- Vũ Tiến Linh: khảo sát, khai thác dữ liệu và bằng chứng.
- Dương Đình Long: xác định vấn đề, đặc tả, trải nghiệm người dùng và kiểm chứng.
