# CP3 - AI classifier

Thư mục này thay một phần quyết định mock của CP2 bằng lời gọi AI thật. Backend hỗ trợ OpenRouter hoặc Gemini. Dữ liệu đầu vào vẫn là dữ liệu giả lập/ẩn danh; AI chỉ đề xuất trạng thái và TA giữ quyền sửa quyết định.

## 1. Cấu hình API key

Tại thư mục gốc của repo:

```powershell
Copy-Item .env.example .env
notepad .env
```

Với OpenRouter miễn phí:

```env
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=key_cua_ban
OPENROUTER_MODEL=qwen/qwen3.8-27b:free
BUDDY_CONFIDENCE_THRESHOLD=0.65
BUDDY_EVAL_DELAY_SECONDS=4
BUDDY_EVAL_RETRIES=2
```

Không gửi key qua chat, không ghi key vào mã nguồn và không commit `.env`. Có thể dùng Gemini bằng cách đặt `AI_PROVIDER=gemini` và cấu hình `GEMINI_API_KEY`, `GEMINI_MODEL`.

Với Gemini 3.5 Flash-Lite:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=key_cua_ban
GEMINI_MODEL=gemini-3.5-flash-lite
BUDDY_CONFIDENCE_THRESHOLD=0.65
BUDDY_EVAL_DELAY_SECONDS=5
BUDDY_EVAL_RETRIES=2
```

## 2. Chạy prototype CP3

```powershell
python codebase/ai/server.py
```

Mở `http://127.0.0.1:8000`. Không mở `index.html` trực tiếp vì trình duyệt cần gọi endpoint `/api/analyze` trên local server.

Quay video khoảng 30 giây:

1. Chọn một case.
2. Bấm **Phân tích bằng AI**.
3. Chờ nhãn **gemini thật** xuất hiện.
4. Cho thấy status, reason và confidence.
5. Có thể đổi quyết định bằng nút của TA để chứng minh human-in-the-loop.

Nếu API lỗi hoặc thiếu key, giao diện hiện nhãn **Fallback** và trạng thái `uncertain`. Fallback không được dùng làm bằng chứng AI thật trong video.

## 3. Chạy số đo

Rà soát và khóa nhãn `expected_status` trong `eval/golden-set.json` trước khi chạy. Sau đó:

```powershell
python codebase/ai/run_eval.py
```

Khoảng nghỉ lấy từ `BUDDY_EVAL_DELAY_SECONDS`. Với quota Gemini 3.5 Flash-Lite hiện tại của nhóm là 15 request/phút, dùng 5 giây để giữ tốc độ khoảng 12 request/phút và còn khoảng trống cho retry. Lượt chạy 20 case mất khoảng 1-3 phút. Không đóng terminal trong lúc runner đang báo chờ.

Nếu tài khoản có quota cao hơn, có thể giảm khoảng nghỉ bằng `--delay`, nhưng chỉ làm vậy sau khi kiểm tra giới hạn hiện tại trong Google AI Studio:

```powershell
python codebase/ai/run_eval.py --delay 4 --retries 2
```

Runner sẽ:

- gọi provider AI đã cấu hình cho từng case;
- so sánh nhãn dự đoán với nhãn đã khóa;
- ghi trace từng input/output vào `runs/cp3-trace.jsonl`;
- tạo báo cáo JSON trong `runs/`;
- cập nhật bảng tóm tắt tại `eval/cp3-results.md`.

Chỉ báo cáo run có `valid_run: true`. Nếu có fallback, sửa lỗi API và chạy lại; không tính fallback là kết quả AI.

Kết quả CP3 ngày 18/09/2026 với `gemini-3.5-flash-lite`:

- baseline v1: 14/20 pass, pass rate **70%**, API fallback 0;
- challenge set cuối sau khi sửa context và policy: 19/20 pass, pass rate **95%**, API fallback 0;
- báo cáo chính thức: `eval/cp3-results.md`;
- JSON baseline: `runs/cp3-eval-20260918-110517.json`;
- JSON run chính thức: `runs/cp3-eval-20260918-120303.json`.

Nhóm dùng challenge set 95% làm số báo cáo chính. Baseline 70% được giữ để chứng minh quá trình đo, phân tích failure và cải thiện; không xem hai kết quả này là độ chính xác production.

**Trạng thái CP3: hoàn thành.** Prototype gọi Gemini thật, structured output hoạt động, trace không chứa API key, fallback đã được kiểm tra và số đo chính thức có phân tích failure.

## 4. Policy sản phẩm

- Output AI luôn theo schema: `status`, `confidence`, `reason`, `source_reference`.
- Ba status hợp lệ: `resolved`, `unresolved`, `uncertain`.
- Nếu model trả `resolved` hoặc `unresolved` nhưng confidence thấp hơn `BUDDY_CONFIDENCE_THRESHOLD` (mặc định `0.65`), backend chuyển kết quả thành `uncertain` để TA rà soát.
- API key chỉ nằm trong backend và không xuất hiện trong trace.
- Trace chỉ nên chứa dữ liệu giả lập hoặc đã ẩn danh. Kiểm tra lại trace trước khi commit repo công khai.

## 5. Thử nhanh classifier

```powershell
python codebase/ai/classifier.py --question "Em vẫn chưa chạy được bài lab, có TA hỗ trợ không ạ?"
```

Gemini mặc định dùng `gemini-3.5-flash-lite`. Nếu chuyển sang OpenRouter, dùng model cố định `qwen/qwen3.8-27b:free`; không dùng `openrouter/free` cho phép đo chính thức vì router có thể chọn model khác nhau giữa các case.
