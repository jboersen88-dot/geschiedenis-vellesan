# Maakt een lesapp voor een hoofdstuk dat er nog geen had, in dezelfde vorm als de oude lesapp van jaar 2 H2
# (apps/jaar-2_mavo_hoofdstuk-2.html), zodat bouw-oefen.py er de oefenomgeving van kan bouwen.
# De app-code blijft die van jaar 2 H2; alleen de inhoud wordt vervangen door <map>/bron/lesapp.json (lesstof, begrippen,
# quiz, swipe-game) en <map>/bron/reken.js (formules en rekenvraag-generatoren). De Edu-Racer gaat eruit: die heeft eigen vragen.
# Gebruik: python3 -I economie/maak-lesapp.py j3vh2   (vanuit de root van de repo); daarna bouw-oefen.py j3vh2
import json, os, re, sys

ECO = os.path.dirname(os.path.abspath(__file__))
# nr = het hoofdstuknummer dat de leerling ziet (de app van jaar 2 H2 rekent intern met hoofdstuk 2)
CONFIG = {
    "j3vh2": dict(uit="apps/jaar-3_havo-vwo_hoofdstuk-2.html", jaar=3, titel="De rol van geld"),
    # jaar 4 mavo (18 nov 2026). H1 t/m H3: bron/lesapp.json en reken.js komen uit de lesapps van de docent
    # (apps/jaar-4_hoofdstuk-*.html, die blijven staan als bron). H4 t/m H8 en 3 mavo H7 zijn nieuw geschreven.
    "j4h1": dict(uit="apps/j4h1.html", jaar=4, nr=1, titel="Verdien je genoeg?"),
    "j4h2": dict(uit="apps/j4h2.html", jaar=4, nr=2, titel="Geld moet rollen"),
    "j4h3": dict(uit="apps/j4h3.html", jaar=4, nr=3, titel="We gaan voor winst"),
    "j4h4": dict(uit="apps/j4h4.html", jaar=4, nr=4, titel="Aan het werk"),
    "j4h5": dict(uit="apps/j4h5.html", jaar=4, nr=5, titel="Kan de overheid dat regelen?"),
    "j4h6": dict(uit="apps/j4h6.html", jaar=4, nr=6, titel="De overheid en ons inkomen"),
    "j4h7": dict(uit="apps/j4h7.html", jaar=4, nr=7, titel="Nederland handelsland"),
    "j4h8": dict(uit="apps/j4h8.html", jaar=4, nr=8, titel="Welvaart wereldwijd"),
    "j3h7": dict(uit="apps/j3h7.html", jaar=3, nr=7, titel="De overheid voor ons allemaal"),
    # jaar 3 mavo (18 nov 2026): nieuw geschreven uit de PowerPoints van de docent, afbakening volgens het boek (editie 7.1)
    "j3h1": dict(uit="apps/j3h1.html", jaar=3, nr=1, titel="Hoe welvarend ben jij?"),
    "j3h2": dict(uit="apps/j3h2.html", jaar=3, nr=2, titel="Wat voor consument ben jij?"),
    "j3h3": dict(uit="apps/j3h3.html", jaar=3, nr=3, titel="De bank en jouw geld"),
    "j3h4": dict(uit="apps/j3h4.html", jaar=3, nr=4, titel="Kies je voor zekerheid?"),
    "j3h5": dict(uit="apps/j3h5.html", jaar=3, nr=5, titel="Is er werk voor jou?"),
    "j3h6": dict(uit="apps/j3h6.html", jaar=3, nr=6, titel="Productie en markt"),
    "j3h8": dict(uit="apps/j3h8.html", jaar=3, nr=8, titel="Over de grens"),
    # jaar 2 mavo H5 en H6 (18 nov 2026): geschreven uit de PowerPoints, de leerdoelen en de boektekst (eigen woorden)
    "j2h5": dict(uit="apps/j2h5.html", jaar=2, nr=5, titel="Is handel iets voor jou?"),
    "j2h6": dict(uit="apps/j2h6.html", jaar=2, nr=6, titel="Wat doet de overheid?"),
}

name = sys.argv[1] if len(sys.argv) == 2 else ""
if name not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/maak-lesapp.py <" + "|".join(CONFIG) + ">")
C = CONFIG[name]
s = open(os.path.join(ECO, "apps/jaar-2_mavo_hoofdstuk-2.html"), encoding="utf-8").read()
D = json.load(open(os.path.join(ECO, name, "bron/lesapp.json"), encoding="utf-8"))
reken = open(os.path.join(ECO, name, "bron/reken.js"), encoding="utf-8").read().strip()
J = lambda v: json.dumps(v, ensure_ascii=False)


def sub(pat, new, n=1):
    global s
    s, k = re.subn(pat, lambda m: new, s, flags=re.S | re.M)
    assert k == n, (k, pat[:80])


NR = C.get("nr", 2)
for p in D["PARS"]:  # bouw-oefen.py leest de beeldnamen terug uit deze paden
    p["imgs"] = [["../img/%s/%s.jpg" % (name, b), t] for b, t in p["imgs"]]
    p["ch"] = 2  # de app heeft één raster (pgrid2) voor het hoofdstuk
for v in ["MAT", "PARS", "GOALS", "CHK", "VERS", "CARDS", "BANK", "SORT"]:
    sub(r"^var %s=.*?;$" % v, "var %s=%s;" % (v, J(D[v])))
sub(r"^var NORIG=.*?;$", "var NORIG=%s;" % J({p: len(g) for p, g in D["GOALS"].items()}))
sub(r"/\*SEL\*/var SEL=.*?;/\*ENDSEL\*/", "/*SEL*/var SEL={};/*ENDSEL*/")
sub(r"^var FILMS=\[.*?\];$", "var FILMS=%s;" % J(D["FILMS"]))
sub(r"^var FORM=\{.*?(?=^var fs=\{good)", reken + "\n")  # formules, modi en generatoren (ook TAB en de extra begroting van H2)
sub(r"^var FMODES=\[.*?\]", "var FMODES=%s" % J([k for k, _ in re.findall(r'\["(\w+)","([^"]+)"\]', reken.split("var MODES=", 1)[1].split(";", 1)[0])]))
sub(r'^var mode="maand"', 'var mode=%s' % J(re.search(r'var MODES=\[\["(\w+)"', reken).group(1)))
sub(r'var KEY="[^"]+"', 'var KEY=%s' % J(D["KEY"]))
s = s.replace('"h2v2-"', J(D["KEY"] + "-"))  # highscores van de games
sub(r'\["ov","hv","rk","ot","sp"\]\.map', "Object.keys(MAT).map")
sub(r"^<script>/\* Edu-Racer[^\n]*\nwindow\.EDU_RACER_HTML=.*?</script>$\n", "")
sub(r"^\s*'<button class=\"gtile\" data-game=\"racer\">.*?$\n", "")
s = s.replace(".citem .ctxt{flex:1;min-width:0}", ".citem .ctxt{flex:1;min-width:0;overflow-wrap:anywhere}")  # lange woorden breken op een telefoon
sub(r"LU_JAAR=2", "LU_JAAR=%d" % C["jaar"])
sub(r"Jij en je geld<small", C["titel"] + "<small")
if NR != 2:
    sub(r'(?<=var\(--p5\)">)H2(?=</span>)', "H%d" % NR)
    sub(r"Jouw route door hoofdstuk 2", "Jouw route door hoofdstuk %d" % NR)
    sub(r"Dit moet je kunnen na hoofdstuk 2", "Dit moet je kunnen na hoofdstuk %d" % NR)
sub(r'var cur="2\.1"',"var cur=%s" % J(D["PARS"][0]["id"]))
out = os.path.join(ECO, C["uit"])
open(out, "w", encoding="utf-8").write(s)
print(C["uit"], "%d paragrafen, %d begrippen, %d quizvragen, %d rekenmodi" % (len(D["PARS"]), len(D["CARDS"]), len(D["BANK"]), reken.count(":function(")))
