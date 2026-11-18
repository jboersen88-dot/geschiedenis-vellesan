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
  QRCode.toString(url, { type: "svg", errorCorrectionLevel: "Q", margin: 2, color: { dark: "#000000", light: "#ffffff" } }, (e, out) => { if (e) throw e; s = out; });
  return s;
}

const css = `
@page{size:A4 portrait;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#2b2b2b;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:9mm;page-break-after:always;break-after:page;overflow:hidden;position:relative}
.page:last-child{page-break-after:auto;break-after:auto}
.frame{height:100%;border:0.4mm dashed #999;padding:8mm 10mm;display:flex;flex-direction:column;align-items:center;text-align:center}
.top{width:100%;background:#f39200;color:#2b2b2b;border-radius:6mm;padding:5mm;font-size:8mm;font-weight:800;letter-spacing:.3mm}
.stop{font-size:15mm;font-weight:900;margin:8mm 0 0;line-height:1}
.name{font-size:9.5mm;font-weight:700;margin:3mm 0 0;line-height:1.15;min-height:22mm}
.qr{width:140mm;height:140mm;margin:4mm 0;border:1.2mm solid #f39200;border-radius:4mm;padding:2mm;background:#fff}
.qr svg{width:100%;height:100%;display:block}
.scan{font-size:10mm;font-weight:800;margin:2mm 0 0}
.type{margin-top:auto;width:100%;border-top:0.8mm solid #f39200;padding-top:5mm;font-size:6.5mm}
.word{display:block;font-size:20mm;font-weight:900;letter-spacing:2mm;margin-top:1mm;line-height:1.1}
.secret .top{background:#2b2b2b;color:#f39200}
.secret .stop{font-size:17mm;color:#2b2b2b}
.secret .name{font-size:10mm;min-height:22mm}
.overview{padding:14mm 16mm}
.overview h1{font-size:10mm;margin:0 0 2mm}
.overview p{font-size:4.2mm;line-height:1.45;margin:0 0 4mm}
table{width:100%;border-collapse:collapse;font-size:4.2mm}
th{background:#f39200;text-align:left;padding:2mm 3mm}
td{padding:1.6mm 3mm;border-bottom:0.3mm solid #ccc}
td.code{font-weight:900;letter-spacing:.6mm;font-size:4.6mm}
.note{border:0.6mm solid #f39200;background:#fff6e6;border-radius:3mm;padding:3mm 4mm}
.small{font-size:3.4mm;color:#555}
`;

let html = `<!doctype html><html lang="nl"><head><meta charset="utf-8"><title>QR-posters Vellesan College</title><style>${css}</style></head><body>`;

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
  html += `<section class="page"><div class="frame">
<div class="top">Vellesan College</div>
<div class="stop">Stop ${i + 1}</div>
<div class="name">${esc(s.naam)}</div>
<div class="qr">${svg(urlFor(s.code))}</div>
<div class="scan">Scan mij met de iPad</div>
<div class="type">Lukt scannen niet? Typ de code:<span class="word">${esc(s.code)}</span></div>
</div></section>`;
});
D.bonus.forEach((b, i) => {
  html += `<section class="page secret"><div class="frame">
<div class="top">Vellesan College</div>
<div class="stop">Geheime QR-code!</div>
<div class="name">Je hebt een bonus gevonden</div>
<div class="qr">${svg(urlFor(b.code))}</div>
<div class="scan">Scan mij met de iPad</div>
<div class="type">Lukt scannen niet? Typ de code:<span class="word">${esc(b.code)}</span></div>
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
  await p.goto("file://" + htmlPath);
  const pdf = path.join(root, "qr", "posters.pdf");
  await p.pdf({ path: pdf, format: "A4", printBackground: true });
  await b.close();
  console.log("Geschreven:", pdf);
})();
