// EORACCO Landing Page — vanilla JS

// ===== LANGUAGE STATE =====
// 'en' = English only · 'bi' = bilingual (default) · 'zh' = Chinese primary
let LANG = window.EO ? window.EO.lang : 'bi';

// ===== DATA =====
const WHY = [
  { icon: 'globe',    title: 'Bilingual EN + CN',      zh: '中英双语服务',
    desc: 'English and Mandarin across copy, calls and creative.',
    desc_zh: '英语与普通话，文案、通话、素材都能做。' },
  { icon: 'sparkles', title: 'AI-Powered Content',    zh: 'AI 内容系统',
    desc: 'A modern stack of AI-assisted ad creative, copy, and voice agents.',
    desc_zh: '以 AI 辅助的广告素材、文案与语音客服体系。' },
  { icon: 'pin',      title: 'Local to SGV / LA', zh: '洛杉矶本地',
    desc: 'Based in Los Angeles and familiar with the San Gabriel Valley market.',
    desc_zh: '立足洛杉矶，熟悉圣盖博谷一带的市场。' },
  { icon: 'layers',   title: 'One Contact, Full Stack', zh: '一个窗口，全套服务',
    desc: 'Ads, social, creative, web, AI voice and apps, coordinated through one point of contact.',
    desc_zh: '广告、社媒、内容、网站、AI 语音与 App，由一个窗口统一对接。' },
];

const PRICING_MONTHLY = [
  { id: 'ads-single',       name: 'Paid Ads',                  zh: '付费广告',       tier: 'Single Platform', price: 800,  cat: 'ads',      group: 'Paid Advertising' },
  { id: 'ads-dual',         name: 'Paid Ads',                  zh: '付费广告',       tier: 'Dual Platform',   price: 1300, cat: 'ads',      group: 'Paid Advertising' },
  { id: 'social-mgmt',      name: 'Social Media Management',   zh: '社媒代运营',     tier: null,              price: 500,  cat: 'social',   group: 'Social Media' },
  { id: 'social-content',   name: 'Social Media Content',      zh: '社媒内容创作',   tier: 'Creation Only',   price: 500,  cat: 'social',   group: 'Social Media' },
  { id: 'social-full',      name: 'Social Media Full Package', zh: '社媒全包套餐',   tier: null,              price: 900,  cat: 'social',   group: 'Social Media' },
  { id: 'creative-starter', name: 'Ad Creative Starter',       zh: '广告素材入门',   tier: '8 images',        price: 400,  cat: 'creative', group: 'Creative' },
  { id: 'creative-growth',  name: 'Ad Creative Growth',        zh: '广告素材进阶',   tier: '16 images',       price: 700,  cat: 'creative', group: 'Creative' },
  { id: 'email-starter',    name: 'Email Marketing',           zh: '邮件营销',       tier: 'Starter',         price: 600,  cat: 'email',    group: 'Email & SMS' },
  { id: 'email-growth',     name: 'Email Marketing',           zh: '邮件营销',       tier: 'Growth',          price: 1000, cat: 'email',    group: 'Email & SMS' },
  { id: 'email-sms',        name: 'Email + SMS Bundle',        zh: '邮件+短信套餐',  tier: null,              price: 1200, cat: 'email',    group: 'Email & SMS' },
  { id: 'call-tracking',    name: 'Call Tracking',             zh: '来电追踪',       tier: null,              price: 200,  cat: 'voice',    group: 'Voice & Tracking' },
  { id: 'ai-voice',         name: 'AI Voice Agent',            zh: 'AI 语音客服',    tier: null,              price: 200,  cat: 'voice',    group: 'Voice & Tracking' },
  { id: 'web-seo',          name: 'Web & SEO Management',      zh: '网站与SEO维护',  tier: null,              price: 400,  cat: 'web',      group: 'Web & SEO' },
];

const PRICING_SETUP = [
  { id: 'short-video',   name: 'Short-Form Video Edit', zh: '短视频剪辑',    tier: 'per video', price: 100,  group: 'Setup' },
  { id: 'su-email',      name: 'Email Marketing Setup', zh: '邮件营销配置',  tier: null,        price: 300,  group: 'Setup' },
  { id: 'su-call',       name: 'Call Tracking Setup',   zh: '来电追踪配置',  tier: null,        price: 200,  group: 'Setup' },
  { id: 'su-voice',      name: 'AI Voice Agent Setup',  zh: 'AI 语音配置',   tier: null,        price: 1200, group: 'Setup' },
  { id: 'su-compliance', name: 'Web Compliance',        zh: '网站合规',      tier: null,        price: 200,  group: 'Setup' },
  { id: 'su-tracking',   name: 'Tracking Setup',        zh: '追踪配置',      tier: 'GTM + GA4', price: 300,  group: 'Setup' },
  { id: 'su-seo',        name: 'SEO Foundation',        zh: 'SEO 基础建设',  tier: null,        price: 500,  group: 'Setup' },
  { id: 'su-web-bundle', name: 'Full Web Setup Bundle', zh: '网站配置全包',  tier: null,        price: 900,  group: 'Setup' },
];

const GROUP_ZH = {
  'Paid Advertising': '付费广告', 'Social Media': '社交媒体', 'Creative': '素材创意',
  'Email & SMS': '邮件与短信', 'Voice & Tracking': '语音与追踪', 'Web & SEO': '网站与SEO',
  'Setup Fees': '一次性配置', 'Setup': '一次性设置', 'Projects': '项目',
};
const GROUP_EN = { 'Setup': 'Setup fees', 'Projects': 'Projects' };

// Mutually exclusive tiers within a category.
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



// ===== I18N — static strings =====
const I18N = {
  nav: {
    en: ['Services', 'Pricing', 'Process', 'Contact', 'Book a call'],
    bi: ['Services', 'Pricing', 'Process', 'Contact', 'Book a call'],
    zh: ['服务', '定价', '流程', '联系', '预约通话'],
  },
  heroBtns: {
    en: ['Book a free strategy call', 'See all services'],
    bi: ['Book a free strategy call', 'See all services'],
    zh: ['预约免费策略通话', '查看全部服务'],
  },
  heroWords: {
    en: [[{ t: 'The Marketing' }], [{ t: 'Ren' }, { t: 'ai', ai: true }, { t: 'ssance.' }]],
    bi: [[{ t: 'The Marketing' }], [{ t: 'Ren' }, { t: 'ai', ai: true }, { t: 'ssance.' }]],
    zh: [[{ t: '营销的' }], [{ t: '文艺复兴。' }]],
  },
  heroSub: {
    en: 'Bilingual marketing for Los Angeles businesses. Marketing, creative and apps, in English and Chinese.',
    bi: 'Bilingual marketing for Los Angeles businesses. Marketing, creative and apps, in English and Chinese.',
    zh: '为洛杉矶商家提供营销、内容与 App 服务，中英双语。',
  },
  heroSubZh: '营销、内容与 App，中英双语。',
  chLink: { en: 'Add to plan', bi: 'Add to plan', zh: '加入方案' },
  // Each head: title (bold) + sub (grey, Apple-style continuation) + zh line in bilingual mode
  secs: {
    why: {
      title: { en: 'Why EORACCO.', zh: '为什么选择我们。' },
      sub: { en: 'One studio, two languages, the full stack.', zh: '一个团队，两种语言，全套体系。' },
    },
    services: {
      title: { en: 'Three ways we help.', zh: '三大类服务。' },
      sub: { en: 'One point of contact for all of them.', zh: '全部由同一个窗口对接。' },
    },
    pricing: {
      title: { en: 'Build your plan.', zh: '自助配置方案。' },
      sub: { en: 'See the price before we talk.', zh: '通话前就能看到价格。' },
      desc: { en: 'Pick the services you want and the total updates as you go. Send the plan with your inquiry and we confirm the details on a quick call.',
              zh: '勾选所需服务，总价实时更新。方案会随咨询一起发送，通话确认细节后再开始。' },
    },
    process: {
      title: { en: 'Three steps.', zh: '三个步骤。' },
      sub: { en: 'From first call to launch in about two weeks.', zh: '从第一通电话到上线，大约两周。' },
      desc: { en: 'No long onboarding and no large up-front commitment.',
              zh: '没有冗长的启动流程，也无需大额预付。' },
    },
    contact: {
      title: { en: 'Hand off your marketing.', zh: '把营销交给我们。' },
      sub: { en: "Let's talk.", zh: '聊聊您的生意。' },
      desc: { en: 'Tell us a little about your business. We reply within one business day with next steps — or an honest "we\'re not the right fit."',
              zh: '简单介绍您的业务，我们会在一个工作日内回复下一步安排，不合适也会直说。' },
    },
  },
  statement: {
    en: 'Two languages and every channel, handled by one team from start to finish.',
    zh: '中英两种语言、多个渠道，由同一个团队从头跟到尾。',
  },
  servicesHint: {
    en: 'Marketing, creative and apps. Open any group to see every service and price.',
    bi: 'Marketing, creative and apps. Open any group to see every service and price.',
    zh: '营销、内容与 App。点进任一类，查看全部服务和价格。',
  },
  zoom: {
    kicker: { en: 'Video Creative', zh: '视频制作' },
    h: { en: 'Short-form video.<br/>From $100.', zh: '短视频剪辑。<br/>每条 $100 起。' },
    p: { en: 'Editing for Reels, Shorts and paid ads, built for vertical screens.',
         zh: '适用于 Reels、Shorts 和广告投放的竖屏短视频剪辑。' },
  },
  film: {
    kicker: { en: 'Made in-house', zh: '自家出品' },
    h: { en: 'Motion design,<br/>by us.', zh: '动态设计，<br/>我们自己做。' },
    p: { en: 'We animated this short in After Effects. Your ads and reels get the same hands.',
         zh: '这支短片由我们在 After Effects 中制作。您的广告和短视频，也由同一双手完成。' },
  },
  apps: {
    title: { en: "Apps we've shipped.", zh: '我们上线的 App。' },
    sub: { en: 'Built by the same team, live on the App Store.', zh: '同一个团队打造，已在 App Store 上架。' },
    store: { en: 'View on the App Store', zh: '在 App Store 查看' },
    list: [
      { key: 'pompolo', name: 'Pompolo', icon: 'images/apps/pompolo-icon.webp', shot: 'images/apps/pompolo-art.webp',
        url: 'https://apps.apple.com/us/app/id6816869216',
        kind: { en: 'Party game · iPhone & iPad', zh: '派对游戏 · iPhone 与 iPad' },
        desc: { en: 'A water-balloon battle for up to four players. Phones become controllers, the game casts to a TV with AirPlay, and it plays in English, Chinese and Spanish.',
                zh: '最多四人同玩的水球对战游戏。手机就是手柄，可用 AirPlay 投到电视，支持英文、中文和西班牙文。' } },
      { key: 'twotake', name: 'TwoTake', icon: 'images/apps/twotake-icon.webp', shot: 'images/apps/twotake-ui.webp',
        url: 'https://apps.apple.com/us/app/twotake-9-16-16-9-camera/id6802524670',
        kind: { en: 'Camera · iPhone', zh: '相机 · iPhone' },
        desc: { en: 'Shoot once and get both a 9:16 vertical and a 16:9 horizontal video. The horizontal is a center crop of the same vertical frame.',
                zh: '拍一次，同时得到 9:16 竖版和 16:9 横版视频。横版是从同一个竖版画面居中裁切出来的。' } },
    ],
  },
  stats: [
    { n: 11, suffix: '',   en: 'services, one point of contact', zh: '项服务，一个窗口对接' },
    { n: 2,  suffix: '',   en: 'languages, native in both', zh: '种语言，双母语' },
    { n: 24, suffix: '/7', en: 'AI call answering',         zh: 'AI 电话接待' },
    { n: 14, suffix: '',   en: 'days to launch, typically', zh: '天左右上线' },
  ],
  contactH2: {
    en: 'Book a free<br/>30-minute call.',
    bi: 'Book a free<br/>30-minute call.',
    zh: '预约 30 分钟<br/>免费通话。',
  },
  footerHeads: {
    en: ['Navigate', 'Contact', 'Legal'],
    bi: ['Navigate', 'Contact', 'Legal'],
    zh: ['导航', '联系', '条款'],
  },
};

const t = (obj) => obj[LANG] || obj.bi || obj.en;

// ===== ICONS =====
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
  'app':           '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 5.5h3"/><circle cx="12" cy="18.2" r="0.6" fill="currentColor"/>',
  'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>',
  'check':         '<path d="m5 12 5 5L20 7"/>',
};
function icon(name, size = 20) {
  const p = ICON_PATHS[name];
  if (!p) return '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

const fmt = (n) => '$' + n.toLocaleString();
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isBi = () => LANG === 'bi';
const isZh = () => LANG === 'zh';
const scrollToEl = (el, offset = 0) => {
  if (!el) return;
  if (window.EO_MOTION && window.EO_MOTION.scrollTo) { window.EO_MOTION.scrollTo(el, offset); return; }
  el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
};

// Count a figure up/down to its new value (money totals in the plan card)
function tweenFigure(el, to, render) {
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  if (REDUCED || from === to) { el.innerHTML = render(to); return; }
  const start = performance.now(), dur = 650;
  const step = (now) => {
    const p = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - p, 4);
    el.innerHTML = render(Math.round(from + (to - from) * e));
    if (p < 1 && Number(el.dataset.v) === to) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Service tile → the plan item "Add to plan" selects

// ===== RENDER =====
function renderHero() {
  const h1 = document.querySelector('.hero-display');
  if (h1) {
    h1.innerHTML = t(I18N.heroWords).map((row) =>
      `<span class="row">${row.map((seg) => seg.ai ? `<span class="ai">${seg.t}</span>` : seg.t).join('')}</span>`
    ).join('');
  }
  const sub = document.getElementById('heroSub');
  if (sub) {
    sub.innerHTML = t(I18N.heroSub) + (isBi() ? `<span class="zh-line">${I18N.heroSubZh}</span>` : '');
  }
  const idx = document.getElementById('heroIndex');
  if (idx) {
    const picks = EO.allServices().filter((s) => s.chiclet);
    idx.innerHTML = `<div class="chiclets-track">${picks.map((s) => {
      const nm = s.short || s.name;
      const label = isZh() ? nm.zh : nm.en;
      const zh = isBi() ? `<span class="chiclet-zh">${nm.zh}</span>` : '';
      return `<a class="chiclet" href="${s.cat.page}#${s.id}"><span class="chiclet-icon">${EO.icon(s.icon, 30)}</span><span class="chiclet-label">${label}</span>${zh}</a>`;
    }).join('')}</div>`;
  }
}

function secHeadHTML(s) {
  const title = isZh() ? s.title.zh : s.title.en;
  const sub = isZh() ? s.sub.zh : s.sub.en;
  const zhLine = isBi() ? `<span class="h2-zh">${s.title.zh}${s.sub.zh}</span>` : '';
  return `${title}<span class="h2-sub"> ${sub}</span>${zhLine}`;
}

function renderWhy() {
  const grid = document.getElementById('whyGrid');
  grid.innerHTML = WHY.map((w, i) => {
    const title = isZh() ? w.zh : w.title;
    const desc = isZh() ? w.desc_zh : w.desc;
    const art = i === 0
      ? `<div class="bento-swap" aria-hidden="true"><span>EN</span><span>中</span></div>`
      : `<div class="bento-icon">${icon(w.icon, 34)}</div>`;
    return `
    <div class="bento-card glow-card bento-${i + 1}">
      ${art}
      <div class="bento-copy">
        <h3 class="bento-title">${title}</h3>
        ${isBi() ? `<p class="bento-zh">${w.zh}</p>` : ''}
        <p class="bento-desc">${desc}${isBi() ? `<span class="zh-line">${w.desc_zh}</span>` : ''}</p>
      </div>
    </div>`;
  }).join('');
}

function renderStatement() {
  const el = document.getElementById('statement');
  const zhEl = document.getElementById('statementZh');
  const text = isZh() ? I18N.statement.zh : I18N.statement.en;
  // one span per word (per character for Chinese) so motion.js can light them up in order
  const parts = isZh() ? [...text] : text.split(' ');
  el.innerHTML = parts.map((w) => `<span class="w">${w}</span>`).join(isZh() ? '' : ' ');
  el.setAttribute('aria-label', text);
  zhEl.textContent = isBi() ? I18N.statement.zh : '';
}

function renderZoom() {
  const z = I18N.zoom;
  document.getElementById('zoomKicker').textContent = isZh() ? z.kicker.zh : z.kicker.en;
  document.getElementById('zoomH').innerHTML = isZh() ? z.h.zh : z.h.en;
  document.getElementById('zoomP').innerHTML = (isZh() ? z.p.zh : z.p.en) + (isBi() ? `<span class="zh-line">${z.p.zh}</span>` : '');
}

function renderFilm() {
  const f = I18N.film;
  document.getElementById('filmKicker').textContent = isZh() ? f.kicker.zh : f.kicker.en;
  document.getElementById('filmH').innerHTML = isZh() ? f.h.zh : f.h.en;
  document.getElementById('filmP').innerHTML = (isZh() ? f.p.zh : f.p.en) + (isBi() ? `<span class="zh-line">${f.p.zh}</span>` : '');
}

function renderApps() {
  const a = I18N.apps;
  const head = document.querySelector('#apps .sec-head h2');
  head.innerHTML = secHeadHTML(a);
  document.getElementById('appsGrid').innerHTML = window.EO_APPS.html();
  window.EO_APPS.wireVideos(document.getElementById('appsGrid'));
}

function renderStats() {
  document.getElementById('statsGrid').innerHTML = I18N.stats.map((st) => `
    <div class="stat">
      <p class="stat-num"><span class="count" data-count="${st.n}">${st.n}</span>${st.suffix}</p>
      <p class="stat-label">${isZh() ? st.zh : st.en}${isBi() ? `<span class="zh-line">${st.zh}</span>` : ''}</p>
    </div>`).join('');
}

function addLabel(id) {
  return selected.has(id) ? (isZh() ? '已加入方案' : 'In your plan') : t(I18N.chLink);
}

// Update every "Add to plan" button without re-rendering the gallery
function updateAddButtons() {
  document.querySelectorAll('[data-add]').forEach((b) => {
    const id = b.getAttribute('data-add');
    b.classList.toggle('is-added', selected.has(id));
    b.textContent = addLabel(id);
  });
}

function renderChapters() {
  const box = document.getElementById('chapters');
  if (!box) return;
  document.getElementById('servicesHint').textContent = t(I18N.servicesHint);
  box.innerHTML = EO.CATEGORIES.map((c) => {
    const from = c.services.map((x) => x.price).filter((p) => p && !p.quote).sort((a, b) => a.from - b.from)[0];
    const count = isZh() ? `${c.services.length} 项服务` : `${c.services.length} service${c.services.length > 1 ? 's' : ''}`;
    const name = isZh() ? (c.longName || c.name).zh : (c.longName || c.name).en;
    return `
    <article class="card card--cat" id="cat-${c.key}">
      <div class="card-media"><img class="card-img" src="${c.card.img}" alt="" decoding="async" /></div>
      <div class="card-shade" aria-hidden="true"></div>
      <div class="card-body">
        <p class="card-tag">${count}${c.isNew ? ` · ${isZh() ? '新' : 'New'}` : ''}</p>
        <h3 class="card-title">${name}</h3>
        ${isBi() ? `<p class="card-zh">${(c.longName || c.name).zh}</p>` : ''}
        <p class="card-desc">${isZh() ? c.headline.zh : c.headline.en}</p>
        <ul class="card-chips">${c.services.map((x) => `<li><a href="${c.page}#${x.id}">${isZh() ? x.name.zh : x.name.en}</a></li>`).join('')}</ul>
        <div class="card-actions">
          <a class="btn btn-small" href="${c.page}">${isZh() ? '查看' + name : 'Explore ' + name}</a>
          ${from ? `<span class="card-price">${EO.priceText(from)}</span>` : ''}
        </div>
      </div>
    </article>`;
  }).join('');
}

function renderSteps() {
  const c = document.getElementById('stepsContainer');
  c.innerHTML = STEPS.map((s) => {
    const title = isZh() ? s.zh : s.title;
    const desc = isZh() ? s.desc_zh : s.desc_en;
    return `
    <li class="step">
      <span class="step-num">${Number(s.n)}</span>
      <h3 class="step-title">${title}</h3>
      ${isBi() ? `<p class="step-title-zh">${s.zh}</p>` : ''}
      <p class="step-desc">${desc}${isBi() ? `<span class="zh-line">${s.desc_zh}</span>` : ''}</p>
    </li>`;
  }).join('');
}

// ===== PRICING PLAN BUILDER =====
const selected = new Set();
const ALL_ITEMS = {};
[...PRICING_MONTHLY, ...PRICING_SETUP].forEach((i) => { ALL_ITEMS[i.id] = i; });
const isMonthly = (id) => PRICING_MONTHLY.some((p) => p.id === id);

// Plan attached to the inquiry form (set from the summary card)
let PLAN = null;

const itemName = (item) => (isZh() ? item.zh : item.name);
const TIER_ZH = {
  'Single Platform': '单平台', 'Dual Platform': '双平台', 'Creation Only': '仅内容创作',
  '8 images': '每月 8 张', '16 images': '每月 16 张', 'Starter': '入门版', 'Growth': '进阶版',
  'per video': '每条', 'per image': '每张', 'up to 15 slides': '最多 15 页',
  'up to 30 s': '最长 30 秒', 'up to 15 s': '最长 15 秒',
};
const tierText = (item) => (isZh() ? (TIER_ZH[item.tier] || item.tier) : item.tier);

function priceItemHTML(item, kind) {
  const isSel = selected.has(item.id);
  const tier = item.tier ? `<span class="tier">${tierText(item)}</span>` : '';
  const zh = isBi() ? `<span class="price-item-zh">${item.zh}</span>` : '';
  const unit = kind === 'monthly' ? `<span class="unit">${isZh() ? '/月' : '/mo'}</span>` : '';
  return `
    <button type="button" class="price-item ${isSel ? 'is-selected' : ''}" data-id="${item.id}" aria-pressed="${isSel}">
      <span class="price-item-check" aria-hidden="true">${icon('check', 14)}</span>
      <span class="price-item-body">
        <span class="price-item-name">${itemName(item)}</span>${tier}${zh}
      </span>
      <span class="price-item-amt">${fmt(item.price)}${unit}</span>
    </button>`;
}

function priceGroupHTML(title, zh, items, kind) {
  const gTitle = isZh() ? (GROUP_ZH[title] || title) : title;
  const gSub = isBi() && zh ? `<span class="price-group-zh"> ${zh}</span>` : '';
  return `<div class="price-group"><h4 class="price-group-head">${gTitle}${gSub}</h4><div class="price-group-items">${items.map((i) => priceItemHTML(i, kind)).join('')}</div></div>`;
}

function renderPricingPickers() {
  const groups = {};
  PRICING_MONTHLY.forEach((i) => { (groups[i.group] = groups[i.group] || []).push(i); });
  document.getElementById('pbMonthly').innerHTML =
    Object.entries(groups).map(([g, items]) => priceGroupHTML(g, GROUP_ZH[g], items, 'monthly')).join('');
  const sg = {};
  PRICING_SETUP.forEach((i) => { (sg[i.group] = sg[i.group] || []).push(i); });
  document.getElementById('pbSetup').innerHTML = Object.entries(sg).map(([g, items]) => {
    const gTitle = isZh() ? (GROUP_ZH[g] || g) : (GROUP_EN[g] || g);
    const gSub = isBi() ? `<span class="price-group-zh"> ${GROUP_ZH[g] || ''}</span>` : '';
    return `<div class="price-group" id="pb-${g.toLowerCase()}"><h4 class="price-group-head">${gTitle}${gSub}</h4><div class="price-group-items">${items.map((i) => priceItemHTML(i, 'setup')).join('')}</div></div>`;
  }).join('');
}

function selectItem(id, on) {
  if (!on) { selected.delete(id); return; }
  const monthly = PRICING_MONTHLY.find((i) => i.id === id);
  if (monthly && MUTEX_GROUPS[monthly.cat]) {
    MUTEX_GROUPS[monthly.cat].forEach((sid) => { if (sid !== id) selected.delete(sid); });
  }
  selected.add(id);
}

function refreshPlan() {
  renderPricingPickers();
  renderSummary();
  updateAddButtons();
  if (window.EO) EO.plan.set(Array.from(selected));
}

function toggleItem(id) {
  selectItem(id, !selected.has(id));
  refreshPlan();
}

function computeTotals() {
  const items = [];
  let monthly = 0, setup = 0;
  selected.forEach((id) => {
    const it = ALL_ITEMS[id];
    if (!it) return;
    items.push(it);
    if (isMonthly(id)) monthly += it.price;
    else setup += it.price;
  });
  return { items, monthly, setup };
}

function renderSummary() {
  const { items, monthly, setup } = computeTotals();
  const firstYear = monthly * 12 + setup;
  const count = items.length;

  document.getElementById('pbCount').textContent =
    isZh() ? `${count} 项` : `${count} item${count === 1 ? '' : 's'}`;

  const cartArea = document.getElementById('pbCartArea');
  if (count === 0) {
    cartArea.innerHTML = `
      <div class="pb-empty">
        <p>${isZh() ? '选择左侧的服务，方案和价格会显示在这里。' : 'Choose services and your plan and price appear here.'}</p>
        ${isBi() ? '<p class="zh-line">选择服务后，方案和价格会显示在这里。</p>' : ''}
      </div>`;
  } else {
    cartArea.innerHTML = `<ul class="pb-cart">${items.map((it) => {
      const tier = it.tier ? `<span class="tier">${tierText(it)}</span>` : '';
      const unit = isMonthly(it.id) ? `<span class="unit">${isZh() ? '/月' : '/mo'}</span>` : '';
      return `
        <li class="pb-cart-item">
          <div class="pb-cart-name">${itemName(it)}${tier}</div>
          <div class="pb-cart-right">
            <span class="pb-cart-price">${fmt(it.price)}${unit}</span>
            <button type="button" class="pb-cart-remove" data-remove="${it.id}" aria-label="Remove ${it.name}">${isZh() ? '移除' : 'Remove'}</button>
          </div>
        </li>`;
    }).join('')}</ul>`;
  }

  const L = {
    monthly: { en: 'Monthly', bi: 'Monthly <span class="zh">月费</span>', zh: '每月费用' },
    setup: { en: 'One-time', bi: 'One-time <span class="zh">一次性费用</span>', zh: '一次性费用' },
    grand: { en: 'First-year estimate', bi: 'First-year estimate <span class="zh">首年预估</span>', zh: '首年预估' },
  };
  const per = `<span class="unit">${isZh() ? '/月' : '/mo'}</span>`;
  tweenFigure(document.querySelector('#pbMonthlyTotal'), monthly, (v) => fmt(v) + per);
  tweenFigure(document.querySelector('#pbSetupTotal'), setup, fmt);
  tweenFigure(document.querySelector('#pbFirstYear'), firstYear, fmt);
  const labels = document.querySelectorAll('.pb-total-row .pb-total-label');
  labels[0].innerHTML = t(L.monthly);
  labels[1].innerHTML = t(L.setup);
  labels[2].innerHTML = t(L.grand);

  const bar = document.getElementById('pbBar');
  if (bar) {
    bar.classList.toggle('has-items', count > 0);
    document.getElementById('pbBarTotal').innerHTML = count === 0
      ? (isZh() ? '尚未选择服务' : 'No services yet')
      : `${fmt(monthly)}<span class="unit">${isZh() ? '/月' : '/mo'}</span>${setup ? ` <span class="pb-bar-setup">+ ${fmt(setup)} ${isZh() ? '一次性' : 'setup'}</span>` : ''}`;
    document.getElementById('pbBarCount').textContent = isZh() ? `${count} 项服务` : `${count} service${count === 1 ? '' : 's'}`;
    document.getElementById('pbBarBtn').textContent = isZh() ? '查看方案' : 'Review plan';
  }

  const checkout = document.getElementById('pbCheckout');
  checkout.disabled = count === 0;
  checkout.textContent = count === 0
    ? (isZh() ? '请先选择服务' : 'Choose a service to continue')
    : (isZh() ? '发送此方案并预约通话' : 'Send this plan with my inquiry');

  const reset = document.getElementById('pbReset');
  reset.disabled = count === 0;
  reset.textContent = isZh() ? '清空' : 'Clear';
  document.getElementById('pbSecure').innerHTML = `${icon('check', 14)}<span>` +
    (isZh() ? '现在无需付款，通话确认后开始'
      : 'No payment now. We confirm on a quick call.') + '</span>';

  document.querySelector('.pb-disclaimer').innerHTML =
    isZh()
      ? '以上为估算价格，通话确认后开具正式发票。月度服务可随时取消，需提前 30 天通知。'
      : 'This is an estimate. We send the final invoice after a short strategy call. Monthly services can be cancelled any time with 30 days’ notice.' +
        (isBi() ? '<span class="zh-line">以上为估算价格，通话确认后开具正式发票。月度服务可随时取消，需提前 30 天通知。</span>' : '');
}

// Attach the built plan to the inquiry form and scroll there.
function requestPlan() {
  const { items, monthly, setup } = computeTotals();
  if (items.length === 0) return;
  PLAN = { ids: items.map((i) => i.id), monthly, setup };
  renderPlanAttach();
  document.getElementById('contact').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
}

function renderPlanAttach() {
  const box = document.getElementById('planAttach');
  if (!box) return;
  if (!PLAN) { box.innerHTML = ''; return; }
  const items = PLAN.ids.map((id) => ALL_ITEMS[id]).filter(Boolean);
  const head = isZh() ? '随咨询发送的方案' : 'Plan included with this inquiry';
  const totals = isZh()
    ? `${fmt(PLAN.monthly)}/月 · 一次性 ${fmt(PLAN.setup)}`
    : `${fmt(PLAN.monthly)}/mo, plus ${fmt(PLAN.setup)} one-time`;
  box.innerHTML = `
    <div class="plan-attach">
      <div class="plan-attach-head">
        <span>${head}</span>
        <button type="button" class="plan-attach-remove" id="planRemove">${isZh() ? '移除' : 'Remove'}</button>
      </div>
      <div class="plan-attach-items">${items.map((i) => `<span class="plan-chip">${itemName(i)}</span>`).join('')}</div>
      <div class="plan-attach-total">${totals}</div>
    </div>`;
  document.getElementById('planRemove').addEventListener('click', () => {
    PLAN = null;
    renderPlanAttach();
  });
}

function wirePricing() {
  const onPickerClick = (e) => {
    const btn = e.target.closest('.price-item');
    if (btn) toggleItem(btn.getAttribute('data-id'));
  };
  document.getElementById('pbMonthly').addEventListener('click', onPickerClick);
  document.getElementById('pbSetup').addEventListener('click', onPickerClick);
  document.getElementById('pbCartArea').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (btn) toggleItem(btn.getAttribute('data-remove'));
  });
  document.getElementById('pbCheckout').addEventListener('click', requestPlan);
  document.getElementById('pbBarBtn').addEventListener('click', () => scrollToEl(document.querySelector('.pb-summary'), -80));
  // Show the bar only while the service list is on screen and the summary card is not
  const bar = document.getElementById('pbBar');
  if ('IntersectionObserver' in window) {
    let pickerVisible = false, summaryVisible = false;
    const sync = () => bar.classList.toggle('show', pickerVisible && !summaryVisible);
    new IntersectionObserver(([e]) => { pickerVisible = e.isIntersecting; sync(); })
      .observe(document.querySelector('.pb-picker'));
    new IntersectionObserver(([e]) => { summaryVisible = e.isIntersecting; sync(); }, { threshold: 0.15 })
      .observe(document.querySelector('.pb-summary-card'));
  }
  document.getElementById('pbReset').addEventListener('click', () => {
    selected.clear();
    refreshPlan();
  });
  // "Add to plan" anywhere on the page (gallery cards, video section) selects the item
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    const id = btn.getAttribute('data-add');
    const on = !selected.has(id);
    selectItem(id, on);
    refreshPlan();
    if (on) {
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      if (window.EO_MOTION && window.EO_MOTION.flyToPlan) window.EO_MOTION.flyToPlan(btn);
    }
  });
}

// ===== CONTACT FORM =====
// Inquiries go to a Google Apps Script web app on the EORACCO Google account:
// it emails the inquiry to the owner and logs it in a Google Sheet.
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzx78Q2Y21mVupBIMDqPxiqWJCRkzESUI-8NEMmzZtRkxem00wIsdDbH_jtpQPm_TNa/exec';
const CONTACT_EMAIL = 'eoraccoofficial@gmail.com';
function wireContact() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');
  const wrap = document.getElementById('contactFormWrap');

  const errBox = document.getElementById('formError');
  const checks = () => [
    [form.name, !!form.name.value.trim(), { en: 'your name', zh: '姓名' }],
    [form.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim()), { en: 'a valid email', zh: '有效邮箱' }],
    [form.agreed, form.agreed.checked, { en: 'agreement to the privacy policy', zh: '勾选同意隐私政策' }],
  ];
  const clearErr = (el) => {
    const box = el.closest('.field') || el.closest('.checkbox-row');
    if (box) box.classList.remove('is-invalid');
  };
  form.addEventListener('input', (e) => clearErr(e.target));
  form.addEventListener('change', (e) => clearErr(e.target));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.dataset.sending) return;
    const missing = checks().filter(([, ok]) => !ok);
    checks().forEach(([el, ok]) => {
      const box = el.closest('.field') || el.closest('.checkbox-row');
      if (box) box.classList.toggle('is-invalid', !ok);
    });
    if (missing.length) {
      const list = missing.map(([, , m]) => (isZh() ? m.zh : m.en));
      errBox.innerHTML = isZh()
        ? `请填写：${list.join('、')}`
        : `Please add ${list.join(', ')}.` + (isBi() ? `<span class="zh-line">请填写：${missing.map(([, , m]) => m.zh).join('、')}</span>` : '');
      errBox.hidden = false;
      missing[0][0].focus({ preventScroll: true });
      submitBtn.classList.remove('shake'); void submitBtn.offsetWidth; submitBtn.classList.add('shake');
      return;
    }
    errBox.hidden = true;
    submitBtn.dataset.sending = '1';
    const firstName = form.name.value.trim().split(' ')[0];
    const hadPlan = PLAN && PLAN.ids.length;
    const label = submitBtn.innerHTML;
    submitBtn.textContent = isZh() ? '正在发送…' : 'Sending…';

    const needSel = form.need;
    const planText = hadPlan
      ? PLAN.ids.map((id) => ALL_ITEMS[id]).filter(Boolean).map((i) => `${i.name} (${i.zh})`).join('; ')
        + ` | ${fmt(PLAN.monthly)}/mo + ${fmt(PLAN.setup)} one-time`
      : '';
    const data = new URLSearchParams({
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      business: form.business.value.trim(),
      phone: form.phone.value.trim(),
      need: needSel.value ? needSel.options[needSel.selectedIndex].text : '',
      message: form.message.value.trim(),
      plan: planText,
      lang: LANG,
      website: form.website ? form.website.value : '',   // honeypot: real people leave it empty
    });

    const done = () => {
      const planLine = hadPlan
        ? (isZh() ? `已附上您选择的 ${PLAN.ids.length} 项服务。` : `Your ${PLAN.ids.length}-service plan came with it.`)
        : '';
      wrap.innerHTML = `
        <div class="contact-success">
          <div class="check">${icon('check', 26)}</div>
          <h3>${isZh() ? '咨询已发送。' : 'Inquiry sent.'}</h3>
          <p>${isZh()
            ? `谢谢，${firstName}。${planLine}我们会在一个工作日内回复您。`
            : `Thanks, ${firstName}. ${planLine} We'll reply within one business day.`}
            ${isBi() ? '<span class="zh-line">咨询已发送，我们会在一个工作日内回复您。</span>' : ''}
          </p>
        </div>`;
    };
    const fail = () => {
      delete submitBtn.dataset.sending;
      submitBtn.innerHTML = label;
      const mail = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
      errBox.innerHTML = isZh()
        ? `发送失败，请稍后再试，或直接发邮件到 ${mail}。`
        : `That didn't go through. Please try again, or email us at ${mail}.`
          + (isBi() ? `<span class="zh-line">发送失败，请稍后再试，或直接发邮件到 ${mail}。</span>` : '');
      errBox.hidden = false;
    };

    fetch(FORM_ENDPOINT, { method: 'POST', body: data })
      .then((r) => r.json())
      .then((res) => (res && res.ok ? done() : fail()))
      .catch(fail);
  });
}

// ===== NAV =====
function wireNav() { /* handled by site.js */ }

// ===== LANGUAGE =====
function applyStatic() {
  const btnT = t(I18N.heroBtns);
  document.querySelectorAll('.hero-ctas-new .btn-label').forEach((el, i) => { el.textContent = btnT[i]; });

  Object.entries(I18N.secs).forEach(([id, s]) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const h2 = sec.querySelector('.sec-head h2');
    const p = sec.querySelector('.sec-head p:not(.contact-eyebrow)');
    if (h2) h2.innerHTML = secHeadHTML(s);
    if (p && s.desc) {
      p.innerHTML = (isZh() ? s.desc.zh : s.desc.en) + (isBi() ? `<span class="zh-line">${s.desc.zh}</span>` : '');
    }
  });

  const ch2 = document.getElementById('contactH2');
  if (ch2) ch2.innerHTML = t(I18N.contactH2);

  document.documentElement.lang = isZh() ? 'zh-CN' : 'en';
}

function setLang(lang) {
  LANG = lang;
  document.body.classList.remove('lang-en', 'lang-zh', 'lang-bi');
  document.body.classList.add('lang-' + lang);
  applyStatic();
  renderHero();
  renderStatement();
  renderFilm();
  renderWhy();
  renderChapters();
  renderApps();
  renderZoom();
  renderStats();
  renderSteps();
  renderPricingPickers();
  renderSummary();
  renderPlanAttach();
  if (window.EO_MOTION && window.EO_MOTION.rebuild) window.EO_MOTION.rebuild();
}

function wireLangToggle() {
  EO.onLang((l) => setLang(l));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  wirePricing();
  wireContact();
  wireNav();
  wireLangToggle();
  EO.plan.get().forEach((id) => { if (ALL_ITEMS[id]) selectItem(id, true); });
  setLang(LANG);
  EO.plan.set(Array.from(selected));
  // In-page anchors go through the smooth scroller when motion.js is running
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    scrollToEl(target, a.getAttribute('href') === '#top' ? 0 : -10);
  });
});
