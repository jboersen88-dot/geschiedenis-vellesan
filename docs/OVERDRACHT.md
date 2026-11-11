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


## Stand van de grote klus (11 november 2026, 's nachts)
De volledige opdracht staat in `~/Claude/geschiedenis-werk/opdracht-2026-11-10.md` (buiten de repo; lees die eerst). Regels daarin gelden: fases in volgorde, hulpagenten (Sonnet: dia's, afleiders, bouwen naar jouw opzet; Haiku: checks, screenshots, bestanden zoeken), niets meer in de oude Google-opzet.
- **Af en gepusht**: fase 1 (hoofdstukpagina, leeromgeving, oefenomgeving van H2 en H1; changelog 10 nov) en fase 2 (persoonlijke oefenroute H1 en H2: `economie/route.js`, `bouw-route.py`, tabblad Mijn route; changelog 11 nov). Checks op 0. Screenshots voor/na in `~/Claude/geschiedenis-werk/screenshots/`.
- **Nog open uit fase 1/2**: Edu-Racer alleen tot het keuzescherm getest; memory en rekentrainer na de herbouw niet opnieuw geklikt (code ongewijzigd). `voor-en-na.html` komt aan het eind.
- **Volgende stap: fase 3** (jaar 3 mavo H3 "De bank en jouw geld", 3.1 t/m 3.4). Plan: (1) bronnen in `~/Claude/geschiedenis-werk/bronnen.md` deel B (PowerPoints 3.1–3.4, "Economie jaar 3 Hoofdstuk 3 alle stukken tekst (2025).docx" alleen lezen, rekenoefeningen enkelvoudige/samengestelde rente en kredietkosten met antwoorden, toets+nakijkblad als die er is); (2) Sonnet-agent: PowerPoints → `economie/j3h3/slides/3.x/` met klikstappen (`tools/dias/README.md`, `stappen.py`) en `deck.json`/`steps.json`; (3) `economie/j3h3/data.json` met de hand (pars, kernvragen en filmpjes uit `economie/data/paginas.json` pagina jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld, begrippen uit de lesstof, geen uitgeverstekst letterlijk) + RIJK-regel in economie.js + foto's in `economie/img/j3h3/` (eigen beelden van de docent of Unsplash); (4) oefenomgeving: er is geen oude lesapp, dus een nieuwe generieke `economie/oefen.js` die uit `oefen.json` een oefenomgeving bouwt (begrippen, quiz per paragraaf, rekentrainer via route.js-generatoren + nieuwe: samengestelde rente, kredietkosten; Swipe & Scoor en memory; Mijn route via route.json met leerdoelen en generatoren voor j3h3); (5) digitale oefentoets via `bouw-toets.py` als er een toets met nakijkblad is; (6) checks, screenshots 375/820, changelog, push.
- Daarna fase 4 (jaar 4 H5 "Kan de overheid dat regelen?", zelfde aanpak), fase 5 (overige hoofdstukken uit de oude opzet).
- Eindrapport voor de docent in `~/Claude/geschiedenis-werk/eindrapport.md` (nog te schrijven): te controleren zijn o.a. de herschreven afleiders in `economie/j2h1/bron/toetsen.json` (10 nov), de indeling van quizvragen in leerdoelen/niveaus (`bouw-route.py`) en de 3-ster rekenvragen (route.js). Worker-instructies: `~/Claude/geschiedenis-werk/worker-jaar2.md`.

## Harde regels
- Meerkeuze: exact 4 opties, elk op een eigen regel met witruimte, ongeveer even lang, het juiste antwoord niet steeds het langste (`tools/vragencheck.py`).
- Vóór elke push: `python3 -I tools/vragencheck.py`, `python3 -I tools/linkcheck.py`, `python3 -I tools/a11ycheck.py`, en een browsertest (python3 -m http.server) op 375 en 820 px.
- Huisstijl: bosgroen #1f5f4e, koraal #ff8d90 (als tekst op crème #c2484d), teal #2f8f86, crème #f6f0e6; Fraunces + Inter; prefers-reduced-motion; perfect op iPad.
- AI-nakijker: Claude Haiku 5.5 via de Cloudflare Worker (`nakijker.js`, `ai.js`). Nooit een API-sleutel, lesstof of leerlinggegevens in de repo; geen naam/klas meesturen.
- Verzin geen feiten, citaten, video- of schooltv-URL's. Alleen beelden met duidelijke rechten (aanpak: `docs/spotprenten-bronnen.md`). Geen privéfoto's.
- Na wijzigingen in `app.html`: `python3 -I boekje-2/bouw.py` opnieuw draaien.
- Commit en push na elke werkende stap (eerst `git pull --rebase origin main`); houd `changelog.md` bij.
- Houd je context klein: werk in afgeronde stukken en laat grote mechanische klussen zo nodig in een eigen sessie doen. Raakt je context vol, werk dan dit bestand bij en ga verder in een nieuw gesprek.
