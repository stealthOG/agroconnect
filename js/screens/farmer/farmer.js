import AC_SCREENS from '../../screens-init.js';

/* ═══════════════════════════════════════════════════════════
   AGROCONNECT - screens/farmer/farmer.js
   Farmer screens: home, inputMarket, inputDetail, cart,
   checkout, payment, orderConfirm, orderHistory,
   orderDetail, wishlist, listProduce
   ═══════════════════════════════════════════════════════════ */

Object.assign(AC_SCREENS, {

/* ─────────────────────────────────────────────
   HOME DASHBOARD
───────────────────────────────────────────── */
home() {
  const stats = [
    { value:'15K+',  label:'Active Farmers',   color:'#2563EB', bg:'#EFF6FF' },
    { value:'2.5K+', label:'Input Products',   color:'#16A34A', bg:'#DCFCE7' },
    { value:'₦2.5B+',label:'Loans Disbursed',  color:'#7C3AED', bg:'#EDE9FE' },
    { value:'500+',  label:'Expert Partners',  color:'#D97706', bg:'#FEF3C7' },
  ];
  const features = [
    { emoji:'🌱', title:'Input Market',       desc:'Buy seeds, fertilizers, chemicals and equipment from verified suppliers', screen:'input-market' },
    { emoji:'🌱', title:'Skill Development',  desc:'Access courses and training from certified agricultural experts',         screen:'learning'      },
    { emoji:'🌱', title:'My Wallet',          desc:'Manage your personal balance and agric credit from cooperatives',        screen:'wallet'        },
    { emoji:'🌱', title:'Logistics',          desc:'Track shipments and find Agro Hubs near you',                           screen:'logistics'     },
    { emoji:'🌱', title:'Expert Network',     desc:'Book consultations with agronomists, soil scientists and more',          screen:'experts'       },
    { emoji:'🌱', title:'List My Produce',    desc:'Sell your farm harvest directly to buyers nationwide',                   screen:'list-produce'  },
  ];
  return `
  <div style="padding:0 0 32px;">

    <!-- HERO -->
    <div style="
      background:linear-gradient(135deg,#1a7a3c 0%,#22a350 100%);
      border-radius:16px;padding:36px 28px;margin:24px 24px 0;
      position:relative;overflow:hidden;
    ">
      <div style="position:absolute;width:260px;height:260px;background:rgba(255,255,255,0.06);border-radius:50%;top:-80px;right:60px;pointer-events:none;"></div>
      <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.04);border-radius:50%;bottom:-60px;right:-30px;pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <h1 style="color:white;font-size:clamp(22px,4vw,30px);font-weight:700;margin-bottom:8px;line-height:1.2;">Welcome to AgroConnect</h1>
        <p style="color:rgba(255,255,255,0.85);font-size:14px;margin-bottom:24px;">Empowering Nigerian Farmers Through Digital Innovation</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button onclick="AC_STATE.navigate('input-market')" style="background:white;color:#1E8B4C;border:none;border-radius:8px;padding:10px 22px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">Browse Inputs</button>
          <button onclick="AC_STATE.navigate('learning')" style="background:transparent;color:white;border:2px solid rgba(255,255,255,0.7);border-radius:8px;padding:10px 22px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;">Learn More</button>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:16px 24px 0;">
      ${stats.map(s=>`
        <div style="background:${s.bg};border-radius:12px;padding:16px 10px;text-align:center;">
          <div style="font-size:clamp(16px,3vw,24px);font-weight:800;color:${s.color};line-height:1;">${s.value}</div>
          <div style="font-size:11px;color:#6b7280;margin-top:4px;line-height:1.3;">${s.label}</div>
        </div>`).join('')}
    </div>

    <!-- FEATURES -->
    <div style="padding:24px 24px 0;">
      <h2 style="font-size:18px;font-weight:700;color:#111827;margin-bottom:14px;">What you can do</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:14px;">
        ${features.map(f=>`
          <div onclick="AC_STATE.navigate('${f.screen}')" style="
            background:white;border:1px solid #E5E7EB;border-radius:14px;
            padding:20px;cursor:pointer;transition:box-shadow .15s,transform .15s;
          "
          onmouseenter="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.08)';this.style.transform='translateY(-2px)'"
          onmouseleave="this.style.boxShadow='none';this.style.transform='none'">
            <div style="font-size:32px;margin-bottom:10px;">${f.emoji}</div>
            <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:5px;">${f.title}</div>
            <div style="font-size:12px;color:#6B7280;line-height:1.5;">${f.desc}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- CTA FOOTER -->
    <div style="
      background:#F0FDF4;border:1px solid #BBF7D0;border-radius:14px;
      padding:18px 20px;margin:20px 24px 0;
      display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
    ">
      <div>
        <div style="font-weight:700;color:#14532D;font-size:14px;">Ready to buy inputs?</div>
        <div style="font-size:12px;color:#166534;margin-top:2px;">Seeds, fertilizers, chemicals & equipment - all verified</div>
      </div>
      <button onclick="AC_STATE.navigate('input-market')" style="
        background:#1E8B4C;color:white;border:none;padding:10px 20px;
        border-radius:8px;font-weight:700;font-size:13px;font-family:inherit;cursor:pointer;white-space:nowrap;
      ">Browse Now →</button>
    </div>

    <!-- RECENTLY VIEWED -->
    ${(AC_STATE._recentlyViewed || []).length > 0 ? `
    <div style="padding:20px 24px 0;">
      <h2 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:12px;">Recently Viewed</h2>
      <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;">
        ${(AC_STATE._recentlyViewed || []).map(p => `
          <div onclick="AC_STATE.selectedProduct=AC_STATE._productsMap&&AC_STATE._productsMap['${p.id}']||${JSON.stringify(p)};AC_STATE.navigate('input-detail')"
            style="flex-shrink:0;width:130px;background:white;border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;cursor:pointer;">
            <div style="background:#F0FFF4;height:72px;display:flex;align-items:center;justify-content:center;font-size:32px;">${p.emoji || '🌱'}</div>
            <div style="padding:8px 10px;">
              <div style="font-size:12px;font-weight:700;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
              <div style="font-size:12px;font-weight:700;color:#1E8B4C;margin-top:2px;">₦${(p.price||0).toLocaleString()}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  </div>`;
},

/* ─────────────────────────────────────────────
   INPUT MARKET
───────────────────────────────────────────── */
inputMarket() {
  const inputTypes = AC_DATA.inputTypes || [];
  const activeType = AC_STATE.activeInputType || 'all';

  // _productsCache: undefined=not started, null=loading, []=empty, [...]=data
  if (AC_STATE._productsCache === undefined || AC_STATE._productsDirty) {
    AC_STATE._productsDirty = false;
    AC_STATE._productsCache = null; // mark as loading
    const params = {};
    if (activeType && activeType !== 'all') params.inputType = activeType;
    if (AC_STATE.activeSubCat && AC_STATE.activeSubCat !== 'All' && !AC_STATE.activeSubCat.startsWith('All ')) params.subCategory = AC_STATE.activeSubCat;
    if (AC_STATE.activeRegion && AC_STATE.activeRegion !== 'All Regions') params.region = AC_STATE.activeRegion;
    if (AC_STATE.searchQuery) params.search = AC_STATE.searchQuery;

    AC_DL.fetchProducts(params).then(data => {
      AC_STATE._productsCache = data;
      AC_STATE._productsMap = {};
      data.forEach(p => { AC_STATE._productsMap[p.id] = p; });
      if (AC_STATE.currentScreen === 'input-market') AC_ROUTER.show('input-market');
    }).catch(() => {
      AC_STATE._productsCache = undefined; // reset so retry works
      if (AC_STATE.currentScreen === 'input-market') AC_ROUTER.show('input-market');
    });
  }
  const products = AC_STATE._productsCache;

  const bgMap = {
    green:'#F0FFF4', yellow:'#FEFCE8', red:'#FFF1F2',
    brown:'#FEF3C7', blue:'#EFF6FF',   purple:'#F5F3FF',
    orange:'#FFF7ED', pink:'#FFF1F2'
  };

  const verBadge = (v, num) => {
    if (v === 'nasc')    return `<span style="background:#EFF6FF;color:#2563EB;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #BFDBFE;">✓ NASC</span>`;
    if (v === 'nafdac')  return `<span style="background:#EDE9FE;color:#7C3AED;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #DDD6FE;">✓ NAFDAC</span>`;
    if (v === 'supplier')return `<span style="background:#DCFCE7;color:#16A34A;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid #BBF7D0;">✓ Verified</span>`;
    return '';
  };

  return `
  <div style="padding:24px 24px 40px;">

    <!-- TITLE -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap;">
      <div>
        <h1 style="font-size:22px;font-weight:800;color:#111827;margin:0 0 2px;">Input Market</h1>
        <p style="font-size:13px;color:#6B7280;margin:0;">Seeds, fertilizers, crop protection, equipment & more</p>
      </div>
      <button onclick="AC_STATE.navigate('list-produce')" style="
        background:#F0FDF4;color:#1E8B4C;border:1.5px solid #BBF7D0;
        padding:9px 16px;border-radius:8px;font-weight:700;font-size:13px;font-family:inherit;cursor:pointer;white-space:nowrap;
      ">🌱 Sell My Produce</button>
    </div>

    <!-- INPUT TYPE TILES -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
      ${inputTypes.map(t => `
        <button onclick="AC_STATE.activeInputType='${t.id}';AC_STATE.activeSubCat='All';AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')" style="
          display:flex;align-items:center;gap:8px;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;transition:all .15s;white-space:nowrap;
          background:${activeType===t.id ? t.color : 'white'};
          color:${activeType===t.id ? 'white' : '#374151'};
          border:1.5px solid ${activeType===t.id ? t.color : '#E5E7EB'};
        ">${t.emoji} ${t.label}</button>
      `).join('')}
    </div>

    <!-- SUBCATEGORY PILLS (shown when a type is selected) -->
    ${activeType !== 'all' ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      ${(AC_DATA.subCategories[activeType] || []).map(sub => `
        <button onclick="AC_STATE.activeSubCat='${sub}';AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')" style="
          padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;
          background:${AC_STATE.activeSubCat===sub?'#111827':'#F9FAFB'};
          color:${AC_STATE.activeSubCat===sub?'white':'#6B7280'};
          border:1px solid ${AC_STATE.activeSubCat===sub?'#111827':'#E5E7EB'};
        ">${sub}</button>
      `).join('')}
    </div>` : ''}

    <!-- SEARCH + REGION FILTER -->
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;align-items:center;">
      <div style="flex:1;min-width:200px;position:relative;">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#9CA3AF;">🌱</span>
        <input id="im-search" type="text" placeholder="Search inputs, brands, suppliers..."
          value="${AC_STATE.searchQuery || ''}"
          oninput="AC_STATE.searchQuery=this.value;AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')"
          style="width:100%;padding:9px 14px 9px 36px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box;">
      </div>
      <select onchange="AC_STATE.activeRegion=this.value;AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')" style="
        height:38px;padding:0 28px 0 12px;border:1.5px solid #E5E7EB;border-radius:8px;
        font-size:13px;font-family:inherit;background:white;cursor:pointer;appearance:none;
      ">
        ${(AC_DATA.regions||['All Regions']).map(r=>`<option${AC_STATE.activeRegion===r?' selected':''}>${r}</option>`).join('')}
      </select>
      ${(AC_STATE.activeInputType!=='all'||AC_STATE.searchQuery||AC_STATE.activeRegion!=='All Regions') ? `
        <button onclick="AC_STATE.activeInputType='all';AC_STATE.activeSubCat='All';AC_STATE.searchQuery='';AC_STATE.activeRegion='All Regions';AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')" style="
          padding:8px 14px;background:#FEE2E2;color:#DC2626;border:1px solid #FCA5A5;
          border-radius:8px;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;white-space:nowrap;
        ">✕ Clear</button>
      ` : ''}
    </div>

    <!-- RESULTS COUNT (only when loaded) -->
    ${Array.isArray(products) ? `
    <p style="font-size:13px;color:#6B7280;margin-bottom:16px;">
      Showing <strong style="color:#111827;">${products.length}</strong> product${products.length!==1?'s':''}
      ${activeType!=='all'?` in <strong style="color:#1E8B4C;">${inputTypes.find(t=>t.id===activeType)?.label||''}</strong>`:''}
    </p>` : ''}

    <!-- PRODUCT GRID -->
    ${(products === null)
      ? AC_UI.productSkeletons(6)
      : (products === undefined)
        ? AC_UI.error({ message: 'Could not load products', retryFn: "AC_STATE._productsCache=undefined;AC_ROUTER.show('input-market')" })
        : (products.length === 0)
          ? AC_UI.empty({ icon:'🌱', title:'No products found', message:'Try a different category or clear your search', actionLabel:'Show all inputs', actionFn:"AC_STATE.activeInputType='all';AC_STATE.searchQuery='';AC_STATE._productsCache=undefined;AC_STATE.navigate('input-market')" })
          : `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr));gap:16px;">
        ${products.map(p => {
          const bg = bgMap[p.bgColor] || '#F9FAFB';
          const isWish = AC_STATE.isWishlisted(p.id);
          return `
          <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;transition:box-shadow .15s,transform .15s;"
            onmouseenter="this.style.boxShadow='0 4px 20px rgba(0,0,0,0.08)';this.style.transform='translateY(-2px)'"
            onmouseleave="this.style.boxShadow='none';this.style.transform='none'">
            <div onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${p.id}'])||AC_DATA.products.find(x=>x.id==='${p.id}');AC_STATE.navigate('input-detail')"
              style="background:${bg};height:160px;display:flex;align-items:center;justify-content:center;font-size:72px;cursor:pointer;position:relative;">
              ${p.emoji}
              ${!p.inStock?`<div style="position:absolute;top:10px;left:10px;background:rgba(0,0,0,0.55);color:white;font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;">Out of Stock</div>`:''}
              <button onclick="event.stopPropagation();AC_STATE.toggleWishlist('${p.id}');AC_STATE.navigate('input-market')"
                style="position:absolute;bottom:10px;right:10px;width:32px;height:32px;border-radius:50%;background:white;border:none;cursor:pointer;font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                ${isWish?'❤️':'🌱'}
              </button>
            </div>
            <div style="padding:14px 16px 16px;">
              <div style="margin-bottom:6px;">${verBadge(p.verification)}</div>
              <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:3px;cursor:pointer;"
                onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${p.id}'])||AC_DATA.products.find(x=>x.id==='${p.id}');AC_STATE.navigate('input-detail')">${p.name}</div>
              <div style="font-size:12px;color:#6B7280;margin-bottom:2px;">🌱 ${p.region}</div>
              <div style="font-size:12px;color:#6B7280;margin-bottom:10px;">by ${p.supplier}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <div>
                  <span style="font-size:18px;font-weight:800;color:#1E8B4C;">₦${p.price.toLocaleString()}</span>
                  <span style="font-size:12px;color:#9CA3AF;">/${p.unit}</span>
                </div>
                <span style="font-size:12px;color:${p.stock>50?'#16A34A':p.stock>0?'#D97706':'#EF4444'};">
                  ${p.stock>50?p.stock+' in stock':p.stock>0?'Only '+p.stock+' left':'Out of stock'}
                </span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <button onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${p.id}'])||AC_DATA.products.find(x=>x.id==='${p.id}');AC_STATE.navigate('input-detail')" style="
                  padding:9px 0;background:transparent;color:#1E8B4C;border:1.5px solid #1E8B4C;
                  border-radius:8px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">Details</button>
                <button onclick="${p.inStock?`AC_STATE.addToCart('${p.id}',1)`:`showToast('Out of stock','error')`}" style="
                  padding:9px 0;background:${p.inStock?'#1E8B4C':'#E5E7EB'};color:${p.inStock?'white':'#9CA3AF'};border:none;
                  border-radius:8px;font-size:13px;font-weight:700;font-family:inherit;cursor:${p.inStock?'pointer':'not-allowed'};">Add to Cart</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>`}
  </div>`;
},

initInputMarket() {
  // Mark dirty so next filter change triggers a fresh API fetch
  AC_STATE._productsDirty = false;
},

/* ─────────────────────────────────────────────
   INPUT DETAIL
───────────────────────────────────────────── */
inputDetail() {
  const p = AC_STATE.selectedProduct || AC_DATA.products[0];
  if (!p) return `<div style="padding:40px;text-align:center;"><p>Product not found.</p></div>`;

  /* Track this view for "Recently Viewed" section on home */
  if (AC_SCREENS._trackRecentlyViewed) AC_SCREENS._trackRecentlyViewed(p);

  // Reviews sub-cache keyed by product id
  if (!AC_STATE._reviewsCache) AC_STATE._reviewsCache = {};
  if (AC_STATE._reviewsCache[p.id] === undefined) {
    AC_STATE._reviewsCache[p.id] = null;
    AC_API.products.reviews(p.id).then(res => {
      AC_STATE._reviewsCache[p.id] = res;
      if (AC_STATE.currentScreen === 'input-detail') AC_ROUTER.show('input-detail');
    }).catch(() => {
      AC_STATE._reviewsCache[p.id] = { data: [], meta: { total: 0 } };
      if (AC_STATE.currentScreen === 'input-detail') AC_ROUTER.show('input-detail');
    });
  }
  const revData = AC_STATE._reviewsCache[p.id];

  const bgMap = { green:'#F0FFF4', yellow:'#FEFCE8', red:'#FFF1F2', brown:'#FEF3C7', blue:'#EFF6FF', purple:'#F5F3FF', orange:'#FFF7ED', pink:'#FFF1F2' };
  const bg = bgMap[p.bgColor] || '#F9FAFB';
  const isWish = AC_STATE.isWishlisted(p.id);

  const verBadge = () => {
    if (p.verification === 'nasc')    return `<span style="background:#EFF6FF;color:#2563EB;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid #BFDBFE;">✓ NASC Certified - ${p.verificationNumber||''}</span>`;
    if (p.verification === 'nafdac')  return `<span style="background:#EDE9FE;color:#7C3AED;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid #DDD6FE;">✓ NAFDAC Registered - ${p.verificationNumber||''}</span>`;
    if (p.verification === 'supplier')return `<span style="background:#DCFCE7;color:#16A34A;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid #BBF7D0;">✓ Verified Supplier</span>`;
    return '';
  };

  const related = (AC_DATA.products||[]).filter(x => x.inputType === p.inputType && x.id !== p.id).slice(0, 4);

  return `
  <div style="max-width:800px;margin:0 auto;padding:24px 24px 48px;">

    <!-- BACK -->
    <button onclick="AC_STATE.navigate('input-market')" style="
      background:none;border:none;color:#1E8B4C;font-weight:600;font-size:14px;
      cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;display:flex;align-items:center;gap:4px;
    ">← Back to Market</button>

    <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:24px;margin-bottom:28px;" class="detail-split">

      <!-- IMAGE + THUMBNAILS -->
      <div>
        <div style="background:${bg};border-radius:16px;height:280px;display:flex;align-items:center;justify-content:center;font-size:110px;margin-bottom:12px;">
          ${p.emoji}
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
          ${[0,1,2,3].map(i=>`
            <div style="aspect-ratio:1;background:${bg};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;border:2px solid ${i===0?'#1E8B4C':'#E5E7EB'};">${p.emoji}</div>
          `).join('')}
        </div>
      </div>

      <!-- DETAILS -->
      <div>
        <!-- BADGES -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <span style="background:#F3F4F6;color:#374151;font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px;">${p.subCategory}</span>
          <span style="background:${p.inStock?'#DCFCE7':'#FEE2E2'};color:${p.inStock?'#16A34A':'#DC2626'};font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;">${p.inStock?'In Stock':'Out of Stock'}</span>
        </div>

        <h1 style="font-size:20px;font-weight:800;color:#111827;margin-bottom:8px;line-height:1.3;">${p.fullName||p.name}</h1>

        <!-- VERIFICATION -->
        <div style="margin-bottom:10px;">${verBadge()}</div>

        <!-- RATING -->
        ${p.rating ? `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
          <span style="color:#F59E0B;font-size:14px;">★</span>
          <span style="font-size:14px;font-weight:700;color:#111827;">${p.rating}</span>
          <span style="font-size:13px;color:#9CA3AF;">(${p.reviews} reviews)</span>
        </div>` : ''}

        <!-- SUPPLIER -->
        <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;background:#DCFCE7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🌱</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#111827;">${p.supplier}</div>
            <div style="font-size:12px;color:#16A34A;font-weight:600;">✓ Verified Agro-Supplier</div>
          </div>
        </div>

        <!-- PRICE -->
        <div style="background:#F0FDF4;border-radius:10px;padding:14px 18px;margin-bottom:16px;">
          <div style="font-size:12px;color:#6B7280;margin-bottom:4px;">Price per ${p.unit}</div>
          <div style="font-size:30px;font-weight:800;color:#1E8B4C;letter-spacing:-1px;">₦${p.price.toLocaleString()}<span style="font-size:14px;color:#9CA3AF;font-weight:400;"> /${p.unit}</span></div>
          ${p.minOrder>1?`<div style="font-size:12px;color:#D97706;margin-top:4px;">Min. order: ${p.minOrder} ${p.unit}</div>`:''}
        </div>

        <!-- SPECS GRID -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
          ${[
            ['Region', p.region],
            ['In Stock', p.stock + ' ' + p.unit + (p.stock!==1?'s':'')],
            p.germination ? ['Germination', p.germination] : null,
            p.purity      ? ['Seed Purity',  p.purity]     : null,
          ].filter(Boolean).map(([k,v])=>`
            <div style="background:#F9FAFB;border-radius:8px;padding:10px 12px;">
              <div style="font-size:11px;color:#9CA3AF;margin-bottom:2px;">${k}</div>
              <div style="font-size:13px;font-weight:700;color:#111827;">${v}</div>
            </div>
          `).join('')}
        </div>

        <!-- QTY SELECTOR -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <span style="font-size:13px;font-weight:600;color:#374151;">Qty (${p.unit}):</span>
          <div style="display:flex;align-items:center;border:1.5px solid #E5E7EB;border-radius:8px;overflow:hidden;">
            <button onclick="const v=document.getElementById('d-qty');if(parseInt(v.value)>${p.minOrder||1})v.value=parseInt(v.value)-1" style="width:36px;height:36px;border:none;background:white;font-size:18px;cursor:pointer;color:#374151;">−</button>
            <input id="d-qty" type="number" value="${p.minOrder||1}" min="${p.minOrder||1}" max="${p.stock}" style="width:52px;height:36px;border:none;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;text-align:center;font-size:14px;font-weight:700;">
            <button onclick="const v=document.getElementById('d-qty');if(parseInt(v.value)<${p.stock})v.value=parseInt(v.value)+1" style="width:36px;height:36px;border:none;background:white;font-size:18px;cursor:pointer;color:#374151;">+</button>
          </div>
        </div>

        <!-- CTAs -->
        <div style="display:flex;gap:10px;margin-bottom:12px;">
          <button onclick="const q=parseInt(document.getElementById('d-qty').value)||1;AC_STATE.addToCart('${p.id}',q)" style="
            flex:1;padding:13px;background:#1E8B4C;color:white;border:none;border-radius:10px;
            font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;
          ">🌱 Add to Cart</button>
          <button onclick="const q=parseInt(document.getElementById('d-qty').value)||1;AC_STATE.addToCart('${p.id}',q);AC_STATE.navigate('checkout')" style="
            flex:1;padding:13px;background:white;color:#1E8B4C;border:2px solid #1E8B4C;border-radius:10px;
            font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;
          ">Buy Now</button>
          <button onclick="AC_STATE.toggleWishlist('${p.id}');AC_STATE.navigate('input-detail')" style="
            width:46px;height:46px;border-radius:10px;background:white;border:1.5px solid #E5E7EB;
            font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;
          ">${isWish?'❤️':'🌱'}</button>
        </div>
      </div>
    </div>

    <!-- DESCRIPTION + FEATURES -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:20px;">
      <h3 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:10px;">Product Description</h3>
      <p style="font-size:14px;color:#374151;line-height:1.7;margin-bottom:16px;">${p.description||''}</p>
      ${p.features&&p.features.length?`
        <h4 style="font-size:14px;font-weight:700;color:#111827;margin-bottom:10px;">Key Features</h4>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${p.features.map(f=>`
            <div style="display:flex;gap:8px;align-items:flex-start;">
              <span style="color:#1E8B4C;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
              <span style="font-size:14px;color:#374151;">${f}</span>
            </div>`).join('')}
        </div>
      `:''}
    </div>

    <!-- REVIEWS -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <h3 style="font-size:16px;font-weight:700;color:#111827;">Customer Reviews ${p.reviewCount ? `<span style="font-size:13px;font-weight:400;color:#9CA3AF;">(${p.reviewCount})</span>` : ''}</h3>
        ${p.rating ? `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#F59E0B;font-size:18px;">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5-Math.round(p.rating))}</span><span style="font-size:14px;font-weight:700;color:#111827;margin-left:4px;">${p.rating.toFixed(1)}</span></div>` : ''}
      </div>

      ${revData === null
        ? `<div style="display:flex;flex-direction:column;gap:12px;">${[1,2].map(()=>`<div style="height:64px;background:#F3F4F6;border-radius:8px;animation:pulse 1.5s infinite;"></div>`).join('')}</div>`
        : revData.data.length === 0
          ? `<p style="font-size:14px;color:#9CA3AF;text-align:center;padding:16px 0;">No reviews yet. Be the first to review this product.</p>`
          : `<div style="display:flex;flex-direction:column;gap:14px;margin-bottom:16px;">
              ${revData.data.map(r => `
                <div style="border-bottom:1px solid #F3F4F6;padding-bottom:14px;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <div style="width:32px;height:32px;border-radius:50%;background:#DCFCE7;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#16A34A;flex-shrink:0;">${(r.user?.name||'?')[0]}</div>
                    <div>
                      <div style="font-size:13px;font-weight:700;color:#111827;">${r.user?.name||'Farmer'}</div>
                      <div style="color:#F59E0B;font-size:12px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
                    </div>
                    <span style="margin-left:auto;font-size:11px;color:#9CA3AF;">${new Date(r.createdAt).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})}</span>
                  </div>
                  ${r.comment ? `<p style="font-size:13px;color:#374151;margin:0;line-height:1.6;">${r.comment}</p>` : ''}
                </div>
              `).join('')}
            </div>`
      }

      <!-- WRITE A REVIEW -->
      <div style="border-top:1px solid #F3F4F6;padding-top:16px;margin-top:4px;">
        <h4 style="font-size:14px;font-weight:700;color:#111827;margin-bottom:10px;">Write a Review</h4>
        <div style="display:flex;gap:6px;margin-bottom:10px;" id="star-row-${p.id}">
          ${[1,2,3,4,5].map(n=>`<button onclick="AC_SCREENS._setReviewStar('${p.id}',${n})" style="font-size:26px;background:none;border:none;cursor:pointer;padding:0;line-height:1;" data-star="${n}">☆</button>`).join('')}
        </div>
        <textarea id="rv-comment-${p.id}" rows="3" placeholder="Share your experience with this product (optional)..."
          style="width:100%;padding:10px 12px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box;resize:vertical;margin-bottom:10px;"></textarea>
        <button onclick="AC_SCREENS.submitProductReview('${p.id}')"
          style="padding:10px 22px;background:#1E8B4C;color:white;border:none;border-radius:8px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;">
          Submit Review
        </button>
      </div>
    </div>

    <!-- RELATED PRODUCTS -->
    ${related.length?`
      <div>
        <h3 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:14px;">Related Products</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;">
          ${related.map(r=>{
            const rbg = bgMap[r.bgColor]||'#F9FAFB';
            return `
            <div onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${r.id}'])||AC_DATA.products.find(x=>x.id==='${r.id}');AC_STATE.navigate('input-detail')" style="
              background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;cursor:pointer;
              transition:box-shadow .15s;" onmouseenter="this.style.boxShadow='0 2px 12px rgba(0,0,0,0.07)'" onmouseleave="this.style.boxShadow='none'">
              <div style="background:${rbg};height:90px;display:flex;align-items:center;justify-content:center;font-size:40px;">${r.emoji}</div>
              <div style="padding:10px 12px;">
                <div style="font-size:12px;font-weight:700;color:#111827;margin-bottom:3px;line-height:1.3;">${r.name}</div>
                <div style="font-size:13px;font-weight:800;color:#1E8B4C;">₦${r.price.toLocaleString()}<span style="font-size:10px;color:#9CA3AF;">/${r.unit}</span></div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `:''}
  </div>
  <style>@media(max-width:640px){.detail-split{grid-template-columns:1fr!important}}</style>`;
},

/* ─────────────────────────────────────────────
   CART
───────────────────────────────────────────── */
cart() {
  const cartItems = AC_STATE.cart || [];
  const products  = AC_DATA.products || [];

  if (!cartItems.length) {
    return `
    <div style="padding:60px 24px;text-align:center;">
      <div style="font-size:72px;margin-bottom:16px;">🌱</div>
      <h2 style="font-size:20px;font-weight:700;color:#111827;margin:0 0 8px;">Your cart is empty</h2>
      <p style="color:#6B7280;font-size:14px;margin:0 0 24px;">Browse the Input Market and add products</p>
      <button onclick="AC_STATE.navigate('input-market')" style="
        background:#1E8B4C;color:white;border:none;padding:12px 28px;
        border-radius:10px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;
      ">Browse Inputs</button>
    </div>`;
  }

  let subtotal = 0;
  const rows = cartItems.map(item => {
    const prod = products.find(p => p.id === item.id);
    if (!prod) return '';
    const lineTotal = prod.price * item.qty;
    subtotal += lineTotal;
    return `
    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:16px;display:flex;gap:14px;align-items:center;">
      <div style="font-size:40px;flex-shrink:0;">${prod.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${prod.name}</div>
        <div style="font-size:12px;color:#6B7280;">₦${prod.price.toLocaleString()}/${prod.unit} - ${prod.supplier}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
          <button onclick="AC_STATE.updateQty('${prod.id}',${item.qty-1});if(${item.qty-1}<=0){AC_STATE.removeFromCart('${prod.id}')};AC_STATE.navigate('cart')" style="width:28px;height:28px;border:1px solid #E5E7EB;border-radius:6px;background:white;cursor:pointer;font-size:16px;">−</button>
          <span style="font-size:14px;font-weight:700;min-width:24px;text-align:center;">${item.qty}</span>
          <button onclick="AC_STATE.updateQty('${prod.id}',${item.qty+1});AC_STATE.navigate('cart')" style="width:28px;height:28px;border:1px solid #E5E7EB;border-radius:6px;background:white;cursor:pointer;font-size:16px;">+</button>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:15px;font-weight:800;color:#1E8B4C;">₦${lineTotal.toLocaleString()}</div>
        <button onclick="AC_STATE.removeFromCart('${prod.id}');AC_STATE.navigate('cart')" style="background:none;border:none;color:#EF4444;font-size:12px;cursor:pointer;margin-top:6px;font-family:inherit;">Remove</button>
      </div>
    </div>`;
  }).join('');

  const delivery = 2500;
  const total = subtotal + delivery;

  return `
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 20px;">🌱 Cart (${cartItems.length} item${cartItems.length!==1?'s':''})</h1>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">${rows}</div>
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;margin:0 0 14px;">Order Summary</h3>
      ${[['Subtotal',subtotal],['Delivery','₦2,500'],['Total',total]].map(([l,v],i)=>`
        <div style="display:flex;justify-content:space-between;${i===2?'border-top:1px solid #E5E7EB;padding-top:12px;margin-top:12px;font-weight:800;font-size:16px;':'margin-bottom:8px;font-size:14px;color:#374151;'}">
          <span>${l}</span>
          <span style="${i===2?'color:#1E8B4C;':''}">${typeof v==='number'?'₦'+v.toLocaleString():v}</span>
        </div>`).join('')}
    </div>
    <button onclick="AC_STATE.navigate('checkout')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;">Proceed to Checkout →</button>
    <button onclick="AC_STATE.navigate('input-market')" style="width:100%;padding:12px;background:white;color:#374151;border:1px solid #E5E7EB;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;margin-top:10px;">Continue Shopping</button>
  </div>`;
},

initCart() {},

/* ─────────────────────────────────────────────
   CHECKOUT
───────────────────────────────────────────── */
checkout() {
  let subtotal = 0;
  (AC_STATE.cart||[]).forEach(item => {
    const p = (AC_DATA.products||[]).find(x=>x.id===item.id);
    if (p) subtotal += p.price * item.qty;
  });
  const delivery = 2500;
  const total = subtotal + delivery;

  return `
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <button onclick="AC_STATE.navigate('cart')" style="background:none;border:none;color:#1E8B4C;font-weight:600;font-size:14px;cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;">← Back to Cart</button>
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 24px;">Checkout</h1>

    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 14px;">🌱 Delivery Information</h3>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input id="co-name" type="text" placeholder="Full Name" style="padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;" value="${AC_STATE.user?.name||''}">
        <input id="co-phone" type="tel" placeholder="Phone Number" style="padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;" value="${AC_STATE.user?.phone||''}">
        <input id="co-address" type="text" placeholder="Delivery Address" style="padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <select id="co-state" style="padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;background:white;">
            <option value="">Select State</option>
            ${['Lagos','Kano','Kaduna','Abuja FCT','Rivers','Oyo','Katsina','Ogun','Kebbi','Sokoto'].map(s=>`<option>${s}</option>`).join('')}
          </select>
          <input id="co-city" type="text" placeholder="City / LGA" style="padding:10px 14px;border:1px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;">
        </div>
      </div>
    </div>

    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:16px;">
      <h3 style="font-size:14px;font-weight:700;color:#111827;margin:0 0 14px;">🌱 Payment Method</h3>
      ${[
        ['wallet','🌱 AgroConnect Wallet','Personal balance + Agric Credit',true],
        ['card','🌱 Debit / Credit Card','Visa, Mastercard',false],
        ['transfer','🌱 Bank Transfer','Direct bank transfer',false],
      ].map(([id,label,sub,checked])=>`
        <label style="display:flex;align-items:center;gap:12px;padding:12px;border:1.5px solid ${checked?'#1E8B4C':'#E5E7EB'};border-radius:10px;cursor:pointer;margin-bottom:8px;background:${checked?'#F0FDF4':'white'};">
          <input type="radio" name="pay-method" value="${id}" ${checked?'checked':''} style="accent-color:#1E8B4C;">
          <div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${label}</div>
            <div style="font-size:12px;color:#6B7280;">${sub}</div>
          </div>
        </label>`).join('')}
    </div>

    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:16px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;font-size:14px;color:#374151;margin-bottom:6px;"><span>Subtotal</span><span>₦${subtotal.toLocaleString()}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:14px;color:#374151;margin-bottom:10px;"><span>Delivery</span><span>₦${delivery.toLocaleString()}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:#14532D;border-top:1px solid #BBF7D0;padding-top:10px;"><span>Total</span><span>₦${total.toLocaleString()}</span></div>
    </div>

    <button onclick="AC_SCREENS.placeOrder()" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;">Place Order - ₦${total.toLocaleString()}</button>
  </div>`;
},

async placeOrder() {
  const btn = document.querySelector('[onclick="AC_SCREENS.placeOrder()"]');
  function setLoading(on) {
    if (!btn) return;
    btn.disabled    = on;
    btn.style.opacity = on ? '0.65' : '1';
    btn.textContent = on ? 'Processing…' : `Place Order`;
  }

  const deliveryName    = document.getElementById('co-name')?.value?.trim()    || AC_STATE.user.name;
  const deliveryPhone   = document.getElementById('co-phone')?.value?.trim()   || AC_STATE.user.phone;
  const deliveryAddress = document.getElementById('co-address')?.value?.trim() || '';
  const deliveryState   = document.getElementById('co-state')?.value           || '';
  const deliveryCity    = document.getElementById('co-city')?.value?.trim()    || '';
  const paymentMethod   = document.querySelector('input[name="pay-method"]:checked')?.value || 'agric-credit';

  if (!deliveryAddress) { showToast('Please enter a delivery address', 'error'); return; }
  if (!deliveryState)   { showToast('Please select a state', 'error');           return; }

  setLoading(true);
  showToast('Preparing your order…', '');

  try {
    const items = AC_STATE.cart.map(item => ({ productId: item.id, qty: item.qty }));
    const payload = { items, deliveryName, deliveryPhone, deliveryAddress, deliveryState, deliveryCity, paymentMethod };

    /* ── Mock mode (no API_BASE_URL configured) ── */
    if (!window.AC_CONFIG?.API_BASE_URL) {
      await new Promise(r => setTimeout(r, 900));
      AC_STATE._lastOrder = { id: 'MOCK-' + Date.now(), orderNumber: 'ORD-MOCK-' + Date.now(), status: 'processing', totalAmount: AC_STATE.getCartTotal() + 2500 };
      AC_STATE.clearCart();
      setLoading(false);
      AC_STATE.navigate('order-confirm');
      return;
    }

    /* ── Real API ── */
    const { data } = await AC_API.payments.initialize(payload);

    if (!data.requiresPaystack) {
      /* Wallet/agric-credit payment: confirmed immediately */
      AC_STATE._lastOrder = data.order;
      AC_STATE.clearCart();
      setLoading(false);
      AC_STATE.navigate('order-confirm');
      return;
    }

    /* Card/transfer: open Paystack popup */
    setLoading(false);
    AC_PAY.openPopup({
      email:      AC_STATE.user.email,
      amount:     data.order.totalAmount,
      accessCode: data.accessCode,
      reference:  data.reference,
      onSuccess: async (reference) => {
        showToast('Verifying payment…', '');
        try {
          const verified = await AC_API.payments.verify(reference);
          AC_STATE._lastOrder = verified.data;
          AC_STATE.clearCart();
          AC_STATE.navigate('order-confirm');
        } catch {
          showToast('Payment received but verification failed. Contact support.', 'error');
        }
      },
      onClose: () => {
        showToast('Payment cancelled. Your order is still pending.', 'error');
      },
    });

  } catch (err) {
    setLoading(false);
    showToast(err?.data?.error ?? err?.message ?? 'Order failed — please try again', 'error');
  }
},

/* ─────────────────────────────────────────────
   PAYMENT — handled by Paystack popup now
   This screen is retained as a fallback/redirect
───────────────────────────────────────────── */
payment() {
  // Route directly back to checkout — card payments go through Paystack popup
  AC_STATE.navigate('checkout');
  return '';
},

/* ─────────────────────────────────────────────
   ORDER CONFIRMED
───────────────────────────────────────────── */
orderConfirm() {
  const order   = AC_STATE._lastOrder || {};
  const orderId = order.orderNumber || order.id || ('AGR-' + new Date().getFullYear() + '-' + String(Math.floor(100000 + Math.random() * 900000)));
  return `
  <div style="max-width:480px;margin:0 auto;padding:60px 24px;text-align:center;">
    <div style="width:100px;height:100px;background:#F0FDF4;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:52px;margin:0 auto 24px;border:3px solid #BBF7D0;">✅</div>
    <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 8px;">Order Confirmed!</h1>
    <p style="color:#6B7280;font-size:14px;margin:0 0 6px;">Your inputs are on their way</p>
    <p style="color:#1E8B4C;font-weight:700;font-size:14px;margin:0 0 32px;">Order ID: ${orderId}</p>
    <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:24px;text-align:left;">
      ${[
        ['🌱','Estimated Delivery','3-5 business days'],
        ['🌱','Tracking','Sent via SMS & email'],
        ['🌱','Pickup Option','Collect at nearest Agro Hub'],
      ].map(([icon,label,val])=>`
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
          <span style="font-size:20px;">${icon}</span>
          <div>
            <div style="font-size:12px;color:#6B7280;">${label}</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${val}</div>
          </div>
        </div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <button onclick="AC_STATE.navigate('order-history')" style="width:100%;padding:14px;background:#1E8B4C;color:white;border:none;border-radius:10px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;">Track My Order</button>
      <button onclick="AC_STATE.navigate('input-market')" style="width:100%;padding:12px;background:white;color:#374151;border:1px solid #E5E7EB;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;">Continue Shopping</button>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   ORDER HISTORY
───────────────────────────────────────────── */
orderHistory() {
  // undefined=not started, null=loading, []=empty, [...]=data
  if (AC_STATE._ordersCache === undefined) {
    AC_STATE._ordersCache = null;
    AC_DL.fetchOrders().then(data => {
      AC_STATE._ordersCache = data;
      if (AC_STATE.currentScreen === 'order-history') AC_ROUTER.show('order-history');
    }).catch(() => {
      AC_STATE._ordersCache = undefined;
      if (AC_STATE.currentScreen === 'order-history') AC_ROUTER.show('order-history');
    });
  }
  const orders = AC_STATE._ordersCache;
  const statusColor = { 'in_transit':'#2563EB','in-transit':'#2563EB','delivered':'#16A34A','processing':'#D97706','pending':'#D97706','cancelled':'#EF4444' };
  return `
  <div style="padding:24px;">
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 20px;">🌱 My Orders</h1>
    ${(orders === null)
      ? AC_UI.listSkeletons(4)
      : (orders === undefined)
        ? AC_UI.error({ message: 'Could not load orders', retryFn: "AC_STATE._ordersCache=undefined;AC_ROUTER.show('order-history')" })
        : !orders.length
          ? AC_UI.empty({ icon:'📦', title:'No orders yet', message:'Your orders will appear here after your first purchase', actionLabel:'Browse inputs', actionFn:"AC_STATE.navigate('input-market')" })
          : `<div style="display:flex;flex-direction:column;gap:12px;">
        ${orders.map(o=>{
          const sc = statusColor[o.status]||'#6B7280';
          const total = o.total || o.items.reduce((s,i)=>s+i.price*i.qty,0);
          return `
          <div onclick="AC_STATE.selectedOrder='${o.id}';AC_STATE.navigate('order-detail')" style="
            background:white;border:1px solid #E5E7EB;border-radius:12px;padding:16px;cursor:pointer;transition:box-shadow .15s;"
            onmouseenter="this.style.boxShadow='0 2px 12px rgba(0,0,0,0.07)'" onmouseleave="this.style.boxShadow='none'">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
              <div style="font-size:14px;font-weight:700;color:#111827;">${o.id}</div>
              <span style="background:${sc}18;color:${sc};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${AC_STATE.getStatusLabel(o.status)}</span>
            </div>
            <div style="font-size:13px;color:#6B7280;margin-bottom:6px;">${o.date}</div>
            <div style="display:flex;gap:6px;margin-bottom:10px;">
              ${o.items.slice(0,3).map(i=>`<span style="font-size:20px;">${i.emoji}</span>`).join('')}
              ${o.items.length>3?`<span style="font-size:12px;color:#6B7280;align-self:center;">+${o.items.length-3} more</span>`:''}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:15px;font-weight:800;color:#1E8B4C;">₦${total.toLocaleString()}</div>
              <span style="font-size:12px;color:#6B7280;">View Details →</span>
            </div>
          </div>`;
        }).join('')}
      </div>`}
  </div>`;
},

/* ─────────────────────────────────────────────
   ORDER DETAIL
───────────────────────────────────────────── */
orderDetail() {
  const orderId = AC_STATE.selectedOrder;
  const orders  = AC_STATE._ordersCache || AC_DATA.orders || [];
  let order     = orders.find(o => o.id === orderId);
  if (!order && orderId) {
    AC_DL.fetchOrder(orderId).then(data => {
      if (data) {
        AC_STATE._lastOrder = data;
        if (AC_STATE.currentScreen === 'order-detail') AC_ROUTER.show('order-detail');
      }
    });
    order = AC_STATE._lastOrder || null;
  }
  if (!order) return `<div style="padding:40px;text-align:center;color:#6B7280;">Loading order...</div>`;

  /* Fetch live tracking if shipped and not yet cached */
  if (!AC_STATE._trackingCache) AC_STATE._trackingCache = {};
  if ((order.status === 'shipped' || order.status === 'in_transit') &&
      AC_STATE._trackingCache[orderId] === undefined) {
    AC_STATE._trackingCache[orderId] = null;
    AC_API.orders.tracking(orderId).then(res => {
      AC_STATE._trackingCache[orderId] = res.data || null;
      if (AC_STATE.currentScreen === 'order-detail') AC_ROUTER.show('order-detail');
    }).catch(() => {
      AC_STATE._trackingCache[orderId] = null;
    });
  }
  const tracking = AC_STATE._trackingCache?.[orderId];

  const steps = [
    { label:'Order Placed',   done:true  },
    { label:'Processing',     done:true  },
    { label:'Shipped',        done:order.status==='shipped'||order.status==='in-transit'||order.status==='delivered' },
    { label:'Delivered',      done:order.status==='delivered' },
  ];

  return `
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <button onclick="AC_STATE.navigate('order-history')" style="background:none;border:none;color:#1E8B4C;font-weight:600;font-size:14px;cursor:pointer;padding:0;margin-bottom:20px;font-family:inherit;">← Back to Orders</button>
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 20px;">Order ${order.id}</h1>

    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:14px;">
      <h3 style="font-size:14px;font-weight:700;margin:0 0 16px;">Tracking</h3>
      ${steps.map((s,i)=>`
        <div style="display:flex;gap:12px;align-items:flex-start;${i<steps.length-1?'margin-bottom:12px':''}">
          <div style="width:22px;height:22px;border-radius:50%;background:${s.done?'#1E8B4C':'#E5E7EB'};flex-shrink:0;display:flex;align-items:center;justify-content:center;">
            ${s.done?'<span style="color:white;font-size:11px;font-weight:800;">✓</span>':''}
          </div>
          <div style="font-size:13px;font-weight:${s.done?'700':'400'};color:${s.done?'#111827':'#9CA3AF'};">${s.label}</div>
        </div>`).join('')}
    </div>

    ${tracking ? `
    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:14px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <h3 style="font-size:14px;font-weight:700;margin:0;">Live Tracking — ${tracking.carrier}</h3>
        <span style="font-size:11px;font-weight:700;color:#2563EB;background:#DBEAFE;padding:3px 10px;border-radius:20px;">${tracking.trackingCode}</span>
      </div>
      ${tracking.estimatedDate ? `<div style="font-size:12px;color:#16A34A;font-weight:600;margin-bottom:12px;">Est. delivery: ${new Date(tracking.estimatedDate).toLocaleDateString('en-NG',{weekday:'short',day:'numeric',month:'long'})}</div>` : ''}
      <div style="display:flex;flex-direction:column;gap:0;">
        ${(tracking.events||[]).slice().reverse().map((ev,i,arr) => `
          <div style="display:flex;gap:12px;${i<arr.length-1?'margin-bottom:12px':''}">
            <div style="display:flex;flex-direction:column;align-items:center;">
              <div style="width:10px;height:10px;border-radius:50%;background:${i===0?'#1E8B4C':'#D1D5DB'};flex-shrink:0;margin-top:3px;"></div>
              ${i<arr.length-1?`<div style="width:2px;flex:1;background:#E5E7EB;margin:4px 0;"></div>`:''}
            </div>
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:700;color:#111827;">${ev.description}</div>
              <div style="font-size:11px;color:#9CA3AF;margin-top:1px;">${ev.location} · ${new Date(ev.timestamp).toLocaleString('en-NG',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:14px;">
      <h3 style="font-size:14px;font-weight:700;margin:0 0 14px;">Items Ordered</h3>
      ${order.items.map(i=>`
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
          <div style="font-size:36px;">${i.emoji}</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:#111827;">${i.name}</div>
            <div style="font-size:13px;color:#6B7280;">${i.qty} ${i.unit||'unit'}${i.qty!==1?'s':''} - ₦${i.price.toLocaleString()}</div>
          </div>
          <div style="font-size:15px;font-weight:800;color:#1E8B4C;">₦${(i.qty*i.price).toLocaleString()}</div>
        </div>`).join('')}
    </div>

    ${order.deliveryAddress?`
    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:20px;margin-bottom:14px;">
      <h3 style="font-size:14px;font-weight:700;margin:0 0 10px;">Delivery Details</h3>
      <div style="font-size:14px;color:#374151;line-height:1.7;">
        <div><strong>Address:</strong> ${order.deliveryAddress}</div>
        ${order.trackingCode?`<div><strong>Tracking:</strong> ${order.trackingCode}</div>`:''}
      </div>
    </div>`:''}

    <!-- MESSAGE SUPPLIER -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;padding:16px 20px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
      <div>
        <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:2px;">Have a question?</div>
        <div style="font-size:12px;color:#9CA3AF;">Message the supplier about this order</div>
      </div>
      <button onclick="AC_STATE.selectedMessageOrder={id:'${order.id}',orderNumber:'${order.orderNumber||order.id}'};AC_STATE.navigate('order-messages')"
        style="padding:9px 18px;background:#1E8B4C;color:white;border:none;border-radius:20px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;flex-shrink:0;">
        💬 Message Supplier
      </button>
    </div>

    ${order.status === 'delivered' ? `
    <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:20px;">
      <h3 style="font-size:14px;font-weight:700;color:#15803D;margin:0 0 12px;">Rate your purchase</h3>
      <p style="font-size:13px;color:#16A34A;margin:0 0 14px;">Your feedback helps other farmers make better decisions.</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${order.items.map(item => `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div style="font-size:13px;font-weight:600;color:#111827;">${item.name}</div>
            <button onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${item.productId||item.id}'])||{id:'${item.productId||item.id}',name:'${item.name}',reviewCount:0,rating:0};AC_STATE.navigate('input-detail')"
              style="padding:6px 14px;background:#16A34A;color:white;border:none;border-radius:6px;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;">
              ★ Rate
            </button>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  </div>`;
},

async submitProduce() {
  const produceType  = document.getElementById('pr-type')?.value;
  const quantity     = parseFloat(document.getElementById('pr-qty')?.value);
  const unit         = document.getElementById('pr-unit')?.value;
  const pricePerUnit = parseFloat(document.getElementById('pr-price')?.value);
  const harvestDate  = document.getElementById('pr-harvest')?.value;
  const location     = document.getElementById('pr-location')?.value?.trim();
  const notes        = document.getElementById('pr-notes')?.value?.trim();

  if (!produceType)          { showToast('Please select a produce type', 'error'); return; }
  if (!quantity || quantity <= 0) { showToast('Please enter a valid quantity', 'error'); return; }
  if (!pricePerUnit || pricePerUnit <= 0) { showToast('Please enter a valid price', 'error'); return; }
  if (!location)             { showToast('Please enter your location', 'error'); return; }

  const btn = document.getElementById('pr-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting…'; btn.style.opacity = '0.65'; }

  try {
    if (!window.AC_CONFIG?.API_BASE_URL) {
      await new Promise(r => setTimeout(r, 800));
      showToast('Produce listing submitted! Buyers will contact you shortly.', 'success');
      setTimeout(() => AC_STATE.navigate('home'), 800);
      return;
    }
    await AC_API.produce.create({ produceType, quantity, unit, pricePerUnit, harvestDate: harvestDate || undefined, location, notes });
    showToast('Produce listing submitted! Buyers will contact you shortly.', 'success');
    setTimeout(() => AC_STATE.navigate('home'), 800);
  } catch (err) {
    showToast(err?.data?.error ?? err?.message ?? 'Submission failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Listing'; btn.style.opacity = '1'; }
  }
},

/* ─────────────────────────────────────────────
   WISHLIST
───────────────────────────────────────────── */
wishlist() {
  const wishIds  = AC_STATE.wishlist.map(w => w.id || w);
  const products = (AC_DATA.products||[]).filter(p => wishIds.includes(p.id));
  const bgMap = { green:'#F0FFF4', yellow:'#FEFCE8', red:'#FFF1F2', brown:'#FEF3C7', blue:'#EFF6FF', purple:'#F5F3FF' };

  if (!products.length) {
    return `
    <div style="padding:60px 24px;text-align:center;">
      <div style="font-size:64px;margin-bottom:16px;">🌱</div>
      <h2 style="font-size:20px;font-weight:700;color:#111827;margin:0 0 8px;">No saved items</h2>
      <p style="color:#6B7280;font-size:14px;margin:0 0 24px;">Tap the heart icon on any product to save it here</p>
      <button onclick="AC_STATE.navigate('input-market')" style="background:#1E8B4C;color:white;border:none;padding:12px 28px;border-radius:10px;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;">Browse Inputs</button>
    </div>`;
  }

  return `
  <div style="padding:24px;">
    <h1 style="font-size:20px;font-weight:800;color:#111827;margin:0 0 20px;">❤️ Wishlist (${products.length})</h1>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:14px;">
      ${products.map(p=>{
        const bg = bgMap[p.bgColor]||'#F9FAFB';
        return `
        <div style="background:white;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
          <div style="background:${bg};height:120px;display:flex;align-items:center;justify-content:center;font-size:52px;cursor:pointer;"
            onclick="AC_STATE.selectedProduct=(AC_STATE._productsMap&&AC_STATE._productsMap['${p.id}'])||AC_DATA.products.find(x=>x.id==='${p.id}');AC_STATE.navigate('input-detail')">${p.emoji}</div>
          <div style="padding:12px 14px;">
            <div style="font-size:14px;font-weight:700;color:#111827;margin-bottom:4px;">${p.name}</div>
            <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">${p.supplier}</div>
            <div style="font-size:16px;font-weight:800;color:#1E8B4C;margin-bottom:10px;">₦${p.price.toLocaleString()}/${p.unit}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <button onclick="AC_STATE.addToCart('${p.id}',1)" style="padding:8px 0;background:#1E8B4C;color:white;border:none;border-radius:8px;font-weight:700;font-size:12px;font-family:inherit;cursor:pointer;">Add to Cart</button>
              <button onclick="AC_STATE.toggleWishlist('${p.id}');AC_STATE.navigate('wishlist')" style="padding:8px 0;background:#FEE2E2;color:#EF4444;border:none;border-radius:8px;font-weight:700;font-size:12px;font-family:inherit;cursor:pointer;">Remove</button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   LIST MY PRODUCE (lightweight farmer selling)
───────────────────────────────────────────── */
listProduce() {
  return `
  <div style="max-width:640px;margin:0 auto;padding:24px 24px 60px;">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#92400E 0%,#D97706 100%);border-radius:14px;padding:24px;margin-bottom:24px;position:relative;overflow:hidden;">
      <div style="position:absolute;right:-20px;top:-20px;width:120px;height:120px;background:rgba(255,255,255,0.08);border-radius:50%;"></div>
      <h1 style="color:white;font-size:20px;font-weight:700;margin:0 0 6px;">🌱 List My Farm Produce</h1>
      <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">Sell your harvest directly to buyers across Nigeria</p>
    </div>

    <!-- INFO BANNER -->
    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:#92400E;line-height:1.6;">
      <strong>🌱‍🌱 Farmer Produce Listings</strong> are for fresh farm output - crops you've grown. For agricultural input products (seeds, fertilizers etc.), register as an Agro-Supplier.
    </div>

    <!-- FORM -->
    <div style="background:white;border:1px solid #E5E7EB;border-radius:14px;padding:24px;margin-bottom:16px;">
      <h3 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">Produce Details</h3>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Produce Type <span style="color:#DC2626;">*</span></label>
          <select id="pr-type" style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;background:white;">
            <option value="">Select produce type</option>
            <optgroup label="Cereals">
              <option>Maize (Dry)</option><option>Rice (Paddy)</option><option>Sorghum</option><option>Millet</option>
            </optgroup>
            <optgroup label="Tubers & Roots">
              <option>Cassava (Fresh)</option><option>Cassava (Dried/Chips)</option><option>Yam</option><option>Sweet Potato</option>
            </optgroup>
            <optgroup label="Vegetables">
              <option>Tomato</option><option>Onion</option><option>Pepper</option><option>Leafy Vegetables</option>
            </optgroup>
            <optgroup label="Legumes">
              <option>Cowpea</option><option>Soybean</option><option>Groundnut</option>
            </optgroup>
            <optgroup label="Cash Crops">
              <option>Cocoa</option><option>Sesame</option><option>Shea Nut</option><option>Ginger</option>
            </optgroup>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <div>
            <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Quantity Available <span style="color:#DC2626;">*</span></label>
            <input id="pr-qty" type="number" placeholder="e.g. 500" min="1" style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Unit</label>
            <select id="pr-unit" style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;background:white;">
              <option>kg</option><option>bag (50kg)</option><option>bag (100kg)</option><option>tonne</option><option>bunch</option><option>crate</option>
            </select>
          </div>
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Asking Price (₦) <span style="color:#DC2626;">*</span></label>
          <div style="position:relative;">
            <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#374151;font-weight:700;">₦</span>
            <input id="pr-price" type="number" placeholder="Price per unit" style="width:100%;padding:10px 14px 10px 30px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;box-sizing:border-box;">
          </div>
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Harvest Date</label>
          <input id="pr-harvest" type="date" style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Location (LGA, State) <span style="color:#DC2626;">*</span></label>
          <input id="pr-location" type="text" placeholder="e.g. Kaduna North, Kaduna" style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:13px;font-weight:600;color:#374151;display:block;margin-bottom:6px;">Additional Notes</label>
          <textarea id="pr-notes" rows="3" placeholder="Variety, quality grade, storage info..." style="width:100%;padding:10px 14px;border:1.5px solid #D1D5DB;border-radius:8px;font-size:14px;font-family:inherit;box-sizing:border-box;resize:vertical;"></textarea>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:12px;">
      <button onclick="AC_STATE.navigate('home')" style="flex:1;padding:14px;border:1px solid #E5E7EB;background:white;border-radius:10px;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;color:#374151;">Cancel</button>
      <button id="pr-submit" onclick="AC_SCREENS.submitProduce()" style="flex:2;padding:14px;background:#D97706;border:none;border-radius:10px;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;color:white;">Submit Listing</button>
    </div>
  </div>`;
},

/* ─────────────────────────────────────────────
   BACKWARD COMPAT ALIASES
───────────────────────────────────────────── */
seedMarket()  { return this.inputMarket(); },
seedDetail()  { return this.inputDetail(); },

/* ─────────────────────────────────────────────
   REVIEW HELPERS
───────────────────────────────────────────── */
_setReviewStar(productId, n) {
  const row = document.getElementById(`star-row-${productId}`);
  if (!row) return;
  row.querySelectorAll('button').forEach(btn => {
    btn.textContent = parseInt(btn.dataset.star) <= n ? '★' : '☆';
    btn.style.color  = parseInt(btn.dataset.star) <= n ? '#F59E0B' : '#D1D5DB';
  });
  row.dataset.selected = n;
},

async submitProductReview(productId) {
  const row     = document.getElementById(`star-row-${productId}`);
  const rating  = parseInt(row?.dataset.selected || '0');
  const comment = document.getElementById(`rv-comment-${productId}`)?.value?.trim();

  if (!rating) { showToast('Please select a star rating', 'error'); return; }

  try {
    await AC_API.products.submitReview(productId, { rating, comment: comment || undefined });
    if (AC_STATE._reviewsCache) delete AC_STATE._reviewsCache[productId];
    showToast('Review submitted — thank you!', 'success');
    AC_ROUTER.show('input-detail');
  } catch (err) {
    showToast(err.message || 'Could not submit review', 'error');
  }
},

/* ─────────────────────────────────────────────
   ORDER MESSAGES (shared: farmer + supplier)
───────────────────────────────────────────── */
orderMessages() {
  const orderId = AC_STATE.selectedMessageOrder?.id || AC_STATE.selectedMessageOrder;
  if (!orderId) return `<div style="padding:40px;text-align:center;color:#9CA3AF;">No order selected.</div>`;

  if (!AC_STATE._msgsCache) AC_STATE._msgsCache = {};

  if (AC_STATE._msgsCache[orderId] === undefined) {
    AC_STATE._msgsCache[orderId] = null;
    AC_API.orders.messages(orderId).then(res => {
      AC_STATE._msgsCache[orderId] = res;
      if (AC_STATE.currentScreen === 'order-messages') AC_ROUTER.show('order-messages');
    }).catch(() => {
      AC_STATE._msgsCache[orderId] = { data: [], meta: {} };
      if (AC_STATE.currentScreen === 'order-messages') AC_ROUTER.show('order-messages');
    });
  }

  const cached = AC_STATE._msgsCache[orderId];
  if (cached === null) {
    return `<div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
        ${[1,2,3].map(() => `<div style="height:60px;background:#F3F4F6;border-radius:12px;animation:pulse 1.5s infinite;"></div>`).join('')}
      </div></div>`;
  }

  const messages   = cached.data || [];
  const myId       = AC_STATE.user?.id;
  const role       = AC_STATE.user?.role;
  const backScreen = role === 'supplier' ? 'orders-received' : 'order-detail';
  const orderRef   = AC_STATE.selectedMessageOrder?.orderNumber || orderId.slice(-8);

  const fmtTime = (iso) => {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('en-NG', { hour:'2-digit', minute:'2-digit' });
    }
    return d.toLocaleDateString('en-NG', { day:'numeric', month:'short' }) + ' ' +
           d.toLocaleTimeString('en-NG', { hour:'2-digit', minute:'2-digit' });
  };

  return `
  <div style="max-width:640px;margin:0 auto;display:flex;flex-direction:column;height:calc(100vh - 120px);">

    <!-- HEADER -->
    <div style="display:flex;align-items:center;gap:12px;padding:16px 0 12px;border-bottom:1px solid #E5E7EB;flex-shrink:0;">
      <button onclick="AC_STATE.navigate('${backScreen}')" style="background:none;border:none;color:#1E8B4C;font-weight:600;font-size:14px;cursor:pointer;padding:0;font-family:inherit;">←</button>
      <div style="flex:1;">
        <div style="font-size:15px;font-weight:700;color:#111827;">Order #${orderRef}</div>
        <div style="font-size:12px;color:#9CA3AF;">${role === 'supplier' ? 'Conversation with farmer' : 'Conversation with supplier'}</div>
      </div>
    </div>

    <!-- MESSAGE THREAD -->
    <div id="msg-thread" style="flex:1;overflow-y:auto;padding:16px 0;display:flex;flex-direction:column;gap:10px;">
      ${messages.length === 0
        ? `<div style="flex:1;display:flex;align-items:center;justify-content:center;color:#9CA3AF;font-size:14px;text-align:center;padding:40px;">
            No messages yet.<br>Start the conversation below.
           </div>`
        : messages.map(m => {
            const isMine = m.senderId === myId;
            return `
            <div style="display:flex;flex-direction:column;align-items:${isMine ? 'flex-end' : 'flex-start'};">
              ${!isMine ? `<div style="font-size:11px;color:#9CA3AF;margin-bottom:3px;margin-left:4px;">${m.sender?.name || 'Them'}</div>` : ''}
              <div style="max-width:78%;background:${isMine ? '#1E8B4C' : 'white'};color:${isMine ? 'white' : '#111827'};
                border:1px solid ${isMine ? 'transparent' : '#E5E7EB'};
                border-radius:${isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
                padding:10px 14px;font-size:14px;line-height:1.5;word-break:break-word;">
                ${m.body}
              </div>
              <div style="font-size:10px;color:#9CA3AF;margin-top:3px;margin-${isMine ? 'right' : 'left'}:4px;">${fmtTime(m.createdAt)}</div>
            </div>`;
          }).join('')
      }
    </div>

    <!-- INPUT -->
    <div style="border-top:1px solid #E5E7EB;padding:12px 0;flex-shrink:0;">
      <div style="display:flex;gap:8px;align-items:flex-end;">
        <textarea id="msg-input" placeholder="Type a message…" rows="1"
          style="flex:1;padding:10px 14px;border:1.5px solid #E5E7EB;border-radius:20px;font-size:14px;font-family:inherit;
                 resize:none;outline:none;max-height:120px;overflow-y:auto;line-height:1.5;"
          oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();AC_SCREENS._sendOrderMsg('${orderId}')}"></textarea>
        <button onclick="AC_SCREENS._sendOrderMsg('${orderId}')"
          style="width:42px;height:42px;background:#1E8B4C;border:none;border-radius:50%;cursor:pointer;
                 display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;">
          ➤
        </button>
      </div>
    </div>
  </div>

  <script>
    /* Scroll to bottom on load */
    (function() {
      const el = document.getElementById('msg-thread');
      if (el) el.scrollTop = el.scrollHeight;
    })();
  <\/script>`;
},

async _sendOrderMsg(orderId) {
  const input = document.getElementById('msg-input');
  const body  = input?.value?.trim();
  if (!body) return;

  input.value = '';
  input.style.height = 'auto';

  /* Optimistic UI — append before API call */
  const thread = document.getElementById('msg-thread');
  const now    = new Date().toISOString();
  if (thread) {
    const div = document.createElement('div');
    div.style.cssText = 'display:flex;flex-direction:column;align-items:flex-end;';
    div.innerHTML = `
      <div style="max-width:78%;background:#1E8B4C;color:white;border-radius:16px 16px 4px 16px;padding:10px 14px;font-size:14px;line-height:1.5;word-break:break-word;">${body}</div>
      <div style="font-size:10px;color:#9CA3AF;margin-top:3px;margin-right:4px;">Just now</div>`;
    thread.appendChild(div);
    thread.scrollTop = thread.scrollHeight;
  }

  try {
    await AC_API.orders.sendMessage(orderId, body);
    /* Invalidate cache so re-render shows server-assigned id/timestamp */
    if (AC_STATE._msgsCache) delete AC_STATE._msgsCache[orderId];
  } catch (err) {
    showToast(err.message || 'Message failed to send', 'error');
  }
},

});