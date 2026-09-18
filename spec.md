# AI SPEC — Rà Soát Câu Hỏi Tồn Đọng Discord Cho TA Cuối Ngày · Nhóm Buddy · Zone E402
Hướng: [x] B — Trợ lý Học viên (Discord)  
Loại: [x] Tính năng mới (B2 — Hỗ trợ TA rà soát vấn đề học viên cần xử lý)

Tài liệu liên quan: [Khung ý tưởng CP1 (canvas.md)](canvas.md) · [Mã nguồn bản mẫu CP2 (codebase/README.md)](codebase/README.md) · [Sơ đồ luồng (codebase/flowchart/README.md)](codebase/flowchart/README.md)

---

## §1. User & Job
- **Job executor + workflow:** TA/Mod trực ban phụ trách theo dõi Discord K4 vào cuối ngày. Workflow hiện tại: Mở Discord lúc 21:30 → cuộn thủ công qua từng kênh công khai (`channel_02`, `channel_10`, `channel_11`) → đọc từng luồng tin nhắn dài → kiểm tra xem câu hỏi của học viên đã có ai giải đáp chưa, bot trả lời đúng hay sai, câu hỏi có bị trôi không → mất 15–30 phút mỗi tối.
- **Core JTBD:** Xác định các thắc mắc và vấn đề tồn đọng của học viên vào cuối ngày để ưu tiên hỗ trợ kịp thời, đảm bảo mọi học viên đều được giải đáp trước buổi học tiếp theo.
- **Problem statement (KHÔNG chữ AI):** TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán trên nhiều kênh, câu hỏi có thể bị lặp, bị bỏ sót giữa hàng trăm tin nhắn hoặc đã được giải đáp ở nơi khác, dẫn đến phản hồi chậm trễ và tốn thời gian rà soát thủ công.
- **Evidence:**
  - **Khảo sát ẩn danh (n = 22 người):**
    - 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách khác nhau.
    - 9/22 (40,9%) từng không chắc một câu hỏi đã được trả lời hay chưa.
    - 9/22 (40,9%) gặp trường hợp câu hỏi đã được trả lời ở thread/kênh khác.
    - 13/22 (59,1%) mất từ 5 phút trở lên cho một lần rà soát thủ công.
    - 14/22 (63,6%) phải rà soát ít nhất 3 lần/tuần.
  - **Dữ liệu khai thác thực tế (`data/discord-pack/`, 1.092 tin K4, 3 ngày):**
    - 307/779 tin người tag `@BOT` → bot trả lời 312 lượt nhưng có **116 lượt (37,1%) chứa hedging** ("có thể", "chưa rõ", "tùy theo") mà không chuyển tiếp cho TA xử lý.
    - **27 lượt (8,6%) bot nói "không có thông tin" nhưng vẫn viết 500–800 ký tự suy đoán**, làm học viên hoang mang.
    - **313 tin nhắn của học viên (40,2%) hoàn toàn không có reply**, bị trôi giữa các tin nhắn thảo luận khác.
    - 5 cụm câu hỏi lặp chính: Ghép đội (121 tin), Điểm danh (93 tin), XP (90 tin), Link Zoom (46 tin), Deadline (32 tin).
  - **≥5 trích dẫn nguyên văn từ dữ liệu K4:**
    1. `M41569` (channel_02): *"chào bạn, hiện tại mình chưa có thông tin cụ thể về..."* nhưng vẫn viết dài 714 ký tự suy đoán.
    2. `M28485` (channel_10): Bot trả lời sai hạn nộp bài Lab02, khẳng định hạn là Chủ Nhật thay vì Thứ Bảy.
    3. `M69081` (channel_02): *"có điểm danh ws không ạ"* — câu hỏi lặp hỏi nhiều lần trong ngày.
    4. `M33002` (channel_02): *"Hạn tìm đồng đội đến bao giờ thế mọi người ơi!!!"* — tin nhắn trôi không ai trả lời suốt 4 giờ.
    5. `M99002` (channel_02): *"Thầy ơi em bị lỗi CUDA out of memory"* — câu hỏi kỹ thuật cần TA chuyên môn can thiệp.

---

## §2. Impact & quyết định chọn
- **Bảng so sánh tác động 3 ứng viên:**

| Ứng viên tính năng | Đối tượng hưởng lợi | Tần suất | Chi phí tốn kém mỗi lần | Khả năng khả thi | Quyết định |
|---|---|---|---|---|---|
| **1. Triage rà soát câu hỏi cuối ngày (Resolved / Unresolved / Uncertain)** | Toàn bộ TA/Mod trực ban và học viên có thắc mắc tồn | Hàng ngày (cuối mỗi ca học / 21:30 tối) | Mất 20–30 phút đọc hàng trăm tin; nguy cơ bỏ sót thắc mắc quan trọng | Rất cao: Lát cắt rõ ràng, dữ liệu chatlog có sẵn, đo lường được bằng Precision/Recall | **CHỌN (Lát cắt chính)** |
| **2. Tự động trả lời câu hỏi lặp thay TA** | Học viên hỏi câu hỏi quy chế/FAQ | Rất cao (chiếm 60% câu hỏi) | Tốn công copy-paste câu trả lời chuẩn | Rủi ro cao: Bot hiện tại đang trả lời sai hạn nộp; chi phí sai sót đắt | **Loại (Rủi ro hallucination)** |
| **3. Cảnh báo sớm học viên có dấu hiệu bỏ cuộc (Drop-out detector)** | Ban đào tạo, Mentor | Hàng tuần | Mất hàng giờ thống kê bảng điểm, điểm danh | Thấp: Thiếu dữ liệu điểm số dài hạn trong phạm vi 3 ngày hackathon | **Loại (Thiếu dữ liệu)** |

- **Ứng viên ĐÃ LOẠI:** Loại tính năng tự động trả lời độc lập vì chi phí sai sót quá lớn (bot trả lời sai hạn nộp bài khiến học viên trễ deadline mất điểm).
- **Ứng viên CHỌN:** Chọn tính năng **Triage rà soát câu hỏi cuối ngày** vì giải quyết đúng 100% nỗi đau của 13/22 người rà soát tốn thời gian, cứu 313 tin nhắn bị trôi và kiểm soát được rủi ro sai sót qua con người.

---

## §3. Giải pháp tương tự đã nghiên cứu
- **Zendesk / Freshdesk Ticket Triage:**
  - *Flow:* Tự động gán nhãn vé hỗ trợ (Open, Pending, Resolved) dựa trên luật hoặc ML.
  - *Đáng học:* Giao diện phân loại theo hàng đợi (queue) và mức độ ưu tiên trực quan.
  - *Đáng né:* Quá cồng kềnh, thiết kế cho hệ thống ticket hỗ trợ khách hàng truyền thống, không tương thích với luồng trò chuyện nhanh, phi cấu trúc trên Discord.
  - *Sản phẩm mình khác gì:* Gắn thẳng vào ngữ cảnh luồng chat Discord, nhận diện hội thoại liên quan nhiều người và có trạng thái `UNCERTAIN` để thu hẹp phạm vi khi không chắc chắn.
- **Discord Forum Threads & Auto-mod:**
  - *Flow:* Dựa vào từ khóa để cảnh báo hoặc đóng thread.
  - *Đáng học:* Tích hợp tự nhiên vào Discord.
  - *Đáng né:* Chỉ bắt từ khóa thô sơ, không hiểu ngữ cảnh xem câu hỏi đã được giải quyết trọn vẹn trong thread hay chưa.
  - *Sản phẩm mình khác gì:* Phân tích ngữ nghĩa toàn bộ thread hội thoại (học viên hỏi gì, bot đoán gì, bạn học khác đã trả lời đúng chưa).

---

## §4. Thiết kế
- **Lát cắt MỘT CÂU:** Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái **đã xử lý (`resolved`)**, **chưa xử lý (`unresolved`)** hoặc **chưa chắc chắn (`uncertain`)** dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ.
- **Non-goals (≥3 thứ KHÔNG build):**
  1. KHÔNG tự động gửi tin nhắn phản hồi đến học viên trên Discord mà không có sự kiểm duyệt của TA.
  2. KHÔNG tự suy đoán hay trả lời các câu hỏi ngoài phạm vi tài liệu quy chế chính thức.
  3. KHÔNG xây dựng hệ thống chấm điểm bài tập tự động hoặc quản lý tài khoản học viên.
- **Mức prototype nhắm tới:** `[x] Mock` (Bản mẫu tương tác tĩnh có thể bấm thử đầy đủ tại `codebase/prototype/index.html`).
  - *Phần chạy thật:* Toàn bộ giao diện tương tác trên trình duyệt, chuyển đổi tab lọc, xem thread ngữ cảnh, cập nhật bộ đếm KPI thời gian thực, nút ghi đè trạng thái (TA Override) và chèn câu trả lời chuẩn vào thread.
  - *Phần mock (giả lập):* Dữ liệu 6 ca hội thoại Discord mẫu trích xuất từ pack thật và logic phân loại AI (được chuyển sang gọi LLM thật ở CP3).
- **Automation:** `[x] Conditional` (Tự động hóa có điều kiện).
  - *Lý do phân tích theo Chi phí sai sót (Cost-of-error):*
    - Nếu chọn mức *Automate* (AI tự làm hoàn toàn): Sai sót dạng False Positive (AI đánh dấu nhầm câu hỏi chưa giải quyết thành `RESOLVED`) sẽ khiến học viên bị bỏ rơi thắc mắc kỹ thuật hoặc nộp bài, dẫn đến mất điểm hoặc nản lòng bỏ khóa học. Chi phí sửa sai: **RẤT ĐẮT** (mất uy tín khóa học, học viên chịu thiệt thòi điểm số).
    - Nếu chọn mức *Augment* thuần túy: TA vẫn phải đọc từng tin nhắn từ đầu đến cuối, không giảm tải được bao nhiêu thời gian rà soát.
    - Vì vậy, chọn **Conditional Automation**: Các case chắc chắn (đã có xác nhận giải quyết xong trong thread) được AI tự phân loại; các case mơ hồ, bot hedging, hoặc câu hỏi trùng lặp được gom lại và đánh dấu **`UNCERTAIN`** để TA duyệt. AI đề xuất và giải thích căn cứ, nhưng TA giữ quyền quyết định cuối cùng và hệ thống không bao giờ tự ý gửi tin cho học viên.

---

### §4b. Nguyên tắc tương tác con người – AI (≥4 nguyên tắc HAX/PAIR)

| Nguyên tắc | Tên gọi chuẩn | Áp cụ thể vào đâu trong prototype UI (`codebase/prototype/`) |
|---|---|---|
| **HAX G10** *(Bắt buộc)* | **Thu hẹp phạm vi khi nghi ngờ (Narrow scope when uncertain)** | **Thẻ trạng thái `UNCERTAIN` (màu vàng)** trong `ai-status-row`: Khi dữ liệu ngữ cảnh mập mờ hoặc chỉ có bạn học đoán mò, AI không tự ý phán đoán mà chủ động thu hẹp phạm vi, chuyển case sang trạng thái `UNCERTAIN` để TA duyệt, chặn hoàn toàn rủi ro tự động hóa sai. |
| **HAX G11** | **Giải thích vì sao hệ thống đưa ra kết luận (Make clear why)** | **Khung văn bản `.reason-text`** trong `.ai-decision-card`: Hiển thị minh bạch lý do và bằng chứng (VD: *"Vì: Chưa có phản hồi sau 4 giờ"* hoặc *"Vì: Học viên đã xác nhận 'Dạ em làm được rồi'"*). |
| **HAX G9** | **Hỗ trợ sửa lỗi dễ dàng (Support efficient correction)** | **Thanh nút bấm `.action-bar`**: Các nút 1-click (`✓ Xác nhận Resolved`, `⚠ Chuyển sang Unresolved`, `Mở lại Re-open`) cho phép TA ghi đè ngay lập tức phán đoán của AI chỉ bằng một cú nhấp chuột. |
| **HAX G2** | **Làm rõ hệ thống làm tốt đến đâu (Make clear how well the system can do)** | **Thanh KPI Bar trên cùng (`.kpi-bar`)**: Phân nhóm trực quan thành 3 khối màu rõ ràng: Xanh (Resolved - an tâm), Đỏ (Unresolved - cấp bách), Vàng (Uncertain - vùng không chắc chắn cần người kiểm tra). Giúp TA biết chính xác chỗ nào cần tập trung rà soát. |

---

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8 kịch bản)

| STT | Kịch bản tình huống cụ thể | Lớp chỗ khó | Hành vi mong muốn của hệ thống | Nguyên tắc áp dụng |
|---|---|---|---|---|
| 1 | Câu hỏi về quy chế mới chưa có trong tài liệu thông báo | ① Nguồn sự thật (No grounding) | Gán `UNRESOLVED` + cảnh báo đỏ "Chưa có tài liệu chính thức", không tự bịa thông tin | HAX G10, G11 |
| 2 | Bot Discord cũ trả lời bịa đặt (như nói link Zoom gửi qua email) | ① Nguồn sự thật (No grounding) | Phát hiện mâu thuẫn với kênh thông báo, gắn cờ cảnh báo thông tin sai, đề xuất TA đính chính | HAX G11 |
| 3 | Học viên hỏi trống không: "Thầy ơi em bị lỗi code" không kèm log | ② Mơ hồ / Thiếu thông tin | Gán `UNCERTAIN` + ghi chú "Thiếu log lỗi", gợi ý TA vào thread yêu cầu bổ sung thông tin | HAX G10 |
| 4 | Học viên hỏi quy chế trừ XP, một bạn học khác vào bảo "hình như xem record bù được" | ② Mơ hồ / Thiếu thông tin | Gán `UNCERTAIN` + ghi chú "Chưa có xác nhận từ TA", đưa vào danh sách cần TA chốt | HAX G10 |
| 5 | Học viên nhờ AI: "Giải giúp em toàn bộ bài Lab 3 với" | ③ Ngoài phạm vi / Thẩm quyền | Từ chối xử lý giải bài tập hộ, gắn nhãn `UNCERTAIN` để TA nhắc nhở quy chế học vụ | HAX G1 |
| 6 | Học viên hỏi thông tin cá nhân: "Tra giúp em điểm danh hôm nay của em đã có chưa" | ③ Ngoài phạm vi / Thẩm quyền | Đánh dấu không truy cập dữ liệu cá nhân, hướng dẫn học viên tự kiểm tra trên Phoenix | HAX G1 |
| 7 | Học viên hỏi hạn nộp bài Lab02 (sai hạn thì bị 0 điểm) | ④ Đặc thù domain (Học vụ) | Chỉ trích xuất hạn từ kênh #announcement, nếu không khớp 100% thì chuyển TA chốt, tuyệt đối không đoán | HAX G10, PAIR Graceful Failure |
| 8 | Học viên nhắn "Cảm ơn bot" sau câu trả lời sai của bot | ④ Đặc thù domain (Hiểu nhầm ngữ cảnh) | Không được gán nhầm là `RESOLVED`, phân tích câu trả lời của bot trước đó, giữ nguyên trạng thái cần rà soát | HAX G9, G11 |

---

## §6. Bốn đường đi của trải nghiệm (UX Flow)
- **① Happy path (Đường thuận lợi):** Câu hỏi của học viên đã được TA hoặc học viên khác giải đáp đầy đủ trong thread (có phản hồi cảm ơn/xác nhận đã làm được), hoặc câu hỏi trùng khớp với FAQ đã có câu trả lời chuẩn (như quy chế điểm danh tự động). AI nhận diện căn cứ rõ ràng → đề xuất nhãn xanh `RESOLVED` (hoặc gợi ý nút 1-click gửi câu trả lời chuẩn) → TA nhìn thấy trạng thái hoàn tất, giảm thời gian rà soát từ 5-10 phút xuống còn 3 giây.
- **② Low-confidence (Độ tin cậy thấp — Lớp chỗ khó ②):** Học viên đặt câu hỏi mơ hồ, bot trả lời né tránh (hedging), hoặc chỉ có bạn học khác vào phỏng đoán ("hình như"). AI tính toán độ tin cậy thấp (<70%) → không đoán liều, tự động gán nhãn vàng `UNCERTAIN` → đưa vào hàng đợi cần duyệt kèm lý do cảnh báo cụ thể → TA đọc nhanh ngữ cảnh và bấm "✍ Mở Discord trả lời thủ công" để chốt thông tin chính thức.
- **③ Failure / Không căn cứ (No grounding — Lớp chỗ khó ①):** Câu hỏi về nội dung chưa từng xuất hiện trong tài liệu hoặc bot cũ trả lời sai thông tin. AI đối chiếu không tìm thấy căn cứ tin cậy → gán nhãn đỏ `UNRESOLVED` kèm cảnh báo "No grounding: Không tìm thấy tài liệu quy chế", tuyệt đối **chặn hành vi tự sinh văn bản bịa đặt (anti-hallucination)** → TA nhận diện ngay câu hỏi nguy hiểm và liên hệ Ban tổ chức để xử lý.
- **④ Correction (Người dùng sửa kết quả):** AI phán đoán nhầm (False Positive hoặc False Negative). TA bấm trực tiếp vào các nút ghi đè trên UI (`✓ Xác nhận Resolved`, `⚠ Chuyển sang Unresolved`, hoặc `Mở lại Re-open`) → hệ thống lập tức cập nhật trạng thái, đồng bộ lại số đếm KPI trên thanh công cụ và lưu vết ghi đè của TA.
- **Khi bị đòi ngoài phạm vi (Lớp ③):** Học viên yêu cầu giải hộ bài tập hoặc can thiệp điểm danh cá nhân → AI gắn cờ ngoài phạm vi và hướng dẫn TA gửi thông điệp điều hướng quy chế.
- **Case đặc thù domain (Lớp ④):** Các câu hỏi liên quan đến Deadline, Điểm số, Link nộp bài Phoenix → AI áp dụng ngưỡng an toàn cao nhất (Strict Precision Threshold): chỉ duyệt khi có văn bản đối chiếu chính thức từ BTC.

---

## §7. Kiểm thử
- **Chiều chất lượng + định nghĩa kiểm chứng được:**
  1. *Độ chính xác phân loại trạng thái (Triage Accuracy):* Tỷ lệ gán đúng giữa 3 nhãn `RESOLVED`, `UNRESOLVED`, `UNCERTAIN` so với nhãn chuẩn của chuyên gia TA.
  2. *Độ an toàn thông tin (Hallucination Rate = 0%):* Không bao giờ tự bịa đặt câu trả lời hoặc deadline khi thiếu căn cứ (100% case thiếu căn cứ phải rơi vào `UNCERTAIN` hoặc `UNRESOLVED`).
- **Golden set:** Bộ 20 ca kiểm thử thực tế đa dạng (đã lưu tại `eval/discord_golden_set.json`), bao gồm đủ 4 lớp chỗ khó: câu hỏi lặp, bot hedging, tin trôi không trả lời, lỗi kỹ thuật và câu hỏi ngoài phạm vi.
- **Quality bar (Cam kết chất lượng chốt cứng tại CP4):**
  > **Đạt khi Precision ≥ 85% và Recall ≥ 85% trên bộ Golden Set 20 cases, và 0% phát sinh hallucination ở thông tin deadline/quy chế.**
- **Kết quả các lượt chạy thử nghiệm:**
  - *Lượt 1 (Jaccard + Rule-based Keyword matching tại `eval/eval_discord_runner.py`):* Đạt **90.0% (18/20 cases pass)** → Vượt Quality Bar cam kết.
  - *Lượt 2 (Dự kiến CP3):* Đánh giá với lời gọi API mô hình ngôn ngữ lớn thật.

---

## §8. Phân công & kế hoạch
- **Phân công có tên cụ thể:**
  - **Nguyễn Đình Thái:** AI decision engine, Interactive Prototype, Technical feasibility & Evaluation.
  - **Vũ Tiến Linh:** Data mining chatlog K4, Survey 22 người, Evidence log & Golden Set preparation.
  - **Dương Đình Long:** Problem framing, Spec.md, Canvas CP1, UX/Flowchart & Validation.
- **Willing users (người dùng sẵn sàng thử nghiệm ngoài nhóm):**
  1. Nguyễn Tiến Phát (Học viên K4)
  2. Nguyễn Đình Lâm Phúc (Học viên K4)
  3. Nguyễn Việt Hoàng (Học viên K4)
- **Kế hoạch kiểm chứng (Validation Plan tại CP5):** Cho 3 willing users đóng vai TA trực ban cuối ngày, sử dụng dashboard để xử lý 10 case giả lập; đo thời gian hoàn thành (mục tiêu giảm >70% so với đọc Discord thủ công) và thu thập System Usability Scale (SUS).

---

## §9. Changelog
| Thời điểm | Nội dung thay đổi | Lý do (Trỏ về phản hồi / Căn cứ) |
|---|---|---|
| **17/9 19:30** | Khóa nội dung Canvas CP1 (Track B – B2, 7 dòng) | Thống nhất bài toán hỗ trợ TA rà soát Discord cuối ngày dựa trên kết quả khảo sát 22 người. |
| **17/9 20:45** | Xây dựng bản mẫu tương tác CP2 (`codebase/prototype/index.html`) | Đạt tiêu chuẩn CP2: luồng chính bấm thông suốt, có 3 trạng thái và nút ghi đè cho TA. |
| **17/9 21:00** | Hoàn thiện đặc tả luồng UX (§4, §4b, §6) và sơ đồ vector (`codebase/flowchart/user_journey_flow.svg`) | Phủ kín 4 đường trải nghiệm (Happy path, Low-confidence, No-grounding, Correction) và 4 nguyên tắc HAX/PAIR theo đúng hướng dẫn `02-guide.md`. |
