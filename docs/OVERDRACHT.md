# Overdracht: website Meneer Boersen afmaken

**Regel: elke nieuwe PowerPoint op de site krijgt ALTIJD ook klikstappen (`tools/dias/stappen.py`); losse dia's zonder animaties zijn niet af.**

Voor een nieuw gesprek dat verder bouwt. Werk in `~/Claude/geschiedenis-vellesan`.

## Start (in deze volgorde)
1. `git pull --rebase origin main` (repo github.com/jboersen88-dot/geschiedenis-vellesan, live op https://jboersen88-dot.github.io/geschiedenis-vellesan/, gh is ingelogd).
2. Lees `README.md`, de bovenste entries van `changelog.md`, `~/Claude/website-analyse-2026-10-18.md` (afvinklijst, 19 opties, top 5) en `~/Claude/ai-oefentoetsen/ONTWERP.md` (alleen "Klaar voor de website" en wat BESLOTEN is).
3. De besluiten van de docent staan in `docs/besluiten.md` (2026-10-18). Volg die; punten die daar "open" staan laat je liggen.

## Opbouw (besloten door de docent, niet veranderen)
- `index.html` = kaft "Meneer Boersen … leert je hoe de wereld werkt" met keuze Economie / Geschiedenis.
- Economie (`economie/`, JS-gestuurd uit `economie/data/paginas.json` via `economie/economie.js`): jaar (2, 3, 4) → niveau (jaar 2: mavo; jaar 3: mavo of havo/vwo; jaar 4: mavo) → hoofdstukken → hoofdstukpagina. Havo/vwo jaar 3 staat op "Volgt binnenkort".
- Geschiedenis: `geschiedenis.html` (jaar 3, vier boekjes; 3 en 4 komen in het tweede deel van het jaar) → `boekje-1.html` (De industriële samenleving in Nederland, leeromgeving `app.html`) en `boekje-2/` (Sociale zekerheid en verzorgingsstaat in Nederland, gebouwd met `boekje-2/bouw.py`; de docent maakt de PowerPoints zelf).
- Behoud de inhoud van meneerboersen.nl (https://sites.google.com/view/meneerboersen/).

## Wat er nog moet
- **Economie-meerkeuze volgens de regels**: `python3 -I tools/vragencheck.py` meldt 250 fouten, allemaal in `economie/apps/*.html` (ongeveer 1.350 vragen). Herschrijf vooral de foute antwoorden tot de check op 0 staat; het juiste antwoord niet inhoudelijk veranderen; geen nieuwe feiten.
- **Bestanden van Google Drive**: de bestanden die op de site kunnen, staan op de Google Drive van de docent; daar mag je bij. Gebruik de Google Drive-connector (search_files / list_recent_files / read_file_content / download_file_content). Zoek o.a. PowerPoints en materiaal voor Economie (ook havo/vwo jaar 3) en Geschiedenis boekje 2. PowerPoints → exacte dia's met `tools/dias/`. Vraag eerst of PowerPoints in de openbare repo mogen. Lesstof van een uitgever niet letterlijk in de openbare repo.
- Overige punten uit de afvinklijst en "Nog open" in `changelog.md`, bijvoorbeeld Economie-hoofdstukken verrijken zoals jaar 2 H2 (eigen beelden + galerij, zie `BEELDEN` in `economie.js`) en de Economie-lesapps naar het niveau van de Geschiedenis-app tillen.

## Harde regels
- Meerkeuze: exact 4 opties, elk op een eigen regel met witruimte, ongeveer even lang, het juiste antwoord niet steeds het langste (`tools/vragencheck.py`).
- Vóór elke push: `python3 -I tools/vragencheck.py`, `python3 -I tools/linkcheck.py`, `python3 -I tools/a11ycheck.py`, en een browsertest (python3 -m http.server) op 375 en 820 px.
- Huisstijl: bosgroen #1f5f4e, koraal #ff8d90 (als tekst op crème #c2484d), teal #2f8f86, crème #f6f0e6; Fraunces + Inter; prefers-reduced-motion; perfect op iPad.
- AI-nakijker: Claude Haiku 5.5 via de Cloudflare Worker (`nakijker.js`, `ai.js`). Nooit een API-sleutel, lesstof of leerlinggegevens in de repo; geen naam/klas meesturen.
- Verzin geen feiten, citaten, video- of schooltv-URL's. Alleen beelden met duidelijke rechten (aanpak: `docs/spotprenten-bronnen.md`). Geen privéfoto's.
- Na wijzigingen in `app.html`: `python3 -I boekje-2/bouw.py` opnieuw draaien.
- Commit en push na elke werkende stap (eerst `git pull --rebase origin main`); houd `changelog.md` bij.
- Houd je context klein: werk in afgeronde stukken en laat grote mechanische klussen zo nodig in een eigen sessie doen. Raakt je context vol, werk dan dit bestand bij en ga verder in een nieuw gesprek.
