#!/usr/bin/env python3
"""Maakt de vragenpakketten van Havenmeester: havenmeester/data/<id>.json en index.json.

Gebruik (vanuit de root van de repo): python3 -I havenmeester/bouw.py

Het spel heeft geen eigen vragen. Dit script haalt ze uit de bestaande oefenomgevingen:
  BANK   meerkeuzevragen (het eerste antwoord is het goede)
  CARDS  begrippen met omschrijving
  SORT   sorteersets
  TL     tijdlijn (alleen Geschiedenis)
  CG     oorzaak en gevolg (alleen Geschiedenis)
Draai dit script opnieuw nadat een oefenomgeving of app.html is veranderd.
"""
import glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "havenmeester", "data")


def var(text, name, default=None):
    """leest `var NAAM=[...];` op één regel, of over meer regels tot de regel `];` (jaar 2 H1)"""
    m = re.search(r"^var %s=(.*);\s*$" % name, text, re.M)
    raw = m.group(1) if m else None
    if raw is None or raw.strip() == "[":
        m = re.search(r"^var %s=(\[\n.*?\n\]);" % name, text, re.M | re.S)
        if not m:
            return default
        raw = m.group(1)
    for poging in (raw, re.sub(r",(\s*[\]}])", r"\1", re.sub(r"([{,])\s*([abAB])\s*:", r'\1"\2":', raw))):
        try:
            return json.loads(poging)
        except ValueError:
            pass
    return default


def pakket(path, pid, vak, groep, titel, terug):
    text = open(os.path.join(ROOT, path), encoding="utf-8").read()
    bank = var(text, "BANK", [])
    cards = var(text, "CARDS")
    if cards is None:
        dj = os.path.join(os.path.dirname(os.path.join(ROOT, path)), "data.json")
        cards = json.load(open(dj, encoding="utf-8")).get("cards", []) if os.path.exists(dj) else []
    d = dict(
        id=pid, vak=vak, groep=groep, titel=titel, terug=terug,
        mc=[dict(p=b[0], q=b[1], o=b[2], u=b[3] if len(b) > 3 else "") for b in bank if len(b[2]) == 4],
        cards=[dict(p=c[0], b=c[1], o=c[2]) for c in cards],
        sort=[dict(a=s["a"], b=s["b"], A=[x[1] for x in s["A"]], B=[x[1] for x in s["B"]], eA=[x[0] for x in s["A"]], eB=[x[0] for x in s["B"]])
              for s in var(text, "SORT", [])],
        tl=[dict(p=t[0], j=t[1], l=t[2], t=t[3]) for t in var(text, "TL", [])],
        cg=[dict(p=c[0], o=c[1], g=c[2]) for c in var(text, "CG", [])],
    )
    json.dump(d, open(os.path.join(OUT, pid + ".json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    return dict(id=pid, vak=vak, groep=groep, titel=titel, n=len(d["mc"]), nb=len(d["cards"]), ns=len(d["sort"]))


def main():
    os.makedirs(OUT, exist_ok=True)
    index = [
        pakket("app.html", "gs1", "Geschiedenis", "Jaar 3", "De industriële samenleving", "../app.html"),
        pakket("boekje-2/app.html", "gs2", "Geschiedenis", "Jaar 3", "Sociale zekerheid en verzorgingsstaat", "../boekje-2/app.html"),
    ]
    for f in sorted(glob.glob(os.path.join(ROOT, "economie", "*", "oefen.html"))):
        m = os.path.basename(os.path.dirname(f))
        mm = re.match(r"j(\d)(vh|h)(\d)$", m)
        if not mm:
            continue
        t = re.search(r"<title>Oefenomgeving · (.*?) · Economie", open(f, encoding="utf-8").read())
        groep = "Jaar %s %s" % (mm.group(1), "havo/vwo" if mm.group(2) == "vh" else "mavo")
        index.append(pakket("economie/%s/oefen.html" % m, m, "Economie", groep,
                            "H%s · %s" % (mm.group(3), t.group(1) if t else m), "../economie/%s/oefen.html" % m))
    json.dump(index, open(os.path.join(OUT, "index.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    for i in index:
        print("%-6s %-13s %-17s %3d vragen %3d begrippen %2d sorteersets  %s" % (i["id"], i["vak"], i["groep"], i["n"], i["nb"], i["ns"], i["titel"]))


if __name__ == "__main__":
    main()
