/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - API.JS
   Centralised HTTP client. All backend calls go through here.
   Handles: auth headers, token refresh, error normalisation.
   ═══════════════════════════════════════════════════════════ */

const AC_API = (() => {

  const BASE = (window.AC_CONFIG?.API_BASE_URL ?? '') + '/api/v1';

  /* ── internal: refresh in-flight guard ── */
  let _refreshPromise = null;

  /* ── core fetch wrapper ── */
  async function request(method, path, body = null, options = {}) {
    const headers = { 'Content-Type': 'application/json' };

    const token = AC_STATE.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = {
      method,
      headers,
      ...options,
    };
    if (body !== null) config.body = JSON.stringify(body);

    let response = await fetch(`${BASE}${path}`, config);

    /* Auto-refresh on 401 */
    if (response.status === 401 && !options._retry) {
      const newToken = await _tryRefresh();
      if (newToken) {
        headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(`${BASE}${path}`, { ...config, headers, _retry: true });
      }
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const err = new Error(data.error ?? `HTTP ${response.status}`);
      err.status = response.status;
      err.data   = data;
      throw err;
    }

    return data;
  }

  /* ── silent refresh ── */
  async function _tryRefresh() {
    if (_refreshPromise) return _refreshPromise;

    _refreshPromise = (async () => {
      try {
        const refreshToken = localStorage.getItem('ac_refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const res = await fetch(`${BASE}/auth/refresh`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ refreshToken }),
        });

        if (!res.ok) throw new Error('Refresh failed');

        const { data } = await res.json();
        AC_STATE.setToken(data.accessToken);
        localStorage.setItem('ac_refresh_token', data.refreshToken);
        return data.accessToken;
      } catch {
        AC_STATE.logout();
        return null;
      } finally {
        _refreshPromise = null;
      }
    })();

    return _refreshPromise;
  }

  /* ── public helpers ── */
  const get  = (path, opts)       => request('GET',    path, null, opts);
  const post = (path, body, opts) => request('POST',   path, body, opts);
  const patch = (path, body, opts)=> request('PATCH',  path, body, opts);
  const del  = (path, opts)       => request('DELETE', path, null, opts);

  /* ══════════════════════════════════════════
     AUTH
  ══════════════════════════════════════════ */
  const auth = {
    register:       (payload)          => post('/auth/register', payload),
    login:          (payload)          => post('/auth/login',    payload),
    logout:         (refreshToken)     => post('/auth/logout',   { refreshToken }),
    refresh:        (refreshToken)     => post('/auth/refresh',  { refreshToken }),
    sendOtp:        (phone)            => post('/auth/otp/send',   { phone }),
    verifyOtp:      (phone, code)      => post('/auth/otp/verify', { phone, code }),
    resetRequest:   (email)            => post('/auth/password-reset/request', { email }),
    resetConfirm:   (token, password)  => post('/auth/password-reset/confirm', { token, password }),
    googleLogin:    (idToken)          => post('/auth/social/google',   { idToken }),
    facebookLogin:  (accessToken)      => post('/auth/social/facebook', { accessToken }),
    appleLogin:     (idToken, user)    => post('/auth/social/apple',    { idToken, user }),
  };

  /* ══════════════════════════════════════════
     USERS
  ══════════════════════════════════════════ */
  const users = {
    me:     ()        => get('/users/me'),
    update: (payload) => patch('/users/me', payload),
  };

  /* ══════════════════════════════════════════
     PRODUCTS
  ══════════════════════════════════════════ */
  const products = {
    list:         (params = {}) => get(`/products?${new URLSearchParams(params)}`),
    get:          (id)          => get(`/products/${id}`),
    create:       (payload)     => post('/products', payload),
    update:       (id, payload) => patch(`/products/${id}`, payload),
    remove:       (id)          => del(`/products/${id}`),
    reviews:      (id, p = {})  => get(`/products/${id}/reviews?${new URLSearchParams(p)}`),
    submitReview: (id, payload) => post(`/products/${id}/reviews`, payload),
  };

  /* ══════════════════════════════════════════
     ORDERS
  ══════════════════════════════════════════ */
  const orders = {
    list:        (params = {}) => get(`/orders?${new URLSearchParams(params)}`),
    get:         (id)          => get(`/orders/${id}`),
    create:      (payload)     => post('/orders', payload),
    update:      (id, payload) => patch(`/orders/${id}`, payload),
    messages:    (id)          => get(`/orders/${id}/messages`),
    sendMessage: (id, body)    => post(`/orders/${id}/messages`, { body }),
    ship:        (id, payload) => post(`/orders/${id}/ship`, payload),
    tracking:    (id)          => get(`/orders/${id}/tracking`),
  };

  /* ══════════════════════════════════════════
     WALLET
  ══════════════════════════════════════════ */
  const wallet = {
    get:          ()        => get('/wallet'),
    transactions: (params)  => get(`/wallet/transactions?${new URLSearchParams(params)}`),
    topup:        (payload) => post('/wallet/topup', payload),
  };

  /* ══════════════════════════════════════════
     NOTIFICATIONS
  ══════════════════════════════════════════ */
  const notifications = {
    list:    ()   => get('/notifications'),
    markRead:(id) => patch(`/notifications/${id}/read`, {}),
    markAll: ()   => patch('/notifications/read-all', {}),
  };

  /* ══════════════════════════════════════════
     COURSES
  ══════════════════════════════════════════ */
  const courses = {
    list:           (params = {}) => get(`/courses?${new URLSearchParams(params)}`),
    get:            (id)          => get(`/courses/${id}`),
    create:         (payload)     => post('/courses', payload),
    update:         (id, payload) => patch(`/courses/${id}`, payload),
    enrolled:       ()            => get('/courses/enrolled'),
    enrol:          (id, payload) => post(`/courses/${id}/enrol`, payload || {}),
    updateProgress: (id, progress)=> patch(`/courses/${id}/progress`, { progress }),
  };

  /* ══════════════════════════════════════════
     EXPERTS
  ══════════════════════════════════════════ */
  const experts = {
    list:        (params = {}) => get(`/experts?${new URLSearchParams(params)}`),
    get:         (id)          => get(`/experts/${id}`),
    slots:       (id)          => get(`/experts/${id}/slots`),
    createSlot:  (id, payload) => post(`/experts/${id}/slots`, payload),
    deleteSlot:  (expertId, slotId) => del(`/experts/${expertId}/slots/${slotId}`),
  };

  const consultations = {
    list:   ()        => get('/consultations'),
    book:   (payload) => post('/consultations', payload),
    update: (id, payload) => patch(`/consultations/${id}`, payload),
  };

  /* ══════════════════════════════════════════
     LOANS
  ══════════════════════════════════════════ */
  const loans = {
    list:   (params = {}) => get(`/loans?${new URLSearchParams(params)}`),
    create: (payload)     => post('/loans', payload),
    update: (id, payload) => patch(`/loans/${id}`, payload),
  };

  const produce = {
    list:   (params = {}) => get(`/produce?${new URLSearchParams(params)}`),
    mine:   ()            => get('/produce/mine'),
    create: (payload)     => post('/produce', payload),
    remove: (id)          => del(`/produce/${id}`),
  };

  /* ══════════════════════════════════════════
     PAYMENTS
  ══════════════════════════════════════════ */
  const payments = {
    initialize: (payload)   => post('/payments/initialize', payload),
    verify:     (reference) => get(`/payments/verify/${reference}`),
  };

  /* ══════════════════════════════════════════
     UPLOADS
  ══════════════════════════════════════════ */
  const uploads = {
    /* Upload a single file. Returns { url, publicId, devMode } */
    upload: (file, purpose, entityId) => {
      const form = new FormData();
      form.append('file', file);
      form.append('purpose', purpose);
      if (entityId) form.append('entityId', entityId);
      const token = AC_STATE.getToken();
      return fetch(`${BASE}/uploads`, {
        method:  'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body:    form,
      }).then(async r => {
        const data = await r.json();
        if (!r.ok) throw Object.assign(new Error(data.error ?? `HTTP ${r.status}`), { status: r.status, data });
        return data;
      });
    },
  };

  return { get, post, patch, del, auth, users, products, orders, wallet, notifications, courses, experts, consultations, loans, payments, uploads, produce };

})();

/* ═══════════════════════════════════════════════════════════
   PAYSTACK HELPER
   Wraps the Paystack inline popup (loaded from js.paystack.co)
   ═══════════════════════════════════════════════════════════ */
const AC_PAY = (() => {

  /* Open the Paystack popup and return a Promise that resolves with the reference
     on success, or rejects if the user closes without paying. */
  function openPopup({ email, amount, accessCode, reference, onSuccess, onClose }) {
    if (typeof PaystackPop === 'undefined') {
      showToast('Payment library not loaded. Check your connection.', 'error');
      return;
    }

    const handler = PaystackPop.setup({
      key:         window.AC_CONFIG?.PAYSTACK_PUBLIC_KEY ?? '',
      email,
      amount:      Math.round(amount * 100),  // Naira → kobo
      ref:         reference,
      access_code: accessCode,
      currency:    'NGN',
      onSuccess: (transaction) => {
        if (typeof onSuccess === 'function') onSuccess(transaction.reference);
      },
      onClose: () => {
        if (typeof onClose === 'function') onClose();
      },
    });
    handler.openIframe();
  }

  return { openPopup };
})();

export { AC_API, AC_PAY };

/* Expose admin API inline on AC_API so api.js stays one file */
AC_API.analytics = {
  supplier: () => AC_API.get('/analytics/supplier'),
  expert:   () => AC_API.get('/analytics/expert'),
};

AC_API.coop = {
  members:      (p = {})      => AC_API.get(`/coop/members?${new URLSearchParams(p)}`),
  addMember:    (payload)     => AC_API.post('/coop/members', payload),
  updateMember: (id, payload) => AC_API.patch(`/coop/members/${id}`, payload),
  removeMember: (id)          => AC_API.del(`/coop/members/${id}`),
};

AC_API.admin = {
  stats:        ()             => AC_API.get('/admin/stats'),
  users:        (p = {})      => AC_API.get(`/admin/users?${new URLSearchParams(p)}`),
  updateStatus: (id, payload) => AC_API.patch(`/admin/users/${id}/status`, payload),
  loans:        (p = {})      => AC_API.get(`/admin/loans?${new URLSearchParams(p)}`),
  updateLoan:   (id, payload) => AC_API.patch(`/admin/loans/${id}`, payload),
  broadcast:    (payload)     => AC_API.post('/admin/notifications/broadcast', payload),
};
