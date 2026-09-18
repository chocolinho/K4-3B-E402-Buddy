# Kiểm tra flow prototype với pain survey

## Kết luận phạm vi CP2

Flow của prototype phản ánh đúng **hướng pain đã chọn**: TA/Mod cần rà soát cuối ngày để biết vấn đề nào còn cần hỗ trợ trong bối cảnh câu hỏi bị lặp, thông tin nằm ở luồng khác hoặc thiếu ngữ cảnh.

Đây ban đầu là kiểm tra đối chiếu tài liệu và mã nguồn cho CP2. Sau CP3/CP4, prototype vẫn dùng tình huống đã ẩn danh/tổng hợp để trình diễn nhưng nút phân tích đã gọi AI thật qua backend. Tài liệu này **không phải** bằng chứng rằng sản phẩm đã giảm thời gian rà soát; kết quả phân loại được đo riêng trong `eval/`.

## Đối chiếu pain với flow

| Pain trong khảo sát | Cách prototype phản ánh | Mức độ | Giới hạn đã biết |
|---|---|---|---|
| 14/22 gặp cùng một câu hỏi được hỏi theo nhiều cách | Case `Duplicate wording` hiển thị nhóm ba câu hỏi có cùng ý định và đưa nhóm đó vào danh sách rà soát. | Có trong mock | Việc phát hiện và nhóm là dữ liệu cố định, chưa chạy trên tập chat thật. |
| 9/22 không chắc câu hỏi đã được trả lời hay chưa | Mỗi mục có trạng thái `resolved`, `unresolved` hoặc `uncertain`, kèm lý do và độ tin cậy. | Có trong mock | Chưa có phép đo độ đúng của trạng thái. |
| 9/22 gặp câu trả lời ở luồng/kênh khác | Case `Answered elsewhere` có ngữ cảnh liên quan, nguồn tham chiếu và trạng thái `resolved`. | Có trong mock | Nút mở nguồn chỉ hiện thông báo demo, chưa mở Discord hoặc nguồn thật. |
| 13/22 mất ít nhất 5 phút cho một lần rà soát; 14/22 rà soát ít nhất 3 lần/tuần | Màn hình bắt đầu bằng hàng đợi `Cần TA xem hôm nay`, bộ đếm theo trạng thái và bộ lọc để thu hẹp danh sách. | Phù hợp về workflow | Chưa đo thời gian trước/sau, số mục xử lý hoặc tỷ lệ bỏ sót. |
| 16/22 thường xuyên hoặc thỉnh thoảng trực tiếp hỗ trợ câu hỏi | TA có thể xem ngữ cảnh và sửa trạng thái bằng ba nút hành động. | Có trong mock | Chưa có quan sát người dùng xác nhận thao tác này phù hợp với quy trình thật. |
| Thông tin hỗ trợ bị phân tán và một tin nhắn đơn lẻ không đủ căn cứ | Các case `Missing context`, `Bot/system` và `Repeated sender` dẫn tới `uncertain` hoặc cần TA kiểm tra. | Có trong mock | Ngữ cảnh và phân loại đều được seed sẵn trong `script.js`. |

## Các bước flow đã kiểm tra trong mã nguồn

1. Màn hình mặc định mở hàng đợi `unresolved`, phù hợp với mục tiêu ưu tiên vấn đề còn mở.
2. TA có thể chọn `unresolved`, `uncertain`, `resolved` hoặc `Hiện tất cả`.
3. Mỗi thẻ hiển thị trạng thái, lý do, độ tin cậy và nguồn/ngữ cảnh.
4. `View context` mở các tin nhắn liên quan của case giả lập.
5. TA có thể sửa trạng thái; giao diện cập nhật bộ đếm và đánh dấu `TA override`.
6. Quyết định sửa được giữ trong phiên trình duyệt bằng `sessionStorage`.
7. `Mở luồng gốc (demo)` chỉ hiển thị thông báo, không gửi tin nhắn cho học viên.

## Evidence hiện có và còn thiếu

### Đã có trong repository

- Khảo sát ẩn danh với 22 người trả lời trong [tóm tắt khảo sát](survey-summary.md).
- Bảng so sánh tác động và lý do chọn lát cắt trong [impact-table.md](impact-table.md).
- Hai mươi case giả lập trong `codebase/prototype/script.js`, có bảng nguồn gốc và cách biến đổi tại [mock-case-provenance.md](mock-case-provenance.md).
- Flow tổng quát và các nhánh `uncertain` trong [flowchart](../codebase/flowchart/README.md).
- Golden set 20 case và kết quả full-run trong [`../eval/`](../eval/).
- Lời gọi AI thật, fallback có nhãn và trace trong [`../runs/`](../runs/).

### Chưa thể kết luận từ repository

- Chưa có nhật ký người dùng thật dùng prototype.
- Chưa có quote nguyên văn hoặc observation từ willing users.
- Chưa có số đo thời gian rà soát trước/sau với TA/mod thật.

Các mục trên không được tự điền bằng giả định. Chúng cần được bổ sung sau khi có buổi dùng thử, dữ liệu kiểm thử hoặc lượt chạy AI thật.

## Câu hỏi cần nhóm xác nhận

1. Nhóm đã cho Nguyễn Tiến Phát, Nguyễn Đình Lâm Phúc hoặc Nguyễn Việt Hoàng dùng thử prototype chưa? Nếu có, cần ngày thử, task giao, điểm kẹt, quote nguyên văn và sự đồng ý ghi nhận.
2. Nhóm đã có thêm người ngoài nhóm dùng thử chưa? Nếu có, cần nhật ký từng người; không cần đưa thông tin nhận dạng cá nhân vào repo.
3. Khi validation, người dùng có phân biệt đúng đề xuất AI, fallback và TA override không?
4. Có thay đổi nào từ feedback cần ghi vào changelog của `spec.md` không?
