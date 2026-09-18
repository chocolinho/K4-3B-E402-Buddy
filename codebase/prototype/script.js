const QUESTIONS = [
  {
    id: "q-201",
    scenario: "Đã trả lời ở nơi khác",
    question: "Xem XP ở đâu?",
    status: "resolved",
    confidence: 0.93,
    reason: "Một câu hỏi cùng intent đã được bot hướng dẫn xem XP bằng Discord ID hoặc lệnh /rank.",
    source: "channel_10 · M18056, M58005, M42137",
    contextSummary: "Câu hỏi hiện tại khớp với một luồng trước đó đã có hướng dẫn cụ thể.",
    messages: [
      ["Học viên-A", "Xem XP ở đâu?", false],
      ["Học viên-B", "Bot ơi, xem XP ở đâu?", false],
      ["Buddy Bot", "Có thể tra XP theo Discord ID hoặc xem lịch sử bằng lệnh /rank.", true]
    ]
  },
  {
    id: "q-202",
    scenario: "Câu hỏi lặp đã có đáp án",
    question: "Hạn nộp daily stand-up là khi nào?",
    status: "resolved",
    confidence: 0.96,
    reason: "Hai học viên hỏi cùng intent và đều nhận được câu trả lời nhất quán về khung giờ nộp.",
    source: "channel_10 · M07653, M14873, M45837, M33935",
    contextSummary: "Hai luồng độc lập cùng xác nhận khung giờ 0h–10h; nộp muộn không được cộng XP.",
    messages: [
      ["Học viên-C", "Hạn nộp daily stand-up?", false],
      ["Buddy Bot", "Khung giờ nộp hàng ngày là 0h–10h; nộp muộn vẫn ghi nhận nhưng không cộng XP.", true],
      ["Học viên-D", "Hạn nộp daily stand-up là khi nào?", false]
    ]
  },
  {
    id: "q-203",
    scenario: "Hướng dẫn lệnh",
    question: "Pick là chốt đề tài à, về sau dùng lệnh gì để chọn lại?",
    status: "resolved",
    confidence: 0.97,
    reason: "Bot trả lời trực tiếp: /topic pick để chọn đề tài và /topic change để đổi đề tài.",
    source: "channel_10 · M02135, M02793, M63853",
    contextSummary: "Cùng người gửi đặt hai bản câu hỏi; bản có tag bot nhận được câu trả lời đúng intent.",
    messages: [
      ["Học viên-E", "Pick là chốt đề tài à, về sau dùng lệnh gì để chọn lại?", false],
      ["Buddy Bot", "/topic pick dùng để chọn đề tài; nếu muốn đổi hãy dùng /topic change.", true]
    ]
  },
  {
    id: "q-204",
    scenario: "Bot trả lời không nhất quán",
    question: "Làm sao để tạo ticket?",
    status: "resolved",
    confidence: 0.84,
    reason: "Một phản hồi hiểu nhầm 'ticket', nhưng phản hồi còn lại đưa đúng lệnh /ticket create và các bước cần thiết.",
    source: "channel_10 · M37242, M55412, M59182, M11596",
    contextSummary: "Hai câu giống nhau của cùng người gửi nhận hai phản hồi khác nhau; có một phản hồi đúng và dùng được.",
    messages: [
      ["Học viên-F", "Làm sao để tạo ticket?", false],
      ["Buddy Bot", "Bạn muốn tạo ticker cho Discord, dự án hay chứng khoán?", true],
      ["Buddy Bot", "Gõ /ticket create, chọn loại ticket, điền tiêu đề và mô tả vấn đề.", true]
    ]
  },
  {
    id: "q-205",
    scenario: "Đã tự xử lý",
    question: "Em bị lỗi ở bước này thì phải làm sao ạ?",
    status: "resolved",
    confidence: 0.91,
    reason: "Người hỗ trợ yêu cầu thêm output và người hỏi sau đó xác nhận đã tự khắc phục được lỗi.",
    source: "channel_08 · M44947, M94723, M28055",
    contextSummary: "Luồng kết thúc bằng xác nhận đã sửa được lỗi, nên không cần TA tiếp tục can thiệp.",
    messages: [
      ["Học viên-G", "Em bị lỗi ở bước này thì phải làm sao ạ? (có 1 ảnh đính kèm)", false],
      ["Người hỗ trợ", "Bạn chạy docker compose ps rồi gửi output để mình xem thêm nhé.", true],
      ["Học viên-G", "Mình fix được lỗi rồi, cảm ơn bạn nhiều nhé.", false]
    ]
  },
  {
    id: "q-206",
    scenario: "Trả lời sai intent",
    question: "Cách nộp daily stand-up như thế nào?",
    status: "unresolved",
    confidence: 0.94,
    reason: "Người hỏi cần cách nộp nhưng phản hồi chỉ nói về khung giờ; thao tác và nơi nộp vẫn chưa được giải đáp.",
    source: "channel_10 · M41736, M11802",
    contextSummary: "Phản hồi có liên quan đến daily stand-up nhưng không trả lời đúng nhu cầu của câu hỏi.",
    messages: [
      ["Học viên-H", "Cách nộp daily stand-up?", false],
      ["Buddy Bot", "Khung giờ nộp là 0h–10h; nộp muộn không được cộng XP.", true]
    ]
  },
  {
    id: "q-207",
    scenario: "Không có nguồn xác thực",
    question: "Hạn nộp Lab02 là khi nào?",
    status: "unresolved",
    confidence: 0.9,
    reason: "Không có ngày giờ cụ thể trong dữ liệu; bot chỉ hướng người hỏi tới các kênh thông báo chính thức.",
    source: "channel_10 · M07416, M28485",
    contextSummary: "Câu hỏi rõ ràng nhưng chưa có câu trả lời chứa deadline đáng tin cậy.",
    messages: [
      ["Học viên-I", "Hạn nộp Lab02?", false],
      ["Buddy Bot", "Mình chưa có ngày giờ cụ thể; hãy kiểm tra kênh thông báo, Phoenix hoặc Vlearn.", true]
    ]
  },
  {
    id: "q-208",
    scenario: "Hướng dẫn chưa giải quyết vấn đề",
    question: "Em đặt sai tên khi vào Zoom nên không được ghi nhận. Em cần xử lý thế nào?",
    status: "unresolved",
    confidence: 0.92,
    reason: "Phản hồi chỉ nhắc cú pháp đặt tên đúng cho lần sau, chưa hướng dẫn xử lý lượt điểm danh đã bị bỏ lỡ.",
    source: "channel_10 · M45740, M51183",
    contextSummary: "Người hỏi cần khắc phục hậu quả hoặc tạo ticket, nhưng câu trả lời không đưa ra quy trình đó.",
    messages: [
      ["Học viên-J", "Em đặt sai tên khi vào Zoom nên không được ghi nhận; nếu tạo ticket thì làm thế nào?", false],
      ["Buddy Bot", "Hãy đăng nhập đúng email và đặt tên đúng cú pháp để được điểm danh tự động.", true]
    ]
  },
  {
    id: "q-209",
    scenario: "Thiếu nội dung attachment",
    question: "Em chạy tới bước 3 thì bị lỗi như này ạ.",
    status: "uncertain",
    confidence: 0.34,
    reason: "Tin nhắn phụ thuộc vào hai ảnh đính kèm nhưng data pack không chứa nội dung ảnh để xác định lỗi.",
    source: "channel_08 · M51326",
    contextSummary: "Có 2 attachments, không có log dạng text và không đủ căn cứ để phân loại vấn đề.",
    messages: [
      ["Học viên-K", "Em chạy tới bước 3 thì bị lỗi như này ạ.", false],
      ["Truy xuất", "Phát hiện 2 attachments nhưng không có nội dung ảnh trong tập dữ liệu.", true]
    ]
  },
  {
    id: "q-210",
    scenario: "Tin nhắn do bot gửi",
    question: "Có thể tra XP bằng Discord ID hoặc xem lịch sử bằng lệnh /rank.",
    status: "uncertain",
    confidence: 0.18,
    reason: "Đây là câu trả lời do bot tạo ra, không phải yêu cầu hỗ trợ mới của học viên.",
    source: "channel_10 · M42137",
    contextSummary: "author = BOT và is_bot = true; hệ thống không nên tạo ticket hỗ trợ từ message này.",
    messages: [
      ["Buddy Bot", "Có thể tra XP bằng Discord ID hoặc xem lịch sử bằng lệnh /rank.", false],
      ["Bộ phân loại", "Bỏ qua ứng viên vì nguồn gửi là bot/hệ thống.", true]
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
  toast: document.querySelector("#toast"),
  apiStatus: document.querySelector("#api-status")
};

const state = {
  activeFilter: "unresolved",
  activeQuestionId: null,
  overrides: loadOverrides(),
  analyses: {},
  loading: new Set()
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
  return state.overrides[question.id] || decisionFor(question).status;
}

function decisionFor(question) {
  return state.analyses[question.id] || {
    status: question.status,
    confidence: question.confidence,
    reason: question.reason,
    source_reference: question.source,
    fallback: false,
    live: false
  };
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

function confidenceMeta(score) {
  if (score >= 0.8) return { label: "Tin cậy cao", className: "high" };
  if (score >= 0.55) return { label: "Cần đối chiếu", className: "medium" };
  return { label: "Tin cậy thấp", className: "low" };
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
  const decision = decisionFor(question);
  const status = currentStatus(question);
  const config = STATUSES[status];
  const originalConfig = STATUSES[question.status];
  const isOverridden = Object.hasOwn(state.overrides, question.id);
  const isLoading = state.loading.has(question.id);
  const confidence = confidenceMeta(decision.confidence);
  const engineLabel = decision.live
    ? (decision.fallback ? '<span class="engine-pill fallback">Fallback</span>' : `<span class="engine-pill live">${escapeHtml(decision.provider || "AI")} thật</span>`)
    : '<span class="engine-pill mock">Mock CP2</span>';
  const uncertainNote = status === "uncertain"
    ? '<p class="uncertain-note">Không đủ căn cứ để xác định trạng thái. Cần TA kiểm tra.</p>'
    : "";
  const overrideNote = isOverridden
    ? `<p class="override-note">TA đã đổi từ “${originalConfig.label}” thành “${config.label}”. Quyết định của TA được ưu tiên.</p>`
    : "";
  const statusButtons = Object.entries(STATUSES).map(([option, optionConfig]) => `
    <button class="action-button" type="button" data-action="status" data-id="${question.id}"
      data-status="${option}" aria-pressed="${status === option}">${optionConfig.label}</button>`).join("");

  return `
    <article class="question-card status-${status} ${decision.live ? "is-live" : ""} ${isLoading ? "is-loading" : ""}" data-id="${question.id}">
      <div>
        <div class="card-topline">
          <span class="status-pill ${status}">${config.label}</span>
          <span class="case-tag">${escapeHtml(question.scenario)}</span>
          ${engineLabel}
          ${isOverridden ? '<span class="human-pill">TA đã sửa</span>' : ""}
        </div>
        <h3>${escapeHtml(question.question)}</h3>
        <div class="reason-box">
          <strong>Lý do AI đề xuất</strong>
          <p>${escapeHtml(decision.reason)}</p>
        </div>
        ${uncertainNote}
        ${overrideNote}
        <a class="source-link" href="#${question.id}" data-action="context" data-id="${question.id}">↗ ${escapeHtml(decision.source_reference || question.source)}</a>
      </div>
      <div class="confidence ${confidence.className}" aria-label="Độ tin cậy của AI ${Math.round(decision.confidence * 100)} phần trăm">
        <div class="confidence-ring" style="--confidence:${decision.confidence * 100}%" aria-hidden="true">
          <strong>${Math.round(decision.confidence * 100)}%</strong>
        </div>
        <strong>${confidence.label}</strong>
        <span>${decision.live ? "Độ tin cậy từ AI thật" : "Dữ liệu mock ban đầu"}</span>
      </div>
      <div class="actions">
        <div class="primary-actions">
          <button class="action-button analyze" type="button" data-action="analyze" data-id="${question.id}"
            ${isLoading ? "disabled" : ""}>${isLoading ? "Đang gọi AI thật…" : "✦ Phân tích bằng AI"}</button>
          <button class="action-button context" type="button" data-action="context" data-id="${question.id}">Xem căn cứ</button>
        </div>
        <div class="decision-actions">
          <span>TA quyết định</span>
          <div class="decision-options">${statusButtons}</div>
        </div>
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

  const decision = decisionFor(question);
  const status = currentStatus(question);
  state.activeQuestionId = id;
  elements.dialogTitle.textContent = question.scenario;
  elements.dialogContent.innerHTML = `
    <div class="decision-summary">
      <span>Nguồn quyết định: <strong>${decision.live ? (decision.fallback ? "Fallback" : `${escapeHtml(decision.provider || "AI")} thật`) : "Mock CP2"}</strong></span>
      <span>Quyết định hiện tại: <strong>${STATUSES[status].label}</strong></span>
    </div>
    <div class="context-summary"><strong>Lý do:</strong> ${escapeHtml(decision.reason)} · <strong>Confidence:</strong> ${Math.round(decision.confidence * 100)}%</div>
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

async function analyzeQuestion(id) {
  const question = QUESTIONS.find((item) => item.id === id);
  if (!question || state.loading.has(id)) return;

  state.loading.add(id);
  render();
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: question.id,
        question: question.question,
        thread_context: question.messages.map(([sender, message]) => `${sender}: ${message}`),
        related_messages: question.messages
          .filter(([, , related]) => related)
          .map(([sender, message]) => `${sender}: ${message}`),
        source_reference: question.source
      })
    });
    const result = await response.json();
    if (!response.ok || result.error) {
      throw new Error(result.error || `HTTP ${response.status}`);
    }
    if (!Object.hasOwn(STATUSES, result.status)) {
      throw new Error("Backend trả về status không hợp lệ.");
    }

    state.analyses[id] = { ...result, live: true };
    delete state.overrides[id];
    saveOverrides();
    state.activeFilter = "all";
    showToast(result.fallback
      ? "AI không khả dụng — đã chuyển sang fallback cần TA kiểm tra."
      : `${result.provider || "AI"} đã phân loại: ${STATUSES[result.status].label}.`);
  } catch (error) {
    showToast(`Không gọi được backend: ${error.message}. Hãy chạy python codebase/ai/server.py.`);
  } finally {
    state.loading.delete(id);
    render();
    document.querySelector(`[data-id="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

async function checkApiHealth() {
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    const health = await response.json();
    elements.apiStatus.textContent = health.api_key_configured
      ? `${health.provider} sẵn sàng · ${health.model}`
      : "Chưa có API key";
    elements.apiStatus.classList.toggle("api-ready", health.api_key_configured);
    elements.apiStatus.classList.toggle("api-missing", !health.api_key_configured);
    document.querySelector("#api-panel")?.classList.toggle("api-ready", health.api_key_configured);
    document.querySelector("#api-panel")?.classList.toggle("api-missing", !health.api_key_configured);
  } catch {
    elements.apiStatus.textContent = "Cần chạy local server CP3";
    elements.apiStatus.classList.add("api-missing");
    document.querySelector("#api-panel")?.classList.add("api-missing");
  }
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
  } else if (action === "analyze") {
    analyzeQuestion(id);
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
    state.analyses = {};
    state.loading.clear();
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
checkApiHealth();
