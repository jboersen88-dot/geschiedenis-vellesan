# Bouwt economie/<naam>/toets.html (de digitale oefentoetsen, ?t=t1 t/m t4) uit de toets.html van de root (Geschiedenis)
# met de Economie-inhoud uit <naam>/bron/toetsen.json.
# Gebruik: python3 -I economie/bouw-toets.py se3   (vanuit de root van de repo)
# toetsen.json = blokken (meerkeuze, open vragen, rekenopgaven; een blok kan in meer toetsen zitten) + toetsen (welke blokken).
# Meerkeuze en rekenopgaven kijkt de pagina zelf na (met het nakijkblad van de docent); open vragen kijkt de AI van de Worker na
# (vak "economie"; antwoordmodel en puntenverdeling gaan mee in de aanvraag, de Worker hoeft niet te veranderen).
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECO = os.path.join(ROOT, "economie")

CONFIG = {
    "se3": dict(
        titel="Online oefentoets · Economie jaar 4 · SE 1",
        key="gs-eco-se3-toets-v1",          # localStorage-sleutel (de Geschiedenis-toets gebruikt gv-toets-v1; zelfde domein)
        bron="se3/bron",
        data="se3/bron/data.json",           # VERS: n, min, pts moeten kloppen met toetsen.json
        lab="app.html#lab", opg="Opgave", terug=("app.html#toets", "Terug naar de leeromgeving"),
    ),
    # jaar 2 mavo H1: de twee Word-oefentoetsen (versie A en B, 40 minuten) met de antwoordenbladen van de docent; 15 meerkeuze + 8 opgaven
    "j2h1": dict(
        titel="Online oefentoets · Economie jaar 2 mavo · hoofdstuk 1",
        key="eco-j2h1-toets-v1",
        bron="j2h1/bron",
        data="j2h1/bron/toetsen.json",       # VERS staat in hetzelfde bestand
        lab="oefen.html#lab", opg="Opgave", rek="Opgaven", terug=("oefen.html#toets", "Terug naar de oefenomgeving"),
    ),
    # jaar 2 mavo H2: de drie Word-oefentoetsen (1-, 2- en 3-ster) met de nakijkbladen van de docent; geen meerkeuze, alles als opgaven
    "j2h2": dict(
        titel="Online oefentoets · Economie jaar 2 mavo · hoofdstuk 2",
        key="eco-j2h2-toets-v1",
        bron="j2h2/bron",
        data="j2h2/bron/toetsen.json",       # VERS staat in hetzelfde bestand
        lab="oefen.html#lab", opg="Vraag", terug=("oefen.html#toets", "Terug naar de oefenomgeving"),
    ),
    # 3 vwo H2: één oefentoets, gemaakt uit de wisbordvragen en rekenvoorbeelden van de PowerPoints van de docent (2026-11-13)
    "j3vh2": dict(
        titel="Online oefentoets · Economie 3 vwo · hoofdstuk 2",
        key="eco-j3vh2-toets-v1",
        bron="j3vh2/bron",
        data="j3vh2/bron/toetsen.json",
        lab="oefen.html#lab", opg="Opgave", rek="Opgaven", terug=("oefen.html#toets", "Terug naar de oefenomgeving"),
    ),
}
# jaar 4 mavo en 3 mavo H7 (18 nov 2026): nieuw geschreven oefentoetsen, zelfde soort vragen als de toetsen van de docent maar andere situaties
for _m, _t in [("j4h1", "jaar 4 mavo · hoofdstuk 1"), ("j4h2", "jaar 4 mavo · hoofdstuk 2"), ("j4h3", "jaar 4 mavo · hoofdstuk 3"), ("j4h4", "jaar 4 mavo · hoofdstuk 4"),
               ("j4h5", "jaar 4 mavo · hoofdstuk 5"), ("j4h6", "jaar 4 mavo · hoofdstuk 6"), ("j4h7", "jaar 4 mavo · hoofdstuk 7"), ("j4h8", "jaar 4 mavo · hoofdstuk 8"),
               ("j3h7", "jaar 3 mavo · hoofdstuk 7"), ("j3h1", "jaar 3 mavo · hoofdstuk 1"), ("j3h2", "jaar 3 mavo · hoofdstuk 2"), ("j3h3", "jaar 3 mavo · hoofdstuk 3"), ("j3h4", "jaar 3 mavo · hoofdstuk 4"),
               ("j3h5", "jaar 3 mavo · hoofdstuk 5"), ("j3h6", "jaar 3 mavo · hoofdstuk 6"), ("j3h8", "jaar 3 mavo · hoofdstuk 8")]:
    CONFIG[_m] = dict(titel="Online oefentoets · Economie " + _t, key="eco-%s-toets-v1" % _m, bron=_m + "/bron", data=_m + "/bron/toetsen.json",
                      lab="oefen.html#lab", opg="Opgave", rek="Opgaven", terug=("oefen.html#toets", "Terug naar de oefenomgeving"))
# jaar 2 mavo H3 t/m H6 (18 nov 2026): nieuw geschreven oefentoetsen bij de lesapps en PowerPoints van de docent
for _n in (3, 4, 5, 6):
    CONFIG["j2h%d" % _n] = dict(titel="Online oefentoets · Economie jaar 2 mavo · hoofdstuk %d" % _n, key="eco-j2h%d-toets-v1" % _n, bron="j2h%d/bron" % _n, data="j2h%d/bron/toetsen.json" % _n,
                                lab="oefen.html#lab", opg="Opgave", rek="Opgaven", terug=("oefen.html#toets", "Terug naar de oefenomgeving"))
# oefen-SE's van 4 mavo: één toets over alle hoofdstukken van het SE (se56 = H5 + H6 + H7 van 3 mavo)
CONFIG["se56"] = dict(titel="Oefen-SE · Economie jaar 4 mavo · H5, H6 en H7", key="eco-se56-toets-v1", bron="se56/bron", data="se56/bron/toetsen.json",
                      lab="../h.html?p=jaar-4%2Fse-h5-en-h6#oefenen", opg="Opgave", rek="Opgaven", terug=("../h.html?p=jaar-4%2Fse-h5-en-h6", "Terug naar het SE"))
CONFIG["se13"] = dict(titel="Oefen-SE · Economie jaar 3 mavo · H1 en H3", key="eco-se13-toets-v1", bron="se13/bron", data="se13/bron/toetsen.json",
                      lab="../h.html?p=jaar-3%2Fmavo%2Fse-1#oefenen", opg="Opgave", rek="Opgaven", terug=("../h.html?p=jaar-3%2Fmavo%2Fse-1", "Terug naar het SE"))
CONFIG["j3se56"] = dict(titel="Oefen-SE · Economie jaar 3 mavo · H5 en H6", key="eco-j3se56-toets-v1", bron="j3se56/bron", data="j3se56/bron/toetsen.json",
                      lab="../h.html?p=jaar-3%2Fmavo%2Fse-3-h5-h6#oefenen", opg="Opgave", rek="Opgaven", terug=("../h.html?p=jaar-3%2Fmavo%2Fse-3-h5-h6", "Terug naar het SE"))
CONFIG["j3se78"] = dict(titel="Oefen-SE · Economie jaar 3 mavo · H7 en H8", key="eco-j3se78-toets-v1", bron="j3se78/bron", data="j3se78/bron/toetsen.json",
                      lab="../h.html?p=jaar-3%2Fmavo%2Fse4-h7-h8#oefenen", opg="Opgave", rek="Opgaven", terug=("../h.html?p=jaar-3%2Fmavo%2Fse4-h7-h8", "Terug naar het SE"))
CONFIG["se34"] = dict(titel="Oefen-SE · Economie jaar 4 mavo · H3 en H4", key="eco-se34-toets-v1", bron="se34/bron", data="se34/bron/toetsen.json",
                      lab="../h.html?p=jaar-4%2Fse4#oefenen", opg="Opgave", rek="Opgaven", terug=("../h.html?p=jaar-4%2Fse4", "Terug naar het SE"))

if len(sys.argv) != 2 or sys.argv[1] not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/bouw-toets.py <" + "|".join(CONFIG) + ">")
name = sys.argv[1]
C = CONFIG[name]
OUT = os.path.join(ECO, name)

s = open(os.path.join(ROOT, "toets.html"), encoding="utf-8").read()
J = json.load(open(os.path.join(ECO, C["bron"], "toetsen.json"), encoding="utf-8"))
VERS = json.load(open(os.path.join(ECO, C["data"]), encoding="utf-8"))["VERS"]
B, T = J["blokken"], J["toetsen"]


def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:90])
    return s.replace(old, new)


# ---------- controle van de inhoud ----------
def fields(o):
    return [f for d in o["delen"] for f in d["velden"]]


for k, t in T.items():
    v = [x for x in VERS if x["n"] == t["n"]][0]
    pts = len(B[t["mc"]]) + sum(o["p"] for o in (B[t["open"]] if t["open"] else [])) + sum(o["p"] for o in B[t["rek"]])
    assert (v["min"], v["pts"]) == (t["min"], pts), (k, v["min"], v["pts"], t["min"], pts)
blok = lambda pre: [o for k, v in B.items() if k.startswith(pre) for o in v]
for o in blok("rek"):
    assert o["p"] == sum(f["p"] for f in fields(o)), o["nr"]
    for f in fields(o):
        assert f["type"] in ("num", "keuze", "open")
        if f["type"] == "open":
            assert sum(g["p"] for g in f["g"]) == f["p"]
for o in blok("rek"):
    for d in o["delen"]:
        k = d.get("ond") or o.get("ond")
        assert not k or k in J.get("onderwerpen", {}), (o["nr"], k)
for o in blok("open"):
    assert sum(g["p"] for g in o["g"]) == o["p"], o["nr"]
for q in blok("mc"):
    assert len(q["o"]) == 4 and 0 <= q["j"] < 4

# meerkeuzeregels van de docent (tools/vragencheck.py): alleen waarschuwen, de inhoud blijft zoals de docent hem schreef
VCP = os.path.join(ROOT, "tools", "vragencheck.py")
vc = {"__name__": "vragencheck", "__file__": VCP}
exec(open(VCP, encoding="utf-8").read(), vc)
for blk in [k for k in B if k.startswith("mc") and B[k]]:
    langste = 0
    for i, q in enumerate(B[blk]):
        probs, lang = vc["check_q"](q["o"], q["j"])
        langste += lang
        for p in probs:
            print("WAARSCHUWING vragencheck %s vraag %d: %s" % (blk, i + 1, p))
    share = langste / len(B[blk])
    print("vragencheck %s: juiste antwoord is in %.0f%% van de vragen het langste (max %.0f%%)%s" % (
        blk, share * 100, vc["LANGSTE_DREMPEL"] * 100, "  <-- WAARSCHUWING" if share > vc["LANGSTE_DREMPEL"] else ""))

# ---------- data in de pagina: blokken eenmaal, toetsen verwijzen ernaar ----------
toetsjs = ",".join('"%s":{"t":%s,"th":"%s","rk":"%s","sub":%s,"min":%d,"mc":B.%s,"open":%s,"rek":B.%s}' % (
    k, json.dumps(t.get("t", "Oefentoets %d" % t["n"]), ensure_ascii=False), t.get("th", ""), t.get("rk", ""), json.dumps(t.get("sub", ""), ensure_ascii=False),
    t["min"], t["mc"], ("B." + t["open"]) if t["open"] else "[]", t["rek"]) for k, t in T.items())
data = "var OPG=%s,LAB=%s,REK=%s,ONDW=%s;\n" % (json.dumps(C["opg"]), json.dumps(C["lab"]), json.dumps(C.get("rek", "Rekenen")), json.dumps(J.get("onderwerpen", {}), ensure_ascii=False)) + "var B=" + json.dumps(B, ensure_ascii=False, separators=(",", ":")) + ";\nwindow.TOETSEN={" + toetsjs + "};"
assert "</script" not in data

s = rep(s, "<title>Online oefentoets · Geschiedenis</title>", "<title>%s</title>" % C["titel"])
s = rep(s, '<script src="data/toetsen.js"></script>', "<script>\n" + data + "\n</script>")
s = rep(s, '<script src="ai.js"></script>', '<script src="../../ai.js"></script>')
s = rep(s, '<script src="nakijker.js"></script>', '<script src="../../nakijker.js"></script>')
s = rep(s, 'var KEY="gv-toets-v1"', 'var KEY="%s"' % C["key"])
s = rep(s, '<a class="muted" href="app.html#toets">← Terug naar de leeromgeving</a>', '<a class="muted" href="%s">← %s</a>' % C["terug"])

CSS = r"""
.rk{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.rk .rl{font-weight:600;margin-bottom:8px}
.ans{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0}
input.num{width:9.5em;max-width:100%;min-height:44px;border:2px solid var(--line);border-radius:12px;padding:8px 12px;font:16px Inter,sans-serif;background:var(--card);color:var(--ink);transition:border-color .16s}
input.num:focus{border-color:var(--teal);outline:none}
.stepper button.w{padding:0 16px}textarea.s{min-height:76px}
.rr{padding:8px 10px;border-radius:10px;margin:6px 0;border:1.5px solid var(--line)}.rr.ok{border-color:var(--ok);background:var(--ok-soft)}.rr.bad{border-color:var(--bad);background:var(--bad-soft)}
.bron th{border:1px solid var(--line);padding:5px 10px;text-align:left;background:color-mix(in srgb,var(--line) 40%,transparent)}
.bron .t{margin-bottom:6px}
.bron{overflow-x:auto}
@media(max-width:520px){.bron table{font-size:13px}.bron td,.bron th{padding:4px 5px;hyphens:auto}}
.ovz{margin-top:16px}.ovz h2{margin:4px 0 6px}.ovrows{display:grid;gap:12px;margin:14px 0 4px}
.ovr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:4px 12px;align-items:center}
.ovr .ovt b{display:block}.ovr .ovt span{font-size:13px}.ovr .ovn{font-size:14px;font-weight:600;text-align:right;white-space:nowrap}
.ovbar{grid-column:1/-1;height:10px;border-radius:99px;background:color-mix(in srgb,var(--line) 70%,transparent);overflow:hidden}
.ovbar i{display:block;height:100%;border-radius:99px;transform-origin:left;transition:transform .6s cubic-bezier(.2,.7,.2,1);background:var(--bad)}
.ovr.s1 .ovbar i{background:#d39b2a}.ovr.s2 .ovbar i{background:var(--ok)}
.ovr .lab{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12.5px;margin-left:6px;background:var(--bad-soft)}.ovr.s1 .lab{background:color-mix(in srgb,#d39b2a 22%,transparent)}.ovr.s2 .lab{background:var(--ok-soft)}
.ovlist{margin:8px 0 0;padding-left:20px}.ovlist li{margin:6px 0}
.ovz h3{font-size:19px;margin:18px 0 4px}
.send{margin-top:18px;padding:16px;border:1.5px dashed var(--line);border-radius:16px}
.send .rowf{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}.send .rowf label{display:flex;flex-direction:column;gap:4px;font-size:13.5px;color:var(--muted);flex:1 1 160px}
.send input{min-height:44px;border:2px solid var(--line);border-radius:12px;padding:8px 12px;font:16px Inter,sans-serif;background:var(--card);color:var(--ink)}
.send input:focus{border-color:var(--teal);outline:none}#sendmsg{margin:10px 0 0;font-size:14px}
@media(prefers-reduced-motion:reduce){.ovbar i{transition:none}}
</style>"""
s = rep(s, "</style>", CSS.lstrip("\n"))

# ---------- toetsen klaarzetten: alle open vragen (ook die in een rekenopgave) in D[k].ao ----------
s = rep(s, "Object.keys(D).forEach(mcWarn);", r"""Object.keys(D).forEach(mcWarn);
Object.keys(D).forEach(function(k){var d=D[k];d.ao=d.open.slice();d.rek.forEach(function(r){r.delen.forEach(function(dl){dl.velden.forEach(function(f){if(f.type==="open")d.ao.push(f);});});});});""")
s = rep(s, 'var n=document.getElementById("gm");', 'ovzFill();var n=document.getElementById("gm");')
s = rep(s, "function maxPts(k){return D[k].mc.length+D[k].open.reduce(function(a,o){return a+o.p;},0);}",
        "function maxPts(k){return D[k].mc.length+D[k].open.reduce(function(a,o){return a+o.p;},0)+D[k].rek.reduce(function(a,r){return a+r.p;},0);}")

# ---------- keuzescherm ----------
s = rep(s, "Aan het einde kijkt de meerkeuze zichzelf na en kijk je de open vragen na met het nakijkblad. Je antwoorden blijven op dit apparaat bewaard.",
        "Aan het einde kijken de meerkeuze en de rekenopgaven zichzelf na, met het nakijkblad van je docent. De open vragen kijkt de AI na. Je antwoorden blijven op dit apparaat bewaard.")
s = rep(s, """sub=maxPts(k)+" punten · "+D[k].min+" minuten · "+D[k].mc.length+" meerkeuze + "+D[k].open.length+" open";""",
        """sub=maxPts(k)+" punten · "+D[k].min+" minuten · "+(D[k].sub?D[k].rek.length+" vragen · "+D[k].sub:D[k].mc.length+" meerkeuze"+(D[k].open.length?" + "+D[k].open.length+" open":"")+" + "+D[k].rek.length+" rekenopgaven · theorie "+D[k].th.toLowerCase()+", rekenen "+D[k].rk.toLowerCase());""")

# ---------- state, tellen ----------
s = rep(s, "st[k]={mc:{},open:{},self:{},perm:", "st[k]={mc:{},open:{},rek:{},calc:{},self:{},perm:")
s = rep(s, "D[cur].open.forEach(function(o){if(!(a.open[o.nr]||\"\").trim())n++;});return n;}",
        "D[cur].ao.forEach(function(o){if(!(a.open[o.nr]||\"\").trim())n++;});rekFields(cur).forEach(function(x){var v=((a.rek||{})[x[0]]||[])[x[1]];if(v==null||v===\"\")n++;});return n;}")
s = rep(s, "function total(){return D[cur].mc.length+D[cur].open.length;}", "function total(){return D[cur].mc.length+D[cur].ao.length+rekFields(cur).length;}")

# ---------- klikken en typen: keuzeknoppen en invulvelden van het rekenen, berekeningsstappen ----------
s = rep(s, """  var s=e.target.closest("[data-pt]");if(s){""", r"""  var rk=e.target.closest("[data-rk]");if(rk){var r1=st[cur].rek=st[cur].rek||{},ar=r1[rk.dataset.rk]=r1[rk.dataset.rk]||[];ar[+rk.dataset.f]=+rk.dataset.v;save();
    rk.parentNode.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===rk?"true":"false");});prog();return;}
  var xk=e.target.closest("[data-xk]");if(xk){st[cur].self["x"+xk.dataset.xk]=+xk.dataset.xp;save();
    xk.parentNode.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===xk?"true":"false");});score();return;}
  var s=e.target.closest("[data-pt]");if(s){""")
s = rep(s, """app.addEventListener("input",function(e){var t=e.target.closest("textarea[data-o]");""", r"""app.addEventListener("input",function(e){
  var ri=e.target.closest("input[data-r]");if(ri){var r1=st[cur].rek=st[cur].rek||{},ar=r1[ri.dataset.r]=r1[ri.dataset.r]||[];ar[+ri.dataset.f]=ri.value;save();prog();return;}
  var tc=e.target.closest("textarea[data-c]");if(tc){st[cur].calc=st[cur].calc||{};st[cur].calc[tc.dataset.c]=tc.value;save();return;}
  var t=e.target.closest("textarea[data-o]");""")
s = rep(s, "var o2=D[cur].open.filter(", "var o2=D[cur].ao.filter(")

# ---------- toets maken: Deel A meerkeuze, Deel B open vragen (alleen als die er zijn), Deel B/C rekenen ----------
EXAM = r"""/* ---------- rekenen ---------- */
function escA(s){return esc(s).replace(/"/g,"&quot;");}
function nl(x,dec){return x.toLocaleString("nl-NL",{minimumFractionDigits:dec,maximumFractionDigits:dec});}
/* Nederlands getal uit tekst: 1.892,55 | 1892.55 | € 13,33% | -0,22 ; bij meer getallen telt het laatste (het antwoord achter een =) */
function parseNL(s,klein){var t=String(s).match(/(?:[-−–]\s*)?\d[\d.]*(?:,\d+)?/g);if(!t)return NaN;t=t[t.length-1];var neg=/^[-−–]/.test(t);t=t.replace(/^[-−–]\s*/,"");
  if(t.indexOf(",")>-1)t=t.replace(/\./g,"").replace(",",".");else if(!klein&&/^\d{1,3}(\.\d{3})+$/.test(t))t=t.replace(/\./g,"");
  var x=parseFloat(t);return neg?-x:x;}
function fieldOk(f,v){if(v==null||v==="")return false;if(f.type==="keuze")return v===f.j;
  var x=parseNL(v,Math.max.apply(null,f.ans)<1000);if(isNaN(x))return false;if(f.abs)x=Math.abs(x);
  return f.ans.some(function(a){return Math.abs(x-a)<=(f.tol||0.005)+1e-9;});}
function dp(dl){return dl.velden.reduce(function(a,f){return a+f.p;},0);}
function rekFields(k){var a=[];D[k].rek.forEach(function(r){r.delen.forEach(function(dl){dl.velden.forEach(function(f,i){if(f.type!=="open")a.push([r.nr+dl.id,i,f]);});});});return a;}
/* punten van een deelvraag: goede velden + (als een rekenantwoord fout is) punten voor de berekening die de leerling zichzelf geeft, nooit het volle aantal */
function deelPts(r,dl){var a=((st[cur].rek||{})[r.nr+dl.id])||[],p=0,w=0;
  dl.velden.forEach(function(f,i){if(f.type==="open")return;if(fieldOk(f,a[i]))p+=f.p;else if(f.type==="num")w+=f.p;});
  var max=Math.max(w-1,0),ex=Math.min(max,+st[cur].self["x"+r.nr+dl.id]||0);return {p:p,ex:ex,max:max,ok:a};}
function rekScore(){var s=0;D[cur].rek.forEach(function(r){r.delen.forEach(function(dl){var q=deelPts(r,dl);s+=q.p+q.ex;});});return s;}
/* een tabel kan bij de hele opgave horen (r.tabel) of bij één deelvraag (dl.tabel, staat dan boven die deelvraag) */
function rtbl(r){return '<table>'+r.map(function(c,i){return '<tr>'+c.map(function(x){return i?'<td>'+esc(x)+'</td>':'<th scope="col">'+esc(x)+'</th>';}).join("")+'</tr>';}).join("")+'</table>';}
function rekBron(r){return r.tekst||r.tabel?'<div class="bron">'+(r.tekst?'<div class="t">'+esc(r.tekst)+'</div>':"")+(r.tabel?rtbl(r.tabel):"")+'</div>':"";}
function fieldEx(r,dl,f,i){var key=r.nr+dl.id,v=((st[cur].rek||{})[key]||[])[i],lab=OPG+" "+r.nr+" "+dl.id;
  if(f.type==="open")return '<label class="muted" style="font-size:13.5px" for="to-'+f.nr+'">'+esc(f.label)+'</label><textarea class="s" id="to-'+f.nr+'" data-o="'+f.nr+'" placeholder="'+escA(f.ph||"Typ hier je antwoord")+'">'+esc(st[cur].open[f.nr]||"")+'</textarea>';
  if(f.type==="keuze")return '<div class="stepper" role="group" aria-label="'+escA(f.label||lab)+'">'+(f.label?'<span class="muted">'+esc(f.label)+(/[.?!]$/.test(f.label)?'':':')+'</span>':"")+f.opties.map(function(o,j){return '<button class="w" data-rk="'+key+'" data-f="'+i+'" data-v="'+j+'" aria-pressed="'+(v===j)+'">'+esc(o)+'</button>';}).join("")+'</div>';
  var pre=f.eenh==="€"?"€":"",post=f.eenh&&!pre?f.eenh:"";
  return '<div class="ans">'+(f.label?'<label class="muted" for="rk-'+key+i+'">'+esc(f.label)+(/[.?!]$/.test(f.label)?'':':')+'</label>':"")+(pre?'<span>€</span>':"")+'<input class="num" type="text" inputmode="decimal" autocomplete="off" id="rk-'+key+i+'" data-r="'+key+'" data-f="'+i+'" value="'+escA(v==null?"":v)+'" aria-label="Antwoord '+lab+'">'+(post?'<span class="muted">'+esc(post)+'</span>':"")+'</div>';}
function rekEx(r){var h='<div class="card q"><div class="n">'+OPG+' '+r.nr+' · '+r.p+' punten</div><p>'+esc(r.titel)+'</p>'+rekBron(r);
  r.delen.forEach(function(dl){h+='<div class="rk">'+(dl.tabel?rekBron(dl):"")+'<div class="rl">'+(dl.id?dl.id+') ':'')+esc(dl.v)+' <span class="muted">('+dp(dl)+' p)</span></div>';
    dl.velden.forEach(function(f,i){h+=fieldEx(r,dl,f,i);});h+='</div>';});
  if(r.kalc===false||!r.delen.some(function(dl){return dl.velden.some(function(f){return f.type==="num";});}))return h+'</div>';/* kalc:false = de berekening is een eigen veld dat wordt nagekeken, of er is geen berekening nodig *//* geen rekenantwoord: geen vak voor de berekening */
  return h+'<div class="rk"><label class="muted" style="font-size:13.5px" for="rc-'+r.nr+'">Je berekening (mag ook op papier; hier wordt niets mee nagekeken)</label><textarea class="s" id="rc-'+r.nr+'" data-c="'+r.nr+'">'+esc((st[cur].calc||{})[r.nr]||"")+'</textarea></div></div>';}
function exam(){
  var d=D[cur],a=st[cur],n=0;
  var h='<div class="bar"><span class="t" id="clk">--:--</span><div class="pr"><i id="pr"></i></div><small id="pn"></small></div><div class="eyebrow" style="margin-top:18px">Oefentoets</div><h1>'+esc(d.t.replace("Oefentoets ","Toets "))+'</h1><p class="muted">'+maxPts(cur)+' punten · '+d.min+' minuten · zonder boek, een rekenmachine mag.'+(d.mc.length?' Meerkeuze: kies één antwoord.':'')+(d.open.length?' Open vragen: schrijf in hele zinnen.':'')+(d.mc.length?' '+REK+': vul bij bedragen en procenten alleen je antwoord in':' Bedragen en procenten: vul alleen je antwoord in')+', met een komma (bijvoorbeeld 12,50).'+(d.mc.length?'':' Uitlegvragen: schrijf in hele zinnen.')+'</p>'+(d.mc.length?'<h2>Deel A · Meerkeuze</h2>':'');
  d.mc.forEach(function(q,i){n++;h+='<div class="card q fade" style="animation-delay:'+Math.min(i,8)*30+'ms"><div class="n">Vraag '+n+' · 1 punt</div><p>'+esc(q.v)+'</p><div class="opts" role="radiogroup" aria-label="Antwoorden">';
    a.perm[i].forEach(function(oi,pos){h+='<button class="opt" role="radio" aria-checked="'+(a.mc[i]===oi)+'" data-q="'+i+'" data-i="'+oi+'"><span class="l">'+"ABCD"[pos]+'</span><span>'+esc(q.o[oi])+'</span></button>';});
    h+="</div></div>";});
  if(d.open.length){h+='<h2>Deel B · Open vragen</h2>';
    d.open.forEach(function(o){h+='<div class="card q"><div class="n">Vraag '+o.nr+' · '+o.p+' punt'+(o.p>1?"en":"")+'</div>'+(o.b?bronHtml(o.b):"")+'<p>'+qtext(o.v)+'</p><textarea data-o="'+o.nr+'" aria-label="Antwoord vraag '+o.nr+'" placeholder="Typ hier je antwoord">'+esc(a.open[o.nr]||"")+'</textarea></div>';});}
  if(d.mc.length)h+='<h2>Deel '+(d.open.length?"C":"B")+' · '+REK+'</h2>';
  d.rek.forEach(function(r){h+=rekEx(r);});
  h+='<div class="stick"><button class="btn" id="hand">Inleveren en nakijken</button></div>';
  app.innerHTML=h;prog();clearInterval(timer);tick();timer=setInterval(tick,1000);
}
function tick"""
s = rep(s, "/* ---------- toets maken ---------- */\n", "/* ---------- toets maken ---------- */\n")  # ankerpunt aanwezig
i0, i1 = s.index("function exam(){"), s.index("function tick(){")
s = s[:i0] + EXAM + s[i1 + len("function tick"):]

# ---------- nakijken: score met rekenen, antwoordmodel, bron voor de AI ----------
s = rep(s, "function openScore(){var a=st[cur],s=0;D[cur].open.forEach(", "function openScore(){var a=st[cur],s=0;D[cur].ao.forEach(")
s = rep(s, "var m=maxPts(cur),p=mcScore()+openScore(),g=gradeOf(p,m)", "var m=maxPts(cur),p=mcScore()+openScore()+rekScore(),g=gradeOf(p,m)")
s = rep(s, """function nkHtml(o){var a=st[cur],v=a.self[o.nr],h="";""",
        """function nkHtml(o){var a=st[cur],v=a.self[o.nr],h=o.model?'<div class="nk"><div class="chk" style="cursor:default"><span><b>Antwoordmodel:</b> '+esc(o.model)+'</span></div></div>':"";""")
s = rep(s, "var HF={t1:[\"H1\",\"H2\"],t2:[\"H3\",\"H4\"],t3:[\"H1\",\"H2\",\"H3\",\"H4\"]},busy={},queue=[],running=0;",
        """var busy={},queue=[],running=0;
/* De Worker krijgt het antwoordmodel en de let-op-regel van de docent mee in bron (vraag en puntenverdeling gaan in vraag en nakijkpunten) */
function bronAI(o){return ((o.b||"")+(o.model?"ANTWOORDMODEL VAN DE DOCENT:\\n"+o.model:"")+(o.opm?"\\nLET OP: "+o.opm:"")).trim().slice(0,4000);}""")
s = rep(s, 'GV_NK.check({h:HF[k],vraag:o.v.slice(0,1500),punten:aiPunten(o),bron:(o.b||"").slice(0,4000),',
        'GV_NK.check({h:o.h,vak:"economie",vraag:o.v.slice(0,1500),punten:aiPunten(o),bron:bronAI(o),', 2)
s = rep(s, "D[k].open.forEach(function(o){var ans=", "D[k].ao.forEach(function(o){var ans=")
s = rep(s, 'if(cur)D[cur].open.forEach(function(o){var b=document.getElementById("ai-"', 'if(cur)D[cur].ao.forEach(function(o){var b=document.getElementById("ai-"')

RESULT = r"""function openRes(o){return '<div class="muted" style="font-size:13px">Jouw antwoord</div><div class="mine" id="mine-'+o.nr+'">'+mineHtml(o)+'</div><div class="muted" style="font-size:13px;margin-top:12px">Zo kijk je het na</div><div id="nk-'+o.nr+'">'+nkHtml(o)+'</div>';}
function fieldShow(f,v){if(v==null||v==="")return "niet ingevuld";return f.type==="keuze"?f.opties[v]:String(v).trim();}
function fieldGoed(f){if(f.type==="keuze")return f.opties[f.j];var e=f.eenh||"",eu=/^€/.test(e),post=e.replace(/^€\s*/,"");
  return f.ans.map(function(x){return (eu?"€ ":"")+nl(x,eu?2:((String(x).split(".")[1]||"").length))+(post?" "+post:"");}).join(" of ");}
function rekRes(r){var a=st[cur],h='<div class="card q"><div class="n">'+OPG+' '+r.nr+' · '+r.p+' punten</div><p>'+esc(r.titel)+'</p>'+rekBron(r);
  r.delen.forEach(function(dl){var q=deelPts(r,dl),key=r.nr+dl.id;h+='<div class="rk">'+(dl.tabel?rekBron(dl):"")+'<div class="rl">'+(dl.id?dl.id+') ':'')+esc(dl.v)+' <span class="muted">('+dp(dl)+' p)</span></div>';
    dl.velden.forEach(function(f,i){if(f.type==="open"){h+=openRes(f);return;}
      var ok=fieldOk(f,q.ok[i]);h+='<div class="rr '+(ok?"ok":"bad")+'"><b>'+(ok?"✓":"✗")+'</b> '+(f.label?esc(f.label)+(/[.?!]$/.test(f.label)?' ':': '):'')+'Jouw antwoord: <b>'+esc(fieldShow(f,q.ok[i]))+'</b>'+(ok?'':' · Juiste antwoord: <b>'+esc(fieldGoed(f))+'</b>')+' <span class="muted">('+(ok?f.p:0)+'/'+f.p+' p)</span></div>';});
    if(dl.uitw&&dl.uitw.length)h+='<div class="fb">'+dl.uitw.map(esc).join("<br>")+'</div>';
    if(q.max>0)h+='<div class="stepper" role="group" aria-label="Punten voor je berekening bij '+r.nr+dl.id+'"><span class="muted">Klopt je berekening? Punten voor je berekening:</span>'+Array.apply(null,Array(q.max+1)).map(function(_,p){return '<button data-xk="'+key+'" data-xp="'+p+'" aria-pressed="'+(q.ex===p)+'">'+p+'</button>';}).join("")+'</div>';
    h+='</div>';});
  var c=(a.calc||{})[r.nr];if(c&&c.trim())h+='<div class="rk"><div class="muted" style="font-size:13px">Jouw berekening</div><div class="mine">'+esc(c)+'</div></div>';
  return h+'</div>';}
/* ---------- overzicht per onderwerp en het bestand voor de docent (alleen als toetsen.json onderwerpen heeft) ---------- */
var LKEY="eco-leerling-v1",STL=["Nog oefenen","Bijna","Gaat goed"];
function oPts(o){var v=st[cur].self[o.nr];if(boxed(o)){var s=0;if(Array.isArray(v))o.g.forEach(function(g,i){if(v[i])s+=g.p;});return s;}return typeof v==="number"?v:0;}
function rPts(r){var s=0;r.delen.forEach(function(dl){var q=deelPts(r,dl);s+=q.p+q.ex;dl.velden.forEach(function(f){if(f.type==="open")s+=oPts(f);});});return s;}
function ovzData(){var m={};D[cur].rek.forEach(function(r){r.delen.forEach(function(dl){var k=dl.ond||r.ond;if(!k||!ONDW[k])return;
    var x=m[k]=m[k]||{k:k,p:0,max:0,fout:[]},q=deelPts(r,dl),p=q.p+q.ex,mx=dp(dl);dl.velden.forEach(function(f){if(f.type==="open")p+=oPts(f);});
    x.p+=p;x.max+=mx;if(p<mx)x.fout.push(r.nr+(dl.id||""));});});
  return Object.keys(ONDW).filter(function(k){return m[k]&&m[k].max;}).map(function(k){var x=m[k];x.pct=x.p/x.max;x.st=x.pct>=0.8?2:x.pct>=0.55?1:0;return x;});}
function pn(p){return p%1?p.toFixed(1).replace(".",","):String(p);}
function ovzFill(){var el=document.getElementById("ovzb");if(!el)return;var X=ovzData(),h='<div class="ovrows">';
  X.forEach(function(x){h+='<div class="ovr s'+x.st+'"><div class="ovt"><b>'+esc(ONDW[x.k].t)+'</b><span class="muted">'+esc(ONDW[x.k].par)+'</span></div><div class="ovn">'+pn(x.p)+' van '+x.max+'<span class="lab">'+STL[x.st]+'</span></div><div class="ovbar" aria-hidden="true"><i style="transform:scaleX('+x.pct.toFixed(3)+')"></i></div></div>';});
  h+='</div>';var goed=X.filter(function(x){return x.st===2;}),nog=X.filter(function(x){return x.st<2;}).sort(function(a,b){return a.pct-b.pct;});
  if(goed.length)h+='<h3>Dit kun je al</h3><ul class="ovlist">'+goed.map(function(x){return '<li>'+esc(ONDW[x.k].t)+'</li>';}).join("")+'</ul>';
  h+='<h3>Dit moet je nog doen</h3>'+(nog.length?'<ul class="ovlist">'+nog.map(function(x){return '<li><b>'+esc(ONDW[x.k].t)+'.</b> '+esc(ONDW[x.k].tip)+' <span class="muted">(Kijk nog eens naar '+OPG.toLowerCase()+' '+x.fout.join(", ")+'.)</span></li>';}).join("")+'</ul>':'<p>Niets! Maak nu een toets met meer sterren.</p>');
  el.innerHTML=h;}
function ovzHtml(){if(!Object.keys(ONDW).length||!D[cur].rek.some(function(r){return r.ond;}))return "";var L={};try{L=JSON.parse(localStorage.getItem(LKEY))||{};}catch(e){}
  return '<div class="card ovz fade"><div class="eyebrow">Jouw overzicht</div><h2>Waar sta je?</h2><p class="muted" style="margin:0">Per onderwerp zie je hoeveel punten je hebt. Kijk eerst de uitlegvragen na, dan klopt je overzicht.</p><div id="ovzb"></div>'+
    '<div class="send"><h3 style="margin-top:0">Stuur je resultaat naar meneer Boersen</h3><p class="muted" style="margin:0">Vul je naam en klas in en tik op de knop. Kies daarna <b>AirDrop</b> en stuur het bestand naar meneer Boersen. Je krijgt zelf ook het bestand: daarin staat wat je al kunt en wat je nog moet doen.</p>'+
    '<div class="rowf"><label>Je naam<input id="lnaam" autocomplete="name" value="'+escA(L.naam||"")+'"></label><label>Je klas<input id="lklas" value="'+escA(L.klas||"")+'"></label></div>'+
    '<button class="btn" id="mkfile">Maak je bestand en deel het</button><p id="sendmsg" class="muted" role="status"></p></div></div>';}
function bestand(){var naam=document.getElementById("lnaam").value.trim(),klas=document.getElementById("lklas").value.trim(),msg=document.getElementById("sendmsg");
  if(!naam){msg.textContent="Vul eerst je naam in.";document.getElementById("lnaam").focus();return;}
  try{localStorage.setItem(LKEY,JSON.stringify({naam:naam,klas:klas}));}catch(e){}
  var d=D[cur],m=maxPts(cur),p=mcScore()+openScore()+rekScore(),g=gradeOf(p,m),X=ovzData(),nu=new Date(),
    dat=nu.toLocaleDateString("nl-NL",{day:"numeric",month:"long",year:"numeric"})+" om "+nu.toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"}),
    goed=X.filter(function(x){return x.st===2;}),nog=X.filter(function(x){return x.st<2;}).sort(function(a,b){return a.pct-b.pct;});
  var kl={0:"#c2484d",1:"#b07a12",2:"#1d8a5a"},h='<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Resultaat '+esc(d.t)+' · '+esc(naam)+'</title><style>'+
    'body{font:16px/1.5 -apple-system,Inter,Arial,sans-serif;color:#201a14;background:#f6f0e6;margin:0;padding:24px}main{max-width:760px;margin:auto;background:#fffdf9;border:1px solid #e6dac4;border-radius:18px;padding:24px}'+
    'h1{font-family:Georgia,serif;color:#1f5f4e;margin:0 0 4px}h2{font-size:19px;color:#1f5f4e;margin:22px 0 6px}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #e6dac4;padding:7px 6px;text-align:left;vertical-align:top}'+
    '.c{font-size:44px;font-weight:700;color:#1f5f4e}.t{display:inline-block;padding:1px 9px;border-radius:99px;color:#fff;font-size:13px}.m{color:#6f6556}li{margin:6px 0}</style></head><body><main>'+
    '<div class="m">Economie · resultaat oefentoets</div><h1>'+esc(d.t[0].toUpperCase()+d.t.slice(1))+'</h1>'+
    '<table><tr><th>Naam</th><td>'+esc(naam)+'</td></tr><tr><th>Klas</th><td>'+esc(klas||"-")+'</td></tr><tr><th>Gemaakt op</th><td>'+esc(dat)+'</td></tr><tr><th>Punten</th><td>'+pn(p)+' van '+m+'</td></tr></table>'+
    '<p style="margin:14px 0 0">Cijfer: <span class="c">'+g.toFixed(1).replace(".",",")+'</span></p>'+
    '<h2>Per onderwerp</h2><table><tr><th>Onderwerp</th><th>Punten</th><th>Stand</th></tr>'+X.map(function(x){return '<tr><td>'+esc(ONDW[x.k].t)+' <span class="m">'+esc(ONDW[x.k].par)+'</span></td><td>'+pn(x.p)+' van '+x.max+' ('+Math.round(x.pct*100)+'%)</td><td><span class="t" style="background:'+kl[x.st]+'">'+STL[x.st]+'</span></td></tr>';}).join("")+'</table>'+
    '<h2>Dit kan ik al</h2>'+(goed.length?'<ul>'+goed.map(function(x){return '<li>'+esc(ONDW[x.k].t)+'</li>';}).join("")+'</ul>':'<p class="m">Nog geen onderwerp op "Gaat goed".</p>')+
    '<h2>Dit moet ik nog doen</h2>'+(nog.length?'<ul>'+nog.map(function(x){return '<li><b>'+esc(ONDW[x.k].t)+'.</b> '+esc(ONDW[x.k].tip)+' <span class="m">Fout of niet af: '+OPG.toLowerCase()+' '+x.fout.join(", ")+'.</span></li>';}).join("")+'</ul>':'<p>Alles gaat goed. Volgende stap: een toets met meer sterren.</p>')+
    '<h2>Per '+OPG.toLowerCase()+'</h2><table><tr><th>'+OPG+'</th><th>Punten</th></tr>'+d.rek.map(function(r){var q=rPts(r);return '<tr><td>'+r.nr+'. '+esc(r.titel)+'</td><td>'+pn(q)+' van '+r.p+(q<r.p?' ✗':' ✓')+'</td></tr>';}).join("")+'</table>'+
    '<p class="m" style="font-size:13px;margin-top:18px">Rekenen en keuzes zijn nagekeken met het nakijkblad. De uitlegvragen zijn nagekeken door de AI of door de leerling zelf.</p></main></body></html>';
  var fn=("Resultaat "+d.t+" - "+naam+(klas?" - "+klas:"")).replace(/[\\/:*?"<>|§]+/g,"").replace(/\s+/g," ").trim()+".html";
  var file;try{file=new File([h],fn,{type:"text/html"});}catch(e){file=new Blob([h],{type:"text/html"});}
  var url=URL.createObjectURL(file),dl='<a href="'+url+'" download="'+escA(fn)+'">download het bestand</a>';
  if(navigator.canShare&&file instanceof File&&navigator.canShare({files:[file]})){
    navigator.share({files:[file],title:"Resultaat oefentoets"}).then(function(){msg.innerHTML="Gedeeld. Lukt AirDrop niet? Dan kun je ook "+dl+".";},function(){msg.innerHTML="Delen gestopt. Tik opnieuw op de knop, of "+dl+".";});
  }else{var a=document.createElement("a");a.href=url;a.download=fn;document.body.appendChild(a);a.click();a.remove();
    msg.innerHTML="Je bestand staat bij je downloads. Open het in Bestanden en deel het met AirDrop. Lukt het niet? Dan kun je ook hier "+dl+".";}}
app.addEventListener("click",function(e){if(e.target.closest("#mkfile"))bestand();});
function result(){
  var d=D[cur],a=st[cur],m=maxPts(cur);
  var h='<a class="muted" href="#" id="home">← Andere toets kiezen</a><div class="card res fade" style="margin-top:16px"><div class="eyebrow">Je cijfer'+(d.open.length?' (voorlopig, tot je de open vragen hebt nagekeken)':'')+'</div><div class="grade" id="gr">-</div><p><b id="pp">0</b> van <b>'+m+'</b> punten'+(d.mc.length?' · meerkeuze '+mcScore()+'/'+d.mc.length:'')+'</p><p class="muted" id="gm" style="margin:0"></p><p class="muted" style="font-size:14px;margin:10px 0 0">Cijfer = punten : '+m+' × 9 + 1.'+(d.mc.length?' Meerkeuze en rekenen zijn nagekeken met het nakijkblad'+(d.open.length?'; bij de open vragen kijkt de AI mee en kun jij de vinkjes nog aanpassen':'')+'.':' Bedragen, procenten en keuzes zijn nagekeken met het nakijkblad van je docent; bij de uitlegvragen kijkt de AI mee en kun jij de vinkjes nog aanpassen.')+' Foute rekenantwoorden: geef jezelf de punten die je berekening waard is.</p></div>'+ovzHtml()+(d.mc.length?'<h2>Meerkeuze nagekeken</h2>':'');
  d.mc.forEach(function(q,i){var ok=a.mc[i]===q.j;h+='<div class="card q"><div class="n">Vraag '+(i+1)+(ok?" · goed":(a.mc[i]==null?" · niet beantwoord":" · fout"))+'</div><p>'+esc(q.v)+'</p><div class="opts">';
    a.perm[i].forEach(function(oi,pos){var c=oi===q.j?" right":(a.mc[i]===oi?" wrong":"");h+='<div class="opt'+c+'" style="cursor:default"><span class="l">'+"ABCD"[pos]+'</span><span>'+esc(q.o[oi])+'</span></div>';});
    h+='</div>'+(q.u?'<div class="fb">'+esc(q.u)+'</div>':"")+'</div>';});
  if(d.open.length){h+='<h2>Open vragen nakijken</h2>';
    d.open.forEach(function(o){h+='<div class="card q"><div class="n">Vraag '+o.nr+' · '+o.p+' punt'+(o.p>1?"en":"")+'</div>'+(o.b?bronHtml(o.b):"")+'<p>'+qtext(o.v)+'</p>'+openRes(o)+'</div>';});}
  h+='<h2>'+(d.mc.length?REK+' nagekeken':'Je antwoorden nagekeken')+'</h2>';
  d.rek.forEach(function(r){h+=rekRes(r);});
  h+='<div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost" id="again">Deze toets opnieuw maken</button><a class="btn" href="'+LAB+'">Oefen verder in het Oefenlab</a></div>';
  app.innerHTML=h;score();runAI();
}
load();"""
j0, j1 = s.index("function result(){"), s.index("load();\nvar m=")
s = s[:j0] + RESULT + s[j1 + len("load();"):]
s = rep(s, "/[?&]t=(t[123])/", "/[?&]t=(t[1-9])/")

# ---------- controle ----------
for gone in ["Geschiedenis", "gv-toets", "HF[", "data/toetsen.js"]:
    assert gone not in s, gone
for need in ['vak:"economie"', C["key"], "../../ai.js", "../../nakijker.js", "t[1-9]"]:
    assert need in s, need

os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "toets.html"), "w", encoding="utf-8").write(s)
print("economie/%s/toets.html" % name, len(s), "tekens;", ", ".join(T))
