import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/supplier/supplier.js
   Agro-Supplier screens: supplierDashboard, myListings,
   uploadProduct, ordersReceived, supplierAnalytics
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

supplierDashboard() {
  /* Use analytics cache if already loaded, else show dashes until supplierAnalytics() populates it */
  const d = AC_STATE._supplierAnalyticsCache;
  const stats = [
    { icon:'💰', label:'Total Revenue',    value: d ? formatNaira(d.totalRevenue||0) : '₦—',    color:'#16A34A', bg:'#F0FDF4' },
    { icon:'📦', label:'Orders Delivered', value: d ? String(d.totalOrders||0)        : '—',     color:'#2563EB', bg:'#EFF6FF' },
    { icon:'🔄', label:'Fulfilment Rate',  value: d ? `${d.fulfilmentRate||0}%`       : '—',     color:'#D97706', bg:'#FFFBEB' },
    { icon:'⭐', label:'Cancel Rate',      value: d ? `${d.cancelRate||0}%`           : '—',     color:'#7C3AED', bg:'#F5F3FF' },
  ];
  const recentOrders = [
    { id:'AGR-001245', product:'Hybrid Maize Seeds', amount:'₦30,000', status:'Pending' },
    { id:'AGR-001238', product:'Rice Seeds',         amount:'₦25,000', status:'Pending' },
    { id:'AGR-001231', product:'Tomato Seeds',       amount:'₦16,000', status:'Shipped' },
  ];
  const topProducts = [
    { emoji:'🌱', name:'Hybrid Maize Seeds',  sold:156, price:'₦15,000' },
    { emoji:'🌱', name:'Rice Seeds (FARO 44)',sold:89,  price:'₦25,000' },
    { emoji:'🌱', name:'Tomato Seeds',         sold:234, price:'₦8,000'  },
    { emoji:'🌱', name:'Cassava Stems',        sold:67,  price:'₦12,000' },
  ];
  // Revenue bars (mock 1M view: 4 weeks)
  const bars = [65, 80, 55, 90, 70, 100, 85];
  const barLabels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const maxBar = Math.max(...bars);

  return `
  <div style="padding:0 0 32px;">

    <!-- HERO -->
    <div style="
      background:linear-gradient(135deg,#5B21B6 0%,#7C3AED 100%);
      border-radius:16px;margin:24px 24px 0;padding:28px 28px;
      position:relative;overflow:hidden;
    ">
      <div style="position:absolute;right:-30px;top:-30px;width:160px;height:160px;background:rgba(255,255,255,0.06);border-radius:50%;"></div>
      <h2 style="color:white;font-size:20px;font-weight:800;margin:0 0 4px;">Welcome back, ${AC_STATE.user.name.split(' ')[0] || 'Supplier'}! 🌱</h2>
      <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">Here's what's happening with your store today</p>
    </div>

    <!-- STAT CARDS -->
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:16px 24px 0;">
      ${stats.map(s => `
        <div style="background:${s.bg};border-radius:14px;padding:18px 16px;">
          <div style="font-size:24px;margin-bottom:6px;">${s.icon}</div>
          <div style="font-size:11px;color:#6B7280;margin-bottom:4px;">${s.label}</div>
          <div style="font-size:22px;font-weight:800;color:${s.color};">${s.value}</div>
        </div>
      `).join('')}
    </div>

    <!-- REVENUE + RECENT ORDERS (two-col on desktop) -->
    <div style="display:grid;grid-template-columns:1fr minmax(0,360px);gap:16px;padding:20px 24px 0;align-items:start;">

      <!-- REVENUE CHART -->
      <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:8px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0;">Revenue Overview</h3>
          <div style="display:flex;gap:4px;">
            ${['7D','1M','3M','1Y'].map((t,i) => `
              <button style="
                padding:5px 10px;border-radius:6px;font-size:12px;font-weight:600;border:none;cursor:pointer;
                background:${i===1?'#7C3AED':'transparent'};color:${i===1?'white':'#6B7280'};
              ">${t}</button>
            `).join('')}
          </div>
        </div>
        <!-- BAR CHART -->
        <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding-bottom:4px;">
          ${bars.map((h,i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="
                width:100%;background:${i===5?'#7C3AED':'#DDD6FE'};border-radius:4px 4px 0 0;
                height:${Math.round((h/maxBar)*100)}px;transition:height .3s;
              "></div>
              <span style="font-size:10px;color:#9CA3AF;">${barLabels[i]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RECENT ORDERS -->
      <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0;">Recent Orders</h3>
          <button onclick="AC_STATE.navigate('orders-received')" style="background:none;border:none;color:#7C3AED;font-size:13px;font-weight:600;cursor:pointer;">View All</button>
        </div>
        ${recentOrders.map(o => {
          const sc = o.status==='Pending'?'#D97706':o.status==='Shipped'?'#2563EB':'#16A34A';
          return `
          <div style="border-bottom:1px solid #F3F4F6;padding-bottom:12px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <div style="font-size:13px;font-weight:700;color:#111827;">${o.product}</div>
                <div style="font-size:11px;color:#9CA3AF;">Order #${o.id}</div>
              </div>
              <div style="font-size:14px;font-weight:800;color:#111827;">${o.amount}</div>
            </div>
            <span style="display:inline-block;margin-top:6px;background:${sc}15;color:${sc};font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;">${o.status}</span>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- TOP PRODUCTS -->
    <div style="padding:20px 24px 0;">
      <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;">
        <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Top Selling Products</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
          ${topProducts.map((p,i) => `
            <div style="display:flex;gap:12px;align-items:center;background:#F9FAFB;border-radius:10px;padding:12px;">
              <div style="font-size:32px;">${p.emoji}</div>
              <div>
                <div style="font-size:13px;font-weight:700;color:#111827;">${p.name}</div>
                <div style="font-size:12px;color:#6B7280;">${p.sold} units sold</div>
                <div style="font-size:13px;font-weight:700;color:#7C3AED;">${p.price} each</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

  </div>`;
},

/* ─────────────────────────────────────────────
   MY LISTINGS
───────────────────────────────────────────── */
myListings() {
  if (AC_STATE._myListingsCache === undefined) {
    AC_STATE._myListingsCache = null;
    AC_API.products.list({ supplierId: AC_STATE.user.id }).then(res => {
      AC_STATE._myListingsCache = res.data ?? res ?? [];
      if (AC_STATE.currentScreen === 'my-listings') AC_ROUTER.show('my-listings');
    }).catch(() => {
      AC_STATE._myListingsCache = undefined;
      if (AC_STATE.currentScreen === 'my-listings') AC_ROUTER.show('my-listings');
    });
  }
  if (AC_STATE._myListingsCache === null) return AC_UI.listSkeletons(4);
  if (AC_STATE._myListingsCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._myListingsCache=undefined;AC_ROUTER.show('my-listings')" });

  const listings = AC_STATE._myListingsCache;
  const active    = listings.filter(l => l.status === 'active'  || l.isPublished).length;
  const outOfStock= listings.filter(l => (l.stock ?? l.quantity ?? 0) === 0).length;
  const tabs = [['All', listings.length], ['Active', active], ['Out of Stock', outOfStock]];
  let activeTab = 'All';

  const getStatus = (l) => {
    if (!l.isPublished) return 'Draft';
    if ((l.stock ?? l.quantity ?? 0) === 0) return 'Out of Stock';
    return 'Active';
  };
  const statusStyle = (s) => s==='Active'
    ? 'background:#F0FDF4;color:#16A34A;'
    : s==='Out of Stock'
    ? 'background:#FFF1F2;color:#EF4444;'
    : 'background:#F9FAFB;color:#6B7280;';

  return `
  <div style="padding:24px;">
    <!-- TITLE -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap;">
      <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0;">My Listings</h1>
      <button onclick="AC_STATE.navigate('upload-product')" style="
        background:#1E8B4C;color:white;border:none;
        padding:10px 18px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;
      ">+ Add Product</button>
    </div>

    <!-- TABS -->
    <div style="display:flex;gap:0;border-bottom:2px solid #E5E7EB;margin-bottom:20px;overflow-x:auto;">
      ${tabs.map(([label,count],i) => `
        <button style="
          padding:10px 16px;border:none;background:none;cursor:pointer;white-space:nowrap;
          font-size:14px;font-weight:${i===0?'700':'500'};
          color:${i===0?'#1E8B4C':'#6B7280'};
          border-bottom:${i===0?'2px solid #1E8B4C':'2px solid transparent'};
          margin-bottom:-2px;
        ">${label} (${count})</button>
      `).join('')}
    </div>

    <!-- TABLE -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
      <!-- HEADER -->
      <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 1fr 40px;gap:0;background:#F9FAFB;padding:12px 20px;border-bottom:1px solid #E5E7EB;">
        ${['Product','Category','Price','Stock','Status',''].map(h => `
          <div style="font-size:12px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:.05em;">${h}</div>
        `).join('')}
      </div>
      <!-- ROWS -->
      ${listings.length === 0 ? `<div style="padding:40px;text-align:center;color:#6B7280;">No products yet. <span onclick="AC_STATE.navigate('upload-product')" style="color:#1E8B4C;cursor:pointer;font-weight:700;">Add your first product →</span></div>` : listings.map(l => {
        const stock = l.stock ?? l.quantity ?? 0;
        const status = getStatus(l);
        return `
        <div style="display:grid;grid-template-columns:3fr 1fr 1fr 1fr 1fr 40px;gap:0;padding:14px 20px;border-bottom:1px solid #F3F4F6;align-items:center;" onmouseenter="this.style.background='#FAFAFA'" onmouseleave="this.style.background='white'">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:44px;height:44px;background:#F0FDF4;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">${l.emoji || '🌱'}</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#111827;">${l.name}</div>
              <div style="font-size:12px;color:#9CA3AF;">ID: #${l.id?.slice(0,8) ?? '—'}</div>
            </div>
          </div>
          <div style="font-size:13px;color:#374151;">${l.category ?? l.inputType ?? '—'}</div>
          <div style="font-size:13px;font-weight:700;color:#111827;">₦${(l.price ?? 0).toLocaleString()}</div>
          <div style="font-size:13px;font-weight:700;color:${stock===0?'#EF4444':stock<50?'#D97706':'#16A34A'};">${stock}</div>
          <div>
            <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;${statusStyle(status)}">${status}</span>
          </div>
          <div style="position:relative;">
            <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='block'?'none':'block'" style="background:none;border:none;font-size:18px;cursor:pointer;color:#6B7280;padding:4px;">⋮</button>
            <div style="display:none;position:absolute;right:0;top:28px;background:white;border:1px solid #E5E7EB;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.08);z-index:10;min-width:120px;">
              <button style="display:block;width:100%;text-align:left;padding:10px 14px;border:none;background:none;font-size:13px;cursor:pointer;color:#374151;" onmouseenter="this.style.background='#F9FAFB'" onmouseleave="this.style.background='none'">✏️ Edit</button>
              <button onclick="AC_STATE.selectedReviewProduct={id:'${l.id}',name:'${l.name}'};AC_STATE.navigate('supplier-reviews')" style="display:block;width:100%;text-align:left;padding:10px 14px;border:none;background:none;font-size:13px;cursor:pointer;color:#374151;" onmouseenter="this.style.background='#F9FAFB'" onmouseleave="this.style.background='none'">★ Reviews</button>
              <button style="display:block;width:100%;text-align:left;padding:10px 14px;border:none;background:none;font-size:13px;cursor:pointer;color:#EF4444;" onmouseenter="this.style.background='#FFF1F2'" onmouseleave="this.style.background='none'">🗑 Delete</button>
            </div>
          </div>
        </div>
      `; }).join('')}
    </div>

    <!-- PAGINATION -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;flex-wrap:wrap;gap:8px;">
      <span style="font-size:13px;color:#6B7280;">Showing ${listings.length} product${listings.length===1?'':'s'}</span>
      <div style="display:flex;gap:4px;align-items:center;">
        <button style="padding:7px 12px;border:1px solid #E5E7EB;border-radius:6px;background:white;font-size:13px;cursor:pointer;color:#374151;">← Prev</button>
        ${[1,2,3].map(n => `<button style="width:32px;height:32px;border:${n===1?'none':'1px solid #E5E7EB'};border-radius:6px;background:${n===1?'#1E8B4C':'white'};color:${n===1?'white':'#374151'};font-size:13px;font-weight:${n===1?'700':'400'};cursor:pointer;">${n}</button>`).join('')}
        <button style="padding:7px 12px;border:1px solid #E5E7EB;border-radius:6px;background:white;font-size:13px;cursor:pointer;color:#374151;">Next →</button>
      </div>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   UPLOAD PRODUCT
───────────────────────────────────────────── */
uploadProduct() {
  return `
  <div style="max-width:800px;margin:0 auto;padding:24px 24px 60px;">

    <!-- TITLE ROW -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
      <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0;">List New Product</h1>
      <div style="display:flex;gap:10px;">
        <button onclick="showToast('Draft saved','success')" style="padding:10px 20px;border:1px solid #E5E7EB;background:white;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;color:#374151;">Save Draft</button>
        <button onclick="AC_SCREENS.publishProduct()" style="padding:10px 20px;background:#1E8B4C;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;color:white;">Publish</button>
      </div>
    </div>

    <!-- IMAGES -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Product Images</h3>
      <div id="product-images-preview" style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;"></div>
      <label style="
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        width:180px;height:120px;border:2px dashed #D1D5DB;border-radius:12px;
        cursor:pointer;gap:8px;background:#FAFAFA;
      " onmouseover="this.style.borderColor='#1E8B4C'" onmouseout="this.style.borderColor='#D1D5DB'">
        <span style="font-size:28px;">🌱</span>
        <span style="font-size:12px;color:#6B7280;text-align:center;padding:0 12px;">Click to add images</span>
        <span style="font-size:11px;color:#9CA3AF;">PNG, JPG up to 5MB · Max 5</span>
        <input id="up-images" type="file" accept="image/*" multiple style="display:none;" onchange="AC_SCREENS.previewProductImages(this)">
      </label>
    </div>

    <!-- BASIC INFO -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Basic Information</h3>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Product Name</label>
          <input id="up-name" type="text" placeholder="e.g., Hybrid Maize Seeds Premium Quality" style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;box-sizing:border-box;">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Category</label>
            <select id="up-category" style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;background:white;">
              <option value="">Select Category</option>
              <option value="seeds">Seeds</option>
              <option value="fertilizers">Fertilizers</option>
              <option value="crop-protect">Crop Protection</option>
              <option value="equipment">Equipment</option>
              <option value="post-harvest">Post-Harvest</option>
            </select>
          </div>
          <div>
            <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Subcategory</label>
            <input id="up-subcategory" type="text" placeholder="e.g., Hybrid Seeds" style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Description</label>
          <textarea id="up-desc" rows="4" placeholder="Describe your product in detail..." style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>
        </div>
      </div>
    </div>

    <!-- PRICING & INVENTORY -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Pricing & Inventory</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;">
        ${[
          ['up-price','Price per Unit','0.00','number'],
          ['up-unit','Unit','e.g., kg, bag','text'],
          ['up-stock','Stock Quantity','e.g., 450','number'],
          ['up-min-order','Minimum Order','1','number'],
        ].map(([id,label,ph,type]) => `
          <div>
            <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">${label}</label>
            <input id="${id}" type="${type}" placeholder="${ph}" style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;box-sizing:border-box;">
          </div>
        `).join('')}
      </div>
    </div>

    <!-- SHIPPING -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:24px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Shipping Information</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;">
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Weight (kg)</label>
          <input type="number" placeholder="0" style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Location (State)</label>
          <select style="width:100%;padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;background:white;">
            <option value="">Select state</option>
            <option>Lagos</option><option>Abuja</option><option>Kano</option><option>Kaduna</option>
            <option>Rivers</option><option>Ogun</option><option>Oyo</option><option>Enugu</option>
          </select>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${[['Nationwide Delivery',true],['Pickup Available',false]].map(([label,checked]) => `
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
            <input type="checkbox" ${checked?'checked':''} style="width:16px;height:16px;accent-color:#1E8B4C;">
            <span style="font-size:14px;color:#374151;">${label}</span>
          </label>
        `).join('')}
      </div>
    </div>

    <!-- STICKY FOOTER BUTTONS -->
    <div style="display:flex;gap:12px;">
      <button onclick="AC_STATE.navigate('my-listings')" style="flex:1;padding:14px;border:1px solid #E5E7EB;background:white;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;color:#374151;">Cancel</button>
      <button onclick="AC_SCREENS.publishProduct()" style="flex:2;padding:14px;background:#1E8B4C;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;color:white;">Publish Product</button>
    </div>

  </div>`;
},

/* Show inline previews when files are selected */
previewProductImages(input) {
  const preview = document.getElementById('product-images-preview');
  if (!preview) return;
  preview.innerHTML = '';
  const files = Array.from(input.files).slice(0, 5);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src   = e.target.result;
      img.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #E5E7EB;';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
},

async publishProduct() {
  const name        = document.getElementById('up-name')?.value?.trim()       || '';
  const inputType   = document.getElementById('up-category')?.value           || '';
  const subCategory = document.getElementById('up-subcategory')?.value?.trim()|| '';
  const description = document.getElementById('up-desc')?.value?.trim()       || '';
  const price       = parseFloat(document.getElementById('up-price')?.value)  || 0;
  const unit        = document.getElementById('up-unit')?.value?.trim()        || '';
  const stock       = parseInt(document.getElementById('up-stock')?.value)     || 0;
  const minOrder    = parseInt(document.getElementById('up-min-order')?.value) || 1;

  if (!name)        { showToast('Product name is required', 'error'); return; }
  if (!inputType)   { showToast('Please select a category', 'error'); return; }
  if (!subCategory) { showToast('Please enter a subcategory', 'error'); return; }
  if (!price || price <= 0) { showToast('Please enter a valid price', 'error'); return; }
  if (!unit)        { showToast('Please enter a unit (e.g. kg, bag)', 'error'); return; }

  const btn = document.querySelector('[onclick="AC_SCREENS.publishProduct()"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Publishing...'; }

  try {
    /* Upload any selected images first */
    const imageInput = document.getElementById('up-images');
    const imageUrls  = [];
    if (imageInput?.files?.length && window.AC_CONFIG?.API_BASE_URL) {
      showToast('Uploading images…', '');
      for (const file of Array.from(imageInput.files).slice(0, 5)) {
        try {
          const { data } = await AC_API.uploads.upload(file, 'product-image');
          imageUrls.push(data.url);
        } catch { /* non-fatal: proceed without this image */ }
      }
    }

    await AC_DL.publishProduct({ name, inputType, subCategory, description, price, unit, stock, minOrder, images: imageUrls });
    showToast('Product published successfully!', 'success');
    AC_STATE._supplierListingsCache = null;
    setTimeout(() => AC_STATE.navigate('my-listings'), 800);
  } catch (err) {
    showToast(err?.data?.error ?? err?.message ?? 'Failed to publish product', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Publish Product'; }
  }
},

/* ─────────────────────────────────────────────
   ORDERS RECEIVED
───────────────────────────────────────────── */
ordersReceived() {
  if (AC_STATE._supplierOrdersCache === undefined) {
    AC_STATE._supplierOrdersCache = null;
    AC_API.orders.list({ limit: 20 }).then(res => {
      AC_STATE._supplierOrdersCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'orders-received') AC_ROUTER.show('orders-received');
    }).catch(() => {
      if (!window.AC_CONFIG?.API_BASE_URL) {
        AC_STATE._supplierOrdersCache = [
          { id:'AGR-2026-001245', orderNumber:'AGR-2026-001245', farmer:{name:'Adewale Ogunlade',phone:'+234 803 456 7890'}, items:[{emoji:'🌱',productName:'Hybrid Maize'},{emoji:'🌱',productName:'Fertilizer'}], totalAmount:55000, status:'pending',   createdAt:new Date().toISOString() },
          { id:'AGR-2026-001238', orderNumber:'AGR-2026-001238', farmer:{name:'Chioma Nwosu',    phone:'+234 805 123 4567'}, items:[{emoji:'🌱',productName:'Rice Seeds'}],                                           totalAmount:33000, status:'processing',createdAt:new Date().toISOString() },
          { id:'AGR-2026-001230', orderNumber:'AGR-2026-001230', farmer:{name:'Ibrahim Mohammed', phone:'+234 807 987 6543'}, items:[{emoji:'🌱',productName:'Tomato Seeds'}],                                        totalAmount:48000, status:'shipped',   createdAt:new Date().toISOString() },
        ];
      } else {
        AC_STATE._supplierOrdersCache = [];
      }
      if (AC_STATE.currentScreen === 'orders-received') AC_ROUTER.show('orders-received');
    });
  }

  if (AC_STATE._supplierOrdersCache === null) return AC_UI.listSkeletons(3);
  if (AC_STATE._supplierOrdersCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._supplierOrdersCache=undefined;AC_ROUTER.show('orders-received')" });

  const orders = AC_STATE._supplierOrdersCache;
  const statusColor = { pending:'#D97706', processing:'#2563EB', shipped:'#7C3AED', in_transit:'#7C3AED', delivered:'#16A34A', completed:'#16A34A', cancelled:'#EF4444' };
  const statusLabel = { pending:'Pending', processing:'Processing', shipped:'Shipped', in_transit:'In Transit', delivered:'Delivered', completed:'Completed', cancelled:'Cancelled' };
  const tabs = [
    ['All',     orders.length],
    ['Pending', orders.filter(o=>o.status==='pending').length],
    ['Shipped', orders.filter(o=>o.status==='shipped'||o.status==='in_transit').length],
    ['Delivered',orders.filter(o=>o.status==='delivered'||o.status==='completed').length],
  ];

  return `
  <div style="padding:24px;">
    <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 20px;">Orders Received</h1>

    <!-- TABS -->
    <div style="display:flex;gap:0;border-bottom:2px solid #E5E7EB;margin-bottom:20px;overflow-x:auto;">
      ${tabs.map(([label,count],i) => `
        <button style="
          padding:10px 14px;border:none;background:none;cursor:pointer;white-space:nowrap;
          font-size:13px;font-weight:${i===0?'700':'500'};
          color:${i===0?'#1E8B4C':'#6B7280'};
          border-bottom:${i===0?'2px solid #1E8B4C':'2px solid transparent'};
          margin-bottom:-2px;
        ">${label} (${count})</button>
      `).join('')}
    </div>

    <!-- ORDER CARDS -->
    ${orders.length === 0
      ? AC_UI.empty({ icon:'📦', title:'No orders yet', message:'Orders from farmers will appear here.' })
      : `<div style="display:flex;flex-direction:column;gap:14px;">
        ${orders.map(o => {
          const sc   = statusColor[o.status] || '#6B7280';
          const label = statusLabel[o.status] || o.status;
          const customerName  = o.farmer?.name  || o.deliveryName || 'Farmer';
          const customerPhone = o.farmer?.phone || o.deliveryPhone || '';
          const fmtDate = new Date(o.createdAt||o.date||Date.now()).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'});
          const items = o.items || [];
          return `
          <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:18px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;flex-wrap:wrap;gap:8px;">
              <div>
                <div style="font-size:15px;font-weight:800;color:#111827;">Order #${o.orderNumber||o.id}</div>
                <div style="font-size:12px;color:#9CA3AF;margin-top:2px;">${fmtDate}</div>
              </div>
              <span style="background:${sc}18;color:${sc};font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;white-space:nowrap;">${label}</span>
            </div>
            <div style="font-size:13px;color:#374151;margin-bottom:12px;">
              Customer: <strong>${customerName}</strong>${customerPhone ? ` · ${customerPhone}` : ''}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="font-size:12px;color:#6B7280;">Items:</span>
                ${items.slice(0,3).map(i => `<span style="font-size:20px;">${i.emoji||'🌱'}</span>`).join('')}
                ${items.length > 3 ? `<span style="font-size:12px;color:#6B7280;">+${items.length-3} more</span>` : ''}
              </div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <span style="font-size:15px;font-weight:800;color:#1E8B4C;">₦${(o.totalAmount||o.total||0).toLocaleString()}</span>
                ${['pending','processing'].includes(o.status) ? `
                  <button onclick="AC_SCREENS.showShipModal('${o.id}','${o.orderNumber||o.id}')"
                    style="padding:8px 16px;background:#2563EB;color:white;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;">🚚 Mark Shipped</button>` : ''}
                <button onclick="AC_STATE.selectedMessageOrder={id:'${o.id}',orderNumber:'${o.orderNumber||o.id}'};AC_STATE.navigate('order-messages')"
                  style="padding:8px 16px;background:white;color:#1E8B4C;border:1px solid #1E8B4C;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;">💬 Message</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`
    }

    <div style="margin-top:14px;">
      <span style="font-size:13px;color:#6B7280;">Showing ${orders.length} order${orders.length!==1?'s':''}</span>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SELLER ANALYTICS
───────────────────────────────────────────── */
supplierAnalytics() {
  if (AC_STATE._supplierAnalyticsCache === undefined) {
    AC_STATE._supplierAnalyticsCache = null;
    AC_API.analytics.supplier().then(res => {
      AC_STATE._supplierAnalyticsCache = res.data ?? res;
      if (AC_STATE.currentScreen === 'supplier-analytics') AC_ROUTER.show('supplier-analytics');
    }).catch(() => {
      AC_STATE._supplierAnalyticsCache = undefined;
      if (AC_STATE.currentScreen === 'supplier-analytics') AC_ROUTER.show('supplier-analytics');
    });
  }
  if (AC_STATE._supplierAnalyticsCache === null)      return AC_UI.listSkeletons(4);
  if (AC_STATE._supplierAnalyticsCache === undefined) return AC_UI.error({ retryFn: "AC_STATE._supplierAnalyticsCache=undefined;AC_ROUTER.show('supplier-analytics')" });

  const d = AC_STATE._supplierAnalyticsCache;
  const monthly     = d.monthlyRevenue || [];
  const monthlyRevenue = monthly.map(m => m.revenue);
  const months      = monthly.map(m => m.label);
  const maxRev      = Math.max(...monthlyRevenue, 1);
  const topCats     = (d.topCats || []).length > 0 ? d.topCats : [{ name: 'No sales yet', pct: 100, color: '#9CA3AF' }];
  return `
  <div style="padding:24px 24px 40px;">
    <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 20px;">🌱 Supplier Analytics</h1>

    <!-- KPI CARDS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:20px;">
      ${[
        ['Total Revenue',     formatNaira(d.totalRevenue||0),        `${d.totalOrders||0} delivered orders`, '#16A34A','#F0FDF4'],
        ['Units Sold',        `${(d.totalUnits||0).toLocaleString()}`, 'across all products',                '#2563EB','#EFF6FF'],
        ['Avg Order Value',   formatNaira(d.avgOrderValue||0),        'per delivered order',                 '#7C3AED','#F5F3FF'],
        ['Cancellation Rate', `${d.cancelRate||0}%`,                  'of all orders',                      '#D97706','#FFFBEB'],
      ].map(([title,val,trend,color,bg]) => `
        <div style="background:${bg};border-radius:14px;padding:18px 16px;">
          <div style="font-size:11px;color:#6B7280;margin-bottom:6px;">${title}</div>
          <div style="font-size:20px;font-weight:800;color:${color};margin-bottom:4px;">${val}</div>
          <div style="font-size:11px;color:${color};">${trend}</div>
        </div>
      `).join('')}
    </div>

    <!-- REVENUE CHART -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 20px;">Monthly Revenue (₦ thousands)</h3>
      <div style="display:flex;align-items:flex-end;gap:6px;height:160px;">
        ${monthlyRevenue.map((v,i) => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
            <div style="font-size:9px;color:#9CA3AF;">${v}</div>
            <div style="
              width:100%;background:${i===11?'#1E8B4C':'#BBF7D0'};border-radius:4px 4px 0 0;
              height:${Math.round((v/maxRev)*120)}px;
            "></div>
            <span style="font-size:9px;color:#9CA3AF;">${months[i]}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- CATEGORY BREAKDOWN + TOP PRODUCTS SIDE BY SIDE -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

      <!-- CATEGORY -->
      <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;">
        <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Sales by Category</h3>
        ${topCats.map(c => `
          <div style="margin-bottom:14px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span style="font-size:13px;font-weight:600;color:#374151;">${c.name}</span>
              <span style="font-size:13px;font-weight:700;color:${c.color};">${c.pct}%</span>
            </div>
            <div style="background:#F3F4F6;border-radius:4px;height:8px;">
              <div style="background:${c.color};border-radius:4px;height:8px;width:${c.pct}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- QUICK STATS -->
      <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:20px;">
        <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Performance</h3>
        ${[
          ['Total Orders',      (d.totalOrders||0).toLocaleString(),  'delivered to customers'],
          ['Repeat Customers',  `${d.repeatPct||0}%`,                  'of your buyers'],
          ['Fulfilment Rate',   `${d.fulfilmentRate||100}%`,            'orders completed'],
          ['Cancellation Rate', `${d.cancelRate||0}%`,                  'of all orders'],
          ['Top Product',       d.topProducts?.[0]?.name||'—',          'by revenue'],
        ].map(([label,val,sub]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #F3F4F6;">
            <div>
              <div style="font-size:13px;font-weight:600;color:#374151;">${label}</div>
              <div style="font-size:11px;color:#9CA3AF;">${sub}</div>
            </div>
            <div style="font-size:16px;font-weight:800;color:#1E8B4C;">${val}</div>
          </div>
        `).join('')}
      </div>

    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   SHIP ORDER MODAL
───────────────────────────────────────────── */
showShipModal(orderId, orderNumber) {
  const existing = document.getElementById('ship-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'ship-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;';
  modal.innerHTML = `
    <div style="background:white;border-radius:var(--radius-xl);padding:28px;width:100%;max-width:420px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-size:var(--text-xl);font-weight:700;color:var(--gray-900);">Mark as Shipped</h2>
        <button onclick="document.getElementById('ship-modal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--gray-400);">×</button>
      </div>
      <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:18px;">Order #${orderNumber}</p>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Carrier</label>
          <select id="ship-carrier" style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);background:white;box-sizing:border-box;">
            <option value="sendbox">Sendbox</option>
            <option value="gig">GIG Logistics</option>
            <option value="dhl">DHL Nigeria</option>
            <option value="kwik">Kwik Delivery</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label style="font-size:var(--text-sm);font-weight:600;color:var(--gray-700);display:block;margin-bottom:5px;">Tracking Number</label>
          <input id="ship-tracking" type="text" placeholder="e.g. SBX-2026-123456"
            style="width:100%;height:42px;padding:0 12px;border:1.5px solid var(--gray-200);border-radius:var(--radius-md);font-size:var(--text-sm);font-family:var(--font);box-sizing:border-box;">
        </div>
        <button id="ship-submit" onclick="AC_SCREENS._submitShip('${orderId}')"
          style="width:100%;height:44px;background:#2563EB;color:white;border:none;border-radius:var(--radius-full);font-size:var(--text-sm);font-weight:700;font-family:var(--font);cursor:pointer;">
          Confirm Shipment
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.getElementById('ship-tracking')?.focus();
},

async _submitShip(orderId) {
  const carrier     = document.getElementById('ship-carrier')?.value;
  const trackingCode = document.getElementById('ship-tracking')?.value?.trim();
  if (!trackingCode) { showToast('Please enter a tracking number', 'error'); return; }

  const btn = document.getElementById('ship-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }

  try {
    await AC_API.orders.ship(orderId, { carrier, trackingCode });
    document.getElementById('ship-modal')?.remove();
    showToast('Order marked as shipped! Farmer has been notified.', 'success');
  } catch (err) {
    showToast(err.message || 'Failed to update shipment', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Confirm Shipment'; }
  }
},

/* ─────────────────────────────────────────────
   SUPPLIER — PRODUCT REVIEWS
───────────────────────────────────────────── */
supplierProductReviews() {
  const { id: productId, name: productName } = AC_STATE.selectedReviewProduct || {};
  if (!productId) return `<div style="padding:40px;text-align:center;color:var(--gray-400);">No product selected.</div>`;

  if (!AC_STATE._reviewsCache) AC_STATE._reviewsCache = {};
  if (AC_STATE._reviewsCache[productId] === undefined) {
    AC_STATE._reviewsCache[productId] = null;
    AC_API.products.reviews(productId).then(res => {
      AC_STATE._reviewsCache[productId] = res;
      if (AC_STATE.currentScreen === 'supplier-reviews') AC_ROUTER.show('supplier-reviews');
    }).catch(() => {
      AC_STATE._reviewsCache[productId] = { data: [], meta: { total: 0 } };
      if (AC_STATE.currentScreen === 'supplier-reviews') AC_ROUTER.show('supplier-reviews');
    });
  }

  const rev = AC_STATE._reviewsCache[productId];

  if (rev === null) return AC_UI.listSkeletons(4);

  const reviews = rev.data || [];
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;
  const dist = [5,4,3,2,1].map(n => ({ star: n, count: reviews.filter(r => r.rating === n).length }));

  return `
  <div class="animate-fadeIn" style="max-width:680px;margin:0 auto;padding:24px 24px 48px;">
    <button onclick="AC_STATE.navigate('my-listings')" style="background:none;border:none;color:#1E8B4C;font-weight:600;font-size:14px;cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;">← Back to Listings</button>
    <h1 style="font-size:var(--text-2xl);font-weight:700;color:var(--gray-900);margin-bottom:4px;">Reviews</h1>
    <p style="font-size:var(--text-sm);color:var(--gray-500);margin-bottom:20px;">${productName}</p>

    ${reviews.length === 0
      ? `<div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:48px;text-align:center;color:var(--gray-400);">No reviews yet for this product.</div>`
      : `
      <!-- SUMMARY -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:24px;margin-bottom:16px;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        <div style="text-align:center;flex-shrink:0;">
          <div style="font-size:48px;font-weight:800;color:var(--gray-900);line-height:1;">${avg}</div>
          <div style="color:#F59E0B;font-size:20px;">${'★'.repeat(Math.round(avg))}${'☆'.repeat(5-Math.round(avg))}</div>
          <div style="font-size:12px;color:var(--gray-400);margin-top:4px;">${reviews.length} review${reviews.length!==1?'s':''}</div>
        </div>
        <div style="flex:1;min-width:160px;">
          ${dist.map(d => `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
              <span style="font-size:12px;color:var(--gray-600);width:12px;">${d.star}</span>
              <div style="flex:1;background:var(--gray-200);border-radius:4px;height:7px;overflow:hidden;">
                <div style="width:${reviews.length ? Math.round((d.count/reviews.length)*100) : 0}%;height:100%;background:#F59E0B;border-radius:4px;"></div>
              </div>
              <span style="font-size:12px;color:var(--gray-400);width:16px;text-align:right;">${d.count}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- REVIEW LIST -->
      <div style="background:white;border:1px solid var(--gray-200);border-radius:var(--radius-md);overflow:hidden;">
        ${reviews.map((r, i) => `
          <div style="padding:18px 20px;${i < reviews.length-1 ? 'border-bottom:1px solid var(--gray-100)' : ''}">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <div style="width:36px;height:36px;border-radius:50%;background:#DCFCE7;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#16A34A;flex-shrink:0;">${(r.user?.name||'F')[0]}</div>
              <div style="flex:1;">
                <div style="font-size:var(--text-sm);font-weight:700;color:var(--gray-900);">${r.user?.name||'Farmer'}</div>
                <div style="color:#F59E0B;font-size:13px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
              </div>
              <span style="font-size:11px;color:var(--gray-400);">${new Date(r.createdAt).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})}</span>
            </div>
            ${r.comment ? `<p style="font-size:13px;color:var(--gray-600);margin:0;line-height:1.6;">${r.comment}</p>` : ''}
          </div>
        `).join('')}
      </div>`
    }
  </div>`;
},

/* ─────────────────────────────────────────────
   BACKWARD COMPAT ALIASES
───────────────────────────────────────────── */
});
