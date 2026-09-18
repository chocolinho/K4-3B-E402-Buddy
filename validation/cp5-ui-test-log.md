# Nhật ký validation UI/UX Buddy

**Nhiệm vụ giao cho mỗi người thử:** “Hãy tìm một câu hỏi còn cần hỗ trợ, xem căn cứ của AI và đưa ra quyết định cuối cùng như một TA.”

Người hướng dẫn không chỉ vị trí nút và không giải thích confidence trước khi người thử hoàn thành hoặc dừng lại.

| Người thử | Thuộc nhóm? | Đã khai ở CP1? | Hoàn thành? | Thời gian | Bước bị kẹt/bấm nhầm | Quote nguyên văn | Hiểu sai AI/nguồn/confidence? | Quyết định sản phẩm |
|---|---|---|---|---:|---|---|---|---|
| Nguyễn Việt Hoàng (2A202602424) | Ngoài nhóm | Có | Có | Chưa ghi nhận | Không ghi nhận bấm nhầm; đã mở chi tiết một case và xem phần căn cứ trước khi quyết định | Chưa ghi âm/ghi nguyên văn; cần xác nhận lại với người thử | Chưa ghi nhận quan sát trực tiếp về việc hiểu sai; người thử đã phân biệt phần AI đề xuất với quyết định của TA | Giữ luồng xem căn cứ trước khi chốt; bổ sung cách ghi thời gian và quote ở vòng test sau |
| Nguyễn Tiến Phát (2A202602387) | Ngoài nhóm | Có | Có | Chưa ghi nhận | Không ghi nhận bấm nhầm; đã đi qua bước xem hội thoại, nguồn và trạng thái trước khi chốt | Chưa ghi âm/ghi nguyên văn; cần xác nhận lại với người thử | Chưa ghi nhận quan sát trực tiếp về confidence; cần hỏi lại xem nhãn nguồn cộng đồng có được hiểu đúng không | Giữ cảnh báo nguồn cộng đồng/không có nguồn; cần kiểm tra thêm khả năng hiểu confidence |
| Người thử 3 | Ngoài nhóm | Chưa thực hiện | Chưa thực hiện | — | — | — | — | Chưa có dữ liệu |
| Người thử 4 | Ngoài nhóm | Chưa thực hiện | Chưa thực hiện | — | — | — | — | Chưa có dữ liệu |
| Người thử 5 | Ngoài nhóm | Chưa thực hiện | Chưa thực hiện | — | — | — | — | Chưa có dữ liệu |

## Tổng hợp sau khi thử

**Số người hoàn thành:** 2/5 (mới có dữ liệu của 2 người ngoài nhóm)
**Có đạt chuẩn CP4 tối thiểu 4/5 không:** Chưa đạt theo dữ liệu hiện có; còn thiếu 3 lượt thử
**Chủ đề vướng lặp lại nhiều nhất:** Chưa đủ dữ liệu để kết luận. Hai lượt hiện có chưa ghi nhận cùng một lỗi thao tác.
**Thay đổi sẽ làm trước demo:** Bổ sung mẫu ghi thời gian bắt đầu/kết thúc, câu nói nguyên văn và câu hỏi kiểm tra lại về nguồn/confidence cho mỗi lượt.
**Điểm giữ nguyên và lý do:** Giữ bước xem căn cứ trước khi chốt và cảnh báo “nguồn cộng đồng/không có nguồn”, vì đây là phần bảo đảm TA không đồng nhất đề xuất AI với quyết định cuối cùng.
**Việc để dành sau hackathon:** Hoàn thành thêm 3 lượt thử để kiểm tra quality bar 4/5; xác nhận lại vai trò, trạng thái CP1, thời gian và quote nguyên văn của hai lượt đã ghi.

## Nguyên tắc ghi nhận

- Chép nguyên văn câu người thử nói trong lúc thao tác; không đổi thành lời khen chung chung.
- Ghi kết quả thật kể cả khi không đạt 4/5.
- Không đưa email, Discord ID hoặc dữ liệu cá nhân vào repository public.
- Sau khi sửa giao diện, bổ sung quyết định vào mục 9 của `spec.md`, nhưng không thay đổi quality bar đã khóa ở mục 10.
