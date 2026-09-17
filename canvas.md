# Khung ý tưởng CP1 — Rà soát hỗ trợ trên Discord

| Dòng | Nội dung |
|---|---|
| **1. Nhánh + đề** | Nhánh B – B2: Tính năng mới cho TA/học viên trên Discord, tập trung vào hỗ trợ TA rà soát các vấn đề học viên còn cần xử lý. |
| **2. Người thực hiện công việc** | TA/Mod phụ trách theo dõi Discord vào cuối ngày, cần rà soát các câu hỏi/vấn đề của học viên để xác định nội dung nào còn cần phản hồi. |
| **3. Nỗi đau trong một câu** | TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán, câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, dẫn đến phản hồi chậm và tốn thời gian rà soát thủ công. |
| **4. 1–2 bằng chứng đầu** | Khảo sát 22 người: 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách; 9/22 (40,9%) từng không chắc câu hỏi đã được trả lời hay chưa và 9/22 (40,9%) gặp trường hợp câu hỏi đã được trả lời ở luồng thảo luận/kênh khác. Đồng thời 13/22 (59,1%) mất từ 5 phút trở lên cho một lần rà soát, và 14/22 (63,6%) phải rà soát ít nhất 3 lần/tuần. |
| **5. Lát cắt MỘT CÂU** | Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`) dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ. |
| **6. Mức độ AI tự làm + người dùng sẵn sàng thử** | **Tự động hóa có điều kiện:** AI tự gom thông tin và đề xuất trạng thái khi có đủ căn cứ; trường hợp mơ hồ, câu hỏi trùng hoặc có thể đã được trả lời ở nơi khác được đánh dấu **chưa chắc chắn (`uncertain`)** để TA duyệt. Hệ thống không tự gửi tin cho học viên. **Người dùng sẵn sàng thử:** Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc, Nguyễn Việt Hoàng — ngoài nhóm, đã đồng ý thử bản mẫu. |
| **7. Phân công có tên** | **Nguyễn Đình Thái:** quyết định của AI, bản mẫu, tính khả thi kỹ thuật và đánh giá · **Vũ Tiến Linh:** khảo sát, khai thác dữ liệu và bằng chứng · **Dương Đình Long:** xác định vấn đề, `spec.md`, khung ý tưởng, trải nghiệm người dùng và kiểm chứng. |

Xem bằng chứng chi tiết tại [`spec.md` §2](spec.md#2-nhật-ký-bằng-chứng) và [tóm tắt khảo sát](evidence/survey-summary.md).
