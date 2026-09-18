# AI SPEC — Rà soát hỗ trợ Discord · Nhóm Buddy · Zone E402

**Hướng:** [ ] A — VLearn · [x] B — Trợ lý Học viên · [ ] C — Làn mở

**Loại:** [ ] Tối ưu tính năng có sẵn · [x] Tính năng mới

**Phiên bản:** CP4 v1.0

**Quality bar được khóa:** 18/09/2026

Sau thời điểm trên, nhóm không sửa quality bar trong §7. Kết quả mới chỉ được bổ sung vào bảng lượt chạy và §9 Changelog.

Tài liệu liên quan: [Canvas CP1](canvas.md) · [Bằng chứng khảo sát](evidence/survey-summary.md) · [Log mining](evidence/mining-summary.md) · [Bảng impact](evidence/impact-table.md) · [Nguồn gốc mock](evidence/mock-case-provenance.md) · [Prototype](codebase/README.md) · [Golden set](eval/golden-set.json) · [Kết quả CP3](eval/cp3-results.md)

## §1. User & Job

### Job executor + workflow

**Job executor:** TA/Mod phụ trách theo dõi Discord vào cuối ngày.

**Workflow hiện tại:** đọc các kênh và luồng thảo luận → tự ghép các tin nhắn liên quan → xác định câu hỏi đã được giải quyết hay chưa → ưu tiên nội dung còn mở → tự phản hồi trong Discord.

Worksheet và bằng chứng liên quan: [Canvas 7 dòng](canvas.md), [tóm tắt khảo sát](evidence/survey-summary.md) và [flow rà soát](codebase/flowchart/README.md).

### Core JTBD

Khi rà soát Discord cuối ngày, TA/Mod cần xác định câu hỏi hoặc vấn đề nào vẫn cần hỗ trợ để ưu tiên phản hồi mà không phải tự ghép lại thông tin phân tán giữa nhiều kênh và luồng thảo luận.

### Problem statement

TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ vì câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, khiến việc rà soát thủ công chậm và dễ bỏ sót.

### Evidence

Khảo sát ẩn danh có **n = 22**:

| Bằng chứng định lượng | Kết quả | Ý nghĩa |
|---|---:|---|
| Gặp cùng một câu hỏi được hỏi theo nhiều cách | 14/22 (63,6%) | Cần nối các câu hỏi cùng ý định. |
| Không chắc câu hỏi đã được trả lời hay chưa | 9/22 (40,9%) | Cần trạng thái kèm căn cứ. |
| Gặp câu trả lời ở luồng/kênh khác | 9/22 (40,9%) | Không thể kết luận từ một tin nhắn đơn lẻ. |
| Mất ít nhất 5 phút cho mỗi lần rà soát | 13/22 (59,1%) | Mỗi lần rà soát có chi phí thời gian đáng kể. |
| Rà soát ít nhất 3 lần/tuần | 14/22 (63,6%) | Nỗi đau lặp lại thường xuyên. |
| Trực tiếp hỗ trợ thường xuyên hoặc thỉnh thoảng | 16/22 (72,8%) | Phần lớn mẫu có trải nghiệm với công việc hỗ trợ. |

**Ví dụ nguyên văn đã ẩn danh/giả lập dùng trong prototype:** đây là ví dụ tình huống, không phải quote phỏng vấn và không được trình bày như lời người dùng thật.

| Ví dụ | Failure pattern | Nguồn trong repo |
|---|---|---|
| “Xem XP ở đâu?” | Đáp án có thể nằm ở luồng khác | `q-201` trong `codebase/prototype/script.js` |
| “Hạn nộp daily stand-up là khi nào?” | Câu hỏi lặp đã có đáp án | `q-202` |
| “Cách nộp daily stand-up như thế nào?” | Có phản hồi nhưng sai intent | `q-206` |
| “Hạn nộp Lab02 là khi nào?” | Không có nguồn deadline đủ thẩm quyền | `q-207` |
| “Em chạy tới bước 3 thì bị lỗi như này ạ.” | Phụ thuộc attachment bị thiếu | `q-209` |
| “Có thể tra XP bằng Discord ID hoặc xem lịch sử bằng lệnh /rank.” | Tin nhắn bot bị nhận nhầm là câu hỏi | `q-210` |

**Giới hạn của Evidence A:** repo chỉ có số tổng hợp khảo sát, chưa có log từng câu trả lời nguyên văn nên không tự nhận đạt chuẩn A. Nhóm dùng Evidence B bên dưới làm bằng chứng chấm R1. Quote quan sát sản phẩm là bằng chứng validation riêng và chỉ được bổ sung sau buổi thử thật trong [`validation/cp5-ui-test-log.md`](validation/cp5-ui-test-log.md).

### Evidence B — mining kiểm lại được

Script [`evidence/analyze_messages.py`](evidence/analyze_messages.py) đếm trên file nguồn cục bộ mà không xuất raw chat. Kết quả: 1.092 message, 264 candidate question theo heuristic công khai, 209 candidate có direct reply, 27 message chứa tổng 29 attachment. [`evidence/mining-summary.md`](evidence/mining-summary.md) lưu phương pháp, lệnh chạy lại và 6 trích dẫn nguyên văn một câu đã ẩn danh. File CSV không nằm trong repo.

## §2. Impact & quyết định chọn

| Ứng viên | Bao nhiêu người | Tần suất | Tốn gì mỗi lần | Khả thi trong hackathon | Quyết định |
|---|---:|---|---|---|---|
| A. Phát hiện câu hỏi chưa được xử lý | 9/22 không chắc trạng thái; 9/22 gặp đáp án ở luồng khác | 14/22 rà soát ≥3 lần/tuần | 13/22 mất ≥5 phút/lần; thêm rủi ro bỏ sót | Cao với ba trạng thái và human review | **Chọn** |
| B. Nhóm câu hỏi trùng/tương tự | 14/22 (63,6%) gặp cùng ý định khác cách diễn đạt | Xuất hiện phổ biến trong mẫu | Đọc và trả lời trùng lặp | Trung bình–cao; phù hợp làm bước hỗ trợ truy xuất | **Không chọn làm lát cắt chính** |
| C. Chủ động phát hiện học viên bế tắc | Chưa có số đo trực tiếp | Chưa xác định | Có thể cao nhưng chưa đo được | Thấp hơn; cần dữ liệu theo thời gian và policy can thiệp | **Loại** |

- **Ứng viên đã loại C:** bằng chứng yếu, phạm vi rộng và rủi ro quyền riêng tư/can thiệp cao hơn.
- **Ứng viên B không phải sản phẩm chính:** 14/22 xác nhận pain câu hỏi lặp, nhưng chỉ gom nhóm chưa trả lời được việc nào còn cần TA hỗ trợ.
- **Ứng viên A được chọn:** kết hợp bằng chứng 9/22 không chắc trạng thái, 9/22 gặp đáp án ở nơi khác, 13/22 mất ít nhất 5 phút/lần và 14/22 phải làm ít nhất 3 lần/tuần.

Chi tiết: [bảng impact](evidence/impact-table.md).

## §3. Giải pháp tương tự đã nghiên cứu

| Giải pháp | Flow/khả năng liên quan | Đáng học | Đáng né/khoảng trống | Buddy khác gì |
|---|---|---|---|---|
| [Discord Forum Channels](https://support.discord.com/hc/en-us/articles/6208479917079-Forum-Channels-FAQ) | Tổ chức thảo luận thành post; tìm kiếm và lọc bằng tag | Cấu trúc danh sách, tag và search giúp giảm việc nội dung bị chôn | Tag vẫn cần người gắn/duy trì; không tự đối chiếu hội thoại để kết luận đã xử lý | Giữ nguyên nguồn chat nhưng đề xuất ba trạng thái dựa trên ngữ cảnh liên quan và cho TA sửa. |
| [Discord AutoMod](https://support.discord.com/hc/en-us/articles/4421269296535-AutoMod-FAQ) | Luật keyword/spam phát hiện, chặn hoặc cảnh báo moderator | Có rule rõ, alert riêng và cho phép moderator kiểm soát | Tự động chặn phù hợp moderation nhưng cost-of-error quá cao cho hỗ trợ học tập; không xác định câu hỏi đã được giải đáp | Buddy không chặn/gửi tin; chỉ ưu tiên hàng đợi và chuyển case thiếu căn cứ cho TA. |

Phạm vi nghiên cứu ở đây là **benchmark chức năng từ tài liệu sản phẩm**, chưa phải nghiên cứu người dùng của hai giải pháp.

## §4. Thiết kế

### Lát cắt MỘT CÂU

Một TA cuối ngày cần xác định vấn đề Discord nào vẫn cần hỗ trợ; hệ thống phân loại `resolved`, `unresolved` hoặc `uncertain` từ hội thoại liên quan để TA ưu tiên và chốt quyết định cuối cùng.

### Non-goals

- Không tự động gửi câu trả lời hoặc đóng câu hỏi.
- Không thay TA/BTC xác nhận deadline, điểm số hay chính sách.
- Không giám sát toàn bộ hành vi học viên để suy đoán ai đang bế tắc.
- Không tự động ingest toàn bộ Discord API/webhook trong prototype.
- Không xây hệ thống đăng nhập, phân quyền, cơ sở dữ liệu hoặc production deployment.
- Không coi `confidence` là xác suất đã được hiệu chỉnh thống kê.

### Mức prototype

**[ ] Sketch · [ ] Mock · [x] Working slice**

| Thành phần | Mock hay thật? |
|---|---|
| 20 hội thoại và nguồn hiển thị | Mock được tổng hợp/ẩn danh từ failure pattern trong data pack; không chứa CSV gốc |
| Nhận dữ liệu trực tiếp từ Discord | Chưa làm |
| Nút **Phân tích bằng AI** | Thật — gọi backend cục bộ và Gemini API |
| Structured output, policy confidence, fallback | Thật |
| Tìm kiếm, lọc, side panel, TA override, audit trail | Thật trong trình duyệt |
| Mở luồng Discord gốc, gửi phản hồi | Không làm |

### Input và output của quyết định AI

```json
{
  "question": "...",
  "thread_context": ["..."],
  "related_messages": ["..."]
}
```

```json
{
  "status": "resolved | unresolved | uncertain",
  "confidence": 0.92,
  "reason": "Giải thích ngắn dựa trên bằng chứng",
  "source_reference": "thread/message giả lập"
}
```

Nội dung tin nhắn luôn được coi là dữ liệu không đáng tin cậy, không phải chỉ dẫn cho hệ thống.

### Automation và cost-of-error

**[ ] augment · [x] conditional · [ ] automate hoàn toàn**

- Có căn cứ phù hợp và confidence đủ cao → AI đề xuất trạng thái để TA kiểm tra.
- Confidence thấp, nguồn thiếu/thấp thẩm quyền, attachment thiếu hoặc bằng chứng mâu thuẫn → `uncertain`.
- API lỗi → fallback `uncertain`; fallback không được tính là kết quả AI thật.
- Cost của false `resolved` là bỏ sót người cần hỗ trợ, nên hệ thống không tự gửi tin/đóng case và TA có thể sửa mọi kết luận.

### §4b. Nguyên tắc HAX/PAIR đã áp dụng

| Nguyên tắc | Áp cụ thể trong prototype |
|---|---|
| G1 — Nói rõ hệ thống làm được gì | Header ghi “AI đề xuất · TA quyết định”; giao diện nói rõ không gửi tin tự động. |
| G2 — Nói rõ hệ thống làm tốt đến đâu | Hiển thị confidence, nhãn cao/trung bình/thấp và hướng dẫn hành động. |
| G9 — Hỗ trợ sửa nhanh | TA xác nhận/ghi đè ba trạng thái và có thể hoàn tác. |
| G10 — Thu hẹp phạm vi khi chưa chắc chắn | Thiếu căn cứ, confidence thấp hoặc fallback đều chuyển `uncertain`. |
| G11 — Giải thích lý do | Side panel hiển thị reason, nguồn, policy và highlight đoạn hội thoại làm bằng chứng. |
| Human control/auditability | Lưu lịch sử AI phân tích, TA xác nhận, ghi đè và hoàn tác trong phiên. |

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản

Taxonomy dùng xuyên suốt spec và golden set:

- **① Failure/không có căn cứ:** có reply nhưng không giải quyết, thiếu grounding hoặc bằng chứng mâu thuẫn.
- **② Low-confidence/mơ hồ:** intent, ngữ cảnh hoặc attachment không đủ để kết luận chắc chắn.
- **③ Ngoài phạm vi/thẩm quyền:** input không phải yêu cầu hỗ trợ hoặc đòi quyết định mà hệ thống không có quyền đưa ra.
- **④ Case đặc thù domain:** cần nối đúng intent, luồng và quy tắc nghiệp vụ Discord/XP/ticket/Zoom.

| Lớp chỗ khó | Kịch bản/failure mode | Rủi ro | Expected behavior | Case kiểm thử |
|---|---|---|---|---|
| ① Failure/no-grounding | Có phản hồi nhưng sai intent | False `resolved` | `unresolved` | cp3-005, cp3-020 |
| ① Failure/no-grounding | Câu trả lời chỉ giải quyết một phần | Bỏ sót nửa còn lại | `unresolved` | cp3-015, cp3-016 |
| ① Failure/no-grounding | Không có grounding hoặc hai nguồn mâu thuẫn | Bịa/chọn nhầm thông tin | `unresolved` hoặc `uncertain`; không `resolved` | cp3-008, cp3-017 |
| ② Low-confidence/mơ hồ | Câu hỏi đứng riêng, thiếu intent | AI tự suy đoán | `uncertain` | cp3-011 |
| ② Low-confidence/mơ hồ | Nội dung phụ thuộc attachment bị thiếu | Kết luận từ dữ liệu không tồn tại | `uncertain` | cp3-012, cp3-013 |
| ② Low-confidence/mơ hồ | Câu hỏi lặp/repeated sender nhưng chưa có đáp án | Nhầm số lần hỏi với đã xử lý | Đối chiếu ngữ cảnh; giữ `unresolved` | cp3-003, cp3-004, cp3-009 |
| ③ Ngoài phạm vi/thẩm quyền | Tin nhắn bot/system bị nhận là yêu cầu mới | Tạo việc giả cho TA | `uncertain`/bỏ qua | cp3-014 |
| ③ Ngoài phạm vi/thẩm quyền | Deadline chỉ đến từ học viên khác | Dùng nguồn sai thẩm quyền | `uncertain` để TA/BTC xác minh | cp3-018 |
| ④ Domain-specific | Đáp án nằm ở luồng khác | False `unresolved` | `resolved` kèm nguồn | cp3-001, cp3-002, cp3-006 |
| ④ Domain-specific | Wording XP/rank hoặc ticket khác nhau | Bỏ lỡ intent tương đương | Nối đúng intent và nguồn | cp3-007, cp3-019 |
| ④ Domain-specific | Zoom/attendance cần quy trình khắc phục, không chỉ quy định chung | False `resolved` | `unresolved` nếu hậu quả chưa được xử lý | cp3-010, cp3-020 |
| Cross-cutting | Model trả `resolved` dưới ngưỡng hoặc API lỗi | Tự động hóa quá mức | Ép `uncertain`; gắn nhãn Fallback | unit tests policy/fallback |

## §6. Bốn đường đi của trải nghiệm

### Happy path

TA mở hàng đợi → chọn case → xem hội thoại/nguồn → gọi AI thật → nhận trạng thái, reason, confidence và source → TA xác nhận → audit trail ghi nhận. Ví dụ: đáp án tồn tại ở luồng khác và có nguồn phù hợp.

### Low-confidence (②)

AI trả confidence thấp hoặc bằng chứng mơ hồ → policy chuyển/giữ `uncertain` → giao diện ghi “Tin cậy thấp — chuyển TA kiểm tra” → TA xem ngữ cảnh và chốt thủ công. Hệ thống không tự gửi tin.

### Failure/không có căn cứ (①)

Không có nguồn, thiếu attachment hoặc API lỗi → hiển thị `uncertain`/Fallback → nói rõ đây chưa phải kết quả AI thật → TA có thể tìm thêm dữ liệu hoặc giữ case trong hàng đợi.

### Correction — user sửa

TA chọn trạng thái khác đề xuất AI → badge “TA ghi đè” xuất hiện → dashboard cập nhật override rate → audit lưu trước/sau → TA có thể hoàn tác. Quyết định của con người luôn được ưu tiên.

### Khi bị đòi ngoài phạm vi (③)

Nếu người dùng yêu cầu AI tự trả lời học viên, xác nhận deadline hoặc đóng ticket, hệ thống không thực hiện; chỉ cung cấp triage và chuyển TA/BTC tới nguồn chính thức.

### Case đặc thù domain (④)

Deadline, điểm số, quy chế và thông báo chỉ được `resolved` khi nguồn thuộc TA/BTC/bot tri thức/kênh chính thức. Nguồn cộng đồng dù có câu trả lời cụ thể vẫn phải chuyển `uncertain` để xác minh.

## §7. Kiểm thử

### Chiều chất lượng và định nghĩa kiểm chứng được

| Chiều chất lượng | Định nghĩa đạt |
|---|---|
| Đúng trạng thái | `status` khớp nhãn frozen của golden set. |
| Structured output | Có đủ `status`, `confidence`, `reason`, `source_reference`; status thuộc ba giá trị hợp lệ. |
| Grounding | Mọi `resolved` có `source_reference` không rỗng và reason dựa trên input. |
| Safety/policy | Không `resolved` khi thiếu nguồn, sai thẩm quyền, thiếu attachment hoặc confidence thấp. |
| Reliability | Run chính thức có 0 fallback; fallback không tính là kết quả AI. |
| Human control | TA có thể xác nhận, ghi đè và hoàn tác; hệ thống không gửi tin tự động. |
| Usability | Ít nhất 4/5 người ngoài nhóm hoàn thành một lượt rà soát không cần hướng dẫn. |

### Golden set

[`eval/golden-set.json`](eval/golden-set.json) có **20 case** đã gắn nhãn: 5 `resolved`, 9 `unresolved`, 6 `uncertain`. Metadata chứng minh coverage: ① 6 case, ② 7 case, ③ 2 case, ④ 5 case; 10 case thường, 7 case khó, 3 case hiếm; 15 case có nguồn từ pattern/chatlog thật đã ẩn danh và 5 case tổng hợp để thử policy ở biên. Bộ test bao phủ answered elsewhere, repeated question/sender, wrong intent, bot message, missing attachment, ambiguous input, conflicting answers, partial answer, no-grounding và source authority.

### Quality bar — đã khóa tại CP4, không thay đổi sau 08:22 ngày 18/09/2026

Buddy chỉ được xem là đạt phiên bản thử nghiệm khi đồng thời thỏa mãn:

1. AI nhận `question`, `thread_context`, `related_messages`.
2. Output có đủ `status`, `confidence`, `reason`, `source_reference`; status chỉ là `resolved`, `unresolved`, `uncertain`.
3. Trên golden set cố định 20 case: **ít nhất 17/20 (≥85%)** khớp nhãn và **0 API fallback** trong run dùng làm kết quả chính thức.
4. Không tự đánh dấu `resolved` nếu không có nguồn, nguồn không đủ thẩm quyền, thiếu dữ liệu/attachment quan trọng hoặc confidence thấp; các case này phải cần TA kiểm tra.
5. Mọi `resolved` có `source_reference` không rỗng, reason dựa trên input và đủ thông tin để TA kiểm tra lại.
6. TA/Mod sửa được mọi kết quả; hệ thống không tự gửi câu trả lời hoặc đóng câu hỏi.
7. Không commit API key, dữ liệu Discord thô hoặc thông tin nhận dạng cá nhân lên repo public.
8. Trong validation tiếp theo, ít nhất **4/5 người ngoài nhóm** hoàn thành luồng kiểm tra một câu hỏi mà không cần hướng dẫn.

### Kết quả các lượt chạy

| Lượt | Model | Tổng | Pass | Fail | Fallback | Pass rate | Hợp lệ? |
|---|---|---:|---:|---:|---:|---:|---|
| Baseline · `20260918-110517` | Gemini 3.5 Flash-Lite | 20 | 14 | 6 | 0 | 70% | Có |
| Final CP3 · `20260918-120303` | Gemini 3.5 Flash-Lite | 20 | 19 | 1 | 0 | 95% | Có |

**Kết luận kỹ thuật:** final run vượt ngưỡng 85% và có 0 fallback. Failure duy nhất là `cp3-018`: model chọn `unresolved`, trong khi product policy yêu cầu `uncertain` vì thông tin deadline chỉ đến từ nguồn cộng đồng.

**Kết luận usability:** chưa được xác nhận; validation 5 người vẫn đang chờ thực hiện. Vì quality bar gồm cả tiêu chí 4/5, nhóm chưa tuyên bố toàn bộ sản phẩm đã đạt cho đến khi có log thật.

Artifacts: [báo cáo CP3](eval/cp3-results.md) · [baseline run](runs/cp3-eval-20260918-110517.json) · [final run](runs/cp3-eval-20260918-120303.json) · [trace](runs/cp3-trace.jsonl).

## §8. Phân công & kế hoạch

### Phân công có tên

| Thành viên | Mã học viên | Trách nhiệm |
|---|---|---|
| Nguyễn Đình Thái | 2A202602718 | AI decision, prompt, backend/API, prototype, eval và demo kỹ thuật |
| Vũ Tiến Linh | 2A202602657 | Khảo sát, mining, evidence, case dữ liệu và rà soát golden set |
| Dương Đình Long | 2A202602474 | Problem framing, `spec.md`, product behavior, UI/UX và validation |

### Willing users và kế hoạch validation

Willing users ngoài nhóm đã khai từ CP1: **Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc, Nguyễn Việt Hoàng**.

- Mời 5 người ngoài nhóm, trong đó ít nhất 2 người thuộc danh sách trên.
- Giao cùng một task: “Hãy tìm một câu hỏi còn cần hỗ trợ, xem căn cứ của AI và đưa ra quyết định cuối cùng như một TA.”
- Không chỉ vị trí nút; ghi hoàn thành/không, thời gian, điểm kẹt, quote nguyên văn và hiểu sai về AI/nguồn/confidence.
- Ghi kết quả thật vào [`validation/cp5-ui-test-log.md`](validation/cp5-ui-test-log.md).

### Multi-prototype

Nhóm **không làm nhiều prototype độc lập**. Nhóm chọn một working slice để ưu tiên AI call thật, safety policy, đo lường và human control; các thay đổi UI là iteration trên cùng flow, không được trình bày như A/B test.

### Tự khai phần chưa hoàn thành

- Chưa tích hợp Discord API/webhook hoặc truy xuất tự động toàn server.
- Chưa có login, role-based access, database, production deployment hay security/privacy review ở mức production.
- Chưa hoàn thành validation 5 người và chưa có quote observation thật.
- `confidence` chưa được calibration thống kê.
- Kết quả 95% chỉ phản ánh challenge set 20 case, không đại diện accuracy production.
- Không tự gửi tin/đóng case là ranh giới có chủ đích, không phải lỗi còn thiếu.

## §9. Changelog

| Thời điểm | Đổi gì | Vì sao / bằng chứng |
|---|---|---|
| CP1 · 17/09/2026 | Chọn TA/Mod rà soát cuối ngày và lát cắt câu hỏi chưa xử lý | Khảo sát n=22: 9/22 không chắc trạng thái; 13/22 mất ≥5 phút/lần. |
| CP2 · 17/09/2026 | Tạo prototype bấm được với ba trạng thái, ngữ cảnh và TA override | Đối chiếu flow với pain câu hỏi lặp, đáp án ở nơi khác và thiếu ngữ cảnh. |
| CP3 baseline · 18/09/2026 | Thay mock decision bằng Gemini API, structured output, trace và fallback | Baseline 14/20 (70%), 0 fallback; dùng failure để sửa prompt/policy. |
| CP3 final · 18/09/2026 | Chạy lại cùng golden set | 19/20 (95%), 0 fallback; còn lỗi source authority `cp3-018`. |
| CP4 lock · 18/09/2026 08:22 | Khóa quality bar tại ≥17/20, 0 fallback, safety/human-control và usability 4/5 | Chuẩn được giữ nguyên sau thời điểm khóa. |
| Sau CP4 · 18/09/2026 | Nâng cấp UI: hàng đợi ưu tiên, confidence guidance, source trust, side panel, audit, keyboard và dashboard phiên | Sửa các vấn đề quét thông tin và làm rõ AI/TA trong kế hoạch UI/UX; **chưa** tuyên bố đã được user validation. |
| Chờ validation | Bổ sung kết quả 5 người và ít nhất một quyết định thay đổi/giữ nguyên | Chỉ điền từ log thật; không tự tạo feedback. |
