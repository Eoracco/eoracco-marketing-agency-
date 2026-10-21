/* Apps we've shipped: one wide tile per app, used on the home page and apps.html.
   EO_APPS.html() returns the markup; EO_APPS.animate() adds the scroll scenes and must be
   called inside the page's gsap.context so a language change reverts and rebuilds them. */
(function () {
  const EO = window.EO;
  const L = (en, zh) => ({ en, zh });
  const tx = (o) => EO.tx(o);
  const zl = (o) => (EO.isBi() ? `<span class="zh-line">${o.zh}</span>` : '');

  const EXTRA = {
    pompolo: {
      chips: [L('Up to 4 players', '最多 4 人同玩'), L('AirPlay to your TV', 'AirPlay 投屏电视'), L('English · 中文 · Español', '英文 · 中文 · 西班牙文')],
      stage: () => `
        <div class="stage stage--pompolo">
          <img class="fan fan-l" src="images/apps/pompolo-shot-2.webp" alt="" loading="lazy" />
          <img class="fan fan-r" src="images/apps/pompolo-shot-5.webp" alt="" loading="lazy" />
          <div class="iphone">
            <div class="iphone-screen">
              <video class="app-video" data-src="video/pompolo-preview.mp4" poster="images/apps/pompolo-preview-poster.jpg" muted loop playsinline preload="none"></video>
            </div>
            <span class="iphone-island"></span>
          </div>
        </div>`,
    },
    twotake: {
      chips: [L('9:16 + 16:9 in one take', '一次拍摄，两种比例'), L('HD · 60 fps', 'HD · 60 帧'), L('Center-crop horizontal', '横版居中裁切')],
      stage: () => `
        <div class="stage stage--twotake">
          <div class="iphone iphone--dark">
            <div class="iphone-screen">
              <img src="images/apps/twotake-vertical.webp" alt="" loading="lazy" />
              <span class="tt-rec"><i></i>REC 00:12</span>
              <span class="tt-tag tt-tag--v">9:16</span>
              <span class="tt-band"><span class="tt-tag tt-tag--h">16:9</span></span>
            </div>
            <span class="iphone-island"></span>
          </div>
          <div class="tt-land">
            <img src="images/apps/twotake-vertical.webp" alt="" loading="lazy" />
            <span class="tt-tag tt-tag--h">16:9</span>
          </div>
        </div>`,
    },
  };

  const STORE = L('View on the App Store', '在 App Store 查看');

  function html() {
    return EO.APPS.map((a) => {
      const x = EXTRA[a.key];
      return `
      <article class="app-show app-show--${a.key}">
        <div class="app-show-copy">
          <img class="app-show-icon" src="${a.icon}" alt="${a.name} app icon" width="96" height="96" loading="lazy" />
          <h3 class="app-show-name">${a.name}</h3>
          <p class="app-show-kind">${tx(a.kind)}</p>
          <p class="app-show-desc">${tx(a.desc)}${zl(a.desc)}</p>
          <ul class="app-show-chips">${x.chips.map((c) => `<li>${tx(c)}</li>`).join('')}</ul>
          <a class="app-store-btn" href="${a.url}" target="_blank" rel="noopener">${tx(STORE)}
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="app-show-visual" aria-hidden="true">${x.stage()}</div>
      </article>`;
    }).join('');
  }

  // Play the in-phone preview only while it is on screen
  let io = null;
  function wireVideos(root) {
    if (io) io.disconnect();
    const vids = (root || document).querySelectorAll('.app-video');
    if (!vids.length || !('IntersectionObserver' in window)) return;
    io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      } else if (!v.paused) v.pause();
    }), { rootMargin: '200px 0px' });
    vids.forEach((v) => io.observe(v));
  }

  function animate() {
    const gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger) return;
    const wide = window.matchMedia('(min-width: 835px)').matches;
    const EXPO = 'expo.out';

    gsap.utils.toArray('.app-show').forEach((tile) => {
      // copy rises in
      gsap.from(tile.querySelectorAll('.app-show-copy > *'), {
        y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.06,
        scrollTrigger: { trigger: tile, start: 'top 75%' },
      });
      gsap.from(tile.querySelector('.iphone'), {
        y: 120, opacity: 0, duration: 1.4, ease: EXPO,
        scrollTrigger: { trigger: tile, start: 'top 75%' },
      });
    });

    // Pompolo: the two App Store screenshots fan out from behind the phone
    const pom = document.querySelector('.app-show--pompolo');
    if (pom) {
      const d = wide ? 128 : 96;
      const tl = gsap.timeline({ scrollTrigger: { trigger: pom, start: 'top 80%', end: 'center 45%', scrub: 0.8 } });
      tl.fromTo(pom.querySelector('.fan-l'), { x: 0, rotation: 0, scale: 0.86, opacity: 0 }, { x: -d, rotation: -9, scale: 0.92, opacity: 1, ease: 'power2.out' }, 0)
        .fromTo(pom.querySelector('.fan-r'), { x: 0, rotation: 0, scale: 0.86, opacity: 0 }, { x: d, rotation: 9, scale: 0.92, opacity: 1, ease: 'power2.out' }, 0);
    }

    // TwoTake: the 16:9 band is lifted out of the vertical frame into its own landscape video
    const tt = document.querySelector('.app-show--twotake');
    if (tt) {
      const land = tt.querySelector('.tt-land');
      const band = tt.querySelector('.tt-band');
      const phone = tt.querySelector('.iphone');
      const stage = tt.querySelector('.stage');
      // start exactly on top of the band inside the phone, then lift out to the side
      const dx = () => phone.offsetLeft + phone.offsetWidth / 2 - stage.clientWidth / 2;
      const s0 = () => band.offsetWidth / land.offsetWidth;
      const tl = gsap.timeline({ scrollTrigger: { trigger: tt, start: 'top 70%', end: 'center 40%', scrub: 0.8, invalidateOnRefresh: true } });
      tl.fromTo(band, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
        .fromTo(land, { xPercent: -50, yPercent: -50, x: dx, y: 0, scale: s0, opacity: 0 },
          { xPercent: -50, yPercent: -50, x: () => Math.min(dx() + (wide ? 210 : 110), stage.clientWidth / 2 + (wide ? 40 : 20) - land.offsetWidth / 2), y: wide ? 150 : 175, scale: 1, opacity: 1, ease: 'power2.inOut', duration: 1 }, 0.25);
    }
  }

  window.EO_APPS = { html, animate, wireVideos };
})();
