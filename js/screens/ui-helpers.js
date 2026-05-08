/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - UI-HELPERS.JS
   Reusable loading, empty-state, and error-state components.
   All functions return sanitised HTML strings.
   ═══════════════════════════════════════════════════════════ */

const AC_UI = (() => {

  /* ── Skeleton shimmer card ── */
  const shimmer = `
    <style>
      @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
      .skeleton{animation:shimmer 1.4s infinite linear;
        background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
        background-size:800px 100%;border-radius:6px;}
    </style>`;

  /* ── Product grid skeleton ── */
  function productSkeletons(count = 6) {
    const card = `
      <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
        <div class="skeleton" style="height:160px;width:100%;"></div>
        <div style="padding:14px;">
          <div class="skeleton" style="height:14px;width:70%;margin-bottom:8px;"></div>
          <div class="skeleton" style="height:12px;width:50%;margin-bottom:10px;"></div>
          <div class="skeleton" style="height:20px;width:40%;"></div>
        </div>
      </div>`;
    return `
      ${shimmer}
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;">
        ${card.repeat(count)}
      </div>`;
  }

  /* ── List skeleton (orders, transactions, notifications) ── */
  function listSkeletons(count = 5) {
    const row = `
      <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:16px;display:flex;gap:14px;align-items:center;">
        <div class="skeleton" style="width:48px;height:48px;border-radius:50%;flex-shrink:0;"></div>
        <div style="flex:1;">
          <div class="skeleton" style="height:14px;width:55%;margin-bottom:8px;"></div>
          <div class="skeleton" style="height:12px;width:35%;"></div>
        </div>
        <div class="skeleton" style="height:16px;width:60px;border-radius:20px;"></div>
      </div>`;
    return `
      ${shimmer}
      <div style="display:flex;flex-direction:column;gap:10px;">${row.repeat(count)}</div>`;
  }

  /* ── Full page centered spinner ── */
  function spinner(message = 'Loading…') {
    return `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;gap:16px;">
        <div style="width:40px;height:40px;border:4px solid #E5E7EB;border-top-color:#1E8B4C;border-radius:50%;animation:spin .8s linear infinite;"></div>
        <p style="color:#6B7280;font-size:14px;margin:0;">${message}</p>
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>`;
  }

  /* ── Empty state ── */
  function empty({ icon = '📭', title = 'Nothing here yet', message = '', actionLabel = '', actionFn = '' } = {}) {
    const safeTitle   = String(title).replace(/</g, '&lt;');
    const safeMessage = String(message).replace(/</g, '&lt;');
    return `
      <div style="text-align:center;padding:64px 24px;">
        <div style="font-size:56px;margin-bottom:16px;">${icon}</div>
        <h3 style="font-size:18px;font-weight:700;color:#111827;margin-bottom:8px;">${safeTitle}</h3>
        ${safeMessage ? `<p style="color:#6B7280;font-size:14px;margin-bottom:24px;">${safeMessage}</p>` : ''}
        ${actionLabel && actionFn ? `
          <button onclick="${actionFn}" style="padding:11px 24px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">
            ${actionLabel}
          </button>` : ''}
      </div>`;
  }

  /* ── Error state with retry ── */
  function error({ message = 'Something went wrong', retryFn = "window.location.reload()" } = {}) {
    const safe = String(message).replace(/</g, '&lt;');
    return `
      <div style="text-align:center;padding:64px 24px;">
        <div style="font-size:48px;margin-bottom:14px;">⚠️</div>
        <h3 style="font-size:17px;font-weight:700;color:#111827;margin-bottom:8px;">Failed to load</h3>
        <p style="color:#6B7280;font-size:14px;margin-bottom:24px;">${safe}</p>
        <button onclick="${retryFn}" style="padding:11px 24px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">
          Try again
        </button>
      </div>`;
  }

  return { productSkeletons, listSkeletons, spinner, empty, error };
})();

export default AC_UI;
