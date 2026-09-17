const seedQuestions = [
  {
    id: "q-101",
    caseLabel: "Happy path",
    question: "Em chạy bài lab nhưng bước kiểm thử cuối vẫn báo lỗi. Có TA nào xem giúp em với ạ?",
    status: "unresolved",
    confidence: 0.94,
    reason: "Luồng có lỗi cụ thể nhưng chưa có phản hồi hoặc xác nhận đã xử lý.",
    source: "#help-lab · thread-demo-101",
    contextSummary: "Không tìm thấy câu trả lời sau câu hỏi trong cùng luồng.",
    messages: [
      ["Student-01", "Em chạy bài lab nhưng bước kiểm thử cuối vẫn báo lỗi.", false],
      ["System", "Đã dò toàn bộ luồng đến 17:00: chưa có phản hồi liên quan.", true]
    ]
  },
  {
    id: "q-102",
    caseLabel: "Duplicate wording",
    question: "Nộp lại bài sau deadline có bị ghi đè bản cũ không ạ?",
    status: "unresolved",
    confidence: 0.86,
    reason: "Được nhóm với hai cách hỏi tương tự, nhưng chưa có câu trả lời từ nguồn chính thức.",
    source: "#course-help · group-demo-07",
    contextSummary: "Ba câu hỏi có cùng ý định được nhóm lại; chưa có câu trả lời chính thức.",
    messages: [
      ["Student-02", "Nộp lại bài sau deadline có bị ghi đè bản cũ không ạ?", false],
      ["Student-03", "Nếu submit lần hai thì hệ thống lấy file nào?", false],
      ["Retrieval", "Độ tương đồng giả lập: cao. Không có nguồn deadline chính thức.", true]
    ]
  },
  {
    id: "q-103",
    caseLabel: "Answered elsewhere",
    question: "Em tìm link rubric của bài này ở đâu vậy ạ?",
    status: "resolved",
    confidence: 0.92,
    reason: "Một thread liên quan đã dẫn tới rubric và người hỏi xác nhận mở được.",
    source: "#announcements · thread-demo-103",
    contextSummary: "Câu trả lời được truy hồi từ một thread giả lập khác.",
    messages: [
      ["Student-04", "Em tìm link rubric của bài này ở đâu vậy ạ?", false],
      ["TA-Demo", "Rubric nằm trong mục Resources của bài tập.", true],
      ["Student-04", "Em mở được rồi, cảm ơn TA ạ.", false]
    ]
  },
  {
    id: "q-104",
    caseLabel: "Bot/system message",
    question: "Reminder Bot: Bạn đã hoàn thành form chưa?",
    status: "uncertain",
    confidence: 0.38,
    reason: "Nguồn được nhận diện là bot/system, không nên coi là câu hỏi hỗ trợ của học viên.",
    source: "#reminders · message-demo-104",
    contextSummary: "Loại nguồn: bot/system. Không đề xuất phản hồi cho học viên.",
    messages: [
      ["Reminder-Bot", "Bạn đã hoàn thành form chưa?", false],
      ["Classifier", "Candidate rejected: system-authored message.", true]
    ]
  },
  {
    id: "q-105",
    caseLabel: "Repeated sender",
    question: "Em vẫn chưa chạy được lệnh cài đặt, lỗi lúc nãy vẫn còn ạ.",
    status: "unresolved",
    confidence: 0.89,
    reason: "Cùng người gửi lặp lại vấn đề và chưa xác nhận cách khắc phục trước đó có hiệu quả.",
    source: "#setup-help · thread-demo-105",
    contextSummary: "Hai tin của cùng một định danh giả lập được nối vào một issue.",
    messages: [
      ["Student-05", "Em chạy lệnh cài đặt thì bị lỗi quyền truy cập.", false],
      ["TA-Demo", "Em thử mở terminal thường và gửi lại mã lỗi nhé.", true],
      ["Student-05", "Em vẫn chưa chạy được, lỗi lúc nãy vẫn còn ạ.", false]
    ]
  },
  {
    id: "q-106",
    caseLabel: "Missing context",
    question: "Cái này làm như hôm trước là được đúng không ạ?",
    status: "uncertain",
    confidence: 0.31,
    reason: "Không tìm thấy đối tượng mà “cái này” đề cập hoặc ngữ cảnh liên quan để kiểm chứng.",
    source: "#general-help · message-demo-106",
    contextSummary: "Không có grounding: chỉ có một tin nhắn mơ hồ trong cửa sổ truy hồi.",
    messages: [
      ["Student-06", "Cái này làm như hôm trước là được đúng không ạ?", false],
      ["Retrieval", "Không tìm thấy tin liên quan trong phạm vi giả lập.", true]
    ]
  }
];

const statusLabels = {
  resolved: "Resolved",
  unresolved: "Unresolved",
  uncertain: "Uncertain"
};

const list = document.querySelector("#question-list");
const emptyState = document.querySelector("#empty-state");
const dialog = document.querySelector("#context-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector("#toast");
let activeFilter = "unresolved";
let activeQuestionId = null;
let overrides = loadOverrides();

function loadOverrides() {
  try {
    return JSON.parse(sessionStorage.getItem("buddy-overrides")) || {};
  } catch {
    return {};
  }
}

function saveOverrides() {
  try {
    sessionStorage.setItem("buddy-overrides", JSON.stringify(overrides));
  } catch {
    // The mock remains functional if storage is unavailable on a local file URL.
  }
}

function currentStatus(question) {
  return overrides[question.id] || question.status;
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

function render() {
  const visible = seedQuestions.filter((question) => activeFilter === "all" || currentStatus(question) === activeFilter);
  list.innerHTML = visible.map(renderCard).join("");
  emptyState.hidden = visible.length > 0;
  list.hidden = visible.length === 0;

  Object.keys(statusLabels).forEach((status) => {
    const count = seedQuestions.filter((question) => currentStatus(question) === status).length;
    document.querySelector(`#${status}-count`).textContent = count;
  });

  document.querySelectorAll(".summary-card").forEach((button) => {
    const selected = button.dataset.filter === activeFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function renderCard(question) {
  const status = currentStatus(question);
  const isHumanDecision = Boolean(overrides[question.id]);
  const uncertainNote = status === "uncertain"
    ? '<p class="uncertain-note">Không đủ căn cứ để xác định trạng thái. Cần TA kiểm tra.</p>'
    : "";

  const buttons = ["resolved", "unresolved", "uncertain"].map((option) => {
    const label = option === "uncertain" ? "Needs review" : `Mark ${option}`;
    return `<button class="action-button" type="button" data-action="status" data-id="${question.id}" data-status="${option}" aria-pressed="${status === option}">${label}</button>`;
  }).join("");

  return `
    <article class="question-card" data-id="${question.id}">
      <div>
        <div class="card-topline">
          <span class="status-pill ${status}">${statusLabels[status]}</span>
          <span class="case-tag">${escapeHtml(question.caseLabel)}</span>
          ${isHumanDecision ? '<span class="human-pill">TA override</span>' : ""}
        </div>
        <h3>${escapeHtml(question.question)}</h3>
        <p class="reason">${escapeHtml(question.reason)}</p>
        ${uncertainNote}
        <a class="source-link" href="#${question.id}" data-action="context" data-id="${question.id}">↗ ${escapeHtml(question.source)}</a>
      </div>
      <div class="confidence" aria-label="AI confidence ${Math.round(question.confidence * 100)} percent">
        <strong>${Math.round(question.confidence * 100)}%</strong>
        <span>AI confidence</span>
        <div class="confidence-bar" aria-hidden="true"><i style="width:${question.confidence * 100}%"></i></div>
      </div>
      <div class="actions">
        <button class="action-button context" type="button" data-action="context" data-id="${question.id}">View context</button>
        ${buttons}
      </div>
    </article>`;
}

function showContext(id) {
  const question = seedQuestions.find((item) => item.id === id);
  if (!question) return;
  activeQuestionId = id;
  document.querySelector("#dialog-title").textContent = question.caseLabel;
  dialogContent.innerHTML = `
    <div class="context-summary"><strong>Căn cứ truy hồi:</strong> ${escapeHtml(question.contextSummary)}</div>
    ${question.messages.map(([sender, message, related]) => `
      <div class="message ${related ? "related" : ""}">
        <strong>${escapeHtml(sender)}</strong>
        <p>${escapeHtml(message)}</p>
      </div>`).join("")}`;
  dialog.showModal();
}

function updateStatus(id, status) {
  const question = seedQuestions.find((item) => item.id === id);
  if (!question || !statusLabels[status]) return;
  overrides[id] = status;
  saveOverrides();
  render();
  showToast(`Đã lưu quyết định của TA: ${statusLabels[status]}.`);
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (target.dataset.action === "context") {
    event.preventDefault();
    showContext(target.dataset.id);
  }
  if (target.dataset.action === "status") {
    updateStatus(target.dataset.id, target.dataset.status);
  }
});

document.querySelectorAll(".summary-card").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

document.querySelector("#show-all-button").addEventListener("click", () => {
  activeFilter = "all";
  render();
});

document.querySelector("#reset-button").addEventListener("click", () => {
  overrides = {};
  activeFilter = "unresolved";
  saveOverrides();
  render();
  showToast("Đã đặt lại các quyết định trong bản demo.");
});

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#open-source-button").addEventListener("click", () => {
  const question = seedQuestions.find((item) => item.id === activeQuestionId);
  dialog.close();
  showToast(`Demo only — sẽ mở ${question ? question.source : "luồng gốc"} để TA phản hồi thủ công.`);
});

render();

