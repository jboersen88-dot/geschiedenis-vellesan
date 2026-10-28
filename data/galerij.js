/* Interactieve plaatjes voor de Lesstof-tab (app.html, mountGal).
   Sleutel = het plaatje in PARS[..].imgs (een pad in de repo of een Drive-id).
   Plaatjes zonder blok hier (of met hotspots: []) worden gewoon groot getoond, zonder bolletjes.
   Nieuw plaatje: zet het (≤ 200 KB, 1024 px breed) in img/galerij/, vervang in PARS de Drive-id door het pad, kopieer een blok.
   w, h = pixels van het plaatje. alt = beschrijving voor screenreaders.
   intro = tekst bij het begin ({tekst, dia}), slot = tekst als alle bolletjes bekeken zijn ({tekst, vraag, dia}).
   hotspots: x en y in procenten van het plaatje (0 = links/boven, 100 = rechts/onder),
     naam, tekst (alleen wat in de lesstof staat; leeg laten als de lesstof er niets over zegt),
     vraag (een vraag aan de leerling), dia (nummer van de dia waar de tekst vandaan komt).
   Regel: geen eigen feiten. Staat het niet in de lesstof, dan alleen een vraag. */
window.GALERIJ = {
  "img/galerij/huisnijverheid.jpg": {
    w: 1024, h: 559,
    alt: "Illustratie van een boerenkamer: een man weeft aan een groot weefgetouw, een meisje staat ernaast, twee kinderen zitten op de grond met stro, een vrouw bij de haard bewerkt wol en naast haar staat een spinnewiel.",
    // H1 dia 6 'huisnijverheid': "Thuis werken voor een baas. / Op het platteland in de herfst en winter / Thuis spinnen en weven"
    intro: { tekst: "Zo zag huisnijverheid eruit: thuis werken voor een baas, op het platteland in de herfst en winter. Kijk eerst goed rond in deze kamer. Tik dan op de bolletjes.", dia: 6 },
    slot: {
      tekst: "Huisnijverheid is thuis werken voor een baas, op het platteland in de herfst en winter.",
      vraag: "Waarom denk je dat dit werk juist in de herfst en winter werd gedaan? En wat verandert er als het spinnen naar een fabriek verhuist?",
      dia: 6
    },
    hotspots: [
      { x: 22, y: 52, naam: "Het weefgetouw",
        tekst: "Thuis weven is één helft van huisnijverheid: thuis spinnen en weven.", dia: 6,
        vraag: "Een weefgetouw heeft draden nodig. Wie maakt die draden? Zoek het antwoord in de kamer." },
      { x: 62, y: 52, naam: "Het spinnewiel",
        tekst: "Thuis spinnen is de andere helft van huisnijverheid.", dia: 6,
        vraag: "Je ziet één spinnewiel. Hoeveel draden denk je dat de spinster hiermee tegelijk maakt? Op dia 9 lees je wat de Spinning Jenny daaraan veranderde." },
      { x: 84, y: 40, naam: "De vrouw bij de haard", tekst: "", dia: 0,
        vraag: "Wat denk je dat deze vrouw met de wol doet? Kijk naar de manden naast haar." },
      { x: 49, y: 74, naam: "De kinderen", tekst: "Huisnijverheid is thuis werken voor een baas.", dia: 6,
        vraag: "Wat doen deze kinderen? Wie werkt er allemaal mee in deze kamer? En wie is de baas? Je ziet hem niet in beeld." }
    ]
  }
};
