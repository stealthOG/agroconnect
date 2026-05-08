import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/cooperative/cooperative.js
   Cooperative screens: coopDashboard, coopMembers,
   coopLoan, coopWallet
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   COOPERATIVE DASHBOARD
───────────────────────────────────────────── */
coopDashboard() {
  /* Trigger member fetch if not yet loaded — shares cache with coopMembers() */
  if (AC_STATE._coopMembersCache === undefined) {
    AC_STATE._coopMembersCache = null;
    AC_API.coop.members().then(res => {
      AC_STATE._coopMembersCache = res;
      if (AC_STATE.currentScreen === 'coop-dashboard') AC_ROUTER.show('coop-dashboard');
    }).catch(() => {
      if (!window.AC_CONFIG?.API_BASE_URL) {
        AC_STATE._coopMembersCache = {
          data: [
            { id:'1', name:'Aminu Ibrahim', lga:'Kaduna North', duesPaid:true,  isActive:true  },
            { id:'2', name:'Hauwa Musa',     lga:'Zaria',        duesPaid:true,  isActive:true  },
            { id:'3', name:'Usman Garba',    lga:'Sabon Gari',   duesPaid:false, isActive:true  },
            { id:'4', name:'Fatima Sule',    lga:'Kaduna South', duesPaid:true,  isActive:true  },
          ],
          meta: { total: 4, active: 4, inactive: 0, unpaid: 1 },
        };
      } else {
        AC_STATE._coopMembersCache = { data: [], meta: { total: 0, active: 0 } };
      }
      if (AC_STATE.currentScreen === 'coop-dashboard') AC_ROUTER.show('coop-dashboard');
    });
  }

  const members = (AC_STATE._coopMembersCache?.data || []).slice(0, 4);
  const meta    = AC_STATE._coopMembersCache?.meta || { total: '—', active: '—' };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- HERO -->
    <div style="background:linear-gradient(135deg,#0369A1 0%,#0EA5E9 100%);border-radius:var(--radius-xl);padding:28px 28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:160px;height:160px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.75);margin-bottom:4px;">Welcome back,</div>
        <h2 style="color:white;font-size:var(--text-2xl);font-weight:700;margin-bottom:4px;">${AC_STATE.user.coopName || 'Your Cooperative'}</h2>
        <p style="color:rgba(255,255,255,0.75);font-size:var(--text-sm);">${AC_STATE.user.state || 'Nigeria'}</p>
      </div>
    </div>

    <!-- STAT CARDS -->
    <div class="grid-4" style="gap:12px;margin-bottom:20px;">
      ${[
        { icon:'👥', label:'Total Members',  value: String(meta.total),  color:'#0EA5E9', bg:'#E0F2FE' },
        { icon:'✅', label:'Active Members', value: String(meta.active), color:'#16A34A', bg:'#DCFCE7' },
        { icon:'💳', label:'Group Wallet',   value:'₦—',                 color:'#7C3AED', bg:'#EDE9FE' },
        { icon:'🏦', label:'Active Loan',    value:'₦—',                 color:'#D97706', bg:'#FEF3C7' },
      ].map(s => `
        <div style="background:${s.bg};border-radius:var(--radius-md);padding:18px 14px;">
          <div style="font-size:22px;margin-bottom:6px;">${s.icon}</div>
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${s.label}</div>
          <div style="font-size:20px;font-weight:800;color:${s.color};">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- LOAN REPAYMENT PROGRESS -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Active Loan - LOAN-2026-001</h3>
        <span style="background:#DCFCE7;color:#16A34A;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);">On Track</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
        ${[['Total Amount','₦2,500,000'],['Amount Repaid','₦1,500,000'],['Balance','₦1,000,000']].map(([label,val]) => `
          <div>
            <div style="font-size:11px;color:var(--gray-500);margin-bottom:3px;">${label}</div>
            <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">${val}</div>
          </div>
        `).join('')}
      </div>
      <div style="background:var(--gray-200);border-radius:4px;height:10px;overflow:hidden;">
        <div style="width:60%;height:100%;background:linear-gradient(90deg,#16A34A,#22C55E);border-radius:4px;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:6px;">
        <span style="font-size:11px;color:var(--gray-400);">60% repaid</span>
        <span style="font-size:11px;color:var(--gray-400);">Next payment: Mar 15, 2026</span>
      </div>
    </div>

    <!-- RECENT MEMBERS + QUICK ACTIONS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="coop-split">
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Recent Members</h3>
          <button onclick="AC_STATE.navigate('coop-members')" style="font-size:var(--text-sm);color:#0EA5E9;font-weight:600;background:none;border:none;cursor:pointer;font-family:var(--font);">View All →</button>
        </div>
        ${members.length === 0
          ? `<div style="padding:20px 0;text-align:center;color:var(--gray-400);font-size:var(--text-sm);">No members yet</div>`
          : members.map(m => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--gray-100);">
            <div style="width:36px;height:36px;border-radius:50%;background:#E0F2FE;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#0369A1;flex-shrink:0;">${(m.name||'?')[0]}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.name}</div>
              <div style="font-size:11px;color:var(--gray-400);">${m.lga||'—'}</div>
            </div>
            <span style="background:${m.duesPaid?'#DCFCE7':'#FEE2E2'};color:${m.duesPaid?'#16A34A':'#DC2626'};font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;">${m.duesPaid?'Paid':'Unpaid'}</span>
          </div>
        `).join('')}
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[
          { icon:'🌱', label:'Manage Members',  desc:'View, add or remove members',    screen:'coop-members', color:'#E0F2FE', border:'#BAE6FD', text:'#0369A1' },
          { icon:'🌱', label:'Apply for Loan',  desc:'Group loan from Bank of Agriculture', screen:'coop-loan', color:'#EDE9FE', border:'#DDD6FE', text:'#7C3AED' },
          { icon:'🌱', label:'Group Wallet',    desc:'View disbursements & spending',   screen:'coop-wallet',  color:'#DCFCE7', border:'#BBF7D0', text:'#16A34A' },
        ].map(a => `
          <div onclick="AC_STATE.navigate('${a.screen}')" style="background:${a.color};border:1px solid ${a.border};border-radius:var(--radius-md);padding:16px 18px;cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="font-size:22px;margin-bottom:6px;">${a.icon}</div>
            <div style="font-size:var(--text-sm);font-weight:700;color:${a.text};margin-bottom:2px;">${a.label}</div>
            <div style="font-size:11px;color:var(--gray-500);">${a.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  <style>@media(max-width:640px){.coop-split{grid-template-columns:1fr!important}}</style>`;
},

/* ─────────────────────────────────────────────
   COOP MEMBERS
───────────────────────────────────────────── */
coopMembers() {
  if (AC_STATE._coopMembersCache === undefined) {
    AC_STATE._coopMembersCache = null;
    AC_API.coop.members()
      .then(res => {
        AC_STATE._coopMembersCache = res;
        if (AC_STATE.currentScreen === 'coop-members') AC_ROUTER.show('coop-members');
      })
      .catch(() => {
        if (!window.AC_CONFIG?.API_BASE_URL) {
          AC_STATE._coopMembersCache = {
            data: [
              { id:'1', name:'Aminu Ibrahim',  phone:'+234 803 111 2222', lga:'Kaduna North', farmType:'Maize, Sorghum', isActive:true,  duesPaid:true,  joinedAt:'2024-01-15T00:00:00Z' },
              { id:'2', name:'Hauwa Musa',      phone:'+234 805 333 4444', lga:'Zaria',        farmType:'Rice, Cowpea',   isActive:true,  duesPaid:true,  joinedAt:'2024-01-20T00:00:00Z' },
              { id:'3', name:'Usman Garba',     phone:'+234 807 555 6666', lga:'Sabon Gari',   farmType:'Maize',          isActive:true,  duesPaid:false, joinedAt:'2024-03-10T00:00:00Z' },
              { id:'4', name:'Fatima Sule',     phone:'+234 809 777 8888', lga:'Kaduna South', farmType:'Tomato, Pepper', isActive:true,  duesPaid:true,  joinedAt:'2024-02-05T00:00:00Z' },
              { id:'5', name:'Bala Mohammed',   phone:'+234 811 999 0000', lga:"Jema'a",       farmType:'Groundnut',      isActive:false, duesPaid:false, joinedAt:'2024-04-01T00:00:00Z' },
              { id:'6', name:'Aisha Yakubu',    phone:'+234 813 111 3333', lga:'Kachia',       farmType:'Soybean, Maize', isActive:true,  duesPaid:true,  joinedAt:'2024-01-12T00:00:00Z' },
            ],
            meta: { total: 6, active: 5, inactive: 1, unpaid: 2 },
          };
        } else {
          AC_STATE._coopMembersCache = undefined;
        }
        if (AC_STATE.currentScreen === 'coop-members') AC_ROUTER.show('coop-members');
      });
  }

  if (AC_STATE._coopMembersCache === null)      return AC_UI.listSkeletons(6);
  if (AC_STATE._coopMembersCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._coopMembersCache=undefined;AC_ROUTER.show('coop-members')" });

  const { data: members, meta } = AC_STATE._coopMembersCache;
  const fmtDate = iso => new Date(iso).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' });
  const tabs = [['All Members', meta.total], ['Active', meta.active], ['Inactive', meta.inactive], ['Unpaid Dues', meta.unpaid]];

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Members</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${meta.total} member${meta.total !== 1 ? 's' : ''} in your cooperative</p>
      </div>
      <button onclick="AC_SCREENS.showAddMemberModal()" style="padding:10px 18px;background:#0EA5E9;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Add Member</button>
    </div>

    <!-- SEARCH -->
    <div style="margin-bottom:16px;">
      <div style="position:relative;max-width:340px;">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400);font-size:14px;">🔍</span>
        <input type="text" id="cm-search" placeholder="Search members..." oninput="AC_SCREENS._filterCoopMembers(this.value)"
          style="width:100%;height:40px;padding:0 14px 0 34px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex;gap:0;border-bottom:2px solid var(--gray-200);margin-bottom:16px;overflow-x:auto;">
      ${tabs.map(([label, count], i) => `
        <button style="padding:9px 14px;border:none;background:none;cursor:pointer;white-space:nowrap;font-size:var(--text-sm);font-weight:${i===0?'700':'500'};color:${i===0?'#0EA5E9':'var(--gray-500)'};border-bottom:${i===0?'2px solid #0EA5E9':'2px solid transparent'};margin-bottom:-2px;font-family:var(--font);">${label} (${count})</button>
      `).join('')}
    </div>

    <!-- TABLE -->
    <div id="cm-table" style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;overflow-x:auto;">
      ${members.length === 0
        ? `<div style="padding:48px;text-align:center;color:var(--gray-400);">No members yet. Add your first member.</div>`
        : `<div style="display:grid;grid-template-columns:3fr 2fr 1.5fr 1fr 1fr 40px;min-width:640px;background:var(--gray-50);padding:11px 18px;border-bottom:1px solid var(--gray-200);">
            ${['Member','Phone / LGA','Crop(s)','Joined','Dues',''].map(h => `<div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em;">${h}</div>`).join('')}
          </div>
          ${members.map((m, i) => `
            <div style="display:grid;grid-template-columns:3fr 2fr 1.5fr 1fr 1fr 40px;min-width:640px;padding:13px 18px;border-bottom:${i < members.length-1 ? '1px solid var(--gray-100)' : 'none'};align-items:center;"
              onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;border-radius:50%;background:#E0F2FE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#0369A1;flex-shrink:0;">${m.name[0]}</div>
                <div>
                  <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${m.name}</div>
                  <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${m.isActive?'#DCFCE7':'#F3F4F6'};color:${m.isActive?'#16A34A':'var(--gray-500)'};">${m.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div>
                <div style="font-size:var(--text-xs);color:var(--gray-600);">${m.phone}</div>
                <div style="font-size:var(--text-xs);color:var(--gray-400);">${m.lga || '—'}</div>
              </div>
              <div style="font-size:var(--text-xs);color:var(--gray-600);">${m.farmType || '—'}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-400);">${fmtDate(m.joinedAt)}</div>
              <div>
                <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;background:${m.duesPaid?'#DCFCE7':'#FEE2E2'};color:${m.duesPaid?'#16A34A':'#DC2626'};">${m.duesPaid ? 'Paid' : 'Unpaid'}</span>
              </div>
              <button onclick="AC_SCREENS.showMemberOptions('${m.id}')" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--gray-400);">⋮</button>
            </div>
          `).join('')}`
      }
    </div>

    <div style="margin-top:12px;">
      <span style="font-size:var(--text-sm);color:var(--gray-500);">Showing ${members.length} of ${meta.total} member${meta.total !== 1 ? 's' : ''}</span>
    </div>
  </div>`;
},

_filterCoopMembers(query) {
  const wrap = document.getElementById('cm-table');
  if (!wrap || !AC_STATE._coopMembersCache) return;
  const q = (query || '').toLowerCase();
  const { data: members } = AC_STATE._coopMembersCache;
  const filtered = q ? members.filter(m =>
    m.name.toLowerCase().includes(q) ||
    (m.phone || '').includes(q) ||
    (m.lga || '').toLowerCase().includes(q) ||
    (m.farmType || '').toLowerCase().includes(q)
  ) : members;

  const fmtDate = iso => new Date(iso).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' });
  if (!filtered.length) {
    wrap.innerHTML = `<div style="padding:48px;text-align:center;color:var(--gray-400);">No members match your search.</div>`;
    return;
  }
  wrap.innerHTML = `
    <div style="display:grid;grid-template-columns:3fr 2fr 1.5fr 1fr 1fr 40px;min-width:640px;background:var(--gray-50);padding:11px 18px;border-bottom:1px solid var(--gray-200);">
      ${['Member','Phone / LGA','Crop(s)','Joined','Dues',''].map(h => `<div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.05em;">${h}</div>`).join('')}
    </div>
    ${filtered.map((m, i) => `
      <div style="display:grid;grid-template-columns:3fr 2fr 1.5fr 1fr 1fr 40px;min-width:640px;padding:13px 18px;border-bottom:${i < filtered.length-1 ? '1px solid var(--gray-100)' : 'none'};align-items:center;"
        onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;border-radius:50%;background:#E0F2FE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#0369A1;flex-shrink:0;">${m.name[0]}</div>
          <div>
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${m.name}</div>
            <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${m.isActive?'#DCFCE7':'#F3F4F6'};color:${m.isActive?'#16A34A':'var(--gray-500)'};">${m.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        <div>
          <div style="font-size:var(--text-xs);color:var(--gray-600);">${m.phone}</div>
          <div style="font-size:var(--text-xs);color:var(--gray-400);">${m.lga || '—'}</div>
        </div>
        <div style="font-size:var(--text-xs);color:var(--gray-600);">${m.farmType || '—'}</div>
        <div style="font-size:var(--text-xs);color:var(--gray-400);">${fmtDate(m.joinedAt)}</div>
        <div>
          <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;background:${m.duesPaid?'#DCFCE7':'#FEE2E2'};color:${m.duesPaid?'#16A34A':'#DC2626'};">${m.duesPaid ? 'Paid' : 'Unpaid'}</span>
        </div>
        <button onclick="AC_SCREENS.showMemberOptions('${m.id}')" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--gray-400);">⋮</button>
      </div>
    `).join('')}`;
},

showMemberOptions(id) {
  const cache = AC_STATE._coopMembersCache;
  if (!cache) return;
  const m = cache.data.find(x => x.id === id);
  if (!m) return;
  const status = m.isActive ? 'Mark Inactive' : 'Mark Active';
  const dues   = m.duesPaid  ? 'Mark Unpaid'   : 'Mark Dues Paid';
  showToast(`${m.name}: use admin panel for full edit`, 'info');
},

showAddMemberModal() {
  const existing = document.getElementById('add-member-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'add-member-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;';
  modal.innerHTML = `
    <div style="background:white;border-radius:var(--radius-xl);padding:28px;width:100%;max-width:420px;max-height:90vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">Add Member</h2>
        <button onclick="document.getElementById('add-member-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--gray-400);">×</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Full Name *</label>
          <input id="am-name" type="text" placeholder="e.g. Aminu Ibrahim" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Phone Number *</label>
          <input id="am-phone" type="tel" placeholder="+234 803 000 0000" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">LGA</label>
            <input id="am-lga" type="text" placeholder="e.g. Kaduna North" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">State</label>
            <input id="am-state" type="text" placeholder="e.g. Kaduna" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Farm Type / Crops</label>
          <input id="am-farm" type="text" placeholder="e.g. Maize, Sorghum" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <button id="am-submit" onclick="AC_SCREENS._submitAddMember()" style="width:100%;height:44px;background:#0EA5E9;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Add Member</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('am-name')?.focus();
},

async _submitAddMember() {
  const name     = document.getElementById('am-name')?.value?.trim();
  const phone    = document.getElementById('am-phone')?.value?.trim();
  const lga      = document.getElementById('am-lga')?.value?.trim() || undefined;
  const state    = document.getElementById('am-state')?.value?.trim() || undefined;
  const farmType = document.getElementById('am-farm')?.value?.trim() || undefined;

  if (!name)  { showToast('Name is required', 'error'); return; }
  if (!phone) { showToast('Phone number is required', 'error'); return; }

  const btn = document.getElementById('am-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Adding...'; }

  try {
    await AC_API.coop.addMember({ name, phone, lga, state, farmType });
    AC_STATE._coopMembersCache = undefined;
    document.getElementById('add-member-modal')?.remove();
    showToast(`${name} added successfully`, 'success');
    AC_ROUTER.show('coop-members');
  } catch (err) {
    showToast(err.message || 'Failed to add member', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Add Member'; }
  }
},

/* ─────────────────────────────────────────────
   COOP LOAN REQUEST
───────────────────────────────────────────── */
coopLoan() {
  const loanHistory = [
    { id:'LOAN-2026-001', amount:2500000, status:'Active',    disbursed:'Jan 15, 2026', balance:1000000, statusColor:'#16A34A' },
    { id:'LOAN-2025-008', amount:1800000, status:'Completed', disbursed:'Jun 10, 2025', balance:0,       statusColor:'#6B7280' },
    { id:'LOAN-2024-003', amount:1200000, status:'Completed', disbursed:'Feb 3, 2024',  balance:0,       statusColor:'#6B7280' },
  ];
  return `
  <div class="animate-fadeIn" style="max-width:720px;margin:0 auto;padding-bottom:40px;">
    <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Loan Request</h1>
    <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:24px;">Apply for group agricultural loans from partner institutions</p>

    <!-- ELIGIBILITY BANNER -->
    <div style="background:#DCFCE7;border:1px solid #BBF7D0;border-radius:var(--radius-md);padding:16px 20px;display:flex;align-items:center;gap:14px;margin-bottom:20px;">
      <span style="font-size:24px;">✅</span>
      <div>
        <div style="font-size:var(--text-sm);font-weight:700;color:#15803D;">Your cooperative is eligible for up to ₦5,000,000</div>
        <div style="font-size:var(--text-xs);color:#16A34A;">Based on 120 verified members, 3-year history, and repayment record</div>
      </div>
    </div>

    <!-- APPLICATION FORM -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;margin-bottom:20px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:18px;">New Loan Application</h3>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Lending Institution</label>
          <select id="cl-institution" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
            <option>Bank of Agriculture (BOA)</option>
            <option>NIRSAL Microfinance Bank</option>
            <option>CBN AGSMEIS Fund</option>
            <option>First Bank AgriLoan</option>
          </select>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Loan Amount (₦)</label>
            <input id="cl-amount" type="number" placeholder="e.g. 2500000" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Loan Duration</label>
            <select id="cl-duration" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
              <option>6 months</option><option selected>12 months</option><option>18 months</option><option>24 months</option>
            </select>
          </div>
        </div>

        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Purpose of Loan</label>
          <select id="cl-purpose" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
            <option>Seed Procurement</option><option>Equipment Purchase</option><option>Land Preparation</option>
            <option>Fertilizer & Chemicals</option><option>Post-Harvest Processing</option><option>Mixed Agric Activities</option>
          </select>
        </div>

        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Description / Justification</label>
          <textarea id="cl-description" rows="3" placeholder="Describe how this loan will be used and expected outcomes..." style="width:100%;padding:12px 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;resize:vertical;"></textarea>
        </div>

        <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:var(--radius-md);padding:14px 16px;">
          <div style="font-size:var(--text-sm);font-weight:700;color:#1D4ED8;margin-bottom:6px;">🌱 Spend-Locked Disbursement</div>
          <div style="font-size:var(--text-xs);color:#3B82F6;line-height:1.6;">Loan funds will be disbursed directly to your AgroConnect Agric Wallet. Spending is restricted to approved agricultural inputs - seeds, fertilizer, equipment - preventing diversion.</div>
        </div>

        <button id="loan-submit-btn" onclick="AC_SCREENS.submitLoanApplication()" style="width:100%;height:48px;background:#0EA5E9;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;"
          onmouseover="this.style.background='#0284C7'" onmouseout="this.style.background='#0EA5E9'">Submit Loan Application</button>
      </div>
    </div>

    <!-- LOAN HISTORY -->
    <div>
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Loan History</h3>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${loanHistory.map(l => `
          <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${l.id}</div>
              <span style="background:${l.statusColor}18;color:${l.statusColor};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${l.status}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
              ${[['Amount','₦'+l.amount.toLocaleString()],['Disbursed',l.disbursed],['Balance',l.balance?'₦'+l.balance.toLocaleString():'Cleared']].map(([k,v]) => `
                <div>
                  <div style="font-size:11px;color:var(--gray-400);margin-bottom:2px;">${k}</div>
                  <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${v}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   LOAN SUBMISSION HANDLER
───────────────────────────────────────────── */
async submitLoanApplication() {
  const amount    = parseFloat(document.getElementById('cl-amount')?.value);
  const purpose   = document.getElementById('cl-purpose')?.value?.trim();
  const duration  = document.getElementById('cl-duration')?.value;
  const desc      = document.getElementById('cl-description')?.value?.trim();
  const inst      = document.getElementById('cl-institution')?.value;

  if (!amount || amount < 10000) { showToast('Minimum loan amount is ₦10,000', 'error'); return; }
  if (!purpose)  { showToast('Please select a loan purpose', 'error'); return; }

  const btn = document.getElementById('loan-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

  try {
    await AC_API.loans.create({ amount, purpose, description: desc || undefined, duration });
    showToast('Application submitted! You will hear back within 72 hours.', 'success');
    AC_STATE.navigate('coop-dashboard');
  } catch (err) {
    showToast(err.message || 'Failed to submit application', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Loan Application'; }
  }
},

/* ─────────────────────────────────────────────
   COOP GROUP WALLET
───────────────────────────────────────────── */
coopWallet() {
  const transactions = [
    { type:'credit', label:'BOA Loan Disbursement',   sub:'LOAN-2026-001',      date:'Jan 15, 2026', amount:2500000 },
    { type:'debit',  label:'Seed Purchase (Group)',    sub:'SEEDCO Nigeria - 80kg',date:'Jan 18, 2026', amount:1200000 },
    { type:'debit',  label:'Fertilizer Purchase',     sub:'Notore Chemicals Ltd', date:'Jan 22, 2026', amount:480000  },
    { type:'credit', label:'Member Contribution',     sub:'Monthly dues - 120',   date:'Feb 1, 2026',  amount:240000  },
    { type:'debit',  label:'Equipment Rental',        sub:'Tractor - 3 days',     date:'Feb 5, 2026',  amount:45000   },
  ];
  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- BALANCE -->
    <div style="background:linear-gradient(135deg,#0369A1 0%,#0EA5E9 100%);border-radius:var(--radius-xl);padding:28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:160px;height:160px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.7);margin-bottom:4px;">🌱 Group Wallet - Kaduna North Coop</div>
        <div style="font-size:40px;font-weight:700;color:white;letter-spacing:-1px;margin-bottom:6px;">₦845,000</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
          <div style="background:rgba(255,255,255,0.15);border-radius:var(--radius-full);padding:4px 12px;font-size:11px;color:white;font-weight:600;">🌱 Agric Credit: ₦620,000</div>
          <div style="background:rgba(255,255,255,0.15);border-radius:var(--radius-full);padding:4px 12px;font-size:11px;color:white;font-weight:600;">🌱 Free: ₦225,000</div>
        </div>
        <div style="display:flex;gap:10px;">
          <button onclick="showToast('Payment request sent to BOA','success')" style="padding:9px 18px;background:white;color:#0369A1;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Request Funds</button>
          <button onclick="showToast('Spend report downloading...','success')" style="padding:9px 18px;background:rgba(255,255,255,0.15);color:white;border:1.5px solid rgba(255,255,255,0.4);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Export Report</button>
        </div>
      </div>
    </div>

    <!-- SPEND BREAKDOWN -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;margin-bottom:16px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Spend by Category</h3>
      ${[
        ['Seeds & Inputs','₦1,200,000',58,'#16A34A'],
        ['Fertilizer',    '₦480,000',  23,'#0EA5E9'],
        ['Equipment',     '₦45,000',   2, '#D97706'],
        ['Other',         '₦360,000',  17,'#7C3AED'],
      ].map(([cat,amt,pct,color]) => `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);">${cat}</span>
            <span style="font-size:var(--text-sm);font-weight:700;color:${color};">${amt} (${pct}%)</span>
          </div>
          <div style="background:var(--gray-200);border-radius:4px;height:8px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${color};border-radius:4px;"></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- TRANSACTIONS -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Recent Transactions</h3>
      <span style="font-size:var(--text-sm);color:#0EA5E9;font-weight:600;cursor:pointer;">View All →</span>
    </div>
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      ${transactions.map((t,i) => `
        <div style="display:flex;align-items:center;gap:14px;padding:15px 18px;${i<transactions.length-1?'border-bottom:1px solid var(--gray-100)':''};"
          onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
          <div style="width:36px;height:36px;border-radius:50%;background:${t.type==='credit'?'#DCFCE7':'#FEE2E2'};color:${t.type==='credit'?'#16A34A':'#DC2626'};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;flex-shrink:0;">${t.type==='credit'?'↓':'↑'}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${t.label}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-400);">${t.sub} - ${t.date}</div>
          </div>
          <div style="font-size:var(--text-sm);font-weight:700;color:${t.type==='credit'?'#16A34A':'#DC2626'};flex-shrink:0;">${t.type==='credit'?'+':'-'}₦${t.amount.toLocaleString()}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
},

});