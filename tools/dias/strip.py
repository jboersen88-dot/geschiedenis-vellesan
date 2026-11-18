# python3 -I strip.py in.pptx uit.pptx "4:pics" "7:pics,txt=eenmalig" "3:pics,lijnen,txt=-9%|-29%|Bruto premie"
# Haalt afbeeldingen (en losse tekstvakjes/lijnen die erbij horen) van de genoemde dia's. Nummering: alle dia's in het bestand, vanaf 1.
import sys
from pptx import Presentation
prs = Presentation(sys.argv[1])
for spec in sys.argv[3:]:
    nr, wat = spec.split(":", 1)
    sl = prs.slides[int(nr) - 1]
    opts = wat.split(",")
    txt = [o[4:].split("|") for o in opts if o.startswith("txt=")]
    txt = txt[0] if txt else []
    weg = []
    idl = [o[4:].split("|") for o in opts if o.startswith("ids=")]
    idl = idl[0] if idl else []
    for sh in sl.shapes:
        tag = sh._element.tag.split("}")[1]
        t = sh.text_frame.text.strip() if sh.has_text_frame else ""
        if ("pics" in opts and tag == "pic") or ("lijnen" in opts and tag == "cxnSp") or (str(sh.shape_id) in idl) or ("leeg" in opts and tag == "sp" and not t and not sh.is_placeholder) or (t and any(t == x or (len(x) > 3 and x in t and len(t) < 40) for x in txt)):
            weg.append(sh)
    ids = set()
    for sh in weg:
        ids.add(str(sh.shape_id)); sh._element.getparent().remove(sh._element)
    # animaties die naar een weggehaalde vorm wijzen ook weghalen (het buitenste klik-blok)
    tim = sl._element.find("{http://schemas.openxmlformats.org/presentationml/2006/main}timing")
    n = 0
    if tim is not None:
        P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"
        for sp in list(tim.iter(P + "spTgt")):
            if sp.get("spid") in ids:
                e = sp
                # omhoog tot de par die direct onder een childTnLst van de hoofdreeks hangt (één effect)
                while e is not None and not (e.tag == P + "par" and e.getparent() is not None and e.getparent().tag == P + "childTnLst" and e.find(P + "cTn") is not None and e.find(P + "cTn").get("presetID")is None and e.find(P+"cTn").get("fill")=="hold" and e.getparent().getparent().get("nodeType") in ("mainSeq",)):
                    e = e.getparent()
                if e is not None and e.getparent() is not None:
                    e.getparent().remove(e); n += 1
    print("dia", nr, "weg:", len(weg), "vormen,", n, "klikblokken")
prs.save(sys.argv[2])
