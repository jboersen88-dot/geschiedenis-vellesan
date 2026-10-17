# Changelog

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
