/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/auth/auth.js
   Roles: farmer | supplier | expert | cooperative | institution
   ═══════════════════════════════════════════════════════════ */

import AC_SCREENS from '../../screens-init.js';

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   SPLASH
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   ROLE SELECTION
───────────────────────────────────────────── */
roleSelection() {
  const topRoles = [
    {
      screen: 'signupFarmer',
      emoji: '🌱‍🌱', bg: '#e8f5ee',
      title: "I'm a Farmer",
      desc: 'Buy agricultural inputs - seeds, fertilizers, crop protection, equipment. Sell your farm produce.',
      btn: 'Continue as Farmer', btnColor: '#1E8B4C'
    },
    {
      screen: 'signupSupplier',
      emoji: '🌱', bg: '#fef9c3',
      title: "I'm an Agro-Supplier",
      desc: 'List and sell seeds, fertilizers, agrochemicals and farm equipment. Verified dealers only.',
      btn: 'Continue as Agro-Supplier', btnColor: '#1E8B4C'
    },
    {
      screen: 'signupExpert',
      emoji: '🌱', bg: '#ede9fe',
      title: "I'm an Expert",
      desc: 'Create and monetize courses, offer paid consultations as a certified agricultural professional.',
      btn: 'Continue as Expert', btnColor: '#1E8B4C'
    },
  ];
  const bottomRoles = [
    {
      screen: 'signupCoop',
      emoji: '🌱', bg: '#e0f0fb',
      title: 'Cooperative Manager',
      desc: 'Manage your cooperative, access group loans and bulk input purchases from financial institutions.',
      btn: 'Continue as Cooperative', btnColor: '#0EA5E9'
    },
    {
      screen: 'signupInstitution',
      emoji: '🌱️', bg: '#eeeafc',
      title: 'Institution / Bank',
      desc: 'Financial institutions - disburse loans, monitor spend compliance and track portfolio in real time.',
      btn: 'Continue as Institution', btnColor: '#5b3fe0'
    },
  ];

  const card = (r) => `
    <div onclick="showAuthScreen('${r.screen}')" style="
      background:white;border-radius:16px;padding:28px 20px 24px;
      cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.08);
      border:2px solid transparent;transition:all .2s;
      text-align:center;display:flex;flex-direction:column;align-items:center;
    "
    onmouseover="this.style.borderColor='${r.btnColor}';this.style.transform='translateY(-3px)'"
    onmouseout="this.style.borderColor='transparent';this.style.transform='translateY(0)'">
      <div style="width:72px;height:72px;background:${r.bg};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:14px;">${r.emoji}</div>
      <h3 style="font-size:17px;font-weight:700;color:#111827;margin-bottom:8px;">${r.title}</h3>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;margin-bottom:18px;flex:1;">${r.desc}</p>
      <button style="width:100%;padding:11px;background:${r.btnColor};color:white;border:none;border-radius:10px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">${r.btn}</button>
    </div>`;

  return `
  <div style="min-height:100vh;background:#f9fafb;">
    <div style="background:linear-gradient(135deg,#1E8B4C,#25A55A);padding:36px 24px 80px;text-align:center;">
      <div style="width:56px;height:56px;background:white;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#1E8B4C;margin:0 auto 16px;">A</div>
      <h1 style="color:white;font-size:26px;font-weight:800;margin-bottom:6px;">Welcome to AgroConnect</h1>
      <p style="color:rgba(255,255,255,0.85);font-size:14px;">Choose how you want to get started</p>
    </div>
    <div style="max-width:1100px;margin:-52px auto 0;padding:0 20px 48px;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px;" class="role-grid-3">
        ${topRoles.map(card).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:28px;" class="role-grid-2">
        ${bottomRoles.map(card).join('')}
      </div>
      <p style="text-align:center;font-size:14px;color:#6b7280;">
        Already have an account?
        <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;"> Log in</span>
      </p>
    </div>
  </div>
  <style>
    @media(max-width:768px){.role-grid-3,.role-grid-2{grid-template-columns:1fr!important}}
  </style>`;
},

/* ─────────────────────────────────────────────
   LOGIN
───────────────────────────────────────────── */
login() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:28px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:14px;margin-bottom:40px;">Nigeria's agricultural input & finance platform</p>
        <div style="font-size:60px;margin-bottom:32px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Access verified inputs & suppliers','Connect with agricultural experts','Track orders & deliveries','Cooperative loan disbursements'].map(f=>`
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
      <div class="form-group">
        <label class="form-label">Email or Phone</label>
        <input type="text" class="form-input" placeholder="Enter your email or phone number" id="login-email">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password</label>
        <input type="password" class="form-input" placeholder="Enter your password" id="login-password" style="padding-right:48px;">
        <button onclick="togglePassword('login-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:#6b7280;">
          <input type="checkbox" style="accent-color:#1E8B4C;"> Remember me
        </label>
        <span onclick="showAuthScreen('forgotPassword')" style="color:#1E8B4C;font-size:13px;font-weight:600;cursor:pointer;">Forgot password?</span>
      </div>
      <button id="login-btn" onclick="handleLogin()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:20px;">Log in</button>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
        <span style="color:#9ca3af;font-size:12px;white-space:nowrap;">or continue with</span>
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px;">
        ${AC_SCREENS._socialBtn('google')}
        ${AC_SCREENS._socialBtn('facebook')}
        ${AC_SCREENS._socialBtn('apple')}
      </div>
      <p style="text-align:center;font-size:14px;color:#6b7280;">Don't have an account? <span onclick="showAuthScreen('roleSelection')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Sign up</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SIGNUP - FARMER
───────────────────────────────────────────── */
signupFarmer() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Join thousands of Nigerian farmers</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱‍🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['Buy seeds, fertilizers & chemicals','Connect with agric experts','Track your orders & deliveries','List your farm produce for sale'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:26px;font-weight:800;color:#111827;margin-bottom:4px;">Create Farmer Account</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:28px;">Get started with your free account today</p>
      <div class="form-group">
        <label class="form-label">Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Enter your full name" id="farmer-name">
      </div>
      <div class="form-group">
        <label class="form-label">Email Address <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Enter your email" id="farmer-email">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Enter phone number" id="farmer-phone">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">State <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="farmer-state">
          <option value="">Select your state</option>
          ${['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'].map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Primary Crop / Farm Type</label>
        <select class="form-select" id="farmer-crop">
          <option value="">Select primary crop (optional)</option>
          <option>Maize</option><option>Rice</option><option>Sorghum</option><option>Cassava</option>
          <option>Yam</option><option>Cowpea</option><option>Soybean</option><option>Groundnut</option>
          <option>Tomato</option><option>Onion</option><option>Pepper</option><option>Mixed farming</option>
        </select>
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password (min. 6 characters)" id="farmer-password" style="padding-right:48px;">
        <button onclick="togglePassword('farmer-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="farmer-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('farmer')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Create Account</button>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
        <span style="color:#9ca3af;font-size:12px;white-space:nowrap;">or continue with</span>
        <hr style="flex:1;border:none;border-top:1px solid #e5e7eb;">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px;">
        ${AC_SCREENS._socialBtn('google')}
        ${AC_SCREENS._socialBtn('facebook')}
        ${AC_SCREENS._socialBtn('apple')}
      </div>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SIGNUP - AGRO-SUPPLIER
───────────────────────────────────────────── */
signupSupplier() {
  return `
  <div class="auth-layout">
    <div class="auth-left">
      <div style="position:relative;z-index:1;text-align:center;">
        <div style="width:72px;height:72px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:800;color:#1E8B4C;margin:0 auto 20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">A</div>
        <h2 style="color:white;font-size:24px;font-weight:800;margin-bottom:8px;">AgroConnect</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin-bottom:32px;">Nigeria's trusted input supply platform</p>
        <div style="font-size:72px;margin-bottom:28px;">🌱</div>
        <div style="text-align:left;display:inline-block;">
          ${['List seeds, fertilizers & agrochemicals','Reach thousands of verified farmers','Get paid securely via wallet','Track orders & manage inventory'].map(f=>`
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="width:18px;height:18px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0;">✓</div>
            <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:500;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="auth-right">
      <button onclick="showAuthScreen('roleSelection')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:28px;padding:0;font-family:inherit;">← Back</button>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:4px;">Register as Agro-Supplier</h2>
      <p style="color:#6b7280;font-size:13px;margin-bottom:8px;">For licensed agro-dealers, seed companies and input distributors</p>
      <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:12px;color:#92400E;">
        ⚠️ Your business documents will be verified before approval (24-48 hours)
      </div>
      <div class="form-group">
        <label class="form-label">Business / Company Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. SEEDCO Nigeria Ltd" id="supplier-business">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Person Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Full name of primary contact" id="supplier-name">
      </div>
      <div class="form-group">
        <label class="form-label">Business Email <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Official business email" id="supplier-email">
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Business phone number" id="supplier-phone">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Business Type <span style="color:#dc2626;">*</span></label>
        <select class="form-select" id="supplier-type">
          <option value="">Select business type</option>
          <option>Seed Company / Distributor</option>
          <option>Fertilizer Dealer</option>
          <option>Agrochemical Dealer</option>
          <option>Farm Equipment Dealer</option>
          <option>General Agro-Dealer (mixed inputs)</option>
          <option>Post-Harvest / Storage Supplier</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">NASC / NAFDAC Registration Number <span style="color:#9ca3af;font-weight:400;font-size:12px;">(if applicable)</span></label>
        <input type="text" class="form-input" placeholder="e.g. NASC-2024-00234 or NAFDAC-FERT-2024-0021" id="supplier-reg">
      </div>
      <div class="form-group">
        <label class="form-label">CAC Registration Number <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. RC-1234567" id="supplier-cac">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password (min. 6 characters)" id="supplier-password" style="padding-right:48px;">
        <button onclick="togglePassword('supplier-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <div class="form-group">
        <label class="form-label">Upload CAC Certificate or Business Registration <span style="color:#dc2626;">*</span></label>
        <div style="border:2px dashed #D1D5DB;border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:#F9FAFB;"
          onclick="showToast('File upload coming soon','')">
          <div style="font-size:28px;margin-bottom:6px;">🌱</div>
          <div style="font-size:13px;color:#6B7280;">Click to upload</div>
          <div style="font-size:11px;color:#9CA3AF;">PDF, JPG up to 10MB</div>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" id="supplier-terms" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I confirm all information is accurate and I agree to the <span style="color:#1E8B4C;font-weight:600;">Supplier Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('supplier')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Submit Application</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SIGNUP - EXPERT (unchanged content, kept for completeness)
───────────────────────────────────────────── */
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
        <button onclick="togglePassword('expert-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <div style="font-size:14px;font-weight:700;color:#374151;margin-bottom:14px;padding-top:8px;border-top:1px solid #f3f4f6;">Professional Information</div>
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
        <label class="form-label">Specialization <span style="color:#dc2626;">*</span></label>
        <select class="form-select">
          <option value="">Select specialization</option>
          <option>Crop Production</option><option>Soil Science</option><option>Pest Control</option>
          <option>Agribusiness</option><option>Livestock</option><option>Irrigation</option><option>Post-Harvest</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Years of Experience <span style="color:#dc2626;">*</span></label>
        <input type="number" class="form-input" placeholder="e.g., 5" min="1" max="50">
      </div>
      <div class="form-group">
        <label class="form-label">Professional Bio <span style="color:#dc2626;">*</span></label>
        <textarea class="form-textarea" placeholder="Brief description of your expertise and experience..." style="min-height:80px;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Credentials <span style="color:#dc2626;">*</span></label>
        <div style="border:2px dashed #D1D5DB;border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:#F9FAFB;"
          onclick="showToast('File upload coming soon','')">
          <div style="font-size:28px;margin-bottom:6px;">🌱</div>
          <div style="font-size:13px;color:#6B7280;">Click to upload certificates</div>
          <div style="font-size:11px;color:#9CA3AF;">PDF, JPG up to 10MB</div>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Expert Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('expert')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Submit Application</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SIGNUP - COOPERATIVE (unchanged)
───────────────────────────────────────────── */
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
          ${['Manage all your members digitally','Apply for group loans from BOA','Track spend-locked disbursements','Generate compliance reports'].map(f=>`
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
      <div class="form-group">
        <label class="form-label">Cooperative Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. Kaduna North Farmers Cooperative">
      </div>
      <div class="form-group">
        <label class="form-label">FCA Registration Number <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. FCA/KD/2018/00234">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label class="form-label">State <span style="color:#dc2626;">*</span></label>
          <select class="form-select">
            <option value="">Select State</option>
            ${['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'].map(s=>`<option>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">LGA <span style="color:#dc2626;">*</span></label>
          <input type="text" class="form-input" placeholder="Enter LGA">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Number of Members <span style="color:#dc2626;">*</span></label>
        <input type="number" class="form-input" placeholder="e.g. 120" min="2">
      </div>
      <div class="form-group">
        <label class="form-label">Primary Crop <span style="color:#dc2626;">*</span></label>
        <select class="form-select">
          <option value="">Select primary crop</option>
          <option>Maize</option><option>Rice</option><option>Sorghum</option><option>Cassava</option>
          <option>Yam</option><option>Cowpea</option><option>Soybean</option><option>Groundnut</option><option>Tomato</option>
        </select>
      </div>
      <div style="font-size:14px;font-weight:700;color:#374151;margin-bottom:14px;padding-top:8px;border-top:1px solid #f3f4f6;">Manager Information</div>
      <div class="form-group">
        <label class="form-label">Manager Full Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Your full name as manager">
      </div>
      <div class="form-group">
        <label class="form-label">Manager Phone <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Manager phone number">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Manager Email <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Manager email address">
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password" id="coop-password" style="padding-right:48px;">
        <button onclick="togglePassword('coop-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Cooperative Certificate <span style="color:#dc2626;">*</span></label>
        <div style="border:2px dashed #D1D5DB;border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:#F9FAFB;"
          onclick="showToast('File upload coming soon','')">
          <div style="font-size:28px;margin-bottom:6px;">🌱</div>
          <div style="font-size:13px;color:#6B7280;">Click to upload cooperative certificate</div>
          <div style="font-size:11px;color:#9CA3AF;">PDF, JPG up to 10MB</div>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('cooperative')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Register Cooperative</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SIGNUP - INSTITUTION (unchanged)
───────────────────────────────────────────── */
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
      <div class="form-group">
        <label class="form-label">Institution Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="e.g. Bank of Agriculture">
      </div>
      <div class="form-group">
        <label class="form-label">Institution Type <span style="color:#dc2626;">*</span></label>
        <select class="form-select">
          <option value="">Select type</option>
          <option>Development Finance Institution</option>
          <option>Commercial Bank</option>
          <option>Microfinance Bank</option>
          <option>Government Agency</option>
          <option>NGO / Development Partner</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">RC / CBN License Number <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="CBN license or RC number">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Person Name <span style="color:#dc2626;">*</span></label>
        <input type="text" class="form-input" placeholder="Full name of primary contact">
      </div>
      <div class="form-group">
        <label class="form-label">Official Email <span style="color:#dc2626;">*</span></label>
        <input type="email" class="form-input" placeholder="Official email address">
      </div>
      <div class="form-group">
        <label class="form-label">Official Phone <span style="color:#dc2626;">*</span></label>
        <div class="phone-input-wrap">
          <span class="phone-prefix">+234</span>
          <input type="tel" placeholder="Official phone number">
        </div>
      </div>
      <div class="form-group" style="position:relative;">
        <label class="form-label">Password <span style="color:#dc2626;">*</span></label>
        <input type="password" class="form-input" placeholder="Create a password" id="inst-password" style="padding-right:48px;">
        <button onclick="togglePassword('inst-password')" style="position:absolute;right:14px;bottom:12px;background:none;border:none;cursor:pointer;font-size:16px;">🌱</button>
      </div>
      <div class="form-group">
        <label class="form-label">Upload Authorization Letter <span style="color:#dc2626;">*</span></label>
        <div style="border:2px dashed #D1D5DB;border-radius:10px;padding:20px;text-align:center;cursor:pointer;background:#F9FAFB;"
          onclick="showToast('File upload coming soon','')">
          <div style="font-size:28px;margin-bottom:6px;">🌱</div>
          <div style="font-size:13px;color:#6B7280;">Upload official authorization on letterhead</div>
          <div style="font-size:11px;color:#9CA3AF;">PDF up to 10MB</div>
        </div>
      </div>
      <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-bottom:24px;">
        <input type="checkbox" style="width:16px;height:16px;margin-top:2px;accent-color:#1E8B4C;flex-shrink:0;">
        <span style="font-size:13px;color:#6b7280;line-height:1.5;">I agree to the <span style="color:#1E8B4C;font-weight:600;">Institutional Terms & Conditions</span></span>
      </label>
      <button onclick="handleSignup('institution')" style="width:100%;padding:14px;background:#5b3fe0;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Submit Registration</button>
      <p style="text-align:center;font-size:13px;color:#6b7280;">Already have an account? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   OTP
───────────────────────────────────────────── */
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
      <button onclick="handleOtp()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Verify Code</button>
      <p style="color:#6b7280;font-size:13px;">
        Didn't receive the code?
        <span style="color:#1E8B4C;font-weight:700;cursor:pointer;" onclick="resendOtp()"> Resend</span>
      </p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   UNDER REVIEW
───────────────────────────────────────────── */
underReview() {
  const roleLabels = {
    supplier: 'Agro-Supplier', expert: 'Agricultural Expert',
    cooperative: 'Cooperative', institution: 'Institution'
  };
  const role = AC_STATE._pendingRole || 'supplier';
  const appId = AC_STATE._pendingAppId || 'APP-2026-00123';
  const label = roleLabels[role] || 'Supplier';
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:44px 36px;max-width:500px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:80px;height:80px;background:#fef3c7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">⏳</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:10px;">Application Under Review</h2>
      <p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:24px;">
        Thank you for applying to join as an <strong>${label}</strong>. We're reviewing your documents and will get back to you within 24-48 hours.
      </p>
      <div style="background:#f9fafb;border-radius:12px;padding:16px 24px;margin-bottom:14px;text-align:left;">
        <div style="font-size:12px;color:#9ca3af;margin-bottom:4px;">Application ID</div>
        <div style="font-size:17px;font-weight:700;color:#111827;">${appId}</div>
      </div>
      <div style="background:#eff6ff;border-radius:12px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">🌱</span>
        <span style="font-size:13px;color:#1d6fa4;font-weight:500;">Confirmation email sent to your inbox</span>
      </div>
      <button onclick="showAuthScreen('login')" style="width:100%;max-width:280px;padding:13px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Go to Login</button>
      <p style="font-size:13px;color:#9ca3af;">Questions? <span style="color:#1E8B4C;font-weight:600;cursor:pointer;">support@agroconnect.com</span></p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   REJECTED
───────────────────────────────────────────── */
rejected() {
  const appId = AC_STATE._pendingAppId || 'APP-2026-00123';
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:44px 36px;max-width:500px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:80px;height:80px;background:#fee2e2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">❌</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:10px;">Application Not Approved</h2>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin-bottom:24px;">We were unable to verify your application. Please review the reason below and reapply with the correct information.</p>
      <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:left;">
        <div style="font-size:13px;font-weight:700;color:#d97706;margin-bottom:6px;">Reason for Rejection:</div>
        <div style="font-size:13px;color:#374151;line-height:1.6;">The business registration document provided is unclear. Please upload a clearer copy of your CAC certificate or business registration.</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;max-width:360px;margin-left:auto;margin-right:auto;">
        <button onclick="showAuthScreen('signupSupplier')" style="padding:12px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">Reapply Now</button>
        <button onclick="showToast('Support contact coming soon','')" style="padding:12px;background:white;color:#374151;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">Contact Support</button>
      </div>
      <p style="font-size:12px;color:#9ca3af;">Application ID: ${appId}</p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   OTP KEYBOARD HELPER
───────────────────────────────────────────── */
initOtpInputs() {
  const inputs = [...document.querySelectorAll('.otp-input')];
  if (!inputs.length) return;

  const allFilled = () => inputs.every(inp => inp.value);

  inputs.forEach((input, i) => {
    // Digits only; auto-advance on entry; auto-submit when complete
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, '').slice(-1); // keep last digit typed
      if (input.value) {
        if (i < inputs.length - 1) inputs[i + 1].focus();
        else if (allFilled()) handleOtp(); // auto-submit on last digit
      }
    });

    // Backspace goes to previous box
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && i > 0) {
        inputs[i - 1].focus();
      }
      // Arrow key navigation
      if (e.key === 'ArrowLeft'  && i > 0)                 { e.preventDefault(); inputs[i - 1].focus(); }
      if (e.key === 'ArrowRight' && i < inputs.length - 1) { e.preventDefault(); inputs[i + 1].focus(); }
    });

    // Select-all on focus so re-typing a digit replaces the current one
    input.addEventListener('focus', () => input.select());

    // Paste the whole code anywhere in the row
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const digits = (e.clipboardData || window.clipboardData)
        .getData('text').replace(/[^0-9]/g, '').slice(0, inputs.length);
      [...digits].forEach((char, j) => { if (inputs[j]) inputs[j].value = char; });
      const focusIdx = Math.min(digits.length, inputs.length - 1);
      inputs[focusIdx].focus();
      if (digits.length === inputs.length) handleOtp(); // auto-submit on full paste
    });
  });

  inputs[0].focus();
},

/* ─────────────────────────────────────────────
   FORGOT PASSWORD
───────────────────────────────────────────── */
forgotPassword() {
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:40px 32px;max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <button onclick="showAuthScreen('login')" style="display:flex;align-items:center;gap:6px;color:#6b7280;font-size:14px;background:none;border:none;cursor:pointer;margin-bottom:24px;padding:0;font-family:inherit;">← Back to Login</button>
      <div style="width:72px;height:72px;background:#e8f5ee;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 20px;">🔑</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:8px;">Forgot Password?</h2>
      <p style="color:#6b7280;font-size:14px;margin-bottom:28px;line-height:1.6;">Enter the email address linked to your account and we'll send you a password reset link.</p>
      <div style="text-align:left;margin-bottom:20px;">
        <label style="font-size:14px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Email Address</label>
        <input id="fp-email" type="email" placeholder="Enter your email address"
          style="width:100%;height:46px;padding:0 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;">
      </div>
      <button id="fp-btn" onclick="AC_SCREENS.sendPasswordReset()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Send Reset Link</button>
      <p style="font-size:13px;color:#9ca3af;">Remember your password? <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

forgotPasswordSent() {
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:44px 36px;max-width:480px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:80px;height:80px;background:#dcfce7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;">✉️</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:10px;">Check Your Email</h2>
      <p style="color:#6b7280;font-size:14px;line-height:1.7;margin-bottom:24px;">
        We've sent a password reset link to <strong id="fp-sent-email" style="color:#111827;"></strong>.<br>
        The link expires in 1 hour.
      </p>
      <div style="background:#eff6ff;border-radius:12px;padding:14px 20px;margin-bottom:28px;display:flex;align-items:center;gap:10px;text-align:left;">
        <span style="font-size:18px;">💡</span>
        <span style="font-size:13px;color:#1d4ed8;line-height:1.5;">Check your spam or junk folder if you don't see the email within a few minutes.</span>
      </div>
      <button onclick="showAuthScreen('forgotPassword')" style="width:100%;padding:13px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:12px;">Resend Email</button>
      <button onclick="showAuthScreen('login')" style="width:100%;padding:13px;background:white;color:#374151;border:1.5px solid #e5e7eb;border-radius:10px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;">Back to Login</button>
    </div>
  </div>`;
},

async sendPasswordReset() {
  const email = document.getElementById('fp-email')?.value?.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid email address', 'error'); return; }

  const btn = document.getElementById('fp-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

  try {
    await AC_API.auth.resetRequest(email);
    AC_STATE._fpEmail = email;
    showAuthScreen('forgotPasswordSent');
    const el = document.getElementById('fp-sent-email');
    if (el) el.textContent = email;
  } catch (err) {
    showToast(err.message || 'Failed to send reset email', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Send Reset Link'; }
  }
},

passwordReset() {
  return `
  <div style="min-height:100vh;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="background:white;border-radius:20px;padding:40px 32px;max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.1);text-align:center;">
      <div style="width:72px;height:72px;background:#e8f5ee;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 20px;">🔒</div>
      <h2 style="font-size:24px;font-weight:800;color:#111827;margin-bottom:8px;">Set New Password</h2>
      <p style="color:#6b7280;font-size:14px;margin-bottom:28px;line-height:1.6;">Enter your new password below.</p>
      <div style="text-align:left;margin-bottom:16px;">
        <label style="font-size:14px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">New Password</label>
        <input id="pr-password" type="password" placeholder="At least 8 characters"
          style="width:100%;height:46px;padding:0 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;">
      </div>
      <div style="text-align:left;margin-bottom:24px;">
        <label style="font-size:14px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Confirm Password</label>
        <input id="pr-confirm" type="password" placeholder="Repeat your new password"
          style="width:100%;height:46px;padding:0 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;">
      </div>
      <button id="pr-btn" onclick="AC_SCREENS.handlePasswordReset()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;margin-bottom:16px;">Reset Password</button>
      <p style="font-size:13px;color:#9ca3af;">Back to <span onclick="showAuthScreen('login')" style="color:#1E8B4C;font-weight:700;cursor:pointer;">Log in</span></p>
    </div>
  </div>`;
},

_socialBtn(provider) {
  const icons = {
    google:   `<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
    facebook: `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    apple:    `<svg width="20" height="20" viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-105.5C115.7 781.5 65 737 65 737c-.4-.4-.4-.4-.4-.4C25.7 698 0 652.7 0 596.8c0-158.7 122.3-266.4 280.9-266.4 66.7 0 122.3 37.5 163.5 37.5s102.5-42.8 166.2-42.8c33.8 0 141.1 32.8 141.1 32.8zm-161-198.4c33.8-40.2 58.2-96.5 58.2-152.8 0-7.9-.6-15.9-1.9-22.5-55.6 2.2-121.7 37.1-161.5 84.4-30.3 33.8-57.2 89.4-57.2 147.1 0 8.5 1.3 17 1.9 19.6 3.2.6 8.5 1.3 13.8 1.3 49.9 0 112.4-33.8 146.7-77.1z"/></svg>`,
  };
  const labels = { google: 'Google', facebook: 'Facebook', apple: 'Apple' };
  return `<button onclick="AC_SCREENS.socialLogin('${provider}')" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 8px;background:white;border:1.5px solid #e5e7eb;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;width:100%;" onmouseenter="this.style.background='#f9fafb'" onmouseleave="this.style.background='white'">${icons[provider]}<span>${labels[provider]}</span></button>`;
},

async socialLogin(provider) {
  const handleResponse = async (promise) => {
    try {
      const res = await promise;
      const { user: u, accessToken, refreshToken } = res.data ?? res;
      AC_STATE.setToken(accessToken);
      AC_STATE.setRefreshToken(refreshToken);
      AC_STATE.user.id          = u.id          ?? '';
      AC_STATE.user.name        = u.name;
      AC_STATE.user.initials    = u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
      AC_STATE.user.email       = u.email;
      AC_STATE.user.phone       = u.phone;
      AC_STATE.user.avatarUrl   = u.avatarUrl   ?? null;
      AC_STATE.user.accountStatus = u.accountStatus;
      showApp(u.role);
    } catch (err) {
      const msg = err.data?.error ?? err.message ?? `${provider} sign-in failed`;
      showToast(msg, 'error');
    }
  };

  if (provider === 'google') {
    if (!window.AC_CONFIG?.GOOGLE_CLIENT_ID) { showToast('Google sign-in not configured yet', 'info'); return; }
    if (!window.google?.accounts?.id) { showToast('Google SDK still loading — try again', 'info'); return; }
    window.google.accounts.id.initialize({
      client_id: window.AC_CONFIG.GOOGLE_CLIENT_ID,
      callback: (response) => handleResponse(AC_API.auth.googleLogin(response.credential)),
    });
    window.google.accounts.id.prompt();

  } else if (provider === 'facebook') {
    if (!window.AC_CONFIG?.FACEBOOK_APP_ID) { showToast('Facebook sign-in not configured yet', 'info'); return; }
    if (!window.FB) {
      window.fbAsyncInit = () => {
        window.FB.init({ appId: window.AC_CONFIG.FACEBOOK_APP_ID, cookie: true, xfbml: true, version: 'v19.0' });
        window.FB.login(r => {
          if (r.authResponse) handleResponse(AC_API.auth.facebookLogin(r.authResponse.accessToken));
          else showToast('Facebook sign-in cancelled', 'info');
        }, { scope: 'email,public_profile' });
      };
      return;
    }
    window.FB.login(r => {
      if (r.authResponse) handleResponse(AC_API.auth.facebookLogin(r.authResponse.accessToken));
      else showToast('Facebook sign-in cancelled', 'info');
    }, { scope: 'email,public_profile' });

  } else if (provider === 'apple') {
    if (!window.AC_CONFIG?.APPLE_CLIENT_ID) { showToast('Apple sign-in not configured yet', 'info'); return; }
    if (!window.AppleID) { showToast('Apple SDK still loading — try again', 'info'); return; }
    try {
      window.AppleID.auth.init({
        clientId: window.AC_CONFIG.APPLE_CLIENT_ID,
        scope: 'name email',
        redirectURI: window.location.origin,
        usePopup: true,
      });
      const data = await window.AppleID.auth.signIn();
      handleResponse(AC_API.auth.appleLogin(data.authorization.id_token, data.user));
    } catch (err) {
      if (err && err.error !== 'popup_closed_by_user') showToast('Apple sign-in failed', 'error');
    }
  }
},

async handlePasswordReset() {
  const password = document.getElementById('pr-password')?.value;
  const confirm  = document.getElementById('pr-confirm')?.value;
  if (!password || password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
  if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }

  const token = window._passwordResetToken;
  if (!token) { showToast('Invalid or expired reset link', 'error'); showAuthScreen('login'); return; }

  const btn = document.getElementById('pr-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Resetting...'; }

  try {
    await AC_API.auth.resetConfirm(token, password);
    window._passwordResetToken = null;
    showToast('Password reset successfully! Please log in.', 'success');
    showAuthScreen('login');
  } catch (err) {
    showToast(err.data?.error ?? err.message ?? 'Reset failed — link may have expired', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Reset Password'; }
  }
},

});

/* ═══════════════════════════════════════════════════════════
   AUTH HANDLERS
═══════════════════════════════════════════════════════════ */

/* ── validation helpers ── */
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validateNgPhone(v) { return /^\+234[789][01]\d{8}$/.test(v); }
function normalisePhone(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) return '+234' + digits.slice(1);
  if (digits.startsWith('234') && digits.length === 13) return '+' + digits;
  return '+234' + digits;
}
function setFormBusy(btnId, busy) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = busy;
  btn.style.opacity = busy ? '0.65' : '1';
}

/* ── dev-mode mock helpers ── */
function _isMockMode() { return !window.AC_CONFIG?.API_BASE_URL; }

function _mockRole(email) {
  const e = (email || '').toLowerCase();
  if (e.includes('admin'))    return 'admin';
  if (e.includes('supplier')) return 'supplier';
  if (e.includes('expert'))   return 'expert';
  if (e.includes('coop'))     return 'cooperative';
  if (e.includes('inst'))     return 'institution';
  return 'farmer';
}

/* ── login ── */
async function handleLogin() {
  const emailEl    = document.getElementById('login-email');
  const passwordEl = document.getElementById('login-password');
  const email      = emailEl?.value?.trim() ?? '';
  const password   = passwordEl?.value ?? '';

  if (!email)    { showToast('Please enter your email', 'error'); emailEl?.focus(); return; }
  if (!password) { showToast('Please enter your password', 'error'); passwordEl?.focus(); return; }

  setFormBusy('login-btn', true);

  /* ── DEV MODE: no backend needed ── */
  if (_isMockMode()) {
    await new Promise(r => setTimeout(r, 600));
    const role = _mockRole(email);
    const namePart = email.split('@')[0].replace(/[^a-z]/gi,' ').trim() || 'Demo User';
    AC_STATE.user.name     = namePart.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    AC_STATE.user.initials = AC_STATE.user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    AC_STATE.user.email    = email;
    AC_STATE.user.phone    = '+2348000000000';
    AC_STATE.user.accountStatus = 'verified';
    setFormBusy('login-btn', false);
    showToast('Welcome! (dev mode)', 'success');
    showApp(role);
    return;
  }

  showToast('Logging in...', '');

  try {
    const { data } = await AC_API.auth.login({ email, password });
    AC_STATE.setToken(data.accessToken);
    localStorage.setItem('ac_refresh_token', data.refreshToken);

    const u = data.user;
    AC_STATE.user.id          = u.id          ?? '';
    AC_STATE.user.name        = u.name;
    AC_STATE.user.initials    = u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    AC_STATE.user.email       = u.email;
    AC_STATE.user.phone       = u.phone;
    AC_STATE.user.avatarUrl   = u.avatarUrl   ?? null;
    AC_STATE.user.lga         = u.lga         ?? '';
    AC_STATE.user.state       = u.state       ?? '';
    AC_STATE.user.coopName    = u.coopName    ?? '';
    AC_STATE.user.coopId      = u.coopId      ?? '';
    AC_STATE.user.institution = u.institution ?? '';
    AC_STATE.user.accountStatus = u.accountStatus;

    showApp(u.role);
  } catch (err) {
    const msg = err.data?.error ?? err.message ?? 'Login failed';
    if (err.status === 403 && err.data?.nextStep === 'verify_phone') {
      showToast('Please verify your phone number first', 'error');
      AC_STATE._pendingPhone = email;
      showAuthScreen('otp');
    } else {
      showToast(msg, 'error');
    }
  } finally {
    setFormBusy('login-btn', false);
  }
}

/* ── signup ── */
async function handleSignup(role) {
  /* Collect fields by role */
  const fields = {
    farmer:      { name: 'farmer-name',   email: 'farmer-email',   phone: 'farmer-phone',   password: 'farmer-password'   },
    supplier:    { name: 'supplier-name', email: 'supplier-email', phone: 'supplier-phone', password: 'supplier-password' },
    expert:      { name: 'expert-name',   email: 'expert-email',   phone: 'expert-phone',   password: 'expert-password'   },
    cooperative: { name: null,            email: null,             phone: null,             password: 'coop-password'     },
    institution: { name: null,            email: null,             phone: null,             password: 'inst-password'     },
  }[role];

  const name     = fields?.name     ? document.getElementById(fields.name)?.value?.trim()     : '';
  const rawEmail = fields?.email    ? document.getElementById(fields.email)?.value?.trim()    : '';
  const rawPhone = fields?.phone    ? document.getElementById(fields.phone)?.value?.trim()    : '';
  const password = fields?.password ? document.getElementById(fields.password)?.value         : '';

  const email = rawEmail.toLowerCase();
  const phone = normalisePhone(rawPhone);

  /* Validation */
  if (name && name.length < 2)        { showToast('Name must be at least 2 characters', 'error'); return; }
  if (rawEmail && !validateEmail(email)) { showToast('Please enter a valid email address', 'error'); return; }
  if (rawPhone && !validateNgPhone(phone)) { showToast('Please enter a valid Nigerian phone number', 'error'); return; }
  if (password && password.length < 8)   { showToast('Password must be at least 8 characters', 'error'); return; }

  const state = document.getElementById('farmer-state')?.value || '';

  const payload = { name, email, phone, password, role };
  if (state) payload.state = state;

  setFormBusy('signup-btn-' + role, true);

  /* ── DEV MODE: no backend needed ── */
  if (_isMockMode()) {
    await new Promise(r => setTimeout(r, 700));
    AC_STATE._pendingRole  = role;
    AC_STATE._pendingPhone = phone || '+2348000000000';
    AC_STATE.user.name     = name || 'Demo User';
    AC_STATE.user.initials = (name || 'DU').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    AC_STATE.user.email    = email;
    AC_STATE.user.phone    = phone || '+2348000000000';
    AC_STATE.user.accountStatus = role === 'farmer' ? 'verified' : 'pending';
    setFormBusy('signup-btn-' + role, false);
    showToast('Account created! (dev mode)', 'success');
    role === 'farmer' ? showAuthScreen('otp') : showAuthScreen('underReview');
    return;
  }

  showToast('Creating your account...', '');

  try {
    const { data } = await AC_API.auth.register(payload);
    AC_STATE._pendingRole  = data.user.role;
    AC_STATE._pendingPhone = data.user.phone;

    if (data.user.role === 'farmer') {
      showAuthScreen('otp');
    } else {
      showAuthScreen('underReview');
    }
  } catch (err) {
    const fieldErrors = err.data?.error;
    if (typeof fieldErrors === 'object') {
      const first = Object.values(fieldErrors).flat()[0];
      showToast(String(first ?? 'Validation error'), 'error');
    } else {
      showToast(err.data?.error ?? err.message ?? 'Registration failed', 'error');
    }
  } finally {
    setFormBusy('signup-btn-' + role, false);
  }
}

/* ── OTP verify ── */
async function handleOtp() {
  const inputs = document.querySelectorAll('.otp-input');
  const code   = [...inputs].map(i => i.value).join('');
  if (code.length < 6) { showToast('Please enter the full 6-digit code', 'error'); return; }

  const phone = AC_STATE._pendingPhone;
  if (!phone) { showToast('Session expired. Please start again.', 'error'); showAuthScreen('roleSelection'); return; }

  /* ── DEV MODE: any 6-digit code works ── */
  if (_isMockMode()) {
    await new Promise(r => setTimeout(r, 500));
    AC_STATE.user.isLoggedIn = true;
    showToast('Phone verified! (dev mode)', 'success');
    showApp(AC_STATE._pendingRole || 'farmer');
    return;
  }

  showToast('Verifying...', '');

  try {
    const { data } = await AC_API.auth.verifyOtp(phone, code);
    AC_STATE.setToken(data.accessToken);
    localStorage.setItem('ac_refresh_token', data.refreshToken);

    const u = data.user;
    AC_STATE.user.id        = u.id          ?? '';
    AC_STATE.user.name      = u.name;
    AC_STATE.user.initials  = u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    AC_STATE.user.email     = u.email;
    AC_STATE.user.phone     = u.phone;
    AC_STATE.user.avatarUrl = u.avatarUrl   ?? null;
    AC_STATE.user.lga       = u.lga         ?? '';
    AC_STATE.user.state     = u.state       ?? '';
    AC_STATE.user.coopName    = u.coopName    ?? '';
    AC_STATE.user.coopId      = u.coopId      ?? '';
    AC_STATE.user.institution = u.institution ?? '';
    AC_STATE.user.accountStatus = u.accountStatus;

    showApp(u.role);
  } catch (err) {
    showToast(err.data?.error ?? err.message ?? 'Verification failed', 'error');
  }
}

/* ── OTP resend ── */
async function resendOtp() {
  const phone = AC_STATE._pendingPhone;
  if (!phone) { showToast('Session expired. Please start again.', 'error'); return; }
  try {
    await AC_API.auth.sendOtp(phone);
    showToast('New code sent!', 'success');
  } catch (err) {
    showToast(err.data?.error ?? 'Could not resend OTP', 'error');
  }
}

function togglePassword(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

export { handleLogin, handleSignup, handleOtp, resendOtp, togglePassword };