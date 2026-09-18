# Reflection — Vũ Tiến Linh

## Vai trò

Nghiên cứu / Bằng chứng — khảo sát, mining, evidence và golden set.

## Phần tôi trực tiếp làm

Tôi phụ trách phần bằng chứng cho bài toán: rà soát dữ liệu Discord, tổng hợp kết quả khảo sát và chuẩn bị nguồn cho golden set. Các artifact tôi trực tiếp hoàn thiện hoặc kiểm tra gồm [`evidence/analyze_messages.py`](../evidence/analyze_messages.py), [`evidence/mining-summary.md`](../evidence/mining-summary.md), [`evidence/survey-summary.md`](../evidence/survey-summary.md) và [`evidence/mock-case-provenance.md`](../evidence/mock-case-provenance.md).

Tôi dùng script để đọc file CSV cục bộ với UTF-8 BOM, kiểm tra các cột bắt buộc rồi đếm các chỉ số aggregate: message, bot/non-bot, reply, attachment và candidate question. Candidate question chỉ là tập ứng viên, được lọc từ tin nhắn không phải bot, đủ độ dài và có dấu hỏi hoặc marker hỗ trợ như “lỗi”, “làm sao”, “ở đâu”. Kết quả kiểm tra ghi nhận 1.092 dòng message, 264 candidate question và 209 candidate question có direct reply. Tôi cũng đối chiếu 20 case mô phỏng với message ID đã ẩn danh để bảo đảm mỗi case có nguồn gốc hoặc được đánh dấu là case hiếm dùng kiểm tra policy.

## AI đã hỗ trợ và cách tôi kiểm tra

AI hỗ trợ nhóm tóm tắt pattern, nhóm các câu hỏi cùng intent và rà lại độ phủ của golden set. Tôi không dùng kết quả AI như số liệu gốc: các con số trong [`evidence/mining-summary.md`](../evidence/mining-summary.md) được đối chiếu với output của [`evidence/analyze_messages.py`](../evidence/analyze_messages.py), còn kết quả khảo sát được giữ ở dạng tỷ lệ trên mẫu 22 người trong [`evidence/survey-summary.md`](../evidence/survey-summary.md).

Về bảo vệ dữ liệu, file CSV và hội thoại đầy đủ không được commit. Trước khi đưa vào case, tôi loại tên, mention, email, URL, thông tin cá nhân và nội dung attachment; chỉ giữ trích đoạn tối thiểu cùng mã message giả/ẩn danh để đối chiếu nội bộ. Script chỉ xuất số aggregate, không in tên người gửi hoặc toàn bộ nội dung chat. Khi gọi AI, nhóm chỉ gửi case đã rút gọn cần cho quyết định hiện tại.

## Bài học từ case fail của nhóm

Failure rõ nhất là `cp3-018` trong [`eval/cp3-results.md`](../eval/cp3-results.md): expected là `uncertain` nhưng model dự đoán `unresolved`, khiến run 20 case chỉ đạt 19/20, tương đương 95%. Câu hỏi liên quan đến deadline có intent rõ, nhưng thông tin “9 giờ” chỉ đến từ một học viên khác, không phải TA/BTC hay nguồn chính thức. Model đã ưu tiên quy tắc “chưa có câu trả lời đáng tin thì unresolved”, trong khi policy của sản phẩm yêu cầu chuyển `uncertain` để người có thẩm quyền xác minh trước khi hành động.

Điểm tôi rút ra là coverage không chỉ cần nhiều biến thể câu hỏi; golden set còn phải tách rõ các ranh giới về thẩm quyền nguồn. Với các chủ đề như deadline, điểm danh hoặc quy định, “có người trả lời” không đồng nghĩa với “đã được giải quyết”. Các lần bổ sung dữ liệu sau cần thêm case có intent rõ nhưng chỉ có nguồn cộng đồng, đồng thời ghi rõ trong provenance vì sao trạng thái an toàn là `uncertain`.
