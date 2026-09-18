# Reflection — Dương Đình Long

## Vai trò

Sản phẩm / Trải nghiệm người dùng — problem framing, spec, UI/UX và validation.

## Phần tôi trực tiếp làm

- CP1: Cùng nhóm chốt bài toán và viết lát cắt 1 câu trong canvas. giữ quan điểm chỉ làm công cụ hỗ trợ TA rà soát cuối ngày không làm bot tự trả lời học viên vì quá rủi ro.
- CP2: Vẽ sơ đồ luồng 4 bước trong thư mục flowchart và dựng bộ khung UI đầu tiên để luồng rà soát bấm thông suốt từ đầu đến cuối.
- CP4: Viết và hoàn thiện spec.md. Tôi khóa danh sách non-goals, chọn mức tự động hóa có điều kiện và đưa các nguyên tắc HAX vào giao diện, nhất là nút cho TA ghi đè kết quả và xem lại lịch sử thao tác.
- CP5: Lên kịch bản kiểm thử giao diện trong validation và trực tiếp quan sát người ngoài nhóm dùng thử xem họ thao tác có bị vướng chỗ nào không.

## AI đã hỗ trợ và cách tôi kiểm tra

- Tôi dùng AI để gợi ý nhanh cấu trúc bảng HAX ban đầu và viết nháp các đoạn CSS/HTML khi dựng giao diện dashboard.
- AI tự bịa thêm các tính năng tự động hóa quá đà như tự gửi tin nhắn Discord hay tự đóng câu hỏi. Tôi gạt bỏ ngay để đưa vào mục non-goals.

## Bài học từ case fail của nhóm

- Ở case cp3-018 khi học viên hỏi hạn Lab02 và được một bạn khác trả lời, AI đoán sai nhãn vì chưa phân biệt được nguồn tin.
- Lỗi này giúp tôi nhận ra một bài học sản phẩm quan trọng: có câu trả lời không đồng nghĩa với việc câu trả lời đó đáng tin. Nếu giao diện không chỉ rõ người nói là ai, TA nhìn lướt qua rất dễ duyệt nhầm.
- Sau case đó, tôi bổ sung ngay quy định hiển thị thẩm quyền nguồn lên giao diện. Cứ thông tin về hạn nộp mà từ bạn học nói là phải gắn nhãn vàng cảnh báo và đưa về trạng thái cần kiểm tra.
