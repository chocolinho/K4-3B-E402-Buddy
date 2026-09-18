# Reflection — Nguyễn Đình Thái

## Vai trò

Tôi phụ trách AI / Kỹ thuật: thiết kế quyết định phân loại, prompt, kết nối API, backend cho prototype, cơ chế fallback và phép đánh giá trên golden set.

## Phần tôi trực tiếp làm

Tôi trực tiếp hoàn thiện luồng từ giao diện đến lời gọi AI thật. Phần chính nằm trong `codebase/ai/classifier.py`, `server.py`, `prompt.md` và `run_eval.py`; giao diện gọi backend từ `codebase/prototype/`. Tôi tự tạo API key trong môi trường cục bộ, cấu hình `.env` và kiểm tra để key không bị commit.

Quyết định kỹ thuật quan trọng của tôi là chỉ cho model trả ba trạng thái `resolved`, `unresolved`, `uncertain` theo structured output. Sau khi nhận kết quả, backend tiếp tục kiểm tra schema và áp dụng policy an toàn: API lỗi phải chuyển sang fallback có nhãn; confidence thấp, thiếu nguồn hoặc nguồn không đủ thẩm quyền không được tự kết luận `resolved`. TA vẫn là người đưa ra quyết định cuối cùng và có thể ghi đè hoặc hoàn tác.

Tôi chạy toàn bộ 20 case bằng `python codebase/ai/run_eval.py`, kiểm tra báo cáo trong `eval/cp3-results.md` và trace trong `runs/`. Lượt baseline đạt 14/20; lượt cuối đạt 19/20, không có fallback. Các phần việc này được thể hiện chủ yếu ở commit `b6f0445`, phần UI/policy tiếp tục được hoàn thiện ở `b1f41a6` và phần bằng chứng rubric ở `1dc48e2`.

## AI đã hỗ trợ và cách tôi kiểm tra

Tôi dùng AI hỗ trợ đề xuất cấu trúc prompt, schema JSON, mã gọi API, xử lý lỗi và cách tổ chức script đánh giá. Tôi không xem mã AI sinh ra là kết quả cuối: tôi đọc lại contract input/output, tự đặt API key, chạy thử API thật, xem từng output và đối chiếu với nhãn đã khóa trong golden set.

Khi OpenRouter trả HTTP 429, tôi không dùng kết quả fallback để báo cáo mà chuyển sang Gemini, chạy lại trọn bộ và chỉ dùng lượt có 0 fallback. Tôi cũng chạy unit test để kiểm tra schema, low-confidence policy và fallback; sau mỗi thay đổi quan trọng tôi chạy lại đủ 20 case thay vì chỉ chạy riêng case vừa sửa.

## Bài học từ case fail của nhóm

Case `cp3-018` hỏi deadline nhưng ngữ cảnh chỉ có một học viên khác nói “hình như 9 giờ”, không có thông báo từ TA/BTC hoặc nguồn chính thức. Nhãn mong đợi là `uncertain`, nhưng model trả `unresolved` với confidence 0.90. Lỗi này cho thấy confidence cao không đồng nghĩa với quyết định đúng và model có thể tự tin khi dùng sai thẩm quyền nguồn.

Bài học của tôi là phải tách “có thông tin liên quan” khỏi “có nguồn đủ quyền để xác nhận”. Với deadline, điểm số hoặc quy chế, hệ thống cần kiểm tra loại nguồn trước khi xét confidence. Nếu chỉ có nguồn cộng đồng thì phải chuyển cho TA kiểm tra, không nên dùng confidence để che đi việc thiếu căn cứ chính thức. Vì vậy tôi giữ nguyên case fail trong báo cáo 19/20 thay vì đổi nhãn để đạt 100%.
