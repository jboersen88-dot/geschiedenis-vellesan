/* Missie Vellesan: snelle spelletjes voor de speelhal (overal te spelen). Contract: GAMES.md */
(function () {
  "use strict";
  if (!window.Quest) return;
  function timerBar(api, secs, onEnd) {
    var bar = api.el("div", { class: "gc-timer", "aria-hidden": "true" }, api.el("i"));
    var t0 = 0, raf = 0, stopped = false;
    function tick(t) {
      if (stopped) return;
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / (secs * 1000));
      bar.firstChild.style.transform = "scaleX(" + (1 - p) + ")";
      if (p >= 1) { stopped = true; onEnd(); return; }
      raf = requestAnimationFrame(tick);
    }
    return { el: bar, start: function () { raf = requestAnimationFrame(tick); }, stop: function () { stopped = true; cancelAnimationFrame(raf); } };
  }

  /* Goed of fout? Korte zinnen over de school, zo snel mogelijk. */
  Quest.game("goedfout", { titel: "Goed of fout?", icoon: "⚡", render: function (host, o, api) {
    var el = api.el, items = api.shuffle(o.zinnen).slice(0, o.aantal || 8), i = 0, score = 0, ended = false, busy = false;
    var card = el("div", { class: "gc-card", "aria-live": "polite" }), count = el("p", { class: "gc-count" });
    var msg = el("p", { class: "g-msg", "aria-live": "polite" });
    var timer = timerBar(api, o.seconden || 45, finish);
    var bGoed = el("button", { type: "button", class: "btn big gc-goed", onclick: function () { answer(true); } }, "Goed");
    var bFout = el("button", { type: "button", class: "btn big ghost gc-fout", onclick: function () { answer(false); } }, "Fout");
    var row = el("div", { class: "gc-row" }, bGoed, bFout);
    var start = el("button", { type: "button", class: "btn big glow", onclick: function () { start.remove(); host.appendChild(row); timer.start(); show(); } }, "Start!");
    host.appendChild(timer.el); host.appendChild(count); host.appendChild(card); host.appendChild(msg); host.appendChild(start);
    card.appendChild(el("p", { class: "gc-big", text: "Lees de zin en tik op Goed of Fout. Je hebt " + (o.seconden || 45) + " seconden." }));
    function show() {
      busy = false;
      count.textContent = "Vraag " + (i + 1) + " van " + items.length + " · " + score + " goed";
      card.textContent = ""; var p = el("p", { class: "gc-big", text: items[i][0] }); card.appendChild(p);
      card.classList.remove("gc-in"); void card.offsetWidth; card.classList.add("gc-in");
    }
    function answer(v) {
      if (ended || busy) return; busy = true;
      var ok = v === items[i][1];
      if (ok) { score++; api.sfx("good"); msg.textContent = "Goed zo!"; }
      else { api.sfx("bad"); msg.textContent = "Juiste antwoord: " + (items[i][1] ? "Goed" : "Fout") + "."; }
      card.classList.remove("gc-ok", "gc-no"); void card.offsetWidth; card.classList.add(ok ? "gc-ok" : "gc-no");
      i++;
      if (i >= items.length) finish(); else setTimeout(function () { if (!ended) show(); }, 350);
    }
    function finish() {
      if (ended) return; ended = true; timer.stop();
      bGoed.disabled = bFout.disabled = true;
      card.textContent = ""; card.appendChild(el("p", { class: "gc-big", text: score + " van de " + items.length + " goed!" }));
      api.burst(card, 30);
      api.done(score >= items.length - 1 ? 3 : score >= items.length / 2 ? 2 : 1);
    }
    return function () { ended = true; timer.stop(); };
  } });

  /* Memory: vak en ding dat erbij hoort. */
  Quest.game("memory", { titel: "Vakken-memory", icoon: "🧠", render: function (host, o, api) {
    var el = api.el, cards = [], open = [], found = 0, moves = 0, lock = false;
    o.paren.forEach(function (p, k) { cards.push({ k: k, t: p[0], ic: p[1] }); cards.push({ k: k, t: p[0], ic: p[1], vak: true }); });
    cards = api.shuffle(cards);
    var grid = el("div", { class: "gc-mem" }), msg = el("p", { class: "g-msg", "aria-live": "polite", text: "Tik op twee kaarten." });
    cards.forEach(function (c) {
      var b = el("button", { type: "button", class: "gc-tile", "aria-label": "Verborgen kaart" },
        el("span", { class: "gc-back", "aria-hidden": "true", text: "V" }),
        el("span", { class: "gc-front" }, c.vak ? el("strong", { text: c.t }) : el("span", { class: "gc-ic", text: c.ic })));
      b.addEventListener("click", function () {
        if (lock || b.classList.contains("up")) return;
        b.classList.add("up"); b.setAttribute("aria-label", c.vak ? c.t : c.ic); api.sfx("tap");
        open.push({ c: c, b: b });
        if (open.length === 2) {
          moves++; lock = true;
          var a = open[0], z = open[1]; open = [];
          if (a.c.k === z.c.k && a.c.vak !== z.c.vak) {
            found++; api.sfx("good"); a.b.classList.add("got"); z.b.classList.add("got"); lock = false;
            msg.textContent = found < o.paren.length ? "Paar gevonden!" : "Alle paren gevonden!";
            if (found === o.paren.length) { api.burst(grid, 40); api.done(moves <= o.paren.length + 3 ? 3 : moves <= o.paren.length * 2 + 2 ? 2 : 1); }
          } else {
            api.sfx("bad");
            setTimeout(function () { a.b.classList.remove("up"); z.b.classList.remove("up"); a.b.setAttribute("aria-label", "Verborgen kaart"); z.b.setAttribute("aria-label", "Verborgen kaart"); lock = false; }, api.reduced ? 500 : 850);
          }
        }
      });
      grid.appendChild(b);
    });
    host.appendChild(grid); host.appendChild(msg);
  } });

  /* Waar is het? Op welke etage ligt deze plek. */
  Quest.game("etage", { titel: "Waar is het?", icoon: "🧭", render: function (host, o, api) {
    var el = api.el, items = api.shuffle(o.plekken), i = 0, score = 0, busy = false;
    var card = el("div", { class: "gc-card", "aria-live": "polite" }), msg = el("p", { class: "g-msg", "aria-live": "polite" }), count = el("p", { class: "gc-count" });
    var row = el("div", { class: "gc-row three" });
    o.etages.forEach(function (naam, k) { row.appendChild(el("button", { type: "button", class: "btn ghost big", onclick: function () { pick(k); } }, naam)); });
    function show() {
      busy = false;
      count.textContent = (i + 1) + " van " + items.length;
      card.textContent = ""; card.appendChild(el("p", { class: "gc-big", text: items[i][0] }));
      card.classList.remove("gc-in"); void card.offsetWidth; card.classList.add("gc-in");
    }
    function pick(k) {
      if (i >= items.length || busy) return; busy = true;
      var ok = k === items[i][1];
      if (ok) { score++; api.sfx("good"); msg.textContent = "Goed!"; } else { api.sfx("bad"); msg.textContent = "Juiste antwoord: " + o.etages[items[i][1]] + "."; }
      card.classList.remove("gc-ok", "gc-no"); void card.offsetWidth; card.classList.add(ok ? "gc-ok" : "gc-no");
      i++;
      if (i >= items.length) { card.textContent = ""; card.appendChild(el("p", { class: "gc-big", text: score + " van de " + items.length + " goed!" })); api.done(score >= items.length - 1 ? 3 : score >= items.length / 2 ? 2 : 1); }
      else setTimeout(show, 350);
    }
    host.appendChild(count); host.appendChild(card); host.appendChild(row); host.appendChild(msg);
    show();
  } });

  /* Het winkeltje (economie): kies een prijs voor je kraampje. Te duur? Dan lopen klanten door. */
  Quest.game("winkel", { titel: "Het winkeltje", icoon: "🏪", render: function (host, o, api) {
    var el = api.el, SECS = o.seconden || 30, waar = o.waar || ["🍪", "koek"];
    var MIN = 0.5, MAX = 3.5, STAP = 0.5, prijs = 1.5, omzet = 0, verkocht = 0, weg = 0, running = false, ended = false, spawnT = 0, timers = [];
    var GEZ = ["🧑", "👧", "👦", "👩", "🧓", "🧒", "👨", "👱"];
    // vaste verdeling van wat klanten willen betalen, geschud: eerlijk, niet puur geluk
    var wil = []; for (var k = 0; k < 40; k++) wil.push(MIN + (k + 0.5) * (MAX - MIN) / 40); wil = api.shuffle(wil); var wi = 0;
    function euro(v) { return "€ " + v.toFixed(2).replace(".", ","); }
    var prijsEl = el("output", { class: "wk-prijs", "aria-live": "polite", text: euro(prijs) });
    var min = el("button", { type: "button", class: "btn round ghost wk-pm", "aria-label": "Prijs omlaag", onclick: function () { zet(-STAP); } }, "−");
    var plus = el("button", { type: "button", class: "btn round ghost wk-pm", "aria-label": "Prijs omhoog", onclick: function () { zet(STAP); } }, "+");
    var omzetEl = el("strong", { text: euro(0) }), telEl = el("strong", { text: "0" });
    var stats = el("div", { class: "wk-stats" },
      el("div", null, el("small", { text: "Verdiend" }), omzetEl),
      el("div", null, el("small", { text: "Verkocht" }), telEl));
    var timer = timerBar(api, SECS, finish);
    var straat = el("div", { class: "wk-straat", "aria-hidden": "true" });
    var kraam = el("div", { class: "wk-kraam" },
      el("div", { class: "wk-dak", "aria-hidden": "true" }),
      el("div", { class: "wk-bord" }, el("span", { class: "wk-waar", "aria-hidden": "true", text: waar[0] }), prijsEl),
      el("div", { class: "wk-knoppen" }, min, el("span", { class: "wk-lbl", text: "Jouw prijs" }), plus));
    var scene = el("div", { class: "wk-scene" }, straat, kraam);
    var msg = el("p", { class: "g-msg", "aria-live": "polite", text: "Kies een prijs per " + waar[1] + ". Is hij te duur, dan lopen klanten door." });
    var start = el("button", { type: "button", class: "btn big glow", onclick: function () { start.remove(); running = true; timer.start(); msg.textContent = "Klanten komen eraan! Je mag de prijs steeds veranderen."; loop(); } }, "Open je kraampje!");
    host.appendChild(timer.el); host.appendChild(stats); host.appendChild(scene); host.appendChild(msg); host.appendChild(start);
    function zet(d) {
      if (ended) return;
      prijs = Math.max(MIN, Math.min(MAX, Math.round((prijs + d) * 2) / 2));
      prijsEl.textContent = euro(prijs); api.sfx("tick");
      prijsEl.classList.remove("bump"); void prijsEl.offsetWidth; prijsEl.classList.add("bump");
      min.disabled = prijs <= MIN; plus.disabled = prijs >= MAX;
    }
    function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
    function loop() {
      if (!running) return;
      klant();
      spawnT = later(loop, api.reduced ? 1100 : 850 + Math.random() * 300);
    }
    function klant() {
      var max = wil[wi++ % wil.length], koopt = prijs <= max + 0.001;
      var p = el("span", { class: "wk-klant" }, el("span", { class: "wk-gez", text: GEZ[Math.floor(Math.random() * GEZ.length)] }),
        el("span", { class: "wk-bubbel" + (koopt ? " ja" : " nee"), text: koopt ? "+" + euro(prijs).slice(2) : "Te duur!" }));
      straat.appendChild(p);
      requestAnimationFrame(function () { p.classList.add("in"); });
      later(function () {
        if (ended) return;
        p.classList.add("praat");
        if (koopt) { omzet += prijs; verkocht++; omzetEl.textContent = euro(omzet); telEl.textContent = String(verkocht); api.sfx("coin"); }
        else { weg++; api.sfx("tap"); }
        later(function () { p.classList.add("uit"); later(function () { p.remove(); }, 600); }, 650);
      }, api.reduced ? 50 : 700);
    }
    function finish() {
      if (ended) return; ended = true; running = false; clearTimeout(spawnT);
      min.disabled = plus.disabled = true;
      Array.prototype.forEach.call(straat.children, function (k) { k.classList.add("uit"); });
      var stars = omzet >= 28 ? 3 : omzet >= 18 ? 2 : 1;
      msg.textContent = "Je verdiende " + euro(omzet) + " met " + verkocht + " " + (verkocht === 1 ? waar[1] : waar[1] + "en") + ". " + weg + " klanten vonden het te duur. Te duur of te goedkoop levert minder op. Bij economie leer je waarom.";
      api.burst(kraam, 30);
      later(function () { api.done(stars); }, 400);
    }
    return function () { ended = true; running = false; timer.stop(); timers.forEach(clearTimeout); };
  } });
})();
