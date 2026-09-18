# Validation

Thư mục này lưu bằng chứng kiểm thử với người dùng thật, tách biệt với phép đo tự động trong `eval/`.

## Chuẩn cần đạt

- Rubric R6 yêu cầu tối thiểu 2 người ngoài nhóm, có tên hoặc mã ẩn danh nhất quán, vai trò, nhiệm vụ, quan sát và câu nói nguyên văn.
- Vòng log R6 hiện tại dùng 3 người; tối thiểu 2 người phải có đầy đủ task, quan sát và quote thật.
- Quality bar đã khóa của nhóm cao hơn mức R6: thử với 5 người và ít nhất 4/5 người hoàn thành. Vòng 3 người không được dùng để tuyên bố đạt tiêu chí 4/5.
- Sau mỗi vòng phải ghi rõ thay đổi nào được thực hiện từ feedback, hoặc lý do có bằng chứng để chưa đổi.

## Cách thực hiện

1. Hoàn thành log với 3 người không thuộc nhóm, ưu tiên TA/mod hoặc học viên từng dùng Discord học tập.
2. Giao đúng một nhiệm vụ: “Hãy tìm một câu hỏi còn cần hỗ trợ, xem căn cứ của AI và đưa ra quyết định cuối cùng như một TA.”
3. Không chỉ vị trí nút. Ghi thời gian, bước bị kẹt, thao tác nhầm và câu nói nguyên văn.
4. Điền đủ [`cp5-ui-test-log.md`](cp5-ui-test-log.md).
5. Tổng hợp tỷ lệ hoàn thành và quyết định thay đổi; không điền dữ liệu giả.

Kết quả tự động 20 case và trace API nằm trong [`../eval/`](../eval/), không đặt lại ở đây.
