// EORACCO Custom — branded merchandise page (custom/index.html).
// Standalone from the service site: its own header and footer, no service navigation.
// Products come from promo-data.js; the project brief is sent to the same inquiry
// endpoint as the home-page contact form (emailed to the owner and logged in a Sheet).
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
    sub: L('Custom', '企业定制'),
    agency: L('Agency', '营销服务'),
    customTab: L('Custom', '企业定制'),
    switchLabel: L('Switch between EORACCO Agency and EORACCO Custom', '切换 EORACCO 营销服务 / 企业定制'),
    navWho: L('Who it’s for', '适合谁'),
    navHow: L('How it works', '流程'),
    navPrice: L('Pricing', '费用'),
    navStart: L('Start a project', '开始定制'),
    kicker: L('Branded merchandise for LA businesses', '洛杉矶企业定制周边'),
    h1: L('Your logo on things people keep.', '把您的品牌，做成客户舍不得扔的东西。'),
    lede: L('Tell us what it’s for, how many and by when. We pick the products, design the mockups, handle the suppliers and get it to you on time — in English or 中文.',
            '告诉我们用途、数量和日期。挑产品、做效果图、对接供应商、按时送到，都由我们负责，中英文都可以沟通。'),
    start: L('Start a project', '开始定制'),
    see: L('See what we make', '看看能做什么'),
    facts: [L('Minimums from 12 pcs', '最低 12 件起'), L('Free mockups with your logo', '免费出 logo 效果图'), L('One all-in quote', '一个总价，不另加费')],

    whoH: L('Made for how you do business.', '按您的生意来挑。'),
    whoP: L('Pick your line of work to see what fits. Every item can carry your logo, name or artwork.', '选您的行业，看看哪些合适。每一件都可以印 logo、名字或图案。'),
    min: L('Min.', '起订'),
    pcs: L('pcs', '件'),
    add: L('Add to project', '加入定制'),
    added: L('Added', '已加入'),
    photoNote: L('Photos are supplier samples. Your order carries your own logo and colors.', '图片为供应商样品图，实际订单印您自己的 logo 和颜色。'),
    otherH: L('Need something else?', '想要别的？'),
    otherP: L('Pens, tote bags, tumblers, T-shirts, signage and thousands more. Describe it in the brief and we’ll source it.', '笔、帆布袋、保温杯、T 恤、店面物料等几千种都能做。在下面的表单里描述一下，我们来找。'),

    whyH: L('What usually goes wrong — and how we handle it.', '定制常见的坑，我们怎么帮您避开。'),
    why: [
      [L('Cheap stuff that gets thrown away', '便宜货，转手就被扔'), L('We only suggest things people actually use, matched to who receives them.', '只推荐真的会被用的东西，按收礼的人来挑。')],
      [L('Surprise fees on the invoice', '账单上冒出额外费用'), L('Setup, imprint and shipping are in one quote before you say yes.', '制版、印刷、运费都包含在一个报价里，您确认之前就写清楚。')],
      [L('“Send us a vector file”', '“请提供矢量文件”'), L('Send whatever logo you have. We redraw it and show you a mockup for free.', '手上有什么 logo 就发什么，我们免费帮您重绘并出效果图。')],
      [L('Missing the event date', '赶不上活动日期'), L('We start from your in-hand date and only offer items that can make it.', '从您需要的日期倒推，只推荐来得及做的产品。')],
      [L('500-piece minimums', '动不动就 500 件起'), L('Many of our picks start at 12–50 pieces, made for small teams and shops.', '很多产品 12–50 件就能做，适合小店和小团队。')],
      [L('Lost in translation', '语言沟通不顺'), L('Talk to us in English or 中文. We know the Lunar New Year dos and don’ts.', '中英文都能沟通，也懂新年送礼的讲究。')],
    ],

    howH: L('How a project works.', '定制流程。'),
    steps: [
      [L('Brief', '提需求'), L('Tell us the occasion, who it’s for, quantity, date and budget.', '告诉我们用途、送给谁、数量、日期和预算。')],
      [L('Picks & mockups', '选品和效果图'), L('Within one business day: a short list with your logo mocked up and an all-in price.', '一个工作日内发给您精选方案、logo 效果图和总价。')],
      [L('Approve', '确认'), L('Choose your favorites. A deposit confirms the order.', '选定喜欢的款式，付订金后正式下单。')],
      [L('Proof', '打样确认'), L('You sign off a final proof before anything is made. Physical samples on request.', '生产前您先确认打样稿，也可以要实物样品。')],
      [L('Production', '生产'), L('Most items take 2–3 weeks after proof approval; some have rush options.', '确认打样后大部分产品 2–3 周完成，部分产品可加急。')],
      [L('Delivered', '送达'), L('Shipped to your door or event by the date we agreed. We track it so you don’t have to.', '按约定日期送到您手上或活动现场，物流由我们跟进。')],
    ],

    priceH: L('What it costs.', '费用说明。'),
    priceP: L('Every quote is per piece and all-in. Here is what goes into it.', '每个报价都是按件计价的总价，包含以下内容。'),
    price: [
      [L('Minimum order', '起订量'), L('From 12 pcs', '12 件起'), L('Depends on the item; shown on each product.', '因产品而异，每个产品上都有标注。')],
      [L('Design & mockups', '设计与效果图'), L('Free', '免费'), L('Logo clean-up and mockups are on us.', 'logo 整理和效果图由我们负责。')],
      [L('Setup & imprint', '制版与印刷'), L('Included', '已包含'), L('Built into the per-piece price, never added later.', '已算进单价，不会事后再加。')],
      [L('Turnaround', '交期'), L('2–3 weeks', '2–3 周'), L('After proof approval. Rush available on many items.', '从确认打样起算，很多产品可加急。')],
    ],

    packH: L('Packaging that makes it feel finished.', '包装，让成品更完整。'),
    pack: [
      [L('Standard', '标准包装'), L('Individually bagged or boxed by the maker. Included.', '工厂标准独立袋装或盒装，已包含在价格内。')],
      [L('Branded box', '品牌纸盒'), L('Kraft or white mailer boxes with your logo printed. Extra cost.', '牛皮纸或白色纸盒，印上您的 logo，需另加费用。')],
      [L('Gift set', '礼盒套装'), L('Rigid gift box, tissue and a printed thank-you card, packed and ready to hand out.', '硬礼盒、包装纸和印刷感谢卡，包好就能直接送。')],
    ],

    formH: L('Start a project', '开始定制'),
    formP: L('Answer what you can. We reply within one business day with options, mockups and a price.', '能填多少填多少。我们会在一个工作日内回复方案、效果图和报价。'),
    yourList: L('Items you added', '您加入的产品'),
    empty: L('No items added — that’s fine. Describe what you need below.', '还没加入产品也没关系，在下面描述您的需求就行。'),
    remove: L('Remove', '移除'),
    name: L('Name', '姓名'),
    email: L('Email', '邮箱'),
    business: L('Business', '公司名称'),
    phone: L('Phone', '电话'),
    occasion: L('What is it for?', '用途是什么？'),
    occasions: [
      L('Client gifts / thank-yous', '客户答谢礼'), L('Employees / onboarding', '员工福利 / 入职礼包'), L('Grand opening / store use', '开业 / 门店物料'),
      L('Lunar New Year / holidays', '新年 / 节日'), L('Event / trade show', '活动 / 展会'), L('Uniforms / team wear', '制服 / 团队服装'), L('Other', '其他'),
    ],
    choose: L('Choose one', '请选择'),
    qty: L('Quantity', '数量'),
    qtyPh: L('e.g. 150', '例如 150'),
    date: L('Date you need it by', '需要送达日期'),
    budget: L('Budget per piece', '每件预算'),
    budgetPh: L('e.g. $10–15', '例如 $10–15'),
    pack2: L('Packaging', '包装'),
    msg: L('Brand colors, who receives it, anything else', '品牌颜色、送给谁、其他要求'),
    msgPh: L('e.g. Gold and black logo, for 80 top clients, needs to feel premium', '例如：金黑配色 logo，送给 80 位重要客户，要有高级感'),
    logoNote: L('We’ll ask for your logo by email — any format is fine.', '我们会通过邮件向您要 logo，任何格式都可以。'),
    optional: L('optional', '选填'),
    agree: L('I agree to the <a href="../privacy.html">Privacy Policy</a> and to EORACCO contacting me about this project.',
             '我同意<a href="../privacy.html">隐私政策</a>，并同意 EORACCO 就本项目与我联系。'),
    send: L('Send project brief', '提交定制需求'),
    sending: L('Sending…', '正在发送…'),
    sentH: L('Brief received.', '需求已收到。'),
    sentP: L('Thanks. Within one business day you’ll get options, mockups and an all-in price by email.', '谢谢！一个工作日内我们会把方案、效果图和总价发到您的邮箱。'),
    fail: L(`Something went wrong. Please email us at ${CONTACT_EMAIL}.`, `发送失败，请直接发邮件到 ${CONTACT_EMAIL}。`),
    barOne: L('item in your project', '件产品已加入'),
    barMany: L('items in your project', '件产品已加入'),
    barGo: L('Send brief', '提交需求'),
    need: L('your name', '姓名'),
    needEmail: L('a valid email', '有效邮箱'),
    needAgree: L('agreement to the privacy policy', '勾选同意隐私政策'),
    privacy: L('Privacy', '隐私政策'),
    terms: L('Terms', '服务条款'),
    mainLink: L('EORACCO also does marketing, design and websites', 'EORACCO 也提供营销、设计和网站服务'),
  };

  const state = { app: DATA.APPS[0].key, list: [], sent: false };

  // ---------- markup ----------
  const HERO_IDS = ['EO-03', 'EO-22', 'EO-14', 'EO-20'];

  function navHTML() {
    const l = EO.lang;
    return `
    <div class="container gnav-inner">
      <a class="brand" href="#top" aria-label="EORACCO Custom"><span class="brand-mark" aria-hidden="true"></span>EORACCO</a>
      <div class="site-switch gnav-brand" role="group" aria-label="${tx(T.switchLabel)}">
        <a href="../">${tx(T.agency)}</a>
        <a class="is-on" href="#top" aria-current="true">${tx(T.customTab)}</a>
      </div>
      <nav class="gnav-links" aria-label="Sections">
        <a href="#who">${tx(T.navWho)}</a>
        <a href="#how">${tx(T.navHow)}</a>
        <a href="#pricing">${tx(T.navPrice)}</a>
      </nav>
      <div class="lang-toggle" role="group" aria-label="Language">
        ${['en', 'bi', 'zh'].map((k) => `<button type="button" data-lang="${k}" class="${l === k ? 'active' : ''}" aria-pressed="${l === k}">${{ en: 'EN', bi: '双语', zh: '中文' }[k]}</button>`).join('')}
      </div>
      <a class="btn btn-small btn-dark gnav-cta" href="#start">${tx(T.navStart)}</a>
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
      <a class="gfoot-main" href="../">${tx(T.mainLink)} <span aria-hidden="true">→</span></a>
    </div>`;
  }

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
            <a class="btn btn-primary" href="#start">${tx(T.start)}</a>
            <a class="btn btn-ghost" href="#who">${tx(T.see)}</a>
          </div>
          <ul class="ghero-facts">${T.facts.map((f) => `<li>${tx(f)}</li>`).join('')}</ul>
        </div>
        <div class="ghero-art">${tiles}</div>
      </div>
    </section>`;
  }

  function cardHTML(i) {
    const on = state.list.includes(i.id);
    return `
      <article class="promo-card">
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

  function appPanelHTML() {
    const a = DATA.APPS.find((x) => x.key === state.app);
    return `
      <p class="app-who">${tx(a.who)}${zhLine(a.who)}</p>
      <div class="promo-grid">${a.items.map((id) => cardHTML(byId[id])).join('')}</div>`;
  }

  function whoHTML() {
    return `
    <section class="promo-gifts" id="who">
      <div class="container">
        <div class="sec-head">
          <h2 class="promo-h2">${tx(T.whoH)}${zhLine(T.whoH)}</h2>
          <p>${tx(T.whoP)}</p>
        </div>
        <div class="promo-chips" role="tablist" aria-label="Industries">
          ${DATA.APPS.map((a) => `
          <button type="button" role="tab" class="promo-chip ${state.app === a.key ? 'is-on' : ''}" data-app="${a.key}" aria-selected="${state.app === a.key}">
            ${tx(a.name)}${isBi() ? `<span class="zh">${a.name.zh}</span>` : ''}
          </button>`).join('')}
        </div>
        <div class="app-panel" id="appPanel" role="tabpanel">${appPanelHTML()}</div>
        <p class="promo-photo-note">${tx(T.photoNote)}</p>
        <div class="promo-other">
          <h3>${tx(T.otherH)}${zhLine(T.otherH)}</h3>
          <p>${tx(T.otherP)}</p>
          <a class="btn btn-small" href="#start">${tx(T.start)}</a>
        </div>
      </div>
    </section>`;
  }

  function whyHTML() {
    return `
    <section class="why">
      <div class="container">
        <h2 class="promo-h2">${tx(T.whyH)}${zhLine(T.whyH)}</h2>
        <div class="why-grid">
          ${T.why.map(([p, s]) => `
          <div class="why-card">
            <p class="why-pain">${tx(p)}</p>
            <p class="why-fix">${tx(s)}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function howHTML() {
    return `
    <section class="promo-steps" id="how">
      <div class="container">
        <h2 class="promo-h2">${tx(T.howH)}${zhLine(T.howH)}</h2>
        <ol class="promo-steps-list">
          ${T.steps.map(([h, p], n) => `
          <li><span class="promo-step-n">${n + 1}</span><h3>${tx(h)}${zhLine(h)}</h3><p>${tx(p)}</p></li>`).join('')}
        </ol>
      </div>
    </section>`;
  }

  function priceHTML() {
    return `
    <section class="price" id="pricing">
      <div class="container">
        <div class="sec-head">
          <h2 class="promo-h2">${tx(T.priceH)}${zhLine(T.priceH)}</h2>
          <p>${tx(T.priceP)}</p>
        </div>
        <dl class="price-grid">
          ${T.price.map(([k, v, d]) => `
          <div class="price-cell"><dt>${tx(k)}</dt><dd class="price-v">${tx(v)}</dd><dd class="price-d">${tx(d)}</dd></div>`).join('')}
        </dl>
        <h3 class="pack-h">${tx(T.packH)}${zhLine(T.packH)}</h3>
        <div class="pack-grid">
          ${T.pack.map(([h, p], n) => `
          <div class="pack-card pack-card--${n + 1}"><span class="pack-art" aria-hidden="true"></span><h4>${tx(h)}</h4><p>${tx(p)}</p></div>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function listHTML() {
    if (!state.list.length) return `<p class="promo-empty">${tx(T.empty)}</p>`;
    return `<p class="promo-list-h">${tx(T.yourList)}</p><ul class="promo-list">${state.list.map((id) => {
      const i = byId[id];
      return `<li><img src="${i.img}" alt="" /><span><b>${tx(i.name)}</b><small>${i.id} · ${tx(T.min)} ${i.min}</small></span>
        <button type="button" class="promo-remove" data-remove="${id}" aria-label="${tx(T.remove)}: ${esc(tx(i.name))}">×</button></li>`;
    }).join('')}</ul>`;
  }

  const AUTO = { name: 'name', email: 'email', business: 'organization', phone: 'tel' };
  const field = (key, type, req, ph, quiet = false) => `
    <div class="field">
      <label for="q-${key}">${tx(T[key])}${req || quiet ? '' : ` <span class="opt">(${tx(T.optional)})</span>`}</label>
      ${type === 'textarea'
        ? `<textarea id="q-${key}" name="${key}" rows="4" ${ph ? `placeholder="${esc(tx(ph))}"` : ''}></textarea>`
        : `<input id="q-${key}" name="${key}" type="${type}" ${req ? 'required' : ''} ${ph ? `placeholder="${esc(tx(ph))}"` : ''} autocomplete="${AUTO[key] || 'off'}" />`}
    </div>`;
  const select = (key, opts, req) => `
    <div class="field">
      <label for="q-${key}">${tx(T[key])}${req ? '' : ` <span class="opt">(${tx(T.optional)})</span>`}</label>
      <select id="q-${key}" name="${key}"><option value="">${tx(T.choose)}</option>${opts.map((o) => `<option value="${esc(o.en)}">${esc(tx(o))}</option>`).join('')}</select>
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
        ${select('occasion', T.occasions, false)}
        <div class="field-row field-row--3">${field('qty', 'text', false, T.qtyPh, true)}${field('date', 'date', false, null, true)}${field('budget', 'text', false, T.budgetPh, true)}</div>
        ${select('pack2', T.pack.map(([h]) => h), false)}
        ${field('msg', 'textarea', false, T.msgPh)}
        <p class="promo-logo-note">${tx(T.logoNote)}</p>
        <input type="text" name="website" tabindex="-1" autocomplete="off" class="promo-hp" aria-hidden="true" />
        <label class="checkbox-row"><input type="checkbox" name="agreed" /><span>${tx(T.agree)}</span></label>
        <p class="promo-error" id="promoError" role="alert" hidden></p>
        <button type="submit" class="btn btn-primary promo-send" id="promoSend">${tx(T.send)}</button>
      </form>`;
  }

  function startHTML() {
    return `
    <section class="promo-quote" id="start">
      <div class="container promo-quote-inner">
        <div class="promo-quote-head">
          <h2 class="promo-h2">${tx(T.formH)}${zhLine(T.formH)}</h2>
          <p>${tx(T.formP)}</p>
          <p class="promo-mail"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        </div>
        <div class="promo-form-card" id="promoFormCard">${formHTML()}</div>
      </div>
    </section>`;
  }

  function syncLang() {
    const l = EO.lang;
    document.body.classList.remove('lang-en', 'lang-zh', 'lang-bi');
    document.body.classList.add('lang-' + l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
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
    main.innerHTML = `${heroHTML()}${whoHTML()}${whyHTML()}${howHTML()}${priceHTML()}${startHTML()}<div class="promo-bar" id="promoBar" hidden></div>`;

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
    bar.innerHTML = `<span><b>${n}</b> ${tx(n === 1 ? T.barOne : T.barMany)}</span><a class="btn btn-small btn-dark" href="#start">${tx(T.barGo)}</a>`;
  }

  main.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-app]');
    if (chip) {
      state.app = chip.dataset.app;
      main.querySelectorAll('[data-app]').forEach((c) => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
      document.getElementById('appPanel').innerHTML = appPanelHTML();
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

    const v = (k) => (form.elements[k] ? form.elements[k].value.trim() : '');
    const items = state.list.map((id) => `${id} ${byId[id].name.en} (${byId[id].name.zh})`).join('; ');
    const brief = [
      v('occasion') && `For 用途: ${v('occasion')}`,
      v('qty') && `Quantity 数量: ${v('qty')}`,
      v('date') && `In-hand date 送达日期: ${v('date')}`,
      v('budget') && `Budget per piece 每件预算: ${v('budget')}`,
      v('pack2') && `Packaging 包装: ${v('pack2')}`,
      v('msg') && `\n${v('msg')}`,
    ].filter(Boolean).join('\n');
    const data = new URLSearchParams({
      name: v('name'),
      email: v('email'),
      business: v('business'),
      phone: v('phone'),
      need: 'EORACCO Custom 企业定制' + (v('occasion') ? ` · ${v('occasion')}` : ''),
      message: brief,
      plan: items ? `Items 产品: ${items}` : '',
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
