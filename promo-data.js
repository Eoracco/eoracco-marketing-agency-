// EORACCO — promotional products shown on promo.html.
// Each item is sourced through DistributorCentral; `img` is the supplier's product photo.
// Codes are EORACCO's own (EO-xx); supplier item numbers are kept off the public site.
(() => {
  const S3 = 'https://s3.distributorcentral.com/uploads/';
  const img = (file) => S3 + file[0] + '/' + file[1] + '/' + file;
  const L = (en, zh) => ({ en, zh });

  // who buys, why, and which items fit them (an item can appear under several)
  const APPS = [
    { key: 'food', name: L('Restaurants & cafés', '餐饮与门店'),
      who: L('Staff uniforms, take-out packaging and grand-opening giveaways that make a small shop look established.',
             '员工围裙和帽子、外卖包装、开业赠品，让小店看起来更专业、更有品牌感。'),
      items: ['EO-22', 'EO-23', 'EO-21', 'EO-20', 'EO-13', 'EO-06'] },
    { key: 'realty', name: L('Real estate, insurance & loans', '房产·保险·贷款经纪'),
      who: L('Closing gifts and client thank-yous that stay in the home for years, with your name on them.',
             '成交礼和客户答谢礼，印上您的名字，放在客户家里好几年。'),
      items: ['EO-14', 'EO-03', 'EO-12', 'EO-18', 'EO-07', 'EO-15'] },
    { key: 'team', name: L('Companies & HR', '公司与团队'),
      who: L('Onboarding kits, team wear and year-end gifts, without a week of comparing vendors.',
             '新员工入职礼包、团队服装、年终礼品，不用自己花一周比价找供应商。'),
      items: ['EO-24', 'EO-25', 'EO-13', 'EO-17', 'EO-20', 'EO-19'] },
    { key: 'lny', name: L('Lunar New Year & holidays', '新年与节日'),
      who: L('Red envelopes, tea sets and gifts chosen with the customs in mind — no clocks, no fours.',
             '红包、茶具和年礼，挑选时就避开送钟、数字 4 这些忌讳。'),
      items: ['EO-01', 'EO-03', 'EO-04', 'EO-05', 'EO-06', 'EO-02'] },
    { key: 'events', name: L('Events, schools & clubs', '活动·学校·社团'),
      who: L('Giveaways and team gear that arrive before the event date, at a per-piece price that fits the budget.',
             '活动赠品和队服，保证活动日前送到，单价控制在预算内。'),
      items: ['EO-26', 'EO-27', 'EO-19', 'EO-21', 'EO-08', 'EO-18'] },
    { key: 'clinic', name: L('Clinics & wellness', '诊所与健康'),
      who: L('Calm, useful pieces for patients and front desks: plants, candles, notebooks.',
             '给病人和前台的安静实用小物：绿植、香薰、笔记本。'),
      items: ['EO-10', 'EO-11', 'EO-07', 'EO-27', 'EO-16', 'EO-15'] },
  ];

  const ITEMS = [
    // Lunar New Year & tea
    { id: 'EO-01', cat: 'heritage', min: 100, img: img('9A712036E14BC363BB4A833B398108DC.jpg'),
      name: L('Felt red envelope', '毛毡红包'),
      note: L('Reusable felt hongbao with your logo. Lunar New Year, grand openings, weddings.', '可重复使用的毛毡红包，印上您的 logo。新年、开业、婚礼都合适。') },
    { id: 'EO-02', cat: 'heritage', min: 50, img: img('13C5A2CFC49A7179D6B882BA10DBD79C.jpg'),
      name: L('Wooden chopsticks in a pocket box', '实木筷子便携盒'),
      note: L('Natural wood chopsticks in a slim wooden case, with your logo on the lid.', '天然木筷配便携木盒，盒盖上印 logo。') },
    { id: 'EO-03', cat: 'heritage', min: 100, img: img('0FA20829B53822485C2ABD0DAD90350B.jpg'),
      name: L('9-piece ceramic matcha set', '九件套陶瓷抹茶礼盒'),
      note: L('Bowl, whisk, scoop and holder in a gift box. A client gift people remember.', '茶碗、茶筅、茶勺、筅架全套礼盒，客户会记得的礼物。') },
    { id: 'EO-04', cat: 'heritage', min: 50, img: img('E089AE5D61B84A1E64ACE41AC5F8BA83.jpg'),
      name: L('Travel tea set with case', '便携陶瓷茶具套装'),
      note: L('Teapot and four cups in a padded zip case, logo on the case.', '一壶四杯，配软包收纳盒，logo 印在盒上。') },
    { id: 'EO-05', cat: 'heritage', min: 150, img: img('25446899056FD2153433E22BE1C711B6.jpg'),
      name: L('Kiln-glaze tea set', '窑变釉茶具'),
      note: L('Reactive glaze, so no two cups look the same. Gift bag available.', '窑变釉色，每只杯子都不一样，可配礼品袋。') },
    { id: 'EO-06', cat: 'heritage', min: 250, img: img('48DAC38AD06181D7A261E4C9C5EA21B1.jpg'),
      name: L('Fortune-cookie take-out box', '幸运饼干外卖盒'),
      note: L('Take-out style gift box printed with your logo. Fill it with cookies or small treats.', '外卖盒造型礼盒，印上您的 logo，可装饼干或小礼物。') },

    // Living desk
    { id: 'EO-07', cat: 'green', min: 45, img: img('767AC7B107A4285B6AC48022FB310971.jpg'),
      name: L('Glass bulb propagation station', '玻璃水培花架'),
      note: L('Three glass bulbs on a wood stand, logo on the base.', '木架配三只玻璃球瓶，底座印 logo。') },
    { id: 'EO-08', cat: 'green', min: 100, img: img('1469F9308B923B7C5DBEF78A1BE68EA8.png'),
      name: L('Pocket garden card', '口袋花园卡'),
      note: L('A pot-shaped card with a plantable seed-paper flower. Fits in an envelope.', '花盆造型卡片，里面的种子纸小花可以种进土里，能直接装进信封。') },
    { id: 'EO-09', cat: 'green', min: 40, img: img('24CF7B6A93D1BD4D0DED5FEA1CCA13B7.png'),
      name: L('Seed-paper cover journal', '种子纸封面笔记本'),
      note: L('Recycled journal with a plantable seed-paper page inside.', '再生纸笔记本，里面有一页可以种进土里的种子纸。') },
    { id: 'EO-10', cat: 'green', min: 300, img: img('CE250B7076441E129005F6AC4183F595.jpg'),
      name: L('Ceramic planter on bamboo base', '竹底座陶瓷花盆'),
      note: L('White ceramic pot with a bamboo saucer, printed with your message.', '白瓷花盆配竹托盘，可印品牌文字。') },
    { id: 'EO-11', cat: 'green', min: 96, img: img('E78FF70335947AEB01BD42C12C70D9C0.jpg'),
      name: L('Ceramic planter with wood stand', '木脚架陶瓷花盆'),
      note: L('Mid-century style planter on wooden legs.', '中古风花盆，配实木脚架。') },

    // Cork, candle & mug
    { id: 'EO-12', cat: 'home', min: 100, img: img('66138D8C6223D2ACA9A4B0C402FF208D.jpg'),
      name: L('Cork Bluetooth speaker', '软木蓝牙音箱'),
      note: L('Natural cork shell, logo printed on the front.', '天然软木外壳，正面印 logo。') },
    { id: 'EO-13', cat: 'home', min: 12, img: img('B865A08849ACAE2089EEBBBFD157E8BA.jpg'),
      name: L('15 oz ceramic mug with cork base', '软木底陶瓷杯 15 oz'),
      note: L('Matte ceramic mug on a cork bottom. Low minimum, good for small teams.', '哑光陶瓷杯配软木底，起订量低，小团队也能做。') },
    { id: 'EO-14', cat: 'home', min: 25, img: img('31D3C03CCD445BC737A1B46B321C9AAE.jpg'),
      name: L('Candle trio with acacia lids', '相思木盖香薰蜡烛三件套'),
      note: L('Three glass candles with wood lids in a gift box.', '三支玻璃杯蜡烛配木盖，礼盒包装。') },
    { id: 'EO-15', cat: 'home', min: 50, img: img('7691FC2A8D4B7E12B86357968B8B9F68.jpg'),
      name: L('Frosted candle with cork lid', '软木盖磨砂香薰蜡烛'),
      note: L('6 oz candle, made in the USA, with a printed gift box.', '6 oz 蜡烛，美国制造，配印刷礼盒。') },
    { id: 'EO-16', cat: 'home', min: 50, img: img('B187081501E8DBD70672A7C939BCDE76.jpg'),
      name: L('Amber jar candle', '琥珀玻璃罐蜡烛'),
      note: L('8 oz amber glass candle with a black lid and your label.', '8 oz 琥珀色玻璃罐，黑盖，贴您的品牌标签。') },

    // Wear & carry
    { id: 'EO-17', cat: 'wear', min: 24, img: img('EB3A30442DF92F3188E497781D1FDF6D.jpg'),
      name: L('Sweatshirt blanket', '卫衣面料毛毯'),
      note: L('Soft fleece blanket that feels like a favorite hoodie.', '摸起来像最爱的那件卫衣的抓绒毯。') },
    { id: 'EO-18', cat: 'wear', min: 30, img: img('5E8EFE7B07B5C85F895E55731956CDBE.jpg'),
      name: L('Full-color picnic blanket', '全彩野餐毯'),
      note: L('Your artwork printed edge to edge on an outdoor blanket.', '户外野餐毯，您的设计满版印刷。') },
    { id: 'EO-19', cat: 'wear', min: 30, img: img('8ECBA420D7F4BF70642CBBDCAD6464CE.png'),
      name: L('Custom knit socks, made in USA', '美国制造定制针织袜'),
      note: L('Your design knitted in, not printed on. Low minimum.', '图案直接织进袜子，不是印上去的，起订量低。') },
    { id: 'EO-20', cat: 'wear', min: 100, img: img('651CCC4964FFF6A8A02E32F16CA1A9EB.jpg'),
      name: L('Corduroy bucket hat', '灯芯绒渔夫帽'),
      note: L('Embroidered logo, a dozen colors.', '刺绣 logo，十几种颜色可选。') },
    { id: 'EO-21', cat: 'wear', min: 20, img: img('F6296D7928FA0B1A29CB8B9DA0048A2F.png'),
      name: L('Six-panel corduroy cap', '灯芯绒棒球帽'),
      note: L('Corduroy cap with an embroidered front. Minimum of 20.', '灯芯绒棒球帽，正面刺绣，20 顶起做。') },
    { id: 'EO-22', cat: 'wear', min: 25, img: img('5459FD91D8C69ED08D0191DE4045153E.jpg'),
      name: L('Heavy canvas work apron', '厚帆布工作围裙'),
      note: L('Heavy canvas with cross-back straps, for cafés, salons and studios.', '厚帆布配交叉背带，咖啡店、发廊、工作室都适用。') },
    { id: 'EO-23', cat: 'wear', min: 50, img: img('DE9D1D52043DDE85C96FBAB483B5807E.jpg'),
      name: L('Washed canvas kitchen apron', '水洗帆布厨房围裙'),
      note: L('Soft washed canvas with pockets and an embroidered logo.', '柔软水洗帆布，带口袋，刺绣 logo。') },

    // Paper & play
    { id: 'EO-24', cat: 'desk', min: 50, img: img('7378CAFB96D189B8292D6B9F191EB4AB.jpg'),
      name: L('Italian-design soft-cover journal', '意大利设计软封笔记本'),
      note: L('Ivory lined pages, logo debossed on the cover.', '象牙白横线内页，封面压印 logo。') },
    { id: 'EO-25', cat: 'desk', min: 50, img: img('F70CE6854643A8A1B402F0C7E7237918.png'),
      name: L('Art-print hardcover notebook', '艺术印花精装本'),
      note: L('Full-wrap artwork cover with your logo embroidered or printed.', '整幅艺术封面，可刺绣或印刷 logo。') },
    { id: 'EO-26', cat: 'desk', min: 25, img: img('B66CFF3B7F545DAEC478E2EBD7E7F886.jpg'),
      name: L('Full-color pickleball set', '全彩匹克球拍套装'),
      note: L('Two fiberglass paddles with your artwork edge to edge, balls and a bag.', '两支玻纤球拍满版印您的设计，附球和收纳袋。') },
    { id: 'EO-27', cat: 'desk', min: 500, img: img('B49EB7D0AC83C6EB46AC22A65F27E41C.jpg'),
      name: L('Squishy stress cube', '解压捏捏方块'),
      note: L('A translucent squeeze cube for desks, classrooms and waiting rooms, with your logo.', '半透明解压方块，适合办公桌、教室和候诊室，印您的 logo。') },
  ];

  // Detail-page data (from the suppliers' DistributorCentral listings, retail price tiers in USD).
  const DETAILS = {"EO-01":{"slug":"felt-red-envelope","days":8,"size":"8\" W × 4\" H","tiers":[[100,3.78],[500,2.67],[1000,2.3],[1500,2.16],[2000,2.14]],"gallery":["54B08ED95D5A43B3F92D2E82B2E3BC44.jpg","1839B7B2F0871808392C9515D63CF1A5.jpg"],"about":{"en":"Reusable felt hongbao, 8\" × 4\", with your logo on the front. A red envelope people keep and reuse every year.","zh":"可重复使用的毛毡红包，8\"×4\"，正面印您的 logo。客户会年年拿出来用的红包。"}},"EO-02":{"slug":"wooden-chopsticks-box","days":5,"size":"9.84\" L × 1.18\" W × 0.9\" H","tiers":[[50,9.45],[100,8.92],[300,8.56],[500,8.46],[1000,8.41]],"gallery":["DFC933CC0C22FBB49DA047B6F5D747EB.jpg","A9A58CAFF14619A248F1362C7D690183.jpg","A4DF0AABC69845E48A0A06CEDB2157B3.jpg","619B1F895CF1B914DD16E50D083A0778.jpg"],"about":{"en":"Natural wood chopsticks that slide into a slim black-walnut case, about 9.8\" long. Your logo goes on the lid.","zh":"天然木筷配黑胡桃木便携盒，长约 9.8 英寸，logo 印在盒盖上。"}},"EO-03":{"slug":"ceramic-matcha-set","days":25,"size":"11\" × 4\" × 10\" (gift box)","tiers":[[100,40.23],[500,39.56],[1000,36.56],[3000,32.19],[8000,30.15]],"gallery":["C2DD143F1338360808E3F9B7C59FBF6E.jpg","7325501E709A762ABD228FB35B70AE96.jpg","B1616235E5BE7CCB65893E90EDFE5ECD.jpg","8A694E37060102F442444D5573707F39.jpg"],"about":{"en":"A complete matcha kit — bowl and holder, bamboo whisk, scoop and sifter — in a printed gift box. Allow about 25 business days for production.","zh":"完整的抹茶套装：茶碗和筅架、竹茶筅、茶勺、筛网，装在印刷礼盒里。生产约需 25 个工作日，请提前预订。"}},"EO-04":{"slug":"travel-tea-set","days":11,"size":"7\" × 6.5\" (case)","tiers":[[50,35.42],[100,31.0],[200,27.02],[500,25.98],[1000,25.88],[2000,24.89]],"gallery":["73EFCAE26E6ACB430CDD7CC4C0DDC8C1.jpg","BE57E868AF42D0DE77ACB8F0B2C16BB4.jpg","0C78D64578A6B49E925DAE57ECA36A37.jpg","327CA152CF8F1CF8976F3CCA36A70A2C.jpg","CD7459E147CC7809F81CCB7217A19FE2.jpg"],"about":{"en":"A teapot with cups in a padded zip case, ready for the office or a trip. Your logo is printed on the case.","zh":"一壶多杯，装在带拉链的软包收纳盒里，办公室或出差都方便。logo 印在收纳盒上。"}},"EO-05":{"slug":"kiln-glaze-tea-set","days":13,"size":"5.52\" L × 8.08\" W × 3.75\" H","tiers":[[150,14.14],[500,7.38],[1000,7.38],[10000,7.37]],"gallery":["BFF21068EBD584CB6A10B3671BE740CB.jpg","E700D0978A87CC257050F4CA99F942E7.jpg"],"about":{"en":"Reactive kiln glaze means every cup comes out a little different. A tea gift that feels handmade.","zh":"窑变釉色，每只杯子的花纹都不一样，像手工做的茶礼。"}},"EO-06":{"slug":"fortune-cookie-takeout-box","days":5,"size":"","tiers":[],"gallery":["27BE0D73B1A35BF8CC5057B1D10D96BE.jpg","ACD825BEAA46E2450676187F8DF480F9.jpg","17976E4568C5B1AF4EF2E69691FBC652.jpg","0143A944AE9BE8879D2DC3099F5E5E58.jpg","76A900625BE20E49582F20F31CC25D1E.jpg"],"about":{"en":"A take-out style box printed with your logo — fill it with fortune cookies, candy or small gifts.","zh":"外卖盒造型的礼盒，印上您的 logo，可以装幸运饼干、糖果或小礼物。"}},"EO-07":{"slug":"glass-bulb-propagation-station","days":8,"size":"6.1\" L × 5.51\" W","tiers":[[45,20.4],[180,17.37],[450,16.72],[1000,10.58],[2000,9.75],[3000,4.47],[5000,4.38]],"gallery":["2FA2F7CCF526A490DD3DDA503534403F.jpg","F616299AE5F727E30DA9C8FB6748B3F6.jpg","2F67FE922DA7281622DBE27DE5046CA1.jpg","16166191A3EEAF9F48330BD178E462C4.jpg","903C93C9EF38577175E00D23669C32EA.jpg"],"about":{"en":"Three glass bulbs on a wooden stand for growing cuttings in water. Your logo sits on the wood base.","zh":"木架配三只玻璃球瓶，用来水培植物插枝，logo 印在木底座上。"}},"EO-08":{"slug":"pocket-garden-card","days":7,"size":"2.82\" W × 3.27\" H","tiers":[[100,4.39],[250,4.17],[500,3.81],[1000,3.51],[2500,3.48]],"gallery":["49B5AC2A2A157708D48285D6CFB45C28.png","596CC73E5EA5E3765616311880AE236C.png","C9CD120CB2509D018C701266BC2E5BB7.png","6B94F3C04BB8DBC037852F3B8BBA3CDD.png"],"about":{"en":"A pot-shaped card with a plantable seed-paper flower. Many card colors to match your brand; mails in a standard envelope.","zh":"花盆造型的卡片，里面的种子纸小花可以种进土里。卡片颜色多，可配合品牌色，能装进普通信封寄出。"}},"EO-09":{"slug":"seed-paper-journal","days":5,"size":"5.5\" × 8.5\"","tiers":[[40,16.61],[80,16.13],[160,14.8],[280,13.65],[400,12.6]],"gallery":[],"about":{"en":"A 5.5\" × 8.5\" recycled-paper journal with a plantable seed-paper page tipped in.","zh":"5.5\"×8.5\" 再生纸笔记本，里面夹有一页可以种的种子纸。"}},"EO-10":{"slug":"ceramic-planter-bamboo-base","days":6,"size":"3.3\" L × 3\" W × 2.7\" H","tiers":[[300,11.28],[1000,4.09],[3000,3.85],[5000,3.59],[10000,3.47]],"gallery":["56A9156BF1182BC0020CA217220E504A.jpg","CE30315C7B7ED18A710134650A1F28D9.jpg"],"about":{"en":"A small white ceramic pot (about 3\") on a bamboo saucer, printed with your message.","zh":"约 3 英寸的白色陶瓷小花盆，配竹托盘，可印品牌文字。"}},"EO-11":{"slug":"ceramic-planter-wood-stand","days":8,"size":"3¾\" × 3\"","tiers":[[96,17.4],[144,15.8]],"gallery":[],"about":{"en":"A mid-century style ceramic planter on wooden legs. Price includes a 1-color imprint in one spot.","zh":"中古风陶瓷花盆配木脚架，价格含一个位置的单色印刷。"}},"EO-12":{"slug":"cork-bluetooth-speaker","days":7,"size":"2.87\" tall × 2.42\" round","tiers":[[100,15.83],[250,15.52],[500,15.39],[1000,14.96]],"gallery":["E55B5ACBE1DD259DE0A49D92B51C22CE.jpg","9FD80004C3ED98601BAA6FF164B684FB.jpg"],"about":{"en":"A compact Bluetooth speaker in a natural cork shell, with your logo printed in full color on one side.","zh":"小巧的蓝牙音箱，天然软木外壳，一面全彩印 logo。"}},"EO-13":{"slug":"ceramic-mug-cork-base","days":10,"size":"3.25\" W × 4.5\" H","tiers":[],"gallery":["40C04E3F588842DA9DEFF803E386943C.jpg","6A7D008FEA43A630431FFCC8ABFFDDAD.jpg","DEA516D1BBA4277EE37336189ABFD7A0.jpg","F5A3BB33EE798BC1B5981B545A021ADB.jpg","009C82C0CDA653213F020CD8DF914355.jpg"],"about":{"en":"A 15 oz matte ceramic mug on a cork base. A low minimum makes it easy for small teams.","zh":"15 oz 哑光陶瓷杯，软木底座。起订量低，小团队也能做。"}},"EO-14":{"slug":"candle-trio-acacia-lids","days":7,"size":"10.24\" L × 3.54\" W × 3.94\" H (box)","tiers":[[25,30.5],[50,29.0],[100,27.5],[250,26.25],[500,25.0]],"gallery":["832AA896D7757C92BBAB33AC195DBAC8.jpg","0677C65C128D085E57CD7B624906B611.jpg","569D04653EB55DE62E752C51B2E2E96E.jpg","3AFD29B7582E044349A23E2BA50259F8.jpg","0D6BF79BCB8ABE1905989CED335CB015.jpg"],"about":{"en":"Three glass candles with acacia-wood lids in a gift box — a client gift that stays on a shelf for months.","zh":"三支玻璃杯蜡烛配相思木盖，礼盒装。客户会在架子上摆好几个月的礼物。"}},"EO-15":{"slug":"frosted-candle-cork-lid","days":4,"size":"3.63\" H × 2.75\" D (candle)","tiers":[[50,13.3],[100,12.63],[250,12.56],[500,12.49],[1000,12.35]],"gallery":["4ECD4DC8B5B060C48F24F74E1806068C.jpg","E13619AD9607FC7D8067634F9B8A4D95.jpg","3E992FCCE01FEDAA9532DFF2E60A61C5.jpg","CF8B176173865F9BDBDD40F70A518719.jpg"],"about":{"en":"A 6 oz frosted-glass candle with a cork lid and a full-color label of your design, in a gift box. Made in the USA; several scents.","zh":"6 oz 磨砂玻璃蜡烛，软木盖，贴您设计的全彩标签，配礼盒。美国制造，有多种香味可选。"}},"EO-16":{"slug":"amber-jar-candle","days":4,"size":"2.9\" W × 3.5\" H","tiers":[[50,13.85],[100,13.18],[250,13.1],[500,13.03],[1000,12.88]],"gallery":["2F1E67B58EE969F67E2993A3111267C8.jpg","00A7F16AF333691C9D6C6F1A6534FF8E.jpg","760ADB6BE232FFFAA15579B59AA916B6.jpg","716924E9EA2D848632D313ACAA05B3D4.jpg"],"about":{"en":"An 8 oz amber-glass candle with a lid and your full-color label. Several scents to choose from.","zh":"8 oz 琥珀色玻璃蜡烛，带盖，贴您的全彩标签，有多种香味可选。"}},"EO-17":{"slug":"sweatshirt-blanket","days":5,"size":"50\" × 60\"","tiers":[[24,39.51],[72,36.58],[144,33.87],[300,31.36],[600,29.02]],"gallery":["1722B103198F97A3136EEB018653A201.jpg","E971FA27A154C412794E6C85FB221F9C.jpg","EFF6B1CBFEAD33642ADE8F21D21DAA66.jpg","D858DABBD27101F773868A9E811DF33E.jpg"],"about":{"en":"A 50\" × 60\" fleece blanket that feels like a favorite hoodie. Price includes a 1-color imprint.","zh":"50\"×60\" 抓绒毯，摸起来像最爱的那件卫衣。价格含单色印刷。"}},"EO-18":{"slug":"full-color-picnic-blanket","days":5,"size":"60\" × 50\"","tiers":[[30,37.65],[100,35.9],[250,35.1],[500,33.6]],"gallery":[],"about":{"en":"A 60\" × 50\" outdoor blanket printed edge to edge with your artwork, with a carry bag. Backed by a lifetime guarantee from the maker.","zh":"60\"×50\" 户外毯，您的设计满版印刷，附收纳袋，厂家提供终身保修。"}},"EO-19":{"slug":"custom-knit-socks-usa","days":5,"size":"12\" long","tiers":[[30,18.99],[60,14.24],[120,11.42],[240,10.51],[480,9.73],[720,9.24]],"gallery":["E4C2509E25A3F96BE49EFD551CF735E1.jpg","4484CDE470FDAB46C434EB3EE42E5CFC.jpg","697228B942AE3C33EDD5721A226FFC20.jpg","17F1051EE4E5EF9CB070362F7B29052F.jpg"],"about":{"en":"Your design knitted all the way around the sock, both sides, in full color. Made in the USA with a low minimum.","zh":"您的图案全彩织满整只袜子，正反两面都有。美国制造，起订量低。"}},"EO-20":{"slug":"corduroy-bucket-hat","days":7,"size":"One size","tiers":[[100,8.67],[250,6.66],[500,6.13],[1000,5.51],[3000,5.21],[5000,3.79]],"gallery":["F409D2700C3B77C952A258E69F86328D.jpg","3CB8CAD207D2931EF64F74968E4EE489.jpg"],"about":{"en":"A soft corduroy bucket hat with an embroidered logo, in more than a dozen colors.","zh":"柔软的灯芯绒渔夫帽，刺绣 logo，十几种颜色可选。"}},"EO-21":{"slug":"six-panel-corduroy-cap","days":5,"size":"Adjustable, one size","tiers":[[20,6.05],[50,4.75],[100,4.49],[300,3.97],[500,3.9],[1000,3.31]],"gallery":["C8922CB1BD0F718BD0C5B3CFC845AFB4.png","73B6A138D960A4E808A39D54548EB6B9.png","AB2A270B2B0A3A695C44455EA769A22F.png"],"about":{"en":"An unstructured six-panel corduroy cap with an embroidered front. Minimum of 20.","zh":"无衬软顶六片灯芯绒帽，正面刺绣，20 顶起做。"}},"EO-22":{"slug":"heavy-canvas-work-apron","days":10,"size":"27\" W × 29\" L","tiers":[[25,24.73],[100,22.78],[250,21.03]],"gallery":["9DF2D9BA643F06D43669730937E775C5.jpg","E022321A92CFDE54980435B20D971DAD.jpg","ED4BEAA7203A7EBD2A4262DC2CE4CA28.jpg","5C91CF2348CF9B1618A22B32D7E7E069.jpg","F13D2E75DE12BAC1886C0C052821DA79.jpg"],"about":{"en":"A heavy canvas apron (27\" × 29\") with cross-back straps and pockets, built for cafés, salons and studios.","zh":"厚帆布围裙（27\"×29\"），交叉背带带口袋，适合咖啡店、发廊、工作室。"}},"EO-23":{"slug":"washed-canvas-kitchen-apron","days":7,"size":"27½\" long","tiers":[[50,21.98],[100,21.15],[200,20.05],[300,19.35],[500,18.5],[1000,16.75]],"gallery":["0E04C74679E54A1382AE24D8EFD9E39A.jpg","2D7B2CA6171E56B7490D8294F145C673.jpg"],"about":{"en":"A soft washed-canvas apron with pockets and an embroidered logo, for kitchens and counters.","zh":"柔软的水洗帆布围裙，带口袋，刺绣 logo，适合厨房和柜台。"}},"EO-24":{"slug":"italian-design-journal","days":5,"size":"5.25\" W × 8.375\" H","tiers":[[50,18.5],[250,16.92],[500,15.33],[1000,13.75]],"gallery":["E6CD2B70F3B8FC3BC94830F3A740D691.jpg","E45B16E45F478B1ADDE5F8C20C7B53C6.jpg","1CB5B781F53E1128DCDF8D0B22069C26.jpg","62F539A65368F5D670178D3A0FD744D1.jpg"],"about":{"en":"An Italian-design soft-cover journal with ivory lined pages and your logo debossed on the cover.","zh":"意大利设计的软封笔记本，象牙白横线内页，封面压印 logo。"}},"EO-25":{"slug":"art-print-hardcover-notebook","days":50,"size":"5.75\" × 8.25\"","tiers":[[50,29.99],[100,28.99],[250,27.99],[500,23.99],[1000,22.99]],"gallery":["D30B3F424B6FE410AE7AB8F80A2A3788.png","9A8F130B1570814835C31078392559EC.png","62010E905520B8BFB1F25592E0D7E626.png","5E24B9FE00B3B4DE29BF9B7D3232C340.png"],"about":{"en":"A hardcover notebook wrapped in original artwork, with your logo embroidered or printed. Allow about 50 business days.","zh":"整幅艺术画作封面的精装笔记本，logo 可刺绣或印刷。生产约需 50 个工作日，请提前很久预订。"}},"EO-26":{"slug":"full-color-pickleball-set","days":20,"size":"Paddle 15.75\" × 7.5\"","tiers":[[25,19.98],[50,19.48],[100,18.98],[250,18.48],[500,17.98]],"gallery":["092512D9C8680A8E5997705F13A717DC.jpg","4335199CE9BA264C0AAF9BAD25CFEA62.jpg","0A2131A4C92246A0525358E5590E0485.jpg","98A1D61A85B2473C4EAA388A1BF7F6A3.jpg"],"about":{"en":"Two fiberglass paddles printed edge to edge with your artwork, plus balls and an optional carry case. Allow about 20 business days.","zh":"两支玻纤球拍，您的设计满版印刷，附球，可加选收纳包。生产约需 20 个工作日。"}},"EO-27":{"slug":"squishy-stress-cube","days":12,"size":"2 3/16\" cube","tiers":[[500,2.48],[1000,2.44],[2000,2.43],[5000,2.37],[10000,2.31]],"gallery":["A0CDC67D3A661A60BD88FA4564F936DB.jpg","0F4D1117DA1B8CA86B2C9E72B9CB1FEE.jpg","FDA838CD6417A55725B7335FD7D6742D.jpg","657F30BE87D56500F0BF71398D12483D.jpg"],"about":{"en":"A translucent squeeze cube (about 2¼\") for desks, classrooms and waiting rooms, printed with your logo in one color.","zh":"半透明解压捏捏方块，约 2¼ 英寸，放在办公桌、教室、候诊室都合适，单色印 logo。"}}};
  ITEMS.forEach((i) => {
    const d = DETAILS[i.id] || {};
    i.slug = d.slug || i.id.toLowerCase();
    i.days = d.days || 0;
    i.size = d.size || '';
    i.tiers = d.tiers || [];
    i.about = d.about || i.note;
    // main photo first, then the supplier's extra photos
    i.gallery = [i.img].concat((d.gallery || []).map(img).filter((u) => u !== i.img));
  });

  window.EO_PROMO = { APPS, ITEMS };
})();
