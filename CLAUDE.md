# Richtlijnen voor de website van Meneer Boersen

Lessite Geschiedenis en Economie van het Vellesan College. Live op https://jboersen88-dot.github.io/geschiedenis-vellesan/ vanaf `main`. Leerlingen gebruiken de site elke dag.

Lees eerst [`docs/OVERZICHT.md`](docs/OVERZICHT.md) (wat er is en hoe het werkt), daarna `docs/besluiten.md` (besluiten van de docent, die gaan altijd voor) en de bovenste stukken van `changelog.md`. Antwoord de docent in het Nederlands, in korte, gewone zinnen.

## Voor wie

Leerlingen van jaar 2 tot en met 4, vooral mavo, op iPads in Safari. Veel van hen lezen moeilijk. De docent gebruikt de site ook op het digibord.

## De opzet van elk hoofdstuk

Het voorbeeld is Economie jaar 2 mavo hoofdstuk 2: `economie/h.html?p=jaar-2/mavo/hoofdstuk-2` met `economie/j2h2/oefen.html`. Bouw nieuw werk in elk vak zo:

1. **Hoofdstukpagina**: hero, een kaart per paragraaf, een band naar de oefenomgeving.
2. **Leren** (leeromgeving per paragraaf): de informatie. Klikbare dia's, filmpjes, begrippen, leerdoelen als "Check jezelf".
3. **Oefenen** (oefenomgeving): het verwerken. Mijn route, Oefenlab, games, oefentoetsen.

Houd leren en oefenen gescheiden. Geen lesstof in de oefenomgeving, geen oefeningen tussen de lesstof. Niets meer bouwen in de oude Google-opzet (de lesapps in `economie/apps/`, pagina's die alleen Drive-bestanden tonen).

## Schrijven voor leerlingen

- Korte zinnen. Weinig tekst tegelijk. Alles binnen twee tikken.
- Eén ding tegelijk op het scherm: één vraag, één stap, een keuzemenu in plaats van alles onder elkaar.
- Niets dubbel. Staat iets er twee keer, haal er één weg.
- Moeilijker betekent een moeilijkere vraag, nooit moeilijkere taal.

## Vragen

**Meerkeuze**
- Precies 4 opties, elk op een eigen regel, volgorde geschud.
- Ongeveer even lang: langste hooguit 1,5 keer de kortste (antwoorden tot 20 tekens tellen niet mee).
- Het juiste antwoord is per vragenbank in hooguit 25% van de vragen het langste.
- Geen "alle antwoorden zijn goed".
- Herschrijven: alleen de foute antwoorden, geen nieuwe feiten.

**Stellingen**
- Bij een stelling kiest de leerling "Goed" of "Fout", en de vraag heet "Goed of fout?". Niet "Waar of onwaar".
- Bij het nakijken staat er "Juiste antwoord:", niet "Goed:".

**Open vragen**
- In de vraag staat precies wat de leerling moet beantwoorden. Alles waarop nagekeken wordt, wordt gevraagd.

**Rekenen**
- Formules altijd met haakjes, zo: (nieuw − oud) : oud × 100, (deel : geheel) × 100, (percentage : 100) × totaal.
- Eerst de formule laten opschrijven of opzoeken, dan het getal. Geen meerkeuze voor de formule.
- Geld op 2 decimalen, procenten op 1 decimaal.

**Niveaus**
- 1 ster: reproductie en de basisformule. 2 sterren: toepassen, moeilijkere getallen. 3 sterren: twee stappen combineren of uitleggen.

**Oefentoetsen**
- Een oefentoets is geen kopie van het proefwerk met andere getallen. Zelfde soort vragen, andere situaties, en extra onderwerpen die niet per se in het proefwerk komen.

## Inhoud

- Verzin niets: geen feiten, citaten, jaartallen, video-adressen of Schooltv-links. Alleen wat in het materiaal van de docent staat.
- Lesstof, uitwerkingen en afbeeldingen van de uitgever staan niet letterlijk in deze openbare repo. Schrijf in eigen woorden en teken grafieken zelf opnieuw, met bronvermelding.
- Alleen beelden met duidelijke rechten: eigen beelden en AI-illustraties van de docent (met label "AI-illustratie"), Unsplash, publiek domein. Geen privéfoto's.
- Elke nieuwe PowerPoint krijgt klikstappen (`tools/dias/stappen.py`). Losse dia's zonder animaties zijn niet af.

## Vormgeving

- Kleuren: bosgroen `#1f5f4e`, koraal `#ff8d90` (als tekst op crème `#c2484d`), teal `#2f8f86`, crème `#f6f0e6`.
- Letters: Fraunces voor koppen, Inter voor tekst. Laad de stylesheet niet blokkerend (`media="print" onload="this.media='all'"` met `noscript`).
- Licht en donker via CSS-variabelen.
- Beweging: rustige fades, stap voor stap, inzoomen vanuit een overzicht. Alleen `transform` en `opacity`. Alles respecteert `prefers-reduced-motion`.
- Licht, fris en professioneel. Niet kinderlijk, niet de standaard AI-website.
- Perfect op 820 px (iPad) en 375 px (telefoon), ook goed op 1280 px. Geen horizontaal scrollen.
- Toegankelijk: `lang`, viewport, titel, alt-teksten, knoppen en links met een naam, labels, toetsenbord en zichtbare focus.

## Privacy en AI

- Nooit een API-sleutel, lesstof of leerlinggegevens in de repo.
- Nooit een naam, klas of leerlingnummer naar de AI.
- Voortgang alleen op het apparaat (localStorage), plus een voortgangscode die de leerling zelf inlevert.
- AI: Claude Haiku 5.5 via de Cloudflare Worker (`nakijker.js`, `ai.js`). De Worker staat buiten deze repo.
- Alles werkt door als de Worker of Google Drive niet bereikbaar is: zelf nakijken, vragenbank, een duidelijke melding.

## Techniek

- Gewone HTML, CSS en JavaScript. Geen framework, geen build-stap voor de site, geen externe bibliotheken.
- Inhoud staat in databestanden, pagina's komen uit bouwscripts. Pas nooit een gebouwd bestand met de hand aan:
  - `boekje-2/app.html`: `python3 -I boekje-2/bouw.py` (ook na elke wijziging aan `app.html`)
  - `economie/<map>/oefen.html`, `route.json`, `toets.html`: `bouw-oefen.py`, `bouw-route.py`, `bouw-toets.py`
  - `economie/se3/app.html`: `bouw-eco.py se3`
- Verbeteringen horen in `economie/economie.js`, `economie/economie.css` en de bouwscripts, zodat alle hoofdstukken ze krijgen.
- Verander nooit een bestaande localStorage-sleutel of deep link. Nieuwe opslag krijgt een nieuwe sleutel.
- Beelden verkleinen (ongeveer 1200 px breed, dia's 1280 px met JPG-kwaliteit 0,6). Geen mp4 voor de lessite in de repo: films spelen via Google Drive.

## Vóór elke push

```bash
python3 -I tools/vragencheck.py
python3 -I tools/linkcheck.py
python3 -I tools/a11ycheck.py
```

Alle drie op 0. Daarna een browsertest (`python3 -m http.server`) op 375 en 820 px, in licht en donker, zonder consolefouten.

## Werkwijze

- Alleen werk dat af is en getest komt op `main`.
- Schrijf bij elke wijziging een stuk in `changelog.md` (nieuwste bovenaan): wat, hoe, wat getest is en wat niet, en wat de docent moet controleren. Wees eerlijk over wat niet getest is.
- Werk `docs/OVERZICHT.md` bij als er een hoofdstuk, game of bouwscript bij komt.
- Werk zelfstandig door. Kies bij twijfel iets redelijks en schrijf de keuze in het changelog.
- Stop en vraag alleen bij iets wat niet terug te draaien is: bestanden of voortgang van leerlingen verwijderen, iets in de Worker of de Anthropic-console veranderen.
- Na elk stuk werk: kijk wat nog beter kan, wat nog ontbreekt en wat dubbel staat, en doe dat.
