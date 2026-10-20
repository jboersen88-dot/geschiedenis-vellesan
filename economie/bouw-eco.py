# Bouwt economie/<naam>/app.html uit de leeromgeving van boekje 1 (../app.html) met de Economie-inhoud uit <naam>/bron/.
# Gebruik: python3 -I economie/bouw-eco.py se3   (vanuit de root van de repo)
# Een nieuw hoofdstuk = een nieuwe bron/data.json (+ reken.js, lab-html.inc) en een regel in CONFIG.
import json, re, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECO = os.path.join(ROOT, "economie")

CONFIG = {
    "se3": dict(
        titel="Economie · jaar 4 · SE3 (hoofdstuk 1 en 2)",
        eyebrow="Economie · jaar 4",          # klein regeltje boven de titel
        kort="SE3 · hoofdstuk 1 en 2",        # titel in de balk en op de banner
        sub="8 paragrafen · inkomen, besteden, geld en rekenen",
        intro_eyebrow="Jaar 4 · SE3",
        key="gs-eco-se3-v1",                  # localStorage-sleutel
        terug="../h.html?p=jaar-4%2Fse-h1-h2-h8",
        bron="se3/bron",                      # map met data.json, reken.js, lab-html.inc (relatief aan economie/)
        vak="eco4",                           # vak-sleutel voor de Worker (toets op maat)
    ),
}

if len(sys.argv) != 2 or sys.argv[1] not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/bouw-eco.py <" + "|".join(CONFIG) + ">")
name = sys.argv[1]
C = CONFIG[name]
OUT = os.path.join(ECO, name)
BRON = os.path.join(ECO, C["bron"])

src = open(os.path.join(ROOT, "app.html"), encoding="utf-8").read()
D = json.load(open(os.path.join(BRON, "data.json"), encoding="utf-8"))
REKEN = open(os.path.join(BRON, "reken.js"), encoding="utf-8").read()
LABS = open(os.path.join(BRON, "lab-html.inc"), encoding="utf-8").read()
assert "</script" not in json.dumps(D) + REKEN, "</script in de data"

# dia's: deck.json van stuk C, anders {} (dan valt de viewer terug op de Drive-weergave)
dj = os.path.join(OUT, "slides", "deck.json")
DECK = json.load(open(dj, encoding="utf-8")) if os.path.exists(dj) else {}

PARS = D["PARS"]
GOALS = D["GOALS"]
first = PARS[0]["id"]


def set_var(s, vname, value):
    m = re.search(r"var\s+" + vname + r"\s*=\s*", s)
    assert m, vname
    v, end = json.JSONDecoder().raw_decode(s, m.end())
    return s[:m.end()] + json.dumps(value, ensure_ascii=False) + s[end:]


def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:90])
    return s.replace(old, new)


def rex(s, pat, new, flags=re.S):
    out, k = re.subn(pat, lambda m: new, s, count=1, flags=flags)
    assert k == 1, pat[:90]
    return out


s = src

# ---------- data ----------
mat = {k: [v[0], [["Opdracht", v[1]], ["Nakijkblad", v[2]]]] for k, v in D["MAT"].items()}  # app-formaat
films = [{"par": "alle", "film": f[0], "k": f[1], "t": f[2], "d": f[3], "lab": f[4], "mode": f[5], "btn": f[6]} for f in D["FILMS"]]
nv = {}
exec(open(os.path.join(BRON, "niveau-eco.py"), encoding="utf-8").read(), nv)
chs = sorted({p["ch"] for p in PARS})
ONDW = json.load(open(os.path.join(BRON, "onderwerpen.json"), encoding="utf-8"))
MT = [[o["paragraaf"], o["paragraaf"] + " " + o["titel"], i] for i, o in enumerate(ONDW)]  # w = index in onderwerpen.json = onderwerp voor de Worker (zelfde volgorde in de Worker)
MTB = [{"id": str(c), "t": "Hoofdstuk %d" % c} for c in chs]
for k, v in [("PARS", PARS), ("GOALS", GOALS), ("CHK", D["CHK"]), ("CARDS", D["CARDS"]), ("BANK", D["BANK"]), ("SORT", D["SORT"]),
             ("MAT", mat), ("VERS", D["VERS"]), ("FILMS", films), ("DECK", DECK), ("MT", MT),
             ("NORIG", {k: len(g) for k, g in GOALS.items()}), ("BANKLV", nv["niveaus"](D["BANK"]))]:
    s = set_var(s, k, v)
s = rex(s, r"/\*SEL\*/var SEL=.*?;/\*ENDSEL\*/", "/*SEL*/var SEL={};/*ENDSEL*/")
assert 'var YT_ID={H1:"",H2:""};' in s
s = s.replace('var YT_ID={H1:"",H2:""};', "var YT_ID={};")
s = rep(s, 'var cur="H1";', 'var cur="%s";' % first)

# ---------- teksten ----------
s = rep(s, "<title>Leeromgeving · De industriële samenleving</title>", "<title>Leeromgeving · %s</title>" % C["titel"])
s = rep(s, '<div class="badge">GS</div>', '<div class="badge">EC</div>')
s = rep(s, "<small>Geschiedenis · jaar 3 · mavo · boekje 1</small><b>De industriële samenleving</b>",
        "<small>%s</small><b>%s</b>" % (C["eyebrow"], C["kort"]))
s = rep(s, 'href="boekje-1.html">← Overzicht', 'href="%s">← Overzicht' % C["terug"])
s = rex(s, r'<div class="banner" style="[^"]*"><div class="cap">.*?</div></div>',
        '<div class="banner" style="background:linear-gradient(120deg,var(--plum) 0%%,var(--plum-2) 100%%)"><div class="cap"><b>%s</b><span>%s</span></div></div>' % (C["kort"], C["sub"]))
s = rep(s, "Boekje 1 · SE 1", C["intro_eyebrow"])
s = rep(s, "Van spinnewiel tot supermarkt.<br>Begin hier.", "Alles om je SE3 te halen.<br>Begin hier.")
s = rex(s, r"Alles voor het boekje De industriële samenleving op één plek:[^<]*",
        "Alles voor dit SE-onderdeel op één plek: de PowerPoint per paragraaf, vragen om af te vinken, begrippen, een formule- en rekentrainer, een vraagbank met %d vragen, games, filmpjes en oefentoetsen met nakijkblad." % len(D["BANK"]))
s = rep(s, 'data-par="H1"><svg', 'data-par="%s"><svg' % first)
s = rep(s, "Begin met H1</button>", "Begin met %s</button>" % first)
s = rep(s, "De PowerPoint, beelden en vragen per hoofdstuk", "De PowerPoint en de vragen per paragraaf")
s = rep(s, "Flash cards, tijdlijn, oorzaak en gevolg, quiz en games", "Flash cards, formules, rekentrainer, quiz en games")
# startpagina: paragrafen per hoofdstuk
blok = "".join('<h3 class="chh"><span class="cn" style="background:var(--p%d)">H%d</span>Hoofdstuk %d<small id="ch%dtxt"></small></h3>\n      <div class="pgrid" id="pgrid%d"></div>\n      ' % (c, c, c, c, c) for c in chs)
s = rex(s, r'<h3 class="chh">.*?<div class="pgrid" id="pgrid1"></div>\s*', "")  # weg van Start ...
s = rep(s, '<section class="panel" id="les" hidden>\n      <div class="les">', '<section class="panel" id="les" hidden>\n      ' + blok + '<div class="les">')  # ... naar Lesstof
# klik op een kaart vanuit Lesstof: scroll naar de les zelf
s = rep(s, 'if(g.dataset.par)cur=g.dataset.par;show(g.dataset.go);}',
        'if(g.dataset.par)cur=g.dataset.par;show(g.dataset.go);if(g.dataset.par&&g.closest("#les"))document.querySelector("#les .les").scrollIntoView();}')
s = rep(s, "[1].forEach(function(ch){", "%s.forEach(function(ch){" % json.dumps(chs))
s = rep(s, ",url('+THUMB(p.img,600)+'),'+p.c+'\"", ",'+p.c+'\"")  # geen kopafbeelding: gradient op kleur
s = rep(s, "h='<div class=\"rh\">De industriële samenleving</div>'", "h='<div class=\"rh\">Hoofdstuk '+x.ch+'</div>'")
s = rep(s, 'textContent="De industriële samenleving · hoofdstuk "+p.id.slice(1);', 'textContent="Hoofdstuk "+p.ch+" · paragraaf "+p.id;')
s = rep(s, "Extra oefenen op examenniveau", "Extra oefenbladen")
s = rex(s, r'<p class="muted" style="margin:2px 0 14px;font-size:14px;max-width:760px">Geen spelletjes.*?</p>',
        '<p class="muted" style="margin:2px 0 14px;font-size:14px;max-width:760px">Opdrachten waarbij je zelf aan het werk gaat. Elk blad heeft een nakijkblad, zodat je je eigen antwoorden kunt controleren.</p>')
s = rex(s, r'<div class="gpick">.*?</div>\s*(?=<details open)', "")  # Geschiedenis-tegels weg
s = rep(s, '["f1","f2","rb","st","db"].map(', "Object.keys(MAT).map(")

# ---------- oefenlab: tijdlijn en oorzaak-gevolg eruit, formule en reken erin ----------
s = rex(s, r'<button data-lab="tijd".*?</button>\s*<button data-lab="oorzaak".*?</button>',
        '<button data-lab="formule" aria-selected="false">🧮 Welke formule?</button>\n          <button data-lab="reken" aria-selected="false">🔢 Rekentrainer</button>')
s = rex(s, r'<div class="lab ex" id="lab-tijd" hidden>.*?(?=<div class="lab ex" id="lab-quiz")', LABS.strip() + "\n        ")
s = rex(s, r"/\* -+ tijdlijn -+ \*/.*?\nnewC\(\);\n", "")
s = rep(s, """    if(l.dataset.xpar){if(l.dataset.golab==="tijd"){tlPar=l.dataset.xpar;newT();}else{cgPar=l.dataset.xpar;newC();}}""",
        """    if(l.dataset.mode&&l.dataset.golab==="reken")RK.setMode(l.dataset.mode);""")
s = rep(s, """var go=c[2]==="quiz"?' data-golab="quiz" data-qpar="'+c[1]+'"':' data-golab="'+c[2]+'" data-xpar="'+c[1]+'"';""",
        """var go=c[2]==="reken"?' data-golab="reken" data-mode="'+c[3]+'"':' data-golab="quiz" data-qpar="'+c[1]+'"';""")
# rekenmodule: eigen scope (botsingen met rnd, pick, r, shuffle, num, fs, mode ... voorkomen)
s = rep(s, "/* ---------- oefenlab navigatie ---------- */",
        "/* ---------- formule- en rekenlab (eigen scope) ---------- */\nvar RK=(function(){\n" + REKEN.strip() + "\nreturn {setMode:function(m){mode=m;newR();}};\n})();\n\n/* ---------- oefenlab navigatie ---------- */")

# ---------- flash cards: richting omkeren ----------
s = rep(s, '<div class="filters" id="cardFilters"></div>',
        '<div class="filters" id="cardDir" role="group" aria-label="Richting van de kaarten"><button data-d="0">Begrip → omschrijving</button><button data-d="1">Omschrijving → begrip</button></div>\n          <div class="filters" id="cardFilters"></div>')
s = rep(s, 'var cardFilter="alle",', 'var cardRev=false;try{cardRev=localStorage.getItem("%s-dir")==="1";}catch(e){}\nvar cardFilter="alle",' % C["key"])
s = rep(s, "function renderFlash(){\n", """function renderFlash(){
  document.querySelectorAll("#cardDir button").forEach(function(b){var on=(b.dataset.d==="1")===cardRev;b.className=on?"on":"";b.setAttribute("aria-pressed",on);});
""")
s = rep(s, """aria-label="Begrip: '+c[1]+'">""", """aria-label="'+(cardRev?"Omschrijving: "+c[2].replace(/"/g,"&quot;"):"Begrip: "+c[1])+'">""")
s = rep(s, "<strong>'+c[1]+'</strong><small>", "'+(cardRev?'<span style=\"font-size:14.5px;line-height:1.35;margin-top:6px;overflow:auto\">'+c[2]+'</span>':'<strong>'+c[1]+'</strong>')+'<small>")
s = rep(s, """<div class="b"><div>'+c[2]+'</div>""", """<div class="b">'+(cardRev?'<strong style="font-size:18px;color:var(--plum)">'+c[1]+'</strong>':'<div>'+c[2]+'</div>')+'""")
s = rep(s, 'cf.addEventListener("click"', """document.getElementById("cardDir").addEventListener("click",function(e){var d=e.target.dataset.d;if(d===undefined)return;cardRev=d==="1";try{localStorage.setItem("%s-dir",d);}catch(x){}renderFlash();});
cf.addEventListener("click\"""" % C["key"])

# ---------- games: sorteren, memory en EDU-Racer ----------
for g in ["kaart", "beeldquiz", "verhaal"]:
    s = rex(s, r"\s*'<a class=\"gtile\" href=\"" + g + r"\.html\".*?</a>'\+\n", "\n")
s = rex(s, r"\s*'<a class=\"gtile\" href=\"racer\.html\".*?</a>'\+\n",
        """\n   '<a class="gtile" href="../apps/jaar-4_se-h1-h2-h8_1.html"><span class="gico">🏎️</span><b>EDU-Racer</b><span>Race en tank bij elk station bij met vragen over hoofdstuk 1 en 2.</span><em>Vragen nog niet door de docent gecontroleerd</em></a>'+\n""")
s = rep(s, '"gs3-"+k', '"%s-"+k' % C["key"], 2)
s = rep(s, 'var KEY="gs3-ind-app-v1"', 'var KEY="%s"' % C["key"])
# Leg uit: de AI-nakijker van de Worker kent alleen de Geschiedenis-lesstof; hier altijd de lokale kernwoordencontrole
s = rep(s, "if(!window.GV_AI||!GV_AI.enabled){luShow(c,luLocal(c,ans));return;}", "if(true){luShow(c,luLocal(c,ans));return;}")

# ---------- dia's: lokale jpg's als DECK ze kent, anders Drive-voorbeeld ----------
s = rep(s, """el.innerHTML='<div class="ph">Nog geen presentatie voor '+h+'.</div>';return;""",
        """el.innerHTML='<div class="ph">PowerPoint laden…</div><iframe src="'+DRIVE(P(h).file)+'" allow="autoplay" loading="lazy" title="PowerPoint '+h+'"></iframe>';return;""")
s = rep(s, """<a href="presenteer.html?h='+h+'" target="_blank" rel="noopener">Presenteer ↗</a>""", "")
s = rep(s, '"deck-"+h', '"deck-%s-"+h' % name)
s = rep(s, '"deck-"+p.id', '"deck-%s-"+p.id' % name)

# ---------- oefentoetsen: vier versies als kaarten met Toets en Nakijkblad ----------
s = rex(s, r'<div class="eyebrow">Oefentoetsen</div>.*?id="pdfLinks" hidden></p>',
        '<div class="eyebrow">Oefentoetsen</div><h2>Oefentoetsen met nakijkblad</h2>\n'
        '        <p class="muted" style="margin:2px 0 12px;font-size:14px;max-width:700px">Maak de toets digitaal, met klok, zonder boek en zonder hulp (je rekenmachine mag). Meerkeuze en rekenen kijken zichzelf na met het nakijkblad van je docent, bij de open vragen kijkt de AI mee. Liever op papier? Gebruik dan de kleine links onder de toets.</p>\n'
        '        <div class="vgrid" id="versList"></div>')
s = rex(s, r"function loadToets\(\)\{.*?\n\}\n", """function loadToets(){
  var el=document.getElementById("versList");if(!el||el.firstChild)return;
  el.innerHTML=VERS.map(function(v){return '<div class="vcard"><h3>Toets '+v.n+'</h3><div class="lvls"><i class="'+(v.th==="Verdieping"?"v":"")+'">Theorie '+v.th.toLowerCase()+'</i><i class="'+(v.rk==="Verdieping"?"v":"")+'">Rekenen '+v.rk.toLowerCase()+'</i></div>'+
    '<p class="muted" style="margin:0;font-size:13.5px">'+v.meta+'</p><p class="muted" style="margin:0;font-size:13px">'+v.min+' minuten · '+v.pts+' punten</p>'+
    '<div class="row" style="margin-top:auto;padding-top:6px"><a class="btn" href="toets.html?t=t'+v.n+'">Maak de toets digitaal</a></div>'+
    '<p class="muted" style="margin:6px 0 0;font-size:12.5px">Op papier: <a target="_blank" rel="noopener" href="'+VIEW(v.toets)+'">toets ↗</a> · <a target="_blank" rel="noopener" href="'+VIEW(v.nk)+'">Nakijkblad ↗</a></p></div>';}).join("");
}
""")
s = rep(s, "</style>", ".vgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:12px}\n"
        ".vcard{display:flex;flex-direction:column;gap:6px;border:1.5px solid var(--line);border-radius:14px;padding:14px;background:#fff}.vcard h3{margin:0}\n</style>")

# ---------- toets op maat: 24 onderwerpen (onderwerpen.json, 3 per paragraaf), twee blokken, vak meesturen ----------
s = rep(s, "var MT_open={},", "var MTB=%s;\nvar MT_open={}," % json.dumps(MTB, ensure_ascii=False))
s = rep(s, "PARS.map(function(p){\n    var ids=alleIdx().filter(function(i){return MT[i][0]===p.id;})",
        "MTB.map(function(p){\n    var ids=alleIdx().filter(function(i){return MT[i][0].charAt(0)===p.id;})")
s = rep(s, "<summary>'+tag(p.id)+'<span class=\"mtit\">", "<summary><span class=\"chip\" style=\"background:var(--plum)\">H'+p.id+'</span><span class=\"mtit\">")
s = rex(s, r"function nogIdx\(\)\{.*?\n",
        "function nogIdx(){return alleIdx().filter(function(i){var p=P(MT[i][0]);return goalCount(p.id)<p.g.length;});} /* nog niet alle vragen van de paragraaf afgevinkt */\n")
s = rep(s, "GV_NK.maak({onderwerpen:sel,mc:nn,open:2})", 'GV_NK.maak({onderwerpen:sel,mc:nn,open:2,vak:"%s"})' % C["vak"])
s = rep(s, "GV_NK.check({h:[q.h],vraag:q.v,", 'GV_NK.check({h:[q.h],vak:"economie",vraag:q.v,')
# h is een sleutel als "E4-1.1": chip toont "1.1"
s = rep(s, """function tag(id){return '<span class="chip" style="background:'+P(id).c+'">'+id+'</span>';}""",
        """function tag(id){id=String(id).replace(/^E4-/,"");var p=P(id);return '<span class="chip" style="background:'+(p?p.c:"var(--plum)")+'">'+id+'</span>';}""")
s = rex(s, r"function goAttr\(i\)\{.*?\n", """function goAttr(i){return ' data-golab="quiz" data-qpar="'+PARS[i].id+'"';}\n""")
s = rep(s, "escM(CHK[i][0])", "escM(PARS[i].t)")
s = rep(s, "tag(CHK[i][1])", "tag(PARS[i].id)")
s = rep(s, """(S.check[i]?'<span class="muted">al afgevinkt ✓</span>':'<button class="btn ghost" data-mmk="'+i+'">Vink af als beheerst</button>')""", """'<span class="muted">goed ✓</span>'""")
s = rep(s, "Object.keys(per).sort(function(a,b){return a-b;}).map(function(k){", "Object.keys(per).filter(function(k){return PARS[k];}).sort(function(a,b){return a-b;}).map(function(k){")
s = rep(s, r"/^#(?:(H[1-4])-?)?(les", r"/^#(?:(\d\.\d)-?)?(les")

# ---------- paden: scripts en afbeeldingen van de root staan twee mappen hoger ----------
def fix_path(m):
    attr, path = m.group(1), m.group(2)
    bare = path.split("?")[0].split("#")[0]
    if (not bare or ":" in bare or "+" in bare or "'" in bare or bare.startswith(("../", "/", "#"))
            or os.path.exists(os.path.join(OUT, bare)) or not os.path.exists(os.path.join(ROOT, bare))):
        return m.group(0)
    return f'{attr}="../../{path}"'
s = re.sub(r'(src|href)="([^"]+)"', fix_path, s)
assert 'src="../../ai.js"' in s and 'src="../../nakijker.js"' in s

# ---------- geen Geschiedenis meer ----------
for gone in ["racer.html", "nakijken.html", "toets.html?t=t1", "toets.html?t=t2", "toets.html?t=t3", "spotprent", "doeboek", "kaart.html", "beeldquiz", "verhaal.html", "presenteer.html",
             "Boekje 1", "boekje-1", "industri", "Engeland", "Geschiedenis", "tlCard", "cgCard", "newT(", "newC(", "gs3-"]:
    assert gone not in s, gone
for need in ['id="lab-formule"', 'id="lab-reken"', 'vak:"eco4"', C["key"], "../h.html?p=jaar-4%2Fse-h1-h2-h8", 'id="versList"']:
    assert need in s, need

os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "app.html"), "w", encoding="utf-8").write(s)
print("economie/%s/app.html" % name, len(s), "tekens; DECK:", DECK or "leeg (Drive-voorbeeld)")
