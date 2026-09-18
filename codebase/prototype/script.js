const QUESTIONS = [
  {
    id: "q-201", scenario: "Đã trả lời ở nơi khác", question: "Xem XP ở đâu?", status: "resolved", confidence: 0.93,
    reason: "Một câu hỏi cùng intent đã được bot hướng dẫn xem XP bằng Discord ID hoặc lệnh /rank.",
    source: "channel_10 · M18056, M58005, M42137", sourceTrust: "official",
    contextSummary: "Câu hỏi hiện tại khớp với một luồng trước đó đã có hướng dẫn cụ thể.",
    messages: [["Học viên-A", "Xem XP ở đâu?", false], ["Học viên-B", "Bot ơi, xem XP ở đâu?", false], ["Buddy Bot", "Có thể tra XP theo Discord ID hoặc xem lịch sử bằng lệnh /rank.", true]]
  },
  {
    id: "q-202", scenario: "Câu hỏi lặp đã có đáp án", question: "Hạn nộp daily stand-up là khi nào?", status: "resolved", confidence: 0.96,
    reason: "Hai học viên hỏi cùng intent và đều nhận được câu trả lời nhất quán về khung giờ nộp.",
    source: "channel_10 · M07653, M14873, M45837, M33935", sourceTrust: "official",
    contextSummary: "Hai luồng độc lập cùng xác nhận khung giờ 0h–10h; nộp muộn không được cộng XP.",
    messages: [["Học viên-C", "Hạn nộp daily stand-up?", false], ["Buddy Bot", "Khung giờ nộp hàng ngày là 0h–10h; nộp muộn vẫn ghi nhận nhưng không cộng XP.", true], ["Học viên-D", "Hạn nộp daily stand-up là khi nào?", false]]
  },
  {
    id: "q-203", scenario: "Hướng dẫn lệnh", question: "Pick là chốt đề tài à, về sau dùng lệnh gì để chọn lại?", status: "resolved", confidence: 0.97,
    reason: "Bot trả lời trực tiếp: /topic pick để chọn đề tài và /topic change để đổi đề tài.",
    source: "channel_10 · M02135, M02793, M63853", sourceTrust: "official",
    contextSummary: "Cùng người gửi đặt hai bản câu hỏi; bản có tag bot nhận được câu trả lời đúng intent.",
    messages: [["Học viên-E", "Pick là chốt đề tài à, về sau dùng lệnh gì để chọn lại?", false], ["Buddy Bot", "/topic pick dùng để chọn đề tài; nếu muốn đổi hãy dùng /topic change.", true]]
  },
  {
    id: "q-204", scenario: "Bot trả lời không nhất quán", question: "Làm sao để tạo ticket?", status: "resolved", confidence: 0.84,
    reason: "Một phản hồi hiểu nhầm 'ticket', nhưng phản hồi còn lại đưa đúng lệnh /ticket create và các bước cần thiết.",
    source: "channel_10 · M37242, M55412, M59182, M11596", sourceTrust: "community",
    contextSummary: "Hai câu giống nhau của cùng người gửi nhận hai phản hồi khác nhau; có một phản hồi đúng và dùng được.",
    messages: [["Học viên-F", "Làm sao để tạo ticket?", false], ["Buddy Bot", "Bạn muốn tạo ticker cho Discord, dự án hay chứng khoán?", false], ["Buddy Bot", "Gõ /ticket create, chọn loại ticket, điền tiêu đề và mô tả vấn đề.", true]]
  },
  {
    id: "q-205", scenario: "Đã tự xử lý", question: "Em bị lỗi ở bước này thì phải làm sao ạ?", status: "resolved", confidence: 0.91,
    reason: "Người hỗ trợ yêu cầu thêm output và người hỏi sau đó xác nhận đã tự khắc phục được lỗi.",
    source: "channel_08 · M44947, M94723, M28055", sourceTrust: "community",
    contextSummary: "Luồng kết thúc bằng xác nhận đã sửa được lỗi, nên không cần TA tiếp tục can thiệp.",
    messages: [["Học viên-G", "Em bị lỗi ở bước này thì phải làm sao ạ? (có 1 ảnh đính kèm)", false], ["Người hỗ trợ", "Bạn chạy docker compose ps rồi gửi output để mình xem thêm nhé.", true], ["Học viên-G", "Mình fix được lỗi rồi, cảm ơn bạn nhiều nhé.", true]]
  },
  {
    id: "q-206", scenario: "Trả lời sai intent", question: "Cách nộp daily stand-up như thế nào?", status: "unresolved", confidence: 0.94,
    reason: "Người hỏi cần cách nộp nhưng phản hồi chỉ nói về khung giờ; thao tác và nơi nộp vẫn chưa được giải đáp.",
    source: "channel_10 · M41736, M11802", sourceTrust: "community",
    contextSummary: "Phản hồi có liên quan đến daily stand-up nhưng không trả lời đúng nhu cầu của câu hỏi.",
    messages: [["Học viên-H", "Cách nộp daily stand-up?", false], ["Buddy Bot", "Khung giờ nộp là 0h–10h; nộp muộn không được cộng XP.", true]]
  },
  {
    id: "q-207", scenario: "Không có nguồn xác thực", question: "Hạn nộp Lab02 là khi nào?", status: "unresolved", confidence: 0.90,
    reason: "Không có ngày giờ cụ thể trong dữ liệu; bot chỉ hướng người hỏi tới các kênh thông báo chính thức.",
    source: "channel_10 · M07416, M28485", sourceTrust: "none",
    contextSummary: "Câu hỏi rõ ràng nhưng chưa có câu trả lời chứa deadline đáng tin cậy.",
    messages: [["Học viên-I", "Hạn nộp Lab02?", false], ["Buddy Bot", "Mình chưa có ngày giờ cụ thể; hãy kiểm tra kênh thông báo, Phoenix hoặc Vlearn.", true]]
  },
  {
    id: "q-208", scenario: "Hướng dẫn chưa giải quyết", question: "Em đặt sai tên khi vào Zoom nên không được ghi nhận. Em cần xử lý thế nào?", status: "unresolved", confidence: 0.92,
    reason: "Phản hồi chỉ nhắc cú pháp đặt tên đúng cho lần sau, chưa hướng dẫn xử lý lượt điểm danh đã bị bỏ lỡ.",
    source: "channel_10 · M45740, M51183", sourceTrust: "community",
    contextSummary: "Người hỏi cần khắc phục hậu quả hoặc tạo ticket, nhưng câu trả lời không đưa ra quy trình đó.",
    messages: [["Học viên-J", "Em đặt sai tên khi vào Zoom nên không được ghi nhận; nếu tạo ticket thì làm thế nào?", false], ["Buddy Bot", "Hãy đăng nhập đúng email và đặt tên đúng cú pháp để được điểm danh tự động.", true]]
  },
  {
    id: "q-209", scenario: "Thiếu nội dung attachment", question: "Em chạy tới bước 3 thì bị lỗi như này ạ.", status: "uncertain", confidence: 0.34,
    reason: "Tin nhắn phụ thuộc vào hai ảnh đính kèm nhưng data pack không chứa nội dung ảnh để xác định lỗi.",
    source: "channel_08 · M51326", sourceTrust: "none",
    contextSummary: "Có 2 attachments, không có log dạng text và không đủ căn cứ để phân loại vấn đề.",
    messages: [["Học viên-K", "Em chạy tới bước 3 thì bị lỗi như này ạ.", false], ["Truy xuất", "Phát hiện 2 attachments nhưng không có nội dung ảnh trong tập dữ liệu.", true]]
  },
  {
    id: "q-210", scenario: "Tin nhắn do bot gửi", question: "Có thể tra XP bằng Discord ID hoặc xem lịch sử bằng lệnh /rank.", status: "uncertain", confidence: 0.18,
    reason: "Đây là câu trả lời do bot tạo ra, không phải yêu cầu hỗ trợ mới của học viên.",
    source: "channel_10 · M42137", sourceTrust: "none",
    contextSummary: "author = BOT và is_bot = true; hệ thống không nên tạo ticket hỗ trợ từ message này.",
    messages: [["Buddy Bot", "Có thể tra XP bằng Discord ID hoặc xem lịch sử bằng lệnh /rank.", false], ["Bộ phân loại", "Bỏ qua ứng viên vì nguồn gửi là bot/hệ thống.", true]]
  }
];

const STATUSES = {
  unresolved: { label: "Chưa xử lý", tab: "Cần xử lý", icon: "!", summary: "TA cần phản hồi" },
  uncertain: { label: "Chưa chắc chắn", tab: "Cần kiểm tra", icon: "?", summary: "Thiếu căn cứ" },
  resolved: { label: "Đã xử lý", tab: "Đã xử lý", icon: "✓", summary: "Đã có căn cứ" }
};

const SOURCES = {
  official: { label: "Nguồn chính thức", short: "Chính thức", note: "Có thể dùng làm căn cứ, nhưng TA vẫn kiểm tra nội dung." },
  community: { label: "Nguồn cộng đồng", short: "Cộng đồng", note: "Cần đối chiếu nếu liên quan deadline, điểm số hoặc chính sách." },
  none: { label: "Không có nguồn xác thực", short: "Không có nguồn", note: "Không được tự kết luận resolved; chuyển TA kiểm tra." }
};

const STORAGE = {
  decisions: "buddy-human-decisions-v2",
  analyses: "buddy-analyses-v2",
  audit: "buddy-audit-v2",
  timing: "buddy-review-timing-v2"
};

const elements = {
  list: document.querySelector("#question-list"),
  empty: document.querySelector("#empty-state"),
  tabs: document.querySelector("#status-tabs"),
  resultSummary: document.querySelector("#result-summary"),
  search: document.querySelector("#search-input"),
  scenario: document.querySelector("#scenario-filter"),
  source: document.querySelector("#source-filter"),
  sort: document.querySelector("#sort-select"),
  apiChip: document.querySelector("#api-chip"),
  apiStatus: document.querySelector("#api-status"),
  toast: document.querySelector("#toast"),
  detailDialog: document.querySelector("#detail-dialog"),
  detailTitle: document.querySelector("#detail-title"),
  detailEyebrow: document.querySelector("#detail-eyebrow"),
  detailContent: document.querySelector("#detail-content"),
  detailFooter: document.querySelector("#detail-footer"),
  progress: document.querySelector("#review-progress"),
  metricsDialog: document.querySelector("#metrics-dialog"),
  metricsContent: document.querySelector("#metrics-content"),
  shortcutsDialog: document.querySelector("#shortcuts-dialog"),
  metricPending: document.querySelector("#metric-pending"),
  metricAnalyzed: document.querySelector("#metric-analyzed"),
  metricOverrides: document.querySelector("#metric-overrides"),
  metricRate: document.querySelector("#metric-rate"),
  metricTime: document.querySelector("#metric-time")
};

const state = {
  activeFilter: "all",
  query: "",
  scenario: "all",
  source: "all",
  sort: "priority",
  selectedId: null,
  activeQuestionId: null,
  humanDecisions: loadJSON(STORAGE.decisions, {}),
  analyses: loadJSON(STORAGE.analyses, {}),
  audit: loadJSON(STORAGE.audit, {}),
  timing: loadJSON(STORAGE.timing, {}),
  loading: new Set(),
  errors: {}
};

function loadJSON(key, fallback) {
  try {
    const value = JSON.parse(sessionStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE.decisions, JSON.stringify(state.humanDecisions));
    sessionStorage.setItem(STORAGE.analyses, JSON.stringify(state.analyses));
    sessionStorage.setItem(STORAGE.audit, JSON.stringify(state.audit));
    sessionStorage.setItem(STORAGE.timing, JSON.stringify(state.timing));
  } catch {
    // Demo vẫn dùng được khi trình duyệt chặn sessionStorage.
  }
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = String(value ?? "");
  return node.innerHTML;
}

function questionById(id) {
  return QUESTIONS.find((question) => question.id === id);
}

function decisionFor(question) {
  return state.analyses[question.id] || {
    status: question.status,
    confidence: question.confidence,
    reason: question.reason,
    source_reference: question.source,
    provider: "mock",
    fallback: false,
    live: false
  };
}

function humanDecisionFor(question) {
  const value = state.humanDecisions[question.id];
  if (typeof value === "string") return { status: value, reviewedAt: null };
  return value && Object.hasOwn(STATUSES, value.status) ? value : null;
}

function currentStatus(question) {
  return humanDecisionFor(question)?.status || decisionFor(question).status;
}

function confidenceMeta(score) {
  if (score >= 0.8) return { label: "Tin cậy cao", className: "high", guidance: "Vẫn kiểm tra nguồn trước khi chốt." };
  if (score >= 0.55) return { label: "Cần đối chiếu", className: "medium", guidance: "So sánh ngữ cảnh và nguồn liên quan." };
  return { label: "Tin cậy thấp", className: "low", guidance: "Chuyển TA kiểm tra, không tự kết luận." };
}

function engineMeta(decision) {
  if (!decision.live) return { label: "Mock ban đầu", className: "engine-mock" };
  if (decision.fallback) return { label: "Fallback · chưa phải AI", className: "engine-fallback" };
  return { label: `${decision.provider || "AI"} thật`, className: "engine-live" };
}

function counts() {
  return QUESTIONS.reduce((result, question) => {
    result[currentStatus(question)] += 1;
    return result;
  }, { unresolved: 0, uncertain: 0, resolved: 0 });
}

function metrics() {
  const analyzed = Object.keys(state.analyses).length;
  const reviewed = QUESTIONS.filter((question) => humanDecisionFor(question)).length;
  const overrides = QUESTIONS.filter((question) => {
    const human = humanDecisionFor(question);
    return human && human.status !== decisionFor(question).status;
  }).length;
  const durations = QUESTIONS
    .map((question) => humanDecisionFor(question)?.reviewSeconds)
    .filter((value) => Number.isFinite(value));
  const averageSeconds = durations.length
    ? Math.round(durations.reduce((sum, value) => sum + value, 0) / durations.length)
    : null;
  return { analyzed, reviewed, overrides, overrideRate: reviewed ? Math.round((overrides / reviewed) * 100) : 0, averageSeconds };
}

function filteredQuestions() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase("vi");
  const statusWeight = { unresolved: 0, uncertain: 1, resolved: 2 };
  const items = QUESTIONS.filter((question) => {
    const matchesStatus = state.activeFilter === "all" || currentStatus(question) === state.activeFilter;
    const matchesQuery = !normalizedQuery || [question.question, question.reason, question.scenario, question.source]
      .some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    const matchesScenario = state.scenario === "all" || question.scenario === state.scenario;
    const matchesSource = state.source === "all" || question.sourceTrust === state.source;
    return matchesStatus && matchesQuery && matchesScenario && matchesSource;
  });

  return items.sort((a, b) => {
    const aDecision = decisionFor(a);
    const bDecision = decisionFor(b);
    if (state.sort === "confidence-asc") return aDecision.confidence - bDecision.confidence;
    if (state.sort === "confidence-desc") return bDecision.confidence - aDecision.confidence;
    if (state.sort === "alphabetical") return a.question.localeCompare(b.question, "vi");
    return statusWeight[currentStatus(a)] - statusWeight[currentStatus(b)] || aDecision.confidence - bDecision.confidence;
  });
}

function renderTabs() {
  const statusCounts = counts();
  const tabs = [["all", "Tất cả", QUESTIONS.length], ...Object.entries(STATUSES).map(([key, value]) => [key, value.tab, statusCounts[key]])];
  elements.tabs.innerHTML = tabs.map(([key, label, count]) => `
    <button class="status-tab ${key === state.activeFilter ? "active" : ""} ${key === "all" ? "" : `status-${key}`}"
      type="button" role="tab" aria-selected="${key === state.activeFilter}" data-action="filter" data-status="${key}">
      ${escapeHtml(label)} <span class="count">${count}</span>
    </button>`).join("");
}

function renderDashboard() {
  const statusCounts = counts();
  const session = metrics();
  elements.metricPending.textContent = statusCounts.unresolved;
  elements.metricAnalyzed.textContent = session.analyzed;
  elements.metricOverrides.textContent = session.overrides;
  elements.metricRate.textContent = `${session.overrideRate}%`;
  elements.metricTime.textContent = formatDuration(session.averageSeconds);
}

function renderCard(question) {
  const decision = decisionFor(question);
  const human = humanDecisionFor(question);
  const status = currentStatus(question);
  const confidence = confidenceMeta(decision.confidence);
  const engine = engineMeta(decision);
  const source = SOURCES[question.sourceTrust];
  const loading = state.loading.has(question.id);
  const selected = state.selectedId === question.id;
  const changed = human && human.status !== decision.status;
  const primaryLabel = loading ? "Đang gọi AI…" : decision.live ? "Xem & quyết định" : "✦ Phân tích bằng AI";
  const primaryAction = decision.live ? "open-detail" : "analyze";
  return `
    <article class="question-row status-${status} ${loading ? "loading" : ""} ${selected ? "keyboard-selected" : ""}"
      data-card-id="${question.id}" tabindex="${selected ? "0" : "-1"}" aria-labelledby="title-${question.id}">
      <div class="row-main">
        <div class="row-badges">
          <span class="pill status-${status}">${STATUSES[status].icon} ${STATUSES[status].label}</span>
          <span class="pill scenario">${escapeHtml(question.scenario)}</span>
          <span class="pill ${engine.className}">${escapeHtml(engine.label)}</span>
          ${human ? `<span class="pill human">${changed ? "TA ghi đè" : "TA xác nhận"}</span>` : ""}
        </div>
        <h3 id="title-${question.id}">${escapeHtml(question.question)}</h3>
        <p class="reason-preview">${escapeHtml(decision.reason)}</p>
        <span class="source-inline ${question.sourceTrust}"><i class="source-dot" aria-hidden="true"></i>${source.label}</span>
      </div>
      <div class="confidence-block ${confidence.className}" aria-label="Confidence ${Math.round(decision.confidence * 100)} phần trăm: ${confidence.label}">
        <div class="confidence-heading"><strong>${confidence.label}</strong><span>${Math.round(decision.confidence * 100)}%</span></div>
        <div class="confidence-track" aria-hidden="true"><i style="--confidence:${decision.confidence * 100}%"></i></div>
        <p class="confidence-guidance">${confidence.guidance}</p>
      </div>
      <div class="row-action">
        <button class="button primary" type="button" data-action="${primaryAction}" data-id="${question.id}" ${loading ? "disabled" : ""}>${primaryLabel}</button>
        <button class="text-action" type="button" data-action="open-detail" data-id="${question.id}">Xem căn cứ & lịch sử</button>
      </div>
      ${state.errors[question.id] ? `<p class="inline-error" role="alert">Không gọi được backend: ${escapeHtml(state.errors[question.id])}. Case chưa được tính là kết quả AI.</p>` : ""}
    </article>`;
}

function renderList() {
  const visible = filteredQuestions();
  if (!visible.some((question) => question.id === state.selectedId)) state.selectedId = visible[0]?.id || null;
  elements.list.innerHTML = visible.map(renderCard).join("");
  elements.list.hidden = visible.length === 0;
  elements.empty.hidden = visible.length !== 0;
  elements.resultSummary.textContent = visible.length === QUESTIONS.length
    ? `${visible.length} tình huống · ưu tiên chưa xử lý và confidence thấp`
    : `Hiển thị ${visible.length}/${QUESTIONS.length} tình huống phù hợp`;
}

function render() {
  renderTabs();
  renderDashboard();
  renderList();
  if (state.activeQuestionId && elements.detailDialog.open) renderDetail(state.activeQuestionId);
}

function populateScenarioFilter() {
  [...new Set(QUESTIONS.map((question) => question.scenario))].sort((a, b) => a.localeCompare(b, "vi")).forEach((scenario) => {
    const option = document.createElement("option");
    option.value = scenario;
    option.textContent = scenario;
    elements.scenario.append(option);
  });
}

function policyFor(question, decision) {
  const rules = [];
  if (decision.confidence < 0.55) rules.push("Confidence thấp: không tự kết luận, TA phải kiểm tra.");
  else if (decision.confidence < 0.8) rules.push("Confidence trung bình: cần đối chiếu hội thoại liên quan.");
  else rules.push("Confidence cao không thay thế việc kiểm tra nguồn.");
  if (question.sourceTrust === "none") rules.push("Không có nguồn xác thực: không được tự đánh dấu đã xử lý.");
  if (question.sourceTrust === "community") rules.push("Nguồn cộng đồng: không dùng một mình cho deadline, điểm số hoặc chính sách.");
  if (decision.fallback) rules.push("Fallback không phải kết quả AI thật và luôn cần TA xem lại.");
  rules.push("TA có quyền giữ, sửa hoặc hoàn tác quyết định; hệ thống không gửi tin tự động.");
  return rules;
}

function auditFor(question) {
  const initial = { type: "initial", label: "Nạp đề xuất mock ban đầu", detail: STATUSES[question.status].label, at: null };
  return [initial, ...(state.audit[question.id] || [])];
}

function formatTime(value) {
  if (!value) return "Bắt đầu phiên";
  try { return new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date(value)); }
  catch { return value; }
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds)) return "—";
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function renderDetail(id) {
  const question = questionById(id);
  if (!question) return;
  const decision = decisionFor(question);
  const human = humanDecisionFor(question);
  const status = currentStatus(question);
  const source = SOURCES[question.sourceTrust];
  const confidence = confidenceMeta(decision.confidence);
  const engine = engineMeta(decision);
  const output = {
    status: decision.status,
    confidence: decision.confidence,
    reason: decision.reason,
    source_reference: decision.source_reference || ""
  };

  elements.detailEyebrow.textContent = `${question.id} · ${question.scenario}`;
  elements.detailTitle.textContent = question.question;
  elements.detailContent.innerHTML = `
    <section class="conversation-pane" aria-labelledby="conversation-title">
      <div class="pane-heading"><div><h3 id="conversation-title">Hội thoại liên quan</h3><p>Đoạn có viền tím là bằng chứng AI được cung cấp.</p></div><span class="pill ${question.sourceTrust === "none" ? "engine-fallback" : "engine-live"}">${source.short}</span></div>
      <div class="message-timeline">
        ${question.messages.map(([sender, message, evidence]) => `<article class="message ${evidence ? "evidence" : ""}"><strong>${escapeHtml(sender)}${evidence ? "<em>Bằng chứng</em>" : ""}</strong><p>${escapeHtml(message)}</p></article>`).join("")}
      </div>
    </section>
    <aside class="decision-pane" aria-labelledby="decision-title">
      <div class="pane-heading"><div><h3 id="decision-title">Đề xuất và policy</h3><p>Kiểm tra cả kết luận lẫn chất lượng nguồn.</p></div><span class="pill ${engine.className}">${escapeHtml(engine.label)}</span></div>
      <div class="decision-card">
        <div class="decision-topline"><span class="pill status-${decision.status}">${STATUSES[decision.status].label}</span><strong>${Math.round(decision.confidence * 100)}% · ${confidence.label}</strong></div>
        <h4>Lý do</h4><p>${escapeHtml(decision.reason)}</p>
      </div>
      <div class="decision-card source-card ${question.sourceTrust}"><h4>${source.label}</h4><p>${escapeHtml(source.note)}</p><p><strong>Tham chiếu:</strong> ${escapeHtml(decision.source_reference || question.source || "Không có")}</p></div>
      <div class="decision-card"><h4>Policy đang áp dụng</h4><ul class="policy-list">${policyFor(question, decision).map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul></div>
      <details class="structured-output"><summary>Structured output</summary><pre>${escapeHtml(JSON.stringify(output, null, 2))}</pre></details>
      <details class="audit-panel" open><summary>Lịch sử quyết định (${auditFor(question).length})</summary><ol class="audit-list">${auditFor(question).map((event) => `<li><strong>${escapeHtml(event.label)}</strong><span>${escapeHtml(event.detail || "")}</span><time>${formatTime(event.at)}</time></li>`).join("")}</ol></details>
    </aside>`;

  elements.detailFooter.innerHTML = `
    <div class="footer-status"><strong>Quyết định hiện tại: ${STATUSES[status].label}</strong>${human ? (human.status === decision.status ? "TA đã xác nhận đề xuất AI." : "TA đã ghi đè đề xuất AI.") : "Chưa có quyết định của TA trong phiên này."}</div>
    <div class="decision-buttons" aria-label="TA quyết định trạng thái">
      ${Object.entries(STATUSES).map(([key, config]) => `<button class="decision-button ${human?.status === key ? "active" : ""}" type="button" data-action="decide" data-id="${question.id}" data-status="${key}">${config.label}</button>`).join("")}
      ${human ? `<button class="decision-button undo-button" type="button" data-action="undo" data-id="${question.id}">Hoàn tác</button>` : ""}
    </div>`;

  elements.progress.querySelectorAll("li").forEach((item) => item.classList.remove("active", "done"));
  elements.progress.querySelector('[data-step="context"]')?.classList.add("done");
  if (decision.live) elements.progress.querySelector('[data-step="analyze"]')?.classList.add("done");
  else elements.progress.querySelector('[data-step="analyze"]')?.classList.add("active");
  if (human) elements.progress.querySelector('[data-step="decide"]')?.classList.add("done");
  else if (decision.live) elements.progress.querySelector('[data-step="decide"]')?.classList.add("active");
}

function openDetail(id) {
  const question = questionById(id);
  if (!question) return;
  state.activeQuestionId = id;
  state.selectedId = id;
  if (!humanDecisionFor(question) && !state.timing[id]) {
    state.timing[id] = new Date().toISOString();
    persist();
  }
  renderDetail(id);
  if (!elements.detailDialog.open) elements.detailDialog.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

function appendAudit(id, event) {
  state.audit[id] ||= [];
  state.audit[id].push({ ...event, at: new Date().toISOString() });
}

function setHumanDecision(id, status) {
  const question = questionById(id);
  if (!question || !Object.hasOwn(STATUSES, status)) return;
  const aiStatus = decisionFor(question).status;
  const reviewedAt = new Date();
  const startedAt = state.timing[id] ? new Date(state.timing[id]) : reviewedAt;
  const reviewSeconds = Math.max(0, Math.round((reviewedAt - startedAt) / 1000));
  state.humanDecisions[id] = { status, reviewedAt: reviewedAt.toISOString(), reviewSeconds };
  appendAudit(id, {
    type: status === aiStatus ? "confirm" : "override",
    label: status === aiStatus ? "TA xác nhận đề xuất" : "TA ghi đè đề xuất",
    detail: `${STATUSES[aiStatus].label} → ${STATUSES[status].label}`
  });
  persist();
  render();
  showToast(status === aiStatus ? `TA đã xác nhận: ${STATUSES[status].label}.` : `TA đã ghi đè thành: ${STATUSES[status].label}.`);
}

function undoHumanDecision(id) {
  const question = questionById(id);
  const human = question && humanDecisionFor(question);
  if (!question || !human) return;
  delete state.humanDecisions[id];
  appendAudit(id, { type: "undo", label: "TA hoàn tác quyết định", detail: `Trở về đề xuất ${STATUSES[decisionFor(question).status].label}` });
  persist();
  render();
  showToast("Đã hoàn tác quyết định của TA.");
}

async function analyzeQuestion(id) {
  const question = questionById(id);
  if (!question || state.loading.has(id)) return;
  state.loading.add(id);
  delete state.errors[id];
  render();
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: question.id,
        question: question.question,
        thread_context: question.messages.map(([sender, message]) => `${sender}: ${message}`),
        related_messages: question.messages.filter(([, , related]) => related).map(([sender, message]) => `${sender}: ${message}`),
        source_reference: question.source
      })
    });
    const result = await response.json();
    if (!response.ok || result.error) throw new Error(result.error || `HTTP ${response.status}`);
    if (!Object.hasOwn(STATUSES, result.status)) throw new Error("Backend trả về status không hợp lệ");
    state.analyses[id] = { ...result, live: true };
    delete state.humanDecisions[id];
    appendAudit(id, {
      type: result.fallback ? "fallback" : "analysis",
      label: result.fallback ? "API fallback · cần TA kiểm tra" : `${result.provider || "AI"} phân tích thật`,
      detail: `${STATUSES[result.status].label} · ${Math.round(result.confidence * 100)}%`
    });
    persist();
    showToast(result.fallback ? "API fallback: đây chưa phải kết quả AI, TA cần kiểm tra." : `${result.provider || "AI"} đã phân tích xong. Hãy kiểm tra căn cứ.`);
    openDetail(id);
  } catch (error) {
    state.errors[id] = error.message;
    appendAudit(id, { type: "error", label: "Gọi backend thất bại", detail: error.message });
    persist();
    showToast("Không gọi được AI. Case chưa được tính là kết quả AI thật.");
  } finally {
    state.loading.delete(id);
    render();
  }
}

function clearFilters() {
  state.activeFilter = "all";
  state.query = "";
  state.scenario = "all";
  state.source = "all";
  state.sort = "priority";
  elements.search.value = "";
  elements.scenario.value = "all";
  elements.source.value = "all";
  elements.sort.value = "priority";
  render();
}

function resetSession() {
  Object.values(STORAGE).forEach((key) => sessionStorage.removeItem(key));
  state.humanDecisions = {};
  state.analyses = {};
  state.audit = {};
  state.timing = {};
  state.errors = {};
  state.selectedId = null;
  state.activeQuestionId = null;
  clearFilters();
  closeDialog(elements.detailDialog);
  showToast("Đã đặt lại dữ liệu của phiên demo.");
}

function quickDemo() {
  clearFilters();
  state.activeFilter = "unresolved";
  state.sort = "priority";
  const target = filteredQuestions()[0];
  state.selectedId = target?.id || null;
  render();
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-card-id="${state.selectedId}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    card?.querySelector('[data-action="analyze"], [data-action="open-detail"]')?.focus();
  });
  showToast("Demo nhanh: case ưu tiên đã được chọn. Bấm Phân tích bằng AI để bắt đầu.");
}

function renderMetrics() {
  const session = metrics();
  const statusCounts = counts();
  elements.metricsContent.innerHTML = `
    <section class="metrics-section"><div class="proof-metrics"><div class="metric-card"><strong>20</strong><span>Challenge cases</span></div><div class="metric-card"><strong>19</strong><span>Đạt chuẩn</span></div><div class="metric-card"><strong>95%</strong><span>Pass rate · 0 fallback</span></div></div><p>Kết quả CP3 chính thức với Gemini 3.5 Flash-Lite. Đây là challenge set, không phải độ chính xác production.</p></section>
    <section class="metrics-section"><h3>Hoạt động trong phiên hiện tại</h3><div class="live-metrics"><div class="metric-card"><strong>${session.analyzed}</strong><span>AI đã phân tích</span></div><div class="metric-card"><strong>${session.reviewed}</strong><span>TA đã rà soát</span></div><div class="metric-card"><strong>${session.overrides}</strong><span>TA ghi đè</span></div><div class="metric-card"><strong>${session.overrideRate}%</strong><span>Tỷ lệ ghi đè</span></div><div class="metric-card"><strong>${formatDuration(session.averageSeconds)}</strong><span>Thời gian rà soát TB</span></div></div><p>Trạng thái hiện tại: ${statusCounts.unresolved} chưa xử lý · ${statusCounts.uncertain} chưa chắc chắn · ${statusCounts.resolved} đã xử lý. Số liệu phiên được tính từ thao tác thật và bị xóa khi đặt lại demo.</p></section>`;
}

async function checkApiHealth() {
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    const health = await response.json();
    elements.apiStatus.textContent = health.api_key_configured ? `${health.provider} sẵn sàng · ${health.model}` : "Chưa cấu hình API key";
    elements.apiChip.className = `api-chip ${health.api_key_configured ? "ready" : "missing"}`;
  } catch {
    elements.apiStatus.textContent = "Cần chạy local server";
    elements.apiChip.className = "api-chip missing";
  }
}

function moveSelection(direction) {
  const visible = filteredQuestions();
  if (!visible.length) return;
  let index = visible.findIndex((question) => question.id === state.selectedId);
  if (index < 0) index = 0;
  else index = (index + direction + visible.length) % visible.length;
  state.selectedId = visible[index].id;
  renderList();
  const card = document.querySelector(`[data-card-id="${state.selectedId}"]`);
  card?.focus({ preventScroll: true });
  card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function activeTargetId() {
  return elements.detailDialog.open ? state.activeQuestionId : state.selectedId || filteredQuestions()[0]?.id;
}

let toastTimer;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("visible"), 3000);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const { action, id, status } = target.dataset;
  if (action === "filter") { state.activeFilter = status; render(); }
  else if (action === "analyze") analyzeQuestion(id);
  else if (action === "open-detail") openDetail(id);
  else if (action === "close-detail") closeDialog(elements.detailDialog);
  else if (action === "decide") setHumanDecision(id, status);
  else if (action === "undo") undoHumanDecision(id);
  else if (action === "clear-filters") clearFilters();
  else if (action === "reset") resetSession();
  else if (action === "quick-demo") quickDemo();
  else if (action === "open-metrics") { renderMetrics(); elements.metricsDialog.showModal(); }
  else if (action === "close-metrics") closeDialog(elements.metricsDialog);
  else if (action === "open-shortcuts") elements.shortcutsDialog.showModal();
  else if (action === "close-shortcuts") closeDialog(elements.shortcutsDialog);
});

elements.search.addEventListener("input", () => { state.query = elements.search.value; render(); });
elements.scenario.addEventListener("change", () => { state.scenario = elements.scenario.value; render(); });
elements.source.addEventListener("change", () => { state.source = elements.source.value; render(); });
elements.sort.addEventListener("change", () => { state.sort = elements.sort.value; render(); });

[elements.detailDialog, elements.metricsDialog, elements.shortcutsDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
});

document.addEventListener("keydown", (event) => {
  const typing = ["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName);
  if (event.key === "/" && !typing) { event.preventDefault(); elements.search.focus(); return; }
  if (typing || elements.metricsDialog.open || elements.shortcutsDialog.open) return;
  const key = event.key.toLowerCase();
  if (!elements.detailDialog.open && key === "j") { event.preventDefault(); moveSelection(1); }
  else if (!elements.detailDialog.open && key === "k") { event.preventDefault(); moveSelection(-1); }
  else if (!elements.detailDialog.open && event.key === "Enter") { const id = activeTargetId(); if (id) openDetail(id); }
  else if (key === "a") { const id = activeTargetId(); if (id) analyzeQuestion(id); }
  else if (["1", "2", "3"].includes(event.key)) {
    const id = activeTargetId();
    const status = { "1": "unresolved", "2": "uncertain", "3": "resolved" }[event.key];
    if (id) setHumanDecision(id, status);
  }
});

populateScenarioFilter();
render();
checkApiHealth();
