/* Mini-games B: scherm, automaat, getal, vang, stroom, typen, sorteer, woord */
(function () {
  "use strict";

  /* ---------- hulpjes ---------- */
  function tracker() {
    var list = [];
    return {
      timeout: function (f, ms) { var id = setTimeout(f, ms); list.push(["t", id]); return id; },
      interval: function (f, ms) { var id = setInterval(f, ms); list.push(["i", id]); return id; },
      listen: function (t, ev, fn, opt) { t.addEventListener(ev, fn, opt); list.push(["l", t, ev, fn, opt]); },
      clear: function () {
        list.forEach(function (x) {
          if (x[0] === "t") clearTimeout(x[1]);
          else if (x[0] === "i") clearInterval(x[1]);
          else x[1].removeEventListener(x[2], x[3], x[4]);
        });
        list = [];
      }
    };
  }
  function money(c) { return "€ " + (c / 100).toFixed(2).replace(".", ","); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function setup(host, api, cls) {
    host.classList.add("gb", cls);
    if (api.reduced) host.classList.add("gb-red");
  }
  function shake(node, api, T) {
    node.classList.remove("gb-shake", "gb-flash");
    void node.offsetWidth;
    if (!api.reduced) node.classList.add("gb-shake");
    node.classList.add("gb-flash");
    T.timeout(function () { node.classList.remove("gb-shake", "gb-flash"); }, 520);
  }
  function msgEl(api) { return api.el("p", { class: "g-msg gb-msg", "aria-live": "polite" }); }
  function say(m, text, kind) {
    m.textContent = text || "";
    m.className = "g-msg gb-msg" + (kind ? " is-" + kind : "");
  }
  function once(fn) { var d = false; return function () { if (d) return; d = true; fn.apply(null, arguments); }; }

  /* =========================================================
     1. SCHERM
     ========================================================= */
  Quest.game("scherm", {
    titel: "Lees het scherm", icoon: "📺",
    render: function (host, o, api) {
      setup(host, api, "scherm");
      var T = tracker(), E = api.el, mistakes = 0, finished = false;
      var DAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
      var rows = [
        ["1e uur", "Nederlands 1A", "Gaat door", "ok"],
        ["2e uur", "Geschiedenis 1C", "Gaat door", "ok"],
        ["3e uur", "Engels 2B", "VERVALT", "bad"],
        ["4e uur", "Wiskunde 1D", "Verplaatst naar B22", "move"],
        ["Pauze", "Aula", "Aula open", "info"],
        ["5e uur", "Biologie 2A", "Lokaal B05", "ok"]
      ];
      var clock = E("span", { class: "scherm-clock", text: "00:00:00" });
      var now = new Date();
      var head = E("div", { class: "scherm-head" },
        E("div", { class: "scherm-title" }, E("span", { class: "scherm-dot" }), E("span", { text: "ROOSTERWIJZIGINGEN" })),
        E("div", { class: "scherm-time" }, E("span", { class: "scherm-day", text: DAGEN[now.getDay()] }), clock));
      var thead = E("div", { class: "scherm-row scherm-th", "aria-hidden": "true" },
        E("span", { text: "Uur" }), E("span", { text: "Les" }), E("span", { text: "Status" }));
      var list = E("div", { class: "scherm-list", role: "table", "aria-label": "Rooster van vandaag" });
      var rowEls = rows.map(function (r) {
        var d = E("div", { class: "scherm-row is-" + r[3], role: "row" },
          E("span", { class: "scherm-uur", text: r[0] }),
          E("span", { class: "scherm-les", text: r[1] }),
          E("span", { class: "scherm-st", text: r[2] }));
        list.appendChild(d);
        return d;
      });
      var tickTxt = "Welkom op het Vellesan College  •  Pauze: aula open  •  Vergeet je kluissleutel niet  •  Fijne dag!  •  ";
      var tick = E("div", { class: "scherm-ticker", "aria-hidden": "true" },
        E("div", { class: "scherm-tickin" }, E("span", { text: tickTxt }), E("span", { text: tickTxt })));
      var screen = E("div", { class: "scherm-tv" }, head, thead, list, tick, E("div", { class: "scherm-shine", "aria-hidden": "true" }));
      var stand = E("div", { class: "scherm-stand", "aria-hidden": "true" });
      var q = E("p", { class: "scherm-q", text: "Welke les gaat niet door?" });
      var msg = msgEl(api);
      var opts = api.shuffle(["Engels 2B", "Wiskunde 1D", "Nederlands 1A", "Biologie 2A"]);
      var grid = E("div", { class: "scherm-opts" });
      opts.forEach(function (t) {
        var b = E("button", { type: "button", class: "btn ghost scherm-opt", text: t });
        b.onclick = function () {
          if (finished) return;
          if (t === "Engels 2B") {
            finished = true;
            b.classList.add("is-right");
            rowEls[2].classList.add("is-found");
            api.sfx("good"); api.burst(b);
            say(msg, "Goed gezien! Engels 2B vervalt.", "good");
            Array.prototype.forEach.call(grid.children, function (x) { x.disabled = true; });
            T.timeout(function () { api.done(Math.max(1, 3 - mistakes)); }, 700);
          } else {
            mistakes++;
            b.disabled = true; b.classList.add("is-wrong");
            api.sfx("bad"); shake(b, api, T); shake(screen, api, T);
            say(msg, mistakes === 1 ? "Nee. Zoek het rode woord VERVALT op het scherm." : "Bijna! Kijk goed naar de rode regel.", "bad");
            rowEls[2].classList.add("is-hint");
          }
        };
        grid.appendChild(b);
      });
      host.appendChild(screen); host.appendChild(stand); host.appendChild(q); host.appendChild(grid); host.appendChild(msg);

      function tickClock() {
        var d = new Date();
        clock.textContent = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      }
      tickClock(); T.interval(tickClock, 1000);
      var hot = 0;
      function rotate() {
        rowEls.forEach(function (r, i) { r.classList.toggle("is-hot", i === hot); });
        hot = (hot + 1) % rowEls.length;
      }
      rotate(); if (!api.reduced) T.interval(rotate, 1500);
      return function () { T.clear(); };
    }
  });

  /* =========================================================
     2. AUTOMAAT
     ========================================================= */
  Quest.game("automaat", {
    titel: "Koop iets lekkers", icoon: "🥤",
    render: function (host, o, api) {
      setup(host, api, "automaat");
      var T = tracker(), E = api.el, BUDGET = 300, finished = false;
      var items = [
        { id: "water", n: "Water", e: "💧", p: 100 },
        { id: "appelsap", n: "Appelsap", e: "🧃", p: 120 },
        { id: "choco", n: "Chocomelk", e: "🥛", p: 150 },
        { id: "banaan", n: "Banaan", e: "🍌", p: 60 },
        { id: "krent", n: "Krentenbol", e: "🍞", p: 80 },
        { id: "muesli", n: "Mueslireep", e: "🥜", p: 110 },
        { id: "chips", n: "Chips", e: "🍟", p: 140 },
        { id: "koek", n: "Koek", e: "🍪", p: 90 }
      ];
      var chosen = []; // ids
      var display = E("div", { class: "automaat-display", "aria-live": "polite" });
      var lblSmall = E("span", { class: "automaat-lbl", text: "Je hebt nog" });
      var dText = E("span", { class: "automaat-amount", text: money(BUDGET) });
      display.appendChild(lblSmall); display.appendChild(dText);
      var shelf = E("div", { class: "automaat-shelf" });
      var btns = {};
      items.forEach(function (it, i) {
        var b = E("button", { type: "button", class: "automaat-item", "aria-pressed": "false", "aria-label": it.n + " " + money(it.p) },
          E("span", { class: "automaat-code", text: "A" + (i + 1) }),
          E("span", { class: "automaat-emo", text: it.e }),
          E("span", { class: "automaat-name", text: it.n }),
          E("span", { class: "automaat-price", text: money(it.p) }));
        b.onclick = function () { toggle(it.id); };
        btns[it.id] = b; shelf.appendChild(b);
      });
      var glass = E("div", { class: "automaat-glass" }, shelf, E("div", { class: "automaat-reflect", "aria-hidden": "true" }));
      var tray = E("div", { class: "automaat-tray", "aria-label": "Jouw mandje" });
      var slot = E("div", { class: "automaat-slot" }, tray);
      var pay = E("button", { type: "button", class: "btn automaat-pay", text: "Betaal" });
      var msg = msgEl(api);
      var side = E("div", { class: "automaat-side" }, display, slot, pay);
      var body = E("div", { class: "automaat-body" }, glass, side);
      var machine = E("div", { class: "automaat-machine" }, E("div", { class: "automaat-top", "aria-hidden": "true" }, E("span", { text: "SNACK & DRINK" })), body);
      host.appendChild(machine); host.appendChild(msg);

      function total() { return chosen.reduce(function (s, id) { return s + find(id).p; }, 0); }
      function find(id) { for (var i = 0; i < items.length; i++) if (items[i].id === id) return items[i]; }
      function refresh() {
        var left = BUDGET - total();
        display.classList.toggle("is-over", left < 0);
        if (left < 0) { lblSmall.textContent = "Te veel"; dText.textContent = "- " + money(-left); }
        else { lblSmall.textContent = "Je hebt nog"; dText.textContent = money(left); }
        items.forEach(function (it) {
          var on = chosen.indexOf(it.id) >= 0;
          btns[it.id].classList.toggle("is-on", on);
          btns[it.id].setAttribute("aria-pressed", on ? "true" : "false");
        });
        tray.textContent = "";
        if (!chosen.length) tray.appendChild(E("span", { class: "automaat-empty", text: "Tik op iets lekkers" }));
        chosen.forEach(function (id) {
          var it = find(id);
          var c = E("button", { type: "button", class: "automaat-chip", "aria-label": it.n + " weghalen" }, E("span", { text: it.e }), E("small", { text: money(it.p) }));
          c.onclick = function () { if (!finished) toggle(id); };
          tray.appendChild(c);
        });
      }
      function toggle(id) {
        if (finished) return;
        var i = chosen.indexOf(id);
        if (i >= 0) { chosen.splice(i, 1); api.sfx("pop"); }
        else { chosen.push(id); api.sfx("tap"); }
        say(msg, "");
        refresh();
      }
      pay.onclick = function () {
        if (finished) return;
        var t = total();
        if (!chosen.length) { say(msg, "Kies eerst iets lekkers.", "bad"); api.sfx("bad"); return; }
        if (t > BUDGET) {
          api.sfx("bad");
          display.classList.remove("is-blink"); void display.offsetWidth; display.classList.add("is-blink");
          lblSmall.textContent = "Te weinig geld"; dText.textContent = "€ " + (BUDGET / 100).toFixed(2).replace(".", ",");
          say(msg, "Te weinig geld! Haal iets weg met een tik.", "bad");
          T.timeout(function () { display.classList.remove("is-blink"); refresh(); }, 1600);
          return;
        }
        finished = true;
        pay.disabled = true;
        Array.prototype.forEach.call(shelf.children, function (b) { b.disabled = true; });
        api.sfx("coin"); T.timeout(function () { api.sfx("coin"); }, 160);
        say(msg, "Betaald! Je krijgt " + money(BUDGET - t) + " terug.", "good");
        display.classList.add("is-paid");
        lblSmall.textContent = "Wisselgeld"; dText.textContent = money(BUDGET - t);
        Array.prototype.forEach.call(tray.children, function (c, i) {
          c.disabled = true;
          c.style.transitionDelay = (api.reduced ? 0 : i * 140) + "ms";
          c.classList.add("is-drop");
        });
        T.timeout(function () { api.sfx("unlock"); api.burst(slot); }, 500);
        T.timeout(function () { api.done(3); }, 1300);
      };
      refresh();
      return function () { T.clear(); };
    }
  });

  /* =========================================================
     3. GETAL
     ========================================================= */
  Quest.game("getal", {
    titel: "Raad het getal", icoon: "🔢",
    render: function (host, o, api) {
      setup(host, api, "getal");
      var T = tracker(), E = api.el, MAX = 10;
      var secret = 1 + Math.floor(Math.random() * 100);
      var lo = 1, hi = 100, tries = 0, entry = "", finished = false, seen = {};
      var counter = E("div", { class: "getal-count", text: "Poging 1 van " + MAX });
      var disp = E("div", { class: "getal-disp", "aria-live": "polite", text: "?" });
      var arrow = E("div", { class: "getal-arrow", "aria-hidden": "true", text: "🌡️" });
      var word = E("div", { class: "getal-word", text: "Begin maar!" });
      var hintEl = E("div", { class: "getal-hint", text: "Het getal ligt tussen 1 en 100." });
      var range = E("div", { class: "getal-range" });
      var fill = E("div", { class: "getal-fill" });
      var mark = E("div", { class: "getal-mark" }, E("span", { class: "getal-pin" }));
      var track = E("div", { class: "getal-track", "aria-hidden": "true" }, fill, range, mark);
      var scale = E("div", { class: "getal-scale", "aria-hidden": "true" }, E("span", { text: "1" }), E("span", { text: "100" }));
      var heat = E("div", { class: "getal-thermo" },
        E("div", { class: "getal-bulb", "aria-hidden": "true" }), E("div", { class: "getal-tube" }, track, scale));
      var top = E("div", { class: "getal-top" }, arrow, E("div", { class: "getal-fb" }, word, hintEl));
      var hist = E("div", { class: "getal-hist", "aria-label": "Je pogingen" });
      var msg = msgEl(api);
      var keys = E("div", { class: "getal-keys" });
      function key(label, cls, fn, aria) {
        var b = E("button", { type: "button", class: "getal-key " + (cls || ""), text: label });
        if (aria) b.setAttribute("aria-label", aria);
        b.onclick = function () { if (!finished) fn(); };
        keys.appendChild(b);
      }
      [7, 8, 9, 4, 5, 6, 1, 2, 3].forEach(function (n) { key(String(n), "", function () { digit(n); }); });
      key("Wis", "is-wis", function () { entry = entry.slice(0, -1); show(); api.sfx("tap"); }, "Wis");
      key("0", "", function () { digit(0); });
      key("Raad", "is-go", guess, "Raad");
      host.appendChild(counter); host.appendChild(top); host.appendChild(heat); host.appendChild(disp);
      host.appendChild(keys); host.appendChild(hist); host.appendChild(msg);

      function digit(n) {
        if (entry.length >= 3) return;
        entry += n; api.sfx("tap"); show();
      }
      function show() {
        disp.textContent = entry || "?";
        disp.classList.toggle("is-empty", !entry);
      }
      function setRange() {
        range.style.transform = "translateX(" + ((lo - 1) / 100 * 100) + "%) scaleX(" + ((hi - lo + 1) / 100) + ")";
      }
      function pin(n) { mark.style.transform = "translateX(" + ((n - 0.5)) + "%)"; mark.classList.add("is-on"); }
      function heatInfo(d) {
        if (d <= 3) return ["Kokend heet!", "hot", 0.97];
        if (d <= 8) return ["Heel warm", "hot", 0.85];
        if (d <= 20) return ["Warm", "warm", 0.65];
        if (d <= 40) return ["Koud", "cool", 0.38];
        return ["IJskoud", "cold", 0.14];
      }
      function chip(n, dir) {
        hist.appendChild(E("span", { class: "getal-chip" + (dir === 0 ? " is-right" : ""), text: (dir > 0 ? "↑ " : dir < 0 ? "↓ " : "✓ ") + n }));
      }
      function guess() {
        if (!entry) { say(msg, "Tik eerst een getal.", "bad"); return; }
        var n = parseInt(entry, 10);
        if (n < 1 || n > 100) { say(msg, "Kies een getal van 1 tot en met 100.", "bad"); api.sfx("bad"); entry = ""; show(); return; }
        if (seen[n]) { say(msg, "Dat getal had je al.", "bad"); api.sfx("bad"); entry = ""; show(); return; }
        seen[n] = true; tries++; entry = ""; show();
        pin(n);
        var d = Math.abs(n - secret), h = heatInfo(d);
        fill.className = "getal-fill is-" + h[1];
        fill.style.transform = "scaleX(" + h[2] + ")";
        if (n === secret) {
          finished = true;
          chip(n, 0);
          arrow.textContent = "🎯"; arrow.className = "getal-arrow is-right";
          word.textContent = "Gevonden!"; word.className = "getal-word is-good";
          disp.textContent = String(n);
          fill.className = "getal-fill is-hot"; fill.style.transform = "scaleX(1)";
          api.sfx("win"); api.burst(disp);
          say(msg, "Super! Je had " + tries + " " + (tries === 1 ? "poging" : "pogingen") + " nodig.", "good");
          var stars = tries <= 6 ? 3 : tries <= 9 ? 2 : 1;
          T.timeout(function () { api.done(stars); }, 800);
          return;
        }
        var up = secret > n;
        if (up) lo = Math.max(lo, n + 1); else hi = Math.min(hi, n - 1);
        setRange(); hintEl.textContent = "Het getal ligt tussen " + lo + " en " + hi + ".";
        chip(n, up ? 1 : -1);
        arrow.textContent = up ? "⬆" : "⬇";
        arrow.className = "getal-arrow " + (up ? "is-up" : "is-down") + " is-" + h[1];
        void arrow.offsetWidth; arrow.classList.add("is-pop");
        word.textContent = (up ? "Hoger!" : "Lager!") + " " + h[0];
        word.className = "getal-word is-" + h[1];
        api.sfx(up ? "note:7" : "note:2");
        if (tries >= MAX) {
          finished = true;
          disp.textContent = String(secret);
          word.textContent = "Het getal was " + secret; word.className = "getal-word";
          say(msg, "Helaas, het was " + secret + ". Goed geprobeerd!", "bad");
          T.timeout(function () { api.done(1); }, 1400);
          return;
        }
        counter.textContent = "Poging " + (tries + 1) + " van " + MAX;
        say(msg, "");
      }
      setRange();
      return function () { T.clear(); };
    }
  });

  /* =========================================================
     4. VANG
     ========================================================= */
  Quest.game("vang", {
    titel: "Vang de blaadjes", icoon: "🍃",
    render: function (host, o, api) {
      setup(host, api, "vang");
      var T = tracker(), E = api.el, DUUR = 20000, reduced = !!api.reduced;
      var score = 0, running = false, raf = 0, leaves = [], last = 0, nextSpawn = 0, endAt = 0, startedOnce = false, doneCalled = false;
      var LEAF = ["🍃", "🍂", "🍁"];
      var scoreEl = E("span", { class: "vang-score", text: "0" });
      var timeEl = E("span", { class: "vang-time", text: "20" });
      var bar = E("div", { class: "vang-bar", "aria-live": "off" },
        E("div", { class: "vang-stat" }, E("small", { text: "Gevangen" }), scoreEl),
        E("div", { class: "vang-stat" }, E("small", { text: "Tijd" }), timeEl));
      var timebar = E("div", { class: "vang-timebar", "aria-hidden": "true" }, E("div", { class: "vang-timefill" }));
      var fillEl = timebar.firstChild;
      var arena = E("div", { class: "vang-arena" });
      var overlay = E("div", { class: "vang-overlay" });
      arena.appendChild(overlay);
      var msg = msgEl(api);
      host.appendChild(bar); host.appendChild(timebar); host.appendChild(arena); host.appendChild(msg);
      var sun = E("div", { class: "vang-sun", "aria-hidden": "true" }); arena.insertBefore(sun, overlay);

      function showStart(text, btnText) {
        overlay.textContent = "";
        overlay.classList.remove("is-count");
        overlay.appendChild(E("div", { class: "vang-big", text: text }));
        var b = E("button", { type: "button", class: "btn vang-start", text: btnText });
        b.onclick = countdown;
        overlay.appendChild(b);
        overlay.style.display = "";
      }
      function countdown() {
        overlay.textContent = "";
        overlay.classList.add("is-count");
        var n = 3;
        function step() {
          overlay.textContent = "";
          overlay.appendChild(E("div", { class: "vang-count", text: n > 0 ? String(n) : "Go!" }));
          api.sfx(n > 0 ? "tick" : "whoosh");
          if (n === 0) { T.timeout(begin, 450); return; }
          n--; T.timeout(step, 800);
        }
        step();
      }
      function clearLeaves() { leaves.forEach(function (l) { if (l.el.parentNode) l.el.parentNode.removeChild(l.el); }); leaves = []; }
      function begin() {
        clearLeaves();
        overlay.style.display = "none";
        score = 0; scoreEl.textContent = "0"; running = true; startedOnce = true;
        last = 0; nextSpawn = 0; endAt = 0;
        raf = requestAnimationFrame(loop);
      }
      function place(l) {
        l.el.style.transform = "translate3d(" + l.x.toFixed(1) + "px," + l.y.toFixed(1) + "px,0) rotate(" + l.r.toFixed(0) + "deg)";
      }
      function spawn(now, W, H) {
        if (leaves.length >= 12) return;
        var size = 60;
        var inner = E("span", { class: "vang-leaf-in", text: LEAF[Math.floor(Math.random() * LEAF.length)] });
        var el = E("button", { type: "button", class: "vang-leaf", "aria-label": "Blaadje" }, inner);
        var l = { el: el, in_: inner, x: Math.random() * (W - size), y: reduced ? Math.random() * (H - size) : -size, r: Math.random() * 360,
          vy: 120 + Math.random() * 110, vr: (Math.random() - 0.5) * 120, born: now, caught: false, sw: Math.random() * 6, amp: 10 + Math.random() * 20 };
        l.x0 = l.x;
        el.addEventListener("pointerdown", function (e) {
          e.preventDefault();
          if (l.caught || !running) return;
          l.caught = true; score++; scoreEl.textContent = String(score);
          api.sfx("pop");
          el.classList.add("is-caught");
          var i = leaves.indexOf(l); if (i >= 0) leaves.splice(i, 1);
          T.timeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
        });
        place(l); arena.appendChild(el); leaves.push(l);
      }
      function loop(ts) {
        if (!running) return;
        if (!last) { last = ts; endAt = ts + DUUR; nextSpawn = ts; }
        var dt = Math.min(0.05, (ts - last) / 1000); last = ts;
        var W = arena.clientWidth, H = arena.clientHeight;
        if (ts >= nextSpawn) { spawn(ts, W, H); nextSpawn = ts + (reduced ? 650 : 380 + Math.random() * 380); }
        for (var i = leaves.length - 1; i >= 0; i--) {
          var l = leaves[i];
          if (reduced) {
            if (ts - l.born > 1400) { l.el.parentNode && l.el.parentNode.removeChild(l.el); leaves.splice(i, 1); }
            continue;
          }
          l.y += l.vy * dt; l.r += l.vr * dt;
          l.x = Math.max(0, Math.min(W - 60, l.x0 + Math.sin(ts / 600 + l.sw) * l.amp));
          if (l.y > H) { l.el.parentNode && l.el.parentNode.removeChild(l.el); leaves.splice(i, 1); continue; }
          place(l);
        }
        var left = Math.max(0, endAt - ts);
        timeEl.textContent = String(Math.ceil(left / 1000));
        fillEl.style.transform = "scaleX(" + (left / DUUR).toFixed(3) + ")";
        if (left <= 0) { finish(); return; }
        raf = requestAnimationFrame(loop);
      }
      function finish() {
        running = false; cancelAnimationFrame(raf);
        clearLeaves();
        timeEl.textContent = "0"; fillEl.style.transform = "scaleX(0)";
        var stars = score >= 15 ? 3 : score >= 8 ? 2 : 1;
        api.sfx(stars > 1 ? "win" : "good");
        overlay.textContent = ""; overlay.classList.remove("is-count");
        overlay.appendChild(E("div", { class: "vang-big", text: score + " blaadjes!" }));
        overlay.appendChild(E("div", { class: "vang-stars", "aria-hidden": "true", text: "★★★".slice(0, stars) + "☆☆☆".slice(0, 3 - stars) }));
        var b = E("button", { type: "button", class: "btn ghost vang-start", text: "Nog een keer" });
        b.onclick = countdown; overlay.appendChild(b);
        overlay.style.display = "";
        say(msg, stars === 3 ? "Wat een vangst!" : stars === 2 ? "Mooi gedaan!" : "Probeer het nog eens voor meer sterren.", "good");
        if (!doneCalled) { doneCalled = true; T.timeout(function () { api.done(stars); }, 900); }
      }
      showStart("Vang zo veel mogelijk blaadjes in 20 seconden!", "Start");
      return function () { running = false; cancelAnimationFrame(raf); T.clear(); };
    }
  });

  /* =========================================================
     5. STROOM
     ========================================================= */
  Quest.game("stroom", {
    titel: "Maak de stroomkring", icoon: "💡",
    render: function (host, o, api) {
      setup(host, api, "stroom");
      var T = tracker(), E = api.el, finished = false, moves = 0;
      var DR = [-1, 0, 1, 0], DC = [0, 1, 0, -1];
      // kinds: E elbow (N+E), S straight (N+S), B battery, L lamp, X leeg
      var layout = [
        ["E", "B", "E"],
        ["S", "X", "S"],
        ["E", "L", "E"]
      ];
      var target = { "0,0": 1, "0,2": 2, "2,2": 3, "2,0": 0, "1,2": 0, "1,0": 0 };
      var fixed = { "1,0": true };
      var rot = {}, cells = {};
      // startstanden
      var startRot = { "0,0": 2, "0,2": 0, "2,2": 1, "2,0": 3, "1,2": 1 };
      Object.keys(startRot).forEach(function (k) { rot[k] = startRot[k]; });
      rot["1,0"] = 0;
      // kleine variatie per keer
      if (Math.random() < 0.5) { rot["0,0"] = 3; rot["2,0"] = 1; }
      var minMoves = 0;
      Object.keys(target).forEach(function (k) {
        if (fixed[k]) return;
        var n = layout[k[0]][k[2]] === "S" ? 2 : 4;
        minMoves += (((target[k] - rot[k]) % n) + n) % n;
      });

      function conn(r, c) {
        var kind = layout[r][c], k = r + "," + c, a = rot[k] || 0;
        if (kind === "E") return [a % 4, (a + 1) % 4];
        if (kind === "S") return a % 2 === 0 ? [0, 2] : [1, 3];
        if (kind === "B" || kind === "L") return [1, 3];
        return [];
      }
      function trace(sr, sc, d, out) {
        var r = sr, c = sc, steps = 0;
        while (steps++ < 20) {
          r += DR[d]; c += DC[d];
          if (r < 0 || r > 2 || c < 0 || c > 2) return false;
          var cn = conn(r, c), enter = (d + 2) % 4;
          if (cn.indexOf(enter) < 0) return false;
          out.push(r + "," + c + "|" + steps);
          if (layout[r][c] === "L") return true;
          d = cn[0] === enter ? cn[1] : cn[0];
        }
        return false;
      }
      function evaluate() {
        var a = [], b = [];
        var ok1 = trace(0, 1, 1, a), ok2 = trace(0, 1, 3, b);
        return { ok: ok1 && ok2, powered: a.concat(b) };
      }

      var grid = E("div", { class: "stroom-grid", role: "group", "aria-label": "Schakelbord" });
      var msg = msgEl(api);
      var counter = E("div", { class: "stroom-count", text: "Draaien: 0" });
      var W = "stroke-linecap='round' stroke-linejoin='round' fill='none'";
      function wirePaths(kind) {
        if (kind === "E") return "M50 0V38Q50 50 62 50H100";
        if (kind === "S") return "M50 0V100";
        if (kind === "B") return "M0 50H40M56 50H100";
        if (kind === "L") return "M0 50H28M72 50H100";
        return "";
      }
      function svgFor(kind, k) {
        var p = wirePaths(kind), extra = "";
        if (kind === "B") extra = "<path class='stroom-plate' d='M40 28V72' stroke-width='5'/><path class='stroom-plate' d='M56 38V62' stroke-width='9'/><text x='28' y='24' class='stroom-sym'>+</text><text x='62' y='24' class='stroom-sym'>-</text>";
        if (kind === "L") extra = "<circle class='stroom-glass' cx='50' cy='50' r='22'/><path class='stroom-fil' d='M38 62L44 46L50 58L56 46L62 62' stroke-width='3'/><circle class='stroom-halo' cx='50' cy='50' r='34'/>";
        return "<svg viewBox='0 0 100 100' aria-hidden='true' focusable='false'><g " + W + ">" +
          "<path class='stroom-wire' d='" + p + "' stroke-width='10'/>" +
          "<path class='stroom-core' d='" + p + "' stroke-width='4'/>" +
          "<path class='stroom-glow' d='" + p + "' stroke-width='14'/>" + extra + "</g></svg>";
      }
      var order = [];
      for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
        (function (r, c) {
          var kind = layout[r][c], k = r + "," + c, node;
          if (kind === "X") {
            node = E("div", { class: "stroom-cell stroom-empty", "aria-hidden": "true" }, E("span", { text: "⚡" }));
          } else {
            var label = kind === "B" ? "Batterij" : kind === "L" ? "Lampje" : kind === "S" ? (fixed[k] ? "Draad" : "Schakelaar, tik om te draaien") : "Draadstuk, tik om te draaien";
            node = E(kind === "B" || kind === "L" || fixed[k] ? "div" : "button", { class: "stroom-cell stroom-" + kind + (fixed[k] || kind === "B" || kind === "L" ? " is-fixed" : ""), "aria-label": label });
            if (node.tagName === "BUTTON") node.type = "button";
            node.innerHTML = svgFor(kind, k);
            var svg = node.firstChild;
            cells[k] = { node: node, svg: svg, kind: kind };
            if (kind === "E" || kind === "S") {
              var deg = (rot[k] || 0) * 90;
              svg.style.transform = "rotate(" + deg + "deg)";
              cells[k].deg = deg;
              if (!fixed[k]) node.onclick = function () { turn(k); };
            }
          }
          grid.appendChild(node);
        })(r, c);
      }
      var lampLabel = E("div", { class: "stroom-lamp-lbl", "aria-hidden": "true", text: "Draai de stukken. Maak een gesloten kring." });
      host.appendChild(counter); host.appendChild(grid); host.appendChild(lampLabel); host.appendChild(msg);

      function turn(k) {
        if (finished) return;
        var cell = cells[k];
        rot[k] = (rot[k] + 1) % 4;
        cell.deg += 90;
        cell.svg.style.transform = "rotate(" + cell.deg + "deg)";
        moves++; counter.textContent = "Draaien: " + moves;
        api.sfx("tap");
        update();
      }
      function update() {
        var res = evaluate();
        var map = {};
        res.powered.forEach(function (s) { var p = s.split("|"); if (!map[p[0]] || map[p[0]] > +p[1]) map[p[0]] = +p[1]; });
        Object.keys(cells).forEach(function (k) {
          var cell = cells[k], on = !!map[k] && (res.ok || cell.kind !== "L");
          if (cell.kind === "B") on = res.ok;
          cell.node.classList.toggle("is-on", on);
          cell.node.style.setProperty("--d", ((map[k] || 0) * 0.12) + "s");
        });
        cells["0,1"].node.classList.toggle("is-on", res.ok);
        cells["2,1"].node.classList.toggle("is-lit", res.ok);
        if (res.ok && !finished) {
          finished = true;
          host.classList.add("is-closed");
          grid.classList.add("is-closed");
          Object.keys(cells).forEach(function (k) { if (cells[k].node.tagName === "BUTTON") cells[k].node.disabled = true; });
          api.sfx("unlock"); T.timeout(function () { api.sfx("win"); api.burst(cells["2,1"].node); }, 250);
          say(msg, "Het lampje brandt! De kring is dicht.", "good");
          var extra = moves - minMoves;
          var stars = extra <= 3 ? 3 : extra <= 9 ? 2 : 1;
          T.timeout(function () { api.done(stars); }, 1100);
        }
      }
      update();
      return function () { T.clear(); };
    }
  });

  /* =========================================================
     6. TYPEN
     ========================================================= */
  Quest.game("typen", {
    titel: "Typ-race", icoon: "⌨️",
    render: function (host, o, api) {
      setup(host, api, "typen");
      var T = tracker(), E = api.el, finished = false, started = false;
      var pool = (o.woorden && o.woorden.length ? o.woorden : ["school", "pauze", "rooster"]);
      var words = api.shuffle(pool).slice(0, 4);
      var idx = 0, t0 = 0, tid = 0;
      var timeEl = E("span", { class: "typen-time", text: "0,0" });
      var idxEl = E("span", { class: "typen-idx", text: "Woord 1 van " + words.length });
      var bar = E("div", { class: "typen-bar", "aria-hidden": "true" }, E("div", { class: "typen-barfill" }));
      var barFill = bar.firstChild;
      var stat = E("div", { class: "typen-stat" }, idxEl, E("span", { class: "typen-clock" }, timeEl, E("small", { text: " s" })));
      var wordEl = E("div", { class: "typen-word", "aria-live": "polite" });
      var input = E("input", { class: "typen-input", type: "text", autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "aria-label": "Typ het woord", placeholder: "Typ hier…", enterkeyhint: "go" });
      input.setAttribute("autocapitalize", "off"); input.setAttribute("autocorrect", "off"); input.spellcheck = false;
      var card = E("div", { class: "typen-card" }, wordEl, input);
      var start = E("button", { type: "button", class: "btn typen-start", text: "Start de race" });
      var msg = msgEl(api);
      input.disabled = true; card.classList.add("is-wait"); drawWord();
      host.appendChild(stat); host.appendChild(bar); host.appendChild(card); host.appendChild(start); host.appendChild(msg);

      function drawWord() {
        var w = words[idx], typed = input.value.toLowerCase();
        wordEl.textContent = "";
        for (var i = 0; i < w.length; i++) {
          var cls = "typen-ch";
          if (i < typed.length) cls += typed[i] === w[i].toLowerCase() ? " is-ok" : " is-no";
          else if (i === typed.length) cls += " is-next";
          wordEl.appendChild(E("span", { class: cls, text: w[i] }));
        }
        wordEl.setAttribute("aria-label", w);
      }
      function tick() { timeEl.textContent = ((Date.now() - t0) / 1000).toFixed(1).replace(".", ","); }
      start.onclick = function () {
        started = true; start.style.display = "none"; card.classList.remove("is-wait");
        input.disabled = false; input.focus();
        t0 = Date.now(); tid = T.interval(tick, 100);
        api.sfx("whoosh"); drawWord();
      };
      function next() {
        idx++;
        barFill.style.transform = "scaleX(" + (idx / words.length) + ")";
        input.value = "";
        if (idx >= words.length) { end(); return; }
        idxEl.textContent = "Woord " + (idx + 1) + " van " + words.length;
        wordEl.classList.remove("is-pop"); void wordEl.offsetWidth; wordEl.classList.add("is-pop");
        drawWord();
      }
      function end() {
        finished = true; clearInterval(tid); tick();
        var secs = (Date.now() - t0) / 1000;
        input.disabled = true; input.blur();
        var stars = secs < 25 ? 3 : secs < 45 ? 2 : 1;
        var txt = secs.toFixed(1).replace(".", ",");
        wordEl.textContent = "Klaar!";
        card.classList.add("is-done");
        say(msg, "Jouw tijd: " + txt + " seconden.", "good");
        api.sfx("win"); api.burst(card);
        T.timeout(function () { api.done(stars); }, 900);
      }
      input.addEventListener("input", function () {
        if (finished || !started) return;
        var w = words[idx], v = input.value.trim().toLowerCase();
        drawWord();
        if (v === w.toLowerCase()) { api.sfx("good"); next(); }
        else if (v.length >= w.length && v !== w.toLowerCase()) { card.classList.remove("gb-shake"); void card.offsetWidth; if (!api.reduced) card.classList.add("gb-shake"); }
      });
      return function () { clearInterval(tid); T.clear(); };
    }
  });

  /* =========================================================
     7. SORTEER
     ========================================================= */
  Quest.game("sorteer", {
    titel: "Sorteer de kaarten", icoon: "🗂️",
    render: function (host, o, api) {
      setup(host, api, "sorteer");
      var T = tracker(), E = api.el, mistakes = 0, finished = false, selected = false;
      var bakken = o.bakken || ["Links", "Rechts"];
      var items = api.shuffle(o.items || []);
      var total = items.length, sorted = 0, cardMiss = 0;
      var counts = [0, 0], need = [0, 0];
      items.forEach(function (it) { need[it[1]]++; });
      var msg = msgEl(api);
      var bucketEls = [], countEls = [];
      var bucketRow = E("div", { class: "sorteer-buckets" });
      bakken.forEach(function (name, i) {
        var cEl = E("span", { class: "sorteer-bcount", text: "0 / " + need[i] });
        var b = E("button", { type: "button", class: "sorteer-bucket b" + i, "aria-label": name }, E("span", { class: "sorteer-bicon", "aria-hidden": "true", text: i === 0 ? "🏛️" : "🏢" }), E("span", { class: "sorteer-bname", text: name }), cEl);
        b.onclick = function () { if (selected && !finished) place(i, null); };
        bucketEls.push(b); countEls.push(cEl); bucketRow.appendChild(b);
      });
      var stage = E("div", { class: "sorteer-stage" });
      var left = E("div", { class: "sorteer-left", "aria-live": "polite" });
      var cards = items.map(function (it, i) {
        var el = E("div", { class: "sorteer-card", tabindex: "0", role: "button", "aria-label": it[0] + ". Tik en kies een gebouw." }, E("span", { text: it[0] }));
        stage.appendChild(el);
        return { el: el, it: it };
      });
      host.appendChild(bucketRow); host.appendChild(stage); host.appendChild(left); host.appendChild(msg);

      function layout() {
        cards.forEach(function (c, i) {
          c.el.classList.toggle("is-top", i === 0);
          c.el.style.zIndex = String(50 - i);
          c.el.style.opacity = i > 2 ? "0" : String(1 - i * 0.25);
          c.el.style.transform = "translate3d(0," + (i * 9) + "px,0) scale(" + (1 - i * 0.05) + ")";
          c.el.tabIndex = i === 0 ? 0 : -1;
        });
        left.textContent = cards.length ? "Nog " + cards.length + (cards.length === 1 ? " kaart" : " kaarten") : "";
      }
      function setT(el, x, y, s, r) { el.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + (r || 0) + "deg) scale(" + (s || 1) + ")"; }
      function center(el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }

      function place(bi, from) {
        var c = cards[0]; if (!c) return;
        var el = c.el;
        selected = false; el.classList.remove("is-sel");
        if (c.it[1] === bi) {
          cards.shift();
          api.sfx("good");
          var bc = center(bucketEls[bi]), cc = center(el);
          var base = from || { x: 0, y: 0 };
          el.classList.add("is-fly"); el.style.zIndex = "99";
          if (api.reduced) { el.style.opacity = "0"; }
          else { setT(el, base.x + (bc.x - cc.x), base.y + (bc.y - cc.y), 0.25, 0); el.style.opacity = "0"; }
          T.timeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 520);
          counts[bi]++; sorted++;
          countEls[bi].textContent = counts[bi] + " / " + need[bi];
          bucketEls[bi].classList.remove("is-ok"); void bucketEls[bi].offsetWidth; bucketEls[bi].classList.add("is-ok");
          cardMiss = 0; say(msg, "");
          layout();
          if (sorted >= total) {
            finished = true;
            say(msg, "Alles gesorteerd!", "good");
            api.sfx("win"); api.burst(bucketRow);
            var stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
            T.timeout(function () { api.done(stars); }, 900);
          }
        } else {
          mistakes++; cardMiss++;
          api.sfx("bad");
          el.classList.add("is-back");
          el.classList.remove("is-drag");
          layout();
          shake(el.parentNode === stage ? bucketEls[bi] : bucketEls[bi], api, T);
          say(msg, "Nee, dat hoort daar niet. Probeer de andere.", "bad");
          if (cardMiss >= 3) bucketEls[1 - bi].classList.add("is-hint");
          T.timeout(function () { el.classList.remove("is-back"); }, 400);
        }
      }
      // slepen
      var drag = null;
      stage.addEventListener("pointerdown", function (e) {
        if (finished || !cards.length) return;
        var c = cards[0];
        if (!c.el.contains(e.target)) return;
        e.preventDefault();
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, c: c };
        try { c.el.setPointerCapture(e.pointerId); } catch (x) {}
        c.el.classList.add("is-drag");
      });
      T.listen(stage, "pointermove", function (e) {
        if (!drag || e.pointerId !== drag.id) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 8) drag.moved = true;
        if (drag.moved) {
          setT(drag.c.el, dx, dy, 1.05, dx / 18);
          var over = hit(e.clientX, e.clientY);
          bucketEls.forEach(function (b, i) { b.classList.toggle("is-over", i === over); });
        }
      });
      function endDrag(e, cancel) {
        if (!drag || e.pointerId !== drag.id) return;
        var d = drag; drag = null;
        d.c.el.classList.remove("is-drag");
        bucketEls.forEach(function (b) { b.classList.remove("is-over"); });
        if (cancel) { layout(); return; }
        if (!d.moved) {
          selected = !selected;
          d.c.el.classList.toggle("is-sel", selected);
          api.sfx("tap");
          say(msg, selected ? "Tik nu op het goede gebouw." : "");
          layout(); return;
        }
        var over = hit(e.clientX, e.clientY);
        if (over < 0) { d.c.el.classList.add("is-back"); layout(); T.timeout(function () { d.c.el.classList.remove("is-back"); }, 400); return; }
        place(over, { x: e.clientX - d.x, y: e.clientY - d.y });
      }
      T.listen(stage, "pointerup", function (e) { endDrag(e, false); });
      T.listen(stage, "pointercancel", function (e) { endDrag(e, true); });
      function hit(x, y) {
        for (var i = 0; i < bucketEls.length; i++) {
          var r = bucketEls[i].getBoundingClientRect();
          if (x >= r.left - 10 && x <= r.right + 10 && y >= r.top - 10 && y <= r.bottom + 10) return i;
        }
        return -1;
      }
      T.listen(stage, "keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { if (cards.length && e.target === cards[0].el) { e.preventDefault(); selected = !selected; cards[0].el.classList.toggle("is-sel", selected); } }
      });
      layout();
      return function () { T.clear(); };
    }
  });

  /* =========================================================
     8. WOORD
     ========================================================= */
  Quest.game("woord", {
    titel: "Zet de letters goed", icoon: "🔤",
    render: function (host, o, api) {
      setup(host, api, "woord");
      var T = tracker(), E = api.el, finished = false;
      var words = (o.woorden && o.woorden.length ? o.woorden : ["SCHOOL"]).map(function (w) { return String(w).toUpperCase(); });
      var wi = 0, hints = 0, busy = false;
      var wrap = E("div", { class: "woord-wrap" });
      var dots = E("div", { class: "woord-dots", "aria-hidden": "true" });
      var slotsEl = E("div", { class: "woord-slots", "aria-label": "Jouw woord" });
      var tilesEl = E("div", { class: "woord-tiles", "aria-label": "Letters" });
      var hintBtn = E("button", { type: "button", class: "btn ghost woord-hint", text: "💡 Hint (kost een ster)" });
      var msg = msgEl(api);
      host.appendChild(dots); host.appendChild(slotsEl); host.appendChild(tilesEl); host.appendChild(hintBtn); host.appendChild(msg);
      var word, slots, tiles, locked;

      function scramble(w) {
        var arr = w.split(""), out, n = 0;
        do { out = api.shuffle(arr); n++; } while (out.join("") === w && n < 30);
        return out;
      }
      function drawDots() {
        dots.textContent = "";
        words.forEach(function (_, i) { dots.appendChild(E("span", { class: "woord-dot" + (i < wi ? " is-done" : i === wi ? " is-cur" : "") })); });
      }
      function load() {
        word = words[wi]; busy = false;
        var letters = scramble(word);
        tiles = letters.map(function (l, i) { return { id: i, l: l, used: false }; });
        slots = word.split("").map(function () { return null; });
        locked = word.split("").map(function () { return false; });
        slotsEl.className = "woord-slots"; void slotsEl.offsetWidth;
        drawDots(); draw();
      }
      function draw() {
        slotsEl.textContent = ""; tilesEl.textContent = "";
        slots.forEach(function (tid, i) {
          var t = tid === null ? null : tiles[tid];
          var b = E("button", { type: "button", class: "woord-slot" + (t ? " is-filled" : "") + (locked[i] ? " is-locked" : ""), "aria-label": t ? "Letter " + t.l + " terugzetten" : "Lege plek " + (i + 1) });
          if (t) b.appendChild(E("span", { text: t.l }));
          b.style.setProperty("--i", i);
          b.onclick = function () { if (busy || finished || !t || locked[i]) return; slots[i] = null; t.used = false; api.sfx("pop"); draw(); };
          slotsEl.appendChild(b);
        });
        tiles.forEach(function (t) {
          var b = E("button", { type: "button", class: "woord-tile" + (t.used ? " is-used" : ""), text: t.l, "aria-label": "Letter " + t.l });
          b.disabled = t.used;
          b.onclick = function () { put(t); };
          tilesEl.appendChild(b);
        });
      }
      function put(t) {
        if (busy || finished || t.used) return;
        var i = slots.indexOf(null); if (i < 0) return;
        slots[i] = t.id; t.used = true; api.sfx("tap");
        draw(); check();
      }
      function check() {
        if (slots.indexOf(null) >= 0) return;
        var s = slots.map(function (id) { return tiles[id].l; }).join("");
        busy = true;
        if (s === word) {
          api.sfx("good"); slotsEl.classList.add("is-flip");
          slotsEl.classList.add("is-right");
          say(msg, "Goed! " + word.charAt(0) + word.slice(1).toLowerCase(), "good");
          T.timeout(function () {
            wi++;
            if (wi >= words.length) {
              finished = true; api.sfx("win"); api.burst(slotsEl);
              dots.textContent = ""; drawDots();
              T.timeout(function () { api.done(Math.max(1, 3 - hints)); }, 500);
            } else { say(msg, ""); load(); }
          }, api.reduced ? 700 : 1000);
        } else {
          api.sfx("bad"); shake(slotsEl, api, T);
          say(msg, "Nog niet goed. Probeer opnieuw.", "bad");
          T.timeout(function () {
            slots.forEach(function (id, i) { if (!locked[i]) { tiles[id].used = false; slots[i] = null; } });
            busy = false; draw();
          }, 560);
        }
      }
      hintBtn.onclick = function () {
        if (busy || finished) return;
        var i = -1;
        for (var k = 0; k < word.length; k++) {
          if (locked[k]) continue;
          if (slots[k] === null || tiles[slots[k]].l !== word[k]) { i = k; break; }
        }
        if (i < 0) return;
        if (slots[i] !== null) { tiles[slots[i]].used = false; slots[i] = null; }
        var t = null;
        for (var j = 0; j < tiles.length; j++) if (!tiles[j].used && tiles[j].l === word[i]) { t = tiles[j]; break; }
        if (!t) {
          // letter zit elders in een foute plek: haal die weg
          for (var s = 0; s < slots.length; s++) if (!locked[s] && slots[s] !== null && tiles[slots[s]].l === word[i]) { tiles[slots[s]].used = false; slots[s] = null; break; }
          for (j = 0; j < tiles.length; j++) if (!tiles[j].used && tiles[j].l === word[i]) { t = tiles[j]; break; }
        }
        if (!t) return;
        slots[i] = t.id; t.used = true; locked[i] = true; hints++;
        api.sfx("pop");
        say(msg, "Hint! De letter " + word[i] + " staat vast. " + (hints < 3 ? "Dat kost een ster." : ""), "");
        draw(); check();
      };
      load();
      return function () { T.clear(); };
    }
  });
})();
