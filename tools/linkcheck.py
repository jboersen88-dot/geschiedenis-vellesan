#!/usr/bin/env python3
"""Controleert alle lokale links en bestanden in de site.

Gebruik (vanuit de root van de repo):
  python3 -I tools/linkcheck.py            # alleen lokale links
  python3 -I tools/linkcheck.py --extern   # ook externe links (traag)

Kijkt naar href/src in HTML, url(...) in CSS en lokale paden in data-/js-bestanden.
Links die in JavaScript worden samengesteld (met '+' of quotes) worden overgeslagen.
Exit-code 1 als er kapotte links zijn.
"""
import os, re, sys, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "materiaal"}
ATTR = re.compile(r'(?:href|src)\s*=\s*"([^"]+)"')
CSSURL = re.compile(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)')
JSPATH = re.compile(r'["\']((?:\.\./)*(?:img|slides|data|economie|boekje-\d)/[^"\'\s+]+\.(?:jpe?g|png|webp|svg|gif|js|json|html))["\']')


def files(exts):
    for d, dirs, fs in os.walk(ROOT):
        dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
        for f in fs:
            if f.endswith(exts):
                yield os.path.join(d, f)


def local_target(page, link):
    if any(c in link for c in "'+{}$<>"):
        return None
    link = link.split("#")[0].split("?")[0]
    if not link or link.startswith(("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "//")):
        return None
    if " " in link.strip():
        return None
    base = ROOT if link.startswith("/") else os.path.dirname(page)
    return os.path.normpath(os.path.join(base, link.lstrip("/")))


def main():
    extern = "--extern" in sys.argv
    broken, externs, checked = [], set(), 0
    for page in files((".html", ".css", ".js")):
        text = open(page, encoding="utf-8", errors="replace").read()
        links = set(CSSURL.findall(text)) | set(JSPATH.findall(text))
        if page.endswith(".html"):
            links |= set(ATTR.findall(text))
        for link in links:
            if link.startswith(("http:", "https:")):
                externs.add(link)
                continue
            target = local_target(page, link)
            if target is None:
                continue
            checked += 1
            # paden in .js gelden vanaf de pagina die het script laadt: probeer ook de mappen erboven
            cands = [target]
            if page.endswith(".js"):
                d = os.path.dirname(page)
                while d.startswith(ROOT) and d != os.path.dirname(ROOT):
                    cands.append(os.path.normpath(os.path.join(d, link.split("?")[0])))
                    d = os.path.dirname(d)
            if not any(os.path.exists(c) for c in cands):
                broken.append((os.path.relpath(page, ROOT), link))
    if extern:
        for url in sorted(externs):
            if any(c in url for c in "'+{}") or re.fullmatch(r"https?://[^/]+/?", url):
                continue  # samengestelde links en kale preconnect-hosts overslaan
            try:
                req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "linkcheck"})
                urllib.request.urlopen(req, timeout=10)
            except urllib.error.HTTPError as e:
                if e.code not in (403, 405, 429):
                    broken.append(("(extern)", f"{url} → {e.code}"))
            except Exception as e:
                broken.append(("(extern)", f"{url} → {type(e).__name__}"))
    print(f"{checked} lokale links gecontroleerd" + (f", {len(externs)} externe" if extern else ""))
    for page, link in sorted(broken):
        print(f"  KAPOT  {page}: {link}")
    print("Alles in orde." if not broken else f"{len(broken)} kapotte link(s).")
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
