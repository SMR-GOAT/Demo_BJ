(() => {
  const messages = {
    ar: {
      "nav.compare": "ليه بيجر ذكي؟",
      "compare.eyebrow": "تجربة أبسط، من أول طلب",
      "compare.title": "نفس فكرة البيجر. بدون أعباء الجهاز.",
      "compare.intro": "قارن التفاصيل اللي بتفرق في يوم منشأتك وتجربة عميلك.",
      "compare.topic": "التجربة",
      "compare.traditional": "البيجر التقليدي",
      "compare.smart": "البيجر الذكي E-Bajr",
      "compare.note": "المتابعة على جوال العميل تتطلب اتصالًا بالإنترنت، والتنبيه يعتمد على إعدادات المتصفح وصلاحياته.",
      "compare.carry.topic": "راحة العميل",
      "compare.carry.old": "يحتاج العميل إلى حمل جهاز إضافي طوال الانتظار.",
      "compare.carry.new": "يتابع طلبه من جواله، بدون جهاز إضافي.",
      "compare.loss.topic": "الفقد والاسترجاع",
      "compare.loss.old": "قد يأخذه العميل معه أو يضيعه، وتحتاج المنشأة إلى استرجاعه.",
      "compare.loss.new": "لا يوجد جهاز يُسلَّم للعميل أو يحتاج إلى استرجاع.",
      "compare.power.topic": "الشحن",
      "compare.power.old": "يحتاج إلى شحن دوري، وقد تنفد بطاريته أثناء الانتظار.",
      "compare.power.new": "لا توجد أجهزة بيجر إضافية تحتاج إلى شحن؛ المتابعة على جوال العميل.",
      "compare.care.topic": "التلف والاستبدال",
      "compare.care.old": "قد يسقط وينكسر، وله عمر تشغيلي يستلزم الاستبدال.",
      "compare.care.new": "خدمة رقمية بدون أجهزة بيجر تتعرض للسقوط أو تحتاج إلى استبدال.",
      "compare.sharing.topic": "الاستخدام المشترك",
      "compare.sharing.old": "ينتقل الجهاز بين العملاء ويحتاج إلى تنظيف بين الاستخدامات.",
      "compare.sharing.new": "كل عميل يستخدم جواله، مما يقلل تداول الأجهزة المشتركة.",
      "sidebar.workspace": "مساحة العمل",
      "sidebar.establishment": "منشأتك",
      "sidebar.dashboard": "لوحة المتابعة",
      "sidebar.orders": "الطلبات",
      "sidebar.newOrder": "طلب جديد",
      "sidebar.members": "الأعضاء",
      "sidebar.logout": "تسجيل الخروج",
      "sidebar.role.owner": "مالك المنشأة",
      "sidebar.display": "شاشة الطلبات",
      "sidebar.notifications": "سجل التنبيهات",
      "sidebar.role.admin": "مدير",
      "sidebar.role.staff": "موظف",
      "page.title": "E-Bajr | بيجر عميلك في جواله",
      "page.description": "استبدل البيجر التقليدي بتجربة متابعة الطلب من جوال العميل مع E-Bajr.",
      "nav.home": "E-Bajr، الرئيسية",
      "nav.main": "القائمة الرئيسية",
      "nav.howItWorks": "كيف يعمل؟",
      "nav.audience": "للفريق وللعميل",
      "nav.faq": "الأسئلة الشائعة",
      "nav.createAccount": "إنشاء حساب",
      "nav.signIn": "دخول",
      "nav.signInFull": "تسجيل الدخول",
      "hero.category": "انتظار أريح لعميلك",
      "hero.title": "خلّ جوال عميلك",
      "hero.accent": "بيجره الذكي.",
      "hero.arrow": "←",
      "hero.description": "استبدل البيجر التقليدي ببيجر ذكي يخلي العميل يتابع طلبه من جواله، ويعرف متى يستلمه.",
      "hero.note": "بدون تطبيق للعميل. وبدون بيجر يرجع للكاونتر.",
      "preview.scan": "امسح وتابع طلبك",
      "preview.readyMessage": "طلبك جاهز، تفضّل بالاستلام",
      "preview.readyDescription": "تنبيه الجاهزية على جوال العميل.",
      "preview.open": "جرّب صفحة العميل",
      "preview.title": "معاينة صفحة العميل",
      "preview.orderNumber": "رقم الطلب",
      "preview.qrAlt": "رمز QR تجريبي للطلب 007",
      "preview.demoQr": "رمز تجريبي",
      "preview.stages": "مراحل الطلب",
      "preview.new": "جديد",
      "preview.preparing": "قيد التجهيز",
      "preview.ready": "جاهز للاستلام",
      "steps.title": "كيف يعمل E-Bajr؟",
      "steps.intro": "من تسجيل الطلب إلى استلامه، بخطوات واضحة.",
      "steps.firstNumber": "١",
      "steps.firstTitle": "سجّل الطلب",
      "steps.firstDescription": "أدخل آخر ثلاثة أرقام من الفاتورة لإنشاء الطلب.",
      "steps.secondNumber": "٢",
      "steps.secondTitle": "شارك رمز الطلب",
      "steps.secondDescription": "يمسح العميل رمز QR الخاص بطلبه لمتابعة حالته من الجوال.",
      "steps.thirdNumber": "٣",
      "steps.thirdTitle": "حدّث الحالة وسلّم الطلب",
      "steps.thirdDescription": "غيّر الحالة إلى «جاهز للاستلام»، ثم أكّد التسليم عند الاستلام.",
      "audience.team": "فريق المنشأة",
      "audience.teamLabel": "داخل المنشأة",
      "audience.customerLabel": "على جوال العميل",
      "audience.teamDescription": "يتابع الطلبات النشطة من مكان واحد، ويبحث برقم الطلب لتحديث حالته بسرعة.",
      "audience.customer": "العميل",
      "audience.customerDescription": "يعرف متى يجهز طلبه من المتصفح على جواله، بدون تسجيل دخول.",
      "faq.posQuestion": "هل أحتاج إلى ربط النظام بالكاشير؟",
      "faq.posAnswer": "لا، يكفي أن يدخل فريق المنشأة آخر ثلاثة أرقام من الفاتورة عند إنشاء الطلب.",
      "faq.appQuestion": "هل يحتاج العميل إلى تثبيت تطبيق؟",
      "faq.appAnswer": "يمسح العميل رمز QR بالكاميرا، وتفتح صفحة الطلب في المتصفح.",
      "faq.handoffQuestion": "ماذا يحدث بعد تأكيد التسليم؟",
      "faq.handoffAnswer": "تتغير حالة الطلب إلى «تم التسليم»، ويخرج من قائمة الطلبات النشطة.",
      "footer.tagline": "بيجر عميلك في جواله، من الطلب إلى الاستلام.",
      "footer.explore": "استكشف",
      "footer.account": "الحساب",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.links": "روابط التذييل",
      "footer.demo": "نموذج تجريبي",
      "footer.backToTop": "العودة للأعلى",
      "login.pageTitle": "E-Bajr | إنشاء حساب",
      "login.heading": "أنشئ حسابك",
      "login.description": "نموذج تجريبي. البيانات لا تُرسل إلى خادم.",
      "login.name": "الاسم",
      "login.email": "البريد الإلكتروني",
      "login.password": "كلمة المرور",
      "login.submit": "إنشاء الحساب",
      "login.back": "العودة للرئيسية",
      "login.preview": "تجربة متابعة الطلب",
      "login.success": "تم قبول النموذج تجريبياً، من غير إرسال إلى خادم.",
      "login.errorName": "اكتب الاسم.",
      "login.errorEmail": "اكتب بريداً إلكترونياً صالحاً.",
      "login.errorPassword": "اكتب كلمة المرور.",
      "order.pageTitle": "E-Bajr | متابعة الطلب",
      "order.heading": "متابعة الطلب",
      "order.number": "رقم الطلب",
      "order.status": "قيد التجهيز",
      "order.description": "فريقنا يجهّز طلبك الآن. يمكنك متابعة حالته من هذه الصفحة.",
      "order.back": "العودة للرئيسية",
    },
    en: {
      "nav.compare": "Why go smart?",
      "compare.eyebrow": "A simpler experience, from the first order",
      "compare.title": "The pager idea. Without the hardware.",
      "compare.intro": "Compare the everyday details that matter to your team and customers.",
      "compare.topic": "Experience",
      "compare.traditional": "Traditional pager",
      "compare.smart": "E-Bajr smart pager",
      "compare.note": "Tracking requires an internet connection on the customer's phone. Alerts depend on browser settings and permissions.",
      "compare.carry.topic": "Customer comfort",
      "compare.carry.old": "Customers carry an extra device while waiting.",
      "compare.carry.new": "Customers follow their order on their own phone.",
      "compare.loss.topic": "Loss and returns",
      "compare.loss.old": "A pager can be lost or taken away and needs to be returned.",
      "compare.loss.new": "No device to hand out, recover or replace.",
      "compare.power.topic": "Charging",
      "compare.power.old": "Pagers need regular charging and may run out while customers wait.",
      "compare.power.new": "No extra pager batteries to charge; tracking runs on the customer's phone.",
      "compare.care.topic": "Wear and replacement",
      "compare.care.old": "Pagers can be dropped or broken and eventually need replacing.",
      "compare.care.new": "A digital service with no pager hardware to drop or replace.",
      "compare.sharing.topic": "Shared use",
      "compare.sharing.old": "Devices pass between customers and need cleaning between uses.",
      "compare.sharing.new": "Customers use their own phones, reducing shared-device handling.",
      "sidebar.workspace": "Workspace",
      "sidebar.establishment": "Your establishment",
      "sidebar.dashboard": "Dashboard",
      "sidebar.orders": "Orders",
      "sidebar.newOrder": "New order",
      "sidebar.members": "Members",
      "sidebar.logout": "Log out",
      "sidebar.role.owner": "Owner",
      "sidebar.display": "Order display",
      "sidebar.notifications": "Notification log",
      "sidebar.role.admin": "Admin",
      "sidebar.role.staff": "Staff",
      "page.title": "E-Bajr | Your customer's phone is their pager",
      "page.description": "Replace the traditional pager with order tracking on your customer's phone.",
      "nav.home": "E-Bajr home",
      "nav.main": "Main navigation",
      "nav.howItWorks": "How it works",
      "nav.audience": "Teams & customers",
      "nav.faq": "FAQs",
      "nav.createAccount": "Create an account",
      "nav.signIn": "Log in",
      "nav.signInFull": "Log in",
      "hero.category": "A better wait for your customers",
      "hero.title": "Their phone.",
      "hero.accent": "Their smart pager.",
      "hero.arrow": "→",
      "hero.description": "Replace the traditional pager with a smart pager that lets customers follow their order on their phones and know when to pick it up.",
      "hero.note": "No app to install. No pager to return.",
      "preview.scan": "Scan to track your order",
      "preview.readyMessage": "Your order is ready to collect",
      "preview.readyDescription": "An order-ready alert on the customer's phone.",
      "preview.open": "Try the customer view",
      "preview.title": "Customer view preview",
      "preview.orderNumber": "Order number",
      "preview.qrAlt": "Demo QR code for order 007",
      "preview.demoQr": "Demo QR code",
      "preview.stages": "Order stages",
      "preview.new": "New",
      "preview.preparing": "Preparing",
      "preview.ready": "Ready for pickup",
      "steps.title": "How E-Bajr works",
      "steps.intro": "From placing an order to picking it up, in clear steps.",
      "steps.firstNumber": "1",
      "steps.firstTitle": "Create an order",
      "steps.firstDescription": "Enter the last three digits of the receipt number to create an order.",
      "steps.secondNumber": "2",
      "steps.secondTitle": "Share the order QR code",
      "steps.secondDescription": "Customers scan their order’s QR code to check its status on their phones.",
      "steps.thirdNumber": "3",
      "steps.thirdTitle": "Update the status and hand off the order",
      "steps.thirdDescription": "Mark the order as ready for pickup, then confirm the handoff when the customer collects it.",
      "audience.team": "Your team",
      "audience.teamLabel": "At your establishment",
      "audience.customerLabel": "On their phone",
      "audience.teamDescription": "See active orders in one place and find an order by number to update its status.",
      "audience.customer": "Your customers",
      "audience.customerDescription": "Customers can check when their order is ready in their mobile browser without signing in.",
      "faq.posQuestion": "Does E-Bajr need to connect to our point of sale?",
      "faq.posAnswer": "No. Your team enters the last three digits of the receipt number when creating an order.",
      "faq.appQuestion": "Do customers need to install an app?",
      "faq.appAnswer": "Customers scan the QR code with their phone camera to open the order page in their browser.",
      "faq.handoffQuestion": "What happens after we confirm the handoff?",
      "faq.handoffAnswer": "The order is marked as picked up and is removed from the active orders list.",
      "footer.tagline": "Your customer's pager, on their phone.",
      "footer.explore": "Explore",
      "footer.account": "Account",
      "footer.rights": "All rights reserved.",
      "footer.links": "Footer links",
      "footer.demo": "Prototype",
      "footer.backToTop": "Back to top",
      "login.pageTitle": "E-Bajr | Create an account",
      "login.heading": "Create your account",
      "login.description": "This is a demo form. Nothing is sent to a server.",
      "login.name": "Name",
      "login.email": "Email",
      "login.password": "Password",
      "login.submit": "Create account",
      "login.back": "Back to home",
      "login.preview": "Try order tracking",
      "login.success": "Demo form accepted. Nothing was sent to a server.",
      "login.errorName": "Enter your name.",
      "login.errorEmail": "Enter a valid email.",
      "login.errorPassword": "Enter a password.",
      "order.pageTitle": "E-Bajr | Order status",
      "order.heading": "Order status",
      "order.number": "Order number",
      "order.status": "Preparing",
      "order.description": "The team is preparing your order. You can follow it from this page.",
      "order.back": "Back to home",
    },
  };

  const pageUrl = new URL(window.location.href);
  const language = pageUrl.searchParams.get("lang") === "en" ? "en" : "ar";
  const translation = messages[language];

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  function applyTranslations() {
    for (const element of document.querySelectorAll("[data-i18n]")) {
      const text = translation[element.dataset.i18n];
      if (typeof text === "string") element.textContent = text;
    }

    for (const attribute of ["alt", "aria-label", "content"]) {
      const keyAttribute = `data-i18n-${attribute}`;
      for (const element of document.querySelectorAll(`[${keyAttribute}]`)) {
        const text = translation[element.getAttribute(keyAttribute)];
        if (typeof text === "string") element.setAttribute(attribute, text);
      }
    }

    const nextLanguage = language === "ar" ? "en" : "ar";
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("lang", nextLanguage);

    for (const link of document.querySelectorAll("[data-language-toggle]")) {
      link.href = nextUrl.href;
      link.lang = nextLanguage;
      link.hreflang = nextLanguage;
      link.textContent = nextLanguage === "en" ? "English" : "العربية";
    }

    for (const link of document.querySelectorAll("[data-keep-language]")) {
      const url = new URL(link.href);
      url.searchParams.set("lang", language);
      link.href = url.href;
    }
  }

  window.ebajrI18n = {
    language,
    text: (key) => translation[key] || key,
    apply: applyTranslations,
  };

  window.addEventListener("hashchange", () => {
    for (const link of document.querySelectorAll("[data-language-toggle]")) {
      link.hash = window.location.hash;
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }
})();
