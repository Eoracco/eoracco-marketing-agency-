// EORACCO Landing Page — vanilla JS implementation

// ===== DATA =====
const WHY = [
  { icon: 'globe',    title: 'Bilingual EN + CN',      zh: '中英双语服务',   desc: 'Native fluency in both English and Mandarin — across copy, calls, and creative.' },
  { icon: 'sparkles', title: 'AI-Powered Content',    zh: 'AI 内容系统',     desc: 'A modern stack of AI-assisted ad creative, copy, and voice agents.' },
  { icon: 'pin',      title: 'SGV / SoCal Expertise', zh: '南加州本地专家', desc: 'Boots-on-the-ground knowledge of the San Gabriel Valley & Greater LA market.' },
  { icon: 'layers',   title: 'One Roof, Full Stack',  zh: '所有服务一站式', desc: 'Ads, social, creative, email, web, and AI voice — under a single team.' },
];

const SERVICES = [
  { n: '01', icon: 'target', title: 'Paid Advertising',        zh: '付费广告投放',     desc: 'Google Ads & Meta Ads management and continuous optimization.', placeholder: 'Ads dashboard / 广告后台' },
  { n: '02', icon: 'share',  title: 'Social Media Management', zh: '社交媒体管理',     desc: 'Content creation, scheduling, and community engagement done daily.', placeholder: 'Social feed / 社媒画面' },
  { n: '03', icon: 'image',  title: 'Ad Creative',             zh: '广告素材制作',     desc: 'High-converting static image creatives for every platform.', placeholder: 'Creative grid / 素材网格' },
  { n: '04', icon: 'film',   title: 'Video Creative',          zh: '视频制作',         desc: 'Short-form video editing for ads, reels, and organic social — from $100 per video.', placeholder: 'Short-form edit / 短视频剪辑', video: 'video/short-video-demo.mp4' },
  { n: '05', icon: 'mail',   title: 'Email & SMS Marketing',   zh: '邮件与短信营销',   desc: 'Campaigns, automations, and performance reporting that compounds.', placeholder: 'Email mockup / 邮件样张' },
  { n: '06', icon: 'phone',  title: 'Call Tracking',           zh: '电话来源追踪',     desc: 'Know exactly which ads — and keywords — drive every phone call.', placeholder: 'Call report / 来电报表' },
  { n: '07', icon: 'mic',    title: 'AI Voice Agent',          zh: 'AI 智能电话接待',  desc: '24/7 inbound call answering and lead qualification, auto-handled.', placeholder: 'Voice waveform / 语音波形' },
  { n: '08', icon: 'code',   title: 'Web Management & SEO',    zh: '网站管理与 SEO',   desc: 'Compliance, tracking setup, and ongoing SEO optimization.', placeholder: 'SERP / Web build' },
];

// === Stripe checkout link ===
// Replace `checkout_url` with your real Stripe Payment Link, e.g.
//   https://buy.stripe.com/aEU8wO00U6cI5oA3cc
// The cart contents are passed in the `client_reference_id` query param so
// you can read them back in your Stripe webhook / fulfillment flow.
const STRIPE_BASE = {
  checkout_url: "https://buy.stripe.com/YOUR_PAYMENT_LINK"
};

const PRICING_MONTHLY = [
  { id: 'ads-single',        name: 'Paid Ads',                  tier: 'Single Platform', price: 800,  cat: 'ads',      group: 'Paid Advertising' },
  { id: 'ads-dual',          name: 'Paid Ads',                  tier: 'Dual Platform',   price: 1300, cat: 'ads',      group: 'Paid Advertising' },
  { id: 'social-mgmt',       name: 'Social Media Management',   tier: null,              price: 500,  cat: 'social',   group: 'Social Media' },
  { id: 'social-content',    name: 'Social Media Content',      tier: 'Creation Only',   price: 500,  cat: 'social',   group: 'Social Media' },
  { id: 'social-full',       name: 'Social Media Full Package', tier: null,              price: 900,  cat: 'social',   group: 'Social Media' },
  { id: 'creative-starter',  name: 'Ad Creative Starter',       tier: '8 images',        price: 400,  cat: 'creative', group: 'Creative' },
  { id: 'creative-growth',   name: 'Ad Creative Growth',        tier: '16 images',       price: 700,  cat: 'creative', group: 'Creative' },
  { id: 'email-starter',     name: 'Email Marketing',           tier: 'Starter',         price: 600,  cat: 'email',    group: 'Email & SMS' },
  { id: 'email-growth',      name: 'Email Marketing',           tier: 'Growth',          price: 1000, cat: 'email',    group: 'Email & SMS' },
  { id: 'email-sms',         name: 'Email + SMS Bundle',        tier: null,              price: 1200, cat: 'email',    group: 'Email & SMS' },
  { id: 'call-tracking',     name: 'Call Tracking',             tier: null,              price: 200,  cat: 'voice',    group: 'Voice & Tracking' },
  { id: 'ai-voice',          name: 'AI Voice Agent',            tier: null,              price: 200,  cat: 'voice',    group: 'Voice & Tracking' },
  { id: 'web-seo',           name: 'Web & SEO Management',      tier: null,              price: 400,  cat: 'web',      group: 'Web & SEO' },
];

const PRICING_SETUP = [
  { id: 'short-video',   name: 'Short-Form Video Edit', tier: 'per video', price: 100,  group: 'Setup' },
  { id: 'su-email',      name: 'Email Marketing Setup', tier: null,        price: 300,  group: 'Setup' },
  { id: 'su-call',       name: 'Call Tracking Setup',   tier: null,        price: 200,  group: 'Setup' },
  { id: 'su-voice',      name: 'AI Voice Agent Setup',  tier: null,        price: 1200, group: 'Setup' },
  { id: 'su-compliance', name: 'Web Compliance',        tier: null,        price: 200,  group: 'Setup' },
  { id: 'su-tracking',   name: 'Tracking Setup',        tier: 'GTM + GA4', price: 300,  group: 'Setup' },
  { id: 'su-seo',        name: 'SEO Foundation',        tier: null,        price: 500,  group: 'Setup' },
  { id: 'su-web-bundle', name: 'Full Web Setup Bundle', tier: null,        price: 900,  group: 'Setup' },
];

// Mutually exclusive tiers within a category — picking one auto-deselects the others.
const MUTEX_GROUPS = {
  ads:      ['ads-single', 'ads-dual'],
  social:   ['social-mgmt', 'social-content', 'social-full'],
  creative: ['creative-starter', 'creative-growth'],
  email:    ['email-starter', 'email-growth', 'email-sms'],
};

const STEPS = [
  { n: '01', title: 'Free Strategy Call', zh: '免费策略通话',
    desc_en: 'We learn about your business and identify the highest-impact opportunities.',
    desc_zh: '了解您的业务，找出最高回报的营销机会。' },
  { n: '02', title: 'Custom Plan', zh: '定制方案',
    desc_en: 'We build a tailored marketing plan based on your goals and budget.',
    desc_zh: '根据您的目标和预算，制定专属营销方案。' },
  { n: '03', title: 'Launch & Iterate', zh: '启动与迭代',
    desc_en: 'We execute, optimize, and report — you focus on running your business.',
    desc_zh: '我们执行、优化并报告，您专注于经营业务。' },
];

const MARQUEE_LABELS = [
  'Google Ads', 'Meta Ads', 'TikTok Ads', 'AI Voice Agents', 'Email & SMS',
  'SEO & Web', 'Call Tracking', 'Bilingual EN / 中文', 'Ad Creative', 'Short-Form Video',
];

// ===== ICONS (outline, 1px stroke) =====
const ICON_PATHS = {
  'globe':         '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  'sparkles':      '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  'pin':           '<path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/>',
  'layers':        '<path d="M12 3 2 8l10 5 10-5-10-5zM2 13l10 5 10-5M2 18l10 5 10-5"/>',
  'target':        '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  'share':         '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
  'image':         '<rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="9" cy="10" r="1.6"/><path d="m3 17 5-5 5 5 3-3 5 5"/>',
  'film':          '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/>',
  'mail':          '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
  'phone':         '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  'mic':           '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  'code':          '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
  'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>',
  'arrow-right':   '<path d="M5 12h14M13 5l7 7-7 7"/>',
  'check':         '<path d="m5 12 5 5L20 7"/>',
};
function icon(name, size = 20) {
  const p = ICON_PATHS[name];
  if (!p) return '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

const fmt = (n) => '$' + n.toLocaleString();

// ===== STATIC RENDER =====
function renderMarquee() {
  const track = document.getElementById('heroMarquee');
  let html = '';
  for (let rep = 0; rep < 2; rep++) {
    html += MARQUEE_LABELS.map(
      (l) => `<span class="hero-marquee-item"><span class="dot"></span>${l}</span>`
    ).join('');
  }
  track.innerHTML = html;
}

function renderWhy() {
  const grid = document.getElementById('whyGrid');
  grid.innerHTML = WHY.map((w, i) => `
    <div class="why-card">
      <span class="why-num">/ 0${i + 1}</span>
      <div class="why-icon">${icon(w.icon, 28)}</div>
      <div class="why-title">${w.title}</div>
      <div class="why-title-zh zh">${w.zh}</div>
      <div class="why-desc">${w.desc}</div>
    </div>`).join('');
}

function renderServices() {
  const grid = document.getElementById('svcGrid');
  grid.innerHTML = SERVICES.map((s) => `
    <div class="svc-card">
      <div class="svc-media">
        ${s.video
          ? `<video class="svc-video" src="${s.video}" autoplay muted loop playsinline preload="metadata" poster="images/svc-${s.n}.webp"></video>`
          : `<img class="svc-img" src="images/svc-${s.n}.webp" alt="${s.title}" loading="lazy" />`}
        <span class="svc-media-tag">/ ${s.n} · ${s.placeholder}</span>
      </div>
      <div class="svc-body">
        <span class="svc-arrow">${icon('arrow-up-right', 16)}</span>
        <span class="svc-num">/ ${s.n}</span>
        <div class="svc-icon-wrap">${icon(s.icon, 20)}</div>
        <div class="svc-title">${s.title}</div>
        <div class="svc-title-zh zh">${s.zh}</div>
        <div class="svc-desc">${s.desc}</div>
      </div>
    </div>`).join('');
}

function renderSteps() {
  const c = document.getElementById('stepsContainer');
  c.innerHTML = STEPS.map((s) => `
    <div class="step reveal">
      <div class="step-num">${s.n}</div>
      <div class="step-title">${s.title}</div>
      <div class="step-title-zh zh">${s.zh}</div>
      <div class="step-desc">${s.desc_en}<span class="zh-line zh">${s.desc_zh}</span></div>
    </div>`).join('');
}

// ===== PRICING PLAN BUILDER =====
const selected = new Set();
const ALL_ITEMS = {};
[...PRICING_MONTHLY, ...PRICING_SETUP].forEach((i) => { ALL_ITEMS[i.id] = i; });

function priceItemHTML(item, kind) {
  const isSel = selected.has(item.id);
  const tier = item.tier ? `<span class="tier">— ${item.tier}</span>` : '';
  const unit = kind === 'monthly' ? '<span class="unit">/mo</span>' : '';
  return `
    <button type="button" class="price-item ${isSel ? 'is-selected' : ''}" data-id="${item.id}" aria-pressed="${isSel}">
      <span class="price-item-check" aria-hidden="true">${isSel ? icon('check', 12) : ''}</span>
      <span class="price-item-body">
        <span class="price-item-name">${item.name}${tier}</span>
      </span>
      <span class="price-item-amt">${fmt(item.price)}${unit}</span>
    </button>`;
}

function priceGroupHTML(title, zh, items, kind) {
  const head = `<div class="price-group-head"><span class="price-group-title">${title}</span>${zh ? `<span class="price-group-zh zh">${zh}</span>` : ''}</div>`;
  return `<div class="price-group">${head}<div class="price-group-items">${items.map((i) => priceItemHTML(i, kind)).join('')}</div></div>`;
}

function renderPricingPickers() {
  // Monthly grouped by `group`
  const groups = {};
  PRICING_MONTHLY.forEach((i) => { (groups[i.group] = groups[i.group] || []).push(i); });
  document.getElementById('pbMonthly').innerHTML =
    Object.entries(groups).map(([g, items]) => priceGroupHTML(g, null, items, 'monthly')).join('');
  document.getElementById('pbSetup').innerHTML =
    priceGroupHTML('Setup Fees', '设置费', PRICING_SETUP, 'setup');
}

function toggleItem(id) {
  if (selected.has(id)) {
    selected.delete(id);
  } else {
    const monthly = PRICING_MONTHLY.find((i) => i.id === id);
    if (monthly && MUTEX_GROUPS[monthly.cat]) {
      MUTEX_GROUPS[monthly.cat].forEach((sid) => { if (sid !== id) selected.delete(sid); });
    }
    selected.add(id);
  }
  renderPricingPickers();
  renderSummary();
}

function renderSummary() {
  const items = [];
  let monthlyTotal = 0, setupTotal = 0;
  selected.forEach((id) => {
    const it = ALL_ITEMS[id];
    if (!it) return;
    items.push(it);
    if (PRICING_MONTHLY.some((p) => p.id === id)) monthlyTotal += it.price;
    else setupTotal += it.price;
  });
  const firstYear = monthlyTotal * 12 + setupTotal;
  const count = items.length;

  document.getElementById('pbCount').textContent = `${count} item${count === 1 ? '' : 's'}`;

  const cartArea = document.getElementById('pbCartArea');
  if (count === 0) {
    cartArea.innerHTML = `
      <div class="pb-empty">
        <div class="pb-empty-icon">+</div>
        <p>Pick services on the left to build your plan.</p>
        <p class="zh-line zh">在左侧选择服务开始配置方案。</p>
      </div>`;
  } else {
    cartArea.innerHTML = `<ul class="pb-cart">${items.map((it) => {
      const tier = it.tier ? `<span class="tier">— ${it.tier}</span>` : '';
      const unit = PRICING_MONTHLY.some((p) => p.id === it.id) ? '<span class="unit">/mo</span>' : '';
      return `
        <li class="pb-cart-item">
          <div class="pb-cart-name">${it.name}${tier}</div>
          <div class="pb-cart-right">
            <span class="pb-cart-price">${fmt(it.price)}${unit}</span>
            <button type="button" class="pb-cart-remove" data-remove="${it.id}" aria-label="Remove ${it.name}">×</button>
          </div>
        </li>`;
    }).join('')}</ul>`;
  }

  document.getElementById('pbMonthlyTotal').innerHTML = `${fmt(monthlyTotal)}<span class="unit">/mo</span>`;
  document.getElementById('pbSetupTotal').textContent = fmt(setupTotal);
  document.getElementById('pbFirstYear').textContent = fmt(firstYear);

  const checkout = document.getElementById('pbCheckout');
  checkout.disabled = count === 0;
  checkout.innerHTML = count === 0
    ? 'Select services to continue'
    : 'Continue to Checkout <span class="arrow">→</span>';

  document.getElementById('pbReset').disabled = count === 0;
  document.getElementById('pbSecure').innerHTML = `${icon('check', 12)} Secure checkout via Stripe`;
}

function checkout() {
  const ids = [...selected];
  if (ids.length === 0) return;
  const url = new URL(STRIPE_BASE.checkout_url);
  url.searchParams.set('client_reference_id', ids.join(','));
  url.searchParams.set('utm_source', 'eoracco-site');
  window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

function wirePricing() {
  document.getElementById('pbMonthly').addEventListener('click', onPickerClick);
  document.getElementById('pbSetup').addEventListener('click', onPickerClick);
  document.getElementById('pbCartArea').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (btn) toggleItem(btn.getAttribute('data-remove'));
  });
  document.getElementById('pbCheckout').addEventListener('click', checkout);
  document.getElementById('pbReset').addEventListener('click', () => {
    selected.clear();
    renderPricingPickers();
    renderSummary();
  });
}
function onPickerClick(e) {
  const btn = e.target.closest('.price-item');
  if (btn) toggleItem(btn.getAttribute('data-id'));
}

// ===== CONTACT FORM =====
function wireContact() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');
  const wrap = document.getElementById('contactFormWrap');

  const validate = () => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const agreed = form.agreed.checked;
    submitBtn.disabled = !(name && email && agreed);
  };

  form.addEventListener('input', validate);
  form.addEventListener('change', validate);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    const firstName = form.name.value.trim().split(' ')[0];
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending…';
    // Stand-in: a real integration would POST somewhere.
    setTimeout(() => {
      wrap.innerHTML = `
        <div class="contact-success">
          <div class="check">${icon('check', 26)}</div>
          <h3>Inquiry Received.</h3>
          <p>Thanks, ${firstName}. We'll be in touch within one business day.
            <span class="zh-line zh">已收到，我们将在一个工作日内回复您。</span>
          </p>
        </div>`;
    }, 700);
  });
}

// ===== NAV SCROLL =====
function wireNav() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== REVEAL ANIMATIONS =====
function wireReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal:not(.step), .reveal-stagger').forEach((el) => io.observe(el));

  // Stagger delays on children of stagger containers
  document.querySelectorAll('.reveal-stagger').forEach((container) => {
    const step = container.classList.contains('svc-grid') ? 70 : 90;
    Array.from(container.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * step}ms`;
    });
  });

  // Steps: animate connector line + stagger step cards when section enters
  const stepsWrap = document.getElementById('stepsWrap');
  const stepsIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        stepsWrap.classList.add('in');
        stepsWrap.querySelectorAll('.step').forEach((step, i) => {
          step.style.transitionDelay = `${300 + i * 200}ms`;
          step.classList.add('in');
        });
        stepsIO.unobserve(stepsWrap);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
  stepsIO.observe(stepsWrap);
}

// ===== SERVICES — horizontal scroll-driven strip (desktop) =====
function wireServicesHScroll() {
  const wrap = document.getElementById('svcHwrap');
  const track = document.getElementById('svcGrid');
  const bar = document.getElementById('svcBar');
  const hint = document.querySelector('.svc-hint');
  if (!wrap || !track) return;

  const mq = window.matchMedia('(min-width: 1025px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let travel = 0;

  const layout = () => {
    if (!mq.matches || reduced) {
      wrap.style.height = 'auto';
      track.style.transform = '';
      return;
    }
    travel = track.scrollWidth - window.innerWidth;
    // Vertical scroll distance maps 1:1 to horizontal travel while pinned.
    wrap.style.height = (window.innerHeight + travel) + 'px';
    update();
  };

  const update = () => {
    if (!mq.matches || reduced) return;
    const y = Math.min(Math.max(-wrap.getBoundingClientRect().top, 0), travel);
    const p = travel ? y / travel : 0;
    track.style.transform = 'translate3d(' + (-y) + 'px, 0, 0)';
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    if (hint) hint.classList.toggle('hide', p > 0.03);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', layout);
  mq.addEventListener('change', layout);
  layout();
}

// ===== FX PACK — editorial flashy animations =====
const FX_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FX_FINE = window.matchMedia('(pointer: fine)').matches;

// Custom cursor: instant dot + lerped ring
function wireCursor() {
  if (!FX_FINE || FX_REDUCED) return;
  document.body.classList.add('fx-cursor');
  const dot = document.createElement('div'); dot.className = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  document.body.append(ring, dot);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
  }, { passive: true });
  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    requestAnimationFrame(loop);
  })();
  const sel = 'a, button, .price-item, .svc-card, .why-card, select, label';
  document.addEventListener('mouseover', (e) => { if (e.target.closest(sel)) ring.classList.add('on'); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest(sel)) ring.classList.remove('on'); });
}

// Magnetic buttons
function wireMagnetic() {
  if (!FX_FINE || FX_REDUCED) return;
  document.querySelectorAll('.btn, .cta-mini, .pb-checkout, .contact-submit').forEach((el) => {
    const strength = 0.3;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });
}

// Hero headline: split words into chars for 3D rise
function splitHeroChars() {
  if (FX_REDUCED) return;
  document.querySelectorAll('.hero-display .word').forEach((w) => {
    const base = parseFloat(w.style.animationDelay || '0');
    const text = w.textContent;
    w.style.animation = 'none';
    w.style.opacity = '1';
    w.style.transform = 'none';
    w.innerHTML = [...text].map((ch, i) =>
      ch.trim() === ''
        ? ch
        : '<span class="char" style="animation-delay:' + (base + i * 0.045).toFixed(3) + 's">' + ch + '</span>'
    ).join('');
  });
}

// Count-up hero stats, then live ticks on the calls row
function wireCountUps() {
  const vals = [...document.querySelectorAll('.hero-stat-value')];
  vals.forEach((el) => {
    const m = el.textContent.trim().match(/^([\d,]+)$/);
    if (!m) return;
    const target = +m[1].replace(/,/g, '');
    if (FX_REDUCED) return;
    const start = performance.now(), dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  // live tick: increment the calls-answered stat every few seconds
  const calls = vals.find((el) => el.textContent.replace(/,/g, '').trim() === '3902');
  if (calls && !FX_REDUCED) {
    let n = 3902;
    setInterval(() => {
      n += 1 + Math.floor(Math.random() * 2);
      calls.textContent = n.toLocaleString();
      calls.classList.add('tick');
      setTimeout(() => calls.classList.remove('tick'), 600);
    }, 4000);
  }
}

// Amber glare position on cards (pairs with ::after radial gradient)
function wireGlare() {
  if (!FX_FINE) return;
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.why-card, .svc-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
  }, { passive: true });
}

// Top scroll progress bar + paper grain
function wireChrome() {
  const prog = document.createElement('div');
  prog.className = 'scroll-progress';
  prog.innerHTML = '<div class="bar"></div>';
  document.body.append(prog);
  const bar = prog.firstChild;
  const upd = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max ? scrollY / max : 0) + ')';
  };
  addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
  upd();
  if (!FX_REDUCED) {
    const grain = document.createElement('div');
    grain.className = 'grain';
    document.body.append(grain);
  }
}

// Click ripple on solid buttons
function wireRipple() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-primary, .pb-checkout, .contact-submit, .cta-mini');
    if (!btn || FX_REDUCED) return;
    const r = btn.getBoundingClientRect();
    const rip = document.createElement('span');
    rip.className = 'ripple';
    const size = Math.max(r.width, r.height);
    rip.style.width = rip.style.height = size + 'px';
    rip.style.left = (e.clientX - r.left - size / 2) + 'px';
    rip.style.top = (e.clientY - r.top - size / 2) + 'px';
    btn.append(rip);
    setTimeout(() => rip.remove(), 650);
  });
}

// Ghost italic index numbers behind section heads
function wireGhosts() {
  const map = { why: '01', pricing: '03', process: '04', contact: '05' };
  Object.entries(map).forEach(([id, num]) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const g = document.createElement('span');
    g.className = 'sec-ghost';
    g.textContent = num;
    g.setAttribute('aria-hidden', 'true');
    sec.append(g);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderMarquee();
  renderWhy();
  renderServices();
  renderSteps();
  renderPricingPickers();
  renderSummary();
  wirePricing();
  wireContact();
  wireNav();
  wireReveals();
  wireServicesHScroll();
  splitHeroChars();
  wireCursor();
  wireMagnetic();
  wireCountUps();
  wireGlare();
  wireChrome();
  wireRipple();
  wireGhosts();
});
