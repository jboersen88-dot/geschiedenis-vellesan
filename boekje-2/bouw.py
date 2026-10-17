# Bouwt boekje-2/app.html uit de leeromgeving van boekje 1 (../app.html) met de inhoud uit data-bron.py.
# Gebruik: python3 -I boekje-2/bouw.py   (vanuit de root van de repo)
import json, re, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(ROOT, "app.html"), encoding="utf-8").read()
ns = {}
exec(open(os.path.join(ROOT, "boekje-2", "data-bron.py"), encoding="utf-8").read(), ns)

def set_var(s, name, value):
    m = re.search(r"var\s+" + name + r"\s*=\s*", s)
    assert m, name
    v, end = json.JSONDecoder().raw_decode(s, m.end())
    return s[:m.end()] + json.dumps(value, ensure_ascii=False) + s[end:]

s = src
for name in ["PARS", "GOALS", "CHK", "CARDS", "BANK", "TL", "CG", "SORT", "MAT"]:
    s = set_var(s, name, ns[name])
s = set_var(s, "NORIG", {k: len(v) for k, v in ns["GOALS"].items()})
s = set_var(s, "VERS", [])
s = set_var(s, "FILMS", [])
s = set_var(s, "DECK", {})
s = re.sub(r"/\*SEL\*/var SEL=.*?;/\*ENDSEL\*/", "/*SEL*/var SEL={};/*ENDSEL*/", s, flags=re.S)
s = s.replace('var KEY="gs3-ind-app-v1"', 'var KEY="gs3-szv-app-v1"')

# lokale beelden en pagina's naast Drive-ID's
s = s.replace('var THUMB=function(id,w){', 'var THUMB=function(id,w){if(/[\\/.]/.test(id))return id;', 1)
s = s.replace('var VIEW=function(id){', 'var VIEW=function(id){if(/[\\/.]/.test(id))return id;', 1)
s = s.replace('var LNK=function(x){', 'var LNK=function(x){if(/\\.html/.test(x))return x;', 1)
assert s.count("/[\\/.]/.test(id)") == 2 and "/\\.html/.test(x)" in s

assert '["f1","f2","rb","st","db"].map(' in s
s = s.replace('["f1","f2","rb","st","db"].map(', 'Object.keys(MAT).map(')

old_lt = "function loadToets(){\n  var v=V();renderVPick();"
assert old_lt in s
s = s.replace(old_lt, "function loadToets(){\n  if(!VERS.length){var tg=document.querySelector('#toets .tgrid');if(tg)tg.hidden=true;return;}\n  var v=V();renderVPick();")
s = s.replace("</style>", "#toets .tgrid[hidden]{display:none}\n</style>", 1)

# geen PowerPoint (die maakt de docent zelf)
assert "Nog geen presentatie voor '+h+'." in s
s = s.replace("Nog geen presentatie voor '+h+'.", "📽️ De PowerPoint van dit hoofdstuk volgt.")
s = s.replace("</style>", "#lOpen[hidden]{display:none}#lViewer .ph{position:static;display:block;padding:34px 18px;text-align:center;border-radius:16px;background:color-mix(in srgb,var(--plum) 8%,var(--card));color:var(--muted);opacity:1;border:1.5px dashed var(--line)}\n</style>", 1)
s = s.replace('document.getElementById("lOpen").href=VIEW(p.file);',
              'document.getElementById("lOpen").href=VIEW(p.file);document.getElementById("lOpen").hidden=!p.file;')

# teksten
s = s.replace("<title>Leeromgeving · De industriële samenleving</title>", "<title>Leeromgeving · Sociale zekerheid en verzorgingsstaat</title>")
s = s.replace("Geschiedenis · jaar 3 · mavo · boekje 1", "Geschiedenis · jaar 3 · mavo · boekje 2")
s = s.replace("Van spinnewiel tot supermarkt.", "Van liefdadigheid tot verzorgingsstaat.")
s = s.replace("Engeland · Nederland · sociale kwestie · welvaart", "Armenzorg · crisis · verzorgingsstaat · toekomst")
s = s.replace("Boekje 1 · SE 1", "Boekje 2")
s = re.sub(r"Alles voor het boekje De industriële samenleving op één plek:[^<]*",
           "Alles voor het boekje Sociale zekerheid en verzorgingsstaat op één plek: leerdoelen om af te vinken, begrippen, een tijdlijn, oorzaak en gevolg, een vraagbank, games, de Kijkwijzer spotprenten, onderzoeksopdrachten en de examentraining. De PowerPoints volgen.", s)
s = s.replace("De industriële samenleving", "Sociale zekerheid en verzorgingsstaat")
s = re.sub(r"background-image:url\(https://drive\.google\.com/thumbnail\?id=[^)]*\)", "background-image:url(../img/flow/arbeidsbeurs.jpg)", s, count=1)
s = s.replace('href="boekje-1.html"', 'href="index.html"')

# oefentoetsen van boekje 1 vervangen door de examentraining van boekje 2
s = re.sub(r'<div class="row"><a class="btn" href="toets\.html\?t=t1">H1 \+ H2</a><a class="btn" href="toets\.html\?t=t2">H3 \+ H4</a><a class="btn" href="toets\.html\?t=t3">H1 t/m H4</a></div>',
           '<div class="row"><a class="btn" href="examentraining.html">Start de examentraining</a><a class="btn ghost" href="onderzoek.html">Kijkwijzer en onderzoek</a></div>', s)
s = s.replace("Maak de toets hier, met klok en automatisch nakijken", "Examentraining: 11 vragen met bronnen")
s = s.replace("Meerkeuze kijkt zichzelf na, bij de open vragen kijk je zelf na met het nakijkblad en je cijfer rekent zichzelf uit. Werkt ook op de iPad.",
              "Oefen met examenvragen over alle vier de hoofdstukken. Je antwoorden worden bewaard en je kunt ze vergelijken met de nakijkpunten.")

# games die alleen boekje 1-vragen hebben weglaten; kaart en beeldquiz passen bij H2
s = re.sub(r'<a class="gtile" href="nakijken\.html".*?</a>', "", s, flags=re.S)
s = re.sub(r'<a class="gtile" href="racer\.html".*?</a>', "", s, flags=re.S)
s = re.sub(r'<a class="gtile" href="doeboek\.html".*?</a>', "", s, flags=re.S)
assert "doeboek.html" not in s
s = s.replace('href="kaart.html"', 'href="../kaart.html"').replace('href="beeldquiz.html"', 'href="../beeldquiz.html"')
for gone in ["racer.html", "nakijken.html", "toets.html?t="]:
    assert gone not in s, gone

open(os.path.join(ROOT, "boekje-2", "app.html"), "w", encoding="utf-8").write(s)
print("boekje-2/app.html", len(s), "tekens")
