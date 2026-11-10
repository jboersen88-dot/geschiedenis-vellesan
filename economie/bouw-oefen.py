# Zet een oude lesapp (kopie van meneerboersen.nl in economie/apps/) om naar de nieuwe opzet:
#   economie/<naam>/data.json   lesstof per paragraaf voor de leeromgeving (h.html?p=...&par=2.1, gebouwd door economie.js)
#   economie/<naam>/oefen.html  de oefenomgeving: dezelfde app (oefenlab, quiz, games, oefentoetsen) in de huisstijl van de site
# Gebruik: python3 -I economie/bouw-oefen.py j2h2   (vanuit de root van de repo)
# Een nieuw hoofdstuk = een regel in CONFIG + een RIJK-regel in economie.js (kleuren en kaartfoto's komen daar vandaan).
# Werkt met de nieuwere apps (H2: GOALS/SEL, imgs, FILMS, MAT, VERS) en de oudere (H1: leerdoelen in PARS, filmpjes alleen in de HTML).
import json, re, os, sys

ECO = os.path.dirname(os.path.abspath(__file__))

CONFIG = {
    "j2h1": dict(
        bron="apps/jaar-2_mavo_hoofdstuk-1.html",
        pad="jaar-2/mavo/hoofdstuk-1",     # pagina in data/paginas.json
        hoofdstuk="Hoofdstuk 1",
        eyebrow="Economie · jaar 2 mavo · hoofdstuk 1",
        kop=["Wat heb je ", "nodig?"],
        nr="H1",
        beelden=["markt", "geld", "shoppen"],  # collage in de kop: img/<naam>/<beeld>.jpg
        # de oude app heeft geen foto's per paragraaf; deze staan in img/j2h1 (Unsplash, gratis licentie)
        imgs={"1.1": [["keuzes", "Kiezen wat je koopt, want je kunt niet alles hebben"], ["markt", "Goederen kopen op de markt"]],
              "1.2": [["geld", "Bankbiljetten: chartaal geld"], ["pinnen", "Betalen met je pas: giraal geld"]],
              "1.3": [["boodschappen", "Boodschappen doen: eten en drinken zijn primaire behoeften"], ["shoppen", "Kleding uitzoeken als consument"]],
              "1.4": [["reviews", "Informatie over een product opzoeken voordat je koopt"], ["kopen", "Na het winkelen: weet wat je hebt gekocht"]]},
        filmpar={"1EN_S_SEca6zPTW3gp4XepzGCes8qs4-y": "1.3", "16N5D3Uk7W3dtGwI9u8KE6zPuN2LAx5CF": "1.1"},
        toetsen=("§1.1 tot en met §1.4", [("oefentoets-h1-a.docx", "Versie A (Word)"), ("oefentoets-h1-b.docx", "Versie B (Word)")]),
    ),
    "j2h2": dict(
        bron="apps/jaar-2_mavo_hoofdstuk-2.html",
        pad="jaar-2/mavo/hoofdstuk-2",
        hoofdstuk="Hoofdstuk 2",
        eyebrow="Economie · jaar 2 mavo · hoofdstuk 2",
        kop=["Jij en je ", "geld"],
        nr="H2",
        beelden=["boodschappen", "lenen-vergelijken", "polis-tekenen"],
        toetsen=("§2.1 en §2.2", "h2"),     # oefentoetsen/oefentoets-<h2>-<n>-ster.docx
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


def jsobj(lit):
    """JS-objectliteral met kale sleutels -> Python; sleutels binnen strings blijven heel"""
    return json.loads(re.sub(r'"(?:[^"\\]|\\.)*"|([{,]\s*)(\w+)(\s*:)',
                             lambda m: m.group(0) if not m.group(2) else m.group(1) + '"' + m.group(2) + '"' + m.group(3), lit))


def grab(name, default=None):
    """waarde van `var NAME=...` uit de app; JSON of een JS-objectlijst met kale sleutels (FILMS, PARS van H1)"""
    m = re.search(r"var\s+" + name + r"\s*=\s*", s)
    if not m and default is not None:
        return default
    assert m, name
    try:
        return json.JSONDecoder().raw_decode(s, m.end())[0]
    except ValueError:
        return jsobj(s[m.end():s.index("];", m.end()) + 1])


def rep(t, old, new, n=1):
    assert t.count(old) == n, (t.count(old), old[:90])
    return t.replace(old, new)


def rex(t, pat, new, groepen=False):
    """groepen=True: \\g<1> in new verwijst naar de gevonden groepen"""
    out, k = re.subn(pat, new if groepen else (lambda m: new), t, count=1, flags=re.S)
    assert k == 1, pat[:90]
    return out


# kleuren en kaartfoto's per paragraaf staan in RIJK in economie.js (één bron voor leer- en oefenomgeving)
js = open(os.path.join(ECO, "economie.js"), encoding="utf-8").read()
m = re.search(r"^var RIJK=(.*?);\n(?=var )", js, re.M | re.S)
R = jsobj(re.sub(r"/\*.*?\*/", "", m.group(1), flags=re.S))[C["pad"]]
assert R["map"] == name, R["map"]

# ---------- data voor de leeromgeving ----------
PARS = grab("PARS")
GOALS, SEL = grab("GOALS", {}), grab("SEL", {})
key = re.search(r'var KEY="([^"]+)"', s).group(1)
pars = []
for p in PARS:
    goals = GOALS.get(p["id"]) or p["g"]
    gi = SEL.get(p["id"]) or list(range(len(goals)))  # zelfde selectie als de app, anders telt de voortgang anders
    imgs = [[os.path.basename(i[0])[:-4], i[1]] for i in p["imgs"]] if p.get("imgs") else C["imgs"][p["id"]]
    pars.append(dict(id=p["id"], t=p["t"], sum=p["sum"], file=p["file"], x=p.get("x", []), q=p["q"], imgs=imgs, g=[goals[i] for i in gi], gi=gi))
films = grab("FILMS", [])
if not films:  # oudere app: de filmpjes staan alleen als kaarten in het tabblad Filmpjes
    for f in re.finditer(r'data-film="([^"]+)".*?<div class="eyebrow">([^<]*)</div><h3>([^<]*)</h3><p[^>]*>([^<]*)</p>.*?data-golab="(\w+)"(?: data-mode="(\w+)")?>([^<]*)</button>', s):
        films.append(dict(par=C["filmpar"][f.group(1)], film=f.group(1), k=f.group(2), t=f.group(3), d=f.group(4), lab=f.group(5), btn=f.group(7), **({"mode": f.group(6)} if f.group(6) else {})))
    assert len(films) == len(C["filmpar"]), len(films)
# dia's als klikbare presentatie: slides/deck.json ({"2.1": aantal dia's}) en slides/steps.json (klikstappen), zie tools/dias/README.md
sl = lambda f: json.load(open(os.path.join(OUT, "slides", f), encoding="utf-8")) if os.path.exists(os.path.join(OUT, "slides", f)) else {}
cards = grab("CARDS")
data = dict(key=key, oefen=name + "/oefen.html", pars=pars, cards=cards, films=films, mat=grab("MAT", {}), deck=sl("deck.json"), steps=sl("steps.json"))
os.makedirs(OUT, exist_ok=True)
json.dump(data, open(os.path.join(OUT, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

# ---------- oefenomgeving ----------
FONT = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,600&family=Inter:wght@400;500;600;700;800&display=swap"
s = re.sub(r"https://fonts\.googleapis\.com/css2\?family=Plus\+Jakarta\+Sans[^\"]*", FONT, s)
s = rex(s, r"<title>[^<]*</title>", "<title>Oefenomgeving · %s · Economie</title>" % "".join(C["kop"]))

# oude paars/roze kleuren -> groen, koraal en beige van de site (ook de vaste kleuren in games, munten en verloop)
KLEUR = {"#3b1534": "#123a30", "#5a1f4f": "#1f5f4e", "#6a2559": "#174a3d", "#2a0f26": "#0c241d", "#a01a58": "#c2484d", "#e2457f": "#ff8d90",
         "#ffd6e8": "#ffc9c8", "#fbe8f0": "#ffe6e4", "#f1e8ec": "#efe6d6", "#fcf6f9": "#fbf6ee", "#fff9fc": "#fffdf9", "#f8f1f5": "#f9f3ea",
         "#f6eef2": "#f6efe4", "#f4ecf0": "#f4ecdf", "#d9c9d1": "#d8cbb5", "#e3c3d3": "#e3d3bb", "#e1cfd8": "#e0d2bc", "#8a7f88": "#8a7f6e",
         "#2f6fb0": "#2f8f86", "#1f4f86": "#1f5f4e", "#251b25": "#201a14", "#6d6270": "#6f6556", "#ece3e7": "#e6dac4", "#f7f3f1": "#f6f0e6",
         "rgba(59,21,52": "rgba(31,95,78"}
for oud, nieuw in KLEUR.items():
    s = re.sub(re.escape(oud) + (r"(?![0-9a-fA-F])" if oud[0] == "#" else ""), nieuw, s, flags=re.I)
# donkere modus (fase 1, 2026-11-10): vaste witte en beige vlakken in de CSS van de app worden variabelen; alleen in de eerste <style>,
# niet in het ingebedde spel (EDU_RACER_HTML)
kop, rest = s.split("</style>", 1)
kop = re.sub(r"background:#fff(?![0-9a-fA-F])", "background:var(--card)", kop)
kop = re.sub(r"background:(#fffdf9|#f9f3ea|#f4ecdf|#f6efe4|#fbf6ee|#efe6d6)(?![0-9a-fA-F])", "background:var(--soft)", kop)
kop = kop.replace("repeating-linear-gradient(45deg,var(--card),var(--card) 10px,#fbf6ee 10px,#fbf6ee 20px)", "repeating-linear-gradient(45deg,var(--card),var(--card) 10px,var(--soft) 10px,var(--soft) 20px)")
s = kop + "</style>" + rest

# kop van de app wordt nav + hero + tabbalk zoals op de site; Lesstof en Filmpjes staan nu in de leeromgeving
LES = INFO.replace("&", "&amp;") + pars[0]["id"]  # leeromgeving, eerste paragraaf
TABS = {"start": ("Overzicht", "Je voortgang en de %d paragrafen" % len(pars)), "lab": ("Oefenlab", "Begrippen, rekenen, quiz en games"),
        "toets": ("Oefentoetsen", "Met klok, direct nagekeken")}
tab = lambda t: re.search(r'<button role="tab" data-tab="%s".*?</button>' % t, s, re.S).group(0)
tabs = "".join(re.sub(r"<span>[^<]*</span>", "<span><b>%s</b><small>%s</small></span>" % TABS[t], tab(t)) for t in TABS)
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
# de uitleg onder de tabbladen staat alleen op het overzicht; in het oefenlab en bij de toetsen is de balk compact en blijft hij staan
s = rep(s, "<body>", '<body class="ostart">')
# voortgang uit de leeromgeving (alleen qs/known, nog geen goals) werd niet ingelezen en daarna overschreven: elk object telt
s = rep(s, "if(s&&s.goals)S=Object.assign(S,s);", 'if(s&&typeof s==="object")S=Object.assign(S,s);')

# startpagina: teksten voor een oefenomgeving
# "jouw volgende stap": de kop, tekst en knop vult renderNext() op basis van de voortgang (begrippen, quizfouten, checklist)
s = rex(s, r'(<div class="card intro">\s*<div class="eyebrow">)[^<]*</div>\s*<h2>[^<]*<br>[^<]*</h2>',
        r'\g<1>Jouw volgende stap</div><h2 id="onextH">Ga aan de slag.</h2>', groepen=True)
s = rex(s, r'(<div class="card intro">.*?<p)>[^<]*(</p>)',
        r'\g<1> id="onextP">Kies hieronder wat je gaat doen.\g<2>', groepen=True)
s = rex(s, r'<button class="btn" data-go="les"(?: data-par="[\d.]+")?>(<svg.*?</svg>)Begin met [\d.]+</button>',
        r'<span id="onext"></span><button class="btn ghost" data-go="lab">Alle oefeningen</button><button class="btn ghost" data-go="les" data-par="%s">\g<1>Lees %s</button>' % (pars[0]["id"], pars[0]["id"]), groepen=True)
s = rep(s, '<button class="btn ghost" data-go="toets">Naar de oefentoets</button>', "")
s = rep(s, "function renderProgress(){", '''function renderNext(){var el=document.getElementById("onext");if(!el)return;
var nk=Object.keys(S.known||{}).length,nq=Object.keys(S.qwrong||{}).filter(function(i){return BANK[i];}).length,x=totals(),chk=typeof CHK==="undefined"?[]:CHK.map(function(c,i){return [c,i];}).filter(function(a){return !(S.check||{})[a[1]];}),h,p,b,p0=PARS[0].id;
if(!x[0]&&!nk){h="Begin met de begrippen van "+p0+".";p="Lees eerst de lesstof in de leeromgeving. Oefen daarna hier de woorden van "+p0+".";b='<button class="btn" data-golab="begrippen" data-cpar="'+p0+'">Begrippen '+p0+' →</button>';}
else if(nk<CARDS.length*0.6){h="Oefen de begrippen.";p="Je kent "+nk+" van de "+CARDS.length+" begrippen. Draai de kaarten om en vink af wat je weet.";b='<button class="btn" data-golab="begrippen" data-cpar="oefenen">Naar de begrippen →</button>';}
else if(nq){h="Oefen je fouten.";p="Je had "+nq+" quizvra"+(nq>1?"gen":"ag")+" fout. Probeer "+(nq>1?"ze":"hem")+" nog een keer.";b='<button class="btn" data-golab="quiz" data-qmode="fouten">Oefen mijn fouten ('+nq+') →</button>';}
else if(chk.length){var c=chk[0][0];h="Oefen: "+c[0].charAt(0).toLowerCase()+c[0].slice(1)+".";p="Nog "+chk.length+" van de "+CHK.length+" onderdelen van de checklist.";b='<button class="btn"'+(c[2]==="reken"?' data-golab="reken" data-mode="'+c[3]+'"':' data-golab="quiz" data-qpar="'+c[1]+'"')+'>Oefen '+c[1]+' →</button>';}
else{h="Maak een oefentoets.";p="Je hebt alles geoefend. Test jezelf met de klok.";b='<button class="btn" data-go="toets">Naar de oefentoetsen →</button>';}
document.getElementById("onextH").textContent=h;document.getElementById("onextP").textContent=p;el.innerHTML=b;
var lv=function(k,t){var e=document.querySelector('[data-olive="'+k+'"]');if(e)e.textContent=t;},ns=Object.keys(S.qseen||{}).length;
lv("begrippen",nk?nk+" van "+CARDS.length+" gekend":"");lv("quiz",nq?nq+" fout"+(nq>1?"en":"")+" om te oefenen":ns?ns+" vragen gezien":"");}
function renderProgress(){renderNext();''')
s = rep(s, 'var l=e.target.closest("[data-golab]");if(l){show("lab");showLab(l.dataset.golab);',
        'var l=e.target.closest("[data-golab]");if(l){show("lab");showLab(l.dataset.golab);if(l.dataset.cpar){cardFilter=l.dataset.cpar;renderFlash();}if(l.dataset.qmode){startQuiz(l.dataset.qmode);}')
s = rex(s, r'(<button class="step" data-go="les">.*?<span>)[^<]*', r"\g<1>De lesstof per paragraaf, in de leeromgeving", groepen=True)

# voortgang telt de kernvragen die in de leeromgeving zijn afgevinkt (S.qs), niet meer de leerdoelen
s = rex(s, r"function goalCount\(id\)\{.*?return d;\}", 'function goalCount(id){var p=P(id),d=0;p.q.forEach(function(_,i){if(S.qs[id+"-"+i])d++;});return d;}')
s = rep(s, "t+=p.g.length;d+=goalCount(p.id);", "t+=p.q.length;d+=goalCount(p.id);")
s = rep(s, 'textContent=x[0]+" van "+x[1]+" leerdoelen";', 'textContent=x[0]+" van "+x[1]+" vragen";')
s = rex(s, r"var d=goalCount\(p\.id\),n=p\.g\.length(?:\|\|1)?;", "var d=goalCount(p.id),n=p.q.length||1;")
s = rep(s, "<span>'+d+' van '+n+' leerdoelen</span>", "<span>'+d+' van '+n+' vragen</span>")
s = s.replace('textContent=t[0]+" van "+t[1]+" leerdoelen";', 'textContent=t[0]+" van "+t[1]+" vragen";')  # alleen in apps met een hoofdstukkop

# paragraafkaarten op het overzicht: dezelfde foto en kleur als de kaarten op de hoofdstukpagina
OK = {p["id"]: [R["kleur"][p["id"]][0], "../img/%s/%s.jpg" % (name, R.get("kaart", {}).get(p["id"]) or p["imgs"][0][0]), R["kleur"][p["id"]][1]] for p in pars}
s = rep(s, "function renderCards(){", "var OK=%s;\nfunction renderCards(){" % json.dumps(OK, ensure_ascii=False))
s = rep(s, """<div class="band" style="background:linear-gradient(135deg,'+p.c+',color-mix(in srgb,'+p.c+' 70%,#000))"><b>'+p.id+'</b></div>""",
        """<div class="band" style="--c:'+OK[p.id][0]+'"><img src="'+OK[p.id][1]+'" alt="" loading="lazy"><b>'+p.id+'</b></div>""")
s = rep(s, """<i style="width:'+(d/n*100)+'%;background:'+p.c+'"></i>""", """<i style="width:'+(d/n*100)+'%;background:'+OK[p.id][2]+'"></i>""")

# oefenlab opent neutraal: eerst een keuzemenu met de zes onderdelen, pas na een klik de flashcards, quiz enz.
LAB = [("begrippen", "Flashcards", "Begrippen", "Lees het begrip, bedenk wat het betekent en draai de kaart om. %d begrippen." % len(cards)),
       ("leguit", "Met AI-feedback", "Leg uit", "Leg een begrip uit in je eigen woorden. Je hoort wat goed is en wat er nog mist."),
       ("formule", "Rekenen", "Welke formule?", "Lees de rekenvraag en kies de formule die je nodig hebt."),
       ("reken", "Rekenen", "Rekentrainer", "Oefen de sommen van dit hoofdstuk, steeds met nieuwe getallen."),
       ("quiz", "Vraagbank", "Quiz", "Meerkeuzevragen per paragraaf. Je ziet meteen of je antwoord goed is."),
       ("games", "Spelen", "Games", "Speel met de begrippen en vragen van dit hoofdstuk.")]
KL = ["var(--berry)", "var(--p6)", "var(--p4)", "var(--p3)"]
s = rep(s, '<button data-lab="begrippen" aria-selected="true">', '<button data-lab="home" aria-selected="false">← Alle oefeningen</button><button data-lab="begrippen" aria-selected="false">')
s = rep(s, '<div class="lab" id="lab-begrippen">',
        '<div class="lab" id="lab-home"><p class="olabtx">Kies hieronder wat je wilt oefenen. Begin met de begrippen en ga daarna rekenen of een quiz maken. Met <b>← Alle oefeningen</b> kom je altijd terug op deze pagina.</p><div class="olab">%s</div></div>\n<div class="lab" id="lab-begrippen" hidden>'
        % "".join('<button class="otile" data-golab="%s" style="--c:%s"><span class="ok">%s</span><h3>%s</h3><p>%s</p><span class="olive" data-olive="%s"></span><span class="ogo">Start →</span></button>' % (k, KL[i % 4], e, t, d, k) for i, (k, e, t, d) in enumerate(LAB)))
s = rep(s, "function showLab(name){", 'function showLab(name){\ndocument.getElementById("labNav").hidden=name==="home";')

# naar "les" = naar de leeromgeving; deep links #lab, #lab/reken/<mode>, #lab/quiz/<par>, #lab/begrippen/<par>, #toets
s = rep(s, 'var g=e.target.closest("[data-go]");if(g){if(g.dataset.par)cur=g.dataset.par;show(g.dataset.go);}',
        'var g=e.target.closest("[data-go]");if(g){if(g.dataset.par)cur=g.dataset.par;if(g.dataset.go==="les"){location.href=%s+encodeURIComponent(cur);return;}show(g.dataset.go);}' % json.dumps(INFO))
s = rep(s, "main.scrollTop=0;", "toMain(false);")
# naar het begin van de inhoud, net onder de vaste nav en de tabbalk (alleen omhoog, tenzij altijd=true)
s = rep(s, "function show(name){", 'function toMain(altijd){var y=main.getBoundingClientRect().top+scrollY-document.querySelector(".otabs").offsetHeight-62;if(altijd||scrollY>y)scrollTo(0,y);}\n'
        'function show(name){\ndocument.body.classList.toggle("ostart",name==="start");if(name==="lab")showLab("home");')
s = rex(s, r"(renderFlash\(\);renderProgress\(\);(?:renderCheck\(\);)?)\n\}\)\(\);", r"""\g<1>
function route(){var h=location.hash.slice(1).split("/");
if(h[0]==="toets")show("toets");
else if(h[0]==="lab"){show("lab");
  if(h[1]==="reken"){showLab("reken");if(h[2]){mode=h[2];newR();}}
  else if(h[1]==="quiz"){showLab("quiz");if(h[2]==="fouten")startQuiz("fouten");else if(h[2]){quizPar=h[2];quizHome();}}
  else if(h[1]==="begrippen"){showLab("begrippen");if(h[2]){cardFilter=h[2];renderFlash();}}
  else if(h[1])showLab(h[1]);}
else return;
toMain(true);}
route();addEventListener("hashchange",route);
})();""", groepen=True)

# oefentoetsen zoals bij Geschiedenis: de digitale toetsen (toets.html, gebouwd door bouw-toets.py uit bron/toetsen.json) als kaarten,
# op papier de Word-versies en de oude PDF-toets met nakijkblad. Het oude tabblad (PDF, klok, nakijkblad) blijft verborgen staan: de app-code verwijst ernaar.
TJ = json.load(open(os.path.join(OUT, "bron", "toetsen.json"), encoding="utf-8"))
ov, docx = C["toetsen"]
blk = lambda t, k: TJ["blokken"][t[k]] if t.get(k) else []
kaart = lambda k, t: ('<a class="ovcard" href="toets.html?t=%s">%s<h3>%s</h3><p>%d punten · %d vragen · %d minuten</p><span class="btn">Maak de toets →</span></a>'
                      % (k, '<span class="ster">%s</span>' % ("★" * t["n"]) if isinstance(docx, str) else "", t["t"][0].upper() + t["t"][1:],
                         len(blk(t, "mc")) + sum(o["p"] for o in blk(t, "open") + blk(t, "rek")), len(blk(t, "mc") + blk(t, "open") + blk(t, "rek")), t["min"]))
if isinstance(docx, str):
    papier = " · ".join('<a href="../oefentoetsen/oefentoets-%s-%d-ster.docx" download="Oefentoets %s %d-ster.docx">%d-ster (Word)</a>' % (docx, n, docx.upper(), n, n) for n in (1, 2, 3))
    papier += "".join(' · <a target="_blank" rel="noopener" href="https://drive.google.com/file/d/%s/view">%s (PDF)</a> met <a target="_blank" rel="noopener" href="https://drive.google.com/file/d/%s/view">nakijkblad</a>' % (v["toets"], v["t"], v["nk"]) for v in grab("VERS") if v.get("nk"))
else:  # lijst van (bestand in oefentoetsen/, tekst)
    papier = " · ".join('<a href="../oefentoetsen/%s" download>%s</a>' % d for d in docx)
s = rep(s, '<section class="panel" id="toets" hidden>',
        '<section class="panel" id="toets" hidden>\n<div class="card pad otoets"><div class="eyebrow">Oefentoetsen</div><h2>Maak de toets hier, met klok en automatisch nakijken</h2>'
        '<p class="muted">Maak de toets zonder boek en zonder hulp, je rekenmachine mag. Bedragen, procenten en keuzes worden direct nagekeken met het nakijkblad van je docent; bij de uitlegvragen kijkt de AI mee. %s Werkt ook op de iPad. De toetsen gaan over %s.</p>'
        '<div class="ovgrid">%s</div><p class="muted opapier">Liever op papier? %s</p></div>\n<div hidden>'
        % ("Kies je niveau: 1, 2 of 3 sterren." if isinstance(docx, str) else "Er zijn %d versies, met andere vragen." % len(TJ["toetsen"]), ov, "".join(kaart(k, x) for k, x in TJ["toetsen"].items()), papier))
s = rex(s, r"</section>(\s*<!-- FILMPJES -->)", r"</div></section>\g<1>", groepen=True)
s = rep(s, 'if(name==="toets")loadToets();', "")

# huisstijl van de site: zelfde kleuren en letters als economie.css en boekje 1; de pagina scrolt als geheel
s = rep(s, "</style>", """
/* ---------- huisstijl van de site (bouw-oefen.py) ---------- */
:root{--plum:#1f5f4e;--plum-2:#123a30;--berry:#c2484d;--berry-soft:#ffe6e4;--bg:#f6f0e6;--card:#fffdf9;--ink:#201a14;--muted:#6f6556;--line:#e6dac4;
  --p1:#c2484d;--p2:#2f8f86;--p3:#1f5f4e;--p4:#b97a1f;--p5:#c2484d;--p6:#2f8f86;--coral:#ff8d90;--teal:#2f8f86;--ochre:#b97a1f;--green:#1f5f4e;--green-fg:#f3efe0;--green-mu:#b9d6cb;
  --soft:#f4ecdf;--shadow:0 1px 2px rgba(31,95,78,.06),0 10px 28px rgba(31,95,78,.08);--r:20px;--ease-out:cubic-bezier(.23,1,.32,1);color-scheme:light}
/* donkere modus: dezelfde kleuren als economie.css */
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#15120d;--card:#1f1a13;--soft:#2a2319;--ink:#f3ecdd;--muted:#b2a68d;--line:#352c20;--berry:#ff9a9d;--berry-soft:#3b2322;--plum:#8fd3bd;--green:#8fd3bd;--ok-soft:#183a2b;--bad-soft:#44201c;--warn-soft:#3d2f10;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 28px rgba(0,0,0,.35);color-scheme:dark}}
:root[data-theme="dark"]{--bg:#15120d;--card:#1f1a13;--soft:#2a2319;--ink:#f3ecdd;--muted:#b2a68d;--line:#352c20;--berry:#ff9a9d;--berry-soft:#3b2322;--plum:#8fd3bd;--green:#8fd3bd;--ok-soft:#183a2b;--bad-soft:#44201c;--warn-soft:#3d2f10;--shadow:0 1px 2px rgba(0,0,0,.3),0 10px 28px rgba(0,0,0,.35);color-scheme:dark}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .fb.ok,:root:not([data-theme="light"]) .lubox.goed{color:#bfe9d3}:root:not([data-theme="light"]) .fb.no,:root:not([data-theme="light"]) .lubox.nognietgoed{color:#ffb3a7}:root:not([data-theme="light"]) .fb.mid,:root:not([data-theme="light"]) .lubox.bijna{color:#f6d78a}
  :root:not([data-theme="light"]) .olinks a.cta,:root:not([data-theme="light"]) .btn:not(.ghost):not(.soft){color:#3a1412}}
/* zachte overgang als een tabblad of oefening verschijnt */
.panel:not([hidden]),.lab:not([hidden]),#qCard>*,#rCard>*,#fCard>*,#luCard>*{animation:ofade .4s var(--ease-out)}
@keyframes ofade{from{opacity:0;transform:translateY(8px)}}
.olive{display:inline-block;font-size:12.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:var(--berry-soft);color:var(--berry);margin-bottom:8px}.olive:empty{display:none}
#onext:empty+.btn{margin-left:0}
html,body{height:auto;font-family:Inter,system-ui,-apple-system,sans-serif}
h1,h2,h3,.chh,.vbtn b{font-family:Fraunces,Georgia,serif;letter-spacing:-.015em;color:var(--ink)}
h2{font-size:clamp(24px,2.8vw,32px);font-weight:700;line-height:1.08}
/* panelen zonder witte kaders, net als de leeromgeving: grote zwarte koppen op de beige achtergrond */
#lab>.card,#toets>.card,.hero .intro,.checkcard{background:transparent;border:0;box-shadow:none;padding-left:0;padding-right:0}
#lab>.card>.row h2,#toets>.card h2,.hero .intro h2,.checkcard h2{font-size:clamp(30px,4.4vw,50px);font-weight:700;line-height:1.02;margin-top:8px}
.blob,.coins{display:none}
.sub button,.filters button{background:var(--card);color:var(--ink);padding:8px 15px;font-size:14px}
.sub button[aria-selected=true],.filters button.on{background:var(--berry);border-color:var(--berry);color:#fff}
.sub button[data-lab=home]{border-color:var(--ink);font-weight:800}
.sub{margin-bottom:22px}#labNav[hidden]{display:none}
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
@media (max-width:860px){.otop-in{grid-template-columns:1fr;gap:18px;margin-top:14px}.otop{padding-bottom:22px}.onum{font-size:clamp(56px,14vw,80px)}.otop p{font-size:16px;margin-bottom:14px}
  .ogal{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin:0 -16px;padding:0 16px 4px}.ogal::-webkit-scrollbar{display:none}
  .ogal img,.ogal img:first-child{flex:0 0 min(60%,240px);width:auto;min-width:0;aspect-ratio:4/3;scroll-snap-align:start;grid-column:auto}}
/* tabbladen: grote knoppen; op het overzicht met uitleg en even breed, elders compact en vast onder de nav */
.otabs{position:sticky;top:calc(62px + env(safe-area-inset-top,0px));z-index:20;background:color-mix(in srgb,var(--bg) 92%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);padding:12px 0}
.ostart .otabs{position:static;padding:22px 0}
.otabs nav.tabs{background:none;border:0;padding:0;gap:12px;flex-wrap:nowrap}
.otabs nav.tabs button{flex:none;justify-content:flex-start;gap:12px;color:var(--ink);border-radius:18px;border:1.5px solid var(--line);background:var(--card);padding:10px 22px 10px 10px;font-size:18px;font-weight:800;text-align:left;transition:border-color .16s,background .16s,transform .16s var(--ease-out)}
.ostart .otabs nav.tabs button{flex:1 1 0;min-width:0;padding:14px 18px 14px 14px;box-shadow:var(--shadow)}
.otabs nav.tabs button:hover{border-color:var(--berry);background:var(--card);color:var(--ink)}
.otabs nav.tabs button:active{transform:scale(.98)}
.otabs nav.tabs button[aria-selected=true]{background:var(--berry);border-color:var(--berry);color:#fff;box-shadow:none}
.otabs nav.tabs button .i{width:42px;height:42px;padding:10px;border-radius:13px;background:var(--berry-soft);color:var(--berry)}
.otabs nav.tabs button[aria-selected=true] .i{background:rgba(255,255,255,.2);color:#fff}
nav.tabs button span{display:flex!important;flex-direction:column;line-height:1.15;min-width:0}
.otabs small{display:none;font:500 14px/1.3 Inter,system-ui,sans-serif;color:var(--muted);margin-top:4px;white-space:normal}
.ostart .otabs small{display:block}
.otabs button[aria-selected=true] small{color:rgba(255,255,255,.88)}
/* keuzemenu van het oefenlab */
.olabtx{max-width:640px;color:var(--muted);font-size:17px;margin:-4px 0 22px}
.olab{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px}
.otile{display:flex;flex-direction:column;align-items:flex-start;gap:6px;text-align:left;padding:22px 22px 20px;border:1.5px solid var(--line);border-top:6px solid var(--c);border-radius:22px;background:var(--card);color:var(--ink);box-shadow:var(--shadow);font:inherit;cursor:pointer;transition:border-color .16s,transform .16s var(--ease-out)}
.otile:hover{border-color:var(--c);transform:translateY(-2px)}.otile:active{transform:scale(.98)}
.otile .ok{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--c)}
.otile h3{font-size:26px;font-weight:700;margin:0}.otile p{margin:0 0 10px;color:var(--muted);font-size:15px;flex:1}
.otile .ogo{font-weight:800;color:var(--c)}
/* paragraafkaarten: foto met donkere laag en gekleurd nummer, zoals op de hoofdstukpagina */
.pcard .band{height:130px;background:var(--plum-2);overflow:hidden;isolation:isolate}
.pcard .band img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .6s var(--ease-out)}
.pcard:hover .band img{transform:scale(1.06)}
.pcard .band:after{inset:0;width:auto;height:auto;border-radius:0;z-index:-1;background:linear-gradient(0deg,rgba(12,30,25,.88),rgba(12,30,25,.12) 75%)}
.pcard .band b{font:900 44px/1 Fraunces,Georgia,serif;color:var(--c)}
.pcard{background:var(--card)}.pcard .body h3{font-size:21px}
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
@media (max-width:760px){.ostart .otabs small{display:none}.ostart .otabs nav.tabs button{padding:10px 12px 10px 10px}}
@media (max-width:560px){.ofull,.olinks a:not(.cta):first-child{display:none}.oshort{display:inline}.olinks a{padding:8px 8px;font-size:13px}
  .otabs nav.tabs{gap:6px}.otabs nav.tabs button,.ostart .otabs nav.tabs button{flex:1 1 0;justify-content:center;padding:8px 6px;font-size:14.5px;gap:6px;border-radius:14px}
  .otabs nav.tabs button .i{width:30px;height:30px;padding:6px;border-radius:9px}}
@media (max-width:400px){.otabs nav.tabs button .i{display:none}}
</style>""")

for gone in ["Plus+Jakarta", 'data-tab="les"', 'data-tab="films"', 'class="top"']:
    assert gone not in s, gone
open(os.path.join(OUT, "oefen.html"), "w", encoding="utf-8").write(s)
print("economie/%s/oefen.html" % name, len(s), "tekens; data.json:", len(pars), "paragrafen,", len(cards), "begrippen,", len(films), "filmpjes")
