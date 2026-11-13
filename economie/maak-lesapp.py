# Maakt een lesapp voor een hoofdstuk dat er nog geen had, in dezelfde vorm als de oude lesapp van jaar 2 H2
# (apps/jaar-2_mavo_hoofdstuk-2.html), zodat bouw-oefen.py er de oefenomgeving van kan bouwen.
# De app-code blijft die van jaar 2 H2; alleen de inhoud wordt vervangen door <map>/bron/lesapp.json (lesstof, begrippen,
# quiz, swipe-game) en <map>/bron/reken.js (formules en rekenvraag-generatoren). De Edu-Racer gaat eruit: die heeft eigen vragen.
# Gebruik: python3 -I economie/maak-lesapp.py j3vh2   (vanuit de root van de repo); daarna bouw-oefen.py j3vh2
import json, os, re, sys

ECO = os.path.dirname(os.path.abspath(__file__))
CONFIG = {"j3vh2": dict(uit="apps/jaar-3_havo-vwo_hoofdstuk-2.html", jaar=3, titel="De rol van geld")}

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


for p in D["PARS"]:  # bouw-oefen.py leest de beeldnamen terug uit deze paden
    p["imgs"] = [["../img/%s/%s.jpg" % (name, b), t] for b, t in p["imgs"]]
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
sub(r"LU_JAAR=2", "LU_JAAR=%d" % C["jaar"])
sub(r"Jij en je geld<small", C["titel"] + "<small")
sub(r'var cur="2\.1"',"var cur=%s" % J(D["PARS"][0]["id"]))
out = os.path.join(ECO, C["uit"])
open(out, "w", encoding="utf-8").write(s)
print(C["uit"], "%d paragrafen, %d begrippen, %d quizvragen, %d rekenmodi" % (len(D["PARS"]), len(D["CARDS"]), len(D["BANK"]), reken.count(":function(")))
