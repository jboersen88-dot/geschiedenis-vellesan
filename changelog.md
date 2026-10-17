# Changelog

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
