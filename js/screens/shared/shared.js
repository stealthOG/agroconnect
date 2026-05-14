/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/shared/shared.js
   Shared screens: home, learning, experts, expertProfile,
   logistics, wallet, financing, notifications, profile,
   settings, whatsapp
   ═══════════════════════════════════════════════════════════ */

import AC_SCREENS from '../../screens-init.js';

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   HOME DASHBOARD
───────────────────────────────────────────── */
home() {
  const wallet = AC_DATA.wallet || {};
  const recentOrders = (AC_DATA.orders || []).slice(0, 3);
  const featuredSeeds = (AC_DATA.products || [])
    .filter(s => s.inputType === 'seeds' && s.verification === 'nasc' && s.inStock)
    .slice(0, 4);
  const recentTx = (wallet.transactions || []).slice(0, 3);
  return `
  <div class="animate-fadeIn">
    <!-- HERO -->
    <div style="background:linear-gradient(135deg,#1a7a3c 0%,#22a350 100%);border-radius:var(--radius-xl);padding:36px 32px;margin-bottom:24px;position:relative;overflow:hidden;">
      <div style="position:absolute;width:260px;height:260px;background:rgba(255,255,255,0.06);border-radius:50%;top:-80px;right:60px;pointer-events:none;"></div>
      <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.04);border-radius:50%;bottom:-60px;right:-30px;pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <h1 style="color:white;font-size:var(--text-3xl);font-weight:700;margin-bottom:8px;line-height:1.2;">Welcome to AgroConnect</h1>
        <p style="color:rgba(255,255,255,0.85);font-size:var(--text-base);margin-bottom:24px;">Empowering Nigerian Farmers Through Digital Innovation</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button onclick="AC_STATE.navigate('input-market')" style="background:white;color:#1E8B4C;border:none;border-radius:var(--radius-full);padding:11px 24px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;"
            onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='white'">Get Started</button>
          <button onclick="AC_STATE.navigate('learning')" style="background:transparent;color:white;border:2px solid rgba(255,255,255,0.7);border-radius:var(--radius-full);padding:11px 24px;font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;"
            onmouseover="this.style.borderColor='white'" onmouseout="this.style.borderColor='rgba(255,255,255,0.7)'">Learn More</button>
        </div>
      </div>
    </div>

    <!-- STATS -->
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

    <!-- KEY FEATURES -->
    <div style="margin-bottom:32px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Key Features</h2>
      <div class="grid-3">
        ${[
          { icon:'🌱', title:'Input Marketplace',   desc:'Buy seeds, fertilizers, crop protection and equipment from verified suppliers across Nigeria', screen:'input-market' },
          { icon:'🌱', title:'Skill Development',   desc:'Access courses and training from agricultural experts', screen:'learning' },
          { icon:'🌱', title:'Easy Financing',      desc:'Get agricultural and export loans with reduced interest rates', screen:'wallet' },
          { icon:'🌱', title:'Logistics Support',   desc:'Connect with warehousing and transport partners', screen:'logistics' },
          { icon:'🌱', title:'Expert Network',      desc:'Connect with industry leaders and researchers', screen:'experts' },
          { icon:'🌾', title:'Produce Marketplace', desc:'Sell your farm produce directly to buyers nationwide', screen:'list-produce' },
        ].map(f => `
          <div onclick="AC_STATE.navigate('${f.screen}')" class="feature-card" style="cursor:pointer;">
            <div style="font-size:32px;margin-bottom:12px;">${f.icon}</div>
            <div style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:6px;">${f.title}</div>
            <div style="font-size:var(--text-sm);color:var(--gray-500);line-height:1.5;">${f.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div style="margin-bottom:16px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Quick Actions</h2>
      <div class="grid-4" style="gap:12px;">
        ${[
          { icon:'🌱', label:'Buy Inputs',  screen:'input-market', color:'#e8f5ee', border:'#d4eddc' },
          { icon:'🌱', label:'My Wallet',   screen:'wallet',       color:'#ede9fe', border:'#ddd6fe' },
          { icon:'🌱', label:'My Orders',   screen:'order-history',color:'#dbeafe', border:'#bfdbfe' },
          { icon:'🌱', label:'Find Expert', screen:'experts',      color:'#fef3c7', border:'#fde68a' },
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
  <style>@media(max-width:768px){.home-two-col{grid-template-columns:1fr!important}}</style>`;
},

/* ─────────────────────────────────────────────
   LEARNING HOME
───────────────────────────────────────────── */
learning() {
  if (AC_STATE._coursesCache === undefined) {
    AC_STATE._coursesCache = null;
    AC_API.courses.list({ limit: 20 }).then(res => {
      AC_STATE._coursesCache = (res.data ?? res).filter(c => c.isPublished !== false);
      if (AC_STATE.currentScreen === 'learning') AC_ROUTER.show('learning');
    }).catch(() => {
      if (!window.AC_CONFIG?.API_BASE_URL) {
        AC_STATE._coursesCache = [
          { id:'c1', title:'Maize Farming Masterclass', description:'Learn hybrid maize cultivation from seed selection to harvest.', price:0,    duration:'6 hrs', enrollCount:1245, rating:4.8, isPublished:true, modules:[{id:'m1',title:'Introduction to Maize',videoUrl:'https://www.youtube.com/watch?v=dQw4w9WgXcQ',duration:'45 min',order:0},{id:'m2',title:'Soil Preparation',videoUrl:null,duration:'30 min',order:1}], expert:{name:'Dr. Adewale Ogunlade',avatarUrl:null,state:'Kaduna'} },
          { id:'c2', title:'Rice Cultivation Essentials', description:'Master rice farming for Nigerian climate conditions.', price:5000, duration:'4 hrs', enrollCount:890,  rating:4.5, isPublished:true, modules:[{id:'m3',title:'Rice Varieties',videoUrl:null,duration:'30 min',order:0}], expert:{name:'Dr. Chioma Nwosu',avatarUrl:null,state:'Anambra'} },
          { id:'c3', title:'Tomato Farming Business',    description:'Turn tomato farming into a profitable business venture.',  price:0,    duration:'5 hrs', enrollCount:2104, rating:4.9, isPublished:true, modules:[{id:'m4',title:'Market Overview',videoUrl:null,duration:'40 min',order:0}], expert:{name:'Mrs. Blessing Okoro',avatarUrl:null,state:'Lagos'} },
        ];
      } else {
        AC_STATE._coursesCache = undefined;
      }
      if (AC_STATE.currentScreen === 'learning') AC_ROUTER.show('learning');
    });
  }

  if (AC_STATE._coursesCache === null)      return AC_UI.listSkeletons(6);
  if (AC_STATE._coursesCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._coursesCache=undefined;AC_ROUTER.show('learning')" });

  const courses = AC_STATE._coursesCache.filter(c => c.isPublished);

  const _card = (c) => `
    <div onclick="AC_STATE.selectedCourse=AC_STATE._coursesCache.find(x=>x.id==='${c.id}');AC_STATE.navigate('course-detail')"
      style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;cursor:pointer;transition:var(--transition);"
      onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-2px)'"
      onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)'">
      <div style="background:#e8f5ee;height:160px;display:flex;align-items:center;justify-content:center;font-size:64px;">
        ${c.imageUrl ? `<img src="${c.imageUrl}" style="width:100%;height:100%;object-fit:cover;">` : '📚'}
      </div>
      <div style="padding:16px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:6px;line-height:1.3;">${c.title}</h3>
        <p style="font-size:var(--text-sm);color:var(--gray-500);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${c.description || ''}</p>
        <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;">
          ${c.duration ? `<span style="font-size:var(--text-xs);color:var(--gray-400);">⏱ ${c.duration}</span>` : ''}
          <span style="font-size:var(--text-xs);color:var(--gray-400);">👥 ${(c.enrollCount||0).toLocaleString()} enrolled</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          ${c.rating ? `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#f59e0b;font-size:13px;">★</span><span style="font-size:var(--text-sm);font-weight:700;color:var(--gray-800);">${c.rating.toFixed(1)}</span></div>` : '<span></span>'}
          <span style="font-size:var(--text-md);font-weight:700;color:${c.price===0?'var(--green)':'var(--gray-900)'};">${c.price===0?'Free':'₦'+c.price.toLocaleString()}</span>
        </div>
        <button onclick="event.stopPropagation();AC_STATE.selectedCourse=AC_STATE._coursesCache.find(x=>x.id==='${c.id}');AC_STATE.navigate('course-detail')"
          style="width:100%;padding:10px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">
          ${c.price === 0 ? 'Enrol Free' : 'View Course'}
        </button>
      </div>
    </div>`;

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- HEADER -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">Skill Development</h1>
        <p style="font-size:var(--text-base);color:var(--gray-500);">Learn modern farming techniques from industry experts</p>
      </div>
      <button onclick="AC_STATE.navigate('my-courses')" style="padding:9px 18px;background:var(--green-pale);color:var(--green);border:1.5px solid var(--green);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">My Courses →</button>
    </div>

    ${courses.length === 0
      ? AC_UI.empty({ icon:'📚', title:'No courses available yet', message:'Check back soon — experts are creating content.' })
      : `
      <!-- POPULAR -->
      <div style="margin-bottom:32px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Popular Courses</h2>
        <div class="grid-3" style="gap:20px;">
          ${courses.slice(0, 3).map(_card).join('')}
        </div>
      </div>

      ${courses.length > 3 ? `
      <div style="margin-bottom:32px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">More Courses</h2>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${courses.slice(3).map(c => `
            <div onclick="AC_STATE.selectedCourse=AC_STATE._coursesCache.find(x=>x.id==='${c.id}');AC_STATE.navigate('course-detail')"
              style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;display:flex;gap:16px;align-items:center;cursor:pointer;transition:var(--transition);"
              onmouseover="this.style.boxShadow='var(--shadow)';this.style.borderColor='var(--gray-300)'"
              onmouseout="this.style.boxShadow='none';this.style.borderColor='var(--gray-200)'">
              <div style="width:72px;height:72px;background:#e8f5ee;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:36px;flex-shrink:0;">📚</div>
              <div style="flex:1;min-width:0;">
                <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:4px;">${c.title}</h3>
                <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.description || ''}</p>
                <div style="display:flex;gap:12px;align-items:center;">
                  ${c.rating ? `<span style="color:#f59e0b;font-size:12px;">★</span><span style="font-size:var(--text-xs);color:var(--gray-700);font-weight:600;">${c.rating.toFixed(1)}</span>` : ''}
                  ${c.duration ? `<span style="font-size:var(--text-xs);color:var(--gray-400);">⏱ ${c.duration}</span>` : ''}
                  <span style="font-size:var(--text-xs);color:var(--gray-400);">👥 ${(c.enrollCount||0).toLocaleString()}</span>
                </div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:var(--text-md);font-weight:700;color:${c.price===0?'var(--green)':'var(--gray-900)'};margin-bottom:8px;">${c.price===0?'Free':'₦'+c.price.toLocaleString()}</div>
                <button onclick="event.stopPropagation();AC_STATE.selectedCourse=AC_STATE._coursesCache.find(x=>x.id==='${c.id}');AC_STATE.navigate('course-detail')"
                  style="padding:7px 16px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;">
                  View
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `}

    <!-- RESOURCES -->
    <div>
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Agricultural Research & Resources</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${[
          { icon:'📄', title:'Climate-Smart Agriculture Guide', desc:'Research paper on adapting to climate change' },
          { icon:'🧪', title:'Soil Health Assessment Tools',    desc:'Interactive tools for soil testing and analysis' },
          { icon:'📊', title:'Agric Market Weekly',            desc:'Weekly price updates for major crops in Nigeria' },
          { icon:'🔬', title:'Crop Disease Diagnostic Tool',   desc:'Identify diseases from symptoms and get treatment tips' },
        ].map(r => `
          <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'"
            onclick="showToast('Download starting...','success')">
            <div style="width:44px;height:44px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${r.icon}</div>
            <div style="flex:1;">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${r.title}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-500);">${r.desc}</div>
            </div>
            <span style="font-size:var(--text-sm);color:var(--green);font-weight:600;white-space:nowrap;">Download →</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   COURSE DETAIL
───────────────────────────────────────────── */
courseDetail() {
  const course = AC_STATE.selectedCourse;
  if (!course) return `<div style="padding:40px;text-align:center;color:var(--gray-400);">No course selected.</div>`;

  const modules = course.modules || [];
  const enrolled = course.enrollment || null;

  return `
  <div class="animate-fadeIn" style="max-width:760px;margin:0 auto;padding:24px 24px 48px;">
    <button onclick="AC_STATE.navigate('learning')" style="background:none;border:none;color:var(--green);font-weight:600;font-size:14px;cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;">← Back to Courses</button>

    <!-- HERO -->
    <div style="background:linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%);border-radius:var(--radius-xl);padding:32px;margin-bottom:24px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-size:80px;opacity:0.2;">📚</div>
      <span style="background:rgba(255,255,255,0.2);color:white;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);display:inline-block;margin-bottom:12px;">${course.price === 0 ? 'FREE' : '₦' + course.price.toLocaleString()}</span>
      <h1 style="color:white;font-size:var(--text-2xl);font-weight:700;margin-bottom:8px;line-height:1.3;">${course.title}</h1>
      <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm);margin-bottom:16px;max-width:520px;">${course.description || ''}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        ${course.duration ? `<span style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);">⏱ ${course.duration}</span>` : ''}
        <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);">👥 ${(course.enrollCount||0).toLocaleString()} enrolled</span>
        ${course.rating ? `<span style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);">★ ${course.rating.toFixed(1)}</span>` : ''}
        <span style="font-size:var(--text-xs);color:rgba(255,255,255,0.7);">📋 ${modules.length} module${modules.length!==1?'s':''}</span>
      </div>
    </div>

    <!-- EXPERT -->
    ${course.expert ? `
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;gap:14px;">
      <div style="width:48px;height:48px;border-radius:50%;background:#dbeafe;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#1d4ed8;flex-shrink:0;">${course.expert.name[0]}</div>
      <div>
        <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${course.expert.name}</div>
        <div style="font-size:var(--text-xs);color:var(--gray-500);">Expert Instructor${course.expert.state ? ' · ' + course.expert.state : ''}</div>
      </div>
    </div>` : ''}

    <!-- PROGRESS (if enrolled) -->
    ${enrolled ? `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:16px 20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:var(--text-sm);font-weight:700;color:#15803d;">Your Progress</span>
        <span style="font-size:var(--text-sm);font-weight:700;color:#16a34a;">${enrolled.progress}%</span>
      </div>
      <div style="background:#dcfce7;border-radius:4px;height:8px;overflow:hidden;">
        <div style="width:${enrolled.progress}%;height:100%;background:var(--green);border-radius:4px;transition:width .3s;"></div>
      </div>
      ${enrolled.completedAt ? `<div style="font-size:var(--text-xs);color:#16a34a;margin-top:6px;">✓ Completed on ${new Date(enrolled.completedAt).toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'})}</div>` : ''}
    </div>` : ''}

    <!-- MODULES -->
    ${modules.length > 0 ? `
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;margin-bottom:20px;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin:0;">Course Modules</h3>
      </div>
      ${modules.map((m, i) => `
        <div style="display:flex;align-items:center;gap:14px;padding:14px 20px;${i < modules.length-1 ? 'border-bottom:1px solid var(--gray-100)' : ''};cursor:pointer;"
          onclick="${enrolled ? `AC_STATE.selectedCourse=AC_STATE.selectedCourse;AC_STATE._playerModule=${i};AC_STATE.navigate('course-player')` : `AC_SCREENS.enrollCourse('${course.id}')`}"
          onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
          <div style="width:32px;height:32px;border-radius:50%;background:${enrolled ? '#dbeafe' : 'var(--gray-100)'};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:${enrolled ? '#1d4ed8' : 'var(--gray-400)'};flex-shrink:0;">${i+1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${m.title}</div>
            ${m.duration ? `<div style="font-size:var(--text-xs);color:var(--gray-400);">⏱ ${m.duration}</div>` : ''}
          </div>
          <span style="font-size:18px;color:var(--gray-300);">${enrolled ? '▶' : '🔒'}</span>
        </div>
      `).join('')}
    </div>` : ''}

    <!-- ENROL CTA -->
    ${!enrolled ? `
    <button id="enrol-btn" onclick="AC_SCREENS.enrollCourse('${course.id}')"
      style="width:100%;padding:14px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;">
      ${course.price === 0 ? 'Enrol Free — Start Learning' : `Pay ₦${course.price.toLocaleString()} & Enrol`}
    </button>` : `
    <button onclick="AC_STATE._playerModule=0;AC_STATE.navigate('course-player')"
      style="width:100%;padding:14px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;">
      ${enrolled.progress > 0 ? 'Continue Learning' : 'Start Course'}
    </button>`}
  </div>`;
},

async enrollCourse(courseId) {
  const course = AC_STATE.selectedCourse;
  const btn    = document.getElementById('enrol-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Enrolling...'; }

  try {
    if (course?.price > 0) {
      // Initialise Paystack payment
      const user  = AC_STATE.user;
      const init  = await AC_API.payments.initialize({ amount: course.price, email: user.email, purpose: 'course', entityId: courseId });
      AC_PAY.openPopup({
        email:      user.email,
        amount:     course.price,
        accessCode: init.data?.accessCode,
        reference:  init.data?.reference,
        onSuccess: async (ref) => {
          await AC_API.courses.enrol(courseId, { paystackRef: ref });
          AC_STATE._enrolledCache = undefined;
          AC_STATE.selectedCourse = { ...course, enrollment: { progress: 0, completedAt: null } };
          showToast('Enrolled! Welcome to the course.', 'success');
          AC_ROUTER.show('course-detail');
        },
        onClose: () => {
          if (btn) { btn.disabled = false; btn.textContent = `Pay ₦${course.price.toLocaleString()} & Enrol`; }
        },
      });
      return;
    }

    // Free enrol
    await AC_API.courses.enrol(courseId);
    AC_STATE._enrolledCache = undefined;
    AC_STATE.selectedCourse = { ...course, enrollment: { progress: 0, completedAt: null } };
    showToast('Enrolled! Welcome to the course.', 'success');
    AC_ROUTER.show('course-detail');
  } catch (err) {
    showToast(err.message || 'Enrolment failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = course?.price > 0 ? `Pay ₦${course.price.toLocaleString()} & Enrol` : 'Enrol Free — Start Learning'; }
  }
},

/* ─────────────────────────────────────────────
   COURSE PLAYER
───────────────────────────────────────────── */
coursePlayer() {
  const course  = AC_STATE.selectedCourse;
  const modules = course?.modules || [];
  const idx     = AC_STATE._playerModule ?? 0;
  const module  = modules[idx];
  const enroll  = course?.enrollment;

  if (!course || !module) return `<div style="padding:40px;text-align:center;color:var(--gray-400);">No course loaded.</div>`;

  const progress = enroll ? Math.max(enroll.progress, Math.round(((idx+1)/modules.length)*100)) : 0;

  // Extract YouTube/Vimeo ID for embed
  const embedUrl = (url) => {
    if (!url) return null;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=0&rel=0`;
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
    return url;
  };
  const embed = embedUrl(module.videoUrl);

  return `
  <div class="animate-fadeIn" style="max-width:860px;margin:0 auto;padding:20px 20px 48px;">
    <!-- TOP NAV -->
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <button onclick="AC_STATE.navigate('course-detail')" style="background:none;border:none;color:var(--green);font-weight:600;font-size:14px;cursor:pointer;padding:0;font-family:inherit;">← ${course.title}</button>
      <span style="font-size:var(--text-sm);color:var(--gray-400);margin-left:auto;">${idx+1} / ${modules.length}</span>
    </div>

    <!-- VIDEO -->
    <div style="background:#111;border-radius:var(--radius-md);overflow:hidden;aspect-ratio:16/9;margin-bottom:16px;display:flex;align-items:center;justify-content:center;">
      ${embed
        ? `<iframe src="${embed}" style="width:100%;height:100%;border:none;" allowfullscreen loading="lazy"></iframe>`
        : `<div style="color:white;font-size:14px;text-align:center;padding:40px;">
            <div style="font-size:48px;margin-bottom:12px;">▶</div>
            <div>${module.videoUrl ? 'Video not embeddable. <a href="${module.videoUrl}" target="_blank" style="color:#60a5fa;">Open in new tab →</a>' : 'No video for this module.'}</div>
           </div>`
      }
    </div>

    <!-- MODULE INFO + PROGRESS -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;margin-bottom:16px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">${module.title}</h2>
      ${module.duration ? `<div style="font-size:var(--text-sm);color:var(--gray-400);margin-bottom:14px;">⏱ ${module.duration}</div>` : '<div style="margin-bottom:14px;"></div>'}
      <div style="display:flex;gap:4px;margin-bottom:6px;">
        ${modules.map((_, i) => `<div style="height:4px;flex:1;border-radius:2px;background:${i <= idx ? 'var(--green)' : 'var(--gray-200)'};"></div>`).join('')}
      </div>
      <div style="font-size:var(--text-xs);color:var(--gray-400);">${progress}% complete</div>
    </div>

    <!-- NAVIGATION -->
    <div style="display:flex;gap:10px;">
      ${idx > 0
        ? `<button onclick="AC_STATE._playerModule=${idx-1};AC_ROUTER.show('course-player')"
             style="flex:1;padding:12px;background:white;color:var(--gray-700);border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">← Previous</button>`
        : ''
      }
      ${idx < modules.length - 1
        ? `<button id="next-btn" onclick="AC_SCREENS._advanceModule(${idx}, ${modules.length}, '${course.id}')"
             style="flex:2;padding:12px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Mark Complete & Next →</button>`
        : `<button id="next-btn" onclick="AC_SCREENS._advanceModule(${idx}, ${modules.length}, '${course.id}')"
             style="flex:2;padding:12px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Complete Course ✓</button>`
      }
    </div>

    <!-- MODULE LIST (sidebar feel) -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;margin-top:16px;">
      <div style="padding:14px 20px;border-bottom:1px solid var(--gray-100);font-size:var(--text-sm);font-weight:700;color:var(--gray-700);">All Modules</div>
      ${modules.map((m, i) => `
        <div onclick="AC_STATE._playerModule=${i};AC_ROUTER.show('course-player')"
          style="display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;background:${i===idx?'var(--green-pale)':'white'};${i<modules.length-1?'border-bottom:1px solid var(--gray-100)':''}"
          onmouseover="if(${i}!==AC_STATE._playerModule)this.style.background='var(--gray-50)'" onmouseout="if(${i}!==AC_STATE._playerModule)this.style.background='${i===idx?'var(--green-pale)':'white'}'">
          <div style="width:26px;height:26px;border-radius:50%;background:${i <= idx ? 'var(--green)' : 'var(--gray-200)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${i <= idx ? 'white' : 'var(--gray-500)'};flex-shrink:0;">${i <= idx ? '✓' : i+1}</div>
          <div style="flex:1;font-size:var(--text-sm);font-weight:${i===idx?'700':'400'};color:${i===idx?'var(--green)':'var(--gray-700)'};">${m.title}</div>
          ${m.duration ? `<span style="font-size:var(--text-xs);color:var(--gray-400);">${m.duration}</span>` : ''}
        </div>
      `).join('')}
    </div>
  </div>`;
},

async _advanceModule(idx, total, courseId) {
  const btn      = document.getElementById('next-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }
  const newIdx   = idx + 1;
  const progress = Math.round((newIdx / total) * 100);

  try {
    await AC_API.courses.updateProgress(courseId, progress);
    if (AC_STATE.selectedCourse?.enrollment) {
      AC_STATE.selectedCourse.enrollment.progress = progress;
      if (progress === 100) AC_STATE.selectedCourse.enrollment.completedAt = new Date().toISOString();
    }
    AC_STATE._enrolledCache = undefined;
    if (newIdx >= total) {
      showToast('Course completed! Great work.', 'success');
      AC_STATE.navigate('course-detail');
    } else {
      AC_STATE._playerModule = newIdx;
      AC_ROUTER.show('course-player');
    }
  } catch (err) {
    showToast(err.message || 'Could not save progress', 'error');
    if (btn) { btn.disabled = false; btn.textContent = newIdx < total ? 'Mark Complete & Next →' : 'Complete Course ✓'; }
  }
},

/* ─────────────────────────────────────────────
   MY COURSES
───────────────────────────────────────────── */
myCourses() {
  if (AC_STATE._enrolledCache === undefined) {
    AC_STATE._enrolledCache = null;
    AC_API.courses.enrolled().then(res => {
      AC_STATE._enrolledCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'my-courses') AC_ROUTER.show('my-courses');
    }).catch(() => {
      AC_STATE._enrolledCache = !window.AC_CONFIG?.API_BASE_URL ? [] : undefined;
      if (AC_STATE.currentScreen === 'my-courses') AC_ROUTER.show('my-courses');
    });
  }

  if (AC_STATE._enrolledCache === null)      return AC_UI.listSkeletons(4);
  if (AC_STATE._enrolledCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._enrolledCache=undefined;AC_ROUTER.show('my-courses')" });

  const enrollments = AC_STATE._enrolledCache;

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">My Courses</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${enrollments.length} course${enrollments.length!==1?'s':''} enrolled</p>
      </div>
      <button onclick="AC_STATE.navigate('learning')" style="padding:9px 18px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Browse Courses</button>
    </div>

    ${enrollments.length === 0
      ? AC_UI.empty({ icon:'📚', title:"You haven't enrolled in any courses yet", message:'Browse available courses and start learning.' })
      : `<div style="display:flex;flex-direction:column;gap:14px;">
          ${enrollments.map(e => {
            const c   = e.course;
            const pct = e.progress || 0;
            return `
            <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;display:flex;gap:16px;align-items:flex-start;cursor:pointer;transition:var(--transition);"
              onclick="AC_STATE.selectedCourse={...${JSON.stringify({id:c.id,title:c.title,description:c.description,price:c.price,duration:c.duration,imageUrl:c.imageUrl,enrollCount:c.enrollCount,rating:c.rating,expert:c.expert,modules:c.modules})},enrollment:{progress:${pct},completedAt:${e.completedAt?`'${e.completedAt}'`:'null'}}};AC_STATE.navigate('course-detail')"
              onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
              <div style="width:64px;height:64px;background:#dbeafe;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">📚</div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
                  <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin:0;">${c.title}</h3>
                  ${e.completedAt
                    ? `<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0;">Completed</span>`
                    : pct > 0
                      ? `<span style="background:#dbeafe;color:#1d4ed8;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0;">In Progress</span>`
                      : `<span style="background:#f3f4f6;color:var(--gray-500);font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0;">Not Started</span>`
                  }
                </div>
                <div style="font-size:var(--text-xs);color:var(--gray-500);margin-bottom:10px;">By ${c.expert?.name || 'Expert'} · ${(c.modules||[]).length} modules</div>
                <div style="background:var(--gray-200);border-radius:4px;height:6px;overflow:hidden;margin-bottom:4px;">
                  <div style="width:${pct}%;height:100%;background:var(--green);border-radius:4px;transition:width .3s;"></div>
                </div>
                <div style="display:flex;justify-content:space-between;">
                  <span style="font-size:var(--text-xs);color:var(--gray-400);">${pct}% complete</span>
                  <span style="font-size:var(--text-xs);color:var(--green);font-weight:600;">${pct === 0 ? 'Start →' : pct < 100 ? 'Continue →' : 'Review →'}</span>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>`
    }
  </div>`;
},

/* ─────────────────────────────────────────────
   EXPERTS LISTING
───────────────────────────────────────────── */
experts() {
  const experts = [
    { id:'e1', emoji:'🌱‍🌱', name:'Dr. Adewale Ogunlade',  title:'Agricultural Extension Officer', specs:['Crop Production','Soil Science'],    rating:4.9, years:15, sessions:123, fee:5000  },
    { id:'e2', emoji:'🌱‍🌱', name:'Dr. Chioma Nwosu',      title:'Agronomist',                     specs:['Pest Control','IPM'],               rating:4.8, years:12, sessions:189, fee:4500  },
    { id:'e3', emoji:'🌱‍🌱', name:'Prof. Ibrahim Mohammed',title:'Soil Scientist',                 specs:['Soil Health','Fertilization'],      rating:4.9, years:20, sessions:156, fee:6000  },
    { id:'e4', emoji:'🌱‍🌱', name:'Mrs. Blessing Okoro',   title:'Farm Business Consultant',       specs:['Agribusiness','Marketing'],         rating:4.7, years:8,  sessions:209, fee:3500  },
    { id:'e5', emoji:'🌱‍⚕️', name:'Mr. Yusuf Abdullahi',  title:'Livestock Specialist',            specs:['Poultry','Animal Health'],          rating:4.8, years:10, sessions:178, fee:4000  },
    { id:'e6', emoji:'🌱‍🌱', name:'Dr. Fatima Bello',      title:'Plant Pathologist',              specs:['Disease Control','Diagnostics'],    rating:4.9, years:14, sessions:145, fee:5500  },
  ];
  const specColors = {
    'Crop Production':'#dcfce7','Soil Science':'#dbeafe','Pest Control':'#fef3c7','IPM':'#e0f2fe',
    'Soil Health':'#d1fae5','Fertilization':'#fce7f3','Agribusiness':'#ede9fe','Marketing':'#ffedd5',
    'Poultry':'#fef9c3','Animal Health':'#fee2e2','Disease Control':'#f3f4f6','Diagnostics':'#e0f2fe',
  };
  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">Agricultural Experts</h1>
      <p style="font-size:var(--text-base);color:var(--gray-500);">Get expert advice from certified agricultural professionals</p>
    </div>

    <!-- SEARCH + FILTERS -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;align-items:center;">
      <div style="flex:1;min-width:220px;position:relative;">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400);">🌱</span>
        <input type="text" placeholder="Search by name or specialization..."
          style="width:100%;height:42px;padding:0 14px 0 36px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);background:white;box-sizing:border-box;"
          onfocus="this.style.borderColor='var(--green)'" onblur="this.style.borderColor='var(--gray-200)'">
      </div>
      <select style="height:42px;padding:0 32px 0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);background:white;appearance:none;cursor:pointer;">
        <option>All Specializations</option>
        <option>Crop Production</option><option>Soil Science</option><option>Pest Control</option>
        <option>Agribusiness</option><option>Livestock</option><option>Irrigation</option>
      </select>
      <select style="height:42px;padding:0 32px 0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-sm);font-family:var(--font);background:white;appearance:none;cursor:pointer;">
        <option>Highest Rated</option>
        <option>Most Sessions</option><option>Price: Low to High</option><option>Price: High to Low</option>
      </select>
    </div>

    <!-- EXPERT CARDS GRID -->
    <div class="grid-3" style="gap:20px;">
      ${experts.map(e => `
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:28px 20px 24px;text-align:center;transition:var(--transition);"
          onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-3px)'"
          onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)'">
          <!-- AVATAR -->
          <div style="width:80px;height:80px;border-radius:50%;background:#e8f5ee;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 12px;border:3px solid #bbf7d0;">
            ${e.emoji}
          </div>
          <!-- VERIFIED BADGE -->
          <div style="display:inline-block;background:var(--green);color:white;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);margin-bottom:12px;">✓ Verified</div>
          <!-- NAME + TITLE -->
          <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:4px;">${e.name}</h3>
          <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:12px;">${e.title}</p>
          <!-- SPEC TAGS -->
          <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;">
            ${e.specs.map(s => `<span style="background:${specColors[s]||'#f3f4f6'};color:var(--gray-700);font-size:11px;font-weight:600;padding:3px 10px;border-radius:var(--radius-full);">${s}</span>`).join('')}
          </div>
          <!-- STATS -->
          <div style="display:flex;justify-content:center;gap:10px;margin-bottom:14px;font-size:var(--text-xs);color:var(--gray-500);">
            <span>⭐ ${e.rating}</span>
            <span>-</span>
            <span>${e.years} years exp</span>
            <span>-</span>
            <span>${e.sessions} sessions</span>
          </div>
          <!-- FEE + BOOK -->
          <div style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:14px;">
            Consultation Fee: <strong style="color:var(--green);font-size:var(--text-md);">₦${e.fee.toLocaleString()} / hr</strong>
          </div>
          <button onclick="AC_STATE.selectedExpert='${e.id}';AC_STATE.navigate('expert-profile')" style="width:100%;padding:11px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;transition:var(--transition);"
            onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='var(--green)'">Book Consultation</button>
        </div>
      `).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   EXPERT PROFILE
───────────────────────────────────────────── */
expertProfile() {
  const expertId = AC_STATE.selectedExpert;
  if (!expertId) return `<div style="padding:40px;text-align:center;color:var(--gray-400);">No expert selected.</div>`;

  // Sub-caches keyed by expert ID
  if (!AC_STATE._expertProfileCache) AC_STATE._expertProfileCache = {};
  if (!AC_STATE._expertSlotsCache)   AC_STATE._expertSlotsCache   = {};

  if (AC_STATE._expertProfileCache[expertId] === undefined) {
    AC_STATE._expertProfileCache[expertId] = null;
    AC_API.experts.get(expertId).then(res => {
      AC_STATE._expertProfileCache[expertId] = res.data ?? res;
      if (AC_STATE.currentScreen === 'expert-profile') AC_ROUTER.show('expert-profile');
    }).catch(() => {
      AC_STATE._expertProfileCache[expertId] = {
        id: expertId, name: 'Expert', avatarUrl: null,
        lga: null, state: null, institution: null,
      };
      if (AC_STATE.currentScreen === 'expert-profile') AC_ROUTER.show('expert-profile');
    });
  }

  if (AC_STATE._expertSlotsCache[expertId] === undefined) {
    AC_STATE._expertSlotsCache[expertId] = null;
    AC_API.experts.slots(expertId).then(res => {
      AC_STATE._expertSlotsCache[expertId] = res.data ?? res;
      if (AC_STATE.currentScreen === 'expert-profile') AC_ROUTER.show('expert-profile');
    }).catch(() => {
      AC_STATE._expertSlotsCache[expertId] = [];
      if (AC_STATE.currentScreen === 'expert-profile') AC_ROUTER.show('expert-profile');
    });
  }

  if (AC_STATE._expertProfileCache[expertId] === null) return AC_UI.listSkeletons(3);

  const e     = AC_STATE._expertProfileCache[expertId];
  const slots = AC_STATE._expertSlotsCache[expertId] ?? null;

  const fmtSlot = (s) => {
    const d = new Date(s.startAt);
    const end = new Date(s.endAt);
    return `${d.toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short'})} · ${d.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'})} – ${end.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'})}`;
  };

  return `
  <div class="animate-fadeIn" style="max-width:900px;margin:0 auto;padding-bottom:40px;">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
      <button onclick="AC_STATE.navigate('experts')" style="color:var(--green);font-size:var(--text-sm);font-weight:600;background:none;border:none;cursor:pointer;padding:0;font-family:var(--font);">← Back to Experts</button>
      <span style="margin-left:auto;"></span>
      <button onclick="AC_STATE.navigate('my-consultations')" style="padding:8px 16px;background:var(--green-pale);color:var(--green);border:1.5px solid var(--green);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">My Consultations</button>
    </div>

    <!-- PROFILE HEADER -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:28px;margin-bottom:20px;">
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
        <div style="width:90px;height:90px;border-radius:50%;background:#e8f5ee;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:var(--green);border:3px solid #bbf7d0;flex-shrink:0;">${e.name[0]}</div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">
            <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin:0;">${e.name}</h1>
            <span style="background:var(--green);color:white;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);">✓ Verified Expert</span>
          </div>
          ${e.institution ? `<p style="font-size:var(--text-base);color:var(--gray-500);margin-bottom:8px;">${e.institution}</p>` : ''}
          ${(e.lga||e.state) ? `<div style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:12px;">📍 ${[e.lga,e.state].filter(Boolean).join(', ')}</div>` : ''}
        </div>
      </div>
    </div>

    <!-- AVAILABLE SLOTS -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:24px;margin-bottom:20px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Available Consultation Slots</h3>

      ${slots === null
        ? `<div style="display:flex;flex-direction:column;gap:10px;">${[1,2,3].map(()=>`<div style="height:56px;background:var(--gray-100);border-radius:8px;animation:pulse 1.5s infinite;"></div>`).join('')}</div>`
        : slots.length === 0
          ? `<div style="padding:24px;text-align:center;color:var(--gray-400);background:var(--gray-50);border-radius:var(--radius-sm);">No available slots right now. Check back later.</div>`
          : `<div style="display:flex;flex-direction:column;gap:10px;">
              ${slots.map(s => `
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);flex-wrap:wrap;">
                  <div>
                    <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${fmtSlot(s)}</div>
                    <div style="font-size:var(--text-xs);color:var(--gray-500);margin-top:2px;">${s.price === 0 ? 'Free consultation' : '₦' + s.price.toLocaleString()}</div>
                  </div>
                  <button onclick="AC_STATE.selectedSlot=${JSON.stringify({id:s.id,startAt:s.startAt,endAt:s.endAt,price:s.price,expertId:'${expertId}',expertName:'${e.name}'})};AC_STATE.navigate('book-consultation')"
                    style="padding:9px 20px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;flex-shrink:0;">
                    Book ${s.price > 0 ? '· ₦'+s.price.toLocaleString() : 'Free'}
                  </button>
                </div>
              `).join('')}
            </div>`
      }
    </div>
  </div>
  <style>@media(max-width:768px){.expert-split{grid-template-columns:1fr!important}}</style>`;
},

/* ─────────────────────────────────────────────
   BOOK CONSULTATION
───────────────────────────────────────────── */
consultationBooking() {
  const slot = AC_STATE.selectedSlot;
  if (!slot) return `<div style="padding:40px;text-align:center;color:var(--gray-400);">No slot selected.</div>`;

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-NG', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  };
  const fmtTime = (s, e) => {
    const fmt = (iso) => new Date(iso).toLocaleTimeString('en-NG', { hour:'2-digit', minute:'2-digit' });
    return `${fmt(s)} – ${fmt(e)}`;
  };

  return `
  <div class="animate-fadeIn" style="max-width:520px;margin:0 auto;padding:24px 24px 48px;">
    <button onclick="AC_STATE.navigate('expert-profile')" style="background:none;border:none;color:var(--green);font-weight:600;font-size:14px;cursor:pointer;padding:0;margin-bottom:24px;font-family:inherit;">← Back to Profile</button>
    <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Book Consultation</h1>
    <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:24px;">Confirm your booking with ${slot.expertName}</p>

    <!-- SLOT SUMMARY -->
    <div style="background:var(--green-pale);border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:20px;margin-bottom:20px;">
      <div style="font-size:var(--text-sm);font-weight:700;color:#15803d;margin-bottom:10px;">Session Details</div>
      ${[
        ['Expert',   slot.expertName],
        ['Date',     fmtDate(slot.startAt)],
        ['Time',     fmtTime(slot.startAt, slot.endAt)],
        ['Platform', 'Jitsi Meet (link sent on confirmation)'],
        ['Fee',      slot.price === 0 ? 'Free' : '₦' + slot.price.toLocaleString()],
      ].map(([k,v]) => `
        <div style="display:flex;gap:10px;margin-bottom:6px;">
          <span style="font-size:var(--text-sm);color:var(--gray-500);min-width:70px;">${k}</span>
          <span style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${v}</span>
        </div>
      `).join('')}
    </div>

    <!-- NOTES -->
    <div style="margin-bottom:20px;">
      <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Notes for the expert (optional)</label>
      <textarea id="book-notes" rows="3" placeholder="Describe what you'd like to discuss — your crop, farm size, specific problem..."
        style="width:100%;padding:12px 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;resize:vertical;"></textarea>
    </div>

    <button id="book-btn" onclick="AC_SCREENS.confirmBooking()"
      style="width:100%;padding:14px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;">
      ${slot.price === 0 ? 'Confirm Booking' : `Pay ₦${slot.price.toLocaleString()} & Book`}
    </button>
    <p style="font-size:var(--text-xs);color:var(--gray-400);text-align:center;margin-top:10px;">You will receive a meeting link once confirmed.</p>
  </div>`;
},

async confirmBooking() {
  const slot  = AC_STATE.selectedSlot;
  const notes = document.getElementById('book-notes')?.value?.trim();
  const btn   = document.getElementById('book-btn');
  if (!slot) return;

  if (slot.price > 0) {
    if (btn) { btn.disabled = true; btn.textContent = 'Opening payment...'; }
    try {
      const user = AC_STATE.user;
      const init = await AC_API.payments.initialize({ amount: slot.price, email: user.email, purpose: 'consultation', entityId: slot.id });
      AC_PAY.openPopup({
        email:      user.email,
        amount:     slot.price,
        accessCode: init.data?.accessCode,
        reference:  init.data?.reference,
        onSuccess: async (ref) => {
          await AC_API.consultations.book({ slotId: slot.id, notes: notes || undefined, paystackRef: ref });
          AC_STATE._consultationsCache = undefined;
          if (AC_STATE._expertSlotsCache) AC_STATE._expertSlotsCache[slot.expertId] = undefined;
          showToast('Booking confirmed! Check your consultations for the meeting link.', 'success');
          AC_STATE.navigate('my-consultations');
        },
        onClose: () => {
          if (btn) { btn.disabled = false; btn.textContent = `Pay ₦${slot.price.toLocaleString()} & Book`; }
        },
      });
    } catch (err) {
      showToast(err.message || 'Booking failed', 'error');
      if (btn) { btn.disabled = false; btn.textContent = `Pay ₦${slot.price.toLocaleString()} & Book`; }
    }
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Booking...'; }
  try {
    await AC_API.consultations.book({ slotId: slot.id, notes: notes || undefined });
    AC_STATE._consultationsCache = undefined;
    if (AC_STATE._expertSlotsCache) AC_STATE._expertSlotsCache[slot.expertId] = undefined;
    showToast('Booking confirmed! Check your consultations for the meeting link.', 'success');
    AC_STATE.navigate('my-consultations');
  } catch (err) {
    showToast(err.message || 'Booking failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Confirm Booking'; }
  }
},

/* ─────────────────────────────────────────────
   MY CONSULTATIONS
───────────────────────────────────────────── */
myConsultations() {
  if (AC_STATE._consultationsCache === undefined) {
    AC_STATE._consultationsCache = null;
    AC_API.consultations.list().then(res => {
      AC_STATE._consultationsCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'my-consultations') AC_ROUTER.show('my-consultations');
    }).catch(() => {
      AC_STATE._consultationsCache = !window.AC_CONFIG?.API_BASE_URL ? [] : undefined;
      if (AC_STATE.currentScreen === 'my-consultations') AC_ROUTER.show('my-consultations');
    });
  }

  if (AC_STATE._consultationsCache === null)      return AC_UI.listSkeletons(3);
  if (AC_STATE._consultationsCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._consultationsCache=undefined;AC_ROUTER.show('my-consultations')" });

  const consultations = AC_STATE._consultationsCache;
  const role = AC_STATE.user?.role;
  const now  = new Date();

  const statusColor = { pending:'#D97706', confirmed:'#2563EB', completed:'#16A34A', cancelled:'#6B7280' };
  const statusBg    = { pending:'#FEF3C7', confirmed:'#DBEAFE', completed:'#DCFCE7', cancelled:'#F3F4F6' };

  const upcoming = consultations.filter(c => new Date(c.slot.startAt) > now && c.status !== 'cancelled');
  const past     = consultations.filter(c => new Date(c.slot.startAt) <= now || c.status === 'cancelled');

  const _card = (c) => {
    const other = role === 'expert' ? c.farmer : c.expert;
    const label = role === 'expert' ? 'Farmer' : 'Expert';
    const d     = new Date(c.slot.startAt);
    const end   = new Date(c.slot.endAt);
    const fmt   = (dt) => dt.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'});
    const isUpcoming = d > now && c.status !== 'cancelled';
    return `
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:20px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
        <div>
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${other?.name || label}</div>
          <div style="font-size:var(--text-xs);color:var(--gray-400);margin-top:2px;">${d.toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short',year:'numeric'})} · ${fmt(d)} – ${fmt(end)}</div>
        </div>
        <span style="background:${statusBg[c.status]};color:${statusColor[c.status]};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:capitalize;flex-shrink:0;">${c.status}</span>
      </div>
      ${c.notes ? `<p style="font-size:var(--text-xs);color:var(--gray-500);margin-bottom:12px;font-style:italic;">"${c.notes}"</p>` : ''}
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${isUpcoming ? `
          <a href="${c.meetingUrl}" target="_blank" rel="noopener"
            style="padding:8px 16px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;text-decoration:none;display:inline-block;">
            Join Meeting
          </a>` : ''}
        ${role === 'expert' && c.status === 'pending' ? `
          <button onclick="AC_SCREENS._updateConsultStatus('${c.id}','confirmed')" style="padding:8px 16px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Confirm</button>
          <button onclick="AC_SCREENS._updateConsultStatus('${c.id}','cancelled')" style="padding:8px 16px;background:white;color:#DC2626;border:1.5px solid #FCA5A5;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Decline</button>
        ` : ''}
        ${role === 'expert' && c.status === 'confirmed' && d <= now ? `
          <button onclick="AC_SCREENS._updateConsultStatus('${c.id}','completed')" style="padding:8px 16px;background:#2563EB;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Mark Complete</button>
        ` : ''}
      </div>
    </div>`;
  };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">My Consultations</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${consultations.length} total · ${upcoming.length} upcoming</p>
      </div>
      <button onclick="AC_STATE.navigate('experts')" style="padding:9px 18px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Find Experts</button>
    </div>

    ${consultations.length === 0
      ? AC_UI.empty({ icon:'📅', title:'No consultations yet', message:'Browse experts and book your first consultation.' })
      : `
      ${upcoming.length > 0 ? `
        <h2 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:12px;">Upcoming (${upcoming.length})</h2>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
          ${upcoming.map(_card).join('')}
        </div>
      ` : ''}
      ${past.length > 0 ? `
        <h2 style="font-size:var(--text-md);font-weight:700;color:var(--gray-500);margin-bottom:12px;">Past (${past.length})</h2>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${past.map(_card).join('')}
        </div>
      ` : ''}
    `}
  </div>`;
},

async _updateConsultStatus(id, status) {
  try {
    await AC_API.consultations.update(id, { status });
    AC_STATE._consultationsCache = undefined;
    showToast(`Consultation ${status}`, 'success');
    AC_ROUTER.show('my-consultations');
  } catch (err) {
    showToast(err.message || 'Update failed', 'error');
  }
},

/* ─────────────────────────────────────────────
   LOGISTICS & TRACKING
───────────────────────────────────────────── */
logistics() {
  const shipments = [
    { id:'AGR-2026-001234', items:3, value:94000, from:'Kaduna Agro Hub',   to:'45 Ahmadu Bello Way, Kaduna', track:'GIG-2026-5678',  status:'In Transit',      statusColor:'#2563EB' },
    { id:'AGR-2026-001188', items:2, value:45000, from:'Lagos Agro Hub',    to:'36 Marina Street, Lagos',     track:'KWIK-2024-3456', status:'Out for Delivery', statusColor:'#16A34A' },
  ];
  const hubs = [
    { name:'Kaduna Central Agro Hub', addr:'23 Ahmadu Bello Way, Kaduna', phone:'+234 803 456 7890', hours:'Mon-Sat: 8:00 AM - 6:00 PM', dist:'2.5 km' },
    { name:'Lagos Island Agro Hub',   addr:'14 Broad Street, Lagos Island', phone:'+234 805 234 5678', hours:'Mon-Sat: 7:00 AM - 7:00 PM', dist:'5.1 km' },
    { name:'Abuja Central Agro Hub',  addr:'Plot 123, Area 11, Garki, Abuja', phone:'+234 807 987 6543', hours:'Mon-Sat: 8:00 AM - 6:00 PM', dist:'8.3 km' },
  ];
  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">Logistics & Tracking</h1>
      <p style="font-size:var(--text-base);color:var(--gray-500);">Track your shipments and find agro hubs near you</p>
    </div>

    <!-- TRACK WIDGET -->
    <div id="track-widget" style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:32px;margin-bottom:20px;text-align:center;">
      <div style="font-size:48px;margin-bottom:12px;">🌱</div>
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:20px;">Track Your Shipment</h2>
      <div style="display:flex;gap:10px;max-width:560px;margin:0 auto 12px;">
        <input id="track-input" type="text" placeholder="Enter order code or tracking number..."
          style="flex:1;height:48px;padding:0 18px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);font-size:var(--text-base);font-family:var(--font);"
          onfocus="this.style.borderColor='var(--green)'" onblur="this.style.borderColor='var(--gray-200)'">
        <button onclick="AC_SCREENS._trackShipment()" style="height:48px;padding:0 24px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;white-space:nowrap;"
          onmouseover="this.style.background='#197a43'" onmouseout="this.style.background='var(--green)'">Track Shipment</button>
      </div>
      <p style="font-size:var(--text-xs);color:var(--gray-400);">🌱 Tip: You can find your tracking code in your order confirmation email</p>
      <div id="track-result" style="display:none;margin-top:20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:16px;text-align:left;">
        <div style="font-size:var(--text-sm);font-weight:700;color:#15803d;margin-bottom:6px;">🌱 Order Found: AGR-2026-001234</div>
        <div style="font-size:var(--text-sm);color:var(--gray-600);">Status: <strong>In Transit</strong> - ETA: Tomorrow by 5pm</div>
      </div>
    </div>

    <!-- QUICK LINKS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px;">
      ${[
        { icon:'🌱️', label:'Find Agro Hubs',  sub:'Locate pickup & drop-off points' },
        { icon:'🌱', label:'Delivery Rates',  sub:'View shipping costs by location'  },
      ].map(q => `
        <div onclick="showToast('Feature coming soon','')" style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:var(--transition);"
          onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:44px;height:44px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:22px;">${q.icon}</div>
            <div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${q.label}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-400);">${q.sub}</div>
            </div>
          </div>
          <span style="color:var(--gray-400);font-size:18px;">→</span>
        </div>
      `).join('')}
    </div>

    <!-- ACTIVE SHIPMENTS -->
    <div style="margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">Active Shipments</h2>
        <span style="font-size:var(--text-sm);color:var(--green);font-weight:600;cursor:pointer;">View All →</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;" class="logistics-grid">
        ${shipments.map(s => `
          <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">Order #${s.id}</div>
              <span style="background:${s.statusColor}18;color:${s.statusColor};font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);">${s.status}</span>
            </div>
            <div style="font-size:var(--text-xs);color:var(--gray-400);margin-bottom:6px;">${s.items} items - ₦${s.value.toLocaleString()}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-500);margin-bottom:2px;">🌱 From: ${s.from}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-500);margin-bottom:12px;">🌱 To: ${s.to}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:var(--text-xs);color:var(--gray-400);">Track: ${s.track}</span>
              <button onclick="showToast('Live tracking map coming soon','')" style="padding:7px 14px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;">Track Now</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- HUB PICKUP REMINDER -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-md);padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
      <span style="font-size:20px;">⚠️</span>
      <div style="flex:1;">
        <div style="font-size:var(--text-sm);font-weight:700;color:#92400e;margin-bottom:2px;">Hub Pickup Reminder</div>
        <div style="font-size:var(--text-sm);color:#78350f;">Order #AGR-2024-001087 is ready for pickup at Abuja Agro Hub. Collect by Feb 25, 2026.</div>
      </div>
      <button onclick="showToast('Details loading...','success')" style="padding:8px 16px;background:#d97706;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;white-space:nowrap;">View Details</button>
    </div>

    <!-- NEARBY HUBS -->
    <div>
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Nearby Agro Hubs</h2>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${hubs.map(h => `
          <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 20px;display:flex;gap:14px;align-items:flex-start;">
            <div style="width:44px;height:44px;background:var(--green-pale);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">🌱</div>
            <div style="flex:1;">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);margin-bottom:3px;">${h.name}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-500);">🌱 ${h.addr}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-500);">🌱 ${h.phone}</div>
              <div style="font-size:var(--text-xs);color:var(--gray-500);">🌱 ${h.hours}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--green);margin-bottom:6px;">${h.dist}</div>
              <button onclick="showToast('Directions opening...','success')" style="padding:6px 12px;background:var(--green-pale);color:var(--green);border:1px solid #bbf7d0;border-radius:var(--radius-full);font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;">Directions</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  <style>@media(max-width:640px){.logistics-grid{grid-template-columns:1fr!important}}</style>`;
},

async _trackShipment() {
  const val    = document.getElementById('track-input')?.value?.trim();
  const result = document.getElementById('track-result');
  const btn    = document.querySelector('#track-widget button');
  if (!val) { showToast('Please enter an order number or tracking code', 'error'); return; }
  if (result) { result.innerHTML = '<div style="color:var(--gray-400);font-size:13px;">Searching…</div>'; result.style.display = 'block'; }
  if (btn) btn.disabled = true;

  try {
    /* Try as order number first */
    const orders = await AC_API.orders.list({ search: val });
    const list   = orders.data ?? orders;
    const order  = Array.isArray(list) ? list.find(o => (o.orderNumber||o.id).includes(val.toUpperCase())) : null;

    if (order && (order.trackingCode || order.carrier)) {
      const tracking = await AC_API.orders.tracking(order.id);
      const t = tracking.data;
      if (t) {
        const eventsHtml = (t.events || []).slice().reverse().map((ev, i, arr) => `
          <div style="display:flex;gap:10px;${i<arr.length-1?'margin-bottom:10px':''}">
            <div style="width:8px;height:8px;border-radius:50%;background:${i===0?'#1E8B4C':'#D1D5DB'};flex-shrink:0;margin-top:4px;"></div>
            <div>
              <div style="font-size:13px;font-weight:600;color:var(--gray-900);">${ev.description}</div>
              <div style="font-size:11px;color:var(--gray-400);">${ev.location} · ${new Date(ev.timestamp).toLocaleString('en-NG',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
            </div>
          </div>`).join('');
        if (result) result.innerHTML = `
          <div style="font-size:13px;font-weight:700;color:#15803d;margin-bottom:8px;">Order #${order.orderNumber||order.id} — ${t.carrier}</div>
          <div style="font-size:12px;color:var(--gray-600);margin-bottom:12px;">Tracking: <strong>${t.trackingCode}</strong>${t.estimatedDate?` · Est. ${new Date(t.estimatedDate).toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'long'})}`:''}
          </div>
          ${eventsHtml || '<div style="font-size:13px;color:var(--gray-400);">No tracking events yet.</div>'}`;
        return;
      }
    }
    if (result) result.innerHTML = `<div style="font-size:13px;color:var(--gray-600);">No shipment found for <strong>${val}</strong>. Check the order number and try again.</div>`;
  } catch {
    if (result) result.innerHTML = `<div style="font-size:13px;color:#DC2626;">Could not fetch tracking info. Please try again.</div>`;
  } finally {
    if (btn) btn.disabled = false;
  }
},

/* ─────────────────────────────────────────────
   WALLET
───────────────────────────────────────────── */
wallet() {
  // undefined=not started, null=loading, {...}=loaded
  if (AC_STATE._walletCache === undefined) {
    AC_STATE._walletCache = null;
    Promise.all([AC_DL.fetchWallet(), AC_DL.fetchTransactions()]).then(([wallet, txs]) => {
      AC_STATE._walletCache = { ...wallet, transactions: txs };
      if (AC_STATE.currentScreen === 'wallet') AC_ROUTER.show('wallet');
    }).catch(() => {
      AC_STATE._walletCache = undefined;
      if (AC_STATE.currentScreen === 'wallet') AC_ROUTER.show('wallet');
    });
  }

  // Show spinner on first load
  if (AC_STATE._walletCache === null) {
    return AC_UI.spinner('Loading wallet…');
  }
  if (AC_STATE._walletCache === undefined) {
    return AC_UI.error({ message: 'Could not load wallet', retryFn: "AC_STATE._walletCache=undefined;AC_ROUTER.show('wallet')" });
  }

  const walletData   = AC_STATE._walletCache;
  const transactions = Array.isArray(walletData.transactions) && walletData.transactions.length
    ? walletData.transactions
    : (AC_DATA.wallet?.transactions || []);
  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- BALANCE CARD -->
    <div style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);border-radius:var(--radius-xl);padding:28px 28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-30px;top:-30px;width:180px;height:180px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <div style="font-size:20px;margin-bottom:6px;">🌱</div>
      <div style="font-size:var(--text-sm);color:rgba(255,255,255,0.7);margin-bottom:4px;">Available Balance</div>
      <div style="font-size:40px;font-weight:700;color:white;letter-spacing:-1px;margin-bottom:4px;">${formatNaira(walletData.balance ?? 0)}</div>
      <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.5);margin-bottom:24px;">Last updated 2 mins ago</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button onclick="AC_STATE.navigate('financing')" style="padding:10px 22px;background:white;color:#4F46E5;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Fund Wallet</button>
        <button onclick="AC_STATE.navigate('financing')" style="padding:10px 22px;background:rgba(255,255,255,0.15);color:white;border:1.5px solid rgba(255,255,255,0.4);border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Withdraw</button>
      </div>
    </div>

    <!-- STATS -->
    <div class="grid-4" style="gap:10px;margin-bottom:24px;">
      ${[
        ['Total Income','₦1,450,000','#16A34A'],
        ['Total Spent','₦1,204,250','#EF4444'],
        ['This Month','₦185,500','#2563EB'],
        ['Pending','₦2,000','#D97706'],
      ].map(([label,val,color]) => `
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:14px 12px;text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--gray-500);margin-bottom:4px;">${label}</div>
          <div style="font-size:var(--text-md);font-weight:700;color:${color};">${val}</div>
        </div>
      `).join('')}
    </div>

    <!-- QUICK ACTIONS -->
    <div class="grid-4" style="gap:10px;margin-bottom:24px;">
      ${[['🌱','Fund','financing'],['🌱','Withdraw','financing'],['🌱','History','logistics'],['🌱','Pay Bills','financing']].map(([icon,label,screen]) => `
        <button onclick="AC_STATE.navigate('${screen}')" style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:var(--transition);font-family:var(--font);"
          onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
          <span style="font-size:24px;">${icon}</span>
          <span style="font-size:12px;font-weight:600;color:var(--gray-700);">${label}</span>
        </button>
      `).join('')}
    </div>

    <!-- TRANSACTIONS -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <h3 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">Recent Transactions</h3>
      <span onclick="AC_STATE.navigate('logistics')" style="font-size:var(--text-sm);color:#4F46E5;font-weight:600;cursor:pointer;">View All →</span>
    </div>
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      ${transactions.map((t,i) => `
        <div style="display:flex;align-items:center;gap:14px;padding:16px 20px;${i < transactions.length-1 ? 'border-bottom:1px solid var(--gray-100)' : ''};transition:var(--transition);"
          onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
          <div style="width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:${t.type==='credit'?'#dcfce7':'#fee2e2'};color:${t.type==='credit'?'#16A34A':'#EF4444'};font-weight:800;font-size:16px;">${t.type==='credit'?'↓':'↑'}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${t.label}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-400);">${t.sub}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-size:var(--text-sm);font-weight:700;color:${t.type==='credit'?'#16A34A':'#EF4444'};">${t.type==='credit'?'+':'-'}₦${t.amount.toLocaleString()}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-400);">${t.date}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   FUND WALLET handler
───────────────────────────────────────────── */
async fundWallet() {
  const amountRaw = parseFloat(document.getElementById('fund-amount')?.value);
  if (!amountRaw || amountRaw < 100) { showToast('Minimum top-up amount is ₦100', 'error'); return; }

  const btn = document.getElementById('fund-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Preparing…'; btn.style.opacity = '0.65'; }

  /* Mock mode */
  if (!window.AC_CONFIG?.API_BASE_URL) {
    await new Promise(r => setTimeout(r, 800));
    showToast(`₦${amountRaw.toLocaleString()} added to wallet (demo mode)`, 'success');
    if (btn) { btn.disabled = false; btn.textContent = 'Fund Wallet'; btn.style.opacity = '1'; }
    return;
  }

  try {
    const { data } = await AC_API.wallet.topup({ amount: amountRaw });
    if (btn) { btn.disabled = false; btn.textContent = 'Fund Wallet'; btn.style.opacity = '1'; }

    AC_PAY.openPopup({
      email:      AC_STATE.user.email,
      amount:     data.amount,
      accessCode: data.accessCode,
      reference:  data.reference,
      onSuccess: () => {
        showToast(`₦${amountRaw.toLocaleString()} added to your wallet!`, 'success');
        AC_STATE._walletCache = null;  // force refresh
        AC_STATE.navigate('wallet');
      },
      onClose: () => showToast('Top-up cancelled', 'error'),
    });
  } catch (err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Fund Wallet'; btn.style.opacity = '1'; }
    showToast(err?.data?.error ?? err?.message ?? 'Top-up failed', 'error');
  }
},

/* ─────────────────────────────────────────────
   AVATAR UPLOAD handler
───────────────────────────────────────────── */
async uploadAvatar(input) {
  const file = input.files?.[0];
  if (!file) return;

  /* Instant local preview */
  const reader = new FileReader();
  reader.onload = e => {
    const wrap = document.getElementById('profile-avatar-wrap');
    if (wrap) wrap.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;" alt="Avatar">`;
  };
  reader.readAsDataURL(file);

  if (!window.AC_CONFIG?.API_BASE_URL) {
    showToast('Photo updated (demo mode)', 'success');
    return;
  }

  try {
    const { data } = await AC_API.uploads.upload(file, 'avatar');
    AC_STATE.user.avatarUrl = data.url;
    showToast('Profile photo updated!', 'success');
  } catch (err) {
    showToast(err?.data?.error ?? 'Photo upload failed', 'error');
  }
},

/* ─────────────────────────────────────────────
   FINANCING (Fund + Withdraw)
───────────────────────────────────────────── */
financing() {
  return `
  <div class="animate-fadeIn" style="max-width:540px;margin:0 auto;padding-bottom:40px;">
    <button onclick="AC_STATE.navigate('wallet')" style="display:flex;align-items:center;gap:6px;color:#4F46E5;font-size:var(--text-sm);font-weight:600;background:none;border:none;cursor:pointer;padding:0;margin-bottom:20px;font-family:var(--font);">← Back to Wallet</button>

    <!-- FUND WALLET -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Fund Wallet</h2>
      <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:20px;">Current Balance: <strong style="color:#4F46E5;">${formatNaira(AC_STATE._walletCache?.balance ?? 0)}</strong></p>

      <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Amount to Fund</label>
      <div style="position:relative;margin-bottom:12px;">
        <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--gray-600);font-weight:700;">₦</span>
        <input id="fund-amount" type="number" placeholder="Enter amount" style="width:100%;height:48px;padding:0 14px 0 30px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-base);font-family:var(--font);box-sizing:border-box;"
          onfocus="this.style.borderColor='#4F46E5'" onblur="this.style.borderColor='var(--gray-200)'">
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
        ${[5000,10000,20000,50000].map(a => `
          <button onclick="document.getElementById('fund-amount').value=${a}" style="padding:7px 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-full);background:white;font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;color:var(--gray-700);transition:var(--transition);"
            onmouseover="this.style.borderColor='#4F46E5';this.style.color='#4F46E5'" onmouseout="this.style.borderColor='var(--gray-200)';this.style.color='var(--gray-700)'">₦${a.toLocaleString()}</button>
        `).join('')}
      </div>

      <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:10px;">Payment Method</label>
      ${[['🌱','Debit/Credit Card','Pay with your card'],['🌱','Bank Transfer','Transfer to your unique account'],['🌱','USSD Code','Use *826# to fund']].map(([icon,label,sub],i) => `
        <label style="display:flex;align-items:center;gap:12px;padding:14px;border:1.5px solid ${i===0?'#4F46E5':'var(--gray-200)'};border-radius:var(--radius-md);cursor:pointer;margin-bottom:8px;background:${i===0?'#F5F3FF':'white'};transition:var(--transition);">
          <input type="radio" name="fund-method" ${i===0?'checked':''} style="accent-color:#4F46E5;">
          <span style="font-size:18px;">${icon}</span>
          <div>
            <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-900);">${label}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-500);">${sub}</div>
          </div>
        </label>
      `).join('')}
      <button id="fund-btn" onclick="AC_SCREENS.fundWallet()" style="width:100%;height:48px;background:#4F46E5;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;margin-top:8px;"
        onmouseover="this.style.background='#3730a3'" onmouseout="this.style.background='#4F46E5'">Fund Wallet</button>
    </div>

    <!-- WITHDRAW -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Withdraw Funds</h2>
      <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:20px;">Available: <strong style="color:#4F46E5;">${formatNaira(AC_STATE._walletCache?.balance ?? 0)}</strong></p>

      <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Amount to Withdraw</label>
      <div style="position:relative;margin-bottom:16px;">
        <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--gray-600);font-weight:700;">₦</span>
        <input id="withdraw-amount" type="number" placeholder="Enter amount" style="width:100%;height:48px;padding:0 64px 0 30px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-base);font-family:var(--font);box-sizing:border-box;"
          onfocus="this.style.borderColor='#4F46E5'" onblur="this.style.borderColor='var(--gray-200)'">
        <button onclick="document.getElementById('withdraw-amount').value=245750" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#4F46E5;font-size:var(--text-sm);font-weight:700;cursor:pointer;font-family:var(--font);">Max</button>
      </div>

      ${[['Bank Name','select',['Select your bank','Access Bank','First Bank','GTBank','UBA','Zenith Bank','Stanbic IBTC','Polaris Bank']],['Account Number','input',null]].map(([label,type,opts]) => `
        <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">${label}</label>
        ${type==='select'
          ? `<select style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;margin-bottom:14px;">${opts.map(o=>`<option>${o}</option>`).join('')}</select>`
          : `<input type="text" placeholder="Enter your account number" maxlength="10" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;margin-bottom:14px;" onfocus="this.style.borderColor='#4F46E5'" onblur="this.style.borderColor='var(--gray-200)'">`
        }
      `).join('')}

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-md);padding:12px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:var(--text-sm);color:var(--gray-600);">Account Name</span>
        <span style="font-size:var(--text-sm);font-weight:700;color:#16A34A;">Adewale Ogunlade ✓</span>
      </div>
      <p style="font-size:var(--text-xs);color:var(--gray-400);margin-bottom:16px;">ℹ️ Processing fee: ₦50 - You'll receive: ₦49,950</p>

      <button onclick="showToast('Withdrawal initiated! 🌱','success')" style="width:100%;height:48px;background:#4F46E5;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;"
        onmouseover="this.style.background='#3730a3'" onmouseout="this.style.background='#4F46E5'">Withdraw Funds</button>
      <p style="text-align:center;font-size:var(--text-xs);color:var(--gray-400);margin-top:12px;">🌱 Withdrawals are processed instantly</p>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   NOTIFICATIONS
───────────────────────────────────────────── */
notifications() {
  // Clear badge when user opens notifications
  AC_STATE.unreadNotifs = 0;
  AC_STATE._updateNotifBadge();

  if (AC_STATE._notifsCache === undefined) {
    AC_STATE._notifsCache = null;
    AC_API.notifications.list().then(res => {
      AC_STATE._notifsCache = res.data ?? [];
      if (AC_STATE.currentScreen === 'notifications') AC_ROUTER.show('notifications');
    }).catch(() => {
      AC_STATE._notifsCache = undefined;
      if (AC_STATE.currentScreen === 'notifications') AC_ROUTER.show('notifications');
    });
  }

  if (AC_STATE._notifsCache === null) return AC_UI.listSkeletons(6);
  if (AC_STATE._notifsCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._notifsCache=undefined;AC_ROUTER.show('notifications')" });

  const notifs = AC_STATE._notifsCache;

  const _timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'Just now';
    if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7)  return `${days} day${days === 1 ? '' : 's'} ago`;
    return new Date(dateStr).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });
  };

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return `
  <div class="animate-fadeIn" style="max-width:700px;margin:0 auto;padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:10px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);">
        Notifications
        ${unreadCount > 0 ? `<span style="font-size:var(--text-sm);background:var(--green);color:white;padding:2px 8px;border-radius:var(--radius-full);margin-left:8px;">${unreadCount}</span>` : ''}
      </h1>
      ${unreadCount > 0 ? `<button onclick="AC_SCREENS.markAllNotifsRead()" style="padding:8px 16px;background:var(--green-pale);color:var(--green);border:1px solid #bbf7d0;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:600;font-family:var(--font);cursor:pointer;">Mark all read</button>` : ''}
    </div>
    ${notifs.length === 0 ? AC_UI.empty({ icon: '🔔', title: 'No notifications yet', message: 'You\'ll see order updates, payment alerts and announcements here.' }) : `
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${notifs.map(n => `
        <div data-notif-id="${n.id}" style="background:${!n.isRead ? 'white' : 'var(--gray-50)'};border:1px solid ${!n.isRead ? '#bbf7d0' : 'var(--gray-200)'};border-radius:var(--radius-md);padding:16px 18px;display:flex;gap:14px;align-items:flex-start;cursor:pointer;transition:var(--transition);"
          onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'"
          onclick="AC_SCREENS.markNotifRead('${n.id}',this)">
          <div style="width:44px;height:44px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🔔</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
              <div style="font-size:var(--text-sm);font-weight:${!n.isRead ? '700' : '600'};color:var(--gray-900);">${n.title}</div>
              <span style="font-size:var(--text-xs);color:var(--gray-400);white-space:nowrap;">${_timeAgo(n.createdAt)}</span>
            </div>
            <div style="font-size:var(--text-sm);color:var(--gray-500);margin-top:3px;line-height:1.5;">${n.body}</div>
          </div>
          ${!n.isRead ? `<div data-notif-dot style="width:8px;height:8px;border-radius:50%;background:var(--green);flex-shrink:0;margin-top:5px;"></div>` : ''}
        </div>
      `).join('')}
    </div>`}
  </div>`;
},

async markNotifRead(id, el) {
  if (!id) return;
  try {
    await AC_API.notifications.markRead(id);
    if (Array.isArray(AC_STATE._notifsCache)) {
      const n = AC_STATE._notifsCache.find(n => n.id === id);
      if (n) n.isRead = true;
    }
    if (el) {
      el.style.background = 'var(--gray-50)';
      el.style.borderColor = 'var(--gray-200)';
      const dot = el.querySelector('[data-notif-dot]');
      if (dot) dot.remove();
      const title = el.querySelector('[style*="font-weight:700"]');
      if (title) title.style.fontWeight = '600';
    }
  } catch { /* silent */ }
},

async markAllNotifsRead() {
  try {
    await AC_API.notifications.markAll();
    if (Array.isArray(AC_STATE._notifsCache)) {
      AC_STATE._notifsCache.forEach(n => { n.isRead = true; });
    }
    showToast('All notifications marked as read', 'success');
    AC_ROUTER.show('notifications');
  } catch (err) {
    showToast('Failed to mark notifications', 'error');
  }
},

/* ─────────────────────────────────────────────
   PROFILE
───────────────────────────────────────────── */
profile() {
  const name = AC_STATE.user?.name || 'Adewale Ogunlade';
  const email = AC_STATE.user?.email || 'adewale@example.com';
  const initials = AC_STATE.user?.initials || name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const role = AC_STATE.currentRole || 'buyer';
  const roleLabel = {
    farmer: 'Farmer',
    supplier: 'Agro-Supplier',
    expert: 'Agricultural Expert',
    cooperative: 'Cooperative Manager',
    institution: 'Institution',
  }[role] || 'Farmer';

  const menuSections = [
    { title:'Account', items:[
      { icon:'🌱', label:'Personal Information', action:`AC_STATE.navigate('profile-edit')` },
      { icon:'🌱', label:'Change Password',      action:`showToast('Coming soon','')` },
      { icon:'🌱', label:'Phone Number',         action:`showToast('Coming soon','')` },
      { icon:'🌱', label:'Delivery Addresses',   action:`showToast('Coming soon','')` },
    ]},
    { title:'Activity', items:[
      { icon:'🌱', label:'My Orders',    action:`AC_STATE.navigate('order-history')` },
      { icon:'❤️', label:'My Wishlist',  action:`AC_STATE.navigate('wishlist')` },
      { icon:'🌱', label:'My Wallet',    action:`AC_STATE.navigate('wallet')` },
      { icon:'📊', label:'My Analytics', action:`AC_STATE.navigate(AC_STATE.currentRole === 'expert' ? 'course-analytics' : 'supplier-analytics')` },
    ]},
    { title:'Settings', items:[
      { icon:'🌱', label:'Notifications',    action:`AC_STATE.navigate('notifications')` },
      { icon:'🌱', label:'Language',         action:`showToast('Coming soon','')` },
      { icon:'🌱', label:'Privacy',          action:`showToast('Coming soon','')` },
      { icon:'🌱', label:'WhatsApp Bot',     action:`AC_STATE.navigate('whatsapp')` },
    ]},
    { title:'Support', items:[
      { icon:'❓', label:'Help Centre',   action:`showToast('Help centre coming soon','')` },
      { icon:'🌱', label:'Live Chat',     action:`showToast('Connecting you to support...','success')` },
      { icon:'⭐', label:'Rate the App',  action:`showToast('Thanks for the feedback! 🌱','success')` },
      { icon:'🗺️', label:'Replay App Tour', action:`localStorage.removeItem('ac_onboarded');AC_SCREENS.showOnboarding(AC_STATE.user.role)` },
      { icon:'🌱', label:'Log Out',       action:`AC_STATE.logout()`, danger:true },
    ]},
  ];

  return `
  <div class="animate-fadeIn" style="max-width:700px;margin:0 auto;padding-bottom:40px;">

    <!-- PROFILE CARD -->
    <div style="background:linear-gradient(135deg,#1a7a3c 0%,#22a350 100%);border-radius:var(--radius-xl);padding:28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:140px;height:140px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <div style="display:flex;align-items:center;gap:20px;position:relative;z-index:1;">
        <label style="position:relative;cursor:pointer;flex-shrink:0;" title="Change photo">
          <div id="profile-avatar-wrap" style="width:72px;height:72px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:var(--green);border:3px solid rgba(255,255,255,0.4);overflow:hidden;">
            ${AC_STATE.user.avatarUrl
              ? `<img src="${AC_STATE.user.avatarUrl}" style="width:100%;height:100%;object-fit:cover;" alt="Avatar">`
              : initials}
          </div>
          <div style="position:absolute;bottom:0;right:0;width:22px;height:22px;background:#1E8B4C;border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;">📷</div>
          <input type="file" accept="image/*" style="display:none;" onchange="AC_SCREENS.uploadAvatar(this)">
        </label>
        <div style="flex:1;">
          <h2 style="color:white;font-size:var(--text-xl);font-weight:700;margin-bottom:4px;">${name}</h2>
          <p style="color:rgba(255,255,255,0.8);font-size:var(--text-sm);margin-bottom:8px;">${email}</p>
          <span style="background:rgba(255,255,255,0.2);color:white;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--radius-full);">${roleLabel}</span>
        </div>
        <button onclick="AC_STATE.navigate('profile-edit')" style="padding:9px 16px;background:white;color:var(--green);border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;flex-shrink:0;">Edit</button>
      </div>
    </div>

    <!-- MENU SECTIONS -->
    ${menuSections.map(section => `
      <div style="margin-bottom:16px;">
        <div style="font-size:var(--text-xs);font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;padding-left:4px;">${section.title}</div>
        <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
          ${section.items.map((item,i) => `
            <div onclick="${item.action}" style="display:flex;align-items:center;gap:14px;padding:15px 18px;${i<section.items.length-1?'border-bottom:1px solid var(--gray-100)':''}cursor:pointer;transition:var(--transition);"
              onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
              <div style="width:38px;height:38px;border-radius:var(--radius-sm);background:${item.danger?'#FEE2E2':'var(--green-pale)'};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${item.icon}</div>
              <span style="flex:1;font-size:var(--text-sm);font-weight:600;color:${item.danger?'#DC2626':'var(--gray-800)'};">${item.label}</span>
              <span style="color:var(--gray-400);font-size:16px;">-</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}

    <p style="text-align:center;font-size:var(--text-xs);color:var(--gray-400);margin-top:8px;">AgroConnect v1.0.0 - - 2026 AgroConnect Nigeria</p>
  </div>`;
},

/* ─────────────────────────────────────────────
   PROFILE EDIT
───────────────────────────────────────────── */
profileEdit() {
  const u = AC_STATE.user;
  return `
  <div class="animate-fadeIn" style="max-width:600px;margin:0 auto;padding-bottom:40px;">
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px;">
      <button onclick="AC_STATE.navigate('profile')" style="width:36px;height:36px;border-radius:50%;background:var(--gray-100);border:none;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;">←</button>
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);">Edit Profile</h1>
    </div>

    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;">
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">First Name</label>
            <input id="pe-fname" type="text" value="${(u?.name || '').split(' ')[0]}" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Last Name</label>
            <input id="pe-lname" type="text" value="${(u?.name || '').split(' ').slice(1).join(' ')}" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Email Address</label>
          <input id="pe-email" type="email" value="${u?.email || ''}" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Phone Number</label>
          <input id="pe-phone" type="tel" placeholder="+234XXXXXXXXXX" value="${u?.phone || ''}" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">State</label>
          <select id="pe-state" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
            <option value="">Select State</option>
            ${['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'].map(s => `<option${u?.state===s?' selected':''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="margin-top:24px;display:flex;gap:12px;">
        <button onclick="AC_STATE.navigate('profile')" style="flex:1;padding:13px;border:1px solid var(--gray-200);background:white;border-radius:var(--radius-full);font-weight:600;font-size:var(--text-sm);cursor:pointer;font-family:var(--font);color:var(--gray-700);">Cancel</button>
        <button id="pe-save-btn" onclick="AC_SCREENS.saveProfile()" style="flex:2;padding:13px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-weight:700;font-size:var(--text-sm);cursor:pointer;font-family:var(--font);">Save Changes</button>
      </div>
    </div>
  </div>`;
},

async saveProfile() {
  const fname = document.getElementById('pe-fname')?.value?.trim();
  const lname = document.getElementById('pe-lname')?.value?.trim();
  const email = document.getElementById('pe-email')?.value?.trim();
  const phone = document.getElementById('pe-phone')?.value?.trim();
  const state = document.getElementById('pe-state')?.value;

  if (!fname) { showToast('First name is required', 'error'); return; }
  if (!email) { showToast('Email is required', 'error'); return; }

  const btn = document.getElementById('pe-save-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }

  try {
    const payload = {};
    const fullName = [fname, lname].filter(Boolean).join(' ');
    if (fullName) payload.name = fullName;
    if (email)   payload.email = email;
    if (phone)   payload.phone = phone;
    if (state)   payload.state = state;

    const res = await AC_API.users.update(payload);
    const updated = res.data ?? res;
    AC_STATE.user = { ...AC_STATE.user, ...updated };
    showToast('Profile updated!', 'success');
    AC_STATE.navigate('profile');
  } catch (err) {
    showToast(err.message || 'Failed to save profile', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Save Changes'; }
  }
},

/* ─────────────────────────────────────────────
   WHATSAPP BOT
───────────────────────────────────────────── */
whatsapp() {
  const messages = [
    { from:'bot',  text:'🌱 Welcome to AgroConnect WhatsApp Bot! I can help you buy seeds, check prices, and track orders. What would you like to do today?' },
    { from:'user', text:'Check price of maize seeds' },
    { from:'bot',  text:'🌱 Current prices for Hybrid Maize Seeds:\n\n- SEEDCO Nigeria: ₦15,000/kg\n- Notore Seeds: ₦14,500/kg\n- AgriPlus Farms: ₦16,000/kg\n\nAll NASC certified. Reply "ORDER" to buy or "MORE" for more varieties.' },
    { from:'user', text:'Track my order' },
    { from:'bot',  text:'🌱 Please send your Order ID or Tracking Number.\n\nExample: AGR-2026-001234' },
  ];
  const quickReplies = ['Check Prices','Track Order','Buy Seeds','Find Expert','My Wallet'];

  return `
  <div class="animate-fadeIn" style="max-width:640px;margin:0 auto;padding-bottom:32px;">
    <div style="margin-bottom:24px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:6px;">🌱 WhatsApp Bot</h1>
      <p style="font-size:var(--text-base);color:var(--gray-500);">Access AgroConnect features via WhatsApp - works offline too</p>
    </div>

    <!-- CHAT PREVIEW -->
    <div style="background:#ECE5DD;border-radius:var(--radius-xl);overflow:hidden;margin-bottom:20px;">
      <!-- CHAT HEADER -->
      <div style="background:#075E54;padding:14px 18px;display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🌱</div>
        <div>
          <div style="color:white;font-weight:700;font-size:var(--text-sm);">AgroConnect Bot</div>
          <div style="color:rgba(255,255,255,0.7);font-size:11px;">Online - Responds instantly</div>
        </div>
      </div>
      <!-- MESSAGES -->
      <div style="padding:16px;display:flex;flex-direction:column;gap:10px;min-height:240px;">
        ${messages.map(m => `
          <div style="display:flex;justify-content:${m.from==='bot'?'flex-start':'flex-end'};">
            <div style="
              max-width:80%;background:${m.from==='bot'?'white':'#DCF8C6'};
              border-radius:${m.from==='bot'?'0 12px 12px 12px':'12px 0 12px 12px'};
              padding:10px 14px;box-shadow:0 1px 2px rgba(0,0,0,0.1);
              font-size:13px;color:#111827;line-height:1.5;white-space:pre-wrap;
            ">${m.text}</div>
          </div>
        `).join('')}
      </div>
      <!-- QUICK REPLIES -->
      <div style="background:#F0F0F0;padding:10px 14px;display:flex;gap:8px;flex-wrap:wrap;border-top:1px solid #E0E0E0;">
        ${quickReplies.map(r => `
          <button onclick="showToast('Sent: ${r}','success')" style="padding:6px 12px;background:white;border:1px solid #D0D0D0;border-radius:var(--radius-full);font-size:12px;font-weight:600;font-family:var(--font);cursor:pointer;color:#128C7E;transition:var(--transition);"
            onmouseover="this.style.background='#DCF8C6'" onmouseout="this.style.background='white'">${r}</button>
        `).join('')}
      </div>
    </div>

    <!-- LINK TO WHATSAPP -->
    <button onclick="showToast('Opening WhatsApp...','success')" style="width:100%;height:52px;background:#25D366;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-base);font-weight:700;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:20px;"
      onmouseover="this.style.background='#1EBE5B'" onmouseout="this.style.background='#25D366'">
      <span style="font-size:22px;">🌱</span> Open in WhatsApp
    </button>

    <!-- FEATURES LIST -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
      <div style="padding:16px 20px;border-bottom:1px solid var(--gray-100);">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">What the bot can do</h3>
      </div>
      ${[
        ['🌱','Check Prices','Get real-time seed prices by crop and region'],
        ['🌱','Place Orders','Buy seeds directly via WhatsApp'],
        ['🌱','Track Orders','Get live shipment updates'],
        ['🌱','Wallet Balance','Check balance and recent transactions'],
        ['🌱','Book Experts','Schedule a consultation with any expert'],
        ['🌱','Course Access','Get learning links and resources'],
      ].map(([icon,title,desc]) => `
        <div style="display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:1px solid var(--gray-100);">
          <div style="width:38px;height:38px;border-radius:var(--radius-sm);background:#e8f5ee;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${icon}</div>
          <div>
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${title}</div>
            <div style="font-size:var(--text-xs);color:var(--gray-500);">${desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
},

settings() {
  const canInstall = !!window.AC_CAN_INSTALL;
  return `
  <div class="animate-fadeIn" style="max-width:520px;margin:0 auto;padding:24px 24px 48px;">
    <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:24px;">Settings</h1>

    ${canInstall ? `
    <div style="background:var(--green-pale);border:1px solid #BBF7D0;border-radius:var(--radius-md);padding:18px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div>
        <div style="font-size:var(--text-sm);font-weight:700;color:#15803D;">Install AgroConnect App</div>
        <div style="font-size:var(--text-xs);color:#16A34A;margin-top:2px;">Add to your home screen for faster access — works offline</div>
      </div>
      <button onclick="promptInstall()" style="padding:9px 18px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;flex-shrink:0;">Install</button>
    </div>` : ''}

    ${[
      { icon:'🔔', label:'Notifications',    sub:'Manage push notification preferences' },
      { icon:'🌙', label:'Appearance',        sub:'Light / dark mode (coming soon)'      },
      { icon:'🔒', label:'Privacy & Security',sub:'Data, password, and account security' },
      { icon:'🌐', label:'Language',          sub:'English (Nigeria)'                    },
      { icon:'ℹ️', label:'About AgroConnect', sub:'Version 1.0 · agroconnect.ng'        },
    ].map(s => `
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 18px;margin-bottom:10px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:var(--transition);"
        onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'"
        onclick="showToast('Coming soon','')">
        <div style="width:40px;height:40px;background:var(--gray-100);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${s.icon}</div>
        <div style="flex:1;">
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${s.label}</div>
          <div style="font-size:var(--text-xs);color:var(--gray-400);margin-top:1px;">${s.sub}</div>
        </div>
        <span style="color:var(--gray-300);font-size:18px;">→</span>
      </div>
    `).join('')}

    <button onclick="AC_STATE.logout()" style="width:100%;margin-top:8px;padding:13px;background:white;color:#DC2626;border:1.5px solid #FCA5A5;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">
      Sign Out
    </button>
  </div>`;
},

/* ─────────────────────────────────────────────
   ONBOARDING
───────────────────────────────────────────── */
showOnboarding(role) {
  const existing = document.getElementById('onboarding-modal');
  if (existing) existing.remove();

  const flows = {
    farmer: [
      {
        icon: '🌱', bg: '#e8f5ee', color: '#1E8B4C',
        title: 'Welcome to AgroConnect!',
        desc: 'Your complete digital farming platform. Buy inputs, sell produce, learn from experts and manage your farm — all in one place.',
        points: ['Built for Nigerian farmers', 'Verified suppliers only', 'Pay with wallet, card or transfer'],
        screen: null,
        cta: null,
      },
      {
        icon: '🛒', bg: '#fef3c7', color: '#d97706',
        title: 'Browse the Input Market',
        desc: 'Shop for seeds, fertilizers, crop protection chemicals and farm equipment from verified suppliers across Nigeria.',
        points: ['Filter by category, region and price', 'Read reviews from other farmers', 'Add multiple items to your cart'],
        screen: 'input-market',
        cta: 'Open the Market',
      },
      {
        icon: '💳', bg: '#ede9fe', color: '#7c3aed',
        title: 'Checkout & Pay',
        desc: 'Review your cart, enter your delivery details and pay securely. Multiple payment options available.',
        points: ['Pay with your AgroConnect wallet', 'Card or bank transfer via Paystack', 'Enter exact delivery address'],
        screen: 'cart',
        cta: 'View My Cart',
      },
      {
        icon: '📦', bg: '#dbeafe', color: '#2563eb',
        title: 'Track Your Orders',
        desc: 'After payment, track every order in real time — from processing through to delivery at your door.',
        points: ['Live order status updates', 'Message the supplier directly', 'Confirm delivery and rate the product'],
        screen: 'order-history',
        cta: 'See My Orders',
      },
      {
        icon: '🎓', bg: '#fce7f3', color: '#db2777',
        title: 'Learn from Experts',
        desc: 'Take online courses and book one-on-one video consultations with certified agricultural professionals.',
        points: ['Free and paid courses available', 'Book consultation slots that suit you', 'Video calls powered by Jitsi'],
        screen: 'learning',
        cta: 'Explore Courses',
      },
      {
        icon: '🌾', bg: '#d1fae5', color: '#059669',
        title: 'Sell Your Produce',
        desc: 'List your harvest on the AgroConnect marketplace and connect with buyers and institutions looking to purchase.',
        points: ['Set your price and quantity', 'Specify crop type and location', 'Get paid directly to your wallet'],
        screen: 'list-produce',
        cta: 'List My Produce',
      },
    ],
    supplier: [
      {
        icon: '🏪', bg: '#e8f5ee', color: '#1E8B4C',
        title: 'Welcome, Agro-Supplier!',
        desc: 'Reach thousands of verified farmers across Nigeria. List your products, receive orders and grow your agribusiness — all from one dashboard.',
        points: ['Verified supplier badge builds trust', 'Orders come directly to you', 'Analytics to track your growth'],
        screen: null,
        cta: null,
      },
      {
        icon: '📸', bg: '#fef3c7', color: '#d97706',
        title: 'List Your Products',
        desc: 'Upload your agricultural inputs with photos, descriptions, pricing and stock levels. Go live in minutes.',
        points: ['Upload up to 5 product photos', 'Set price per unit and minimum order', 'Mark items as in stock or out of stock'],
        screen: 'upload-product',
        cta: 'Add Your First Product',
      },
      {
        icon: '🔔', bg: '#ede9fe', color: '#7c3aed',
        title: 'Receive & Manage Orders',
        desc: 'Get notified the moment a farmer places an order. Review the details, confirm and ship — with tracking built in.',
        points: ['See all incoming orders in one view', 'Enter courier and tracking number', 'Message the farmer if needed'],
        screen: 'orders-received',
        cta: 'View Incoming Orders',
      },
      {
        icon: '📊', bg: '#dbeafe', color: '#2563eb',
        title: 'Track Your Revenue',
        desc: 'Your analytics dashboard shows real-time revenue, top-selling products, order trends and performance metrics.',
        points: ['Monthly revenue chart', 'Category breakdown', 'Average order value and cancel rate'],
        screen: 'supplier-analytics',
        cta: 'Open Analytics',
      },
      {
        icon: '💼', bg: '#d1fae5', color: '#059669',
        title: 'Manage Your Listings',
        desc: 'View all your active listings, edit prices, update stock levels and respond to farmer reviews from one place.',
        points: ['Edit or pause any listing instantly', 'See star ratings and written reviews', 'Top-performing products highlighted'],
        screen: 'my-listings',
        cta: 'See My Listings',
      },
    ],
    expert: [
      {
        icon: '👨‍🏫', bg: '#e8f5ee', color: '#1E8B4C',
        title: 'Welcome, Agricultural Expert!',
        desc: 'Monetize your expertise by teaching courses and offering paid consultations to farmers across Nigeria.',
        points: ['Set your own prices', 'Teach on your schedule', 'Payments go straight to your wallet'],
        screen: null,
        cta: null,
      },
      {
        icon: '📚', bg: '#fef3c7', color: '#d97706',
        title: 'Create Your First Course',
        desc: 'Build a structured online course — add modules, upload a cover image, set a price and publish to all farmers.',
        points: ['Organise content into modules', 'Free or paid — you decide', 'Farmers can enrol instantly'],
        screen: 'create-course',
        cta: 'Create a Course',
      },
      {
        icon: '📅', bg: '#ede9fe', color: '#7c3aed',
        title: 'Set Your Consultation Schedule',
        desc: 'Define the days and times you are available. Farmers browse your slots and book a video call with you.',
        points: ['Add available slots by date and time', 'Farmers pay when they book', 'Video call link generated automatically'],
        screen: 'expert-schedule',
        cta: 'Set My Availability',
      },
      {
        icon: '💰', bg: '#dbeafe', color: '#2563eb',
        title: 'Track Earnings & Students',
        desc: 'Your dashboard shows total students, consultation count, average rating and revenue — updated in real time.',
        points: ['Revenue broken down by course and consultation', 'See which courses are most popular', 'Withdraw earnings to your bank'],
        screen: 'expert-dashboard',
        cta: 'View My Dashboard',
      },
    ],
    cooperative: [
      {
        icon: '🤝', bg: '#e8f5ee', color: '#1E8B4C',
        title: 'Welcome, Cooperative Manager!',
        desc: 'Manage your cooperative digitally — register members, apply for group loans and buy agricultural inputs in bulk.',
        points: ['Full member directory', 'Group loan applications', 'Bulk purchasing power'],
        screen: null,
        cta: null,
      },
      {
        icon: '👥', bg: '#fef3c7', color: '#d97706',
        title: 'Register Your Members',
        desc: 'Add all cooperative members with their farm details, location and contact information. Keep your directory up to date.',
        points: ['Add members with name, phone and LGA', 'Record farm type and acreage', 'Search and filter your full list'],
        screen: 'coop-members',
        cta: 'Add Members',
      },
      {
        icon: '🏦', bg: '#ede9fe', color: '#7c3aed',
        title: 'Apply for Group Loans',
        desc: 'Submit loan applications on behalf of your cooperative. Access agricultural financing from partner institutions.',
        points: ['Specify loan amount and purpose', 'Submit supporting details', 'Track application status in real time'],
        screen: 'coop-loans',
        cta: 'Apply for a Loan',
      },
      {
        icon: '📊', bg: '#dbeafe', color: '#2563eb',
        title: 'Your Cooperative Dashboard',
        desc: 'See your total member count, active members, loan portfolio and recent activity — all at a glance.',
        points: ['Member stats and activity feed', 'Loan history and repayment status', 'Quick links to key actions'],
        screen: 'coop-dashboard',
        cta: 'View Dashboard',
      },
    ],
    institution: [
      {
        icon: '🏛️', bg: '#e8f5ee', color: '#1E8B4C',
        title: 'Welcome, Financial Institution!',
        desc: 'Disburse agricultural loans to verified cooperatives, monitor spend compliance and track your full loan portfolio.',
        points: ['Verified cooperative applicants only', 'Real-time portfolio tracking', 'Compliance monitoring built in'],
        screen: null,
        cta: null,
      },
      {
        icon: '📋', bg: '#fef3c7', color: '#d97706',
        title: 'Review Loan Applications',
        desc: 'Receive and evaluate loan applications from registered cooperatives. Approve, reject or request more information.',
        points: ['Full cooperative profile and member list', 'Requested amount and purpose', 'One-click approve or decline'],
        screen: 'coop-loans',
        cta: 'View Applications',
      },
      {
        icon: '📈', bg: '#ede9fe', color: '#7c3aed',
        title: 'Track Your Portfolio',
        desc: 'Monitor all active loans — disbursement dates, repayment schedules, outstanding balances and compliance status.',
        points: ['Full loan history per cooperative', 'Repayment tracking and alerts', 'Portfolio performance summary'],
        screen: null,
        cta: null,
      },
    ],
  };

  const steps = flows[role] || flows.farmer;
  let current = 0;

  const dismiss = () => {
    modal.remove();
    localStorage.setItem('ac_onboarded', '1');
  };

  const modal = document.createElement('div');
  modal.id = 'onboarding-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);';

  const render = () => {
    const step   = steps[current];
    const isLast = current === steps.length - 1;
    const pct    = Math.round(((current + 1) / steps.length) * 100);

    modal.innerHTML = `
      <div style="background:white;border-radius:24px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.25);">

        <!-- PROGRESS BAR -->
        <div style="height:4px;background:#f3f4f6;">
          <div style="height:4px;background:${step.color};width:${pct}%;transition:width .4s ease;"></div>
        </div>

        <!-- ICON PANEL -->
        <div style="background:${step.bg};padding:32px 32px 24px;text-align:center;">
          <div style="font-size:64px;line-height:1;margin-bottom:0;">${step.icon}</div>
        </div>

        <!-- CONTENT -->
        <div style="padding:24px 28px 28px;">
          <!-- Step counter + skip -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
            <span style="font-size:12px;font-weight:600;color:${step.color};letter-spacing:.05em;text-transform:uppercase;">Step ${current + 1} of ${steps.length}</span>
            <button onclick="window._onboardDismiss()" style="font-size:12px;color:#9ca3af;background:none;border:none;cursor:pointer;font-family:inherit;padding:0;">Skip tour</button>
          </div>

          <h2 style="font-size:20px;font-weight:800;color:#111827;margin-bottom:10px;line-height:1.3;">${step.title}</h2>
          <p style="font-size:14px;color:#6b7280;line-height:1.7;margin-bottom:16px;">${step.desc}</p>

          <!-- BULLET POINTS -->
          <ul style="margin:0 0 24px;padding:0;list-style:none;">
            ${step.points.map(p => `
              <li style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">
                <span style="width:20px;height:20px;border-radius:50%;background:${step.bg};color:${step.color};font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">✓</span>
                <span style="font-size:14px;color:#374151;line-height:1.5;">${p}</span>
              </li>
            `).join('')}
          </ul>

          <!-- ACTIONS -->
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${step.screen ? `
              <button onclick="window._onboardGoThere()" style="width:100%;padding:13px;background:${step.color};color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">
                ${step.cta} →
              </button>` : ''}
            <div style="display:flex;gap:10px;">
              ${current > 0 ? `
                <button onclick="window._onboardPrev()" style="flex:1;padding:12px;background:#f9fafb;color:#374151;border:1px solid #e5e7eb;border-radius:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">← Back</button>
              ` : ''}
              <button onclick="window._onboardNext()" style="flex:2;padding:12px;background:${step.screen ? '#f9fafb' : step.color};color:${step.screen ? '#374151' : 'white'};border:${step.screen ? '1px solid #e5e7eb' : 'none'};border-radius:12px;font-size:14px;font-weight:${step.screen ? '600' : '700'};font-family:inherit;cursor:pointer;">
                ${isLast ? (step.screen ? 'Skip & Finish' : 'Get Started →') : (step.screen ? 'Skip this step' : 'Next →')}
              </button>
            </div>
          </div>
        </div>
      </div>`;
  };

  window._onboardNext    = () => { if (current < steps.length - 1) { current++; render(); } else dismiss(); };
  window._onboardPrev    = () => { if (current > 0) { current--; render(); } };
  window._onboardDismiss = () => dismiss();
  window._onboardGoThere = () => { dismiss(); AC_STATE.navigate(steps[current].screen); };

  document.body.appendChild(modal);
  render();
},

/* ─────────────────────────────────────────────
   RECENTLY VIEWED (track in state)
───────────────────────────────────────────── */
_trackRecentlyViewed(product) {
  if (!product?.id) return;
  if (!AC_STATE._recentlyViewed) AC_STATE._recentlyViewed = [];
  AC_STATE._recentlyViewed = [
    product,
    ...AC_STATE._recentlyViewed.filter(p => p.id !== product.id),
  ].slice(0, 6);
},

/* ── Helpers ── */
initSeedMarketFilters() {},
initCart() {},
initInstCharts() {},

});
