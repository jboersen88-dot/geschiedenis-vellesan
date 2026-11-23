/* Havenmeester: bouw je eigen haven met de stof van je hoofdstuk.
   - Vragen komen uit data/<pakket>.json (gemaakt door bouw.py uit de bestaande oefenomgevingen).
   - Voortgang staat alleen op dit apparaat, in localStorage onder "havenmeester-v1".
   - Tekeningen staan in kunst.js, opmaak in haven.css. */
(function () {
"use strict";

var K = window.HM_KUNST, KEY = "havenmeester-v1";
var app = document.getElementById("app"), sheet = document.getElementById("sheet"), toastEl = document.getElementById("toast");
var RM = window.matchMedia("(prefers-reduced-motion: reduce)");
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function schud(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
function dag(d) { d = d || new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function getal(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function wacht(ms, f) { return setTimeout(f, RM.matches ? Math.min(ms, 250) : ms); }
var MUNT = '<svg class="mt" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" class="mt1"/><circle cx="10" cy="10" r="5.6" class="mt2"/></svg>';

/* ---------- vaste gegevens ---------- */
var GEB = [
  { id: "kade", naam: "Kade", prijs: 0, perk: ["Spel: Lossen", "10% meer munten", "20% meer munten"] },
  { id: "douane", naam: "Douanekantoor", prijs: 0, perk: ["Spel: Douane", "1 reddingsboei per dienst", "2 reddingsboeien per dienst"] },
  { id: "loods", naam: "Sorteerloods", prijs: 120, perk: ["Nieuw spel: Sorteerband", "15% meer ervaring", "30% meer ervaring"] },
  { id: "steiger", naam: "Steiger", prijs: 220, perk: ["Nieuw spel: Aanmeren", "Je reeks begint op ×2", "Je reeks zakt nooit onder ×2"] },
  { id: "vuurtoren", naam: "Vuurtoren", prijs: 350, perk: ["Nieuw spel: Flessenpost", "De eerste letter staat er al", "Ook de laatste letter staat er al"] },
  { id: "werf", naam: "Scheepswerf", prijs: 300, perk: ["Koop grotere schepen", "Koop vrachtschepen", "Koop de grootste schepen"] },
  { id: "kraan", naam: "Havenkraan", prijs: 450, perk: ["Je reeks gaat tot ×4", "Je reeks gaat tot ×5", "Je reeks gaat tot ×6"] },
  { id: "markt", naam: "Markt", prijs: 400, perk: ["Dagbonus: 50 munten", "Dagbonus: 100 munten", "Dagbonus: 150 munten"] },
  { id: "bank", naam: "Bank", prijs: 600, perk: ["2% rente na elke dienst", "3% rente na elke dienst", "4% rente na elke dienst"] }
];
function geb(id) { for (var i = 0; i < GEB.length; i++) if (GEB[i].id === id) return GEB[i]; }
function kost(g, l) { var b = Math.max(g.prijs, 150); return l === 1 ? g.prijs : l === 2 ? b * 2 : b * 5; }
var RANG = [["Dekhulp", 0], ["Matroos", 120], ["Bootsman", 350], ["Stuurman", 750], ["Kapitein", 1400], ["Loods", 2300], ["Dokmeester", 3600], ["Reder", 5400], ["Havenmeester", 8000], ["Admiraal", 12000]];
function rang(xp) { var r = 0; for (var i = 0; i < RANG.length; i++) if (xp >= RANG[i][1]) r = i; return r; }
var VLAG = [["Koraal", "#ff8d90", 0], ["Teal", "#2f8f86", 1], ["Goud", "#e2b045", 2], ["Wit", "#fffaf1", 3], ["Paars", "#8c6bd6", 5], ["Zwart", "#1c2422", 7]];
var KAARTEN = [
  { id: "dubbel", naam: "Dubbele vracht", t: "Het volgende schip levert dubbele munten op.", i: "M4 12h7v7H4zM13 12h7v7h-7zM8.5 4h7v7h-7z" },
  { id: "rugwind", naam: "Rugwind", t: "Je reeks zakt deze dienst niet onder ×2.", i: "M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" },
  { id: "boei", naam: "Reddingsboei", t: "Bij één fout blijft je reeks staan.", i: "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8zM5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6" },
  { id: "kijker", naam: "Verrekijker", t: "Bij Lossen valt één fout antwoord weg.", i: "M3 9l12-4 1 4-12 4zM16 6l4-1 1 3-4 1M9 12l-3 8M11 12l3 8" },
  { id: "goud", naam: "Gouden kist", t: "Elk vijfde goede antwoord geeft 25 munten extra.", i: "M4 10h16v9H4zM4 10a8 6 0 0 1 16 0M10.5 12h3v4h-3z" },
  { id: "xp", naam: "Logboek", t: "Anderhalf keer zoveel ervaring deze dienst.", i: "M5 4h13v16H5zM8 4v16M11 9h4M11 13h4" }
];
var SPEL = {
  lossen: { naam: "Lossen", geb: "kade", uitleg: "Kies de container met het goede antwoord. De kraan zet hem op het schip.", kan: function () { return pool("mc").length >= 4; } },
  douane: { naam: "Douane", geb: "douane", uitleg: "Klopt het antwoord op de vrachtbrief? Kies Goed of Fout.", kan: function () { return pool("mc").length >= 4; } },
  band: { naam: "Sorteerband", geb: "loods", uitleg: "Stuur elke kist naar de goede loods. Tik op de loods, of veeg de kist opzij.", kan: function () { return P.sort.length > 0; } },
  konvooi: { naam: "Konvooi", geb: "loods", uitleg: "Zet de schepen op volgorde. Tik eerst wat het vroegst gebeurde.", kan: function () { return pool("tl").length >= 4; } },
  aanmeren: { naam: "Aanmeren", geb: "steiger", uitleg: "Maak elk schip vast aan de goede meerpaal. Tik eerst links, dan rechts.", kan: function () { return pool("cards").length >= 4; } },
  fles: { naam: "Flessenpost", geb: "vuurtoren", uitleg: "Welk begrip hoort bij de omschrijving? Zet de letters in de goede volgorde.", kan: function () { return woorden().length >= 3; } },
  goud: { naam: "Het gouden schip", geb: "kade", uitleg: "Het laatste schip. Alles telt dubbel." }
};

/* ---------- opslag ---------- */
function nieuw() { return { v: 1, munten: 0, xp: 0, gebouwen: { kade: 1, douane: 1 }, schepen: { sloep: 1 }, schip: "sloep", vlag: 0, pakket: null, pars: {}, m: {}, reeks: { d: "", n: 0 }, bonusdag: "", stats: { diensten: 0, goed: 0, fout: 0, combo: 0 }, gezien: {}, geluid: false, laatst: {} }; }
var S = (function () { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) { var n = nieuw(); for (var k in n) if (!(k in s)) s[k] = n[k]; return s; } } catch (e) {} return nieuw(); })();
function bewaar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function lvl(id) { return S.gebouwen[id] || 0; }
var INDEX = [], P = null, R = null;

/* ---------- geluid (staat standaard uit) ---------- */
var AC = null;
function toon(f, t, d, soort, vol) { if (!S.geluid) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime + (t || 0); o.type = soort || "sine"; o.frequency.value = f; g.gain.setValueAtTime(vol || 0.08, n); g.gain.exponentialRampToValueAtTime(0.0001, n + d); o.connect(g); g.connect(AC.destination); o.start(n); o.stop(n + d + 0.02); } catch (e) {} }
var GELUID = { goed: function () { toon(660, 0, 0.12); toon(880, 0.09, 0.18); }, fout: function () { toon(196, 0, 0.25, "triangle", 0.1); }, munt: function () { toon(1175, 0, 0.08, "square", 0.04); toon(1568, 0.07, 0.14, "square", 0.04); }, bouw: function () { toon(392, 0, 0.12); toon(523, 0.1, 0.12); toon(784, 0.2, 0.3); }, tik: function () { toon(520, 0, 0.05, "triangle", 0.05); } };

function toast(t) { toastEl.textContent = t; toastEl.classList.add("aan"); clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove("aan"); }, 2600); }

/* ---------- stof ---------- */
function M() { return S.m[P.id] || (S.m[P.id] = {}); }
function pool(soort) {
  var a = P[soort] || [], f = S.pars[P.id];
  if (f && f.length) { var b = a.filter(function (x) { return f.indexOf(x.p) >= 0; }); if (b.length >= 4) return b; }
  return a;
}
function woorden() { return pool("cards").filter(function (c) { return /^[A-Za-zÀ-ÿ]{4,13}$/.test(c.b); }); }
/* gewogen trekken: fout gehad komt het vaakst terug, wat je al kent het minst */
function kies(lijst, sleutel, n, eerst) {
  var m = M(), a = lijst.map(function (x) { var d = m[sleutel(x)]; var w = d === undefined ? 3 : d === 0 ? 6 : d === 1 ? 3 : d === 2 ? 1.2 : 0.4; if (eerst && eerst[sleutel(x)]) w = 1000; return { x: x, r: Math.pow(Math.random(), 1 / w) }; });
  a.sort(function (p, q) { return q.r - p.r; });
  return a.slice(0, n).map(function (o) { return o.x; });
}
function kq(x) { return "q" + hash(x.q); }
function kc(x) { return "c" + hash(x.b); }
function beheerst(id, tot) {
  var m = S.m[id] || {}, n = 0; for (var k in m) if (k[0] === "q" || k[0] === "c") n += Math.min(m[k], 2) / 2;
  return tot ? Math.min(1, n / tot) : 0;
}
function meta(id) { for (var i = 0; i < INDEX.length; i++) if (INDEX[i].id === id) return INDEX[i]; }
function haal(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); }
function laadPakket(id) { return haal("data/" + id + ".json").then(function (d) { P = d; S.pakket = id; bewaar(); }); }

/* ---------- start ---------- */
function start() {
  document.documentElement.style.setProperty("--vlag", VLAG[S.vlag] ? VLAG[S.vlag][1] : VLAG[0][1]);
  haal("data/index.json").then(function (ix) {
    INDEX = ix;
    var h = (location.search.match(/[?&]h=([\w-]+)/) || [])[1];
    var id = h && meta(h) ? h : S.pakket && meta(S.pakket) ? S.pakket : null;
    if (!id) { haven(); welkom(); return; }
    return laadPakket(id).then(function () { haven(); if (!S.gezien.welkom) welkom(); });
  }).catch(function () {
    app.innerHTML = '<div class="laden"><h1>Havenmeester</h1><p>De vragen konden niet geladen worden. Controleer je internet.</p><button class="knop" id="opnieuw">Probeer opnieuw</button></div>';
    $("#opnieuw").onclick = function () { location.reload(); };
  });
}

/* ---------- de haven (startscherm) ---------- */
function kanBouwen() { var k = {}, iets = false; GEB.forEach(function (g) { var l = lvl(g.id); if (l < 3 && S.munten >= kost(g, l + 1)) { k[g.id] = 1; iets = true; } }); k._ = iets; return k; }
function haven(nieuwGebouw) {
  R = null; document.body.className = "";
  var r = rang(S.xp), vol = RANG[r + 1] ? (S.xp - RANG[r][1]) / (RANG[r + 1][1] - RANG[r][1]) : 1, kan = kanBouwen();
  var anders = K.schepen.filter(function (s) { return s.id !== S.schip; }), v1 = anders[Math.floor(Math.random() * anders.length)].id, v2 = anders[Math.floor(Math.random() * anders.length)].id;
  var h = '<header class="top">' +
    (P ? '<a class="terug" href="' + esc(P.terug) + '" aria-label="Terug naar de oefenomgeving"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a>' : '<a class="terug" href="../index.html" aria-label="Terug naar de site"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></a>') +
    '<button class="rang" data-open="logboek" aria-label="Rang: ' + RANG[r][0] + '. Open het logboek"><b>' + RANG[r][0] + '</b><span class="xpbalk"><i style="transform:scaleX(' + vol.toFixed(3) + ')"></i></span></button>' +
    '<span class="dagen" title="Dagen op rij gespeeld"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/></svg>' + (S.reeks.n || 0) + '<span class="sr"> dagen op rij</span></span>' +
    '<span class="munten" id="munten">' + MUNT + "<b>" + getal(S.munten) + '</b><span class="sr"> munten</span></span>' +
    '<button class="rond" id="geluid" aria-pressed="' + (S.geluid ? "true" : "false") + '" aria-label="Geluid aan of uit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6L8 10z"/>' + (S.geluid ? '<path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>' : '<path d="M16 9l5 6M21 9l-5 6"/>') + "</svg></button></header>";
  h += '<div class="scene" id="scene" tabindex="0" aria-label="Je haven. Veeg opzij om alles te zien.">' + K.haven({ gebouwen: S.gebouwen, schip: S.schip, voorbij: [v1, v2], kan: kan, label: function (id) { var g = geb(id), l = lvl(id); return g.naam + (l ? ", niveau " + l : ", nog niet gebouwd"); } }) + "</div>";
  h += '<section class="dek">';
  if (P) {
    var mt = meta(P.id), b = beheerst(P.id, mt.n + mt.nb), ps = [], f = S.pars[P.id] || [];
    P.mc.forEach(function (q) { if (ps.indexOf(q.p) < 0) ps.push(q.p); });
    h += '<div class="stof"><p class="oog">' + esc(P.vak) + " · " + esc(P.groep) + '</p><h1>' + esc(P.titel) + '</h1>' +
      '<div class="meter"><span class="balk"><i style="transform:scaleX(' + b.toFixed(3) + ')"></i></span><b>' + Math.round(b * 100) + '%</b> beheerst</div>';
    if (ps.length > 1) h += '<div class="pars" role="group" aria-label="Kies wat je oefent"><button class="chip" data-par="" aria-pressed="' + (!f.length) + '">Alles</button>' + ps.map(function (p) { return '<button class="chip" data-par="' + esc(p) + '" aria-pressed="' + (f.indexOf(p) >= 0) + '">' + esc(p) + "</button>"; }).join("") + "</div>";
    h += '<button class="link" data-open="stof">Andere stof kiezen</button></div>';
    h += '<button class="startknop" id="start"><span>Start je dienst</span><small>' + (dienstPlan().length) + ' schepen · ongeveer 5 minuten</small></button>';
  } else h += '<div class="stof"><h1>Kies eerst je stof</h1><p>Dan komen de schepen binnen.</p></div><button class="startknop" data-open="stof"><span>Kies je stof</span></button>';
  h += "</section>";
  h += '<nav class="tabs" aria-label="Haven"><button data-open="bouwen"' + (kan._ ? ' class="punt"' : "") + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6"/></svg>Bouwen</button>' +
    '<button data-open="vloot"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15h18l-3 5H6zM12 15V4l6 8H12M12 6l-4 6h4"/></svg>Vloot</button>' +
    '<button data-open="logboek"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h13v16H5zM8 4v16M11 9h4M11 13h4"/></svg>Logboek</button></nav>';
  app.innerHTML = h;
  var sc = $("#scene"), svg = $("svg", sc);
  sc.scrollLeft = Math.max(0, (svg.getBoundingClientRect().width * (nieuwGebouw ? K_PLEK(nieuwGebouw) : 1010) / 1600) - sc.clientWidth / 2);
  if (nieuwGebouw) { var pl = $('[data-geb="' + nieuwGebouw + '"]', sc); if (pl) pl.classList.add("nieuw"); }
}
function K_PLEK(id) { return { vuurtoren: 110, markt: 310, douane: 520, loods: 730, kade: 950, kraan: 1130, bank: 1310, werf: 1490, steiger: 680 }[id] || 800; }

app.addEventListener("click", function (e) {
  var t = e.target.closest("[data-open],[data-geb],[data-par],#start,#geluid");
  if (!t || R) return;
  if (t.id === "start") return startDienst();
  if (t.id === "geluid") { S.geluid = !S.geluid; bewaar(); haven(); GELUID.goed(); return; }
  if (t.hasAttribute("data-par")) {
    var p = t.getAttribute("data-par"), f = S.pars[P.id] || [];
    if (!p) f = []; else if (f.indexOf(p) >= 0) f = f.filter(function (x) { return x !== p; }); else f = f.concat([p]);
    S.pars[P.id] = f; bewaar(); haven(); return;
  }
  if (t.hasAttribute("data-geb")) return open("bouwen", t.getAttribute("data-geb"));
  open(t.getAttribute("data-open"));
});
app.addEventListener("keydown", function (e) { if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("g[data-geb],g[data-open]")) { e.preventDefault(); if (e.target.hasAttribute("data-geb")) open("bouwen", e.target.getAttribute("data-geb")); else open(e.target.getAttribute("data-open")); } });

/* ---------- vensters ---------- */
var vorigeFocus = null;
function open(wat, arg) {
  var h = "";
  if (wat === "bouwen") h = bouwenHTML();
  else if (wat === "vloot") h = vlootHTML();
  else if (wat === "logboek") h = logboekHTML();
  else if (wat === "stof") h = stofHTML();
  else if (wat === "welkom") h = arg;
  vorigeFocus = document.activeElement;
  sheet.innerHTML = '<div class="sluier" data-dicht="1"></div><div class="blad" role="dialog" aria-modal="true" aria-labelledby="bladkop">' + (wat === "welkom" ? "" : '<button class="rond dicht" data-dicht="1" aria-label="Sluiten"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>') + h + "</div>";
  sheet.hidden = false; sheet.dataset.wat = wat;
  var doel = arg && wat === "bouwen" ? $('[data-rij="' + arg + '"]', sheet) : null;
  if (doel) { doel.classList.add("licht"); doel.scrollIntoView({ block: "center" }); }
  var f = $("button:not(.dicht),a", $(".blad", sheet)) || $(".dicht", sheet); if (f) f.focus({ preventScroll: !!doel });
}
function dicht() { sheet.hidden = true; sheet.innerHTML = ""; if (vorigeFocus && document.contains(vorigeFocus)) vorigeFocus.focus(); }
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden && sheet.dataset.wat !== "welkom") dicht(); });
sheet.addEventListener("click", function (e) {
  var t = e.target.closest("[data-dicht],[data-bouw],[data-koop],[data-vaar],[data-vlag],[data-pakket],[data-open]");
  if (!t) return;
  if (t.hasAttribute("data-dicht")) { if (sheet.dataset.wat !== "welkom") dicht(); return; }
  if (t.hasAttribute("data-open")) return open(t.getAttribute("data-open"));
  if (t.hasAttribute("data-bouw")) {
    var g = geb(t.getAttribute("data-bouw")), l = lvl(g.id) + 1, k = kost(g, l);
    if (S.munten < k || l > 3) return;
    S.munten -= k; S.gebouwen[g.id] = l; bewaar(); GELUID.bouw(); dicht(); haven(g.id);
    toast(g.naam + (l === 1 ? " gebouwd. " : " is nu niveau " + l + ". ") + g.perk[l - 1] + "."); return;
  }
  if (t.hasAttribute("data-koop")) { var s = K.schip(t.getAttribute("data-koop")); if (S.munten < s.prijs) return; S.munten -= s.prijs; S.schepen[s.id] = 1; S.schip = s.id; bewaar(); GELUID.bouw(); haven(); open("vloot"); toast(s.naam + " gekocht. Hij ligt in je haven."); return; }
  if (t.hasAttribute("data-vaar")) { S.schip = t.getAttribute("data-vaar"); bewaar(); GELUID.tik(); haven(); open("vloot"); return; }
  if (t.hasAttribute("data-vlag")) { S.vlag = +t.getAttribute("data-vlag"); document.documentElement.style.setProperty("--vlag", VLAG[S.vlag][1]); bewaar(); open("vloot"); return; }
  if (t.hasAttribute("data-pakket")) {
    var id = t.getAttribute("data-pakket"); t.disabled = true;
    laadPakket(id).then(function () { S.gezien.welkom = 1; bewaar(); dicht(); haven(); }).catch(function () { t.disabled = false; toast("Dat lukte niet. Controleer je internet."); });
  }
});

function welkom() {
  open("welkom", '<div class="welkom"><p class="oog">Havenmeester</p><h2 id="bladkop">Bouw je eigen haven</h2>' +
    '<ol class="stappen"><li><b>Help schepen</b> met de stof van je hoofdstuk.</li><li><b>Verdien munten</b> met goede antwoorden. Een reeks goede antwoorden levert meer op.</li><li><b>Bouw en verzamel.</b> Nieuwe gebouwen geven nieuwe spellen. Spaar voor grotere schepen.</li></ol>' +
    (P ? '<button class="knop groot" data-dicht-welkom="1">Naar mijn haven</button>' : '<button class="knop groot" data-open="stof">Kies je stof</button>') + "</div>");
  var b = $("[data-dicht-welkom]", sheet); if (b) b.onclick = function () { S.gezien.welkom = 1; bewaar(); dicht(); };
}
function bouwenHTML() {
  var h = '<h2 id="bladkop">Bouwen</h2><p class="saldo">' + MUNT + "<b>" + getal(S.munten) + '</b> munten</p><ul class="rijen">';
  GEB.forEach(function (g) {
    var l = lvl(g.id), max = l >= 3, k = max ? 0 : kost(g, l + 1), kan = S.munten >= k;
    h += '<li class="rij" data-rij="' + g.id + '"><div class="plaat">' + K.gebouwSVG(g.id, Math.max(1, l)) + '</div><div class="rijtx"><h3>' + g.naam + ' <span class="pips" aria-label="niveau ' + l + ' van 3">' + [1, 2, 3].map(function (i) { return "<i" + (i <= l ? ' class="aan"' : "") + "></i>"; }).join("") + "</span></h3>" +
      (l ? '<p class="nu">Nu: ' + g.perk.slice(0, l).join(" · ") + "</p>" : "") +
      (max ? '<p class="vol">Helemaal af</p>' : "<p>" + (l ? "Volgende: " : "") + g.perk[l] + '</p><button class="knop' + (kan ? "" : " dof") + '" data-bouw="' + g.id + '"' + (kan ? "" : " disabled") + ">" + (l ? "Verbeter" : "Bouw") + " · " + MUNT + getal(k) + "</button>" + (kan ? "" : '<small class="tekort">Nog ' + getal(k - S.munten) + " munten sparen</small>")) + "</div></li>";
  });
  return h + "</ul>";
}
function vlootHTML() {
  var r = rang(S.xp), h = '<h2 id="bladkop">Vloot</h2><p class="saldo">' + MUNT + "<b>" + getal(S.munten) + '</b> munten</p><div class="vlagrij" role="group" aria-label="Kleur van je vlag">';
  VLAG.forEach(function (v, i) { var opn = r >= v[2]; h += '<button class="vlagknop" data-vlag="' + i + '" style="--c:' + v[1] + '" aria-pressed="' + (S.vlag === i) + '"' + (opn ? "" : " disabled") + ' aria-label="Vlag ' + v[0] + (opn ? "" : ", vrij vanaf rang " + RANG[v[2]][0]) + '"></button>'; });
  h += '</div><ul class="vloot">';
  K.schepen.forEach(function (s) {
    var heb = S.schepen[s.id], werf = lvl("werf") >= s.werf, kan = S.munten >= s.prijs;
    h += '<li class="boot' + (S.schip === s.id ? " gekozen" : "") + (heb ? "" : " dicht") + '">' + K.schipSVG(s.id) + "<h3>" + s.naam + "</h3>" +
      (heb ? (S.schip === s.id ? '<span class="label">In je haven</span>' : '<button class="knop klein" data-vaar="' + s.id + '">Kies</button>') :
        !werf ? '<span class="slot">Scheepswerf niveau ' + s.werf + "</span>" :
          '<button class="knop klein' + (kan ? "" : " dof") + '" data-koop="' + s.id + '"' + (kan ? "" : " disabled") + ">" + MUNT + getal(s.prijs) + "</button>") + "</li>";
  });
  return h + "</ul>";
}
function logboekHTML() {
  var r = rang(S.xp), tot = S.stats.goed + S.stats.fout;
  var h = '<h2 id="bladkop">Logboek</h2><div class="cijfers"><div><b>' + RANG[r][0] + "</b><span>" + (RANG[r + 1] ? "nog " + getal(RANG[r + 1][1] - S.xp) + " ervaring tot " + RANG[r + 1][0] : "hoogste rang") + "</span></div>" +
    "<div><b>" + S.stats.diensten + "</b><span>diensten gedraaid</span></div><div><b>" + (tot ? Math.round(100 * S.stats.goed / tot) + "%" : "–") + "</b><span>goed beantwoord</span></div><div><b>×" + Math.max(1, S.stats.combo) + "</b><span>hoogste reeks</span></div><div><b>" + (S.reeks.n || 0) + "</b><span>dagen op rij</span></div></div>";
  var ids = Object.keys(S.m).filter(meta);
  if (ids.length) { h += '<h3 class="tussen">Jouw stof</h3><ul class="stoflijst">'; ids.forEach(function (id) { var m = meta(id), b = beheerst(id, m.n + m.nb); h += "<li><span>" + esc(m.groep + " · " + m.titel) + '</span><span class="balk"><i style="transform:scaleX(' + b.toFixed(3) + ')"></i></span><b>' + Math.round(b * 100) + "%</b></li>"; }); h += "</ul>"; }
  h += '<h3 class="tussen">Zo werkt het</h3><ul class="uitleg"><li>Een vraag is <b>beheerst</b> als je hem twee keer goed had. Eén keer goed telt voor de helft. Bij een fout komt hij sneller terug.</li><li>Drie goede antwoorden op rij verhogen je <b>reeks</b>. Een hogere reeks geeft meer munten.</li><li>Je voortgang staat alleen op dit apparaat.</li></ul>';
  return h;
}
function stofHTML() {
  var h = '<h2 id="bladkop">Kies je stof</h2>', vorig = "";
  INDEX.forEach(function (m) {
    var kop = m.vak + " · " + m.groep;
    if (kop !== vorig) { h += (vorig ? "</ul>" : "") + '<h3 class="tussen">' + esc(kop) + '</h3><ul class="pakketten">'; vorig = kop; }
    var b = beheerst(m.id, m.n + m.nb);
    h += '<li><button data-pakket="' + m.id + '"' + (P && P.id === m.id ? ' class="nu"' : "") + "><span>" + esc(m.titel) + "</span><small>" + (b ? Math.round(b * 100) + "% beheerst" : m.n + " vragen") + "</small></button></li>";
  });
  return h + "</ul>";
}

/* ---------- een dienst ---------- */
function dienstPlan() {
  var kan = ["lossen", "douane", "band", "konvooi", "aanmeren", "fles"].filter(function (id) { return lvl(SPEL[id].geb) > 0 && SPEL[id].kan(); });
  kan = schud(kan).sort(function (a, b) { return (S.laatst[a] || 0) - (S.laatst[b] || 0); });
  var n = kan.length >= 3 ? 3 : kan.length;
  return schud(kan.slice(0, n)).concat(["goud"]);
}
function maxReeks() { return 3 + lvl("kraan"); }
function minReeks() { return (lvl("steiger") >= 3 || (R && R.kaart.rugwind)) ? 2 : 1; }
function maal() { return Math.max(minReeks(), Math.min(maxReeks(), 1 + Math.floor(R.reeks / 3))); }

function startDienst() {
  if (!P) return open("stof");
  var plan = dienstPlan();
  if (plan.length < 2) return toast("Bij deze stof zijn nog geen vragen.");
  R = { jobs: plan, i: 0, munten: 0, xp: 0, goed: 0, fout: 0, reeks: lvl("steiger") >= 2 ? 3 : 0, boeien: Math.max(0, lvl("douane") - 1), kaart: {}, dubbel: false, fouten: [], top: 1, jg: 0, jf: 0, opruim: null, voor: beheerst(P.id, meta(P.id).n + meta(P.id).nb) };
  document.body.className = "indienst";
  speelJob();
}
function hud() {
  var pips = R.jobs.map(function (j, i) { return '<li class="' + (i < R.i ? "af" : i === R.i ? "nu" : "") + (j === "goud" ? " goud" : "") + '"></li>'; }).join("");
  return '<header class="dkop"><button class="rond" id="stop" aria-label="Stop de dienst"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<ol class="pipsrij" aria-label="Schip ' + (R.i + 1) + " van " + R.jobs.length + '">' + pips + "</ol>" +
    '<span class="reeks" id="reeks"></span><span class="munten" id="dmunt"></span></header>';
}
function hudBij(plof) {
  var m = maal(), r = $("#reeks"), d = $("#dmunt"); if (!r) return;
  var inStap = m >= maxReeks() ? 3 : R.reeks % 3;
  r.innerHTML = '<b class="' + (m > 1 ? "heet" : "") + '">×' + m + '</b><span class="stapjes">' + [0, 1, 2].map(function (i) { return "<i" + (i < inStap ? ' class="aan"' : "") + "></i>"; }).join("") + "</span>" + (R.boeien ? '<span class="boeitje" title="Reddingsboeien">' + R.boeien + '<span class="sr"> reddingsboeien</span></span>' : "") + '<span class="sr"> reeks</span>';
  d.innerHTML = MUNT + "<b>" + getal(R.munten) + '</b><span class="sr"> munten deze dienst</span>';
  if (plof) { d.classList.remove("plof"); void d.offsetWidth; d.classList.add("plof"); }
}
function drijf(tekst, soort) {
  var d = $("#dmunt"); if (!d) return;
  var s = document.createElement("span"); s.className = "drijf " + (soort || ""); s.textContent = tekst; s.setAttribute("aria-hidden", "true"); d.appendChild(s);
  setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 1100);
}
/* één antwoord verwerken: reeks, munten, ervaring en wat de leerling beheerst */
function beoordeel(ok, sleutel, info, extra) {
  var m = M();
  if (ok) {
    m[sleutel] = Math.min(3, (m[sleutel] || 0) + 1); R.goed++; R.jg++; S.stats.goed++; R.reeks++;
    var x = maal(); R.top = Math.max(R.top, x);
    var mu = Math.round(10 * x * (1 + 0.1 * (lvl("kade") - 1)) * (R.dubbel ? 2 : 1)) + (extra || 0);
    if (R.kaart.goud && R.goed % 5 === 0) mu += 25;
    R.munten += mu; R.xp += Math.round(5 * (1 + 0.15 * Math.max(0, lvl("loods") - 1)) * (R.kaart.xp ? 1.5 : 1));
    drijf("+" + mu); GELUID.goed(); hudBij(true);
  } else {
    m[sleutel] = 0; R.fout++; R.jf++; S.stats.fout++;
    if (info) R.fouten.push(info);
    if (R.boeien > 0) { R.boeien--; drijf("boei", "boei"); } else R.reeks = 0;
    GELUID.fout(); hudBij();
  }
  bewaar();
}
function speelJob() {
  if (R.opruim) { R.opruim(); R.opruim = null; }
  var id = R.jobs[R.i], sp = SPEL[id];
  R.jg = 0; R.jf = 0; R.dubbelNu = false;
  if (id === "goud") R.dubbel = true;
  app.innerHTML = hud() + '<section class="spel spel-' + id + '"><p class="spelnaam"><b>' + sp.naam + "</b>" + (R.dubbel ? '<span class="x2">dubbele munten</span>' : "") + '</p><div id="veld" class="veld"></div></section>';
  hudBij();
  $("#stop").onclick = function () { if (R.goed + R.fout === 0) { haven(); return; } uitslag(true); };
  var veld = $("#veld");
  function begin() { SPELEN[id](veld, klaarJob); }
  if (!S.gezien[id]) {
    veld.innerHTML = '<div class="intro"><div class="introbeeld">' + K.gebouwSVG(sp.geb, Math.max(1, lvl(sp.geb))) + "</div><h2>" + sp.naam + "</h2><p>" + sp.uitleg + '</p><button class="knop groot" id="go">Begin</button></div>';
    $("#go").onclick = function () { S.gezien[id] = 1; bewaar(); begin(); }; $("#go").focus();
  } else begin();
}
function klaarJob() {
  if (R.opruim) { R.opruim(); R.opruim = null; }
  var id = R.jobs[R.i]; S.laatst[id] = S.stats.diensten + 1;
  if (R.dubbel && id !== "goud") R.dubbel = false;
  R.i++;
  if (R.i >= R.jobs.length) return uitslag();
  kaartKeuze();
}
function kaartKeuze() {
  var drie = schud(KAARTEN.filter(function (k) { return !R.kaart[k.id] || k.id === "boei" || k.id === "dubbel"; })).slice(0, 3), volgende = SPEL[R.jobs[R.i]];
  app.innerHTML = hud() + '<section class="spel kaartkeuze"><p class="spelnaam"><b>Schip klaar</b><span>' + R.jg + " goed" + (R.jf ? ", " + R.jf + " fout" : "") + '</span></p><h2>Kies een bonus</h2><div class="kaarten">' +
    drie.map(function (k, i) { return '<button class="kaart" data-k="' + k.id + '" style="--i:' + i + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + k.i + '"/></svg><b>' + k.naam + "</b><span>" + k.t + "</span></button>"; }).join("") +
    '</div><p class="straks">Hierna: ' + volgende.naam + "</p></section>";
  hudBij();
  $("#stop").onclick = function () { uitslag(true); };
  $$(".kaart").forEach(function (b) {
    b.onclick = function () {
      var k = b.getAttribute("data-k");
      if (k === "boei") R.boeien++; else if (k === "dubbel") R.dubbel = true; else R.kaart[k] = 1;
      GELUID.munt(); $$(".kaart").forEach(function (x) { x.disabled = true; if (x !== b) x.classList.add("weg"); }); b.classList.add("gekozen");
      wacht(650, speelJob);
    };
  });
}

/* gedeeld: het blok na een fout antwoord */
function naFout(veld, goed, uitleg, verder, okTekst) {
  var d = document.createElement("div"); d.className = "nafout" + (okTekst ? " ok" : "");
  d.innerHTML = (okTekst ? "<p><b>" + okTekst + "</b></p>" : "") + (goed ? '<p class="ja"><span>Juiste antwoord:</span> ' + esc(goed) + "</p>" : "") + (uitleg ? '<p class="waarom">' + esc(uitleg) + "</p>" : "") + '<button class="knop" id="verder">Verder</button>';
  veld.appendChild(d); var b = $("#verder", d); b.onclick = verder; b.focus(); d.scrollIntoView({ block: "nearest", behavior: RM.matches ? "auto" : "smooth" });
}

var SPELEN = {};

/* --- Lossen: meerkeuze. De goede container gaat het schip op. --- */
SPELEN.lossen = function (veld, klaar, goud) {
  var eerst = {}; if (goud) R.fouten.forEach(function (f) { if (f.k) eerst[f.k] = 1; });
  var items = kies(pool("mc"), kq, 5, eerst), i = 0, ruim = [];
  function teken() {
    var q = items[i], opts = schud(q.o.map(function (t, n) { return { t: t, ok: n === 0 }; })), weg = -1;
    if (R.kaart.kijker) { var fout = []; opts.forEach(function (o, n) { if (!o.ok) fout.push(n); }); weg = fout[Math.floor(Math.random() * fout.length)]; }
    veld.innerHTML = '<p class="teller">Container ' + (i + 1) + " van " + items.length + '</p><h2 class="vraag" id="vraag" tabindex="-1">' + esc(q.q) + '</h2><div class="stapel" role="group" aria-labelledby="vraag">' +
      opts.map(function (o, n) { return '<button class="container c' + n + (n === weg ? " weg" : "") + '" data-n="' + n + '"' + (n === weg ? " disabled" : "") + '><span class="haak"></span><span class="tx">' + esc(o.t) + "</span></button>"; }).join("") + "</div>" +
      '<div class="ruim' + (goud ? " goud" : "") + '" aria-hidden="true">' + items.map(function (x, n) { return '<i class="' + (ruim[n] || "") + '"></i>'; }).join("") + "</div>";
    $("#vraag").focus({ preventScroll: true });
    $$(".container", veld).forEach(function (b) {
      b.onclick = function () {
        var o = opts[+b.getAttribute("data-n")];
        $$(".container", veld).forEach(function (x) { x.disabled = true; if (opts[+x.getAttribute("data-n")].ok) x.classList.add("goed"); });
        ruim[i] = o.ok ? "vol" : "mis"; $$(".ruim i", veld)[i].className = ruim[i] + " nieuw";
        beoordeel(o.ok, kq(q), { q: q.q, goed: q.o[0], k: kq(q) });
        function door() { i++; if (i < items.length) teken(); else klaar(); }
        if (o.ok) { b.classList.add("hijs"); wacht(900, door); }
        else { b.classList.add("fout"); naFout(veld, q.o[0], q.u, door); }
      };
    });
  }
  R.opruim = toetsen(function (e) { var n = "1234".indexOf(e.key); if (n >= 0) { var b = $$(".container", veld)[n]; if (b && !b.disabled) b.click(); } });
  teken();
};
SPELEN.goud = function (veld, klaar) { SPELEN.lossen(veld, klaar, true); };
function toetsen(f) { document.addEventListener("keydown", f); return function () { document.removeEventListener("keydown", f); }; }

/* --- Douane: goed of fout? --- */
SPELEN.douane = function (veld, klaar) {
  var items = kies(pool("mc"), kq, 6), i = 0;
  function teken() {
    var q = items[i], waar = Math.random() < 0.5, claim = waar ? q.o[0] : q.o[1 + Math.floor(Math.random() * 3)];
    veld.innerHTML = '<p class="teller">Vrachtbrief ' + (i + 1) + " van " + items.length + '</p><div class="brief" id="brief"><p class="briefkop">Goed of fout?</p><h2 class="vraag" id="vraag" tabindex="-1">' + esc(q.q) + '</h2><p class="claim"><span>Antwoord</span>' + esc(claim) + '</p><span class="stempel" id="stempel" aria-hidden="true"></span></div>' +
      '<div class="tweeknop"><button class="keus ja" data-k="1">Goed</button><button class="keus nee" data-k="0">Fout</button></div>';
    $("#vraag").focus({ preventScroll: true });
    $$(".keus", veld).forEach(function (b) {
      b.onclick = function () {
        var zegt = b.getAttribute("data-k") === "1", ok = zegt === waar, st = $("#stempel");
        $$(".keus", veld).forEach(function (x) { x.disabled = true; }); b.classList.add("gekozen");
        st.textContent = waar ? "GOED" : "FOUT"; st.className = "stempel aan " + (waar ? "ja" : "nee");
        $("#brief").classList.add(ok ? "ok" : "mis");
        beoordeel(ok, kq(q), { q: q.q, goed: q.o[0], k: kq(q) });
        function door() { i++; if (i < items.length) teken(); else klaar(); }
        if (ok && waar) wacht(950, door);
        else naFout(veld, q.o[0], ok ? "" : q.u, door, ok ? "Klopt, dat antwoord was fout." : "");
      };
    });
  }
  R.opruim = toetsen(function (e) { var k = e.key.toLowerCase(); if (k === "g" || k === "f") { var b = $(".keus." + (k === "g" ? "ja" : "nee"), veld); if (b && !b.disabled) b.click(); } });
  teken();
};

/* --- Sorteerband: kisten naar de goede loods --- */
SPELEN.band = function (veld, klaar) {
  var set = P.sort[Math.floor(Math.random() * P.sort.length)];
  var alle = schud(set.A.map(function (t, n) { return { t: t, e: set.eA[n], k: "a" }; })).slice(0, 4).concat(schud(set.B.map(function (t, n) { return { t: t, e: set.eB[n], k: "b" }; })).slice(0, 4));
  var items = schud(alle), i = 0, t0 = 0, T = 9, bezig = false;
  veld.innerHTML = '<p class="teller" id="teller"></p><div class="band"><div class="baan" id="baan"><span class="rollen" aria-hidden="true"></span><div class="zakker" id="zak"><div class="kist" id="kist"></div></div></div>' +
    '<div class="loodsen"><button class="lds l" data-k="a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg><b>' + esc(set.a) + '</b></button><button class="lds r" data-k="b"><b>' + esc(set.b) + '</b><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div><p class="meld" id="meld" aria-live="polite"></p></div>';
  var baan = $("#baan"), zak = $("#zak"), kist = $("#kist");
  function teken() {
    var it = items[i]; bezig = false;
    $("#teller").textContent = "Kist " + (i + 1) + " van " + items.length; $("#meld").textContent = "";
    kist.className = "kist"; kist.innerHTML = '<span class="em" aria-hidden="true">' + it.e + "</span><b>" + esc(it.t) + "</b>";
    zak.style.animation = "none"; void zak.offsetWidth;
    zak.style.setProperty("--val", Math.max(0, baan.clientHeight - kist.offsetHeight - 16) + "px"); zak.style.animation = ""; zak.style.animationPlayState = "running";
    t0 = Date.now();
  }
  function kiesKant(k) {
    if (bezig) return; bezig = true;
    var it = items[i], ok = it.k === k, snel = ok && (Date.now() - t0) < T * 500;
    zak.style.animationPlayState = "paused"; kist.classList.add(k === "a" ? "naarL" : "naarR", ok ? "ok" : "mis");
    var knop = $('.lds[data-k="' + k + '"]', veld); knop.classList.add(ok ? "ok" : "mis"); setTimeout(function () { knop.classList.remove("ok", "mis"); }, 600);
    beoordeel(ok, "s" + hash(set.a + it.t), { q: it.t + ": " + set.a + " of " + set.b + "?", goed: it.k === "a" ? set.a : set.b }, snel ? 5 : 0);
    $("#meld").innerHTML = ok ? (snel ? "Snel gesorteerd: 5 munten extra" : "") : "Juiste antwoord: <b>" + esc(it.k === "a" ? set.a : set.b) + "</b>";
    wacht(ok ? 520 : 1700, function () { i++; if (i < items.length) teken(); else klaar(); });
  }
  $$(".lds", veld).forEach(function (b) { b.onclick = function () { kiesKant(b.getAttribute("data-k")); }; });
  var px = null;
  baan.addEventListener("pointerdown", function (e) { px = e.clientX; });
  baan.addEventListener("pointerup", function (e) { if (px === null) return; var dx = e.clientX - px; px = null; if (Math.abs(dx) > 36) kiesKant(dx < 0 ? "a" : "b"); });
  R.opruim = toetsen(function (e) { if (e.key === "ArrowLeft") kiesKant("a"); if (e.key === "ArrowRight") kiesKant("b"); });
  teken();
};

/* --- Aanmeren: koppel begrip en omschrijving (of oorzaak en gevolg) --- */
SPELEN.aanmeren = function (veld, klaar) {
  var cg = pool("cg").length >= 4 && Math.random() < 0.4, ronde = 0, lijnen = [], fn = null;
  function nieuweRonde() {
    var paren = cg ? kies(pool("cg"), function (x) { return "g" + hash(x.o); }, 4).map(function (x) { return { l: x.o, r: x.g, k: "g" + hash(x.o) }; })
      : kies(pool("cards"), kc, 4).map(function (x) { return { l: x.b, r: x.o, k: kc(x) }; });
    var rechts = schud(paren.map(function (p, n) { return n; })), gekozen = -1, fout = {}, af = 0; lijnen = [];
    veld.innerHTML = '<p class="teller">Ronde ' + (ronde + 1) + " van 2 · " + (cg ? "oorzaak en gevolg" : "begrip en omschrijving") + '</p><div class="meer' + (cg ? " cg" : "") + '" id="meer"><svg class="touwen" id="touwen" aria-hidden="true"></svg><div class="kol links">' +
      paren.map(function (p, n) { return '<button class="paal l" data-n="' + n + '">' + esc(p.l) + "</button>"; }).join("") + '</div><div class="kol rechts">' +
      rechts.map(function (n) { return '<button class="paal r" data-n="' + n + '">' + esc(paren[n].r) + "</button>"; }).join("") + "</div></div>";
    var meer = $("#meer");
    fn = function () {
      var b = meer.getBoundingClientRect(), d = "";
      lijnen.forEach(function (n) { var a = $('.paal.l[data-n="' + n + '"]', meer).getBoundingClientRect(), c = $('.paal.r[data-n="' + n + '"]', meer).getBoundingClientRect(), x1 = a.right - b.left, y1 = a.top + a.height / 2 - b.top, x2 = c.left - b.left, y2 = c.top + c.height / 2 - b.top; d += '<path d="M' + x1 + "," + y1 + " C" + (x1 + 22) + "," + y1 + " " + (x2 - 22) + "," + y2 + " " + x2 + "," + y2 + '"/>'; });
      $("#touwen").innerHTML = d;
    };
    $$(".paal.l", meer).forEach(function (b) { b.onclick = function () { $$(".paal.l", meer).forEach(function (x) { x.classList.remove("kies"); }); gekozen = +b.getAttribute("data-n"); b.classList.add("kies"); GELUID.tik(); }; });
    $$(".paal.r", meer).forEach(function (b) {
      b.onclick = function () {
        if (gekozen < 0) { toast("Tik eerst links."); return; }
        var n = +b.getAttribute("data-n"), l = $('.paal.l[data-n="' + gekozen + '"]', meer);
        if (n === gekozen) {
          l.classList.remove("kies"); l.classList.add("vast"); b.classList.add("vast"); l.disabled = b.disabled = true; lijnen.push(n); fn(); af++;
          if (!fout[n]) beoordeel(true, paren[n].k); else GELUID.tik();
          gekozen = -1;
          if (af === 4) wacht(900, function () { ronde++; if (ronde < 2) nieuweRonde(); else klaar(); });
        } else {
          if (!fout[gekozen]) { fout[gekozen] = 1; beoordeel(false, paren[gekozen].k, { q: paren[gekozen].l, goed: paren[gekozen].r }); }
          l.classList.add("schud"); b.classList.add("schud"); setTimeout(function () { l.classList.remove("schud"); b.classList.remove("schud"); }, 450);
        }
      };
    });
  }
  var opnieuw = function () { if (fn) fn(); }; window.addEventListener("resize", opnieuw);
  R.opruim = function () { window.removeEventListener("resize", opnieuw); };
  nieuweRonde();
};

/* --- Flessenpost: het begrip bij de omschrijving, letter voor letter --- */
SPELEN.fles = function (veld, klaar) {
  var items = kies(woorden(), kc, 4), i = 0, staat = null;
  function teken() {
    var c = items[i], w = c.b.toUpperCase(), n = w.length, vast = {};
    if (lvl("vuurtoren") >= 2) vast[0] = 1; if (lvl("vuurtoren") >= 3) vast[n - 1] = 1;
    var los = []; for (var j = 0; j < n; j++) if (!vast[j]) los.push(w[j]);
    var tegels = schud(los), pog = 0; if (tegels.join("") === los.join("") && los.length > 1) tegels.reverse();
    staat = { w: w, vak: [], vast: vast, tegels: tegels.map(function (t) { return { t: t, op: -1 }; }), klaar: false };
    for (j = 0; j < n; j++) staat.vak[j] = vast[j] ? w[j] : "";
    veld.innerHTML = '<p class="teller">Fles ' + (i + 1) + " van " + items.length + '</p><div class="post"><p class="briefkop">Welk begrip is dit?</p><h2 class="vraag" id="vraag" tabindex="-1">' + esc(c.o) + '</h2></div><div class="vakken" id="vakken" role="group" aria-label="Jouw antwoord"></div><div class="tegels" id="tegels" role="group" aria-label="Letters"></div><p class="meld" id="meld" aria-live="polite"></p>';
    function vul() {
      $("#vakken").innerHTML = staat.vak.map(function (l, j) { return '<button class="vak' + (staat.vast[j] ? " vast" : "") + (l ? " vol" : "") + '" data-j="' + j + '"' + (staat.vast[j] || !l ? " disabled" : "") + ' aria-label="' + (l ? "Letter " + l + ", tik om terug te leggen" : "Leeg vak") + '">' + (l || "") + "</button>"; }).join("");
      $("#tegels").innerHTML = staat.tegels.map(function (t, j) { return '<button class="tegel' + (t.op >= 0 ? " weg" : "") + '" data-j="' + j + '"' + (t.op >= 0 ? " disabled" : "") + ">" + t.t + "</button>"; }).join("");
    }
    function leg(j) { var t = staat.tegels[j], plek = staat.vak.indexOf(""); if (staat.klaar || t.op >= 0 || plek < 0) return; staat.vak[plek] = t.t; t.op = plek; GELUID.tik(); vul(); if (staat.vak.indexOf("") < 0) check(); }
    function terug(j) { if (staat.klaar || staat.vast[j]) return; staat.tegels.forEach(function (t) { if (t.op === j) t.op = -1; }); staat.vak[j] = ""; vul(); }
    function door() { i++; if (i < items.length) teken(); else klaar(); }
    function check() {
      if (staat.vak.join("") === w) { staat.klaar = true; $("#vakken").classList.add("ok"); beoordeel(true, kc(c), null, pog ? 0 : 5); wacht(1000, door); return; }
      pog++;
      if (pog >= 2) { staat.klaar = true; beoordeel(false, kc(c), { q: c.o, goed: c.b }); for (var j = 0; j < n; j++) staat.vak[j] = w[j]; vul(); $("#vakken").classList.add("mis"); $$(".vak", veld).forEach(function (b) { b.disabled = true; }); $("#tegels").innerHTML = ""; naFout(veld, c.b, "", door); return; }
      $("#vakken").classList.add("schud");
      wacht(500, function () {
        $("#vakken").classList.remove("schud");
        for (var j = 0; j < n; j++) if (!staat.vast[j]) { if (staat.vak[j] === w[j]) staat.vast[j] = 1; else { staat.tegels.forEach(function (t) { if (t.op === j) t.op = -1; }); staat.vak[j] = ""; } }
        staat.tegels.forEach(function (t) { if (t.op >= 0 && staat.vast[t.op]) t.op = 99; });
        vul(); $("#meld").textContent = "Bijna. De groene letters staan goed. Nog één kans.";
      });
    }
    veld.onclick = function (e) { var t = e.target.closest(".tegel"), v = e.target.closest(".vak"); if (t) leg(+t.getAttribute("data-j")); else if (v) terug(+v.getAttribute("data-j")); };
    staat.typ = function (e) {
      if (e.key === "Backspace") { for (var j = n - 1; j >= 0; j--) if (staat.vak[j] && !staat.vast[j]) { terug(j); break; } return; }
      if (e.key.length !== 1) return; var k = e.key.toUpperCase();
      for (var j = 0; j < staat.tegels.length; j++) if (staat.tegels[j].op < 0 && staat.tegels[j].t === k) { leg(j); break; }
    };
    vul(); $("#vraag").focus({ preventScroll: true });
  }
  R.opruim = toetsen(function (e) { if (staat && staat.typ && !e.target.closest("#verder")) staat.typ(e); });
  teken();
};

/* --- Konvooi: tijdlijn op volgorde --- */
SPELEN.konvooi = function (veld, klaar) {
  var ronde = 0;
  function nieuweRonde() {
    var kand = kies(pool("tl"), function (x) { return "t" + hash(x.t); }, 8), items = [], jaren = {};
    kand.forEach(function (x) { if (items.length < 4 && !jaren[x.j]) { jaren[x.j] = 1; items.push(x); } });
    var stap = 0, fout = {}, goed = items.slice().sort(function (a, b) { return a.j - b.j; });
    veld.innerHTML = '<p class="teller">Ronde ' + (ronde + 1) + ' van 2</p><h2 class="vraag" id="vraag" tabindex="-1">Wat gebeurde het eerst? Tik de schepen aan van vroeg naar laat.</h2><div class="konvooi" id="konvooi">' +
      schud(items).map(function (x) { return '<button class="vaartuig" data-t="' + hash(x.t) + '"><span class="nr"></span><span class="tx">' + esc(x.t) + '</span><span class="jr"></span></button>'; }).join("") + "</div>";
    $("#vraag").focus({ preventScroll: true });
    $$(".vaartuig", veld).forEach(function (b) {
      b.onclick = function () {
        var x = goed[stap], k = "t" + hash(x.t);
        if (b.getAttribute("data-t") === hash(x.t)) {
          b.disabled = true; b.classList.add("vast"); b.style.order = stap; $(".nr", b).textContent = stap + 1; $(".jr", b).textContent = x.l;
          if (!fout[k]) beoordeel(true, k); else GELUID.tik();
          stap++;
          if (stap === goed.length) wacht(1500, function () { ronde++; if (ronde < 2 && pool("tl").length >= 8) nieuweRonde(); else klaar(); });
        } else {
          if (!fout[k]) { fout[k] = 1; beoordeel(false, k, { q: "Tijdlijn: " + x.t, goed: x.l }); }
          b.classList.add("schud"); setTimeout(function () { b.classList.remove("schud"); }, 450);
        }
      };
    });
  }
  nieuweRonde();
};

/* ---------- uitslag ---------- */
function uitslag(gestopt) {
  if (R.opruim) { R.opruim(); R.opruim = null; }
  var tot = R.goed + R.fout, pct = tot ? R.goed / tot : 0, sterren = gestopt ? 0 : pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
  var regels = [["Verdiend met antwoorden", R.munten]], som = R.munten, vandaag = dag();
  if (!gestopt) {
    if (R.fout === 0 && tot > 0) { regels.push(["Foutloze dienst", 50]); som += 50; }
    if (lvl("markt") && S.bonusdag !== vandaag) { var db = lvl("markt") * 50; regels.push(["Dagbonus van de markt", db]); som += db; S.bonusdag = vandaag; }
    if (lvl("bank")) { var rente = Math.min([0, 60, 120, 200][lvl("bank")], Math.round(S.munten * (1 + lvl("bank")) / 100)); if (rente > 0) { regels.push(["Rente van de bank (" + (1 + lvl("bank")) + "%)", rente]); som += rente; } }
    S.stats.diensten++;
    var gisteren = dag(new Date(Date.now() - 864e5));
    if (S.reeks.d !== vandaag) { S.reeks.n = S.reeks.d === gisteren ? S.reeks.n + 1 : 1; S.reeks.d = vandaag; }
  }
  var r0 = rang(S.xp); S.munten += som; S.xp += R.xp; S.stats.combo = Math.max(S.stats.combo, R.top); bewaar();
  var r1 = rang(S.xp), mt = meta(P.id), na = beheerst(P.id, mt.n + mt.nb), kan = kanBouwen(), uniek = {}, fouten = R.fouten.filter(function (f) { if (uniek[f.q]) return false; uniek[f.q] = 1; return true; });
  var h = '<section class="uitslag"><p class="oog">' + (gestopt ? "Dienst gestopt" : "Dienst klaar") + "</p>" +
    (gestopt ? "<h1>Je munten zijn bewaard</h1>" : '<div class="sterren" role="img" aria-label="' + sterren + ' van 3 sterren">' + [1, 2, 3].map(function (i) { return '<svg viewBox="0 0 24 24" class="' + (i <= sterren ? "aan" : "") + '" style="--i:' + i + '"><path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4 6.1 20.7l1.3-6.6L2.5 9.5l6.6-.8z"/></svg>'; }).join("") + "</div><h1>" + (sterren === 3 ? "Topdienst!" : sterren === 2 ? "Goed gewerkt" : "Dienst gedraaid") + "</h1>") +
    '<p class="score">' + R.goed + " van " + tot + " goed" + (R.top > 1 ? " · hoogste reeks ×" + R.top : "") + "</p>" +
    '<ul class="afrekening">' + regels.map(function (r) { return "<li><span>" + r[0] + "</span><b>" + MUNT + getal(r[1]) + "</b></li>"; }).join("") + '<li class="totaal"><span>Samen</span><b>' + MUNT + '<span id="telop">' + getal(som) + "</span></b></li></ul>" +
    '<div class="meter groot"><span>' + esc(P.titel) + '</span><span class="balk"><i id="nabalk" style="transform:scaleX(' + R.voor.toFixed(3) + ')"></i></span><b>' + Math.round(na * 100) + "%</b> beheerst</div>" +
    (r1 > r0 ? '<p class="nieuwrang">Nieuwe rang: <b>' + RANG[r1][0] + "</b></p>" : "") +
    (kan._ ? '<p class="tip">Je kunt iets bouwen in je haven.</p>' : "") +
    '<div class="knoppen"><button class="knop groot" id="weer">Nog een dienst</button><button class="knop groot licht" id="naarhaven">Naar mijn haven</button></div>';
  if (fouten.length) h += '<h2 class="tussen">Nog even kijken</h2><ul class="foutenlijst">' + fouten.map(function (f) { return "<li><p>" + esc(f.q) + '</p><p class="ja"><span>Juiste antwoord:</span> ' + esc(f.goed) + "</p></li>"; }).join("") + "</ul>";
  app.innerHTML = h + "</section>"; document.body.className = "";
  var klaarR = R; R = null; window.scrollTo(0, 0);
  if (!gestopt) GELUID.bouw();
  requestAnimationFrame(function () { requestAnimationFrame(function () { var b = $("#nabalk"); if (b) b.style.transform = "scaleX(" + na.toFixed(3) + ")"; }); });
  $("#weer").onclick = startDienst; $("#naarhaven").onclick = function () { haven(); if (kan._) toast("Tik op Bouwen: je hebt genoeg munten."); };
  $(gestopt ? "#naarhaven" : "#weer").focus({ preventScroll: true });
  return klaarR;
}

start();
})();
