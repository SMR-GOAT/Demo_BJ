(() => {
  const messages = {
    ar: {
      "page.title": "E-Bajr | إدارة الطلبات",
      "page.description": "E-Bajr لإدارة تجهيز الطلبات ومتابعتها حتى التسليم.",
      "nav.home": "E-Bajr، الرئيسية",
      "nav.main": "القائمة الرئيسية",
      "nav.howItWorks": "كيف يعمل؟",
      "nav.audience": "للفريق وللعميل",
      "nav.faq": "الأسئلة الشائعة",
      "nav.createAccount": "أنشئ حسابي",
      "hero.category": "نظام متابعة الطلبات",
      "hero.title": "طلبات أوضح،",
      "hero.accent": "وتسليم أسهل.",
      "hero.arrow": "←",
      "hero.description": "نظّم تجهيز طلبات منشأتك وتسليمها، وأتح لعملائك متابعة حالة طلباتهم من الجوال عبر رمز QR.",
      "preview.title": "معاينة صفحة العميل",
      "preview.orderNumber": "رقم الطلب",
      "preview.qrAlt": "رمز QR تجريبي للطلب 007",
      "preview.demoQr": "رمز تجريبي",
      "preview.stages": "مراحل الطلب",
      "preview.new": "جديد",
      "preview.preparing": "قيد التجهيز",
      "preview.ready": "جاهز للاستلام",
      "steps.title": "كيف يعمل E-Bajr؟",
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
      "audience.teamDescription": "يتابع الطلبات النشطة من مكان واحد، ويبحث برقم الطلب لتحديث حالته بسرعة.",
      "audience.customer": "العميل",
      "audience.customerDescription": "يعرف متى يجهز طلبه من المتصفح على جواله، بدون تسجيل دخول.",
      "faq.posQuestion": "هل أحتاج إلى ربط النظام بالكاشير؟",
      "faq.posAnswer": "لا، يكفي أن يدخل فريق المنشأة آخر ثلاثة أرقام من الفاتورة عند إنشاء الطلب.",
      "faq.appQuestion": "هل يحتاج العميل إلى تثبيت تطبيق؟",
      "faq.appAnswer": "يمسح العميل رمز QR بالكاميرا، وتفتح صفحة الطلب في المتصفح.",
      "faq.handoffQuestion": "ماذا يحدث بعد تأكيد التسليم؟",
      "faq.handoffAnswer": "تتغير حالة الطلب إلى «تم التسليم»، ويخرج من قائمة الطلبات النشطة.",
      "footer.tagline": "متابعة الطلبات من التجهيز إلى التسليم.",
      "footer.links": "روابط التذييل",
      "footer.demo": "نموذج تجريبي",
      "footer.backToTop": "العودة للأعلى",
    },
    en: {
      "page.title": "E-Bajr | Order Tracking",
      "page.description": "E-Bajr helps your team track orders from preparation to pickup.",
      "nav.home": "E-Bajr home",
      "nav.main": "Main navigation",
      "nav.howItWorks": "How it works",
      "nav.audience": "Teams & customers",
      "nav.faq": "FAQs",
      "nav.createAccount": "Create an account",
      "hero.category": "Order tracking",
      "hero.title": "Clearer orders.",
      "hero.accent": "Easier pickup.",
      "hero.arrow": "→",
      "hero.description": "Manage order prep and pickup. Customers track their order by scanning a QR code.",
      "preview.title": "Customer view preview",
      "preview.orderNumber": "Order number",
      "preview.qrAlt": "Demo QR code for order 007",
      "preview.demoQr": "Demo QR code",
      "preview.stages": "Order stages",
      "preview.new": "New",
      "preview.preparing": "Preparing",
      "preview.ready": "Ready for pickup",
      "steps.title": "How E-Bajr works",
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
      "audience.teamDescription": "See active orders in one place and find an order by number to update its status.",
      "audience.customer": "Your customers",
      "audience.customerDescription": "Customers can check when their order is ready in their mobile browser without signing in.",
      "faq.posQuestion": "Does E-Bajr need to connect to our point of sale?",
      "faq.posAnswer": "No. Your team enters the last three digits of the receipt number when creating an order.",
      "faq.appQuestion": "Do customers need to install an app?",
      "faq.appAnswer": "Customers scan the QR code with their phone camera to open the order page in their browser.",
      "faq.handoffQuestion": "What happens after we confirm the handoff?",
      "faq.handoffAnswer": "The order is marked as picked up and is removed from the active orders list.",
      "footer.tagline": "Track orders from preparation to pickup.",
      "footer.links": "Footer links",
      "footer.demo": "Prototype",
      "footer.backToTop": "Back to top",
    },
  };

  const pageUrl = new URL(window.location.href);
  const language = pageUrl.searchParams.get("lang") === "en" ? "en" : "ar";
  const translation = messages[language];

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.addEventListener("DOMContentLoaded", () => {
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
    pageUrl.searchParams.set("lang", nextLanguage);

    for (const link of document.querySelectorAll("[data-language-toggle]")) {
      link.href = pageUrl.href;
      link.lang = nextLanguage;
      link.hreflang = nextLanguage;
      link.textContent = nextLanguage === "en" ? "English" : "العربية";
      window.addEventListener("hashchange", () => {
        link.hash = window.location.hash;
      });
    }

    for (const link of document.querySelectorAll("[data-keep-language]")) {
      const url = new URL(link.href);
      url.searchParams.set("lang", language);
      link.href = url.href;
    }
  });
})();
