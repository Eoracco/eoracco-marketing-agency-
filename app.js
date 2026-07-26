// EORACCO Landing Page — vanilla JS

// ===== LANGUAGE STATE =====
// 'en' = English only · 'bi' = bilingual (default) · 'zh' = Chinese primary
let LANG = localStorage.getItem('eoracco-lang') || 'bi';

// ===== DATA =====
const WHY = [
  { icon: 'globe',    title: 'Bilingual EN + CN',      zh: '中英双语服务',
    desc: 'Native fluency in both English and Mandarin — across copy, calls, and creative.',
    desc_zh: '英语与普通话双母语水准，文案、通话、素材全覆盖。' },
  { icon: 'sparkles', title: 'AI-Powered Content',    zh: 'AI 内容系统',
    desc: 'A modern stack of AI-assisted ad creative, copy, and voice agents.',
    desc_zh: '以 AI 辅助的广告素材、文案与语音客服体系。' },
  { icon: 'pin',      title: 'SGV / SoCal Expertise', zh: '南加州本地专家',
    desc: 'Boots-on-the-ground knowledge of the San Gabriel Valley & Greater LA market.',
    desc_zh: '深耕圣盖博谷与大洛杉矶市场的本地经验。' },
  { icon: 'layers',   title: 'One Roof, Full Stack',  zh: '所有服务一站式',
    desc: 'Ads, social, creative, email, web, and AI voice — under a single team.',
    desc_zh: '广告、社媒、素材、邮件、网站与 AI 语音，一个团队全包。' },
];

const SERVICES = [
  { n: '01', icon: 'target', title: 'Paid Advertising',        zh: '付费广告投放',
    desc: 'Google Ads & Meta Ads management and continuous optimization.',
    desc_zh: '谷歌与 Meta 广告投放及持续优化。' },
  { n: '02', icon: 'share',  title: 'Social Media Management', zh: '社交媒体管理',
    desc: 'Content creation, scheduling, and community engagement done daily.',
    desc_zh: '内容创作、排期发布与社群互动，每日执行。' },
  { n: '03', icon: 'image',  title: 'Ad Creative',             zh: '广告素材制作',
    desc: 'High-converting static image creatives for every platform.',
    desc_zh: '高转化静态广告图，适配各平台。' },
  { n: '04', icon: 'film',   title: 'Video Creative',          zh: '视频制作',
    desc: 'Short-form video editing for ads, reels, and organic social — from $100 per video.',
    desc_zh: '短视频剪辑，适用于广告、Reels 与日常内容，每条 $100 起。',
    video: 'video/short-video-demo.mp4' },
  { n: '05', icon: 'mail',   title: 'Email & SMS Marketing',   zh: '邮件与短信营销',
    desc: 'Campaigns, automations, and performance reporting that compounds.',
    desc_zh: '邮件营销活动、自动化流程与效果报告。' },
  { n: '06', icon: 'phone',  title: 'Call Tracking',           zh: '电话来源追踪',
    desc: 'Know exactly which ads — and keywords — drive every phone call.',
    desc_zh: '精确追踪每通来电来自哪条广告与关键词。' },
  { n: '07', icon: 'mic',    title: 'AI Voice Agent',          zh: 'AI 智能电话接待',
    desc: '24/7 inbound call answering and lead qualification, auto-handled.',
    desc_zh: '24/7 自动接听来电并筛选意向客户。' },
  { n: '08', icon: 'code',   title: 'Web Management & SEO',    zh: '网站管理与 SEO',
    desc: 'Compliance, tracking setup, and ongoing SEO optimization.',
    desc_zh: '合规、追踪配置与持续 SEO 优化。' },
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
  'Setup Fees': '一次性配置',
};

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

const MARQUEE_LABELS = [
  'Google Ads', 'Meta Ads', 'TikTok Ads', 'AI Voice Agents', 'Email & SMS',
  'SEO & Web', 'Call Tracking', 'Bilingual EN / 中文', 'Ad Creative', 'Short-Form Video',
];

// ===== I18N — static strings =====
const I18N = {
  nav: {
    en: ['Services', 'Pricing', 'Process', 'Contact', 'Book a Call →'],
    bi: ['Services', 'Pricing', 'Process', 'Contact', 'Book a Call →'],
    zh: ['服务', '定价', '流程', '联系', '预约通话 →'],
  },
  heroBtns: {
    en: ['Book a Free Strategy Call', 'View Our Work'],
    bi: ['Book a Free Strategy Call', 'View Our Work'],
    zh: ['预约免费策略通话', '查看我们的服务'],
  },
  heroWords: {
    en: [[{ t: 'Full-Service' }], [{ t: 'Digital ' }, { t: 'Marketing.', ital: true }]],
    bi: [[{ t: 'Full-Service' }], [{ t: 'Digital ' }, { t: 'Marketing.', ital: true }]],
    zh: [[{ t: '一站式' }], [{ t: '数字' }, { t: '营销。', ital: true }]],
  },
  secs: {
    why: {
      eyebrow: { en: 'Why EORACCO', bi: 'Why EORACCO / 选择我们', zh: '选择我们' },
      title: { en: 'How we work different.', bi: 'How we work different.', zh: '我们的不同。' },
      sub: { en: 'One studio, two languages, the full stack.', bi: '我们的不同 · One studio, two languages, the full stack.', zh: '一个团队，两种语言，全套体系。' },
      desc: { en: 'Most agencies speak one language and ship one channel. We do both — fluently, locally, and end-to-end.',
              bi: 'Most agencies speak one language and ship one channel. We do both — fluently, locally, and end-to-end.',
              zh: '大多数机构只说一种语言、只做一个渠道。我们两者兼顾：流利、本地、端到端。' },
    },
    services: {
      eyebrow: { en: 'Services', bi: 'Services / 我们的服务', zh: '我们的服务' },
      title: { en: 'Eight services.', bi: 'Eight services.', zh: '八项服务。' },
      sub: { en: 'One team that handles every layer of your marketing.', bi: '一个团队 · One team that handles every layer of your marketing.', zh: '一个团队，承包您营销的每一层。' },
      desc: { en: 'A full marketing stack — from the first impression in the feed, to the call that closes the deal.',
              bi: 'A full marketing stack — from the first impression in the feed, to the call that closes the deal.',
              zh: '完整的营销体系：从信息流里的第一印象，到成交的那通电话。' },
    },
    pricing: {
      eyebrow: { en: 'Plan Builder', bi: 'Plan Builder / 自助配置', zh: '自助配置' },
      title: { en: 'Pick what you need.', bi: 'Pick what you need.', zh: '按需选择。' },
      sub: { en: 'Build your plan and send it with your inquiry.', bi: '挑选所需服务 · Build your plan, send it with your inquiry.', zh: '配置方案，随咨询一起发送。' },
      desc: { en: 'Toggle the services you want — the total updates live. Attach the plan to your inquiry and we confirm everything on a quick call.',
              bi: 'Toggle the services you want — the total updates live. Attach the plan to your inquiry and we confirm everything on a quick call.',
              zh: '勾选所需服务，总价实时更新。方案将附在咨询里，通话确认后再开始。' },
    },
    process: {
      eyebrow: { en: 'Process', bi: 'Process / 合作流程', zh: '合作流程' },
      title: { en: 'Three steps.', bi: 'Three steps.', zh: '三个步骤。' },
      sub: { en: 'From first call to ongoing collaboration.', bi: '合作流程 · From first call to ongoing collaboration.', zh: '从第一通电话到长期协作。' },
      desc: { en: 'No long onboarding, no big up-front commitments. Most clients are live within two weeks.',
              bi: 'No long onboarding, no big up-front commitments. Most clients are live within two weeks.',
              zh: '没有冗长的启动流程，无需大额预付。多数客户两周内上线。' },
    },
    contact: {
      eyebrow: { en: 'Get In Touch', bi: 'Get In Touch / 联系我们', zh: '联系我们' },
      title: { en: 'Hand off your marketing.', bi: 'Hand off your marketing.', zh: '把营销交给我们。' },
      sub: { en: "Let's talk shop.", bi: '把营销交给我们 · Let’s talk shop.', zh: '聊聊您的生意。' },
      desc: { en: "Tell us a little about your business. We'll respond within one business day with next steps — or a polite 'we're not the right fit.'",
              bi: "Tell us a little about your business. We'll respond within one business day with next steps — or a polite 'we're not the right fit.'",
              zh: '简单介绍您的业务，我们将在一个工作日内回复下一步安排。' },
    },
  },
  contactH2: {
    en: 'Book a free<br/>30-min call.',
    bi: 'Book a free<br/>30-min call.',
    zh: '预约 30 分钟<br/>免费通话。',
  },
  svcHint: {
    en: 'SCROLL →', bi: 'SCROLL · 横向滑动 →', zh: '继续滚动 · 横向浏览 →',
  },
  footerHeads: {
    en: ['Navigate', 'Contact', 'Legal'],
    bi: ['Navigate', 'Contact', 'Legal'],
    zh: ['导航', '联系', '条款'],
  },
};

const t = (obj) => obj[LANG] || obj.bi;

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
  'arrow-up-right':'<path d="M7 17 17 7M8 7h9v9"/>',
  'check':         '<path d="m5 12 5 5L20 7"/>',
};
function icon(name, size = 20) {
  const p = ICON_PATHS[name];
  if (!p) return '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

const fmt = (n) => '$' + n.toLocaleString();
const FX_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FX_FINE = window.matchMedia('(pointer: fine)').matches;

// ===== RENDER =====
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
  grid.innerHTML = WHY.map((w, i) => {
    const title = LANG === 'zh' ? w.zh : w.title;
    const sub = LANG === 'zh' ? w.title : w.zh;
    const desc = LANG === 'zh' ? w.desc_zh : w.desc;
    return `
    <div class="why-card">
      <span class="why-num">/ 0${i + 1}</span>
      <div class="why-icon">${icon(w.icon, 28)}</div>
      <div class="why-title">${title}</div>
      ${LANG === 'en' ? '' : `<div class="why-title-zh ${LANG === 'zh' ? '' : 'zh'}">${sub}</div>`}
      <div class="why-desc">${desc}</div>
    </div>`;
  }).join('');
}

function renderServices() {
  const grid = document.getElementById('svcGrid');
  grid.innerHTML = SERVICES.map((s) => {
    const title = LANG === 'zh' ? s.zh : s.title;
    const sub = LANG === 'zh' ? s.title : s.zh;
    const desc = LANG === 'zh' ? s.desc_zh : s.desc;
    return `
    <div class="svc-card">
      <div class="svc-media">
        ${s.video
          ? `<video class="svc-video" src="${s.video}" autoplay muted loop playsinline preload="metadata" poster="images/svc-${s.n}.webp"></video>`
          : `<img class="svc-img" src="images/svc-${s.n}.webp" alt="${s.title}" loading="lazy" />`}
      </div>
      <div class="svc-body">
        <span class="svc-arrow">${icon('arrow-up-right', 16)}</span>
        <span class="svc-num">/ ${s.n}</span>
        <div class="svc-icon-wrap">${icon(s.icon, 20)}</div>
        <div class="svc-title">${title}</div>
        ${LANG === 'en' ? '' : `<div class="svc-title-zh ${LANG === 'zh' ? '' : 'zh'}">${sub}</div>`}
        <div class="svc-desc">${desc}</div>
      </div>
    </div>`;
  }).join('');
}

function renderSteps() {
  const c = document.getElementById('stepsContainer');
  c.innerHTML = STEPS.map((s) => {
    const title = LANG === 'zh' ? s.zh : s.title;
    const sub = LANG === 'zh' ? s.title : s.zh;
    const desc = LANG === 'zh' ? s.desc_zh
      : LANG === 'en' ? s.desc_en
      : `${s.desc_en}<span class="zh-line zh">${s.desc_zh}</span>`;
    return `
    <div class="step reveal">
      <div class="step-num">${s.n}</div>
      <div class="step-title">${title}</div>
      ${LANG === 'en' ? '' : `<div class="step-title-zh ${LANG === 'zh' ? '' : 'zh'}">${sub}</div>`}
      <div class="step-desc">${desc}</div>
    </div>`;
  }).join('');
}

// ===== PRICING PLAN BUILDER =====
const selected = new Set();
const ALL_ITEMS = {};
[...PRICING_MONTHLY, ...PRICING_SETUP].forEach((i) => { ALL_ITEMS[i.id] = i; });

// Plan attached to the inquiry form (set from the summary card)
let PLAN = null;

const itemName = (item) => (LANG === 'zh' ? item.zh : item.name);

function priceItemHTML(item, kind) {
  const isSel = selected.has(item.id);
  const tier = item.tier ? `<span class="tier">— ${item.tier}</span>` : '';
  const unit = kind === 'monthly' ? '<span class="unit">/mo</span>' : '';
  return `
    <button type="button" class="price-item ${isSel ? 'is-selected' : ''}" data-id="${item.id}" aria-pressed="${isSel}">
      <span class="price-item-check" aria-hidden="true">${isSel ? icon('check', 12) : ''}</span>
      <span class="price-item-body">
        <span class="price-item-name">${itemName(item)}${tier}</span>
      </span>
      <span class="price-item-amt">${fmt(item.price)}${unit}</span>
    </button>`;
}

function priceGroupHTML(title, zh, items, kind) {
  const gTitle = LANG === 'zh' ? (GROUP_ZH[title] || title) : title;
  const gSub = LANG === 'bi' && zh ? `<span class="price-group-zh zh">${zh}</span>` : '';
  return `<div class="price-group"><div class="price-group-head"><span class="price-group-title">${gTitle}</span>${gSub}</div><div class="price-group-items">${items.map((i) => priceItemHTML(i, kind)).join('')}</div></div>`;
}

function renderPricingPickers() {
  const groups = {};
  PRICING_MONTHLY.forEach((i) => { (groups[i.group] = groups[i.group] || []).push(i); });
  document.getElementById('pbMonthly').innerHTML =
    Object.entries(groups).map(([g, items]) => priceGroupHTML(g, GROUP_ZH[g], items, 'monthly')).join('');
  document.getElementById('pbSetup').innerHTML =
    priceGroupHTML('Setup Fees', '一次性配置', PRICING_SETUP, 'setup');
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

function computeTotals() {
  const items = [];
  let monthly = 0, setup = 0;
  selected.forEach((id) => {
    const it = ALL_ITEMS[id];
    if (!it) return;
    items.push(it);
    if (PRICING_MONTHLY.some((p) => p.id === id)) monthly += it.price;
    else setup += it.price;
  });
  return { items, monthly, setup };
}

function renderSummary() {
  const { items, monthly, setup } = computeTotals();
  const firstYear = monthly * 12 + setup;
  const count = items.length;

  document.getElementById('pbCount').textContent =
    LANG === 'zh' ? `${count} 项` : `${count} item${count === 1 ? '' : 's'}`;

  const cartArea = document.getElementById('pbCartArea');
  if (count === 0) {
    cartArea.innerHTML = `
      <div class="pb-empty">
        <div class="pb-empty-icon">+</div>
        ${LANG === 'zh'
          ? '<p>在左侧选择服务开始配置方案。</p>'
          : LANG === 'en'
            ? '<p>Pick services on the left to build your plan.</p>'
            : '<p>Pick services on the left to build your plan.</p><p class="zh-line zh">在左侧选择服务开始配置方案。</p>'}
      </div>`;
  } else {
    cartArea.innerHTML = `<ul class="pb-cart">${items.map((it) => {
      const tier = it.tier ? `<span class="tier">— ${it.tier}</span>` : '';
      const unit = PRICING_MONTHLY.some((p) => p.id === it.id) ? '<span class="unit">/mo</span>' : '';
      return `
        <li class="pb-cart-item">
          <div class="pb-cart-name">${itemName(it)}${tier}</div>
          <div class="pb-cart-right">
            <span class="pb-cart-price">${fmt(it.price)}${unit}</span>
            <button type="button" class="pb-cart-remove" data-remove="${it.id}" aria-label="Remove ${it.name}">×</button>
          </div>
        </li>`;
    }).join('')}</ul>`;
  }

  const L = {
    monthly: { en: 'Monthly recurring', bi: 'Monthly recurring <span class="zh">月费</span>', zh: '每月费用' },
    setup: { en: 'Setup, one-time', bi: 'Setup, one-time <span class="zh">一次性设置费</span>', zh: '一次性配置费' },
    grand: { en: 'First-year estimate', bi: 'First-year estimate <span class="zh">首年预估</span>', zh: '首年预估' },
  };
  document.querySelector('#pbMonthlyTotal').innerHTML = `${fmt(monthly)}<span class="unit">/mo</span>`;
  document.querySelector('#pbSetupTotal').textContent = fmt(setup);
  document.querySelector('#pbFirstYear').textContent = fmt(firstYear);
  document.querySelectorAll('.pb-total-row .pb-total-label')[0].innerHTML = t(L.monthly);
  document.querySelectorAll('.pb-total-row .pb-total-label')[1].innerHTML = t(L.setup);
  document.querySelectorAll('.pb-total-row .pb-total-label')[2].innerHTML = t(L.grand);

  const checkout = document.getElementById('pbCheckout');
  checkout.disabled = count === 0;
  checkout.innerHTML = count === 0
    ? (LANG === 'zh' ? '请先选择服务' : 'Select services to continue')
    : (LANG === 'zh' ? '预约咨询此方案 <span class="arrow">→</span>'
      : LANG === 'en' ? 'Request This Plan <span class="arrow">→</span>'
      : 'Request This Plan · 预约咨询 <span class="arrow">→</span>');

  document.getElementById('pbReset').disabled = count === 0;
  document.getElementById('pbReset').textContent = LANG === 'zh' ? '重置' : LANG === 'en' ? 'Reset' : 'Reset · 重置';
  document.getElementById('pbSecure').innerHTML = `${icon('check', 12)} ` +
    (LANG === 'zh' ? '现在无需付款，通话确认后开始'
      : LANG === 'en' ? 'No payment now — confirmed on a quick call'
      : 'No payment now · 通话确认后开始');

  document.querySelector('.pb-disclaimer').innerHTML =
    LANG === 'zh'
      ? '报价为估算，通话确认后开具正式发票。月费服务可随时取消，提前 30 天通知。'
      : LANG === 'en'
        ? 'Estimate only — final invoice confirmed after a brief strategy call. Cancel monthly services any time, 30-day notice.'
        : 'Estimate only — final invoice confirmed after a brief strategy call. Cancel monthly services any time, 30-day notice.<span class="zh-line zh">报价为估算，通话确认后开具正式发票。月费服务可随时取消，提前 30 天通知。</span>';
}

// Attach the built plan to the inquiry form and scroll there.
function requestPlan() {
  const { items, monthly, setup } = computeTotals();
  if (items.length === 0) return;
  PLAN = { ids: items.map((i) => i.id), monthly, setup };
  renderPlanAttach();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function renderPlanAttach() {
  const box = document.getElementById('planAttach');
  if (!box) return;
  if (!PLAN) { box.innerHTML = ''; return; }
  const items = PLAN.ids.map((id) => ALL_ITEMS[id]).filter(Boolean);
  const head = LANG === 'zh' ? '已选方案' : LANG === 'en' ? 'Selected plan' : 'Selected plan · 已选方案';
  const totals = `${fmt(PLAN.monthly)}/mo · ${fmt(PLAN.setup)} ${LANG === 'zh' ? '一次性' : 'setup'}`;
  const removeTxt = LANG === 'zh' ? '移除' : 'Remove';
  box.innerHTML = `
    <div class="plan-attach">
      <div class="plan-attach-head">
        <span>/ ${head}</span>
        <button type="button" class="plan-attach-remove" id="planRemove">× ${removeTxt}</button>
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
  document.getElementById('pbReset').addEventListener('click', () => {
    selected.clear();
    renderPricingPickers();
    renderSummary();
  });
}

// ===== CONTACT FORM =====
function wireContact() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');
  const wrap = document.getElementById('contactFormWrap');

  const validate = () => {
    submitBtn.disabled = !(form.name.value.trim() && form.email.value.trim() && form.agreed.checked);
  };
  form.addEventListener('input', validate);
  form.addEventListener('change', validate);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    const firstName = form.name.value.trim().split(' ')[0];
    const hadPlan = PLAN && PLAN.ids.length;
    submitBtn.disabled = true;
    submitBtn.innerHTML = LANG === 'zh' ? '发送中…' : 'Sending…';
    // Stand-in: a real integration would POST the form + PLAN somewhere.
    setTimeout(() => {
      const planLine = hadPlan
        ? (LANG === 'zh'
            ? `已附上您选择的 ${PLAN.ids.length} 项服务方案。`
            : `Your ${PLAN.ids.length}-service plan is attached.`)
        : '';
      wrap.innerHTML = `
        <div class="contact-success">
          <div class="check">${icon('check', 26)}</div>
          <h3>${LANG === 'zh' ? '已收到您的咨询。' : 'Inquiry received.'}</h3>
          <p>${LANG === 'zh'
            ? `谢谢，${firstName}。${planLine}我们将在一个工作日内回复您。`
            : `Thanks, ${firstName}. ${planLine} We'll be in touch within one business day.`}
            ${LANG === 'bi' ? '<span class="zh-line zh">已收到，我们将在一个工作日内回复您。</span>' : ''}
          </p>
        </div>`;
    }, 700);
  });
}

// ===== NAV =====
function wireNav() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== LANGUAGE TOGGLE =====
function applyStatic() {
  // nav links
  const links = document.querySelectorAll('.nav-links .nav-link');
  const navT = t(I18N.nav);
  links.forEach((a, i) => { a.textContent = navT[i] || a.textContent; });

  // hero buttons
  const btnT = t(I18N.heroBtns);
  document.querySelectorAll('.hero-ctas-new .btn-label').forEach((el, i) => { el.textContent = btnT[i]; });

  // section heads
  Object.entries(I18N.secs).forEach(([id, s]) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const eyebrow = sec.querySelector('.eyebrow');
    const h2 = sec.querySelector('.sec-head h2');
    const p = sec.querySelector('.sec-head p');
    if (eyebrow) eyebrow.textContent = t(s.eyebrow);
    if (h2) h2.innerHTML = `${t(s.title)}<span class="zh-sub">${t(s.sub)}</span>`;
    if (p) p.textContent = t(s.desc);
  });

  // contact display h2
  const ch2 = document.getElementById('contactH2');
  if (ch2) ch2.innerHTML = t(I18N.contactH2);

  // services scroll hint
  const hint = document.querySelector('.svc-hint');
  if (hint) hint.textContent = t(I18N.svcHint);

  // footer column heads
  const heads = document.querySelectorAll('.footer h4');
  const fh = t(I18N.footerHeads);
  heads.forEach((h, i) => { h.textContent = fh[i] || h.textContent; });

  document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : 'en';
}

function splitHeroChars() {
  const h1 = document.querySelector('.hero-display');
  if (!h1) return;
  const rows = t(I18N.heroWords);
  const delays = [0.15, 0.3];
  h1.innerHTML = rows.map((row, ri) =>
    `<span class="row">${row.map((w, wi) => {
      const cls = 'word' + (w.ital ? ' ital' : '');
      const base = delays[ri] + wi * 0.12;
      if (FX_REDUCED) return `<span class="${cls}" style="animation:none;opacity:1;transform:none">${w.t}</span>`;
      const chars = [...w.t].map((ch, i) =>
        ch.trim() === '' ? ch : `<span class="char" style="animation-delay:${(base + i * 0.045).toFixed(3)}s">${ch}</span>`
      ).join('');
      return `<span class="${cls}" style="animation:none;opacity:1;transform:none">${chars}</span>`;
    }).join('')}</span>`
  ).join('');
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem('eoracco-lang', lang);
  document.body.classList.remove('lang-en', 'lang-zh');
  if (lang === 'en') document.body.classList.add('lang-en');
  if (lang === 'zh') document.body.classList.add('lang-zh');
  document.querySelectorAll('#langToggle button').forEach((b) =>
    b.classList.toggle('active', b.dataset.lang === lang));
  applyStatic();
  splitHeroChars();
  renderWhy();
  renderServices();
  renderSteps();
  renderPricingPickers();
  renderSummary();
  renderPlanAttach();
  window.dispatchEvent(new Event('resize')); // re-measure the horizontal track
}

function wireLangToggle() {
  document.getElementById('langToggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-lang]');
    if (btn) setLang(btn.dataset.lang);
  });
}

// ===== REVEALS =====
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

  document.querySelectorAll('.reveal-stagger').forEach((container) => {
    const step = container.classList.contains('svc-grid') ? 70 : 90;
    Array.from(container.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * step}ms`;
    });
  });

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
  let travel = 0;

  const layout = () => {
    if (!mq.matches || FX_REDUCED) {
      wrap.style.height = 'auto';
      track.style.transform = '';
      return;
    }
    travel = track.scrollWidth - window.innerWidth;
    wrap.style.height = (window.innerHeight + travel) + 'px';
    update();
  };

  const update = () => {
    if (!mq.matches || FX_REDUCED) return;
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

// ===== FX PACK =====
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
  wirePricing();
  wireContact();
  wireNav();
  wireLangToggle();
  setLang(LANG);          // renders why/services/steps/pricing + statics + hero chars
  wireReveals();
  wireServicesHScroll();
  wireCursor();
  wireMagnetic();
  wireGlare();
  wireChrome();
  wireRipple();
  wireGhosts();
});
