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

  // this script renders three views: the Custom home (custom/), the catalogue (custom/products/)
  // and one page per product (custom/products/<slug>/)
  const VIEW = ['products', 'product'].includes(document.body.dataset.view) ? document.body.dataset.view : 'home';
  const ROOT = { home: '', products: '../', product: '../../' }[VIEW]; // EORACCO Custom home
  const SITE = ROOT + '../';                            // main eoracco.com site
  const onHome = VIEW === 'home';
  const homeAnchor = (id) => (onHome ? `#${id}` : `${ROOT}#${id}`);

  // the project list is kept on this device so it survives moving between the two pages
  const LIST_KEY = 'eoracco-custom-list';
  const loadList = () => { try { return (JSON.parse(localStorage.getItem(LIST_KEY) || '[]') || []).filter((id) => byId[id]); } catch (e) { return []; } };
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify(state.list)); } catch (e) { /* storage unavailable */ } };

  const T = {
    sub: L('Custom', '企业定制'),
    agency: L('Agency', '营销服务'),
    customTab: L('Custom', '企业定制'),
    switchLabel: L('Switch between EORACCO Agency and EORACCO Custom', '切换 EORACCO 营销服务 / 企业定制'),
    navProducts: L('Products', '产品'),
    navWho: L('Who it’s for', '适合谁'),
    navSig: L('Signature', '招牌定制'),
    navBox: L('Gift boxes', '设计礼盒'),
    navHow: L('How it works', '流程'),
    navPrice: L('Pricing', '费用'),
    navStart: L('Start a project', '开始定制'),
    kicker: L('Custom gifts & merch for LA businesses', '洛杉矶企业定制礼物与周边'),
    h1: L('Gifts designed for your brand. The kind people keep.', '为你的品牌设计的礼物，让人舍不得扔。'),
    lede: L('Bobbleheads of your team, brick figures, gift boxes and merch with artwork drawn for you. We design it, handle the makers and deliver on time, in English or 中文.',
            '把团队做成摇头公仔、积木小人，为你设计礼盒和原创图案的周边。设计、对接工厂、按时送到都由我们负责，中英文都可以沟通。'),
    start: L('Start a project', '开始定制'),
    see: L('See what we make', '看看能做什么'),
    facts: [L('Designed for you, not picked from a catalog', '为你设计，不是从目录里挑'), L('Many pieces from 1', '很多产品 1 件起'), L('One all-in quote', '一个总价，不另加费')],

    sigKicker: L('Signature custom', '招牌定制'),
    sigH: L('Made from your people, your shop, your story.', '用你的人、你的店、你的故事做成的礼物。'),
    sigP: L('Pieces we make from scratch for each client. Order one to see it before you commit to more.', '每一件都为客户从头做。可以先订一个看效果，再决定要不要多做。'),
    details: L('See details', '查看详情'),
    boxKicker: L('Designed gift boxes', '设计礼盒'),
    boxH: L('A gift box that looks like your brand made it.', '一份看起来像你品牌自己出品的礼盒。'),
    boxP: L('We design the box, the card and the red envelopes, then fill it with a few good things.', '盒子、卡片、红包都由我们设计，再放进几样好东西。'),
    boxSteps: [
      [L('The box', '盒子'), L('A rigid magnetic box printed with packaging we design. From 25 boxes.', '磁吸硬盒，印上我们设计的包装，25 个起。')],
      [L('The paper', '卡片和红包'), L('A printed card and, for Lunar New Year, red envelopes with original artwork.', '印刷贺卡；新年礼盒再配原创图案的红包。')],
      [L('What goes inside', '里面放什么'), L('Pick two or three from the list below, or tell us the budget and we’ll choose.', '从下面挑两三样，或者告诉我们预算，我们来配。')],
    ],
    insideH: L('What can go inside', '可以放进礼盒的东西'),
    dailyKicker: L('Everyday custom', '日常定制'),
    dailyH: L('Wear and drinkware with artwork drawn for you.', '印着为你画的图案的服装和杯具。'),
    dailyP: L('The things people use most, done with original art and quiet branding instead of a big logo.', '大家最常用的东西，用原创图案和低调的品牌标识来做，而不是印一个大 logo。'),

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
      [L('Gifts that get thrown away', '礼物转手就被扔'), L('We make something about them: their face, their shop, their brand. That is what people keep.', '我们做的是跟对方有关的东西：他的样子、他的店、他的品牌，这样才会被留下。')],
      [L('Surprise fees on the invoice', '账单上冒出额外费用'), L('Setup, imprint and shipping are in one quote before you say yes.', '制版、印刷、运费都包含在一个报价里，您确认之前就写清楚。')],
      [L('“Send us a vector file”', '“请提供矢量文件”'), L('Send whatever logo you have. We redraw it and show you a mockup for free.', '手上有什么 logo 就发什么，我们免费帮您重绘并出效果图。')],
      [L('Missing the event date', '赶不上活动日期'), L('We start from your in-hand date and only offer items that can make it.', '从您需要的日期倒推，只推荐来得及做的产品。')],
      [L('500-piece minimums', '动不动就 500 件起'), L('Bobbleheads, brick desk displays, tees and hoodies start at one piece.', '公仔、积木桌面摆件、T 恤、卫衣都是 1 件起。')],
      [L('Lost in translation', '语言沟通不顺'), L('Talk to us in English or 中文. We know the Lunar New Year dos and don’ts.', '中英文都能沟通，也懂新年送礼的讲究。')],
    ],

    howH: L('How a project works.', '定制流程。'),
    steps: [
      [L('Brief', '提需求'), L('Tell us the occasion, who it’s for, quantity, date and budget.', '告诉我们用途、送给谁、数量、日期和预算。')],
      [L('Design', '设计'), L('We draw the artwork or packaging and send mockups with an itemized, all-in quote.', '我们画图案或设计包装，发效果图和分项列明的总价。')],
      [L('Approve', '确认'), L('Choose what you like. A deposit confirms the order.', '选定喜欢的方案，付订金后正式下单。')],
      [L('Sample', '打样'), L('You sign off a proof first. For bobbleheads and brick pieces you approve the likeness or a sample.', '生产前先确认打样稿；公仔和积木会先给你确认样子或样品。')],
      [L('Production', '生产'), L('Usually 2–4 weeks after approval, depending on the item.', '确认后一般 2–4 周，视产品而定。')],
      [L('Delivered', '送达'), L('Shipped to your door or event by the date we agreed. We track it so you don’t have to.', '按约定日期送到您手上或活动现场，物流由我们跟进。')],
    ],

    priceH: L('What it costs.', '费用说明。'),
    priceP: L('Every quote has two parts, design and production, and both are written down before you pay anything.', '每个报价分两部分：设计和生产，付款前都写清楚。'),
    price: [
      [L('Design', '设计'), L('Quoted per project', '按项目报价'), L('Logo mockups are free. Original illustration, packaging and likeness work are priced up front.', 'logo 效果图免费；原创插画、包装设计、公仔造型会先报价。')],
      [L('Minimum order', '起订量'), L('From 1 piece', '1 件起'), L('Bobbleheads, brick desk displays and tees from one; gift boxes from 25. Shown on each product.', '公仔、积木桌面摆件、T 恤 1 件起；礼盒 25 个起。每个产品上都有标注。')],
      [L('Production', '生产'), L('Per piece, all-in', '按件计价，全包'), L('Setup, imprint and shipping are built into one per-piece price.', '制版、印刷、运费都算进单价，不会事后再加。')],
      [L('Turnaround', '交期'), L('2–4 weeks', '2–4 周'), L('Wear and drinkware usually 2–3 weeks; allow 3–4 for bobbleheads and gift boxes.', '服装、杯具大多 2–3 周；公仔和礼盒请预留 3–4 周。')],
    ],

    packH: L('Packaging that makes it feel finished.', '包装，让成品更完整。'),
    pack: [
      [L('Standard', '标准包装'), L('Individually bagged or boxed by the maker. Included.', '工厂标准独立袋装或盒装，已包含在价格内。')],
      [L('Branded box', '品牌纸盒'), L('Kraft or white mailer boxes with your logo printed. Extra cost.', '牛皮纸或白色纸盒，印上您的 logo，需另加费用。')],
      [L('Designed gift box', '设计礼盒'), L('A rigid box with packaging we design, a printed card, packed and ready to hand out.', '我们设计包装的硬礼盒，配印刷贺卡，包好就能直接送。')],
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
    agree: L('I agree to the <a href="{P}">Privacy Policy</a> and to EORACCO contacting me about this project.',
             '我同意<a href="{P}">隐私政策</a>，并同意 EORACCO 就本项目与我联系。'),
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
    allProducts: L('See all products', '查看全部产品'),
    findBtn: L('Find a product for me', '帮我找产品'),
    findKicker: L('Product search', '代找产品'),
    findH: L('Can’t find it here? We’ll find it for you.', '这里没有？我们帮您找。'),
    findP: L('Describe what you have in mind, or paste a link to something you saw. We search more than a million products from our suppliers and send back the closest matches with prices — within one business day, free.',
             '描述一下您想要的东西，或者贴一个在别处看到的链接。我们会在供应商的一百多万个产品里帮您找，一个工作日内把最接近的几款和价格发给您，不收费。'),
    findSteps: [L('Tell us what you’re looking for', '告诉我们您要找什么'), L('We search 1M+ supplier products', '我们在 100 多万个产品里搜'), L('You get 3–5 matches with prices', '您收到 3–5 个推荐和报价')],
    what: L('What are you looking for?', '想找什么产品？'),
    whatPh: L('e.g. a bamboo lunch box with our logo, under $10, for 200 employees', '例如：印 logo 的竹制饭盒，每个 $10 以内，200 位员工用'),
    link: L('Link to a similar product', '类似产品的链接'),
    linkPh: L('Amazon, Etsy, Instagram, anywhere', 'Amazon、Etsy、小红书、Instagram 都可以'),
    photoTip: L('Have a photo? Reply to our email with it.', '有图片的话，收到我们的邮件后直接回复发给我们。'),
    findSend: L('Find it for me', '帮我找'),
    findSentH: L('We’re on it.', '收到，我们去找。'),
    findSentP: L('Within one business day you’ll get the closest matches and prices by email.', '一个工作日内，我们会把最接近的产品和价格发到您的邮箱。'),
    needWhat: L('what you are looking for', '想找的产品'),
    prodKicker: L('EORACCO Custom · Products', 'EORACCO Custom · 产品'),
    prodH: L('Products we recommend.', '我们推荐的产品。'),
    prodP: L('Signature custom pieces, gift boxes, and everyday wear and drinkware. Add what you like to your project, then send one brief for all of it.',
             '招牌定制、设计礼盒，以及日常的服装和杯具。把喜欢的加进定制清单，最后发一份需求就好。'),
    all: L('All', '全部'),
    showing: L('items', '件'),
    crumbs: L('Products', '产品'),
    priceH: L('Price per piece', '单价'),
    qtyCol: L('Quantity', '数量'),
    priceCol: L('Per piece', '每件'),
    from: L('As low as', '低至'),
    priceNote: L('Estimated price with a standard imprint. Your all-in quote adds setup and shipping, so there are no surprises later.', '以上为标准印刷的参考单价。正式报价会把制版费和运费一起算进去，之后不会再加钱。'),
    priceAsk: L('Price depends on size and imprint. Ask for a quote — it’s free.', '价格取决于尺寸和印刷方式，欢迎免费询价。'),
    specMin: L('Minimum', '起订量'),
    specProd: L('Production', '生产时间'),
    specProdV: L('about {n} business days after proof', '确认打样后约 {n} 个工作日'),
    specSize: L('Size', '尺寸'),
    specCode: L('Item', '编号'),
    goodFor: L('Good for', '适合'),
    askThis: L('Ask about this product', '询问这个产品'),
    related: L('You may also like', '您可能也喜欢'),
    backAll: L('All products', '全部产品'),
    privacy: L('Privacy', '隐私政策'),
    terms: L('Terms', '服务条款'),
    mainLink: L('EORACCO also does marketing, design and websites', 'EORACCO 也提供营销、设计和网站服务'),
    detailsH: L('Product details', '产品信息'),
    ideasH: L('Good ideas for it', '适合用在'),
    faqH: L('Common questions', '常见问题'),
    spec: {
      material: L('Material', '材质'), colors: L('Colors', '颜色'), size: L('Size', '尺寸'), size2: L('Size', '尺寸'),
      includes: L('What’s included', '包含'), imprint: L('Imprint', '印刷'), scent: L('Scents', '香味'),
      packaging: L('Packaging', '包装'), weight: L('Weight', '重量'), care: L('Care', '保养'), rush: L('Rush', '加急'),
      origin: L('Made in', '产地'), note: L('Good to know', '注意'),
    },
    faq: [
      [L('Can I see it before you make it?', '做之前可以先看效果吗？'),
        L('Yes. We send a digital proof with your logo on the product, and nothing goes into production until you approve it. Many items can also be sampled first — ask and we’ll check this one for you.', '可以。我们会先发电子打样，让您看到 logo 印在产品上的效果，您确认后才开始生产。很多产品也能先寄实物样品，告诉我们，我们帮您确认这一款。')],
      [L('How fast can I get it?', '多久能拿到？'),
        L('Production time starts after you approve the proof; shipping usually adds a few business days. Tell us your event date and we’ll confirm whether it works before you pay anything.', '生产时间从确认打样后开始算，运输通常再加几个工作日。告诉我们您的活动日期，付款前我们会先确认能不能赶上。')],
      [L('What does the quote include?', '报价包含哪些？'),
        L('The prices above are per piece with a standard imprint. Your written quote adds setup, any extra imprint colors and shipping into one total, so there are no surprises later.', '上面的价格是标准印刷的每件单价。正式书面报价会把制版费、额外印色和运费都算进一个总价，之后不会再加钱。')],
      [L('Can I change the color or the logo placement?', '可以换颜色或 logo 位置吗？'),
        L('Often, yes. Options depend on the item — tell us what you have in mind and we’ll list what’s possible in your quote.', '大多可以，具体看产品。告诉我们您的想法，我们会在报价里列出可选方案。')],
      [L('Can I order this together with other products?', '可以和其他产品一起订吗？'),
        L('Yes. Add everything you like to your project list and send one brief; we quote it all together.', '可以。把喜欢的产品都加进项目清单，发一份需求就好，我们一起报价。')],
    ],
  };

  const forParam = new URLSearchParams(location.search).get('for');
  const productLink = (i) => `${ROOT}products/${i.slug}/`;
  const money = (n) => '$' + Number(n).toFixed(2);
  // some supplier photos are collages; `fit` zooms into the one product we want to show
  const fitAttr = (i) => (i.fit ? ` style="transform:scale(${i.fit[0]});transform-origin:${i.fit[1]}% ${i.fit[2]}%"` : '');
  // the products page filters by product group, or by industry when it is opened from a product page (?for=)
  const forApp = DATA.APPS.find((a) => a.key === forParam);
  const groupItems = (key) => {
    if (key === 'all') return DATA.ITEMS;
    const app = DATA.APPS.find((a) => a.key === key);
    return app ? app.items.map((id) => byId[id]) : DATA.ITEMS.filter((i) => i.cat === key);
  };
  const state = { app: DATA.APPS[0].key, filter: forApp ? forApp.key : 'all', gi: 0, list: loadList(), sent: false, findSent: false };

  // ---------- markup ----------
  const HERO_IDS = ['EO-30', 'EO-28', 'EO-31', 'EO-34'];

  function navHTML() {
    const l = EO.lang;
    return `
    <div class="container gnav-inner">
      <a class="brand" href="${onHome ? '#top' : ROOT}" aria-label="EORACCO Custom"><span class="brand-mark" aria-hidden="true"></span>EORACCO</a>
      <div class="site-switch gnav-brand" role="group" aria-label="${tx(T.switchLabel)}">
        <a href="${SITE}">${tx(T.agency)}</a>
        <a class="is-on" href="${onHome ? '#top' : ROOT}" aria-current="true">${tx(T.customTab)}</a>
      </div>
      <nav class="gnav-links" aria-label="Sections">
        <a href="${ROOT}products/" class="${onHome ? '' : 'is-current'}" ${VIEW === 'products' ? 'aria-current="page"' : ''}>${tx(T.navProducts)}</a>
        <a href="${homeAnchor('signature')}">${tx(T.navSig)}</a>
        <a href="${homeAnchor('giftbox')}">${tx(T.navBox)}</a>
        <a href="${homeAnchor('how')}">${tx(T.navHow)}</a>
        <a href="${homeAnchor('pricing')}">${tx(T.navPrice)}</a>
      </nav>
      <div class="lang-toggle" role="group" aria-label="Language">
        ${['en', 'bi', 'zh'].map((k) => `<button type="button" data-lang="${k}" class="${l === k ? 'active' : ''}" aria-pressed="${l === k}">${{ en: 'EN', bi: '双语', zh: '中文' }[k]}</button>`).join('')}
      </div>
      <a class="btn btn-small btn-dark gnav-cta" href="${homeAnchor('start')}">${tx(T.navStart)}</a>
    </div>`;
  }

  function footHTML() {
    return `
    <div class="container gfoot-inner">
      <span class="brand"><span class="brand-mark" aria-hidden="true"></span>EORACCO<span class="gnav-sub">${tx(T.sub)}</span></span>
      <span class="gfoot-links">
        <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        <a href="${SITE}privacy.html">${tx(T.privacy)}</a>
        <a href="${SITE}terms.html">${tx(T.terms)}</a>
      </span>
      <span class="gfoot-copy">© 2026 EORACCO · Los Angeles</span>
      <a class="gfoot-main" href="${SITE}">${tx(T.mainLink)} <span aria-hidden="true">→</span></a>
    </div>`;
  }

  function heroHTML() {
    const tiles = HERO_IDS.map((id, n) => `
      <figure class="ghero-tile ghero-tile--${n + 1}">
        <img src="${byId[id].img}" alt="${esc(byId[id].name.en)}" ${n ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"${fitAttr(byId[id])} />
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
            <a class="btn btn-ghost" href="#signature">${tx(T.see)}</a>
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
        <a class="promo-img" href="${productLink(i)}"><img src="${i.img}" alt="${esc(i.name.en)}" loading="lazy" decoding="async" width="750" height="750"${fitAttr(i)} /></a>
        <div class="promo-body">
          <h3 class="promo-name"><a href="${productLink(i)}">${tx(i.name)}${zhLine(i.name)}</a></h3>
          <p class="promo-note">${tx(i.note)}</p>
          <div class="promo-foot">
            <span class="promo-min">${tx(T.min)} ${i.min} ${tx(T.pcs)}</span>
            <button type="button" class="btn promo-add ${on ? 'is-added' : ''}" data-add="${i.id}" aria-pressed="${on}">${tx(on ? T.added : T.add)}</button>
          </div>
        </div>
      </article>`;
  }

  const lowest = (i) => (i.tiers.length ? Math.min(...i.tiers.map((t) => t[1])) : 0);

  function sigCardHTML(i) {
    const on = state.list.includes(i.id);
    const low = lowest(i);
    return `
      <article class="sig-card">
        <a class="sig-img" href="${productLink(i)}"><img src="${i.img}" alt="${esc(i.name.en)}" loading="lazy" decoding="async"${fitAttr(i)} /></a>
        <div class="sig-body">
          <h3 class="sig-name"><a href="${productLink(i)}">${tx(i.name)}${zhLine(i.name)}</a></h3>
          <p class="sig-about">${tx(i.about)}</p>
          <p class="sig-meta"><span>${tx(T.min)} ${i.min} ${tx(T.pcs)}</span>${low ? `<span>${tx(T.from)} ${money(low)}</span>` : ''}</p>
          <div class="sig-cta">
            <a class="btn btn-ghost btn-small" href="${productLink(i)}">${tx(T.details)}</a>
            <button type="button" class="btn promo-add ${on ? 'is-added' : ''}" data-add="${i.id}" aria-pressed="${on}">${tx(on ? T.added : T.add)}</button>
          </div>
        </div>
      </article>`;
  }

  function sigHTML() {
    const items = DATA.ITEMS.filter((i) => i.cat === 'signature');
    return `
    <section class="sig" id="signature">
      <div class="container">
        <div class="sec-head">
          <div><p class="promo-kicker">${tx(T.sigKicker)}</p>
          <h2 class="promo-h2">${tx(T.sigH)}${zhLine(T.sigH)}</h2></div>
          <p>${tx(T.sigP)}</p>
        </div>
        <div class="sig-grid">${items.map(sigCardHTML).join('')}</div>
      </div>
    </section>`;
  }

  function boxHTML() {
    const box = byId['EO-31'];
    const env = byId['EO-32'];
    const inside = DATA.ITEMS.filter((i) => i.cat === 'inside');
    return `
    <section class="gbox" id="giftbox">
      <div class="container">
        <div class="gbox-top">
          <div class="gbox-copy">
            <p class="promo-kicker">${tx(T.boxKicker)}</p>
            <h2 class="promo-h2">${tx(T.boxH)}${zhLine(T.boxH)}</h2>
            <p class="gbox-p">${tx(T.boxP)}</p>
            <ol class="gbox-steps">${T.boxSteps.map(([h, p], n) => `<li><span>${n + 1}</span><div><h3>${tx(h)}${zhLine(h)}</h3><p>${tx(p)}</p></div></li>`).join('')}</ol>
            <div class="gbox-cta">
              <a class="btn btn-primary" href="${productLink(box)}">${tx(box.name)}</a>
              <a class="btn btn-ghost" href="${productLink(env)}">${tx(env.name)}</a>
            </div>
          </div>
          <div class="gbox-art">
            <a class="gbox-tile gbox-tile--1" href="${productLink(box)}"><img src="${box.img}" alt="${esc(box.name.en)}" loading="lazy" decoding="async" /></a>
            <a class="gbox-tile gbox-tile--2" href="${productLink(env)}"><img src="${env.img}" alt="${esc(env.name.en)}" loading="lazy" decoding="async"${fitAttr(env)} /></a>
          </div>
        </div>
        <h3 class="gbox-inside-h">${tx(T.insideH)}${zhLine(T.insideH)}</h3>
        <div class="mini-grid">${inside.map((i) => `
          <a class="mini" href="${productLink(i)}">
            <span class="mini-img"><img src="${i.img}" alt="${esc(i.name.en)}" loading="lazy" decoding="async"${fitAttr(i)} /></span>
            <span class="mini-name">${tx(i.name)}</span>
            <span class="mini-min">${tx(T.min)} ${i.min} ${tx(T.pcs)}</span>
          </a>`).join('')}</div>
      </div>
    </section>`;
  }

  function dailyHTML() {
    const items = DATA.ITEMS.filter((i) => (i.cat === 'wear' || i.cat === 'drink') && i.id !== 'EO-23'); // one apron on the home page; both are on the products page
    return `
    <section class="promo-gifts daily" id="daily">
      <div class="container">
        <div class="sec-head">
          <div><p class="promo-kicker">${tx(T.dailyKicker)}</p>
          <h2 class="promo-h2">${tx(T.dailyH)}${zhLine(T.dailyH)}</h2></div>
          <p>${tx(T.dailyP)}</p>
        </div>
        <div class="promo-grid">${items.map(cardHTML).join('')}</div>
        <p class="promo-photo-note">${tx(T.photoNote)}</p>
      </div>
    </section>`;
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
        <p class="promo-all"><a class="btn btn-ghost" href="products/">${tx(T.allProducts)} <span aria-hidden="true">→</span></a></p>
        <p class="promo-photo-note">${tx(T.photoNote)}</p>
        <div class="promo-other">
          <h3>${tx(T.otherH)}${zhLine(T.otherH)}</h3>
          <p>${tx(T.otherP)}</p>
          <a class="btn btn-small" href="products/#find">${tx(T.findBtn)}</a>
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
        <label class="checkbox-row"><input type="checkbox" name="agreed" /><span>${tx(T.agree).replace(/\{P\}/g, SITE + 'privacy.html')}</span></label>
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

  function productsHTML() {
    const items = groupItems(state.filter);
    const chips = [{ key: 'all', name: T.all }].concat(DATA.CATS, forApp ? [forApp] : []);
    return `
    <section class="prod-head" id="top">
      <div class="container">
        <p class="promo-kicker">${tx(T.prodKicker)}</p>
        <h1 class="promo-h2 prod-h1">${tx(T.prodH)}${zhLine(T.prodH)}</h1>
        <p class="prod-lede">${tx(T.prodP)}${zhLine(T.prodP)}</p>
        <a class="btn btn-ghost prod-find-btn" href="#find">${tx(T.findBtn)} <span aria-hidden="true">→</span></a>
      </div>
    </section>
    <section class="promo-gifts prod-list">
      <div class="container">
        <div class="promo-chips" role="tablist" aria-label="Filter">
          ${chips.map((c) => `
          <button type="button" role="tab" class="promo-chip ${state.filter === c.key ? 'is-on' : ''}" data-filter="${c.key}" aria-selected="${state.filter === c.key}">
            ${tx(c.name)}${isBi() ? `<span class="zh">${c.name.zh}</span>` : ''}
          </button>`).join('')}
        </div>
        <p class="prod-count">${items.length} ${tx(T.showing)}</p>
        <div class="promo-grid promo-grid--4" id="prodGrid">${items.map(cardHTML).join('')}</div>
        <p class="promo-photo-note">${tx(T.photoNote)}</p>
      </div>
    </section>
    ${findHTML()}`;
  }

  function findFormHTML() {
    if (state.findSent) {
      return `<div class="contact-success"><div class="check">${EO.icon('check', 26)}</div>
        <h3>${tx(T.findSentH)}</h3><p>${tx(T.findSentP)}${zhLine(T.findSentP)}</p></div>`;
    }
    return `
      <form id="findForm" data-kind="find" novalidate>
        <div class="field">
          <label for="f-what">${tx(T.what)}</label>
          <textarea id="f-what" name="what" rows="4" placeholder="${esc(tx(T.whatPh))}"></textarea>
        </div>
        <div class="field">
          <label for="f-link">${tx(T.link)} <span class="opt">(${tx(T.optional)})</span></label>
          <input id="f-link" name="link" type="url" inputmode="url" placeholder="${esc(tx(T.linkPh))}" autocomplete="off" />
        </div>
        <div class="field-row field-row--3">
          <div class="field"><label for="f-qty">${tx(T.qty)}</label><input id="f-qty" name="qty" type="text" placeholder="${esc(tx(T.qtyPh))}" autocomplete="off" /></div>
          <div class="field"><label for="f-budget">${tx(T.budget)}</label><input id="f-budget" name="budget" type="text" placeholder="${esc(tx(T.budgetPh))}" autocomplete="off" /></div>
          <div class="field"><label for="f-date">${tx(T.date)}</label><input id="f-date" name="date" type="date" autocomplete="off" /></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="f-name">${tx(T.name)}</label><input id="f-name" name="name" type="text" autocomplete="name" /></div>
          <div class="field"><label for="f-email">${tx(T.email)}</label><input id="f-email" name="email" type="email" autocomplete="email" /></div>
        </div>
        <p class="promo-logo-note">${tx(T.photoTip)}</p>
        <input type="text" name="website" tabindex="-1" autocomplete="off" class="promo-hp" aria-hidden="true" />
        <label class="checkbox-row"><input type="checkbox" name="agreed" /><span>${tx(T.agree).replace(/\{P\}/g, SITE + 'privacy.html')}</span></label>
        <p class="promo-error" id="findError" role="alert" hidden></p>
        <button type="submit" class="btn btn-primary promo-send" id="findSend">${tx(T.findSend)}</button>
      </form>`;
  }

  function findHTML() {
    return `
    <section class="find" id="find">
      <div class="container find-inner">
        <div class="find-copy">
          <p class="promo-kicker">${tx(T.findKicker)}</p>
          <h2 class="promo-h2">${tx(T.findH)}${zhLine(T.findH)}</h2>
          <p class="find-p">${tx(T.findP)}${zhLine(T.findP)}</p>
          <ol class="find-steps">${T.findSteps.map((x, n) => `<li><span>${n + 1}</span>${tx(x)}</li>`).join('')}</ol>
        </div>
        <div class="promo-form-card" id="findCard">${findFormHTML()}</div>
      </div>
    </section>`;
  }

  // product information template: one spec table, use ideas and a short FAQ, filled from DETAILS
  const SPEC_ORDER = ['material', 'colors', 'size', 'includes', 'imprint', 'scent', 'packaging', 'weight', 'care', 'rush', 'origin', 'note'];
  function detailsHTML(i) {
    const sp = i.spec || {};
    const rows = [];
    const row = (label, val) => rows.push(`<div class="pd-row"><dt>${tx(label)}</dt><dd>${val}</dd></div>`);
    SPEC_ORDER.forEach((k) => {
      if (k === 'size') {
        if (sp.size2) row(T.spec.size, `${tx(sp.size2)}${zhLine(sp.size2)}`);
        else if (i.size) row(T.spec.size, esc(i.size));
        return;
      }
      if (sp[k]) row(T.spec[k], `${tx(sp[k])}${zhLine(sp[k])}`);
    });
    row(T.specMin, `${i.min} ${tx(T.pcs)}`);
    if (i.days) row(T.specProd, tx(T.specProdV).replace('{n}', i.days));
    row(T.specCode, i.id);
    return `
    <section class="pd-more" id="details">
      <div class="container pd-more-inner">
        <div class="pd-block pd-block--table">
          <h2 class="pd-h2">${tx(T.detailsH)}${zhLine(T.detailsH)}</h2>
          <dl class="pd-table">${rows.join('')}</dl>
        </div>
        <div class="pd-side">
          ${i.ideas.length ? `
          <div class="pd-block">
            <h2 class="pd-h2">${tx(T.ideasH)}${zhLine(T.ideasH)}</h2>
            <ol class="pd-ideas">${i.ideas.map((x) => `<li>${tx(x)}${zhLine(x)}</li>`).join('')}</ol>
          </div>` : ''}
          <div class="pd-block">
            <h2 class="pd-h2">${tx(T.faqH)}${zhLine(T.faqH)}</h2>
            <div class="pd-faq">${T.faq.map(([q, a], n) => `
              <details${n === 0 ? ' open' : ''}><summary>${tx(q)}${zhLine(q)}</summary><p>${tx(a)}${zhLine(a)}</p></details>`).join('')}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function productHTML() {
    const i = byId[document.body.dataset.id];
    if (!i) return productsHTML();
    const apps = DATA.APPS.filter((a) => a.items.includes(i.id));
    const relIds = [...new Set(apps.flatMap((a) => a.items))].filter((x) => x !== i.id).slice(0, 4);
    const on = state.list.includes(i.id);
    const low = i.tiers.length ? Math.min(...i.tiers.map((t) => t[1])) : 0;
    const g = i.gallery[state.gi] || i.img;
    return `
    <nav class="pd-crumbs container" aria-label="Breadcrumb">
      <a href="${ROOT}">EORACCO Custom</a><span aria-hidden="true">/</span><a href="${ROOT}products/">${tx(T.crumbs)}</a><span aria-hidden="true">/</span><span>${tx(i.name)}</span>
    </nav>
    <section class="pd" id="top">
      <div class="container pd-inner">
        <div class="pd-gallery">
          <div class="pd-main"><img id="pdMain" src="${g}" alt="${esc(i.name.en)}" fetchpriority="high" decoding="async"${state.gi ? '' : fitAttr(i)} /></div>
          ${i.gallery.length > 1 ? `<div class="pd-thumbs" role="list">${i.gallery.map((u, n) => `
            <button type="button" role="listitem" class="pd-thumb ${n === state.gi ? 'is-on' : ''}" data-gi="${n}" aria-label="Photo ${n + 1}"><img src="${u}" alt="" loading="lazy" decoding="async" /></button>`).join('')}</div>` : ''}
        </div>
        <div class="pd-info">
          <p class="promo-kicker">${apps.map((a) => tx(a.name)).join(' · ')}</p>
          <h1 class="pd-h1">${tx(i.name)}${zhLine(i.name, 'zh-line pd-h1-zh')}</h1>
          <p class="pd-about">${tx(i.about)}${zhLine(i.about)}</p>
          ${i.hl.length ? `<ul class="pd-hl">${i.hl.map((h) => `<li>${tx(h)}${zhLine(h)}</li>`).join('')}</ul>` : ''}
          <div class="pd-price">
            ${i.tiers.length ? `
            <p class="pd-from">${tx(T.from)} <b>${money(low)}</b> <span>/ ${tx(T.pcs)}</span></p>
            <table class="pd-tiers">
              <thead><tr><th>${tx(T.qtyCol)}</th><th>${tx(T.priceCol)}</th></tr></thead>
              <tbody>${i.tiers.map(([q, p]) => `<tr><td>${q.toLocaleString('en-US')}+</td><td>${money(p)}</td></tr>`).join('')}</tbody>
            </table>
            <p class="pd-note">${tx(T.priceNote)}</p>` : `<p class="pd-note pd-note--ask">${tx(T.priceAsk)}</p>`}
          </div>
          <dl class="pd-specs">
            <div><dt>${tx(T.specMin)}</dt><dd>${i.min} ${tx(T.pcs)}</dd></div>
            ${i.days ? `<div><dt>${tx(T.specProd)}</dt><dd>${tx(T.specProdV).replace('{n}', i.days)}</dd></div>` : ''}
          </dl>
          <div class="pd-cta">
            <button type="button" class="btn btn-primary promo-add ${on ? 'is-added' : ''}" data-add="${i.id}" aria-pressed="${on}">${tx(on ? T.added : T.add)}</button>
            <a class="btn btn-ghost" href="${ROOT}#start" data-ask="${i.id}">${tx(T.askThis)}</a>
          </div>
          ${apps.length ? `<p class="pd-good">${tx(T.goodFor)}: ${apps.map((a) => `<a href="${ROOT}products/?for=${a.key}">${tx(a.name)}</a>`).join(' · ')}</p>` : ''}
          <p class="promo-photo-note pd-photo-note">${tx(T.photoNote)}</p>
        </div>
      </div>
    </section>
    ${detailsHTML(i)}
    ${relIds.length ? `
    <section class="promo-gifts pd-related">
      <div class="container">
        <div class="sec-head"><h2 class="promo-h2">${tx(T.related)}${zhLine(T.related)}</h2><a class="btn btn-ghost" href="${ROOT}products/">${tx(T.backAll)} <span aria-hidden="true">→</span></a></div>
        <div class="promo-grid promo-grid--4">${relIds.map((id) => cardHTML(byId[id])).join('')}</div>
      </div>
    </section>` : ''}`;
  }

  function syncLang() {
    const l = EO.lang;
    document.body.classList.remove('lang-en', 'lang-zh', 'lang-bi');
    document.body.classList.add('lang-' + l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  }

  function render() {
    // keep anything the visitor already typed when the language changes
    const grab = (id) => { const f = document.getElementById(id); return f ? Object.fromEntries([...f.elements].filter((e) => e.name).map((e) => [e.name, e.type === 'checkbox' ? e.checked : e.value])) : null; };
    const saved = grab('promoForm');
    const savedFind = grab('findForm');

    const nav = document.getElementById('giftNav');
    const foot = document.getElementById('giftFooter');
    if (nav) nav.innerHTML = navHTML();
    if (foot) foot.innerHTML = footHTML();
    syncLang();
    const body = { home: () => `${heroHTML()}${sigHTML()}${boxHTML()}${dailyHTML()}${whoHTML()}${whyHTML()}${howHTML()}${priceHTML()}${startHTML()}`, products: productsHTML, product: productHTML }[VIEW];
    main.innerHTML = body() + '<div class="promo-bar" id="promoBar" hidden></div>';

    const restore = (form, vals) => { if (form && vals) Object.entries(vals).forEach(([k, v]) => { const el = form.elements[k]; if (el) { if (el.type === 'checkbox') el.checked = v; else el.value = v; } }); };
    const form = document.getElementById('promoForm');
    restore(form, saved);
    if (form) form.addEventListener('submit', onSubmit);
    wireFind(savedFind);
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
    bar.innerHTML = `<span><b>${n}</b> ${tx(n === 1 ? T.barOne : T.barMany)}</span><a class="btn btn-small btn-dark" href="${homeAnchor('start')}">${tx(T.barGo)}</a>`;
  }

  main.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-app]');
    if (chip) {
      state.app = chip.dataset.app;
      main.querySelectorAll('[data-app]').forEach((c) => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
      document.getElementById('appPanel').innerHTML = appPanelHTML();
      return;
    }
    const th = e.target.closest('[data-gi]');
    if (th) {
      state.gi = +th.dataset.gi;
      const pi = byId[document.body.dataset.id];
      const pm = document.getElementById('pdMain');
      pm.src = pi.gallery[state.gi];
      pm.style.transform = state.gi === 0 && pi.fit ? `scale(${pi.fit[0]})` : '';
      pm.style.transformOrigin = state.gi === 0 && pi.fit ? `${pi.fit[1]}% ${pi.fit[2]}%` : '';
      main.querySelectorAll('[data-gi]').forEach((b) => b.classList.toggle('is-on', b === th));
      return;
    }
    const ask = e.target.closest('[data-ask]');
    if (ask && !state.list.includes(ask.dataset.ask)) { state.list = state.list.concat(ask.dataset.ask); saveList(); }
    const f = e.target.closest('[data-filter]');
    if (f) {
      state.filter = f.dataset.filter;
      const items = groupItems(state.filter);
      main.querySelectorAll('[data-filter]').forEach((c) => { const on = c === f; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on); });
      document.getElementById('prodGrid').innerHTML = items.map(cardHTML).join('');
      main.querySelector('.prod-count').textContent = `${items.length} ${tx(T.showing)}`;
      return;
    }
    const add = e.target.closest('[data-add]');
    if (add) {
      const id = add.dataset.add;
      state.list = state.list.includes(id) ? state.list.filter((x) => x !== id) : state.list.concat(id);
      saveList();
      refreshList();
      if (state.list.includes(id)) { add.classList.remove('pop'); void add.offsetWidth; add.classList.add('pop'); }
      return;
    }
    const rm = e.target.closest('[data-remove]');
    if (rm) { state.list = state.list.filter((x) => x !== rm.dataset.remove); saveList(); refreshList(); }
  });

  function wireFind(vals) {
    const form = document.getElementById('findForm');
    if (!form) return;
    if (vals) Object.entries(vals).forEach(([k, v]) => { const el = form.elements[k]; if (el) { if (el.type === 'checkbox') el.checked = v; else el.value = v; } });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('findSend');
      const err = document.getElementById('findError');
      if (btn.dataset.sending) return;
      const v = (k) => form.elements[k].value.trim();
      const checks = [
        [form.what, !!v('what'), T.needWhat],
        [form.name, !!v('name'), T.need],
        [form.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')), T.needEmail],
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
      const message = [
        `Looking for 想找: ${v('what')}`,
        v('link') && `Reference link 参考链接: ${v('link')}`,
        v('qty') && `Quantity 数量: ${v('qty')}`,
        v('budget') && `Budget per piece 每件预算: ${v('budget')}`,
        v('date') && `In-hand date 送达日期: ${v('date')}`,
      ].filter(Boolean).join('\n');
      const data = new URLSearchParams({
        name: v('name'), email: v('email'), business: '', phone: '',
        need: 'EORACCO Custom 代找产品 · Product search',
        message, plan: '', lang: EO.lang,
        website: form.website.value,
        t: String(Date.now() - openedAt),
      });
      const ok = () => { state.findSent = true; document.getElementById('findCard').innerHTML = findFormHTML(); };
      const fail = () => { delete btn.dataset.sending; btn.textContent = tx(T.findSend); err.textContent = tx(T.fail); err.hidden = false; };
      fetch(FORM_ENDPOINT, { method: 'POST', body: data })
        .then((r) => r.json())
        .then((j) => (j && j.ok ? ok() : fail()))
        .catch(fail);
    });
  }

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

    const ok = () => { state.sent = true; state.list = []; saveList(); document.getElementById('promoFormCard').innerHTML = formHTML(); updateBar(); };
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
