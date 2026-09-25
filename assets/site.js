(() => {
 const d = document, html = d.documentElement;
 if (html.dataset.mx) return; html.dataset.mx = '1';
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
 const lerp = (a,b,t) => a + (b-a)*t, clamp = (v,a,b) => Math.min(b, Math.max(a,v));
 const $$ = (s, r = d) => [...r.querySelectorAll(s)];
 html.classList.add('mx-js');
 const split = (el, cls) => {
  const out = [];
  const walk = n => [...n.childNodes].forEach(c => {
   if (c.nodeType === 3) {
    const f = d.createDocumentFragment();
    c.textContent.split(/(\s+)/).forEach(t => {
     if (!t) return;
     if (/^\s+$/.test(t)) return f.append(t);
     const s = d.createElement('span'); s.textContent = t;
     if (cls === 'mx-w') { const w = d.createElement('span'); w.className = 'mx-w'; s.style.setProperty('--i', out.length); w.append(s); f.append(w); }
     else { s.className = cls; f.append(s); }
     out.push(s);
    });
    c.replaceWith(f);
   } else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
  });
  walk(el); return out;
 };
 $$('[data-reveal=lines]').forEach(el => split(el, 'mx-w'));
 $$('[data-reveal-stagger]').forEach(p => {
  const step = (+p.dataset.revealStagger || 80) / 1000;
  $$('[data-reveal]', p).forEach((el, i) => el.style.setProperty('--d', (i*step).toFixed(3) + 's'));
 });
 const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
 }), { rootMargin: '0px 0px -10% 0px' });
 requestAnimationFrame(() => requestAnimationFrame(() => $$('[data-reveal]').forEach(el => io.observe(el))));
 const scrubs = $$('[data-scrub=words]').map(el => ({ el, words: split(el, 'mx-sw') }));
 const nav = d.querySelector('.mx-nav');
 const links = nav ? $$('[data-nav-link]', nav) : [];
 const dot = nav && nav.querySelector('.mx-nav-dot');
 const dotTo = a => {
  if (!dot) return;
  if (!a) return dot.classList.remove('is-on');
  const pr = dot.parentElement.getBoundingClientRect(), r = a.getBoundingClientRect();
  dot.style.transform = 'translateX(' + (r.left - pr.left + r.width/2) + 'px)'; dot.classList.add('is-on');
 };
 const current = () => links.find(a => a.classList.contains('is-active'))
  || links.find(a => !(a.getAttribute('href') || '').startsWith('#') && a.matches('.w--current,[aria-current=page]'));
 links.forEach(a => { a.addEventListener('pointerenter', () => dotTo(a)); a.addEventListener('focus', () => dotTo(a)); });
 if (nav) { nav.addEventListener('pointerleave', () => dotTo(current())); addEventListener('resize', () => dotTo(current())); setTimeout(() => dotTo(current()), 60); }
 const spyTargets = links.map(a => (a.hash && d.getElementById(a.hash.slice(1))) || null);
 if (spyTargets.some(Boolean)) {
  const spy = new IntersectionObserver(es => es.forEach(e => {
   if (!e.isIntersecting) return;
   links.forEach((a, i) => a.classList.toggle('is-active', spyTargets[i] === e.target));
   if (!nav.matches(':hover')) dotTo(current());
  }), { rootMargin: '-45% 0px -50% 0px' });
  spyTargets.forEach(t => t && spy.observe(t));
 }
 $$('[data-roll]').forEach(b => {
  const t = b.dataset.roll || b.textContent.trim();
  b.setAttribute('aria-label', t);
  b.innerHTML = '<span class=mx-roll aria-hidden=true><span>' + t + '</span><span>' + t + '</span></span>';
 });
 $$('[data-cursor=copy]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  const txt = el.dataset.copy || el.textContent.trim();
  const mailto = el.dataset.mailto;
  const done = () => { el.classList.add('is-copied'); setLabel('copied'); setTimeout(() => { el.classList.remove('is-copied'); setLabel(el.dataset.cursorLabel || 'copy'); }, 1400); if (mailto) location.href = 'mailto:' + mailto; };
  (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(done, () => { const r = d.createRange(); r.selectNodeContents(el); getSelection().removeAllRanges(); getSelection().addRange(r); done(); });
 }));
 const marquees = $$('[data-marquee]').map(m => {
  const t = m.firstElementChild;
  [...t.children].forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden','true'); t.append(c); });
  const v = +m.dataset.marquee || 32;
  const o = { t, x: 0, v, cur: v, target: v };
  m.addEventListener('pointerenter', () => o.target = v * .18);
  m.addEventListener('pointerleave', () => o.target = v);
  return o;
 });
 $$('[data-spotlight]').forEach(s => {
  s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(); s.style.setProperty('--mx-x', (e.clientX - r.left) + 'px'); s.style.setProperty('--mx-y', (e.clientY - r.top) + 'px'); s.classList.add('is-lit'); });
  s.addEventListener('pointerleave', () => s.classList.remove('is-lit'));
 });
 let mx = -200, my = -200, setLabel = () => {};
 let cur = null, preview = null;
 if (fine) {
  cur = d.createElement('div'); cur.className = 'mx-cursor'; cur.setAttribute('aria-hidden','true');
  cur.innerHTML = '<div class=mx-dot></div><div class=mx-ring><div class=mx-ring-in><span class=mx-label></span></div></div>';
  d.body.append(cur); html.classList.add('mx-has-cursor');
  cur.dot = cur.children[0]; cur.ring = cur.children[1]; cur.rx = mx; cur.ry = my;
  const label = cur.querySelector('.mx-label');
  setLabel = t => label.textContent = t;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; cur.classList.add('is-on'); }, { passive: true });
  d.addEventListener('mouseout', e => { if (!e.relatedTarget) cur.classList.remove('is-on'); });
  addEventListener('pointerdown', () => cur.classList.add('is-down'));
  addEventListener('pointerup', () => cur.classList.remove('is-down'));
  d.addEventListener('pointerover', e => {
   const t = e.target.closest('[data-cursor],a,button,[role=button],label,input,textarea,select,iframe');
   let s = '';
   if (t) s = t.dataset.cursor || (t.matches('input,textarea,select,iframe') ? 'hide' : 'link');
   cur.dataset.state = s;
   setLabel(t && t.classList.contains('is-copied') ? 'copied' : (t && t.dataset.cursorLabel) || (s === 'copy' ? 'copy' : s === 'view' ? 'view' : ''));
  });
  $$('[data-magnetic]').forEach(el => {
   const k = +el.dataset.magnetic || .3;
   el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = clamp((e.clientX - r.left - r.width/2)*k, -10, 10), y = clamp((e.clientY - r.top - r.height/2)*k, -8, 8);
    el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
   });
   el.addEventListener('pointerleave', () => el.style.transform = '');
  });
  const rows = $$('[data-preview]');
  if (rows.length) {
   preview = d.createElement('div'); preview.className = 'mx-preview'; preview.setAttribute('aria-hidden','true');
   d.body.append(preview); preview.px = mx; preview.py = my;
   rows.forEach(r => {
    r.addEventListener('pointerenter', () => {
     const src = r.dataset.preview;
     const tpl = r.querySelector('template.mx-preview-html');
     preview.innerHTML = /^(https?:|data:|\/)/.test(src) ? '<img src=' + src + ' alt=>' : (tpl ? tpl.innerHTML : '');
     preview.getBoundingClientRect(); preview.classList.add('is-on');
    });
    r.addEventListener('pointerleave', () => preview.classList.remove('is-on'));
   });
  }
 }
 const bar = d.querySelector('.mx-progress');
 let lastY = scrollY, last = performance.now();
 const tick = now => {
  const dt = Math.min(.05, (now - last)/1000); last = now;
  const y = scrollY, vh = innerHeight;
  if (cur) {
   cur.rx = lerp(cur.rx, mx, .2); cur.ry = lerp(cur.ry, my, .2);
   cur.dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
   cur.ring.style.transform = 'translate3d(' + cur.rx + 'px,' + cur.ry + 'px,0)';
  }
  if (preview) {
   const px = lerp(preview.px, mx, .12), py = lerp(preview.py, my, .12);
   const rot = clamp((mx - px)*.05, -4, 4);
   preview.px = px; preview.py = py;
   preview.style.transform = 'translate3d(' + (px+28) + 'px,' + (py-98) + 'px,0) rotate(' + rot + 'deg)';
  }
  for (const m of marquees) {
   m.cur = lerp(m.cur, m.target, .06); m.x -= m.cur * dt;
   const w = m.t.scrollWidth/2; if (w) { if (-m.x >= w) m.x += w; if (m.x > 0) m.x -= w; }
   m.t.style.transform = 'translate3d(' + m.x + 'px,0,0)';
  }
  for (const s of scrubs) {
   const r = s.el.getBoundingClientRect();
   if (r.bottom < 0 || r.top > vh) continue;
   const p = clamp((vh*.85 - r.top)/(r.height + vh*.35), 0, 1) * s.words.length;
   s.words.forEach((w, i) => w.style.opacity = (.16 + .84*clamp(p - i, 0, 1)).toFixed(3));
  }
  if (nav && y !== lastY) {
   nav.classList.toggle('is-scrolled', y > 24);
   if (Math.abs(y - lastY) > 4) nav.classList.toggle('is-hidden', y > lastY && y > 140 && !nav.contains(d.activeElement));
   lastY = y;
  }
  if (bar) bar.style.transform = 'scaleX(' + clamp(y/(html.scrollHeight - vh || 1), 0, 1) + ')';
  requestAnimationFrame(tick);
 };
 requestAnimationFrame(tick);
})();

(() => {
  const btn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mmenu');
  if (!btn || !menu) return;
  const closeBtn = menu.querySelector('.mmenu-close');
  const links = menu.querySelectorAll('a');
  const open = () => {
    menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };
  const close = () => {
    menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    btn.focus();
  };
  btn.addEventListener('click', () => { menu.classList.contains('is-open') ? close() : open(); });
  if (closeBtn) closeBtn.addEventListener('click', close);
  links.forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) close(); });
})();

(() => {
  const d = document, html = d.documentElement;
  if (html.dataset.field) return; html.dataset.field = '1';
  const hush = vt => vt && ['ready', 'finished', 'updateCallbackDone'].forEach(k => vt[k] && vt[k].catch(() => {}));
  addEventListener('pageswap', e => hush(e.viewTransition));
  addEventListener('pagereveal', e => hush(e.viewTransition));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cv = d.createElement('canvas');
  cv.className = 'mx-field'; cv.setAttribute('aria-hidden', 'true');
  d.body.prepend(cv);
  const ctx = cv.getContext('2d');
  const S = 1 / 6;
  let W = 0, H = 0;
  const size = () => { W = cv.width = Math.ceil(innerWidth * S); H = cv.height = Math.ceil(innerHeight * S); };
  size(); addEventListener('resize', size);
  const E = '217,85,42';
  const blob = (x, y, r, a) => {
    if (a <= 0.002) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${E},${a})`); g.addColorStop(1, `rgba(${E},0)`);
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  if (reduce) { blob(W * .5, H * .3, Math.max(W, H) * .55, .09); return; }
  const LEVEL = { warm: 1.35, calm: .5, off: 0 };
  let level = 1, target = 1;
  const zones = [...d.querySelectorAll('[data-field]')];
  if (zones.length) {
    const seen = new Map();
    const io = new IntersectionObserver(es => {
      es.forEach(e => seen.set(e.target, e.intersectionRatio));
      let best = null, r = 0; seen.forEach((v, k) => { if (v > r) { r = v; best = k; } });
      target = best && r > .25 ? (LEVEL[best.dataset.field] ?? 1) : 1;
    }, { threshold: [0, .25, .5, .75] });
    zones.forEach(z => io.observe(z));
  }
  let px = -999, py = -999, sx = px, sy = py, heat = 0, last = performance.now(), lastInput = last;
  const rings = [];
  if (fine) addEventListener('pointermove', e => {
    const nx = e.clientX * S, ny = e.clientY * S;
    if (px > -999) heat = Math.min(1, heat + Math.hypot(nx - px, ny - py) * .06);
    else { sx = nx; sy = ny; }
    px = nx; py = ny; lastInput = performance.now();
  }, { passive: true });
  addEventListener('pointerdown', e => { rings.push({ x: e.clientX * S, y: e.clientY * S, t: performance.now() }); lastInput = performance.now(); });
  let lastY = scrollY, drift = 0;
  const tick = now => {
    requestAnimationFrame(tick);
    if (d.hidden || now - last < 32) return;
    const dt = (now - last) / 1000; last = now;
    const idle = now - lastInput > 8000 ? .6 : 1;
    level += (target * idle - level) * .04;
    const dy = (scrollY - lastY) * S * .35; lastY = scrollY;
    if (dy) {
      ctx.globalCompositeOperation = 'copy'; ctx.drawImage(cv, 0, -dy);
      drift = Math.min(.25, drift + Math.abs(dy) * .01);
    }
    drift *= .94;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,.075)'; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const t = now / 1000, R = Math.max(W, H);
    for (let i = 0; i < 3; i++) {
      const x = W * (.5 + .38 * Math.sin(t * (.05 + i * .017) + i * 2.1));
      const y = H * (.45 + .32 * Math.cos(t * (.04 + i * .013) + i * 1.3));
      blob(x, y, R * .32, (.007 + drift * .02) * level);
    }
    sx += (px - sx) * .35; sy += (py - sy) * .35;
    heat *= Math.pow(.2, dt);
    if (px > -999) blob(sx, sy, 11 + heat * 7, (.012 + heat * .05) * level);
    for (let i = rings.length - 1; i >= 0; i--) {
      const p = (now - rings[i].t) / 900;
      if (p >= 1) { rings.splice(i, 1); continue; }
      const e = 1 - Math.pow(1 - p, 3);
      ctx.strokeStyle = `rgba(${E},${(.16 * (1 - p) * Math.max(level, .5)).toFixed(3)})`;
      ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(rings[i].x, rings[i].y, 4 + e * 36, 0, 7); ctx.stroke();
    }
  };
  requestAnimationFrame(tick);
})();

(() => {
  const RESULTS = [
    ['$1.9m+', 'pipeline for speedsize'],
    ['0.1% → 22.9%', 'positive replies for itamg'],
    ['237', 'qualified leads for trynow'],
    ['173', 'qualified leads for fitmanager'],
    ['10.15%', 'peak positive reply rate for speedsize'],
    ['4.2% → 9.6%', 'reply rate on the same list'],
    ['+178%', 'website traffic at xeno'],
    ['$1.4m/quarter', 'sql pipeline at xeno']
  ];
  const tracks = document.querySelectorAll('.rtrack');
  if (!tracks.length) return;
  const itemHtml = r => "<span class='ritem'><b>" + r[0] + '</b>' + r[1] + '</span>';
  tracks.forEach(t => {
    let items = RESULTS;
    if (t.dataset.extra) { try { items = JSON.parse(t.dataset.extra).concat(RESULTS); } catch (e) {} }
    t.innerHTML = items.map(itemHtml).join('');
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.rmask').forEach(mask => {
    const track = mask.querySelector('.rtrack');
    if (!track) return;
    [...track.children].forEach(n => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.append(c); });
    const speed = 24;
    let x = 0, paused = false, hovered = false, focused = false, last = performance.now();
    const pauseBtn = mask.parentElement.querySelector('.rpause');
    if (pauseBtn) pauseBtn.addEventListener('click', () => {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseBtn.textContent = paused ? '▶' : '❚❚';
    });
    mask.addEventListener('pointerenter', () => hovered = true);
    mask.addEventListener('pointerleave', () => hovered = false);
    mask.addEventListener('focusin', () => focused = true);
    mask.addEventListener('focusout', () => focused = false);
    const tick = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!paused && !hovered && !focused) {
        x -= speed * dt;
        const w = track.scrollWidth / 2;
        if (w && -x >= w) x += w;
      }
      track.style.transform = 'translate3d(' + x + 'px,0,0)';
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
})();

(() => {
  const P = {
    loop: 'M58 6C30 3 6 12 4 27s22 25 52 25 52-7 54-21S88 3 52 5c-9 1-16 3-21 6',
    under: 'M2 7c22-3 48-4 74-3 9 0 15 1 22-2'
  };
  const V = { loop: '0 0 112 56', under: '0 0 100 10' };
  document.querySelectorAll('.hand[data-hand]').forEach(el => {
    const k = el.dataset.hand; if (!P[k]) return;
    el.insertAdjacentHTML('beforeend', `<svg viewBox="${V[k]}" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="${P[k]}"/></svg>`);
  });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-drawn'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -15% 0px' });
  document.querySelectorAll('.hand').forEach(el => io.observe(el));
})();

