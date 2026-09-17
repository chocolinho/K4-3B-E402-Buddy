# AI Product Specification — Discord Support Review

**Track:** B – B2 · New feature for TA/students on Discord

**Current checkpoint scope:** CP1 problem framing and CP2 clickable mock

**Primary user:** TA/Mod performing end-of-day support review

Related artifacts: [CP1 Canvas](canvas.md) · [Survey evidence](evidence/survey-summary.md) · [Impact table](evidence/impact-table.md) · [CP2 prototype](codebase/README.md) · [Design decisions](docs/decisions.md)

## 1. CP1 Canvas — 7 dòng

| Dòng | Nội dung |
|---|---|
| **1. Track + đề** | Track B – B2: Tính năng mới cho TA/học viên trên Discord, tập trung vào hỗ trợ TA rà soát các vấn đề học viên còn cần xử lý. |
| **2. Job executor** | TA/Mod phụ trách theo dõi Discord vào cuối ngày, cần rà soát các câu hỏi/vấn đề của học viên để xác định nội dung nào còn cần phản hồi. |
| **3. Pain một câu** | TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán, câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, dẫn đến phản hồi chậm và tốn thời gian rà soát thủ công. |
| **4. 1–2 bằng chứng đầu** | Khảo sát 22 người: 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách; 9/22 (40,9%) từng không chắc câu hỏi đã được trả lời hay chưa và 9/22 (40,9%) gặp trường hợp câu hỏi đã được trả lời ở thread/kênh khác. Đồng thời 13/22 (59,1%) mất từ 5 phút trở lên cho một lần rà soát, và 14/22 (63,6%) phải rà soát ít nhất 3 lần/tuần. |
| **5. Lát cắt MỘT CÂU** | Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái `resolved` / `unresolved` / `uncertain` dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ. |
| **6. AI tự làm đến đâu + willing users** | **Conditional automation:** AI tự gom thông tin và đề xuất trạng thái khi có đủ căn cứ; trường hợp mơ hồ, câu hỏi trùng hoặc có thể đã được trả lời ở nơi khác được đánh dấu **Uncertain** để TA duyệt, và hệ thống không tự gửi tin cho học viên. **Willing users:** Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc, Nguyễn Việt Hoàng — ngoài nhóm, đã đồng ý thử prototype. |
| **7. Phân công có tên** | **Nguyễn Đình Thái:** AI decision, prototype, technical feasibility & evaluation · **Vũ Tiến Linh:** survey/data mining & evidence · **Dương Đình Long:** problem framing, `spec.md`, Canvas & UX/validation. |

### Problem / JTBD

Khi rà soát Discord vào cuối ngày, TA/Mod cần xác định câu hỏi hoặc vấn đề nào của học viên vẫn cần hỗ trợ để ưu tiên phản hồi, mà không phải tự ghép lại thông tin phân tán giữa nhiều kênh và thread. Một tin nhắn đơn lẻ thường không đủ để kết luận vì câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác.

## 2. Evidence log

Khảo sát ẩn danh gồm **22 người trả lời**:

| Bằng chứng | Kết quả | Liên hệ với pain |
|---|---:|---|
| Gặp cùng một câu hỏi được hỏi theo nhiều cách | 14/22 (63,6%) | Cần nhóm câu hỏi tương tự để giảm rà soát trùng lặp. |
| Không chắc một câu hỏi đã được trả lời hay chưa | 9/22 (40,9%) | Cần trạng thái có căn cứ và đường dẫn ngữ cảnh. |
| Gặp câu hỏi đã được trả lời ở thread/kênh khác | 9/22 (40,9%) | Không thể chỉ đọc một thread để kết luận. |
| Mất từ 5 phút trở lên cho một lần rà soát | 13/22 (59,1%) | Cho thấy chi phí thời gian của việc rà soát thủ công. |
| Rà soát ít nhất 3 lần/tuần | 14/22 (63,6%) | Pain lặp lại thường xuyên. |
| Trực tiếp hỗ trợ câu hỏi thường xuyên hoặc thỉnh thoảng | 16/22 (72,8%) | Phần lớn mẫu có trải nghiệm với công việc hỗ trợ. |

**Ghi chú riêng tư:** repository chỉ lưu số liệu tổng hợp, ẩn danh; không có email, họ tên, mã học viên hoặc tin nhắn Discord gốc. Không suy diễn thêm số liệu từ các ghi nhận định tính. Xem [survey summary](evidence/survey-summary.md) để biết chi tiết.

## 3. Candidate comparison

| Candidate | Evidence fit | Scope fit | Decision |
|---|---|---|---|
| Detect unresolved questions | Direct evidence of answer uncertainty, cross-thread answers, and repeated review effort | Bounded end-of-day workflow | **Selected main slice** |
| Detect repeated/similar questions | Strong evidence: 14/22 encountered reworded duplicates | Useful retrieval input | **Supporting capability** |
| Detect potentially stuck students proactively | No direct survey frequency supplied | Requires longitudinal monitoring and intervention rules | **Not selected for CP2** |

The detailed rationale is in the [impact table](evidence/impact-table.md).

## 4. Selected pain and product slice

**Selected pain:** TAs cannot reliably see which support issues remain open without repeatedly scanning fragmented Discord conversations.

**One-sentence slice:** A TA at the end of the day needs to identify which Discord student issues are still unresolved, with AI deciding resolved/unresolved/uncertain from related conversation context, to reduce review time and avoid missed support issues.

### Input

- A candidate Discord question.
- Its related thread/context.
- Optionally, related messages or similar-question groups.

Discord messages are treated as untrusted data, not system instructions.

### AI decision contract

```json
{
  "status": "resolved | unresolved | uncertain",
  "reason": "short evidence-grounded explanation",
  "confidence": 0.0,
  "source_reference": "synthetic thread or message reference"
}
```

### Output presented to the TA

- Status and confidence.
- Reason for the recommendation.
- Link to the relevant source/context.
- Manual controls to mark resolved, unresolved, or uncertain.

The public digest must not expose personal identifiers.

## 5. Preliminary automation rationale

The product uses **conditional automation**:

- High confidence with grounded related context → show the AI recommendation.
- Low confidence, ambiguous evidence, or missing context → label **uncertain** and require TA review.
- TA can override every classification; the human decision takes precedence.
- The system never sends a message to a student automatically.
- A TA opens the original thread and responds manually when follow-up is needed.
- Deadline claims are accepted only from official sources.

This boundary saves scanning time without pretending that incomplete conversational evidence is conclusive.

## 6. CP2 behavior and limitations

The CP2 artifact is a static clickable mock. Navigation, filtering, context viewing, summary counts, and manual correction are real browser interactions. Discord ingestion, retrieval, classification, reasons, confidence values, and source references are fixed synthetic data.

The mock makes no network calls and does not run an AI model. See the [flow definition](codebase/flowchart/README.md).

## 7. Preliminary risk cases

The future evaluation must cover reworded duplicates, cross-thread answers, bot/system messages, repeated issues from one sender, ambiguous context, no grounding, out-of-scope questions, and human correction. CP2 includes synthetic examples of the first six; the full plan is listed in [eval/README.md](eval/README.md).

## 8. Human-AI interaction principles

The prototype applies G1 (clear capabilities), G2 (confidence and status), G10 (uncertain when evidence is insufficient), G9 (efficient correction), and G11 (reason plus context). Implementation notes are documented in [design decisions](docs/decisions.md#hax--pair-principles).

## 9. Changelog

- CP1: selected unresolved-question detection as the main product slice based on the initial survey.
- CP2: added a static review dashboard with synthetic cases, context inspection, filtering, and TA override controls.
- Human validation changes: _to be completed after observed usability sessions; do not invent feedback._

## Open items for later checkpoints

- Choose and record the team leader and all student IDs.
- Define and lock the CP4 quality bar before evaluation.
- Implement at least one real AI call for CP3 and disclose its limits.
- Create a versioned synthetic/anonymized golden set and report measured results.
- Run validation with five external users, including at least two CP1 willing users, and record verbatim task-based feedback with consent.
