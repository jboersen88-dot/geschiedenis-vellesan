# PowerPoint → dia's voor de site

Zo zijn de dia's in `slides/H1..H4/` (boekje 1) en `slides/SZ1`, `slides/SZ2` (boekje 2) gemaakt (exacte opmaak van de docent).

1. PowerPoint is sandboxed: kopieer de .pptx eerst naar
   `~/Library/Containers/com.microsoft.Powerpoint/Data/Documents/slides-export/`.
2. Exporteer naar PDF via AppleScript (PNG-export werkt niet betrouwbaar):

```bash
osascript -e 'tell application "Microsoft PowerPoint"
  open (POSIX file "/Users/BON/Library/Containers/com.microsoft.Powerpoint/Data/Documents/slides-export/H1.pptx")
  delay 5
  save active presentation in (POSIX file "/Users/BON/Library/Containers/com.microsoft.Powerpoint/Data/Documents/slides-export/H1.pdf") as save as PDF
  close active presentation saving no
end tell'
```

3. Zet de PDF om naar JPG's per dia (1600 px breed, ~300 KB per dia):

```bash
swiftc -O tools/dias/pdf2jpg.swift -o /tmp/pdf2jpg
```

```bash
/tmp/pdf2jpg ~/Library/Containers/com.microsoft.Powerpoint/Data/Documents/slides-export/H1.pdf slides/H1 800
```

Het laatste getal is de breedte in punten; op een Retina-Mac wordt dat 2× zoveel pixels (800 → 1600 px).
4. Zet het aantal dia's in `DECK` in `app.html` (bijv. `"H1":21`). De dia-viewer en `presenteer.html?h=H1` gebruiken die automatisch.

**Boekje 2**: de map heet `slides/SZ<n>/` voor hoofdstuk `H<n>` (hoofdstuk-id's zijn daar ook H1..H4, maar `slides/H1` is van boekje 1). Zet het aantal dia's in `DECK2` en de klikstappen in `STEPS2` in `presenteer.html` (`?b=2&h=H1`); `python3 -I boekje-2/bouw.py` neemt ze over in `boekje-2/app.html`, met het pad `../slides/SZ<n>/`, de presenteerlink `?b=2` en een eigen opslagsleutel `deck2-` (de plek in de dia's). Boekje 2 had op 2026-10-28 geen -9074: H1 (25 dia's) en H2 (24 dia's) exporteerden direct.

## Klikstappen (animaties uit de PowerPoint)

De dia-JPG's hierboven tonen elke dia met alles zichtbaar. De animaties ("klik, volgend element verschijnt") komen als extra stap-afbeeldingen. Per geanimeerde dia met k klikken: `NN-0.jpg` … `NN-(k-1).jpg` (toestand na 0 … k-1 klikken, 1280 px breed) en als laatste stap de gewone `NN.jpg`. De viewer en `presenteer.html` gaan bij "volgende" eerst door de stappen en dan naar de volgende dia. De vlieg- en groei-beweging zelf zit er niet in: elk element verschijnt met een zachte fade.

```bash
python3 -I tools/dias/stappen.py analyse materiaal/h4-welvaart-voor-iedereen.pptx
```

Laat per dia zien welke vormen bij welke klik horen (controle). Dan:

```bash
python3 -I tools/dias/stappen.py bouw materiaal/h4-welvaart-voor-iedereen.pptx /tmp/H4s.pptx
```

Maakt een pptx met voor elke stap een eigen dia (nog niet getoonde vormen verborgen, tekst per alinea) plus `/tmp/H4s.json` (welke pagina bij welke dia en stap hoort). Kopieer `/tmp/H4s.pptx` naar de `slides-export`-map, exporteer naar PDF zoals bij stap 2 hierboven, en dan:

```bash
/tmp/pdf2jpg ~/Library/Containers/com.microsoft.Powerpoint/Data/Documents/slides-export/H4s.pdf /tmp/jH4 640 0.6
```

(640 punten = 1280 px; 0.6 is de JPG-kwaliteit, ≈ 110 KB per stap.)

```bash
python3 -I tools/dias/stappen.py plaats /tmp/H4s.json /tmp/jH4 slides/H4
```

Zet de bestanden als `NN-S.jpg` in `slides/H4/` en print de regel voor `STEPS`. Verdwijnt er bij de animatie een vorm (een 'exit'-effect, zoals de foto op dia 25 van boekje 2 H1), dan is de gewone export van de dia niet de eindstand van de presentatie: `bouw` maakt dan een extra pagina `[dia, -1]` en `plaats` zet die als `NN.jpg` neer (render die pagina met `pdf2jpg … 800` voor 1600 px, net als de gewone dia's). Plak die in `app.html` en `presenteer.html` (`var STEPS={"H4":{...}}`) en draai `python3 -I boekje-2/bouw.py`.

**Let op**: gebruik voor elke export een nieuwe bestandsnaam in `slides-export` en sluit alleen je eigen bestand (`close presentation "naam.pptx" saving no`), nooit "active presentation": als je zelf een presentatie open hebt, is dat de actieve. Geeft PowerPoint bij `open` fout -9074, dan weigert het bestanden te openen (bij H1/H3 gebeurde dat op 2026-10-28, ook voor de originele pptx): sluit dialoogvensters in PowerPoint of start PowerPoint opnieuw en probeer het nog eens. H1 en H3 van boekje 1 hebben tekst die per alinea verschijnt (`stappen.py` maakt de alinea's die nog niet aan de beurt zijn leeg); dat is gecontroleerd met een echte export van boekje 2 H1 dia 25 (11 klikken, klopt met de animatie in de pptx), nog niet met die van boekje 1.
