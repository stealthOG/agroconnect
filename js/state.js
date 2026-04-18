/* ═══════════════════════════════════════════════════════════
   AGROCONNECT — STATE.JS
   App state management — role, cart, wallet, navigation
   ═══════════════════════════════════════════════════════════ */

const AC_STATE = {

  /* ── CURRENT USER ── */
  user: {
    role: 'buyer',        // buyer | seller | expert | cooperative | institution
    name: 'Tunde Bakare',
    initials: 'TB',
    phone: '+234 803 456 7890',
    email: 'tunde.bakare@email.com',
    lga: 'Kaduna North',
    state: 'Kaduna',
    isLoggedIn: false,
    coopName: 'Kaduna North Farmers Cooperative',
    coopId: 'COOP-KD-00123',
    institution: 'Bank of Agriculture'
  },

  /* ── CART ── */
  cart: [],

  /* ── WISHLIST ── */
  wishlist: [],

  /* ── CURRENT SCREEN ── */
  currentScreen: 'splash',
  previousScreen: null,

  /* ── SEARCH ── */
  searchQuery: '',
  activeCategory: 'All Crops',
  activeRegion: 'All Regions',

  /* ── SELECTED PRODUCT (for detail page) ── */
  selectedProduct: null,

  /* ── SELECTED ORDER ── */
  selectedOrder: null,

  /* ── SELECTED EXPERT ── */
  selectedExpert: null,

  /* ── CHECKOUT DATA ── */
  checkout: {
    deliveryName: '',
    deliveryPhone: '',
    deliveryEmail: '',
    deliveryAddress: '',
    deliveryState: '',
    deliveryCity: '',
    deliveryMethod: 'standard',
    paymentMethod: 'agric-credit',
    promoCode: ''
  },

  /* ── NOTIFICATIONS UNREAD COUNT ── */
  unreadNotifs: 2,

  /* ── SIDEBAR STATE (mobile) ── */
  sidebarOpen: false,

  /* ── ACTIVE TAB (for screens with tabs) ── */
  activeTab: 'all',

  /* ── LANGUAGE ── */
  language: 'en',

  /* ══════════════════════════════════════════
     CART METHODS
  ══════════════════════════════════════════ */

  addToCart(productId, qty = 1) {
    const product = AC_DATA.seeds.find(s => s.id === productId);
    if (!product) return;

    const existing = this.cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        unit: product.unit,
        seller: product.seller,
        nascVerified: product.nascVerified,
        qty: qty
      });
    }
    this.saveCart();
    showToast(`${product.name} added to cart`, 'success');
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
    } catch(e) {}
  },

  loadCart() {
    try {
      const saved = localStorage.getItem('ac_cart');
      if (saved) this.cart = JSON.parse(saved);
    } catch(e) {}
  },

  updateCartBadge() {
    const count = this.getCartCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  /* ══════════════════════════════════════════
     WISHLIST METHODS
  ══════════════════════════════════════════ */

  toggleWishlist(productId) {
    const product = AC_DATA.seeds.find(s => s.id === productId);
    if (!product) return;

    const idx = this.wishlist.findIndex(i => i.id === productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      showToast('Removed from wishlist');
    } else {
      this.wishlist.push({
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        unit: product.unit,
        seller: product.seller
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
    } catch(e) {}
  },

  loadWishlist() {
    try {
      const saved = localStorage.getItem('ac_wishlist');
      if (saved) this.wishlist = JSON.parse(saved);
    } catch(e) {}
  },

  /* ══════════════════════════════════════════
     NAVIGATION METHODS
  ══════════════════════════════════════════ */

  navigate(screen, data = {}) {
    this.previousScreen = this.currentScreen;
    this.currentScreen = screen;

    // Store any data passed with navigation
    if (data.product)  this.selectedProduct = data.product;
    if (data.order)    this.selectedOrder   = data.order;
    if (data.expert)   this.selectedExpert  = data.expert;
    if (data.tab)      this.activeTab       = data.tab;

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
     SIDEBAR METHODS
  ══════════════════════════════════════════ */

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');
    if (sidebar)  sidebar.classList.toggle('open', this.sidebarOpen);
    if (overlay)  overlay.classList.toggle('active', this.sidebarOpen);
  },

  closeSidebar() {
    this.sidebarOpen = false;
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebar-overlay');
    if (sidebar)  sidebar.classList.remove('open');
    if (overlay)  overlay.classList.remove('active');
  },

  /* ══════════════════════════════════════════
     ROLE METHODS
  ══════════════════════════════════════════ */

  setRole(role) {
    this.user.role = role;
    this.user.isLoggedIn = true;
    this.updateSidebarForRole();
  },

  updateSidebarForRole() {
    // Show/hide role-specific nav sections
    document.querySelectorAll('[data-role]').forEach(el => {
      const roles = el.dataset.role.split(',');
      el.style.display = roles.includes(this.user.role) ? '' : 'none';
    });
  },

  /* ══════════════════════════════════════════
     FILTER METHODS
  ══════════════════════════════════════════ */

  getFilteredSeeds() {
    let seeds = AC_DATA.seeds;

    if (this.activeCategory !== 'All Crops') {
      seeds = seeds.filter(s => s.category === this.activeCategory);
    }

    if (this.activeRegion !== 'All Regions') {
      seeds = seeds.filter(s => s.region === this.activeRegion || s.region === 'All Regions');
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      seeds = seeds.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.seller.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q)
      );
    }

    return seeds;
  },

  /* ══════════════════════════════════════════
     UTILITY
  ══════════════════════════════════════════ */

  formatNaira(amount) {
    return '₦' + Number(amount).toLocaleString('en-NG');
  },

  formatDate(dateStr) {
    return dateStr;
  },

  getStatusBadge(status) {
    const map = {
      'active':     'badge-active',
      'pending':    'badge-pending',
      'processing': 'badge-pending',
      'shipped':    'badge-shipped',
      'in-transit': 'badge-shipped',
      'delivered':  'badge-delivered',
      'cancelled':  'badge-cancelled',
      'draft':      'badge-draft',
      'out-of-stock': 'badge-out-stock',
      'approved':   'badge-active',
      'disbursed':  'badge-active',
      'reviewing':  'badge-pending'
    };
    return map[status] || 'badge-gray';
  },

  getStatusLabel(status) {
    const map = {
      'active':     'Active',
      'pending':    'Pending',
      'processing': 'Processing',
      'shipped':    'Shipped',
      'in-transit': 'In Transit',
      'delivered':  'Delivered',
      'cancelled':  'Cancelled',
      'draft':      'Draft',
      'out-of-stock': 'Out of Stock',
      'approved':   'Approved',
      'disbursed':  'Disbursed',
      'reviewing':  'Under Review'
    };
    return map[status] || status;
  },

  /* ── INIT ── */
  init() {
    this.loadCart();
    this.loadWishlist();
  }
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

// Toast notification
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

  // Show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Hide after 2.5s
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Format Naira
function formatNaira(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

// Render stars
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Debounce
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Truncate text
function truncate(str, len = 60) {
  return str.length > len ? str.slice(0, len) + '…' : str;
}