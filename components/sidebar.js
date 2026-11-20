function renderSidebar() {
  const sidebar = document.getElementById("app-sidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `
    <a class="brand dashboard-brand" href="./dashboard.html" data-keep-language aria-label="E-Bajr، الرئيسية" data-i18n-aria-label="nav.home">
      <img
        class="logo"
        src="./e-bajr-logo.png"
        alt="E-Bajr"
        width="120"
        height="40"
      />
    </a>

    <div class="dashboard-org">
      <span data-i18n="sidebar.establishment">منشأتك</span>
      <strong data-org></strong>
    </div>

    <nav class="main-nav" aria-label="القائمة الرئيسية" data-i18n-aria-label="nav.main">
      <a href="./dashboard.html" data-keep-language><span class="dashboard-nav-icon" aria-hidden="true">▦</span><span data-i18n="sidebar.dashboard">لوحة المتابعة</span></a>
      <a href="./orders.html" data-keep-language><span class="dashboard-nav-icon" aria-hidden="true">≡</span><span data-i18n="sidebar.orders">الطلبات</span></a>
      <a href="./create-order.html" data-keep-language><span class="dashboard-nav-icon" aria-hidden="true">＋</span><span data-i18n="sidebar.newOrder">طلب جديد</span></a>
      <a class="admin-link" href="./members.html" data-keep-language hidden><span class="dashboard-nav-icon dashboard-person" aria-hidden="true"></span><span data-i18n="sidebar.members">الأعضاء</span></a>
    </nav>

    <div class="session">
      <p class="session-meta">
        <strong data-who></strong>
      </p>

      <a class="language-toggle sidebar-language" href="?lang=en" lang="en" hreflang="en" dir="auto" data-language-toggle>English</a>

      <button
        class="btn btn-quiet btn-sm"
        type="button"
        data-logout
        data-i18n="sidebar.logout"
      >
        تسجيل الخروج
      </button>
    </div>
  `;
}
