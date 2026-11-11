# Bouwt economie/<map>/route.json voor de persoonlijke oefenroute (route.js, fase 2, 2026-11-11).
# Gebruik: python3 -I economie/bouw-route.py j2h2   (vanuit de root van de repo; zonder argument: alle hoofdstukken)
# Per leerdoel: id, paragraaf, titel, en vragen op drie niveaus:
#   mc   = {niveau: [indexen in de BANK van de oude lesapp]}  -> de vraag, vier opties (o[0] juist) en de uitleg worden overgenomen
#   open = {niveau: [(blok, opgavenummer, veldnummer)]}         -> open vraag uit <map>/bron/toetsen.json met antwoordmodel en nakijkpunten
#   gen  = naam van de rekenvraag-generator in route.js (RG), die per niveau zelf nieuwe getallen maakt
# De indeling in niveaus is het denkwerk van deze sessie (zie changelog 2026-11-11): 1-ster = reproductie en basisformule,
# 2-ster = toepassen in een situatie en moeilijkere getallen, 3-ster = twee stappen combineren of uitleggen in eigen woorden.
import json, os, re, sys

ECO = os.path.dirname(os.path.abspath(__file__))

SPEC = {
    "j2h2": dict(app="apps/jaar-2_mavo_hoofdstuk-2.html", toets="j2h2/bron/toetsen.json", titel="Jij en je geld", doelen=[
        dict(id="inkomen", par="2.1", t="De drie soorten inkomen", mc={1: [0, 1, 4, 7], 2: [2, 3, 5, 6]}, open={3: [("rek_1", 1, "1-1"), ("rek_3", 1, "3-1a")]}),
        dict(id="uitgaven", par="2.1", t="De drie groepen uitgaven", mc={1: [9, 14, 15], 2: [10, 11, 12, 13]}, open={3: [("rek_1", 2, "1-2"), ("rek_2", 2, "2-2b"), ("rek_3", 1, "3-1b")]}),
        dict(id="maand", par="2.1", t="Van week naar maand rekenen", gen="maand", mc={1: [19, 20, 21], 2: [22, 24, 23]}, open={3: [("rek_2", 5, "2-5")]}),
        dict(id="budget", par="2.1", t="Een begroting maken", gen="budget", mc={1: [8, 16, 17, 26], 2: [18, 25]}, open={3: [("rek_2", 3, "2-3")]}),
        dict(id="saldo", par="2.1", t="Een nieuw saldo uitrekenen", gen="saldo", mc={1: [29]}),
        dict(id="pct", par="2.1", t="Procentuele verandering", gen="pct", mc={1: [28], 2: [27]}),
        dict(id="geldfuncties", par="2.2", t="De drie geldfuncties", mc={1: [30], 2: [31, 32, 33, 34]}, open={3: [("rek_1", 5, "1-5b"), ("rek_2", 10, "2-10b"), ("rek_3", 9, "3-9")]}),
        dict(id="sparen", par="2.2", t="Waarom mensen sparen", mc={1: [35, 36], 2: [37, 38, 39]}, open={3: [("rek_3", 10, "3-10a")]}),
        dict(id="rente-uitleg", par="2.2", t="Wat rente is", mc={1: [40, 42, 45, 46], 2: [41, 43, 44, 53, 54, 55]}, open={3: [("rek_1", 14, "1-14"), ("rek_2", 12, "2-12")]}),
        dict(id="rente", par="2.2", t="Het rentebedrag uitrekenen", gen="rente", mc={1: [47, 52], 2: [48, 49, 50], 3: [51, 58]}),
        dict(id="procvan", par="2.2", t="Een percentage van een bedrag", gen="procvan", mc={1: [57], 2: [56]}),
        dict(id="lenen", par="2.3", t="Lenen en de maandtermijn", mc={1: [59, 60, 61, 62, 64], 2: [63, 65, 66, 67, 68, 69, 70], 3: [81, 84, 85]}),
        dict(id="lening", par="2.3", t="De kosten van een lening", gen="lening", mc={1: [71], 2: [72, 73, 74, 82], 3: [75, 83]}),
        dict(id="perc", par="2.3", t="Hoeveel procent is het?", gen="perc", mc={1: [76, 79], 2: [77, 78, 80]}),
        dict(id="verzekeren", par="2.4", t="Verplichte en vrijwillige verzekeringen", mc={1: [86, 87, 88, 90, 93, 95], 2: [91, 92, 94, 96, 109, 111], 3: [89, 102, 110]}),
        dict(id="polis", par="2.4", t="Premie, polis en eigen risico", mc={1: [97, 98, 100], 2: [99, 101], 3: [108, 112]}),
        dict(id="schade", par="2.4", t="De schadevergoeding uitrekenen", gen="schade", mc={1: [106, 103, 107], 2: [104, 105]}),
    ]),
    "j2h1": dict(app="apps/jaar-2_mavo_hoofdstuk-1.html", toets="j2h1/bron/toetsen.json", titel="Wat heb je nodig?", doelen=[
        dict(id="keuzes", par="1.1", t="Keuzes maken door schaarste", mc={1: [0, 1, 2, 30], 2: [22, 23, 24, 26, 27, 28], 3: [31, 25]}, open={3: [("rek_a", 3, "A3a"), ("rek_a", 3, "A3b")]}),
        dict(id="behoeften", par="1.3", t="Primaire en secundaire behoeften", mc={1: [3, 4, 5, 68, 69, 70], 2: [71, 72, 73, 74, 75, 76, 77, 78, 79], 3: [88, 89, 98]}, open={3: [("rek_a", 4, "A4a"), ("rek_a", 4, "A4b")]}),
        dict(id="goederen", par="1.1", t="Goederen en diensten", mc={1: [6, 7, 8, 9, 10], 2: [11, 12, 13, 85, 86, 87, 96]}, open={3: [("rek_a", 5, "A5a")]}),
        dict(id="afronden", par="1.1", t="Geld en procenten netjes noteren", gen="afronden", mc={1: [14, 17, 20], 2: [15, 16, 18, 19, 21]}),
        dict(id="geld", par="1.2", t="Van ruilhandel naar giraal geld", mc={1: [35, 36, 42, 43, 41, 40], 2: [37, 38, 39, 44, 45, 46, 47, 63, 64, 65, 66, 67], 3: [48, 49, 50, 51]}, open={3: [("rek_a", 1, "A1a")]}),
        dict(id="saldo", par="1.2", t="Je saldo uitrekenen", gen="saldo", mc={1: [52, 53, 54, 55, 60], 2: [56, 57, 61, 62], 3: [58, 59]}),
        dict(id="consument", par="1.3", t="Consument en zelfvoorziening", mc={1: [80, 81, 82, 83], 2: [84, 97, 99]}, open={3: [("rek_a", 5, "A5b")]}),
        dict(id="maand", par="1.1", t="Van week naar maand rekenen", gen="maand", mc={1: [33], 2: [34]}),
        dict(id="korting", par="1.3", t="Rekenen met procenten", gen="procvan", mc={1: [92, 32], 2: [90, 91, 95], 3: [93, 94]}),
        dict(id="informatie", par="1.4", t="Betrouwbare informatie en reviews", mc={1: [100, 101, 102, 103], 2: [104, 128, 131, 129], 3: [105, 106]}, open={3: [("rek_a", 8, "A8a")]}),
        dict(id="warenonderzoek", par="1.4", t="Vergelijkend warenonderzoek en keurmerken", mc={1: [107, 108], 2: [109, 110]}),
        dict(id="garantie", par="1.4", t="Garantie en je rechten", mc={1: [111, 114, 115, 116], 2: [112, 113, 117]}, open={3: [("rek_a", 8, "A8b")]}),
        dict(id="warenwet", par="1.4", t="De Warenwet en de NVWA", mc={1: [118, 119, 120], 2: [121, 122, 130]}),
        dict(id="gemiddelde", par="1.4", t="Een gemiddelde uitrekenen", gen="gem", mc={1: [123, 124], 2: [125], 3: [126, 127]}),
    ]),
}


def grab_bank(path):
    s = open(path, encoding="utf-8").read()
    m = re.search(r"var BANK=(\[.*?\]);\n", s, re.S)
    return json.loads(m.group(1))


def open_item(T, blok, nr, veld):
    """open vraag uit toetsen.json: vraag, antwoordmodel, nakijkpunten, punten en eventueel de brontekst van de opgave"""
    for o in T["blokken"][blok]:
        if o["nr"] != nr:
            continue
        for dl in o["delen"]:
            for f in dl["velden"]:
                if f.get("type") == "open" and f.get("nr") == veld:
                    v = f.get("v") or dl["v"]
                    item = dict(t="open", v=v, model=f["model"], g=[dict(t=g["t"], p=g["p"]) for g in f.get("g", [])] or [dict(t=f["model"], p=f["p"])], p=f["p"])
                    if o.get("tekst"):
                        item["bron"] = o["tekst"]
                    return item
    raise SystemExit("open vraag niet gevonden: %s %s %s" % (blok, nr, veld))


def bouw(name):
    C = SPEC[name]
    bank = grab_bank(os.path.join(ECO, C["app"]))
    T = json.load(open(os.path.join(ECO, C["toets"]), encoding="utf-8"))
    gebruikt = set()
    doelen = []
    for d in C["doelen"]:
        per = {}
        for lvl, ix in d.get("mc", {}).items():
            for i in ix:
                assert i not in gebruikt, (name, d["id"], i)
                gebruikt.add(i)
                q = bank[i]
                assert len(q[2]) == 4, (name, i)
                per.setdefault(str(lvl), []).append(dict(t="mc", v=q[1], o=q[2], u=q[3]))
        for lvl, refs in d.get("open", {}).items():
            for ref in refs:
                per.setdefault(str(lvl), []).append(open_item(T, *ref))
        out = dict(id=d["id"], par=d["par"], t=d["t"], bank=per)
        if d.get("gen"):
            out["gen"] = d["gen"]
        assert out.get("gen") or per, d["id"]
        doelen.append(out)
    data = dict(map=name, titel=C["titel"], doelen=doelen)
    json.dump(data, open(os.path.join(ECO, name, "route.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    nq = sum(len(v) for d in doelen for v in d["bank"].values())
    rest = [i for i in range(len(bank)) if i not in gebruikt]
    print("%s/route.json: %d leerdoelen, %d vragen uit de bank en toetsen, %d generatoren; niet gebruikt uit de bank: %s" % (name, len(doelen), nq, sum(1 for d in doelen if d.get("gen")), rest))


for n in (sys.argv[1:] or list(SPEC)):
    bouw(n)
