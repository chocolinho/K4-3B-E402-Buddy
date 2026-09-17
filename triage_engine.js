// Triage Engine for Discord TA/Mod End-of-Day Review
// Decides: RESOLVED | UNRESOLVED | UNCERTAIN based on conversation context

const TRIAGE_DATA = [
  {
    id: "CASE-01",
    author: "D2313",
    channel: "channel_02",
    time: "14:15",
    question: "có điểm danh ws không ạ",
    thread: [
      { sender: "D2313", text: "có điểm danh ws không ạ" },
      { sender: "@BOT", text: "Chào bạn, workshop có thể có điểm danh tùy theo yêu cầu của ban tổ chức. Bạn nên theo dõi thông báo nhé!" }
    ],
    ai_decision: "UNCERTAIN",
    ai_reason: "Bot trả lời chung chung (hedging), chưa khẳng định quy chế. Nhưng câu hỏi trùng với FAQ điểm danh tự động qua Zoom.",
    suggested_action: "Gửi câu trả lời chuẩn về quy chế điểm danh tự động",
    canonical_answer: "Hệ thống điểm danh tự động qua Zoom dựa trên đúng cú pháp tên (KX-HoVaTen-MSSV). Không cần form điểm danh riêng."
  },
  {
    id: "CASE-02",
    author: "D6134",
    channel: "channel_02",
    time: "15:30",
    question: "Hạn tìm đồng đội đến bao giờ thế mọi người ơi!!!",
    thread: [
      { sender: "D6134", text: "Hạn tìm đồng đội đến bao giờ thế mọi người ơi!!!" }
    ],
    ai_decision: "UNRESOLVED",
    ai_reason: "Chưa có bất kỳ phản hồi nào sau 4 giờ đăng tin (313 ca tin nhắn trôi không người reply). Học viên có dấu hiệu hoang mang.",
    suggested_action: "TA phản hồi gấp về hạn chốt 21:00 trên Phoenix",
    canonical_answer: "Hạn chốt ghép đội trên hệ thống Phoenix là 21:00 hôm nay. Cả L2 và L3 đều cần đăng ký team."
  },
  {
    id: "CASE-03",
    author: "D3694",
    channel: "channel_10",
    time: "10:12",
    question: "Thầy ơi em bị lỗi 'CUDA out of memory' khi train model ở Lab 03 ạ.",
    thread: [
      { sender: "D3694", text: "Thầy ơi em bị lỗi 'CUDA out of memory' khi train model ở Lab 03 ạ." },
      { sender: "TA_Hung", text: "Em giảm batch_size từ 32 xuống 16 hoặc 8 nhé, nhớ bật torch.cuda.empty_cache()." },
      { sender: "D3694", text: "Dạ em làm được rồi, cảm ơn anh Hùng nhiều ạ!" }
    ],
    ai_decision: "RESOLVED",
    ai_reason: "TA Hùng đã hướng dẫn và học viên đã xác nhận 'Dạ em làm được rồi'. Hội thoại kết thúc trọn vẹn.",
    suggested_action: "Không cần thao tác thêm",
    canonical_answer: null
  },
  {
    id: "CASE-04",
    author: "D9041",
    channel: "channel_11",
    time: "16:45",
    question: "Hôm nay em bận đột xuất không vào Zoom buổi chiều được thì có bị trừ XP không?",
    thread: [
      { sender: "D9041", text: "Hôm nay em bận đột xuất không vào Zoom buổi chiều được thì có bị trừ XP không?" },
      { sender: "D0485", text: "Hình như xem record làm quiz bù được đó bạn" }
    ],
    ai_decision: "UNCERTAIN",
    ai_reason: "Chỉ có bạn học D0485 trả lời với từ ngữ 'hình như', chưa có xác nhận chính thức từ TA/Mod.",
    suggested_action: "TA xác nhận quy chế xem record làm quiz bù điểm danh",
    canonical_answer: "Vắng mặt có phép và xem record + hoàn thành quiz trong 24h được bảo lưu điểm danh, không bị trừ XP."
  },
  {
    id: "CASE-05",
    author: "D1120",
    channel: "channel_02",
    time: "09:05",
    question: "Cho em xin lại link Zoom workshop sáng nay với ạ",
    thread: [
      { sender: "D1120", text: "Cho em xin lại link Zoom workshop sáng nay với ạ" },
      { sender: "@BOT", text: "Link tham gia workshop đã được gửi qua email của bạn." }
    ],
    ai_decision: "UNRESOLVED",
    ai_reason: "Bot trả lời sai thông tin (Zoom đăng ở kênh thông báo Discord chứ không gửi qua email). Câu hỏi đã được giải quyết ở kênh thông báo nhưng học viên chưa biết.",
    suggested_action: "Điều hướng học viên sang kênh announcement lấy link chuẩn",
    canonical_answer: "Link Zoom chính thức được ghim tại kênh #announcement. Vui lòng không dùng link chia sẻ ngoài."
  },
  {
    id: "CASE-06",
    author: "D7781",
    channel: "channel_10",
    time: "11:20",
    question: "Em nộp bài trên Phoenix bị báo mã lỗi 502 Bad Gateway có ai bị không?",
    thread: [
      { sender: "D7781", text: "Em nộp bài trên Phoenix bị báo mã lỗi 502 Bad Gateway có ai bị không?" },
      { sender: "TA_Minh", text: "Hệ thống Phoenix vừa bảo trì 5 phút đã xong, em F5 nộp lại nhé." },
      { sender: "D7781", text: "Em nộp được rồi ạ!" }
    ],
    ai_decision: "RESOLVED",
    ai_reason: "Lỗi server tạm thời, TA Minh đã thông báo và học viên đã nộp thành công.",
    suggested_action: "Không cần thao tác thêm",
    canonical_answer: null
  }
];

function getStatusBadge(status) {
  switch(status) {
    case 'RESOLVED':
      return '<span class="badge badge-resolved">✓ RESOLVED</span>';
    case 'UNRESOLVED':
      return '<span class="badge badge-unresolved">⚠ UNRESOLVED</span>';
    case 'UNCERTAIN':
      return '<span class="badge badge-uncertain">? UNCERTAIN</span>';
    default:
      return status;
  }
}
