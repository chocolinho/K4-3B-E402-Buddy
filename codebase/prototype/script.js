const QUESTIONS = [
  {
    id: "q-101",
    scenario: "Luồng thuận lợi",
    question: "Em chạy bài lab nhưng bước kiểm thử cuối vẫn báo lỗi. Có TA nào xem giúp em với ạ?",
    status: "unresolved",
    confidence: 0.94,
    reason: "Luồng có lỗi cụ thể nhưng chưa có phản hồi hoặc xác nhận đã xử lý.",
    source: "#help-lab · thread-demo-101",
    contextSummary: "Không tìm thấy câu trả lời sau câu hỏi trong cùng luồng.",
    messages: [
      ["Học viên-01", "Em chạy bài lab nhưng bước kiểm thử cuối vẫn báo lỗi.", false],
      ["Hệ thống", "Đã dò toàn bộ luồng đến 17:00: chưa có phản hồi liên quan.", true]
    ]
  },
  {
    id: "q-102",
    scenario: "Câu hỏi trùng ý",
    question: "Nộp lại bài sau hạn có bị ghi đè bản cũ không ạ?",
    status: "unresolved",
    confidence: 0.86,
    reason: "Được nhóm với hai cách hỏi tương tự, nhưng chưa có câu trả lời từ nguồn chính thức.",
    source: "#course-help · group-demo-07",
    contextSummary: "Ba câu hỏi có cùng ý định được nhóm lại; chưa có câu trả lời chính thức.",
    messages: [
      ["Học viên-02", "Nộp lại bài sau hạn có bị ghi đè bản cũ không ạ?", false],
      ["Học viên-03", "Nếu nộp lần hai thì hệ thống lấy tệp nào?", false],
      ["Truy xuất", "Độ tương đồng giả lập: cao. Không có nguồn hạn nộp chính thức.", true]
    ]
  },
  {
    id: "q-103",
    scenario: "Đã trả lời ở nơi khác",
    question: "Em tìm tiêu chí chấm của bài này ở đâu vậy ạ?",
    status: "resolved",
    confidence: 0.92,
    reason: "Một luồng liên quan đã dẫn tới tiêu chí chấm và người hỏi xác nhận mở được.",
    source: "#announcements · thread-demo-103",
    contextSummary: "Câu trả lời được truy xuất từ một luồng giả lập khác.",
    messages: [
      ["Học viên-04", "Em tìm tiêu chí chấm của bài này ở đâu vậy ạ?", false],
      ["TA-Demo", "Tiêu chí chấm nằm trong mục Tài nguyên của bài tập.", true],
      ["Học viên-04", "Em mở được rồi, cảm ơn TA ạ.", false]
    ]
  },
  {
    id: "q-104",
    scenario: "Tin nhắn bot/hệ thống",
    question: "Bot nhắc việc: Bạn đã hoàn thành biểu mẫu chưa?",
    status: "uncertain",
    confidence: 0.38,
    reason: "Nguồn được nhận diện là bot/hệ thống, không nên coi là câu hỏi hỗ trợ của học viên.",
    source: "#reminders · message-demo-104",
    contextSummary: "Loại nguồn: bot/hệ thống. Không đề xuất phản hồi cho học viên.",
    messages: [
      ["Bot-nhắc-việc", "Bạn đã hoàn thành biểu mẫu chưa?", false],
      ["Bộ phân loại", "Ứng viên bị loại: tin nhắn do hệ thống gửi.", true]
    ]
  },
  {
    id: "q-105",
    scenario: "Cùng người gửi lặp lại",
    question: "Em vẫn chưa chạy được lệnh cài đặt, lỗi lúc nãy vẫn còn ạ.",
    status: "unresolved",
    confidence: 0.89,
    reason: "Cùng người gửi lặp lại vấn đề và chưa xác nhận cách khắc phục trước đó có hiệu quả.",
    source: "#setup-help · thread-demo-105",
    contextSummary: "Hai tin của cùng một định danh giả lập được nối vào một vấn đề.",
    messages: [
      ["Học viên-05", "Em chạy lệnh cài đặt thì bị lỗi quyền truy cập.", false],
      ["TA-Demo", "Em thử mở terminal thường và gửi lại mã lỗi nhé.", true],
      ["Học viên-05", "Em vẫn chưa chạy được, lỗi lúc nãy vẫn còn ạ.", false]
    ]
  },
  {
    id: "q-106",
    scenario: "Không có căn cứ",
    question: "Cái này làm như hôm trước là được đúng không ạ?",
    status: "uncertain",
    confidence: 0.31,
    reason: "Không tìm thấy đối tượng mà “cái này” đề cập hoặc ngữ cảnh liên quan để kiểm chứng.",
    source: "#general-help · message-demo-106",
    contextSummary: "Không có căn cứ: chỉ có một tin nhắn mơ hồ trong phạm vi truy xuất.",
    messages: [
      ["Học viên-06", "Cái này làm như hôm trước là được đúng không ạ?", false],
      ["Truy xuất", "Không tìm thấy tin liên quan trong phạm vi giả lập.", true]
    ]
  }
];

const STATUSES = {
  unresolved: {
    label: "Chưa xử lý",
    icon: "!",
    summary: "Cần TA ưu tiên",
    action: "Đánh dấu chưa xử lý",
    filterDescription: "Đang hiển thị các vấn đề chưa được xử lý."
  },
  uncertain: {
    label: "Chưa chắc chắn",
    icon: "?",
    summary: "Cần TA kiểm tra",
    action: "Cần kiểm tra",
    filterDescription: "Đang hiển thị các vấn đề chưa đủ căn cứ để kết luận."
  },
  resolved: {
    label: "Đã xử lý",
    icon: "✓",
    summary: "Đã có căn cứ",
    action: "Đánh dấu đã xử lý",
    filterDescription: "Đang hiển thị các vấn đề đã có căn cứ xử lý."
  }
};

const STORAGE_KEY = "buddy-overrides";
const elements = {
  summary: document.querySelector("#summary-grid"),
  list: document.querySelector("#question-list"),
  empty: document.querySelector("#empty-state"),
  filterDescription: document.querySelector("#filter-description"),
  showAll: document.querySelector("#show-all-button"),
  dialog: document.querySelector("#context-dialog"),
  dialogTitle: document.querySelector("#dialog-title"),
  dialogContent: document.querySelector("#dialog-content"),
  toast: document.querySelector("#toast")
};

const state = {
  activeFilter: "unresolved",
  activeQuestionId: null,
  overrides: loadOverrides()
};

function loadOverrides() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
    return Object.fromEntries(
      Object.entries(saved).filter(([, status]) => Object.hasOwn(STATUSES, status))
    );
  } catch {
    return {};
  }
}

function saveOverrides() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.overrides));
  } catch {
    // Prototype vẫn hoạt động nếu trình duyệt chặn bộ nhớ trên địa chỉ file cục bộ.
  }
}

function currentStatus(question) {
  return state.overrides[question.id] || question.status;
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

function getCounts() {
  return QUESTIONS.reduce((counts, question) => {
    counts[currentStatus(question)] += 1;
    return counts;
  }, { resolved: 0, unresolved: 0, uncertain: 0 });
}

function renderSummary() {
  const counts = getCounts();
  elements.summary.innerHTML = Object.entries(STATUSES).map(([status, config]) => `
    <button class="summary-card status-${status} ${state.activeFilter === status ? "active" : ""}"
      type="button" data-action="filter" data-status="${status}"
      aria-pressed="${state.activeFilter === status}">
      <span class="summary-icon" aria-hidden="true">${config.icon}</span>
      <span class="summary-copy"><strong>${config.label}</strong><small>${config.summary}</small></span>
      <span class="summary-count">${counts[status]}</span>
    </button>`).join("");
}

function renderQuestions() {
  const visibleQuestions = QUESTIONS.filter((question) =>
    state.activeFilter === "all" || currentStatus(question) === state.activeFilter
  );

  elements.list.innerHTML = visibleQuestions.map(renderCard).join("");
  elements.list.hidden = visibleQuestions.length === 0;
  elements.empty.hidden = visibleQuestions.length !== 0;
  elements.showAll.classList.toggle("active", state.activeFilter === "all");
  elements.filterDescription.textContent = state.activeFilter === "all"
    ? `Đang hiển thị toàn bộ ${QUESTIONS.length} tình huống giả lập.`
    : STATUSES[state.activeFilter].filterDescription;
}

function renderCard(question) {
  const status = currentStatus(question);
  const config = STATUSES[status];
  const originalConfig = STATUSES[question.status];
  const isOverridden = Object.hasOwn(state.overrides, question.id);
  const uncertainNote = status === "uncertain"
    ? '<p class="uncertain-note">Không đủ căn cứ để xác định trạng thái. Cần TA kiểm tra.</p>'
    : "";
  const overrideNote = isOverridden
    ? `<p class="override-note">TA đã đổi từ “${originalConfig.label}” thành “${config.label}”. Quyết định của TA được ưu tiên.</p>`
    : "";
  const statusButtons = Object.entries(STATUSES).map(([option, optionConfig]) => `
    <button class="action-button" type="button" data-action="status" data-id="${question.id}"
      data-status="${option}" aria-pressed="${status === option}">${optionConfig.action}</button>`).join("");

  return `
    <article class="question-card" data-id="${question.id}">
      <div>
        <div class="card-topline">
          <span class="status-pill ${status}">${config.label}</span>
          <span class="case-tag">${escapeHtml(question.scenario)}</span>
          ${isOverridden ? '<span class="human-pill">TA đã sửa</span>' : ""}
        </div>
        <h3>${escapeHtml(question.question)}</h3>
        <div class="reason-box">
          <strong>Lý do AI đề xuất</strong>
          <p>${escapeHtml(question.reason)}</p>
        </div>
        ${uncertainNote}
        ${overrideNote}
        <a class="source-link" href="#${question.id}" data-action="context" data-id="${question.id}">↗ ${escapeHtml(question.source)}</a>
      </div>
      <div class="confidence" aria-label="Độ tin cậy ban đầu của AI ${Math.round(question.confidence * 100)} phần trăm">
        <strong>${Math.round(question.confidence * 100)}%</strong>
        <span>Độ tin cậy AI ban đầu</span>
        <div class="confidence-bar" aria-hidden="true"><i style="--confidence:${question.confidence * 100}%"></i></div>
      </div>
      <div class="actions">
        <button class="action-button context" type="button" data-action="context" data-id="${question.id}">Xem ngữ cảnh</button>
        ${statusButtons}
      </div>
    </article>`;
}

function render() {
  renderSummary();
  renderQuestions();
}

function showContext(id) {
  const question = QUESTIONS.find((item) => item.id === id);
  if (!question) return;

  const status = currentStatus(question);
  state.activeQuestionId = id;
  elements.dialogTitle.textContent = question.scenario;
  elements.dialogContent.innerHTML = `
    <div class="decision-summary">
      <span>Đề xuất ban đầu: <strong>${STATUSES[question.status].label}</strong></span>
      <span>Quyết định hiện tại: <strong>${STATUSES[status].label}</strong></span>
    </div>
    <div class="context-summary"><strong>Căn cứ truy xuất:</strong> ${escapeHtml(question.contextSummary)}</div>
    ${question.messages.map(([sender, message, related]) => `
      <div class="message ${related ? "related" : ""}">
        <strong>${escapeHtml(sender)}</strong>
        <p>${escapeHtml(message)}</p>
      </div>`).join("")}`;
  elements.dialog.showModal();
}

function updateStatus(id, status) {
  const question = QUESTIONS.find((item) => item.id === id);
  if (!question || !Object.hasOwn(STATUSES, status)) return;

  state.overrides[id] = status;
  saveOverrides();
  render();
  showToast(`Đã lưu quyết định của TA: ${STATUSES[status].label}.`);
}

let toastTimer;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 2600);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const { action, id, status } = target.dataset;
  if (action === "context") {
    event.preventDefault();
    showContext(id);
  } else if (action === "status") {
    updateStatus(id, status);
  } else if (action === "filter") {
    state.activeFilter = status;
    render();
  } else if (action === "show-all") {
    state.activeFilter = "all";
    render();
  } else if (action === "reset") {
    state.overrides = {};
    state.activeFilter = "unresolved";
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* Không cần lưu khi bộ nhớ bị chặn. */ }
    render();
    showToast("Đã đặt lại toàn bộ quyết định trong bản demo.");
  }
});

document.querySelector("#close-dialog").addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});
document.querySelector("#open-source-button").addEventListener("click", () => {
  const question = QUESTIONS.find((item) => item.id === state.activeQuestionId);
  elements.dialog.close();
  showToast(`Mô phỏng — sẽ mở ${question ? question.source : "luồng gốc"} để TA tự phản hồi.`);
});

render();
