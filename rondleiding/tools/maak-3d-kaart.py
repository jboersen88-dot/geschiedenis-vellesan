#!/usr/bin/env python3
"""Maakt de bovenaanzichten voor de 3D-plattegrond (img/plan-0..2.webp) uit de schuine
etagekaarten (img/vloer-0..2.webp), legt de etages op elkaar en trekt de buitenmuur over.
Gebruik: python3 tools/maak-3d-kaart.py   (nodig: numpy, pillow, opencv-python-headless)
Drukt de waarden voor "p3" en "muur" per etage af; zet die in data/stops.js."""
import json, os, numpy as np, cv2
from PIL import Image
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
A = np.array([0.94, -0.35]); B = np.array([0.45, 0.89])  # zelfde assen als hud.assen
M = np.array([A, B]).T; Minv = np.linalg.inv(M)
tops, boxes, info = [], [], []
for i in range(3):
    im = Image.open(f"{R}/img/vloer-{i}.webp").convert("RGBA"); W, H = im.size
    uv = (Minv @ np.array([[0, 0], [W, 0], [0, H], [W, H]], float).T).T; umin, vmin = uv.min(0); umax, vmax = uv.max(0)
    a, b = M[0]; d, e = M[1]
    top = im.transform((int(umax - umin), int(vmax - vmin)), Image.AFFINE, (a, b, a * umin + b * vmin, d, e, d * umin + e * vmin), resample=Image.BICUBIC)
    box = top.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
    tops.append(top.crop(box)); boxes.append(box); info.append((W, H, umin, vmin))
def mask(im, s):
    m = im.getchannel("A").resize((max(1, int(im.width * s)), max(1, int(im.height * s))))
    return (np.array(m) > 60).astype(np.float32)
S = 0.12; M0 = mask(tops[0], S); reg = {0: (1.0, 0.0, 0.0)}
for i in (1, 2):  # etage i zo schalen en schuiven dat hij het best op de begane grond past
    best = None
    for sc in np.arange(0.8, 1.21, 0.02):
        Mi = mask(tops[i], S * sc); h, w = Mi.shape; Hh, Ww = M0.shape
        for dy in range(-h // 2, Hh):
            for dx in range(-w // 2, Ww):
                y0, x0 = max(0, dy), max(0, dx); y1, x1 = min(Hh, dy + h), min(Ww, dx + w)
                if y1 <= y0 or x1 <= x0: continue
                ov = (M0[y0:y1, x0:x1] * Mi[y0 - dy:y1 - dy, x0 - dx:x1 - dx]).sum()
                sc_ = ov / (Mi.sum() + M0.sum() - ov) if i == 1 else ov / Mi.sum()
                if best is None or sc_ > best[0]: best = (sc_, sc, dx / S, dy / S)
    reg[i] = best[1:]
pts = []
for i in range(3):
    sc, dx, dy = reg[i]; pts += [(dx, dy), (dx + tops[i].width * sc, dy + tops[i].height * sc)]
pts = np.array(pts); ox, oy = pts.min(0) - 20; ex, ey = pts.max(0) + 20
OUT = 1400; k = OUT / (ex - ox); OH = int((ey - oy) * k)
for i in range(3):
    sc, dx, dy = reg[i]; W, H, umin, vmin = info[i]; bx0, by0 = boxes[i][:2]
    t = tops[i].resize((int(tops[i].width * sc * k), int(tops[i].height * sc * k)), Image.LANCZOS)
    can = Image.new("RGBA", (OUT, OH), (0, 0, 0, 0)); can.alpha_composite(t, (int((dx - ox) * k), int((dy - oy) * k)))
    can.save(f"{R}/img/plan-{i}.webp", quality=84, method=6)
    L = k * (Minv * sc) @ np.diag([W / 100, H / 100]); tt = k * ((-np.array([umin, vmin]) - np.array([bx0, by0])) * sc + np.array([dx, dy]) - np.array([ox, oy]))
    p3 = [L[0, 0] * 100 / OUT, L[0, 1] * 100 / OUT, tt[0] * 100 / OUT, L[1, 0] * 100 / OH, L[1, 1] * 100 / OH, tt[1] * 100 / OH]
    m = (np.array(can.getchannel("A")) > 80).astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8)); m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((7, 7), np.uint8))
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    muur = [[[round(x * 100 / OUT, 2), round(y * 100 / OH, 2)] for x, y in cv2.approxPolyDP(c, 6, True).reshape(-1, 2)] for c in cs if cv2.contourArea(c) >= 3000]
    print(f"etage {i}: p3: {json.dumps([round(v, 4) for v in p3])}, muur: {json.dumps(muur, separators=(',', ':'))}")
