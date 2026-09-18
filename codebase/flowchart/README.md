# Sơ đồ Luồng Trải nghiệm Người dùng (UX Flow) — CP2

Ảnh trực quan vector: [user_journey_flow.svg](user_journey_flow.svg)

## 1. Toàn bộ hành trình người dùng (User Flowchart)

```mermaid
flowchart TD
    subgraph INPUT["1. Đầu vào (Input)"]
        A["Tin nhắn Discord K4 phát sinh trong ngày<br/>(kênh channel_02, 10, 11)"]
    end

    subgraph PREPROCESS["2. Tiền xử lý & Truy xuất"]
        B["Trích xuất câu hỏi ứng viên + Luồng hội thoại (Thread context)"]
        C["So khớp cơ sở tri thức (FAQ quy chế, deadline, điểm danh)"]
        A --> B --> C
    end

    subgraph AI_DECISION["3. Điểm quyết định AI (Triage Engine)"]
        D{"AI Phân tích ngữ cảnh & Đánh giá căn cứ<br/>[HAX G10: Thu hẹp phạm vi khi nghi ngờ]"}
        C --> D
    end

    subgraph BRANCHES["4. Bốn đường đi của trải nghiệm (§6)"]
        E["① HAPPY PATH<br/>Đã có phản hồi chốt hoặc trùng FAQ chuẩn<br/>-> Đề xuất: RESOLVED<br/>(Gợi ý 1-click gửi câu trả lời chuẩn)"]
        F["② LOW CONFIDENCE (Lớp ②)<br/>Mơ hồ / Bot hedging / Bạn học đoán 'hình như'<br/>-> Đề xuất: UNCERTAIN<br/>(Cảnh báo vàng, mời TA duyệt)"]
        G["③ NO GROUNDING (Lớp ①)<br/>Không tìm thấy tài liệu căn cứ / Bot cũ bịa<br/>-> Đề xuất: UNRESOLVED<br/>(Cảnh báo đỏ, chặn bịa đặt)"]
        H["④ CORRECTION (Người dùng sửa)<br/>TA phát hiện AI đánh giá chưa chuẩn<br/>-> 1-Click Override trạng thái<br/>[HAX G9: Sửa dễ dàng]"]

        D -->|"Căn cứ rõ ràng (Confidence >= 85%)"| E
        D -->|"Thiếu thông tin / Mơ hồ (Confidence < 70%)"| F
        D -->|"Không có tài liệu kiểm chứng"| G
        E -.->|"TA bấm sửa"| H
        F -.->|"TA bấm sửa"| H
        G -.->|"TA bấm sửa"| H
    end

    subgraph TA_ACTION["5. Bảng điều khiển TA (TA Dashboard - Prototype)"]
        I["TA mở Dashboard cuối ngày:<br/>1. Xem KPI Bar (Resolved/Unresolved/Uncertain)<br/>2. Lọc danh sách theo mức độ ưu tiên<br/>3. Đọc hội thoại liên quan + Căn cứ AI giải thích"]
        J["Thao tác 1-Click của TA:<br/>• '⚡ Gửi câu trả lời chuẩn & Resolved'<br/>• '✓ Xác nhận Resolved'<br/>• '✍ Mở Discord trả lời thủ công'"]

        E --> I
        F --> I
        G --> I
        H --> I
        I --> J
    end

    subgraph OUTPUT["6. Kết quả đầu ra (Outcome)"]
        K["✓ Đóng thread học viên hoặc cập nhật phản hồi chuẩn<br/>✓ Cập nhật bộ đếm KPI thời gian thực<br/>✓ Tiết kiệm 80% thời gian rà soát thủ công, không bỏ sót tin"]
        J --> K
    end
```

## 2. Chi tiết 4 nhánh xử lý ngoại lệ

| Nhánh | Tình huống kích hoạt | Quyết định AI | Hành vi trên UI | Nguyên tắc áp dụng |
|---|---|---|---|---|
| **① Happy path** | Học viên hỏi câu hỏi đã có FAQ (như điểm danh ws) hoặc thread đã được giải đáp xong | `RESOLVED` / Gợi ý chuẩn | Thẻ màu xanh, nút bấm 1-click gửi câu trả lời chuẩn | **HAX G2** (Minh bạch mức độ tin cậy) |
| **② Low confidence** | Câu hỏi mơ hồ ("nghỉ có bị trừ XP không?"), bot trả lời tránh né ("có thể"), hoặc bạn học nói "hình như" | `UNCERTAIN` | Thẻ màu vàng, hiển thị cảnh báo "Chưa có căn cứ chính thức từ TA", đưa vào hàng đợi duyệt | **HAX G10** (Thu hẹp phạm vi khi nghi ngờ - Bắt buộc) |
| **③ No grounding** | Không tìm thấy bất kỳ quy chế nào trong tài liệu hoặc câu hỏi bị bot cũ đoán mò sai | `UNRESOLVED` | Thẻ màu đỏ, thông báo "Không có căn cứ", tuyệt đối không tự sinh text bịa đặt | **HAX G11** (Giải thích rõ vì sao) |
| **④ Correction** | TA phát hiện AI gán nhãn sai (ví dụ học viên cảm ơn lịch sự nhưng lỗi kỹ thuật chưa fix) | Ghi đè trạng thái | Nút 1-click sửa ngay trên UI (`Xác nhận Resolved`, `Chuyển Unresolved`, `Mở lại`) | **HAX G9** (Hỗ trợ sửa lỗi dễ dàng) |
