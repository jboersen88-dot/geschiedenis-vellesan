"""Klikstappen van PowerPoint-animaties -> losse dia's voor de site.

Gebruik (alleen standaardbibliotheek, altijd met -I):
  python3 -I tools/dias/stappen.py analyse materiaal/h4-welvaart-voor-iedereen.pptx
  python3 -I tools/dias/stappen.py bouw materiaal/h4-....pptx uit/H4-stappen.pptx [10,11]
  python3 -I tools/dias/stappen.py plaats uit/H4-stappen.json uit/jpgs slides/H4

analyse: per dia het aantal klikken en welke vormen bij welke klik verschijnen.
bouw:    een pptx waarin elke geanimeerde dia is vervangen door k kopieen (stap 0..k-1,
         stap s = toestand na s klikken; nog niet getoonde vormen zijn verborgen) en
         een .json-lijst [[dia, stap], ...] in de volgorde van de pagina's.
         De laatste toestand (alles zichtbaar) is de bestaande dia NN.jpg.
plaats:  zet de JPG's van de PDF-export (01.jpg, 02.jpg, ... per pagina) als NN-S.jpg
         in de dia-map en print de waarde voor STEPS in app.html.
"""
import json, os, re, shutil, sys, zipfile
import xml.etree.ElementTree as ET

NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
P = "{%s}" % NS["p"]
REL_PRES = "ppt/_rels/presentation.xml.rels"


def dia_paden(z):
    """Slide-paden in presentatievolgorde."""
    rid = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read(REL_PRES))}
    pres = ET.fromstring(z.read("ppt/presentation.xml"))
    return ["ppt/" + rid[s.get("{%s}id" % NS["r"])] for s in pres.find("p:sldIdLst", NS)]


def klikken(xml):
    """[(spid, klasse, (par_van, par_tot)|None), ...] per klik, uit de hoofdreeks."""
    tm = ET.fromstring(xml).find("p:timing", NS)
    if tm is None:
        return []
    seq = [c for c in tm.iter(P + "cTn") if c.get("nodeType") == "mainSeq"]
    if not seq:
        return []
    uit = []
    for klik in seq[0].find("p:childTnLst", NS):
        eff = []
        for c in klik.iter(P + "cTn"):
            if not c.get("presetClass"):
                continue
            t = next(c.iter(P + "spTgt"), None)
            if t is None:
                continue
            pr = t.find("p:txEl/p:pRg", NS)
            eff.append((t.get("spid"), c.get("presetClass"),
                        (int(pr.get("st")), int(pr.get("end"))) if pr is not None else None))
        uit.append(eff)
    return uit


def toestanden(kl):
    """Per stap 0..k-1: (verborgen vormen, {spid: aantal zichtbare alinea's}).
    Vorm: eerste effect 'entr' -> begint verborgen; 'exit' -> begint zichtbaar.
    Tekstopbouw per alinea (pRg): vorm blijft zichtbaar, alinea's verschijnen een voor een."""
    tekst = {spid: 0 for eff in kl for spid, _, pr in eff if pr is not None}
    eerste = {}
    for eff in kl:
        for spid, kls, pr in eff:
            eerste.setdefault(spid, kls)
    verb = {s for s, k in eerste.items() if k == "entr" and s not in tekst}
    stappen = []
    for s in range(len(kl)):  # stap s = na s klikken
        v, zicht, t = set(verb), {}, dict.fromkeys(tekst, 0)
        for eff in kl[:s]:
            for spid, kls, pr in eff:
                if pr is not None:
                    t[spid] = max(t[spid], pr[1] + 1)
                elif kls == "entr":
                    v.discard(spid)
                elif kls == "exit":
                    v.add(spid)
        stappen.append((v, t))
    return stappen


def verberg(xml, spids):
    for sid in spids:
        xml, n = re.subn(r'(<p:cNvPr id="%s")(?![^>]*hidden=)' % re.escape(sid), r'\1 hidden="1"', xml, count=1)
        if not n:
            raise SystemExit("vorm %s niet gevonden in dia-XML" % sid)
    return xml


def beperk_alineas(xml, spid, zichtbaar):
    """Maak de tekst van alinea >= zichtbaar leeg (alinea blijft staan: de lay-out verspringt niet)."""
    for m in re.finditer(r"<p:sp>.*?</p:sp>", xml, re.S):
        if re.search(r'<p:cNvPr id="%s"[ >]' % re.escape(spid), m.group(0)):
            sp, k = m.group(0), [-1]

            def leeg(a):
                k[0] += 1
                if k[0] < zichtbaar:
                    return a.group(0)
                return re.sub(r"<a:(r|br|fld)\b.*?(</a:\1>|/>)", "", a.group(0), flags=re.S)
            nieuw = re.sub(r"<a:p>.*?</a:p>|<a:p/>", leeg, sp, flags=re.S)
            return xml[:m.start()] + nieuw + xml[m.end():]
    raise SystemExit("tekstvorm %s niet gevonden" % spid)


def analyse(pptx):
    z = zipfile.ZipFile(pptx)
    namen = {}
    tot = 0
    for n, pad in enumerate(dia_paden(z), 1):
        xml = z.read(pad).decode("utf8")
        kl = klikken(xml)
        if not kl:
            continue
        tot += len(kl)
        nm = dict(re.findall(r'<p:cNvPr id="(\d+)" name="([^"]*)"', xml))
        print("dia %2d: %d klikken" % (n, len(kl)))
        for i, eff in enumerate(kl, 1):
            print("   klik %d: %s" % (i, ", ".join("%s%s%s" % (nm.get(s, s), "" if k == "entr" else " (" + k + ")",
                                                                 " alinea %d-%d" % pr if pr else "") for s, k, pr in eff)))
    print("totaal", tot, "klikken")


def bouw(pptx, uit, alleen=None):
    zin = zipfile.ZipFile(pptx)
    paden = dia_paden(zin)
    nieuw, manifest = {}, []
    teller = 0
    for n, pad in enumerate(paden, 1):
        xml = zin.read(pad).decode("utf8")
        kl = klikken(xml)
        if not kl or (alleen and n not in alleen):
            continue
        rel_pad = pad.replace("slides/", "slides/_rels/") + ".rels"
        rel = zin.read(rel_pad).decode("utf8")
        rel = re.sub(r'<Relationship [^>]*relationships/notesSlide"[^>]*/>', "", rel)  # notitie mag niet gedeeld worden
        basis = re.sub(r"<p:timing>.*?</p:timing>", "", xml, flags=re.S)
        for s, (verb, tekst) in enumerate(toestanden(kl)):
            x = verberg(basis, verb)
            for spid, aantal in tekst.items():
                x = beperk_alineas(x, spid, aantal)
            teller += 1
            nieuw["ppt/slides/slide%d.xml" % (1000 + teller)] = x
            nieuw["ppt/slides/_rels/slide%d.xml.rels" % (1000 + teller)] = rel
            manifest.append([n, s])
    if not manifest:
        raise SystemExit("geen geanimeerde dia's gevonden")
    # presentatie: alleen de nieuwe dia's, in manifestvolgorde
    pres = zin.read("ppt/presentation.xml").decode("utf8")
    ids = "".join('<p:sldId id="%d" r:id="rIdS%d"/>' % (400 + i, i) for i in range(1, teller + 1))
    pres = re.sub(r"<p:sldIdLst>.*?</p:sldIdLst>", "<p:sldIdLst>%s</p:sldIdLst>" % ids, pres, flags=re.S)
    pres = re.sub(r"<p:extLst>.*?</p:extLst>", "", pres, flags=re.S) if "sectionLst" in pres else pres
    prels = re.sub(r'<Relationship Id="[^"]*" Type="[^"]*/slide" Target="[^"]*"/>', "",
                   zin.read(REL_PRES).decode("utf8"))
    prels = prels.replace("</Relationships>", "".join(
        '<Relationship Id="rIdS%d" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" '
        'Target="slides/slide%d.xml"/>' % (i, 1000 + i) for i in range(1, teller + 1)) + "</Relationships>")
    ct = zin.read("[Content_Types].xml").decode("utf8")
    ct = re.sub(r'<Override PartName="/ppt/(slides|notesSlides)/[^"]*"[^>]*/>', "", ct)
    ct = ct.replace("</Types>", "".join(
        '<Override PartName="/ppt/slides/slide%d.xml" ContentType="application/vnd.openxmlformats-officedocument.'
        'presentationml.slide+xml"/>' % (1000 + i) for i in range(1, teller + 1)) + "</Types>")
    os.makedirs(os.path.dirname(os.path.abspath(uit)), exist_ok=True)
    with zipfile.ZipFile(uit, "w", zipfile.ZIP_DEFLATED) as zu:
        for info in zin.infolist():
            nm = info.filename
            if re.match(r"ppt/(slides|notesSlides)/", nm):
                continue  # originele dia's en hun notities vervallen
            data = zin.read(nm)
            if nm == "ppt/presentation.xml":
                data = pres.encode("utf8")
            elif nm == REL_PRES:
                data = prels.encode("utf8")
            elif nm == "[Content_Types].xml":
                data = ct.encode("utf8")
            zu.writestr(nm, data)
        for nm, data in nieuw.items():
            zu.writestr(nm, data)
    json.dump(manifest, open(os.path.splitext(uit)[0] + ".json", "w"))
    print(uit, "->", len(manifest), "pagina's")


def plaats(manifest, jpgmap, doel):
    man = json.load(open(manifest))
    steps, tot = {}, 0
    for pag, (dia, s) in enumerate(man, 1):
        bron = os.path.join(jpgmap, "%02d.jpg" % pag)
        shutil.copyfile(bron, os.path.join(doel, "%02d-%d.jpg" % (dia, s)))
        tot += os.path.getsize(bron)
        steps[dia] = steps.get(dia, 0) + 1
    print("%d afbeeldingen, %.1f MB, gemiddeld %d KB" % (len(man), tot / 1e6, tot / len(man) / 1000))
    print("STEPS:", json.dumps({str(k): v for k, v in steps.items()}, separators=(",", ":")))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) >= 2 and a[0] == "analyse":
        analyse(a[1])
    elif len(a) >= 3 and a[0] == "bouw":
        bouw(a[1], a[2], {int(x) for x in a[3].split(",")} if len(a) > 3 else None)
    elif len(a) == 4 and a[0] == "plaats":
        plaats(a[1], a[2], a[3])
    else:
        sys.exit(__doc__)
