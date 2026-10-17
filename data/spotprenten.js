/* Spotprenten voor spotprent.html. Analyse met de Kijkwijzer uit de lesstof (4 stappen).
   Per prent: beschrijving = wat er te zien is, in woorden (de AI ziet het plaatje niet; zelf gecontroleerd met de afbeelding).
   h = hoofdstuk(ken) waarvan de AI-nakijker de lesstof gebruikt. Alleen prenten met vrije rechten (zie docs/spotprenten-bronnen.md).
   Nieuwe prent: kopieer het blok, pas alles aan, zet het plaatje in img/spotprenten/.
   formaat = [breedte, hoogte] van het plaatje in pixels.
   hotspots = klikbare punten op de prent: x en y in procenten (0 = links/boven, 100 = rechts/onder),
     naam, stap (bij welke stap van de Kijkwijzer het hoort), vraag, hints [wedervraag, tip], uitleg (= het antwoord).
   stappen[].hints = [wedervraag, tip]; de derde hint is het modelantwoord. */
window.SPOTPRENTEN = [
  {
    id: "raderwerk",
    titel: "Gansch het raderwerk staat stil, als uw machtige arm het wil",
    maker: "Albert Hahn",
    jaar: 1903,
    onderwerp: "De spoorwegstaking van 1903",
    h: ["SZ", "H3"],
    img: "img/spotprenten/raderwerk-1903.jpg",
    formaat: [855, 1100],
    bronvermelding: "Albert Hahn, 1903. Collectie IISG Amsterdam (N30051000968351). Publiek domein.",
    intro: "In 1903 legde een groot deel van het spoorwegpersoneel het werk neer. De socialistische tekenaar Albert Hahn maakte over die spoorwegstaking deze spotprent.",
    beschrijving:
      "Spotprent van Albert Hahn uit 1903, over de spoorwegstaking. Bijschrift onder de prent: 'Gansch het raderwerk staat stil als uw machtige arm het wil....' Wat je ziet: in het midden staat een reusachtige spoorwegarbeider, van achteren getekend, met een pet en werkkleding. Hij steekt één hand hoog op, alsof hij stop zegt. Voor hem lopen spoorrails in een bocht naar een grote stationshal; op de rails staan locomotieven en treinen stil. Links op de achtergrond een haven met schepen. Onderaan hangen twee heel kleine heren met een hoge hoed en net pak aan de benen en de broek van de arbeider; ze kijken angstig omhoog en proberen hem vast te houden. Rechtsonder de signatuur 'Hahn'.",
    hotspots: [
      { x: 33, y: 40, naam: "De grote man", stap: 2,
        vraag: "Wie is deze grote man? Kijk naar zijn kleding.",
        hints: ["Draagt hij een net pak of werkkleding?", "Hij heeft een pet op en werkt bij het spoor. Over welke groep gaat de staking?"],
        uitleg: "Dit is een spoorwegarbeider: hij heeft een pet op en draagt werkkleding. Hij staat voor alle arbeiders die in 1903 staakten. Hahn tekent hem reusachtig groot: zo laat hij zien hoe sterk de arbeiders samen zijn." },
      { x: 64, y: 8, naam: "De opgestoken hand", stap: 3,
        vraag: "Wat doet de arbeider met zijn hand? Wat betekent dat gebaar?",
        hints: ["Wat doet een agent als hij het verkeer laat stoppen?", "Lees het bijschrift: wat gebeurt er 'als uw machtige arm het wil'?"],
        uitleg: "De arbeider steekt zijn hand op alsof hij 'stop!' zegt. Met één gebaar houdt hij alle treinen tegen. De hand staat voor de macht van de arbeiders: als zij stoppen met werken, stopt alles." },
      { x: 75, y: 35, naam: "De treinen", stap: 3,
        vraag: "Wat gebeurt er met de treinen?",
        hints: ["Rijden de treinen, of staan ze stil?", "Wie zorgt er normaal voor dat de treinen rijden?"],
        uitleg: "De treinen staan stil op de rails. Zonder het spoorwegpersoneel rijdt er niets. Zo laat Hahn zien wat de staking doet: het treinverkeer ligt plat." },
      { x: 60, y: 83, naam: "De twee kleine heren", stap: 2,
        vraag: "Wie stellen de twee kleine mannen met een hoge hoed voor? Hoe zijn ze getekend?",
        hints: ["Wie droeg er in 1903 een hoge hoed: een arbeider of een rijke heer?", "Kijk naar hun grootte en hun gezicht. Zijn ze sterk of bang?"],
        uitleg: "Het zijn rijke heren, zoals de directie van de spoorwegen of de werkgevers: dat zie je aan de hoge hoed en het nette pak. Ze zijn heel klein getekend en kijken bang omhoog. Ze trekken aan de arbeider, maar kunnen hem niet tegenhouden. Hahn tekent ze dus negatief." },
      { x: 89, y: 88, naam: "De handtekening", stap: 1,
        vraag: "Wie heeft deze spotprent gemaakt? Wat weet je over hem?",
        hints: ["Lees de naam rechtsonder.", "Aan welke kant stond deze tekenaar: die van de arbeiders of die van de rijken?"],
        uitleg: "Er staat 'Hahn': Albert Hahn. Hij was een socialistische tekenaar en stond aan de kant van de arbeiders. Dat helpt je om de boodschap te begrijpen: hij is positief over de staking." },
      { x: 22, y: 95, naam: "Het bijschrift", stap: 1,
        vraag: "Lees het bijschrift. Wat wordt er bedoeld met 'het raderwerk'?",
        hints: ["Een raderwerk is een machine met tandwielen. Waar kan het hier voor staan?", "Wat staat er stil als de arbeiders staken?"],
        uitleg: "'Gansch het raderwerk staat stil als uw machtige arm het wil' betekent: het hele land (de treinen, de economie) staat stil als de arbeiders dat willen. Het bijschrift vat de boodschap van de prent samen." }
    ],
    stappen: [
      {
        stap: 1, label: "Algemeen",
        hints: ["Welk jaartal staat bij de prent, en wat gebeurde er toen op het spoor?","Kijk naar de treinen en lees het bijschrift. Zoek daarna in je boekje op wie Albert Hahn was."],
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
        hints: ["Wat valt je op aan de grootte van de personen?","Let op de kleding: pet en werkkleding tegenover hoge hoed en net pak."],
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
        hints: ["Wat doen de treinen? En wat doet de hand van de arbeider?","Wie is 'uw machtige arm' in het bijschrift?"],
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
        hints: ["Is Hahn vóór of tegen de staking? Waaraan zie je dat?","Combineer: wie is groot en sterk, en wie is klein en bang?"],
        hulp: ["Wat is de boodschap van de tekenaar?", "Hoe weet je dat? Gebruik wat je bij stap 1 tot en met 3 hebt gevonden."],
        vraag: "Wat is de boodschap van Albert Hahn? Leg uit hoe je dat aan de spotprent ziet.",
        punten: [
          { t: "Boodschap: als de arbeiders samen het werk neerleggen (staken), ligt alles stil; de arbeiders hebben veel macht.", p: 1 },
          { t: "Uitleg hoe je dat ziet, met één goed argument. Bijvoorbeeld: de arbeider is reusachtig groot en de rijke heren zijn klein en bang, of: Hahn was socialist en dus positief over de staking.", p: 1 }
        ],
        model: "Hahn wil zeggen: als de arbeiders samen staken, ligt alles stil. De arbeiders zijn dus sterker dan de rijke heren denken. Dat zie je doordat hij de arbeider reusachtig groot tekent en de heren klein en bang. Hahn was socialist, dus hij is positief over de staking."
      }
    ]
  },
  {
    id: "zoo-moet-het",
    titel: "Zoo moet het!",
    maker: "Albert Hahn",
    jaar: 1904,
    onderwerp: "De strijd voor algemeen kiesrecht",
    h: ["SZ", "H3"],
    img: "img/spotprenten/zoo-moet-het-1904.jpg",
    formaat: [1076, 1500],
    bronvermelding: "Albert Hahn, 'Zoo moet het!', Zondagsblad van Het Volk, 11 september 1904. Collectie IISG Amsterdam (N30051000963923). Publiek domein.",
    intro: "Rond 1900 mochten alleen mannen met genoeg geld of bezit stemmen. De socialisten wilden algemeen kiesrecht, zodat ook de arbeiders konden meepraten over de sociale kwestie. In je boekje heet deze prent: 'De rijke heren worden uit het parlement geschopt'.",
    beschrijving:
      "Spotprent van Albert Hahn op de voorpagina van het Zondagsblad van Het Volk, 11 september 1904. Bijschrift onder de prent: 'Zoo moet het!' Wat je ziet: een deftig gebouw met hoge ramen en een boogdeur; boven de deur staat 'Parlement'. Uit de deur komt een reusachtige schoen die naar buiten trapt; op de zool staat 'Algemeen kiesrecht'. Voor het gebouw vluchten drie heren in een net zwart pak. De eerste rent weg met een opgerolde wet onder zijn arm waarop 'Tariefwet' staat. De tweede, dikkere heer wordt net door de schoen geraakt; zijn hoed vliegt van zijn hoofd en hij heeft een rol met 'Arbeidscontract' vast. De derde heer, met een bril, kruipt op handen en voeten weg en sleept kettingen met boeien mee. Rechtsboven in de prent de signatuur 'Hahn'.",
    hotspots: [
      { x: 45, y: 45, naam: "De grote schoen", stap: 3,
        vraag: "Lees wat er op de zool van de schoen staat. Wat doet de schoen?",
        hints: ["De schoen trapt iemand naar buiten. Wie?", "Wat zou er in het parlement veranderen als alle mannen mochten stemmen, ook de arbeiders?"],
        uitleg: "Op de zool staat 'Algemeen kiesrecht'. De schoen trapt de rijke heren het parlement uit. Hahn bedoelt: als iedereen mag stemmen, kiezen de arbeiders hun eigen vertegenwoordigers. Dan is er geen plaats meer voor deze rijke heren." },
      { x: 55, y: 22, naam: "Het gebouw", stap: 3,
        vraag: "Welk gebouw is dit? Lees de tekst boven de deur.",
        hints: ["Boven de deur staat één woord.", "Wat gebeurt er in dit gebouw? Wie zitten er?"],
        uitleg: "Boven de deur staat 'Parlement'. Daar worden de wetten gemaakt. In 1904 mochten alleen mannen met genoeg geld stemmen, dus in het parlement zaten vooral rijke heren." },
      { x: 14, y: 61, naam: "De heer met de Tariefwet", stap: 2,
        vraag: "Wat doet deze man en wat heeft hij onder zijn arm?",
        hints: ["Hij rent. Waarom?", "Lees de tekst op de rol. Een rol papier staat hier voor een wet."],
        uitleg: "Hij rent weg met een rol onder zijn arm waarop 'Tariefwet' staat: een wet die hij in het parlement wilde maken. Hahn tekent hem als een rijke heer (net pak) die moet vluchten. Met een tariefwet komt er belasting op producten uit het buitenland, zodat die duurder worden." },
      { x: 37, y: 59, naam: "De heer met het Arbeidscontract", stap: 2,
        vraag: "Wat gebeurt er met deze dikke heer? Hoe heeft Hahn hem getekend?",
        hints: ["Wat gebeurt er met zijn hoed?", "Kijk naar zijn gezicht en zijn houding. Is hij hier de baas?"],
        uitleg: "De schoen raakt hem net: zijn hoed vliegt eraf en hij kijkt geschrokken. Hij houdt een rol 'Arbeidscontract' vast, ook een wet waar de heren mee bezig waren. Hahn maakt hem belachelijk: dik, bang en op de vlucht. Hij is dus negatief getekend." },
      { x: 71, y: 75, naam: "De heer met de kettingen", stap: 3,
        vraag: "Wat sleept deze man achter zich aan? Waar staan kettingen en boeien meestal voor?",
        hints: ["Waarvoor gebruik je boeien?", "Wie werd er volgens de socialisten 'geboeid' of onderdrukt?"],
        uitleg: "Hij kruipt weg en sleept kettingen met boeien mee. Kettingen en boeien staan voor onderdrukking: iemand vastzetten of zijn vrijheid afpakken. Hahn laat zien dat deze heren de arbeiders onderdrukten. Nu gaan ze het parlement uit, en ze nemen de boeien mee." },
      { x: 38, y: 95, naam: "Het bijschrift", stap: 4,
        vraag: "Het bijschrift is 'Zoo moet het!'. Wat bedoelt Hahn daarmee?",
        hints: ["Is Hahn blij of boos over wat er gebeurt?", "Wat moet er volgens Hahn met het parlement gebeuren?"],
        uitleg: "'Zoo moet het!' betekent: zo moet het gaan. Hahn vindt dat er algemeen kiesrecht moet komen, zodat de rijke heren uit het parlement verdwijnen. Het bijschrift is dus een oproep en de boodschap in drie woorden." },
      { x: 90, y: 9, naam: "Het Volk", stap: 1,
        vraag: "In welke krant stond deze prent, en in welk jaar?",
        hints: ["Lees de kop en de datum bovenaan.", "Het Volk was de krant van de socialisten. Wat betekent dat voor de mening van de tekenaar?"],
        uitleg: "De prent stond op 11 september 1904 in het Zondagsblad van Het Volk, de krant van de sociaaldemocraten. Ook de tekenaar, Albert Hahn, was socialist. De prent is dus gemaakt vanuit de kant van de arbeiders." }
    ],
    stappen: [
      {
        stap: 1, label: "Algemeen",
        hints: ["Lees de tekst op de schoen en boven de deur. Over welk recht gaat het?", "Wie mocht er in 1904 stemmen? Zoek in je boekje bij 'Kiesrecht'."],
        hulp: ["Lees de informatie bij de prent: onderwerp, tekenaar, jaartal.", "Wat zegt het bijschrift? Vaak is dat een samenvatting.", "Wat weet je over de tekenaar? Bij welke groep hoorde hij?"],
        vraag: "Over welk onderwerp gaat deze spotprent, en hoe weet je dat? Wat weet je over de tekenaar?",
        punten: [
          { t: "De spotprent gaat over (de strijd voor) algemeen kiesrecht.", p: 1 },
          { t: "Bewijs uit de prent: op de schoen staat 'Algemeen kiesrecht' en/of boven de deur staat 'Parlement'.", p: 1 },
          { t: "Albert Hahn was een socialistische tekenaar (hij stond aan de kant van de arbeiders).", p: 1 }
        ],
        model: "De spotprent gaat over de strijd voor algemeen kiesrecht. Dat zie je aan de tekst 'Algemeen kiesrecht' op de schoen en aan het woord 'Parlement' boven de deur. De tekenaar, Albert Hahn, was een socialist. Hij stond aan de kant van de arbeiders en wilde dat zij ook mochten stemmen."
      },
      {
        stap: 2, label: "De personen",
        hints: ["Hoe zijn de drie mannen gekleed? Hoort dat bij arbeiders of bij rijke heren?", "Kijk wat ze doen: blijven ze staan, of vluchten ze?"],
        hulp: ["Wie stellen de personen voor? Let op kleding en wat ze bij zich hebben.", "Zijn ze positief of negatief getekend? Hoe zie je dat?", "Wat doen de personen?"],
        vraag: "Wie stellen de drie mannen voor? Hoe heeft Hahn ze getekend en wat doen ze?",
        punten: [
          { t: "De mannen zijn rijke heren die in het parlement zaten (politici van de rijken).", p: 1 },
          { t: "Ze zijn negatief getekend: bang, belachelijk, op de vlucht (hoed vliegt af, kruipen).", p: 1 },
          { t: "Ze worden het parlement uit geschopt en vluchten weg met hun wetten.", p: 1 }
        ],
        model: "De drie mannen zijn rijke heren die in het parlement zaten. Dat zie je aan hun nette pakken. Hahn tekent ze negatief: ze zijn bang, de hoed van één man vliegt eraf en een ander kruipt weg. Ze worden het parlement uit geschopt en vluchten met hun wetten onder de arm."
      },
      {
        stap: 3, label: "Andere delen",
        hints: ["Welke drie teksten zie je op de spullen? Waar staan die voor?", "Waar staan kettingen meestal voor?"],
        hulp: ["Welke dingen zie je nog? Kijk ook naar teksten en details.", "Wat stellen die dingen voor?"],
        vraag: "Wat zie je nog meer op de spotprent, en wat betekent dat? Noem minstens twee dingen.",
        punten: [
          { t: "De schoen met 'Algemeen kiesrecht' schopt de heren eruit: door algemeen kiesrecht verdwijnen de rijke heren uit het parlement (of: krijgen de arbeiders invloed).", p: 1 },
          { t: "Nog een goed verklaard onderdeel, bijvoorbeeld: het gebouw is het parlement (waar de wetten worden gemaakt), de rollen zijn hun wetten (Tariefwet, Arbeidscontract), of de kettingen staan voor onderdrukking van de arbeiders.", p: 1 }
        ],
        model: "De grote schoen met 'Algemeen kiesrecht' schopt de heren het parlement uit. Dat betekent: als iedereen mag stemmen, verdwijnen de rijke heren uit het parlement. De rollen onder hun arm zijn hun wetten, zoals de Tariefwet. De kettingen die de laatste man meesleept, staan voor de onderdrukking van de arbeiders."
      },
      {
        stap: 4, label: "Conclusie",
        hints: ["Lees het bijschrift nog eens: 'Zoo moet het!'. Is dat positief of negatief?", "Wat moet er volgens Hahn komen, en wat gebeurt er dan met de rijke heren?"],
        hulp: ["Wat is de boodschap van de tekenaar?", "Hoe weet je dat? Gebruik wat je bij stap 1 tot en met 3 hebt gevonden."],
        vraag: "Wat is de boodschap van Albert Hahn? Leg uit hoe je dat aan de spotprent ziet.",
        punten: [
          { t: "Boodschap: er moet algemeen kiesrecht komen; dan krijgen de arbeiders invloed en verdwijnen de rijke heren uit het parlement.", p: 1 },
          { t: "Uitleg met één goed argument, bijvoorbeeld: het bijschrift 'Zoo moet het!', de schoen 'Algemeen kiesrecht' die de heren eruit trapt, of: Hahn was socialist en wilde kiesrecht voor de arbeiders.", p: 1 }
        ],
        model: "Hahn wil zeggen: er moet algemeen kiesrecht komen. Dan kunnen de arbeiders meebeslissen en verdwijnen de rijke heren uit het parlement. Dat zie je aan de schoen met 'Algemeen kiesrecht' die de heren eruit trapt, en aan het bijschrift 'Zoo moet het!'. Hahn was socialist, dus hij is hier blij mee."
      }
    ]
  },
  {
    id: "regering-werkloosheid",
    titel: "De regering en de werkloosheid",
    maker: "Albert Hahn jr.",
    jaar: 1936,
    onderwerp: "De crisis van de jaren dertig en de aanpassingspolitiek",
    h: ["SZ", "H3"],
    img: "img/spotprenten/regering-werkloosheid-1936.jpg",
    formaat: [1139, 1500],
    bronvermelding: "Albert Hahn jr., 'De regering en de werkloosheid', De Notenkraker, 8 februari 1936. Collectie IISG Amsterdam (N30051000943149). Publiek domein.",
    intro: "In de crisis van de jaren dertig werden heel veel mensen werkloos. De regering van premier Colijn voerde de aanpassingspolitiek: ze bezuinigde, ook op de steun voor werklozen. Deze spotprent staat in je boekje bij 'Aanpassingspolitiek'.",
    beschrijving:
      "Spotprent van Albert Hahn jr. op de voorpagina van De Notenkraker, 8 februari 1936. Titel bovenaan: 'De regering en de werkloosheid'. Bijschrift onderaan: 'Afwachten....' Wat je ziet: een oude man in een deftig ambtskostuum van een minister: een steek (hoed) met witte veren, een donkere jas met veel goudborduursel en een witte broek. Hij staat rustig en droog op een houten steiger, leunt met zijn arm op een houten meerpaal en kijkt opzij. Onder de steiger is water met golven. Links steekt uit het water een hand omhoog van iemand die aan het verdrinken is. De man kijkt niet naar de hand en doet niets. Rechts de signatuur 'Hahn jr.'",
    hotspots: [
      { x: 70, y: 40, naam: "De man in het ambtskostuum", stap: 2,
        vraag: "Wie stelt deze man voor? Kijk naar zijn kleding en lees de titel.",
        hints: ["Zo'n steek met veren en een jas met goud droegen ministers bij plechtige gelegenheden.", "Lees de titel bovenaan: 'De ... en de werkloosheid'."],
        uitleg: "De man draagt een deftig ministerskostuum: een steek met veren en een jas met goudborduursel. Volgens de titel stelt hij 'de regering' voor. In 1936 was dat de regering van premier Colijn." },
      { x: 17, y: 78, naam: "De hand in het water", stap: 2,
        vraag: "Van wie is deze hand? Wat gebeurt er met die persoon?",
        hints: ["Waarom steekt iemand zijn hand uit het water?", "Over welke groep mensen gaat de titel van de prent?"],
        uitleg: "Uit het water steekt de hand van iemand die verdrinkt en om hulp vraagt. Volgens de titel staat die persoon voor de werklozen. In 1935 waren er in Nederland 640.000 werklozen." },
      { x: 75, y: 92, naam: "Het water", stap: 3,
        vraag: "Waar staat het water voor? Gebruik de titel.",
        hints: ["Wat gebeurt er als je in diep water valt en niet kunt zwemmen?", "Waar 'verdrinken' de mensen in deze tijd in?"],
        uitleg: "Het water staat voor de werkloosheid en de crisis. De werklozen gaan erin ten onder. De minister staat er droog boven: hij heeft er zelf geen last van." },
      { x: 60, y: 70, naam: "De steiger en de paal", stap: 3,
        vraag: "Hoe staat de man op de steiger? Lijkt hij gehaast of rustig?",
        hints: ["Kijk naar zijn houding: leunen, benen gekruist, hand in de zij.", "Iemand die wil helpen, rent naar de rand. Wat doet deze man?"],
        uitleg: "De man leunt ontspannen op een meerpaal en kijkt de andere kant op. Hij doet geen moeite om de drenkeling te helpen. Zo laat Hahn jr. zien dat de regering volgens hem niets doet aan de werkloosheid." },
      { x: 36, y: 94, naam: "Het bijschrift", stap: 4,
        vraag: "Het bijschrift is 'Afwachten....'. Wat bedoelt de tekenaar daarmee?",
        hints: ["Wie wacht er af, en waarop?", "Wat dacht de regering-Colijn: zou de economie zich vanzelf herstellen?"],
        uitleg: "'Afwachten' betekent: niets doen en wachten tot het vanzelf beter wordt. De regering-Colijn dacht dat de economie zich vanzelf zou herstellen. Ze wilde geen schulden maken en bezuinigde, ook op de steun voor werklozen. De tekenaar vindt dat afwachten fout, want intussen 'verdrinken' de werklozen." },
      { x: 50, y: 16, naam: "De titel", stap: 1,
        vraag: "Lees de titel. Over welke twee dingen gaat de spotprent?",
        hints: ["De titel noemt twee dingen: 'De ...' en 'de ...'.", "Zoek in de prent: welke figuur hoort bij welk woord uit de titel?"],
        uitleg: "De titel is 'De regering en de werkloosheid'. De man in het ambtskostuum is de regering, de hand in het water is de werkloze. De titel vertelt je dus wie wie is." },
      { x: 93, y: 6, naam: "De Notenkraker", stap: 1,
        vraag: "In welk blad stond deze prent, en wanneer? Wat zegt dat over de mening van de tekenaar?",
        hints: ["Lees de kop en de datum bovenaan.", "De Notenkraker was een spotblad van de sociaaldemocraten (SDAP). Waren die het eens met Colijn?"],
        uitleg: "De prent stond op 8 februari 1936 op de voorpagina van De Notenkraker, een satirisch weekblad van de sociaaldemocraten. Die wilden dat de overheid juist geld uitgaf om werk te maken (het Plan van de Arbeid, 1935). De tekenaar is dus kritisch over de regering." }
    ],
    stappen: [
      {
        stap: 1, label: "Algemeen",
        hints: ["Lees de titel en het jaartal. Welke crisis speelde er in 1936?", "In welk blad stond de prent? Zoek in je boekje wat de sociaaldemocraten van de aanpassingspolitiek vonden."],
        hulp: ["Lees de informatie bij de prent: onderwerp, tekenaar, jaartal.", "Wat zegt de titel? En het bijschrift?", "Wat weet je over de tekenaar en het blad?"],
        vraag: "Over welk onderwerp gaat deze spotprent, en hoe weet je dat? Wat weet je over de tekenaar?",
        punten: [
          { t: "De spotprent gaat over de werkloosheid in de crisis van de jaren dertig (en wat de regering daaraan deed: de aanpassingspolitiek).", p: 1 },
          { t: "Bewijs: de titel 'De regering en de werkloosheid' en/of het jaartal 1936.", p: 1 },
          { t: "De tekenaar (Albert Hahn jr.) tekende voor De Notenkraker, een blad van de sociaaldemocraten, en was dus kritisch over de regering.", p: 1 }
        ],
        model: "De spotprent gaat over de werkloosheid in de crisis van de jaren dertig en over wat de regering daaraan deed. Dat zie je aan de titel 'De regering en de werkloosheid' en aan het jaartal 1936. De tekenaar, Albert Hahn jr., tekende voor De Notenkraker, een blad van de sociaaldemocraten. Hij was dus kritisch over de regering van Colijn."
      },
      {
        stap: 2, label: "De personen",
        hints: ["Er zijn twee 'personen': de man op de steiger en de hand in het water. Wie is wie? De titel helpt.", "Kijk naar de houding van de man. Helpt hij?"],
        hulp: ["Wie stellen de personen voor? Let op kleding en de titel.", "Zijn ze positief of negatief getekend? Hoe zie je dat?", "Wat doen de personen?"],
        vraag: "Wie stellen de man op de steiger en de hand in het water voor? Hoe zijn ze getekend en wat doen ze?",
        punten: [
          { t: "De man in het ministerskostuum stelt de regering voor (de regering-Colijn).", p: 1 },
          { t: "De hand in het water is van een werkloze die verdrinkt (de werklozen).", p: 1 },
          { t: "De regering is negatief getekend: de man staat rustig en droog, kijkt weg en helpt de drenkeling niet.", p: 1 }
        ],
        model: "De man in het deftige ministerskostuum stelt de regering voor; in 1936 was dat de regering van Colijn. De hand in het water is van een werkloze die verdrinkt. De regering is negatief getekend: de man leunt rustig op een paal, staat zelf droog en kijkt weg. Hij helpt de werkloze niet."
      },
      {
        stap: 3, label: "Andere delen",
        hints: ["Waar staat het water voor? En de droge steiger?", "Lees het bijschrift 'Afwachten....'. Wie wacht af?"],
        hulp: ["Welke dingen zie je nog? Kijk ook naar teksten en details.", "Wat stellen die dingen voor?"],
        vraag: "Wat zie je nog meer op de spotprent, en wat betekent dat? Gebruik ook het bijschrift.",
        punten: [
          { t: "Het water staat voor de werkloosheid/crisis waarin de werklozen ten onder gaan.", p: 1 },
          { t: "Het bijschrift 'Afwachten....' betekent dat de regering niets doet en wacht tot de economie zich vanzelf herstelt.", p: 1 }
        ],
        model: "Het water staat voor de werkloosheid en de crisis: de werklozen gaan erin ten onder. De minister staat droog op de steiger: hij heeft er zelf geen last van. Het bijschrift 'Afwachten....' betekent dat de regering niets doet en wacht tot de economie zich vanzelf herstelt."
      },
      {
        stap: 4, label: "Conclusie",
        hints: ["Is de tekenaar tevreden over de regering? Hoe zie je dat?", "Wat zou de tekenaar willen dat de regering doet?"],
        hulp: ["Wat is de boodschap van de tekenaar?", "Hoe weet je dat? Gebruik wat je bij stap 1 tot en met 3 hebt gevonden."],
        vraag: "Wat is de boodschap van Albert Hahn jr.? Leg uit hoe je dat aan de spotprent ziet.",
        punten: [
          { t: "Boodschap: de regering(-Colijn) doet niets (of te weinig) tegen de werkloosheid en laat de werklozen in de steek; ze wacht alleen af.", p: 1 },
          { t: "Uitleg met één goed argument, bijvoorbeeld: de minister kijkt weg terwijl de werkloze verdrinkt, het bijschrift 'Afwachten....', of: de tekenaar was sociaaldemocraat en wilde dat de overheid geld uitgaf om werk te maken.", p: 1 }
        ],
        model: "Hahn jr. wil zeggen: de regering van Colijn laat de werklozen in de steek. Ze wacht af en doet niets, terwijl de werklozen 'verdrinken' in de crisis. Dat zie je doordat de minister rustig wegkijkt terwijl de hand uit het water steekt, en aan het bijschrift 'Afwachten....'. Als sociaaldemocraat vond de tekenaar dat de overheid juist geld moest uitgeven om werk te maken."
      }
    ]
  }
];
