// EORACCO — category pages (marketing / creative / apps).
// Renders from services-data.js; motion is progressive (GSAP + ScrollTrigger + Lenis when present).
(() => {
  const EO = window.EO;
  const key = document.body.dataset.page;
  const cat = EO.category(key);
  const main = document.getElementById('page');
  if (!cat || !main) return;

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tx = (o) => EO.tx(o);
  const zhLine = (o, cls = 'zh-line') => (EO.isBi() && o ? `<span class="${cls}">${o.zh}</span>` : '');
  const catName = cat.longName || cat.name;
  const T = {
    quote: { en: 'Get a quote', zh: '获取报价' },
    book: { en: 'Book a free call', zh: '预约免费通话' },
    plan: { en: 'Build your plan', zh: '自助配置方案' },
    add: { en: 'Add to plan', zh: '加入方案' },
    added: { en: 'In your plan', zh: '已加入方案' },
    ask: { en: 'Ask about this', zh: '咨询这项服务' },
    included: { en: 'What’s included', zh: '服务内容' },
    toastAdd: { en: 'Added to your plan.', zh: '已加入方案。' },
    toastRemove: { en: 'Removed from your plan.', zh: '已从方案移除。' },
    viewPlan: { en: 'View plan', zh: '查看方案' },
    steps: { en: 'How a project runs.', zh: '项目怎么进行。' },
    apps: { en: 'Apps we’ve shipped.', zh: '我们上线的 App。' },
    appsSub: { en: 'Live on the App Store today.', zh: '现已在 App Store 上架。' },
    store: { en: 'View on the App Store', zh: '在 App Store 查看' },
    ctaH: { en: 'Not sure which you need?', zh: '不确定需要哪一项？' },
    ctaP: { en: 'Tell us about the project on a free 30-minute call. We reply within one business day.',
            zh: '预约 30 分钟免费通话聊聊您的项目，我们会在一个工作日内回复。' },
    other: { en: 'Other services', zh: '其他服务' },
  };

  function mediaHTML(s) {
    if (s.videos) {
      const snd = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path class="on" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg>`;
      return `<figure class="svc-media svc-trio">
        ${s.videos.map((v, k) => `<span class="trio-amb" data-k="${k}" style="background-image:url(${v.poster})"></span>`).join('')}
        <div class="trio-bars">${s.videos.map(() => '<i><b></b></i>').join('')}</div>
        <div class="trio-stage">${s.videos.map((v, k) => `
          <div class="trio-clip" data-k="${k}"><video class="trio-video" data-src="${v.src}" poster="${v.poster}" muted playsinline preload="none"></video></div>`).join('')}
        </div>
        <button type="button" class="trio-sound" aria-pressed="false" aria-label="${tx({ en: 'Sound', zh: '声音' })}">${snd}</button>
        ${s.imgNote ? `<figcaption>${tx(s.imgNote)}</figcaption>` : ''}</figure>`;
    }
    if (s.video) {
      return `<figure class="svc-media"><video class="app-video" data-src="${s.video}" poster="${s.poster}" muted loop playsinline preload="none"></video>${s.imgNote ? `<figcaption>${tx(s.imgNote)}</figcaption>` : ''}</figure>`;
    }
    if (s.img) {
      return `<figure class="svc-media"><img src="${s.img}" alt="" loading="lazy" />${s.imgNote ? `<figcaption>${tx(s.imgNote)}</figcaption>` : ''}</figure>`;
    }
    return `<div class="svc-media svc-art art-${cat.key}" aria-hidden="true">
      <span class="art-grid"></span>
      <span class="art-icon">${EO.icon(s.icon, 120, 1)}</span>
      <span class="art-word">${tx(s.name)}</span>
    </div>`;
  }

  function serviceHTML(s, i) {
    const planBtn = s.plan
      ? `<button type="button" class="btn btn-primary btn-plan ${EO.plan.has(s.plan) ? 'is-added' : ''}" data-plan="${s.plan}">${tx(EO.plan.has(s.plan) ? T.added : T.add)}</button>
         <a class="link-chevron" href="index.html#contact"><span class="btn-label">${tx(T.ask)}</span></a>`
      : `<a class="btn btn-primary" href="index.html#contact">${tx(T.quote)}</a>`;
    return `
    <article class="svc ${i % 2 ? 'svc--flip' : ''}" id="${s.id}">
      <div class="svc-copy">
        <span class="svc-icon">${EO.icon(s.icon, 26)}</span>
        <h2 class="svc-name">${tx(s.name)}</h2>
        ${zhLine(s.name, 'svc-zh')}
        <p class="svc-desc">${tx(s.desc)}${zhLine(s.desc)}</p>
        <p class="svc-label">${tx(T.included)}</p>
        <ul class="svc-includes">
          ${s.includes.map((x) => `<li>${EO.icon('check', 16, 2)}<span>${tx(x)}${zhLine(x)}</span></li>`).join('')}
        </ul>
        <p class="svc-price">${EO.priceText(s.price)}${s.note ? `<span class="svc-note">${tx(s.note)}</span>` : ''}</p>
        <div class="svc-actions">${planBtn}</div>
      </div>
      ${mediaHTML(s)}
    </article>`;
  }

  function heroVisual() {
    if (cat.key === 'apps') {
      return `<div class="cat-visual cat-visual--apps">${EO.APPS.map((a) => `<div class="mini-phone"><img src="${a.shot}" alt="${a.name}" /></div>`).join('')}</div>`;
    }
    return `<div class="cat-visual"><img src="${cat.card.hero || cat.card.img}" alt="" /></div>`;
  }

  function stepsHTML() {
    if (!cat.steps) return '';
    return `
    <section class="sec cat-steps" id="steps">
      <div class="container">
        <div class="sec-head"><h2>${tx(T.steps)}${zhLine(T.steps, 'h2-zh')}</h2></div>
        <div class="steps-wrap" id="stepsWrap">
          <div class="steps-line steps-line--4" aria-hidden="true"><span id="stepsLine"></span></div>
          <ol class="steps steps--4">
            ${cat.steps.map((st, i) => `
            <li class="step">
              <span class="step-num">${i + 1}</span>
              <h3 class="step-title">${tx(st.title)}</h3>
              ${EO.isBi() ? `<p class="step-title-zh">${st.title.zh}</p>` : ''}
              <p class="step-desc">${tx(st.desc)}${zhLine(st.desc)}</p>
            </li>`).join('')}
          </ol>
        </div>
        ${cat.footnote ? `<p class="cat-footnote">${tx(cat.footnote)}${zhLine(cat.footnote)}</p>` : ''}
      </div>
    </section>`;
  }

  function appsHTML() {
    if (cat.key !== 'apps') return '';
    return `
    <section class="sec apps" id="shipped">
      <div class="container">
        <div class="sec-head"><h2>${tx(T.apps)}<span class="h2-sub"> ${tx(T.appsSub)}</span>${EO.isBi() ? `<span class="h2-zh">${T.apps.zh}${T.appsSub.zh}</span>` : ''}</h2></div>
        <div class="apps-showcase">${window.EO_APPS.html()}</div>
      </div>
    </section>`;
  }

  function otherCatsHTML() {
    const others = EO.CATEGORIES.filter((c) => c.key !== cat.key);
    return `
    <section class="sec other-cats">
      <div class="container">
        <p class="svc-label">${tx(T.other)}</p>
        <div class="other-grid">
          ${others.map((c) => `
          <a class="other-card" href="${c.page}">
            <span class="other-icon">${EO.icon(c.icon, 28)}</span>
            <span class="other-name">${tx(c.longName || c.name)}${c.isNew ? `<sup class="nav-new">${EO.isZh() ? '新' : 'New'}</sup>` : ''}</span>
            <span class="other-sub">${tx(c.headline)}</span>
          </a>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function render() {
    document.title = `${tx(catName)} · EORACCO`;
    main.innerHTML = `
    <div class="localnav" id="localnav">
      <div class="localnav-inner">
        <span class="localnav-title">${tx(catName)}</span>
        <nav class="localnav-links" aria-label="${tx(catName)}">
          ${cat.services.map((s) => `<a href="#${s.id}">${tx(s.name)}</a>`).join('')}
        </nav>
        <a class="btn btn-small btn-dark" href="index.html#contact">${tx(T.quote)}</a>
      </div>
    </div>

    <section class="cat-hero">
      <div class="container cat-hero-inner">
        <p class="cat-kicker"><span class="cat-kicker-icon">${EO.icon(cat.icon, 22)}</span>${tx(catName)}${EO.isBi() ? ` · ${catName.zh}` : ''}</p>
        <h1 class="cat-title">${tx(cat.headline)}</h1>
        ${EO.isBi() ? `<p class="cat-title-zh">${cat.headline.zh}</p>` : ''}
        <p class="cat-sub">${tx(cat.sub)}${zhLine(cat.sub)}</p>
        <div class="cat-ctas">
          <a class="btn btn-primary" href="index.html#contact">${tx(T.book)}</a>
          <a class="link-chevron" href="index.html#pricing"><span class="btn-label">${tx(T.plan)}</span></a>
        </div>
      </div>
      ${heroVisual()}
    </section>

    <section class="svc-list">
      ${cat.services.map(serviceHTML).join('')}
    </section>

    ${stepsHTML()}
    ${appsHTML()}

    <section class="cat-cta">
      <div class="container">
        <h2>${tx(T.ctaH)}</h2>
        ${EO.isBi() ? `<p class="cat-cta-zh">${T.ctaH.zh}</p>` : ''}
        <p>${tx(T.ctaP)}${zhLine(T.ctaP)}</p>
        <div class="cat-ctas">
          <a class="btn btn-primary" href="index.html#contact">${tx(T.book)}</a>
          <a class="link-chevron" href="index.html#pricing"><span class="btn-label">${tx(T.plan)}</span></a>
        </div>
      </div>
    </section>

    ${otherCatsHTML()}`;
  }

  // ---------- plan buttons ----------
  main.addEventListener('click', (e) => {
    const b = e.target.closest('[data-plan]');
    if (!b) return;
    const id = b.getAttribute('data-plan');
    const on = EO.plan.toggle(id);
    b.classList.toggle('is-added', on);
    b.textContent = tx(on ? T.added : T.add);
    if (on) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }
    window.EO_TOAST && window.EO_TOAST(
      `${EO.icon('check', 16, 2)}<span>${tx(on ? T.toastAdd : T.toastRemove)}</span><a href="index.html#pricing">${tx(T.viewPlan)}</a>`);
  });

  // ---------- motion ----------
  let lenis = null;
  let ctx = null;
  const hasMotion = !REDUCED && window.gsap && window.ScrollTrigger;
  const localH = () => (document.getElementById('localnav') || { offsetHeight: 0 }).offsetHeight;
  const navH = () => (document.getElementById('nav') || { offsetHeight: 0 }).offsetHeight;

  function scrollToId(id, instant) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = -(navH() + localH() + 8);
    if (lenis) lenis.scrollTo(el, { offset, immediate: !!instant, duration: 1.3 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: instant ? 'auto' : 'smooth' });
  }

  function build(intro) {
    if (!hasMotion) return;
    const { gsap } = window;
    const EXPO = 'expo.out';
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EXPO } });
      if (intro) tl.from('.cat-kicker', { y: 16, opacity: 0, duration: 1 }, 0.05)
        .from('.cat-title', { y: 60, opacity: 0, duration: 1.3 }, 0.12)
        .from('.cat-title-zh, .cat-sub', { y: 24, opacity: 0, duration: 1.1, stagger: 0.06 }, 0.35)
        .from('.cat-hero .cat-ctas > *', { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 0.5)
        .from('.cat-visual', { y: 80, opacity: 0, scale: 0.94, duration: 1.6 }, 0.45);
      if (!intro) tl.kill();

      gsap.to('.cat-visual img, .cat-visual .mini-phone', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.cat-hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.utils.toArray('.svc').forEach((svc) => {
        const copy = svc.querySelectorAll('.svc-copy > *');
        const media = svc.querySelector('.svc-media');
        const t2 = gsap.timeline({ scrollTrigger: { trigger: svc, start: 'top 80%' } });
        t2.from(media, { clipPath: 'inset(12% 12% 12% 12% round 32px)', opacity: 0, duration: 1.4, ease: 'power3.out' }, 0)
          .from(copy, { y: 36, opacity: 0, duration: 1.1, ease: EXPO, stagger: 0.05 }, 0.1);
        const img = svc.querySelector('.svc-media img');
        if (img) {
          gsap.fromTo(img, { scale: 1.12 }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: svc, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
        const art = svc.querySelector('.art-icon');
        if (art) {
          gsap.fromTo(art, { yPercent: 12, rotate: -6 }, {
            yPercent: -12, rotate: 6, ease: 'none',
            scrollTrigger: { trigger: svc, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        }
      });

      if (document.getElementById('stepsWrap')) {
        const steps = gsap.utils.toArray('.step');
        const wide = window.matchMedia('(min-width: 835px)').matches;
        const t3 = gsap.timeline({ scrollTrigger: { trigger: '#stepsWrap', start: 'top 78%', end: 'bottom 55%', scrub: 0.6 } });
        t3.fromTo('#stepsLine', wide ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: steps.length });
        steps.forEach((s, i) => t3.fromTo(s, { opacity: 0.22, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, i * 0.9));
      }

      if (window.EO_APPS && document.querySelector('.app-show')) window.EO_APPS.animate();
      gsap.from('.cat-cta .container > *', { y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.07,
        scrollTrigger: { trigger: '.cat-cta', start: 'top 80%' } });
      gsap.from('.other-card', { y: 50, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: '.other-grid', start: 'top 85%' } });
      gsap.from('.footer-word', { yPercent: 40, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 45%', scrub: true } });
    }, main);
  }

  function initMotion() {
    if (!hasMotion) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('has-motion');
    if (window.Lenis) {
      lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window.EO_MOTION = { lenis, scrollTo: (el, off) => (lenis ? lenis.scrollTo(el, { offset: off }) : el.scrollIntoView()) };
  }

  // in-page links (local nav) use the smooth scroller and account for both bars
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    scrollToId(id);
  });

  // local nav: highlight the service in view
  let localIO = null;
  window.addEventListener('scroll', () => {
    const lnav = document.getElementById('localnav');
    if (lnav) lnav.classList.toggle('is-stuck', lnav.getBoundingClientRect().top <= navH() + 1);
  }, { passive: true });
  function wireLocalNav() {
    if (!('IntersectionObserver' in window)) return;
    const links = [...main.querySelectorAll('.localnav-links a')];
    if (localIO) localIO.disconnect();
    const io = localIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    main.querySelectorAll('.svc').forEach((s) => io.observe(s));
  }

  // play service videos only while they're on screen; one clip with sound at a time
  let vidIO = null;
  function wireVideos() {
    if (window.EO_APPS) { window.EO_APPS.wireVideos(main); }
    else if ('IntersectionObserver' in window) {
      if (vidIO) vidIO.disconnect();
      vidIO = new IntersectionObserver((entries) => entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        else if (!v.paused) { v.pause(); v.muted = true; const b = v.parentElement.querySelector('.trio-sound'); if (b) b.setAttribute('aria-pressed', 'false'); }
      }), { threshold: 0.25 });
      main.querySelectorAll('.app-video').forEach((v) => vidIO.observe(v));
    }
    main.querySelectorAll('.svc-trio').forEach(wireTrio);
  }

  // three clips rotating through the centre; only the centre one plays
  function wireTrio(fig) {
    const clips = [...fig.querySelectorAll('.trio-clip')];
    const vids = clips.map((c) => c.querySelector('video'));
    const bars = [...fig.querySelectorAll('.trio-bars b')];
    const ambs = [...fig.querySelectorAll('.trio-amb')];
    const sndBtn = fig.querySelector('.trio-sound');
    const stage = fig.querySelector('.trio-stage');
    const n = clips.length;
    let cur = 1, live = false, sound = false, raf = 0;
    const POS = ['pos-c', 'pos-r', 'pos-l'];
    const layout = () => {
      clips.forEach((c, k) => { c.classList.remove(...POS); c.classList.add(POS[(k - cur + n) % n]); });
      ambs.forEach((a, k) => a.classList.toggle('is-on', k === cur));
      bars.forEach((b, k) => { b.style.transition = 'none'; b.style.width = k < cur ? '100%' : '0%'; });
    };
    const tick = () => {
      const v = vids[cur];
      if (v.duration) bars[cur].style.width = (v.currentTime / v.duration * 100) + '%';
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      vids.forEach((v, k) => { if (k !== cur) { v.pause(); v.muted = true; } });
      const v = vids[cur];
      if (!v.src) v.src = v.dataset.src;
      v.currentTime = 0; v.muted = !sound;
      const p = v.play(); if (p && p.catch) p.catch(() => {});
      cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    };
    const go = (k) => { cur = (k + n) % n; layout(); if (live) play(); };
    vids.forEach((v, k) => v.addEventListener('ended', () => { if (k === cur) go(cur + 1); }));
    clips.forEach((c, k) => c.addEventListener('click', () => { if (k !== cur) go(k); }));
    sndBtn.addEventListener('click', () => {
      sound = !sound; sndBtn.setAttribute('aria-pressed', String(sound));
      const v = vids[cur]; v.muted = !sound;
      if (sound && v.paused) play();
    });
    // gentle 3D tilt toward the pointer
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fig.addEventListener('pointermove', (e) => {
        const r = fig.getBoundingClientRect();
        stage.style.setProperty('--ty', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg');
        stage.style.setProperty('--tx', -((e.clientY - r.top) / r.height - 0.5) * 6 + 'deg');
      });
      fig.addEventListener('pointerleave', () => { stage.style.setProperty('--ty', '0deg'); stage.style.setProperty('--tx', '0deg'); });
    }
    layout();
    fig.classList.add('is-pre');
    if (!('IntersectionObserver' in window)) { fig.classList.remove('is-pre'); return; }
    new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        if (fig.classList.contains('is-pre')) {
          vids.forEach((v) => { if (!v.src) { v.src = v.dataset.src; v.preload = 'auto'; } });
          requestAnimationFrame(() => fig.classList.replace('is-pre', 'is-entering'));
          setTimeout(() => fig.classList.remove('is-entering'), 1800);
        }
        live = true; play();
      } else if (live) {
        live = false; cancelAnimationFrame(raf);
        vids.forEach((v) => v.pause());
        if (sound) { sound = false; sndBtn.setAttribute('aria-pressed', 'false'); }
      }
    }), { threshold: 0.35 }).observe(fig);
  }

  render();
  wireVideos();
  initMotion();
  build(true);
  wireLocalNav();

  EO.onLang(() => {
    if (ctx) ctx.revert();
    render();
    wireVideos();
    build();
    wireLocalNav();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  });

  EO.plan.onChange(() => {
    main.querySelectorAll('[data-plan]').forEach((b) => {
      const on = EO.plan.has(b.getAttribute('data-plan'));
      b.classList.toggle('is-added', on);
      b.textContent = tx(on ? T.added : T.add);
    });
  });

  window.addEventListener('load', () => {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    const id = (location.hash || '').slice(1);
    if (id && document.getElementById(id)) setTimeout(() => scrollToId(id, true), 60);
  });
})();
