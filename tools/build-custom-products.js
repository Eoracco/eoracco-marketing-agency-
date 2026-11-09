#!/usr/bin/env node
// Builds one static page per EORACCO Custom product: custom/products/<slug>/index.html
// Run after editing promo-data.js:   node tools/build-custom-products.js
// Each page carries its own title, description, canonical URL, share image and Product
// structured data so it can be found in search; promo.js then renders the full page.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = {};
require(path.join(root, 'promo-data.js'));
const { ITEMS, APPS } = window.EO_PROMO;

const V = process.argv[2] || 'p' + Date.now().toString(36);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const shell = fs.readFileSync(path.join(root, 'custom/products/index.html'), 'utf8');
const head = shell.slice(0, shell.indexOf('<title>'));
const fonts = shell.slice(shell.indexOf('<meta name="theme-color"'), shell.indexOf('<link rel="stylesheet" href="../../styles.css'));
const v = (name) => (shell.match(new RegExp(name.replace('.', '\\.') + '\\?v=([\\w]+)')) || [])[1] || V;

const pages = [];
for (const i of ITEMS) {
  const url = `https://eoracco.com/custom/products/${i.slug}/`;
  const apps = APPS.filter((a) => a.items.includes(i.id)).map((a) => a.name.en);
  const low = i.tiers.length ? Math.min(...i.tiers.map((t) => t[1])) : null;
  const high = i.tiers.length ? Math.max(...i.tiers.map((t) => t[1])) : null;
  const title = `Custom ${i.name.en} with Your Logo · EORACCO Custom`;
  const desc = `${i.about.en} Minimum ${i.min} pcs${low ? `, from $${low.toFixed(2)} each` : ''}. Free mockups and all-in quotes in English or 中文 for Los Angeles businesses.`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Product', name: i.name.en, sku: i.id,
    description: i.about.en, image: i.gallery.slice(0, 4), category: apps.join(', ') || 'Promotional products',
    brand: { '@type': 'Brand', name: 'EORACCO Custom' },
  };
  if (low) ld.offers = { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: low.toFixed(2), highPrice: high.toFixed(2), offerCount: i.tiers.length, availability: 'https://schema.org/InStock' };
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'EORACCO Custom', item: 'https://eoracco.com/custom/' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://eoracco.com/custom/products/' },
    { '@type': 'ListItem', position: 3, name: i.name.en, item: url } ] };

  const html = `${head.replace(/\.\.\/\.\.\//g, '../../../')}<title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../../../favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="../../../apple-touch-icon.png" />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="EORACCO Custom" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${esc(i.name.en)} with your logo · EORACCO Custom" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${i.gallery[0]}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="format-detection" content="telephone=no" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
  ${fonts}<link rel="stylesheet" href="../../../styles.css?v=${v('styles.css')}" />
  <link rel="stylesheet" href="../../../promo.css?v=${v('promo.css')}" />
</head>
<body class="custom-site" data-view="product" data-id="${i.id}">
  <a class="skip" href="#page">Skip to content</a>
  <header class="gnav" id="giftNav"></header>
  <main id="page" class="promo">
    <div class="container pd-static">
      <h1>${esc(i.name.en)} · ${esc(i.name.zh)}</h1>
      <img src="${i.gallery[0]}" alt="${esc(i.name.en)}" width="600" height="600" />
      <p>${esc(i.about.en)}</p>
      <p>${esc(i.about.zh)}</p>
      ${i.hl.length ? `<ul>${i.hl.map((h) => `<li>${esc(h.en)} · ${esc(h.zh)}</li>`).join('')}</ul>` : ''}
      ${Object.keys(i.spec).length ? `<dl>${Object.values(i.spec).map((v) => `<dd>${esc(v.en)} · ${esc(v.zh)}</dd>`).join('')}</dl>` : ''}
      <p>Minimum ${i.min} pcs.${low ? ` From $${low.toFixed(2)} per piece.` : ''} <a href="../../">Start a project</a></p>
    </div>
  </main>
  <footer class="gfoot" id="giftFooter"></footer>

  <script src="../../../services-data.js?v=${v('services-data.js')}"></script>
  <script src="../../../promo-data.js?v=${v('promo-data.js')}"></script>
  <script src="../../../promo.js?v=${v('promo.js')}"></script>
</body>
</html>
`;
  const dir = path.join(root, 'custom/products', i.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  pages.push(url);
}

// keep the sitemap in step: replace any old product URLs with the current list
const smPath = path.join(root, 'sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8').replace(/\s*<url><loc>https:\/\/eoracco\.com\/custom\/products\/[^<]+\/<\/loc>[^\n]*<\/url>/g, '');
const today = new Date().toISOString().slice(0, 10);
const block = pages.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n');
sm = sm.replace('  <url><loc>https://eoracco.com/custom/products/</loc>', `${block}\n  <url><loc>https://eoracco.com/custom/products/</loc>`);
fs.writeFileSync(smPath, sm);
console.log(`built ${pages.length} product pages`);
