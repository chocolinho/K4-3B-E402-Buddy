# CP1 Canvas — Discord Support Review

| Dòng | Nội dung |
|---|---|
| **1. Track + đề** | Track B – B2: Tính năng mới cho TA/học viên trên Discord, tập trung vào hỗ trợ TA rà soát các vấn đề học viên còn cần xử lý. |
| **2. Job executor** | TA/Mod phụ trách theo dõi Discord vào cuối ngày, cần rà soát các câu hỏi/vấn đề của học viên để xác định nội dung nào còn cần phản hồi. |
| **3. Pain một câu** | TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán, câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, dẫn đến phản hồi chậm và tốn thời gian rà soát thủ công. |
| **4. 1–2 bằng chứng đầu** | Khảo sát 22 người: 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách; 9/22 (40,9%) từng không chắc câu hỏi đã được trả lời hay chưa và 9/22 (40,9%) gặp trường hợp câu hỏi đã được trả lời ở thread/kênh khác. Đồng thời 13/22 (59,1%) mất từ 5 phút trở lên cho một lần rà soát, và 14/22 (63,6%) phải rà soát ít nhất 3 lần/tuần. |
| **5. Lát cắt MỘT CÂU** | Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái `resolved` / `unresolved` / `uncertain` dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ. |
| **6. AI tự làm đến đâu + willing users** | **Conditional automation:** AI tự gom thông tin và đề xuất trạng thái khi có đủ căn cứ; trường hợp mơ hồ, câu hỏi trùng hoặc có thể đã được trả lời ở nơi khác được đánh dấu **Uncertain** để TA duyệt, và hệ thống không tự gửi tin cho học viên. **Willing users:** Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc, Nguyễn Việt Hoàng — ngoài nhóm, đã đồng ý thử prototype. |
| **7. Phân công có tên** | **Nguyễn Đình Thái:** AI decision, prototype, technical feasibility & evaluation · **Vũ Tiến Linh:** survey/data mining & evidence · **Dương Đình Long:** problem framing, `spec.md`, Canvas & UX/validation. |

Xem bằng chứng chi tiết tại [`spec.md` §2](spec.md#2-evidence-log) và [tóm tắt khảo sát](evidence/survey-summary.md).
