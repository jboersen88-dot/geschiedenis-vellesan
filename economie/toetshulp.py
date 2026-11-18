# Hulpjes om <map>/bron/toetsen.json leesbaar te schrijven (zie j4h5/bron/toetsen.py). Alleen standaardbibliotheek.
import json, os, random


def mc(seed, vragen):
    """vragen = [(vraag, [juist, fout, fout, fout], uitleg)]: schudt de opties (vast per toets) en zet j."""
    rnd, uit = random.Random(seed), []
    for v, o, u in vragen:
        assert len(o) == 4, v
        i = list(range(4)); rnd.shuffle(i)
        uit.append(dict(v=v, o=[o[k] for k in i], j=i.index(0), u=u))
    return uit


def num(ans, label, eenh="", tol=0.05, p=1):
    return dict(type="num", ans=[ans], p=p, eenh=eenh, tol=tol, label=label)


def keuze(label, opties, j, p=1):
    return dict(type="keuze", opties=opties, j=j, p=p, label=label)


def gf(label, goed):
    """Stelling: de leerling kiest Goed of Fout."""
    return keuze(label, ["Goed", "Fout"], 0 if goed else 1)


def open_(nr, vraag, label, model, punten):
    """punten = [tekst van elk scorepunt]; elk punt is 1 punt."""
    return dict(type="open", nr=nr, p=len(punten), label=label, model=model, g=[dict(t=t, p=1) for t in punten], v=vraag, h=[])


def deel(id_, v, velden, uitw):
    return dict(id=id_, v=v, velden=velden, uitw=uitw if isinstance(uitw, list) else [uitw])


def opgave(nr, titel, delen, tekst="", tabel=None):
    o = dict(nr=nr, titel=titel, tekst=tekst, p=sum(f["p"] for d in delen for f in d["velden"]), delen=delen)
    if tabel:
        o["tabel"] = tabel
    return o


def schrijf(pad, blokken, toetsen):
    """toetsen = {"t1": dict(n=1, t="oefentoets A", sub="Hoofdstuk 5", min=45, mc="mc_a", open=None, rek="rek_a")}"""
    vers = [dict(n=t["n"], min=t["min"], pts=len(blokken[t["mc"]]) + sum(o["p"] for o in blokken[t["rek"]])) for t in toetsen.values()]
    json.dump(dict(blokken=blokken, toetsen=toetsen, VERS=vers), open(os.path.join(os.path.dirname(os.path.abspath(pad)), "toetsen.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    for v in vers:
        print("toets", v["n"], v["pts"], "punten,", v["min"], "minuten")
