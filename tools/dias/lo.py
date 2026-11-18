"""PowerPoint -> dia's met klikstappen, zonder PowerPoint (LibreOffice + pdftoppm).

  python3 -I tools/dias/lo.py <bestand.pptx> <doelmap> [weg=1,7]

Doet in één keer wat tools/dias/README.md met PowerPoint op de Mac doet: gewone dia's (NN.jpg,
1600 px) en klikstappen (NN-S.jpg, 1280 px) in <doelmap>. `weg` = dia's die niet op de site komen
(lesplanning, huiswerk); de rest wordt opnieuw genummerd. Opbouw-dia's (Nearpod-versies waarin
dezelfde dia steeds terugkomt met een regel erbij) worden één dia met stappen. Print als laatste regel JSON:
{"n": aantal dia's, "steps": {"3": 4, ...}}.
Let op: LibreOffice vervangt lettertypen die het niet heeft; een export met PowerPoint is exacter.
"""
import json, os, shutil, subprocess, sys, tempfile, glob, zipfile
import xml.etree.ElementTree as ET
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import stappen


def pdf(pptx, map_):
    subprocess.run(["soffice", "-env:UserInstallation=file://" + map_ + "/prof", "--headless", "--convert-to", "pdf",
                    "--outdir", map_, pptx], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=900)
    return os.path.splitext(pptx)[0] + ".pdf"


def jpgs(pdf_, voorvoegsel, breed, kwal, pagina=None):
    a = ["pdftoppm", "-jpeg", "-jpegopt", "quality=%d" % kwal, "-scale-to-x", str(breed), "-scale-to-y", "-1"]
    if pagina:
        a += ["-f", str(pagina), "-l", str(pagina)]
    subprocess.run(a + [pdf_, voorvoegsel], check=True)
    return sorted(glob.glob(voorvoegsel + "-*.jpg"), key=lambda f: int(f.rsplit("-", 1)[1][:-4]))


def teksten(xml):
    """(titel, [alinea's]) van een dia."""
    root = ET.fromstring(xml)
    A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
    titel, al = "", []
    for sp in root.iter(stappen.P + "sp"):
        ph = sp.find(".//" + stappen.P + "ph")
        ps = ["".join(t.text or "" for t in p.iter(A + "t")).strip() for p in sp.iter(A + "p")]
        ps = [x for x in ps if x.strip(". ")]
        if ph is not None and ph.get("type") in ("title", "ctrTitle") and not titel:
            titel = " ".join(ps).lower()
        else:
            al += ps
    return titel, al


def groepen(pptx, weg):
    """Opbouw-dia's (Nearpod-versies: dezelfde dia steeds opnieuw met een regel erbij) worden één dia met stappen.
    Geeft [[dia, dia, ...], ...]: opeenvolgende dia's met dezelfde titel waarvan de tekst telkens de vorige bevat."""
    z = zipfile.ZipFile(pptx)
    uit, vorig = [], None
    for nr, pad in stappen.zichtbaar(z):
        if nr in weg:
            continue
        titel, al = teksten(z.read(pad))
        blob = "\n".join(al)
        if vorig and titel and titel == vorig[0] and len(al) >= len(vorig[1]) and all(x in blob for x in vorig[1]) and (vorig[1] or al):
            uit[-1].append(nr)
        else:
            uit.append([nr])
        vorig = (titel, al)
    return uit


def main(pptx, doel, weg):
    t = tempfile.mkdtemp(prefix="dias")
    a = os.path.join(t, "a.pptx"); shutil.copyfile(pptx, a)
    s = os.path.join(t, "s.pptx")
    gr = groepen(a, weg)
    los = {g[0] for g in gr if len(g) == 1}
    try:
        stappen.bouw(a, s, los)
        man = json.load(open(os.path.join(t, "s.json")))
    except SystemExit:                    # geen animaties in deze presentatie
        man = []
    ap = pdf(a, t)
    gewoon = jpgs(ap, os.path.join(t, "g"), 1600, 62)
    klein = jpgs(ap, os.path.join(t, "k"), 1280, 52) if any(len(g) > 1 for g in gr) else []
    os.makedirs(doel, exist_ok=True)
    for f in glob.glob(os.path.join(doel, "*.jpg")):
        os.remove(f)
    nieuw, steps = {}, {}                 # oud dianummer (losse dia's) -> nieuw nummer
    for k, g in enumerate(gr, 1):
        shutil.copyfile(gewoon[g[-1] - 1], os.path.join(doel, "%02d.jpg" % k))
        if len(g) == 1:
            nieuw[g[0]] = k
        else:
            for i, d in enumerate(g[:-1]):
                shutil.copyfile(klein[d - 1], os.path.join(doel, "%02d-%d.jpg" % (k, i)))
            steps[str(k)] = len(g) - 1
    if man:
        sp = pdf(s, t)
        st = jpgs(sp, os.path.join(t, "s"), 1280, 52)
        if len(st) != len(man):
            sys.exit("stappen: %d pagina's, verwacht %d" % (len(st), len(man)))
        for pag, (dia, stap) in enumerate(man, 1):
            if dia not in nieuw:
                continue
            if stap < 0:
                f = jpgs(sp, os.path.join(t, "e%d" % pag), 1600, 62, pag)[0]
                shutil.copyfile(f, os.path.join(doel, "%02d.jpg" % nieuw[dia]))
            else:
                shutil.copyfile(st[pag - 1], os.path.join(doel, "%02d-%d.jpg" % (nieuw[dia], stap)))
                steps[str(nieuw[dia])] = steps.get(str(nieuw[dia]), 0) + 1
    shutil.rmtree(t)
    print(json.dumps({"n": len(gr), "steps": steps, "groepen": gr}, separators=(",", ":")))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    w = set()
    for x in sys.argv[3:]:
        if x.startswith("weg=") and x[4:]:
            w = {int(y) for y in x[4:].split(",")}
    main(sys.argv[1], sys.argv[2], w)
