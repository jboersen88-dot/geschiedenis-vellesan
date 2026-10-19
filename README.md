# Meneer Boersen · Geschiedenis en Economie

Interactieve leeromgeving voor het Vellesan College (mavo), als opvolger van de Google Site.

**Live:** https://jboersen88-dot.github.io/geschiedenis-vellesan/

Statische HTML/CSS/JS, zonder build-stap of framework, gehost via GitHub Pages vanaf `main`. Nog niet gekoppeld aan meneerboersen.nl.

## Indeling

| Pagina | Wat |
|---|---|
| `index.html` | **Kaft** "Meneer Boersen": kies Economie of Geschiedenis |
| `geschiedenis.html` | **Geschiedenis jaar 3**: de vier boekjes (3 en 4 volgen in het tweede deel van het jaar) |
| `boekje-1.html` | Boekje 1 *De industriële samenleving in Nederland*: startpagina met de vier hoofdstukken |
| `app.html` | Leeromgeving boekje 1: Leer → Oefen → Test, dia's, Oefenlab, oefentoetsen, filmpjes. Deep links: `app.html#H2`, `#H3-lab`, `#toets`, `#films` |
| `boekje-2/` | Boekje 2 *Sociale zekerheid en verzorgingsstaat in Nederland*: `index.html`, `app.html`, `onderzoek.html` (Kijkwijzer, onderzoek, bronnen), `examentraining.html` |
| `economie/` | Economie, nagebouwd van meneerboersen.nl. Route: jaar (`index.html`) → niveau (`jaar.html?j=jaar-3`) → hoofdstukken (`jaar.html?j=jaar-3&n=mavo`) → hoofdstuk (`h.html?p=…`). Jaar 2 en 4: mavo; jaar 3: mavo, havo/vwo volgt. Lesapps in `economie/apps/`, eigen beelden in `economie/img/` |
| `toets.html` | Online oefentoetsen met klok en AI-nakijker (`?t=t1` H1+H2, `t2` H3+H4, `t3` H1–H4) |
| `spotprent.html` | Spotprenten analyseren met de Kijkwijzer, klikbare onderdelen, hints en AI-feedback. Bronnen en rechten: `docs/spotprenten-bronnen.md` |
| `racer.html` | Geschiedenis-Racer (quiz-race met sorteerspel) |
| `doeboek.html` | Doe-boek H4 als online widget |
| `kaart.html`, `beeldquiz.html`, `verhaal.html`, `filmvragen.html`, `nakijken.html` | Crisiskaart, beeldquiz, scroll-verhaal, filmvragen, AI-nakijker voor open vragen |
| `presenteer.html?h=H1` | Dia's schermvullend presenteren in de klas |
| `3d-arbeiderswoning.html` | 3D-simulatie van een arbeiderswoning (sociale kwestie) |

## Toets op maat

Op de Start-tab van `app.html` kiest een leerling onderwerpen uit de checklist en maakt de AI daar een eigen toets over (meerkeuze en open vragen), die daarna per leerling wordt nagekeken. De Worker doet het werk (`toetsmaken`); de lesstof en de API-sleutel staan daar, niet hier. Alleen boekje 1; boekje 2 heeft de functie uit (`var MAAT=0;`). Details en kosten: `changelog.md`.

## AI-nakijker

`nakijker.js` (toetsen, spotprenten) en `ai.js` ("Leg uit", nakijken, kaart, doe-boek) sturen antwoorden naar een Cloudflare Worker met Claude Haiku 5.5. De API-sleutel en de lesstof staan in de Worker, **niet** in deze repo. Er gaan geen namen of klassen mee. Werkt de Worker niet, dan valt de site terug op zelf nakijken.

## Inhoud aanpassen

- **Vragen boekje 1**: in `app.html` staat de vragenbank in `var BANK=[[hoofdstuk, vraag, [juist, fout, fout, fout], uitleg], ...]`. Het eerste antwoord is het juiste; de app schudt de volgorde.
- **Racer**: vragen bovenaan `racer.html` (`goed:` en precies 3 `fout:`), met uitleg in het bestand.
- **Boekje 2**: inhoud staat in `boekje-2/data-bron.py`. Daarna opnieuw bouwen met `python3 -I boekje-2/bouw.py`. Dat bouwt `boekje-2/app.html` uit de nieuwste `app.html`, dus draai dit ook na elke wijziging aan `app.html`.
- **Oefentoetsen**: `data/toetsen.js` (`o:` opties, `j:` index van het juiste antwoord).

## Kwaliteitscontrole

Draai vóór elke push vanuit de root van de repo:

```bash
python3 -I tools/vragencheck.py
```

```bash
python3 -I tools/linkcheck.py
```

```bash
python3 -I tools/a11ycheck.py
```

- **vragencheck**: alle meerkeuzevragen moeten precies 4 opties hebben die ongeveer even lang zijn (langste / kortste ≤ 1,5, antwoorden ≤ 20 tekens tellen niet mee), en het juiste antwoord mag per vragenbank in hooguit 25% van de vragen het langste zijn. Met `-v` zie je ook welke vragen dat zijn.
- **linkcheck**: alle lokale links en bestanden; met `--extern` ook externe links.
- **a11ycheck**: `lang`, viewport, titel, alt-teksten, knoppen en links met een naam, labels bij invulvelden, dubbele id's, `prefers-reduced-motion`.

Elk script stopt met exit-code 1 bij fouten. Automatisch draaien bij elke push (GitHub Actions) kan pas als het gh-account het recht `workflow` heeft (`gh auth refresh -s workflow`).

### Vragencontrole voor de docent

`tools/vragen-controle.html` laat alle meerkeuzevragen zien met het juiste antwoord, de lengtes en de vlaggen van `vragencheck.py`, met filters en knoppen Goed / Fout / Twijfel (bewaard in je browser) en een export van je oordelen. Niet gelinkt vanaf de leerlingsite. Gebruik:

```bash
python3 -I tools/vragen-export.py && python3 -m http.server 8000
```

Open daarna `http://localhost:8000/tools/vragen-controle.html`. Draai het exportscript opnieuw als vragen zijn gewijzigd.

## Huisstijl

Bosgroen `#1f5f4e`, koraal `#ff8d90` (als tekst op crème `#c2484d`), teal `#2f8f86`, crème `#f6f0e6`. Fraunces voor koppen, Inter voor tekst. Licht en donker via CSS-variabelen. Alle animaties respecteren `prefers-reduced-motion`.

## Bronvermelding beeldmateriaal

- PowerPoints, lesteksten en lesbeelden: J. Boersen.
- Flow-beelden (`img/flow/`): AI-illustraties, gemaakt door de docent.
- Spotprenten: zie `docs/spotprenten-bronnen.md` (per prent maker, jaar, bron en licentie).
- Jonge arbeidsters in een vlasfabriek, 1900: Industriemuseum Gent, [CC0 via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jonge_arbeidsters_aan_het_werk.jpg).

Lesstof van de uitgever staat niet letterlijk in deze openbare repo.

## Logboek

Alle wijzigingen en beslissingen staan in `changelog.md`.
