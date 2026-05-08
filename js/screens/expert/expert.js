import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/expert/expert.js
   Expert screens: expertDashboard (My Courses),
   createCourse, courseAnalytics
   These supplement the shared expertProfile and experts screens
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   EXPERT COURSE DASHBOARD (My Courses)
   Expert course dashboard
───────────────────────────────────────────── */
expertDashboard() {
  return AC_SCREENS._expertCourseDashboard();
},

_expertCourseDashboard() {
  if (AC_STATE._expertDashCache === undefined) {
    AC_STATE._expertDashCache = null;
    AC_API.analytics.expert().then(res => {
      AC_STATE._expertDashCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'expert-dashboard') AC_ROUTER.show('expert-dashboard');
    }).catch(() => {
      AC_STATE._expertDashCache = undefined;
      if (AC_STATE.currentScreen === 'expert-dashboard') AC_ROUTER.show('expert-dashboard');
    });
  }
  if (AC_STATE._expertDashCache === null)      return AC_UI.listSkeletons(4);
  if (AC_STATE._expertDashCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._expertDashCache=undefined;AC_ROUTER.show('expert-dashboard')" });

  const d       = AC_STATE._expertDashCache;
  const courses = d.courses || [];

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">

    <!-- HERO -->
    <div style="background:linear-gradient(135deg,#5B21B6 0%,#7C3AED 100%);border-radius:var(--radius-xl);padding:28px;margin-bottom:20px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:160px;height:160px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <h2 style="color:white;font-size:var(--text-2xl);font-weight:700;margin-bottom:4px;">My Courses 📖</h2>
        <p style="color:rgba(255,255,255,0.75);font-size:var(--text-sm);">Share your agricultural expertise with thousands of farmers</p>
      </div>
    </div>

    <!-- KPI CARDS -->
    <div class="grid-4" style="gap:12px;margin-bottom:20px;">
      ${[
        { icon:'📚', label:'Total Courses',  value: d.totalCourses.toString(),                   color:'#7C3AED', bg:'#EDE9FE' },
        { icon:'👥', label:'Total Students', value: (d.totalStudents||0).toLocaleString(),        color:'#2563EB', bg:'#EFF6FF' },
        { icon:'⭐', label:'Avg Rating',     value: d.avgRating ? d.avgRating.toFixed(1) : '—',  color:'#D97706', bg:'#FEF3C7' },
        { icon:'💰', label:'Revenue',        value: formatNaira(d.totalRevenue||0),               color:'#16A34A', bg:'#DCFCE7' },
      ].map(s => `
        <div style="background:${s.bg};border-radius:var(--radius-md);padding:18px 14px;">
          <div style="font-size:22px;margin-bottom:6px;">${s.icon}</div>
          <div style="font-size:11px;color:var(--gray-500);margin-bottom:4px;">${s.label}</div>
          <div style="font-size:20px;font-weight:800;color:${s.color};">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- COURSES TABLE -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
      <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">My Courses</h2>
      <div style="display:flex;gap:8px;">
        <button onclick="AC_STATE.navigate('expert-schedule')" style="padding:9px 18px;background:white;color:#7C3AED;border:1.5px solid #7C3AED;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">📅 Consultations</button>
        <button onclick="AC_STATE.navigate('create-course')" style="padding:9px 18px;background:#7C3AED;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Create Course</button>
      </div>
    </div>

    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;overflow-x:auto;">
      <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 1fr 80px;min-width:640px;background:var(--gray-50);padding:11px 18px;border-bottom:1px solid var(--gray-200);">
        ${['Course','Duration','Students','Rating','Revenue',''].map(h => `<div style="font-size:11px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.05em;">${h}</div>`).join('')}
      </div>
      ${courses.map((c,i) => `
        <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 1fr 80px;min-width:640px;padding:14px 18px;border-bottom:${i<courses.length-1?'1px solid var(--gray-100)':'none'};align-items:center;"
          onmouseover="this.style.background='var(--gray-50)'" onmouseout="this.style.background='white'">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:44px;height:44px;background:#EDE9FE;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${c.emoji||'📚'}</div>
            <div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${c.title}</div>
              <div style="display:flex;gap:8px;align-items:center;margin-top:2px;">
                <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${c.status==='Published'?'#DCFCE7':'#F3F4F6'};color:${c.status==='Published'?'#16A34A':'var(--gray-500)'};">${c.status}</span>
                <span style="font-size:11px;color:var(--gray-400);">${c.modules} modules</span>
              </div>
            </div>
          </div>
          <div style="font-size:var(--text-sm);color:var(--gray-600);">${c.duration}</div>
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-800);">${c.students.toLocaleString()}</div>
          <div style="font-size:var(--text-sm);color:var(--gray-600);">${c.rating > 0 ? '⭐ ' + c.rating : '-'}</div>
          <div style="font-size:var(--text-sm);font-weight:700;color:#7C3AED;">${c.revenue > 0 ? '₦' + c.revenue.toLocaleString() : 'Free'}</div>
          <div style="display:flex;gap:4px;">
            <button onclick="showToast('Course editor coming soon','')" style="padding:5px 10px;background:#EDE9FE;color:#7C3AED;border:none;border-radius:4px;font-size:11px;font-weight:700;font-family:var(--font);cursor:pointer;">Edit</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   CREATE / EDIT COURSE
   Create or edit an expert course
───────────────────────────────────────────── */
createCourse() {
  return AC_SCREENS._createCourse();
},

_createCourse() {
  return `
  <div class="animate-fadeIn" style="max-width:800px;margin:0 auto;padding-bottom:60px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);">Create New Course</h1>
      <div style="display:flex;gap:10px;">
        <button onclick="AC_SCREENS.saveDraftCourse()" style="padding:10px 20px;border:1px solid var(--gray-200);background:white;border-radius:var(--radius-full);font-weight:600;font-size:var(--text-sm);cursor:pointer;font-family:var(--font);color:var(--gray-700);">Save Draft</button>
        <button onclick="AC_SCREENS.publishCourse()" style="padding:10px 20px;background:#7C3AED;border:none;border-radius:var(--radius-full);font-weight:700;font-size:var(--text-sm);cursor:pointer;font-family:var(--font);color:white;">Publish</button>
      </div>
    </div>

    <!-- COURSE INFO -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:16px;">Course Information</h3>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Course Title *</label>
          <input id="cr-title" type="text" placeholder="e.g., Advanced Maize Farming for Nigerian Smallholders" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Category *</label>
            <select id="cr-category" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
              <option value="">Select Category</option>
              <option>Crop Production</option><option>Animal Husbandry</option><option>Soil Science</option>
              <option>Pest Control</option><option>Agribusiness</option><option>Irrigation</option>
            </select>
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Difficulty Level</label>
            <select id="cr-difficulty" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;">
              <option>Beginner</option><option selected>Intermediate</option><option>Advanced</option>
            </select>
          </div>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Course Description *</label>
          <textarea id="cr-description" rows="4" placeholder="What will students learn? Who is this course for?" style="width:100%;padding:12px 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;resize:vertical;"></textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Price (₦)</label>
            <input id="cr-price" type="number" placeholder="0 for free" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:6px;">Estimated Duration</label>
            <input id="cr-duration" type="text" placeholder="e.g., 6 hours" style="width:100%;height:44px;padding:0 14px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
        </div>
      </div>
    </div>

    <!-- COURSE COVER -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;margin-bottom:16px;">
      <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:14px;">Course Cover Image</h3>
      <label style="border:2px dashed var(--gray-300);border-radius:var(--radius-md);padding:40px;text-align:center;cursor:pointer;background:var(--gray-50);display:block;"
        onmouseover="this.style.borderColor='#7C3AED'" onmouseout="this.style.borderColor='var(--gray-300)'">
        <div id="cr-cover-preview" style="font-size:40px;margin-bottom:10px;">🌱️</div>
        <div style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);">Click to upload cover image</div>
        <div style="font-size:var(--text-xs);color:var(--gray-400);">PNG, JPG up to 5MB - Recommended: 1280×720px</div>
        <input id="cr-cover" type="file" accept="image/*" style="display:none;" onchange="AC_SCREENS.previewCourseImage(this)">
      </label>
    </div>

    <!-- MODULES -->
    <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-xl);padding:24px;margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);">Course Modules</h3>
        <button onclick="showToast('Module added','success')" style="padding:8px 14px;background:#EDE9FE;color:#7C3AED;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Add Module</button>
      </div>
      ${[
        ['Module 1','Introduction & Overview','Video + Quiz'],
        ['Module 2','Seed Selection','Video + Reading'],
        ['Module 3','Land Preparation','Video + Exercise'],
      ].map((m,i) => `
        <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:var(--gray-50);border-radius:var(--radius-md);margin-bottom:8px;">
          <div style="width:32px;height:32px;border-radius:50%;background:#EDE9FE;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#7C3AED;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;">
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${m[1]}</div>
            <div style="font-size:11px;color:var(--gray-400);">${m[2]}</div>
          </div>
          <button style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--gray-400);">⋮</button>
        </div>
      `).join('')}
    </div>

    <div style="display:flex;gap:12px;">
      <button onclick="AC_STATE.navigate('expert-dashboard')" style="flex:1;padding:14px;border:1px solid var(--gray-200);background:white;border-radius:var(--radius-full);font-weight:600;font-size:var(--text-base);cursor:pointer;font-family:var(--font);color:var(--gray-700);">Cancel</button>
      <button onclick="AC_SCREENS.publishCourse()" style="flex:2;padding:14px;background:#7C3AED;border:none;border-radius:var(--radius-full);font-weight:700;font-size:var(--text-base);cursor:pointer;font-family:var(--font);color:white;">Publish Course</button>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   COURSE COVER PREVIEW
───────────────────────────────────────────── */
previewCourseImage(input) {
  const file = input.files?.[0];
  if (!file) return;
  const preview = document.getElementById('cr-cover-preview');
  if (!preview) return;
  const reader = new FileReader();
  reader.onload = e => {
    preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:160px;object-fit:cover;border-radius:var(--radius-sm);" alt="Cover preview">`;
  };
  reader.readAsDataURL(file);
},

/* ─────────────────────────────────────────────
   COURSE PUBLISH / SAVE DRAFT
───────────────────────────────────────────── */
async _submitCourse(isPublished) {
  const title    = document.getElementById('cr-title')?.value?.trim();
  const category = document.getElementById('cr-category')?.value;
  const desc     = document.getElementById('cr-description')?.value?.trim();
  const priceRaw = parseFloat(document.getElementById('cr-price')?.value) || 0;
  const duration = document.getElementById('cr-duration')?.value?.trim();

  if (!title)    { showToast('Please enter a course title', 'error'); return; }
  if (!category) { showToast('Please select a category', 'error'); return; }
  if (!desc)     { showToast('Please add a course description', 'error'); return; }

  const btns = document.querySelectorAll('button[onclick*="Course"],button[onclick*="Draft"]');
  btns.forEach(b => { b.disabled = true; });

  try {
    let coverImageUrl;
    const coverInput = document.getElementById('cr-cover');
    if (coverInput?.files?.[0]) {
      const uploadRes = await AC_API.uploads.upload(coverInput.files[0], 'course-cover');
      coverImageUrl = uploadRes.url;
    }

    await AC_API.courses.create({
      title,
      description: desc,
      price:        priceRaw,
      duration:     duration || undefined,
      coverImageUrl,
      isPublished,
    });

    showToast(isPublished ? 'Course published successfully!' : 'Draft saved!', 'success');
    AC_STATE._coursesCache = undefined;
    AC_STATE.navigate('expert-dashboard');
  } catch (err) {
    showToast(err.message || 'Failed to save course', 'error');
    btns.forEach(b => { b.disabled = false; });
  }
},

publishCourse()   { return this._submitCourse(true);  },
saveDraftCourse() { return this._submitCourse(false); },

courseAnalytics() {
  const d = AC_STATE._expertDashCache;
  if (!d) { AC_STATE._expertDashCache = undefined; AC_ROUTER.show('expert-dashboard'); return AC_UI.spinner(); }

  const metrics = [
    { label: 'Total Courses',   value: (d.totalCourses||0).toString(),            sub: `${d.published||0} published`,        color: '#7C3AED', bg: '#EDE9FE' },
    { label: 'Total Students',  value: (d.totalStudents||0).toLocaleString(),      sub: 'Enrollment in Phase 4',              color: '#2563EB', bg: '#DBEAFE' },
    { label: 'Completion Rate', value: d.completionRate ? `${d.completionRate}%` : '—', sub: 'Tracking in Phase 4',           color: '#16A34A', bg: '#DCFCE7' },
    { label: 'Revenue',         value: formatNaira(d.totalRevenue||0),             sub: 'Paid courses only',                  color: '#D97706', bg: '#FEF3C7' },
  ];

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div class="page-header">
      <div>
        <h1 class="page-title">Course Analytics</h1>
        <p class="page-subtitle">Track course performance, learner engagement, and earnings.</p>
      </div>
      <button class="btn btn-secondary" onclick="AC_STATE.navigate('expert-dashboard')">Back to Courses</button>
    </div>

    <div class="grid-4" style="margin-bottom:20px;">
      ${metrics.map(m => `
        <div class="stat-card" style="background:${m.bg};">
          <div class="stat-card-label">${m.label}</div>
          <div class="stat-card-value" style="color:${m.color};">${m.value}</div>
          <div class="stat-card-sub">${m.sub}</div>
        </div>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-header">
        <h3>Top Courses</h3>
      </div>
      <div class="table-wrap" style="border:none;border-radius:0;">
        <table>
          <thead>
            <tr><th>Course</th><th>Students</th><th>Rating</th><th>Revenue</th><th>Status</th></tr>
          </thead>
          <tbody>
            ${(d.courses||[]).length === 0
              ? `<tr><td colspan="5" style="text-align:center;color:var(--gray-400);padding:24px;">No courses yet — create your first course!</td></tr>`
              : (d.courses||[]).map(c => `
              <tr>
                <td>${c.title}</td>
                <td>${(c.students||0).toLocaleString()}</td>
                <td>${c.rating ? c.rating.toFixed(1) : '—'}</td>
                <td>${c.revenue > 0 ? formatNaira(c.revenue) : c.price > 0 ? formatNaira(c.price) : 'Free'}</td>
                <td><span class="badge ${c.status === 'Published' ? 'badge-green' : 'badge-gray'}">${c.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   EXPERT SCHEDULE (Consultation Slot Management)
───────────────────────────────────────────── */
expertSchedule() {
  if (AC_STATE._expertScheduleCache === undefined) {
    AC_STATE._expertScheduleCache = null;
    AC_API.consultations.list().then(res => {
      AC_STATE._expertScheduleCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'expert-schedule') AC_ROUTER.show('expert-schedule');
    }).catch(() => {
      AC_STATE._expertScheduleCache = !window.AC_CONFIG?.API_BASE_URL ? [] : undefined;
      if (AC_STATE.currentScreen === 'expert-schedule') AC_ROUTER.show('expert-schedule');
    });
  }

  if (AC_STATE._expertScheduleCache === null)      return AC_UI.listSkeletons(3);
  if (AC_STATE._expertScheduleCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._expertScheduleCache=undefined;AC_ROUTER.show('expert-schedule')" });

  const consultations = AC_STATE._expertScheduleCache;
  const now = new Date();
  const upcoming = consultations.filter(c => c.slot && new Date(c.slot.startAt) > now && c.status !== 'cancelled');
  const past     = consultations.filter(c => !c.slot || new Date(c.slot.startAt) <= now || c.status === 'cancelled');
  const statusColor = { pending:'#D97706', confirmed:'#2563EB', completed:'#16A34A', cancelled:'#6B7280' };
  const statusBg    = { pending:'#FEF3C7', confirmed:'#DBEAFE', completed:'#DCFCE7', cancelled:'#F3F4F6' };

  return `
  <div class="animate-fadeIn" style="padding-bottom:32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <div>
        <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Consultations</h1>
        <p style="font-size:var(--text-sm);color:var(--gray-500);">${upcoming.length} upcoming · ${past.length} past</p>
      </div>
      <button onclick="AC_SCREENS.showAddSlotModal()" style="padding:10px 18px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">+ Add Availability</button>
    </div>

    ${consultations.length === 0
      ? AC_UI.empty({ icon:'📅', title:'No consultations yet', message:'Add your availability so farmers can book sessions with you.' })
      : `
      ${upcoming.length > 0 ? `
        <h2 style="font-size:var(--text-md);font-weight:700;color:var(--gray-900);margin-bottom:12px;">Upcoming</h2>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
          ${upcoming.map(c => {
            const d   = new Date(c.slot.startAt);
            const end = new Date(c.slot.endAt);
            const fmt = (dt) => dt.toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'});
            return `
            <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:18px 20px;">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
                <div>
                  <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${c.farmer?.name || 'Farmer'}</div>
                  <div style="font-size:var(--text-xs);color:var(--gray-400);margin-top:2px;">${d.toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'short'})} · ${fmt(d)} – ${fmt(end)}</div>
                  ${c.notes ? `<div style="font-size:var(--text-xs);color:var(--gray-500);margin-top:4px;font-style:italic;">"${c.notes}"</div>` : ''}
                </div>
                <span style="background:${statusBg[c.status]};color:${statusColor[c.status]};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:capitalize;">${c.status}</span>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="${c.meetingUrl}" target="_blank" rel="noopener"
                  style="padding:7px 14px;background:#2563EB;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;text-decoration:none;display:inline-block;">Join Meeting</a>
                ${c.status === 'pending' ? `
                  <button onclick="AC_SCREENS._updateConsultStatus('${c.id}','confirmed')" style="padding:7px 14px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Confirm</button>
                  <button onclick="AC_SCREENS._updateConsultStatus('${c.id}','cancelled')" style="padding:7px 14px;background:white;color:#DC2626;border:1.5px solid #FCA5A5;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Decline</button>
                ` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
      ` : AC_UI.empty({ icon:'📅', title:'No upcoming consultations', message:'Add availability slots so farmers can book sessions.' })}
    `}
  </div>`;
},

showAddSlotModal() {
  const existing = document.getElementById('add-slot-modal');
  if (existing) existing.remove();
  const now = new Date();
  const pad = n => String(n).padStart(2,'0');
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate()+1);
  const defaultDate = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth()+1)}-${pad(tomorrow.getDate())}`;

  const modal = document.createElement('div');
  modal.id = 'add-slot-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;';
  modal.innerHTML = `
    <div style="background:white;border-radius:var(--radius-xl);padding:28px;width:100%;max-width:400px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">Add Availability Slot</h2>
        <button onclick="document.getElementById('add-slot-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--gray-400);">×</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Date</label>
          <input id="slot-date" type="date" value="${defaultDate}" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Start Time</label>
            <input id="slot-start" type="time" value="09:00" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">End Time</label>
            <input id="slot-end" type="time" value="10:00" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Fee (₦) — 0 for free</label>
          <input id="slot-price" type="number" value="0" min="0" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <button id="slot-submit" onclick="AC_SCREENS._submitSlot()" style="width:100%;height:44px;background:var(--green);color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">Add Slot</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
},

async _submitSlot() {
  const date  = document.getElementById('slot-date')?.value;
  const start = document.getElementById('slot-start')?.value;
  const end   = document.getElementById('slot-end')?.value;
  const price = parseFloat(document.getElementById('slot-price')?.value || '0');
  if (!date || !start || !end) { showToast('Please fill all fields', 'error'); return; }
  const startAt = new Date(`${date}T${start}:00`).toISOString();
  const endAt   = new Date(`${date}T${end}:00`).toISOString();
  if (new Date(startAt) >= new Date(endAt)) { showToast('End time must be after start time', 'error'); return; }
  const btn = document.getElementById('slot-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Adding...'; }
  try {
    const userId = AC_STATE.user?.id;
    await AC_API.experts.createSlot(userId, { startAt, endAt, price });
    AC_STATE._expertScheduleCache = undefined;
    document.getElementById('add-slot-modal')?.remove();
    showToast('Slot added', 'success');
    AC_ROUTER.show('expert-schedule');
  } catch (err) {
    showToast(err.message || 'Failed to add slot', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Add Slot'; }
  }
},

});
