function renderSidebar() {
  const sidebar = document.getElementById("app-sidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `
    <a class="brand dashboard-brand" href="./dashboard.html" aria-label="E-Bajr، لوحة المتابعة">
      <img
        class="logo"
        src="./e-bajr-logo.png"
        alt="E-Bajr"
        width="120"
        height="40"
      />
    </a>

    <div class="dashboard-org">
      <span>منشأتك</span>
      <strong data-org></strong>
    </div>

    <nav class="main-nav" aria-label="القائمة الرئيسية">
      <a href="./dashboard.html"><span class="dashboard-nav-icon" aria-hidden="true">▦</span>لوحة المتابعة</a>
      <a href="./orders.html"><span class="dashboard-nav-icon" aria-hidden="true">≡</span>الطلبات</a>
      <a href="./create-order.html"><span class="dashboard-nav-icon" aria-hidden="true">＋</span>طلب جديد</a>
      <a class="admin-link" href="./members.html" hidden><span class="dashboard-nav-icon dashboard-person" aria-hidden="true"></span>الأعضاء</a>
    </nav>

    <div class="session">
      <p class="session-meta">
        <strong data-who></strong>
      </p>

      <button
        class="btn btn-quiet btn-sm"
        type="button"
        data-logout
      >
        تسجيل الخروج
      </button>
    </div>
  `;
}
