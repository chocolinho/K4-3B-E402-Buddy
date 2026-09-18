# Luồng hoạt động CP2

```text
Tin nhắn Discord
  → phát hiện câu hỏi ứng viên
  → nhóm câu hỏi tương tự/trùng lặp
  → truy xuất luồng thảo luận/ngữ cảnh liên quan
  → AI phân loại: resolved | unresolved | uncertain
  → TA rà soát
  → TA có thể sửa trạng thái
  → TA mở luồng gốc và tự phản hồi
```

AI chỉ đề xuất trạng thái để rà soát. AI không gửi tin nhắn cho học viên.

## Phần được thay bằng AI thật ở CP3

```text
question + thread_context + related_messages
  → backend Python
  → OpenRouter/Gemini API trả structured output
  → kiểm tra schema
  → nếu confidence thấp: ép về uncertain
  → ghi trace input/output
  → hiển thị để TA rà soát hoặc sửa trạng thái
```

Khi API lỗi hoặc thiếu key, backend không dùng quyết định mock để giả làm kết quả thật. Hệ thống trả fallback `uncertain` và yêu cầu TA kiểm tra.

## Các nhánh bắt buộc

### Nhánh thuận lợi

```text
câu hỏi rõ ràng, chưa có câu trả lời
  → chưa xử lý (unresolved)
  → hiển thị trong bản tổng hợp
```

### Độ tin cậy thấp

```text
ngữ cảnh mơ hồ hoặc không đầy đủ
  → chưa chắc chắn (uncertain)
  → TA kiểm tra
```

### Không có căn cứ

```text
không tìm thấy ngữ cảnh liên quan
  → chưa chắc chắn (uncertain)
  → giải thích đang thiếu bằng chứng
  → TA kiểm tra
```

### Sửa trạng thái

```text
TA thay đổi trạng thái
  → giao diện cập nhật
  → giữ lại quyết định của con người
```
