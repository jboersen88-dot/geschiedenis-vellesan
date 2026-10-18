#!/usr/bin/env python3
"""Controleert alle meerkeuzevragen in de site op de regels van de docent.

Gebruik (vanuit de root van de repo): python3 -I tools/vragencheck.py [-v]

Regels:
  1. Precies 4 antwoordmogelijkheden, zonder dubbele antwoorden.          (fout)
  2. Ongeveer even lang: langste / kortste <= 1,5.                          (fout)
     Antwoorden van 20 tekens of korter (namen, jaartallen) tellen niet mee.
  3. Het juiste antwoord mag niet steeds het langste zijn. Per vraag telt
     "langste" als het juiste antwoord minstens 8% en 5 tekens langer is
     dan het op één na langste. Per vragenbank: meer dan 25% is een fout
     (25% is wat je bij toeval verwacht).
De weergave (elk antwoord op een eigen regel met witruimte) kan dit script niet
zien; die wordt in de browser gecontroleerd.

Herkende vormen:
  BANK-tuple   ["H1", "vraag", [juist, fout, fout, fout], "uitleg"]
  o + j / k    {o:[...], j: index}  of  {o:[...], k: index}
  a            {q:"...", a:[juist, fout, fout, fout]}
  goed + fout  {goed:"...", fout:[fout, fout, fout]}
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "materiaal", "tools"}
STR = r'"(?:[^"\\\n]|\\.)*"'
ARR = r'\[\s*' + STR + r'(?:\s*,\s*' + STR + r')*\s*\]'
LANGSTE_DREMPEL = 0.25


def arr(text):
    return json.loads(text)


def find_questions(text):
    """Geeft (vraagtekst, opties, index_juist) terug voor alle herkende vormen."""
    out = []
    # BANK-tuple: "id", "vraag", [opties], "uitleg"
    for m in re.finditer(r'\[\s*(' + STR + r')\s*,\s*(' + STR + r')\s*,\s*(' + ARR + r')\s*,\s*' + STR + r'\s*\]', text):
        q = json.loads(m.group(2))
        if len(q) > 12 and not q.replace(".", "").isdigit():
            out.append((q, arr(m.group(3)), 0))
    # {o:[...], j/k: n} (keys met of zonder quotes)
    for m in re.finditer(r'"?o"?\s*:\s*(' + ARR + r')\s*,\s*"?([jk])"?\s*:\s*(\d+)', text):
        before = text[max(0, m.start() - 400):m.start()]
        qm = re.findall(r'"?(?:q|v|vraag)"?\s*:\s*(' + STR + r')', before)
        out.append((json.loads(qm[-1]) if qm else "(vraag)", arr(m.group(1)), int(m.group(3))))
    # {q:"...", a:[...]} met a[0] juist
    for m in re.finditer(r'\bq\s*:\s*(' + STR + r')\s*,\s*a\s*:\s*(' + ARR + r')', text):
        out.append((json.loads(m.group(1)), arr(m.group(2)), 0))
    # {goed:"...", fout:[...]}
    for m in re.finditer(r'"?goed"?\s*:\s*(' + STR + r')\s*,\s*"?fout"?\s*:\s*(' + ARR + r')', text):
        before = text[max(0, m.start() - 400):m.start()]
        qm = re.findall(r'"?vraag"?\s*:\s*(' + STR + r')', before)
        out.append((json.loads(qm[-1]) if qm else "(vraag)", [json.loads(m.group(1))] + arr(m.group(2)), 0))
    return out


def check_q(opts, j):
    probs = []
    if len(opts) != 4:
        probs.append(f"{len(opts)} opties in plaats van 4")
    if len(set(o.strip().lower() for o in opts)) != len(opts):
        probs.append("dubbel antwoord")
    L = [len(o) for o in opts]
    if L and min(L) > 20 and max(L) / min(L) > 1.5:
        probs.append(f"lengteverschil {max(L)/min(L):.2f} (max 1,5)")
    others = sorted((l for i, l in enumerate(L) if i != j), reverse=True)
    longest = bool(others) and j < len(L) and L[j] >= others[0] * 1.08 and L[j] - others[0] >= 5
    return probs, longest


def main():
    verbose = "-v" in sys.argv
    fouten = 0
    totaal = 0
    for d, dirs, fs in os.walk(ROOT):
        dirs[:] = sorted(x for x in dirs if x not in SKIP_DIRS)
        for f in sorted(fs):
            if not f.endswith((".html", ".js")):
                continue
            path = os.path.join(d, f)
            text = open(path, encoding="utf-8", errors="replace").read()
            qs = find_questions(text)
            if not qs:
                continue
            rel = os.path.relpath(path, ROOT)
            n_long, regels = 0, []
            qs = [x for x in qs if x[0].strip(". ") and not all(o.strip(". ") == "" for o in x[1])]  # voorbeelden met "..." overslaan
            if not qs:
                continue
            for q, opts, j in qs:
                probs, longest = check_q(opts, j)
                n_long += longest
                if probs:
                    regels.append(f"  FOUT  {q[:70]}: {', '.join(probs)}")
                elif longest and verbose:
                    regels.append(f"  info  juiste antwoord is het langste: {q[:70]}")
            share = n_long / len(qs)
            if share > LANGSTE_DREMPEL:
                regels.insert(0, f"  FOUT  juiste antwoord is in {share:.0%} van de vragen het langste (max {LANGSTE_DREMPEL:.0%})")
            n_fout = sum(1 for r in regels if "FOUT" in r)
            fouten += n_fout
            totaal += len(qs)
            print(f"{rel}: {len(qs)} vragen, juiste = langste in {share:.0%}" + ("" if n_fout else " ✓"))
            for r in regels:
                print(r)
    print(f"\n{totaal} meerkeuzevragen gecontroleerd. " + ("Alles volgens de regels." if not fouten else f"{fouten} fout(en)."))
    sys.exit(1 if fouten else 0)


if __name__ == "__main__":
    main()
