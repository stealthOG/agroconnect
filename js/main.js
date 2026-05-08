/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - main.js
   Vite entry point. Imports all modules in dependency order
   and exposes globals on window for inline onclick handlers.
   ═══════════════════════════════════════════════════════════ */

// ── Core modules ──────────────────────────────────────────
import AC_DATA from './data.js';
import AC_STATE, { showToast, formatNaira, renderStars, debounce, truncate } from './state.js';
import { AC_API, AC_PAY } from './api.js';
import AC_SCREENS from './screens-init.js';
import AC_DL from './screens/data-layer.js';
import AC_UI from './screens/ui-helpers.js';
import AC_ROUTER from './router.js';

// ── Screen modules (side effects: populate AC_SCREENS) ─────
import { handleLogin, handleSignup, handleOtp, resendOtp, togglePassword } from './screens/auth/auth.js';
import './screens/shared/shared.js';
import './screens/farmer/farmer.js';
import './screens/supplier/supplier.js';
import './screens/expert/expert.js';
import './screens/cooperative/cooperative.js';
import './screens/institution/institution.js';
import './screens/whatsapp/whatsapp.js';
import './screens/admin/admin.js';

// ── Expose globals for inline onclick handlers ─────────────
//    (onclick="AC_STATE.navigate(...)" etc. need window access)
window.AC_DATA    = AC_DATA;
window.AC_STATE   = AC_STATE;
window.AC_API     = AC_API;
window.AC_PAY     = AC_PAY;
window.AC_SCREENS = AC_SCREENS;
window.AC_DL      = AC_DL;
window.AC_UI      = AC_UI;
window.AC_ROUTER  = AC_ROUTER;

// Utility functions used across template onclick handlers
window.showToast   = showToast;
window.formatNaira = formatNaira;
window.renderStars = renderStars;
window.debounce    = debounce;
window.truncate    = truncate;

// Auth handler functions called from login/signup/otp screens
window.handleLogin    = handleLogin;
window.handleSignup   = handleSignup;
window.handleOtp      = handleOtp;
window.resendOtp      = resendOtp;
window.togglePassword = togglePassword;
