/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - ROUTER.JS
   Screen switching, rendering, navigation
   Roles: farmer | supplier | expert | cooperative | institution
   ═══════════════════════════════════════════════════════════ */

const AC_ROUTER = {

  /* All screen IDs mapped to their render function */
  screens: {

    // ── AUTH ──────────────────────────────────────────────
    'splash':              () => AC_SCREENS.splash(),
    'role-selection':      () => AC_SCREENS.roleSelection(),
    'signup-farmer':       () => AC_SCREENS.signupFarmer(),
    'signup-supplier':     () => AC_SCREENS.signupSupplier(),
    'signup-expert':       () => AC_SCREENS.signupExpert(),
    'signup-coop':         () => AC_SCREENS.signupCoop(),
    'signup-institution':  () => AC_SCREENS.signupInstitution(),
    'login':               () => AC_SCREENS.login(),
    'otp':                 () => AC_SCREENS.otp(),
    'under-review':        () => AC_SCREENS.underReview(),
    'rejected':            () => AC_SCREENS.rejected(),

    // ── FARMER ────────────────────────────────────────────
    'home':                () => AC_ROUTER.getRoleHome(),
    'input-market':        () => AC_SCREENS.inputMarket(),
    'input-detail':        () => AC_SCREENS.inputDetail(),
    'cart':                () => AC_SCREENS.cart(),
    'checkout':            () => AC_SCREENS.checkout(),
    'payment':             () => AC_SCREENS.payment(),
    'order-confirm':       () => AC_SCREENS.orderConfirm(),
    'order-history':       () => AC_SCREENS.orderHistory(),
    'order-detail':        () => AC_SCREENS.orderDetail(),
    'order-messages':      () => AC_SCREENS.orderMessages(),
    'wishlist':            () => AC_SCREENS.wishlist(),
    'list-produce':        () => AC_SCREENS.listProduce(),

    // ── AGRO-SUPPLIER ─────────────────────────────────────
    'supplier-dashboard':  () => AC_SCREENS.supplierDashboard(),
    'my-listings':         () => AC_SCREENS.myListings(),
    'upload-product':      () => AC_SCREENS.uploadProduct(),
    'orders-received':     () => AC_SCREENS.ordersReceived(),
    'supplier-analytics':  () => AC_SCREENS.supplierAnalytics(),
    'supplier-reviews':    () => AC_SCREENS.supplierProductReviews(),

    // ── EXPERT ────────────────────────────────────────────
    'expert-dashboard':    () => AC_SCREENS.expertDashboard(),
    'create-course':       () => AC_SCREENS.createCourse(),
    'course-analytics':    () => AC_SCREENS.courseAnalytics(),
    'expert-schedule':     () => AC_SCREENS.expertSchedule(),

    // ── COOPERATIVE ───────────────────────────────────────
    'coop-dashboard':      () => AC_SCREENS.coopDashboard(),
    'coop-members':        () => AC_SCREENS.coopMembers(),
    'coop-loan':           () => AC_SCREENS.coopLoan(),
    'coop-wallet':         () => AC_SCREENS.coopWallet(),

    // ── INSTITUTION ───────────────────────────────────────
    'inst-dashboard':      () => AC_SCREENS.instDashboard(),
    'inst-compliance':     () => AC_SCREENS.instCompliance(),
    'inst-loan-queue':     () => AC_SCREENS.instLoanQueue(),
    'inst-geo-map':        () => AC_SCREENS.instGeoMap(),

    // ── SHARED ────────────────────────────────────────────
    'wallet':              () => AC_SCREENS.wallet(),
    'financing':           () => AC_SCREENS.financing(),
    'logistics':           () => AC_SCREENS.logistics(),
    'learning':            () => AC_SCREENS.learning(),
    'course-detail':       () => AC_SCREENS.courseDetail(),
    'course-player':       () => AC_SCREENS.coursePlayer(),
    'my-courses':          () => AC_SCREENS.myCourses(),
    'experts':             () => AC_SCREENS.experts(),
    'expert-profile':      () => AC_SCREENS.expertProfile(),
    'book-consultation':   () => AC_SCREENS.consultationBooking(),
    'my-consultations':    () => AC_SCREENS.myConsultations(),
    'notifications':       () => AC_SCREENS.notifications(),
    'profile':             () => AC_SCREENS.profile(),
    'profile-edit':        () => AC_SCREENS.profileEdit(),
    'settings':            () => AC_SCREENS.settings(),
    'whatsapp':            () => AC_SCREENS.whatsapp(),

    // ── ADMIN ─────────────────────────────────────────────
    'admin-dashboard': () => AC_SCREENS.adminDashboard(),
    'admin-users':     () => AC_SCREENS.adminUsers(),
    'admin-loans':     () => AC_SCREENS.adminLoans(),
    'admin-broadcast': () => AC_SCREENS.adminBroadcast(),

    // ── BACKWARD COMPATIBILITY ALIASES ────────────────────
    'seed-market':         () => AC_SCREENS.inputMarket(),
    'seed-detail':         () => AC_SCREENS.inputDetail(),
    'seller-dashboard':    () => AC_SCREENS.supplierDashboard(),
    'seller-analytics':    () => AC_SCREENS.supplierAnalytics(),
    'signup-buyer':        () => AC_SCREENS.signupFarmer(),
    'signup-seller':       () => AC_SCREENS.signupSupplier(),
  },

  /* ── SHOW A SCREEN ───────────────────────────────────── */
  getRoleHome() {
    const roleHome = {
      farmer:      'home',
      supplier:    'supplierDashboard',
      expert:      'expertDashboard',
      cooperative: 'coopDashboard',
      institution: 'instDashboard',
    };
    const screenName = roleHome[AC_STATE.currentRole] || 'home';
    const renderFn = AC_SCREENS[screenName];
    return typeof renderFn === 'function' ? renderFn.call(AC_SCREENS) : this.missingScreen('home');
  },

  missingScreen(screenId) {
    const safe = String(screenId).replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]));
    return `
      <div class="result-screen">
        <div class="result-icon warning">!</div>
        <h2 class="result-title">Screen unavailable</h2>
        <p class="result-desc">The &ldquo;${safe}&rdquo; screen has not been connected yet.</p>
        <button class="btn btn-primary" onclick="AC_STATE.navigate('home')">Go Home</button>
      </div>
    `;
  },

  /* Screens that do not require authentication */
  publicScreens: new Set([
    'splash', 'role-selection', 'roleSelection',
    'login', 'otp', 'under-review', 'rejected',
    'signup-farmer', 'signup-supplier', 'signup-expert',
    'signup-coop', 'signup-institution',
    'signup-buyer', 'signup-seller',
  ]),

  /* Screens restricted to specific roles (absence = all authenticated roles allowed) */
  roleScreens: {
    'supplier-dashboard': ['supplier'],
    'my-listings':        ['supplier'],
    'upload-product':     ['supplier'],
    'orders-received':    ['supplier'],
    'supplier-analytics': ['supplier'],
    'supplier-reviews':   ['supplier'],
    'seller-dashboard':   ['supplier'],
    'seller-analytics':   ['supplier'],
    'expert-dashboard':   ['expert'],
    'create-course':      ['expert'],
    'course-analytics':   ['expert'],
    'expert-schedule':    ['expert'],
    'coop-dashboard':     ['cooperative'],
    'coop-members':       ['cooperative'],
    'coop-loan':          ['cooperative'],
    'coop-wallet':        ['cooperative'],
    'inst-dashboard':     ['institution'],
    'inst-compliance':    ['institution'],
    'inst-loan-queue':    ['institution'],
    'inst-geo-map':       ['institution'],
    'financing':          ['cooperative', 'institution'],
    'admin-dashboard':    ['admin'],
    'admin-users':        ['admin'],
    'admin-loans':        ['admin'],
    'admin-broadcast':    ['admin'],
    'list-produce':       ['farmer'],
    'order-history':      ['farmer'],
    'order-detail':       ['farmer'],
    'wishlist':           ['farmer'],
  },

  show(screenId) {
    const isPublic = this.publicScreens.has(screenId);

    // Auth guard — redirect to login if not authenticated
    if (!isPublic && !AC_STATE.user.isLoggedIn) {
      console.warn(`[Router] Unauthenticated access to "${screenId}" — redirecting to login`);
      showAuthScreen('login');
      return;
    }

    // Role guard — redirect to home if wrong role
    const allowedRoles = this.roleScreens[screenId];
    if (allowedRoles && !allowedRoles.includes(AC_STATE.user.role)) {
      console.warn(`[Router] Role "${AC_STATE.user.role}" cannot access "${screenId}"`);
      showToast('You do not have access to that page', 'error');
      AC_STATE.currentScreen = 'home';
      screenId = 'home';
    }

    const renderFn = this.screens[screenId];
    if (!renderFn) {
      console.warn(`[Router] Screen "${screenId}" not found`);
      const app = document.getElementById('app-content');
      if (app) app.innerHTML = this.missingScreen(screenId);
      return;
    }

    const app = document.getElementById('app-content');
    if (!app) return;

    try {
      const html = renderFn();
      app.innerHTML = typeof DOMPurify !== 'undefined'
        ? DOMPurify.sanitize(html, { FORCE_BODY: true })
        : html;
    } catch (error) {
      console.error(`[Router] Failed to render "${screenId}"`, error);
      app.innerHTML = this.missingScreen(screenId);
    }

    app.classList.remove('animate-fadeIn');
    void app.offsetWidth;
    app.classList.add('animate-fadeIn');

    this.updateNav(screenId);
    this.postRender(screenId);
    this._announceScreen(screenId);
  },

  /* ── SCREEN READER ANNOUNCEMENT ─────────────────────── */
  _announceScreen(screenId) {
    const labels = {
      'home': 'Home', 'input-market': 'Input Market', 'learning': 'Learning',
      'experts': 'Experts', 'wallet': 'Wallet', 'notifications': 'Notifications',
      'profile': 'Profile', 'profile-edit': 'Edit Profile', 'cart': 'Cart',
      'checkout': 'Checkout', 'order-history': 'My Orders', 'order-detail': 'Order Detail',
      'supplier-dashboard': 'Supplier Dashboard', 'my-listings': 'My Listings',
      'upload-product': 'Upload Product', 'orders-received': 'Orders Received',
      'expert-dashboard': 'My Courses', 'create-course': 'Create Course',
      'coop-dashboard': 'Cooperative Dashboard', 'coop-members': 'Members',
      'coop-loan': 'Loan Request', 'inst-dashboard': 'Institution Dashboard',
    };
    const label = labels[screenId] || screenId.replace(/-/g, ' ');
    document.title = `${label} — AgroConnect`;
    const announcer = document.getElementById('sr-announcer');
    if (announcer) { announcer.textContent = ''; setTimeout(() => { announcer.textContent = label; }, 50); }
  },

  /* ── UPDATE NAV ACTIVE STATES ────────────────────────── */
  updateNav(screenId) {
    const canonical = {
      'seed-market':      'input-market',
      'seed-detail':      'input-detail',
      'seller-dashboard': 'supplier-dashboard',
      'seller-analytics': 'supplier-analytics',
      'signup-buyer':     'signup-farmer',
      'signup-seller':    'signup-supplier',
    }[screenId] || screenId;

    document.querySelectorAll('[data-screen]').forEach(el => {
      el.classList.remove('active');
      if (el.dataset.screen === canonical || el.dataset.screen === screenId) {
        el.classList.add('active');
      }
    });
  },

  /* ── POST-RENDER HOOKS ───────────────────────────────── */
  postRender(screenId) {
    if (screenId === 'input-market' || screenId === 'seed-market') {
      if (AC_SCREENS.initInputMarket) AC_SCREENS.initInputMarket();
    }
    if (screenId === 'cart') {
      if (AC_SCREENS.initCart) AC_SCREENS.initCart();
    }
    if (screenId === 'otp') {
      if (AC_SCREENS.initOtpInputs) AC_SCREENS.initOtpInputs();
    }
    if (screenId === 'inst-dashboard') {
      if (AC_SCREENS.initInstCharts) AC_SCREENS.initInstCharts();
    }
    if (screenId === 'inst-geo-map') {
      if (AC_SCREENS.initInstCharts) AC_SCREENS.initInstCharts();
    }
  }
};

export default AC_ROUTER;
