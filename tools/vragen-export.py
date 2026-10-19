#!/usr/bin/env python3
"""Maakt tools/vragen-data.js voor tools/vragen-controle.html.

Gebruik (vanuit de root van de repo): python3 -I tools/vragen-export.py
Gebruikt dezelfde herkenning en regels als tools/vragencheck.py.
"""
import importlib.util, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("vragencheck", os.path.join(HERE, "vragencheck.py"))
vc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vc)

TUPLE_ID = re.compile(r'\[\s*"([^"]{1,12})"\s*,\s*$')
KEY_ID = re.compile(r'"?(?:hoofdstuk|onderdeel|paragraaf)"?\s*:\s*"([^"]{1,30})"')


def hoofdstuk(text, vraag):
    i = text.find(json.dumps(vraag, ensure_ascii=False)[:60].rstrip('"'))
    if i < 0:
        i = text.find(vraag[:40])
    if i < 0:
        return "?"
    m = TUPLE_ID.search(text[max(0, i - 40):i])
    if m:
        return m.group(1)
    found = KEY_ID.findall(text[max(0, i - 600):i + 600])
    return found[-1] if found else "?"


def main():
    out = []
    for d, dirs, fs in os.walk(vc.ROOT):
        dirs[:] = sorted(x for x in dirs if x not in vc.SKIP_DIRS)
        for f in sorted(fs):
            if not f.endswith((".html", ".js")):
                continue
            path = os.path.join(d, f)
            text = open(path, encoding="utf-8", errors="replace").read()
            qs = [x for x in vc.find_questions(text)
                  if x[0].strip(". ") and not all(o.strip(". ") == "" for o in x[1])]
            if not qs:
                continue
            rel = os.path.relpath(path, vc.ROOT)
            n_long = 0
            rows = []
            for q, opts, j in qs:
                probs, longest = vc.check_q(opts, j)
                n_long += longest
                rows.append({"bron": rel, "h": hoofdstuk(text, q), "q": q, "o": opts, "j": j,
                             "vlaggen": probs + (["juiste antwoord is het langste"] if longest else [])})
            share = n_long / len(qs)
            if share > vc.LANGSTE_DREMPEL:  # bankregel: geldt voor het hele bestand
                for r in rows:
                    r["vlaggen"].append(f"bank: juiste = langste in {share:.0%} van {rel}")
            out.extend(rows)
    for n, r in enumerate(out):
        r["id"] = f'{r["bron"]}#{n}'
    with open(os.path.join(HERE, "vragen-data.js"), "w", encoding="utf-8") as fh:
        fh.write("window.VRAGEN=" + json.dumps(out, ensure_ascii=False) + ";\n")
    print(f"{len(out)} vragen geschreven naar tools/vragen-data.js")


if __name__ == "__main__":
    main()
