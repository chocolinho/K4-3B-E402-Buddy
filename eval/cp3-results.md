# Kết quả đo CP3

- Thời điểm (UTC): `2026-09-18T05:03:03.503703+00:00`
- Provider/model: `gemini / gemini-3.5-flash-lite`
- Tổng số case: **20**
- Pass: **19**
- Fail: **1**
- API fallback: **0**
- Pass rate: **95.0%**
- Kết quả hợp lệ để báo cáo: **Có**

> Một run chỉ hợp lệ khi mọi case đều nhận được phản hồi AI thật; fallback không được tính là phép đo AI.

| Case | Failure mode | Expected | Predicted | Kết quả | Confidence |
|---|---|---|---|---|---:|
| cp3-001 | answered elsewhere | resolved | resolved | PASS | 1.00 |
| cp3-002 | answered elsewhere paraphrase | resolved | resolved | PASS | 0.95 |
| cp3-003 | repeated sender unresolved | unresolved | unresolved | PASS | 0.95 |
| cp3-004 | repeated question | unresolved | unresolved | PASS | 0.90 |
| cp3-005 | wrong answer for intent | unresolved | unresolved | PASS | 0.95 |
| cp3-006 | answered elsewhere | resolved | resolved | PASS | 1.00 |
| cp3-007 | response inconsistency | resolved | resolved | PASS | 0.95 |
| cp3-008 | no-grounding official information | unresolved | unresolved | PASS | 0.90 |
| cp3-009 | repeated question unresolved | unresolved | unresolved | PASS | 0.95 |
| cp3-010 | wrong answer for intent | unresolved | unresolved | PASS | 0.95 |
| cp3-011 | ambiguous input | uncertain | uncertain | PASS | 1.00 |
| cp3-012 | missing attachment | uncertain | uncertain | PASS | 1.00 |
| cp3-013 | ambiguous attachment dependent | uncertain | uncertain | PASS | 0.95 |
| cp3-014 | bot message | uncertain | uncertain | PASS | 1.00 |
| cp3-015 | partial answer | unresolved | unresolved | PASS | 0.90 |
| cp3-016 | critical false resolved | unresolved | unresolved | PASS | 0.95 |
| cp3-017 | conflicting answers | uncertain | uncertain | PASS | 0.95 |
| cp3-018 | out-of-scope authority | uncertain | unresolved | FAIL | 0.90 |
| cp3-019 | duplicate intent with misleading wording | resolved | resolved | PASS | 0.95 |
| cp3-020 | reply exists but does not solve issue | unresolved | unresolved | PASS | 0.95 |

## Case sai cần phân tích

### cp3-018

- Expected: `uncertain`
- Predicted: `unresolved`
- Reason: Câu hỏi rõ ràng về deadline nhưng chưa có câu trả lời từ TA, nguồn chính thức hoặc bot tri thức.
- Phân tích của nhóm: Câu hỏi có intent rõ nhưng thông tin “9 giờ” chỉ đến từ một học viên khác, không thuộc TA/BTC hay nguồn chính thức. Model ưu tiên tiêu chí “câu hỏi rõ nhưng chưa có đáp án” nên chọn `unresolved`; product policy của nhóm ưu tiên rủi ro nguồn đối với deadline và yêu cầu `uncertain` để TA/BTC xác minh trước khi hành động. Đây là một lỗi ranh giới policy, không phải API failure. Hướng cải thiện là bổ sung quy tắc: thông tin chính sách/deadline chỉ có từ nguồn ngoài thẩm quyền phải chuyển `uncertain`, dù câu hỏi rõ ràng.

