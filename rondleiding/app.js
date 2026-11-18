(function () {
  "use strict";
  var KEY = "vellesan-rondleiding-v1";
  var D = window.RONDLEIDING || {};
  var etages = D.etages || [];
  var stops = D.stops || [];
  var bonus = D.bonus || [];
  var root = document.getElementById("main");

  /* ---------- state ---------- */
  var state = { team: "", started: false, done: {}, opd: {}, ans: {}, found: {}, secrets: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === "object") {
        state.team = typeof p.team === "string" ? p.team : "";
        state.started = !!p.started;
        state.done = p.done || {};
        state.opd = p.opd || {};
        state.ans = p.ans || {};
        state.found = (p.found && typeof p.found === "object") ? p.found : {};
        state.secrets = (p.secrets && typeof p.secrets === "object") ? p.secrets : {};
      }
    }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function resetState() {
    state = { team: "", started: false, done: {}, opd: {}, ans: {}, found: {}, secrets: {} };
    try { localStorage.removeItem(KEY); } catch (e) {}
    photoURLs = {};
  }
  var photoURLs = {}; // in memory only
  var currentFloor = 0, lastRoute = "";

  /* ---------- helpers ---------- */
  function el(tag, attrs) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "text") n.textContent = v;
      else if (k === "class") n.className = v;
      else if (k.indexOf("on") === 0) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return n;
  }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function isDone(s) { return !!state.done[s.id]; }
  function doneCount() { return stops.filter(isDone).length; }
  function nextStop() { for (var i = 0; i < stops.length; i++) if (!isDone(stops[i])) return i; return -1; }
  var QR = !!D.qrVerplicht;
  function isOpen(s) { return !QR || !!state.found[s.id] || !!state.done[s.id]; }
  function bonusOpen(b) { return !QR || !!state.secrets[b.id]; }
  function secretCount() { return bonus.filter(function (b) { return !!state.secrets[b.id]; }).length; }
  function secretLine() { return secretCount() + " van " + bonus.length + " geheime QR-codes gevonden"; }
  function starCount() {
    var n = secretCount() * 2;
    stops.forEach(function (s) { (s.opdrachten || []).forEach(function (o, i) { if (state.opd[s.id + ":" + i]) n++; }); });
    return n;
  }
  function floorName(i) { return etages[i] ? etages[i].naam : ""; }
  function hasProgress() { return state.started || secretCount() > 0 || Object.keys(state.found).length > 0 || doneCount() > 0 || Object.keys(state.opd).length > 0 || !!state.team; }
  function show(nodes) {
    root.textContent = "";
    nodes.forEach(function (n) { if (n) root.appendChild(n); });
    window.scrollTo(0, 0);
  }
  function findStop(q) {
    if (!q) return -1;
    if (/^\d+$/.test(q)) { var n = parseInt(q, 10) - 1; return n >= 0 && n < stops.length ? n : -1; }
    for (var i = 0; i < stops.length; i++) if (stops[i].id === q) return i;
    return -1;
  }
  function topbar(title) {
    return el("div", { class: "topbar" }, el("h1", { text: title }),
      el("div", { class: "stars", "aria-label": starCount() + " sterren", text: "★ " + starCount() }));
  }

  /* ---------- router ---------- */
  function parseRoute() {
    var h = location.hash.replace(/^#\/?/, "");
    var m;
    if ((m = /^stop[=\/](.+)$/.exec(h))) return { name: "stop", q: decodeURIComponent(m[1]) };
    if (h === "kaart") return { name: "kaart" };
    if (h === "bonus") return { name: "bonus" };
    if (h === "klaar") return { name: "klaar" };
    return { name: "start" };
  }
  function route() {
    var qh = /^#\/?qr=([^&]+)/i.exec(location.hash);
    if (qh) { handleScanned(decodeURIComponent(qh[1]), true); return; }
    var r = parseRoute(), key = r.name + (r.q || "");
    try {
      if (r.name === "stop") {
        var i = findStop(r.q);
        if (i < 0) { go("#/kaart"); return; }
        renderStop(i);
      } else if (r.name === "kaart") {
        if (lastRoute.indexOf("kaart") !== 0) {
          var n = nextStop(); if (n >= 0) currentFloor = stops[n].etage || 0;
        }
        renderMap();
      } else if (r.name === "bonus") renderBonus();
      else if (r.name === "klaar") renderFinish();
      else renderStart();
    } catch (e) {
      console.error(e);
      show([el("div", { class: "card" }, el("p", { text: "Oeps, er ging iets mis." }),
        el("button", { class: "btn", type: "button", onclick: function () { go("#/"); } }, "Naar het begin"))]);
    }
    lastRoute = key;
  }
  window.addEventListener("hashchange", route);

  /* ---------- start ---------- */
  function renderStart() {
    var team = el("input", { type: "text", id: "team", maxlength: "40", autocomplete: "off", value: state.team });
    var box = el("div", { class: "hero" },
      el("div", { class: "logo", "aria-hidden": "true", text: "🏫" }),
      el("h1", { text: D.titel || "Rondleiding" }),
      el("p", { text: D.welkom || "Welkom! Loop zelf door de school." }));
    var nodes = [box];
    var confirmBox = el("div");
    function begin() {
      state.team = team.value.trim(); state.started = true; save(); go("#/kaart");
    }
    if (hasProgress()) {
      box.appendChild(el("div", { class: "stack" },
        el("button", { class: "btn big", type: "button", onclick: function () { go(nextStop() < 0 && stops.length ? "#/klaar" : "#/kaart"); } }, "Ga verder"),
        el("button", { class: "btn small", type: "button", onclick: function () {
          confirmBox.textContent = "";
          confirmBox.appendChild(el("div", { class: "confirm", role: "alert" },
            el("p", { text: "Weet je het zeker? Al je stops en sterren worden gewist." }),
            el("div", { class: "row" },
              el("button", { class: "btn", type: "button", onclick: function () { resetState(); renderStart(); } }, "Ja, opnieuw beginnen"),
              el("button", { class: "btn alt", type: "button", onclick: function () { confirmBox.textContent = ""; } }, "Nee, ga verder"))));
        } }, "Opnieuw beginnen"),
        confirmBox));
    } else {
      box.appendChild(el("label", { class: "field", for: "team" }, el("span", { text: "Naam van je team (mag leeg blijven)" }), team));
      box.appendChild(el("button", { class: "btn big", type: "button", onclick: begin }, "Start"));
    }
    show(nodes);
  }

  /* ---------- map ---------- */
  function renderMap() {
    if (!etages.length) { show([topbar(D.titel || "Rondleiding"), el("p", { text: "Er is nog geen kaart." })]); return; }
    if (currentFloor >= etages.length) currentFloor = 0;
    var ni = nextStop(), next = ni >= 0 ? stops[ni] : null;
    var nodes = [topbar(D.titel || "Rondleiding"), bannerEl(takeBanner())];

    var tabs = el("div", { class: "tabs", role: "tablist", "aria-label": "Etages" });
    etages.forEach(function (e, i) {
      tabs.appendChild(el("button", { class: "tab", type: "button", role: "tab", "aria-selected": i === currentFloor ? "true" : "false",
        onclick: function () { currentFloor = i; renderMap(); } }, e.naam));
    });
    nodes.push(tabs);

    var f = etages[currentFloor];
    var box = el("div", { class: "mapbox", style: "aspect-ratio:" + (f.w || 1100) + "/" + (f.h || 700) },
      el("img", { src: f.kaart, alt: "Plattegrond van de " + f.naam, draggable: "false" }));
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100"); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("aria-hidden", "true");
    for (var i = 1; i < stops.length; i++) {
      var a = stops[i - 1], b = stops[i];
      if (a.etage === currentFloor && b.etage === currentFloor) {
        var ln = document.createElementNS(svgNS, "line");
        ln.setAttribute("x1", a.x); ln.setAttribute("y1", a.y); ln.setAttribute("x2", b.x); ln.setAttribute("y2", b.y);
        ln.setAttribute("class", "route" + (isDone(a) && isDone(b) ? " done" : ""));
        svg.appendChild(ln);
      }
    }
    box.appendChild(svg);
    stops.forEach(function (s, idx) {
      if (s.etage !== currentFloor) return;
      var cls = "marker" + (isDone(s) ? " done" : idx === ni ? " next" : "");
      var m = el("button", { class: cls, type: "button", style: "left:" + s.x + "%;top:" + s.y + "%",
        "aria-label": "Stop " + (idx + 1) + ", " + s.naam + (isDone(s) ? ", klaar" : idx === ni ? ", volgende stop" : ""),
        onclick: function () { go("#/stop/" + (idx + 1)); } }, isDone(s) ? "✓" : String(idx + 1));
      box.appendChild(m);
    });
    nodes.push(box);

    // next card
    if (next) {
      var card = el("section", { class: "card next-card", "aria-labelledby": "nx" });
      var prev = ni > 0 ? stops[ni - 1] : null;
      var otherFloor = (prev && prev.etage !== next.etage) || next.etage !== currentFloor;
      if (otherFloor) card.appendChild(el("div", { class: "floor-hint", text: "Ga naar de " + floorName(next.etage) }));
      card.appendChild(el("h2", { id: "nx", text: "Volgende stop: " + (ni + 1) + ". " + next.naam }));
      if (next.loop) card.appendChild(el("p", { text: next.loop }));
      if (isOpen(next)) card.appendChild(el("button", { class: "btn big block", type: "button", onclick: function () { go("#/stop/" + (ni + 1)); } }, "Ik ben er!"));
      else {
        card.appendChild(el("button", { class: "btn alt block", type: "button", style: "margin-bottom:10px", onclick: function () { go("#/stop/" + (ni + 1)); } }, "▶ Bekijk het filmpje van deze plek"));
        card.appendChild(codeActions(ni));
      }
      nodes.push(card);
    } else if (stops.length) {
      nodes.push(el("section", { class: "card next-card" }, el("h2", { text: "Alle stops gedaan!" }),
        el("button", { class: "btn big block", type: "button", onclick: function () { go("#/klaar"); } }, "Bekijk het eindscherm")));
    }

    // progress
    var dc = doneCount(), total = stops.length;
    var pg = el("div", { class: "card" }, el("strong", { text: dc + " van " + total + " stops" }),
      el("div", { class: "progress", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(dc), "aria-label": "Voortgang" },
        el("div", { style: "width:" + (total ? Math.round(dc / total * 100) : 0) + "%" })));
    nodes.push(pg);

    // list
    var ul = el("ul", { class: "stoplist" });
    stops.forEach(function (s, idx) {
      ul.appendChild(el("li", { class: isDone(s) ? "done" : idx === ni ? "nx" : "" },
        el("button", { type: "button", onclick: function () { go("#/stop/" + (idx + 1)); } },
          el("span", { class: "num", "aria-hidden": "true", text: isDone(s) ? "✓" : String(idx + 1) }),
          el("span", { class: "txt" }, el("span", { text: (idx + 1) + ". " + s.naam }), el("span", { class: "meta", text: floorName(s.etage) + (isDone(s) ? " · klaar" : !isOpen(s) ? " · opdrachten op slot" : "") })))));
    });
    nodes.push(el("h2", { text: "Alle stops" }), ul);
    if (bonus.length) {
      nodes.push(el("p", { style: "margin-top:20px" }, el("button", { class: "btn alt block", type: "button", onclick: function () { go("#/bonus"); } }, "★ Bonus: extra filmpjes")));
      if (QR) nodes.push(el("p", { class: "muted secretline", style: "text-align:center", text: secretLine() }));
    }
    nodes.push(el("p", { style: "text-align:center;margin-top:16px" }, el("button", { class: "btn small", type: "button", onclick: function () { go("#/"); } }, "Startscherm")));
    show(nodes);
  }

  /* ---------- video ---------- */
  function video(clip, poster, label) {
    var v = el("video", { controls: true, playsinline: true, preload: "metadata", poster: poster || null, "aria-label": label });
    v.setAttribute("webkit-playsinline", "");
    v.appendChild(el("source", { src: clip, type: "video/mp4" }));
    v.appendChild(document.createTextNode("Je browser kan dit filmpje niet laten zien."));
    return el("div", { class: "videowrap" }, v);
  }

  /* ---------- stop ---------- */
  var TYPES = { mc: "Kies het goede antwoord", zoek: "Zoek-opdracht", tel: "Tel-opdracht", foto: "Foto-opdracht", open: "Open vraag" };
  function takeBanner() { var b = pendingBanner; pendingBanner = ""; return b; }
  function bannerEl(text) { return text ? el("div", { class: "banner", role: "status", text: "🎉 " + text }) : null; }
  function renderLock(idx) {
    var s = stops[idx];
    show([
      el("button", { class: "btn small back", type: "button", onclick: function () { go("#/kaart"); } }, "← Terug naar de kaart"),
      el("div", { class: "stophead" }, el("div", { class: "num", "aria-hidden": "true", text: String(idx + 1) }), el("h1", { text: s.naam })),
      el("div", { class: "card lockcard" },
        el("div", { class: "lockicon", "aria-hidden": "true", text: "🔒" }),
        el("h2", { text: "Deze stop is nog dicht" }),
        s.loop ? el("p", { text: s.loop }) : null,
        el("p", { class: "hint", text: "Zoek de QR-poster op deze plek" }),
        codeActions(idx))
    ]);
  }
  function renderStop(idx) {
    var s = stops[idx];
    var open = isOpen(s);
    var nodes = [bannerEl(takeBanner()),
      el("button", { class: "btn small back", type: "button", onclick: function () { go("#/kaart"); } }, "← Terug naar de kaart"),
      el("div", { class: "stophead" }, el("div", { class: "num", "aria-hidden": "true", text: String(idx + 1) }),
        el("h1", { text: s.naam }))
    ];
    if (s.clip) nodes.push(video(s.clip, s.poster, "Filmpje over " + s.naam));
    if (!open && s.loop) nodes.push(el("p", { class: "hint", text: "Zo kom je er: " + s.loop }));
    if (s.uitleg) nodes.push(el("p", { text: s.uitleg }));
    var ops = s.opdrachten || [];
    if (!open) {
      nodes.push(el("div", { class: "card lockcard" },
        el("div", { class: "lockicon", "aria-hidden": "true", text: "🔒" }),
        el("h2", { text: "De opdrachten zitten nog op slot" }),
        el("p", { text: "Loop naar deze plek en zoek de QR-poster. Scan hem, dan gaan de opdrachten open." }),
        codeActions(idx)));
      nodes.push(el("button", { class: "btn small back", type: "button", style: "margin-top:16px", onclick: function () { go("#/kaart"); } }, "← Terug naar de kaart"));
      show(nodes);
      return;
    }
    if (ops.length) {
      nodes.push(el("h2", { text: "Kies je opdrachten" }), el("p", { class: "muted", text: "Je mag zelf kiezen welke je doet. Elke opdracht levert een ster op!" }));
      ops.forEach(function (o, i) { nodes.push(opdracht(s, o, i)); });
    }
    nodes.push(el("button", { class: "btn big block", type: "button", style: "margin-top:20px", onclick: function () {
      state.done[s.id] = true; state.started = true; save();
      go(nextStop() < 0 ? "#/klaar" : "#/kaart");
    } }, "Stop klaar, terug naar de kaart"));
    show(nodes);
  }

  function opdracht(s, o, i) {
    var key = s.id + ":" + i;
    var card = el("section", { class: "card opd" });
    var body = el("div", { class: "body", id: "op-" + key.replace(":", "-"), hidden: true });
    var ico = el("span", { class: "ico", "aria-hidden": "true" });
    var chev = el("span", { class: "chev", "aria-hidden": "true", text: "▾" });
    var head = el("button", { class: "head", type: "button", "aria-expanded": "false", "aria-controls": body.id }, ico,
      el("span", { text: "Opdracht " + (i + 1) + ": " + (TYPES[o.type] || "Opdracht") }), chev);
    var status = el("span", { class: "sr", "aria-live": "polite" });
    function refresh() {
      var d = !!state.opd[key];
      card.className = "card opd" + (d ? " done" : "");
      ico.textContent = d ? "✓" : String(i + 1);
      status.textContent = d ? "Gedaan, je hebt een ster verdiend" : "";
    }
    function complete() { state.opd[key] = true; save(); refresh(); }
    head.addEventListener("click", function () {
      var open = body.hidden; body.hidden = !open;
      head.setAttribute("aria-expanded", open ? "true" : "false"); chev.textContent = open ? "▴" : "▾";
    });
    body.appendChild(el("p", { text: o.vraag || "" }));
    var fb = el("div", { "aria-live": "polite" });
    var t = o.type;
    if (t === "mc") {
      var opts = el("div", { class: "opts" });
      (o.opties || []).forEach(function (txt, k) {
        var b = el("button", { class: "opt", type: "button", text: txt });
        b.addEventListener("click", function () {
          Array.prototype.forEach.call(opts.children, function (c) { c.classList.remove("good", "bad"); });
          fb.textContent = "";
          var ok = k === o.goed;
          b.classList.add(ok ? "good" : "bad");
          fb.appendChild(el("div", { class: "fb " + (ok ? "good" : "bad") },
            el("strong", { text: ok ? "✓ Goed! " : "✗ Helaas, dat is niet goed. Probeer het nog eens. " }), o.uitleg || ""));
          if (ok) complete();
        });
        opts.appendChild(b);
      });
      body.appendChild(opts);
      if (state.opd[key]) fb.appendChild(el("div", { class: "fb good" }, el("strong", { text: "✓ Goed! " }), o.uitleg || ""));
    } else if (t === "zoek") {
      body.appendChild(el("button", { class: "btn", type: "button", onclick: function () {
        complete(); fb.textContent = ""; fb.appendChild(el("div", { class: "fb good", text: "✓ Gevonden! Top." }));
      } }, "Gevonden!"));
      if (state.opd[key]) fb.appendChild(el("div", { class: "fb good", text: "✓ Gevonden! Top." }));
    } else if (t === "tel" || t === "open") {
      var inp = t === "tel" ? el("input", { type: "number", inputmode: "numeric", min: "0", "aria-label": "Jouw antwoord" })
                            : el("input", { type: "text", maxlength: "120", "aria-label": "Jouw antwoord" });
      if (state.ans[key] != null) inp.value = state.ans[key];
      body.appendChild(inp);
      body.appendChild(el("p", null, el("button", { class: "btn", type: "button", style: "margin-top:10px", onclick: function () {
        var v = inp.value.trim();
        fb.textContent = "";
        if (!v) { fb.appendChild(el("div", { class: "fb bad", text: t === "tel" ? "Vul eerst een getal in." : "Schrijf eerst je antwoord op." })); return; }
        state.ans[key] = v; complete(); fb.appendChild(el("div", { class: "fb good", text: "✓ Opgeslagen, goed gedaan!" }));
      } }, "Klaar")));
      if (state.opd[key]) fb.appendChild(el("div", { class: "fb good", text: "✓ Opgeslagen, goed gedaan!" }));
    } else if (t === "foto") {
      var prev = el("div");
      var file = el("input", { type: "file", accept: "image/*", capture: "environment", "aria-label": "Maak een foto" });
      function showPhoto(url) {
        prev.textContent = "";
        prev.appendChild(el("img", { class: "preview", src: url, alt: "Jouw foto" }));
      }
      if (photoURLs[key]) showPhoto(photoURLs[key]);
      file.addEventListener("change", function () {
        var f = file.files && file.files[0];
        if (!f) return;
        if (photoURLs[key]) { try { URL.revokeObjectURL(photoURLs[key]); } catch (e) {} }
        photoURLs[key] = URL.createObjectURL(f);
        showPhoto(photoURLs[key]);
        complete();
        fb.textContent = ""; fb.appendChild(el("div", { class: "fb good", text: "✓ Mooie foto! Hij blijft alleen op deze iPad." }));
      });
      body.appendChild(file);
      body.appendChild(prev);
    } else {
      body.appendChild(el("button", { class: "btn", type: "button", onclick: function () { complete(); } }, "Klaar"));
    }
    body.appendChild(fb);
    card.appendChild(head); card.appendChild(status); card.appendChild(body);
    refresh();
    return card;
  }

  /* ---------- bonus ---------- */
  function renderBonus() {
    var nodes = [bannerEl(takeBanner()), el("button", { class: "btn small back", type: "button", onclick: function () { go("#/kaart"); } }, "← Terug naar de kaart"),
      el("h1", { text: "Bonus" })];
    if (!bonus.length) nodes.push(el("p", { text: "Er zijn nog geen bonusfilmpjes." }));
    if (QR && bonus.length) nodes.push(el("p", { class: "muted secretline", text: secretLine() + ". Elke geheime QR levert 2 sterren op!" }));
    var anyLocked = false;
    bonus.forEach(function (b, bi) {
      if (!bonusOpen(b)) {
        anyLocked = true;
        nodes.push(el("section", { class: "card mystery" }, el("div", { class: "lockicon", "aria-hidden": "true", text: "❓" }),
          el("h2", { text: "Geheime QR " + (bi + 1) + " van " + bonus.length + ": nog niet gevonden" }),
          el("p", { class: "muted", text: "Ergens in de school hangt een geheime QR-poster. Vind je hem?" })));
        return;
      }
      var c = el("section", { class: "bonus-item" }, el("h2", { text: b.naam || "Bonus" }));
      if (b.clip) c.appendChild(video(b.clip, b.poster, "Bonusfilmpje " + (b.naam || "")));
      if (b.uitleg) c.appendChild(el("p", { text: b.uitleg }));
      nodes.push(c);
    });
    if (anyLocked) nodes.push(el("div", { class: "card" }, codeActions(-1)));
    show(nodes);
  }

  /* ---------- finish ---------- */
  function renderFinish() {
    var colors = ["#f39200", "#2e8b4a", "#2b6fd1", "#d6336c", "#f5c400"];
    var conf = el("div", { class: "confetti", "aria-hidden": "true" });
    for (var i = 0; i < 40; i++) {
      conf.appendChild(el("i", { style: "left:" + (i * 2.5 + (i % 3)) + "%;background:" + colors[i % colors.length] +
        ";animation-duration:" + (3 + (i % 5)) + "s;animation-delay:-" + ((i * 0.37) % 5).toFixed(2) + "s" }));
    }
    var name = state.team ? "Goed gedaan, " + state.team + "!" : "Goed gedaan!";
    show([el("div", { class: "finish" }, conf,
      el("div", { class: "logo hero", "aria-hidden": "true", style: "font-size:4rem;padding:0", text: "🎉" }),
      el("h1", { text: name }),
      el("p", { class: "big-num", text: doneCount() + " van " + stops.length + " stops" }),
      el("p", { class: "big-num", text: "★ " + starCount() + (starCount() === 1 ? " ster" : " sterren") }),
      QR && bonus.length ? el("p", { class: "muted secretline", text: secretLine() }) : null,
      el("div", { class: "exit", text: "Laat dit scherm zien bij de uitgang" }),
      el("div", { class: "row" },
        el("button", { class: "btn alt", type: "button", onclick: function () { go("#/kaart"); } }, "Terug naar de kaart"),
        bonus.length ? el("button", { class: "btn alt", type: "button", onclick: function () { go("#/bonus"); } }, "★ Bonus") : null))]);
  }

  /* ---------- QR codes ---------- */
  var pendingBanner = "";
  function extractCode(text) {
    var t = String(text == null ? "" : text).trim();
    var m = /[?&#\/]qr=([^&#\s]+)/i.exec(t) || /^qr=([^&#\s]+)/i.exec(t);
    if (m) t = m[1];
    else if (/^[a-z]+:\/\//i.test(t) || /\s/.test(t)) return "";
    try { t = decodeURIComponent(t); } catch (e) {}
    return t.trim().toUpperCase();
  }
  function lookupCode(text) {
    var c = extractCode(text);
    if (!c) return null;
    for (var i = 0; i < stops.length; i++) if (String(stops[i].code || "").toUpperCase() === c) return { kind: "stop", idx: i, item: stops[i] };
    for (var j = 0; j < bonus.length; j++) if (String(bonus[j].code || "").toUpperCase() === c) return { kind: "bonus", idx: j, item: bonus[j] };
    return null;
  }
  function navigate(h, replace) {
    if (replace) {
      try { history.replaceState(null, "", location.pathname + h); route(); return; } catch (e) {}
    }
    go(h);
  }
  // Marks a found code in the saved state and opens its screen. Returns the lookup result or null.
  function applyCode(text, replace) {
    var r = lookupCode(text);
    if (!r) return null;
    state.started = true;
    if (r.kind === "stop") {
      state.found[r.item.id] = true; save();
      pendingBanner = "Gevonden! Dit is stop " + (r.idx + 1) + ".";
      navigate("#/stop/" + (r.idx + 1), replace);
    } else {
      var first = !state.secrets[r.item.id];
      state.secrets[r.item.id] = true; save();
      pendingBanner = "Geheime QR gevonden!" + (first ? " Je krijgt 2 sterren." : "");
      navigate("#/bonus", replace);
    }
    return r;
  }
  // Entry from a URL (?qr=, #qr=): handle, then clean the address so a reload does not repeat it.
  function handleScanned(text, fromUrl) {
    if (fromUrl) { try { history.replaceState(null, "", location.pathname); } catch (e) {} }
    if (!applyCode(text, fromUrl)) {
      state.started = true; save();
      pendingBanner = "Hmm, deze QR-code ken ik niet. Probeer het nog eens bij een poster van de rondleiding.";
      navigate("#/kaart", fromUrl);
    }
  }

  function codeActions(idx) {
    var box = el("div", { class: "codeactions" });
    var formBox = el("div", { "aria-live": "polite" });
    function showForm() {
      formBox.textContent = "";
      var inp = el("input", { type: "text", maxlength: "12", autocomplete: "off", autocapitalize: "characters", autocorrect: "off", spellcheck: "false", "aria-label": "De code van de poster", class: "codeinput" });
      var msg = el("div", { class: "fb bad", role: "alert", hidden: true });
      var form = el("form", { class: "codeform", novalidate: true }, el("label", { class: "field" }, el("span", { text: "Typ het woord van de poster" }), inp),
        el("button", { class: "btn", type: "submit" }, "Open"), msg);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!applyCode(inp.value, false)) {
          msg.hidden = false;
          msg.textContent = inp.value.trim() ? "Dat woord klopt nog niet. Kijk goed op de poster en probeer het nog eens." : "Typ eerst het woord dat op de poster staat.";
          inp.focus();
        }
      });
      formBox.appendChild(form);
      inp.focus();
    }
    box.appendChild(el("button", { class: "btn big block", type: "button", onclick: function () { openScanner(showForm); } }, "Scan de QR-code"));
    box.appendChild(el("p", { style: "text-align:center;margin:10px 0 0" }, el("button", { class: "btn small", type: "button", onclick: showForm }, "Typ de code")));
    box.appendChild(formBox);
    return box;
  }

  /* ---------- scanner ---------- */
  function openScanner(onType) {
    var stream = null, raf = 0, closed = false, lastTick = 0;
    var video = el("video", { class: "scanvideo", playsinline: true, muted: true, autoplay: true, "aria-label": "Camerabeeld" });
    video.muted = true; video.setAttribute("webkit-playsinline", "");
    var msg = el("p", { class: "scanmsg", role: "status", "aria-live": "polite", text: "Richt de camera op de QR-code op de poster." });
    var extra = el("div", { class: "scanextra" });
    var close = el("button", { class: "btn", type: "button", onclick: function () { stop(); } }, "Sluiten");
    var ov = el("div", { class: "scanner", role: "dialog", "aria-modal": "true", "aria-label": "QR-code scannen" },
      el("div", { class: "scanbar" }, el("strong", { text: "Scan de QR-code" }), close),
      el("div", { class: "scanstage" }, video, el("div", { class: "scanframe", "aria-hidden": "true" })),
      msg, extra);
    var prevFocus = document.activeElement;
    function onKey(e) { if (e.key === "Escape") stop(); }
    function stop() {
      if (closed) return; closed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      if (stream) { stream.getTracks().forEach(function (t) { try { t.stop(); } catch (e) {} }); stream = null; }
      try { video.srcObject = null; } catch (e) {}
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      document.body.classList.remove("noscroll");
      if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) {} }
    }
    function fallback(text) {
      cancelAnimationFrame(raf);
      if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
      video.hidden = true; ov.classList.add("nocam");
      msg.textContent = text;
      extra.textContent = "";
      extra.appendChild(el("button", { class: "btn big block", type: "button", onclick: function () { stop(); if (onType) onType(); } }, "Typ de code"));
      extra.appendChild(el("p", { class: "scantip", text: "Tip: Je kunt ook de Camera-app van de iPad gebruiken. Richt hem op de QR-code en tik op de melding die verschijnt." }));
    }
    document.body.appendChild(ov); document.body.classList.add("noscroll");
    document.addEventListener("keydown", onKey);
    close.focus();
    var md = navigator.mediaDevices;
    if (!md || !md.getUserMedia || typeof window.jsQR !== "function") { fallback("De camera kan hier niet worden gebruikt."); return; }
    var canvas = document.createElement("canvas"), ctx = canvas.getContext("2d", { willReadFrequently: true });
    function tick(ts) {
      if (closed) return;
      raf = requestAnimationFrame(tick);
      if (ts - lastTick < 120 || video.readyState < 2 || !video.videoWidth) return;
      lastTick = ts;
      var sc = Math.min(1, 640 / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * sc); canvas.height = Math.round(video.videoHeight * sc);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      var img;
      try { img = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) { return; }
      var res = window.jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
      if (res && res.data) {
        if (lookupCode(res.data)) { stop(); applyCode(res.data, false); }
        else msg.textContent = "Deze QR-code hoort niet bij de rondleiding. Zoek een andere poster.";
      }
    }
    md.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false }).then(function (s) {
      if (closed) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
      stream = s; video.srcObject = s;
      var p = video.play(); if (p && p.catch) p.catch(function () {});
      raf = requestAnimationFrame(tick);
    }).catch(function (err) {
      var denied = err && (err.name === "NotAllowedError" || err.name === "SecurityError");
      fallback(denied ? "De camera mag niet worden gebruikt. Geef toestemming in de instellingen, of typ de code." : "Er is geen camera gevonden. Typ de code van de poster.");
    });
  }

  /* ---------- init ---------- */
  if (!stops.length && !etages.length) {
    show([el("div", { class: "card" }, el("p", { text: "De rondleiding kon niet worden geladen." }))]);
    return;
  }
  var qq = /[?&]qr=([^&#]+)/i.exec(location.search) || /[#&]\/?qr=([^&#]+)/i.exec(location.hash);
  if (qq) { handleScanned(decodeURIComponent(qq[1]), true); return; }
  var qm = /[?&]stop=([^&#]+)/.exec(location.search);
  if (qm && !location.hash) {
    try { history.replaceState(null, "", location.pathname + "#/stop/" + qm[1]); } catch (e) { location.hash = "#/stop/" + qm[1]; }
  }
  route();
})();
