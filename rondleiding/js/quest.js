/* Missie Vellesan: kern van de rondleiding (router, opslag, kaart, stops, scanner, effecten, geluid).
   Inhoud staat in data/stops.js, mini-games in js/games-*.js (contract: GAMES.md). */
(function () {
  "use strict";
  var KEY = "vellesan-missie-v2";          // nieuwe sleutel; v1 (oude rondleiding) blijft onaangeroerd
  var D = window.RONDLEIDING || {};
  var etages = D.etages || [], stops = D.stops || [], bonus = D.bonus || [];
  var QR = !!D.qrVerplicht;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.getElementById("main");

  /* ================= opslag ================= */
  function fresh() { return { agent: null, briefed: false, found: {}, secrets: {}, opd: {}, sterren: {}, done: {}, ans: {}, kluis: false, geluid: true, laatst: null }; }
  var state = fresh();
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var p = JSON.parse(raw); if (p && typeof p === "object") for (var k in state) if (p[k] !== undefined) state[k] = p[k]; }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var photoURLs = {};

  /* ================= helpers ================= */
  function el(tag, attrs) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else if (k === "class") n.className = v;
      else if (k === "style" && typeof v === "object") { for (var s in v) n.style.setProperty(s, v[s]); }
      else if (k.indexOf("on") === 0 && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) add(n, arguments[i]);
    return n;
  }
  function add(n, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(n, x); }); return; }
    n.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function btn(label, cls, fn, aria) { return el("button", { type: "button", class: "btn " + (cls || ""), onclick: fn, "aria-label": aria || null }, label); }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  var SVG = {
    scan: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>',
    locker: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 10h6M15 14v2"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" stroke="none"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
    mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/></svg>',
    walk: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="13" cy="4" r="2"/><path d="M10 21l2-6 3 3v3M8 12l2-4 4 1 2 3 2 1M12 9l-1 6"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="none"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    film: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>'
  };
  function icon(name, cls) { return el("span", { class: "ic " + (cls || ""), html: SVG[name] }); }

  /* ================= geluid (WebAudio, geen bestanden) ================= */
  var AC = null, master = null;
  function audio() {
    if (!state.geluid) return null;
    if (!AC) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      try {
        AC = new C(); master = AC.createGain(); master.gain.value = 0.35;
        /* zachte compressor en een kleine galm: klinkt voller dan losse piepjes */
        var comp = AC.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 4;
        master.connect(comp); comp.connect(AC.destination);
        var len = Math.floor(AC.sampleRate * 1.1), ir = AC.createBuffer(2, len, AC.sampleRate);
        for (var ch = 0; ch < 2; ch++) { var dd = ir.getChannelData(ch); for (var k = 0; k < len; k++) dd[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / len, 3); }
        var rev = AC.createConvolver(), wet = AC.createGain(); rev.buffer = ir; wet.gain.value = 0.22;
        master.connect(rev); rev.connect(wet); wet.connect(comp);
      } catch (e) { return null; }
    }
    if (AC.state === "suspended") { try { AC.resume(); } catch (e) {} }
    return AC;
  }
  function tone(f, t0, dur, type, vol, slideTo) {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + (t0 || 0);
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.5, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    if (type === "square" || type === "sawtooth") { var lp = a.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2400; o.connect(lp); lp.connect(g); } else o.connect(g);
    g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  /* ruis die door een filter zwiept: een zachte "swoosh" bij het wisselen van scherm */
  function sweep(t0, dur, vol, f1, f2) {
    var a = audio(); if (!a) return;
    var len = Math.floor(a.sampleRate * dur), b = a.createBuffer(1, len, a.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var s = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter(), t = a.currentTime + (t0 || 0);
    f.type = "bandpass"; f.Q.value = 1.2; f.frequency.setValueAtTime(f1, t); f.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.45); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.buffer = b; s.connect(f); f.connect(g); g.connect(master); s.start(t);
  }
  function noise(t0, dur, vol, hp) {
    var a = audio(); if (!a) return;
    var len = Math.floor(a.sampleRate * dur), b = a.createBuffer(1, len, a.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var s = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter();
    f.type = "highpass"; f.frequency.value = hp || 1200;
    s.buffer = b; g.gain.value = vol || 0.3; s.connect(f); f.connect(g); g.connect(master);
    s.start(a.currentTime + (t0 || 0));
  }
  var lastSfx = 0;
  function sfx(name) {
    if (!state.geluid) return;
    var now = Date.now();
    if ((name === "zoomin" || name === "zoomout") && now - lastSfx < 250) return;
    lastSfx = now;
    var m = /^note:(\d+)$/.exec(name || "");
    if (m) { var f = 523.25 * Math.pow(2, +m[1] / 12); tone(f, 0, 0.5, "triangle", 0.5); tone(f * 2, 0, 0.25, "sine", 0.12); return; }
    switch (name) {
      case "tap": tone(880, 0, 0.06, "sine", 0.25); break;
      case "pop": tone(500, 0, 0.12, "sine", 0.4, 1100); break;
      case "tick": tone(1500, 0, 0.03, "square", 0.08); break;
      case "good": tone(660, 0, 0.12, "triangle", 0.4); tone(990, 0.09, 0.22, "triangle", 0.4); break;
      case "bad": tone(220, 0, 0.22, "sawtooth", 0.18, 160); break;
      case "coin": tone(988, 0, 0.08, "square", 0.15); tone(1319, 0.08, 0.3, "square", 0.15); break;
      case "whoosh": noise(0, 0.45, 0.25, 600); break;
      case "fizz": noise(0, 1.4, 0.35, 2500); break;
      case "unlock": tone(392, 0, 0.1, "square", 0.15); tone(523, 0.08, 0.1, "square", 0.15); tone(784, 0.16, 0.35, "triangle", 0.4); noise(0, 0.08, 0.3, 3000); break;
      case "win": [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.4, "triangle", 0.35); }); tone(1568, 0.45, 0.6, "sine", 0.2); break;
      case "zoomin": sweep(0, 0.38, 0.16, 400, 2600); break;
      case "zoomout": sweep(0, 0.38, 0.14, 2200, 350); break;
      case "boom": tone(110, 0, 0.6, "sine", 0.6, 40); noise(0, 0.5, 0.25, 200); break;
    }
  }
  function speak(t, lang) {
    try {
      if (!window.speechSynthesis) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(t); u.lang = lang || "nl-NL"; u.rate = 0.9;
      var vs = speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.replace("_", "-").toLowerCase().indexOf((lang || "nl").slice(0, 2).toLowerCase()) === 0; });
      if (vs.length) u.voice = vs[0];
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ================= effecten ================= */
  var COLORS = ["#f39200", "#ffb347", "#ff8d90", "#2f8f86", "#7dd3fc", "#ffffff", "#fde047"];
  function burst(target, n) {
    if (reduced) return;
    var r = target && target.getBoundingClientRect ? target.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var layer = el("div", { class: "fx-layer", "aria-hidden": "true" });
    document.body.appendChild(layer);
    n = n || 26;
    for (var i = 0; i < n; i++) {
      var p = el("i", { class: "fx-p" });
      var ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 120, sz = 5 + Math.random() * 8;
      p.style.left = cx + "px"; p.style.top = cy + "px"; p.style.width = sz + "px"; p.style.height = sz + "px";
      p.style.background = COLORS[i % COLORS.length];
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px"); p.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      p.style.animationDelay = (Math.random() * 0.08) + "s";
      layer.appendChild(p);
    }
    setTimeout(function () { layer.remove(); }, 1200);
  }
  function confetti(ms) {
    if (reduced) return;
    var c = el("canvas", { class: "fx-confetti", "aria-hidden": "true" });
    document.body.appendChild(c);
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    var x = c.getContext("2d"); x.scale(dpr, dpr);
    var ps = [];
    for (var i = 0; i < 160; i++) ps.push({ x: W / 2 + (Math.random() - 0.5) * 80, y: H * 0.35, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 4, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.4, w: 6 + Math.random() * 8, h: 4 + Math.random() * 6, c: COLORS[i % COLORS.length] });
    var t0 = performance.now(), end = ms || 3200;
    (function f(t) {
      var dt = t - t0; x.clearRect(0, 0, W, H);
      ps.forEach(function (p) { p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.globalAlpha = Math.max(0, 1 - dt / end); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); x.restore(); });
      if (dt < end) requestAnimationFrame(f); else c.remove();
    })(t0);
  }
  function toast(html, kind) {
    var t = el("div", { class: "toast " + (kind || ""), role: "status", html: html });
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("in"); });
    setTimeout(function () { t.classList.remove("in"); setTimeout(function () { t.remove(); }, 500); }, 3200);
  }

  /* beweging (iPad kantelen/schudden). iOS vraagt toestemming; moet vanuit een tik worden aangeroepen. */
  function askMotion() {
    var reqs = [];
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") reqs.push(DeviceOrientationEvent.requestPermission());
    if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") reqs.push(DeviceMotionEvent.requestPermission());
    if (!reqs.length) return Promise.resolve(true);
    return Promise.all(reqs).then(function (r) { return r.every(function (x) { return x === "granted"; }); }).catch(function () { return false; });
  }
  function motion(cb) {
    var last = 0, stopped = false;
    function onM(e) {
      var a = e.accelerationIncludingGravity || e.acceleration; if (!a) return;
      var mag = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0), now = Date.now();
      var shake = Math.abs(mag - last) > 14; last = mag;
      cb({ x: a.x || 0, y: a.y || 0, z: a.z || 0, shake: shake, t: now });
    }
    askMotion().then(function (ok) { if (ok && !stopped) window.addEventListener("devicemotion", onM); });
    return function () { stopped = true; window.removeEventListener("devicemotion", onM); };
  }

  /* ================= berekeningen ================= */
  function isOpen(s) { return !QR || !!state.found[s.id] || !!state.done[s.id]; }
  function isDone(s) { return !!state.done[s.id]; }
  function doneCount() { return stops.filter(isDone).length; }
  function nextIdx() { for (var i = 0; i < stops.length; i++) if (!isDone(stops[i])) return i; return -1; }
  function totalStars() { var n = 0; for (var k in state.sterren) n += state.sterren[k] || 0; for (var b in state.secrets) if (state.secrets[b]) n += 2; return n; }
  function maxStars() { var n = 0; stops.forEach(function (s) { n += 3 * (s.opdrachten || []).length; }); return n + bonus.length * 2; }
  /* prijs: na een aantal gespeelde spelletjes (stops en speelhal samen) */
  var hal = D.speelhal || [];
  var HAL = { id: "hal", naam: "Speelhal", opdrachten: hal, arcade: true };
  function prizeGoal() { var n = (D.prijs && D.prijs.aantal) || 8; var max = hal.length; stops.forEach(function (s) { max += (s.opdrachten || []).length; }); return Math.max(1, Math.min(n, max)); }
  function playedCount() { var n = 0; for (var k in state.opd) if (state.opd[k]) n++; return n; }
  function prizeLeft() { return Math.max(0, prizeGoal() - playedCount()); }
  function prizeWon() { return prizeLeft() === 0; }
  /* korte stemfragmenten (ElevenLabs) en AI-illustraties; staan in stops.js onder stemmen en beelden */
  var voEl = null;
  function stem(k) {
    var f = D.stemmen && D.stemmen[k]; if (!f || !state.geluid) return;
    try { if (!voEl) voEl = new Audio(); voEl.pause(); voEl.src = f; var pr = voEl.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
  }
  function stemStop() { try { if (voEl) voEl.pause(); } catch (e) {} }
  /* plaatje van een kluisspul (Firefly), anders het emoji-teken */
  function itemArt(s, cls) {
    var dir = D.itemBeelden;
    if (dir && s.item) return el("img", { class: "item-img " + (cls || ""), src: dir + s.id + ".webp", alt: "", decoding: "async" });
    return el("span", { class: cls || "", text: s.item ? s.item[0] : "★" });
  }
  function aiBeeld(k, cls) {
    var f = D.beelden && D.beelden[k]; if (!f) return null;
    return el("figure", { class: "ai-art " + (cls || "") }, el("img", { src: f, alt: "", loading: "lazy", decoding: "async" }), el("figcaption", { text: "AI-illustratie" }));
  }
  function digits() { return stops.filter(function (s) { return s.cijfer != null; }); }
  function findStop(q) {
    if (!q) return -1;
    if (/^\d+$/.test(q)) { var n = parseInt(q, 10) - 1; return n >= 0 && n < stops.length ? n : -1; }
    for (var i = 0; i < stops.length; i++) if (stops[i].id === q) return i;
    return -1;
  }
  function stopNr(i) { return pad(i + 1); }

  /* ================= achtergrond ================= */
  function ambient() {
    if (document.querySelector(".ambient")) return;
    var a = el("div", { class: "ambient", "aria-hidden": "true" }, el("i", { class: "blob b1" }), el("i", { class: "blob b2" }), el("i", { class: "blob b3" }), el("i", { class: "grain" }));
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* ================= scherm wisselen ================= */
  var cleanup = [];
  function onLeave(fn) { cleanup.push(fn); }
  function leave() { var c = cleanup; cleanup = []; c.forEach(function (f) { try { f(); } catch (e) {} }); }
  /* diepte per scherm: dieper = inzoomen, terug = uitzoomen */
  var DEPTH = { intro: 0, setup: 1, map: 2 }, lastDepth = -1;
  function show(view, cls) {
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    var key = (cls || "x").split(" ")[0], d = key in DEPTH ? DEPTH[key] : 3;
    var dir = lastDepth < 0 ? "" : d > lastDepth ? "deeper" : d < lastDepth ? "back" : "side";
    lastDepth = d;
    if (dir === "deeper" || dir === "back") sfx(dir === "deeper" ? "zoomin" : "zoomout");
    var old = root.querySelector(".view");
    var r = old && !reduced && dir ? old.getBoundingClientRect() : null;
    root.textContent = "";
    if (r && r.height) {
      old.classList.remove("in", "deeper", "back", "side"); old.classList.add("out", dir);
      old.setAttribute("aria-hidden", "true"); old.inert = true;
      old.style.top = r.top + "px"; old.style.left = r.left + "px"; old.style.width = r.width + "px";
      root.appendChild(old);
      setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 450);
    }
    var v = el("div", { class: "view " + (cls || "") + (dir ? " " + dir : "") + (key !== "intro" ? " stag" : "") });
    add(v, view);
    root.appendChild(v);
    document.body.className = "on-" + (cls || "x").split(" ")[0];
    /* bij de start-schermen: de startfilm zacht en wazig op de achtergrond */
    var sbg = document.querySelector(".setup-bg");
    if (key === "setup" && D.intro && D.intro.poster) {
      if (!sbg) { sbg = el("div", { class: "setup-bg", "aria-hidden": "true", style: { backgroundImage: "url(" + D.intro.poster + ")" } }); document.body.insertBefore(sbg, root); }
    } else if (sbg) sbg.parentNode.removeChild(sbg);
    window.scrollTo(0, 0);
    requestAnimationFrame(function () { v.classList.add("in"); });
    return v;
  }
  function hud(extra) {
    var a = state.agent || {};
    return el("header", { class: "hud" },
      el("button", { type: "button", class: "hud-agent", onclick: function () { go("#/kluisje"); }, "aria-label": "Mijn kluisje bekijken" },
        el("span", { class: "avatar", style: { "--c": a.kleur || "#f39200" }, text: a.icoon || "🦊" }),
        el("span", { class: "hud-name" }, el("small", { text: "Agent" }), el("strong", { text: a.naam || "Nieuwkomer" }))),
      extra || null,
      el("div", { class: "hud-stats" },
        el("button", { type: "button", class: "pill btnpill prize-pill" + (prizeWon() ? " won" : ""), onclick: function () { go("#/speelhal"); }, "aria-label": prizeWon() ? "Prijs vrijgespeeld. Naar de speelhal" : Math.min(playedCount(), prizeGoal()) + " van " + prizeGoal() + " spelletjes voor je prijs. Naar de speelhal" },
          el("span", { "aria-hidden": "true", text: "🎁" }), prizeWon() ? icon("check") : Math.min(playedCount(), prizeGoal()) + "/" + prizeGoal()),
        el("span", { class: "pill star", "aria-label": totalStars() + " sterren" }, icon("star"), String(totalStars())),
        el("button", { type: "button", class: "pill btnpill", "aria-label": state.geluid ? "Geluid uit" : "Geluid aan", onclick: function (e) {
          state.geluid = !state.geluid; save(); var b = e.currentTarget; b.innerHTML = ""; add(b, icon(state.geluid ? "sound" : "mute"));
          b.setAttribute("aria-label", state.geluid ? "Geluid uit" : "Geluid aan"); if (state.geluid) sfx("tap");
        } }, icon(state.geluid ? "sound" : "mute"))));
  }

  /* ================= router ================= */
  var lastFloor = null, pendingBanner = "", pendingGame = false;
  function route() {
    leave();
    var qh = /^#\/?qr=([^&]+)/i.exec(location.hash);
    if (qh) { handleScanned(decodeURIComponent(qh[1]), true); return; }
    var h = location.hash.replace(/^#\/?/, ""), m;
    try {
      if (!state.agent && !/^(stop|bonus)/.test(h)) return renderIntro();
      if ((m = /^stop[=\/](.+)$/.exec(h))) { var i = findStop(decodeURIComponent(m[1])); if (i < 0) return go("#/kaart"); return renderStop(i); }
      if (h === "kaart") return renderMap();
      if (h === "kluisje") return renderLocker();
      if (h === "finale") return renderFinale();
      if (h === "bonus") return renderBonus();
      if (h === "speelhal") return renderHall();
      if (h === "briefing") return renderBriefing();
      return renderIntro();
    } catch (e) {
      console.error(e);
      show(el("div", { class: "panel center" }, el("p", { text: "Oeps, er ging iets mis." }), btn("Naar de kaart", "", function () { go("#/kaart"); })));
    }
  }
  window.addEventListener("hashchange", route);

  /* ================= intro ================= */
  var AVATARS = ["🦊", "🐼", "🦉", "🐯", "🐙", "🦄", "🐸", "🦁", "🐧", "🐺", "🐲", "🐝"];
  var KLEUREN = ["#f39200", "#2f8f86", "#ff8d90", "#7c6cf0", "#3b82f6", "#22c55e"];
  var NAAM1 = ["Snelle", "Slimme", "Stille", "Dappere", "Vrolijke", "Gouden", "Geheime", "Supersonische", "Razende", "Sterke"];
  var NAAM2 = ["Vos", "Panda", "Uil", "Tijger", "Octopus", "Eenhoorn", "Kikker", "Leeuw", "Pinguïn", "Wolf", "Draak", "Bij"];
  function renderIntro() {
    ambient();
    var hasAgent = !!state.agent;
    var vid = null;
    if (D.intro && D.intro.clip) {
      vid = el("video", { class: "intro-bg", src: D.intro.clip, poster: D.intro.poster, muted: true, autoplay: true, loop: true, playsinline: true, "aria-hidden": "true", preload: "auto" });
      vid.muted = true; vid.setAttribute("webkit-playsinline", "");
      if (reduced) vid.removeAttribute("autoplay");
      var pp = vid.play && !reduced ? vid.play() : null; if (pp && pp.catch) pp.catch(function () {});
    }
    var letters = el("h1", { class: "intro-title", "aria-label": D.titel || "Missie Vellesan" });
    (D.titel || "Missie Vellesan").split(" ").forEach(function (w, wi) {
      var wd = el("span", { class: "w", "aria-hidden": "true" });
      w.split("").forEach(function (ch, ci) { wd.appendChild(el("span", { class: "l", style: { "--d": (wi * 6 + ci) * 0.045 + 0.3 + "s" }, text: ch })); });
      letters.appendChild(wd);
    });
    var view = show([
      vid, el("div", { class: "intro-shade", "aria-hidden": "true" }),
      el("div", { class: "intro-scan", "aria-hidden": "true" }),
      el("div", { class: "intro-wrap" },
        el("div", { class: "intro-badge" }, el("span", { class: "dot" }), "Open dag · Vellesan College"),
        letters,
        el("p", { class: "intro-lead", text: "Ontdek de school als een echte geheim agent. Speel " + prizeGoal() + " korte spelletjes en win een prijs!" }),
        el("div", { class: "intro-stats" },
          el("div", null, el("strong", { text: String(stops.length) }), el("span", { text: "plekken" })),
          el("div", null, el("strong", { text: "3" }), el("span", { text: "etages" })),
          el("div", null, el("strong", { text: String(stops.reduce(function (n, s) { return n + (s.opdrachten || []).length; }, hal.length)) }), el("span", { text: "spelletjes" }))),
        hasAgent
          ? el("div", { class: "intro-cta" }, btn(["Verder met je missie", icon("next")], "big glow", function () { sfx("whoosh"); go("#/kaart"); }),
              btn("Opnieuw beginnen", "ghost", function () { confirmReset(); }))
          : el("div", { class: "intro-cta" }, btn(["Start de missie", icon("next")], "big glow", function () { sfx("whoosh"); renderAgent(); }))
      )
    ], "intro");
    return view;
  }
  function confirmReset() {
    modal(function (close) {
      return [el("h2", { text: "Opnieuw beginnen?" }), el("p", { text: "Alles wat je hebt gevonden op deze iPad wordt gewist. Doe dit alleen als een nieuw kind gaat beginnen." }),
        el("div", { class: "g-row end" }, btn("Nee", "ghost", close), btn("Ja, wis alles", "", function () {
          state = fresh(); save(); photoURLs = {}; close(); go("#/"); route();
        }))];
    });
  }
  function renderAgent() {
    var pick = { icoon: AVATARS[Math.floor(Math.random() * AVATARS.length)], kleur: KLEUREN[0], naam: "" };
    function roll() { pick.naam = NAAM1[Math.floor(Math.random() * NAAM1.length)] + " " + NAAM2[AVATARS.indexOf(pick.icoon) % NAAM2.length]; }
    roll();
    var big = el("div", { class: "agent-big" }), nameEl = el("div", { class: "agent-name", "aria-live": "polite" });
    function paint() {
      big.textContent = pick.icoon; big.style.setProperty("--c", pick.kleur); nameEl.textContent = "Agent " + pick.naam;
      big.classList.remove("pop"); void big.offsetWidth; big.classList.add("pop");
    }
    var grid = el("div", { class: "agent-grid", role: "group", "aria-label": "Kies je dier" });
    AVATARS.forEach(function (a) {
      grid.appendChild(el("button", { type: "button", class: "agent-opt", "aria-label": "Kies " + NAAM2[AVATARS.indexOf(a)], onclick: function () { pick.icoon = a; roll(); sfx("pop"); paint(); } }, a));
    });
    var kl = el("div", { class: "agent-colors", role: "group", "aria-label": "Kies je kleur" });
    KLEUREN.forEach(function (c, i) {
      kl.appendChild(el("button", { type: "button", class: "swatch", style: { "--c": c }, "aria-label": "Kleur " + (i + 1), onclick: function () { pick.kleur = c; sfx("tap"); paint(); } }));
    });
    show(el("div", { class: "agent panel glass" },
      el("p", { class: "eyebrow", text: "Stap 1 van 2" }),
      el("h2", { text: "Wie ben jij, agent?" }),
      el("div", { class: "agent-card" }, big, nameEl,
        btn("🎲 Andere naam", "ghost small", function () { roll(); sfx("tap"); paint(); })),
      grid, kl,
      el("p", { class: "fine", text: "Je echte naam hebben we niet nodig. Alles blijft op deze iPad." }),
      btn(["Dit ben ik!", icon("next")], "big glow block", function () {
        state.agent = { icoon: pick.icoon, kleur: pick.kleur, naam: pick.naam }; save(); sfx("unlock"); burst(big, 30); setTimeout(function () { go("#/briefing"); }, reduced ? 0 : 450);
      })), "setup");
    paint();
  }
  function renderBriefing() {
    var steps = [
      { ic: "film", t: "Kijk en loop", p: "Bij elke plek zie je een filmpje. Zo weet je waar je heen moet." },
      { ic: "scan", t: "Scan de poster", p: "Op elke plek hangt een poster met een QR-code. Scan hem en je missie gaat open." },
      { ic: "locker", t: "Speel en verzamel", p: "Bij elke plek speel je een kort spelletje. Je wint iets voor je kluisje." },
      { ic: "lock", t: "Win de prijs", p: "Je hoeft niet alles te doen. Speel " + prizeGoal() + " spelletjes, waar je maar wilt. Dan mag je de grote kluis kraken en win je een prijs!" }
    ];
    var i = 0, box = el("div", { class: "brief-card", "aria-live": "polite" }), dots = el("div", { class: "dots", "aria-hidden": "true" });
    steps.forEach(function () { dots.appendChild(el("i")); });
    var nextB = btn("Volgende", "big glow block", function () { if (i === 0) stem("welkom"); if (i < steps.length - 1) { i++; sfx("whoosh"); paint(); } else { state.briefed = true; save(); sfx("unlock"); go("#/kaart"); } });
    function paint() {
      var s = steps[i]; box.textContent = "";
      box.appendChild(el("div", { class: "brief-in" }, el("div", { class: "brief-ic" }, icon(s.ic)), el("p", { class: "eyebrow", text: "Missie-uitleg " + (i + 1) + "/" + steps.length }), el("h2", { text: s.t }), el("p", { class: "lead", text: s.p })));
      Array.prototype.forEach.call(dots.children, function (d, k) { d.className = k === i ? "on" : ""; });
      nextB.textContent = i < steps.length - 1 ? "Volgende" : "Naar de kaart!";
    }
    show(el("div", { class: "brief panel glass" }, aiBeeld("briefing", "brief-art"), box, dots, nextB), "setup");
    onLeave(stemStop);
    paint();
  }

  /* ================= kaart (3D) ================= */
  function renderMap() {
    ambient();
    var ni = nextIdx();
    var cur = lastFloor != null ? lastFloor : (ni >= 0 ? stops[ni].etage : 0);
    /* de plattegrond als echt 3D-model (js/map3d.js); zonder dat bestand de oude gestapelde kaart */
    var m3 = null, stage, tabBtns, mode = "stack", floors = [];
    var tabs = el("div", { class: "floor-tabs", role: "tablist", "aria-label": "Etages" });
    function pinInfo(s, si) {
      var st = isDone(s) ? "done" : si === ni ? "next" : isOpen(s) ? "open" : "todo";
      return { cls: st, dot: isDone(s) ? "✓" : String(si + 1), label: s.naam, aria: "Stop " + (si + 1) + ": " + s.naam + (isDone(s) ? ", klaar" : "") };
    }
    if (window.Map3D && etages.every(function (e) { return e.plan && e.p3; })) {
      m3 = window.Map3D({ el: el, etages: etages, reduced: reduced, sfx: sfx,
        onFocus: function (fi) { cur = fi; paintTabs(); },
        pins: stops.map(function (s, si) {
          var t = etages[s.etage].p3, inf = pinInfo(s, si);
          inf.fi = s.etage; inf.x = t[0] * s.x + t[1] * s.y + t[2]; inf.y = t[3] * s.x + t[4] * s.y + t[5];
          inf.onPick = function () { sfx("tap"); go("#/stop/" + (si + 1)); };
          return inf;
        }) });
      stage = m3.el; onLeave(m3.destroy); cur = null;
      tabBtns = [btn("Alles", "tab", function () { cur = null; m3.focus(null); paintTabs(); sfx("whoosh"); }, "Alle etages")];
      etages.forEach(function (e, fi) { tabBtns.push(btn(e.naam, "tab", function () { cur = fi; lastFloor = fi; m3.focus(fi); paintTabs(); sfx("whoosh"); })); });
    } else {
      stage = el("div", { class: "map-stage" }); var world = el("div", { class: "map-world" }); stage.appendChild(world);
      etages.forEach(function (e, fi) {
        var f = el("div", { class: "floor", style: { "--i": fi, "--ar": (e.h / e.w) } });
        f.appendChild(el("img", { src: e.kaart, alt: "", draggable: "false" }));
        f.appendChild(el("span", { class: "floor-tag", text: e.naam }));
        stops.forEach(function (s, si) {
          if (s.etage !== fi) return;
          var inf = pinInfo(s, si);
          f.appendChild(el("button", { type: "button", class: "pin " + inf.cls, style: { left: s.x + "%", top: s.y + "%" }, "aria-label": inf.aria,
            onclick: function (ev) { ev.stopPropagation(); if (mode === "stack") { setFloor(fi); return; } sfx("tap"); go("#/stop/" + (si + 1)); } },
            el("span", { class: "pin-dot", text: inf.dot }), el("span", { class: "pin-label", text: inf.label })));
        });
        f.addEventListener("click", function () { if (mode === "stack") setFloor(fi); });
        floors.push(f); world.appendChild(f);
      });
      tabBtns = [btn("3D", "tab", function () { setStack(); }, "Alle etages in 3D")];
      etages.forEach(function (e, fi) { tabBtns.push(btn(e.naam, "tab", function () { setFloor(fi); })); });
    }
    tabBtns.forEach(function (b) { b.setAttribute("role", "tab"); tabs.appendChild(b); });
    function paintTabs() { tabBtns.forEach(function (b, k) { var on = m3 ? (k === 0 ? cur == null : k - 1 === cur) : ((k === 0 && mode === "stack") || (mode === "flat" && k - 1 === cur)); b.classList.toggle("on", on); b.setAttribute("aria-selected", on ? "true" : "false"); }); }
    function setStack() { mode = "stack"; stage.className = "map-stage stack"; floors.forEach(function (f) { f.classList.remove("active", "away"); }); paintTabs(); sfx("whoosh"); }
    function setFloor(fi) {
      cur = fi; lastFloor = fi; mode = "flat"; stage.className = "map-stage flat";
      floors.forEach(function (f, k) { f.classList.toggle("active", k === fi); f.classList.toggle("away", k !== fi); f.style.setProperty("--rel", k - fi); });
      paintTabs(); sfx("whoosh");
    }
    // volgende missie
    var next = null;
    if (ni >= 0) {
      var s = stops[ni];
      next = el("div", { class: "next-card glass" },
        el("div", { class: "next-thumb", style: { "background-image": "url(" + s.poster + ")" } }, el("span", { text: stopNr(ni) })),
        el("div", { class: "next-txt" }, el("p", { class: "eyebrow", text: "Volgende missie · " + etages[s.etage].naam }), el("h3", { text: s.naam }), el("p", { class: "muted", text: s.loop })),
        el("div", { class: "next-btns" },
          btn(["Ga", icon("next")], "glow", function () { sfx("tap"); go("#/stop/" + (ni + 1)); }, "Ga naar stop " + (ni + 1)),
          btn([icon("scan"), "Radar"], "ghost", function () { openScanner(); }, "Radar aan: zoek een QR-poster")));
    } else {
      next = el("div", { class: "next-card glass done" }, el("div", { class: "next-txt" }, el("p", { class: "eyebrow", text: "Alle missies klaar" }), el("h3", { text: "Tijd voor de grote kluis!" })),
        btn(["Kraak de kluis", icon("next")], "glow", function () { go("#/finale"); }));
    }
    var prog = doneCount() / stops.length;
    show([
      hud(),
      el("div", { class: "map-head" },
        el("div", null, el("p", { class: "eyebrow", text: "Plattegrond" }), el("h1", { class: "h-display", text: "Vellesan, Briniostraat" })),
        el("div", { class: "ring", style: { "--p": prog }, role: "img", "aria-label": Math.round(prog * 100) + " procent klaar" }, el("span", { text: Math.round(prog * 100) + "%" }))),
      tabs, stage,
      el("p", { class: "fine center", text: m3 ? "Draai de school met je vinger. Tik op een bolletje voor de plek." : "Tik op een etage om in te zoomen. Tik op een bolletje voor de plek." }),
      next, prizeBar(),
      el("div", { class: "map-actions" },
        btn([icon("locker"), "Mijn kluisje"], "ghost", function () { go("#/kluisje"); }),
        btn([icon("star"), "Geheime filmpjes"], "ghost", function () { go("#/bonus"); })),
      ni >= 0 ? null : scanFab()
    ], "map");
    if (m3) { paintTabs(); return; }
    if (lastFloor != null) setFloor(cur); else setStack();
    // licht meebewegen met kantelen of muis (parallax)
    function tilt(x, y) { stage.style.setProperty("--tx", x.toFixed(3)); stage.style.setProperty("--ty", y.toFixed(3)); }
    if (!reduced) {
      var mm = function (e) { var r = stage.getBoundingClientRect(); tilt((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5); };
      stage.addEventListener("pointermove", mm);
      var ori = function (e) { if (e.gamma == null) return; tilt(Math.max(-1, Math.min(1, e.gamma / 30)) / 2, Math.max(-1, Math.min(1, (e.beta - 45) / 30)) / 2); };
      window.addEventListener("deviceorientation", ori);
      onLeave(function () { window.removeEventListener("deviceorientation", ori); });
    }
  }
  function scanFab() {
    return el("button", { type: "button", class: "scan-fab", onclick: function () { openScanner(); }, "aria-label": "Radar aan: zoek een QR-poster" }, el("span", { class: "scan-fab-ring", "aria-hidden": "true" }), icon("scan"), el("span", { text: "Radar" }));
  }

  /* ================= stop ================= */
  function renderStop(idx) {
    ambient();
    var s = stops[idx], open = isOpen(s);
    var banner = pendingBanner; pendingBanner = "";
    // film
    var media = el("div", { class: "cine" + (s.clip ? "" : " noclip") });
    media.appendChild(el("div", { class: "cine-blur", style: { "background-image": "url(" + s.poster + ")" }, "aria-hidden": "true" }));
    var vid = null, vo = null, playing = false;
    var frame = el("div", { class: "cine-frame" });
    media.appendChild(frame);
    if (s.clip) {
      vid = el("video", { src: s.clip, poster: s.poster, playsinline: true, preload: "metadata", "aria-label": "Filmpje: " + s.naam });
      vid.setAttribute("webkit-playsinline", "");
      frame.appendChild(vid);
      var cap = el("div", { class: "cine-cap", "aria-live": "off" }), lines = [], total = 0;
      if (D.voiceover) {
        vo = new Audio(); vo.preload = "auto"; vo.src = D.voiceover + s.id + ".mp3";
        vo.addEventListener("error", function () { vo = null; cap.textContent = ""; if (!vid.paused) vid.muted = false; });
        // ondertitels: zinnen uit voiceover/<id>.txt, verdeeld naar lengte over de duur van de stem
        if (window.fetch) fetch(D.voiceover + s.id + ".txt").then(function (r) { return r.ok ? r.text() : ""; }).then(function (t) {
          lines = (t || "").replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/).filter(Boolean);
          total = lines.reduce(function (n, l) { return n + l.length + 8; }, 0);
        }).catch(function () {});
        vo.addEventListener("timeupdate", function () {
          if (!lines.length || !vo.duration) return;
          var pos = vo.currentTime / vo.duration * total, acc = 0, cur = "";
          for (var i = 0; i < lines.length; i++) { acc += lines[i].length + 8; if (pos <= acc) { cur = lines[i]; break; } }
          if (cap.textContent !== cur) { cap.textContent = ""; if (cur) cap.appendChild(el("span", { text: cur })); cap.classList.remove("in"); void cap.offsetWidth; if (cur) cap.classList.add("in"); }
        });
        vo.addEventListener("ended", function () { cap.textContent = ""; });
      }
      var bigPlay = el("button", { type: "button", class: "cine-play", "aria-label": "Speel het filmpje af" }, icon("play"));
      var bar = el("div", { class: "cine-bar", "aria-hidden": "true" }, el("i"));
      frame.appendChild(cap); frame.appendChild(bigPlay); frame.appendChild(bar);
      var toggle = function () {
        if (vid.paused) {
          if (vid.ended || (vid.duration && vid.currentTime >= vid.duration - 0.2)) { vid.currentTime = 0; if (vo) try { vo.currentTime = 0; } catch (e) {} }
          if (vo) {
            vid.muted = true;
            try { if (vid.currentTime < 0.3) vo.currentTime = 0; } catch (e) {}
            if (!vo.duration || vo.currentTime < vo.duration - 0.1) { var pa = vo.play(); if (pa && pa.catch) pa.catch(function () {}); }
          } else vid.muted = false;
          var pv = vid.play(); if (pv && pv.catch) pv.catch(function () {});
        } else { vid.pause(); if (vo) vo.pause(); }
      };
      bigPlay.addEventListener("click", toggle);
      vid.addEventListener("click", toggle);
      vid.addEventListener("play", function () { media.classList.add("playing"); media.classList.remove("ended"); playing = true; bigPlay.setAttribute("aria-label", "Pauzeer het filmpje"); });
      vid.addEventListener("pause", function () { media.classList.remove("playing"); playing = false; bigPlay.setAttribute("aria-label", "Speel het filmpje af"); });
      vid.addEventListener("ended", function () { media.classList.remove("playing"); media.classList.add("ended"); if (vo) vo.pause(); cap.textContent = ""; });
      vid.addEventListener("timeupdate", function () { if (vid.duration) bar.firstChild.style.transform = "scaleX(" + (vid.currentTime / vid.duration) + ")"; });
      onLeave(function () { try { vid.pause(); vid.removeAttribute("src"); vid.load(); } catch (e) {} if (vo) { vo.pause(); vo.src = ""; } });
    } else {
      frame.appendChild(el("img", { src: s.poster, alt: "", class: "cine-still" }));
      frame.appendChild(el("div", { class: "cine-soon" }, icon("film"), el("strong", { text: "Film volgt" }), el("span", { text: "Meneer Boersen filmt deze plek binnenkort." })));
    }
    frame.appendChild(el("div", { class: "cine-title", "aria-hidden": "true" },
      el("span", { class: "cine-nr", text: "STOP " + stopNr(idx) }), el("strong", { text: s.naam }), el("span", { class: "cine-sub", text: s.sub || etages[s.etage].naam })));
    // rondkijken
    var lookBtn = btn([icon("eye"), "Kijk rond"], "ghost small", function () { lookAround(s, vid); });
    // opdrachten
    var ops = s.opdrachten || [];
    var mission = el("section", { class: "missions", "aria-labelledby": "mtitle" });
    function paintMissions() {
      mission.textContent = "";
      mission.appendChild(el("div", { class: "sec-head" }, el("h2", { id: "mtitle", text: "Missies" }),
        el("span", { class: "pill", text: ops.filter(function (o, i) { return state.opd[s.id + ":" + i]; }).length + "/" + ops.length })));
      if (!isOpen(s)) {
        mission.appendChild(el("div", { class: "locked glass" },
          el("div", { class: "lock-ic" }, icon("lock")),
          el("h3", { text: "Missies op slot" }),
          el("p", { text: "Loop naar deze plek en scan de QR-poster die daar hangt." }),
          btn([icon("scan"), "Scan de QR-code"], "big glow block", function () { openScanner(); }),
          btn("Of typ de code van de poster", "ghost small", function () { typeCode(); })));
        return;
      }
      var list = el("div", { class: "mlist" });
      ops.forEach(function (o, i) {
        var key = s.id + ":" + i, ok = !!state.opd[key], g = Quest.games[o.type] || {};
        var st = state.sterren[key] || 0;
        list.appendChild(el("button", { type: "button", class: "mcard glass" + (ok ? " ok" : ""), style: { "--d": i * 0.08 + "s" }, onclick: function () { openGame(s, idx, i); } },
          el("span", { class: "mcard-ic", "aria-hidden": "true", text: g.icoon || "★" }),
          el("span", { class: "mcard-txt" }, el("strong", { text: g.titel || "Opdracht" }), el("span", { text: o.vraag })),
          el("span", { class: "mcard-stars", "aria-label": ok ? st + " sterren" : "nog niet gedaan" }, [0, 1, 2].map(function (k) { return el("i", { class: k < st ? "on" : "", html: SVG.star }); }))));
      });
      mission.appendChild(list);
      if (isDone(s)) {
        mission.appendChild(el("div", { class: "reward-mini glass" }, el("span", { class: "rm-ic", text: s.item ? s.item[0] : "★" }),
          el("span", null, el("strong", { text: "Stop voltooid" }), el("span", { text: s.item ? s.item[1] + " ligt in je kluisje." : "" }))));
      }
    }
    paintMissions();
    var prev = idx > 0 ? btn(icon("back"), "ghost round", function () { go("#/stop/" + idx); }, "Vorige stop") : el("span");
    var nextB = idx < stops.length - 1 ? btn(icon("next"), "ghost round", function () { go("#/stop/" + (idx + 2)); }, "Volgende stop") : el("span");
    show([
      el("div", { class: "stop-top" },
        btn([icon("map"), "Kaart"], "ghost small", function () { go("#/kaart"); }),
        el("div", { class: "stop-step", text: "Stop " + (idx + 1) + " van " + stops.length }),
        scanMini()),
      banner ? el("div", { class: "banner", role: "status" }, el("span", { text: "🎉" }), banner) : null,
      el("div", { class: "stop-grid" },
        media,
        el("div", { class: "stop-info" },
          el("p", { class: "eyebrow", text: etages[s.etage].naam + (s.sub ? " · " + s.sub : "") }),
          el("h1", { class: "h-display", text: s.naam }),
          el("p", { class: "lead", text: s.uitleg }),
          el("div", { class: "route glass" }, icon("walk"), el("div", null, el("strong", { text: "Zo loop je hierheen" }), el("p", { text: s.loop }))),
          el("div", { class: "g-row" }, s.clip ? lookBtn : null),
          mission,
          el("nav", { class: "stop-nav", "aria-label": "Stops" }, prev, btn([el("span", { "aria-hidden": "true", text: "🕹️" }), "Speelhal"], "ghost", function () { go("#/speelhal"); }), nextB)))
    ], "stop");
    if (banner) { sfx("unlock"); setTimeout(function () { burst(document.querySelector(".banner"), 40); }, 150); }
    // na het scannen meteen het spelletje starten
    if (pendingGame) {
      pendingGame = false;
      var first = -1; ops.forEach(function (o, k) { if (first < 0 && !state.opd[s.id + ":" + k]) first = k; });
      if (first >= 0) setTimeout(function () { if (location.hash === "#/stop/" + (idx + 1)) openGame(s, idx, first); }, reduced ? 300 : 1600);
    }
    renderStop.repaint = paintMissions;
  }
  function scanMini() { return btn([icon("scan"), "Scan"], "ghost small", function () { openScanner(); }, "Scan een QR-code"); }

  /* Kijk rond: film schermvullend, beweegt mee als je de iPad draait (of sleept). */
  function lookAround(s, vid) {
    var src = vid ? vid.currentSrc || s.clip : null;
    var v = el("video", { src: src, muted: true, playsinline: true, loop: true, autoplay: true, class: "vr-media", "aria-hidden": "true" });
    v.muted = true; v.setAttribute("webkit-playsinline", "");
    if (vid) { try { v.currentTime = vid.currentTime; } catch (e) {} vid.pause(); }
    var layer = el("div", { class: "vr-layer" }, v);
    var hint = el("p", { class: "vr-hint", text: "Draai rustig met de iPad om rond te kijken. Of sleep met je vinger." });
    var ov = el("div", { class: "vr", role: "dialog", "aria-modal": "true", "aria-label": "Kijk rond: " + s.naam },
      layer, el("div", { class: "vr-vignette", "aria-hidden": "true" }),
      el("div", { class: "vr-hud" }, el("span", { class: "rec" }, el("i"), "LIVE · " + s.naam), btn(icon("close"), "ghost round", function () { close(); }, "Sluiten")),
      el("div", { class: "vr-cross", "aria-hidden": "true" }), hint);
    document.body.appendChild(ov);
    var p = v.play(); if (p && p.catch) p.catch(function () {});
    var tx = 0, ty = 0, gx = 0, gy = 0, raf = 0, base = null;
    function frameF() { tx += (gx - tx) * 0.12; ty += (gy - ty) * 0.12; layer.style.transform = "translate3d(" + (-tx * 22) + "%," + (-ty * 14) + "%,0) scale(1.7)"; raf = requestAnimationFrame(frameF); }
    raf = requestAnimationFrame(frameF);
    function ori(e) {
      if (e.gamma == null) return;
      if (!base) base = { a: e.alpha || 0, b: e.beta };
      var da = ((e.alpha || 0) - base.a + 540) % 360 - 180;
      gx = Math.max(-1, Math.min(1, -da / 35)); gy = Math.max(-1, Math.min(1, (e.beta - base.b) / 30));
    }
    askMotion().then(function (ok) { if (ok) window.addEventListener("deviceorientation", ori); });
    var drag = null;
    ov.addEventListener("pointerdown", function (e) { if (e.target.closest("button")) return; drag = { x: e.clientX, y: e.clientY, gx: gx, gy: gy }; });
    ov.addEventListener("pointermove", function (e) { if (!drag) return; gx = Math.max(-1, Math.min(1, drag.gx - (e.clientX - drag.x) / 250)); gy = Math.max(-1, Math.min(1, drag.gy - (e.clientY - drag.y) / 250)); });
    window.addEventListener("pointerup", up);
    function up() { drag = null; }
    function key(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", key);
    setTimeout(function () { hint.classList.add("gone"); }, 4000);
    sfx("whoosh");
    function close() {
      cancelAnimationFrame(raf); window.removeEventListener("deviceorientation", ori); window.removeEventListener("pointerup", up); document.removeEventListener("keydown", key);
      try { v.pause(); v.removeAttribute("src"); v.load(); } catch (e) {} ov.remove();
    }
    onLeave(close);
    ov.querySelector(".vr-hud button").focus();
  }

  /* ================= prijs + speelhal ================= */
  function prizeBar(noBtn) {
    var goal = prizeGoal(), got = Math.min(playedCount(), goal), won = got >= goal;
    return el("div", { class: "prize-bar glass" + (won ? " won" : "") },
      el("span", { class: "prize-ic", "aria-hidden": "true", text: won ? "🏆" : "🎁" }),
      el("div", { class: "prize-txt" },
        el("strong", { text: won ? "Prijs vrijgespeeld!" : "Nog " + (goal - got) + (goal - got === 1 ? " spelletje" : " spelletjes") + " tot je prijs" }),
        el("div", { class: "prize-track", role: "img", "aria-label": got + " van " + goal + " spelletjes gespeeld" }, el("i", { style: { transform: "scaleX(" + (got / goal) + ")" } })),
        el("small", { class: "muted", text: won ? "Kraak nu de grote kluis. Spelen mag altijd nog." : got + " van " + goal + " gespeeld. Bij een stop of in de speelhal." })),
      won ? btn(["Kluis", icon("next")], "glow", function () { go("#/finale"); }, "Naar de grote kluis") : noBtn ? null : btn(["Speelhal"], "ghost", function () { go("#/speelhal"); }, "Naar de speelhal"));
  }
  function renderHall() {
    ambient();
    var grid = el("div", { class: "hall-grid" });
    function paint() {
      grid.textContent = "";
      hal.forEach(function (o, k) {
        var g = Quest.games[o.type] || {}, key = HAL.id + ":" + k, done = !!state.opd[key], st = state.sterren[key] || 0;
        grid.appendChild(el("button", { type: "button", class: "hall-card glass" + (done ? " done" : ""), style: { "--d": (k * 0.06) + "s" }, onclick: function () { sfx("tap"); openGame(HAL, -1, k); },
            "aria-label": (o.titel || g.titel || "Spel") + (done ? ", gespeeld, " + st + " sterren" : "") },
          el("span", { class: "hall-ic", "aria-hidden": "true", text: o.icoon || g.icoon || "★" }),
          el("strong", { text: o.titel || g.titel || "Spel" }),
          el("span", { class: "hall-stars", "aria-hidden": "true" }, [0, 1, 2].map(function (n) { return el("i", { class: n < st ? "on" : "", html: SVG.star }); }))));
      });
    }
    paint();
    var barBox = el("div", null, prizeBar(true));
    renderHall.repaint = function () { paint(); barBox.textContent = ""; barBox.appendChild(prizeBar(true)); };
    onLeave(function () { renderHall.repaint = null; });
    show([hud(),
      el("div", { class: "locker-head" }, el("p", { class: "eyebrow", text: "Overal te spelen" }), el("h1", { class: "h-display", text: "Speelhal" }),
        el("p", { class: "lead", text: "Korte spelletjes over de school. Elk spelletje telt mee voor je prijs." })),
      aiBeeld("speelhal", "hall-art"), barBox, grid,
      el("div", { class: "g-row center" }, btn([icon("map"), "Naar de kaart"], "glow", function () { go("#/kaart"); })), scanFab()], "hall");
  }

  /* ================= modal + game ================= */
  function modal(build, cls) {
    var prevFocus = document.activeElement;
    var box = el("div", { class: "modal-box glass " + (cls || ""), role: "dialog", "aria-modal": "true" });
    var ov = el("div", { class: "modal" }, box);
    function close() { ov.classList.remove("in"); document.removeEventListener("keydown", key); setTimeout(function () { ov.remove(); }, reduced ? 0 : 250); if (prevFocus && prevFocus.focus) try { prevFocus.focus(); } catch (e) {} if (box._cleanup) try { box._cleanup(); } catch (e) {} }
    function key(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", key);
    add(box, build(close, box));
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add("in"); });
    var f = box.querySelector("button, input, [tabindex]"); if (f) f.focus();
    onLeave(close);
    return close;
  }
  function openGame(s, idx, i) {
    var o = s.opdrachten[i], g = Quest.games[o.type];
    var key = s.id + ":" + i;
    modal(function (close, box) {
      var host = el("div", { class: "g g-" + o.type });
      var finished = false, alreadyDone = !!state.opd[key];
      var reward = el("div", { class: "g-reward", "aria-live": "polite" });
      var api = {
        el: el, shuffle: shuffle, sfx: sfx, burst: burst, reduced: reduced, speak: speak, motion: motion,
        done: function (n) {
          if (finished) return; finished = true; if (skip) skip.remove();
          var wasWon = prizeWon();
          n = Math.max(1, Math.min(3, Math.round(n || 1)));
          state.opd[key] = true; state.sterren[key] = Math.max(state.sterren[key] || 0, n);
          var allOps = (s.opdrachten || []).every(function (oo, k) { return state.opd[s.id + ":" + k]; });
          var stopNew = allOps && !state.done[s.id] && !s.arcade;
          if (allOps) state.done[s.id] = true;
          save();
          sfx("win"); confetti(1800);
          if (!wasWon && prizeWon()) setTimeout(function () { sfx("unlock"); toast("🏆 <strong>Prijs vrijgespeeld!</strong> Je mag nu de grote kluis kraken."); stem("prijs"); }, reduced ? 0 : 900);
          reward.textContent = "";
          var starsEl = el("div", { class: "rw-stars" }, [0, 1, 2].map(function (k) { return el("i", { class: k < n ? "on" : "", style: { "--d": (0.15 + k * 0.18) + "s" }, html: SVG.star }); }));
          reward.appendChild(el("div", { class: "rw glass" }, starsEl,
            el("strong", { text: n === 3 ? "Perfect, agent!" : n === 2 ? "Goed gedaan!" : "Gelukt!" }),
            el("p", { class: "rw-prize" + (prizeWon() ? " won" : "") }, el("span", { "aria-hidden": "true", text: prizeWon() ? "🏆 " : "🎁 " }),
              prizeWon() ? (wasWon ? "Je prijs heb je al. Spelen mag altijd!" : "Prijs vrijgespeeld! De grote kluis mag open.") : Math.min(playedCount(), prizeGoal()) + " van " + prizeGoal() + " spelletjes. Nog " + prizeLeft() + " tot je prijs!"),
            el("div", { class: "g-row center" }, btn(stopNew ? "Bekijk je beloning" : "Verder", "glow", function () { close(); var h0 = document.querySelector(".view .hud"); if (h0) h0.replaceWith(hud()); if (s.arcade) { if (renderHall.repaint) renderHall.repaint(); } else if (renderStop.repaint) renderStop.repaint(); if (stopNew) setTimeout(function () { stopReward(s, idx); }, reduced ? 0 : 280); }))));
          reward.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
          var b = reward.querySelector("button"); if (b) b.focus();
        }
      };
      var head = el("div", { class: "g-head" },
        el("span", { class: "g-ic", "aria-hidden": "true", text: o.icoon || (g && g.icoon) || "★" }),
        el("div", null, el("p", { class: "eyebrow", text: (s.arcade ? "" : "Missie · ") + s.naam }), el("h2", { text: o.titel || (g && g.titel) || "Opdracht" })),
        btn(icon("close"), "ghost round", close, "Sluiten"));
      var q = el("p", { class: "g-q", text: o.vraag });
      if (alreadyDone) q.appendChild(el("span", { class: "g-again", text: " Je hebt deze al gedaan. Nog een keer mag!" }));
      if (!g) host.appendChild(el("p", { text: "Deze opdracht kan nu niet worden geladen." }));
      else try { box._cleanup = g.render(host, o, api); } catch (e) { console.error(e); host.appendChild(el("p", { text: "Oeps, deze opdracht doet het even niet." })); host.appendChild(btn("Sla over", "", function () { api.done(1); })); }
      var skip = el("div", { class: "g-skip" }, el("button", { type: "button", class: "linkbtn", onclick: close }, "Overslaan, ik ga verder"));
      return [head, q, host, reward, skip];
    }, "game");
  }
  function stopReward(s, idx) {
    sfx("unlock");
    modal(function (close) {
      var item = el("div", { class: "reward-item" }, el("div", { class: "ri-glow", "aria-hidden": "true" }), itemArt(s, "ri-emoji"));
      setTimeout(function () { burst(item, 50); confetti(2600); }, reduced ? 0 : 350);
      var out = [el("p", { class: "eyebrow center", text: "Stop " + (idx + 1) + " voltooid" }), item,
        el("h2", { class: "center", text: s.item ? s.item[1] : "Beloning" }),
        el("p", { class: "center", text: "Dit gaat in je kluisje." }), D.itemBeelden ? el("p", { class: "ai-note", text: "AI-illustratie" }) : null];
      if (s.cijfer != null) out.push(el("div", { class: "digit-found" }, el("span", { text: "Geheim cijfer gevonden" }), el("strong", { text: String(s.cijfer) }), el("small", { text: "Onthoud hem voor de grote kluis!" })));
      var ni = nextIdx();
      out.push(el("div", { class: "g-row center" },
        btn("Mijn kluisje", "ghost", function () { close(); go("#/kluisje"); }),
        ni >= 0 ? btn(["Volgende stop", icon("next")], "glow", function () { close(); go("#/stop/" + (ni + 1)); }) : btn(["Naar de grote kluis", icon("next")], "glow", function () { close(); go("#/finale"); })));
      return out;
    }, "reward");
  }

  /* ================= kluisje ================= */
  function renderLocker() {
    ambient();
    var got = stops.filter(isDone).length;
    var grid = el("div", { class: "locker-grid" });
    stops.forEach(function (s, i) {
      var have = isDone(s);
      grid.appendChild(el("button", { type: "button", class: "slot" + (have ? " have" : ""), style: { "--d": (i * 0.03) + "s" }, onclick: function () { go("#/stop/" + (i + 1)); }, "aria-label": have ? s.item[1] + ", van " + s.naam : "Nog leeg: " + s.naam },
        have ? itemArt(s, "slot-ic") : el("span", { class: "slot-ic", text: "?" }), el("span", { class: "slot-t", text: have ? s.item[1] : s.naam })));
    });
    var code = el("div", { class: "code-row", role: "img", "aria-label": "Geheime cijfers" });
    digits().forEach(function (s) { code.appendChild(el("span", { class: "code-d" + (isDone(s) ? " on" : ""), text: isDone(s) ? String(s.cijfer) : "?" })); });
    show([hud(),
      el("div", { class: "locker-head" }, el("p", { class: "eyebrow", text: "Agent " + ((state.agent && state.agent.naam) || "") }), el("h1", { class: "h-display", text: "Mijn kluisje" }),
        el("p", { class: "lead", text: got + " van " + stops.length + " spullen verzameld." })),
      el("div", { class: "locker-door glass" }, grid),
      D.itemBeelden ? el("p", { class: "ai-note", text: "De plaatjes van de spullen zijn AI-illustraties." }) : null,
      el("section", { class: "panel glass" }, el("h2", { text: "Geheime cijfers" }), el("p", { class: "muted", text: "Bij vier stops vind je een cijfer. Samen openen ze de grote kluis." }), code),
      el("div", { class: "g-row center" }, btn([icon("map"), "Naar de kaart"], "glow", function () { go("#/kaart"); }), btn([icon("lock"), "De grote kluis"], "ghost", function () { go("#/finale"); }))
    ], "locker");
  }

  /* ================= finale ================= */
  function renderFinale() {
    ambient();
    if (!prizeWon() && !state.kluis) {
      var left = prizeLeft();
      show([hud(),
        el("div", { class: "center finale-head" }, el("p", { class: "eyebrow", text: "De laatste missie" }), el("h1", { class: "h-display", text: "De grote kluis zit nog op slot" }),
          el("p", { class: "lead", text: "Speel nog " + left + (left === 1 ? " spelletje" : " spelletjes") + ". Dan mag je de kluis kraken en win je een prijs." })),
        aiBeeld("kluis", "vault-art") || el("div", { class: "vault locked-vault", "aria-hidden": "true" }, el("div", { class: "vault-door" }, el("div", { class: "vault-handle" }), el("div", { class: "vault-bolts" }))),
        prizeBar(true),
        el("div", { class: "g-row center" }, btn([el("span", { "aria-hidden": "true", text: "🕹️" }), "Naar de speelhal"], "glow", function () { go("#/speelhal"); }), btn([icon("map"), "Naar de kaart"], "ghost", function () { go("#/kaart"); }))
      ], "finale");
      return;
    }
    var target = String((D.kluis && D.kluis.code) || "1926");
    var vals = target.split("").map(function () { return 0; });
    var wheels = el("div", { class: "vault-wheels" }), tries = 0;
    var msg = el("p", { class: "g-msg", "aria-live": "polite" });
    vals.forEach(function (v, k) {
      var num = el("span", { class: "wheel-n", text: "0" });
      var w = el("div", { class: "wheel" },
        btn("▲", "ghost round small", function () { vals[k] = (vals[k] + 1) % 10; num.textContent = vals[k]; sfx("tick"); }, "Cijfer " + (k + 1) + " omhoog"),
        num,
        btn("▼", "ghost round small", function () { vals[k] = (vals[k] + 9) % 10; num.textContent = vals[k]; sfx("tick"); }, "Cijfer " + (k + 1) + " omlaag"));
      wheels.appendChild(w);
    });
    var known = digits().map(function (s) { return isDone(s) ? String(s.cijfer) : "?"; }).join(" ");
    var door = el("div", { class: "vault" }, el("div", { class: "vault-door" }, el("div", { class: "vault-handle", "aria-hidden": "true" }), el("div", { class: "vault-bolts", "aria-hidden": "true" })), el("div", { class: "vault-inside", "aria-hidden": "true" }, el("span", { text: "🏆" })));
    show([hud(),
      el("div", { class: "center finale-head" }, el("p", { class: "eyebrow", text: "De laatste missie" }), el("h1", { class: "h-display", text: "Kraak de grote kluis" }),
        el("p", { class: "lead", text: "Zet de vier geheime cijfers in de goede volgorde." })),
      door,
      el("div", { class: "panel glass vault-panel" },
        el("p", { class: "muted center", text: "Jouw cijfers: " + known }),
        known.indexOf("?") >= 0 && D.kluis && D.kluis.hint ? el("p", { class: "center fine", text: "Mis je cijfers? Geeft niet. Tip: " + D.kluis.hint }) : null,
        wheels, msg,
        el("div", { class: "g-row center" }, btn("Open de kluis", "big glow", function (e) {
          if (vals.join("") === target) {
            state.kluis = true; save(); sfx("boom"); setTimeout(function () { sfx("win"); }, 300);
            door.classList.add("open"); burst(door, 60); confetti(4000); setTimeout(function () { stem("kluis"); }, reduced ? 0 : 1200);
            setTimeout(function () { renderPass(); }, reduced ? 200 : 1900);
          } else {
            tries++; sfx("bad"); wheels.classList.remove("shake"); void wheels.offsetWidth; wheels.classList.add("shake");
            msg.textContent = tries >= 2 && D.kluis && D.kluis.hint ? "Nog niet. Tip: " + D.kluis.hint : "Nog niet goed. Probeer een andere volgorde.";
          }
        }))),
      el("div", { class: "g-row center" }, btn([icon("map"), "Terug naar de kaart"], "ghost", function () { go("#/kaart"); }))
    ], "finale");
  }
  function renderPass() {
    var a = state.agent || {};
    var d = new Date(), date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    var card = el("div", { class: "pass" },
      el("div", { class: "pass-shine", "aria-hidden": "true" }),
      el("div", { class: "pass-top" }, el("span", { class: "pass-logo", text: "V" }), el("div", null, el("strong", { text: "Vellesan College" }), el("small", { text: "Leerlingenpas · Open dag" }))),
      el("div", { class: "pass-mid" }, el("span", { class: "avatar xl", style: { "--c": a.kleur || "#f39200" }, text: a.icoon || "🦊" }),
        el("div", null, el("small", { text: "Agent" }), el("strong", { class: "pass-name", text: a.naam || "" }), el("small", { text: date }))),
      el("div", { class: "pass-stats" },
        el("div", null, el("strong", { text: String(playedCount()) }), el("span", { text: "spelletjes" })),
        el("div", null, el("strong", { text: String(totalStars()) }), el("span", { text: "sterren" })),
        el("div", null, el("strong", { text: Object.keys(state.secrets).length + "/" + bonus.length }), el("span", { text: "geheimen" }))),
      el("div", { class: "pass-foot" },
        el("div", { class: "pass-items", "aria-label": "Verzamelde spullen" }, stops.filter(isDone).map(function (s) { return itemArt(s, "pi"); })),
        prizeWon() ? el("div", { class: "pass-stamp", role: "img", "aria-label": "Prijs gewonnen" }, el("span", { text: "Prijs" }), el("strong", { text: "gewonnen" })) : null));
    show([
      el("div", { class: "center finale-head" }, el("p", { class: "eyebrow", text: "Missie geslaagd" }), el("h1", { class: "h-display", text: "Welkom op het Vellesan!" }),
        el("p", { class: "lead", text: "Je hebt de kluis gekraakt. Dit is jouw leerlingenpas." }),
        prizeWon() ? el("p", { class: "prize-claim", text: "🏆 " + ((D.prijs && D.prijs.tekst) || "Laat je pas zien aan iemand van de school!") }) : null),
      card, D.itemBeelden ? el("p", { class: "ai-note", text: "Plaatjes van de spullen: AI-illustraties." }) : null,
      el("div", { class: "g-row center" }, btn([icon("map"), "Kaart"], "ghost", function () { go("#/kaart"); }), btn([icon("star"), "Geheime filmpjes"], "ghost", function () { go("#/bonus"); }))
    ], "pass-view");
    confetti(5000);
    if (!reduced) {
      var tilt = function (e) { var r = card.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; card.style.transform = "rotateY(" + (x * 16) + "deg) rotateX(" + (-y * 16) + "deg)"; card.style.setProperty("--sx", (x + 0.5) * 100 + "%"); };
      card.addEventListener("pointermove", tilt);
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    }
  }

  /* ================= bonus ================= */
  function renderBonus() {
    ambient();
    var list = el("div", { class: "bonus-grid" });
    bonus.forEach(function (b) {
      var have = !QR || !!state.secrets[b.id];
      if (!have) { list.appendChild(el("div", { class: "bonus-card glass mystery" }, el("div", { class: "mystery-q", text: "?" }), el("h3", { text: "Geheim filmpje" }), el("p", { class: "muted", text: "Ergens in de school hangt een geheime QR-code. Vind hem!" }))); return; }
      var v = el("video", { src: b.clip, poster: b.poster, controls: true, playsinline: true, preload: "none" }); v.setAttribute("webkit-playsinline", "");
      list.appendChild(el("div", { class: "bonus-card glass" }, v, el("h3", { text: b.naam }), el("p", { text: b.uitleg })));
    });
    var banner = pendingBanner; pendingBanner = "";
    show([hud(), banner ? el("div", { class: "banner", role: "status" }, el("span", { text: "🕵️" }), banner) : null,
      el("div", { class: "locker-head" }, el("p", { class: "eyebrow", text: Object.keys(state.secrets).length + " van " + bonus.length + " gevonden" }), el("h1", { class: "h-display", text: "Geheime filmpjes" }),
        el("p", { class: "lead", text: "Elke geheime QR-code is 2 sterren waard." })),
      list, el("div", { class: "g-row center" }, btn([icon("map"), "Naar de kaart"], "glow", function () { go("#/kaart"); })), scanFab()], "bonus");
    if (banner) { sfx("unlock"); confetti(2000); }
  }

  /* ================= QR ================= */
  function extractCode(text) {
    var t = String(text == null ? "" : text).trim();
    var m = /[?&#\/]qr=([^&#\s]+)/i.exec(t) || /^qr=([^&#\s]+)/i.exec(t);
    if (m) t = m[1];
    else if (/^[a-z]+:\/\//i.test(t) || /\s/.test(t)) return "";
    try { t = decodeURIComponent(t); } catch (e) {}
    return t.trim().toUpperCase();
  }
  function lookupCode(text) {
    var c = extractCode(text); if (!c) return null;
    for (var i = 0; i < stops.length; i++) if (String(stops[i].code || "").toUpperCase() === c) return { kind: "stop", idx: i, item: stops[i] };
    for (var j = 0; j < bonus.length; j++) if (String(bonus[j].code || "").toUpperCase() === c) return { kind: "bonus", idx: j, item: bonus[j] };
    return null;
  }
  function navigate(h, replace) {
    if (replace) { try { history.replaceState(null, "", location.pathname + h); route(); return; } catch (e) {} }
    go(h);
  }
  function applyCode(text, replace) {
    var r = lookupCode(text); if (!r) return null;
    if (!state.agent) { var a = AVATARS[Math.floor(Math.random() * AVATARS.length)]; state.agent = { icoon: a, kleur: KLEUREN[0], naam: NAAM1[0] + " " + NAAM2[AVATARS.indexOf(a)] }; }
    if (r.kind === "stop") {
      var first = !state.found[r.item.id];
      state.found[r.item.id] = true; state.laatst = r.item.id; save(); pendingGame = true;
      pendingBanner = first ? "Gevonden! De missies van " + r.item.naam + " zijn open." : "Je bent bij " + r.item.naam + ".";
      navigate("#/stop/" + (r.idx + 1), replace);
    } else {
      var f2 = !state.secrets[r.item.id];
      state.secrets[r.item.id] = true; save();
      pendingBanner = "Geheime QR gevonden!" + (f2 ? " Je krijgt 2 sterren." : "");
      navigate("#/bonus", replace);
    }
    return r;
  }
  function handleScanned(text, fromUrl) {
    if (fromUrl) { try { history.replaceState(null, "", location.pathname); } catch (e) {} }
    if (!applyCode(text, fromUrl)) { toast("Deze QR-code ken ik niet. Probeer een poster van de rondleiding.", "bad"); navigate("#/kaart", fromUrl); }
  }
  function typeCode() {
    modal(function (close) {
      var inp = el("input", { type: "text", maxlength: "12", autocomplete: "off", autocapitalize: "characters", autocorrect: "off", spellcheck: "false", class: "codeinput", id: "codein" });
      var msg = el("p", { class: "g-msg bad", "aria-live": "polite" });
      var form = el("form", { class: "codeform", novalidate: true },
        el("label", { for: "codein", text: "Typ het woord dat op de poster staat" }), inp, msg,
        el("div", { class: "g-row end" }, btn("Annuleer", "ghost", close), el("button", { type: "submit", class: "btn glow" }, "Open")));
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (lookupCode(inp.value)) { close(); applyCode(inp.value, false); }
        else { sfx("bad"); msg.textContent = inp.value.trim() ? "Dat woord klopt niet. Kijk nog eens goed op de poster." : "Typ eerst het woord van de poster."; inp.focus(); }
      });
      setTimeout(function () { inp.focus(); }, 50);
      return [el("h2", { text: "Code typen" }), form];
    });
  }
  /* ================= heads-up display: pijlen in de radar =================
     Waar ben je? De laatst gescande poster (of de stop die open staat).
     Welke kant kijk je op? Het kompas van de iPad (webkitCompassHeading), anders de draaisensor,
     anders slepen met de vinger. De plattegrond is schuin getekend; "assen" zet hem terug naar recht. */
  var HUDC = D.hud || {}, IJKKEY = "vellesan-hud-draai";
  function hudDraai() { try { var v = localStorage.getItem(IJKKEY); if (v != null && v !== "") return +v; } catch (e) {} return +HUDC.draai || 0; }
  function worldXY(s) {
    var e = etages[s.etage] || {}, A = (HUDC.assen || [])[0] || [0.94, -0.35], B = (HUDC.assen || [])[1] || [0.45, 0.89];
    var px = s.x / 100 * (e.w || 1000), py = s.y / 100 * (e.h || 700), det = A[0] * B[1] - A[1] * B[0];
    return { a: (px * B[1] - B[0] * py) / det, b: (A[0] * py - A[1] * px) / det };
  }
  function mapBearing(from, to) { var p = worldXY(from), q = worldXY(to); return (Math.atan2(q.a - p.a, -(q.b - p.b)) * 180 / Math.PI + 360) % 360; }
  function mapDist(from, to) { var p = worldXY(from), q = worldXY(to); return Math.hypot(q.a - p.a, q.b - p.b); }
  function norm180(d) { d = ((d % 360) + 540) % 360 - 180; return d; }
  function camHeading(alpha, beta, gamma) {
    var r = Math.PI / 180, cA = Math.cos(alpha * r), sA = Math.sin(alpha * r), sB = Math.sin(beta * r), cG = Math.cos(gamma * r), sG = Math.sin(gamma * r);
    var rA = -cA * sG - sA * sB * cG, rB = -sA * sG + cA * sB * cG, h = Math.atan(rA / rB);
    if (rB < 0) h += Math.PI; else if (rA < 0) h += 2 * Math.PI;
    return h * 180 / Math.PI;
  }
  function hereStop() {
    var m = /^#\/stop\/(\d+)/.exec(location.hash), i = m ? +m[1] - 1 : -1;
    if (i >= 0 && stops[i] && isOpen(stops[i]) && state.found[stops[i].id]) return stops[i];
    for (var k = 0; k < stops.length; k++) if (stops[k].id === state.laatst) return stops[k];
    return null;
  }
  function hudArrows(ov) {
    var here = hereStop(), heading = null, smooth = null, raf = 0, off = false, fov = HUDC.kijkhoek || 60, src = "";
    var layer = el("div", { class: "hud-layer" });
    var tags = [], floorsEl = el("div", { class: "hud-floors" }), where = el("div", { class: "hud-where" });
    var nextStop = null; for (var ni2 = 0; ni2 < stops.length && !nextStop; ni2++) if (!isDone(stops[ni2]) && stops[ni2] !== here) nextStop = stops[ni2];
    layer.appendChild(where); layer.appendChild(floorsEl);
    if (!here) {
      where.textContent = "Scan een poster. Dan weet de radar waar je bent en wijzen de pijlen de weg.";
      return { el: layer, stop: function () {} };
    }
    where.appendChild(el("span", { class: "hud-pin", "aria-hidden": "true", text: "📍" }));
    where.appendChild(document.createTextNode("Je bent bij " + (here.kort || here.naam)));
    // plekken op dezelfde etage: de volgende missie en de dichtstbijzijnde
    var same = stops.filter(function (s) { return s !== here && s.etage === here.etage; })
      .sort(function (p, q) { return mapDist(here, p) - mapDist(here, q); });
    var pickd = same.slice(0, 6);
    if (nextStop && nextStop.etage === here.etage && pickd.indexOf(nextStop) < 0) pickd.push(nextStop);
    var maxD = pickd.reduce(function (m, s) { return Math.max(m, mapDist(here, s)); }, 1);
    pickd.forEach(function (s, k) {
      var isNext = s === nextStop, done = isDone(s);
      var t = el("button", { type: "button", class: "hud-tag" + (isNext ? " next" : "") + (done ? " done" : ""), "aria-label": (isNext ? "Volgende missie: " : "") + (s.kort || s.naam), onclick: function () { stopAll(); go("#/stop/" + (stops.indexOf(s) + 1)); } },
        el("span", { class: "hud-arrow", "aria-hidden": "true" }),
        el("span", { class: "hud-label" }, isNext ? el("small", { text: "Volgende missie" }) : null, el("strong", { text: (s.kort || s.naam) + (done ? " ✓" : "") })));
      t._b = mapBearing(here, s); t._d = mapDist(here, s) / maxD; t._row = k % 3;
      tags.push(t); layer.appendChild(t);
    });
    // andere etages: de trap op of af
    [0, 1, 2].forEach(function (f) {
      if (f === here.etage || !etages[f]) return;
      var names = stops.filter(function (s) { return s.etage === f && !isDone(s); }).slice(0, 3).map(function (s) { return s.kort || s.naam; });
      if (!names.length) return;
      floorsEl.appendChild(el("div", { class: "hud-floor" }, el("b", { text: f > here.etage ? "⬆ Trap op" : "⬇ Trap af" }), " " + etages[f].naam + ": " + names.join(", ")));
    });
    var tip = el("p", { class: "hud-tip", text: "" });
    layer.appendChild(tip);
    function paint() {
      raf = requestAnimationFrame(paint);
      if (heading == null) return;
      smooth = smooth == null ? heading : (smooth + norm180(heading - smooth) * 0.18 + 360) % 360;
      var W = layer.clientWidth || window.innerWidth, edgeL = 0, edgeR = 0;
      tags.forEach(function (t) {
        var rel = norm180(t._b + hudDraai() - smooth), inView = Math.abs(rel) <= fov / 2;
        t.classList.toggle("edge", !inView);
        t.classList.toggle("left", !inView && rel < 0);
        t.classList.toggle("right", !inView && rel > 0);
        var x, y;
        if (inView) { x = W / 2 + rel / (fov / 2) * (W / 2 - 70); y = 28 + t._d * 18 + t._row * 9; }
        else if (rel < 0) { x = 10; y = 30 + (edgeL++) * 9; }
        else { x = W - 10; y = 30 + (edgeR++) * 9; }
        t.style.transform = "translate(" + Math.round(x) + "px," + y.toFixed(1) + "vh) translate(" + (inView ? "-50%" : rel < 0 ? "0" : "-100%") + ",-50%)";
        t.style.setProperty("--rot", inView ? "0deg" : rel < 0 ? "-90deg" : "90deg");
      });
    }
    function onIOS(e) { if (e.webkitCompassHeading != null && !isNaN(e.webkitCompassHeading)) { src = "kompas"; heading = e.webkitCompassHeading; } else if (!src && e.alpha != null) { src = "draai"; heading = camHeading(e.alpha, e.beta || 0, e.gamma || 0); } }
    function onAbs(e) { if (e.alpha == null) return; src = "kompas"; heading = camHeading(e.alpha, e.beta || 0, e.gamma || 0); }
    var drag = null;
    function down(e) { if (e.target.closest && e.target.closest(".hud-tag")) return; drag = { x: e.clientX, h: heading == null ? 0 : heading }; }
    function move(e) { if (!drag || src === "kompas") return; heading = (drag.h - (e.clientX - drag.x) * fov / (layer.clientWidth || 600) + 360) % 360; }
    function up() { drag = null; }
    function stopAll() { if (off) return; off = true; cancelAnimationFrame(raf); window.removeEventListener("deviceorientation", onIOS); window.removeEventListener("deviceorientationabsolute", onAbs); }
    askMotion().then(function (ok) {
      if (off) return;
      window.addEventListener("deviceorientationabsolute", onAbs);
      window.addEventListener("deviceorientation", onIOS);
      setTimeout(function () { if (off) return; if (heading == null) { heading = mapBearing(here, nextStop && nextStop.etage === here.etage ? nextStop : pickd[0] || here) + hudDraai(); tip.textContent = "Geen kompas. Sleep met je vinger om rond te kijken."; } }, 1200);
    });
    layer.addEventListener("pointerdown", down); layer.addEventListener("pointermove", move);
    layer.addEventListener("pointerup", up); layer.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(paint);
    // docent: richting instellen met ?ijk=1
    if (/[?&]ijk=1/.test(location.search)) {
      var sel = el("select", { class: "hud-ijk-sel", "aria-label": "Plek waar je op richt" }, pickd.map(function (s, k) { return el("option", { value: String(k), text: s.kort || s.naam }); }));
      var out = el("span", { role: "status", text: "Richt de iPad recht op een plek en tik op Instellen." });
      layer.appendChild(el("div", { class: "hud-ijk" }, el("strong", { text: "Richting instellen" }), sel,
        btn("Instellen", "small", function () {
          if (heading == null) { out.textContent = "Nog geen kompas."; return; }
          var d = Math.round((smooth - pickd[+sel.value]._b + 360) % 360);
          try { localStorage.setItem(IJKKEY, String(d)); } catch (e) {}
          out.textContent = "Klaar: draai = " + d + ". Stuur dit getal door, dan zet ik het vast.";
        }), out));
    }
    return { el: layer, stop: stopAll };
  }

  function openScanner() {
    var stream = null, raf = 0, closed = false, lastTick = 0;
    var video = el("video", { class: "scan-video", playsinline: true, muted: true, autoplay: true, "aria-label": "Camerabeeld" });
    video.muted = true; video.setAttribute("webkit-playsinline", "");
    var msg = el("p", { class: "scan-msg", role: "status", "aria-live": "polite", text: "Kijk rond: de pijlen wijzen de weg. Zie je een QR-poster? Richt de iPad erop." });
    var readout = el("div", { class: "scan-readout", "aria-hidden": "true" }, el("span", { text: "AGENT-RADAR" }), el("span", { class: "blink", text: "● ZOEKEN" }));
    var ov = el("div", { class: "scanner", role: "dialog", "aria-modal": "true", "aria-label": "QR-code scannen" },
      video,
      el("div", { class: "scan-hud", "aria-hidden": "true" }, el("div", { class: "scan-box" }, el("i", { class: "c1" }), el("i", { class: "c2" }), el("i", { class: "c3" }), el("i", { class: "c4" }), el("b", { class: "scan-line" }))),
      el("div", { class: "scan-top" }, readout, btn(icon("close"), "ghost round", function () { stop(); }, "Sluiten")),
      el("div", { class: "scan-bottom" }, msg, btn("Typ de code", "ghost", function () { stop(); typeCode(); })));
    var prevFocus = document.activeElement;
    function onKey(e) { if (e.key === "Escape") stop(); }
    function stop() {
      if (closed) return; closed = true;
      cancelAnimationFrame(raf); document.removeEventListener("keydown", onKey); hudA.stop();
      if (stream) { stream.getTracks().forEach(function (t) { try { t.stop(); } catch (e) {} }); stream = null; }
      try { video.srcObject = null; } catch (e) {}
      ov.remove();
      if (prevFocus && prevFocus.focus) try { prevFocus.focus(); } catch (e) {}
    }
    var hudA = hudArrows(ov);
    ov.insertBefore(hudA.el, ov.querySelector(".scan-top"));
    document.addEventListener("keydown", onKey);
    document.body.appendChild(ov);
    ov.querySelector(".scan-top button").focus();
    sfx("whoosh");
    var md = navigator.mediaDevices;
    if (!md || !md.getUserMedia || typeof window.jsQR !== "function") { msg.textContent = "De camera werkt hier niet. Typ de code van de poster."; return; }
    var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
    function tick(ts) {
      if (closed) return;
      raf = requestAnimationFrame(tick);
      if (ts - lastTick < 180 || video.readyState < 2 || !video.videoWidth) return;
      lastTick = ts;
      var w = video.videoWidth, h = video.videoHeight, sc = Math.min(1, 640 / Math.max(w, h));
      canvas.width = Math.round(w * sc); canvas.height = Math.round(h * sc);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var code = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
      if (code && code.data) {
        var hit = lookupCode(code.data);
        if (hit) {
          ov.classList.add("hit"); sfx("unlock"); cancelAnimationFrame(raf); closed = true;
          var d = code.data, it = hit.item;
          readout.lastChild.textContent = "● GEVONDEN";
          msg.textContent = (hit.kind === "stop" ? "Gevonden: " + it.naam : "Geheime code gevonden!");
          // portaal: de plek komt vanuit de poster tot leven
          var portal = el("div", { class: "portal", "aria-hidden": "true" }, el("div", { class: "portal-img", style: { "background-image": "url(" + it.poster + ")" } }), el("div", { class: "portal-ring" }));
          ov.appendChild(portal);
          setTimeout(function () { sfx("whoosh"); }, 200);
          setTimeout(function () { closed = false; stop(); applyCode(d, false); }, reduced ? 0 : 1300);
        }
        else msg.textContent = "Deze QR-code hoort niet bij de rondleiding.";
      }
    }
    md.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false }).then(function (s) {
      if (closed) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
      stream = s; video.srcObject = s;
      var p = video.play(); if (p && p.catch) p.catch(function () {});
      raf = requestAnimationFrame(tick);
    }).catch(function (err) {
      var denied = err && (err.name === "NotAllowedError" || err.name === "SecurityError");
      msg.textContent = denied ? "De camera mag niet worden gebruikt. Typ de code van de poster." : "Geen camera gevonden. Typ de code van de poster.";
    });
  }

  /* ================= ingebouwde opdrachten ================= */
  var Quest = window.Quest = window.Quest || { games: {} };
  Quest.games = Quest.games || {};
  Quest.game = function (t, d) { Quest.games[t] = d; };

  Quest.game("mc", { titel: "Quizvraag", icoon: "❓", render: function (host, o, api) {
    var wrong = 0, box = el("div", { class: "mc-opts" }), msg = el("p", { class: "g-msg", "aria-live": "polite" });
    var order = shuffle(o.opties.map(function (t, i) { return i; }));
    order.forEach(function (k, n) {
      box.appendChild(el("button", { type: "button", class: "mc-opt", style: { "--d": n * 0.06 + "s" }, onclick: function (e) {
        var b = e.currentTarget; if (b.disabled) return;
        if (k === o.goed) {
          b.classList.add("good"); api.sfx("good"); api.burst(b, 20); msg.textContent = o.uitleg || "Goed!";
          Array.prototype.forEach.call(box.children, function (c) { c.disabled = true; });
          api.done(3 - Math.min(2, wrong));
        } else { wrong++; b.classList.add("bad"); b.disabled = true; api.sfx("bad"); msg.textContent = "Helaas. Probeer het nog eens!"; }
      } }, el("span", { class: "mc-l", text: "ABCD"[n] }), el("span", { text: o.opties[k] })));
    });
    host.appendChild(box); host.appendChild(msg);
  } });
  Quest.game("zoek", { titel: "Zoekopdracht", icoon: "🔍", render: function (host, o, api) {
    var b = btn("Gevonden!", "big glow", function () { b.disabled = true; api.sfx("good"); api.burst(b); api.done(3); });
    host.appendChild(el("div", { class: "zoek" }, el("div", { class: "radar", "aria-hidden": "true" }, el("i"), el("i"), el("i")), b));
  } });
  Quest.game("tel", { titel: "Tel-opdracht", icoon: "🔢", render: function (host, o, api) {
    var key = "tel:" + o.vraag, n = typeof state.ans[key] === "number" ? state.ans[key] : 0;
    var out = el("output", { class: "tel-n", "aria-live": "polite", text: String(n) });
    function set(v) { n = Math.max(0, Math.min(999, v)); out.textContent = n; out.classList.remove("bump"); void out.offsetWidth; out.classList.add("bump"); api.sfx("tick"); }
    host.appendChild(el("div", { class: "tel" }, btn("−", "round big ghost", function () { set(n - 1); }, "Eén minder"), out, btn("+", "round big glow", function () { set(n + 1); }, "Eén meer")));
    host.appendChild(el("div", { class: "g-row center" }, btn("Klaar met tellen", "", function () { state.ans[key] = n; save(); api.done(3); })));
  } });
  Quest.game("open", { titel: "Bedenk het zelf", icoon: "💭", render: function (host, o, api) {
    var key = "open:" + o.vraag;
    var ta = el("textarea", { rows: "3", maxlength: "200", class: "open-ta", "aria-label": o.vraag });
    ta.value = state.ans[key] || "";
    host.appendChild(ta);
    host.appendChild(el("div", { class: "g-row end" }, btn("Klaar", "glow", function () { if (!ta.value.trim()) { ta.focus(); return; } state.ans[key] = ta.value.trim(); save(); api.done(3); })));
  } });
  Quest.game("foto", { titel: "Fotomissie", icoon: "📸", render: function (host, o, api) {
    var key = "foto:" + o.vraag;
    var prev = el("div", { class: "foto-prev" });
    if (photoURLs[key]) prev.appendChild(el("img", { src: photoURLs[key], alt: "Jouw foto" }));
    var inp = el("input", { type: "file", accept: "image/*", capture: "environment", class: "sr", id: "foto-" + Math.random().toString(36).slice(2) });
    inp.addEventListener("change", function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      var u = URL.createObjectURL(f); photoURLs[key] = u; prev.textContent = ""; prev.appendChild(el("img", { src: u, alt: "Jouw foto" }));
      prev.classList.add("flash"); api.sfx("pop"); api.done(3);
    });
    host.appendChild(el("div", { class: "foto" }, prev, el("label", { for: inp.id, class: "btn big glow" }, "📷 Maak een foto"), inp,
      el("p", { class: "fine", text: "De foto blijft alleen op deze iPad." }),
      btn("Lukt niet? Sla over", "ghost small", function () { api.done(1); })));
  } });
  Quest.game("koppel", { titel: "Koppel ze", icoon: "🔗", render: function (host, o, api) {
    var L = o.links, R = o.rechts, sel = null, matched = 0, wrong = 0;
    var msg = el("p", { class: "g-msg", "aria-live": "polite", text: "Tik links, dan rechts." });
    var colL = el("div", { class: "kp-col" }), colR = el("div", { class: "kp-col" });
    shuffle(L.map(function (t, i) { return i; })).forEach(function (i) {
      var b = el("button", { type: "button", class: "kp-item", onclick: function () {
        if (b.classList.contains("done")) return;
        Array.prototype.forEach.call(colL.children, function (c) { c.classList.remove("sel"); });
        b.classList.add("sel"); sel = { i: i, b: b }; api.sfx("tap");
        if (o.spreek) api.speak(L[i], o.talen && o.talen[i]);
      } }, o.spreek ? el("span", { class: "kp-spk", "aria-hidden": "true", text: "🔊 " }) : null, L[i]);
      colL.appendChild(b);
    });
    shuffle(R.map(function (t, i) { return i; })).forEach(function (i) {
      var b = el("button", { type: "button", class: "kp-item r", onclick: function () {
        if (b.classList.contains("done")) return;
        if (!sel) { msg.textContent = "Kies eerst iets aan de linkerkant."; return; }
        if (sel.i === i) {
          b.classList.add("done"); sel.b.classList.add("done"); sel.b.classList.remove("sel"); b.style.setProperty("--h", (matched * 70 + 20) % 360); sel.b.style.setProperty("--h", (matched * 70 + 20) % 360);
          matched++; api.sfx("good"); api.burst(b, 14); sel = null; msg.textContent = matched < L.length ? "Goed zo!" : "Alles gekoppeld!";
          if (matched === L.length) api.done(3 - Math.min(2, wrong));
        } else { wrong++; api.sfx("bad"); b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); msg.textContent = "Die past niet. Probeer een andere."; }
      } }, R[i]);
      colR.appendChild(b);
    });
    host.appendChild(el("div", { class: "kp" }, colL, colR)); host.appendChild(msg);
  } });
  Quest.game("kluis", { titel: "Kraak het kluisje", icoon: "🔐", render: function (host, o, api) {
    var rs = o.raadsels || [], vals = rs.map(function () { return 0; }), wrong = 0;
    var dial = el("div", { class: "kl-dial" }), list = el("ol", { class: "kl-list" });
    rs.forEach(function (r, k) {
      var n = el("span", { class: "kl-n", text: "0" });
      list.appendChild(el("li", null, r.v));
      dial.appendChild(el("div", { class: "kl-wheel" },
        btn("▲", "ghost round small", function () { vals[k] = (vals[k] + 1) % 10; n.textContent = vals[k]; api.sfx("tick"); }, "Cijfer " + (k + 1) + " omhoog"), n,
        btn("▼", "ghost round small", function () { vals[k] = (vals[k] + 9) % 10; n.textContent = vals[k]; api.sfx("tick"); }, "Cijfer " + (k + 1) + " omlaag")));
    });
    var door = el("div", { class: "kl-locker" }, el("div", { class: "kl-door" }, el("i", { class: "kl-vent" }), el("i", { class: "kl-vent" }), el("i", { class: "kl-vent" }), el("span", { class: "kl-num", text: "214" })), el("div", { class: "kl-inside", "aria-hidden": "true", text: "🔑" }));
    var msg = el("p", { class: "g-msg", "aria-live": "polite" });
    host.appendChild(el("div", { class: "kl" }, door, el("div", null, list, dial, msg,
      btn("Open het kluisje", "big glow", function () {
        var ok = rs.every(function (r, k) { return vals[k] === r.a; });
        if (ok) { door.classList.add("open"); api.sfx("unlock"); api.burst(door, 40); msg.textContent = "Klik! Het kluisje is open. Er ligt een sleutel in."; api.done(3 - Math.min(2, wrong)); }
        else {
          wrong++; api.sfx("bad"); dial.classList.remove("shake"); void dial.offsetWidth; dial.classList.add("shake");
          var good = rs.filter(function (r, k) { return vals[k] === r.a; }).length;
          msg.textContent = good + " van de " + rs.length + " cijfers kloppen. Probeer het nog eens.";
          if (wrong >= 4) { msg.textContent += " Tip: de code is " + rs.map(function (r) { return r.a; }).join("") + "."; }
        }
      }))));
  } });

  /* ================= start ================= */
  if (!stops.length) { root.textContent = "De rondleiding kon niet worden geladen."; return; }
  window.addEventListener("load", function () {
    var qq = /[?&]qr=([^&#]+)/i.exec(location.search) || /[#&]\/?qr=([^&#]+)/i.exec(location.hash);
    if (qq) { handleScanned(decodeURIComponent(qq[1]), true); return; }
    var qm = /[?&]stop=([^&#]+)/.exec(location.search);
    if (qm) { try { history.replaceState(null, "", location.pathname + "#/stop/" + qm[1]); } catch (e) { location.hash = "#/stop/" + qm[1]; } }
    route();
  });
  // eerste tik ontgrendelt geluid op iPad
  document.addEventListener("pointerdown", function un() { audio(); document.removeEventListener("pointerdown", un); });
})();
