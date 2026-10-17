/* Spotprenten voor spotprent.html. Analyse met de Kijkwijzer uit de lesstof (4 stappen).
   Per prent: beschrijving = wat er te zien is, in woorden (de AI ziet het plaatje niet; zelf gecontroleerd met de afbeelding).
   h = hoofdstuk(ken) waarvan de AI-nakijker de lesstof gebruikt. Alleen prenten met vrije rechten (zie docs/spotprenten-bronnen.md).
   Nieuwe prent: kopieer het blok, pas alles aan, zet het plaatje in img/spotprenten/. */
window.SPOTPRENTEN = [
  {
    id: "raderwerk",
    titel: "Gansch het raderwerk staat stil, als uw machtige arm het wil",
    maker: "Albert Hahn",
    jaar: 1903,
    onderwerp: "De spoorwegstaking van 1903",
    h: ["SZ", "H3"],
    img: "img/spotprenten/raderwerk-1903.jpg",
    bronvermelding: "Albert Hahn, 1903. Collectie IISG Amsterdam (N30051000968351). Publiek domein.",
    intro: "In 1903 legde een groot deel van het spoorwegpersoneel het werk neer. De socialistische tekenaar Albert Hahn maakte over die spoorwegstaking deze spotprent.",
    beschrijving:
      "Spotprent van Albert Hahn uit 1903, over de spoorwegstaking. Bijschrift onder de prent: 'Gansch het raderwerk staat stil als uw machtige arm het wil....' Wat je ziet: in het midden staat een reusachtige spoorwegarbeider, van achteren getekend, met een pet en werkkleding. Hij steekt één hand hoog op, alsof hij stop zegt. Voor hem lopen spoorrails in een bocht naar een grote stationshal; op de rails staan locomotieven en treinen stil. Links op de achtergrond een haven met schepen. Onderaan hangen twee heel kleine heren met een hoge hoed en net pak aan de benen en de broek van de arbeider; ze kijken angstig omhoog en proberen hem vast te houden. Rechtsonder de signatuur 'Hahn'.",
    stappen: [
      {
        stap: 1, label: "Algemeen",
        hulp: ["Lees de informatie bij de prent: onderwerp, tekenaar, jaartal.", "Wat zegt het bijschrift? Vaak is dat een samenvatting.", "Wat weet je over de tekenaar? Bij welke groep hoorde hij?"],
        vraag: "Over welke gebeurtenis gaat deze spotprent, en hoe weet je dat? Wat weet je over de tekenaar?",
        punten: [
          { t: "De spotprent gaat over de spoorwegstaking van 1903 (het spoorwegpersoneel legde het werk neer).", p: 1 },
          { t: "Bewijs uit de prent of de informatie erbij: het jaartal 1903, de treinen en spoorrails, of het bijschrift dat alles stilstaat.", p: 1 },
          { t: "Albert Hahn was een socialistische tekenaar (hij stond aan de kant van de arbeiders).", p: 1 }
        ],
        model: "De spotprent gaat over de spoorwegstaking van 1903. Dat zie je aan het jaartal en aan de treinen die stilstaan. Ook het bijschrift zegt dat alles stilstaat. De tekenaar, Albert Hahn, was een socialist: hij stond aan de kant van de arbeiders."
      },
      {
        stap: 2, label: "De personen",
        hulp: ["Wie stellen de personen voor? Let op kleding en grootte.", "Zijn ze positief of negatief getekend? Hoe zie je dat?", "Wat doen de personen?"],
        vraag: "Wie stellen de grote man en de twee kleine mannen voor? Hoe heeft Hahn ze getekend en wat doen ze?",
        punten: [
          { t: "De grote man is een spoorwegarbeider (pet, werkkleding): hij staat voor de stakende arbeiders.", p: 1 },
          { t: "De kleine mannen met hoge hoed zijn rijke heren: de baas, directie, werkgevers of de rijke burgerij.", p: 1 },
          { t: "Hoe ze getekend zijn: de arbeider groot en sterk (positief), de heren klein en bang of zwak (negatief).", p: 1 }
        ],
        model: "De grote man is een spoorwegarbeider: dat zie je aan zijn pet en werkkleding. Hij staat voor de arbeiders die staken. De twee kleine mannen met hoge hoed zijn rijke heren, zoals de directie van de spoorwegen. Hahn tekent de arbeider groot en sterk; hij houdt met één hand alle treinen tegen. De heren zijn klein en bang en hangen aan zijn benen om hem tegen te houden."
      },
      {
        stap: 3, label: "Andere delen",
        hulp: ["Welke dingen zie je nog? Kijk ook naar details en de achtergrond.", "Wat stellen die dingen voor?"],
        vraag: "Wat zie je nog meer op de spotprent, en wat betekent dat? Gebruik ook het bijschrift.",
        punten: [
          { t: "De treinen staan stil op de rails: door de staking ligt het treinverkeer stil.", p: 1 },
          { t: "De opgestoken hand en 'uw machtige arm' in het bijschrift staan voor de macht van de arbeiders: als zij het willen, staat alles ('het raderwerk') stil.", p: 1 }
        ],
        model: "Op de rails staan de treinen stil. Dat betekent dat door de staking het treinverkeer stilligt. De arbeider steekt zijn hand op, en het bijschrift zegt: 'Gansch het raderwerk staat stil als uw machtige arm het wil'. De arm staat voor de macht van de arbeiders: als zij stoppen met werken, staat alles stil."
      },
      {
        stap: 4, label: "Conclusie",
        hulp: ["Wat is de boodschap van de tekenaar?", "Hoe weet je dat? Gebruik wat je bij stap 1 tot en met 3 hebt gevonden."],
        vraag: "Wat is de boodschap van Albert Hahn? Leg uit hoe je dat aan de spotprent ziet.",
        punten: [
          { t: "Boodschap: als de arbeiders samen het werk neerleggen (staken), ligt alles stil; de arbeiders hebben veel macht.", p: 1 },
          { t: "Uitleg hoe je dat ziet, met één goed argument. Bijvoorbeeld: de arbeider is reusachtig groot en de rijke heren zijn klein en bang, of: Hahn was socialist en dus positief over de staking.", p: 1 }
        ],
        model: "Hahn wil zeggen: als de arbeiders samen staken, ligt alles stil. De arbeiders zijn dus sterker dan de rijke heren denken. Dat zie je doordat hij de arbeider reusachtig groot tekent en de heren klein en bang. Hahn was socialist, dus hij is positief over de staking."
      }
    ]
  }
];
