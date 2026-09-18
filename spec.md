# Đặc tả sản phẩm AI — Rà soát hỗ trợ trên Discord

**Nhánh:** B – B2 · Tính năng mới cho TA/học viên trên Discord

**Phạm vi hiện tại:** CP1 xác định vấn đề và CP2 bản mẫu bấm thử được

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

## 6. Hoạt động và giới hạn của CP2

Sản phẩm CP2 là bản mô phỏng tĩnh có thể bấm thử. Việc điều hướng, lọc danh sách, xem ngữ cảnh, đếm trạng thái và sửa thủ công là các tương tác thật trên trình duyệt. Việc nhận dữ liệu Discord, truy xuất, phân loại, lý do, độ tin cậy và nguồn tham chiếu đều là dữ liệu giả lập cố định.

Bản mô phỏng không gọi mạng và không chạy mô hình AI thật. Xem [định nghĩa luồng hoạt động](codebase/flowchart/README.md).

## 7. Các trường hợp rủi ro sơ bộ

Đợt đánh giá sau phải bao phủ: câu hỏi trùng ý nhưng khác cách diễn đạt, câu trả lời ở luồng khác, tin nhắn từ bot/hệ thống, vấn đề được cùng một người gửi lặp lại, ngữ cảnh mơ hồ, không có căn cứ, câu hỏi ngoài phạm vi và việc TA sửa phân loại. CP2 có ví dụ giả lập cho sáu trường hợp đầu; kế hoạch đầy đủ nằm trong [tài liệu đánh giá](eval/README.md).

## 8. Nguyên tắc tương tác giữa con người và AI

Bản mẫu áp dụng G1 (nói rõ hệ thống làm được gì), G2 (hiển thị độ tin cậy và trạng thái), G10 (chọn trạng thái chưa chắc chắn khi thiếu bằng chứng), G9 (hỗ trợ sửa nhanh) và G11 (giải thích lý do kèm ngữ cảnh). Chi tiết triển khai nằm trong [quyết định thiết kế](docs/decisions.md#nguyên-tắc-hax--pair).

## 9. Nhật ký thay đổi

- CP1: chọn phát hiện câu hỏi chưa được xử lý làm lát cắt chính dựa trên khảo sát ban đầu.
- CP2: thêm bảng rà soát tĩnh với tình huống giả lập, xem ngữ cảnh, lọc danh sách và nút để TA sửa trạng thái.
- CP2: đối chiếu flow prototype với các pain đã ghi nhận trong khảo sát; xác nhận đây mới là bằng chứng từ mock, chưa phải kết quả user test hoặc đo lường AI thật.
- CP3: hoàn thành backend AI với structured output, trace input/output, fallback `uncertain` và human-in-the-loop. Challenge set chính thức chạy bằng Gemini 3.5 Flash-Lite đạt 19/20 case (95%), API fallback 0; một failure thuộc ranh giới thẩm quyền nguồn đối với deadline và đã được phân tích trong `eval/cp3-results.md`.
- Thay đổi sau kiểm chứng với người dùng: _chỉ bổ sung sau các buổi quan sát sử dụng; không tự tạo phản hồi._

## Việc cần làm ở các mốc tiếp theo

- Chọn và ghi nhận đội trưởng cùng mã học viên của tất cả thành viên.
- Xác định và khóa tiêu chuẩn đạt của CP4 trước khi đánh giá.
- Dùng kết quả CP3 95% làm baseline cho các thay đổi policy tiếp theo; mọi run mới phải giữ nguyên nguyên tắc không tính fallback là kết quả AI.
- Kiểm chứng với năm người ngoài nhóm, trong đó có ít nhất hai người dùng đã khai ở CP1; ghi nguyên văn phản hồi trong lúc làm nhiệm vụ sau khi được đồng ý.
