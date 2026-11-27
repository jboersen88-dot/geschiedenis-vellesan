# Missie Vellesan: hoe het werkt

Digitale rondleiding voor de open dag (groep 7 en 8, iPads). Gewone HTML, CSS en JavaScript, geen build-stap.

## Bestanden

| Bestand | Wat |
|---|---|
| `index.html` | Laadt alles. Standaard donker thema (`data-theme="dark"`). |
| `data/stops.js` | Alle inhoud: stops, opdrachten, bonusfilmpjes, kluiscode. |
| `js/quest.js` | Kern: router, opslag, intro, agent kiezen, 3D-kaart, stopscherm, kijk-rond, scanner, kluisje, finale, leerlingenpas, geluid en effecten. Ook de opdrachten `mc`, `zoek`, `tel`, `open`, `foto`, `koppel`, `kluis`. |
| `js/games-a.js` | Mini-games `piano`, `lift`, `schuif`, `tegels`, `skelet`, `lab`, `teken`. |
| `js/games-b.js` | Mini-games `scherm`, `automaat`, `getal`, `vang`, `stroom`, `typen`, `sorteer`, `woord`. |
| `js/map3d.js`, `css/map3d.css` | De 3D-plattegrond: etages als platen met glazen buitenmuren; draaien, kantelen, schuiven en zoomen met vingers of muis. Gebruikt per etage `plan`, `p3` en `muur` uit `data/stops.js`; maken met `tools/maak-3d-kaart.py`. Zonder dit bestand valt de kaart terug op de oude gestapelde plaatjes. |
| `js/games-c.js` | Speelhal-games `goedfout`, `memory`, `etage` (ook gebruikt voor "Welk vak?") en `winkel` (Het winkeltje: kies een prijs; velden `seconden`, `waar: [emoji, woord]`). |
| `GAMES.md` | Het contract voor een nieuwe mini-game. |
| `img/vloer-N.webp` | Plattegrond per etage met doorzichtige achtergrond (uit `img/kaart-N.jpg`). |
| `media/<id>.mp4/.jpg` | Filmpje en stilstaand beeld per stop. `media/intro.mp4` is de montage op het startscherm. |
| `voiceover/<id>.mp3` | Vertelstem per stop (optioneel). Bestaat het bestand, dan speelt de film zonder geluid met deze stem erover. |
| `qr/posters.pdf` | Posters om te printen. Opnieuw maken: `node tools/maak-qr.js` (met `qrcode` en `playwright` op `NODE_PATH`). |

## Een stop in `data/stops.js`

```js
{
  id: "s18",                       // ook de naam van film en voice-over
  item: ["💡", "Lampje"],          // beloning voor in het kluisje
  code: "VONK",                    // QR-codewoord, 3-5 hoofdletters, uniek; staat op de poster
  naam: "B19, B20 en B21", sub: "Natuurkunde en Nederlands",
  etage: 1, x: 62, y: 13,          // plek op de plattegrond in procenten
  cijfer: 9,                       // optioneel: geheim cijfer voor de grote kluis
  clip: "media/s18.mp4",           // null = "Film volgt"
  poster: "media/s18.jpg",
  uitleg: "...", loop: "...",
  opdrachten: [ { type: "stroom", vraag: "..." }, ... ]
}
```

Een filmpje toevoegen bij een stop zonder film: zet `media/<id>.mp4` (staand, 480 x 854) en `media/<id>.jpg` neer en vul `clip` en `poster` in.

## Volgorde en adressen

- De volgorde van `stops` is de looproute. Het stopnummer is de plek in de lijst.
- QR-poster: `basisUrl + "?qr=" + code`. Ook `#qr=CODE` en typen werken.
- `?stop=N` en `#/stop/N` openen stop N. Andere schermen: `#/kaart`, `#/kluisje`, `#/finale`, `#/bonus`, `#/speelhal`.
- Met `qrVerplicht: true` zijn film en uitleg altijd te zien, maar gaan de missies pas open na het scannen.

## Prijs en speelhal

- `prijs: { aantal: 8, tekst: "..." }`: na zoveel gespeelde spelletjes (stops en speelhal samen) gaat de grote kluis open en staat er een stempel op de pas. Lager = makkelijker.
- `speelhal: [ ...opdrachten ]`: spelletjes zonder QR-code, op `#/speelhal`. Zelfde vorm als `opdrachten` bij een stop. Met `titel` en `icoon` geef je een opdracht een eigen naam en plaatje.
- Elk spelletje heeft onderaan "Overslaan, ik ga verder".

## Pijlen in de Radar

- De Radar toont pijlen naar plekken op dezelfde etage, vanaf de laatst gescande poster. De iPad gebruikt het kompas.
- `kort` bij een stop: korte naam voor de pijl.
- `hud: { draai, kijkhoek, assen }`: `draai` is de kompasrichting van "boven" op de plattegrond. Meten: open met `?ijk=1`, scan een poster, richt op een plek en tik op Instellen. Het getal wordt ook op die iPad bewaard (`vellesan-hud-draai`).

## Opslag

Alleen op de iPad, in `localStorage` onder `vellesan-missie-v2`: agent (dier, kleur, verzonnen naam), gevonden codes, gedane opdrachten, sterren, laatst gescande stop, antwoorden op tel- en open vragen. Foto's blijven alleen in het geheugen. De oude sleutel `vellesan-rondleiding-v1` wordt niet gebruikt en niet gewist. "Opnieuw beginnen" op het startscherm wist alles voor een volgend kind.
