/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - STATE.JS
   App state management - role, cart, wallet, navigation
   Roles: farmer | supplier | expert | cooperative | institution
   ═══════════════════════════════════════════════════════════ */

const AC_STATE = {

  /* ── CURRENT USER ── */
  user: {
    id:          '',
    role:        'farmer',   // farmer | supplier | expert | cooperative | institution
    name:        '',
    initials:    '',
    phone:       '',
    email:       '',
    avatarUrl:   null,
    lga:         '',
    state:       '',
    isLoggedIn:  false,
    accountStatus: 'pending',  // pending | verified | rejected | suspended
    coopName:    '',
    coopId:      '',
    institution: ''
  },

  /* ── CURRENT ROLE (convenience alias) ── */
  get currentRole() { return this.user.role; },

  /* ── CART ── */
  cart: [],

  /* ── WISHLIST ── */
  wishlist: [],

  /* ── CURRENT SCREEN ── */
  currentScreen:  'splash',
  previousScreen: null,

  /* ── MARKETPLACE FILTERS ── */
  searchQuery:    '',
  activeInputType: 'all',       // all | seeds | fertilizers | crop-protect | equipment | post-harvest
  activeSubCat:   'All',        // subcategory within the active input type
  activeRegion:   'All Regions',

  /* ── SELECTED ITEMS ── */
  selectedProduct: null,
  selectedOrder:   null,
  selectedExpert:  null,
  selectedCourse:  null,

  /* ── CHECKOUT DATA ── */
  checkout: {
    deliveryName:    '',
    deliveryPhone:   '',
    deliveryEmail:   '',
    deliveryAddress: '',
    deliveryState:   '',
    deliveryCity:    '',
    deliveryMethod:  'standard',
    paymentMethod:   'agric-credit',
    promoCode:       ''
  },

  /* ── NOTIFICATIONS ── */
  unreadNotifs: 0,

  /* ── SIDEBAR ── */
  sidebarOpen: false,

  /* ── MISC ── */
  activeTab: 'all',
  language:  'en',

  /* ══════════════════════════════════════════
     CART METHODS
  ══════════════════════════════════════════ */

  addToCart(productId, qty = 1) {
    // Search all products (seeds + all input types)
    const product = AC_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({
        id:           product.id,
        name:         product.name,
        emoji:        product.emoji,
        price:        product.price,
        unit:         product.unit,
        inputType:    product.inputType,
        subCategory:  product.subCategory,
        supplier:     product.supplier,
        verification: product.verification,
        qty:          qty
      });
    }
    this.saveCart();
    showToast(`${product.name} added to cart 🌱`, 'success');
    this.updateCartBadge();
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.saveCart();
    this.updateCartBadge();
  },

  updateQty(productId, qty) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveCart();
    }
  },

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartBadge();
  },

  getCartTotal() {
    return this.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  getCartCount() {
    return this.cart.reduce((sum, i) => sum + i.qty, 0);
  },

  saveCart() {
    try {
      localStorage.setItem('ac_cart', JSON.stringify(this.cart));
    } catch(e) {
      if (e.name === 'QuotaExceededError') {
        showToast('Storage full — cart could not be saved', 'error');
      }
    }
  },

  loadCart() {
    try {
      const saved = localStorage.getItem('ac_cart');
      if (saved) this.cart = JSON.parse(saved);
    } catch(e) {
      this.cart = [];
    }
  },

  updateCartBadge() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
    // Also update bottom nav dot
    const dot = document.getElementById('cart-dot');
    if (dot) dot.style.display = count > 0 ? 'block' : 'none';
  },

  /* ══════════════════════════════════════════
     WISHLIST METHODS
  ══════════════════════════════════════════ */

  toggleWishlist(productId) {
    const product = AC_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const idx = this.wishlist.findIndex(i => i.id === productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      showToast('Removed from wishlist');
    } else {
      this.wishlist.push({
        id:        product.id,
        name:      product.name,
        emoji:     product.emoji,
        price:     product.price,
        unit:      product.unit,
        inputType: product.inputType,
        supplier:  product.supplier
      });
      showToast('Added to wishlist ❤️', 'success');
    }
    this.saveWishlist();
  },

  isWishlisted(productId) {
    return this.wishlist.some(i => i.id === productId);
  },

  saveWishlist() {
    try {
      localStorage.setItem('ac_wishlist', JSON.stringify(this.wishlist));
    } catch(e) {
      if (e.name === 'QuotaExceededError') {
        showToast('Storage full — wishlist could not be saved', 'error');
      }
    }
  },

  loadWishlist() {
    try {
      const saved = localStorage.getItem('ac_wishlist');
      if (saved) this.wishlist = JSON.parse(saved);
    } catch(e) {
      this.wishlist = [];
    }
  },

  /* ══════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════ */

  navigate(screen, data = {}) {
    // Invalidate screen-level caches when leaving those screens
    if (this.currentScreen === 'order-history' && screen !== 'order-history') {
      this._ordersCache = null;
    }
    if (this.currentScreen === 'wallet' && screen !== 'wallet') {
      this._walletCache = null;
    }
    if (this.currentScreen === 'input-market' && screen !== 'input-market') {
      this._productsCache = null;
    }

    this.previousScreen = this.currentScreen;
    this.currentScreen  = screen;

    if (data.product) this.selectedProduct = data.product;
    if (data.order)   this.selectedOrder   = data.order;
    if (data.expert)  this.selectedExpert  = data.expert;
    if (data.course)  this.selectedCourse  = data.course;
    if (data.tab)     this.activeTab       = data.tab;

    AC_ROUTER.show(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.closeSidebar();
  },

  goBack() {
    if (this.previousScreen) {
      this.navigate(this.previousScreen);
    } else {
      this.navigate('home');
    }
  },

  /* ══════════════════════════════════════════
     SIDEBAR
  ══════════════════════════════════════════ */

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    document.getElementById('sidebar')?.classList.toggle('open', this.sidebarOpen);
    document.getElementById('sidebar-overlay')?.classList.toggle('active', this.sidebarOpen);
  },

  closeSidebar() {
    this.sidebarOpen = false;
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
  },

  /* ══════════════════════════════════════════
     ROLE MANAGEMENT
  ══════════════════════════════════════════ */

  setRole(role) {
    this.user.role    = role;
    this.user.isLoggedIn = true;
    this.currentRole;           // trigger getter (no-op but consistent)
    this.updateSidebarForRole();
  },

  updateSidebarForRole() {
    const role = this.user.role;

    // Show/hide role-specific nav sections (data-role="farmer,supplier" syntax)
    document.querySelectorAll('[data-role]').forEach(el => {
      const roles = el.dataset.role.split(',').map(r => r.trim());
      el.style.display = roles.includes(role) ? '' : 'none';
    });

    // Show/hide the Financing nav item - only for coop & institution
    document.querySelectorAll('[data-nav="financing"]').forEach(el => {
      el.style.display = ['cooperative', 'institution'].includes(role) ? '' : 'none';
    });

    // Update role label in header if present
    const roleLabel = document.getElementById('user-role-label');
    if (roleLabel) {
      const labels = {
        farmer:      'Farmer',
        supplier:    'Agro-Supplier',
        expert:      'Expert',
        cooperative: 'Cooperative',
        institution: 'Institution'
      };
      roleLabel.textContent = labels[role] || 'Farmer';
    }
  },

  /* ══════════════════════════════════════════
     INPUT MARKET FILTER METHODS
  ══════════════════════════════════════════ */

  getFilteredProducts() {
    let products = AC_DATA.products || [];

    // Filter by input type
    if (this.activeInputType && this.activeInputType !== 'all') {
      products = products.filter(p => p.inputType === this.activeInputType);
    }

    // Filter by subcategory
    if (this.activeSubCat && this.activeSubCat !== 'All' &&
        !this.activeSubCat.startsWith('All ')) {
      products = products.filter(p => p.subCategory === this.activeSubCat);
    }

    // Filter by region
    if (this.activeRegion && this.activeRegion !== 'All Regions') {
      products = products.filter(p =>
        p.region === this.activeRegion || p.region === 'All Regions'
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return products;
  },

  // Legacy alias - screens that still call getFilteredSeeds() keep working
  getFilteredSeeds() {
    const saved = this.activeInputType;
    // Temporarily scope to seeds only if caller expects seeds
    return AC_DATA.products.filter(p => p.inputType === 'seeds');
  },

  /* ══════════════════════════════════════════
     UTILITY / STATUS HELPERS
  ══════════════════════════════════════════ */

  getStatusBadge(status) {
    const map = {
      'active':       'badge-active',
      'pending':      'badge-pending',
      'processing':   'badge-pending',
      'shipped':      'badge-shipped',
      'in-transit':   'badge-shipped',
      'delivered':    'badge-delivered',
      'cancelled':    'badge-cancelled',
      'draft':        'badge-draft',
      'out-of-stock': 'badge-out-stock',
      'approved':     'badge-active',
      'disbursed':    'badge-active',
      'reviewing':    'badge-pending',
      'completed':    'badge-delivered',
      'flagged':      'badge-cancelled',
    };
    return map[status] || 'badge-gray';
  },

  getStatusLabel(status) {
    const map = {
      'active':       'Active',
      'pending':      'Pending',
      'processing':   'Processing',
      'shipped':      'Shipped',
      'in-transit':   'In Transit',
      'delivered':    'Delivered',
      'cancelled':    'Cancelled',
      'draft':        'Draft',
      'out-of-stock': 'Out of Stock',
      'approved':     'Approved',
      'disbursed':    'Disbursed',
      'reviewing':    'Under Review',
      'completed':    'Completed',
      'flagged':      'Flagged',
    };
    return map[status] || status;
  },

  getVerificationBadge(product) {
    if (!product) return '';
    if (product.verification === 'nasc') {
      return `<span style="background:#EFF6FF;color:#2563EB;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #BFDBFE;">✓ NASC</span>`;
    }
    if (product.verification === 'nafdac') {
      return `<span style="background:#EDE9FE;color:#7C3AED;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #DDD6FE;">✓ NAFDAC</span>`;
    }
    if (product.verification === 'supplier') {
      return `<span style="background:#DCFCE7;color:#16A34A;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #BBF7D0;">✓ Verified</span>`;
    }
    return '';
  },

  /* ══════════════════════════════════════════
     TOKEN MANAGEMENT
     Thin wrappers — will delegate to AC_API once backend exists.
  ══════════════════════════════════════════ */

  getToken() {
    try { return localStorage.getItem('ac_token'); } catch(e) { return null; }
  },

  setToken(token) {
    try { localStorage.setItem('ac_token', token); } catch(e) {}
  },

  clearToken() {
    try {
      localStorage.removeItem('ac_token');
      localStorage.removeItem('ac_refresh_token');
    } catch(e) {}
  },

  /* ══════════════════════════════════════════
     LOGOUT
  ══════════════════════════════════════════ */

  logout() {
    this.stopNotifStream();
    this.clearToken();
    localStorage.removeItem('ac_cart');
    localStorage.removeItem('ac_wishlist');

    this.user = {
      id: '', role: 'farmer', name: '', initials: '', phone: '',
      email: '', avatarUrl: null, lga: '', state: '', isLoggedIn: false,
      accountStatus: 'pending', coopName: '', coopId: '', institution: ''
    };
    this.cart     = [];
    this.wishlist = [];
    this.unreadNotifs = 0;
    this.checkout = {
      deliveryName: '', deliveryPhone: '', deliveryEmail: '',
      deliveryAddress: '', deliveryState: '', deliveryCity: '',
      deliveryMethod: 'standard', paymentMethod: 'agric-credit', promoCode: ''
    };

    document.getElementById('app-wrapper').style.display  = 'none';
    document.getElementById('auth-wrapper').style.display = 'block';
    showAuthScreen('roleSelection');
  },

  /* ══════════════════════════════════════════
     REAL-TIME NOTIFICATIONS (SSE)
  ══════════════════════════════════════════ */

  _sseSource: null,
  _sseRetryTimeout: null,
  _sseRetryDelay: 2000,

  initNotifStream() {
    if (!window.AC_CONFIG?.API_BASE_URL) return; // dev mode — no SSE
    const token = this.getToken();
    if (!token) return;
    if (this._sseSource && this._sseSource.readyState !== EventSource.CLOSED) return;

    const url = `${window.AC_CONFIG.API_BASE_URL}/api/v1/notifications/stream?token=${encodeURIComponent(token)}`;
    const es  = new EventSource(url);
    this._sseSource = es;

    es.addEventListener('connected', () => {
      this._sseRetryDelay = 2000; // reset backoff on successful connection
    });

    es.addEventListener('notification', (e) => {
      try {
        const data = JSON.parse(e.data);
        this.unreadNotifs = (this.unreadNotifs || 0) + 1;
        this._updateNotifBadge();
        if (typeof showToast === 'function') {
          showToast(data.title || 'New notification', 'success');
        }
        // Invalidate notifications cache so next visit re-fetches
        this._notificationsCache = undefined;
      } catch { /* ignore parse errors */ }
    });

    es.onerror = () => {
      es.close();
      this._sseSource = null;
      // Exponential backoff, cap at 60s
      this._sseRetryDelay = Math.min(this._sseRetryDelay * 2, 60_000);
      this._sseRetryTimeout = setTimeout(() => {
        if (this.user.isLoggedIn) this.initNotifStream();
      }, this._sseRetryDelay);
    };
  },

  stopNotifStream() {
    if (this._sseRetryTimeout) { clearTimeout(this._sseRetryTimeout); this._sseRetryTimeout = null; }
    if (this._sseSource) { this._sseSource.close(); this._sseSource = null; }
  },

  _updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    const count = this.unreadNotifs || 0;
    badge.textContent  = count > 9 ? '9+' : String(count);
    badge.style.display = count > 0 ? 'flex' : 'none';
  },

  /* ── INIT ── */
  init() {
    this.loadCart();
    this.loadWishlist();

    /* If URL has ?token=..., intercept and show password reset screen */
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');
    if (resetToken) {
      window._passwordResetToken = resetToken;
      /* Remove token from URL without reload */
      window.history.replaceState({}, '', window.location.pathname);
      /* Show password reset screen after DOM is ready */
      setTimeout(() => showAuthScreen('passwordReset'), 100);
      return;
    }

    const token = this.getToken();
    if (token) {
      this.user.isLoggedIn = true;
      /* Hydrate user object from /users/me so id, avatarUrl etc. are populated */
      if (window.AC_CONFIG?.API_BASE_URL) {
        AC_API.users.me().then(res => {
          const u = res.data ?? res;
          this.user.id        = u.id        ?? '';
          this.user.name      = u.name      || this.user.name;
          this.user.initials  = (u.name || this.user.name).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
          this.user.email     = u.email     || this.user.email;
          this.user.phone     = u.phone     || this.user.phone;
          this.user.avatarUrl = u.avatarUrl ?? null;
          this.user.lga       = u.lga       ?? this.user.lga;
          this.user.state     = u.state     ?? this.user.state;
          this.user.coopName    = u.coopName    ?? this.user.coopName;
          this.user.coopId      = u.coopId      ?? this.user.coopId;
          this.user.institution = u.institution ?? this.user.institution;
          this.user.accountStatus = u.accountStatus ?? this.user.accountStatus;
          /* Update header initials if already shown */
          const av = document.getElementById('user-avatar');
          const nm = document.getElementById('user-name');
          if (av) av.textContent = this.user.initials;
          if (nm) nm.textContent = this.user.name.split(' ')[0];
        }).catch(() => { /* token may be expired — 401 refresh will handle it */ });
      }
    }
  }

};

/* ═══════════════════════════════════════════════════════════
   GLOBAL ERROR BOUNDARY
   Catches uncaught JS errors and unhandled promise rejections.
   Forwards to Sentry when configured; shows toast in dev.
   ═══════════════════════════════════════════════════════════ */

window.onerror = function(message, source, line, col, error) {
  const msg = String(message).slice(0, 200);
  if (window.Sentry) {
    window.Sentry.captureException(error || new Error(msg));
  } else {
    console.error('[uncaught]', msg, source, line, col);
  }
  if (window.AC_CONFIG?.ENV !== 'production') {
    showToast('Unexpected error — check console', 'error');
  }
  return false; // let default browser handler run too
};

window.onunhandledrejection = function(event) {
  const reason = event.reason;
  if (window.Sentry) {
    window.Sentry.captureException(reason instanceof Error ? reason : new Error(String(reason)));
  } else {
    console.error('[unhandled rejection]', reason);
  }
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

function showToast(message, type = '') {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function formatNaira(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '-' : '') + '☆'.repeat(empty);
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function truncate(str, len = 60) {
  return str && str.length > len ? str.slice(0, len) + '-' : (str || '');
}

export { AC_STATE as default, AC_STATE, showToast, formatNaira, renderStars, debounce, truncate };