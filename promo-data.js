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
      items: ['EO-26', 'EO-19', 'EO-21', 'EO-08', 'EO-09', 'EO-18'] },
    { key: 'clinic', name: L('Clinics & wellness', '诊所与健康'),
      who: L('Calm, useful pieces for patients and front desks: plants, candles, notebooks.',
             '给病人和前台的安静实用小物：绿植、香薰、笔记本。'),
      items: ['EO-10', 'EO-11', 'EO-07', 'EO-16', 'EO-15', 'EO-24'] },
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
  ];

  window.EO_PROMO = { APPS, ITEMS };
})();
