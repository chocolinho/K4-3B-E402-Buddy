# Log mining Discord đã ẩn danh

## Phạm vi và nguồn

- Nguồn cục bộ: `k4_messages.csv` do chương trình cung cấp.
- File nguồn không được commit vào repository.
- Script kiểm lại được: [`analyze_messages.py`](analyze_messages.py).
- Script chỉ xuất số aggregate, không in tên người gửi hoặc nội dung chat.

Chạy lại bằng:

```powershell
python evidence/analyze_messages.py "C:\duong-dan-rieng\k4_messages.csv"
```

## Phương pháp đếm

1. Đọc CSV với UTF-8 BOM và kiểm tra các cột bắt buộc.
2. Đếm bot/non-bot từ `is_bot`, reply từ `reply_to`, attachment từ `n_attachments`.
3. Một **candidate question** phải:
   - không do bot gửi;
   - có ít nhất 8 ký tự;
   - chứa dấu `?` hoặc một marker như `làm sao`, `ở đâu`, `khi nào`, `lỗi`, `được không`, `như nào`.
4. Một candidate question được tính là **có direct reply** khi `msg_id` xuất hiện trong `reply_to` của ít nhất một dòng khác.
5. Heuristic này dùng để tạo tập ứng viên rà soát, không khẳng định mọi dòng được đếm đều là câu hỏi hỗ trợ hợp lệ.

## Kết quả aggregate

| Chỉ số | Kết quả |
|---|---:|
| Tổng số dòng message | 1.092 |
| Message ID duy nhất | 1.089 |
| Tin nhắn không phải bot | 779 |
| Tin nhắn bot | 313 |
| Candidate question | 264 |
| Candidate question có direct reply | 209 |
| Tin nhắn có attachment | 27 |
| Tổng attachment | 29 |
| Tin nhắn mention bot | 307 |
| Direct reply | 508 |

Candidate question tập trung nhiều nhất ở `channel_10` (165), `channel_02` (42), `channel_11` (41) và `channel_08` (9). Các kênh còn lại có tổng 7 candidate question.

## Ví dụ nguyên văn đã ẩn danh

Mỗi ví dụ dưới đây chỉ giữ một câu ngắn cần thiết. Mention/tên người được bỏ; không có link, email hoặc nội dung thread đầy đủ.

| Mã nguồn | Trích dẫn nguyên văn | Pattern dùng trong sản phẩm |
|---|---|---|
| M65205 | “nộp ở đâu cơ, phần này mình đánh lệnh /daily-standup rồi mà ko được” | Lệnh đúng nhưng sai vị trí/ngữ cảnh. |
| M45740 | “mình đặt sai cú pháp khi tham gia zoom workshop nên không được ghi nhận, mình nên xử lí như nào, nếu tạo ticket thì mình làm như nào” | Có phản hồi nhưng chưa giải quyết hậu quả. |
| M51326 | “em chạy tới bước 3 thì bị lỗi như này ạ” | Câu hỏi phụ thuộc attachment. |
| M02078 | “làm sao để check điểm XP, và làm sao để biết mình đã được điểm danh workshop” | Một câu gồm hai intent hỗ trợ. |
| M90646 | “làm thế nào để biết được là chủ đề nào đã được chọn và đăng ký chủ đề cho nhóm ở đâu ?” | Tra cứu và thực hiện một quy trình. |
| M40677 | “tôi nộp codelab trên vlearn đúng giờ deadline như thông báo (23:59) nhưng commit trên máy bị lỗi và sau thời gian đó mới lên thì có được tính là nộp đúng hạn không ?” | Ngoại lệ deadline cần nguồn có thẩm quyền. |

## Liên hệ với artifact

- 20 tình huống UI và cách biến đổi: [`mock-case-provenance.md`](mock-case-provenance.md).
- Ít nhất 15/20 case trong golden set có `origin = chatlog`; các case còn lại là case hiếm tổng hợp để kiểm tra policy.
- Bằng chứng mining này không thay thế khảo sát n=22; hai nguồn bổ sung cho nhau.
