# Overzicht: de website van Meneer Boersen

Geschreven op 18 november 2026. Dit is de kaart van alles wat er is: de site, de games, het systeem voor opdrachten en toetsen, wat er verbeterd is en welke regels gelden. De regels zelf staan kort en bindend in [`CLAUDE.md`](../CLAUDE.md) in de root. Dit document legt uit waarom en hoe.

Bronnen voor dit overzicht: deze repo (code, `README.md`, `changelog.md`, `docs/`), de git-geschiedenis en de 4 pull requests, de repo EDU-Racer-Kids, en de notities van eerdere gesprekken in `~/Claude/` op de Mac van de docent.

## 1. In één minuut

- **Wat**: een leeromgeving voor Geschiedenis en Economie van het Vellesan College, als opvolger van de Google Site meneerboersen.nl.
- **Live**: https://jboersen88-dot.github.io/geschiedenis-vellesan/ (GitHub Pages, vanaf `main`).
- **Techniek**: gewone HTML, CSS en JavaScript. Geen framework, geen build-stap voor de site zelf. Python-scripts bouwen de herhaalde pagina's uit databestanden.
- **AI**: Claude Haiku 5.5 kijkt open vragen na en maakt toetsen op maat, via een Cloudflare Worker. De API-sleutel en de lesstof staan in de Worker, nooit in deze repo.
- **Privacy**: voortgang staat alleen op het apparaat van de leerling (localStorage). Geen namen, geen klassen, niets centraal.
- **Voor wie**: leerlingen van jaar 2 tot en met 4 (vooral mavo, één hoofdstuk 3 havo/vwo) op iPads in Safari, en het digibord in de klas. Veel leerlingen lezen moeilijk: korte zinnen, weinig tekst tegelijk, alles binnen twee tikken.
- **Het voorbeeld voor al het nieuwe werk**: Economie jaar 2 mavo hoofdstuk 2 (`economie/h.html?p=jaar-2/mavo/hoofdstuk-2`). Daar zijn leren en oefenen gescheiden. Zie hoofdstuk 3.

## 2. Omvang in cijfers

| Wat | Aantal |
|---|---|
| Bestanden in deze repo | 3.219 (ongeveer 355 MB met geschiedenis) |
| Daarvan JPG | 3.059, waarvan 2.874 dia's en klikstappen |
| HTML-pagina's | 45 |
| JavaScript / Python / JSON | 22 / 16 / 31 |
| Filmpjes (mp4) | 20, allemaal van de open-dag-rondleiding |
| Meerkeuzevragen (gecontroleerd door `vragencheck.py`) | 2.393, 0 fouten |
| Lokale links (gecontroleerd door `linkcheck.py`) | 349, 0 fouten |
| Economie-pagina's uit de oude Google Site | 42 in `economie/data/paginas.json` |
| Commits op `main` | ruim 54 sinds 17 oktober 2026, in 8 werkdagen met veel werk |

Verdeling per map: `economie/` 2.311 bestanden, `slides/` 716, `img/` 58, `rondleiding/` 52, `boekje-2/` 34, de root 21, `tools/` 12.

## 3. Het model: leren en oefenen gescheiden

De docent is het meest tevreden over Economie jaar 2 mavo hoofdstuk 2. Elk nieuw hoofdstuk, in elk vak, volgt deze opzet in drie lagen:

1. **Hoofdstukpagina** (`h.html?p=<pad>`): hero, één kaart per paragraaf met een ringetje voor de stand, en een groene band naar de oefenomgeving. "Ga verder met 2.x" als de leerling al bezig was.
2. **Leren: de leeromgeving per paragraaf** (`h.html?p=<pad>&par=2.1`). Hier staat de informatie: de PowerPoint als klikbare dia's met klikstappen, de filmpjes, de begrippenkaarten en "Check jezelf" (de leerdoelen als vragen, één tegelijk). Een stappenbalk (Dia's, Filmpjes, Begrippen, Check jezelf, Oefen) vinkt af wat gedaan is.
3. **Oefenen: de oefenomgeving** (`economie/<map>/oefen.html`). Hier wordt de stof verwerkt: Overzicht met "Jouw volgende stap", Mijn route (persoonlijke oefenroute), Oefenlab (Begrippen, Leg uit, Welke formule?, Rekentrainer, Quiz, Games) en Oefentoetsen (digitaal met klok en nakijken, plus de Word-versies).

De scheiding is de kernregel: informatie staat in de leeromgeving, verwerken en oefenen in de oefenomgeving. Lesstof en filmpjes staan niet in de oefenomgeving, en begrippen oefenen of quizzen staat niet tussen de lesstof. De twee delen gebruiken dezelfde opslag, dus afvinken in het ene telt mee in het andere.

## 4. Hoe de site is opgebouwd

Route: kaft, vak, jaar, niveau, hoofdstuk.

```
index.html                      kaft: kies Economie of Geschiedenis
├── geschiedenis.html           Geschiedenis jaar 3: vier boekjes (3 en 4 volgen)
│   ├── boekje-1.html           De industriële samenleving in Nederland
│   │   └── app.html            leeromgeving boekje 1 (alles in één pagina met tabs)
│   └── boekje-2/               Sociale zekerheid en verzorgingsstaat in Nederland
│       ├── index.html, app.html (gebouwd), onderzoek.html, examentraining.html
│       └── doeboek.html?h=1|2
├── economie/
│   ├── index.html              start Economie
│   ├── jaar.html?j=jaar-3&n=mavo   jaar en niveau
│   ├── h.html?p=<pad>[&par=2.1]    hoofdstukpagina en leeromgeving per paragraaf
│   ├── <map>/oefen.html, toets.html, data.json, route.json, slides/, bron/
│   ├── se3/app.html            jaar 4 SE 1 (H1 en H2, map heet nog se3): leeromgeving in de opzet van boekje 1
│   └── apps/                   de oude lesapps van de Google Site (bron voor de bouwscripts)
├── losse onderdelen Geschiedenis: toets.html, spotprent.html, spotprent-opdrachten.html,
│   racer.html, kaart.html, beeldquiz.html, verhaal.html, filmvragen.html, nakijken.html,
│   doeboek.html, presenteer.html
├── rondleiding/                open dag: "Missie Vellesan", rondleiding met QR-speurtocht en mini-games (staat los van de lessite)
├── slides/, img/, data/, materiaal/   dia's, beelden, databestanden, de 4 PowerPoints van boekje 1
├── tools/                      controles, dia-gereedschap, docentpagina's
└── docs/                       besluiten, overdracht, dit overzicht
```

### 4.1 Geschiedenis

- **Boekje 1** (`app.html`, ongeveer 205 KB, alles in één bestand): tabs Start, Lesstof, Oefenlab, Oefentoetsen, Oefenmateriaal en Filmpjes. 77 vragen "Kun jij dit beantwoorden?" met voortgangsring, dia-viewer met klikstappen (4 PowerPoints: 21, 9, 27 en 44 dia's), interactieve kijkplaten met bolletjes (`data/galerij.js`), quiz met 130 vragen in twee niveaus (Basis en Uitdaging), toets op maat met AI (32 onderwerpen) en de voortgangscode.
- **Startpagina boekje 1** (`boekje-1.html`): hero met parallax, hoofdstukkaarten, tijdlijn met een beeld per jaartal en "Schat het eerst" (zes schatvragen met een schuif).
- **Boekje 2** (`boekje-2/`): `app.html` wordt gebouwd uit de `app.html` van boekje 1 plus `boekje-2/data-bron.py`. Daarnaast de Kijkwijzer en onderzoeksopdrachten, examentraining (11 vragen met bronnen) en de doe-boeken H1 en H2 (51 en 53 vragen, datagestuurd). Dia's in `slides/SZ1` (44) en `slides/SZ2` (35). Hoofdstuk 3 en 4 hebben nog geen PowerPoint.
- **Boekje 3 en 4**: nog niet gebouwd, wachten op lesstof.

### 4.2 Economie

Alles wordt gestuurd vanuit `economie/economie.js` en `economie/data/paginas.json` (de 42 pagina's van de oude Google Site). Een hoofdstuk krijgt de nieuwe opzet zodra het een regel in `RIJK` heeft.

| Hoofdstuk | Map | Hoofdstukpagina en leeromgeving | Oefenomgeving | Mijn route | Digitale toets |
|---|---|---|---|---|---|
| Jaar 2 mavo H1 "Wat heb je nodig?" | `j2h1` | ja | ja, met Edu-Racer | ja | 2 (A en B) |
| Jaar 2 mavo H1, GL-versie | `j2h1gl` | ja | nee | nee | nee |
| **Jaar 2 mavo H2 "Jij en je geld"** (het voorbeeld) | `j2h2` | ja | ja, met Edu-Racer | ja | 3 (1-, 2- en 3-ster) |
| Jaar 2 mavo H3 "Aan het werk?" | `j2h3` | ja | ja | nee | 1 |
| Jaar 2 mavo H4 "Hoe maken we het?" | `j2h4` | ja | ja | nee | 1 |
| Jaar 2 mavo H5 "Is handel iets voor jou?" | `j2h5` | ja | ja | nee | 1 |
| Jaar 2 mavo H6 "Wat doet de overheid?" | `j2h6` | nee (geen bruikbare PowerPoints) | ja | nee | 1 |
| Jaar 3 mavo H0 rekenvaardigheden | `j3h0` | formulepagina | nee | nee | nee |
| Jaar 3 mavo H1 "Hoe welvarend ben jij?" | `j3h1` | ja | ja | nee | 1 |
| Jaar 3 mavo H2 "Wat voor consument ben jij?" | `j3h2` | ja | ja | nee | 1 |
| Jaar 3 mavo H3 "De bank en jouw geld" | `j3h3` | ja | ja | nee | 1 |
| Jaar 3 mavo H4 "Kies je voor zekerheid?" | `j3h4` | ja (4.2 zonder PowerPoint) | ja | nee | 1 |
| Jaar 3 mavo H5 "Is er werk voor jou?" | `j3h5` | ja | ja | nee | 1 |
| Jaar 3 mavo H6 "Productie en markt" | `j3h6` | ja | ja | nee | 1 |
| Jaar 3 mavo H8 "Over de grens" | `j3h8` | ja (8.3 zonder PowerPoint) | ja | nee | 1 |
| Jaar 3 mavo SE H1 + H3 (SE-pagina `jaar-3/mavo/se-1`) | `se13` | n.v.t. | n.v.t. | nee | 1 (oefen-SE) |
| Jaar 3 mavo SE H5 + H6 (SE-pagina `jaar-3/mavo/se-3-h5-h6`) | `j3se56` | n.v.t. | n.v.t. | nee | 1 (oefen-SE) |
| Jaar 3 mavo SE H7 + H8 (SE-pagina `jaar-3/mavo/se4-h7-h8`, stof van 4 mavo H7 en H8) | `j3se78` | n.v.t. | n.v.t. | nee | 1 (oefen-SE) |
| Jaar 3 havo/vwo H2 "De rol van geld" | `j3vh2` | ja | ja | ja | 2 |
| Jaar 4 mavo H1 "Verdien je genoeg?" | `j4h1` | ja | ja | nee | 1 |
| Jaar 4 mavo H2 "Geld moet rollen" | `j4h2` | ja | ja | nee | 1 |
| Jaar 4 mavo H3 "We gaan voor winst" | `j4h3` | ja | ja | nee | 1 |
| Jaar 4 mavo H4 "Aan het werk" | `j4h4` | ja | ja | nee | 1 |
| Jaar 4 mavo H5 "Kan de overheid dat regelen?" | `j4h5` | ja | ja | nee | 1 |
| Jaar 4 mavo H6 "De overheid en ons inkomen" | `j4h6` | ja | ja | nee | 1 |
| Jaar 3 mavo H7 "De overheid voor ons allemaal" | `j3h7` | ja | ja | nee | 1 |
| Jaar 4 mavo SE H5 + H6 + H7 (SE-pagina, `SE` in `economie.js`) | `se56` | n.v.t. | n.v.t. | nee | 1 (oefen-SE) |
| Jaar 4 mavo H7 "Nederland handelsland" | `j4h7` | ja | ja | nee | 1 |
| Jaar 4 mavo H8 "Welvaart wereldwijd" | `j4h8` | ja | ja | nee | 1 |
| Jaar 4 mavo SE H3 + H4 (SE-pagina `jaar-4/se4`) | `se34` | n.v.t. | n.v.t. | nee | 1 (oefen-SE) |
| Jaar 4 mavo SE H1 + H2 (SE-pagina boven `j4h1`, `j4h2` en `se3`) | `se3` | n.v.t. | n.v.t. | nee | oefen-SE van `se3` |
| Jaar 4 SE 1 (H1 en H2; map `se3`) | `se3` | eigen `app.html` zoals boekje 1 | in dezelfde app | nee | 4, plus toets op maat |

Alle andere hoofdstukken (jaar 2 H3 tot en met H6, jaar 3 mavo H3 tot en met H8, jaar 4 H1 tot en met H8) staan er in de overgangsvorm: de inhoud van de oude Google-pagina in de nieuwe opmaak, soms met een oude lesapp uit `economie/apps/`. De docent wil de oude Google-opzet helemaal weg hebben (besluit van 10 november). Die hoofdstukken moeten dus nog naar de opzet van hoofdstuk 3.

### 4.3 Open dag

`rondleiding/` is "Missie Vellesan", een losse app voor groep 7 en 8 op iPads: 19 stops op een 3D-plattegrond, per stop een filmpje (met kijk-rond-modus), uitleg en één kort spelletje. De missies gaan open door de QR-poster op die plek te scannen. Kinderen verzamelen spullen voor hun kluisje en kraken aan het eind de grote kluis. Inhoud in `rondleiding/data/stops.js`, kern in `rondleiding/js/quest.js`, games in `rondleiding/js/games-a.js` en `games-b.js` (contract `rondleiding/GAMES.md`, uitleg `rondleiding/SCHEMA.md`), posters maken met `rondleiding/tools/maak-qr.js`.

## 5. De games

### In deze repo

| Game | Waar | Hoe het werkt |
|---|---|---|
| **Geschiedenis-Racer** | `racer.html` | Race over 5 rijstroken, auto ontwijkt obstakels en raapt munten. Bij elke tankstop een minigame van 5 vragen: quiz, swipen (sorteren), vallende blokken, poorten, koppelen. Goede antwoorden geven benzine. 186 vragen en 10 sorteersets bovenaan het bestand. Geen klok bij meerkeuze, 100 punten per goed antwoord. |
| **Edu-Racer Economie** | in `economie/j2h1/oefen.html`, `j2h2/oefen.html` en `economie/apps/jaar-4_se-h1-h2-h8_1.html` | Dezelfde racemotor met economievragen (jaar 2 H2: 117 vragen en 16 sorteersets). Op de tegel staat "Vragen nog niet door de docent gecontroleerd" tot de docent ze heeft nagekeken (besluit 4). |
| **Swipe & Scoor** | Oefenlab, Games | Kaarten naar links of rechts vegen in de goede groep (sorteersets). |
| **Memory** | Oefenlab, Games | Begrip en omschrijving bij elkaar zoeken. |
| **Tijdlijn en Oorzaak & gevolg** | Oefenlab Geschiedenis | Gebeurtenissen in volgorde zetten, oorzaken aan gevolgen koppelen. |
| **Beeldquiz** | `beeldquiz.html` | Bij welk onderwerp hoort dit beeld? 9 beelden, meerkeuze. |
| **Crisiskaart** | `kaart.html` | Kaart New York, Rotterdam, Nederland met een schakelaar 1929 en 1935, en per plek een open vraag die de AI nakijkt. |
| **Scroll-verhaal** | `verhaal.html` | Vijf scènes van de crisis naar de welvaart, met cijfers die meelopen. |
| **Schat het eerst** | `boekje-1.html#cijfers` | Zes schatvragen met een schuif, daarna de echte waarde en uitleg. |
| **Spotprent analyseren** | `spotprent.html` | 11 prenten met de Kijkwijzer in 4 stappen, hints en AI-feedback per stap. |
| **Rondleiding** | `rondleiding/` | Missie Vellesan: QR-speurtocht met mini-games door het gebouw (open dag). |

### De racemotor (EDU-Racer)

De racer is ooit gebouwd als één HTML-bestand zonder externe bestanden, zodat hij ook op een Google Site werkte. Bovenaan staan `SPEL_INSTELLINGEN`, `VRAGEN` (met `goed:` en precies 3 keer `fout:`, het spel schudt zelf) en `SORTEERSETS`. Daaronder staat de spelcode met de regel "VANAF HIER NIETS AANPASSEN". De volledige bouwopdracht staat in `~/Claude/EDU-Racer/edu-racer-bouwopdracht.md`. De economie-racers worden gebouwd in `~/Claude/EDU-Racer/` (vragenbank in Python, `vragen/bouw.py`, `vragen/controleer.py`, sjabloon `spel/sjabloon.html`) en daarna in de oefenomgeving gezet met `bouw-oefen.py`.

### Buiten deze repo

| Wat | Repo | Live | Voor |
|---|---|---|---|
| **EDU-Racer-Kids** | `jboersen88-dot/EDU-Racer-Kids` | één bestand `edu-racer-kids.html` | Privé: de racer verbouwd voor drie kinderen, elk met eigen vragen, snelheid en minigames, voorlezen via de browser, geen game over. Geen lesmateriaal. |
| **EDU-Racer** (bouwplaats) | `jboersen88-dot/EDU-Racer` | geen | Vragenbanken en sjabloon van de economie-racers. |
| **Geldjacht H2** | `jboersen88-dot/geldjacht-h2` | `/geldjacht-h2/` | Speurtocht economie 2 mavo H2: QR-codes in de school, foto's die stukje voor stukje zichtbaar worden, pestkaarten, ranglijst, docentpagina en scorebord. |
| **Geldjacht 3V** | `jboersen88-dot/geldjacht-3v` | `/geldjacht-3v/` | Dezelfde speurtocht voor economie 3 vwo H1 en H2. |
| **Fabrieksjacht** | `jboersen88-dot/fabrieksjacht` | `/fabrieksjacht/` | Dezelfde speurtocht voor geschiedenis 3 mavo (boekje 1 en boekje 2 H1): 116 meerkeuze, 20 combinaties, 67 open vragen. |

De drie speurtochten hebben elk een eigen Cloudflare Worker (codes, pestkaarten, ranglijst) en kijken open vragen na via de AI-worker van de escape room. Hun geheime sleutels en pincodes staan in mappen `geheim/` op de Mac en als secret in Cloudflare, niet in een repo. Ze zijn nog niet gelinkt vanaf de lessite.

## 6. Het systeem voor opdrachten, oefenmateriaal en toetsen

### 6.1 Van lesmateriaal naar site

1. **Bron**: de PowerPoints, teksten, toetsen en nakijkbladen van de docent (OneDrive, Google Drive, Downloads). Lesstof van de uitgever komt nooit letterlijk in de repo.
2. **Dia's**: `tools/dias/` zet een PowerPoint om naar JPG's, en `stappen.py` maakt van de animaties klikstappen. Werkwijze in `tools/dias/README.md`. Dit draait op de Mac van de docent (PowerPoint en Swift).
3. **Databestanden**: de inhoud staat in data, niet in de pagina's.
4. **Bouwscripts** maken de pagina's:

| Script | Maakt |
|---|---|
| `boekje-2/bouw.py` | `boekje-2/app.html` uit `app.html` en `boekje-2/data-bron.py`. Draai dit na elke wijziging aan `app.html`. |
| `economie/bouw-pagina.py <map>` | `data.json` voor hoofdstukpagina en leeromgeving van een hoofdstuk zonder lesapp |
| `economie/maak-lesapp.py` | een lesapp uit `bron/lesapp.json` als er geen oude lesapp is |
| `economie/bouw-oefen.py <map>` | `oefen.html` en `data.json` (de oefenomgeving) |
| `economie/bouw-route.py <map>` | `route.json` voor Mijn route (indeling in `SPEC` in het script) |
| `economie/bouw-toets.py <map>` | `toets.html` uit `bron/toetsen.json` |
| `economie/bouw-eco.py se3` | `economie/se3/app.html` uit `app.html` en `se3/bron/` |

Volgorde voor een nieuw Economie-hoofdstuk: dia's maken, `bron/` vullen, een regel in `RIJK` (en `CONFIG` in de scripts), dan `bouw-pagina.py` of `maak-lesapp.py`, `bouw-route.py`, `bouw-oefen.py` en `bouw-toets.py`. Pas nooit een gebouwd bestand met de hand aan: pas de bron of het script aan en bouw opnieuw.

### 6.2 Vraagsoorten

- **Meerkeuze**: 4 opties, het spel of de pagina schudt de volgorde. Zie de regels in hoofdstuk 8.
- **Open vragen** met antwoordmodel en nakijkpunten: de AI kijkt na, anders kijkt de leerling zelf na met het model.
- **Rekenvragen met wisselende getallen** (generatoren in `economie/route.js` en `reken.js`): eerst de formule opschrijven of opzoeken, dan het getal.
- **Doe-boekvormen**: juist of onjuist, combineren, volgorde, ketting, wie ben ik, invulvelden, tabellen.
- **Sorteersets** voor Swipe & Scoor en de racer.

### 6.3 Mijn route (persoonlijke oefenroute)

Per leerdoel een vragenbank op drie niveaus. 1 ster is reproductie en de basisformule, 2 sterren is toepassen en moeilijkere getallen, 3 sterren is twee stappen combineren of uitleggen. De vraag wordt moeilijker, de taal niet.

- Instaptoets: één vraag op 2 sterren per leerdoel bepaalt het startniveau.
- Twee keer goed op rij is een ster erbij, twee keer fout op rij een ster eraf.
- Na een fout komt het leerdoel na drie andere vragen terug, altijd met korte uitleg.
- Het volgende leerdoel wordt geloot, zwaarder voor weinig sterren en recente fouten.
- Op drie sterren en drie keer goed vraagt de route de Worker om een nieuwe verdiepingsvraag.
- Na acht vragen een korte samenvatting.

De volledige regels staan bovenin `economie/route.js` en in `changelog.md` (11 november).

### 6.4 Toetsen

- **Digitale oefentoetsen** met klok (overleeft herladen): meerkeuze, bedragen en keuzes kijkt de pagina zelf na, uitlegvragen kijkt de AI na met het antwoordmodel van de docent. Geschiedenis: `toets.html?t=t1|t2|t3` uit `data/toetsen.js`. Economie: `economie/<map>/toets.html`.
- **Toets op maat**: de leerling kiest onderwerpen en de AI maakt een nieuwe toets, met een controleronde tegen de lesstof. Alleen boekje 1 en Economie SE3.
- **Een oefentoets is geen kopie van het proefwerk.** Hij oefent dezelfde soorten vragen, maar met andere situaties en met extra onderwerpen die niet per se in het proefwerk komen. Nooit het proefwerk met andere getallen.

### 6.5 De AI-nakijker

- `nakijker.js` (toetsen, spotprenten, kijkplaten, route) en `ai.js` (Leg uit, nakijken, kaart, doe-boek) praten met de Worker `geschiedenis-nakijker`. De code van de Worker staat in `~/Claude/ai-oefentoetsen/nakijker-worker/`, niet in deze repo.
- Acties: `nakijken` (met hoofdstukcodes zoals `H1` tot `H4`, `SZ`, `E2H1`, `E2H2`, `E4-1.1`) en `toetsmaken` (`vak` leeg voor Geschiedenis, `eco4` voor SE3, `eco2` voor de verdieping in Mijn route).
- Alleen de site zelf en localhost mogen de Worker aanroepen. Er zit een rem op het aantal aanroepen en een maandlimiet in de Anthropic-console.
- Werkt de Worker niet, dan valt alles terug op zelf nakijken of de vragenbank. De site blijft altijd bruikbaar.
- Kosten: een toets op maat ongeveer een cent, een open vraag nakijken minder dan een halve cent.

### 6.6 Voortgang

- Alles in localStorage, per onderdeel een eigen sleutel (bijvoorbeeld `gs3-…` boekje 1, `gs3-szv-app-v1` boekje 2, `h1-app-v1` en `h2v2-app-v1` Economie jaar 2, `eco-route-<map>-v1` Mijn route, `eco-laatst-<map>`, `deck-…` voor de dia waar je was).
- **Voortgangscode**: de leerling kopieert een code en levert die in via Teams of Magister. `GS1-…` voor de boekjes, `RT-…` voor Mijn route. De docent leest ze met `tools/voortgang-lezen.html` (lokaal).
- Bestaande sleutels en deep links veranderen nooit, anders is de voortgang van leerlingen weg.

### 6.7 Gereedschap voor de docent (lokaal, niet gelinkt vanaf de site)

- `tools/vragen-controle.html`: alle meerkeuzevragen met het juiste antwoord, met knoppen Goed, Fout en Twijfel.
- `tools/voortgang-lezen.html`: voortgangscodes lezen, met een samenvatting per klas.
- `~/Claude/geschiedenis-controle/`: lijstjes met twijfelplekken in de lesstof, per hoofdstuk.

## 7. Wat er gebouwd en verbeterd is

| Wanneer | Wat |
|---|---|
| 17 okt | Van kale showcase naar echte leeromgeving: `app.html` overgezet uit de Google Sites-app naar de huisstijl. Dia-viewer, presenteermodus, toetsen met klok, racer, filmvragen, scroll-verhaal, kaart, beeldquiz, doe-boek H4. Meerkeuze herschreven volgens de regels (het juiste antwoord was in 74% het langste). AI-nakijker live via de Worker. Boekje 2 in eerste opzet. |
| 18 okt | Alles van Gemini naar Claude. Economie nagebouwd van meneerboersen.nl (42 pagina's, 9 lesapps). Nieuwe opbouw kaft, vak, jaar, niveau, hoofdstuk. Drie controlescripts. Besluiten van de docent vastgelegd. Bijna 500 economievragen herschreven tot 0 fouten. |
| 19 okt | Toets op maat. Quiz met twee niveaus. Leeromgeving opgeruimd (tab Oefenmateriaal, één vragenlijst per paragraaf, Oefenlab opent leeg). Racer zonder klok. 3D-woning verwijderd. Vragencontrole voor de docent. |
| 20 okt | Economie jaar 4 SE3 als volledige leeromgeving met `bouw-eco.py`. Kaft professioneler gemaakt (was te kinderlijk). |
| 28 en 29 okt | Dia-animaties als klikstappen, eerst H4 en daarna alles. Interactieve kijkplaten. Voortgangscode. Doe-boeken H1 en H2 van boekje 2. De goede PowerPoints van boekje 2. Controle van de hele Geschiedenis-kant. Lettertype blokkeert het laden niet meer. Werklozen 1935 overal gelijk. |
| 5 en 6 nov | Economie in de nieuwe opzet: startpagina, jaarpagina's, alle oude hoofdstukpagina's. Jaar 2 H2 als voorbeeld: hoofdstukpagina, leeromgeving per paragraaf en oefenomgeving gescheiden. Daarna H1, de GL-versie en jaar 3 mavo H0, H1 en H2. Digitale toetsen jaar 2. |
| 9 tot 11 nov | De grote klus. Fase 1: stappenbalk, begrippenkaarten, Check jezelf, Ga verder, donkere modus en Jouw volgende stap. Een bug met dataverlies gerepareerd. Edu-Racer bij H2. Fase 2: Mijn route voor jaar 2 H1 en H2. |
| 13 nov | Economie 3 havo/vwo H2 "De rol van geld" compleet. Afbeeldingen uit het boek in de dia's vervangen door eigen beelden en grafieken. |
| 13 tot 17 nov | Buiten deze repo: Fabrieksjacht, Geldjacht H2 en Geldjacht 3V. |
| 18 nov | Open dag: rondleiding met QR-speurtocht (pull requests 1 tot en met 4). |

Terugkerende verbeteringen, die nu vaste regels zijn:

- Meerkeuze die het antwoord niet verraadt door de lengte.
- Minder tegelijk op het scherm: Oefenlab opent leeg, één vraag tegelijk, keuzemenu's in plaats van alles onder elkaar.
- Dubbele dingen weg: leerdoelen en kernvragen zijn één lijst, elke toets staat één keer op de pagina, de begroting kwam twee keer voor in een toets.
- Van downloads naar onderdelen op de pagina: dia's, toetsen en doe-boeken werken in de browser.
- Altijd een terugval als de AI of Google Drive niet werkt.
- Geen feiten die niet in de lesstof staan (de jaartallen op de kaft kwamen niet uit de lesstof en zijn vervangen).

## 8. De richtlijnen

De korte, bindende versie staat in [`CLAUDE.md`](../CLAUDE.md). Hieronder dezelfde regels met de reden erbij.

### Opzet en didactiek

- **Leren en oefenen gescheiden**, zoals in jaar 2 hoofdstuk 2 (hoofdstuk 3 van dit document).
- **Voor zwakke lezers**: korte zinnen, weinig tekst tegelijk, alles binnen twee tikken, dingen die stap voor stap verschijnen.
- **Elke nieuwe PowerPoint krijgt klikstappen.** Losse dia's zonder animaties zijn niet af.
- **Niveaus**: 1, 2 en 3 sterren. De vraag wordt moeilijker, de taal niet.
- **Formules altijd met haakjes, zoals de docent ze schrijft**: (nieuw − oud) : oud × 100, (deel : geheel) × 100, (percentage : 100) × totaal. Bij rekenvragen eerst de formule laten opschrijven of opzoeken, nooit meerkeuze voor de formule.
- **Open vragen**: in de vraag staat precies wat de leerling moet beantwoorden. Alles waarop nagekeken wordt, wordt ook gevraagd.
- **Oefentoets is geen kopie van het proefwerk** (zie 6.4).
- **Niets meer in de oude Google-opzet**: geen paarse lesapps, geen pagina's die alleen Drive-bestanden tonen.

### Meerkeuze (gecontroleerd door `tools/vragencheck.py`)

- Precies 4 opties, elk op een eigen regel met witruimte, volgorde geschud.
- Ongeveer even lang: de langste is hooguit 1,5 keer de kortste. Antwoorden van 20 tekens of korter tellen niet mee.
- Het juiste antwoord is per vragenbank in hooguit 25% van de vragen het langste.
- Geen "alle antwoorden zijn goed".
- Bij herschrijven: alleen de foute antwoorden aanpassen, het juiste antwoord inhoudelijk niet veranderen, geen nieuwe feiten.

### Vormgeving

- **Kleuren**: bosgroen `#1f5f4e`, koraal `#ff8d90` (als tekst op crème `#c2484d`), teal `#2f8f86`, crème `#f6f0e6`.
- **Letters**: Fraunces voor koppen, Inter voor tekst. De lettertype-stylesheet laadt niet blokkerend (`media="print" onload`), anders blijft de pagina leeg achter een schoolfilter.
- **Licht en donker** via CSS-variabelen.
- **Beweging**: rustige fades, stap voor stap, inzoomen vanuit een overzicht. Alleen `transform` en `opacity`. Alles respecteert `prefers-reduced-motion`.
- **Uitstraling**: licht, fris en professioneel. Niet kinderlijk (de eerste kaft met spaarvarken is om die reden vervangen) en geen standaard AI-website. De docent heeft hiervoor ontwerp-skills op de Mac staan in `~/.agents/skills/` (onder andere design-taste-frontend, high-end-visual-design, redesign-existing-projects, minimalist-ui, animate).
- **Schermen**: perfect op iPad in Safari (820 px) en telefoon (375 px), ook 1280 px voor het digibord. Geen horizontaal scrollen.
- **Beelden**: eigen beelden en AI-illustraties van de docent (met het label "AI-illustratie"), Unsplash, of publiek domein met bronvermelding. Verkleinen naar ongeveer 1200 px en hooguit een paar honderd KB.

### Inhoud en rechten

- **Verzin niets**: geen feiten, citaten, video-adressen of Schooltv-links. Alleen wat in het lesmateriaal van de docent staat. Zwijgt de lesstof, stel dan een vraag aan de leerling.
- **Uitgever**: lesstof, uitwerkingen en afbeeldingen van de uitgever (Noordhoff, Pincode) staan niet letterlijk in deze openbare repo. Eigen woorden, eigen grafieken met dezelfde cijfers en bronvermelding.
- **Beeldrechten**: alleen beelden met duidelijke rechten. Geen privéfoto's. Aanpak per prent in `docs/spotprenten-bronnen.md`.
- **Besluiten van de docent** staan in `docs/besluiten.md` en gaan voor. Bijvoorbeeld: Kinderwetje 1874, werklozen 1935 gemiddeld ongeveer 430.000, films via Google Drive, PowerPoints mogen openbaar, nog geen koppeling met meneerboersen.nl.

### Privacy en AI

- Nooit een API-sleutel, lesstof of leerlinggegevens in de repo.
- Nooit een naam, klas of leerlingnummer naar de AI.
- Voortgang alleen op het apparaat, plus de voortgangscode.
- De site werkt altijd door als de Worker uit staat.

### Techniek en werkwijze

- Gewone HTML, CSS en JavaScript. Geen framework, geen build-stap, geen externe bibliotheken.
- Inhoud in databestanden, pagina's uit bouwscripts. Verbeteringen horen in `economie.js`, `economie.css` en de bouwscripts, zodat alle hoofdstukken ze krijgen.
- Bestaande opslagsleutels en deep links blijven werken.
- Vóór elke push: `vragencheck`, `linkcheck` en `a11ycheck` op 0, en een browsertest op 375 en 820 px in licht en donker.
- Elke wijziging krijgt een stukje in `changelog.md`: wat, hoe, wat getest is en wat niet, en wat de docent moet controleren. Eerlijk over wat niet getest is.
- De site is live en leerlingen gebruiken hem. Alleen werk dat af is en getest komt op `main`.
- Stop alleen bij iets wat niet terug te draaien is, zoals bestanden of voortgang van leerlingen verwijderen.

## 9. Waar alles staat

### Repo's op GitHub (`jboersen88-dot`)

| Repo | Wat |
|---|---|
| `geschiedenis-vellesan` | de lessite (deze repo) |
| `EDU-Racer-Kids` | privé-racer voor drie kinderen |
| `EDU-Racer` | bouwplaats van de economie-racers |
| `fabrieksjacht`, `geldjacht-h2`, `geldjacht-3v` | de drie speurtochten |

### Mappen in `~/Claude/` op de Mac

| Map | Wat |
|---|---|
| `geschiedenis-vellesan/` | lokale kopie van deze repo (met oude werkbestanden die git negeert) |
| `geschiedenis-werk/` | de grote opdracht van 10 november (`opdracht-2026-11-10.md`), bronnenlijst, Worker-instructies jaar 2, screenshots voor en na |
| `ai-oefentoetsen/` | de Worker (`nakijker-worker/`), het ontwerp (`ONTWERP.md`), onderzoek en de lesstof van de nakijker |
| `geschiedenis-bronnen/` | de originele apps, PowerPoints, docx en films van boekje 1 |
| `geschiedenis-controle/` | twijfelplekken in de lesstof en de gecorrigeerde bestanden |
| `geschiedenis-anim/`, `geschiedenis-boekje2-werk/` | oude werkkopieën van de repo (verouderd, kunnen weg als de docent dat wil) |
| `EDU-Racer/`, `EDU-Racer-Kids/` | de racers |
| `fabel/`, `fabrieksjacht/` | de speurtochten, hun Workers, printbare kaartjes en QR-codes |
| `website-analyse-2026-10-18.md` | de eerste analyse met afvinklijst (grotendeels uitgevoerd) |

Niet van de website: `app cijfercontrole/`, de drie `n8n …`-mappen, `generals/`.

## 10. Wat nog open staat

**Bouwen**

- Economie jaar 3 mavo: H5, H6 en H8 en de SE-pagina's H5 + H6 en H7 + H8 (H1 tot en met H4, H7 en het SE H1 + H3 staan er sinds 18 nov 2026).
- Economie jaar 3 mavo H3 "De bank en jouw geld" (fase 3) en jaar 4 H5 "Kan de overheid dat regelen?" (fase 4) in de nieuwe opzet.
- Fase 5: alle overige Economie-hoofdstukken uit de oude Google-opzet halen (jaar 2 H3 tot H6, jaar 3 mavo H4 tot H8, jaar 4 H1 tot H8).
- Mijn route voor 3 havo/vwo H2 staat er sinds 18 nov (13 leerdoelen, zes rekensoorten in `route.js`); de docent moet de indeling in niveaus en de nieuwe rekenvragen nog nakijken. Geen AI-verdiepingsvraag: de Worker heeft geen lesstof van dit hoofdstuk.
- Boekje 2: PowerPoints van hoofdstuk 3 en 4, bolletjes voor het plaatje van H3, oefentoetsen.
- Boekje 3 en 4 van Geschiedenis.
- De drie speurtochten een plek geven op de lessite.
- Recherchebord als onderdeel op de pagina.

**Voor de docent om te controleren**

- De herschreven foute antwoorden in `economie/j2h1/bron/toetsen.json`.
- De indeling van de quizvragen in leerdoelen en niveaus (`bouw-route.py`, `SPEC`) en de 3-ster rekenvragen in `route.js`.
- De formules en voorbeelden van jaar 3 H0 (`economie/j3h0/data.json`).
- De vragen van de Edu-Racers Economie.
- De vragen en nakijkpunten bij de kijkplaten van boekje 2.
- Werkaantekeningen en beeldrechten in de dia's van boekje 2 (lijst in `changelog.md`, 28 oktober).
- Besluiten 2c tot en met 2e in `docs/besluiten.md` (televisiefoto, start problemen verzorgingsstaat, foto Reusel).

**In de Worker**

- `vak:"eco2"` met de lesstof van jaar 2 toevoegen voor de verdiepingsvragen in Mijn route. Stappen in `~/Claude/geschiedenis-werk/worker-jaar2.md`.
- De 32 onderwerpen van de toets op maat van boekje 1 (de Worker kent er nog 15).

**Techniek**

- `a11ycheck` meldt nu 1 fout: `rondleiding/qr/posters.html` heeft geen viewport-meta. Dat is een printpagina die `maak-qr.js` maakt. Oplossen in dat script.
- Nooit getest op een echte iPad met camera. Alles is getest in een nagebootste iPad.
- Er is geen favicon.
- Automatische controle bij elke push (GitHub Actions) staat nog niet aan.
- `docs/OVERDRACHT.md` is op een paar punten verouderd (het noemt nog 250 fouten in de vragencheck, dat is nu 0). Dit overzicht en `CLAUDE.md` zijn leidend.
