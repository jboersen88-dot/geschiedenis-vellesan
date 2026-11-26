#!/usr/bin/env node
/*
 * Maakt qr/posters.html en qr/posters.pdf uit data/stops.js.
 * Gebruik:  node tools/maak-qr.js [basisUrl]
 * Nodig (buiten de app-map installeren, zet NODE_PATH naar die node_modules):
 *   npm install qrcode      (en playwright voor de PDF; zonder playwright krijg je alleen de HTML)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const QRCode = require("qrcode");

const root = path.join(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "data", "stops.js"), "utf8"), sandbox);
const D = sandbox.window.RONDLEIDING;
let base = process.argv[2] || D.basisUrl;
if (!base) { console.error("Geen basisUrl."); process.exit(1); }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const urlFor = code => base + "?qr=" + code;

const seen = new Set();
[...D.stops, ...D.bonus].forEach(x => {
  if (!/^[A-Z]{3,5}$/.test(x.code || "")) throw new Error("Ongeldige code bij " + x.id);
  if (seen.has(x.code)) throw new Error("Dubbele code " + x.code);
  seen.add(x.code);
});

function svg(url) {
  let s;
  QRCode.toString(url, { type: "svg", errorCorrectionLevel: "Q", margin: 1, color: { dark: "#000000", light: "#ffffff" } }, (e, out) => { if (e) throw e; s = out; });
  return s;
}

const css = `
@page{size:A4 portrait;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#141a2e;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:10mm;page-break-after:always;break-after:page;overflow:hidden;position:relative}
.page:last-child{page-break-after:auto;break-after:auto}
.frame{height:100%;border-radius:6mm;border:0.5mm solid #d9dce6;display:flex;flex-direction:column;align-items:center;text-align:center;overflow:hidden}
.band{width:100%;height:26mm;flex:none;background:#0b1230;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 9mm;position:relative}
.band::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1.4mm;background:linear-gradient(90deg,#f39200,#ffb347,#2f8f86)}
.logo{font-family:Fraunces,Georgia,serif;font-weight:800;font-size:10mm;letter-spacing:-.2mm}
.logo b{color:#f39200;font-weight:800}
.tag{font-size:3.6mm;font-weight:800;letter-spacing:.8mm;text-transform:uppercase;color:#ffb347;border:0.4mm solid rgba(255,179,71,.6);border-radius:10mm;padding:1.6mm 3.6mm}
.head{display:flex;align-items:center;gap:7mm;width:100%;padding:8mm 12mm 0;text-align:left}
.item{width:40mm;height:40mm;flex:none;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3dc,#ffd59a 60%,#f39200);display:grid;place-items:center;position:relative;box-shadow:0 2mm 6mm rgba(243,146,0,.25)}
.item img{width:40mm;height:40mm;object-fit:cover;border-radius:50%}
.item .emo{font-size:20mm}
.ai{position:absolute;bottom:-4mm;left:50%;transform:translateX(-50%);font-size:2.4mm;font-weight:700;color:#6b7088;white-space:nowrap}
.kicker{font-size:4.2mm;font-weight:800;letter-spacing:1mm;text-transform:uppercase;color:#c2484d}
.name{font-family:Fraunces,Georgia,serif;font-weight:800;font-size:11mm;line-height:1.05;margin:1.5mm 0 1.5mm;color:#0b1230}
.floor{font-size:4.4mm;font-weight:600;color:#4b5270}
.qrwrap{position:relative;width:122mm;height:122mm;margin:9mm 0 0;padding:5mm}
.qrwrap svg{width:100%;height:100%;display:block}
.c{position:absolute;width:16mm;height:16mm;border:1.8mm solid #f39200}
.c.tl{left:0;top:0;border-right:0;border-bottom:0;border-top-left-radius:4mm}
.c.tr{right:0;top:0;border-left:0;border-bottom:0;border-top-right-radius:4mm}
.c.bl{left:0;bottom:0;border-right:0;border-top:0;border-bottom-left-radius:4mm}
.c.br{right:0;bottom:0;border-left:0;border-top:0;border-bottom-right-radius:4mm}
.scan{font-size:8mm;font-weight:800;margin:4mm 0 0;color:#0b1230}
.scan small{display:block;font-size:4.4mm;font-weight:600;color:#4b5270;margin-top:1mm}
.code{margin-top:auto;width:100%;background:#f6f0e6;padding:5mm 0 7mm;border-top:0.5mm solid #e8dcc6}
.code p{margin:0 0 2.5mm;font-size:4.4mm;font-weight:600;color:#4b5270}
.letters{display:flex;justify-content:center;gap:2.5mm}
.letters span{width:15mm;height:18mm;display:grid;place-items:center;background:#fff;border:0.6mm solid #0b1230;border-radius:2.5mm;font-size:11mm;font-weight:800;color:#0b1230;box-shadow:0 1mm 0 #0b1230}
.secret .band{background:#141a2e}
.secret .item{background:radial-gradient(circle at 35% 30%,#2a3160,#0b1230)}
.secret .kicker{color:#2f8f86}
.overview{padding:14mm 16mm}
.overview h1{font-family:Fraunces,Georgia,serif;font-size:10mm;margin:0 0 2mm}
.overview p{font-size:4.2mm;line-height:1.45;margin:0 0 4mm}
table{width:100%;border-collapse:collapse;font-size:4.2mm}
th{background:#0b1230;color:#fff;text-align:left;padding:2mm 3mm}
td{padding:1.6mm 3mm;border-bottom:0.3mm solid #ccc}
td.code{font-weight:900;letter-spacing:.6mm;font-size:4.6mm;background:none;border-top:0;padding:1.6mm 3mm;margin:0;width:auto}
.note{border:0.6mm solid #f39200;background:#fff6e6;border-radius:3mm;padding:3mm 4mm}
.small{font-size:3.4mm;color:#555}
`;

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=Inter:wght@600;800&display=swap">`;
const pad = n => String(n).padStart(2, "0");
const letters = w => `<div class="letters">${[...w].map(c => `<span>${esc(c)}</span>`).join("")}</div>`;
const corners = `<i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>`;
const band = `<div class="band"><div class="logo">Missie <b>Vellesan</b></div><div class="tag">Open dag</div></div>`;
function itemHtml(s) {
  if (D.itemBeelden && fs.existsSync(path.join(root, D.itemBeelden, s.id + ".webp")))
    return `<div class="item"><img src="../${esc(D.itemBeelden)}${esc(s.id)}.webp" alt="${esc((s.item || [])[1] || "")}"><span class="ai">AI-illustratie</span></div>`;
  return `<div class="item"><span class="emo">${esc((s.item || ["⭐"])[0])}</span></div>`;
}

let html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>QR-posters Vellesan College</title>${fonts}<style>${css}</style></head><body>`;

const etage = i => (D.etages[i] || {}).naam || "";
html += `<section class="page overview"><h1>QR-posters rondleiding</h1>
<p>Vellesan College, open dag. Print alle pagina's na dit overzicht op A4 (staand, 100%, geen verkleining) en hang elke poster bij de juiste plek. De drie geheime posters hang je op een verrassende plek in het gebouw, niet op de kaart.</p>
<table><thead><tr><th>Stop</th><th>Naam</th><th>Etage</th><th>Codewoord</th></tr></thead><tbody>`;
D.stops.forEach((s, i) => { html += `<tr><td>${i + 1}</td><td>${esc(s.naam)}</td><td>${esc(etage(s.etage))}</td><td class="code">${esc(s.code)}</td></tr>`; });
D.bonus.forEach((b, i) => { html += `<tr><td>Geheim ${i + 1}</td><td>${esc(b.naam)} (bonusclip)</td><td>nog te kiezen</td><td class="code">${esc(b.code)}</td></tr>`; });
html += `</tbody></table>
<p class="note" style="margin-top:6mm"><strong>Let op:</strong> de QR-codes bevatten het webadres <strong>${esc(base)}</strong>. Verandert dit adres, dan moeten alle posters opnieuw worden gemaakt en geprint (<code>node tools/maak-qr.js NIEUW-ADRES</code>).</p>
<p class="small">Een kind kan de code ook typen als scannen niet lukt. Het scannen werkt met de Camera-app van de iPad of met de knop in de app.</p></section>`;

D.stops.forEach((s, i) => {
  html += `<section class="page"><div class="frame">${band}
<div class="head">${itemHtml(s)}<div><div class="kicker">Stop ${pad(i + 1)} van ${D.stops.length}</div><div class="name">${esc(s.naam)}</div><div class="floor">${esc(etage(s.etage))} · scan en open je missie</div></div></div>
<div class="qrwrap">${corners}${svg(urlFor(s.code))}</div>
<div class="scan">Scan mij met de iPad<small>Tik in de app op Radar of Scan</small></div>
<div class="code"><p>Lukt scannen niet? Typ deze code:</p>${letters(s.code)}</div>
</div></section>`;
});
D.bonus.forEach((b, i) => {
  html += `<section class="page secret"><div class="frame">${band}
<div class="head"><div class="item"><span class="emo">🔒</span></div><div><div class="kicker">Geheime code ${i + 1} van ${D.bonus.length}</div><div class="name">Je vond een geheim filmpje!</div><div class="floor">Scan en bekijk de bonus</div></div></div>
<div class="qrwrap">${corners}${svg(urlFor(b.code))}</div>
<div class="scan">Scan mij met de iPad<small>Tik in de app op Radar of Scan</small></div>
<div class="code"><p>Lukt scannen niet? Typ deze code:</p>${letters(b.code)}</div>
</div></section>`;
});
html += `</body></html>`;

fs.mkdirSync(path.join(root, "qr"), { recursive: true });
const htmlPath = path.join(root, "qr", "posters.html");
fs.writeFileSync(htmlPath, html);
console.log("Geschreven:", htmlPath, "(" + (D.stops.length + D.bonus.length) + " posters + overzicht)");

(async () => {
  let chromium;
  try { chromium = require("playwright").chromium; } catch (e) { console.log("Playwright niet gevonden: geen PDF gemaakt."); return; }
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + htmlPath, { waitUntil: "networkidle" }).catch(() => {});
  await p.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  const pdf = path.join(root, "qr", "posters.pdf");
  await p.pdf({ path: pdf, format: "A4", printBackground: true });
  await b.close();
  console.log("Geschreven:", pdf);
})();
