/* ═══════════════════════════════════════════════════════════
   AGROCONNECT — ROUTER.JS
   Screen switching, rendering, navigation
   ═══════════════════════════════════════════════════════════ */

const AC_ROUTER = {

  screens: {
    // Auth
    'splash':              () => AC_SCREENS.splash(),
    'role-selection':      () => AC_SCREENS.roleSelection(),
    'signup-buyer':        () => AC_SCREENS.signupBuyer(),
    'signup-seller':       () => AC_SCREENS.signupSeller(),
    'signup-expert':       () => AC_SCREENS.signupExpert(),
    'signup-coop':         () => AC_SCREENS.signupCoop(),
    'signup-institution':  () => AC_SCREENS.signupInstitution(),
    'login':               () => AC_SCREENS.login(),
    'otp':                 () => AC_SCREENS.otp(),
    'under-review':        () => AC_SCREENS.underReview(),
    'rejected':            () => AC_SCREENS.rejected(),

    // Buyer
    'home':                () => AC_SCREENS.home(),
    'seed-market':         () => AC_SCREENS.seedMarket(),
    'seed-detail':         () => AC_SCREENS.seedDetail(),
    'cart':                () => AC_SCREENS.cart(),
    'checkout':            () => AC_SCREENS.checkout(),
    'payment':             () => AC_SCREENS.payment(),
    'order-confirm':       () => AC_SCREENS.orderConfirm(),
    'order-history':       () => AC_SCREENS.orderHistory(),
    'order-detail':        () => AC_SCREENS.orderDetail(),
    'wishlist':            () => AC_SCREENS.wishlist(),

    // Seller
    'seller-dashboard':    () => AC_SCREENS.sellerDashboard(),
    'my-listings':         () => AC_SCREENS.myListings(),
    'upload-product':      () => AC_SCREENS.uploadProduct(),
    'orders-received':     () => AC_SCREENS.ordersReceived(),
    'seller-analytics':    () => AC_SCREENS.sellerAnalytics(),

    // Expert
    'expert-dashboard':    () => AC_SCREENS.expertDashboard(),
    'my-courses':          () => AC_SCREENS.myCourses(),
    'course-analytics':    () => AC_SCREENS.courseAnalytics(),
    'create-course':       () => AC_SCREENS.createCourse(),

    // Cooperative
    'coop-dashboard':      () => AC_SCREENS.coopDashboard(),
    'coop-members':        () => AC_SCREENS.coopMembers(),
    'coop-loan':           () => AC_SCREENS.coopLoan(),
    'coop-wallet':         () => AC_SCREENS.coopWallet(),

    // Institution
    'inst-dashboard':      () => AC_SCREENS.instDashboard(),
    'inst-compliance':     () => AC_SCREENS.instCompliance(),
    'inst-loan-queue':     () => AC_SCREENS.instLoanQueue(),
    'inst-geo-map':        () => AC_SCREENS.instGeoMap(),

    // Shared
    'wallet':              () => AC_SCREENS.wallet(),
    'financing':           () => AC_SCREENS.financing(),
    'logistics':           () => AC_SCREENS.logistics(),
    'learning':            () => AC_SCREENS.learning(),
    'experts':             () => AC_SCREENS.experts(),
    'expert-profile':      () => AC_SCREENS.expertProfile(),
    'notifications':       () => AC_SCREENS.notifications(),
    'profile':             () => AC_SCREENS.profile(),
    'settings':            () => AC_SCREENS.settings(),
    'whatsapp':            () => AC_SCREENS.whatsapp(),
  },

  show(screenId) {
    const renderFn = this.screens[screenId];
    if (!renderFn) {
      console.warn(`Screen "${screenId}" not found`);
      return;
    }

    const app = document.getElementById('app-content');
    if (!app) return;

    app.innerHTML = renderFn();

    app.classList.remove('animate-fadeIn');
    void app.offsetWidth;
    app.classList.add('animate-fadeIn');

    this.updateNav(screenId);
    this.postRender(screenId);
  },

  updateNav(screenId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.screen === screenId) {
        el.classList.add('active');
      }
    });
  },

  postRender(screenId) {
    if (screenId === 'seed-market')   AC_SCREENS.initSeedMarketFilters();
    if (screenId === 'cart')          AC_SCREENS.initCart();
    if (screenId === 'otp')           AC_SCREENS.initOtpInputs();
    if (screenId === 'inst-dashboard') AC_SCREENS.initInstCharts();
  }
};