"""Werk de PowerPoint 5.4 (economie 4 mavo) bij naar de Miljoenennota 2027.

python3 -I maak54.py <oud.pptx> <map met uitsneden> <nieuw.pptx>
"""
import re, shutil, sys, zipfile, os
from PIL import Image

SRC, CROPS, OUT = sys.argv[1:4]
EMU_W, EMU_H = 12192000, 6858000

z = zipfile.ZipFile(SRC)
files = {n: z.read(n) for n in z.namelist()}


def img(name):
    return Image.open(os.path.join(CROPS, name))


def put_media(media, cropname):
    im = img(cropname).convert("RGB")
    import io
    b = io.BytesIO(); im.save(b, "PNG", optimize=True)
    files["ppt/media/" + media] = b.getvalue()
    return im.size


def slide(n):
    return files["ppt/slides/slide%d.xml" % n].decode("utf8")


def save(n, x):
    files["ppt/slides/slide%d.xml" % n] = x.encode("utf8")


def set_xfrm(x, shape_id, ox, oy, cx, cy, kind="pic"):
    """Zet positie en grootte van de vorm met cNvPr id=shape_id."""
    pat = re.compile(r'(<p:%s>(?:(?!</p:%s>).)*?<p:cNvPr id="%d"(?:(?!</p:%s>).)*?<a:xfrm[^>]*>)<a:off x="-?\d+" y="-?\d+"/><a:ext cx="\d+" cy="\d+"/>' % (kind, kind, shape_id, kind), re.S)
    new, k = pat.subn(lambda m: m.group(1) + '<a:off x="%d" y="%d"/><a:ext cx="%d" cy="%d"/>' % (ox, oy, cx, cy), x, count=1)
    assert k == 1, (shape_id, kind)
    return new


def no_srcrect(x, shape_id):
    pat = re.compile(r'(<p:pic>(?:(?!</p:pic>).)*?<p:cNvPr id="%d"(?:(?!</p:pic>).)*?)<a:srcRect[^/]*/>' % shape_id, re.S)
    return pat.sub(lambda m: m.group(1) + "<a:srcRect/>", x, count=1)


def replace_text(x, old, new):
    a = "<a:t>%s</a:t>" % old
    assert x.count(a) == 1, old
    return x.replace(a, "<a:t>%s</a:t>" % new)


_ID = [9000]


def textbox(x, ox, oy, cx, cy, lines, size=1000, color="FFFFFF", bold=False, algn="l"):
    _ID[0] += 1
    ps = "".join('<a:p><a:pPr algn="%s"/><a:r><a:rPr lang="nl-NL" sz="%d" b="%d" dirty="0"><a:solidFill><a:srgbClr val="%s"/></a:solidFill></a:rPr><a:t>%s</a:t></a:r></a:p>'
                 % (algn, size, 1 if bold else 0, color, t) for t in lines)
    sp = ('<p:sp><p:nvSpPr><p:cNvPr id="%d" name="Bron %d"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>'
          '<p:spPr><a:xfrm><a:off x="%d" y="%d"/><a:ext cx="%d" cy="%d"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
          '<p:txBody><a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0"><a:noAutofit/></a:bodyPr><a:lstStyle/>%s</p:txBody></p:sp>'
          % (_ID[0], _ID[0], ox, oy, cx, cy, ps))
    i = x.rindex("</p:spTree>")
    return x[:i] + sp + x[i:]


BRON = "Bron: Miljoenennotaposter 2027, ministerie van Financiën (Prinsjesdag 2026). Bedragen in miljarden euro."

# ---- dia 3, 4 en 5: de hele poster met kaders om inkomsten en uitgaven ----
pw, ph = put_media("image6.png", "poster.png")
files["ppt/media/image7.png"] = files["ppt/media/image6.png"]
PH = EMU_H; PW = round(PH * pw / ph); PX = (EMU_W - PW) // 2
k = PW / pw                                   # EMU per pixel van de poster


def rect_px(x0, y0, x1, y1):
    return round(PX + x0 * k), round(y0 * k), round((x1 - x0) * k), round((y1 - y0) * k)


INK = rect_px(713, 315, 1059, 468)            # "Inkomsten van het Rijk 2027 ... € 481,2"
UIT = rect_px(1335, 315, 1680, 468)           # "Uitgaven van het Rijk 2027 ... € 516,8"
BRON_POSTER = (round(PX + 400 * k), round(1512 * k), round(1400 * k), round(40 * k))
for n, rid, kader in ((3, 6, [(5, INK)]), (4, 6, [(5, UIT)]), (5, 4, [(5, UIT), (6, INK)])):
    x = slide(n)
    x = set_xfrm(x, rid, PX, 0, PW, PH)
    for sid, r in kader:
        x = set_xfrm(x, sid, *r, kind="sp")
    x = textbox(x, *BRON_POSTER, [BRON], size=900)
    save(n, x)
x = slide(5)
gx0, gx1 = INK[0] + INK[2], UIT[0]            # ruimte tussen de twee kaders
x = set_xfrm(x, 7, gx0 + 40000, round(330 * k), gx1 - gx0 - 80000, round(185 * k), kind="sp")
x = x.replace("<a:t>Tekort van </a:t>", "<a:t>Tekort:</a:t>").replace("<a:t>34,9 miljard</a:t>", "<a:t>€ 35,6 miljard</a:t>")
assert "35,6" in x
x = x.replace('<a:bodyPr wrap="square" rtlCol="0"><a:spAutoFit/></a:bodyPr>', '<a:bodyPr wrap="square" lIns="45720" rIns="45720" rtlCol="0"><a:normAutofit/></a:bodyPr>', 1)
x = x.replace('<a:p><a:r><a:rPr lang="nl-NL" dirty="0"/><a:t>Tekort:', '<a:p><a:pPr algn="ctr"/><a:r><a:rPr lang="nl-NL" sz="1400" b="1" dirty="0"/><a:t>Tekort:')
x = x.replace('<a:p><a:r><a:rPr lang="nl-NL" dirty="0"/><a:t>€ 35,6 miljard', '<a:p><a:pPr algn="ctr"/><a:r><a:rPr lang="nl-NL" sz="1400" b="1" dirty="0"/><a:t>€ 35,6 miljard')
save(5, x)


# ---- dia 6 t/m 9: indirecte en directe belastingen (boven: posten, onder: totaal) ----
def box_pair(n, top_id, bot_id, x0, top_png, bot_png, top_media, bot_media, w=4787900, bron_color="404040"):
    tw, th = put_media(top_media, top_png)
    bw, bh = put_media(bot_media, bot_png)
    h1 = round(w * th / tw); h2 = round(w * bh / bw)
    y0 = (EMU_H - h1 - h2) // 2
    x = slide(n)
    x = set_xfrm(x, top_id, x0, y0, w, h1)
    x = set_xfrm(x, bot_id, x0, y0 + h1, w, h2)
    x = textbox(x, x0, y0 + h1 + h2 + 60000, w, 260000, ["Bron: Miljoenennotaposter 2027, ministerie van Financiën. In miljarden euro."], size=900, color=bron_color)
    save(n, x)


box_pair(6, 5, 4, 446843, "ind_top.png", "ind_bot.png", "image14.png", "image13.png")
box_pair(7, 6, 5, 3817978, "ind_top.png", "ind_bot.png", "image14.png", "image13.png")
box_pair(8, 2, 5, 537528, "dir_top.png", "dir_bot.png", "image17.png", "image18.png")
box_pair(9, 3, 4, 3813163, "dir_top.png", "dir_bot.png", "image17.png", "image18.png", bron_color="FFFFFF")


# ---- dia 10 en 11: premies ----
def single(n, pid, media, png, ox, oy_mid, w, bron_color="FFFFFF", bron_y=None):
    iw, ih = put_media(media, png)
    h = round(w * ih / iw)
    x = slide(n)
    x = set_xfrm(x, pid, ox, oy_mid - h // 2, w, h)
    x = textbox(x, ox, bron_y if bron_y else oy_mid + h // 2 + 60000, w, 260000, ["Bron: Miljoenennotaposter 2027, ministerie van Financiën. In miljarden euro."], size=900, color=bron_color)
    save(n, x)


single(10, 5, "image19.png", "werkn.png", 236329, 1304054 + 3543300 // 2, 4775200, bron_color="404040")
single(11, 5, "image20.png", "volks.png", 520616, 2039314 + 3543300 // 2, 4775200, bron_color="404040")

# ---- dia 12: alle uitgaven ----
iw, ih = put_media("image21.png", "uitgaven.png")
h = EMU_H; w = round(h * iw / ih)
x = slide(12)
x = set_xfrm(x, 5, (EMU_W - w) // 2, 0, w, h)
x = textbox(x, (EMU_W + w) // 2 + 100000, EMU_H - 700000, EMU_W - (EMU_W + w) // 2 - 200000, 600000,
            ["Bron: Miljoenennotaposter 2027,", "ministerie van Financiën.", "In miljarden euro."], size=900)
save(12, x)

# ---- dia 13 en 14: vergelijken 2026 (Miljoenennota 2026) met 2027 ----
files["ppt/media/image22.png"] = z.read("ppt/media/image23.png")   # sociale zekerheid 2026
files["ppt/media/image24.png"] = z.read("ppt/media/image25.png")   # zorg 2026
for n, left_id, left_xy, right_id, right_x, top, media, png, labels in (
        (13, 3, (322973, 439838), 2, 7014259, 439838, "image23.png", "sz.png", ("2024", "2026")),
        (14, 4, (419100, 531472), 5, 6562846, 531472, "image25.png", "zorg.png", ("2024", "nu"))):
    iw, ih = put_media(media, png)
    lw, lh = 4247908 if n == 13 else 4171219, 4965087 if n == 13 else 4875450
    rw = 4900000; rh = round(rw * ih / iw)
    x = slide(n)
    x = set_xfrm(x, left_id, left_xy[0], top, lw, lh)
    x = set_xfrm(x, right_id, right_x, top + (lh - rh) // 2, rw, rh)
    x = replace_text(x, labels[1], "2027")
    x = replace_text(x, labels[0], "2026")
    regels = ["Bron: Miljoenennota 2026 en Miljoenennotaposter 2027, ministerie van Financiën. In miljarden euro."]
    if n == 14:
        regels.append("Let op: in 2026 zat de zorgtoeslag in 'Medische zorg incl. zorgtoeslag'. In 2027 staat de zorgtoeslag apart (€ 7,5).")
    x = textbox(x, 763929, EMU_H - 520000, EMU_W - 1200000, 420000, regels, size=900)
    save(n, x)

# labels onder de oude afbeelding zijn tekstvakken met de standaardkleur; laat ze staan.

# ---- dia 15: het EMU-saldo sinds 1970 ----
iw, ih = put_media("image26.png", "saldo.png")
x = slide(15)
w = 11359896; h = round(w * ih / iw)
x = set_xfrm(x, 4, 405384, (EMU_H - h) // 2, w, h)
save(15, x)

# ---- dia 16: tekst en grafiek van de staatsschuld ----
iw, ih = put_media("image27.png", "schuld.png")
x = slide(16)
h = 4395216; w = round(h * iw / ih)
x = set_xfrm(x, 5, EMU_W - w - 150000, EMU_H - h - 150000, w, h)
x = replace_text(x, "Dit jaar een tekort!", "Tekort in 2027: € 35,6 miljard")
x = replace_text(x, "Werklozen ", "Meer geld voor defensie")
x = replace_text(x, "hogere rentekosten  ", "hogere rentekosten: € 12,9 miljard")
x = replace_text(x, "43,3% van het BBP", "Staatsschuld 2027: 46,9% van het bbp")
x = textbox(x, 268225, EMU_H - 420000, 5200000, 300000, ["Bron: Miljoenennota 2027 (tabel 2 en poster), ministerie van Financiën."], size=900)
save(16, x)

# ---- dia 17: de staatsschuld ----
iw, ih = put_media("image28.png", "schuldslide.png")
x = slide(17)
x = no_srcrect(x, 4)
x = set_xfrm(x, 4, 0, 0, EMU_W, EMU_H)
x = textbox(x, 600000, EMU_H - 520000, EMU_W - 1200000, 300000, [BRON], size=1000, color="1F3A5F")
save(17, x)

# ---- dia 6 en 8: foto van de minister-president (was Rutte, nu Rob Jetten) ----
# Portretfoto van rijksoverheid.nl: gebruik voor educatieve doeleinden toegestaan, auteursrecht bij de Rijksoverheid.
# Daarom alleen in de PowerPoint voor de les; dia 6 en 8 gaan niet naar de openbare site (weg=6,8 in lo.py).
files["ppt/media/image12.jpeg"] = open(os.path.join(CROPS, "jetten.jpg"), "rb").read()
for n in (6, 8):
    x = slide(n)
    x = textbox(x, 9266773, 2490000, 2047850, 330000, ["Minister-president Rob Jetten", "Foto: Rijksoverheid"], size=800, algn="ctr")
    save(n, x)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as o:
    for n in z.namelist():
        o.writestr(z.getinfo(n), files[n])
print("klaar", OUT)
