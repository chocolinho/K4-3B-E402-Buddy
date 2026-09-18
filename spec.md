# Đặc tả sản phẩm AI — Rà soát hỗ trợ trên Discord

**Nhánh:** B – B2 · Tính năng mới cho TA/học viên trên Discord

**Phiên bản:** CP4 v1.0

**Phạm vi hiện tại:** Chốt đặc tả sản phẩm, chuẩn đạt và các giới hạn đã biết.

**Thời điểm khóa chuẩn đạt:** 18/09/2026 lúc 08:22 (Asia/Ho_Chi_Minh)

Sau thời điểm trên, nhóm không sửa mục “Chuẩn đạt đã khóa”.
Kết quả thử nghiệm mới chỉ được bổ sung vào nhật ký đánh giá.

**Người dùng chính:** TA/Mod rà soát hỗ trợ vào cuối ngày

Tài liệu liên quan: [Khung ý tưởng CP1](canvas.md) · [Bằng chứng khảo sát](evidence/survey-summary.md) · [Bảng so sánh tác động](evidence/impact-table.md) · [Kiểm tra flow với pain survey](evidence/flow-validation.md) · [Bản mẫu CP2](codebase/README.md) · [Quyết định thiết kế](docs/decisions.md)

## 1. Khung ý tưởng CP1 — 7 dòng

| Dòng | Nội dung |
|---|---|
| **1. Nhánh + đề** | Nhánh B – B2: Tính năng mới cho TA/học viên trên Discord, tập trung vào hỗ trợ TA rà soát các vấn đề học viên còn cần xử lý. |
| **2. Người thực hiện công việc** | TA/Mod phụ trách theo dõi Discord vào cuối ngày, cần rà soát các câu hỏi/vấn đề của học viên để xác định nội dung nào còn cần phản hồi. |
| **3. Nỗi đau trong một câu** | TA/Mod khó theo dõi và ưu tiên các vấn đề học viên cần hỗ trợ trên Discord vì thông tin phân tán, câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác, dẫn đến phản hồi chậm và tốn thời gian rà soát thủ công. |
| **4. 1–2 bằng chứng đầu** | Khảo sát 22 người: 14/22 (63,6%) từng gặp cùng một câu hỏi được hỏi theo nhiều cách; 9/22 (40,9%) từng không chắc câu hỏi đã được trả lời hay chưa và 9/22 (40,9%) gặp trường hợp câu hỏi đã được trả lời ở luồng thảo luận/kênh khác. Đồng thời 13/22 (59,1%) mất từ 5 phút trở lên cho một lần rà soát, và 14/22 (63,6%) phải rà soát ít nhất 3 lần/tuần. |
| **5. Lát cắt MỘT CÂU** | Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`) dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót câu hỏi cần hỗ trợ. |
| **6. Mức độ AI tự làm + người dùng sẵn sàng thử** | **Tự động hóa có điều kiện:** AI tự gom thông tin và đề xuất trạng thái khi có đủ căn cứ; trường hợp mơ hồ, câu hỏi trùng hoặc có thể đã được trả lời ở nơi khác được đánh dấu **chưa chắc chắn (`uncertain`)** để TA duyệt. Hệ thống không tự gửi tin cho học viên. **Người dùng sẵn sàng thử:** Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc, Nguyễn Việt Hoàng — ngoài nhóm, đã đồng ý thử bản mẫu. |
| **7. Phân công có tên** | **Nguyễn Đình Thái:** quyết định của AI, bản mẫu, tính khả thi kỹ thuật và đánh giá · **Vũ Tiến Linh:** khảo sát, khai thác dữ liệu và bằng chứng · **Dương Đình Long:** xác định vấn đề, `spec.md`, khung ý tưởng, trải nghiệm người dùng và kiểm chứng. |

### Vấn đề / Công việc cần hoàn thành (JTBD)

Khi rà soát Discord vào cuối ngày, TA/Mod cần xác định câu hỏi hoặc vấn đề nào của học viên vẫn cần hỗ trợ để ưu tiên phản hồi, mà không phải tự ghép lại thông tin phân tán giữa nhiều kênh và luồng thảo luận. Một tin nhắn đơn lẻ thường không đủ để kết luận vì câu hỏi có thể bị lặp, bị bỏ sót hoặc đã được trả lời ở nơi khác.

## 2. Nhật ký bằng chứng

Khảo sát ẩn danh gồm **22 người trả lời**:

| Bằng chứng | Kết quả | Liên hệ với nỗi đau |
|---|---:|---|
| Gặp cùng một câu hỏi được hỏi theo nhiều cách | 14/22 (63,6%) | Cần nhóm câu hỏi tương tự để giảm rà soát trùng lặp. |
| Không chắc một câu hỏi đã được trả lời hay chưa | 9/22 (40,9%) | Cần trạng thái có căn cứ và đường dẫn ngữ cảnh. |
| Gặp câu hỏi đã được trả lời ở luồng thảo luận/kênh khác | 9/22 (40,9%) | Không thể chỉ đọc một luồng thảo luận để kết luận. |
| Mất từ 5 phút trở lên cho một lần rà soát | 13/22 (59,1%) | Cho thấy chi phí thời gian của việc rà soát thủ công. |
| Rà soát ít nhất 3 lần/tuần | 14/22 (63,6%) | Nỗi đau lặp lại thường xuyên. |
| Trực tiếp hỗ trợ câu hỏi thường xuyên hoặc thỉnh thoảng | 16/22 (72,8%) | Phần lớn mẫu có trải nghiệm với công việc hỗ trợ. |

**Ghi chú riêng tư:** kho mã chỉ lưu số liệu tổng hợp, ẩn danh; không có email, họ tên, mã học viên hoặc tin nhắn Discord gốc. Không suy diễn thêm số liệu từ các ghi nhận định tính. Xem [tóm tắt khảo sát](evidence/survey-summary.md) để biết chi tiết.

## 3. So sánh các vấn đề ứng viên

| Vấn đề ứng viên | Mức phù hợp của bằng chứng | Mức phù hợp của phạm vi | Quyết định |
|---|---|---|---|
| Phát hiện câu hỏi chưa được xử lý | Có bằng chứng trực tiếp về sự không chắc chắn, câu trả lời ở luồng khác và công sức rà soát lặp lại | Quy trình cuối ngày có phạm vi rõ | **Chọn làm lát cắt chính** |
| Phát hiện câu hỏi lặp/tương tự | Bằng chứng mạnh: 14/22 gặp câu hỏi trùng ý nhưng khác cách diễn đạt | Dữ liệu đầu vào hữu ích cho việc truy xuất | **Khả năng hỗ trợ** |
| Chủ động phát hiện học viên có thể đang bế tắc | Chưa có số liệu tần suất trực tiếp | Cần theo dõi theo thời gian và quy tắc can thiệp | **Không chọn cho CP2** |

Lý do chi tiết nằm trong [bảng so sánh tác động](evidence/impact-table.md).

## 4. Nỗi đau được chọn và lát cắt sản phẩm

**Nỗi đau được chọn:** TA không thể biết chắc vấn đề hỗ trợ nào vẫn còn mở nếu không liên tục rà soát các hội thoại Discord phân tán.

**Lát cắt trong một câu:** Một TA cuối ngày cần xác định những vấn đề học viên nào trên Discord vẫn chưa được xử lý, được AI quyết định trạng thái đã xử lý (`resolved`), chưa xử lý (`unresolved`) hoặc chưa chắc chắn (`uncertain`) dựa trên hội thoại liên quan, để giảm thời gian rà soát và hạn chế bỏ sót vấn đề cần hỗ trợ.

### Dữ liệu đầu vào

- Một câu hỏi Discord ứng viên.
- Luồng thảo luận/ngữ cảnh liên quan.
- Tùy chọn: các tin nhắn liên quan hoặc nhóm câu hỏi tương tự.

Tin nhắn Discord được coi là dữ liệu không đáng tin cậy, không phải chỉ dẫn cho hệ thống.

### Cấu trúc quyết định của AI

```json
{
  "status": "resolved | unresolved | uncertain",
  "reason": "giải thích ngắn gọn dựa trên bằng chứng",
  "confidence": 0.0,
  "source_reference": "tham chiếu đến luồng hoặc tin nhắn giả lập"
}
```

Ý nghĩa các trường kỹ thuật: `status` là trạng thái, `reason` là lý do, `confidence` là độ tin cậy và `source_reference` là nguồn tham chiếu.

### Kết quả hiển thị cho TA

- Trạng thái và độ tin cậy.
- Lý do của đề xuất.
- Liên kết đến nguồn/ngữ cảnh liên quan.
- Nút để TA tự đánh dấu đã xử lý, chưa xử lý hoặc chưa chắc chắn.

Bản tổng hợp công khai không được để lộ thông tin nhận dạng cá nhân.

## 5. Lý do sơ bộ cho mức độ tự động hóa

Sản phẩm sử dụng **tự động hóa có điều kiện**:

- Độ tin cậy cao và có ngữ cảnh làm căn cứ → hiển thị đề xuất của AI.
- Độ tin cậy thấp, bằng chứng mơ hồ hoặc thiếu ngữ cảnh → đánh dấu **chưa chắc chắn (`uncertain`)** và yêu cầu TA kiểm tra.
- TA có thể sửa mọi phân loại; quyết định của con người được ưu tiên.
- Hệ thống không bao giờ tự động gửi tin nhắn cho học viên.
- Khi cần hỗ trợ tiếp, TA mở luồng thảo luận gốc và tự phản hồi.
- Thông tin về hạn nộp chỉ được lấy từ nguồn chính thức.

Ranh giới này giúp giảm thời gian rà soát mà không giả định rằng bằng chứng hội thoại chưa đầy đủ là kết luận chắc chắn.

## 6. Hoạt động và giới hạn của prototype hiện tại

Prototype cho phép điều hướng, lọc danh sách, xem ngữ cảnh, đếm trạng thái và sửa thủ công ngay trên trình duyệt. Mười tình huống hiển thị là dữ liệu giả lập/đã ẩn danh; hệ thống chưa tự nhận dữ liệu trực tiếp từ Discord và chưa tự truy xuất hội thoại trên toàn server.

Từ CP3, nút **Phân tích bằng AI** gọi backend cục bộ và Gemini API thật. Kết quả trả về gồm trạng thái, lý do, độ tin cậy và nguồn tham chiếu; khi API lỗi, hệ thống trả fallback `uncertain` để TA kiểm tra. Các quyết định ban đầu trước khi bấm phân tích vẫn là mock để phục vụ demo. Xem [định nghĩa luồng hoạt động](codebase/flowchart/README.md) và [hướng dẫn AI](codebase/ai/README.md).

## 7. Các trường hợp rủi ro và đánh giá

Challenge set CP3 bao phủ: câu hỏi trùng ý nhưng khác cách diễn đạt, câu trả lời ở luồng khác, tin nhắn từ bot/hệ thống, vấn đề được cùng một người gửi lặp lại, ngữ cảnh mơ hồ, không có căn cứ, câu hỏi ngoài phạm vi và nguồn không đủ thẩm quyền. Lượt chạy chính thức đạt 19/20 case, fallback 0; failure còn lại là trường hợp AI chấp nhận nguồn cộng đồng cho thông tin deadline trong khi policy yêu cầu nguồn chính thức. Chi tiết nằm trong [báo cáo CP3](eval/cp3-results.md) và [tài liệu đánh giá](eval/README.md).

## 8. Nguyên tắc tương tác giữa con người và AI

Bản mẫu áp dụng G1 (nói rõ hệ thống làm được gì), G2 (hiển thị độ tin cậy và trạng thái), G10 (chọn trạng thái chưa chắc chắn khi thiếu bằng chứng), G9 (hỗ trợ sửa nhanh) và G11 (giải thích lý do kèm ngữ cảnh). Chi tiết triển khai nằm trong [quyết định thiết kế](docs/decisions.md#nguyên-tắc-hax--pair).

## 9. Nhật ký thay đổi

- CP1: chọn phát hiện câu hỏi chưa được xử lý làm lát cắt chính dựa trên khảo sát ban đầu.
- CP2: thêm bảng rà soát tĩnh với tình huống giả lập, xem ngữ cảnh, lọc danh sách và nút để TA sửa trạng thái.
- CP2: đối chiếu flow prototype với các pain đã ghi nhận trong khảo sát; xác nhận đây mới là bằng chứng từ mock, chưa phải kết quả user test hoặc đo lường AI thật.
- CP3: hoàn thành backend AI với structured output, trace input/output, fallback `uncertain` và human-in-the-loop. Challenge set chính thức chạy bằng Gemini 3.5 Flash-Lite đạt 19/20 case (95%), API fallback 0; một failure thuộc ranh giới thẩm quyền nguồn đối với deadline và đã được phân tích trong `eval/cp3-results.md`.
- CP4: khóa chuẩn đạt tại mục 10 và tự khai các giới hạn tại mục 11. Sau khi khóa, nâng cấp UI/UX của prototype với hàng đợi ưu tiên, side panel bằng chứng, nhãn độ tin cậy nguồn, audit trail, phím tắt và dashboard phiên; chưa ghi nhận đây là thay đổi đã được người dùng xác nhận.
- Thay đổi sau kiểm chứng với người dùng: _chỉ bổ sung sau các buổi quan sát sử dụng; không tự tạo phản hồi._

## 10. Chuẩn đạt đã khóa cho CP4

Buddy được xem là đạt phiên bản thử nghiệm khi đồng thời thỏa mãn:

1. AI nhận được `question`, `thread_context` và `related_messages`.

2. Mọi kết quả hợp lệ phải có đủ:
   - `status`
   - `confidence`
   - `reason`
   - `source_reference`

3. `status` chỉ được thuộc một trong ba giá trị:
   - `resolved`
   - `unresolved`
   - `uncertain`

4. Trên bộ challenge set cố định gồm 20 trường hợp:
   - tối thiểu 17/20 trường hợp khớp nhãn kỳ vọng;
   - pass rate tối thiểu 85%;
   - không có API fallback trong lượt chạy được dùng làm kết quả chính thức.

5. AI không được tự đánh dấu `resolved` nếu:
   - không có nguồn hỗ trợ;
   - nguồn không đủ thẩm quyền;
   - câu hỏi thiếu dữ liệu hoặc thiếu tệp đính kèm quan trọng;
   - độ tin cậy thấp.

   Những trường hợp này phải được chuyển thành `uncertain` để TA kiểm tra.

6. Mọi kết quả `resolved` phải có:
   - `source_reference` không rỗng;
   - lý do dựa trên dữ liệu đầu vào;
   - thông tin đủ để TA kiểm tra lại.

7. TA hoặc moderator luôn có quyền sửa kết quả của AI.
   Hệ thống không tự động gửi câu trả lời hoặc đóng câu hỏi.

8. Không được commit API key, dữ liệu Discord thô hoặc thông tin
   nhận dạng cá nhân lên repository public.

9. Trong vòng thử nghiệm người dùng tiếp theo, ít nhất 4/5 người dùng
   phải hoàn thành luồng kiểm tra một câu hỏi mà không cần người hướng dẫn.

## 11. Tự khai phần chưa hoàn thành và giới hạn hiện tại

Tại thời điểm khóa CP4, nhóm tự khai:

- Chưa tích hợp trực tiếp Discord API hoặc webhook; prototype chỉ dùng 10 tình huống giả lập/đã ẩn danh.
- Chưa tự động tìm kiếm và gom nhóm câu hỏi trên toàn bộ server Discord.
- Chưa có đăng nhập, phân quyền theo vai trò, cơ sở dữ liệu hoặc triển khai production.
- Chưa đánh giá bảo mật và quyền riêng tư ở mức production.
- Chưa hoàn thành buổi quan sát chính thức với 5 người ngoài nhóm; vì vậy tiêu chí 4/5 hoàn thành luồng vẫn đang chờ kiểm chứng.
- `confidence` là mức tự đánh giá do mô hình trả về và được kiểm soát bằng policy, chưa phải xác suất đã được hiệu chỉnh thống kê.
- Kết quả 19/20 (95%) chỉ phản ánh challenge set 20 case đã công bố, không đại diện cho độ chính xác trên toàn bộ dữ liệu Discord thực tế.
- Hệ thống không tự động gửi tin, đóng câu hỏi hoặc thay TA ra quyết định. Đây là ranh giới sản phẩm có chủ đích, không phải tính năng bị lỗi.

**Tự đánh giá tại thời điểm khóa:** prototype đã đáp ứng các tiêu chí kỹ thuật 1-8 của chuẩn đạt với lượt chạy CP3 chính thức 19/20 và fallback 0. Tiêu chí trải nghiệm người dùng số 9 chưa được xác nhận và được chuyển sang hoạt động validation trước CP5.

## 12. Quy tắc sau khi khóa

- Không sửa nội dung mục 10 sau thời điểm khóa đã ghi ở đầu tài liệu.
- Kết quả validation mới chỉ được bổ sung vào mục 9 và thư mục `validation/`.
- Nếu sản phẩm không đạt một tiêu chí, nhóm ghi nhận kết quả thật và phân tích nguyên nhân; không hạ chuẩn sau khi đã xem kết quả.

## Việc cần làm ở các mốc tiếp theo

- Dùng kết quả CP3 95% làm baseline cho các thay đổi policy tiếp theo; mọi run mới phải giữ nguyên nguyên tắc không tính fallback là kết quả AI.
- Kiểm chứng với năm người ngoài nhóm, trong đó có ít nhất hai người dùng đã khai ở CP1; ghi nguyên văn phản hồi trong lúc làm nhiệm vụ sau khi được đồng ý.
- Hoàn thiện UI/UX theo kế hoạch trong `docs/ui-ux-upgrade-plan.md`, sau đó chạy validation mà không thay đổi chuẩn đạt ở mục 10.
