/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - DATA-LAYER.JS
   Replaces AC_DATA mock lookups with real API calls.
   Screens call these instead of AC_DATA.* directly.
   Falls back to AC_DATA during development when API_BASE_URL
   is not yet configured.
   ═══════════════════════════════════════════════════════════ */

const AC_DL = (() => {

  const _cache = {};

  function _isMockMode() {
    return !window.AC_CONFIG?.API_BASE_URL;
  }

  /* ── notify a screen to re-render when async data arrives ── */
  function _rerender(screenId) {
    if (AC_STATE.currentScreen === screenId) {
      AC_ROUTER.show(screenId);
    }
  }

  /* ══════════════════════════════════════════
     PRODUCTS
  ══════════════════════════════════════════ */

  async function fetchProducts(params = {}) {
    if (_isMockMode()) return AC_STATE.getFilteredProducts();
    try {
      const { data } = await AC_API.products.list(params);
      return data;
    } catch (err) {
      console.error('[DL] fetchProducts', err);
      showToast('Could not load products', 'error');
      return [];
    }
  }

  async function fetchProduct(id) {
    if (_isMockMode()) return AC_DATA.products.find(p => p.id === id) || null;
    try {
      const { data } = await AC_API.products.get(id);
      return data;
    } catch {
      return null;
    }
  }

  /* Load products for the market screen and cache them */
  async function loadMarketProducts(params, onDone) {
    if (_isMockMode()) { onDone(AC_STATE.getFilteredProducts()); return; }
    try {
      const { data, meta } = await AC_API.products.list(params);
      onDone(data, meta);
    } catch (err) {
      console.error('[DL] loadMarketProducts', err);
      onDone([], null);
    }
  }

  /* ══════════════════════════════════════════
     ORDERS
  ══════════════════════════════════════════ */

  async function fetchOrders(params = {}) {
    if (_isMockMode()) return AC_DATA.orders || [];
    try {
      const { data } = await AC_API.orders.list(params);
      return data;
    } catch (err) {
      console.error('[DL] fetchOrders', err);
      return [];
    }
  }

  async function fetchOrder(id) {
    if (_isMockMode()) return (AC_DATA.orders || []).find(o => o.id === id) || null;
    try {
      const { data } = await AC_API.orders.get(id);
      return data;
    } catch { return null; }
  }

  async function placeOrder(payload) {
    if (_isMockMode()) {
      await new Promise(r => setTimeout(r, 800));
      return { id: 'MOCK-' + Date.now(), orderNumber: 'ORD-MOCK', status: 'pending' };
    }
    const { data } = await AC_API.orders.create(payload);
    return data;
  }

  /* ══════════════════════════════════════════
     WALLET
  ══════════════════════════════════════════ */

  async function fetchWallet() {
    if (_isMockMode()) return AC_DATA.wallet || { balance: 0, agricCredit: 0, stats: {} };
    try {
      const { data } = await AC_API.wallet.get();
      return data;
    } catch (err) {
      console.error('[DL] fetchWallet', err);
      return { balance: 0, agricCredit: 0, stats: {} };
    }
  }

  async function fetchTransactions(params = {}) {
    if (_isMockMode()) return (AC_DATA.wallet?.transactions || []);
    try {
      const { data } = await AC_API.wallet.transactions(params);
      return data;
    } catch { return []; }
  }

  /* ══════════════════════════════════════════
     SUPPLIER
  ══════════════════════════════════════════ */

  async function fetchMyListings(params = {}) {
    if (_isMockMode()) return AC_DATA.products.filter(p => p.supplier === AC_STATE.user.name) || [];
    try {
      const { data } = await AC_API.products.list({ ...params });
      return data;
    } catch { return []; }
  }

  async function publishProduct(payload) {
    if (_isMockMode()) {
      await new Promise(r => setTimeout(r, 800));
      return { id: 'MOCK-' + Date.now(), name: payload.name, isActive: true };
    }
    // Create then immediately publish (set isActive: true)
    const { data } = await AC_API.products.create(payload);
    await AC_API.products.update(data.id, { isActive: true });
    return data;
  }

  return {
    fetchProducts,
    fetchProduct,
    loadMarketProducts,
    fetchOrders,
    fetchOrder,
    placeOrder,
    fetchWallet,
    fetchTransactions,
    fetchMyListings,
    publishProduct,
  };

})();

export default AC_DL;
