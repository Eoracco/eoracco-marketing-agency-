// EORACCO — shared service catalogue (one source of truth for nav, home and category pages).
// Prices for the 3D / project services are first drafts; edit `price` here and every page follows.
(function () {
  const ICONS = {
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
      headline: L('Marketing that brings in customers.', '带来客人的营销。'),
      sub: L('Paid ads, social, email and SMS, call tracking and SEO, run in English and Chinese.',
             '广告投放、社媒、邮件短信、来电追踪和 SEO，中英双语执行。'),
      card: { img: 'images/svc-01.webp' },
      services: [
        { id: 'paid-ads', short: L('Ads', '广告'),  icon: 'target', img: 'images/svc-01.webp', plan: 'ads-single', chiclet: true,
          name: L('Paid advertising', '付费广告投放'),
          desc: L('Google and Meta campaigns set up, run and improved every week, with a monthly report in plain language.',
                  'Google 和 Meta 广告的搭建、投放与每周优化，每月一份看得懂的报告。'),
          includes: [L('Account setup and conversion tracking', '广告账户搭建与转化追踪'),
                     L('Weekly optimization and new ad tests', '每周优化与新素材测试'),
                     L('Monthly report in English or Chinese', '中文或英文月度报告')],
          price: { from: 800, unit: 'mo' }, note: L('Google and Meta together $1,300/mo', 'Google + Meta 双平台 $1,300/月') },
        { id: 'social', short: L('Social', '社媒'),  icon: 'share', img: 'images/svc-02.webp', plan: 'social-mgmt', chiclet: true,
          name: L('Social media', '社交媒体运营'),
          desc: L('Posting, captions and replies on Instagram, Facebook, TikTok and Xiaohongshu.',
                  'Instagram、Facebook、TikTok 和小红书的发布、文案与互动。'),
          includes: [L('Monthly content calendar', '每月内容排期'),
                     L('Captions in English and Chinese', '中英文文案'),
                     L('Comment and DM replies', '评论与私信回复')],
          price: { from: 500, unit: 'mo' }, note: L('Content creation +$500, full package $900/mo', '内容制作另加 $500，全包 $900/月') },
        { id: 'email-sms', short: L('Email', '邮件'),  icon: 'mail', plan: 'email-starter', chiclet: true,
          name: L('Email & SMS', '邮件与短信营销'),
          desc: L('Campaigns and automated flows that bring past customers back.',
                  '用营销邮件和自动化流程，把老客人带回来。'),
          includes: [L('Welcome, win-back and abandoned-cart flows', '欢迎、召回和弃购提醒流程'),
                     L('Two to four campaigns a month', '每月 2–4 封营销邮件'),
                     L('Runs on your own Klaviyo or Mailchimp', '在您自己的 Klaviyo 或 Mailchimp 账号运行')],
          price: { from: 600, unit: 'mo' }, note: L('One-time setup $300', '一次性设置费 $300') },
        { id: 'call-tracking', icon: 'phone', img: 'images/svc-06.webp', plan: 'call-tracking',
          name: L('Call tracking', '来电追踪'),
          desc: L('See which ads and keywords make the phone ring.', '看清是哪条广告、哪个关键词带来了电话。'),
          includes: [L('A tracking number for each channel', '每个渠道一个追踪号码'),
                     L('Call recordings and reports', '通话录音与报告'),
                     L('Connected to Google Ads', '与 Google Ads 打通')],
          price: { from: 200, unit: 'mo' }, note: L('Setup $200', '设置费 $200') },
        { id: 'ai-voice', short: L('AI Voice', 'AI 语音'),  icon: 'mic', img: 'images/svc-07.webp', plan: 'ai-voice', chiclet: true,
          name: L('AI voice agent', 'AI 电话接待'),
          desc: L('Answers calls 24/7, qualifies leads and books appointments when you can’t pick up.',
                  '全天候接听来电、筛选客户并预约，您没空接也不漏单。'),
          includes: [L('Script in English or Chinese', '中文或英文定制话术'),
                     L('Lead details sent to you after every call', '每通电话后把客户资料发给您'),
                     L('Works with your existing number', '沿用您现有的电话号码')],
          price: { from: 200, unit: 'mo' }, note: L('Setup $1,200', '设置费 $1,200') },
        { id: 'web-seo', icon: 'code', img: 'images/svc-08.webp', plan: 'web-seo',
          name: L('Web & SEO', '网站与 SEO'),
          desc: L('Keep your site compliant, measured and easy to find on Google.', '让网站合规、数据可追踪，并在 Google 上被找到。'),
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
      sub: L('Ad images, short-form video, motion design and pitch decks.', '广告图、短视频、动态设计和路演 PPT。'),
      card: { img: 'images/svc-04.webp' },
      services: [
        { id: 'ad-creative', short: L('Ad Images', '广告图'),  icon: 'image', img: 'images/svc-03.webp', plan: 'creative-starter', chiclet: true,
          name: L('Ad creative', '广告素材图'),
          desc: L('Static ad images sized for Meta, Google, TikTok and Instagram.', '为 Meta、Google、TikTok 和 Instagram 做好尺寸的广告图。'),
          includes: [L('8 or 16 new images a month', '每月 8 张或 16 张新图'),
                     L('Every size each platform needs', '各平台需要的尺寸全部做齐'),
                     L('English and Chinese versions', '中英文两个版本')],
          price: { from: 400, unit: 'mo' }, note: L('16 images $700/mo · single image $75', '16 张 $700/月 · 单张 $75') },
        { id: 'video', short: L('Video', '视频'),  icon: 'film', img: 'images/svc-04.webp', plan: 'short-video', chiclet: true,
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
        { id: 'pitch-deck', icon: 'slides', plan: 'pitch-deck',
          name: L('Pitch deck design', '路演 PPT 设计'),
          desc: L('Investor and sales decks that read clearly on a screen and as a PDF.', '投资人和销售用的演示文稿，投屏和 PDF 都清楚好读。'),
          includes: [L('Up to 15 slides', '最多 15 页'),
                     L('Charts rebuilt from your numbers', '用您的数据重做图表'),
                     L('Editable Keynote, PowerPoint or Google Slides file', '可编辑的 Keynote、PowerPoint 或 Google Slides 文件')],
          price: { from: 1200, unit: 'deck' } },
      ],
    },
    {
      key: 'visualization', page: 'visualization.html', icon: 'cube', isNew: true,
      name: L('3D', '3D 可视化'),
      longName: L('3D Visualization', '3D 可视化'),
      headline: L('See it before it’s built.', '还没盖好，先看见。'),
      sub: L('Photoreal renderings and walkthrough videos for ADUs and remodels, 3D product images, and brand mascots.',
             'ADU 和改建的写实效果图与漫游视频、3D 产品图，以及品牌吉祥物。'),
      card: { img: 'film/f045.webp' },
      services: [
        { id: 'renderings', short: L('Renderings', '效果图'),  icon: 'home', plan: 'render-ext', chiclet: true,
          name: L('ADU & remodel renderings', 'ADU 与改建效果图'),
          desc: L('Photoreal exterior and interior images from your plans, so buyers and homeowners can see the finished space.',
                  '根据您的图纸做出写实的外观和室内效果图，让买家和屋主提前看到完工的样子。'),
          includes: [L('Built from your floor plans and site photos', '依据您的平面图和现场照片'),
                     L('Daytime, dusk and interior views', '白天、黄昏与室内视角'),
                     L('Two rounds of revisions', '两轮修改')],
          price: { from: 450, unit: 'image' }, note: L('Interior views from $350', '室内效果图 $350 起') },
        { id: 'walkthrough', short: L('Walkthrough', '漫游视频'),  icon: 'play', plan: 'walkthrough', chiclet: true,
          name: L('3D walkthrough video', '3D 漫游视频'),
          desc: L('A camera move through the finished home, for listings, pre-sales and social.',
                  '镜头带您走进完工后的房子，适合房源展示、预售和社媒。'),
          includes: [L('Up to 30 seconds in 4K', '最长 30 秒，4K'),
                     L('Music and on-screen captions', '配乐与画面字幕'),
                     L('A vertical cut for Reels', '附竖版 Reels 剪辑')],
          price: { from: 1800, unit: 'video' } },
        { id: 'product-3d', short: L('3D Product', '3D 产品'),  icon: 'cube', plan: 'product-render', chiclet: true,
          name: L('3D product renders', '3D 产品渲染'),
          desc: L('Studio-quality product images and short animations, without a photo shoot.',
                  '不用实拍，也能做出棚拍级的产品图和短动画。'),
          includes: [L('Built from your product photos or CAD files', '依据产品照片或 CAD 文件建模'),
                     L('White-background and lifestyle scenes', '白底图与场景图'),
                     L('Optional 15-second spin animation', '可加 15 秒旋转动画')],
          price: { from: 250, unit: 'image' }, note: L('Animation from $900', '产品动画 $900 起') },
        { id: 'mascot', icon: 'smile', img: 'images/apps/pompolo-art.webp', imgNote: L('Characters from our own game, Pompolo', '图为我们自己的游戏 Pompolo 中的角色'), plan: 'mascot-2d',
          name: L('Brand mascot', '品牌吉祥物'),
          desc: L('An original character for your brand, drawn in 2D or built in 3D.', '为品牌设计的原创角色，2D 或 3D 都可以。'),
          includes: [L('Three concept directions', '三个初稿方向'),
                     L('Front, side and back views', '正面、侧面、背面三视图'),
                     L('Full rights transferred to you', '版权完整转让给您')],
          price: { from: 600, unit: 'project' }, note: L('3D mascot from $1,800', '3D 吉祥物 $1,800 起') },
      ],
      steps: [
        { title: L('Send plans and photos', '发来图纸和照片'), desc: L('Floor plans, elevations or product photos, plus any measurements.', '平面图、立面图或产品照片，以及尺寸。') },
        { title: L('Pick a style', '选定风格'), desc: L('We share reference images so the look matches your market.', '我们提供参考图，让风格贴合您的市场。') },
        { title: L('First draft', '初稿'), desc: L('You see a first version within about a week.', '大约一周内看到第一版。') },
        { title: L('Revise and deliver', '修改并交付'), desc: L('Two rounds of changes, then full-resolution files.', '两轮修改，然后交付高清文件。') },
      ],
      footnote: L('Renderings and walkthroughs are marketing visuals. They are not permit or construction drawings.',
                  '效果图和漫游视频仅用于营销展示，不是报建图或施工图。'),
    },
    {
      key: 'apps', page: 'apps.html', icon: 'app',
      name: L('Apps', 'App 开发'),
      headline: L('Apps people keep on their home screen.', '让人留在主屏幕上的 App。'),
      sub: L('Native iPhone and iPad apps in SwiftUI, from first build to the App Store.', '用 SwiftUI 开发原生 iPhone 与 iPad 应用，从第一版到上架 App Store。'),
      card: { img: 'images/apps/pompolo-art.webp' },
      services: [
        { id: 'ios', short: L('iOS Apps', 'iOS App'),  icon: 'app', chiclet: true,
          name: L('iOS app development', 'iOS App 开发'),
          desc: L('Native iPhone and iPad apps, designed, built and shipped to the App Store.', '原生 iPhone 与 iPad 应用，从设计、开发到上架。'),
          includes: [L('Product design and clickable prototype', '产品设计与可点击原型'),
                     L('SwiftUI build for iPhone and iPad', 'SwiftUI 开发，支持 iPhone 与 iPad'),
                     L('App Store listing and launch', 'App Store 页面与上架')],
          price: { quote: true } },
      ],
    },
  ];

  const APPS = [
    { key: 'pompolo', name: 'Pompolo', icon: 'images/apps/pompolo-icon.webp', shot: 'images/apps/pompolo-art.webp',
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
