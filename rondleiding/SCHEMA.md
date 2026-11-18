# Rondleiding: data contract (data/stops.js)

`data/stops.js` sets one global: `window.RONDLEIDING = {...}`. Plain script, no modules, no build step.

```js
window.RONDLEIDING = {
  basisUrl: "https://example.nl/rondleiding/", // public address of the app; QR = basisUrl + "?qr=" + code
  qrVerplicht: true,                        // true: a stop must be found by scanning its QR first (lock screen); false: old behaviour
  titel: "Ontdek het Vellesan",            // shown on the start screen
  welkom: "korte welkomsttekst voor kinderen",
  etages: [                                 // index = etage number
    { naam: "Begane grond", kaart: "img/kaart-0.jpg", w: 1100, h: 700 },
    { naam: "1e etage",     kaart: "img/kaart-1.jpg", w: 1233, h: 800 },
    { naam: "2e etage",     kaart: "img/kaart-2.jpg", w: 1210, h: 760 }
  ],
  stops: [                                  // in walking order
    {
      id: "s01",                            // also the media file name
      code: "ZON",                          // QR code word: unique, 3-5 capital letters, easy Dutch word
      naam: "Ingang en receptie",
      etage: 0,                             // index into etages
      x: 35, y: 74,                         // position on that floor's map, in PERCENT of image width/height
      clip: "media/s01.mp4",                // portrait 480x854 mp4 with the teacher's voice
      poster: "media/s01.jpg",
      uitleg: "2-3 korte zinnen: wat is dit voor plek en hoe werkt het hier?",
      loop: "1-2 zinnen: zo loop je vanaf de vorige stop hierheen.",
      opdrachten: [                         // 2 or 3 per stop; the child chooses which to do
        { type: "mc",   vraag: "...", opties: ["a","b","c"], goed: 1, uitleg: "korte reactie na het antwoord" },
        { type: "zoek", vraag: "Zoek ... Gevonden? Tik op de knop!" },            // just a 'Gevonden!' button
        { type: "tel",  vraag: "Tel ... Hoeveel zijn het er?" },                   // number input, no right/wrong, saved
        { type: "foto", vraag: "Maak een foto van ... (geen mensen op de foto!)" },// camera input, photo shown on the iPad only, never uploaded
        { type: "open", vraag: "Wat zou jij ...?" }                                // short text input, saved
      ]
    }
  ],
  bonus: [                                  // extra clips, no map position
    { id: "b1", code: "RAKET", naam: "De grote trap", clip: "media/b1.mp4", poster: "media/b1.jpg", uitleg: "..." }
  ]
};
```

## QR treasure hunt

- Every stop and every bonus item has a unique `code` (3-5 capital letters, no confusing letters, case-insensitive when typed).
- A poster QR contains `basisUrl + "?qr=" + code`. The app also accepts `#qr=CODE`, a bare code, or any text containing `qr=CODE`.
- Stop code: the stop is marked found (`found[id]`) and opens with a "Gevonden!" banner. Bonus code: the bonus clip is unlocked (`secrets[id]`) and each found one earns 2 stars. Bonus items are the "geheime" QR posters.
- With `qrVerplicht: true` an unfound stop shows a lock screen; unfound bonus clips show as mystery cards. With `false` everything is open as before.
- localStorage state gains `found` and `secrets` (objects id -> true); old saves without them mean "nothing found".
- Posters: `node tools/maak-qr.js [basisUrl]` writes `qr/posters.html` and `qr/posters.pdf` (needs the npm packages `qrcode` and `playwright`, installed outside the app folder, see the header of the script). Reprint if the web address changes.
