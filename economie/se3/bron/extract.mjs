// Haalt de inhoud uit de oude SE3-lesapp (../../apps/jaar-4_se-h1-h2-h8.html) en schrijft data.json + reken.js + lab-html.html.
// Gebruik: node economie/se3/bron/extract.mjs   (vanuit de root van de repo)
import fs from "node:fs"; import vm from "node:vm";
const bron = fs.readFileSync("economie/apps/jaar-4_se-h1-h2-h8.html", "utf8");
function literal(naam) {
  const m = new RegExp("var\\s+" + naam + "\\s*=\\s*").exec(bron); if (!m) return undefined;
  let i = m.index + m[0].length, d = 0, q = null, start = i;
  for (; i < bron.length; i++) {
    const c = bron[i];
    if (q) { if (c === "\\") i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === "`") { q = c; continue; }
    if ("[{(".includes(c)) d++; else if ("]})".includes(c)) { d--; if (d === 0) { i++; break; } }
  }
  return vm.runInNewContext("(" + bron.slice(start, i) + ")");
}
const data = {};
for (const n of ["PARS", "GOALS", "NORIG", "CHK", "CARDS", "BANK", "SORT", "MAT", "VERS", "FILMS"]) data[n] = literal(n);
fs.writeFileSync("economie/se3/bron/data.json", JSON.stringify(data, null, 1));
// rekenmodule: van 'function rnd(' tot vlak voor 'var BANK=' (formule- en rekenlab, onveranderd)
const a = bron.indexOf("function rnd(a,b)"), b = bron.indexOf("var BANK=[");
fs.writeFileSync("economie/se3/bron/reken.js", bron.slice(a, b));
// HTML van de twee labs
const h1 = bron.indexOf('<div class="lab ex" id="lab-formule"'), h2 = bron.indexOf('<div class="lab ex" id="lab-quiz"');
fs.writeFileSync("economie/se3/bron/lab-html.html", bron.slice(h1, h2));
console.log(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, Array.isArray(v) ? v.length : typeof v === "object" && v ? Object.keys(v).length : typeof v])), "reken.js", b - a, "tekens, lab-html", h2 - h1, "tekens");
