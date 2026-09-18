# Kế hoạch nâng cấp UI/UX prototype Buddy

**Trạng thái triển khai:** P0, P1 và P2 đã được đưa vào prototype ngày 18/09/2026. Phần còn chờ bằng chứng thực tế là validation với 5 người ngoài nhóm; dùng mẫu tại `validation/cp5-ui-test-log.md` và không tự tạo kết quả.

## 1. Mục tiêu

Giúp TA nhìn trong vài giây thấy mục nào cần xử lý, vì sao AI đưa ra đề xuất, mức độ đáng tin đến đâu và hành động tiếp theo là gì. Giao diện phải hỗ trợ video/pitch ngắn nhưng vẫn đủ rõ để người ngoài nhóm tự hoàn thành luồng rà soát.

## 2. Vấn đề của giao diện hiện tại

- Phần hero, bằng chứng CP3 và sơ đồ luồng chiếm nhiều không gian trước hàng đợi công việc chính.
- Mỗi thẻ câu hỏi chứa nhiều badge, khối lý do, vòng confidence và nhiều nút nên khó quét nhanh khi có nhiều mục.
- Ba hành động đổi trạng thái cạnh nút phân tích có trọng lượng thị giác gần bằng nhau, khiến hành động chính chưa nổi bật.
- `confidence` được thể hiện đẹp nhưng chưa giải thích trực tiếp TA nên làm gì ở từng mức.
- Nguồn tham chiếu mới là chuỗi mô phỏng; chưa phân biệt rõ nguồn chính thức, nguồn cộng đồng và trường hợp không có nguồn.
- Trạng thái mock, AI thật, fallback và TA override có nhãn nhưng chưa tạo thành một lịch sử quyết định dễ hiểu.
- Luồng mobile xếp thẻ dài theo chiều dọc; người dùng phải cuộn nhiều để so sánh các case.

## 3. Kiến trúc màn hình đề xuất

### Thanh trên cùng

- Giữ thương hiệu Buddy và trạng thái API.
- Thêm một dòng ngắn: `AI đề xuất - TA quyết định`.
- Đưa số đo CP3 vào nút/thẻ nhỏ có thể mở chi tiết, không chiếm phần đầu trang.

### Khu vực điều khiển

- Tiêu đề ngắn: `Hàng đợi cần rà soát`.
- Ba tab trạng thái có số lượng: `Cần xử lý`, `Cần kiểm tra`, `Đã xử lý`.
- Thêm tìm kiếm theo nội dung và bộ lọc theo loại case/nguồn.
- Sắp xếp mặc định: `unresolved` trước, sau đó `uncertain`, confidence thấp trước.

### Danh sách case

Mỗi hàng chỉ hiển thị thông tin cần để quét nhanh:

1. trạng thái;
2. câu hỏi;
3. một dòng lý do;
4. mức confidence bằng nhãn chữ và thanh ngang;
5. độ tin cậy của nguồn;
6. nút chính `Phân tích bằng AI` hoặc `Xem & quyết định`.

Chi tiết hội thoại, JSON và lịch sử quyết định mở trong side panel thay vì làm thẻ quá dài.

### Panel chi tiết

- Cột trái: hội thoại theo timeline, làm nổi bật bằng chứng được AI sử dụng.
- Cột phải: đề xuất AI, confidence, policy áp dụng và nguồn.
- Nhóm hành động cuối panel: `Đã xử lý`, `Chưa xử lý`, `Chưa chắc chắn`.
- Sau khi TA chọn, hiển thị rõ `TA đã ghi đè đề xuất AI` và cho phép hoàn tác.

## 4. Quy tắc trực quan

- Dùng màu đỏ/hổ phách/xanh như tín hiệu phụ; mọi trạng thái luôn có chữ và biểu tượng để không phụ thuộc vào màu.
- Đổi vòng confidence thành thanh ngang kèm hướng dẫn:
  - `>= 80%`: tin cậy cao, vẫn cần kiểm tra nguồn;
  - `55-79%`: cần đối chiếu;
  - `< 55%`: chuyển TA kiểm tra, không tự kết luận.
- Hiển thị nguồn bằng ba mức: `Chính thức`, `Cộng đồng`, `Không có nguồn`.
- Chỉ có một primary action trên mỗi trạng thái màn hình.
- Loading phải cho biết đang phân tích case nào; lỗi API phải nói rõ đã chuyển sang fallback và chưa phải kết quả AI.
- Giữ focus ring, hỗ trợ bàn phím, vùng bấm tối thiểu 44 px và `prefers-reduced-motion`.

## 5. Thứ tự triển khai

### P0 - trước buổi validation

- Rút gọn hero và đưa hàng đợi lên trên nếp gấp đầu tiên.
- Chuyển bộ lọc trạng thái thành tab rõ ràng.
- Rút gọn card và làm nổi bật một hành động chính.
- Thay cách diễn giải confidence bằng nhãn hành động cho TA.
- Làm rõ nhãn `Mock`, `AI thật`, `Fallback`, `TA override`.
- Thêm loading, error và empty state nhất quán.
- Kiểm tra responsive ở 360 px, 768 px và desktop.

### P1 - tăng chất lượng demo/pitch

- Side panel chi tiết hai cột.
- Highlight phần hội thoại được dùng làm bằng chứng.
- Nhãn độ tin cậy của nguồn và cảnh báo nguồn không đủ thẩm quyền.
- Thanh tiến trình demo: chọn case -> AI phân tích -> TA quyết định.
- Chế độ `Demo nhanh` tự cuộn/focus tới case phù hợp cho video.

### P2 - sau hackathon

- Tìm kiếm, lọc nâng cao và sắp xếp.
- Lịch sử quyết định/audit trail đầy đủ.
- Phím tắt cho TA xử lý hàng đợi lớn.
- Dashboard theo dõi thời gian xử lý và tỷ lệ TA override.

## 5.1. Đối chiếu sau triển khai

| Hạng mục | Trạng thái | Vị trí trong prototype |
|---|---|---|
| Hàng đợi xuất hiện ngay đầu màn hình | Hoàn thành | `index.html` · `queue-intro`, `queue-panel` |
| Tab trạng thái, tìm kiếm, lọc, sắp xếp | Hoàn thành | `status-tabs`, `control-bar` |
| Card rút gọn, một primary action | Hoàn thành | `renderCard()` |
| Confidence có hướng dẫn hành động | Hoàn thành | `confidenceMeta()` và thanh confidence |
| Nhãn Mock/AI thật/Fallback/TA | Hoàn thành | `engineMeta()` và badge trên case |
| Side panel hai cột, highlight bằng chứng | Hoàn thành | `detail-dialog`, `renderDetail()` |
| Nguồn Chính thức/Cộng đồng/Không có nguồn | Hoàn thành | `SOURCES`, `sourceTrust` |
| Tiến trình demo ba bước | Hoàn thành | `review-progress` |
| Demo nhanh cuộn/focus case ưu tiên | Hoàn thành | `quickDemo()` |
| Audit trail và hoàn tác | Hoàn thành | `appendAudit()`, `undoHumanDecision()` |
| Phím tắt TA | Hoàn thành | xử lý `keydown` và modal phím tắt |
| Dashboard phiên | Hoàn thành | `session-dashboard`, `metrics()` |
| Validation 5 người ngoài nhóm | Chờ thực hiện | `validation/cp5-ui-test-log.md` |

## 6. Definition of Done cho lần nâng cấp đầu

- Người dùng nhìn thấy hàng đợi và case ưu tiên mà không cần cuộn trên màn hình laptop phổ biến.
- Từ một case, người dùng có thể xem căn cứ, gọi AI và chốt trạng thái trong tối đa ba hành động chính.
- Mock/AI thật/fallback/TA override không thể bị nhầm với nhau.
- Không có overflow ngang ở 360 px; toàn bộ chức năng dùng được bằng bàn phím.
- Không thay đổi API contract hoặc quality bar CP4.
- Bộ test backend hiện tại vẫn pass.
- Trong validation, ít nhất 4/5 người ngoài nhóm hoàn thành một lượt rà soát không cần hướng dẫn, đúng chuẩn đã khóa trong `spec.md`.

## 7. Kịch bản validation UI/UX

Giao cho người thử một nhiệm vụ duy nhất: `Hãy tìm một câu hỏi còn cần hỗ trợ, xem căn cứ của AI và đưa ra quyết định cuối cùng như một TA.` Không hướng dẫn vị trí nút. Ghi lại:

- có hoàn thành hay không;
- thời gian hoàn thành;
- bước bị kẹt hoặc bấm nhầm;
- quote nguyên văn trong lúc thao tác;
- AI/nguồn/confidence có bị hiểu sai không;
- thay đổi ưu tiên trước demo.
