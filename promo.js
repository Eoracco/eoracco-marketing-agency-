// EORACCO — promotional products page (promo.html).
// Renders the curated catalogue from promo-data.js, keeps a quote list in memory,
// and sends the quote request to the same inquiry endpoint as the home-page contact form.
(() => {
  const EO = window.EO;
  const DATA = window.EO_PROMO;
  const main = document.getElementById('page');
  if (!EO || !DATA || !main) return;

  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzx78Q2Y21mVupBIMDqPxiqWJCRkzESUI-8NEMmzZtRkxem00wIsdDbH_jtpQPm_TNa/exec';
  const CONTACT_EMAIL = 'eoraccoofficial@gmail.com';
  const openedAt = Date.now();

  const tx = (o) => EO.tx(o);
  const isZh = () => EO.isZh();
  const isBi = () => EO.isBi();
  const L = (en, zh) => ({ en, zh });
  const zhLine = (o, cls = 'zh-line') => (isBi() && o ? `<span class="${cls}">${o.zh}</span>` : '');
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = Object.fromEntries(DATA.ITEMS.map((i) => [i.id, i]));

  const T = {
    kicker: L('Promotional products', '定制推广礼品'),
    sub: L('Gifts', '礼品'),
    navGifts: L('Gifts', '礼品'),
    navHow: L('How it works', '下单流程'),
    navQuote: L('Get a quote', '询价'),
    privacy: L('Privacy', '隐私政策'),
    terms: L('Terms', '服务条款'),
    facts: [L('Low minimums, from 12 pcs', '起订量低，12 件起'), L('Proof before production', '先确认打样稿再生产'), L('Quotes in English & 中文', '中英文报价沟通')],
    h1: L('Gifts people actually keep.', '让人舍不得扔的定制礼品。'),
    lede: L('A short list of branded gifts we like: tea sets, red envelopes, cork, candles, corduroy. Pick a few, and we’ll come back with prices and a mockup with your logo.',
            '我们挑过的一小批定制礼品：茶具、红包、软木、香薰、灯芯绒。选几样告诉我们，我们会回复报价，并做好印上您 logo 的效果图。'),
    browse: L('Browse the gifts', '浏览礼品'),
    ask: L('Ask for something else', '想要别的？问我们'),
    min: L('Min.', '起订'),
    pcs: L('pcs', '件'),
    add: L('Add to quote', '加入询价'),
    added: L('In your quote', '已加入询价'),
    stepsH: L('How an order works.', '下单流程。'),
    steps: [
      [L('Pick', '挑选'), L('Add the gifts you like and tell us roughly how many and when you need them.', '把喜欢的礼品加入询价，告诉我们大概数量和需要的日期。')],
      [L('Quote & mockup', '报价和效果图'), L('Within one business day we send prices and a mockup with your logo.', '一个工作日内，我们发给您报价和印上 logo 的效果图。')],
      [L('Approve & deliver', '确认后生产'), L('You approve a proof before anything is made. Most orders arrive in 2–3 weeks after that.', '生产前您会先确认打样稿，大部分订单在确认后 2–3 周送达。')],
    ],
    otherH: L('Looking for something not here?', '没看到想要的？'),
    otherP: L('We can source pens, tote bags, tumblers, T-shirts and thousands of other items. Tell us what you have in mind in the form below.',
              '笔、帆布袋、保温杯、T 恤等几千种产品我们都能找到。在下面的表单里告诉我们您的想法就行。'),
    formH: L('Request a quote', '提交询价'),
    formP: L('No commitment. We reply within one business day.', '不用先付款，我们会在一个工作日内回复。'),
    yourList: L('Your list', '您的询价清单'),
    empty: L('Nothing added yet. You can still send the form and describe what you need.', '还没有加入礼品。也可以直接提交表单，写下您的需求。'),
    remove: L('Remove', '移除'),
    name: L('Name', '姓名'),
    email: L('Email', '邮箱'),
    business: L('Business', '公司名称'),
    phone: L('Phone', '电话'),
    qty: L('Quantity & date needed', '数量和需要日期'),
    qtyPh: L('e.g. 200 pieces by Jan 20', '例如：200 件，1 月 20 日前'),
    msg: L('Anything else', '其他说明'),
    msgPh: L('Event, logo colors, where it will be used…', '活动用途、logo 颜色、使用场合等'),
    optional: L('optional', '选填'),
    agree: L('I agree to the <a href="../privacy.html">Privacy Policy</a> and to EORACCO contacting me about this quote.',
             '我同意<a href="../privacy.html">隐私政策</a>，并同意 EORACCO 就本次询价与我联系。'),
    send: L('Send quote request', '发送询价'),
    sending: L('Sending…', '正在发送…'),
    sentH: L('Quote request sent.', '询价已发送。'),
    sentP: L('Thanks. We’ll email prices and a mockup within one business day.', '谢谢！我们会在一个工作日内把报价和效果图发到您的邮箱。'),
    fail: L(`Something went wrong. Please email us at ${CONTACT_EMAIL}.`, `发送失败，请直接发邮件到 ${CONTACT_EMAIL}。`),
    barOne: L('gift in your quote', '件礼品已加入询价'),
    barMany: L('gifts in your quote', '件礼品已加入询价'),
    barGo: L('Request quote', '去询价'),
    need: L('your name', '姓名'),
    needEmail: L('a valid email', '有效邮箱'),
    needAgree: L('agreement to the privacy policy', '勾选同意隐私政策'),
    photoNote: L('Product photos are supplier samples; your order carries your own logo.', '产品图为供应商样品图，实际订单印您自己的 logo。'),
  };

  const state = { cat: 'all', list: [], sent: false };

  // ---------- markup ----------
  // four photos for the hero still life (tall one first)
  const HERO_IDS = ['EO-03', 'EO-02', 'EO-14', 'EO-20'];

  function heroHTML() {
    const tiles = HERO_IDS.map((id, n) => `
      <figure class="ghero-tile ghero-tile--${n + 1}">
        <img src="${byId[id].img}" alt="${esc(byId[id].name.en)}" ${n ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" />
        <figcaption>${tx(byId[id].name)}</figcaption>
      </figure>`).join('');
    return `
    <section class="ghero" id="top">
      <div class="container ghero-inner">
        <div class="ghero-copy">
          <p class="promo-kicker">${tx(T.kicker)}${zhLine(T.kicker, 'zh promo-kicker-zh')}</p>
          <h1 class="promo-h1">${tx(T.h1)}${zhLine(T.h1, 'zh-line promo-h1-zh')}</h1>
          <p class="promo-lede">${tx(T.lede)}${zhLine(T.lede)}</p>
          <div class="promo-hero-cta">
            <a class="btn btn-primary" href="#gifts">${tx(T.browse)}</a>
            <a class="btn btn-ghost" href="#quote">${tx(T.ask)}</a>
          </div>
          <ul class="ghero-facts">${T.facts.map((f) => `<li>${tx(f)}</li>`).join('')}</ul>
        </div>
        <div class="ghero-art" aria-hidden="false">${tiles}</div>
      </div>
    </section>`;
  }

  function navHTML() {
    const l = EO.lang;
    return `
    <div class="container gnav-inner">
      <a class="brand gnav-brand" href="#top" aria-label="EORACCO Gifts"><span class="brand-mark" aria-hidden="true"></span>EORACCO<span class="gnav-sub">${tx(T.sub)}</span></a>
      <nav class="gnav-links" aria-label="Gifts">
        <a href="#gifts">${tx(T.navGifts)}</a>
        <a href="#how">${tx(T.navHow)}</a>
      </nav>
      <div class="lang-toggle" role="group" aria-label="Language">
        ${['en', 'bi', 'zh'].map((k) => `<button type="button" data-lang="${k}" class="${l === k ? 'active' : ''}" aria-pressed="${l === k}">${{ en: 'EN', bi: '双语', zh: '中文' }[k]}</button>`).join('')}
      </div>
      <a class="btn btn-small btn-dark gnav-cta" href="#quote">${tx(T.navQuote)}</a>
    </div>`;
  }

  function footHTML() {
    return `
    <div class="container gfoot-inner">
      <span class="brand"><span class="brand-mark" aria-hidden="true"></span>EORACCO<span class="gnav-sub">${tx(T.sub)}</span></span>
      <span class="gfoot-links">
        <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        <a href="../privacy.html">${tx(T.privacy)}</a>
        <a href="../terms.html">${tx(T.terms)}</a>
      </span>
      <span class="gfoot-copy">© 2026 EORACCO · Los Angeles</span>
    </div>`;
  }

  function syncLang() {
    const l = EO.lang;
    document.body.classList.remove('lang-en', 'lang-zh', 'lang-bi');
    document.body.classList.add('lang-' + l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  }

  function chipsHTML() {
    return DATA.CATS.map((c) => `
      <button type="button" class="promo-chip ${state.cat === c.key ? 'is-on' : ''}" data-cat="${c.key}" aria-pressed="${state.cat === c.key}">
        ${tx(c.name)}${isBi() ? `<span class="zh">${c.name.zh}</span>` : ''}
      </button>`).join('');
  }

  function cardHTML(i) {
    const on = state.list.includes(i.id);
    const hidden = state.cat !== 'all' && state.cat !== i.cat;
    return `
      <article class="promo-card" data-id="${i.id}" data-cat="${i.cat}" ${hidden ? 'hidden' : ''}>
        <div class="promo-img"><img src="${i.img}" alt="${esc(i.name.en)}" loading="lazy" decoding="async" width="750" height="750" /></div>
        <div class="promo-body">
          <h3 class="promo-name">${tx(i.name)}${zhLine(i.name)}</h3>
          <p class="promo-note">${tx(i.note)}</p>
          <div class="promo-foot">
            <span class="promo-min">${tx(T.min)} ${i.min} ${tx(T.pcs)}</span>
            <button type="button" class="btn promo-add ${on ? 'is-added' : ''}" data-add="${i.id}" aria-pressed="${on}">${tx(on ? T.added : T.add)}</button>
          </div>
        </div>
      </article>`;
  }

  function stepsHTML() {
    return `
    <section class="promo-steps" id="how">
      <div class="container">
        <h2 class="promo-h2">${tx(T.stepsH)}${zhLine(T.stepsH)}</h2>
        <ol class="promo-steps-list">
          ${T.steps.map(([h, p], n) => `
          <li><span class="promo-step-n">${n + 1}</span><h3>${tx(h)}${zhLine(h)}</h3><p>${tx(p)}</p></li>`).join('')}
        </ol>
        <div class="promo-other">
          <h3>${tx(T.otherH)}${zhLine(T.otherH)}</h3>
          <p>${tx(T.otherP)}</p>
        </div>
      </div>
    </section>`;
  }

  function listHTML() {
    if (!state.list.length) return `<p class="promo-empty">${tx(T.empty)}</p>`;
    return `<ul class="promo-list">${state.list.map((id) => {
      const i = byId[id];
      return `<li><img src="${i.img}" alt="" /><span><b>${tx(i.name)}</b><small>${i.id} · ${tx(T.min)} ${i.min}</small></span>
        <button type="button" class="promo-remove" data-remove="${id}" aria-label="${tx(T.remove)}: ${esc(tx(i.name))}">×</button></li>`;
    }).join('')}</ul>`;
  }

  const field = (key, type, req, ph) => `
    <div class="field">
      <label for="q-${key}">${tx(T[key])}${req ? '' : ` <span class="opt">(${tx(T.optional)})</span>`}</label>
      ${type === 'textarea'
        ? `<textarea id="q-${key}" name="${key}" rows="4" ${ph ? `placeholder="${esc(tx(ph))}"` : ''}></textarea>`
        : `<input id="q-${key}" name="${key}" type="${type}" ${req ? 'required' : ''} ${ph ? `placeholder="${esc(tx(ph))}"` : ''} autocomplete="${{ name: 'name', email: 'email', business: 'organization', phone: 'tel' }[key] || 'off'}" />`}
    </div>`;

  function formHTML() {
    if (state.sent) {
      return `<div class="contact-success"><div class="check">${EO.icon('check', 26)}</div>
        <h3>${tx(T.sentH)}</h3><p>${tx(T.sentP)}${zhLine(T.sentP)}</p></div>`;
    }
    return `
      <div class="promo-list-wrap" id="promoList">${listHTML()}</div>
      <form id="promoForm" novalidate>
        <div class="field-row">${field('name', 'text', true)}${field('email', 'email', true)}</div>
        <div class="field-row">${field('business', 'text', false)}${field('phone', 'tel', false)}</div>
        ${field('qty', 'text', false, T.qtyPh)}
        ${field('msg', 'textarea', false, T.msgPh)}
        <input type="text" name="website" tabindex="-1" autocomplete="off" class="promo-hp" aria-hidden="true" />
        <label class="checkbox-row"><input type="checkbox" name="agreed" /><span>${tx(T.agree)}</span></label>
        <p class="promo-error" id="promoError" role="alert" hidden></p>
        <button type="submit" class="btn btn-primary promo-send" id="promoSend">${tx(T.send)}</button>
      </form>`;
  }

  function render() {
    // keep anything the visitor already typed when the language changes
    const old = document.getElementById('promoForm');
    const saved = old ? Object.fromEntries([...old.elements].filter((e) => e.name).map((e) => [e.name, e.type === 'checkbox' ? e.checked : e.value])) : null;

    const nav = document.getElementById('giftNav');
    const foot = document.getElementById('giftFooter');
    if (nav) nav.innerHTML = navHTML();
    if (foot) foot.innerHTML = footHTML();
    syncLang();
    main.innerHTML = `
      ${heroHTML()}
      <section class="promo-gifts" id="gifts">
        <div class="container">
          <div class="promo-chips" role="group" aria-label="Filter">${chipsHTML()}</div>
          <div class="promo-grid">${DATA.ITEMS.map(cardHTML).join('')}</div>
          <p class="promo-photo-note">${tx(T.photoNote)}</p>
        </div>
      </section>
      ${stepsHTML()}
      <section class="promo-quote" id="quote">
        <div class="container promo-quote-inner">
          <div class="promo-quote-head">
            <h2 class="promo-h2">${tx(T.formH)}${zhLine(T.formH)}</h2>
            <p>${tx(T.formP)}</p>
            <p class="promo-mail"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
          </div>
          <div class="promo-form-card" id="promoFormCard">${formHTML()}</div>
        </div>
      </section>
      <div class="promo-bar" id="promoBar" hidden></div>`;

    const form = document.getElementById('promoForm');
    if (form && saved) Object.entries(saved).forEach(([k, v]) => { const el = form.elements[k]; if (el) { if (el.type === 'checkbox') el.checked = v; else el.value = v; } });
    if (form) form.addEventListener('submit', onSubmit);
    updateBar();
  }

  // ---------- behaviour ----------
  function refreshList() {
    const box = document.getElementById('promoList');
    if (box) box.innerHTML = listHTML();
    main.querySelectorAll('[data-add]').forEach((b) => {
      const on = state.list.includes(b.dataset.add);
      b.classList.toggle('is-added', on);
      b.setAttribute('aria-pressed', on);
      b.textContent = tx(on ? T.added : T.add);
    });
    updateBar();
  }

  function updateBar() {
    const bar = document.getElementById('promoBar');
    if (!bar) return;
    const n = state.list.length;
    bar.hidden = !n || state.sent;
    if (!n) return;
    bar.innerHTML = `<span><b>${n}</b> ${tx(n === 1 ? T.barOne : T.barMany)}</span><a class="btn btn-small btn-dark" href="#quote">${tx(T.barGo)}</a>`;
  }

  main.addEventListener('click', (e) => {
    const chip = e.target.closest('.promo-chip');
    if (chip) {
      state.cat = chip.dataset.cat;
      main.querySelectorAll('.promo-chip').forEach((c) => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on); });
      main.querySelectorAll('.promo-card').forEach((c) => { c.hidden = state.cat !== 'all' && c.dataset.cat !== state.cat; });
      return;
    }
    const add = e.target.closest('[data-add]');
    if (add) {
      const id = add.dataset.add;
      state.list = state.list.includes(id) ? state.list.filter((x) => x !== id) : state.list.concat(id);
      refreshList();
      if (state.list.includes(id)) { add.classList.remove('pop'); void add.offsetWidth; add.classList.add('pop'); }
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) { state.list = state.list.filter((x) => x !== rm.dataset.remove); refreshList(); }
  });

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = document.getElementById('promoSend');
    const err = document.getElementById('promoError');
    if (btn.dataset.sending) return;
    const checks = [
      [form.name, !!form.name.value.trim(), T.need],
      [form.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim()), T.needEmail],
      [form.agreed, form.agreed.checked, T.needAgree],
    ];
    checks.forEach(([el, ok]) => { const box = el.closest('.field') || el.closest('.checkbox-row'); if (box) box.classList.toggle('is-invalid', !ok); });
    const missing = checks.filter(([, ok]) => !ok);
    if (missing.length) {
      err.textContent = isZh() ? `请填写：${missing.map(([, , m]) => m.zh).join('、')}` : `Please add ${missing.map(([, , m]) => m.en).join(', ')}.`;
      err.hidden = false;
      missing[0][0].focus({ preventScroll: true });
      return;
    }
    err.hidden = true;
    btn.dataset.sending = '1';
    btn.textContent = tx(T.sending);

    const items = state.list.map((id) => `${id} ${byId[id].name.en} (${byId[id].name.zh})`).join('; ');
    const qty = form.qty.value.trim();
    const msg = form.msg.value.trim();
    const data = new URLSearchParams({
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      business: form.business.value.trim(),
      phone: form.phone.value.trim(),
      need: 'Promotional products 推广礼品',
      message: [qty && `Quantity / date 数量和日期: ${qty}`, msg].filter(Boolean).join('\n\n'),
      plan: items ? `Gifts 礼品: ${items}` : '',
      lang: EO.lang,
      website: form.website.value,
      t: String(Date.now() - openedAt),
    });

    const ok = () => { state.sent = true; document.getElementById('promoFormCard').innerHTML = formHTML(); updateBar(); };
    const fail = () => { delete btn.dataset.sending; btn.textContent = tx(T.send); err.textContent = tx(T.fail); err.hidden = false; };
    fetch(FORM_ENDPOINT, { method: 'POST', body: data })
      .then((r) => r.json())
      .then((j) => (j && j.ok ? ok() : fail()))
      .catch(fail);
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('#giftNav [data-lang]');
    if (b) EO.setLang(b.dataset.lang);
  });
  const navEl = document.getElementById('giftNav');
  const onScroll = () => navEl && navEl.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });

  render();
  onScroll();
  EO.onLang(() => render());
})();
