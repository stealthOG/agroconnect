import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/institution/institution.js
   Institution screens: instDashboard, instCompliance,
   instLoanQueue, instGeoMap
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   INSTITUTION DASHBOARD
───────────────────────────────────────────── */
instDashboard() {
  const portfolioData = [40, 65, 55, 80, 70, 95, 85, 110, 100, 130, 120, 148];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const maxVal = Math.max(...portfolioData);
  const lgas = [
    { name:'Kaduna North',  cooperatives:8,  farmers:960,  disbursed:42000000, compliance:98 },
    { name:'Zaria',         cooperatives:5,  farmers:620,  disbursed:28500000, compliance:96 },
    { name:'Sabon Gari',    cooperatives:4,  farmers:480,  disbursed:19200000, compliance:94 },
    { name:'Kaduna South',  cooperatives:3,  farmers:340,  disbursed:15400000, compliance:99 },
    { name:'Jema\'a',       cooperatives:2,  farmers:240,  disbursed:9800000,  compliance:91 },
  ];

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- INSTITUTION HEADER -->
    <div style="background:linear-gradient(135deg,#1E3A5F 0%,#2563EB 100%);border-radius:var(--radius-xl);padding:28px 28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:200px;height:200px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:absolute;right:80px;bottom:-40px;width:120px;height:120px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
          <div style="width:48px;height:48px;background:white;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;">🌱️</div>
          <div>
            <div style="color:rgba(255,255,255,0.7);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">Institution Dashboard</div>
            <div style="color:white;font-size:var(--text-md);font-weight:700;">Bank of Agriculture - North West Zone</div>
          </div>
        </div>
        <p style="color:rgba(255,255,255,0.75);font-size:var(--text-sm);margin-bottom:20px;">Real-time agricultural loan portfolio - Spend-locked disbursements via AgroConnect</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button onclick="AC_STATE.navigate('inst-loan-queue')" style="padding:9px 18px;background:white;color:#1E3A5F;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Review Loan Queue</button>
          <button onclick="AC_STATE.navigate('inst-compliance')" style="padding:9px 18px;background:rgba(255,255,255,0.15);color:white;border:1.5px solid rgba(255,255,255,0.4);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Spend Compliance</button>
        </div>
      </div>
    </div>

    <!-- TOP KPIs -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">
      ${[
        { label:'Total Disbursed',  value:'₦2.5B',  sub:'Across 22 LGAs',         color:'#2563EB', bg:'#EFF6FF', icon:'🌱' },
        { label:'Active Borrowers', value:'12,450', sub:'Farmers & cooperatives',  color:'#16A34A', bg:'#DCFCE7', icon:'🌱' },
        { label:'Portfolio at Risk',value:'2.3%',   sub:'↓ 0.5% vs last quarter', color:'#D97706', bg:'#FEF3C7', icon:'⚠️' },
        { label:'Repayment Rate',   value:'97.1%',  sub:'₦1.45B collected',        color:'#7C3AED', bg:'#EDE9FE', icon:'✅' },
      ].map(k => `
        <div style="background:${k.bg};border-radius:var(--radius-md);padding:18px 14px;">
          <div style="font-size:20px;margin-bottom:6px;">${k.icon}</div>
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${k.label}</div>
          <div style="font-size:22px;font-weight:800;color:${k.color};margin-bottom:3px;">${k.value}</div>
          <div style="font-size:11px;color:var(--gray-400);">${k.sub}</div>
        </div>
      `).join('')}
    </div>

    <!-- PORTFOLIO CHART + QUICK ALERTS -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:16px;" class="inst-split">

      <!-- CHART -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:8px;">
          <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Disbursement Portfolio (₦M)</h3>
          <div style="display:flex;gap:4px;">
            ${['3M','6M','1Y','All'].map((t,i) => `<button style="padding:5px 10px;border-radius:var(--radius-sm);font-size:12px;font-weight:600;border:none;cursor:pointer;font-family:var(--font);background:${i===2?'#2563EB':'transparent'};color:${i===2?'white':'var(--gray-500)'};">${t}</button>`).join('')}
          </div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:140px;">
          ${portfolioData.map((v,i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="
                width:100%;border-radius:4px 4px 0 0;
                background:${i===months.length-1?'#2563EB':'#BFDBFE'};
                height:${Math.round((v/maxVal)*120)}px;
                transition:height .3s;
              "></div>
              <span style="font-size:9px;color:var(--gray-400);">${months[i]}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:20px;margin-top:16px;padding-top:14px;border-top:1px solid var(--gray-100);">
          ${[['Total Portfolio','₦2.5B','#2563EB'],['This Month','₦148M','#16A34A'],['Target','₦160M','#D97706']].map(([label,val,color]) => `
            <div>
              <div style="font-size:11px;color:var(--gray-400);">${label}</div>
              <div style="font-size:var(--text-md);font-weight:700;color:${color};">${val}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ALERTS -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Alerts</h3>
        ${[
          { icon:'🌱', color:'#FEE2E2', text:'3 loans flagged for unusual spending patterns', action:'Review', screen:'inst-compliance' },
          { icon:'🌱', color:'#FEF3C7', text:'12 cooperative applications pending approval',  action:'Review', screen:'inst-loan-queue' },
          { icon:'🌱', color:'#DCFCE7', text:'97.1% of October loans repaid on schedule',    action:'View',   screen:'inst-compliance' },
        ].map(a => `
          <div style="background:${a.color};border-radius:var(--radius-sm);padding:12px 14px;margin-bottom:8px;">
            <div style="font-size:var(--text-xs);color:var(--gray-700);margin-bottom:6px;">${a.icon} ${a.text}</div>
            <button onclick="AC_STATE.navigate('${a.screen}')" style="font-size:11px;font-weight:700;color:#2563EB;background:none;border:none;cursor:pointer;padding:0;font-family:var(--font);">${a.action} →</button>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- LGA BREAKDOWN TABLE -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Portfolio by LGA</h3>
        <button onclick="AC_STATE.navigate('inst-geo-map')" style="font-size:var(--text-sm);color:#2563EB;font-weight:600;background:none;border:none;cursor:pointer;font-family:var(--font);">View Map →</button>
      </div>
      <div style="overflow-x:auto;">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr 1.2fr;min-width:580px;background:var(--gray-50);padding:10px 18px;border-bottom:1px solid var(--gray-200);">
          ${['LGA','Cooperatives','Farmers','Disbursed','Compliance'].map(h => `<div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.05em;">${h}</div>`).join('')}
        </div>
        ${lgas.map((l,i) => `
          <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1.5fr 1.2fr;min-width:580px;padding:13px 18px;border-bottom:${i<lgas.length-1?'1px solid var(--gray-100)':'none'};align-items:center;"
            onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${l.name}</div>
            <div style="font-size:var(--text-sm);color:var(--gray-600);">${l.cooperatives}</div>
            <div style="font-size:var(--text-sm);color:var(--gray-600);">${l.farmers.toLocaleString()}</div>
            <div style="font-size:var(--text-sm);font-weight:700;color:#2563EB;">₦${(l.disbursed/1000000).toFixed(1)}M</div>
            <div>
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="flex:1;height:6px;background:var(--gray-200);border-radius:3px;overflow:hidden;">
                  <div style="width:${l.compliance}%;height:100%;background:${l.compliance>=95?'#16A34A':l.compliance>=90?'#D97706':'#EF4444'};border-radius:3px;"></div>
                </div>
                <span style="font-size:var(--text-xs);font-weight:700;color:${l.compliance>=95?'#16A34A':l.compliance>=90?'#D97706':'#EF4444'};">${l.compliance}%</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  <style>@media(max-width:768px){.inst-split{grid-template-columns:1fr!important}}</style>`;
},

/* ─────────────────────────────────────────────
   SPEND COMPLIANCE
───────────────────────────────────────────── */
instCompliance() {
  const transactions = [
    { id:'TXN-5621', cooperative:'Kaduna North FC',   amount:450000, category:'Seeds',      status:'Approved',  merchant:'SEEDCO Nigeria',     flag:false },
    { id:'TXN-5618', cooperative:'Zaria Farmers Coop',amount:85000,  category:'Restaurant', status:'Flagged',   merchant:'Alhaji Bukka Hut',   flag:true  },
    { id:'TXN-5615', cooperative:'Sabon Gari Agric',  amount:320000, category:'Fertilizer', status:'Approved',  merchant:'Notore Chemicals',   flag:false },
    { id:'TXN-5612', cooperative:'Kaduna South FC',   amount:75000,  category:'Clothing',   status:'Flagged',   merchant:'Tejuosho Market',    flag:true  },
    { id:'TXN-5609', cooperative:'Jema\'a Coop',      amount:180000, category:'Equipment',  status:'Approved',  merchant:'John Deere Nigeria',  flag:false },
    { id:'TXN-5606', cooperative:'Kachia Farmers',    amount:50000,  category:'Unknown',    status:'Flagged',   merchant:'Unknown Vendor',     flag:true  },
  ];
  const approved = transactions.filter(t=>!t.flag).length;
  const flagged  = transactions.filter(t=> t.flag).length;
  const total    = transactions.length;

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">🌱 Spend Compliance</h1>
      <p style="font-size:var(--text-base);color:var(--gray-500);">Monitor all spend-locked wallet activity in real time</p>
    </div>

    <!-- COMPLIANCE SUMMARY -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">
      ${[
        { label:'Transactions Today', value:total,    sub:'Last updated 2 mins ago', color:'#2563EB', bg:'#EFF6FF' },
        { label:'Approved',           value:approved, sub:'Agricultural spend',      color:'#16A34A', bg:'#DCFCE7' },
        { label:'Flagged',            value:flagged,  sub:'Require review',          color:'#EF4444', bg:'#FEE2E2' },
        { label:'Compliance Rate',    value:Math.round((approved/total)*100)+'%', sub:'Target: >95%', color:'#D97706', bg:'#FEF3C7' },
      ].map(s => `
        <div style="background:${s.bg};border-radius:var(--radius-md);padding:18px 14px;">
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${s.label}</div>
          <div style="font-size:26px;font-weight:800;color:${s.color};margin-bottom:3px;">${s.value}</div>
          <div style="font-size:11px;color:var(--gray-400);">${s.sub}</div>
        </div>
      `).join('')}
    </div>

    <!-- SPEND CATEGORIES PIE SUMMARY -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;margin-bottom:16px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Spend by Category (This Month)</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;">
        ${[
          ['🌱','Seeds & Inputs',  64,'#16A34A'],
          ['🌱','Fertilizer',     22,'#2563EB'],
          ['🌱','Equipment',       9,'#D97706'],
          ['❓','Non-Agric (Flagged)', 5,'#EF4444'],
        ].map(([icon,label,pct,color]) => `
          <div style="background:var(--gray-50);border-radius:var(--radius-sm);padding:14px 12px;border-left:4px solid ${color};">
            <div style="font-size:18px;margin-bottom:6px;">${icon}</div>
            <div style="font-size:11px;color:var(--gray-500);margin-bottom:2px;">${label}</div>
            <div style="font-size:var(--text-xl);font-weight:800;color:${color};">${pct}%</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- TRANSACTION TABLE -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Transaction Log</h3>
        <div style="display:flex;gap:8px;">
          <select style="height:36px;padding:0 10px;border:1px solid var(--gray-200);border-radius:var(--radius-sm);font-size:var(--text-sm);font-family:var(--font);background:white;cursor:pointer;">
            <option>All</option><option>Flagged Only</option><option>Approved Only</option>
          </select>
          <button onclick="showToast('Report exported 🌱','success')" style="height:36px;padding:0 14px;background:var(--green);color:white;border:none;border-radius:var(--radius-sm);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Export</button>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <div style="display:grid;grid-template-columns:1fr 2fr 1.2fr 1fr 1fr 80px;min-width:680px;background:var(--gray-50);padding:10px 18px;border-bottom:1px solid var(--gray-200);">
          ${['Txn ID','Cooperative','Amount','Category','Status','Action'].map(h => `<div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.05em;">${h}</div>`).join('')}
        </div>
        ${transactions.map((t,i) => `
          <div style="display:grid;grid-template-columns:1fr 2fr 1.2fr 1fr 1fr 80px;min-width:680px;padding:13px 18px;border-bottom:${i<transactions.length-1?'1px solid var(--gray-100)':'none'};align-items:center;background:${t.flag?'#FFF5F5':'white'};"
            onmouseover="this.style.background='${t.flag?'#FEE2E2':'var(--gray-50)'}'" onmouseout="this.style.background='${t.flag?'#FFF5F5':'white'}'">
            <div style="font-size:var(--text-xs);color:var(--gray-500);font-family:monospace;">${t.id}</div>
            <div>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${t.cooperative}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-400);">${t.merchant}</div>
            </div>
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">₦${t.amount.toLocaleString()}</div>
            <div>
              <span style="font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px;background:${t.flag?'#FEE2E2':'#DCFCE7'};color:${t.flag?'#DC2626':'#16A34A'};">${t.category}</span>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:20px;background:${t.flag?'#FEE2E2':'#DCFCE7'};color:${t.flag?'#DC2626':'#16A34A'};">${t.status}</span>
            </div>
            <div style="display:flex;gap:4px;">
              ${t.flag
                ? `<button onclick="showToast('Transaction blocked and reported','success')" style="padding:5px 8px;background:#EF4444;color:white;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Block</button>`
                : `<button onclick="showToast('Approved ✅','success')" style="padding:5px 8px;background:#DCFCE7;color:#16A34A;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">✓</button>`
              }
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   LOAN QUEUE
───────────────────────────────────────────── */
instLoanQueue() {
  const loans = [
    { id:'LAPPL-2026-0048', coop:'Kaduna North Farmers Coop', members:120, amount:2500000, purpose:'Seed Procurement',      state:'Kaduna', lga:'Kaduna North', submitted:'Feb 12, 2026', status:'Pending Review',   risk:'Low',    riskColor:'#16A34A' },
    { id:'LAPPL-2026-0047', coop:'Zaria Agric Society',       members:85,  amount:1800000, purpose:'Fertilizer Purchase',   state:'Kaduna', lga:'Zaria',        submitted:'Feb 11, 2026', status:'Under Review',    risk:'Low',    riskColor:'#16A34A' },
    { id:'LAPPL-2026-0046', coop:'Sabon Gari Farmers',        members:62,  amount:3200000, purpose:'Equipment Rental',      state:'Kaduna', lga:'Sabon Gari',   submitted:'Feb 10, 2026', status:'Pending Review',   risk:'Medium', riskColor:'#D97706' },
    { id:'LAPPL-2026-0045', coop:'Jema\'a Coop Society',      members:44,  amount:980000,  purpose:'Mixed Agric Activities',state:'Kaduna', lga:'Jema\'a',      submitted:'Feb 8, 2026',  status:'Approved',        risk:'Low',    riskColor:'#16A34A' },
    { id:'LAPPL-2026-0044', coop:'Kachia Progressive FC',     members:38,  amount:1500000, purpose:'Seed Procurement',      state:'Kaduna', lga:'Kachia',       submitted:'Feb 7, 2026',  status:'Rejected',        risk:'High',   riskColor:'#EF4444' },
  ];
  const statusColor = { 'Pending Review':'#D97706','Under Review':'#2563EB','Approved':'#16A34A','Rejected':'#EF4444' };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">🌱 Loan Queue</h1>
      <p style="font-size:var(--text-base);color:var(--gray-500);">Review and approve cooperative loan applications</p>
    </div>

    <!-- STATS -->
    <div class="grid-4" style="gap:12px;margin-bottom:20px;">
      ${[
        { label:'Total Pending',  value:'12',      color:'#D97706', bg:'#FEF3C7' },
        { label:'Under Review',   value:'4',       color:'#2563EB', bg:'#EFF6FF' },
        { label:'Approved Today', value:'3',       color:'#16A34A', bg:'#DCFCE7' },
        { label:'Total Pipeline', value:'₦48.2M',  color:'#7C3AED', bg:'#EDE9FE' },
      ].map(s => `
        <div style="background:${s.bg};border-radius:var(--radius-md);padding:18px 14px;">
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${s.label}</div>
          <div style="font-size:24px;font-weight:800;color:${s.color};">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- LOAN CARDS -->
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${loans.map(l => {
        const sc = statusColor[l.status] || '#6B7280';
        return `
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;transition:var(--transition);"
          onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <div>
              <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">${l.id}</div>
              <div style="font-size:var(--text-sm);color:var(--gray-500);">Submitted ${l.submitted}</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <span style="background:${l.riskColor}18;color:${l.riskColor};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${l.risk} Risk</span>
              <span style="background:${sc}18;color:${sc};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${l.status}</span>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:16px;">
            ${[
              ['Cooperative', l.coop],
              ['Members',     l.members + ' farmers'],
              ['Amount',      '₦' + l.amount.toLocaleString()],
              ['Purpose',     l.purpose],
              ['Location',    l.lga + ', ' + l.state],
            ].map(([k,v]) => `
              <div>
                <div style="font-size:11px;color:var(--gray-400);margin-bottom:2px;">${k}</div>
                <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${v}</div>
              </div>
            `).join('')}
          </div>
          ${l.status !== 'Approved' && l.status !== 'Rejected' ? `
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button onclick="showToast('Loan ${l.id} approved ✅','success')" style="padding:9px 20px;background:#16A34A;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Approve</button>
            <button onclick="showToast('Sent back for more information','success')" style="padding:9px 20px;background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Request Info</button>
            <button onclick="showToast('Loan ${l.id} rejected','error')" style="padding:9px 20px;background:white;color:#EF4444;border:1.5px solid #FCA5A5;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Reject</button>
          </div>
          ` : `<div style="padding:10px 14px;background:${sc}0d;border-radius:var(--radius-sm);font-size:var(--text-sm);color:${sc};font-weight:600;">Status: ${l.status}</div>`}
        </div>`;
      }).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   GEO MAP
───────────────────────────────────────────── */
instGeoMap() {
  const zones = [
    { zone:'North West',   states:['Kano','Kaduna','Katsina','Kebbi','Sokoto','Jigawa','Zamfara'],  farmers:3842, disbursed:890000000, compliance:96.2, color:'#16A34A', coords:[8.2,11.5]  },
    { zone:'North East',   states:['Borno','Gombe','Adamawa','Bauchi','Taraba','Yobe'],             farmers:2190, disbursed:480000000, compliance:93.8, color:'#2563EB', coords:[12.8,11.2] },
    { zone:'North Central',states:['Niger','Benue','Kogi','Kwara','Nasarawa','Plateau','FCT'],      farmers:2654, disbursed:620000000, compliance:95.1, color:'#7C3AED', coords:[8.7,9.1]   },
    { zone:'South West',   states:['Lagos','Ogun','Oyo','Osun','Ondo','Ekiti'],                     farmers:1820, disbursed:410000000, compliance:97.4, color:'#D97706', coords:[4.5,7.3]   },
    { zone:'South East',   states:['Enugu','Imo','Anambra','Abia','Ebonyi'],                        farmers:1240, disbursed:285000000, compliance:94.6, color:'#EF4444', coords:[7.5,6.2]   },
    { zone:'South South',  states:['Rivers','Delta','Cross River','Akwa Ibom','Bayelsa','Edo'],     farmers:1704, disbursed:365000000, compliance:95.8, color:'#0EA5E9', coords:[6.4,5.4]   },
  ];
  const hasMapbox = Boolean(window.AC_CONFIG?.MAPBOX_API_KEY);

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">🌱️ Geographic Portfolio Map</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">LGA-level disbursement data across all 36 states + FCT</p>
      </div>
      <div style="display:flex;gap:8px;">
        <select style="height:36px;padding:0 28px 0 10px;border:1px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);background:white;appearance:none;cursor:pointer;">
          <option>All States</option><option>North West</option><option>North East</option><option>South West</option>
        </select>
        <button onclick="showToast('GIS data exported','success')" style="height:36px;padding:0 14px;background:#2563EB;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Export GIS</button>
      </div>
    </div>

    <!-- MAP CONTAINER -->
    <div style="border-radius:var(--radius-xl);overflow:hidden;margin-bottom:20px;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      ${hasMapbox ? `
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css">
        <div id="agc-map" style="height:420px;width:100%;"></div>
      ` : `
        <div style="height:420px;background:linear-gradient(180deg,#e8f4f8 0%,#c8e6c9 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">
          <div style="font-size:14px;font-weight:600;color:#374151;background:white;padding:8px 18px;border-radius:var(--radius-full);box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            Set <code style="background:#F3F4F6;padding:2px 6px;border-radius:4px;">MAPBOX_API_KEY</code> in <code style="background:#F3F4F6;padding:2px 6px;border-radius:4px;">AC_CONFIG</code> to enable the interactive map
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:520px;">
            ${zones.map(z => `
              <div style="background:white;border-radius:12px;padding:10px 14px;box-shadow:0 2px 8px rgba(0,0,0,0.08);min-width:140px;border-left:4px solid ${z.color};">
                <div style="font-size:12px;font-weight:700;color:var(--gray-800);margin-bottom:4px;">${z.zone}</div>
                <div style="font-size:11px;color:var(--gray-500);">${z.farmers.toLocaleString()} farmers</div>
                <div style="font-size:11px;color:${z.color};font-weight:700;">${z.compliance}% compliance</div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    </div>

    <!-- LEGEND (only with live map) -->
    ${hasMapbox ? `
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
      ${[['#16A34A','High compliance (>95%)'],['#D97706','Medium (90–95%)'],['#EF4444','Low (<90%)']].map(([c,l]) => `
        <div style="display:flex;align-items:center;gap:7px;font-size:var(--text-xs);color:var(--gray-600);font-weight:600;">
          <div style="width:12px;height:12px;border-radius:50%;background:${c};flex-shrink:0;"></div> ${l}
        </div>
      `).join('')}
    </div>` : ''}

    <!-- ZONE CARDS -->
    <div>
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Portfolio by Geo-Zone</h2>
      <div class="grid-3" style="gap:14px;">
        ${zones.map(z => `
          <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;border-top:4px solid ${z.color};cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'"
            onclick="AC_SCREENS.flyToZone('${z.zone}',${z.coords[0]},${z.coords[1]})">
            <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:12px;">${z.zone}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              ${[['Farmers',z.farmers.toLocaleString()],['Disbursed','₦'+(z.disbursed/1000000).toFixed(0)+'M']].map(([k,v]) => `
                <div>
                  <div style="font-size:11px;color:var(--gray-400);">${k}</div>
                  <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">${v}</div>
                </div>
              `).join('')}
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span style="font-size:11px;color:var(--gray-500);">Compliance</span>
                <span style="font-size:11px;font-weight:700;color:${z.color};">${z.compliance}%</span>
              </div>
              <div style="background:var(--gray-200);border-radius:4px;height:6px;overflow:hidden;">
                <div style="width:${z.compliance}%;height:100%;background:${z.color};border-radius:4px;"></div>
              </div>
            </div>
            <div style="margin-top:10px;font-size:11px;color:var(--gray-400);">${z.states.length} states</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
},

/* Called by router.postRender after inst-geo-map renders */
initInstCharts() {
  const mapKey = window.AC_CONFIG?.MAPBOX_API_KEY;
  if (!mapKey) return;

  /* Load Mapbox GL JS script once */
  if (typeof mapboxgl !== 'undefined') {
    AC_SCREENS._initMap(mapKey);
    return;
  }
  const s = document.createElement('script');
  s.src   = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js';
  s.onload = () => AC_SCREENS._initMap(mapKey);
  document.head.appendChild(s);
},

_initMap(mapKey) {
  const container = document.getElementById('agc-map');
  if (!container || typeof mapboxgl === 'undefined') return;

  mapboxgl.accessToken = mapKey;

  const map = new mapboxgl.Map({
    container: 'agc-map',
    style:     'mapbox://styles/mapbox/light-v11',
    center:    [8.675, 9.082],  // Nigeria centroid
    zoom:      5.2,
    attributionControl: false,
  });

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

  const zoneMarkers = [
    { zone:'North West',   coords:[8.2, 11.5],  farmers:3842, compliance:96.2, color:'#16A34A' },
    { zone:'North East',   coords:[12.8, 11.2], farmers:2190, compliance:93.8, color:'#2563EB' },
    { zone:'North Central',coords:[8.7,  9.1],  farmers:2654, compliance:95.1, color:'#7C3AED' },
    { zone:'South West',   coords:[4.5,  7.3],  farmers:1820, compliance:97.4, color:'#D97706' },
    { zone:'South East',   coords:[7.5,  6.2],  farmers:1240, compliance:94.6, color:'#EF4444' },
    { zone:'South South',  coords:[6.4,  5.4],  farmers:1704, compliance:95.8, color:'#0EA5E9' },
  ];

  map.on('load', () => {
    zoneMarkers.forEach(z => {
      const el = document.createElement('div');
      el.style.cssText = [
        'width:48px;height:48px;border-radius:50%',
        `background:${z.color}`,
        'border:3px solid white',
        'display:flex;align-items:center;justify-content:center',
        'color:white;font-size:11px;font-weight:800',
        'box-shadow:0 2px 10px rgba(0,0,0,0.25);cursor:pointer',
      ].join(';');
      el.textContent = (z.farmers / 1000).toFixed(1) + 'k';

      new mapboxgl.Marker({ element: el })
        .setLngLat(z.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <strong style="font-size:13px;">${z.zone}</strong><br>
            <span style="font-size:12px;">${z.farmers.toLocaleString()} farmers</span><br>
            <span style="font-size:12px;color:${z.color};font-weight:700;">${z.compliance}% compliance</span>
          `)
        )
        .addTo(map);
    });
  });

  AC_STATE._mapInstance = map;
},

flyToZone(_zone, lng, lat) {
  const map = AC_STATE._mapInstance;
  if (map && typeof mapboxgl !== 'undefined') {
    map.flyTo({ center: [lng, lat], zoom: 7, duration: 1200, essential: true });
  }
},

});