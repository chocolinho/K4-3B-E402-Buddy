// Triage Engine for Discord TA/Mod End-of-Day Review
// Features: 4 UX Paths (Happy Path, Low Confidence, No Grounding, Correction)
// Mapped to HAX (G1, G2, G9, G10, G11) & PAIR (Conditional Automation, Feedback & Controls)

const TRIAGE_DATA = [
  {
    id: "CASE-03",
    ux_path: "HAPPY_PATH",
    ux_path_label: "Path 1: Happy Path (Resolved)",
    hax_tags: ["HAX G2 (Confidence)", "HAX G11 (Grounding)"],
    author: "D3694 (Minh Tuấn)",
    avatar_color: "#23a55a",
    channel: "#hoi-dap-lab",
    time: "10:12 Hôm nay",
    question: "Thầy ơi em bị lỗi 'CUDA out of memory' khi train model ở Lab 03 ạ.",
    thread: [
      { id: "m1", sender: "D3694", role: "STUDENT", time: "10:12", text: "Thầy ơi em bị lỗi 'CUDA out of memory' khi train model ở Lab 03 ạ. Em dùng Colab bản Free T4 GPU." },
      { id: "m2", sender: "TA_Hung", role: "TA", time: "10:15", text: "Em giảm batch_size từ 32 xuống 16 hoặc 8 nhé, nhớ gọi torch.cuda.empty_cache() trước mỗi epoch." },
      { id: "m3", sender: "D3694", role: "STUDENT", time: "10:18", text: "Dạ em giảm batch_size=8 và chạy mượt rồi ạ, cảm ơn anh Hùng nhiều!" }
    ],
    ai_decision: "RESOLVED",
    confidence: 0.96,
    confidence_level: "HIGH",
    grounding_status: "GROUNDED",
    evidence_quote: "Dạ em giảm batch_size=8 và chạy mượt rồi ạ, cảm ơn anh Hùng nhiều!",
    evidence_target_id: "m3",
    ai_reason: "Hội thoại kết thúc thành công: TA Hùng đã đưa giải pháp kỹ thuật cụ thể và học viên D3694 đã xác nhận sửa được lỗi ('chạy mượt rồi ạ') tại tin nhắn #m3.",
    duplicate_info: "Không có câu hỏi trùng lặp trong 24h qua.",
    suggested_action: "Không cần can thiệp thêm. Tự động chuyển vào kho lưu trữ giải đáp.",
    canonical_answer: null,
    audit_trail: [
      { actor: "AI Engine", action: "Tự động phân loại RESOLVED với độ tin cậy 96%", time: "10:19" }
    ]
  },
  {
    id: "CASE-01",
    ux_path: "LOW_CONFIDENCE",
    ux_path_label: "Path 2: Low Confidence (Uncertain)",
    hax_tags: ["HAX G10 (Scope Down)", "HAX G2 (Calibrate Trust)"],
    author: "D2313 (Hoàng Nam)",
    avatar_color: "#f0b232",
    channel: "#chung-k4",
    time: "14:15 Hôm nay",
    question: "có điểm danh ws chiều nay không ạ mọi người?",
    thread: [
      { id: "m1", sender: "D2313", role: "STUDENT", time: "14:15", text: "có điểm danh ws chiều nay không ạ mọi người?" },
      { id: "m2", sender: "@BOT_Welcome", role: "BOT", time: "14:16", text: "Chào bạn, workshop có thể có điểm danh tùy theo yêu cầu của ban tổ chức. Bạn nên theo dõi thông báo nhé!" }
    ],
    ai_decision: "UNCERTAIN",
    confidence: 0.58,
    confidence_level: "MEDIUM",
    grounding_status: "PARTIAL",
    evidence_quote: "@BOT_Welcome: 'có thể có điểm danh tùy theo yêu cầu...'",
    evidence_target_id: "m2",
    ai_reason: "Phản hồi từ Bot mang tính chất né tránh/chưa rõ ràng (hedging). Chưa có xác nhận chính thức từ TA/BTC nhưng câu hỏi khớp với mục FAQ Quy chế điểm danh.",
    duplicate_info: "Trùng ý với 3 câu hỏi tương tự tại #thao-luan-chung trong tuần qua.",
    suggested_action: "TA bấm 1 chạm gửi câu trả lời chuẩn về quy chế điểm danh Zoom tự động để chốt thông tin dứt điểm.",
    canonical_answer: "Hệ thống điểm danh tự động qua Zoom dựa trên đúng cú pháp tên đăng nhập (KX-HoVaTen-MSSV). Học viên vào đúng giờ không cần điền thêm form bên ngoài.",
    audit_trail: [
      { actor: "AI Engine", action: "Đánh dấu UNCERTAIN do bot trả lời thiếu khẳng định (Áp dụng HAX G10)", time: "14:17" }
    ]
  },
  {
    id: "CASE-02",
    ux_path: "NO_GROUNDING",
    ux_path_label: "Path 3: No Grounding (Failure/Unresolved)",
    hax_tags: ["HAX G10 (Fall Back)", "HAX G8 (Dismiss/Escalate)"],
    author: "D6134 (Khánh Linh)",
    avatar_color: "#f23f43",
    channel: "#tim-dong-doi",
    time: "15:30 Hôm nay (3.5 giờ trước)",
    question: "Hạn tìm đồng đội ghép team hackathon đến mấy giờ thế mọi người ơi, em chưa có nhóm cứu em với!!!",
    thread: [
      { id: "m1", sender: "D6134", role: "STUDENT", time: "15:30", text: "Hạn tìm đồng đội ghép team hackathon đến mấy giờ thế mọi người ơi, em chưa có nhóm cứu em với!!!" }
    ],
    ai_decision: "UNRESOLVED",
    confidence: 0.15,
    confidence_level: "LOW",
    grounding_status: "NO_GROUNDING",
    evidence_quote: null,
    evidence_target_id: null,
    ai_reason: "CẢNH BÁO THIẾU CĂN CỨ (No Grounding): Luồng thảo luận bị trôi không có bất kỳ phản hồi nào suốt hơn 3.5 giờ. Học viên có dấu hiệu hoang mang cao độ.",
    duplicate_info: "Học viên chưa được ghép đội. Có 4 học viên khác cũng đang tìm bạn cùng nhánh B2.",
    suggested_action: "Cần TA can thiệp ngay lập tức: Gửi thông báo hạn chốt 21:00 và ghép bạn vào kênh kết nối nhanh.",
    canonical_answer: "Hạn chót chốt danh sách đội trên hệ thống Phoenix là 21:00 tối nay. Bạn vào kênh #ghep-nhanh-b2 để kết nối với các bạn đang lẻ người nhé!",
    audit_trail: [
      { actor: "AI Engine", action: "Báo động đỏ UNRESOLVED vì 0 tin phản hồi sau 3h (Áp dụng Graceful Failure)", time: "18:30" }
    ]
  },
  {
    id: "CASE-04",
    ux_path: "CORRECTION",
    ux_path_label: "Path 4: Correction (TA Override Flow)",
    hax_tags: ["HAX G9 (Efficient Correction)", "PAIR Ch.5 (Control)"],
    author: "D9041 (Quốc Bảo)",
    avatar_color: "#5865f2",
    channel: "#hoi-dap-lab",
    time: "16:45 Hôm nay",
    question: "Hôm nay em bận đột xuất không vào Zoom buổi chiều được thì có bị trừ XP không ạ?",
    thread: [
      { id: "m1", sender: "D9041", role: "STUDENT", time: "16:45", text: "Hôm nay em bận đột xuất không vào Zoom buổi chiều được thì có bị trừ XP không ạ?" },
      { id: "m2", sender: "D0485_BanHoc", role: "STUDENT", time: "16:48", text: "Hình như xem record làm quiz bù được đó bạn ơi, không sao đâu." }
    ],
    ai_decision: "UNCERTAIN",
    confidence: 0.62,
    confidence_level: "MEDIUM",
    grounding_status: "PARTIAL",
    evidence_quote: "D0485: 'Hình như xem record làm quiz bù được đó...'",
    evidence_target_id: "m2",
    ai_reason: "Thông tin do bạn học cùng lớp phỏng đoán ('Hình như'), chưa có chế tài bảo lưu chính thức từ TA/BTC.",
    duplicate_info: "Khớp 85% với chính sách bảo lưu buổi học trong cẩm nang sinh viên.",
    suggested_action: "Dành cho Demo: Thử bấm nút '✓ Đã xử lý' hoặc '⚡ Gửi câu trả lời chuẩn' để xem cơ chế ghi đè của TA (Correction Flow).",
    canonical_answer: "Vắng mặt có phép trước 12:00 và hoàn thành xem record + quiz bù trong 24h được bảo lưu 100% XP điểm danh.",
    audit_trail: [
      { actor: "AI Engine", action: "Khởi tạo trạng thái UNCERTAIN", time: "16:50" }
    ]
  },
  {
    id: "CASE-05",
    ux_path: "NO_GROUNDING",
    ux_path_label: "Path 3: Hallucination Prevention",
    hax_tags: ["HAX G10 (Scope Down)", "HAX G1 (Scope)"],
    author: "D1120 (Phương Thảo)",
    avatar_color: "#eb459e",
    channel: "#chung-k4",
    time: "09:05 Hôm nay",
    question: "Cho em xin lại link Zoom workshop sáng nay với ạ, em tìm trong mail không thấy",
    thread: [
      { id: "m1", sender: "D1120", role: "STUDENT", time: "09:05", text: "Cho em xin lại link Zoom workshop sáng nay với ạ, em tìm trong mail không thấy" },
      { id: "m2", sender: "@BOT_Support", role: "BOT", time: "09:06", text: "Link tham gia workshop đã được gửi tự động qua email của bạn, hãy kiểm tra hộp thư rác." }
    ],
    ai_decision: "UNRESOLVED",
    confidence: 0.35,
    confidence_level: "LOW",
    grounding_status: "NO_GROUNDING",
    evidence_quote: "Bot trả lời sai: BTC chỉ gửi link tại kênh ghim #announcement, không gửi mail cá nhân.",
    evidence_target_id: "m2",
    ai_reason: "BOT cung cấp thông tin sai lệch so với nguồn tài liệu khóa học. Link Zoom được ghim tại #announcement chứ không gửi qua email cá nhân.",
    duplicate_info: "5 trường hợp học viên tìm link trong email do bot đưa tin sai.",
    suggested_action: "Đính chính thông tin và hướng dẫn học viên vào kênh #announcement.",
    canonical_answer: "Link Zoom chính thức cho mọi buổi học được ghim tại kênh #announcement. Để bảo mật, BTC không gửi qua email.",
    audit_trail: [
      { actor: "AI Engine", action: "Đánh dấu UNRESOLVED và chặn thông tin sai của bot", time: "09:08" }
    ]
  },
  {
    id: "CASE-06",
    ux_path: "HAPPY_PATH",
    ux_path_label: "Path 1: Happy Path (Server issue)",
    hax_tags: ["HAX G11 (Grounding)", "HAX G2 (High Confidence)"],
    author: "D7781 (Đức Anh)",
    avatar_color: "#57f287",
    channel: "#hoi-dap-lab",
    time: "11:20 Hôm nay",
    question: "Em nộp bài trên Phoenix bị báo mã lỗi 502 Bad Gateway có ai bị không?",
    thread: [
      { id: "m1", sender: "D7781", role: "STUDENT", time: "11:20", text: "Em nộp bài trên Phoenix bị báo mã lỗi 502 Bad Gateway có ai bị không?" },
      { id: "m2", sender: "TA_Minh", role: "TA", time: "11:22", text: "Hệ thống Phoenix vừa bảo trì 5 phút đã xong, em F5 nộp lại nhé." },
      { id: "m3", sender: "D7781", role: "STUDENT", time: "11:24", text: "Em nộp được rồi ạ, cảm ơn TA!" }
    ],
    ai_decision: "RESOLVED",
    confidence: 0.98,
    confidence_level: "HIGH",
    grounding_status: "GROUNDED",
    evidence_quote: "D7781: 'Em nộp được rồi ạ, cảm ơn TA!'",
    evidence_target_id: "m3",
    ai_reason: "Sự cố hạ tầng tạm thời, TA Minh đã phản hồi ngay và học viên đã xác nhận nộp bài thành công.",
    duplicate_info: "Đã có 4 bạn khác gặp lỗi tương tự trong cùng khung giờ bảo trì và đã tự phục hồi.",
    suggested_action: "Không cần xử lý thêm.",
    canonical_answer: null,
    audit_trail: [
      { actor: "AI Engine", action: "Phân loại RESOLVED tự động", time: "11:25" }
    ]
  }
];

function getStatusBadge(status) {
  switch(status) {
    case 'RESOLVED':
      return '<span class="badge badge-resolved"><span class="badge-dot"></span>✓ RESOLVED</span>';
    case 'UNRESOLVED':
      return '<span class="badge badge-unresolved"><span class="badge-dot"></span>⚠ UNRESOLVED</span>';
    case 'UNCERTAIN':
      return '<span class="badge badge-uncertain"><span class="badge-dot"></span>? UNCERTAIN</span>';
    default:
      return status;
  }
}
