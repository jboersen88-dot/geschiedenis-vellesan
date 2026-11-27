# Mini-games: contract

Elke opdracht in `data/stops.js` heeft een `type`. Voor elk type registreert een gamebestand een engine:

```js
Quest.game("piano", {
  titel: "Speel de melodie",     // korte titel op de opdrachtkaart
  icoon: "🎹",                    // één emoji
  render: function (host, o, api) {
    // host: leeg <div class="g"> waarin je alles bouwt (breedte 100%, max ~640px)
    // o: het opdracht-object uit stops.js (o.vraag staat al boven host, toon die NIET opnieuw)
    // api: zie hieronder
    // return optioneel een cleanup-functie (timers, listeners, requestAnimationFrame stoppen)
  }
});
```

## api

| | |
|---|---|
| `api.done(sterren)` | Roep precies één keer aan als de opdracht af is. `sterren` 1, 2 of 3 (prestatie). De app toont dan zelf de beloning. Daarna mag de game blijven staan. |
| `api.sfx(naam)` | Geluid: `"tap"`, `"good"`, `"bad"`, `"pop"`, `"coin"`, `"tick"`, `"whoosh"`, `"unlock"`, `"win"`, `"note:N"` (N = 0..11 halve tonen boven C5), `"fizz"`. |
| `api.burst(element)` | Deeltjes-explosie vanaf het midden van een element. |
| `api.el(tag, attrs, ...kinderen)` | DOM-helper. attrs: `class`, `text`, `onclick`, en elke andere attribute. |
| `api.shuffle(array)` | Geeft een geschudde kopie. |
| `api.reduced` | `true` als de gebruiker minder beweging wil. Geen bewegende animaties dan. |
| `api.speak(tekst, lang)` | Spreekt tekst uit (speechSynthesis), stil als dat niet kan. |
| `api.motion(cb)` | Vraagt (op tik) toegang tot beweging op iOS en roept `cb({x,y,z, shake})` aan bij beweging; geeft een stop-functie terug. Werkt niet op desktop: zorg altijd voor een knop als alternatief. |
| `api.done` geeft niets terug. | |

## Regels

- Gewone JavaScript (ES5-stijl mag ES2017), geen libraries, één IIFE per bestand.
- Alleen `transform` en `opacity` animeren. Respecteer `api.reduced`.
- Werkt met vinger (iPad, Safari) en muis: gebruik Pointer Events (`pointerdown/move/up`) en zet `touch-action: none` op sleepvlakken.
- Groot tikvlak: minimaal 48 px. Tekst 18 px of groter.
- Korte, simpele Nederlandse zinnen (groep 7/8). Geen leerstof, het moet leuk zijn.
- Toegankelijk: knoppen zijn `<button type="button">` met tekst of `aria-label`. Status in een element met `aria-live="polite"`.
- Nooit gegevens versturen. Niets opslaan (de app slaat voortgang zelf op).
- CSS in je eigen bestand, alle classes met prefix van je type (bijv. `.piano-key`). Gebruik de kleuren-variabelen:
  `--bg` (bijna zwart blauw), `--panel` (glas, rgba), `--line`, `--ink` (wit), `--muted`, `--accent` (oranje #f39200), `--accent2` (#ffb347), `--good` (groen), `--bad` (rood), `--radius`.
  Algemene classes die al bestaan: `.btn` (oranje knop), `.btn.ghost` (doorzichtig), `.g-msg` (statusregel), `.g-row` (flex rij met gap).
- Mislukken mag, maar laat een kind nooit vastlopen: na een paar pogingen altijd een manier om af te ronden (met 1 ster).
