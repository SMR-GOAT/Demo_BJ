"use strict";

const STORAGE_KEY = "ebajr-demo";
const ACTIVE = ["new", "preparing", "ready"];
const NEXT = {
  new: ["preparing", "ready"],
  preparing: ["ready"],
  ready: ["delivered"],
};

function uid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function emptyState() {
  return {
    account: null,
    session: null,
    establishment: null,
    orders: [],
    members: [],
    notifyDenied: {},
    demoNotify: false,
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const data = JSON.parse(raw);
    return {
      account: data.account || null,
      session: data.session || null,
      establishment: data.establishment || null,
      orders: Array.isArray(data.orders) ? data.orders : [],
      members: Array.isArray(data.members) ? data.members : [],
      notifyDenied: data.notifyDenied || {},
      demoNotify: Boolean(data.demoNotify),
    };
  } catch (error) {
    return emptyState();
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function persist(state) {
  try {
    save(state);
    return "";
  } catch (error) {
    return "تعذر حفظ البيانات على هذا المتصفح. حاول مرة أخرى.";
  }
}

function roleLabel(role) {
  return role === "admin" ? "مدير" : "موظف";
}

function statusLabel(status) {
  const labels = {
    new: "جديد",
    preparing: "قيد التجهيز",
    ready: "جاهز للاستلام",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };
  return labels[status] || status;
}

function statusSentence(status) {
  const lines = {
    new: "تم تسجيل طلبك.",
    preparing: "يجري تجهيز طلبك.",
    ready: "طلبك جاهز للاستلام.",
    delivered: "حالة الطلب: تم التسليم.",
    cancelled: "حالة الطلب: ملغي.",
  };
  return lines[status] || "";
}

function formatTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ar", {
    dateStyle: "medium",
    timeStyle: "short",
    numberingSystem: "latn",
  }).format(date);
}

function digits(value) {
  return String(value || "").replace(/\D/g, "");
}

function activeOrders(state) {
  return state.orders
    .filter((order) => ACTIVE.includes(order.status))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function memberBySession(state) {
  if (!state.session) return null;
  return state.members.find((member) => member.id === state.session.memberId) || null;
}

function field(form, name) {
  return form.elements.namedItem(name);
}

function showAlert(node, text, kind) {
  if (!node) return;
  node.hidden = !text;
  node.textContent = text || "";
  node.className = "alert" + (kind ? " alert-" + kind : "");
}

function setFieldError(id, text) {
  const node = document.getElementById(id);
  if (!node) return;
  node.hidden = !text;
  node.textContent = text || "";
}

function badge(status) {
  const node = document.createElement("span");
  node.className = "badge badge-" + status;
  node.textContent = statusLabel(status);
  return node;
}

function makeOrder(number, status, minutesAgo, by) {
  const created = new Date(Date.now() - minutesAgo * 60000).toISOString();
  const history = [{ from: null, to: "new", at: created, by: by }];
  let updated = created;
  if (status !== "new") {
    updated = new Date(Date.now() - Math.max(minutesAgo - 5, 1) * 60000).toISOString();
    history.push({ from: "new", to: status, at: updated, by: by });
  }
  return {
    id: uid(),
    number: number,
    status: status,
    createdAt: created,
    updatedAt: updated,
    notify: false,
    attempts: [],
    history: history,
  };
}

function readLogo(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      reject(new Error("type"));
      return;
    }
    if (file.size > 500 * 1024) {
      reject(new Error("size"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read"));
    reader.readAsDataURL(file);
  });
}

function logoError(error) {
  if (error && error.message === "size") return "اختر شعارًا أصغر من 500 ك.ب.";
  if (error && error.message === "type") return "اختر ملف صورة.";
  return "تعذر قراءة الشعار. حاول مرة أخرى.";
}

function notifyReady(state, order) {
  if (!order.notify) return;
  const attempt = { id: uid(), at: new Date().toISOString(), ok: false, reason: "" };
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") {
      attempt.reason = "الإذن غير متاح";
    } else {
      const org = state.establishment ? state.establishment.name : "المنشأة";
      new Notification(org, { body: "الطلب " + order.number + " جاهز للاستلام" });
      attempt.ok = true;
    }
  } catch (error) {
    attempt.reason = "تعذر الإرسال";
  }
  order.attempts.push(attempt);
}

function ask(dialog, text) {
  return new Promise((resolve) => {
    const message = dialog.querySelector("[data-confirm-text]");
    message.textContent = text;
    const onClose = () => {
      dialog.removeEventListener("close", onClose);
      resolve(dialog.returnValue === "ok");
    };
    dialog.addEventListener("close", onClose);
    dialog.showModal();
  });
}

function bindLogout() {
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      const state = load();
      if (state.session) state.session.loggedIn = false;
      persist(state);
      location.href = "./login.html";
    });
  });
}

function fillChrome(state) {
  const org = document.querySelector("[data-org]");
  const who = document.querySelector("[data-who]");
  if (org) org.textContent = state.establishment ? state.establishment.name : "";
  if (who && state.session) {
    const role = window.ebajrI18n
      ? window.ebajrI18n.text("sidebar.role." + state.session.role)
      : roleLabel(state.session.role);
    who.textContent = state.session.name + " · " + role;
  }
  const file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = new URL(link.href).pathname.split("/").pop();
    if (href === file) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll(".admin-link").forEach((link) => {
    link.hidden = !state.session || state.session.role !== "admin";
  });
}

function requireSession() {
  const state = load();
  if (!state.session || !state.session.loggedIn) {
    location.replace("./login.html");
    return null;
  }
  const member = memberBySession(state);
  if (member && member.disabled) {
    state.session.loggedIn = false;
    persist(state);
    location.replace("./login.html?disabled=1");
    return null;
  }
  return state;
}

function watchSession() {
  window.addEventListener("storage", () => {
    const state = load();
    const member = memberBySession(state);
    if (!state.session || !state.session.loggedIn || (member && member.disabled)) {
      location.replace("./login.html?disabled=1");
    }
  });
}

function goAfterLogin(state) {
  location.href = state.establishment ? "./dashboard.html" : "./create-establishment.html";
}

function initLogin() {
  const state = load();
  if (state.session && state.session.loggedIn) {
    const member = memberBySession(state);
    if (!member || !member.disabled) {
      goAfterLogin(state);
      return;
    }
  }

  const form = document.querySelector("#login-form");
  const alert = document.querySelector("#form-alert");
  if (new URLSearchParams(location.search).get("disabled") === "1") {
    showAlert(alert, "تم إيقاف الوصول إلى هذه المنشأة.", "error");
  }

  document.querySelector("#reset-demo").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    showAlert(alert, "تم مسح بيانات التجربة على هذا المتصفح.", "ok");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const identifierInput = field(form, "identifier");
    const passwordInput = field(form, "password");
    const identifier = identifierInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    setFieldError("identifier-error", identifier ? "" : "اكتب اسم المستخدم أو البريد الإلكتروني.");
    setFieldError("password-error", password ? "" : "اكتب كلمة المرور.");
    identifierInput.setAttribute("aria-invalid", identifier ? "false" : "true");
    passwordInput.setAttribute("aria-invalid", password ? "false" : "true");
    if (!identifier || !password) return;

    const current = load();
    if (!current.account && current.members.length === 0) {
      showAlert(alert, "لا يوجد حساب بعد. أنشئ حسابًا أولًا.", "error");
      return;
    }

    if (current.account) {
      const email = current.account.email.toLowerCase();
      const username = current.account.username.toLowerCase();
      if (identifier === email || identifier === username) {
        const owner = current.members.find((member) => member.owner);
        if (owner && owner.disabled) {
          showAlert(alert, "تم إيقاف الوصول إلى هذه المنشأة.", "error");
          return;
        }
        current.session = {
          name: current.account.name,
          email: current.account.email,
          role: owner ? owner.role : "admin",
          loggedIn: true,
          memberId: owner ? owner.id : "",
        };
        const problem = persist(current);
        if (problem) {
          showAlert(alert, problem, "error");
          return;
        }
        goAfterLogin(current);
        return;
      }
    }

    const member = current.members.find((item) => item.email.toLowerCase() === identifier && !item.owner);
    if (!member) {
      showAlert(alert, "بيانات الدخول غير صحيحة.", "error");
      return;
    }
    if (member.disabled) {
      showAlert(alert, "تم إيقاف الوصول إلى هذه المنشأة.", "error");
      return;
    }
    if (member.pending) {
      showAlert(alert, "هذه الدعوة لم تُقبل بعد. افتح رابط قبول الدعوة أولًا.", "error");
      return;
    }
    current.session = {
      name: member.name || member.email,
      email: member.email,
      role: member.role,
      loggedIn: true,
      memberId: member.id,
    };
    const problem = persist(current);
    if (problem) {
      showAlert(alert, problem, "error");
      return;
    }
    goAfterLogin(current);
  });
}

function initSignup() {
  const existing = load();
  if (existing.session && existing.session.loggedIn && existing.account) {
    goAfterLogin(existing);
    return;
  }

  const form = document.querySelector("#signup-form");
  const alert = document.querySelector("#form-alert");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.dataset.busy === "1") return;
    const nameInput = field(form, "name");
    const usernameInput = field(form, "username");
    const emailInput = field(form, "email");
    const passwordInput = field(form, "password");
    const confirmInput = field(form, "confirm");
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    emailInput.value = email;

    const errors = {
      name: name ? "" : "اكتب الاسم.",
      username: username ? "" : "اكتب اسم المستخدم.",
      email: "",
      password: password ? "" : "اكتب كلمة المرور.",
      confirm: "",
    };
    if (!email) errors.email = "اكتب البريد الإلكتروني.";
    else if (!emailInput.checkValidity()) errors.email = "اكتب بريدًا إلكترونيًا صالحًا.";
    if (password && confirm !== password) errors.confirm = "كلمتا المرور غير متطابقتين.";
    if (password && !confirm) errors.confirm = "أكد كلمة المرور.";

    for (const key of Object.keys(errors)) {
      setFieldError(key + "-error", errors[key]);
      field(form, key).setAttribute("aria-invalid", errors[key] ? "true" : "false");
    }
    if (Object.values(errors).some(Boolean)) return;

    const state = load();
    if (state.account) {
      showAlert(alert, "يوجد حساب على هذا المتصفح. سجّل الدخول، أو امسح بيانات التجربة من صفحة الدخول.", "error");
      return;
    }

    form.dataset.busy = "1";
    form.querySelector("button[type=submit]").disabled = true;
    state.account = { name: name, username: username, email: email };
    state.session = {
      name: name,
      email: email,
      role: "admin",
      loggedIn: true,
      memberId: "",
    };
    const problem = persist(state);
    if (problem) {
      form.dataset.busy = "0";
      form.querySelector("button[type=submit]").disabled = false;
      showAlert(alert, problem, "error");
      return;
    }
    location.href = "./create-establishment.html";
  });
}

function initEstablishment() {
  const form = document.querySelector("#org-form");
  const alert = document.querySelector("#form-alert");
  const preview = document.querySelector("#logo-preview");
  const fileInput = form.logo;

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      preview.hidden = true;
      return;
    }
    try {
      preview.src = await readLogo(file);
      preview.hidden = false;
      setFieldError("logo-error", "");
    } catch (error) {
      preview.hidden = true;
      setFieldError("logo-error", logoError(error));
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.busy === "1") return;
    const nameInput = field(form, "name");
    const name = nameInput.value.trim();
    setFieldError("name-error", name ? "" : "اكتب اسم المنشأة.");
    nameInput.setAttribute("aria-invalid", name ? "false" : "true");
    if (!name) return;

    form.dataset.busy = "1";
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    let logo = "";
    const file = fileInput.files && fileInput.files[0];
    if (file) {
      try {
        logo = await readLogo(file);
      } catch (error) {
        form.dataset.busy = "0";
        button.disabled = false;
        setFieldError("logo-error", logoError(error));
        return;
      }
    }

    const state = load();
    const ownerId = uid();
    state.establishment = { name: name, logo: logo };
    state.members = [
      {
        id: ownerId,
        name: state.account.name,
        email: state.account.email,
        role: "admin",
        disabled: false,
        pending: false,
        owner: true,
      },
      {
        id: uid(),
        name: "سارة الموظف",
        email: "sara@example.com",
        role: "staff",
        disabled: false,
        pending: false,
        owner: false,
      },
    ];
    state.session.memberId = ownerId;
    state.session.role = "admin";
    state.orders = [
      makeOrder("014", "new", 40, state.account.name),
      makeOrder("052", "preparing", 15, state.account.name),
    ];
    const problem = persist(state);
    if (problem) {
      form.dataset.busy = "0";
      button.disabled = false;
      showAlert(alert, problem, "error");
      return;
    }
    location.href = "./dashboard.html";
  });
}

function initAccept() {
  const params = new URLSearchParams(location.search);
  const state = load();
  const org = params.get("org") || (state.establishment ? state.establishment.name : "المنشأة");
  const role = params.get("role") === "admin" ? "admin" : "staff";
  const email = (params.get("email") || "").trim();
  document.querySelector("#org-name").textContent = org;
  document.querySelector("#role-name").textContent = roleLabel(role);
  const form = document.querySelector("#accept-form");
  if (email) {
    form.email.value = email;
    form.email.readOnly = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = field(form, "name");
    const emailInput = field(form, "email");
    const passwordInput = field(form, "password");
    const confirmInput = field(form, "confirm");
    const name = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    emailInput.value = emailValue;
    const errors = {
      name: name ? "" : "اكتب الاسم.",
      email: "",
      password: password ? "" : "اكتب كلمة المرور.",
      confirm: "",
    };
    if (!emailValue) errors.email = "اكتب البريد الإلكتروني.";
    else if (!emailInput.checkValidity()) errors.email = "اكتب بريدًا إلكترونيًا صالحًا.";
    if (password && !confirm) errors.confirm = "أكد كلمة المرور.";
    if (password && confirm !== password) errors.confirm = "كلمتا المرور غير متطابقتين.";
    for (const key of Object.keys(errors)) {
      setFieldError(key + "-error", errors[key]);
      field(form, key).setAttribute("aria-invalid", errors[key] ? "true" : "false");
    }
    if (Object.values(errors).some(Boolean)) return;

    const current = load();
    if (!current.establishment) {
      current.establishment = { name: org, logo: "" };
    }
    let member = current.members.find((item) => item.email.toLowerCase() === emailValue.toLowerCase());
    if (member && member.disabled) {
      showAlert(document.querySelector("#form-alert"), "تم إيقاف هذا الوصول. لا يمكن قبول الدعوة.", "error");
      return;
    }
    if (!member) {
      member = {
        id: uid(),
        name: name,
        email: emailValue,
        role: role,
        disabled: false,
        pending: false,
        owner: false,
      };
      current.members.push(member);
    } else {
      member.name = name;
      member.role = role;
      member.pending = false;
      member.disabled = false;
    }
    current.session = {
      name: name,
      email: emailValue,
      role: member.role,
      loggedIn: true,
      memberId: member.id,
    };
    const problem = persist(current);
    if (problem) {
      showAlert(document.querySelector("#form-alert"), problem, "error");
      return;
    }
    location.href = "./dashboard.html";
  });
}

function initForgot() {
  const form = document.querySelector("#forgot-form");
  const alert = document.querySelector("#form-alert");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    form.email.value = email;
    let error = "";
    if (!email) error = "اكتب البريد الإلكتروني.";
    else if (!form.email.checkValidity()) error = "اكتب بريدًا إلكترونيًا صالحًا.";
    setFieldError("email-error", error);
    form.email.setAttribute("aria-invalid", error ? "true" : "false");
    if (error) {
      alert.hidden = true;
      document.querySelector("#reset-link").hidden = true;
      return;
    }
    showAlert(alert, "تمت محاكاة إرسال رابط الاستعادة. يمكنك متابعة الخطوة التالية أدناه.", "ok");
    document.querySelector("#reset-link").hidden = false;
  });
}

function initReset() {
  const form = document.querySelector("#reset-form");
  const alert = document.querySelector("#form-alert");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = form.password.value;
    const confirm = form.confirm.value;
    setFieldError("password-error", password ? "" : "اكتب كلمة المرور الجديدة.");
    let confirmError = "";
    if (!confirm) confirmError = "أكد كلمة المرور.";
    else if (password && confirm !== password) confirmError = "كلمتا المرور غير متطابقتين.";
    setFieldError("confirm-error", confirmError);
    form.password.setAttribute("aria-invalid", password ? "false" : "true");
    form.confirm.setAttribute("aria-invalid", confirmError ? "true" : "false");
    if (!password || confirmError) return;
    form.hidden = true;
    showAlert(alert, "تم تعيين كلمة المرور تجريبيًا. يمكنك الانتقال إلى تسجيل الدخول.", "ok");
    document.querySelector("#login-link").hidden = false;
  });
}

function initDashboard() {
  const alert = document.querySelector("#form-alert");
  function paint() {
    const state = load();
    const orders = activeOrders(state);
    document.querySelector("#stat-active").textContent = String(orders.length);
    document.querySelector("#stat-new").textContent = String(orders.filter((order) => order.status === "new").length);
    document.querySelector("#stat-preparing").textContent = String(orders.filter((order) => order.status === "preparing").length);
    document.querySelector("#stat-ready").textContent = String(orders.filter((order) => order.status === "ready").length);
    const body = document.querySelector("#recent-body");
    const empty = document.querySelector("#recent-empty");
    const recent = orders.slice(0, 5);
    body.replaceChildren();
    empty.hidden = recent.length !== 0;
    document.querySelector("#recent-table").hidden = recent.length === 0;
    for (const order of recent) {
      const row = document.createElement("tr");
      row.append(cell("الرقم", numberNode(order.number)), cell("وقت التسجيل", textNode(formatTime(order.createdAt))), cell("الحالة", badge(order.status)));
      body.append(row);
    }
    const hint = document.querySelector("#staff-hint");
    if (hint) hint.hidden = !state.session || state.session.role !== "admin";
  }

  window.addEventListener("storage", paint);
  paint();
  if (alert) alert.hidden = true;
}

function textNode(value) {
  return document.createTextNode(value);
}

function numberNode(value) {
  const node = document.createElement("bdi");
  node.dir = "ltr";
  node.textContent = value;
  return node;
}

function cell(label, child) {
  const td = document.createElement("td");
  td.dataset.label = label;
  td.append(child);
  return td;
}

function initCreateOrder() {
  const form = document.querySelector("#create-form");
  const input = form.number;
  const alert = document.querySelector("#form-alert");
  const result = document.querySelector("#result");
  input.addEventListener("input", () => {
    input.value = digits(input.value).slice(0, 3);
    input.setAttribute("aria-invalid", "false");
    setFieldError("number-error", "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.dataset.busy === "1") return;
    const number = digits(input.value);
    input.value = number;
    if (number.length !== 3) {
      setFieldError("number-error", "أدخل آخر ثلاثة أرقام من الفاتورة، مثل 007.");
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }

    const state = load();
    const duplicate = activeOrders(state).some((order) => order.number === number);
    if (duplicate) {
      setFieldError("number-error", "هذا الرقم مستخدم في طلب نشط.");
      input.setAttribute("aria-invalid", "true");
      showAlert(alert, "", "");
      input.focus();
      return;
    }

    form.dataset.busy = "1";
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    const now = new Date().toISOString();
    const order = {
      id: uid(),
      number: number,
      status: "new",
      createdAt: now,
      updatedAt: now,
      notify: false,
      attempts: [],
      history: [{ from: null, to: "new", at: now, by: state.session.name }],
    };
    state.orders.push(order);
    const problem = persist(state);
    form.dataset.busy = "0";
    button.disabled = false;
    if (problem) {
      showAlert(alert, problem, "error");
      return;
    }

    setFieldError("number-error", "");
    showAlert(alert, "تم إنشاء الطلب.", "ok");
    result.hidden = false;
    document.querySelector("#result-number").textContent = order.number;
    const link = document.querySelector("#result-link");
    link.href = "./order.html?code=" + encodeURIComponent(order.id);
    input.value = "";
    input.focus();
  });
}

function initOrders() {
  let query = "";
  const alert = document.querySelector("#form-alert");
  const editDialog = document.querySelector("#edit-dialog");
  const confirmDialog = document.querySelector("#confirm-dialog");
  const historyDialog = document.querySelector("#history-dialog");
  const editForm = document.querySelector("#edit-form");
  let editingId = "";

  function paint() {
    const state = load();
    const orders = activeOrders(state).filter((order) => !query || order.number === query);
    const body = document.querySelector("#orders-body");
    const empty = document.querySelector("#orders-empty");
    const table = document.querySelector("#orders-table");
    body.replaceChildren();
    empty.hidden = orders.length !== 0;
    table.hidden = orders.length === 0;
    empty.textContent = query ? "لا يوجد طلب نشط بهذا الرقم." : "لا توجد طلبات نشطة.";
    document.querySelector("#active-count").textContent = String(activeOrders(state).length);
    for (const order of orders) body.append(orderRow(order));
  }

  function orderRow(order) {
    const row = document.createElement("tr");
    const select = document.createElement("select");
    select.className = "table-select";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "تغيير الحالة";
    select.append(placeholder);
    for (const status of NEXT[order.status] || []) {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = statusLabel(status);
      select.append(option);
    }
    const update = document.createElement("button");
    update.type = "button";
    update.className = "btn btn-sm";
    update.textContent = "تحديث";
    update.addEventListener("click", () => changeStatus(order.id, select.value));

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(select, update);
    if (order.status === "new" || order.status === "preparing") {
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "btn btn-quiet btn-sm";
      edit.textContent = "تعديل الرقم";
      edit.addEventListener("click", () => openEdit(order));
      actions.append(edit);
    }
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "btn btn-danger btn-sm";
    cancel.textContent = "إلغاء";
    cancel.addEventListener("click", () => cancelOrder(order.id));
    const history = document.createElement("button");
    history.type = "button";
    history.className = "btn btn-quiet btn-sm";
    history.textContent = "السجل";
    history.addEventListener("click", () => openHistory(order.id));
    actions.append(cancel, history);

    row.append(
      cell("الرقم", numberNode(order.number)),
      cell("وقت التسجيل", textNode(formatTime(order.createdAt))),
      cell("الحالة", badge(order.status)),
      cell("إجراءات", actions)
    );
    return row;
  }

  async function changeStatus(id, next) {
    if (!next) {
      showAlert(alert, "اختر الحالة الجديدة.", "error");
      return;
    }
    if (next === "delivered") {
      const ok = await ask(confirmDialog, "بعد التسليم يخرج الطلب من القائمة، ويصبح رقمه متاحًا لطلب جديد.");
      if (!ok) return;
    }
    const state = load();
    const order = state.orders.find((item) => item.id === id);
    if (!order || !ACTIVE.includes(order.status)) {
      showAlert(alert, "تعذر تحديث الحالة. الحالة المعتمدة لم تتغير.", "error");
      paint();
      return;
    }
    if (!(NEXT[order.status] || []).includes(next)) {
      showAlert(alert, "لا يمكن الانتقال إلى هذه الحالة.", "error");
      paint();
      return;
    }
    const from = order.status;
    const at = new Date().toISOString();
    order.status = next;
    order.updatedAt = at;
    order.history.push({ from: from, to: next, at: at, by: state.session.name });
    if (next === "ready") notifyReady(state, order);
    const problem = persist(state);
    if (problem) {
      showAlert(alert, problem, "error");
      return;
    }
    showAlert(alert, next === "delivered" ? "تم تسليم الطلب وخرج من القائمة النشطة." : "تم تحديث الحالة.", "ok");
    paint();
  }

  function openEdit(order) {
    editingId = order.id;
    editForm.number.value = order.number;
    setFieldError("edit-error", "");
    editDialog.showModal();
    editForm.number.focus();
  }

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const number = digits(editForm.number.value);
    editForm.number.value = number;
    if (number.length !== 3) {
      setFieldError("edit-error", "أدخل ثلاثة أرقام، مثل 007.");
      return;
    }
    const state = load();
    const order = state.orders.find((item) => item.id === editingId);
    if (!order || (order.status !== "new" && order.status !== "preparing")) {
      setFieldError("edit-error", "يمكن تعديل الرقم في حالتي جديد وقيد التجهيز فقط.");
      return;
    }
    const duplicate = activeOrders(state).some((item) => item.id !== order.id && item.number === number);
    if (duplicate) {
      setFieldError("edit-error", "هذا الرقم مستخدم في طلب نشط.");
      return;
    }
    order.number = number;
    order.updatedAt = new Date().toISOString();
    const problem = persist(state);
    if (problem) {
      setFieldError("edit-error", problem);
      return;
    }
    editDialog.close();
    showAlert(alert, "تم تعديل رقم الطلب.", "ok");
    paint();
  });

  editDialog.querySelector("[data-close]").addEventListener("click", () => editDialog.close());

  async function cancelOrder(id) {
    const ok = await ask(confirmDialog, "هل تريد إلغاء الطلب؟ سيخرج من القائمة النشطة ويصبح رقمه متاحًا من جديد.");
    if (!ok) return;
    const state = load();
    const order = state.orders.find((item) => item.id === id);
    if (!order || !ACTIVE.includes(order.status)) {
      showAlert(alert, "لا يمكن إلغاء هذا الطلب.", "error");
      paint();
      return;
    }
    const from = order.status;
    const at = new Date().toISOString();
    order.status = "cancelled";
    order.updatedAt = at;
    order.history.push({ from: from, to: "cancelled", at: at, by: state.session.name });
    const problem = persist(state);
    if (problem) {
      showAlert(alert, problem, "error");
      return;
    }
    showAlert(alert, "تم إلغاء الطلب وخرج من القائمة النشطة.", "ok");
    paint();
  }

  function openHistory(id) {
    const state = load();
    const order = state.orders.find((item) => item.id === id);
    const list = document.querySelector("#history-list");
    list.replaceChildren();
    if (!order) return;
    for (const item of order.history) {
      const li = document.createElement("li");
      const change = item.from
        ? "من " + statusLabel(item.from) + " إلى " + statusLabel(item.to)
        : "تم إنشاء الطلب بحالة " + statusLabel(item.to);
      li.textContent = change + " · " + item.by + " · " + formatTime(item.at);
      list.append(li);
    }
    historyDialog.showModal();
  }

  document.querySelector("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = digits(document.querySelector("#search-input").value);
    if (value && value.length !== 3) {
      showAlert(alert, "أدخل ثلاثة أرقام للبحث.", "error");
      return;
    }
    query = value;
    showAlert(alert, "", "");
    paint();
  });

  document.querySelector("#clear-search").addEventListener("click", () => {
    query = "";
    document.querySelector("#search-input").value = "";
    showAlert(alert, "", "");
    paint();
  });

  window.addEventListener("storage", paint);
  paint();
}

function initMembers() {
  const alert = document.querySelector("#form-alert");
  const form = document.querySelector("#invite-form");
  const confirmDialog = document.querySelector("#confirm-dialog");

  function paint() {
    const state = load();
    const body = document.querySelector("#members-body");
    body.replaceChildren();
    for (const member of state.members) {
      const row = document.createElement("tr");
      const select = document.createElement("select");
      select.className = "table-select";
      for (const role of ["staff", "admin"]) {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = roleLabel(role);
        option.selected = member.role === role;
        select.append(option);
      }
      const mine = state.session && member.id === state.session.memberId;
      select.disabled = mine || member.disabled;
      select.addEventListener("change", () => changeRole(member.id, select.value));

      const actions = document.createElement("div");
      actions.className = "actions";
      actions.append(select);
      if (!mine && !member.disabled) {
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "btn btn-danger btn-sm";
        remove.textContent = member.pending ? "إلغاء الدعوة" : "إزالة العضوية";
        remove.addEventListener("click", () => removeMember(member.id));
        actions.append(remove);
      }

      let presence = "نشط";
      let presenceClass = "badge-ready";
      if (member.pending) {
        presence = "بانتظار القبول";
        presenceClass = "badge-pending";
      } else if (member.disabled) {
        presence = "موقوف";
        presenceClass = "badge-cancelled";
      }
      const presenceBadge = document.createElement("span");
      presenceBadge.className = "badge " + presenceClass;
      presenceBadge.textContent = presence;

      row.append(
        cell("الاسم", textNode(member.name || "بانتظار القبول")),
        cell("البريد", numberNode(member.email)),
        cell("الحالة", presenceBadge),
        cell("الدور", actions)
      );
      body.append(row);
    }
  }

  function changeRole(id, role) {
    const state = load();
    const member = state.members.find((item) => item.id === id);
    if (!member || member.id === state.session.memberId) {
      showAlert(alert, "لا يمكن تغيير دورك من هنا.", "error");
      paint();
      return;
    }
    if (role !== "staff" && role !== "admin") return;
    member.role = role;
    const problem = persist(state);
    showAlert(alert, problem || "تم تغيير الدور.", problem ? "error" : "ok");
    paint();
  }

  async function removeMember(id) {
    const state = load();
    const member = state.members.find((item) => item.id === id);
    if (!member || member.id === state.session.memberId) return;
    const text = member.pending
      ? "هل تريد إلغاء هذه الدعوة؟"
      : "سيتم إيقاف وصول هذا المستخدم، مع بقاء سجل إجراءاته.";
    const ok = await ask(confirmDialog, text);
    if (!ok) return;
    const fresh = load();
    const target = fresh.members.find((item) => item.id === id);
    if (!target) {
      paint();
      return;
    }
    if (target.pending) fresh.members = fresh.members.filter((item) => item.id !== id);
    else target.disabled = true;
    const problem = persist(fresh);
    showAlert(alert, problem || (target.pending ? "تم إلغاء الدعوة." : "تم إيقاف الوصول."), problem ? "error" : "ok");
    paint();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const role = form.role.value === "admin" ? "admin" : "staff";
    form.email.value = email;
    let error = "";
    if (!email) error = "اكتب البريد الإلكتروني.";
    else if (!form.email.checkValidity()) error = "اكتب بريدًا إلكترونيًا صالحًا.";
    setFieldError("invite-error", error);
    form.email.setAttribute("aria-invalid", error ? "true" : "false");
    if (error) return;

    const state = load();
    const exists = state.members.some((member) => member.email.toLowerCase() === email.toLowerCase());
    if (exists || (state.account && state.account.email.toLowerCase() === email.toLowerCase())) {
      setFieldError("invite-error", "هذا البريد مضاف مسبقًا.");
      return;
    }
    state.members.push({
      id: uid(),
      name: "",
      email: email,
      role: role,
      disabled: false,
      pending: true,
      owner: false,
    });
    const problem = persist(state);
    if (problem) {
      showAlert(alert, problem, "error");
      return;
    }
    const link = document.querySelector("#invite-link");
    const url = new URL("./accept-invitation.html", location.href);
    url.searchParams.set("email", email);
    url.searchParams.set("role", role);
    url.searchParams.set("org", state.establishment.name);
    link.href = url.href;
    link.hidden = false;
    form.email.value = "";
    showAlert(alert, "تم إرسال الدعوة. يمكن فتح صفحة القبول من الرابط أدناه لتجربة المسار.", "ok");
    paint();
  });

  paint();
}

function initCustomer() {
  const params = new URLSearchParams(location.search);
  const card = document.querySelector("#customer-card");
  const invalid = document.querySelector("#invalid-card");
  const button = document.querySelector("#notify-btn");
  const note = document.querySelector("#notify-note");
  const dialog = document.querySelector("#notify-dialog");
  const statuses = ["new", "preparing", "ready", "delivered", "cancelled"];
  const enabledAlerts = new Set();
  const demoCreatedAt = new Date().toISOString();
  let demoStatus = statuses.includes(params.get("status")) ? params.get("status") : "preparing";
  let signature = "";

  const messages = {
    new: { heading: "وصلنا طلبك", copy: "فريق المنشأة سيبدأ تجهيزه. تقدر تتابع حالته من هنا." },
    preparing: { heading: "نجهّز طلبك", copy: "خذ راحتك، طلبك قيد التجهيز. بنوضح لك هنا أول ما يكون جاهز." },
    ready: { heading: "طلبك جاهز!", copy: "تفضّل إلى الكاونتر وأظهر رقم طلبك لاستلامه." },
    delivered: { heading: "بالعافية عليك", copy: "تم تسليم طلبك. سعدنا بزيارتك ونتمنى نشوفك قريب." },
    cancelled: { heading: "تم إلغاء الطلب", copy: "راجع فريق المنشأة إذا احتجت إلى مساعدة بخصوص طلبك." },
  };

  function view() {
    if (params.get("demo") === "1") {
      return {
        found: true,
        demo: true,
        id: "demo",
        org: "مقهى البُن",
        logo: "",
        number: "007",
        status: demoStatus,
        createdAt: demoCreatedAt,
        notify: enabledAlerts.has("demo"),
      };
    }
    const state = load();
    const order = state.orders.find((item) => item.id === params.get("code"));
    if (!order || !state.establishment) return { found: false };
    return {
      found: true,
      demo: false,
      id: order.id,
      org: state.establishment.name,
      logo: state.establishment.logo || "",
      number: order.number,
      status: statuses.includes(order.status) ? order.status : "new",
      createdAt: order.createdAt,
      notify: enabledAlerts.has(order.id),
    };
  }

  function paint() {
    const current = view();
    const next = JSON.stringify(current);
    if (next === signature) return;
    signature = next;
    if (!current.found) {
      card.hidden = true;
      invalid.hidden = false;
      return;
    }
    invalid.hidden = true;
    card.hidden = false;
    card.dataset.state = current.status;
    card.classList.toggle("customer-ringing", current.status === "ready" && current.notify);
    document.querySelector("#org-name").textContent = current.org;
    const logo = document.querySelector("#org-logo");
    if (current.logo) logo.src = current.logo;
    logo.hidden = !current.logo;
    document.querySelector("#org-monogram").hidden = Boolean(current.logo);
    document.querySelector("#order-number").textContent = current.number;
    document.querySelector("#pager-state").textContent = statusLabel(current.status);
    const status = document.querySelector("#order-status");
    status.className = "badge badge-" + current.status;
    status.textContent = statusLabel(current.status);
    const time = document.querySelector("#order-time");
    time.textContent = formatTime(current.createdAt);
    time.setAttribute("datetime", current.createdAt);
    document.querySelector("#customer-heading").textContent = messages[current.status].heading;
    document.querySelector("#status-copy").textContent = messages[current.status].copy;

    const cancelled = current.status === "cancelled";
    document.querySelector("#customer-progress").hidden = cancelled;
    const currentIndex = statuses.indexOf(current.status);
    for (const [index, step] of [...document.querySelectorAll("[data-order-step]")].entries()) {
      step.classList.toggle("is-complete", !cancelled && index < currentIndex);
      step.classList.toggle("is-current", !cancelled && index === currentIndex);
      if (!cancelled && index === currentIndex) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    }

    document.querySelector("#notify-wrap").hidden = ["ready", "delivered", "cancelled"].includes(current.status);
    button.textContent = current.notify ? "التنبيه التجريبي مفعّل" : "تفعيل تنبيه الجاهزية";
    button.setAttribute("aria-pressed", String(current.notify));
    note.hidden = !current.notify;
    note.textContent = "سيظهر تنبيه داخل الصفحة عندما يصبح طلبك جاهزًا.";
    document.querySelector("#customer-ready-alert").hidden = !(current.status === "ready" && current.notify);
    document.querySelector("#customer-demo").hidden = !current.demo;
    for (const control of document.querySelectorAll("[data-demo-status]")) {
      control.setAttribute("aria-pressed", String(control.dataset.demoStatus === current.status));
    }
  }

  button.addEventListener("click", () => {
    const current = view();
    if (!current.found) return;
    if (current.notify) {
      enabledAlerts.delete(current.id);
      paint();
      return;
    }
    dialog.returnValue = "";
    dialog.showModal();
  });

  dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "enable") return;
    const current = view();
    if (!current.found || ["delivered", "cancelled"].includes(current.status)) return;
    enabledAlerts.add(current.id);
    paint();
  });

  for (const control of document.querySelectorAll("[data-demo-status]")) {
    control.addEventListener("click", () => {
      if (params.get("demo") !== "1") return;
      demoStatus = control.dataset.demoStatus;
      paint();
    });
  }

  paint();
  window.addEventListener("storage", paint);
  window.setInterval(paint, 1000);
}

function boot() {
  // Build shared elements before binding their buttons and filling account data.
  if (document.getElementById("app-sidebar")) {
    renderSidebar();
    if (window.ebajrI18n) window.ebajrI18n.apply();
  }

  bindLogout();
  for (const button of document.querySelectorAll("[data-password-toggle]")) {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.getAttribute("aria-controls"));
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.textContent = show ? "إخفاء" : "إظهار";
      button.setAttribute("aria-pressed", String(show));
      button.setAttribute("aria-label", button.textContent + " " + input.labels[0].textContent.trim());
    });
  }
  const page = document.body.dataset.page || "";
  const appPages = ["dashboard", "orders", "create-order", "members"];
  if (appPages.includes(page)) {
    const state = requireSession();
    if (!state) return;
    if (!state.establishment) {
      location.replace("./create-establishment.html");
      return;
    }
    fillChrome(state);
    watchSession();
    if (page === "members" && state.session.role !== "admin") {
      document.querySelector("#denied").hidden = false;
      document.querySelector("#admin-panel").hidden = true;
      return;
    }
  }
  if (page === "establishment") {
    const state = requireSession();
    if (!state) return;
    if (state.establishment) {
      location.replace("./dashboard.html");
      return;
    }
  }

  const starters = {
    login: initLogin,
    signup: initSignup,
    establishment: initEstablishment,
    accept: initAccept,
    forgot: initForgot,
    reset: initReset,
    dashboard: initDashboard,
    "create-order": initCreateOrder,
    orders: initOrders,
    members: initMembers,
    customer: initCustomer,
  };
  if (starters[page]) starters[page]();
}

document.addEventListener("DOMContentLoaded", boot);
