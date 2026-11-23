/* Havenmeester: alle tekeningen (gebouwen, schepen, de haven) als SVG.
   Kleuren staan als klassen (k-...) in haven.css, zodat licht en donker vanzelf meegaan. */
(function () {
"use strict";

function R(x, y, w, h, c, rx) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" class="' + c + '"' + (rx ? ' rx="' + rx + '"' : "") + "/>"; }
function P(d, c) { return '<path d="' + d + '" class="' + c + '"/>'; }
function C(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="' + c + '"/>'; }
function ramen(x, y, n, stap, w, h) { var s = ""; for (var i = 0; i < n; i++) s += R(x + i * stap, y, w, h, "k-raam", 1.5); return s; }
var BONT = ["k-koraal", "k-teal", "k-goud", "k-groen", "k-muur"];

/* ---------- gebouwen: oorsprong (0,0) = midden onder, omhoog is negatief ---------- */
var G = {};

G.kade = function (l) {
  var s = "", kol = 2 + l, w = 40, x0 = -kol * w / 2, hoog = [1, 2, 1, 3, 2, 3];
  for (var i = 0; i < kol; i++) {
    var n = Math.min(l + 1, hoog[(i + l) % hoog.length]);
    for (var j = 0; j < n; j++) {
      var x = x0 + i * w, y = -18 * (j + 1);
      s += R(x + 1, y, w - 2, 17, BONT[(i * 2 + j + l) % BONT.length], 1.5);
      for (var k = 1; k < 5; k++) s += R(x + 1 + k * 7.6, y + 2, 1.2, 13, "k-rib");
    }
  }
  s += R(x0 - 14, -30, 4, 30, "k-staal") + R(x0 - 22, -34, 20, 5, "k-koraal", 2);
  return s;
};

G.douane = function (l) {
  var s = "";
  if (l >= 3) s += R(-92, -52, 34, 52, "k-steen2") + P("M-96,-52 L-75,-66 L-54,-52Z", "k-dak") + ramen(-86, -40, 2, 14, 8, 12) +
    R(58, -52, 34, 52, "k-steen2") + P("M54,-52 L75,-66 L96,-52Z", "k-dak") + ramen(64, -40, 2, 14, 8, 12);
  s += R(-60, -78, 120, 78, "k-steen") + P("M-66,-78 L-52,-98 L52,-98 L66,-78Z", "k-dak");
  s += ramen(-50, -68, 4, 28, 14, 18) + ramen(-50, -40, 1, 0, 14, 18) + ramen(34, -40, 1, 0, 14, 18);
  s += R(-14, -44, 28, 44, "k-donker", 3) + R(-11, -41, 22, 41, "k-hout", 2) + C(6, -20, 1.8, "k-goud");
  s += R(-66, -3, 132, 3, "k-muur2");
  if (l >= 2) s += R(-17, -128, 34, 34, "k-steen") + P("M-22,-128 L0,-152 L22,-128Z", "k-dak") + C(0, -111, 9, "k-muur") + P("M0,-111 L0,-117 M0,-111 L4,-109", "k-lijn");
  var top = l >= 2 ? -152 : -98;
  s += R(-1, top - 26, 2, 28, "k-staal") + P("M1," + (top - 26) + " l20,5 l-20,6Z", "k-vlag wapper");
  return s;
};

G.loods = function (l) {
  var s = "", n = l + 1, w = 46, x0 = -n * w / 2;
  for (var i = 0; i < n; i++) {
    var x = x0 + i * w;
    s += R(x, -58, w, 58, i % 2 ? "k-teal2" : "k-teal");
    s += P("M" + x + ",-58 L" + (x + w * 0.72) + ",-84 L" + (x + w) + ",-58Z", "k-dak");
    s += P("M" + (x + w * 0.72) + ",-84 L" + (x + w) + ",-58 L" + (x + w * 0.72) + ",-58Z", "k-raam");
    s += R(x + 8, -36, w - 16, 36, "k-donker", 2);
    for (var k = 1; k < 4; k++) s += R(x + 8, -36 + k * 9, w - 16, 1.2, "k-rib");
  }
  s += R(x0 - 3, -3, n * w + 6, 3, "k-muur2");
  s += R(x0 + n * w + 6, -16, 16, 16, "k-hout", 1.5) + R(x0 + n * w + 10, -30, 14, 14, "k-hout2", 1.5);
  return s;
};

G.kraan = function (l) {
  var H = 118 + 26 * l, s = "";
  s += P("M-34,0 L-22,-" + H + " L-14,-" + H + " L-24,0Z", "k-koraal") + P("M34,0 L22,-" + H + " L14,-" + H + " L24,0Z", "k-koraal");
  for (var y = 22; y < H - 14; y += 30) s += P("M-" + (30 - y * 0.085) + ",-" + y + " L" + (26 - (y + 30) * 0.085) + ",-" + (y + 30) + " M" + (30 - y * 0.085) + ",-" + y + " L-" + (26 - (y + 30) * 0.085) + ",-" + (y + 30), "k-lijn2");
  s += R(-78, -H - 12, 196, 12, "k-koraal", 2) + R(-78, -H - 2, 196, 2, "k-koraal2");
  s += P("M0,-" + (H + 12) + " L0,-" + (H + 46) + " M0,-" + (H + 46) + " L-76,-" + (H + 12) + " M0,-" + (H + 46) + " L116,-" + (H + 12), "k-lijn2");
  s += R(-4, -H - 48, 8, 38, "k-koraal");
  s += R(-12, -H + 2, 24, 18, "k-muur", 2) + R(-8, -H + 6, 16, 8, "k-raam", 1);
  s += '<g class="loopkat"><rect x="40" y="-' + (H + 1) + '" width="22" height="8" class="k-donker" rx="2"/><path d="M51,-' + (H - 7) + ' v46" class="k-lijn"/>' +
    R(36, -H + 39, 30, 15, BONT[l % BONT.length], 1.5) + "</g>";
  return s;
};

G.bank = function (l) {
  var s = "", w = l >= 2 ? 130 : 104, n = l >= 2 ? 6 : 4;
  s += R(-w / 2 - 8, -8, w + 16, 8, "k-muur2") + R(-w / 2 - 3, -14, w + 6, 6, "k-muur");
  s += R(-w / 2, -70, w, 56, "k-muur2");
  var stap = (w - 14) / (n - 1);
  for (var i = 0; i < n; i++) s += R(-w / 2 + 2 + i * stap, -70, 10, 56, "k-muur", 2);
  s += R(-9, -46, 18, 32, "k-donker", 2);
  s += R(-w / 2 - 4, -78, w + 8, 8, "k-muur") + P("M" + (-w / 2 - 6) + ",-78 L0,-108 L" + (w / 2 + 6) + ",-78Z", "k-muur2");
  s += C(0, -89, 6, "k-goud");
  if (l >= 3) s += P("M-24,-102 A24,24 0 0 1 24,-102Z", "k-goud") + R(-2, -138, 4, 14, "k-goud") + C(0, -140, 4, "k-goud");
  return s;
};

G.markt = function (l) {
  var s = "", xs = l === 1 ? [0] : l === 2 ? [-40, 40] : [-70, 0, 70];
  xs.forEach(function (x, n) {
    s += R(x - 30, -52, 3, 52, "k-hout2") + R(x + 27, -52, 3, 52, "k-hout2");
    s += R(x - 30, -24, 60, 24, "k-hout", 2);
    for (var i = 0; i < 6; i++) s += R(x - 36 + i * 12, -68, 12, 18, i % 2 ? "k-muur" : (n % 2 ? "k-teal" : "k-koraal")) + C(x - 30 + i * 12, -50, 6, i % 2 ? "k-muur" : (n % 2 ? "k-teal" : "k-koraal"));
    s += C(x - 16, -28, 5, "k-goud") + C(x - 5, -28, 5, "k-koraal") + C(x + 6, -28, 5, "k-groen") + C(x + 17, -28, 5, "k-goud");
  });
  if (l >= 3) { s += P("M-106,-84 Q-35,-70 0,-84 Q35,-70 106,-84", "k-lijn"); for (var i = 0; i < 9; i++) s += P("M" + (-92 + i * 23) + ",-" + (80 - Math.abs(4 - i) % 2 * 3) + " l6,10 l6,-10Z", BONT[i % 4]); }
  return s;
};

G.werf = function (l) {
  var s = "";
  s += P("M-80,0 L80,0 L80,-6 L-80,-16Z", "k-muur2");
  for (var i = 0; i < 5; i++) s += R(-62 + i * 30, -22 + i * 2.4, 5, 22 - i * 2.4, "k-hout2");
  var romp = "M-70,-24 L66,-24 Q84,-42 92,-64 L-58,-64 Q-70,-44 -70,-24Z";
  if (l === 1) { s += P(romp, "k-geraamte"); for (var i = 0; i < 8; i++) s += P("M" + (-52 + i * 18) + ",-24 Q" + (-56 + i * 18) + ",-46 " + (-48 + i * 18) + ",-64", "k-lijn2"); }
  else { s += P(romp, l === 3 ? "k-teal" : "k-hout"); s += P("M-68,-34 L74,-34", "k-lijn"); if (l === 3) s += R(-30, -86, 50, 22, "k-muur", 2) + ramen(-24, -80, 3, 14, 8, 8) + R(-2, -104, 12, 18, "k-koraal", 1); }
  s += R(-88, -92, 4, 92, "k-staal") + R(-90, -94, 58, 4, "k-staal") + P("M-40,-90 v22", "k-lijn") + R(-45, -68, 10, 8, "k-staal2", 1);
  return s;
};

G.vuurtoren = function (l) {
  var H = 108 + 22 * l, s = "";
  s += P("M-70,0 Q-52,-26 -22,-22 Q0,-34 26,-22 Q58,-24 72,0Z", "k-rots");
  s += P("M-20,-22 L-13,-" + H + " L13,-" + H + " L20,-22Z", "k-muur");
  for (var i = 0; i < 3; i++) { var y1 = 22 + (H - 22) * (0.12 + i * 0.3), y2 = y1 + (H - 22) * 0.15, a = 20 - 7 * (y1 - 22) / (H - 22), b = 20 - 7 * (y2 - 22) / (H - 22); s += P("M-" + a + ",-" + y1 + " L" + a + ",-" + y1 + " L" + b + ",-" + y2 + " L-" + b + ",-" + y2 + "Z", "k-koraal"); }
  s += R(-4, -40, 8, 14, "k-donker", 4);
  s += '<g transform="translate(0,-' + (H + 12) + ')"><g class="lichtbundel"><path d="M0,0 L190,-34 L190,34Z" class="k-bundel"/><path d="M0,0 L-190,-34 L-190,34Z" class="k-bundel"/></g></g>';
  s += R(-17, -H - 3, 34, 4, "k-donker") + R(-10, -H - 22, 20, 20, "k-licht", 2) + P("M-14,-" + (H + 22) + " L0,-" + (H + 40) + " L14,-" + (H + 22) + "Z", "k-koraal") + C(0, -H - 42, 2.5, "k-goud");
  return s;
};

/* de steiger ligt in het water: oorsprong = linksboven op de waterlijn */
G.steiger = function (l) {
  var L = 110 + 55 * l, s = "";
  for (var x = 8; x < L; x += 34) s += R(x, 0, 6, 34, "k-hout2");
  s += R(0, -6, L, 9, "k-hout", 2);
  for (var x = 0; x < L; x += 14) s += R(x, -6, 1, 9, "k-rib");
  for (var x = 16; x < L; x += 52) s += R(x - 3, -18, 6, 12, "k-donker", 2) + R(x - 5, -20, 10, 4, "k-donker", 2);
  if (l >= 2) s += R(L - 8, -52, 3, 46, "k-staal") + C(L - 6.5, -54, 6, "k-licht");
  if (l >= 3) s += P("M30,14 Q52,30 76,14Z", "k-koraal") + R(34, 11, 38, 3, "k-hout");
  return s;
};

G.leeg = function () {
  return '<ellipse cx="0" cy="-2" rx="54" ry="5" class="k-plek"/>' + R(-2, -46, 4, 46, "k-hout2") + R(-26, -62, 52, 30, "k-bord", 5) +
    P("M0,-56 v18 M-9,-47 h18", "k-plus");
};

/* ---------- schepen: oorsprong = midden op de waterlijn ---------- */
function romp(L, H, c, band) {
  var a = L / 2;
  return P("M" + (-a) + ",-" + H + " L" + (a + H * 0.7) + ",-" + H + " Q" + (a + 2) + ",2 " + (a - 12) + ",12 L" + (-a + 12) + ",12 Q" + (-a - 2) + ",4 " + (-a) + ",-" + H + "Z", c) +
    P("M" + (-a + 2) + ",3 L" + (a + 3) + ",3 Q" + (a - 2) + ",9 " + (a - 12) + ",12 L" + (-a + 12) + ",12 Q" + (-a + 3) + ",9 " + (-a + 2) + ",3Z", band || "k-romp2");
}
function vlag(x, y) { return R(x - 0.8, y - 22, 1.6, 22, "k-staal") + P("M" + (x + 1) + "," + (y - 22) + " l15,4 l-15,5Z", "k-vlag wapper"); }
function pijp(x, y, w, h, c) { return R(x - w / 2, y - h, w, h, c, 1.5) + R(x - w / 2, y - h, w, h * 0.22, "k-donker", 1.5) + '<g class="rook">' + C(x, y - h - 8, 5, "k-rook") + C(x + 5, y - h - 18, 7, "k-rook") + "</g>"; }
function mast(x, y, h, zeil, c) {
  var s = R(x - 1.2, y - h, 2.4, h, "k-hout2");
  if (zeil === 1) s += P("M" + (x + 3) + "," + (y - h + 4) + " Q" + (x + h * 0.5) + "," + (y - h * 0.5) + " " + (x + h * 0.42) + "," + (y - 6) + " L" + (x + 3) + "," + (y - 6) + "Z", c) + P("M" + (x - 3) + "," + (y - h + 10) + " L" + (x - h * 0.3) + "," + (y - 6) + " L" + (x - 3) + "," + (y - 6) + "Z", c);
  if (zeil === 2) for (var i = 0; i < 3; i++) { var yy = y - h + 6 + i * (h - 12) / 3, hh = (h - 12) / 3 - 4, ww = 14 + i * 5; s += P("M" + (x - ww) + "," + yy + " L" + (x + ww) + "," + yy + " Q" + (x + ww + 5) + "," + (yy + hh / 2) + " " + (x + ww) + "," + (yy + hh) + " L" + (x - ww) + "," + (yy + hh) + " Q" + (x - ww + 5) + "," + (yy + hh / 2) + " " + (x - ww) + "," + yy + "Z", c); }
  return s;
}
var SCHEPEN = [
  { id: "sloep", naam: "Sloep", prijs: 0, werf: 0, L: 80, t: function () { return romp(80, 12, "k-hout") + R(-22, -15, 44, 3, "k-hout2", 1) + P("M-8,-13 L-34,-30 M10,-13 L36,-30", "k-lijn2") + vlag(-34, -12); } },
  { id: "visser", naam: "Vissersboot", prijs: 150, werf: 0, L: 110, t: function () { return romp(110, 16, "k-teal") + R(-40, -38, 30, 22, "k-muur", 2) + ramen(-35, -33, 2, 12, 8, 8) + mast(14, -16, 46, 0) + P("M14,-60 L48,-18 M14,-60 L-8,-18", "k-lijn") + P("M22,-16 q12,-14 26,0Z", "k-net") + vlag(-25, -38); } },
  { id: "sleper", naam: "Sleepboot", prijs: 300, werf: 0, L: 116, t: function () { return romp(116, 20, "k-donker", "k-koraal") + R(-30, -44, 44, 24, "k-muur", 3) + ramen(-24, -39, 3, 13, 8, 9) + R(-18, -58, 26, 14, "k-koraal", 2) + ramen(-13, -55, 2, 11, 7, 7) + pijp(26, -20, 13, 30, "k-koraal") + C(-52, -6, 6, "k-band") + C(-28, -4, 6, "k-band") + C(40, -6, 6, "k-band") + vlag(-5, -58); } },
  { id: "tjalk", naam: "Tjalk", prijs: 500, werf: 1, L: 136, t: function () { return romp(136, 15, "k-hout", "k-donker") + R(-52, -24, 30, 9, "k-hout2", 2) + mast(4, -15, 88, 1, "k-zeil") + vlag(4, -103) + C(58, -8, 6, "k-hout2"); } },
  { id: "veer", naam: "Veerboot", prijs: 800, werf: 1, L: 160, t: function () { return romp(160, 18, "k-muur", "k-teal") + R(-62, -40, 120, 22, "k-muur", 3) + ramen(-56, -35, 8, 14, 9, 10) + R(-46, -56, 82, 16, "k-teal", 3) + ramen(-40, -52, 5, 15, 9, 8) + pijp(8, -56, 14, 18, "k-koraal") + vlag(-40, -56); } },
  { id: "stoom", naam: "Stoomboot", prijs: 1200, werf: 1, L: 170, t: function () { return romp(170, 18, "k-donker", "k-steen") + R(-60, -36, 112, 18, "k-muur", 2) + ramen(-54, -32, 7, 15, 8, 9) + pijp(-20, -36, 13, 38, "k-donker") + pijp(14, -36, 13, 38, "k-donker") + '<g transform="translate(64,-6)"><g class="scheprad">' + C(0, 0, 20, "k-rad") + P("M-20,0 H20 M0,-20 V20 M-14,-14 L14,14 M-14,14 L14,-14", "k-lijn2") + "</g></g>" + vlag(-52, -36); } },
  { id: "kust", naam: "Kustvaarder", prijs: 1800, werf: 2, L: 190, t: function () { return romp(190, 22, "k-teal", "k-donker") + R(-86, -58, 40, 36, "k-muur", 3) + ramen(-80, -52, 3, 12, 7, 8) + ramen(-80, -38, 3, 12, 7, 8) + pijp(-64, -58, 12, 16, "k-koraal") + R(-36, -32, 44, 10, "k-hout", 1.5) + R(14, -32, 44, 10, "k-hout", 1.5) + R(8, -62, 3, 40, "k-staal") + P("M9,-62 L52,-40", "k-lijn2") + vlag(-78, -58); } },
  { id: "klipper", naam: "Klipper", prijs: 2500, werf: 2, L: 200, t: function () { return romp(200, 18, "k-donker", "k-goud") + mast(-58, -18, 86, 2, "k-zeil") + mast(-4, -18, 102, 2, "k-zeil") + mast(50, -18, 88, 2, "k-zeil") + P("M100,-18 L132,-30", "k-lijn2") + P("M52,-98 L128,-30 L60,-30Z", "k-zeil") + vlag(-4, -120); } },
  { id: "container", naam: "Containerschip", prijs: 3500, werf: 2, L: 230, t: function () { var s = romp(230, 24, "k-groen", "k-koraal") + R(-108, -72, 34, 48, "k-muur", 3) + ramen(-102, -66, 2, 14, 9, 8) + ramen(-102, -52, 2, 14, 9, 8) + pijp(-91, -72, 12, 14, "k-koraal"); for (var i = 0; i < 6; i++) for (var j = 0; j < [3, 4, 4, 3, 4, 2][i]; j++) s += R(-66 + i * 29, -38 - j * 14, 27, 13, BONT[(i + j * 2) % BONT.length], 1.5); return s + vlag(-100, -72); } },
  { id: "tanker", naam: "Tanker", prijs: 5000, werf: 3, L: 240, t: function () { return romp(240, 20, "k-steen", "k-donker") + R(-112, -64, 38, 44, "k-muur", 3) + ramen(-106, -58, 3, 11, 7, 8) + ramen(-106, -44, 3, 11, 7, 8) + pijp(-93, -64, 13, 16, "k-donker") + R(-64, -27, 170, 7, "k-staal", 2) + R(-40, -36, 5, 16, "k-staal2") + R(10, -36, 5, 16, "k-staal2") + R(60, -36, 5, 16, "k-staal2") + R(-42, -38, 110, 3, "k-staal2") + vlag(-104, -64); } },
  { id: "cruise", naam: "Cruiseschip", prijs: 7500, werf: 3, L: 250, t: function () { return romp(250, 22, "k-muur", "k-teal") + R(-104, -40, 200, 18, "k-muur", 3) + ramen(-98, -36, 14, 14, 8, 8) + R(-90, -56, 164, 16, "k-muur", 3) + ramen(-84, -52, 11, 14, 8, 7) + R(-70, -70, 110, 14, "k-muur2", 3) + ramen(-64, -67, 7, 14, 8, 6) + pijp(-24, -70, 18, 20, "k-koraal") + pijp(12, -70, 18, 20, "k-koraal") + vlag(-84, -56); } },
  { id: "goud", naam: "Gouden jacht", prijs: 12000, werf: 3, L: 190, t: function () { return romp(190, 18, "k-goud", "k-muur") + P("M-70,-18 L-52,-40 L44,-40 L70,-18Z", "k-muur") + ramen(-46, -35, 6, 15, 10, 9) + P("M-40,-40 L-28,-56 L22,-56 L38,-40Z", "k-goud") + R(-4, -78, 2.4, 22, "k-staal") + C(-3, -80, 3, "k-goud") + vlag(-28, -56); } }
];
function schip(id) { for (var i = 0; i < SCHEPEN.length; i++) if (SCHEPEN[i].id === id) return SCHEPEN[i]; return SCHEPEN[0]; }
function schipSVG(id, cls) { var s = schip(id), b = s.L / 2 + 30, t = Math.round(s.L * 0.62 + 24); return '<svg class="' + (cls || "schipje") + '" viewBox="' + (-b) + " -" + t + " " + (b * 2) + " " + (t + 18) + '" aria-hidden="true" focusable="false">' + s.t() + "</svg>"; }

/* ---------- de haven ---------- */
function golf(y, amp, per, c, extra) {
  var d = "M-" + per + "," + y, n = Math.ceil(1600 / per) + 3;
  for (var i = 0; i < n; i++) d += " q" + per / 4 + ",-" + amp + " " + per / 2 + ",0 t" + per / 2 + ",0";
  return '<path d="' + d + " V660 H-" + per + 'Z" class="' + c + " golf " + (extra || "") + '" style="--per:-' + per + 'px"/>';
}
function molen(x, y, s) {
  return '<g transform="translate(' + x + "," + y + ") scale(" + s + ')">' + P("M-9,0 L-5,-34 L5,-34 L9,0Z", "k-ver2") + P("M-6,-34 L0,-42 L6,-34Z", "k-ver2") +
    '<g transform="translate(0,-36)"><g class="wieken"><path d="M0,0 L-3,-30 L3,-30Z M0,0 L30,-3 L30,3Z M0,0 L3,30 L-3,30Z M0,0 L-30,3 L-30,-3Z" class="k-ver2"/></g></g></g>';
}
var PLEK = { vuurtoren: 110, markt: 310, douane: 520, loods: 730, kade: 950, kraan: 1130, bank: 1310, werf: 1490 };

function haven(st) {
  var s = '<svg class="haven-svg" viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax slice" role="group" aria-label="Jouw haven">';
  s += '<defs><linearGradient id="lucht" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s-lucht1"/><stop offset="1" class="s-lucht2"/></linearGradient>' +
    '<linearGradient id="zee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s-zee1"/><stop offset="1" class="s-zee2"/></linearGradient>' +
    '<radialGradient id="gloed"><stop offset="0" class="s-gloed1"/><stop offset="1" class="s-gloed2"/></radialGradient></defs>';
  s += '<rect width="1600" height="440" fill="url(#lucht)"/>';
  s += '<g class="sterren">'; for (var i = 0; i < 46; i++) s += C((i * 397) % 1600, (i * 71) % 250 + 8, i % 5 ? 1.3 : 2, "k-ster"); s += "</g>";
  s += C(690, 190, 150, "k-gloed") + C(690, 190, 44, "k-zon") + '<circle cx="674" cy="180" r="38" class="k-maanhap"/>';
  s += '<g class="wolk w1"><path d="M0,40 a26,26 0 0 1 36,-22 a34,34 0 0 1 62,-4 a24,24 0 0 1 30,26Z" class="k-wolk"/></g>' +
    '<g class="wolk w2"><path d="M0,40 a22,22 0 0 1 30,-18 a28,28 0 0 1 52,-2 a20,20 0 0 1 26,20Z" class="k-wolk"/></g>' +
    '<g class="wolk w3"><path d="M0,40 a30,30 0 0 1 42,-24 a38,38 0 0 1 70,-4 a26,26 0 0 1 34,28Z" class="k-wolk"/></g>';
  s += P("M0,404 L0,352 Q90,318 200,344 Q300,306 420,340 L440,340 L440,318 L452,300 L464,318 L464,338 Q560,322 660,346 Q790,300 930,342 Q1040,318 1130,344 Q1260,304 1390,340 Q1500,322 1600,350 L1600,404Z", "k-ver1");
  s += P("M0,404 L0,372 Q120,352 260,372 Q380,350 520,374 Q680,352 820,372 Q980,350 1140,374 Q1300,354 1440,372 Q1530,362 1600,372 L1600,404Z", "k-ver2");
  s += molen(236, 366, 1) + molen(872, 366, 0.85) + molen(1420, 366, 0.95);
  s += '<g class="meeuwen"><path d="M0,0 q7,-8 14,0 q7,-8 14,0" class="k-meeuw m1"/><path d="M0,0 q5,-6 10,0 q5,-6 10,0" class="k-meeuw m2"/><path d="M0,0 q6,-7 12,0 q6,-7 12,0" class="k-meeuw m3"/></g>';
  s += R(0, 400, 1600, 40, "k-kade") + R(0, 400, 1600, 5, "k-kade2") + R(0, 432, 1600, 8, "k-kade3");
  for (var x = 40; x < 1600; x += 120) s += R(x, 392, 8, 9, "k-donker", 2);
  ["vuurtoren", "markt", "douane", "loods", "kade", "kraan", "bank", "werf"].forEach(function (id) {
    var l = st.gebouwen[id] || 0, kan = st.kan && st.kan[id];
    s += '<g class="plek' + (l ? "" : " leeg") + (kan ? " kan" : "") + '" data-geb="' + id + '" transform="translate(' + PLEK[id] + ',400)" role="button" tabindex="0" aria-label="' + st.label(id) + '"><g class="pop">' + (l ? G[id](l) : G.leeg()) + "</g></g>";
  });
  s += '<rect y="436" width="1600" height="210" fill="url(#zee)"/>';
  s += golf(452, 5, 150, "k-golf1", "traag");
  var sl = st.gebouwen.steiger || 0;
  s += '<g class="plek' + (sl ? "" : " leeg") + (st.kan && st.kan.steiger ? " kan" : "") + '" data-geb="steiger" transform="translate(' + (sl ? 560 : 680) + "," + (sl ? 462 : 470) + ')" role="button" tabindex="0" aria-label="' + st.label("steiger") + '"><g class="pop">' + (sl ? G.steiger(sl) : G.leeg()) + "</g></g>";
  s += '<g class="vaart v1"><g transform="scale(.55)"><g class="dobber">' + schip(st.voorbij[0]).t() + "</g></g></g>";
  s += '<g transform="translate(1040,486)"><g class="dobber mijn" data-open="vloot" role="button" tabindex="0" aria-label="Jouw schip. Open de vloot" style="cursor:pointer">' + schip(st.schip).t() + "</g></g>";
  s += golf(500, 7, 190, "k-golf2");
  s += '<g class="vaart v2"><g transform="scale(.9)"><g class="dobber">' + schip(st.voorbij[1]).t() + "</g></g></g>";
  s += golf(566, 9, 240, "k-golf3", "snel");
  s += '<g class="boei" transform="translate(330,560)">' + P("M-9,0 L-5,-24 L5,-24 L9,0Z", "k-koraal") + R(-2, -34, 4, 10, "k-donker") + C(0, -36, 3.5, "k-licht") + "</g>";
  s += golf(606, 8, 210, "k-golf4");
  return s + "</svg>";
}

window.HM_KUNST = { gebouw: function (id, l) { return G[id](l); }, schepen: SCHEPEN, schip: schip, schipSVG: schipSVG, haven: haven,
  gebouwSVG: function (id, l) { return '<svg class="gebouwtje" viewBox="' + ({ steiger: "-10 -70 300 110", kraan: "-130 -250 260 254", vuurtoren: "-130 -250 260 254", kade: "-96 -92 192 96", markt: "-116 -112 232 116", loods: "-116 -112 232 116", werf: "-104 -116 208 120", bank: "-92 -156 184 160" }[id] || "-104 -186 208 190") + '" aria-hidden="true" focusable="false">' + (l ? G[id](l) : G.leeg()) + "</svg>"; } };
})();
