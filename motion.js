// EORACCO — motion layer (GSAP + ScrollTrigger + Lenis)
// Everything here is progressive: if the libraries are missing or the visitor
// prefers reduced motion, the page stays fully readable and usable as-is.
(() => {
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(pointer: fine)').matches;

  // Pointer-follow highlight on glow cards (pure CSS vars, no library needed)
  if (FINE) {
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest && e.target.closest('.glow-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  if (REDUCED || !window.gsap || !window.ScrollTrigger) {
    window.EO_MOTION = {
      scrollTo(el) { el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); },
    };
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('has-motion');

  // ---------- smooth scroll ----------
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const navH = () => (document.getElementById('nav') || { offsetHeight: 0 }).offsetHeight;
  function scrollTo(el, offset = 0) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: offset - navH(), duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- film: image sequence drawn to canvas, frame chosen by scroll ----------
  const FILM_FRAMES = 83;
  // full 1920x1080 frames for big / retina screens, 1280x720 for phones
  const filmDir = () => {
    const c = document.getElementById('filmCanvas');
    const px = (c ? c.clientWidth : window.innerWidth) * Math.min(window.devicePixelRatio || 1, 2);
    return px > 1400 ? 'film/hd/' : 'film/';
  };
  let FILM_DIR = null;
  const filmSrc = (i) => `${FILM_DIR || (FILM_DIR = filmDir())}f${String(i + 1).padStart(3, '0')}.webp?v=2`;
  const film = { imgs: new Array(FILM_FRAMES), current: 0, started: false };
  const canvas = document.getElementById('filmCanvas');
  const c2d = canvas ? canvas.getContext('2d') : null;

  function loadFrame(i) {
    if (film.imgs[i]) return film.imgs[i];
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => { img.ready = true; if (Math.abs(i - film.current) < 2 || i === 0) drawFilm(film.current); };
    img.src = filmSrc(i);
    film.imgs[i] = img;
    return img;
  }
  function loadAllFrames() {
    if (film.started) return;
    film.started = true;
    let next = 1;
    const pump = () => {
      if (next >= FILM_FRAMES) return;
      const img = loadFrame(next++);
      img.addEventListener('load', pump, { once: true });
      img.addEventListener('error', pump, { once: true });
    };
    for (let k = 0; k < 6; k++) pump();   // six downloads at a time
  }
  function sizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    drawFilm(film.current);
  }
  function drawFilm(i) {
    if (!c2d) return;
    film.current = i;
    // nearest frame that has arrived
    let img = null;
    for (let d = 0; d < FILM_FRAMES && !img; d++) {
      const a = film.imgs[i - d], b = film.imgs[i + d];
      if (a && a.ready) img = a; else if (b && b.ready) img = b;
    }
    if (!img) return;
    const cw = canvas.width, ch = canvas.height;
    c2d.imageSmoothingEnabled = true;
    c2d.imageSmoothingQuality = 'high';
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
    c2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }
  if (canvas) {
    loadFrame(0);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { loadAllFrames(); io.disconnect(); }
    }, { rootMargin: '1600px 0px' });
    io.observe(document.getElementById('film'));
    window.addEventListener('resize', sizeCanvas);
  }

  const EXPO = 'expo.out';
  let mm = null;
  let ctx = null;
  let ready = false;

  // ---------- one-time hero intro ----------
  function heroIntro() {
    document.querySelectorAll('.hero-display .row').forEach((row) => {
      if (!row.querySelector('.row-in')) row.innerHTML = `<span class="row-in">${row.innerHTML}</span>`;
    });
    const tl = gsap.timeline({ defaults: { ease: EXPO } });
    tl.from('.hero-glow span', { opacity: 0, scale: 0.6, duration: 2.4, ease: 'power2.out' }, 0)
      .from('.hero-status', { y: 16, opacity: 0, duration: 1 }, 0.1)
      .from('.hero-display .row-in', { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.15)
      .from('.hero-sub', { y: 24, opacity: 0, duration: 1.2 }, 0.55)
      .from('.hero-ctas-new > *', { y: 20, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7)
      .from('.reel-tile', { y: 60, opacity: 0, duration: 1.6, stagger: 0.06 }, 0.75)
      .from('.chiclet', { y: 24, opacity: 0, duration: 1, stagger: 0.05 }, 0.85);
  }

  // ---------- scroll-driven scenes (rebuilt on language change) ----------
  function build() {
    mm = gsap.matchMedia();
    ctx = gsap.context(() => {
      // Hero: the whole stage recedes as you scroll past it
      gsap.to('.hero-inner', {
        scale: 0.92, opacity: 0, y: -40, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-glow', {
        yPercent: 35, opacity: 0.4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.from('.brands-label, .client', { y: 26, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: '.brands', start: 'top 85%' } });

      // Statement: words light up in reading order
      const words = gsap.utils.toArray('#statement .w');
      if (words.length) {
        gsap.fromTo(words, { opacity: 0.14 }, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: '#statementSec', start: 'top 72%', end: 'bottom 62%', scrub: 0.6 },
        });
      }
      // Film: frames follow the scroll while the frame opens to full size
      if (canvas) {
        sizeCanvas();
        const state = { f: 0 };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '#film', start: 'top top', end: 'bottom bottom', scrub: 0.5, onRefresh: sizeCanvas },
        });
        tl.to(state, {
          f: FILM_FRAMES - 1, ease: 'none', duration: 1,
          onUpdate: () => drawFilm(Math.round(state.f)),
        }, 0);
        mm.add('(min-width: 835px)', () => {
          gsap.fromTo('#filmFrame',
            { clipPath: 'inset(16% 22% 16% 22% round 44px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut',
              scrollTrigger: { trigger: '#film', start: 'top top', end: '45% bottom', scrub: 0.5 } });
        });
        mm.add('(max-width: 834px)', () => {
          gsap.fromTo('#filmFrame', { scale: 0.86 }, {
            scale: 1, ease: 'power2.out',
            scrollTrigger: { trigger: '#film', start: 'top 80%', end: 'top top', scrub: 0.5 } });
        });
        tl.fromTo('.film-shade', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.55)
          .from('#filmCaption > *', { y: 50, opacity: 0, stagger: 0.05, duration: 0.18 }, 0.6);
      }

      gsap.from('#statementZh', {
        y: 30, opacity: 0, duration: 1.2, ease: EXPO,
        scrollTrigger: { trigger: '#statementZh', start: 'top 90%' },
      });

      // Section headings rise through a mask
      gsap.utils.toArray('.sec-head').forEach((head) => {
        const h2 = head.querySelector('h2');
        const eyebrow = head.querySelector('.contact-eyebrow');
        const p = head.querySelector('p:not(.contact-eyebrow)');
        const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 86%' } });
        if (eyebrow) tl.from(eyebrow, { y: 24, opacity: 0, duration: 1, ease: EXPO }, 0);
        tl.from(h2, { y: 70, opacity: 0, duration: 1.3, ease: EXPO }, eyebrow ? 0.08 : 0);
        if (p && p.textContent.trim()) tl.from(p, { y: 30, opacity: 0, duration: 1.2, ease: EXPO }, 0.15);
      });

      // Bento cards
      gsap.from('.bento-card', {
        y: 90, opacity: 0, scale: 0.95, duration: 1.3, ease: EXPO, stagger: 0.09,
        scrollTrigger: { trigger: '.bento', start: 'top 82%' },
      });

      // Services: pinned horizontal gallery on wide screens, swipe row on phones
      const track = document.getElementById('chapters');
      const bar = document.getElementById('hscrollBar');
      mm.add('(min-width: 835px)', () => {
        const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
        const move = gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: '#servicesPin', start: 'top top', end: () => '+=' + dist(),
            pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
          },
        });
        gsap.utils.toArray('.card').forEach((card) => {
          gsap.fromTo(card.querySelector('.card-img'), { xPercent: -7 }, {
            xPercent: 7, ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
          });
          gsap.from(card.querySelector('.card-body'), {
            y: 40, opacity: 0, duration: 1, ease: EXPO,
            scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 85%' },
          });
        });
      });
      mm.add('(max-width: 834px)', () => {
        const row = document.getElementById('hscroll');
        const onScroll = () => {
          const max = row.scrollWidth - row.clientWidth;
          bar.style.transform = `scaleX(${max > 0 ? row.scrollLeft / max : 0})`;
        };
        row.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => row.removeEventListener('scroll', onScroll);
      });
      gsap.from('.card', {
        y: 80, opacity: 0, duration: 1.3, ease: EXPO, stagger: 0.07,
        scrollTrigger: { trigger: '#hscroll', start: 'top 88%' },
      });

      // Apps: phones rise, Pompolo screenshots fan out, TwoTake's 16:9 crop lifts out
      if (window.EO_APPS) window.EO_APPS.animate();

      // Video: a small frame grows to full size while the copy slides in
      const zoom = gsap.timeline({
        scrollTrigger: { trigger: '.zoom', start: 'top top', end: 'bottom bottom', scrub: 0.7 },
      });
      zoom.fromTo('#zoomFrame', { scale: 0.42, borderRadius: 80, filter: 'brightness(0.55)' },
        { scale: 1, borderRadius: 44, filter: 'brightness(1)', ease: 'power2.out', duration: 1 })
        .from('.zoom-copy--left > *', { x: -60, opacity: 0, stagger: 0.08, duration: 0.45 }, 0.5)
        .from('.zoom-copy--right > *', { x: 60, opacity: 0, stagger: 0.08, duration: 0.45 }, 0.58)
        .to({}, { duration: 0.35 });

      // Stats count up
      gsap.utils.toArray('.stat').forEach((stat, i) => {
        const num = stat.querySelector('.count');
        const to = Number(num.dataset.count);
        const obj = { v: 0 };
        gsap.timeline({ scrollTrigger: { trigger: '.stats', start: 'top 78%' } })
          .from(stat, { y: 50, opacity: 0, duration: 1.2, ease: EXPO, delay: i * 0.08 }, 0)
          .to(obj, {
            v: to, duration: 1.8, ease: 'power3.out', delay: i * 0.08,
            onUpdate: () => { num.textContent = Math.round(obj.v); },
          }, 0);
      });

      // Pricing picker rows and summary
      gsap.utils.toArray('.price-group').forEach((g) => {
        gsap.from(g.querySelectorAll('.price-item'), {
          y: 34, opacity: 0, duration: 1, ease: EXPO, stagger: 0.05,
          scrollTrigger: { trigger: g, start: 'top 88%' },
        });
      });
      gsap.from('.pb-summary-card', {
        y: 60, opacity: 0, duration: 1.3, ease: EXPO,
        scrollTrigger: { trigger: '.pb-layout', start: 'top 80%' },
      });

      // Process: the line draws and each step lights up as it is reached
      const steps = gsap.utils.toArray('.step');
      mm.add({ wide: '(min-width: 835px)', narrow: '(max-width: 834px)' }, (c) => {
        const axis = c.conditions.wide ? { scaleX: 0 } : { scaleY: 0 };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '#stepsWrap', start: 'top 78%', end: 'bottom 55%', scrub: 0.6 },
        });
        tl.fromTo('#stepsLine', axis, { scaleX: 1, scaleY: 1, ease: 'none', duration: steps.length });
        steps.forEach((s, i) => {
          tl.fromTo(s, { opacity: 0.22, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, i * 0.9);
        });
      });

      // Contact + footer
      ScrollTrigger.create({
        trigger: '#contact', start: () => `top ${navH()}px`, end: () => `bottom ${navH()}px`,
        toggleClass: { targets: '#nav', className: 'on-dark' }, invalidateOnRefresh: true,
      });
      gsap.from('.contact-left > *', {
        y: 40, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 82%' },
      });
      gsap.from('#contactFormWrap', {
        y: 70, opacity: 0, duration: 1.3, ease: EXPO,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 82%' },
      });
      gsap.from('.footer-word', {
        yPercent: 40, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 45%', scrub: true },
      });
    });
  }

  // Language change re-renders sections, so scenes are rebuilt from the top of the
  // page (measuring while pinned mid-scroll gives wrong positions), then the visitor
  // is returned to the section they were reading.
  function rebuild() {
    if (!ready) return;
    const probe = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
    const anchor = probe && probe.closest('section[id]');
    const within = anchor ? Math.max(0, -anchor.getBoundingClientRect().top) : 0;
    const anchorId = anchor ? anchor.id : null;
    // go to the top first so pinned sections are released before anything is measured
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    ScrollTrigger.update();
    if (mm) mm.revert();
    if (ctx) ctx.revert();
    build();
    ScrollTrigger.refresh();
    if (anchorId && anchorId !== 'top') {
      const el = document.getElementById(anchorId);
      const pinned = anchorId === 'services' || anchorId === 'video';
      const y = el.getBoundingClientRect().top + window.scrollY + (pinned ? 0 : within);
      window.scrollTo({ top: y, behavior: 'instant' });
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    }
    ScrollTrigger.update();
  }

  // "Add to plan": a small amber dot flies to the nav so the visitor sees where it went
  function flyToPlan(btn) {
    const visible = (sel) => [...document.querySelectorAll(sel)].find((el) => el.offsetParent);
    const target = visible('.nav-links a[href="#pricing"]') || visible('.nav-burger') || visible('.cta-mini');
    if (!target) return;
    const a = btn.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'fly-dot';
    document.body.appendChild(dot);
    const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2;
    const x1 = b.left + b.width / 2, y1 = b.top + b.height / 2;
    gsap.set(dot, { x: x0, y: y0 });
    gsap.timeline({ onComplete: () => {
      dot.remove();
      gsap.fromTo(target, { scale: 1.18 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    } })
      .to(dot, { x: x1, duration: 0.85, ease: 'power2.inOut' }, 0)
      .to(dot, { y: Math.min(y0, y1) - 120, duration: 0.42, ease: 'power2.out' }, 0)
      .to(dot, { y: y1, duration: 0.43, ease: 'power2.in' }, 0.42)
      .to(dot, { scale: 0.4, opacity: 0.6, duration: 0.25 }, 0.6);
  }

  window.EO_MOTION = { scrollTo, rebuild, flyToPlan, lenis };

  document.addEventListener('DOMContentLoaded', () => {
    heroIntro();
    build();
    ready = true;
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
