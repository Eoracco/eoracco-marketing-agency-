// EORACCO — shared chrome for every page: navigation (desktop flyout + mobile sheet),
// language toggle, footer and the plan counter. Depends on services-data.js.
(() => {
  const EO = window.EO;
  const page = document.body.dataset.page || 'home';
  const isHome = page === 'home';
  const home = isHome ? '' : 'index.html';
  const HREF = {
    top: isHome ? '#top' : 'index.html',
    pricing: home + '#pricing',
    contact: home + '#contact',
    process: home + '#process',
  };
  const T = {
    pricing: { en: 'Pricing', zh: '定价' },
    contact: { en: 'Contact', zh: '联系' },
    book: { en: 'Book a call', zh: '预约通话' },
    explore: { en: 'Explore', zh: '浏览' },
    all: { en: 'All services', zh: '全部服务' },
    quick: { en: 'Quick links', zh: '快速链接' },
    startingAt: { en: 'Starting at', zh: '起步价' },
    buildPlan: { en: 'Build your plan', zh: '自助配置方案' },
    howItWorks: { en: 'How we work', zh: '合作流程' },
    newTag: { en: 'New', zh: '新' },
    menu: { en: 'Menu', zh: '菜单' },
    close: { en: 'Close', zh: '关闭' },
    services: { en: 'Services', zh: '服务' },
    company: { en: 'Company', zh: '公司' },
    legal: { en: 'Legal', zh: '条款' },
  };
  const tx = (o) => EO.tx(o);
  const zhSub = (o) => (EO.isBi() && o ? `<span class="zh-inline">${o.zh}</span>` : '');
  const catName = (c) => tx(c.longName || c.name);
  const svcHref = (c, s) => (page === c.key ? `#${s.id}` : `${c.page}#${s.id}`);

  // ---------- markup ----------
  function navHTML() {
    const cats = EO.CATEGORIES.map((c) => `
      <div class="nav-item" data-cat="${c.key}">
        <a class="nav-link nav-cat ${page === c.key ? 'is-current' : ''}" href="${c.page}" aria-haspopup="true" aria-expanded="false" aria-controls="flyout-${c.key}">
          ${tx(c.name)}${c.isNew ? `<sup class="nav-new">${tx(T.newTag)}</sup>` : ''}
        </a>
      </div>`).join('');
    const count = EO.plan.get().length;
    return `
    <div class="nav-inner">
      <a href="${HREF.top}" class="brand" aria-label="EORACCO home"><span class="brand-mark" aria-hidden="true"></span>EORACCO</a>
      <nav class="nav-links" aria-label="Primary">
        ${cats}
        <a class="nav-link" href="${HREF.pricing}">${tx(T.pricing)}<span class="nav-count" ${count ? '' : 'hidden'}>${count}</span></a>
        <a class="nav-link" href="${HREF.contact}">${tx(T.contact)}</a>
        <a class="nav-link cta-mini" href="${HREF.contact}">${tx(T.book)}</a>
      </nav>
      <div class="lang-toggle" id="langToggle" role="group" aria-label="Language">
        <button type="button" data-lang="en">EN</button>
        <button type="button" data-lang="bi">双语</button>
        <button type="button" data-lang="zh">中文</button>
      </div>
      <a class="nav-link cta-mini nav-cta-mobile" href="${HREF.contact}">${tx(T.book)}</a>
      <button type="button" class="nav-burger" id="navBurger" aria-label="${tx(T.menu)}" aria-expanded="false" aria-controls="navSheet">
        <span></span><span></span>
      </button>
    </div>
    <div class="nav-flyout" id="navFlyout">
      ${EO.CATEGORIES.map((c) => `
      <div class="flyout-panel" id="flyout-${c.key}" data-cat="${c.key}" role="region" aria-label="${catName(c)}">
        <div class="flyout-inner">
          <div class="flyout-col flyout-col--main">
            <p class="flyout-label">${tx(T.explore)} ${catName(c)}</p>
            <ul>
              ${c.services.map((s) => `<li><a class="flyout-big" href="${svcHref(c, s)}">${tx(s.name)}${zhSub(s.name)}</a></li>`).join('')}
            </ul>
          </div>
          <div class="flyout-col">
            <p class="flyout-label">${tx(T.startingAt)}</p>
            <ul>${c.services.map((s) => `<li class="flyout-price"><span>${tx(s.name)}</span><span>${EO.priceText(s.price)}</span></li>`).join('')}</ul>
          </div>
          <div class="flyout-col">
            <p class="flyout-label">${tx(T.quick)}</p>
            <ul>
              <li><a href="${c.page}">${tx(T.all)}: ${catName(c)}</a></li>
              <li><a href="${HREF.pricing}">${tx(T.buildPlan)}</a></li>
              <li><a href="${HREF.process}">${tx(T.howItWorks)}</a></li>
              <li><a href="${HREF.contact}">${tx(T.book)}</a></li>
            </ul>
          </div>
        </div>
      </div>`).join('')}
    </div>
    <div class="nav-sheet" id="navSheet" data-lenis-prevent>
      <div class="sheet-inner">
        ${EO.CATEGORIES.map((c) => `
        <div class="sheet-group">
          <button type="button" class="sheet-cat" aria-expanded="false">
            <span>${tx(c.name)}${c.isNew ? `<sup class="nav-new">${tx(T.newTag)}</sup>` : ''}${zhSub(c.name)}</span>
            <span class="sheet-chev">${EO.icon('chevron', 22, 2)}</span>
          </button>
          <ul class="sheet-list">
            <li><a class="sheet-all" href="${c.page}">${tx(T.all)}: ${catName(c)}</a></li>
            ${c.services.map((s) => `<li><a href="${svcHref(c, s)}">${tx(s.name)}<span class="sheet-price">${EO.priceText(s.price)}</span></a></li>`).join('')}
          </ul>
        </div>`).join('')}
        <a class="sheet-link" href="${HREF.pricing}">${tx(T.pricing)}</a>
        <a class="sheet-link" href="${HREF.contact}">${tx(T.contact)}</a>
        <a class="btn btn-primary sheet-cta" href="${HREF.contact}">${tx(T.book)}</a>
      </div>
    </div>
    <div class="nav-scrim" id="navScrim" aria-hidden="true"></div>`;
  }

  function footerHTML() {
    return `
    <div class="container">
      <p class="footer-word" aria-hidden="true">EORACCO</p>
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${HREF.top}" class="brand"><span class="brand-mark" aria-hidden="true"></span>EORACCO</a>
          <p>Bilingual digital marketing, San Gabriel Valley &amp; Los Angeles.</p>
          <p class="zh">一站式双语数字营销 · 南加州 SGV / LA</p>
        </div>
        <div>
          <h4>${tx(T.services)}</h4>
          <div class="footer-links">${EO.CATEGORIES.map((c) => `<a href="${c.page}">${catName(c)}</a>`).join('')}</div>
        </div>
        <div>
          <h4>${tx(T.company)}</h4>
          <div class="footer-links">
            <a href="${HREF.pricing}">${tx(T.pricing)}</a>
            <a href="${HREF.process}">${tx(T.howItWorks)}</a>
            <a href="${HREF.contact}">${tx(T.contact)}</a>
            <a href="mailto:eoraccoofficial@gmail.com">eoraccoofficial@gmail.com</a>
          </div>
        </div>
        <div>
          <h4>${tx(T.legal)}</h4>
          <div class="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Notice</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>Copyright © 2026 EORACCO. All rights reserved.</span>
        <span class="footer-lang">Serving English- and Chinese-speaking businesses<span class="zh"> · 服务华英双语市场</span></span>
      </div>
    </div>`;
  }

  // ---------- behaviour ----------
  const header = document.getElementById('nav');
  const footer = document.getElementById('siteFooter');
  let closeTimer = null;

  function openFlyout(key) {
    clearTimeout(closeTimer);
    header.classList.add('flyout-open');
    header.querySelectorAll('.flyout-panel').forEach((p) => p.classList.toggle('is-active', p.dataset.cat === key));
    header.querySelectorAll('.nav-cat').forEach((a) => {
      const on = a.closest('.nav-item').dataset.cat === key;
      a.setAttribute('aria-expanded', on);
      a.classList.toggle('is-open', on);
    });
    const panel = header.querySelector(`.flyout-panel[data-cat="${key}"]`);
    if (panel) header.style.setProperty('--flyout-h', panel.scrollHeight + 'px');
  }
  function closeFlyout(now) {
    clearTimeout(closeTimer);
    const go = () => {
      header.classList.remove('flyout-open');
      header.querySelectorAll('.nav-cat').forEach((a) => { a.setAttribute('aria-expanded', 'false'); a.classList.remove('is-open'); });
    };
    if (now) go(); else closeTimer = setTimeout(go, 160);
  }

  function setSheet(open) {
    header.classList.toggle('sheet-open', open);
    document.documentElement.classList.toggle('no-scroll', open);
    const b = document.getElementById('navBurger');
    if (b) { b.setAttribute('aria-expanded', open); b.setAttribute('aria-label', tx(open ? T.close : T.menu)); }
    const lenis = window.EO_MOTION && window.EO_MOTION.lenis;
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  }

  function wire() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    header.addEventListener('mouseover', (e) => {
      if (!fine.matches) return;
      if (e.target.closest('#navScrim')) { closeFlyout(); return; }
      const item = e.target.closest('.nav-item');
      if (item) openFlyout(item.dataset.cat);
      else if (e.target.closest('.nav-flyout')) clearTimeout(closeTimer);
      else if (e.target.closest('.nav-links, .brand, .lang-toggle')) closeFlyout();
    });
    header.addEventListener('mouseleave', () => closeFlyout());
    header.addEventListener('focusin', (e) => {
      const item = e.target.closest('.nav-item');
      if (item) openFlyout(item.dataset.cat);
      else if (!e.target.closest('.nav-flyout')) closeFlyout(true);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeFlyout(true); setSheet(false); }
    });

    header.addEventListener('click', (e) => {
      const lb = e.target.closest('#langToggle button[data-lang]');
      if (lb) { EO.setLang(lb.dataset.lang); return; }
      if (e.target.closest('#navScrim')) { closeFlyout(true); return; }
      if (e.target.closest('#navBurger')) { setSheet(!header.classList.contains('sheet-open')); return; }
      const cat = e.target.closest('.sheet-cat');
      if (cat) {
        const g = cat.closest('.sheet-group');
        const open = !g.classList.contains('is-open');
        header.querySelectorAll('.sheet-group').forEach((x) => { x.classList.remove('is-open'); x.querySelector('.sheet-cat').setAttribute('aria-expanded', 'false'); });
        g.classList.toggle('is-open', open);
        cat.setAttribute('aria-expanded', open);
        return;
      }
      const link = e.target.closest('a');
      if (link) { closeFlyout(true); setSheet(false); }
    });

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function syncLangUI(l) {
    document.body.classList.remove('lang-en', 'lang-zh', 'lang-bi');
    document.body.classList.add('lang-' + l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    header.querySelectorAll('#langToggle button').forEach((b) => {
      const on = b.dataset.lang === l;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on);
    });
  }

  function render() {
    const wasSheet = header.classList.contains('sheet-open');
    header.innerHTML = navHTML();
    if (footer) footer.innerHTML = footerHTML();
    syncLangUI(EO.lang);
    if (wasSheet) header.classList.add('sheet-open');
  }

  function updateCount(ids) {
    const n = ids.length;
    header.querySelectorAll('.nav-count').forEach((el) => { el.textContent = n; el.hidden = !n; });
  }

  render();
  wire();
  EO.onLang(() => render());
  EO.plan.onChange(updateCount);

  // small confirmation toast used by the category pages
  window.EO_TOAST = (html) => {
    let el = document.getElementById('eoToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'eoToast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.innerHTML = html;
    el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 4200);
  };
})();
