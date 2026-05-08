import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/admin/admin.js
   Platform admin panel: dashboard, users, loans, broadcast
   Only accessible to users with role === 'admin'
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────────── */
adminDashboard() {
  if (AC_STATE._adminStats === undefined) {
    AC_STATE._adminStats = null;
    AC_API.admin.stats().then(res => {
      AC_STATE._adminStats = res.data ?? res;
      if (AC_STATE.currentScreen === 'admin-dashboard') AC_ROUTER.show('admin-dashboard');
    }).catch(() => {
      AC_STATE._adminStats = undefined;
      if (AC_STATE.currentScreen === 'admin-dashboard') AC_ROUTER.show('admin-dashboard');
    });
  }

  if (AC_STATE._adminStats === null) return AC_UI.listSkeletons(4);
  if (AC_STATE._adminStats === undefined) return AC_UI.error({ retryFn: "AC_STATE._adminStats=undefined;AC_ROUTER.show('admin-dashboard')" });

  const s = AC_STATE._adminStats;
  const stats = [
    { icon: '👥', label: 'Total Users',    value: (s.totalUsers  || 0).toLocaleString(), color: '#2563EB', bg: '#DBEAFE' },
    { icon: '⏳', label: 'Pending KYC',   value: (s.pendingKYC  || 0).toLocaleString(), color: '#D97706', bg: '#FEF3C7', alert: s.pendingKYC > 0 },
    { icon: '📦', label: 'Total Orders',   value: (s.totalOrders || 0).toLocaleString(), color: '#16A34A', bg: '#DCFCE7' },
    { icon: '🏦', label: 'Pending Loans',  value: (s.pendingLoans|| 0).toLocaleString(), color: '#7C3AED', bg: '#EDE9FE', alert: s.pendingLoans > 0 },
    { icon: '💰', label: 'Total GMV',      value: `₦${Number(s.gmv || 0).toLocaleString()}`, color: '#1E8B4C', bg: '#DCFCE7' },
  ];

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#1E293B 0%,#334155 100%);border-radius:var(--radius-xl);padding:28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:160px;height:160px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">AgroConnect</div>
        <h1 style="color:white;font-size:var(--text-2xl);font-weight:700;margin-bottom:4px;">Admin Panel</h1>
        <p style="color:rgba(255,255,255,0.6);font-size:var(--text-sm);">Platform overview — ${new Date().toLocaleDateString('en-NG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
      </div>
    </div>

    <!-- STAT CARDS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:24px;">
      ${stats.map(st => `
        <div style="background:${st.bg};border-radius:var(--radius-md);padding:18px 16px;position:relative;">
          ${st.alert ? `<div style="position:absolute;top:10px;right:10px;width:8px;height:8px;border-radius:50%;background:#EF4444;"></div>` : ''}
          <div style="font-size:24px;margin-bottom:8px;">${st.icon}</div>
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${st.label}</div>
          <div style="font-size:22px;font-weight:800;color:${st.color};">${st.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- QUICK ACTIONS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:24px;">
      ${[
        { icon:'⏳', label:'KYC Queue',         desc:`${s.pendingKYC || 0} pending approvals`, screen:'admin-users', q:'pending', color:'#D97706', bg:'#FEF3C7', border:'#FDE68A' },
        { icon:'👥', label:'All Users',          desc:'Manage user accounts',                    screen:'admin-users', color:'#2563EB', bg:'#DBEAFE', border:'#BFDBFE' },
        { icon:'🏦', label:'Loan Applications',  desc:`${s.pendingLoans || 0} need review`,     screen:'admin-loans', color:'#7C3AED', bg:'#EDE9FE', border:'#DDD6FE' },
        { icon:'📢', label:'Broadcast',          desc:'Send platform-wide message',             screen:'admin-broadcast', color:'#1E8B4C', bg:'#DCFCE7', border:'#BBF7D0' },
      ].map(a => `
        <div onclick="AC_STATE._adminUserFilter='${a.q || ''}';AC_STATE.navigate('${a.screen}')"
             style="background:${a.bg};border:1px solid ${a.border};border-radius:var(--radius-md);padding:18px;cursor:pointer;transition:var(--transition);"
             onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
          <div style="font-size:24px;margin-bottom:8px;">${a.icon}</div>
          <div style="font-size:var(--text-sm);font-weight:700;color:${a.color};margin-bottom:2px;">${a.label}</div>
          <div style="font-size:var(--text-xs);color:var(--gray-500);">${a.desc}</div>
        </div>
      `).join('')}
    </div>

    <!-- RECENT SIGNUPS -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Recent Signups</h3>
        <button onclick="AC_STATE.navigate('admin-users')" style="font-size:var(--text-sm);color:#2563EB;font-weight:600;background:none;border:none;cursor:pointer;font-family:var(--font);">View All →</button>
      </div>
      ${(s.recentUsers || []).map((u, i, arr) => `
        <div style="display:flex;align-items:center;gap:14px;padding:13px 20px;${i < arr.length-1 ? 'border-bottom:1px solid var(--gray-100)' : ''};"
             onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
          <div style="width:36px;height:36px;border-radius:50%;background:#DBEAFE;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#2563EB;flex-shrink:0;">${(u.name||'?')[0].toUpperCase()}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${u.name}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-400);">${u.email}</div>
          </div>
          <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);
            background:${u.accountStatus==='verified'?'#DCFCE7':u.accountStatus==='pending'?'#FEF3C7':'#FEE2E2'};
            color:${u.accountStatus==='verified'?'#16A34A':u.accountStatus==='pending'?'#D97706':'#DC2626'};">
            ${u.accountStatus}
          </span>
        </div>
      `).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   USER MANAGEMENT / KYC QUEUE
───────────────────────────────────────────── */
adminUsers() {
  const filter = AC_STATE._adminUserFilter || '';

  if (AC_STATE._adminUsersCache === undefined) {
    AC_STATE._adminUsersCache = null;
    const params = {};
    if (filter) params.status = filter;
    AC_API.admin.users(params).then(res => {
      AC_STATE._adminUsersCache = res.data ?? [];
      if (AC_STATE.currentScreen === 'admin-users') AC_ROUTER.show('admin-users');
    }).catch(() => {
      AC_STATE._adminUsersCache = undefined;
      if (AC_STATE.currentScreen === 'admin-users') AC_ROUTER.show('admin-users');
    });
  }

  if (AC_STATE._adminUsersCache === null) return AC_UI.listSkeletons(8);
  if (AC_STATE._adminUsersCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._adminUsersCache=undefined;AC_ROUTER.show('admin-users')" });

  const users = AC_STATE._adminUsersCache;
  const filters = [['All',''],['Pending KYC','pending'],['Verified','verified'],['Rejected','rejected'],['Suspended','suspended']];

  const roleColors = { farmer:'#16A34A', supplier:'#D97706', expert:'#7C3AED', cooperative:'#2563EB', institution:'#0369A1' };
  const roleBg    = { farmer:'#DCFCE7', supplier:'#FEF3C7', expert:'#EDE9FE', cooperative:'#DBEAFE', institution:'#E0F2FE' };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);">User Management</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${users.length} user${users.length!==1?'s':''} ${filter ? `with status: ${filter}` : ''}</p>
      </div>
      <button onclick="AC_STATE._adminUsersCache=undefined;AC_ROUTER.show('admin-users')"
              style="padding:9px 16px;background:var(--gray-100);color:var(--gray-700);border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;">↻ Refresh</button>
    </div>

    <!-- STATUS FILTERS -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      ${filters.map(([label, val]) => `
        <button onclick="AC_STATE._adminUserFilter='${val}';AC_STATE._adminUsersCache=undefined;AC_ROUTER.show('admin-users')"
                style="padding:7px 14px;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;
                       background:${filter===val?'#1E293B':'white'};color:${filter===val?'white':'var(--gray-600)'};
                       border:1.5px solid ${filter===val?'#1E293B':'var(--gray-200)'};">${label}</button>
      `).join('')}
    </div>

    ${users.length === 0 ? AC_UI.empty({ icon:'👥', title:'No users found', message:'Try a different filter.' }) : `
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:640px;">
        <thead>
          <tr style="background:var(--gray-50);border-bottom:1px solid var(--gray-200);">
            ${['User','Role','Status','Joined','Actions'].map(h=>`<th style="padding:11px 16px;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em;text-align:left;">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${users.map((u, i) => `
            <tr style="${i%2===0?'background:white':'background:var(--gray-50)'};" onmouseover="this.style.background='#EFF6FF'" onmouseout="this.style.background='${i%2===0?'white':'var(--gray-50)'}'">
              <td style="padding:13px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:34px;height:34px;border-radius:50%;background:#DBEAFE;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#2563EB;flex-shrink:0;">${(u.name||'?')[0].toUpperCase()}</div>
                  <div>
                    <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${u.name}</div>
                    <div style="font-size:var(--text-xs);color:var(--gray-400);">${u.email}</div>
                  </div>
                </div>
              </td>
              <td style="padding:13px 16px;">
                <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);
                  background:${roleBg[u.role]||'#F3F4F6'};color:${roleColors[u.role]||'var(--gray-600)'};">
                  ${u.role}
                </span>
              </td>
              <td style="padding:13px 16px;">
                <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:var(--radius-full);
                  background:${u.accountStatus==='verified'?'#DCFCE7':u.accountStatus==='pending'?'#FEF3C7':u.accountStatus==='rejected'?'#FEE2E2':'#F3F4F6'};
                  color:${u.accountStatus==='verified'?'#16A34A':u.accountStatus==='pending'?'#D97706':u.accountStatus==='rejected'?'#DC2626':'var(--gray-500)'};">
                  ${u.accountStatus}
                </span>
              </td>
              <td style="padding:13px 16px;font-size:var(--text-xs);color:var(--gray-400);">${new Date(u.createdAt).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})}</td>
              <td style="padding:13px 16px;">
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  ${u.accountStatus !== 'verified'  ? `<button onclick="AC_SCREENS.adminSetStatus('${u.id}','verified',this)"   style="padding:5px 10px;background:#DCFCE7;color:#16A34A;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Approve</button>` : ''}
                  ${u.accountStatus !== 'rejected'  ? `<button onclick="AC_SCREENS.adminSetStatus('${u.id}','rejected',this)"   style="padding:5px 10px;background:#FEE2E2;color:#DC2626;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Reject</button>` : ''}
                  ${u.accountStatus !== 'suspended' ? `<button onclick="AC_SCREENS.adminSetStatus('${u.id}','suspended',this)"  style="padding:5px 10px;background:#F3F4F6;color:var(--gray-600);border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Suspend</button>` : ''}
                  ${u.accountStatus === 'suspended' ? `<button onclick="AC_SCREENS.adminSetStatus('${u.id}','verified',this)"   style="padding:5px 10px;background:#DCFCE7;color:#16A34A;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Reinstate</button>` : ''}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`}
  </div>`;
},

async adminSetStatus(userId, status, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    await AC_API.admin.updateStatus(userId, { accountStatus: status });
    showToast(`User ${status}`, 'success');
    AC_STATE._adminUsersCache = undefined;
    AC_STATE._adminStats      = undefined;
    AC_ROUTER.show('admin-users');
  } catch (err) {
    showToast(err.message || 'Failed to update status', 'error');
    if (btn) { btn.disabled = false; btn.textContent = status === 'verified' ? 'Approve' : status === 'rejected' ? 'Reject' : 'Suspend'; }
  }
},

/* ─────────────────────────────────────────────
   LOAN APPLICATIONS
───────────────────────────────────────────── */
adminLoans() {
  const filter = AC_STATE._adminLoanFilter || '';

  if (AC_STATE._adminLoansCache === undefined) {
    AC_STATE._adminLoansCache = null;
    const params = {};
    if (filter) params.status = filter;
    AC_API.admin.loans(params).then(res => {
      AC_STATE._adminLoansCache = res.data ?? [];
      if (AC_STATE.currentScreen === 'admin-loans') AC_ROUTER.show('admin-loans');
    }).catch(() => {
      AC_STATE._adminLoansCache = undefined;
      if (AC_STATE.currentScreen === 'admin-loans') AC_ROUTER.show('admin-loans');
    });
  }

  if (AC_STATE._adminLoansCache === null) return AC_UI.listSkeletons(6);
  if (AC_STATE._adminLoansCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._adminLoansCache=undefined;AC_ROUTER.show('admin-loans')" });

  const loans = AC_STATE._adminLoansCache;
  const filters = [['All',''],['Pending','pending'],['Reviewing','reviewing'],['Approved','approved'],['Disbursed','disbursed'],['Rejected','rejected']];

  const statusColor = { pending:'#D97706', reviewing:'#2563EB', approved:'#16A34A', disbursed:'#7C3AED', completed:'#6B7280', rejected:'#DC2626' };
  const statusBg    = { pending:'#FEF3C7', reviewing:'#DBEAFE', approved:'#DCFCE7', disbursed:'#EDE9FE', completed:'#F3F4F6', rejected:'#FEE2E2' };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);">Loan Applications</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${loans.length} application${loans.length!==1?'s':''}</p>
      </div>
      <button onclick="AC_STATE._adminLoansCache=undefined;AC_ROUTER.show('admin-loans')"
              style="padding:9px 16px;background:var(--gray-100);color:var(--gray-700);border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;">↻ Refresh</button>
    </div>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      ${filters.map(([label, val]) => `
        <button onclick="AC_STATE._adminLoanFilter='${val}';AC_STATE._adminLoansCache=undefined;AC_ROUTER.show('admin-loans')"
                style="padding:7px 14px;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;
                       background:${filter===val?'#1E293B':'white'};color:${filter===val?'white':'var(--gray-600)'};
                       border:1.5px solid ${filter===val?'#1E293B':'var(--gray-200)'};">${label}</button>
      `).join('')}
    </div>

    ${loans.length === 0 ? AC_UI.empty({ icon:'🏦', title:'No loans found', message:'Try a different filter.' }) : `
    <div style="display:flex;flex-direction:column;gap:12px;">
      ${loans.map(l => {
        const applicant = l.applicant || {};
        const sc = statusColor[l.status] || '#6B7280';
        const sb = statusBg[l.status]    || '#F3F4F6';
        return `
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
            <div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);margin-bottom:2px;">${applicant.name || 'Unknown'}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-400);">${applicant.email || ''} · ${applicant.role || ''}</div>
            </div>
            <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:var(--radius-full);background:${sb};color:${sc};">${l.status}</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;">
            <div><div style="font-size:11px;color:var(--gray-400);margin-bottom:2px;">Amount</div><div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">₦${Number(l.amount).toLocaleString()}</div></div>
            <div><div style="font-size:11px;color:var(--gray-400);margin-bottom:2px;">Purpose</div><div style="font-size:var(--text-sm);color:var(--gray-700);">${l.purpose}</div></div>
            <div><div style="font-size:11px;color:var(--gray-400);margin-bottom:2px;">Applied</div><div style="font-size:var(--text-sm);color:var(--gray-700);">${new Date(l.createdAt).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})}</div></div>
          </div>
          ${l.reviewNotes ? `<div style="background:var(--gray-50);border-radius:var(--radius-sm);padding:10px 12px;font-size:var(--text-xs);color:var(--gray-600);margin-bottom:12px;"><strong>Notes:</strong> ${l.reviewNotes}</div>` : ''}
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${l.status === 'pending'   ? `<button onclick="AC_SCREENS.adminUpdateLoan('${l.id}','reviewing',this)" style="padding:7px 14px;background:#DBEAFE;color:#2563EB;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Mark Reviewing</button>` : ''}
            ${['pending','reviewing'].includes(l.status) ? `
              <button onclick="AC_SCREENS.adminUpdateLoan('${l.id}','approved',this)" style="padding:7px 14px;background:#DCFCE7;color:#16A34A;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Approve</button>
              <button onclick="AC_SCREENS.adminUpdateLoan('${l.id}','rejected',this)" style="padding:7px 14px;background:#FEE2E2;color:#DC2626;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Reject</button>
            ` : ''}
            ${l.status === 'approved'  ? `<button onclick="AC_SCREENS.adminUpdateLoan('${l.id}','disbursed',this)" style="padding:7px 14px;background:#EDE9FE;color:#7C3AED;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Mark Disbursed</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`}
  </div>`;
},

async adminUpdateLoan(loanId, status, btn) {
  if (btn) { btn.disabled = true; btn.textContent = '...'; }
  try {
    await AC_API.admin.updateLoan(loanId, { status });
    showToast(`Loan marked as ${status}`, 'success');
    AC_STATE._adminLoansCache = undefined;
    AC_STATE._adminStats      = undefined;
    AC_ROUTER.show('admin-loans');
  } catch (err) {
    showToast(err.message || 'Failed to update loan', 'error');
    if (btn) { btn.disabled = false; btn.textContent = status; }
  }
},

/* ─────────────────────────────────────────────
   BROADCAST NOTIFICATION
───────────────────────────────────────────── */
adminBroadcast() {
  return `
  <div class="animate-fadeIn" style="max-width:640px;margin:0 auto;padding-bottom:40px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Broadcast Notification</h1>
      <p style="font-size:var(--text-sm);color:var(--gray-500);">Send a message to all users or a specific role group.</p>
    </div>

    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;">
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Target Audience</label>
          <select id="bc-role" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
            <option value="">All Users</option>
            <option value="farmer">Farmers only</option>
            <option value="supplier">Suppliers only</option>
            <option value="expert">Experts only</option>
            <option value="cooperative">Cooperatives only</option>
            <option value="institution">Institutions only</option>
          </select>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Notification Title *</label>
          <input id="bc-title" type="text" placeholder="e.g. Platform Maintenance Notice"
            style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Message *</label>
          <textarea id="bc-body" rows="4" placeholder="Write your notification message here..."
            style="width:100%;padding:12px 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;resize:vertical;"></textarea>
        </div>

        <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:var(--radius-md);padding:12px 16px;display:flex;gap:10px;align-items:center;">
          <span style="font-size:18px;">⚠️</span>
          <span style="font-size:var(--text-xs);color:#92400E;">This sends a push notification to every user in the selected group. Use responsibly.</span>
        </div>

        <button id="bc-btn" onclick="AC_SCREENS.sendBroadcast()"
          style="width:100%;height:48px;background:#1E293B;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;">
          Send Notification
        </button>
      </div>
    </div>
  </div>`;
},

async sendBroadcast() {
  const title      = document.getElementById('bc-title')?.value?.trim();
  const body       = document.getElementById('bc-body')?.value?.trim();
  const targetRole = document.getElementById('bc-role')?.value || undefined;

  if (!title) { showToast('Please enter a notification title', 'error'); return; }
  if (!body)  { showToast('Please enter a message body', 'error'); return; }

  const btn = document.getElementById('bc-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

  try {
    const res = await AC_API.admin.broadcast({ title, body, targetRole });
    const sent = res.data?.sent ?? 0;
    showToast(`Sent to ${sent} user${sent !== 1 ? 's' : ''}!`, 'success');
    document.getElementById('bc-title').value = '';
    document.getElementById('bc-body').value  = '';
  } catch (err) {
    showToast(err.message || 'Broadcast failed', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Notification'; }
  }
},

});
