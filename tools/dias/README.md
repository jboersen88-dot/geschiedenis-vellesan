# PowerPoint → dia's voor de site

Zo zijn de dia's in `slides/H1..H4/` gemaakt (exacte opmaak van de docent).

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

Zet de bestanden als `NN-S.jpg` in `slides/H4/` en print de regel voor `STEPS`. Plak die in `app.html` en `presenteer.html` (`var STEPS={"H4":{...}}`) en draai `python3 -I boekje-2/bouw.py`.
