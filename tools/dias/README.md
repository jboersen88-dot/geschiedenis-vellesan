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
