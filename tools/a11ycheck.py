#!/usr/bin/env python3
"""Statische toegankelijkheidscontrole voor alle HTML-pagina's.

Gebruik (vanuit de root van de repo): python3 -I tools/a11ycheck.py
Controleert alleen wat in de HTML zelf staat (niet wat JavaScript later toevoegt):
lang, viewport, title, alt-tekst, naamloze knoppen/links, labels bij invulvelden,
dubbele id's en of animaties prefers-reduced-motion respecteren.
Exit-code 1 bij fouten; waarschuwingen tellen niet mee.
"""
import os, re, sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "materiaal"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = self.viewport = self.title = False
        self.ids, self.dups = set(), set()
        self.labels_for = set()
        self.inputs, self.errors, self.warns = [], [], []
        self.stack = []  # open <button>/<a>: [tag, attrs, text, line]
        self.in_title = False

    def handle_starttag(self, tag, a):
        a = dict(a)
        line = self.getpos()[0]
        if tag == "html" and a.get("lang"):
            self.lang = True
        if tag == "meta" and a.get("name") == "viewport":
            self.viewport = True
        if tag == "title":
            self.in_title = True
        if "id" in a and a["id"] and not any(c in a["id"] for c in "'+{"):
            if a["id"] in self.ids:
                self.dups.add(a["id"])
            self.ids.add(a["id"])
        if tag == "img" and "alt" not in a:
            self.errors.append(f"r{line}: <img> zonder alt ({a.get('src','?')[:50]})")
        if tag == "label" and a.get("for"):
            self.labels_for.add(a["for"])
        if tag in ("input", "select", "textarea") and a.get("type") not in ("hidden", "submit", "button"):
            self.inputs.append((a, line, bool(self.stack and self.stack[-1][0] == "label")))
        if tag == "label":
            self.stack.append(["label", a, "", line])
        if tag in ("button", "a"):
            self.stack.append([tag, a, "", line])
        if tag in ("img", "svg") and self.stack:
            if a.get("alt") or a.get("aria-label"):
                self.stack[-1][2] += "x"

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if self.stack and self.stack[-1][0] == tag:
            t, a, text, line = self.stack.pop()
            if t in ("button", "a") and not text.strip() and not a.get("aria-label") and not a.get("title") and not a.get("aria-labelledby"):
                if t == "a" and not a.get("href"):
                    return
                self.errors.append(f"r{line}: <{t}> zonder tekst of aria-label")

    def handle_data(self, d):
        if self.in_title and d.strip():
            self.title = True
        for s in self.stack:
            s[2] += d


def check(path):
    text = open(path, encoding="utf-8", errors="replace").read()
    p = Page()
    p.feed(text)
    errs, warns = list(p.errors), []
    if not p.lang: errs.append("geen lang op <html>")
    if not p.viewport: errs.append("geen viewport-meta")
    if not p.title: errs.append("geen <title>")
    for d in sorted(p.dups): errs.append(f"dubbele id: {d}")
    for a, line, wrapped in p.inputs:
        if not (wrapped or a.get("aria-label") or a.get("aria-labelledby") or (a.get("id") in p.labels_for) or a.get("title")):
            errs.append(f"r{line}: invulveld zonder label ({a.get('id') or a.get('name') or a.get('type') or '?'})")
    css = ""
    for href in re.findall(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"', text):
        p2 = os.path.normpath(os.path.join(os.path.dirname(path), href))
        if not href.startswith("http") and os.path.exists(p2):
            css += open(p2, encoding="utf-8", errors="replace").read()
    if re.search(r"@keyframes|animation\s*:|transition\s*:", text) and "prefers-reduced-motion" not in text + css:
        warns.append("animaties zonder prefers-reduced-motion")
    return errs, warns


def main():
    total = 0
    for d, dirs, fs in os.walk(ROOT):
        dirs[:] = sorted(x for x in dirs if x not in SKIP_DIRS)
        for f in sorted(fs):
            if not f.endswith(".html"):
                continue
            path = os.path.join(d, f)
            errs, warns = check(path)
            if errs or warns:
                print(os.path.relpath(path, ROOT))
                for e in errs: print("  FOUT  ", e)
                for w in warns: print("  let op", w)
            total += len(errs)
    print("Geen fouten." if not total else f"{total} fout(en).")
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    main()
