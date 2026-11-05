# Zet een oude lesapp (kopie van meneerboersen.nl in economie/apps/) om naar de nieuwe opzet:
#   economie/<naam>/data.json   lesstof per paragraaf voor de leeromgeving (h.html?p=...&par=2.1, gebouwd door economie.js)
#   economie/<naam>/oefen.html  de oefenomgeving: dezelfde app (oefenlab, quiz, games, oefentoetsen) in de huisstijl van de site
# Gebruik: python3 -I economie/bouw-oefen.py j2h2   (vanuit de root van de repo)
# Een nieuw hoofdstuk = een regel in CONFIG (de lesapps van jaar 2 H3/H4 en jaar 4 H1 hebben dezelfde opbouw) + een RIJK-regel in economie.js.
import json, re, os, sys

ECO = os.path.dirname(os.path.abspath(__file__))

CONFIG = {
    "j2h2": dict(
        bron="apps/jaar-2_mavo_hoofdstuk-2.html",
        pad="jaar-2/mavo/hoofdstuk-2",     # pagina in data/paginas.json
        hoofdstuk="Hoofdstuk 2",
        eyebrow="Economie · jaar 2 mavo · hoofdstuk 2",
        kop=["Jij en je ", "geld"],
        nr="H2",
        beelden=["boodschappen", "lenen-vergelijken", "polis-tekenen"],  # collage in de kop: img/<naam>/<beeld>.jpg
        toetsen=("h2", "§2.1 en §2.2"),     # oefentoetsen/oefentoets-<h2>-<n>-ster.docx
    ),
}

if len(sys.argv) != 2 or sys.argv[1] not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/bouw-oefen.py <" + "|".join(CONFIG) + ">")
name = sys.argv[1]
C = CONFIG[name]
OUT = os.path.join(ECO, name)
s = open(os.path.join(ECO, C["bron"]), encoding="utf-8").read()
q = lambda t: t.replace("/", "%2F")
TERUG = "../h.html?p=" + q(C["pad"])
INFO = TERUG + "&par="


def grab(name):
    """waarde van `var NAME=...` uit de app; JSON of een JS-objectlijst met kale sleutels (FILMS)"""
    m = re.search(r"var\s+" + name + r"\s*=\s*", s)
    assert m, name
    try:
        return json.JSONDecoder().raw_decode(s, m.end())[0]
    except ValueError:
        end = s.index("];", m.end()) + 1
        lit = re.sub(r'([{,]\s*)(\w+):', r'\1"\2":', s[m.end():end])  # {par:"2.1"} -> {"par":"2.1"}
        return json.loads(lit)


def rep(t, old, new, n=1):
    assert t.count(old) == n, (t.count(old), old[:90])
    return t.replace(old, new)


def rex(t, pat, new, groepen=False):
    """groepen=True: \\g<1> in new verwijst naar de gevonden groepen"""
    out, k = re.subn(pat, new if groepen else (lambda m: new), t, count=1, flags=re.S)
    assert k == 1, pat[:90]
    return out


# ---------- data voor de leeromgeving ----------
PARS, GOALS, SEL = grab("PARS"), grab("GOALS"), grab("SEL")
key = re.search(r'var KEY="([^"]+)"', s).group(1)
pars = []
for p in PARS:
    gi = SEL.get(p["id"]) or list(range(len(GOALS[p["id"]])))  # zelfde selectie als de app, anders telt de voortgang anders
    pars.append(dict(id=p["id"], t=p["t"], sum=p["sum"], file=p["file"], x=p["x"], q=p["q"],
                     imgs=[[os.path.basename(i[0])[:-4], i[1]] for i in p.get("imgs", [])],
                     g=[GOALS[p["id"]][i] for i in gi], gi=gi))
# dia's als klikbare presentatie: slides/deck.json ({"2.1": aantal dia's}) en slides/steps.json (klikstappen), zie tools/dias/README.md
sl = lambda f: json.load(open(os.path.join(OUT, "slides", f), encoding="utf-8")) if os.path.exists(os.path.join(OUT, "slides", f)) else {}
data = dict(key=key, oefen=name + "/oefen.html", pars=pars, cards=grab("CARDS"), films=grab("FILMS"), mat=grab("MAT"), deck=sl("deck.json"), steps=sl("steps.json"))
os.makedirs(OUT, exist_ok=True)
json.dump(data, open(os.path.join(OUT, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

# ---------- oefenomgeving ----------
FONT = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,600&family=Inter:wght@400;500;600;700;800&display=swap"
s = re.sub(r"https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans[^\"]*", FONT, s)
s = rep(s, "<title>%s %s</title>" % (C["hoofdstuk"], "".join(C["kop"])), "<title>Oefenomgeving · %s · Economie</title>" % "".join(C["kop"]))

# oude paars/roze kleuren -> groen, koraal en beige van de site (ook de vaste kleuren in games, munten en verloop)
KLEUR = {"#3b1534": "#123a30", "#5a1f4f": "#1f5f4e", "#6a2559": "#174a3d", "#2a0f26": "#0c241d", "#a01a58": "#c2484d", "#e2457f": "#ff8d90",
         "#ffd6e8": "#ffc9c8", "#fbe8f0": "#ffe6e4", "#f1e8ec": "#efe6d6", "#fcf6f9": "#fbf6ee", "#fff9fc": "#fffdf9", "#f8f1f5": "#f9f3ea",
         "#f6eef2": "#f6efe4", "#f4ecf0": "#f4ecdf", "#d9c9d1": "#d8cbb5", "#e3c3d3": "#e3d3bb", "#e1cfd8": "#e0d2bc", "#8a7f88": "#8a7f6e",
         "#2f6fb0": "#2f8f86", "#1f4f86": "#1f5f4e", "#251b25": "#201a14", "#6d6270": "#6f6556", "#ece3e7": "#e6dac4", "#f7f3f1": "#f6f0e6",
         "rgba(59,21,52": "rgba(31,95,78"}
for oud, nieuw in KLEUR.items():
    s = re.sub(re.escape(oud) + (r"(?![0-9a-fA-F])" if oud[0] == "#" else ""), nieuw, s, flags=re.I)

# kop van de app wordt nav + hero + tabbalk zoals op de site; Lesstof en Filmpjes staan nu in de leeromgeving
LES = INFO.replace("&", "&amp;") + pars[0]["id"]  # leeromgeving, eerste paragraaf
tab = lambda t: re.search(r'<button role="tab" data-tab="%s".*?</button>' % t, s, re.S).group(0)
tabs = tab("start").replace("<span>Start</span>", "<span>Overzicht</span>") + tab("lab") + tab("toets")
s = rex(s, r'<div class="top">.*?</nav>\s*</div>',
        '<header class="onav"><div class="owrap"><a class="brand" href="%s" aria-label="Meneer Boersen, terug naar het hoofdstuk"><b class="ofull">Meneer <span>Boersen</span></b><b class="oshort" aria-hidden="true">M<span>B</span></b></a>'
        '<nav class="olinks" aria-label="Menu"><a href="%s">%s</a><a href="%s">Leeromgeving</a><a class="cta" href="#" aria-current="page">Oefenomgeving</a></nav></div></header>\n'
        '<section class="otop"><div class="owrap"><div class="oeyebrow">Oefenomgeving · %s</div><div class="otop-in"><div>'
        '<div class="onum">%s</div><h1>%s<em>%s</em></h1><p>Begrippen, rekenen, quiz, games en oefentoetsen met nakijkblad. De PowerPoints en filmpjes staan in de <a href="%s">leeromgeving</a>.</p>'
        '<div class="prog"><div class="ring" id="ring"><span id="ringTxt">0%%</span></div><div>jouw voortgang<br><b id="progTxt">0 vragen</b></div></div></div>'
        '<div class="ogal">%s</div></div></div></section>\n'
        '<div class="otabs"><div class="owrap"><nav class="tabs" role="tablist">%s</nav></div></div>'
        % (TERUG, TERUG, C["hoofdstuk"], LES, C["eyebrow"], C["nr"], C["kop"][0], C["kop"][1], LES,
           "".join('<img src="../img/%s/%s.jpg" alt="" loading="lazy">' % (name, b) for b in C["beelden"]), tabs))
s = rep(s, "</main>", '</main>\n<footer class="ofoot"><div class="owrap"><span>Meneer Boersen · Vellesan College · %s</span><span>Je voortgang wordt op dit apparaat bewaard, in deze browser.</span></div></footer>' % C["eyebrow"])

# startpagina: teksten voor een oefenomgeving
s = rex(s, r'(<div class="card intro">\s*<div class="eyebrow">)[^<]*(</div>\s*<h2>)[^<]*<br>Begin hier\.',
        r"\g<1>Oefenomgeving\g<2>Ga aan de slag.<br>Begin hier.", groepen=True)
s = rex(s, r'(<div class="card intro">.*?<p>)[^<]*(</p>)',
        r"\g<1>Train de begrippen en rekensommen, maak quizvragen uit de vraagbank, speel de games en maak de oefentoets met nakijkblad. Lees eerst de lesstof in de leeromgeving.\g<2>", groepen=True)
s = rex(s, r'<button class="btn" data-go="les" data-par="[\d.]+">(<svg.*?</svg>)Begin met [\d.]+</button>',
        r'<button class="btn" data-go="lab">Start met oefenen</button><button class="btn ghost" data-go="les" data-par="%s">\g<1>Lees %s</button>' % (pars[0]["id"], pars[0]["id"]), groepen=True)
s = rep(s, "De PowerPoint en je leerdoelen per paragraaf", "De lesstof per paragraaf, in de leeromgeving")

# voortgang telt de kernvragen die in de leeromgeving zijn afgevinkt (S.qs), niet meer de leerdoelen
s = rep(s, 'function goalCount(id){var p=P(id),d=0;p.gi.forEach(function(gi){if(S.goals[id+"-"+gi])d++;});return d;}',
        'function goalCount(id){var p=P(id),d=0;p.q.forEach(function(_,i){if(S.qs[id+"-"+i])d++;});return d;}')
s = rep(s, "t+=p.g.length;d+=goalCount(p.id);", "t+=p.q.length;d+=goalCount(p.id);")
s = rep(s, 'textContent=x[0]+" van "+x[1]+" leerdoelen";', 'textContent=x[0]+" van "+x[1]+" vragen";')
s = rep(s, "var d=goalCount(p.id),n=p.g.length||1;", "var d=goalCount(p.id),n=p.q.length||1;")
s = rep(s, "<span>'+d+' van '+n+' leerdoelen</span>", "<span>'+d+' van '+n+' vragen</span>")
s = rep(s, 'textContent=t[0]+" van "+t[1]+" leerdoelen";', 'textContent=t[0]+" van "+t[1]+" vragen";')

# naar "les" = naar de leeromgeving; deep links #lab/reken/<mode>, #lab/quiz/<par>, #lab/begrippen/<par>, #toets
s = rep(s, 'var g=e.target.closest("[data-go]");if(g){if(g.dataset.par)cur=g.dataset.par;show(g.dataset.go);}',
        'var g=e.target.closest("[data-go]");if(g){if(g.dataset.par)cur=g.dataset.par;if(g.dataset.go==="les"){location.href=%s+encodeURIComponent(cur);return;}show(g.dataset.go);}' % json.dumps(INFO))
s = rep(s, "main.scrollTop=0;", "toMain(false);")
# naar het begin van de inhoud, net onder de vaste nav en de tabbalk (alleen omhoog, tenzij altijd=true)
s = rep(s, "function show(name){", 'function toMain(altijd){var y=main.getBoundingClientRect().top+scrollY-document.querySelector(".otabs").offsetHeight-62;if(altijd||scrollY>y)scrollTo(0,y);}\nfunction show(name){')
s = rep(s, "renderFlash();renderProgress();renderCheck();\n})();", """renderFlash();renderProgress();renderCheck();
function route(){var h=location.hash.slice(1).split("/");
if(h[0]==="toets")show("toets");
else if(h[0]==="lab"){show("lab");
  if(h[1]==="reken"){showLab("reken");if(h[2]){mode=h[2];newR();}}
  else if(h[1]==="quiz"){showLab("quiz");if(h[2]){quizPar=h[2];quizHome();}}
  else if(h[1]==="begrippen"){showLab("begrippen");if(h[2]){cardFilter=h[2];renderFlash();}}
  else if(h[1])showLab(h[1]);}
else return;
toMain(true);}
route();addEventListener("hashchange",route);
})();""")

# oefentoetsen zoals bij Geschiedenis: de digitale toetsen (toets.html, gebouwd door bouw-toets.py uit bron/toetsen.json) als kaarten,
# op papier de Word-versies en de oude PDF-toets met nakijkblad. Het oude tabblad (PDF, klok, nakijkblad) blijft verborgen staan: de app-code verwijst ernaar.
TJ = json.load(open(os.path.join(OUT, "bron", "toetsen.json"), encoding="utf-8"))
kaart = lambda k, t: ('<a class="ovcard" href="toets.html?t=%s"><span class="ster">%s</span><h3>%s</h3><p>%d punten · %d vragen · %d minuten</p><span class="btn">Maak de toets →</span></a>'
                      % (k, "★" * t["n"], t["t"][0].upper() + t["t"][1:], sum(o["p"] for o in TJ["blokken"][t["rek"]]), len(TJ["blokken"][t["rek"]]), t["min"]))
t, ov = C["toetsen"]
papier = " · ".join('<a href="../oefentoetsen/oefentoets-%s-%d-ster.docx" download="Oefentoets %s %d-ster.docx">%d-ster (Word)</a>' % (t, n, t.upper(), n, n) for n in (1, 2, 3))
papier += "".join(' · <a target="_blank" rel="noopener" href="https://drive.google.com/file/d/%s/view">%s (PDF)</a> met <a target="_blank" rel="noopener" href="https://drive.google.com/file/d/%s/view">nakijkblad</a>' % (v["toets"], v["t"], v["nk"]) for v in grab("VERS") if v.get("nk"))
s = rep(s, '<section class="panel" id="toets" hidden>',
        '<section class="panel" id="toets" hidden>\n<div class="card pad otoets"><div class="eyebrow">Oefentoetsen</div><h2>Maak de toets hier, met klok en automatisch nakijken</h2>'
        '<p class="muted">Maak de toets zonder boek en zonder hulp, je rekenmachine mag. Bedragen, procenten en keuzes worden direct nagekeken met het nakijkblad van je docent; bij de uitlegvragen kijkt de AI mee. Kies je niveau: 1, 2 of 3 sterren. Werkt ook op de iPad. De toetsen gaan over %s.</p>'
        '<div class="ovgrid">%s</div><p class="muted opapier">Liever op papier? %s</p></div>\n<div hidden>' % (ov, "".join(kaart(k, x) for k, x in TJ["toetsen"].items()), papier))
s = rex(s, r"</section>(\s*<!-- FILMPJES -->)", r"</div></section>\g<1>", groepen=True)
s = rep(s, 'if(name==="toets")loadToets();', "")

# huisstijl van de site: zelfde kleuren en letters als economie.css en boekje 1; de pagina scrolt als geheel
s = rep(s, "</style>", """
/* ---------- huisstijl van de site (bouw-oefen.py) ---------- */
:root{--plum:#1f5f4e;--plum-2:#123a30;--berry:#c2484d;--berry-soft:#ffe6e4;--bg:#f6f0e6;--card:#fffdf9;--ink:#201a14;--muted:#6f6556;--line:#e6dac4;
  --p3:#1f5f4e;--p4:#b97a1f;--p5:#c2484d;--p6:#2f8f86;--coral:#ff8d90;--green-fg:#f3efe0;--green-mu:#b9d6cb;
  --shadow:0 1px 2px rgba(31,95,78,.06),0 10px 28px rgba(31,95,78,.08);--r:20px;--ease-out:cubic-bezier(.23,1,.32,1);color-scheme:light}
html,body{height:auto;font-family:Inter,system-ui,-apple-system,sans-serif}
h1,h2,h3,.chh,.vbtn b{font-family:Fraunces,Georgia,serif;letter-spacing:-.015em;color:var(--ink)}
h2{font-size:clamp(24px,2.8vw,32px);font-weight:700;line-height:1.08}
/* panelen zonder witte kaders, net als de leeromgeving: grote zwarte koppen op de beige achtergrond */
#lab>.card,#toets>.card,.hero .intro,.checkcard{background:transparent;border:0;box-shadow:none;padding-left:0;padding-right:0}
#lab>.card>.row h2,#toets>.card h2,.hero .intro h2,.checkcard h2{font-size:clamp(30px,4.4vw,50px);font-weight:700;line-height:1.02;margin-top:8px}
.blob,.coins{display:none}
.sub button,.filters button{background:var(--card);color:var(--ink);padding:8px 15px;font-size:14px}
.sub button[aria-selected=true],.filters button.on{background:var(--berry);border-color:var(--berry);color:#fff}
.sub{margin-bottom:22px}
.app{height:auto;min-height:0;max-width:none;padding:0;display:block}
main{overflow:visible;max-width:1180px;margin:0 auto;padding:28px max(16px,env(safe-area-inset-left,0px)) 64px}
.owrap{max-width:1180px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px))}
.onav{position:fixed;top:0;left:0;right:0;z-index:30;background:color-mix(in srgb,var(--plum-2) 94%,transparent);backdrop-filter:blur(10px);padding-top:env(safe-area-inset-top,0px)}
.onav .owrap{display:flex;align-items:center;justify-content:space-between;height:62px;gap:10px}
.onav .brand{font:700 19px Fraunces,Georgia,serif;color:var(--green-fg);text-decoration:none;white-space:nowrap}.onav .brand span{color:var(--coral)}.oshort{display:none}
.olinks{display:flex;gap:4px}
.olinks a{color:var(--green-fg);text-decoration:none;font-size:14px;font-weight:600;padding:8px 12px;border-radius:10px;white-space:nowrap}
.olinks a:hover{background:rgba(255,255,255,.12)}.olinks a.cta{background:var(--coral);color:#3a1412}
/* kop: dezelfde lichte band als de paragraafpagina's van de leeromgeving (groot nummer, titel, collage) */
.otop{background:color-mix(in srgb,var(--line) 38%,var(--bg));padding:calc(62px + env(safe-area-inset-top,0px) + 26px) 0 clamp(36px,6vw,64px)}
.oeyebrow{font-size:12.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--berry)}
.otop-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(28px,5vw,72px);align-items:center;margin-top:clamp(18px,3vw,34px)}
.onum{font:900 clamp(72px,11vw,140px)/.9 Fraunces,Georgia,serif;color:var(--berry)}
.otop h1{font-size:clamp(34px,4.6vw,52px);font-weight:700;line-height:1.05;margin:10px 0 12px}
.otop h1 em{font-style:italic;font-weight:600;color:var(--berry)}
.otop p{max-width:46ch;color:var(--muted);margin:0 0 22px;font-size:17px}.otop p a{color:var(--ink)}
.otop .prog{display:inline-flex;font-size:14px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:12px 16px;color:var(--ink)}
.ring{width:58px;height:58px;background:conic-gradient(var(--berry) calc(var(--v)*1%),color-mix(in srgb,var(--line) 70%,transparent) 0)}.ring span{width:46px;height:46px;font-size:13px;background:var(--card);color:var(--ink)}
.ogal{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ogal img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;box-shadow:0 14px 40px -24px rgba(18,58,48,.6)}
.ogal img:first-child{grid-column:1/-1;aspect-ratio:16/10}
@media (max-width:860px){.otop-in{grid-template-columns:1fr}}
/* tabbladen als knoppen, zoals 2.1 · 2.2 · 2.3 · 2.4 in de leeromgeving */
.otabs{position:sticky;top:calc(62px + env(safe-area-inset-top,0px));z-index:20;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);padding:10px 0}
.otabs nav.tabs{background:none;border:0;padding:0;gap:8px;flex-wrap:nowrap}
.otabs nav.tabs button{flex:none;color:var(--ink);border-radius:999px;border:1.5px solid var(--line);background:var(--card);padding:9px 16px}
.otabs nav.tabs button:hover{border-color:var(--berry);background:var(--card);color:var(--ink)}
.otabs nav.tabs button[aria-selected=true]{background:var(--berry);border-color:var(--berry);color:#fff;box-shadow:none}
nav.tabs button span{display:inline!important}
.btn{border-radius:999px;padding:11px 18px;background:var(--coral);color:#3a1412}
.btn.ghost{background:var(--card)}
.card{border-radius:var(--r)}
.otoets{margin-bottom:16px}.otoets>p{max-width:720px}
.ovgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px;margin:18px 0 14px}
.ovcard{display:flex;flex-direction:column;gap:6px;padding:20px;border:1.5px solid var(--line);border-radius:22px;background:var(--card);text-decoration:none;color:var(--ink);transition:border-color .16s,transform .16s var(--ease-out)}
.ovcard:hover{border-color:var(--berry)}.ovcard:active{transform:scale(.98)}
.ovcard .ster{color:var(--p4);font-size:22px;letter-spacing:3px}.ovcard h3{font-size:24px;margin:0}.ovcard p{margin:0 0 12px;color:var(--muted);font-size:14px}
.ovcard .btn{margin-top:auto;align-self:flex-start}
.opapier{font-size:14px}.opapier a{color:var(--ink)}
.ofoot{background:var(--plum-2);color:var(--green-mu);font-size:13px;padding:22px 0 34px}
.ofoot .owrap{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
@media (max-width:560px){.ofull,.olinks a:not(.cta):first-child{display:none}.oshort{display:inline}.olinks a{padding:8px 8px;font-size:13px}
  .otabs nav.tabs button{padding:9px 6px;font-size:13px;gap:5px}}
@media (max-width:400px){.otabs nav.tabs button svg{display:none}}
</style>""")

for gone in ["Plus+Jakarta", 'data-tab="les"', 'data-tab="films"', 'class="top"']:
    assert gone not in s, gone
open(os.path.join(OUT, "oefen.html"), "w", encoding="utf-8").write(s)
print("economie/%s/oefen.html" % name, len(s), "tekens; data.json:", len(pars), "paragrafen,", len(data["cards"]), "begrippen,", len(data["films"]), "filmpjes")
