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
      // The real TwoTake camera screen, rebuilt in HTML; photos cycle through both previews
      stage: () => {
        const photos = (cls) => [1, 2, 3].map((i) => `<img class="${cls} p${i}" src="images/apps/tt-photo-${i}.webp" alt="" loading="lazy" />`).join('');
        const ic = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
        return `
        <div class="stage stage--twotake">
          <span class="tt-callout tt-callout--v"><b>9:16</b> TikTok · Reels · Shorts</span>
          <span class="tt-callout tt-callout--h"><b>16:9</b> YouTube · TV</span>
          <div class="iphone iphone--dark">
            <div class="iphone-screen tt-ui">
              <span class="tt-cam"></span>
              <div class="tt-top">
                ${ic('<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>')}
                <span class="tt-pill">HD</span><span class="tt-pill">60 FPS</span>
                ${ic('<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16"/>')}
                ${ic('<path d="M13 3 6 13h5l-1 8 7-10h-5z"/><path d="M4 4l16 16"/>')}
                ${ic('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>')}
              </div>
              <span class="tt-lbl tt-lbl--v">9:16</span>
              <div class="tt-v">${photos('tt-ph')}<span class="tt-rec"><i></i>00:12</span></div>
              <div class="tt-row">
                <span class="tt-z">0.5x</span><span class="tt-z is-on">1x</span><span class="tt-z">2x</span>
                <span class="tt-b">${ic('<path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>')}AUTO</span>
                <span class="tt-b">${ic('<path d="M8 4v16M8 4 5 7M8 4l3 3M16 20V4M16 20l-3-3M16 20l3-3"/>')}SWAP</span>
              </div>
              <div class="tt-h">${photos('tt-ph')}</div>
              <span class="tt-lbl tt-lbl--h">16:9</span>
              <div class="tt-bottom">
                <span class="tt-sq">${ic('<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>')}</span>
                <span class="tt-shutter"><i></i></span>
                <span class="tt-sq tt-thumb">${photos('tt-ph')}</span>
              </div>
            </div>
          </div>
        </div>`;
      },
    },
  };

  const STORE = L('View on the App Store', '在 App Store 查看');

  // Launch spots we produced for our own apps — shown as proof that we market apps too
  const SPOTS = {
    kicker: L('App marketing', 'App 推广'),
    title: L('We market apps, too.', '我们也做 App 推广。'),
    desc: L('Launch spots we produced for Pompolo and TwoTake, cut for TikTok, Reels, Shorts and YouTube. Your app can get the same.',
            '这些是我们为 Pompolo 和 TwoTake 制作的推广短片，适配 TikTok、Reels、Shorts 和 YouTube。您的 App 也可以。'),
    link: L('App launch marketing', 'App 上线推广'),
    sound: L('Sound', '声音'),
    sets: [
      { key: 'pompolo', name: 'Pompolo', icon: 'images/apps/pompolo-icon.webp', layout: 'bento',
        list: [
          { cls: 'spot--h', src: 'video/pom-kitchen.mp4', poster: 'images/apps/pom-kitchen.jpg', cap: L('16:9 · Story spot', '16:9 · 剧情短片') },
          { cls: 'spot--h', src: 'video/pom-night.mp4', poster: 'images/apps/pom-night.jpg', cap: L('16:9 · YouTube', '16:9 · YouTube') },
          { cls: 'spot--v', src: 'video/pom-couch.mp4', poster: 'images/apps/pom-couch.jpg', cap: L('9:16 · Reels', '9:16 · Reels') },
          { cls: 'spot--v', src: 'video/pom-bears.mp4', poster: 'images/apps/pom-bears.jpg', cap: L('9:16 · TikTok', '9:16 · TikTok'), silent: true, capTop: true },
        ] },
      { key: 'twotake', name: 'TwoTake', icon: 'images/apps/twotake-icon.webp', layout: 'row',
        list: [
          { cls: 'spot--h', src: 'video/tt-gondola.mp4', poster: 'images/apps/tt-gondola.jpg', cap: L('16:9 · YouTube', '16:9 · YouTube') },
          { cls: 'spot--v', src: 'video/tt-party.mp4', poster: 'images/apps/tt-party.jpg', cap: L('9:16 · Reels', '9:16 · Reels') },
          { cls: 'spot--v', src: 'video/tt-dontturn.mp4', poster: 'images/apps/tt-dontturn.jpg', cap: L('9:16 · TikTok', '9:16 · TikTok') },
        ] },
    ],
  };
  const SPEAKER = '<svg class="spk-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 4 6M21 9l-4 6"/></svg><svg class="spk-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';

  function spotHTML(v) {
    return `
          <figure class="spot ${v.cls}">
            <video class="app-video" data-src="${v.src}" poster="${v.poster}" muted loop playsinline preload="none"></video>
            <figcaption${v.capTop ? ' class="cap-top"' : ''}>${tx(v.cap)}</figcaption>
            ${v.silent ? '' : `<button class="spot-sound" type="button" aria-label="${tx(SPOTS.sound)}" aria-pressed="false">${SPEAKER}</button>`}
          </figure>`;
  }

  function setHTML(set) {
    const label = `<p class="spots-label"><img src="${set.icon}" alt="" width="28" height="28" />${set.name}</p>`;
    if (set.layout === 'bento') {
      const h = set.list.filter((v) => v.cls === 'spot--h');
      const v = set.list.filter((x) => x.cls === 'spot--v');
      return `<div class="spots-set">${label}<div class="app-spots-row app-spots-row--bento">
          <div class="spot-stack">${h.map(spotHTML).join('')}</div>${v.map(spotHTML).join('')}
        </div></div>`;
    }
    return `<div class="spots-set">${label}<div class="app-spots-row">${set.list.map(spotHTML).join('')}</div></div>`;
  }

  function spotsHTML() {
    const S = SPOTS;
    return `
      <section class="app-spots">
        <div class="app-spots-head">
          <p class="app-spots-kicker">${tx(S.kicker)}</p>
          <h3 class="app-spots-title">${tx(S.title)}</h3>
          <p class="app-spots-desc">${tx(S.desc)}${zl(S.desc)}</p>
          <a class="link-chevron" href="apps.html#app-marketing"><span class="btn-label">${tx(S.link)}</span></a>
        </div>
        ${S.sets.map(setHTML).join('')}
      </section>`;
  }

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
    }).join('') + spotsHTML();
  }

  // Play the in-phone preview only while it is on screen
  let io = null;
  let soundWired = false;
  function wireVideos(root) {
    if (io) io.disconnect();
    if (!soundWired) {
      soundWired = true;
      // one sound at a time: turning a spot's sound on mutes the others
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.spot-sound');
        if (!btn) return;
        const v = btn.parentElement.querySelector('video');
        const turnOn = v.muted;
        document.querySelectorAll('.spot video').forEach((o) => { o.muted = true; });
        document.querySelectorAll('.spot-sound').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        v.muted = !turnOn;
        btn.setAttribute('aria-pressed', String(turnOn));
        if (turnOn) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      });
    }
    const vids = (root || document).querySelectorAll('.app-video');
    if (!vids.length || !('IntersectionObserver' in window)) return;
    io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      } else if (!v.paused) {
        v.pause();
        if (!v.muted) {
          v.muted = true;
          const b = v.parentElement.querySelector('.spot-sound');
          if (b) b.setAttribute('aria-pressed', 'false');
        }
      }
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

    // TwoTake: the two previews come up one after the other, then the callouts
    const tt = document.querySelector('.app-show--twotake');
    if (tt) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: tt, start: 'top 65%' } });
      tl.from(tt.querySelector('.tt-v'), { clipPath: 'inset(0 0 100% 0 round 0.6cqw)', duration: 1.1, ease: 'power3.out' }, 0.35)
        .from(tt.querySelector('.tt-h'), { clipPath: 'inset(0 50% 0 50% round 0.6cqw)', duration: 1.1, ease: 'power3.out' }, 0.65)
        .from(tt.querySelectorAll('.tt-callout'), { y: 16, opacity: 0, duration: 0.9, ease: EXPO, stagger: 0.15 }, 1.1);
    }

    // Launch spots: rise in, the wide one first
    const spots = document.querySelector('.app-spots');
    if (spots) {
      gsap.from(spots.querySelectorAll('.app-spots-head > *'), {
        y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.06,
        scrollTrigger: { trigger: spots, start: 'top 78%' },
      });
      spots.querySelectorAll('.spots-set').forEach((set) => {
        gsap.from(set.querySelectorAll('.spots-label, .spot'), {
          y: 70, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.08,
          scrollTrigger: { trigger: set, start: 'top 85%' },
        });
      });
    }
  }

  window.EO_APPS = { html, animate, wireVideos };
})();
