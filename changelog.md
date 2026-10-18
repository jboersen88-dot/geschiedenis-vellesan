# Changelog

## 2026-10-18 · 02:00 Economie-lesapps aan Claude gekoppeld (stuk 2)

### Verbeterronde (vorige ronde)
- Live gecontroleerd (200 en geen consolefouten): Economie index/jaar/h, `toets.html`, `spotprent.html`, `nakijken.html`, `ai.js`, `nakijker.js`. Geen fouten gevonden, niets aangepast.

### Gebouwd
- **Worker** (`ai-oefentoetsen/nakijker-worker`, gedeployd): accepteert naast het nakijkformaat ook het oude formaat van de Economie-apps (`{vak:"economie", jaar, begrip, uitleg, voorbeeld, antwoord, paragraaf, samenvatting, begrippen}`). Het wordt omgezet naar een gewoon nakijkverzoek (begrip uitleggen, nakijkpunt = uitleg + voorbeeld, 2 punten, samenvatting + begrippen als bron) en het antwoord komt terug als `status/oordeel/goed/mist/fout/tip`. Zelfde grenzen als eerst (2000 tekens antwoord, 20 000 verzoek, 300/min totaal, alleen toegestane afzenders).
- **Lesstof Economie jaar 2** (alleen in de Worker, `src/lesstof-eco.txt`, niet in de repo): uit "AAA. Alle stukken tekst jaar 2 mavo.docx", sleutels E2H1, E2H2, E2H4. Hoofdstuk 3 staat in het document in het blok van hoofdstuk 2 en wordt daarheen verwezen. Hoofdstuk 5 en herhalingsvragen zijn niet meegenomen. Jaar 4 heeft geen eigen lesstofdocument: daar is de meegestuurde samenvatting + begrippen de lesstof.
- **8 apps** in `economie/apps/`: AI-URL ingevuld en `jaar` toegevoegd aan het verzoek. `jaar-4_se-h1-h2-h8_1.html` (Edu-Racer) heeft geen Leg-uit-onderdeel en is niet aangeraakt.

### Test
- `node test.mjs` groen (uitgebreid met oud formaat, begrenzing, verkeerd vak), `node eval.mjs` **12/12**.
- Per app één echte nakijkactie via de browser (bewust een verkeerd antwoord): alle 8 gaven een AI-oordeel "Nog niet goed" met passende uitleg en tip, geen terugval op de lokale controle.
- Drive-previews: alle 28 bestands-ID's in de apps laden zonder inloggen (echte titels). Er is niets dat de docent nog moet delen.

### Open
- Niet getest op een echte iPad. De antwoorden in de test waren bewust fout; een goed antwoord is niet apart gecontroleerd.

## 2026-10-17 · 21:00 AI-nakijker Haiku 5.5 in de oefentoetsen

**Docent: INSTALLATIE.md (ai-oefentoetsen/nakijker) nog doorlopen.** `nakijker/WEBAPP_URL.txt` bestaat nog niet, dus `GV_NK_URL` in `nakijker.js` is leeg en de oefentoetsen werken precies als eerst. Na installatie: URL tussen de aanhalingstekens zetten, pushen.

### Gebouwd
- **`nakijker.js`** (nieuw, laadt na `ai.js`): `GV_NK.check({h,vraag,punten,bron,antwoord})` met POST zonder Content-Type, 45 s time-out, lokale terugval via `GV_AI.local`; `GV_NK.render` toont badge met punten, per nakijkpunt ✓/✗ met uitleg, feedback, tip en "Dit staat niet in de lesstof". Geen naam/klas/leerlingnummer in het verzoek. Gemini in `ai.js` ("Leg uit", `nakijken.html`) is niet aangeraakt.
- **`toets.html`**: na inleveren worden de open vragen (max. 3 tegelijk, laadstatus per vraag) nagekeken. t1 = H1+H2, t2 = H3+H4, t3 = H1-H4. AI-punten staan voorgevuld in de vinkjes/puntenknoppen (aan te passen), de uitslag staat in de bestaande localStorage-status (`ai` per toets), dus herladen kost niets. Bij een fout: melding + knop "Probeer AI-nakijken opnieuw", nakijkblad blijft werken. Vragen met één nakijkpunt en meer punten (t1 16, 17; t3 24) gaan als één nakijkpunt met alle modelantwoord-regels naar de AI. Een afgeronde vinkvraag krijgt alleen een vinkje als het volledige nakijkpunt is gehaald.
- Meerkeuze blijft lokaal.

### Niet gedaan
- **Spotprent-analyse (C) overgeslagen**: de enige spotprent-widget staat in `boekje-2/onderzoek.html` (Kijkwijzer, boekje 2). Boekje 2 is niet de lesstof van de nakijker (H1-H4 = boekje 1), dus koppelen zou tegen de verkeerde lesstof nakijken.

### Test
- Lege URL, desktop: t1 inleveren: 11 vinkjes en 2 puntenknoppen als voorheen, geen AI-blokken, geen consolefouten.
- Met een **lokale nepserver** (geen echte AI): 7 open vragen nagekeken, vinkjes voorgevuld, laadstatus zichtbaar, uitslag bewaard; na herladen geen nieuwe aanroepen. Bekeken op desktop licht en iPad-breedte (820 px) donker, geen horizontaal scrollen.
- **Echte test met Haiku (goed en fout antwoord op t1 vraag 14): niet uitgevoerd, er is nog geen URL.** Dit moet nog gebeuren na installatie.

## 2026-10-18 · 02:00 nachtaudit

### Afgevinkt (bestond al, gecontroleerd)
- Interactieve basis uit de oude app (flipkaarten, 3-stappenpad, quizzen), 4 dia-presentaties in de eigen viewer, AI-nakijker (`ai.js`, `nakijken.html`, Leg uit; lokale fallback en time-out), voortgang in localStorage, games (Racer, swipe, memory, doe-boek, beeldquiz), Flow-beelden in kaart/quiz/boekje 2. Geen JS-fouten bij het laden van 10 hoofdpagina's.
- Meerkeuze-audit met script over `BANK` (130 vragen boekje 1, 49 boekje 2) en alle oefentoetsen: overal exact 4 opties; boekje 1 geen enkele vraag met lengteverhouding > 1,5 en het juiste nergens duidelijk het langste.

### Aangepast
- Oefentoets H3+H4, vraag 1: juiste antwoord was het langste (57 tekens vs 36-43); ingekort tot "Artsen, priesters, schrijvers en journalisten". Oefentoets 1 t/m 4, vraag 3 (volgorde Spinning Jenny): juiste ketting ingekort ("… waterrad"). Beide ook in `racer.html`. Betekenis gelijk.

### ONTWERP.md
- Onder "Klaar voor de website" staat alleen de meerkeuzeweergave (4 blokken A-D, witruimte, geschud, console-controle). Dat was al gebouwd en is nu gecontroleerd. Al het andere (inhoudsmodel, bronvragen, stapjesmodus, adaptieve oefening, "dit vind ik moeilijk"-knop, nieuwe nakijker) is nog in ontwerp en is niet gebouwd.

### Nog open
- Boekje 2: 2 vragen met een kort antwoord als uitschieter (namen, toegestaan); dia's en films volgen van de docent.
- Doe-boek H4: meerkeuze van de docent zelf is niet herschreven. Recherchebord nog geen widget.
- Niet getest op een echte iPad. In deze nachtrun geen nieuwe visuele laag; huidige polish blijft staan.

## 2026-10-17 · structuur: Geschiedenis jaar 3 met vier boekjes

- **`index.html` is nu het jaaroverzicht "Geschiedenis jaar 3"** met vier boekjes: boekje 1 "De industriële samenleving in Nederland" en boekje 2 "Sociale zekerheid en verzorgingsstaat in Nederland" zijn klikbaar, met hun vier hoofdstukken op de kaart. Boekje 3 en 4 staan als "Volgt in het tweede deel van het jaar".
- **De startpagina van boekje 1 heet nu `boekje-1.html`** (verplaatst met `git mv`, inhoud gelijk; "Jaar 3" toegevoegd in de nav). De terug-links van app, kaart, beeldquiz, doe-boek, nakijken en verhaal wijzen naar `boekje-1.html`.
- Boekje 2: de nav heeft "Jaar 3" en "Boekje 1"; het doe-boek H4 (boekje 1) is uit de games van boekje 2 gehaald.
- Let op voor later: `boekje-2/app.html` bevat nog links naar `presenteer.html` en `filmvragen.html`. Die verschijnen pas als boekje 2 dia's (`DECK`) of films (`FILMS`) heeft. Pas dan `bouw.py` aan, zodat ze naar de dia's en films van boekje 2 wijzen.

## 2026-10-17 · boekje 2: Sociale zekerheid en verzorgingsstaat (eerste opzet)

Bron: "Geschiedenis jaar 3 sociale zekerheid en verzorgingstaat - alle stukken tekst.docx" (OneDrive) en de Flow-beelden in Downloads. PowerPoints maakt de docent zelf; die zijn niet gemaakt.

### Gebouwd (alles in `boekje-2/`)
- **`index.html`**: startpagina van boekje 2 met de 4 hoofdstukken, links naar Kijkwijzer, onderzoek en examentraining, en de 4 officiële leerdoelen. Link vanuit de hoofdnavigatie ("Boekje 2").
- **`app.html`**: dezelfde leeromgeving als boekje 1 (Leer → Oefen → Test, Oefenlab, games), gevuld met de inhoud van boekje 2:
  - 52 leerdoelen (H1 16, H2 13, H3 12, H4 11); de 4 officiële leerdoelen staan bovenaan hun hoofdstuk
  - 41 begrippen, 49 meerkeuzevragen, 27 tijdlijngebeurtenissen, 19 oorzaak-gevolgparen, 4 sorteersets en "Kun jij dit beantwoorden?"-vragen
  - beelden uit `img/flow/`, en de crisiskaart en de beeldquiz (passen bij H2)
  - eigen voortgang (`gs3-szv-app-v1`), los van boekje 1
  - Lesstof toont "De PowerPoint van dit hoofdstuk volgt" tot er dia's zijn. Racer, AI-nakijker en oefentoetsen van boekje 1 zijn weggelaten.
- **`onderzoek.html`**: Kijkwijzer spotprenten als stappenwidget (4 stappen, voor 4 spotprenten uit het boekje), de 3 onderzoeksopdrachten als vergelijkingstabel (toen / nu / verschil of overeenkomst, met kopieerknop) en een bronnenkast met 5 korte historische bronnen. Alles wordt bewaard.
- **`examentraining.html`**: de 11 examentrainingsvragen. Vraag 1 kijkt zichzelf na, de 3 keuzevragen controleren de keuze, de open vragen krijgen nakijkpunten uit de lesstof, met een totaalscore.
- **`bouw.py` + `data-bron.py`**: de app wordt gebouwd uit de nieuwste `app.html` met de inhoud uit `data-bron.py`. Na een update van `app.html`: `python3 -I boekje-2/bouw.py`.

### Beslissingen en kanttekeningen
- De tekst van **hoofdstuk 1 in het docx bevat veel transcriptiefouten** (bijv. "plevedadigheid", "Deliberaliserenzat", "Biechtgetuigen"). De site gebruikt de juiste termen; het docx zelf is niet aangepast. De titel van H1 ("Armenzorg en de sociale kwestie") is zelf gekozen, omdat de titel in het docx onleesbaar is.
- Lesstof van de uitgever staat niet letterlijk in de openbare repo: uitleg en vragen zijn in eigen woorden. Letterlijk staan alleen korte historische bronnen (Kinderwetje 1874, enquête 1887, Thorbecke, gezondheidsrapport 1902, Drees 1947) en de korte examentrainingsbronnen 2, 3 en 5.
- Bronnen 1, 4 en 6 van de examentraining zijn afbeeldingen die niet in het docx staan; de leerling bekijkt ze in het boekje.
- Meerkeuze: precies 4 opties, elk op een eigen regel, ongeveer even lang. Het juiste antwoord is in 0 van de 49 vragen duidelijk het langste (zelfde drempels als boekje 1).
- Getest in Chrome op desktop en op 375 px (geen horizontaal scrollen, geen fouten in de console). Nog niet op een echte iPad bekeken.

## 2026-10-17 · 21:00-ronde: AI-nakijker, kaart en beeldquiz

### Actieplan (vooraf geschreven)
1. **AI-nakijker**: het Apps Script-endpoint van de Economie-apps/originele Geschiedenis-app (Gemini erachter) eerst met één echte POST getest. Daarna een gedeelde module `ai.js` (endpoint, 45 s time-out, lokale fallback op nakijkpunten) en daarop een nieuwe oefenmodule `nakijken.html`: open vragen uit de oefentoetsen (24 vragen met modelantwoord en nakijkpunten) en begrippen uitleggen. Ook `AI_URL` in `app.html` (Leg uit) weer ingevuld.
2. **Interactieve kaart** (`kaart.html`): schematische kaart New York ↔ Rotterdam ↔ Nederland van de crisis van 1929–1935 met de nieuwe Flow-beelden, klikbare plekken, een 1929/1935-schakelaar met de cijfers uit de PowerPoint, en per plek een open vraag die de AI nakijkt. Alleen feiten uit de PowerPoint/toetsen.
3. **Beeldquiz** (`beeldquiz.html`): Flow-beeld → bij welk lesonderwerp hoort het? Meerkeuze volgens de regels (4 antwoorden, elk op een eigen regel, gelijke lengte, het juiste niet het langste).
4. **Statisch → HTML**: de losse docx/pdf's (Doe-boek H4, Recherchebord) bekijken en zo mogelijk als widget bouwen.
5. Lokaal testen (desktop + iPad, licht + donker), dan pushen.

### Gebouwd (21:00-ronde)
- **AI-nakijker**: `ai.js` (gedeeld) + `nakijken.html`. Het endpoint is getest met echte POST's vanuit de browser: het antwoordt `{oordeel, goed, mist, fout, tip, status:"ok"}`, CORS is open (`access-control-allow-origin: *`), en een bewust fout antwoord (Kinderwetje bij een vraag over de agrarische revolutie) wordt terecht "Nog niet goed" genoemd. Er is geen apart veld voor open vragen: de Economie-apps sturen alleen begrip/uitleg/voorbeeld/antwoord. Voor open vragen stuur ik daarom de vraag als `begrip`, het modelantwoord als `uitleg` en de nakijkpunten als `begrippen`. Dit werkt goed in de praktijk, maar het is hergebruik van een veld, geen officiële open-vraag-API.
  - Modes: 24 open vragen uit de oefentoetsen (vragen "Gebruik bron…" zijn weggelaten, die staan in `toets.html`) en 49 begrippen. Voortgang per vraag in localStorage.
  - Lokale fallback bij fout/time-out (45 s): kernwoorden per nakijkpunt (`GV_AI.local`).
  - Ook in `app.html` staat `AI_URL` weer ingevuld (Oefenlab → Leg uit).
- **Interactieve kaart** (`kaart.html`): schematische Atlantische kaart (handgetekend, niet op schaal) met New York, Rotterdam en Nederland. Schakelaar 1929 ↔ 1935 laat invoer/uitvoer (2,75 → 0,94 en 1,99 → 0,67 miljard gulden) en werklozen (640.000) animeren en de scheepvaart uitdunnen. Per plek: Flow-beelden (met wisselknopjes), feiten uit de PowerPoint en een open vraag die de AI nakijkt.
- **Beeldquiz** (`beeldquiz.html`): 9 beelden, meerkeuze volgens de regels (4 antwoorden, elk op een eigen regel met `gap: .9rem`, ongeveer gelijke lengte, juiste antwoord nooit duidelijk het langste, volgorde geschud) en een uitleg uit de lesstof na elk antwoord.
- **Doe-boek H4 online** (`doeboek.html`): alle 48 vragen van het Word-doe-boek als widget in vijf blokken + afsluiting: meerkeuze, juist/onjuist, combineren, volgorde, ketting, sorteren, zelfcheck en open vragen met autosave. Controle op gesloten vragen alleen waar het juiste antwoord zeker uit de lesstof volgt (bij o.a. vraag 11, 31 en twee stellingen in 5 is bewust geen controle). Open vragen: "Vraag de AI om feedback" met de PowerPoint-tekst van het blok als context (`data/doeboek-ctx.js`). "Kopieer mijn antwoorden" en printen werken.
- Links vanuit de startpagina en het tabblad Games in de app.

### Flow-beelden
- 20 van de 22 nieuwe beelden uit Downloads (alleen die van 17 oktober 2026, niet de sprookjesboek-beelden) staan geoptimaliseerd in `img/flow/` (1200 px breed, JPEG kwaliteit 76, samen 3,8 MB). Beeldtekst "AI-illustratie" staat overal bij.
- Gebruikt in kaart en quiz: Wall Street, beurskrach-auto, haven, arbeidsbeurs, voedseluitdeling, SDAP-affiche, demonstratie, Kinderwetje, kinderen-naar-school, stemlokaal 1917, fabrieksinspecteur. Nog niet gebruikt: Jordaan-oproer, Afsluitdijk (2), polderwerk, loket, vrouwenstemrecht, wandplaat, tweede SDAP-affiche. Reden: de PowerPoints noemen die gebeurtenissen niet, en ik verzin geen feiten. Zeg het als je ze wilt koppelen aan een les.

### Aandachtspunten
- **Het AI-endpoint staat publiek in de code** (`ai.js` en `app.html`), net als nu al in de broncode van je Google Site. Iedereen kan het aanroepen: kans op verbruik van het Gemini-quotum. **Uitzetten met één regel**: zet `GV_AI_URL` bovenin `ai.js` op `""` en `AI_URL` in `app.html` (zoek `var AI_URL=`) op `""`; alles valt dan terug op de lokale controle.
- De meerkeuzevragen in het doe-boek (meerkeuze van de docent) is niet herschreven: ze zijn van jou en hebben vaste letters bij de dia's. Het juiste antwoord is daar vaak het langste (bijv. vraag 6 en 19). Zeg het als ik die ook moet aanpassen.
- Niet gebouwd: Recherchebord (PDF) en dia-gebonden interactieve versie van het doe-boek; AI-endpoint werkt alleen met internet.
- Getest in de browser van de app (desktop, iPad-breedte 820 px, donker). Niet op een echte iPad.

## 2026-10-17 · avond: toetsen, spel, scroll-verhaal en meerkeuze volgens de regels

### Gebouwd
- **Online getimede oefentoetsen** (`toets.html`, data in `data/toetsen.js`): de drie oefentoetsen van de docent (H1+H2, H3+H4, H1 t/m H4) met klok die een refresh overleeft, meerkeuze die zichzelf nakijkt, open vragen die je met het nakijkblad zelf nakijkt (vinkjes per nakijkpunt), cijfer = punten : max × 9 + 1, en de verdiepingsopdrachten. Antwoorden blijven in localStorage. Link vanuit het tabblad Oefentoetsen.
- **Geschiedenis-Racer** (`racer.html`): de EDU-Racer-race met 158 geschiedenisvragen (alle 130 uit de quizbank + 28 begrippenvragen met korte versies), 10 sorteersets voor het swipespel (Agrarisch/Demografisch, waterkracht/stoom, Engeland/Nederland, Kinderwetje/leerplicht enzovoort) en groen thema. Vragen toevoegen kan zoals bij EDU-Racer, bovenaan het bestand.
- **Filmvragen** (`filmvragen.html?h=H1` en `?h=H2`): film naast de vragen van de docent, antwoordvakken met autosave, "Toon antwoord" met modelantwoord uit de lesstof, en "Kopieer mijn antwoorden".
- **Scroll-verhaal** (`verhaal.html`): vijf vastgezette scènes van de crisis naar de welvaart (handel 1929/1935 als staafdiagram met legenda en tabel, 640.000 werklozen oplopend, 265.000 trekpaarden aflopend naar 0, de tv van twee maandsalarissen).
- Links vanuit de startpagina en het tabblad Games.

### Meerkeuze volgens de besloten regels
- In de oude quizbank was het juiste antwoord in 74 % van de vragen het langste en bij 104 van de 130 vragen was het langste antwoord meer dan 1,5 × het kortste. Alle 130 vragen en de 24 meerkeuzevragen van oefentoets 1 en 2 zijn herschreven: antwoorden zijn ongeveer even lang en het juiste is niet meer vaker het langste (alleen de opmaak van de foute antwoorden is aangepast; de inhoud van de vraag en het juiste antwoord zijn gelijk gebleven, behalve dat ze soms iets korter zijn).
- Altijd 4 antwoorden, elk als eigen blok met `gap: .9rem`, A t/m D, volgorde geschud bij elke vraag. Ontwikkelaarscontrole in de console (`[meerkeuze] …`) als een vraag geen 4 opties heeft of de lengteverhouding boven 1,5 komt.
- Autonome keuze: antwoorden van 20 tekens of korter (namen, jaartallen) vallen buiten de lengteverhouding, want daar valt lengte niet op. "Het langste is juist" telt pas als het juiste antwoord minstens 8 % en 5 tekens langer is dan het volgende.

### Film
- `YT_ID` in `app.html` en `filmvragen.html`: vul het YouTube-ID in (H1 en H2) en de film speelt via YouTube; leeg = Google Drive. Geen mp4 in de repo.

### Beslissingen en kanttekeningen
- Niet gebouwd (wacht op besluit in `ONTWERP.md`, ai-oefentoetsen): bronvragen in stapjesmodus, adaptieve oefening, "dit vind ik moeilijk"-knop, nieuwe AI-nakijker. `AI_URL` blijft leeg in de repo.
- Racer en toetsen zijn getest in headless Chrome (laden zonder fouten, toets maken en nakijken, cijfer rekent). Op een echte iPad is het nog niet bekeken.
- Doe-boek H4 en het Recherchebord zijn nog niet als widget gebouwd.
- Drive-films en -toetsdocumenten werken alleen als ze op "iedereen met de link" staan.

## 2026-10-17 · middag: van kale showcase naar echte leeromgeving

Aanleiding: de eerste versie was "een standaard website". Je bestaande Google Site draait al een rijke, zelfgebouwde lesapp (`industriele-samenleving-app.html`). Die is het fundament geworden, in plaats van hem opnieuw te bouwen.

### Gebouwd
- **app.html: de volledige leeromgeving**, overgezet vanuit de originele Google Sites-app naar de nieuwe huisstijl (bosgroen, koraal, teal, crème; Fraunces + Inter). Alle functies zijn behouden:
  - 3-stappenpad Leer → Oefen → Test jezelf, met de voortgang van 77 leerdoelen in localStorage
  - Oefenlab: flipkaarten met begrippen, 🤖 Leg uit, 🕰️ Tijdlijn, 🔗 Oorzaak & gevolg, ⚡ Quiz (vragenbank H1–H4), 🎮 Games (swipe en memory)
  - Twee oefentoetsen (H1+H2, H3+H4) met klok, nakijkblad en cijfer
  - Filmpjes (H1 en H2) via Google Drive-preview
- **HTML-presentaties**: alle 4 PowerPoints via PowerPoint zelf geëxporteerd naar exacte dia-afbeeldingen (`slides/H1..H4`, met 21, 9, 27 en 44 dia's). De opmaak is dus precies die van jou.
  - Eigen dia-viewer in de Lesstof-tab: vloeiende overgang, pijltjestoetsen, vegen op de iPad, miniaturen, schermvullend, en onthouden op welke dia je was
  - `presenteer.html?h=H1`: schermvullend presenteren in de klas, met een balk die vanzelf verdwijnt
- **index.html: een filmische startpagina** met:
  - hero met parallax en rook uit de schoorstenen (canvas)
  - hoofdstukkaarten die met de muis meekantelen, met een lichtglans
  - tellers die oplopen (6 → 18 miljoen Engelsen, 640.000 werklozen, 265.000 trekpaarden → 0)
  - een tijdlijn die zich tekent terwijl je scrollt
  - een kaart naar de 3D-woning
- **3d-arbeiderswoning.html**: je eigen three.js-simulatie, gekoppeld vanaf de startpagina (H1 + H3, de sociale kwestie)
- **Deep links**: `app.html#H2` (lesstof H2), `#H3-lab`, `#toets`, `#films`

### Beslissingen
- **Leg uit**: `AI_URL` staat leeg. Dan gebruikt de app de ingebouwde nakijker op trefwoorden (`luLocal`), dus de functie werkt wel. Je eigen Apps Script-URL kun je met één regel in `app.html` terugzetten (zoek `var AI_URL=`). Let op: in een publieke repo kan iedereen hem dan aanroepen.
- **Films**: geen .mp4 in de repo, want GitHub Pages lost Git LFS-pointers niet op. Ze worden ingesloten via Google Drive (H1 = `15MCZQXfEVR3YzuL6n67ZzPPH-1hgrZum`, H2 = `1Mx7ASNpAZPhjpgqAYB-z7GaRXbEOyuYV`). Gecontroleerd: die zijn openbaar bereikbaar.
- **Beeld en content**: alleen uit je eigen lesmateriaal; geen verzonnen feiten of URL's.
- Alle beweging respecteert `prefers-reduced-motion`. Getest op desktop en telefoonbreedte (375 px), zonder horizontaal scrollen.

### Nog open (ingepland voor de volgende rondes)
- Meerkeuze-audit: is het juiste antwoord vaak de langste optie? Ook moeten de opties onder elkaar staan, met witruimte ertussen.
- YouTube-ID als alternatief per film
- Scroll-verhalen per hoofdstuk binnen de app, en meer HTML-widgets in plaats van downloads (filmvragen, recherchebord, doe-boek)
- Een Geschiedenis-variant van EDU-Racer
- De oude losse pagina's `h1-…h4-*.html` zijn vervangen door de app. Ze staan er nog, maar zijn niet meer gelinkt.

## 17 okt, 22:15 — AI-nakijker live (Cloudflare Worker)
- `nakijker.js`: `GV_NK_URL` = https://geschiedenis-nakijker.nakijker-worker.workers.dev (Claude Haiku 5.5). Sleutel en lesstof staan in de Worker, niet in deze repo. Alleen jboersen88-dot.github.io en localhost mogen hem aanroepen.
- Getest: t1 vraag 14, goed antwoord 2/2, fout antwoord 0/2, 3–4 s per antwoord. Uitzetten: `GV_NK_URL` leeg maken.
- 22:45: nakijker nauwkeuriger (citeer eerst, dan punten; effort medium): testset van 12 antwoorden 12/12 en 11/12 (grensgeval v15 punt 2), was 11/12 met een echte leesfout. In toets.html: gemarkeerd welk stuk van het antwoord welk punt opleverde, en een verbeterronde per open vraag (max 2, telt niet mee voor het cijfer, blijft bewaard).
- 23:00: **spotprent.html** (nieuw): spotprent analyseren met de Kijkwijzer uit de lesstof (4 stappen: algemeen, personen, andere delen, conclusie), AI-feedback per stap (max 3 keer per stap, knop verdwijnt bij volle punten), modelantwoord, voortgang in localStorage, tik om te vergroten. Eerste prent: Albert Hahn, "Gansch het raderwerk staat stil" (1903, spoorwegstaking, IISG, publiek domein). Prenten toevoegen in `data/spotprenten.js` (met beschrijving in woorden voor de AI). Tegel in het Oefenlab van app.html. Getest: zwak antwoord stap 2 = 1/3, goede antwoorden alle stappen = 10/10.

## 2026-10-18 · zondagochtend: controle en polish
- **Meerkeuze-audit** met script over alle vragenbanken: app.html (130), oefentoetsen (12/12/20), beeldquiz (9) en Geschiedenis-Racer (158). Overal exact 4 opties; volgorde wordt bij elke vraag geschud; opties staan onder elkaar met `gap: .9rem`.
- **Gevonden en gefixt**: in de Racer hadden 13 begrippenvragen ("Wat betekent …?") een lengteverhouding boven 1,5 en 3 daarvan had het juiste antwoord als langste. De foute opties zijn vervangen door definities van andere begrippen uit dezelfde set met passende lengte (geen nieuwe feiten). Nu 0 afwijkingen.
- **Responsief**: 12 pagina's gecontroleerd op 390 px, geen horizontaal scrollen; geen consolefouten in de Racer. Alle interne links bestaan.
- Niet gedaan: echte iPad-test, donkere modus per pagina, handmatige speeltest van de games. Oefentoets 3 vraag 3 (oorzaak-gevolgketen) heeft het juiste antwoord marginaal als langste (4 tekens); bewust zo gelaten.
- `YT_ID` voor H1 en H2 staat nog leeg: vul die in zodra de YouTube-ID's bekend zijn.
- 23:40: **alles naar Claude.** ai.js (Leg uit, nakijken.html, kaart.html, doeboek.html) en Leg uit in app.html en boekje-2/app.html gebruiken nu de Claude-Worker in plaats van Gemini; geen Google-adres meer in de repo. ai.js zet de oude aanroep om naar het nakijkverzoek (begrip = uitleg met 2 punten, hoofdstuk uit de paragraaf, boekje 2 vast op SZ). Getest op alle vijf de pagina's.

## 18 okt, 00:30 — Economie (stuk 1 van 3): meneerboersen.nl nagebouwd
- `economie/`: overzicht (index.html), jaarpagina (jaar.html?j=jaar-2|3|4) en hoofdstukpagina (h.html?p=…) in de huisstijl, opgebouwd uit `economie/data/paginas.json` = alle 41 Economie-pagina's die nu in het menu van meneerboersen.nl staan (opgehaald met `economie/data/crawl.py`): 303 Drive-bestanden, 30 YouTube-films, 98 links (Nearpod, Edpuzzle, Socrative, Schooltv), 836 leerdoelen.
- Per hoofdstuk: foto-hero (Unsplash, gratis licentie; 14 thema's in `economie/img/`), navigatie per paragraaf, leerdoelen als afvinklijst (alleen op het apparaat), Drive-bestanden openen in een kijkvenster, YouTube pas laden na klik (youtube-nocookie), online oefeningen als knoppen.
- 9 lesapps van meneerboersen.nl (jaar 2 H1–H4, jaar 4 H1, H2, H3, SE3 + EDU-Racer) staan in `economie/apps/` en zijn ingebed. Het Gemini-adres is eruit gehaald; ze vallen terug op hun lokale controle tot de koppeling met Claude (stuk 2).
- "Kopie van Hoofdstuk 1" (jaar 2) heet op de site "Hoofdstuk 1 · lesstof en PowerPoints".
- Voorpagina: banner naar Economie.
- Getest: alle 35 inhoudspagina's bouwen zonder fouten; kijkvenster, vinkjes, film; telefoon (375 px) zonder horizontale scroll.
- 18 okt 01:45: tegel "Spotprent analyseren" in app.html noemt nu alle prenten (1903–1936, ook examenprenten). Gecontroleerd: alle 11 prenten en hun examenvragen vallen binnen de grenzen van de AI-nakijker.
