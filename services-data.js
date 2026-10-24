// EORACCO — shared service catalogue (one source of truth for nav, home and category pages).
// Edit `price` here and every page follows.
(function () {
  const ICONS = {
    gift:    '<rect x="3" y="8" width="18" height="13" rx="1.5"/><path d="M3 12h18M12 8v13"/><path d="M12 8c-1.5-3-5-3.5-5-1.2C7 8 9.5 8 12 8zM12 8c1.5-3 5-3.5 5-1.2C17 8 14.5 8 12 8z"/>',
    menu:    '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
    target:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    share:   '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    mail:    '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>',
    phone:   '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mic:     '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    code:    '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>',
    image:   '<rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="9" cy="10" r="1.6"/><path d="m3 17 5-5 5 5 3-3 5 5"/>',
    film:    '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/>',
    spark:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    slides:  '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M12 16v4M8 20h8M7 12l3-3 2 2 4-4"/>',
    home:    '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    play:    '<path d="M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="m10 9 5 3-5 3z"/>',
    cube:    '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    smile:   '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><circle cx="9" cy="10" r="0.9" fill="currentColor"/><circle cx="15" cy="10" r="0.9" fill="currentColor"/>',
    app:     '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 5.5h3"/><circle cx="12" cy="18.2" r="0.6" fill="currentColor"/>',
    megaphone: '<path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
    brush:   '<path d="M14 4l6 6-8.5 8.5a3 3 0 0 1-4.2 0L7 18.2a3 3 0 0 1 0-4.2z"/><path d="M4 20c1.5 0 3-.5 3-2"/>',
    check:   '<path d="m5 12 5 5L20 7"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    plus:    '<path d="M12 5v14M5 12h14"/>',
  };
  const icon = (name, size = 20, stroke = 1.5) => ICONS[name]
    ? `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`
    : '';

  const L = (en, zh) => ({ en, zh });

  const CATEGORIES = [
    {
      key: 'marketing', page: 'marketing.html', icon: 'megaphone',
      name: L('Marketing', '营销增长'),
      headline: L('Marketing you don’t have to think about.', '营销交给我们，您专心做生意。'),
      sub: L('Paid ads, social, email and SMS, call tracking and SEO, run in English and Chinese.',
             '广告投放、社媒、邮件短信、来电追踪和 SEO，中英双语执行。'),
      card: { img: 'https://images.unsplash.com/photo-1590098563176-07884b06d7f7?w=900&h=1300&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.72&fp-z=1.7&q=80&auto=format', hero: 'images/services/hero-marketing.webp?v=2' },
      services: [
        { id: 'paid-ads', short: L('Ads', '广告'),  icon: 'target', img: 'images/services/paid-ads.webp?v=2', plan: 'ads-single', chiclet: true,
          name: L('Paid advertising', '付费广告投放'),
          desc: L('Google and Meta campaigns set up, run and improved every week, with a monthly report in plain language.',
                  'Google 和 Meta 广告的搭建、投放与每周优化，每月一份看得懂的报告。'),
          includes: [L('Account setup and conversion tracking', '广告账户搭建与转化追踪'),
                     L('Weekly optimization and new ad tests', '每周优化与新素材测试'),
                     L('Monthly report in English or Chinese', '中文或英文月度报告')],
          price: { from: 800, unit: 'mo' }, note: L('Google and Meta together $1,300/mo', 'Google + Meta 双平台 $1,300/月') },
        { id: 'social', short: L('Social', '社媒'),  icon: 'share', img: 'images/services/social.webp?v=2', plan: 'social-mgmt', chiclet: true,
          name: L('Social media', '社交媒体运营'),
          desc: L('Posting, captions and replies on Instagram, Facebook, TikTok and Xiaohongshu.',
                  'Instagram、Facebook、TikTok 和小红书的发布、文案与互动。'),
          includes: [L('Monthly content calendar', '每月内容排期'),
                     L('Captions in English and Chinese', '中英文文案'),
                     L('Comment and DM replies', '评论与私信回复')],
          price: { from: 500, unit: 'mo' }, note: L('Content creation +$500, full package $900/mo', '内容制作另加 $500，全包 $900/月') },
        { id: 'email-sms', short: L('Email', '邮件'),  icon: 'mail', img: 'images/services/email-sms.webp?v=2', plan: 'email-starter', chiclet: true,
          name: L('Email & SMS', '邮件与短信营销'),
          desc: L('Campaigns and automated flows that keep in touch with past customers.',
                  '用营销邮件和自动化流程，和老客人保持联系。'),
          includes: [L('Welcome, win-back and abandoned-cart flows', '欢迎、召回和弃购提醒流程'),
                     L('Two to four campaigns a month', '每月 2–4 封营销邮件'),
                     L('Runs on your own Klaviyo or Mailchimp', '在您自己的 Klaviyo 或 Mailchimp 账号运行')],
          price: { from: 600, unit: 'mo' }, note: L('One-time setup $300', '一次性设置费 $300') },
        { id: 'call-tracking', icon: 'phone', img: 'images/services/call-tracking.webp?v=2', plan: 'call-tracking',
          name: L('Call tracking', '来电追踪'),
          desc: L('See which ad or keyword each call came from.', '看清每通电话来自哪条广告、哪个关键词。'),
          includes: [L('A tracking number for each channel', '每个渠道一个追踪号码'),
                     L('Call recordings and reports', '通话录音与报告'),
                     L('Connected to Google Ads', '与 Google Ads 打通')],
          price: { from: 200, unit: 'mo' }, note: L('Setup $200', '设置费 $200') },
        { id: 'ai-voice', short: L('AI Voice', 'AI 语音'),  icon: 'mic', img: 'images/services/ai-voice.webp?v=2', plan: 'ai-voice', chiclet: true,
          name: L('AI voice agent', 'AI 电话接待'),
          desc: L('Answers calls 24/7, qualifies leads and books appointments when you can’t pick up.',
                  '全天候接听来电、筛选客户并预约，您没空接也不漏单。'),
          includes: [L('Script in English or Chinese', '中文或英文定制话术'),
                     L('Lead details sent to you after every call', '每通电话后把客户资料发给您'),
                     L('Works with your existing number', '沿用您现有的电话号码')],
          price: { from: 200, unit: 'mo' }, note: L('Setup $1,200', '设置费 $1,200') },
        { id: 'web-seo', icon: 'code', img: 'images/services/web-seo.webp?v=2', plan: 'web-seo',
          name: L('Web & SEO', '网站与 SEO'),
          desc: L('Keep your site compliant, measured and set up properly for Google search.', '让网站合规、数据可追踪，并按 Google 搜索的要求设置好。'),
          includes: [L('Privacy policy and cookie banner', '隐私政策与 Cookie 提示'),
                     L('Google Analytics 4 and Tag Manager setup', 'GA4 与 Google 跟踪代码管理器配置'),
                     L('Monthly SEO and Google Business Profile updates', '每月 SEO 与商家资料更新')],
          price: { from: 400, unit: 'mo' }, note: L('Full setup bundle $900', '全套设置 $900') },
      ],
    },
    {
      key: 'creative', page: 'creative.html', icon: 'brush',
      name: L('Creative', '内容创意'),
      headline: L('Creative made for the feed.', '为信息流而做的内容。'),
      sub: L('Ad images, holiday promotions, menus and posters, short-form video and motion design.', '广告图、节日促销、菜单海报、短视频和动态设计。'),
      card: { img: 'https://images.unsplash.com/photo-1780642213026-cf15a7676c6b?w=900&h=1300&fit=crop&q=80&auto=format', hero: 'images/services/hero-creative.webp?v=2' },
      services: [
        { id: 'ad-creative', short: L('Ad Images', '广告图'),  icon: 'image', img: 'images/services/ad-creative.webp?v=2', plan: 'creative-starter', chiclet: true,
          name: L('Ad creative', '广告素材图'),
          desc: L('Static ad images sized for Meta, Google, TikTok and Instagram.', '为 Meta、Google、TikTok 和 Instagram 做好尺寸的广告图。'),
          includes: [L('8 or 16 new images a month', '每月 8 张或 16 张新图'),
                     L('Every size each platform needs', '各平台需要的尺寸全部做齐'),
                     L('English and Chinese versions', '中英文两个版本')],
          price: { from: 400, unit: 'mo' }, note: L('16 images $700/mo · single image $75', '16 张 $700/月 · 单张 $75') },
        { id: 'holiday-promo', short: L('Holiday Promos', '节日促销'), icon: 'gift', img: 'images/services/holiday-promo.webp', plan: 'holiday-promo', chiclet: true,
          name: L('Holiday promotion kit', '节日促销活动包'),
          desc: L('One holiday campaign designed across every channel: Lunar New Year, Mid-Autumn, Thanksgiving, Mother’s Day and more.',
                  '一个节日活动，所有渠道一起做好：春节、中秋、感恩节、母亲节等。'),
          includes: [L('Poster and in-store sign files', '海报与店内标牌设计文件'),
                     L('Instagram and Facebook posts in English and Chinese', 'Instagram 与 Facebook 中英文帖子'),
                     L('SMS and email copy for your customer list', '发给老客人的短信与邮件文案')],
          price: { from: 300, unit: 'campaign' }, note: L('Book about three weeks before the holiday', '建议节日前三周预订') },
        { id: 'menu-poster', short: L('Menus & Posters', '菜单海报'), icon: 'menu', img: 'images/services/menu-poster.webp', plan: 'menu-poster', chiclet: true,
          name: L('Menu and poster design', '菜单与海报设计'),
          desc: L('Bilingual menus, table QR stands and in-store posters, delivered as print-ready files.',
                  '中英双语菜单、桌面扫码点餐牌和店内海报，交付可直接印刷的文件。'),
          includes: [L('English and Chinese on every design', '每款设计都有中英文'),
                     L('Print-ready PDF plus a version for screens', '可印刷 PDF，外加电子屏版本'),
                     L('Two rounds of changes', '两轮修改')],
          price: { from: 150, unit: 'design' }, note: L('Printing is arranged by you; we send the files', '印刷由店家自行安排，我们交付文件') },
        { id: 'video', short: L('Video', '视频'),  icon: 'film', video: 'video/pom-couch.mp4', poster: 'images/apps/pom-couch.jpg', imgNote: L('A spot we produced for our game Pompolo', '我们为自家游戏 Pompolo 制作的短视频'), plan: 'short-video', chiclet: true,
          name: L('Short-form video', '短视频剪辑'),
          desc: L('Reels, Shorts and TikTok ads edited for vertical screens.', '为竖屏剪辑的 Reels、Shorts 和 TikTok 广告。'),
          includes: [L('A hook in the first two seconds', '前两秒抓住注意力'),
                     L('Captions burned in', '字幕直接压在画面上'),
                     L('9:16, 1:1 and 16:9 exports', '导出 9:16、1:1、16:9')],
          price: { from: 100, unit: 'video' } },
        { id: 'motion', icon: 'spark', img: 'film/f060.webp',
          name: L('Motion design', '动态设计'),
          desc: L('After Effects animation for brand films, launches and title sequences, like the Statues short on our home page.',
                  '用 After Effects 制作品牌短片、新品发布和片头动画，就像首页那支 Statues 短片。'),
          includes: [L('Storyboard before any animation', '先出分镜再动画'),
                     L('Music and sound design', '配乐与音效'),
                     L('Cutdowns for social', '社媒短版')],
          price: { quote: true } },
      ],
    },
    {
      key: 'apps', page: 'apps.html', icon: 'app',
      name: L('Apps', 'App 开发'),
      headline: L('iPhone apps, from first build to the App Store.', '从第一版到上架的 iPhone App。'),
      sub: L('Native iPhone and iPad apps in SwiftUI, from first build to the App Store.', '用 SwiftUI 开发原生 iPhone 与 iPad 应用，从第一版到上架 App Store。'),
      card: { img: 'https://images.unsplash.com/photo-1591054333829-3a3ce5d57fca?w=900&h=1300&fit=crop&q=80&auto=format' },
      services: [
        { id: 'ios', short: L('iOS Apps', 'iOS App'),  icon: 'app', chiclet: true,
          name: L('iOS app development', 'iOS App 开发'),
          desc: L('Native iPhone and iPad apps, designed, built and shipped to the App Store.', '原生 iPhone 与 iPad 应用，从设计、开发到上架。'),
          includes: [L('Product design and clickable prototype', '产品设计与可点击原型'),
                     L('SwiftUI build for iPhone and iPad', 'SwiftUI 开发，支持 iPhone 与 iPad'),
                     L('App Store listing and launch', 'App Store 页面与上架')],
          price: { quote: true } },
        { id: 'app-marketing', short: L('App Promo', 'App 推广'), icon: 'megaphone',
          video: 'video/tt-party.mp4', poster: 'images/apps/tt-party.jpg', imgNote: L('A launch spot we produced for TwoTake', '我们为 TwoTake 制作的推广短片'),
          name: L('App launch marketing', 'App 上线推广'),
          desc: L('Get your app found and downloaded: store page, launch videos and install campaigns.', '让您的 App 被看到、被下载：商店页面、推广视频与下载广告。'),
          includes: [L('App Store screenshots and preview video', 'App Store 截图与预览视频'),
                     L('Launch spots for TikTok, Reels, Shorts and YouTube', 'TikTok、Reels、Shorts 与 YouTube 推广短片'),
                     L('Apple Search Ads and Meta app-install campaigns', 'Apple Search Ads 与 Meta 下载广告')],
          price: { quote: true } },
      ],
    },
  ];

  const APPS = [
    { key: 'pompolo', name: 'Pompolo', icon: 'images/apps/pompolo-icon.webp', shot: 'images/apps/pompolo-preview-poster.jpg',
      url: 'https://apps.apple.com/us/app/id6816869216',
      kind: L('Party game · iPhone & iPad', '派对游戏 · iPhone 与 iPad'),
      desc: L('A water-balloon battle for up to four players. Phones become controllers, the game casts to a TV with AirPlay, and it plays in English, Chinese and Spanish.',
              '最多四人同玩的水球对战游戏。手机就是手柄，可用 AirPlay 投到电视，支持英文、中文和西班牙文。') },
    { key: 'twotake', name: 'TwoTake', icon: 'images/apps/twotake-icon.webp', shot: 'images/apps/twotake-ui.webp',
      url: 'https://apps.apple.com/us/app/twotake-9-16-16-9-camera/id6802524670',
      kind: L('Camera · iPhone', '相机 · iPhone'),
      desc: L('Shoot once and get both a 9:16 vertical and a 16:9 horizontal video. The horizontal is a center crop of the same vertical frame.',
              '拍一次，同时得到 9:16 竖版和 16:9 横版视频。横版是从同一个竖版画面居中裁切出来的。') },
  ];

  const UNIT = {
    mo: L('/mo', '/月'), video: L(' per video', '/条'), image: L(' per image', '/张'),
    deck: L(' per deck', '/套'), project: L(' per project', '/项'),
    campaign: L(' per campaign', '/次'), design: L(' per design', '/款'),
  };

  // ---------- language ----------
  let lang = 'bi';
  try { lang = localStorage.getItem('eoracco-lang') || 'bi'; } catch (e) { /* storage unavailable */ }
  const langHooks = [];

  // ---------- plan (shared between pages) ----------
  const PLAN_KEY = 'eoracco-plan';
  let plan = [];
  try { plan = JSON.parse(localStorage.getItem(PLAN_KEY) || '[]') || []; } catch (e) { plan = []; }
  const planHooks = [];
  const savePlan = () => {
    try { localStorage.setItem(PLAN_KEY, JSON.stringify(plan)); } catch (e) { /* storage unavailable */ }
    planHooks.forEach((fn) => fn(plan.slice()));
  };

  window.EO = {
    ICONS, icon, CATEGORIES, APPS, UNIT,
    allServices: () => CATEGORIES.flatMap((c) => c.services.map((s) => ({ ...s, cat: c }))),
    category: (key) => CATEGORIES.find((c) => c.key === key),
    get lang() { return lang; },
    // pick text for the current language; in bilingual mode English is primary
    tx: (o) => (o ? (lang === 'zh' ? o.zh : o.en) : ''),
    isBi: () => lang === 'bi',
    isZh: () => lang === 'zh',
    setLang(next) {
      lang = next;
      try { localStorage.setItem('eoracco-lang', next); } catch (e) { /* storage unavailable */ }
      langHooks.forEach((fn) => fn(next));
    },
    onLang(fn) { langHooks.push(fn); },
    priceText(p) {
      if (!p || p.quote) return lang === 'zh' ? '按项目报价' : 'Quoted per project';
      const amt = '$' + p.from.toLocaleString() + (lang === 'zh' ? UNIT[p.unit].zh : UNIT[p.unit].en);
      return lang === 'zh' ? `${amt} 起` : `From ${amt}`;
    },
    plan: {
      get: () => plan.slice(),
      has: (id) => plan.includes(id),
      set(ids) { plan = Array.from(new Set(ids)); savePlan(); },
      toggle(id) { plan = plan.includes(id) ? plan.filter((x) => x !== id) : plan.concat(id); savePlan(); return plan.includes(id); },
      onChange(fn) { planHooks.push(fn); },
    },
  };
})();
