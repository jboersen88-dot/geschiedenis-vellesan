/* Mini-games A: piano, lift, schuif, tegels, skelet, lab, teken */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
  function timers() {
    var ids = [], dead = false;
    return {
      set: function (fn, ms) {
        if (dead) return 0;
        var id = setTimeout(function () { if (!dead) fn(); }, ms);
        ids.push(id);
        return id;
      },
      clear: function () { ids.forEach(clearTimeout); ids = []; },
      kill: function () { dead = true; ids.forEach(clearTimeout); ids = []; },
      get dead() { return dead; }
    };
  }
  function wrapEl(api, cls) {
    return api.el("div", { "class": cls + " ga-wrap" + (api.reduced ? " ga-reduced" : "") });
  }
  function msgEl(api, text) {
    return api.el("div", { "class": "g-msg ga-msg", role: "status", "aria-live": "polite", text: text || "" });
  }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function starsFor(mistakes, a, b) { return mistakes <= a ? 3 : mistakes <= b ? 2 : 1; }

  /* ---------- Simon-geheugen (piano en lift) ---------- */
  function memory(host, api, cfg) {
    var T = timers();
    var wrap = wrapEl(api, cfg.cls + "-wrap");
    var msg = msgEl(api, "");
    var dots = api.el("div", { "class": "ga-dots", "aria-hidden": "true" });
    var dotEls = cfg.lengths.map(function () { var d = api.el("span", { "class": "ga-dot" }); dots.appendChild(d); return d; });
    var again = api.el("button", { type: "button", "class": "btn ghost ga-again", text: "Speel nog eens af" });
    var btns = cfg.keys.map(function (k, i) {
      var b = cfg.make(k, i);
      b.addEventListener("click", function () { press(i); });
      return b;
    });
    var board = cfg.build(btns, wrap);
    var seq = [], round = 0, pos = 0, mode = "idle", mistakes = 0, roundMistakes = 0, finished = false;

    wrap.appendChild(dots);
    wrap.appendChild(board);
    wrap.appendChild(msg);
    wrap.appendChild(api.el("div", { "class": "g-row ga-actions" }, again));
    host.appendChild(wrap);

    function light(i, ms) {
      var b = btns[i];
      b.classList.add("is-lit");
      T.set(function () { b.classList.remove("is-lit"); }, ms || 380);
    }
    function setMode(m) {
      mode = m;
      wrap.setAttribute("data-mode", m);
      again.disabled = (m === "play" || m === "done");
    }
    function clearHints() { btns.forEach(function (b) { b.classList.remove("is-hint"); }); }
    function showHint() {
      clearHints();
      if (roundMistakes >= 3 && mode === "input") btns[seq[pos]].classList.add("is-hint");
    }
    function newSeq(len) {
      var s = [], last = -1;
      for (var i = 0; i < len; i++) {
        var n; do { n = rnd(cfg.keys.length); } while (n === last);
        s.push(n); last = n;
      }
      return s;
    }
    function playSeq() {
      setMode("play"); clearHints(); pos = 0;
      msg.textContent = "Luister goed...";
      wrap.classList.add("is-listening");
      var step = 640;
      seq.forEach(function (n, i) {
        T.set(function () { light(n, 420); api.sfx("note:" + cfg.notes[n]); }, 700 + i * step);
      });
      T.set(function () {
        wrap.classList.remove("is-listening");
        setMode("input");
        msg.textContent = "Nu jij! Tik de toetsen na.";
        showHint();
      }, 700 + seq.length * step);
    }
    function startRound() {
      roundMistakes = 0;
      seq = newSeq(cfg.lengths[round]);
      dotEls.forEach(function (d, i) { d.className = "ga-dot" + (i < round ? " is-done" : i === round ? " is-now" : ""); });
      playSeq();
    }
    function press(i) {
      if (mode !== "input") return;
      light(i, 240);
      api.sfx("note:" + cfg.notes[i]);
      if (i === seq[pos]) {
        pos++;
        clearHints();
        if (pos >= seq.length) {
          setMode("wait");
          round++;
          dotEls[round - 1].className = "ga-dot is-done";
          if (round >= cfg.lengths.length) { win(); return; }
          msg.textContent = "Goed zo! Nog eentje, iets langer.";
          T.set(function () { api.sfx("good"); }, 250);
          T.set(startRound, 1400);
        } else showHint();
      } else {
        mistakes++; roundMistakes++;
        setMode("wait");
        api.sfx("bad");
        wrap.classList.add("is-wrong");
        T.set(function () { wrap.classList.remove("is-wrong"); }, 500);
        msg.textContent = "Oeps, dat was niet goed. Luister nog een keer.";
        T.set(playSeq, 1500);
      }
    }
    function win() {
      if (finished) return;
      finished = true; setMode("done");
      msg.textContent = "Gelukt! Wat een goed geheugen!";
      api.sfx("win"); api.burst(board);
      T.set(function () { api.done(starsFor(mistakes, 0, 2)); }, 500);
    }
    again.addEventListener("click", function () { if (mode === "input") { T.clear(); playSeq(); } });
    T.set(startRound, 400);
    return function () { T.kill(); };
  }

  /* ---------- piano ---------- */
  Quest.game("piano", {
    titel: "Speel de melodie",
    icoon: "🎹",
    render: function (host, o, api) {
      var notes = [0, 2, 4, 5, 7, 9, 11];
      var keys = notes.map(function (n, i) { return { n: n, i: i }; });
      return memory(host, api, {
        cls: "piano", keys: keys, notes: notes, lengths: [3, 4],
        make: function (k, i) {
          return api.el("button", { type: "button", "class": "piano-key", "aria-label": "Toets " + (i + 1) },
            api.el("span", { "class": "piano-glow" }), api.el("span", { "class": "piano-nr", text: String(i + 1) }));
        },
        build: function (btns) {
          var row = api.el("div", { "class": "piano-keys" });
          btns.forEach(function (b) { row.appendChild(b); });
          return api.el("div", { "class": "piano-body" },
            api.el("div", { "class": "piano-brand", text: "AULA PIANO" }), row);
        }
      });
    }
  });

  /* ---------- lift ---------- */
  Quest.game("lift", {
    titel: "Lift-geheugen",
    icoon: "🛗",
    render: function (host, o, api) {
      var defs = [
        { t: "0", n: 0 }, { t: "1", n: 2 }, { t: "2", n: 4 }, { t: "▲", n: 7 }, { t: "▼", n: 9 }
      ];
      var names = ["verdieping 0", "verdieping 1", "verdieping 2", "omhoog", "omlaag"];
      var led;
      return memory(host, api, {
        cls: "lift", keys: defs, notes: defs.map(function (d) { return d.n; }), lengths: [3, 4],
        make: function (k, i) {
          var b = api.el("button", { type: "button", "class": "lift-btn" + (i > 2 ? " is-arrow" : ""), "aria-label": "Knop " + names[i] },
            api.el("span", { "class": "lift-ring" }), api.el("span", { "class": "lift-lbl", text: k.t }));
          b.addEventListener("click", function () { if (led) led.textContent = k.t; });
          return b;
        },
        build: function (btns) {
          led = api.el("div", { "class": "lift-led", "aria-hidden": "true", text: "-" });
          var nums = api.el("div", { "class": "lift-row" }, btns[2], btns[1], btns[0]);
          var arrows = api.el("div", { "class": "lift-row" }, btns[3], btns[4]);
          return api.el("div", { "class": "lift-panel" }, led, nums, arrows);
        }
      });
    }
  });

  /* ---------- schuifpuzzel ---------- */
  Quest.game("schuif", {
    titel: "Schuifpuzzel",
    icoon: "🧩",
    render: function (host, o, api) {
      var N = 3, T = timers();
      var wrap = wrapEl(api, "schuif-wrap");
      var board = api.el("div", { "class": "schuif-board", role: "group", "aria-label": "Schuifpuzzel" });
      var msg = msgEl(api, "Tik op een stukje naast het lege vak.");
      var counter = api.el("div", { "class": "schuif-count", "aria-hidden": "true", text: "Zetten: 0" });
      var solveBtn = api.el("button", { type: "button", "class": "btn ghost schuif-solve", text: "Los op", hidden: "hidden" });
      var grid = [], tiles = [], gapSlot = N * N - 1, moves = 0, solved = false;
      var url = o.beeld ? "url(\"" + o.beeld + "\")" : "none";
      board.style.backgroundImage = url;

      for (var s = 0; s < N * N; s++) grid.push(s);
      // oplosbare shuffle: willekeurige zetten vanaf opgelost
      var prevSlot = -1;
      for (var m = 0; m < 40 || isSolved(); m++) {
        var from = gapSlot;
        var nb = neighbours(gapSlot).filter(function (x) { return x !== prevSlot; });
        swapWithGap(nb[rnd(nb.length)]);
        prevSlot = from;
      }
      function neighbours(slot) {
        var r = Math.floor(slot / N), c = slot % N, out = [];
        if (r > 0) out.push(slot - N);
        if (r < N - 1) out.push(slot + N);
        if (c > 0) out.push(slot - 1);
        if (c < N - 1) out.push(slot + 1);
        return out;
      }
      function swapWithGap(slot) {
        grid[gapSlot] = grid[slot]; grid[slot] = N * N - 1;
        gapSlot = slot;
      }
      function isSolved() { for (var i = 0; i < grid.length; i++) if (grid[i] !== i) return false; return true; }
      function place(el, slot) {
        el.style.transform = "translate(" + (slot % N) * 100 + "%," + Math.floor(slot / N) * 100 + "%)";
      }
      for (var t = 0; t < N * N; t++) {
        var hr = Math.floor(t / N), hc = t % N;
        var tile = api.el("button", { type: "button", "class": "schuif-tile" + (t === N * N - 1 ? " is-gap" : ""), "aria-label": "Puzzelstuk " + (t + 1) });
        tile.style.backgroundImage = url;
        tile.style.backgroundPosition = (hc * 50) + "% " + (hr * 50) + "%";
        tile.appendChild(api.el("span", { "class": "schuif-nr", "aria-hidden": "true", text: String(t + 1) }));
        tiles.push(tile);
        board.appendChild(tile);
        (function (tt, el) { el.addEventListener("click", function () { tap(tt); }); })(t, tile);
      }
      tiles[N * N - 1].setAttribute("tabindex", "-1");
      tiles[N * N - 1].setAttribute("aria-hidden", "true");
      grid.forEach(function (tt, slot) { place(tiles[tt], slot); });

      function tap(tt) {
        if (solved || tt === N * N - 1) return;
        var slot = grid.indexOf(tt);
        if (neighbours(slot).indexOf(gapSlot) < 0) { api.sfx("tick"); return; }
        var to = gapSlot;
        swapWithGap(slot);
        place(tiles[tt], to);
        place(tiles[N * N - 1], gapSlot);
        moves++; counter.textContent = "Zetten: " + moves;
        api.sfx("tap");
        if (moves >= 60) solveBtn.hidden = false;
        if (isSolved()) finish(moves <= 50 ? 3 : moves <= 90 ? 2 : 1);
      }
      function finish(stars) {
        solved = true; solveBtn.hidden = true;
        wrap.classList.add("is-solved");
        msg.textContent = "Gelukt! De foto klopt weer.";
        tiles[N * N - 1].classList.remove("is-gap");
        api.sfx("win"); api.burst(board);
        T.set(function () { api.done(stars); }, 500);
      }
      solveBtn.addEventListener("click", function () {
        if (solved) return;
        tiles.forEach(function (el, i) {
          el.style.transitionDelay = api.reduced ? "0s" : (i * 0.05) + "s";
          place(el, i);
        });
        for (var i = 0; i < grid.length; i++) grid[i] = i;
        gapSlot = N * N - 1;
        T.set(function () { finish(1); }, api.reduced ? 50 : 900);
      });

      wrap.appendChild(counter);
      wrap.appendChild(board);
      wrap.appendChild(msg);
      wrap.appendChild(api.el("div", { "class": "g-row ga-actions" }, solveBtn));
      host.appendChild(wrap);
      return function () { T.kill(); };
    }
  });

  /* ---------- tegels ---------- */
  var TILE_Q = function () {
    // een kwart (200x200) van het 400x400 patroon, middelpunt van het bord op (200,200)
    return '<circle cx="200" cy="200" r="158" fill="#1f5f4e"/>' +
      '<circle cx="200" cy="200" r="118" fill="#f6f0e6"/>' +
      '<circle cx="200" cy="200" r="78" fill="#c2484d"/>' +
      '<circle cx="200" cy="200" r="34" fill="#f39200"/>' +
      '<path d="M0 0H92A92 92 0 0 1 0 92Z" fill="#c2484d"/>' +
      '<path d="M0 0H52A52 52 0 0 1 0 52Z" fill="#f39200"/>' +
      '<path d="M100 38L138 76L100 114L62 76Z" fill="#f39200"/>' +
      '<circle cx="100" cy="76" r="13" fill="#1f5f4e"/>' +
      '<path d="M178 0H200V28A28 28 0 0 1 178 0Z" fill="#1f5f4e"/>' +
      '<path d="M0 178V200H28A28 28 0 0 1 0 178Z" fill="#1f5f4e"/>' +
      '<circle cx="64" cy="150" r="9" fill="#1f5f4e"/>' +
      '<circle cx="150" cy="40" r="7" fill="#c2484d"/>';
  };
  function tileSvg(r, c) {
    // r,c: 0..3 in het bord
    var q = TILE_Q();
    var all = '<g>' + q + '</g>' +
      '<g transform="translate(400,0) scale(-1,1)">' + q + '</g>' +
      '<g transform="translate(0,400) scale(1,-1)">' + q + '</g>' +
      '<g transform="translate(400,400) scale(-1,-1)">' + q + '</g>';
    return '<svg viewBox="' + (c * 100) + ' ' + (r * 100) + ' 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<rect x="' + (c * 100) + '" y="' + (r * 100) + '" width="100" height="100" fill="#f6f0e6"/>' + all + '</svg>';
  }

  Quest.game("tegels", {
    titel: "Tegelpatroon",
    icoon: "🟧",
    render: function (host, o, api) {
      var T = timers(), N = 4;
      var wrap = wrapEl(api, "tegels-wrap");
      var board = api.el("div", { "class": "tegels-board", role: "group", "aria-label": "Tegelvloer" });
      var msg = msgEl(api, "Tik op een tegel om hem te draaien.");
      var rot = [], tiles = [], taps = 0, finished = false, minTaps = 0;
      var i;
      for (i = 0; i < N * N; i++) rot.push(0);
      do {
        for (i = 0; i < N * N; i++) rot[i] = rnd(4);
      } while (rot.filter(function (x) { return x !== 0; }).length < 8);
      rot.forEach(function (x) { minTaps += (4 - x) % 4; });

      function allRight() { return rot.every(function (x) { return x % 4 === 0; }); }
      function paint(idx) {
        var t = tiles[idx];
        t.style.transform = "rotate(" + rot[idx] * 90 + "deg)";
        t.parentNode.classList.toggle("is-ok", rot[idx] % 4 === 0);
      }
      for (i = 0; i < N * N; i++) {
        (function (idx) {
          var r = Math.floor(idx / N), c = idx % N;
          var inner = api.el("div", { "class": "tegels-art" });
          inner.innerHTML = tileSvg(r, c);
          var cell = api.el("button", { type: "button", "class": "tegels-tile", "aria-label": "Tegel rij " + (r + 1) + " kolom " + (c + 1) + ". Tik om te draaien." }, inner);
          tiles.push(inner);
          board.appendChild(cell);
          cell.addEventListener("click", function () {
            if (finished) return;
            rot[idx]++; taps++;
            paint(idx);
            api.sfx("tap");
            var ok = rot.filter(function (x) { return x % 4 === 0; }).length;
            msg.textContent = ok + " van de 16 tegels staan goed.";
            if (allRight()) win();
          });
        })(i);
      }
      // eerst zonder animatie plaatsen
      wrap.classList.add("is-setup");
      for (i = 0; i < N * N; i++) paint(i);
      T.set(function () { wrap.classList.remove("is-setup"); }, 60);

      function win() {
        finished = true;
        wrap.classList.add("is-solved");
        msg.textContent = "Mooi! Het patroon klopt.";
        api.sfx("win"); api.burst(board);
        var stars = taps <= minTaps + 4 ? 3 : taps <= minTaps * 2 + 6 ? 2 : 1;
        T.set(function () { api.done(stars); }, 600);
      }
      var cnt = rot.filter(function (x) { return x % 4 === 0; }).length;
      msg.textContent = "Tik op een tegel om hem te draaien. " + cnt + " van de 16 staan goed.";
      wrap.appendChild(board);
      wrap.appendChild(msg);
      host.appendChild(wrap);
      return function () { T.kill(); };
    }
  });

  /* ---------- skelet ---------- */
  var BONE = 'fill="#efe6d0" stroke="#b9ad8f" stroke-width="1.5"';
  var BONEL = 'fill="none" stroke="#efe6d0" stroke-linecap="round" stroke-linejoin="round"';
  var SK = {
    schedel: {
      kind: "schedel", naam: "Schedel", box: [68, 4, 64, 72],
      art: '<ellipse cx="100" cy="36" rx="27" ry="28" ' + BONE + '/>' +
        '<path d="M83 56h34v9q0 7-7 7H90q-7 0-7-7z" ' + BONE + '/>' +
        '<circle cx="90" cy="36" r="7" fill="#3a3426"/><circle cx="110" cy="36" r="7" fill="#3a3426"/>' +
        '<path d="M100 44l-4 8h8z" fill="#3a3426"/>' +
        '<path d="M92 66v6M100 66v6M108 66v6" stroke="#b9ad8f" stroke-width="1.5"/>'
    },
    ribben: {
      kind: "ribben", naam: "Ribbenkast", box: [62, 78, 76, 90],
      art: '<rect x="96" y="82" width="8" height="84" rx="4" ' + BONE + '/>' +
        [0, 1, 2, 3, 4].map(function (i) {
          var y = 90 + i * 15, w = 34 - i * 3;
          return '<path d="M96 ' + y + 'C80 ' + (y - 4) + ' ' + (100 - w) + ' ' + (y + 2) + ' ' + (100 - w - 2) + ' ' + (y + 15) + '" ' + BONEL + ' stroke-width="5"/>' +
            '<path d="M104 ' + y + 'C120 ' + (y - 4) + ' ' + (100 + w) + ' ' + (y + 2) + ' ' + (100 + w + 2) + ' ' + (y + 15) + '" ' + BONEL + ' stroke-width="5"/>';
        }).join("")
    },
    bekken: {
      kind: "bekken", naam: "Bekken", box: [62, 169, 76, 52],
      art: '<path d="M68 176q0-6 8-5h48q8-1 8 5l-3 26q-6 16-22 16-8 0-9-9-1 9-9 9-16 0-22-16z" ' + BONE + '/>' +
        '<ellipse cx="82" cy="190" rx="6" ry="8" fill="#3a3426"/><ellipse cx="118" cy="190" rx="6" ry="8" fill="#3a3426"/>'
    },
    armL: {
      kind: "arm", naam: "Arm", box: [14, 80, 42, 150],
      art: '<path d="M50 90L33 150L26 210" ' + BONEL + ' stroke-width="8"/>' +
        '<circle cx="50" cy="89" r="7" ' + BONE + '/><circle cx="34" cy="150" r="6" ' + BONE + '/>' +
        '<ellipse cx="25" cy="217" rx="8" ry="9" ' + BONE + '/>'
    },
    armR: {
      kind: "arm", naam: "Arm", box: [144, 80, 42, 150],
      art: '<path d="M150 90L167 150L174 210" ' + BONEL + ' stroke-width="8"/>' +
        '<circle cx="150" cy="89" r="7" ' + BONE + '/><circle cx="166" cy="150" r="6" ' + BONE + '/>' +
        '<ellipse cx="175" cy="217" rx="8" ry="9" ' + BONE + '/>'
    },
    benen: {
      kind: "benen", naam: "Benen", box: [56, 222, 88, 124],
      art: '<path d="M86 222L80 274L78 322" ' + BONEL + ' stroke-width="10"/>' +
        '<path d="M114 222L120 274L122 322" ' + BONEL + ' stroke-width="10"/>' +
        '<circle cx="80" cy="274" r="8" ' + BONE + '/><circle cx="120" cy="274" r="8" ' + BONE + '/>' +
        '<ellipse cx="72" cy="326" rx="14" ry="7" ' + BONE + '/><ellipse cx="128" cy="326" rx="14" ry="7" ' + BONE + '/>'
    }
  };

  Quest.game("skelet", {
    titel: "Maak het skelet",
    icoon: "💀",
    render: function (host, o, api) {
      var T = timers(), NS = "http://www.w3.org/2000/svg";
      var wrap = wrapEl(api, "skelet-wrap");
      var msg = msgEl(api, "Sleep een bot naar de stippellijn. Of tik eerst op het bot en dan op de plek.");
      var order = ["schedel", "ribben", "bekken", "armL", "armR", "benen"];
      var stage = api.el("div", { "class": "skelet-stage" });
      var tray = api.el("div", { "class": "skelet-tray", role: "group", "aria-label": "Botten" });
      var svgWrap = api.el("div", { "class": "skelet-fig" });
      var zoneHtml = "";
      order.forEach(function (k) {
        var b = SK[k].box, pad = 2;
        zoneHtml += '<g class="skelet-zone" data-k="' + k + '" role="button" tabindex="0" aria-label="Lege plek voor ' + SK[k].naam.toLowerCase() + '">' +
          '<rect class="skelet-zone-box" x="' + (b[0] - pad) + '" y="' + (b[1] - pad) + '" width="' + (b[2] + pad * 2) + '" height="' + (b[3] + pad * 2) + '" rx="12"/>' +
          '<g class="skelet-zone-art"></g></g>';
      });
      svgWrap.innerHTML = '<svg viewBox="0 0 200 340" aria-hidden="false" role="img" aria-label="Omtrek van een skelet met lege plekken">' +
        '<g class="skelet-sil"><ellipse cx="100" cy="38" rx="34" ry="36"/><rect x="62" y="76" width="76" height="140" rx="26"/>' +
        '<path d="M60 86L28 150L18 224" /><path d="M140 86L172 150L182 224"/>' +
        '<path d="M84 210L76 332" /><path d="M116 210L124 332"/></g>' + zoneHtml + '</svg>';
      var zones = {};
      Array.prototype.forEach.call(svgWrap.querySelectorAll(".skelet-zone"), function (z) { zones[z.getAttribute("data-k")] = { el: z, filled: false }; });

      var pieces = api.shuffle(order).map(function (k) {
        var d = SK[k], b = d.box, pad = 6;
        var p = api.el("div", { "class": "skelet-piece", role: "button", tabindex: "0", "aria-pressed": "false", "aria-label": d.naam }) ;
        p.innerHTML = '<svg viewBox="' + (b[0] - pad) + ' ' + (b[1] - pad) + ' ' + (b[2] + pad * 2) + ' ' + (b[3] + pad * 2) + '" width="' + Math.round((b[2] + pad * 2) * 0.62) + '" height="' + Math.round((b[3] + pad * 2) * 0.62) + '" aria-hidden="true">' + d.art + '</svg>' +
          '<span class="skelet-lbl">' + d.naam + '</span>';
        p._k = k; p._placed = false;
        tray.appendChild(p);
        return p;
      });
      var selected = null, mistakes = 0, placedN = 0, finished = false, drag = null;

      function select(p) {
        if (selected) { selected.classList.remove("is-sel"); selected.setAttribute("aria-pressed", "false"); }
        selected = p;
        if (p) { p.classList.add("is-sel"); p.setAttribute("aria-pressed", "true"); }
        showHint(p);
        if (p) msg.textContent = "Tik nu op de plek waar " + SK[p._k].naam.toLowerCase() + " hoort.";
      }
      function showHint(p) {
        order.forEach(function (k) { zones[k].el.classList.remove("is-hint"); });
        if (p && mistakes >= 3) {
          order.forEach(function (k) { if (!zones[k].filled && SK[k].kind === SK[p._k].kind) zones[k].el.classList.add("is-hint"); });
        }
      }
      function attempt(p, zk) {
        var z = zones[zk];
        if (z.filled || finished) return false;
        if (SK[p._k].kind === SK[zk].kind) {
          z.filled = true; p._placed = true; placedN++;
          z.el.classList.add("is-filled"); z.el.setAttribute("tabindex", "-1");
          z.el.setAttribute("aria-label", SK[zk].naam + " staat op zijn plek");
          z.el.querySelector(".skelet-zone-art").innerHTML = SK[zk].art;
          p.classList.add("is-placed"); p.setAttribute("tabindex", "-1"); p.setAttribute("aria-hidden", "true");
          T.set(function () { p.style.display = "none"; }, 300);
          if (selected === p) selected = null;
          showHint(null);
          api.sfx("good");
          msg.textContent = placedN + " van de " + order.length + " botten staan goed.";
          if (placedN === order.length) win();
          return true;
        }
        mistakes++;
        api.sfx("bad");
        z.el.classList.add("is-wrong");
        T.set(function () { z.el.classList.remove("is-wrong"); }, 500);
        msg.textContent = "Dat bot hoort ergens anders.";
        showHint(p);
        return false;
      }
      function win() {
        finished = true;
        wrap.classList.add("is-solved");
        msg.textContent = "Gelukt! Het skelet is weer heel.";
        api.sfx("win"); api.burst(svgWrap);
        T.set(function () { api.done(mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1); }, 500);
      }
      function zoneAt(x, y) {
        var best = null, bd = 1e9;
        order.forEach(function (k) {
          if (zones[k].filled) return;
          var r = zones[k].el.getBoundingClientRect(), m = 22;
          if (x >= r.left - m && x <= r.right + m && y >= r.top - m && y <= r.bottom + m) {
            var d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
            if (d < bd) { bd = d; best = k; }
          }
        });
        return best;
      }

      pieces.forEach(function (p) {
        p.addEventListener("pointerdown", function (e) {
          if (finished || p._placed) return;
          if (e.pointerType === "mouse" && e.button !== 0) return;
          drag = { p: p, id: e.pointerId, x0: e.clientX, y0: e.clientY, moved: false };
          try { p.setPointerCapture(e.pointerId); } catch (x) {}
        });
        p.addEventListener("pointermove", function (e) {
          if (!drag || drag.p !== p || e.pointerId !== drag.id) return;
          var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
          if (!drag.moved && Math.hypot(dx, dy) > 8) { drag.moved = true; p.classList.add("is-drag"); showHint(p); }
          if (drag.moved) p.style.transform = "translate(" + dx + "px," + dy + "px) scale(1.12)";
        });
        function end(e, cancel) {
          if (!drag || drag.p !== p || e.pointerId !== drag.id) return;
          var d = drag; drag = null;
          try { p.releasePointerCapture(e.pointerId); } catch (x) {}
          p.classList.remove("is-drag");
          if (!d.moved) { if (!cancel) select(selected === p ? null : p); return; }
          var zk = cancel ? null : zoneAt(e.clientX, e.clientY);
          if (zk && attempt(p, zk)) { p.style.transform = ""; return; }
          p.classList.add("is-back"); p.style.transform = "";
          T.set(function () { p.classList.remove("is-back"); }, 320);
        }
        p.addEventListener("pointerup", function (e) { end(e, false); });
        p.addEventListener("pointercancel", function (e) { end(e, true); });
        p.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!p._placed) select(selected === p ? null : p); }
        });
      });
      order.forEach(function (k) {
        function go() {
          if (selected) attempt(selected, k);
          else msg.textContent = "Tik eerst op een bot hieronder.";
        }
        zones[k].el.addEventListener("click", go);
        zones[k].el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      });

      stage.appendChild(svgWrap); stage.appendChild(tray);
      wrap.appendChild(stage); wrap.appendChild(msg);
      host.appendChild(wrap);
      return function () { T.kill(); };
    }
  });

  /* ---------- lab ---------- */
  var FLASK = "M82 12H118V88C118 100 128 112 146 140C170 178 176 200 168 224C160 248 140 252 100 252C60 252 40 248 32 224C24 200 30 178 54 140C72 112 82 100 82 88Z";
  Quest.game("lab", {
    titel: "Maak een bruisbal",
    icoon: "🧪",
    render: function (host, o, api) {
      var T = timers(), ids = 0;
      var wrap = wrapEl(api, "lab-wrap");
      var msg = msgEl(api, "Kies een stof en doe hem in de kolf.");
      var ING = [
        { id: "soda", naam: "Soda", ico: "🧂", col: "#dbe7ff", rgb: [219, 231, 255] },
        { id: "zuur", naam: "Citroenzuur", ico: "🍋", col: "#ffe14d", rgb: [255, 225, 77] },
        { id: "kleur", naam: "Kleurstof", ico: "🎨", col: "#ff4fa3", rgb: [255, 79, 163] },
        { id: "geur", naam: "Geurtje", ico: "🌸", col: "#8f6bff", rgb: [143, 107, 255] }
      ];
      var STEP = 46, BASE = 254;
      var flask = api.el("div", { "class": "lab-flask" });
      flask.innerHTML = '<svg viewBox="0 0 200 262" aria-hidden="true" focusable="false">' +
        '<defs><clipPath id="labclip' + (++ids) + Math.floor(Math.random() * 1e6) + '"><path d="' + FLASK + '"/></clipPath>' +
        '<linearGradient id="labshine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
        '<g class="lab-liquid"></g>' +
        '<path class="lab-glass" d="' + FLASK + '"/><path class="lab-shine" d="M92 20V90C92 104 80 118 66 140" /></svg>';
      var svg = flask.querySelector("svg");
      var cid = svg.querySelector("clipPath").id;
      var liquid = svg.querySelector(".lab-liquid");
      liquid.setAttribute("clip-path", "url(#" + cid + ")");
      var mixRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      mixRect.setAttribute("class", "lab-mix"); mixRect.setAttribute("x", "0"); mixRect.setAttribute("y", "0");
      mixRect.setAttribute("width", "200"); mixRect.setAttribute("height", "262");
      var bubbles = api.el("div", { "class": "lab-bubbles", "aria-hidden": "true" });
      flask.appendChild(bubbles);

      var meterFill = api.el("div", { "class": "lab-meter-fill" });
      var meter = api.el("div", { "class": "lab-meter", role: "progressbar", "aria-label": "Bruismeter", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "0" }, meterFill);
      var shakeBtn = api.el("button", { type: "button", "class": "btn lab-shake", text: "Schud!" });
      var meterBox = api.el("div", { "class": "lab-shake-box", hidden: "hidden" }, meter, shakeBtn);
      var ingRow = api.el("div", { "class": "lab-ings", role: "group", "aria-label": "Stoffen" });
      var added = [], phase = "add", level = 0, fizz = 0, stopMotion = null, motionAsked = false, finished = false, lastShake = 0, nBub = 0;

      ING.forEach(function (g) {
        var b = api.el("button", { type: "button", "class": "lab-ing" },
          api.el("span", { "class": "lab-ing-dot", style: "background:" + g.col }),
          api.el("span", { "class": "lab-ing-ico", "aria-hidden": "true", text: g.ico }),
          api.el("span", { "class": "lab-ing-txt", text: g.naam }));
        b.addEventListener("click", function () { addIng(g, b); });
        ingRow.appendChild(b);
      });

      function addIng(g, b) {
        if (phase !== "add" || b.disabled) return;
        b.disabled = true; b.classList.add("is-used");
        if (!motionAsked) { motionAsked = true; stopMotion = api.motion(function (d) { if (d && d.shake) shake(8); }); }
        api.sfx("pop");
        // druppel
        var drop = api.el("span", { "class": "lab-drop" });
        drop.style.background = g.col;
        flask.appendChild(drop);
        T.set(function () { if (drop.parentNode) drop.parentNode.removeChild(drop); }, 700);
        // laag
        var layer = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        layer.setAttribute("x", "0"); layer.setAttribute("y", "0"); layer.setAttribute("width", "200");
        layer.setAttribute("height", String(STEP + (level === 0 ? 20 : 1)));
        layer.setAttribute("fill", g.col);
        layer.setAttribute("class", "lab-layer");
        var from = BASE - level * STEP + 60, to = BASE - (level + 1) * STEP;
        layer.style.transform = "translateY(" + from + "px)"; layer.style.opacity = "0";
        liquid.appendChild(layer);
        T.set(function () { layer.style.transform = "translateY(" + to + "px)"; layer.style.opacity = "0.92"; }, api.reduced ? 0 : 450);
        level++; added.push(g);
        msg.textContent = g.naam + " zit in de kolf!";
        if (added.length === ING.length) {
          T.set(function () { startShake(); }, 900);
        }
      }
      function startShake() {
        phase = "shake";
        var r = 0, gr = 0, bl = 0;
        added.forEach(function (g) { r += g.rgb[0]; gr += g.rgb[1]; bl += g.rgb[2]; });
        var n = added.length;
        mixRect.setAttribute("fill", "rgb(" + Math.round(r / n) + "," + Math.round(gr / n) + "," + Math.round(bl / n) + ")");
        mixRect.style.transform = "translateY(" + (BASE - level * STEP) + "px)"; mixRect.style.opacity = "0";
        liquid.appendChild(mixRect);
        T.set(function () { mixRect.style.opacity = "0.75"; }, 30);
        ingRow.classList.add("is-done");
        meterBox.hidden = false;
        wrap.classList.add("is-shaking");
        msg.textContent = "Schud de iPad! Of tik snel op de knop.";
        api.sfx("tick");
      }
      function bubble() {
        if (api.reduced || nBub >= 36) return;
        nBub++;
        var b = api.el("span", { "class": "lab-bub" });
        var s = 8 + rnd(16);
        b.style.width = b.style.height = s + "px";
        b.style.left = (28 + rnd(44)) + "%";
        b.style.bottom = (8 + rnd(18)) + "%";
        b.style.setProperty("--dx", (rnd(40) - 20) + "px");
        b.style.setProperty("--rise", (120 + rnd(120)) + "px");
        b.style.animationDuration = (0.9 + Math.random() * 0.9) + "s";
        bubbles.appendChild(b);
        function rm() { if (b.parentNode) b.parentNode.removeChild(b); nBub--; }
        b.addEventListener("animationend", rm);
        T.set(rm, 2400);
      }
      function shake(amount) {
        if (phase !== "shake") return;
        var now = Date.now();
        if (amount > 5 && now - lastShake < 140) return;
        lastShake = now;
        fizz = Math.min(100, fizz + amount);
        meterFill.style.transform = "scaleX(" + (fizz / 100) + ")";
        meter.setAttribute("aria-valuenow", String(Math.round(fizz)));
        flask.classList.remove("is-wobble"); void flask.offsetWidth; flask.classList.add("is-wobble");
        bubble(); bubble();
        api.sfx("pop");
        if (fizz >= 100) win();
      }
      function win() {
        if (finished) return;
        finished = true; phase = "done";
        wrap.classList.add("is-fizz");
        for (var i = 0; i < 10; i++) T.set(bubble, i * 60);
        msg.textContent = "BOEM! Wat een grote bruisbal!";
        shakeBtn.disabled = true;
        api.sfx("fizz"); api.burst(flask);
        T.set(function () { api.burst(flask); api.done(3); }, 700);
      }
      shakeBtn.addEventListener("click", function () { shake(4.5); });

      var foam = api.el("div", { "class": "lab-foam", "aria-hidden": "true" });
      for (var f = 0; f < 6; f++) { var fe = api.el("span", { "class": "lab-foam-b" }); fe.style.setProperty("--i", String(f)); foam.appendChild(fe); }
      flask.appendChild(foam);

      wrap.appendChild(flask); wrap.appendChild(ingRow); wrap.appendChild(meterBox); wrap.appendChild(msg);
      host.appendChild(wrap);
      return function () { T.kill(); if (typeof stopMotion === "function") try { stopMotion(); } catch (e) {} };
    }
  });

  /* ---------- teken ---------- */
  Quest.game("teken", {
    titel: "Teken je droomlokaal",
    icoon: "🎨",
    render: function (host, o, api) {
      var T = timers();
      var wrap = wrapEl(api, "teken-wrap");
      var msg = msgEl(api, "Kies een kleur en teken met je vinger.");
      var COLORS = [["#1b1b1f", "Zwart"], ["#e5484d", "Rood"], ["#f39200", "Oranje"], ["#f5c400", "Geel"], ["#2f9e5c", "Groen"], ["#2f7de1", "Blauw"]];
      var canvas = api.el("canvas", { "class": "teken-canvas", "aria-label": "Tekenvlak" });
      var ctx = canvas.getContext("2d");
      var strokes = [], cur = null, color = COLORS[0][0], size = 5, erase = false, drawn = 0, finished = false, dpr = 1, cssW = 0, cssH = 0;

      var toolbar = api.el("div", { "class": "teken-tools", role: "group", "aria-label": "Gereedschap" });
      var swatches = COLORS.map(function (c) {
        var b = api.el("button", { type: "button", "class": "teken-sw", "aria-label": c[1], "aria-pressed": "false" });
        b.style.setProperty("--c", c[0]);
        b.addEventListener("click", function () { color = c[0]; erase = false; sync(); api.sfx("tap"); });
        b._c = c[0]; toolbar.appendChild(b); return b;
      });
      var sSmall = api.el("button", { type: "button", "class": "teken-size", "aria-label": "Dun penseel", "aria-pressed": "true" }, api.el("span", { "class": "teken-dot s" }));
      var sBig = api.el("button", { type: "button", "class": "teken-size", "aria-label": "Dik penseel", "aria-pressed": "false" }, api.el("span", { "class": "teken-dot b" }));
      var eraser = api.el("button", { type: "button", "class": "teken-size teken-eraser", "aria-label": "Gum", "aria-pressed": "false", text: "🧽" });
      sSmall.addEventListener("click", function () { size = 5; erase = false; sync(); });
      sBig.addEventListener("click", function () { size = 16; erase = false; sync(); });
      eraser.addEventListener("click", function () { erase = !erase; sync(); });
      toolbar.appendChild(sSmall); toolbar.appendChild(sBig); toolbar.appendChild(eraser);
      function sync() {
        swatches.forEach(function (b) { var on = !erase && b._c === color; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
        sSmall.setAttribute("aria-pressed", String(!erase && size === 5)); sSmall.classList.toggle("is-on", !erase && size === 5);
        sBig.setAttribute("aria-pressed", String(!erase && size === 16)); sBig.classList.toggle("is-on", !erase && size === 16);
        eraser.setAttribute("aria-pressed", String(erase)); eraser.classList.toggle("is-on", erase);
      }

      var clearBtn = api.el("button", { type: "button", "class": "btn ghost", text: "Wis alles" });
      var saveBtn = api.el("button", { type: "button", "class": "btn ghost", text: "Bewaar" });
      var okBtn = api.el("button", { type: "button", "class": "btn", text: "Klaar", disabled: "disabled" });
      var frame = api.el("div", { "class": "teken-frame" }, canvas);

      function drawStroke(s) {
        ctx.save();
        ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
        ctx.strokeStyle = s.color; ctx.fillStyle = s.color;
        ctx.lineWidth = s.size; ctx.lineCap = "round"; ctx.lineJoin = "round";
        var p = s.pts;
        if (p.length === 1) {
          ctx.beginPath(); ctx.arc(p[0][0], p[0][1], s.size / 2, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
          for (var i = 1; i < p.length - 1; i++) {
            var mx = (p[i][0] + p[i + 1][0]) / 2, my = (p[i][1] + p[i + 1][1]) / 2;
            ctx.quadraticCurveTo(p[i][0], p[i][1], mx, my);
          }
          var l = p[p.length - 1]; ctx.lineTo(l[0], l[1]);
          ctx.stroke();
        }
        ctx.restore();
      }
      function redraw() {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, cssW, cssH);
        strokes.forEach(drawStroke);
      }
      function resize() {
        var w = frame.clientWidth;
        if (!w || (w === cssW)) return;
        dpr = Math.min(window.devicePixelRatio || 1, 3);
        cssW = w; cssH = Math.round(w * 0.78);
        canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
        canvas.style.height = cssH + "px";
        redraw();
      }
      function pt(e) { var r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
      canvas.addEventListener("pointerdown", function (e) {
        if (finished || cur) return;
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        try { canvas.setPointerCapture(e.pointerId); } catch (x) {}
        cur = { pts: [pt(e)], color: color, size: erase ? 28 : size, erase: erase, id: e.pointerId };
        strokes.push(cur); drawStroke(cur);
      });
      canvas.addEventListener("pointermove", function (e) {
        if (!cur || e.pointerId !== cur.id) return;
        e.preventDefault();
        var p = pt(e), l = cur.pts[cur.pts.length - 1];
        if (Math.abs(p[0] - l[0]) + Math.abs(p[1] - l[1]) < 1.5) return;
        cur.pts.push(p);
        if (cur.pts.length === 2) { redraw(); } else {
          var n = cur.pts.length, a = cur.pts[n - 3], b = cur.pts[n - 2];
          ctx.save();
          ctx.globalCompositeOperation = cur.erase ? "destination-out" : "source-over";
          ctx.strokeStyle = cur.color; ctx.lineWidth = cur.size; ctx.lineCap = "round"; ctx.lineJoin = "round";
          ctx.beginPath(); ctx.moveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
          ctx.quadraticCurveTo(b[0], b[1], (b[0] + p[0]) / 2, (b[1] + p[1]) / 2); ctx.stroke(); ctx.restore();
        }
      });
      function up(e) {
        if (!cur || e.pointerId !== cur.id) return;
        if (!cur.erase) { drawn++; if (drawn >= 3 && !finished) { okBtn.disabled = false; msg.textContent = "Mooi bezig! Tik op Klaar als je klaar bent."; } }
        redraw();
        cur = null;
      }
      canvas.addEventListener("pointerup", up);
      canvas.addEventListener("pointercancel", up);

      clearBtn.addEventListener("click", function () { if (finished) return; strokes = []; drawn = 0; redraw(); okBtn.disabled = true; api.sfx("whoosh"); msg.textContent = "Schoon vel! Begin opnieuw."; });
      okBtn.addEventListener("click", function () {
        if (finished || okBtn.disabled) return;
        finished = true; okBtn.disabled = true; clearBtn.disabled = true;
        wrap.classList.add("is-solved");
        msg.textContent = "Wat mooi! Een echte kunstenaar.";
        api.sfx("win"); api.burst(frame);
        T.set(function () { api.done(3); }, 400);
      });
      saveBtn.addEventListener("click", function () {
        var c2 = document.createElement("canvas");
        c2.width = canvas.width; c2.height = canvas.height;
        var x2 = c2.getContext("2d");
        x2.fillStyle = "#fffaf0"; x2.fillRect(0, 0, c2.width, c2.height);
        x2.drawImage(canvas, 0, 0);
        function dl(url, rev) {
          var a = document.createElement("a"); a.href = url; a.download = "mijn-tekening.png";
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          if (rev) T.set(function () { URL.revokeObjectURL(url); }, 4000);
        }
        try {
          if (c2.toBlob) c2.toBlob(function (b) { if (b) dl(URL.createObjectURL(b), true); }, "image/png");
          else dl(c2.toDataURL("image/png"), false);
        } catch (e) { msg.textContent = "Bewaren lukt hier niet."; }
      });

      wrap.appendChild(toolbar);
      wrap.appendChild(frame);
      wrap.appendChild(msg);
      wrap.appendChild(api.el("div", { "class": "g-row ga-actions" }, clearBtn, saveBtn, okBtn));
      host.appendChild(wrap);
      sync();
      resize();
      T.set(resize, 50);
      var ro = null, onWin = function () { resize(); };
      if (window.ResizeObserver) { ro = new ResizeObserver(function () { resize(); }); ro.observe(frame); }
      window.addEventListener("resize", onWin);
      return function () {
        T.kill();
        if (ro) ro.disconnect();
        window.removeEventListener("resize", onWin);
      };
    }
  });
})();
