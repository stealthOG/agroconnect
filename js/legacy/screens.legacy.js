/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - SCREENS.JS
   All screen render functions
   ═══════════════════════════════════════════════════════════ */

const AC_SCREENS = {

/* ═══════════════════════════════════════════════════════════
   AUTH SCREENS
═══════════════════════════════════════════════════════════ */

splash() {
  setTimeout(() => showAuthScreen('roleSelection'), 3000);
  return `
  <div style="
    min-height:100vh;
    background:linear-gradient(160deg,#1E8B4C 0%,#25A55A 60%,#1E8B4C 100%);
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    position:relative;overflow:hidden;
  ">
    <div style="position:absolute;width:400px;height:400px;background:rgba(255,255,255,0.04);border-radius:50%;top:-120px;right:-100px;"></div>
    <div style="position:absolute;width:280px;height:280px;background:rgba(255,255,255,0.04);border-radius:50%;bottom:-80px;left:-60px;"></div>
    <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.06);border-radius:50%;top:40%;left:-40px;"></div>
    <div style="
      width:96px;height:96px;background:white;border-radius:22px;
      display:flex;align-items:center;justify-content:center;
      font-size:48px;font-weight:800;color:#1E8B4C;margin-bottom:28px;
      box-shadow:0 8px 32px rgba(0,0,0,0.2);
      animation:scaleIn .5s cubic-bezier(.4,0,.2,1) both;
    ">A</div>
    <h1 style="color:white;font-size:36px;font-weight:800;letter-spacing:-1px;margin-bottom:8px;animation:fadeIn .6s .2s both;">AgroConnect</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:15px;margin-bottom:60px;text-align:center;padding:0 40px;animation:fadeIn .6s .3s both;">Empowering Nigerian Farmers Through Digital Innovation</p>
    <div style="display:flex;gap:8px;margin-bottom:40px;animation:fadeIn .6s .4s both;">
      <div style="width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.4);"></div>
      <div style="width:24px;height:8px;border-radius:4px;background:white;"></div>
      <div style="width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.4);"></div>
    </div>
    <p style="color:rgba(255,255,255,0.5);font-size:12px;position:absolute;bottom:32px;animation:fadeIn .6s .5s both;">Version 1.0.0</p>
  </div>`;
},

roleSelection() {
  return `
  <div style="min-height:100vh;background:#f9fafb;">
    <div style="background:linear-gradient(135deg,#1E8B4C,#25A55A);padding:36px 24px 80px;text-align:center;">
      <div style="width:56px;height:56px;background:white;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#1E8B4C;margin:0 auto 16px;">A</div>
      <h1 style="color:white;font-size:26px;font-weight:800;margin-bottom:6px;">Welcome to AgroConnect</h1>
      <p style="color:rgba(255,255,255,0.85);font-size:14px;">Choose how you want to get started</p>
    </div>
    <div style="max-width:1100px;margin:-52px auto 0;padding:0 24px 48px;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px;" class="role-grid-3">
        ${[
          { id:'buyer',  emoji:'🌱', bg:'#e8f5ee', title:"I'm a Buyer",   desc:'I want to buy seeds, farm inputs, and connect with agricultural experts', btn:'Continue as Buyer' },
          { id:'seller', emoji:'🌱', bg:'#fef9c3', title:"I'm a Seller",  desc:'I want to sell seeds, farm produce, and reach more customers', btn:'Continue as Seller' },
          { id:'expert', emoji:'🌱', bg:'#ede9fe', title:"I'm an Expert", desc:'Create and monetize courses, offer paid consultations', btn:'Continue as Expert' },
        ].map(r => `
          <div onclick="showAuthScreen('signup${r.id.charAt(0).toUpperCase()+r.id.slice(1)}')" style="
            background:white;border-radius:16px;padding:32px 20px 28px;cursor:pointer;
            box-shadow:0 4px 20px rgba(0,0,0,0.08);border:2px solid transparent;
            transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;
          "
          onmouseover="this.style.borderColor='#1E8B4C';this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='transparent';this.style.transform='translateY(0)'">
            <div style="width:72px;height:72px;background:${r.bg};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px;">${r.emoji}</div>
            <h3 style="font-size:18px;font-weight:700;color:#111827;margin-bottom:8px;">${r.title}</h3>
            <p style="font-size:13px;color:#6b7280;line-height:1.5;margin-bottom:20px;">${r.desc}</p>
            <button style="width:100%;padding:11px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">${r.btn}</button>
          </div>
        `).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:28px;" class="role-grid-2">
        <div onclick="showAuthScreen('signupCoop')" style="background:white;border-radius:16px;padding:32px 20px 28px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:2px solid transparent;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;"
          onmouseover="this.style.borderColor='#1E8B4C';this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='transparent';this.style.transform='translateY(0)'">
          <div style="width:72px;height:72px;background:#e0f0fb;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px;">🌱</div>
          <h3 style="font-size:18px;font-weight:700;color:#111827;margin-bottom:8px;">Cooperative Manager</h3>
          <p style="font-size:13px;color:#6b7280;line-height:1.5;margin-bottom:20px;">Manage your cooperative, access group loans and bulk inputs from financial institutions</p>
          <button style="width:100%;padding:11px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Continue as Cooperative</button>
        </div>
        <div onclick="showAuthScreen('signupInstitution')" style="background:white;border-radius:16px;padding:32px 20px 28px;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:2px solid transparent;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;"
          onmouseover="this.style.borderColor='#5b3fe0';this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='transparent';this.style.transform='translateY(0)'">
          <div style="width:72px;height:72px;background:#eeeafc;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px;">🌱️</div>
          <h3 style="font-size:18px;font-weight:700;color:#111827;margin-bottom:8px;">Institution / Bank</h3>
          <p style="font-size:13px;color:#6b7280;line-height:1.5;margin-bottom:20px;">Financial institutions - manage disbursements, monitor spend compliance in real-time</p>
          <button style="width:100%;padding:11px;background:#5b3fe0;color:white;border:none;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Continue as Institution</button>
        </div>
      </div>
      <p style="text-align:center;font-size:14px;color:#6b7280;">
        Already have an account?
        <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;"> Log in</span>
      </p>
    </div>
  </div>
  <style>
    @media(max-width:768px){.role-grid-3{grid-template-columns:1fr!important}.role-grid-2{grid-template-columns:1fr!important}}
  </style>`;
},

login() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:28px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:14px;margin-bottom:32px;">Join thousands of farmers growing their business digitally</p>
        <div style="font-size:72px;margin-bottom:32px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Access verified seed suppliers','Connect with agric experts','Get agricultural financing','Track orders & deliveries'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div style="width:20px;height:20px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:14px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:32px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:28px;font-weight:800;color:#111827;margin-bottom:6px;">Welcome Back</h2>
      <p style="color:#6b7280;font-size:14px;margin-bottom:32px;">Log in to your account to continue</p>
      <div id="login-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Email or Phone</label>
        <input type="text" class="form-input" placeholder="Enter your email or phone number" id="login-email">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" placeholder="Enter your password" id="login-password" style="padding-right:48px;">
        <button onclick="togglePassword('login-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
          <input type="checkbox" id="login-remember" style="width:16px;height:16px;accent-color:#1E8B4C;">
          <span style="font-size:13px;color:#6b7280;">Remember me</span>
        </label>
        <span style="color:#1E8B4C;font-size:13px;font-weight:600;cursor:pointer;">Forgot password?</span>
      </div>
      <button onclick="handleLogin()" id="login-btn" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Log in</button>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
        <span style="color:#9ca3af;font-size:13px;font-weight:500;">OR</span>
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;">
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Google</button>
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Facebook</button>
      </div>
      <p style="text-align:center;font-size:14px;color:#6b7280;">Don't have an account? <span onclick="showAuthScreen('roleSelection')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Sign up</span></p>
    </div>
  </div>`;
},

signupBuyer() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Join thousands of farmers growing their business digitally</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Access verified seed suppliers','Connect with agric experts','Get agricultural financing','Track orders & deliveries'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:26px;font-weight:800;color:#111827;margin-bottom:4px;">Create Buyer Account</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:28px;">Get started with your free account</p>
      <div id="signup-buyer-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Enter your full name" id="buyer-name">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Enter your email" id="buyer-email">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Enter phone number" id="buyer-phone">
        </div>
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password (min. 6 characters)" id="buyer-password" style="padding-right:48px;">
        <button onclick="togglePassword('buyer-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="buyer-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('buyer')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Create Account</button>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
        <span style="color:#9ca3af;font-size:13px;">OR</span>
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Google</button>
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Facebook</button>
      </div>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

signupSeller() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Join thousands of farmers growing their business digitally</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['List your seeds & produce','Reach thousands of buyers','Get paid securely via wallet','Track your sales & orders'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:26px;font-weight:800;color:#111827;margin-bottom:4px;">Create Seller Account</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:28px;">Get started with your free account</p>
      <div id="signup-seller-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Enter your full name" id="seller-name">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Enter your email" id="seller-email">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Enter phone number" id="seller-phone">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Business / Farm Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Enter your farm or business name" id="seller-business">
      </div>
      <div class="form-group">
        <label class="form-label" style="display:flex;align-items:center;gap:6px;">NASC Registration Number <span style="color:#9ca3af;font-weight:400;font-size:12px;">(Optional)</span></label>
        <input type="text" class="form-input" placeholder="e.g. NASC-2024-00234" id="seller-nasc">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password (min. 6 characters)" id="seller-password" style="padding-right:48px;">
        <button onclick="togglePassword('seller-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="seller-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('seller')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Create Account</button>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
        <span style="color:#9ca3af;font-size:13px;">OR</span>
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Google</button>
        <button style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;">🌱 Facebook</button>
      </div>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

signupExpert() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Join thousands of farmers growing their business digitally</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱‍🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Share your agricultural expertise','Create and monetize courses','Offer paid consultations','Build your professional brand'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:4px;">Apply as Agricultural Expert</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:24px;">Join our network of verified agricultural professionals</p>
      <div id="signup-expert-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Enter your full name" id="expert-name">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Enter your email" id="expert-email">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Enter phone number" id="expert-phone">
        </div>
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password" id="expert-password" style="padding-right:48px;">
        <button onclick="togglePassword('expert-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <div style="font-size:14px;font-weight:700;color:#374151;margin-bottom:16px;padding-top:8px;border-top:1px solid #f3f4f6;">Professional Information</div>
      <div class="form-group">
        <label class="form-label">Professional Title <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g., Soil Analyst, Agronomist" id="expert-title">
      </div>
      <div class="form-group">
        <label class="form-label">Highest Qualification <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="expert-qualification">
          <option value="">Select qualification</option>
          <option>PhD</option><option>MSc</option><option>BSc</option><option>HND</option><option>OND</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Specialization Areas <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="expert-specialization">
          <option value="">Select specialization</option>
          <option>Crop Production</option><option>Soil Science</option><option>Pest Control</option>
          <option>Agribusiness</option><option>Livestock</option><option>Irrigation</option><option>Post-Harvest</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Years of Experience <span style="color:#dc2626;">*</span></label>
        <input type="number" class="form-input" placeholder="e.g., 5" id="expert-experience" min="1" max="50">
      </div>
      <div class="form-group">
        <label class="form-label">Current Institution / Organization</label>
        <input type="text" class="form-input" placeholder="e.g., Federal Ministry of Agriculture" id="expert-institution">
      </div>
      <div class="form-group">
        <label class="form-label">Professional Bio <span style="color:#dc2626;">*</span></label>
        <textarea class="form-textarea" placeholder="Brief description of your expertise and experience..." id="expert-bio" style="min-height:90px;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Credentials <span style="color:#dc2626;">*</span></label>
        <div class="file-upload" onclick="showToast('File upload coming soon','')">
          <div class="file-upload-icon">🌱</div>
          <p>Click to upload certificates/credentials</p>
          <span>PDF, JPG up to 10MB</span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">LinkedIn Profile <span style="color:#9ca3af;font-weight:400;font-size:12px;">(Optional)</span></label>
        <input type="url" class="form-input" placeholder="https://linkedin.com/in/yourprofile" id="expert-linkedin">
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="expert-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I confirm all information is accurate and I agree to the <span style="color:#1E8B4C;font-weight:600;">Expert Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('expert')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Submit Application</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

signupCoop() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Empowering cooperatives across Nigeria</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Onboard all your members digitally','Apply for group loans from BOA','Track spend-locked disbursements','Generate reports for your bank'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:4px;">Register Your Cooperative</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:24px;">Access group loans and manage your members</p>
      <div id="signup-coop-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Cooperative Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. Kaduna North Farmers Cooperative" id="coop-name">
      </div>
      <div class="form-group">
        <label class="form-label">Registration Number <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="FCA/State registration number" id="coop-regno">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label class="form-label">State <span style="color:#dc2626;">*</span></label>
          <select class="form-select" id="coop-state">
            <option value="">Select State</option>
            ${['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'].map(s=>`<option>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">LGA <span style="color:#dc2626;">*</span></label>
          <input type="text" class="form-input" placeholder="Enter LGA" id="coop-lga">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Number of Members <span style="color:#dc2626;">*</span></label>
        <input type="number" class="form-input" placeholder="e.g. 120" id="coop-members" min="1">
      </div>
      <div class="form-group">
        <label class="form-label">Primary Crop <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="coop-crop">
          <option value="">Select primary crop</option>
          <option>Maize</option><option>Rice</option><option>Sorghum</option><option>Cassava</option>
          <option>Yam</option><option>Cowpea</option><option>Soybean</option><option>Groundnut</option><option>Tomato</option>
        </select>
      </div>
      <div style="font-size:14px;font-weight:700;color:#374151;margin-bottom:16px;padding-top:8px;border-top:1px solid #f3f4f6;">Manager Information</div>
      <div class="form-group">
        <label class="form-label">Manager Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Your full name as manager" id="coop-manager-name">
      </div>
      <div class="form-group">
        <label class="form-label">Manager Phone <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Manager phone number" id="coop-manager-phone">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Manager Email <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Manager email address" id="coop-manager-email">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password" id="coop-password" style="padding-right:48px;">
        <button onclick="togglePassword('coop-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Cooperative Certificate <span style="color:#dc2626;">*</span></label>
        <div class="file-upload" onclick="showToast('File upload coming soon','')">
          <div class="file-upload-icon">🌱</div>
          <p>Click to upload cooperative certificate</p>
          <span>PDF, JPG up to 10MB</span>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="coop-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('cooperative')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Register Cooperative</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

signupInstitution() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Institutional agricultural finance infrastructure</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱️</div>
        <div style="text-align:left;display:inline-block;">
          ${['Disburse loans with zero diversion','Monitor spend compliance in real-time','Access LGA-level farmer data','Generate regulatory reports'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:4px;">Register Institution</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:24px;">For banks, DFIs, and government agencies</p>
      <div id="signup-inst-error" style="display:none;background:#fee2e2;border:1px solid #fecaca;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#dc2626;font-weight:500;"></div>
      <div class="form-group">
        <label class="form-label">Institution Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. Bank of Agriculture" id="inst-name">
      </div>
      <div class="form-group">
        <label class="form-label">Institution Type <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="inst-type">
          <option value="">Select type</option>
          <option>Development Finance Institution</option>
          <option>Commercial Bank</option>
          <option>Microfinance Bank</option>
          <option>Government Agency</option>
          <option>NGO / Development Partner</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">RC / License Number <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="CBN license or RC number" id="inst-rc">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Person Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Full name of primary contact" id="inst-contact-name">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Email <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Official email address" id="inst-contact-email">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Phone <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Official phone number" id="inst-contact-phone">
        </div>
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password" id="inst-password" style="padding-right:48px;">
        <button onclick="togglePassword('inst-password')" style="position:absolute;right:14px;bottom:13px;background:none;border:none;cursor:pointer;font-size:16px;line-height:1;">🌱</button>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Authorization Letter <span style="color:#dc2626;">*</span></label>
        <div class="file-upload" onclick="showToast('File upload coming soon','')">
          <div class="file-upload-icon">🌱</div>
          <p>Upload official authorization on letterhead</p>
          <span>PDF up to 10MB</span>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="inst-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Institutional Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('institution')" style="width:100%;padding:14px;background:#5b3fe0;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;transition:all .2s;"
        onmouseover="this.style.background='#4c34c7'" onmouseout="this.style.background='#5b3fe0'">Submit Registration</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

otp() {
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:40px 32px;max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:72px;height:72px;background:#e8f5ee;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 20px;">🌱</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:8px;">Verify Your Number</h2>
      <p style="color:#6b7280;font-size:14px;margin-bottom:8px;">We sent a 6-digit code to</p>
      <p style="color:#111827;font-weight:700;font-size:15px;margin-bottom:28px;" id="otp-phone-display">+234 803 456 7890</p>
      <div class="otp-inputs" id="otp-inputs">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
        <input class="otp-input" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]">
      </div>
      <button onclick="handleOtp()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;transition:all .2s;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='#1E8B4C'">Verify Code</button>
      <p style="color:#6b7280;font-size:13px;">
        Didn't receive the code?
        <span style="color:#1E8B4C;font-weight:700;cursor:pointer;" onclick="showToast('Code resent successfully!','success')"> Resend</span>
      </p>
    </div>
  </div>`;
},

underReview() {
  const appId = AC_STATE._pendingAppId || 'APP-2026-00123';
  const role  = AC_STATE._pendingRole  || 'seller';
  const roleLabel = role === 'expert' ? 'agricultural expert' : role === 'cooperative' ? 'cooperative' : role === 'institution' ? 'institution' : 'seller';
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:44px 36px;max-width:520px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:80px;height:80px;background:#fef3c7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">⏳</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:10px;">Application Under Review</h2>
      <p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:24px;">
        Thank you for applying to join our network of ${roleLabel}s. We're currently reviewing your credentials and will get back to you within 72 hours.
      </p>
      <div style="background:#f9fafb;border-radius:12px;padding:16px 24px;margin-bottom:16px;text-align:left;">
        <div style="font-size:12px;color:#9ca3af;margin-bottom:4px;">Application ID</div>
        <div style="font-size:17px;font-weight:700;color:#111827;">${appId}</div>
      </div>
      <div style="background:#eff6ff;border-radius:12px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">🌱</span>
        <span style="font-size:13px;color:#1d6fa4;font-weight:500;">We've sent a confirmation email to your inbox</span>
      </div>
      <button onclick="showAuthScreen('login')" style="width:100%;max-width:280px;padding:13px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;">Go to Login</button>
      <p style="font-size:13px;color:#9ca3af;">
        Questions? Email us at <span style="color:#1E8B4C;font-weight:600;cursor:pointer;">support@agroconnect.com</span>
      </p>
    </div>
  </div>`;
},

rejected() {
  const appId = AC_STATE._pendingAppId || 'SEL-2024-00123';
  const role  = AC_STATE._pendingRole  || 'seller';
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:44px 36px;max-width:520px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:80px;height:80px;background:#fee2e2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">❌</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:10px;">Application Not Approved</h2>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin-bottom:24px;">
        We were unable to verify your application at this time. Please review the reason below and reapply with the correct information.
      </p>
      <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:left;">
        <div style="font-size:13px;font-weight:700;color:#d97706;margin-bottom:6px;">Reason for Rejection:</div>
        <div style="font-size:13px;color:#374151;line-height:1.6;">The business registration document provided is unclear. Please upload a clearer copy of your CAC certificate or farm registration.</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;max-width:360px;margin-left:auto;margin-right:auto;">
        <button onclick="showAuthScreen('signup${role.charAt(0).toUpperCase()+role.slice(1)}')" style="padding:12px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">Reapply Now</button>
        <button onclick="showToast('Support contact coming soon','')" style="padding:12px;background:white;color:#374151;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">Contact Support</button>
      </div>
      <p style="font-size:12px;color:#9ca3af;">Application ID: ${appId}</p>
    </div>
  </div>`;
},

/* ═══════════════════════════════════════════════════════════
   APP SCREENS
═══════════════════════════════════════════════════════════ */

home() {
  const wallet = AC_DATA.wallet;
  const recentOrders = AC_DATA.orders.slice(0, 3);
  const featuredSeeds = AC_DATA.seeds.filter(s => s.nascVerified && s.inStock).slice(0, 4);
  const recentTx = wallet.transactions.slice(0, 3);
  return `
  <div class="animate-fadeIn">
    <div style="background:linear-gradient(135deg,#1a7a3c 0%,#22a350 100%);border-radius:var(--radius-xl);padding:36px 32px;margin-bottom:24px;position:relative;overflow:hidden;">
      <div style="position:absolute;width:260px;height:260px;background:rgba(255,255,255,0.06);border-radius:50%;top:-80px;right:60px;pointer-events:none;"></div>
      <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.04);border-radius:50%;bottom:-60px;right:-30px;pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <h1 style="color:white;font-size:var(--text-3xl);font-weight:700;margin-bottom:8px;line-height:1.2;">Welcome to AgroConnect</h1>
        <p style="color:rgba(255,255,255,0.85);font-size:var(--text-base);margin-bottom:24px;">Empowering Nigerian Farmers Through Digital Innovation</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button onclick="AC_STATE.navigate('seed-market')" style="background:white;color:#1E8B4C;border:none;border-radius:var(--radius-full);padding:11px 24px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;"
            onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='white'">Get Started</button>
          <button onclick="AC_STATE.navigate('learning')" style="background:transparent;color:white;border:2px solid rgba(255,255,255,0.7);border-radius:var(--radius-full);padding:11px 24px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;"
            onmouseover="this.style.borderColor='white'" onmouseout="this.style.borderColor='rgba(255,255,255,0.7)'">Learn More</button>
        </div>
      </div>
    </div>
    <div class="stats-row" style="margin-bottom:28px;">
      <div style="background:#dbeafe;border-radius:var(--radius-md);padding:20px;border:1px solid #bfdbfe;">
        <div style="font-size:var(--text-2xl);font-weight:700;color:#1d4ed8;margin-bottom:4px;">15K+</div>
        <div style="font-size:var(--text-sm);color:#3b82f6;font-weight:500;">Active Farmers</div>
      </div>
      <div style="background:#dcfce7;border-radius:var(--radius-md);padding:20px;border:1px solid #bbf7d0;">
        <div style="font-size:var(--text-2xl);font-weight:700;color:#15803d;margin-bottom:4px;">2.5K+</div>
        <div style="font-size:var(--text-sm);color:#16a34a;font-weight:500;">Seed Varieties</div>
      </div>
      <div style="background:#ede9fe;border-radius:var(--radius-md);padding:20px;border:1px solid #ddd6fe;">
        <div style="font-size:var(--text-2xl);font-weight:700;color:#7c3aed;margin-bottom:4px;">₦2.5B+</div>
        <div style="font-size:var(--text-sm);color:#8b5cf6;font-weight:500;">Loans Disbursed</div>
      </div>
      <div style="background:#fef3c7;border-radius:var(--radius-md);padding:20px;border:1px solid #fde68a;">
        <div style="font-size:var(--text-2xl);font-weight:700;color:#d97706;margin-bottom:4px;">500+</div>
        <div style="font-size:var(--text-sm);color:#f59e0b;font-weight:500;">Expert Consultants</div>
      </div>
    </div>
    <div style="margin-bottom:32px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Key Features</h2>
      <div class="grid-3">
        ${[
          { icon:'🌱', title:'Seed Marketplace',    desc:'Buy and sell quality seeds from verified suppliers across Nigeria', screen:'seed-market' },
          { icon:'🌱', title:'Skill Development',   desc:'Access courses and training from agricultural experts', screen:'learning' },
          { icon:'🌱', title:'Easy Financing',      desc:'Get agricultural and export loans with reduced interest rates', screen:'financing' },
          { icon:'🌱', title:'Logistics Support',   desc:'Connect with warehousing and transport partners', screen:'logistics' },
          { icon:'🌱', title:'Expert Network',      desc:'Connect with industry leaders and researchers', screen:'experts' },
          { icon:'🌱', title:'Product Marketplace', desc:'Sell your farm produce directly to buyers nationwide', screen:'seed-market' },
        ].map(f => `
          <div onclick="AC_STATE.navigate('${f.screen}')" class="feature-card" style="cursor:pointer;">
            <div style="font-size:32px;margin-bottom:12px;">${f.icon}</div>
            <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:6px;">${f.title}</div>
            <div style="font-size:var(--text-sm);color:var(--gray-500);line-height:1.5;">${f.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="background:linear-gradient(135deg,#5b3fe0 0%,#7c3aed 100%);border-radius:var(--radius-xl);padding:24px 28px;margin-bottom:28px;position:relative;overflow:hidden;cursor:pointer;"
      onclick="AC_STATE.navigate('wallet')">
      <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.06);border-radius:50%;top:-50px;right:-30px;pointer-events:none;"></div>
      <div style="position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.75);margin-bottom:6px;">🌱 Available Balance</div>
          <div style="font-size:32px;font-weight:700;color:white;letter-spacing:-1px;margin-bottom:8px;">${formatNaira(wallet.personalBalance)}</div>
          <div style="background:rgba(255,255,255,0.15);display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);padding:4px 12px;font-size:12px;color:white;font-weight:600;">
            🌱 Agric Credit: ${formatNaira(wallet.agricCredit)}
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button onclick="event.stopPropagation();AC_STATE.navigate('wallet')" style="background:white;color:#5b3fe0;border:none;border-radius:var(--radius-full);padding:9px 18px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Fund Wallet</button>
          <button onclick="event.stopPropagation();AC_STATE.navigate('wallet')" style="background:transparent;color:white;border:2px solid rgba(255,255,255,0.6);border-radius:var(--radius-full);padding:9px 18px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Withdraw</button>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;" class="home-two-col">
      <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;">
        <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;">
          <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Recent Orders</h3>
          <span onclick="AC_STATE.navigate('order-history')" style="font-size:var(--text-sm);color:var(--green);font-weight:600;cursor:pointer;">View All →</span>
        </div>
        <div style="padding:0 20px;">
          ${recentOrders.length === 0 ? `
            <div style="padding:32px 0;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">🌱</div>
              <div style="font-size:var(--text-md);font-weight:600;color:var(--gray-800);margin-bottom:4px;">No orders yet</div>
              <div style="font-size:var(--text-sm);color:var(--gray-500);">Start shopping on the Seed Market</div>
            </div>
          ` : recentOrders.map(o => `
            <div onclick="AC_STATE.navigate('order-history')" style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--gray-100);cursor:pointer;gap:12px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:40px;height:40px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${o.items[0].emoji}</div>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${o.id}</div>
                  <div style="font-size:var(--text-xs);color:var(--gray-400);">${o.date}</div>
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:var(--text-sm);font-weight:700;color:var(--green);">${formatNaira(o.total)}</div>
                <span class="badge badge-${o.status==='delivered'?'delivered':o.status==='in-transit'?'shipped':o.status==='cancelled'?'cancelled':'pending'}" style="font-size:10px;">${AC_STATE.getStatusLabel(o.status)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;">
        <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;">
          <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Featured Seeds</h3>
          <span onclick="AC_STATE.navigate('seed-market')" style="font-size:var(--text-sm);color:var(--green);font-weight:600;cursor:pointer;">View All →</span>
        </div>
        <div style="padding:0 20px;">
          ${featuredSeeds.map(s => `
            <div onclick="AC_STATE.selectedProduct=AC_DATA.seeds.find(x=>x.id==='${s.id}');AC_STATE.navigate('seed-detail')" style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--gray-100);cursor:pointer;gap:12px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:40px;height:40px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${s.emoji}</div>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</div>
                  <div style="font-size:var(--text-xs);color:var(--gray-400);">${s.seller}</div>
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:var(--text-sm);font-weight:700;color:var(--green);">${formatNaira(s.price)}</div>
                <div style="font-size:10px;color:var(--blue);font-weight:600;">✓ NASC</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;margin-bottom:28px;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Recent Transactions</h3>
        <span onclick="AC_STATE.navigate('wallet')" style="font-size:var(--text-sm);color:var(--green);font-weight:600;cursor:pointer;">View All →</span>
      </div>
      <div style="padding:0 20px;">
        ${recentTx.map(tx => `
          <div class="tx-item">
            <div class="tx-icon ${tx.type}">${tx.type==='credit'?'↓':'↑'}</div>
            <div class="tx-info">
              <div class="tx-title">${tx.title}</div>
              <div class="tx-sub">${tx.sub} - ${tx.date}</div>
            </div>
            <div class="tx-amount ${tx.type}">${tx.type==='credit'?'+':'-'}${formatNaira(tx.amount)}</div>
          </div>
        `).join('')}
      </div>
    </div>
    <div style="margin-bottom:16px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Quick Actions</h2>
      <div class="grid-4" style="gap:12px;">
        ${[
          { icon:'🌱', label:'Buy Seeds',   screen:'seed-market',  color:'#e8f5ee', border:'#d4eddc' },
          { icon:'🌱', label:'Fund Wallet', screen:'wallet',        color:'#ede9fe', border:'#ddd6fe' },
          { icon:'🌱', label:'My Orders',   screen:'order-history', color:'#dbeafe', border:'#bfdbfe' },
          { icon:'🌱', label:'Find Expert', screen:'experts',       color:'#fef3c7', border:'#fde68a' },
        ].map(a => `
          <div onclick="AC_STATE.navigate('${a.screen}')" style="background:${a.color};border:1px solid ${a.border};border-radius:var(--radius-md);padding:18px 14px;text-align:center;cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='var(--shadow)'"
            onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
            <div style="font-size:28px;margin-bottom:8px;">${a.icon}</div>
            <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${a.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  <style>@media(max-width:768px){.home-two-col{grid-template-columns:1fr!important}}</style>
  `;
},

seedMarket() {
  const seeds = AC_STATE.getFilteredSeeds();
  const categories = AC_DATA.categories;
  const regions = AC_DATA.regions;
  return `
  <div class="animate-fadeIn">
    <div class="page-header">
      <div>
        <h1 class="page-title">🌱 Seed Marketplace</h1>
        <p class="page-subtitle">Browse verified seeds and agricultural inputs from trusted suppliers</p>
      </div>
      <button onclick="AC_STATE.navigate('upload-product')" style="display:inline-flex;align-items:center;gap:8px;padding:11px 20px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;transition:var(--transition);white-space:nowrap;"
        onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='var(--green)'">+ List Your Seeds</button>
    </div>
    <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
      <select id="filter-category" onchange="AC_STATE.activeCategory=this.value;AC_STATE.navigate('seed-market')" style="height:40px;padding:0 32px 0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);color:var(--gray-700);font-family:var(--font);background:white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat right 12px center;appearance:none;cursor:pointer;">
        ${categories.map(c => `<option value="${c}" ${AC_STATE.activeCategory===c?'selected':''}>${c}</option>`).join('')}
      </select>
      <select id="filter-region" onchange="AC_STATE.activeRegion=this.value;AC_STATE.navigate('seed-market')" style="height:40px;padding:0 32px 0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);color:var(--gray-700);font-family:var(--font);background:white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat right 12px center;appearance:none;cursor:pointer;">
        ${regions.map(r => `<option value="${r}" ${AC_STATE.activeRegion===r?'selected':''}>${r}</option>`).join('')}
      </select>
      <div style="flex:1;min-width:200px;position:relative;">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400);font-size:14px;pointer-events:none;">🌱</span>
        <input type="text" placeholder="Search seeds..." value="${AC_STATE.searchQuery || ''}"
          oninput="AC_STATE.searchQuery=this.value;AC_STATE.navigate('seed-market')"
          style="width:100%;height:40px;padding:0 14px 0 36px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);color:var(--gray-900);background:white;outline:none;transition:var(--transition);"
          onfocus="this.style.borderColor='var(--green)';this.style.boxShadow='0 0 0 3px rgba(30,139,76,0.1)'"
          onblur="this.style.borderColor='var(--gray-200)';this.style.boxShadow='none'">
      </div>
      ${(AC_STATE.activeCategory !== 'All Crops' || AC_STATE.activeRegion !== 'All Regions' || AC_STATE.searchQuery) ? `
        <button onclick="AC_STATE.activeCategory='All Crops';AC_STATE.activeRegion='All Regions';AC_STATE.searchQuery='';AC_STATE.navigate('seed-market')" style="height:40px;padding:0 16px;background:var(--red-pale);color:var(--red);border:1px solid #fecaca;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;white-space:nowrap;">✕ Clear filters</button>
      ` : ''}
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
      <p style="font-size:var(--text-sm);color:var(--gray-500);">
        Showing <strong style="color:var(--gray-900);">${seeds.length}</strong> product${seeds.length !== 1 ? 's' : ''}
        ${AC_STATE.activeCategory !== 'All Crops' ? ` in <strong style="color:var(--green);">${AC_STATE.activeCategory}</strong>` : ''}
        ${AC_STATE.activeRegion !== 'All Regions' ? ` - <strong style="color:var(--green);">${AC_STATE.activeRegion}</strong>` : ''}
      </p>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:var(--text-xs);color:var(--gray-400);">Sort by:</span>
        <select style="height:32px;padding:0 24px 0 8px;border:1px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-xs);font-family:var(--font);color:var(--gray-600);background:white url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat right 8px center;appearance:none;cursor:pointer;">
          <option>Most Popular</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Highest Rated</option>
        </select>
      </div>
    </div>
    ${seeds.length === 0 ? `
      <div class="empty-state" style="padding:80px 20px;">
        <div style="font-size:56px;margin-bottom:16px;">🌱</div>
        <h3 style="font-size:var(--text-xl);color:var(--gray-800);margin-bottom:8px;">No seeds found</h3>
        <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:24px;">Try adjusting your filters or search term</p>
        <button onclick="AC_STATE.activeCategory='All Crops';AC_STATE.activeRegion='All Regions';AC_STATE.searchQuery='';AC_STATE.navigate('seed-market')" style="padding:10px 24px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Clear Filters</button>
      </div>
    ` : `
      <div class="grid-2" style="gap:20px;">
        ${seeds.map(s => {
          const bgColors = { green:'#e8f5ee', yellow:'#fef9c3', pink:'#fce7f3', orange:'#ffedd5', blue:'#dbeafe', purple:'#ede9fe' };
          const bg = bgColors[s.bgColor] || '#e8f5ee';
          const isWishlisted = AC_STATE.isWishlisted(s.id);
          return `
          <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;transition:var(--transition);"
            onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-3px)';this.style.borderColor='var(--gray-300)'"
            onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)';this.style.borderColor='var(--gray-200)'">
            <div onclick="AC_STATE.selectedProduct=AC_DATA.seeds.find(x=>x.id==='${s.id}');AC_STATE.navigate('seed-detail')"
              style="width:100%;height:180px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:80px;cursor:pointer;position:relative;">
              ${s.emoji}
              ${!s.inStock ? `<div style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.6);color:white;font-size:11px;font-weight:700;padding:4px 10px;border-radius:var(--radius-full);">Out of Stock</div>` : ''}
              ${s.nascVerified ? `<div style="position:absolute;top:12px;right:12px;background:var(--blue);color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);">✓ NASC</div>` : ''}
              <button onclick="event.stopPropagation();AC_STATE.toggleWishlist('${s.id}');AC_STATE.navigate('seed-market')" style="position:absolute;bottom:12px;right:12px;width:32px;height:32px;border-radius:50%;background:white;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.15);">${isWishlisted ? '❤️' : '🌱'}</button>
            </div>
            <div style="padding:16px;">
              <div onclick="AC_STATE.selectedProduct=AC_DATA.seeds.find(x=>x.id==='${s.id}');AC_STATE.navigate('seed-detail')" style="cursor:pointer;">
                <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:4px;line-height:1.3;">${s.name}</h3>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;"><span style="font-size:var(--text-xs);color:var(--gray-500);">🌱 ${s.region}</span></div>
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
                  <span style="color:#f59e0b;font-size:13px;">★</span>
                  <span style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${s.rating}</span>
                  <span style="font-size:var(--text-xs);color:var(--gray-400);">(${s.reviews} reviews)</span>
                  ${s.sellerVerified ? `<span style="font-size:10px;color:var(--green);font-weight:600;margin-left:4px;">✓ Verified Seller</span>` : ''}
                </div>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div>
                  <span style="font-size:var(--text-xl);font-weight:700;color:var(--green);">${formatNaira(s.price)}</span>
                  <span style="font-size:var(--text-xs);color:var(--gray-400);">/${s.unit}</span>
                </div>
                <span style="font-size:var(--text-xs);color:${s.stock > 50 ? 'var(--green)' : s.stock > 0 ? 'var(--amber)' : 'var(--red)'};font-weight:500;">
                  ${s.stock > 50 ? `${s.stock} in stock` : s.stock > 0 ? `Only ${s.stock} left` : 'Out of stock'}
                </span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <button onclick="AC_STATE.selectedProduct=AC_DATA.seeds.find(x=>x.id==='${s.id}');AC_STATE.navigate('seed-detail')" style="padding:9px 0;background:transparent;color:var(--green);border:1.5px solid var(--green);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;transition:var(--transition);"
                  onmouseover="this.style.background='var(--green-pale)'" onmouseout="this.style.background='transparent'">View Details</button>
                <button onclick="${s.inStock ? `AC_STATE.addToCart('${s.id}',1)` : `showToast('This product is out of stock','error')`}" style="padding:9px 0;background:${s.inStock ? 'var(--green)' : 'var(--gray-300)'};color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:${s.inStock ? 'pointer' : 'not-allowed'};transition:var(--transition);"
                  ${s.inStock ? `onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='var(--green)'"` : ''}>Add to Cart</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    `}
  </div>`;
},

seedDetail() {
  const s = AC_STATE.selectedProduct || AC_DATA.seeds[0];
  if (!s) return `<div class="result-screen"><p>Product not found.</p></div>`;
  const bgColors = { green:'#e8f5ee', yellow:'#fef9c3', pink:'#fce7f3', orange:'#ffedd5', blue:'#dbeafe', purple:'#ede9fe' };
  const bg = bgColors[s.bgColor] || '#e8f5ee';
  const isWishlisted = AC_STATE.isWishlisted(s.id);
  const related = AC_DATA.seeds.filter(x => x.category === s.category && x.id !== s.id).slice(0, 4);
  return `
  <div class="animate-fadeIn">
    <button onclick="AC_STATE.navigate('seed-market')" class="back-btn">← Back to Seeds</button>
    <div class="split-layout" style="margin-bottom:32px;">
      <div>
        <div style="background:${bg};border-radius:var(--radius-xl);width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:160px;margin-bottom:16px;position:relative;overflow:hidden;">
          ${s.emoji}
          ${s.nascVerified ? `<div style="position:absolute;top:16px;left:16px;background:var(--blue);color:white;font-size:12px;font-weight:700;padding:5px 12px;border-radius:var(--radius-full);">✓ NASC Certified</div>` : ''}
          ${!s.inStock ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;"><span style="color:white;font-size:var(--text-xl);font-weight:700;">Out of Stock</span></div>` : ''}
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
          ${[0,1,2,3].map(i => `
            <div style="aspect-ratio:1;background:${bg};border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;border:2px solid ${i===0?'var(--green)':'var(--gray-200)'};transition:var(--transition);"
              onmouseover="this.style.borderColor='var(--green)'" onmouseout="this.style.borderColor='${i===0?'var(--green)':'var(--gray-200)'}'">${s.emoji}</div>
          `).join('')}
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span class="badge badge-blue">${s.category}</span>
          <span class="badge ${s.inStock ? 'badge-green' : 'badge-red'}">${s.inStock ? 'In Stock' : 'Out of Stock'}</span>
          ${s.nascVerified ? `<span class="badge badge-blue">NASC #${s.nascNumber}</span>` : ''}
        </div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:8px;line-height:1.3;">${s.fullName}</h1>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span style="color:#f59e0b;font-size:16px;">★</span>
          <span style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">${s.rating}</span>
          <span style="font-size:var(--text-sm);color:var(--gray-400);">(${s.reviews} reviews)</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
          <span style="font-size:var(--text-sm);color:var(--gray-600);">Sold by:</span>
          <span style="font-size:var(--text-sm);font-weight:700;color:var(--green);">${s.seller}</span>
          ${s.sellerVerified ? `<span style="background:var(--green-pale);color:var(--green);font-size:11px;font-weight:700;padding:2px 8px;border-radius:var(--radius-full);border:1px solid var(--green-mid);">✓ Verified</span>` : ''}
        </div>
        <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;margin-bottom:20px;">
          <div style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:4px;">Price per unit</div>
          <div style="display:flex;align-items:baseline;gap:4px;">
            <span style="font-size:32px;font-weight:700;color:var(--green);letter-spacing:-1px;">${formatNaira(s.price)}</span>
            <span style="font-size:var(--text-base);color:var(--gray-400);">/ ${s.unit}</span>
          </div>
        </div>
        <div style="margin-bottom:20px;">
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);margin-bottom:10px;">Quantity</div>
          <div style="display:flex;align-items:center;gap:16px;">
            <div style="display:inline-flex;align-items:center;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);overflow:hidden;">
              <button onclick="const v=document.getElementById('qty-${s.id}');if(parseInt(v.value)>1)v.value=parseInt(v.value)-1;" style="width:40px;height:40px;background:var(--gray-100);border:none;font-size:20px;font-weight:600;color:var(--gray-700);cursor:pointer;transition:var(--transition);"
                onmouseover="this.style.background='var(--green)';this.style.color='white'" onmouseout="this.style.background='var(--gray-100)';this.style.color='var(--gray-700)'">−</button>
              <input type="number" id="qty-${s.id}" value="1" min="1" max="${s.stock}" style="width:56px;height:40px;text-align:center;border:none;font-size:var(--text-md);font-weight:700;color:var(--gray-900);background:white;outline:none;">
              <button onclick="const v=document.getElementById('qty-${s.id}');if(parseInt(v.value)<${s.stock})v.value=parseInt(v.value)+1;" style="width:40px;height:40px;background:var(--gray-100);border:none;font-size:20px;font-weight:600;color:var(--gray-700);cursor:pointer;transition:var(--transition);"
                onmouseover="this.style.background='var(--green)';this.style.color='white'" onmouseout="this.style.background='var(--gray-100)';this.style.color='var(--gray-700)'">+</button>
            </div>
            <span style="font-size:var(--text-sm);color:var(--gray-400);">${s.stock} ${s.unit}s available</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;margin-bottom:20px;align-items:center;">
          <button onclick="const qty=parseInt(document.getElementById('qty-${s.id}').value)||1;AC_STATE.addToCart('${s.id}',qty);" style="padding:13px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='var(--green)'">Add to Cart</button>
          <button onclick="const qty=parseInt(document.getElementById('qty-${s.id}').value)||1;AC_STATE.addToCart('${s.id}',qty);AC_STATE.navigate('cart');" style="padding:13px;background:transparent;color:var(--green);border:1.5px solid var(--green);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.background='var(--green-pale)'" onmouseout="this.style.background='transparent'">Buy Now</button>
          <button onclick="AC_STATE.toggleWishlist('${s.id}');AC_STATE.navigate('seed-detail')" style="width:46px;height:46px;border-radius:50%;background:white;border:1.5px solid var(--gray-200);font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--transition);"
            onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--gray-200)'">${isWishlisted ? '❤️' : '🌱'}</button>
        </div>
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;">
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);margin-bottom:12px;">Quick Specs</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${[
              { label:'Region', value:s.region },
              { label:'Category', value:s.category },
              s.germination ? { label:'Germination', value:s.germination } : null,
              s.purity ? { label:'Purity', value:s.purity } : null,
              { label:'Stock', value:`${s.stock} ${s.unit}s` },
              { label:'Seller', value:s.seller },
            ].filter(Boolean).map(spec => `
              <div>
                <div style="font-size:var(--text-xs);color:var(--gray-400);margin-bottom:2px;">${spec.label}</div>
                <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${spec.value}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
    <div style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;margin-bottom:32px;">
      <div class="tabs" style="padding:0 20px;border-bottom:2px solid var(--gray-100);margin-bottom:0;">
        ${['Description','Specifications','Reviews','Shipping'].map((tab,i) => `
          <button onclick="switchDetailTab(${i})" class="tab-item ${i===0?'active':''}" id="detail-tab-${i}" style="font-family:var(--font);">${tab}${tab==='Reviews'?` (${s.reviews})`:''}</button>
        `).join('')}
      </div>
      <div id="detail-panel-0" style="padding:24px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:10px;">Product Overview</h3>
        <p style="font-size:var(--text-base);color:var(--gray-600);line-height:1.7;margin-bottom:20px;">${s.description}</p>
        ${s.features && s.features.length ? `
          <h4 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:10px;">Key Features:</h4>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${s.features.map(f => `<div style="display:flex;align-items:center;gap:6px;font-size:var(--text-sm);color:var(--gray-700);"><span style="color:var(--green);font-weight:700;">✓</span> ${f}</div>`).join('')}
          </div>
        ` : ''}
      </div>
      <div id="detail-panel-1" style="padding:24px;display:none;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
          ${[
            { label:'Product Name', value:s.fullName },
            { label:'Category', value:s.category },
            { label:'Region', value:s.region },
            { label:'Seller', value:s.seller },
            s.germination ? { label:'Germination Rate', value:s.germination } : null,
            s.purity ? { label:'Seed Purity', value:s.purity } : null,
            s.nascVerified ? { label:'NASC Number', value:s.nascNumber } : null,
            { label:'Unit', value:s.unit },
            { label:'Stock', value:`${s.stock} ${s.unit}s` },
            { label:'Price', value:`${formatNaira(s.price)} / ${s.unit}` },
          ].filter(Boolean).map((spec,i) => `
            <div style="padding:12px 16px;border-bottom:1px solid var(--gray-100);${i%2===0?'border-right:1px solid var(--gray-100);':''}background:${i%2===0?'var(--gray-50)':'white'};">
              <div style="font-size:var(--text-xs);color:var(--gray-400);margin-bottom:2px;">${spec.label}</div>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${spec.value}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="detail-panel-2" style="padding:24px;display:none;">
        <div style="display:flex;align-items:center;gap:24px;margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--gray-100);">
          <div style="text-align:center;">
            <div style="font-size:56px;font-weight:700;color:var(--gray-900);line-height:1;">${s.rating}</div>
            <div style="color:#f59e0b;font-size:20px;margin:4px 0;">★★★★★</div>
            <div style="font-size:var(--text-sm);color:var(--gray-400);">${s.reviews} reviews</div>
          </div>
          <div style="flex:1;">
            ${[5,4,3,2,1].map(star => {
              const pct = star===5?65:star===4?20:star===3?10:star===2?3:2;
              return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="font-size:var(--text-xs);color:var(--gray-600);width:8px;">${star}</span>
                <span style="color:#f59e0b;font-size:12px;">★</span>
                <div style="flex:1;height:8px;background:var(--gray-200);border-radius:4px;overflow:hidden;">
                  <div style="width:${pct}%;height:100%;background:#f59e0b;border-radius:4px;"></div>
                </div>
                <span style="font-size:var(--text-xs);color:var(--gray-400);width:28px;">${pct}%</span>
              </div>`;
            }).join('')}
          </div>
        </div>
        ${[
          { name:'Aminu Ibrahim', rating:5, date:'Feb 12, 2026', comment:'Excellent germination rate! Almost all seeds sprouted within 7 days. Very happy with this purchase.' },
          { name:'Chidinma Okonkwo', rating:4, date:'Feb 5, 2026', comment:'Good quality seeds. Delivery was fast and packaging was secure. Will order again.' },
          { name:'Bello Garba', rating:5, date:'Jan 28, 2026', comment:'NASC certification gives me confidence. My yield this season was the best ever.' },
        ].map(r => `
          <div style="padding:16px 0;border-bottom:1px solid var(--gray-100);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;border-radius:50%;background:var(--green-pale);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--green);">${r.name[0]}</div>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${r.name}</div>
                  <div style="font-size:var(--text-xs);color:var(--gray-400);">${r.date}</div>
                </div>
              </div>
              <div style="color:#f59e0b;font-size:14px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
            </div>
            <p style="font-size:var(--text-sm);color:var(--gray-600);line-height:1.6;">${r.comment}</p>
          </div>
        `).join('')}
      </div>
      <div id="detail-panel-3" style="padding:24px;display:none;">
        ${[
          { icon:'🌱', title:'Standard Delivery', desc:'3-5 business days - ₦3,500 flat rate nationwide' },
          { icon:'⚡', title:'Express Delivery', desc:'1-2 business days - ₦7,000 (Lagos, Abuja, Kano, Port Harcourt)' },
          { icon:'🌱', title:'Agro Hub Pickup', desc:'Free pickup from any AgroConnect Agro Hub near you' },
          { icon:'🌱', title:'Packaging', desc:'Seeds are packaged in moisture-proof, tamper-evident bags' },
          { icon:'🌱', title:'Returns Policy', desc:'Report issues within 7 days of delivery for replacement or refund' },
        ].map(item => `
          <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid var(--gray-100);">
            <div style="width:40px;height:40px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${item.icon}</div>
            <div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);margin-bottom:2px;">${item.title}</div>
              <div style="font-size:var(--text-sm);color:var(--gray-500);">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ${related.length ? `
      <div style="margin-bottom:16px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Related Products</h2>
        <div class="grid-4" style="gap:16px;">
          ${related.map(r => {
            const rbg = bgColors[r.bgColor] || '#e8f5ee';
            return `<div onclick="AC_STATE.selectedProduct=AC_DATA.seeds.find(x=>x.id==='${r.id}');AC_STATE.navigate('seed-detail')"
              style="background:white;border-radius:var(--radius-md);border:1px solid var(--gray-200);overflow:hidden;cursor:pointer;transition:var(--transition);"
              onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-2px)'"
              onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)'">
              <div style="height:100px;background:${rbg};display:flex;align-items:center;justify-content:center;font-size:48px;">${r.emoji}</div>
              <div style="padding:12px;">
                <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.name}</div>
                <div style="font-size:var(--text-md);font-weight:700;color:var(--green);">${formatNaira(r.price)}<span style="font-size:var(--text-xs);color:var(--gray-400);">/${r.unit}</span></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    ` : ''}
  </div>
  <script>
    function switchDetailTab(idx) {
      [0,1,2,3].forEach(i => {
        const tab = document.getElementById('detail-tab-' + i);
        const panel = document.getElementById('detail-panel-' + i);
        if (tab) tab.classList.toggle('active', i === idx);
        if (panel) panel.style.display = i === idx ? 'block' : 'none';
      });
    }
  </script>`;
},

cart()            { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Cart</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
checkout()        { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Checkout</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
payment()         { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Payment</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
orderConfirm()    { return `<div class="result-screen"><div style="font-size:64px;">✅</div><h2 style="margin-top:16px;">Order Confirmed</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
orderHistory()    { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Order History</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
orderDetail()     { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Order Detail</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
wishlist()        { return `<div class="result-screen"><div style="font-size:64px;">❤️</div><h2 style="margin-top:16px;">Wishlist</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
sellerDashboard() { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Seller Dashboard</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
myListings()      { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">My Listings</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
uploadProduct()   { return `<div class="result-screen"><div style="font-size:64px;">➕</div><h2 style="margin-top:16px;">Upload Product</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
ordersReceived()  { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Orders Received</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
sellerAnalytics() { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Seller Analytics</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
expertDashboard() { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Expert Dashboard</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
myCourses()       { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">My Courses</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
courseAnalytics() { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Course Analytics</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
createCourse()    { return `<div class="result-screen"><div style="font-size:64px;">➕</div><h2 style="margin-top:16px;">Create Course</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
coopDashboard()   { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Cooperative Dashboard</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
coopMembers()     { return `<div class="result-screen"><div style="font-size:64px;">🌱‍🌱‍🌱‍🌱</div><h2 style="margin-top:16px;">Members</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
coopLoan()        { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Loan Request</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
coopWallet()      { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Group Wallet</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
instDashboard()   { return `<div class="result-screen"><div style="font-size:64px;">🌱️</div><h2 style="margin-top:16px;">Institution Dashboard</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
instCompliance()  { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Spend Compliance</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
instLoanQueue()   { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Loan Queue</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
instGeoMap()      { return `<div class="result-screen"><div style="font-size:64px;">🌱️</div><h2 style="margin-top:16px;">Geo Map</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
wallet()          { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Wallet</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
financing()       { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Financing</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
logistics()       { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Logistics</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
learning()        { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Learning</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
experts()         { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Experts</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
expertProfile()   { return `<div class="result-screen"><div style="font-size:64px;">🌱‍🌱</div><h2 style="margin-top:16px;">Expert Profile</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
notifications()   { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Notifications</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
profile()         { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">Profile</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
settings()        { return `<div class="result-screen"><div style="font-size:64px;">⚙️</div><h2 style="margin-top:16px;">Settings</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },
whatsapp()        { return `<div class="result-screen"><div style="font-size:64px;">🌱</div><h2 style="margin-top:16px;">WhatsApp Bot</h2><p style="margin-top:8px;color:#6b7280;">Coming next!</p></div>`; },

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

initOtpInputs() {
  const inputs = document.querySelectorAll('.otp-input');
  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g,'');
      if (input.value && i < inputs.length - 1) inputs[i+1].focus();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) inputs[i-1].focus();
    });
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g,'');
      [...paste].forEach((char, j) => { if (inputs[i+j]) inputs[i+j].value = char; });
      const next = inputs[Math.min(i + paste.length, inputs.length-1)];
      if (next) next.focus();
    });
  });
  if (inputs.length) inputs[0].focus();
},

initSeedMarketFilters() {},
initCart() {},
initInstCharts() {},

};

/* ═══════════════════════════════════════════════════════════
   AUTH HANDLERS
═══════════════════════════════════════════════════════════ */

function handleLogin() {
  const email    = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;
  const errorEl  = document.getElementById('login-error');
  if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }
  if (!email) {
    if (errorEl) { errorEl.textContent = 'Please enter your email or phone number.'; errorEl.style.display = 'block'; }
    return;
  }
  if (!password) {
    if (errorEl) { errorEl.textContent = 'Please enter your password.'; errorEl.style.display = 'block'; }
    return;
  }
  if (password.length < 6) {
    if (errorEl) { errorEl.textContent = 'Password must be at least 6 characters.'; errorEl.style.display = 'block'; }
    return;
  }
  const btn = document.getElementById('login-btn');
  if (btn) { btn.textContent = 'Logging in...'; btn.disabled = true; btn.style.opacity = '0.7'; }
  setTimeout(() => {
    const storedName = AC_STATE._signupName || '';
    const nameFromEmail = email.includes('@') ? email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : email;
    const finalName = storedName || nameFromEmail;
    const initials = finalName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    AC_STATE.user.name     = finalName;
    AC_STATE.user.initials = initials;
    AC_STATE.user.email    = email;
    const role = AC_STATE._pendingRole || 'buyer';
    showApp(role);
    showToast('Welcome back, ' + finalName.split(' ')[0] + '! 🌱', 'success');
  }, 1200);
}

function handleSignup(role) {
  let name = '', email = '', phone = '', password = '', terms = false, errorId = '';
  if (role === 'buyer') {
    name = document.getElementById('buyer-name')?.value.trim();
    email = document.getElementById('buyer-email')?.value.trim();
    phone = document.getElementById('buyer-phone')?.value.trim();
    password = document.getElementById('buyer-password')?.value;
    terms = document.getElementById('buyer-terms')?.checked;
    errorId = 'signup-buyer-error';
  } else if (role === 'seller') {
    name = document.getElementById('seller-name')?.value.trim();
    email = document.getElementById('seller-email')?.value.trim();
    phone = document.getElementById('seller-phone')?.value.trim();
    password = document.getElementById('seller-password')?.value;
    terms = document.getElementById('seller-terms')?.checked;
    errorId = 'signup-seller-error';
  } else if (role === 'expert') {
    name = document.getElementById('expert-name')?.value.trim();
    email = document.getElementById('expert-email')?.value.trim();
    phone = document.getElementById('expert-phone')?.value.trim();
    password = document.getElementById('expert-password')?.value;
    terms = document.getElementById('expert-terms')?.checked;
    errorId = 'signup-expert-error';
  } else if (role === 'cooperative') {
    name = document.getElementById('coop-manager-name')?.value.trim();
    email = document.getElementById('coop-manager-email')?.value.trim();
    phone = document.getElementById('coop-manager-phone')?.value.trim();
    password = document.getElementById('coop-password')?.value;
    terms = document.getElementById('coop-terms')?.checked;
    errorId = 'signup-coop-error';
  } else if (role === 'institution') {
    name = document.getElementById('inst-contact-name')?.value.trim();
    email = document.getElementById('inst-contact-email')?.value.trim();
    phone = document.getElementById('inst-contact-phone')?.value.trim();
    password = document.getElementById('inst-password')?.value;
    terms = document.getElementById('inst-terms')?.checked;
    errorId = 'signup-inst-error';
  }
  const errorEl = document.getElementById(errorId);
  const showError = (msg) => {
    if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; errorEl.scrollIntoView({behavior:'smooth',block:'center'}); }
  };
  if (!name)               { showError('Please enter your full name.'); return; }
  if (!email)              { showError('Please enter your email address.'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { showError('Please enter a valid email address.'); return; }
  if (!phone)              { showError('Please enter your phone number.'); return; }
  if (!password)           { showError('Please create a password.'); return; }
  if (password.length < 6) { showError('Password must be at least 6 characters.'); return; }
  if (!terms)              { showError('Please agree to the Terms & Conditions to continue.'); return; }
  if (errorEl) errorEl.style.display = 'none';
  AC_STATE._signupName  = name;
  AC_STATE._signupEmail = email;
  AC_STATE._signupPhone = '+234' + phone;
  AC_STATE._pendingRole = role;
  const initials = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  AC_STATE.user.name     = name;
  AC_STATE.user.initials = initials;
  AC_STATE.user.email    = email;
  AC_STATE.user.phone    = '+234' + phone;
  const prefix = role === 'expert' ? 'EXP' : role === 'cooperative' ? 'COOP' : role === 'institution' ? 'INST' : 'SEL';
  AC_STATE._pendingAppId = prefix + '-2026-' + String(Math.floor(10000 + Math.random()*90000));
  showToast('Creating your account...', '');
  setTimeout(() => {
    if (role === 'buyer') { showAuthScreen('otp'); }
    else { showAuthScreen('underReview'); }
  }, 1200);
}

function handleOtp() {
  const inputs = document.querySelectorAll('.otp-input');
  const code = [...inputs].map(i => i.value).join('');
  if (code.length < 6) { showToast('Please enter the 6-digit code', 'error'); return; }
  showToast('Verifying...', '');
  setTimeout(() => {
    const role = AC_STATE._pendingRole || 'buyer';
    showApp(role);
    showToast('Welcome to AgroConnect, ' + AC_STATE.user.name.split(' ')[0] + '! 🌱', 'success');
  }, 1200);
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;
  const btn = input.nextElementSibling;
  input.type = input.type === 'password' ? 'text' : 'password';
  if (btn) btn.textContent = input.type === 'password' ? '🌱' : '🌱';
}