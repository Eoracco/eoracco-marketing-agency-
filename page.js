// EORACCO — category pages (marketing / creative / apps).
// Renders from services-data.js; motion is progressive (GSAP + ScrollTrigger + Lenis when present).
(() => {
  const EO = window.EO;
  const key = document.body.dataset.page;
  const cat = EO.category(key);
  const main = document.getElementById('page');
  if (!cat || !main) return;

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tx = (o) => EO.tx(o);
  const zhLine = (o, cls = 'zh-line') => (EO.isBi() && o ? `<span class="${cls}">${o.zh}</span>` : '');
  const catName = cat.longName || cat.name;
  const T = {
    quote: { en: 'Get a quote', zh: '获取报价' },
    book: { en: 'Book a free call', zh: '预约免费通话' },
    plan: { en: 'Build your plan', zh: '自助配置方案' },
    add: { en: 'Add to plan', zh: '加入方案' },
    added: { en: 'In your plan', zh: '已加入方案' },
    ask: { en: 'Ask about this', zh: '咨询这项服务' },
    included: { en: 'What’s included', zh: '服务内容' },
    toastAdd: { en: 'Added to your plan.', zh: '已加入方案。' },
    toastRemove: { en: 'Removed from your plan.', zh: '已从方案移除。' },
    viewPlan: { en: 'View plan', zh: '查看方案' },
    steps: { en: 'How a project runs.', zh: '项目怎么进行。' },
    apps: { en: 'Apps we’ve shipped.', zh: '我们上线的 App。' },
    appsSub: { en: 'Live on the App Store today.', zh: '现已在 App Store 上架。' },
    store: { en: 'View on the App Store', zh: '在 App Store 查看' },
    ctaH: { en: 'Not sure which you need?', zh: '不确定需要哪一项？' },
    ctaP: { en: 'Tell us about the project on a free 30-minute call. We reply within one business day.',
            zh: '预约 30 分钟免费通话聊聊您的项目，我们会在一个工作日内回复。' },
    other: { en: 'Other services', zh: '其他服务' },
  };

  function mediaHTML(s) {
    if (s.video) {
      return `<figure class="svc-media"><video class="app-video" data-src="${s.video}" poster="${s.poster}" muted loop playsinline preload="none"></video>${s.imgNote ? `<figcaption>${tx(s.imgNote)}</figcaption>` : ''}</figure>`;
    }
    if (s.img) {
      return `<figure class="svc-media"><img src="${s.img}" alt="" loading="lazy" />${s.imgNote ? `<figcaption>${tx(s.imgNote)}</figcaption>` : ''}</figure>`;
    }
    return `<div class="svc-media svc-art art-${cat.key}" aria-hidden="true">
      <span class="art-grid"></span>
      <span class="art-icon">${EO.icon(s.icon, 120, 1)}</span>
      <span class="art-word">${tx(s.name)}</span>
    </div>`;
  }

  // technical spec sheet (websites): proof panel + grouped checklist
  function specHTML(s, planBtn) {
    const L2 = (en, zh) => tx({ en, zh });
    const T_ = (t) => `<span class="c-t">${t}</span>`, A = (a) => `<span class="c-a">${a}</span>`, V = (v) => `<span class="c-v">"${v}"</span>`;
    const lt = '<span class="c-p">&lt;</span>', gt = '<span class="c-p">&gt;</span>';
    const meta = (k, n, c) => `${lt}${T_('meta')} ${A(k)}=${V(n)} ${A('content')}=${V(c)}${gt}`;
    const code = [
      `${lt}${T_('title')}${gt}EORACCO — Bilingual Digital Marketing…${lt}/${T_('title')}${gt}`,
      meta('name', 'description', 'Bilingual (English + 中文) …'),
      `${lt}${T_('link')} ${A('rel')}=${V('canonical')} ${A('href')}=${V('https://eoracco.github.io/…/')}${gt}`,
      meta('property', 'og:title', 'EORACCO — Bilingual Digital…'),
      meta('property', 'og:image', '…/images/og-image.jpg'),
      meta('property', 'og:image:width', '1200'),
      meta('property', 'og:image:height', '630'),
      meta('property', 'og:locale', 'en_US'),
      meta('name', 'twitter:card', 'summary_large_image'),
      `${lt}${T_('script')} ${A('type')}=${V('application/ld+json')}${gt}{ <span class="c-v">"@type"</span>: <span class="c-v">"ProfessionalService"</span> }${lt}/${T_('script')}${gt}`,
    ];
    const lock = '<svg width="9" height="10" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M2 5V3.6a3 3 0 0 1 6 0V5h.4c.9 0 1.6.7 1.6 1.6v3.8c0 .9-.7 1.6-1.6 1.6H1.6C.7 12 0 11.3 0 10.4V6.6C0 5.7.7 5 1.6 5H2zm1.3 0h3.4V3.6a1.7 1.7 0 0 0-3.4 0V5z"/></svg>';
    const sys = '<span class="ip-sys"><i class="sig"></i><i class="wifi"></i><i class="bat"></i></span>';
    // a small demo site, drawn in code, shown on the laptop and the phone
    const demo = (mobile) => `
      <div class="demo ${mobile ? 'demo--m' : ''}">
        <div class="demo-nav"><b>Golden Noodle</b>${mobile ? '<span class="demo-burger"></span>' : '<span>Menu</span><span>Visit</span><span>Catering</span><span class="demo-lang">中文</span><span class="demo-cta">Order pickup</span>'}</div>
        <div class="demo-hero">
          <img src="images/reel/beef.webp" alt="" loading="lazy" />
          <div class="demo-copy"><small>SAN GABRIEL VALLEY</small><h4>Hand-pulled noodles,<br>made to order.</h4><span class="demo-btn">Order pickup</span></div>
        </div>
        <div class="demo-row">
          <figure><span style="background-image:url(images/reel/spicy.webp)"></span><figcaption>Spicy Beef</figcaption></figure>
          <figure><span style="background-image:url(images/reel/banquet.webp)"></span><figcaption>Family Feast</figcaption></figure>
          ${mobile ? '' : '<figure><span style="background-image:url(images/reel/beef.webp)"></span><figcaption>Braised Beef</figcaption></figure>'}
        </div>
        <div class="demo-visit"><div><small>VISIT</small><b>Open daily, 11 to 9</b><span>San Gabriel, California</span><span class="demo-btn demo-btn--dark">Get directions</span></div><span class="demo-map"><i></i></span></div>
        <div class="demo-foot"><b>Golden Noodle</b><span>English · 中文</span></div>
      </div>`;
    const specs = s.specs.map((g) => `
      <div class="as-row">
        <h3 class="as-h">${tx(g.title)}</h3>
        <ul class="as-list">${g.items.map((x) => `<li>${tx(x)}${zhLine(x)}</li>`).join('')}</ul>
      </div>`).join('');
    const works = (s.works || []).map((w) => `
      <a class="aw-card" href="${w.url}" target="_blank" rel="noopener">
        <div class="aw-shot"><div class="work-bar"><i></i><i></i><i></i><span class="work-url">${lock}${w.host}</span></div><img src="${w.img}" alt="${w.name}" loading="lazy" /></div>
        <div class="aw-meta"><b>${w.name}</b><span>${tx(w.desc)}</span><em>${w.stack.join(' · ')}</em></div>
      </a>`).join('');
    return `
    <article class="svc svc--apple" id="${s.id}">
      <header class="ap-head">
        <p class="ap-eyebrow">${tx(s.name)}</p>
        <h2 class="ap-title">${L2('Fast. Findable.<br>Shareable.', '打开快。搜得到。<br>分享好看。')}</h2>
        <p class="ap-sub">${tx(s.desc)}${zhLine(s.desc)}</p>
        <div class="ap-cta"><p class="svc-price">${EO.priceText(s.price)}</p><div class="svc-actions">${planBtn}</div></div>
      </header>

      <div class="ap-stage" aria-hidden="true">
        <div class="mbp">
          <div class="mbp-screen"><span class="mbp-notch"></span>
            <div class="mbp-menubar"><span><b>Safari</b>File&nbsp;&nbsp;Edit&nbsp;&nbsp;View&nbsp;&nbsp;History</span><span>Sat 9:41 AM</span></div>
            <div class="mbp-browser"><div class="work-bar"><i></i><i></i><i></i><span class="work-url">${lock}goldennoodle.example</span></div><div class="demo-vp">${demo(false)}</div></div>
          </div>
          <div class="mbp-base"><span></span></div>
        </div>
        <div class="ip">
          <div class="ip-screen"><span class="ip-island"></span><div class="ip-bar"><span>9:41</span>${sys}</div>${demo(true)}</div>
        </div>
      </div>
      <p class="ap-caption">${L2('A sample site, built for every screen. One codebase, tested on iPhone, Android and desktop.', '示例网站：一套代码适配所有屏幕，在 iPhone、Android 和电脑上实测。')}</p>

      <section class="ap-band ap-speed">
        <h3 class="ap-h">${L2('Built to Google’s “good” line.', '按 Google 的“良好”标准开发。')}</h3>
        <p class="ap-p">${L2('Core Web Vitals are how Google measures real-world speed. These are the thresholds we build every page to.', 'Core Web Vitals 是 Google 衡量真实加载体验的指标，我们每个页面都按这三条标准开发。')}</p>
        <div class="ap-metrics">
          <div class="ap-metric"><span class="ap-num"><i data-to="2.5" data-dec="1">0</i><small>s</small></span><b>LCP</b><span>${L2('Main content shows in under 2.5 seconds', '主要内容 2.5 秒内显示')}</span></div>
          <div class="ap-metric"><span class="ap-num"><i data-to="200" data-dec="0">0</i><small>ms</small></span><b>INP</b><span>${L2('Taps respond in under 200 milliseconds', '点击 200 毫秒内响应')}</span></div>
          <div class="ap-metric"><span class="ap-num"><i data-to="0.1" data-dec="1">0</i></span><b>CLS</b><span>${L2('Layout stays put while it loads', '加载时页面不乱跳')}</span></div>
        </div>
      </section>

      <section class="ap-band ap-share">
        <div class="ap-share-copy">
          <h3 class="ap-h">${L2('Looks right<br>wherever it’s shared.', '无论分享到哪里，<br>都好看。')}</h3>
          <p class="ap-p">${L2('Open Graph and X card tags give every page its own title, description and 1200 × 630 image, so a link in iMessage, WhatsApp, Facebook or LinkedIn becomes a proper preview.', '用 Open Graph 和 X 卡片标签，给每个页面设好标题、描述和 1200 × 630 的分享图。链接发到 iMessage、WhatsApp、Facebook 或 LinkedIn，都会显示完整的预览卡片。')}</p>
          <div class="code-win ap-code"><div class="code-bar"><i></i><i></i><i></i><span>index.html — &lt;head&gt;</span></div>
            <pre class="code-body">${code.map((l, k) => `<span class="ln"><em>${k + 1}</em>${l}</span>`).join('')}</pre></div>
        </div>
        <div class="ip ip--msg">
          <div class="ip-screen"><span class="ip-island"></span><div class="ip-bar"><span>9:41</span>${sys}</div>
            <div class="msg-head"><span class="msg-av">E</span><b>Emily</b></div>
            <div class="msg-body">
              <span class="msg-in">${L2('Who did your website?', '你们网站谁做的？')}</span>
              <div class="msg-link"><img src="images/og-image.jpg" alt="" loading="lazy" /><div><b>EORACCO — Bilingual Digital Marketing in Los Angeles</b><span>eoracco.github.io</span></div></div>
              <span class="msg-meta">${L2('Delivered', '已送达')}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="ap-band ap-specs">
        <h3 class="ap-h">${L2('Tech specs.', '技术规格。')}</h3>
        <div class="as-table">${specs}</div>
      </section>

      ${works ? `<section class="ap-band ap-work">
        <h3 class="ap-h">${L2('Recent builds.', '近期作品。')}</h3>
        <div class="aw-grid">${works}</div>
      </section>` : ''}

      <div class="ap-end"><p class="svc-price">${EO.priceText(s.price)}${s.note ? `<span class="svc-note">${tx(s.note)}</span>` : ''}</p><div class="svc-actions">${planBtn}</div></div>
    </article>`;
  }

  // iOS apps: midnight showcase with code-drawn iPhones
  function appShowHTML(s, planBtn) {
    const L2 = (en, zh) => tx({ en, zh });
    const steps = [
      { n: '01', t: L2('Design', '设计'), d: L2('Flows, screens and a clickable prototype you can try on your phone.', '流程、界面和可点击原型，直接在手机上试用。') },
      { n: '02', t: L2('Build', '开发'), d: L2('Native SwiftUI for iPhone and iPad, tested on real devices.', '用 SwiftUI 原生开发 iPhone 与 iPad，在真机上测试。') },
      { n: '03', t: L2('Ship', '上架'), d: L2('App Store listing, screenshots, review and launch.', 'App Store 页面、截图、审核和上线。') },
    ];
    return `
    <article class="svc svc--ios" id="${s.id}">
      <span class="ios-glow g1"></span><span class="ios-glow g2"></span><span class="ios-glow g3"></span>
      <header class="ios-head">
        <p class="ios-eyebrow">${tx(s.name)}</p>
        <h2 class="ios-title">${L2('Built native.<br>Built to ship.', '原生开发，<br>一直做到上架。')}</h2>
        <p class="ios-sub">${tx(s.desc)}${zhLine(s.desc)}</p>
      </header>
      <div class="ios-stage" aria-hidden="true">
        ${s.phones.map((src, k) => `<div class="ios-ph p${k}"><div class="ios-ph-in"><div class="ios-ph-scr"><span class="ios-isl"></span><img src="${src}" alt="" loading="lazy" /></div></div></div>`).join('')}
      </div>
      <div class="ios-apps">
        ${EO.APPS.map((a) => `<a class="ios-app" href="${a.url}" target="_blank" rel="noopener"><img src="${a.icon}" alt="" /><span><b>${a.name}</b><small>${tx(a.kind)}</small></span><em>${L2('View on the App Store', '在 App Store 查看')}</em></a>`).join('')}
      </div>
      <ol class="ios-steps">
        ${steps.map((x) => `<li><span class="ios-n">${x.n}</span><b>${x.t}</b><p>${x.d}</p></li>`).join('')}
      </ol>
      <div class="ios-end"><p class="svc-price">${EO.priceText(s.price)}</p><div class="svc-actions">${planBtn}</div></div>
    </article>`;
  }

  // full-bleed, cinema-dark showcase for video work
  function showcaseHTML(s, planBtn) {
    const snd = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path class="on" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg>`;
    const arrow = (d) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
    const pad = (k) => String(k).padStart(2, '0');
    return `
    <article class="svc svc--show" id="${s.id}">
      ${s.videos.map((v, k) => `<span class="trio-amb" data-k="${k}" style="background-image:url(${v.poster})"></span>`).join('')}
      <span class="show-grain" aria-hidden="true"></span>
      <div class="show-head">
        <span class="show-kicker">${EO.icon(s.icon, 16, 1.8)}<span>${tx(s.short)}</span></span>
        <h2 class="show-title">${tx(s.name)}</h2>
        ${zhLine(s.name, 'show-zh')}
        <p class="show-desc">${tx(s.desc)}${zhLine(s.desc)}</p>
      </div>
      <figure class="show-stage svc-trio">
        <div class="trio-stage">${s.videos.map((v, k) => `
          <div class="trio-clip" data-k="${k}"><video class="trio-video" data-src="${v.src}" poster="${v.poster}" muted playsinline preload="none"></video></div>`).join('')}
        </div>
      </figure>
      <div class="show-ctrl">
        <div class="show-meta">
          <span class="show-count"><b>01</b> / ${pad(s.videos.length)}</span>
          <span class="show-name">${s.videos.map((v, k) => `<span data-k="${k}">${tx(v.title)}</span>`).join('')}</span>
        </div>
        <div class="trio-bars">${s.videos.map(() => '<i><b></b></i>').join('')}</div>
        <div class="show-btns">
          <button type="button" class="show-btn trio-prev" aria-label="${tx({ en: 'Previous clip', zh: '上一条' })}">${arrow('M15 6l-6 6 6 6')}</button>
          <button type="button" class="show-btn trio-next" aria-label="${tx({ en: 'Next clip', zh: '下一条' })}">${arrow('M9 6l6 6-6 6')}</button>
          <button type="button" class="show-btn trio-sound" aria-pressed="false" aria-label="${tx({ en: 'Sound', zh: '声音' })}">${snd}</button>
        </div>
      </div>
      <div class="show-foot">
        <ul class="show-includes">${s.includes.map((x) => `<li>${EO.icon('check', 15, 2)}<span>${tx(x)}${zhLine(x)}</span></li>`).join('')}</ul>
        <div class="show-buy">
          <p class="svc-price">${EO.priceText(s.price)}</p>
          <div class="svc-actions">${planBtn}</div>
        </div>
      </div>
      ${s.imgNote ? `<p class="show-note">${tx(s.imgNote)}</p>` : ''}
    </article>`;
  }

  function serviceHTML(s, i) {
    const planBtn = s.plan
      ? `<button type="button" class="btn btn-primary btn-plan ${EO.plan.has(s.plan) ? 'is-added' : ''}" data-plan="${s.plan}">${tx(EO.plan.has(s.plan) ? T.added : T.add)}</button>
         <a class="link-chevron" href="index.html#contact"><span class="btn-label">${tx(T.ask)}</span></a>`
      : `<a class="btn btn-primary" href="index.html#contact">${tx(T.quote)}</a>`;
    if (s.showcase) return showcaseHTML(s, planBtn);
    if (s.spec) return specHTML(s, planBtn);
    if (s.appshow) return appShowHTML(s, planBtn);
    return `
    <article class="svc ${i % 2 ? 'svc--flip' : ''}" id="${s.id}">
      <div class="svc-copy">
        <span class="svc-icon">${EO.icon(s.icon, 26)}</span>
        <h2 class="svc-name">${tx(s.name)}</h2>
        ${zhLine(s.name, 'svc-zh')}
        <p class="svc-desc">${tx(s.desc)}${zhLine(s.desc)}</p>
        <p class="svc-label">${tx(T.included)}</p>
        <ul class="svc-includes">
          ${s.includes.map((x) => `<li>${EO.icon('check', 16, 2)}<span>${tx(x)}${zhLine(x)}</span></li>`).join('')}
        </ul>
        <p class="svc-price">${EO.priceText(s.price)}${s.note ? `<span class="svc-note">${tx(s.note)}</span>` : ''}</p>
        <div class="svc-actions">${planBtn}</div>
      </div>
      ${mediaHTML(s)}
    </article>`;
  }

  function heroVisual() {
    if (cat.key === 'apps') {
      // websites first, the app peeking in front
      const win = (cls, host, img) => `<div class="hv-win ${cls}"><div class="work-bar"><i></i><i></i><i></i><span class="work-url"><svg width="9" height="10" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M2 5V3.6a3 3 0 0 1 6 0V5h.4c.9 0 1.6.7 1.6 1.6v3.8c0 .9-.7 1.6-1.6 1.6H1.6C.7 12 0 11.3 0 10.4V6.6C0 5.7.7 5 1.6 5H2zm1.3 0h3.4V3.6a1.7 1.7 0 0 0-3.4 0V5z"/></svg>${host}</span></div><img src="${img}" alt="${host}" /></div>`;
      const app = EO.APPS[0];
      return `<div class="cat-visual cat-visual--web">
        ${win('hv-back', 'soplo.dev', 'images/work/soplo.webp')}
        ${win('hv-front', 'akuso.us', 'images/work/akuso.webp')}
        <div class="mini-phone hv-phone"><img src="${app.shot}" alt="${app.name}" /></div>
      </div>`;
    }
    return `<div class="cat-visual"><img src="${cat.card.hero || cat.card.img}" alt="" /></div>`;
  }

  function stepsHTML() {
    if (!cat.steps) return '';
    return `
    <section class="sec cat-steps" id="steps">
      <div class="container">
        <div class="sec-head"><h2>${tx(T.steps)}${zhLine(T.steps, 'h2-zh')}</h2></div>
        <div class="steps-wrap" id="stepsWrap">
          <div class="steps-line steps-line--4" aria-hidden="true"><span id="stepsLine"></span></div>
          <ol class="steps steps--4">
            ${cat.steps.map((st, i) => `
            <li class="step">
              <span class="step-num">${i + 1}</span>
              <h3 class="step-title">${tx(st.title)}</h3>
              ${EO.isBi() ? `<p class="step-title-zh">${st.title.zh}</p>` : ''}
              <p class="step-desc">${tx(st.desc)}${zhLine(st.desc)}</p>
            </li>`).join('')}
          </ol>
        </div>
        ${cat.footnote ? `<p class="cat-footnote">${tx(cat.footnote)}${zhLine(cat.footnote)}</p>` : ''}
      </div>
    </section>`;
  }

  function appsHTML() {
    if (cat.key !== 'apps') return '';
    return `
    <section class="sec apps" id="shipped">
      <div class="container">
        <div class="sec-head"><h2>${tx(T.apps)}<span class="h2-sub"> ${tx(T.appsSub)}</span>${EO.isBi() ? `<span class="h2-zh">${T.apps.zh}${T.appsSub.zh}</span>` : ''}</h2></div>
        <div class="apps-showcase">${window.EO_APPS.html()}</div>
      </div>
    </section>`;
  }

  function otherCatsHTML() {
    const others = EO.CATEGORIES.filter((c) => c.key !== cat.key);
    return `
    <section class="sec other-cats">
      <div class="container">
        <p class="svc-label">${tx(T.other)}</p>
        <div class="other-grid">
          ${others.map((c) => `
          <a class="other-card" href="${c.page}">
            <span class="other-icon">${EO.icon(c.icon, 28)}</span>
            <span class="other-name">${tx(c.longName || c.name)}${c.isNew ? `<sup class="nav-new">${EO.isZh() ? '新' : 'New'}</sup>` : ''}</span>
            <span class="other-sub">${tx(c.headline)}</span>
          </a>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function render() {
    document.title = `${tx(catName)} · EORACCO`;
    main.innerHTML = `
    <div class="localnav" id="localnav">
      <div class="localnav-inner">
        <span class="localnav-title">${tx(catName)}</span>
        <nav class="localnav-links" aria-label="${tx(catName)}">
          ${cat.services.map((s) => `<a href="#${s.id}">${tx(s.name)}</a>`).join('')}
        </nav>
        <a class="btn btn-small btn-dark" href="index.html#contact">${tx(T.quote)}</a>
      </div>
    </div>

    <section class="cat-hero">
      <div class="container cat-hero-inner">
        <h1 class="cat-title">${tx(cat.headline)}</h1>
        ${EO.isBi() ? `<p class="cat-title-zh">${cat.headline.zh}</p>` : ''}
        <p class="cat-sub">${tx(cat.sub)}${zhLine(cat.sub)}</p>
        <div class="cat-ctas">
          <a class="btn btn-primary" href="index.html#contact">${tx(T.book)}</a>
          <a class="link-chevron" href="index.html#pricing"><span class="btn-label">${tx(T.plan)}</span></a>
        </div>
      </div>
      ${heroVisual()}
    </section>

    <section class="svc-list">
      ${cat.services.map(serviceHTML).join('')}
    </section>

    ${stepsHTML()}
    ${appsHTML()}

    <section class="cat-cta">
      <div class="container">
        <h2>${tx(T.ctaH)}</h2>
        ${EO.isBi() ? `<p class="cat-cta-zh">${T.ctaH.zh}</p>` : ''}
        <p>${tx(T.ctaP)}${zhLine(T.ctaP)}</p>
        <div class="cat-ctas">
          <a class="btn btn-primary" href="index.html#contact">${tx(T.book)}</a>
          <a class="link-chevron" href="index.html#pricing"><span class="btn-label">${tx(T.plan)}</span></a>
        </div>
      </div>
    </section>

    ${otherCatsHTML()}`;
  }

  // ---------- plan buttons ----------
  main.addEventListener('click', (e) => {
    const b = e.target.closest('[data-plan]');
    if (!b) return;
    const id = b.getAttribute('data-plan');
    const on = EO.plan.toggle(id);
    b.classList.toggle('is-added', on);
    b.textContent = tx(on ? T.added : T.add);
    if (on) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    window.EO_TOAST && window.EO_TOAST(
      `${EO.icon('check', 16, 2)}<span>${tx(on ? T.toastAdd : T.toastRemove)}</span><a href="index.html#pricing">${tx(T.viewPlan)}</a>`);
  });

  // ---------- motion ----------
  let lenis = null;
  let ctx = null;
  const hasMotion = !REDUCED && window.gsap && window.ScrollTrigger;
  const localH = () => (document.getElementById('localnav') || { offsetHeight: 0 }).offsetHeight;
  const navH = () => (document.getElementById('nav') || { offsetHeight: 0 }).offsetHeight;

  function scrollToId(id, instant) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = -(navH() + localH() + 8);
    if (lenis) lenis.scrollTo(el, { offset, immediate: !!instant, duration: 1.3 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: instant ? 'auto' : 'smooth' });
  }

  function build(intro) {
    if (!hasMotion) return;
    const { gsap } = window;
    const EXPO = 'expo.out';
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EXPO } });
      if (intro) tl.from('.cat-title', { y: 60, opacity: 0, duration: 1.3 }, 0.12)
        .from('.cat-title-zh, .cat-sub', { y: 24, opacity: 0, duration: 1.1, stagger: 0.06 }, 0.35)
        .from('.cat-hero .cat-ctas > *', { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
        .from('.cat-visual', { y: 80, opacity: 0, scale: 0.94, duration: 1.6 }, 0.45);
      if (!intro) tl.kill();

      gsap.to('.cat-visual > img, .cat-visual .mini-phone, .cat-visual .hv-win', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.cat-hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.utils.toArray('.svc--show').forEach((show) => {
        gsap.from(show.querySelectorAll('.show-head > *'), { y: 40, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.07,
          scrollTrigger: { trigger: show, start: 'top 75%' } });
        gsap.fromTo(show.querySelector('.show-stage'), { scale: 0.86, yPercent: 8 }, { scale: 1, yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: show, start: 'top 85%', end: 'top 15%', scrub: 0.8 } });
        gsap.from(show.querySelectorAll('.show-ctrl, .show-foot > *, .show-note'), { y: 30, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
          scrollTrigger: { trigger: show.querySelector('.show-ctrl'), start: 'top 90%' } });
      });
      gsap.utils.toArray('.svc--apple').forEach((sp) => {
        gsap.from(sp.querySelectorAll('.ap-head > *'), { y: 40, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.07,
          scrollTrigger: { trigger: sp, start: 'top 78%' } });
        // devices: laptop rises and settles, phone slides in from the right
        const stage = sp.querySelector('.ap-stage');
        gsap.fromTo(stage.querySelector('.mbp'), { y: 120, scale: 0.88, opacity: 0.4 }, { y: 0, scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top 95%', end: 'top 30%', scrub: 0.8 } });
        gsap.fromTo(stage.querySelector('.ip'), { xPercent: 60, y: 80, opacity: 0 }, { xPercent: 0, y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top 70%', end: 'top 20%', scrub: 0.8 } });
        gsap.fromTo(stage.querySelectorAll('.mbp .demo-hero img, .ip .demo-hero img'), { scale: 1.15 }, { scale: 1, ease: 'none',
          scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true } });
        // metrics count up
        sp.querySelectorAll('.ap-num i').forEach((el) => {
          const to = parseFloat(el.dataset.to), dec = parseInt(el.dataset.dec, 10) || 0, o = { v: 0 };
          gsap.to(o, { v: to, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = o.v.toFixed(dec); },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        });
        gsap.from(sp.querySelectorAll('.ap-metric'), { y: 50, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.1,
          scrollTrigger: { trigger: sp.querySelector('.ap-metrics'), start: 'top 85%' } });
        // share: code lines type in, then the preview arrives in Messages
        const share = sp.querySelector('.ap-share');
        const ts = gsap.timeline({ scrollTrigger: { trigger: share, start: 'top 70%' } });
        ts.from(share.querySelectorAll('.ap-share-copy > .ap-h, .ap-share-copy > .ap-p'), { y: 30, opacity: 0, duration: 1.1, ease: EXPO, stagger: 0.08 }, 0)
          .from(share.querySelector('.ap-code'), { y: 40, opacity: 0, duration: 1.2, ease: EXPO }, 0.2)
          .from(share.querySelectorAll('.ap-code .ln'), { opacity: 0, x: -8, duration: 0.4, stagger: 0.07 }, 0.5)
          .from(share.querySelector('.ip--msg'), { y: 60, opacity: 0, duration: 1.3, ease: EXPO }, 0.3)
          .from(share.querySelector('.msg-in'), { scale: 0.6, opacity: 0, transformOrigin: '0% 100%', duration: 0.6, ease: 'back.out(1.6)' }, 1.0)
          .from(share.querySelector('.msg-link'), { scale: 0.6, opacity: 0, transformOrigin: '100% 100%', duration: 0.8, ease: 'back.out(1.4)' }, 1.5)
          .from(share.querySelector('.msg-meta'), { opacity: 0, duration: 0.4 }, 2.1);
        gsap.from(sp.querySelectorAll('.as-row'), { y: 30, opacity: 0, duration: 1, ease: EXPO, stagger: 0.06,
          scrollTrigger: { trigger: sp.querySelector('.as-table'), start: 'top 85%' } });
        gsap.from(sp.querySelectorAll('.aw-card'), { y: 60, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.12,
          scrollTrigger: { trigger: sp.querySelector('.aw-grid') || sp, start: 'top 85%' } });
      });
      gsap.utils.toArray('.svc--ios').forEach((io) => {
        gsap.from(io.querySelectorAll('.ios-head > *'), { y: 40, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.07,
          scrollTrigger: { trigger: io, start: 'top 75%' } });
        // phones rise from one stack and fan out as the section scrolls in
        const ph = io.querySelectorAll('.ios-ph');
        const spread = [-2, -1, 0, 1, 2];
        ph.forEach((el, k) => {
          const d = spread[k] || 0;
          gsap.fromTo(el, { xPercent: -d * 92, yPercent: 30, rotate: 0, scale: 0.9 },
            { xPercent: 0, yPercent: 0, rotate: d * 2.2, scale: 1, ease: 'none',
              scrollTrigger: { trigger: io.querySelector('.ios-stage'), start: 'top 95%', end: 'top 25%', scrub: 0.9 } });
        });
        gsap.fromTo(io.querySelectorAll('.ios-glow'), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, ease: 'none',
          scrollTrigger: { trigger: io, start: 'top 90%', end: 'top 20%', scrub: true } });
        gsap.from(io.querySelectorAll('.ios-app, .ios-steps li, .ios-end'), { y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
          scrollTrigger: { trigger: io.querySelector('.ios-apps'), start: 'top 88%' } });
        // pointer tilt
        const stage = io.querySelector('.ios-stage');
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          io.addEventListener('pointermove', (e) => {
            const r = io.getBoundingClientRect();
            stage.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'deg');
            stage.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 6 + 'deg');
          });
          io.addEventListener('pointerleave', () => { stage.style.setProperty('--ry', '0deg'); stage.style.setProperty('--rx', '0deg'); });
        }
      });
      // web stage: the demo site scrolls inside the devices
      gsap.utils.toArray('.svc--apple').forEach((sp) => {
        const st = sp.querySelector('.ap-stage');
        if (!st) return;
        st.querySelectorAll('.demo').forEach((d) => {
          gsap.fromTo(d, { yPercent: 0 }, { yPercent: d.classList.contains('demo--m') ? -38 : -30, ease: 'none',
            scrollTrigger: { trigger: st, start: 'top 20%', end: 'bottom top', scrub: 0.6 } });
        });
      });
      gsap.utils.toArray('.svc:not(.svc--show):not(.svc--spec):not(.svc--apple):not(.svc--ios)').forEach((svc) => {
        const copy = svc.querySelectorAll('.svc-copy > *');
        const media = svc.querySelector('.svc-media');
        const t2 = gsap.timeline({ scrollTrigger: { trigger: svc, start: 'top 80%' } });
        t2.from(media, { clipPath: 'inset(12% 12% 12% 12% round 32px)', opacity: 0, duration: 1.4, ease: 'power3.out' }, 0)
          .from(copy, { y: 36, opacity: 0, duration: 1.1, ease: EXPO, stagger: 0.05 }, 0.1);
        const img = svc.querySelector('.svc-media img');
        if (img) {
          gsap.fromTo(img, { scale: 1.12 }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: svc, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
        const art = svc.querySelector('.art-icon');
        if (art) {
          gsap.fromTo(art, { yPercent: 12, rotate: -6 }, {
            yPercent: -12, rotate: 6, ease: 'none',
            scrollTrigger: { trigger: svc, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
      });

      if (document.getElementById('stepsWrap')) {
        const steps = gsap.utils.toArray('.step');
        const wide = window.matchMedia('(min-width: 835px)').matches;
        const t3 = gsap.timeline({ scrollTrigger: { trigger: '#stepsWrap', start: 'top 78%', end: 'bottom 55%', scrub: 0.6 } });
        t3.fromTo('#stepsLine', wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: steps.length });
        steps.forEach((s, i) => t3.fromTo(s, { opacity: 0.22, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, i * 0.9));
      }

      if (window.EO_APPS && document.querySelector('.app-show')) window.EO_APPS.animate();
      gsap.from('.cat-cta .container > *', { y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.07,
        scrollTrigger: { trigger: '.cat-cta', start: 'top 80%' } });
      gsap.from('.other-card', { y: 50, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: '.other-grid', start: 'top 85%' } });
      gsap.from('.footer-word', { yPercent: 40, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 45%', scrub: true } });
    }, main);
  }

  function initMotion() {
    if (!hasMotion) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('has-motion');
    if (window.Lenis) {
      lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.EO_MOTION = { lenis, scrollTo: (el, off) => (lenis ? lenis.scrollTo(el, { offset: off }) : el.scrollIntoView()) };
  }

  // in-page links (local nav) use the smooth scroller and account for both bars
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    scrollToId(id);
  });

  // local nav: highlight the service in view
  let localIO = null;
  window.addEventListener('scroll', () => {
    const lnav = document.getElementById('localnav');
    if (lnav) lnav.classList.toggle('is-stuck', lnav.getBoundingClientRect().top <= navH() + 1);
  }, { passive: true });
  function wireLocalNav() {
    if (!('IntersectionObserver' in window)) return;
    const links = [...main.querySelectorAll('.localnav-links a')];
    if (localIO) localIO.disconnect();
    const io = localIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    main.querySelectorAll('.svc').forEach((s) => io.observe(s));
  }

  // play service videos only while they're on screen; one clip with sound at a time
  let vidIO = null;
  function wireVideos() {
    if (window.EO_APPS) { window.EO_APPS.wireVideos(main); }
    else if ('IntersectionObserver' in window) {
      if (vidIO) vidIO.disconnect();
      vidIO = new IntersectionObserver((entries) => entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        else if (!v.paused) { v.pause(); v.muted = true; const b = v.parentElement.querySelector('.trio-sound'); if (b) b.setAttribute('aria-pressed', 'false'); }
      }), { threshold: 0.25 });
      main.querySelectorAll('.app-video').forEach((v) => vidIO.observe(v));
    }
    main.querySelectorAll('.svc--show').forEach(wireTrio);
  }

  // three clips rotating through the centre; only the centre one plays
  function wireTrio(fig) {
    const root = fig;
    fig = root.querySelector('.svc-trio');
    const names = [...root.querySelectorAll('.show-name > span')];
    const countEl = root.querySelector('.show-count b');
    const clips = [...fig.querySelectorAll('.trio-clip')];
    const vids = clips.map((c) => c.querySelector('video'));
    const bars = [...root.querySelectorAll('.trio-bars b')];
    const ambs = [...root.querySelectorAll('.trio-amb')];
    const sndBtn = root.querySelector('.trio-sound');
    const stage = fig.querySelector('.trio-stage');
    const n = clips.length;
    let cur = 1, live = false, sound = false, raf = 0;
    const POS = ['pos-c', 'pos-r', 'pos-l'];
    const layout = () => {
      clips.forEach((c, k) => { c.classList.remove(...POS); c.classList.add(POS[(k - cur + n) % n]); });
      ambs.forEach((a, k) => a.classList.toggle('is-on', k === cur));
      names.forEach((a, k) => a.classList.toggle('is-on', k === cur));
      if (countEl) countEl.textContent = String(cur + 1).padStart(2, '0');
      bars.forEach((b, k) => { b.style.transition = 'none'; b.style.width = k < cur ? '100%' : '0%'; });
    };
    const tick = () => {
      const v = vids[cur];
      if (v.duration) bars[cur].style.width = (v.currentTime / v.duration * 100) + '%';
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      vids.forEach((v, k) => { if (k !== cur) { v.pause(); v.muted = true; } });
      const v = vids[cur];
      if (!v.src) v.src = v.dataset.src;
      v.currentTime = 0; v.muted = !sound;
      const p = v.play(); if (p && p.catch) p.catch(() => {});
      cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    };
    const go = (k) => { cur = (k + n) % n; layout(); if (live) play(); };
    vids.forEach((v, k) => v.addEventListener('ended', () => { if (k === cur) go(cur + 1); }));
    clips.forEach((c, k) => c.addEventListener('click', () => { if (k !== cur) go(k); }));
    root.querySelector('.trio-prev').addEventListener('click', () => go(cur - 1));
    root.querySelector('.trio-next').addEventListener('click', () => go(cur + 1));
    sndBtn.addEventListener('click', () => {
      sound = !sound; sndBtn.setAttribute('aria-pressed', String(sound));
      const v = vids[cur]; v.muted = !sound;
      if (sound && v.paused) play();
    });
    // gentle 3D tilt toward the pointer
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.addEventListener('pointermove', (e) => {
        const r = fig.getBoundingClientRect();
        stage.style.setProperty('--ty', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg');
        stage.style.setProperty('--tx', -((e.clientY - r.top) / r.height - 0.5) * 6 + 'deg');
      });
      root.addEventListener('pointerleave', () => { stage.style.setProperty('--ty', '0deg'); stage.style.setProperty('--tx', '0deg'); });
    }
    layout();
    fig.classList.add('is-pre');
    if (!('IntersectionObserver' in window)) { fig.classList.remove('is-pre'); return; }
    new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        if (fig.classList.contains('is-pre')) {
          vids.forEach((v) => { if (!v.src) { v.src = v.dataset.src; v.preload = 'auto'; } });
          requestAnimationFrame(() => fig.classList.replace('is-pre', 'is-entering'));
          setTimeout(() => fig.classList.remove('is-entering'), 1800);
        }
        live = true; play();
      } else if (live) {
        live = false; cancelAnimationFrame(raf);
        vids.forEach((v) => v.pause());
        if (sound) { sound = false; sndBtn.setAttribute('aria-pressed', 'false'); }
      }
    }), { threshold: 0.3 }).observe(fig);
  }

  render();
  wireVideos();
  initMotion();
  build(true);
  wireLocalNav();

  EO.onLang(() => {
    if (ctx) ctx.revert();
    render();
    wireVideos();
    build();
    wireLocalNav();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });

  EO.plan.onChange(() => {
    main.querySelectorAll('[data-plan]').forEach((b) => {
      const on = EO.plan.has(b.getAttribute('data-plan'));
      b.classList.toggle('is-added', on);
      b.textContent = tx(on ? T.added : T.add);
    });
  });

  window.addEventListener('load', () => {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const id = (location.hash || '').slice(1);
    if (id && document.getElementById(id)) setTimeout(() => scrollToId(id, true), 60);
  });
})();
