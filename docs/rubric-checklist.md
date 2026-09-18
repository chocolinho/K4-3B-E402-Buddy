# Checklist đối chiếu rubric

Đối chiếu ngày 18/09/2026. Trạng thái “đủ bằng chứng trong repo” không thay thế việc mỗi thành viên nộp form đúng hạn.

| Mục | Trạng thái | Bằng chứng / việc còn thiếu |
|---|---|---|
| R1 · Vấn đề & bằng chứng | Sẵn sàng | Evidence B có script tái lập, số đếm và 6 ví dụ ẩn danh trong [`evidence/mining-summary.md`](../evidence/mining-summary.md); bảng ≥3 ứng viên và phương án loại ở [`evidence/impact-table.md`](../evidence/impact-table.md). Survey chỉ dùng bổ trợ vì repo không công khai raw responses. |
| R2 · Thiết kế sản phẩm AI | Sẵn sàng | Lát cắt một câu, non-goals, mức automation/cost-of-error và ≥4 nguyên tắc HAX/PAIR được ánh xạ trong [`spec.md`](../spec.md). |
| R3 · Chỗ khó & trải nghiệm | Sẵn sàng | Bốn lớp ①–④, ≥8 kịch bản và bốn đường đi được mô tả trong [`spec.md`](../spec.md) và thể hiện trong prototype. |
| R4 · Đo lường | Sẵn sàng | [`eval/golden-set.json`](../eval/golden-set.json) có 20 case: 10 common, 7 hard, 3 rare; 15 chatlog-derived; đủ cả bốn lớp. Quality bar khóa trước kết quả và full-run nằm trong [`eval/`](../eval/). |
| R5 · Bản mẫu | Sẵn sàng | Luồng end-to-end, một quyết định AI thật, fallback và trace trong [`runs/`](../runs/); mức mock/working được tự khai trong spec. |
| R6 · Validation bonus | **Chưa có dữ liệu thật** | Template và quy trình ở [`validation/`](../validation/). Cần test ≥2 người để đủ điều kiện rubric; mục tiêu nội bộ là 5 người và ≥4/5 hoàn thành. Phải có quote thật và một thay đổi dựa trên feedback. |
| R7 · Repo & phân công | Gần xong | Cấu trúc và phân công đã có. Mỗi thành viên phải tự hoàn thiện reflection trong [`reflection/`](../reflection/) bằng trải nghiệm thật. |
| CP5 · Nộp cuối | **Chưa xong** | Còn thiếu `demo-slides.pdf`, link/video demo dự phòng và bằng chứng dry run. |

## Kiểm tra trước khi nộp

- [ ] Không commit `.env`, API key, CSV/chatlog thô hoặc thư mục `data/`.
- [ ] Chạy `python -m unittest discover -s codebase/ai -p "test_*.py"` và lưu kết quả nếu cần.
- [ ] Mở prototype, chạy một case bằng API thật và xác nhận trace không phải fallback.
- [ ] Hoàn tất validation thật; cập nhật `spec.md` changelog nếu giao diện/prompt thay đổi.
- [ ] Mỗi thành viên hoàn tất reflection cá nhân, hiểu phần mình đứng tên.
- [ ] Xuất slide thành `demo-slides.pdf`, kiểm tra mở được; chuẩn bị video demo dự phòng.
- [ ] Mỗi thành viên nộp form riêng bằng đúng mã học viên và cùng link repository công khai.
