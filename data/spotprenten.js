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
        uitleg: "Uit het water steekt de hand van iemand die verdrinkt en om hulp vraagt. Volgens de titel staat die persoon voor de werklozen. In 1935 waren er in Nederland gemiddeld ongeveer 430.000 werklozen." },
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
  },
  {
    "id": "stemt-rood",
    "titel": "Kleine luyden, zult gij nog langer uw eigen heerschers kiezen? Stemt rood!",
    "maker": "Albert Hahn",
    "jaar": 1905,
    "onderwerp": "Kiesrecht en de strijd om de stem van de arbeiders",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/stemt-rood-1905.jpg",
    "formaat": [
      1024,
      1403
    ],
    "bronvermelding": "Albert Hahn, Het Volk, 11 juni 1905. Afbeelding uit het centraal examen 2025-1 (bron 2); origineel in de collectie van het IISG (N30051002346408). Publiek domein.",
    "intro": "Een verkiezingsprent van de socialisten uit 1905. Deze prent stond in het centraal examen van 2025. De 'kleine luyden' waren gewone protestantse mensen die meestal op de ARP van Abraham Kuyper stemden.",
    "beschrijving": "Politieke tekening van Albert Hahn uit Het Volk, juni 1905, in drie delen. Bovenaan de tekst: 'Kleine luyden, zult gij nog langer uw eigen heerschers kiezen?' Daaronder twee kleine plaatjes: in elk plaatje ligt een gewone man (een 'kleine luyden') gebukt op de grond, met een groot been en een voet boven of op hem. Dan de tekst 'Arbeiders, kameraden' en een grote tekening: een sterke arbeider in een wit hemd met opgerolde mouwen staat recht overeind op een opkomende zon met stralen. In zijn handen houdt hij verbroken boeien en kettingen. Naast zijn hoofd staat in grote letters 'STEMT ROOD!'.",
    "hotspots": [
      {
        "x": 96,
        "y": 1.5,
        "naam": "De vraag bovenaan",
        "stap": 1,
        "vraag": "Lees de vraag bovenaan. Wie worden hier aangesproken, en wat wordt hun gevraagd?",
        "hints": [
          "Wie zijn 'kleine luyden'? Op welke partij stemden zij meestal?",
          "Wat bedoelt de tekenaar met 'uw eigen heerschers kiezen'?"
        ],
        "uitleg": "Hahn spreekt de 'kleine luyden' aan: gewone protestantse mensen die meestal op de ARP stemden. Hij vraagt of ze nog langer op hun eigen 'heersers' willen stemmen. Volgens Hahn kiezen ze dan juist de mensen die hen onderdrukken."
      },
      {
        "x": 25,
        "y": 9,
        "naam": "De twee kleine plaatjes",
        "stap": 2,
        "vraag": "Wat gebeurt er met de mannen in de twee kleine plaatjes?",
        "hints": [
          "Liggen ze lekker, of worden ze ergens onder gehouden?",
          "Van wie zou het grote been kunnen zijn? Kijk naar de vraag erboven."
        ],
        "uitleg": "De 'kleine luyden' liggen gebukt op de grond, met een groot been boven of op hen. Zo laat Hahn zien dat ze onderdrukt worden door hun 'heersers', terwijl ze die zelf hebben gekozen."
      },
      {
        "x": 78,
        "y": 29,
        "naam": "Arbeiders, kameraden",
        "stap": 1,
        "vraag": "Tot wie richt de tekenaar zich in het onderste deel?",
        "hints": [
          "Lees de tekst in het midden.",
          "'Kameraden' is een woord dat socialisten voor elkaar gebruikten. Wat zegt dat over de tekenaar?"
        ],
        "uitleg": "Het onderste deel richt zich tot 'arbeiders, kameraden'. Zo spraken socialisten elkaar aan. Hahn was een socialistische tekenaar en de prent stond in Het Volk, de krant van de sociaaldemocraten."
      },
      {
        "x": 50,
        "y": 60,
        "naam": "De sterke arbeider",
        "stap": 2,
        "vraag": "Hoe is de arbeider getekend? Vergelijk hem met de mannen in de kleine plaatjes.",
        "hints": [
          "Ligt hij op de grond of staat hij rechtop?",
          "Let op zijn houding, zijn armen en waar hij op staat."
        ],
        "uitleg": "De arbeider staat groot, sterk en rechtop, als een held. Hij is precies het tegenovergestelde van de gebukte 'kleine luyden'. Hahn tekent hem heel positief: zo word je als je socialistisch stemt."
      },
      {
        "x": 36,
        "y": 77,
        "naam": "De verbroken boeien",
        "stap": 3,
        "vraag": "Wat houdt de arbeider in zijn handen? Wat betekent dat?",
        "hints": [
          "Waar staan boeien en kettingen meestal voor?",
          "Zijn de boeien heel, of kapot?"
        ],
        "uitleg": "De arbeider houdt verbroken boeien vast. Boeien staan voor onderdrukking; kapotte boeien betekenen dat hij vrij is. Volgens het correctievoorschrift van het examen zegt de tekening: als je socialistisch stemt, word je vrij en niet meer onderdrukt."
      },
      {
        "x": 50,
        "y": 95,
        "naam": "De opkomende zon",
        "stap": 3,
        "vraag": "Waar staat de arbeider op? Wat zou dat betekenen?",
        "hints": [
          "Wat gebeurt er als de zon opkomt?",
          "Een opkomende zon is een bekend symbool van de socialisten. Waarvoor?"
        ],
        "uitleg": "De arbeider staat op een opkomende zon. Een opkomende zon staat voor een nieuwe tijd, een betere toekomst. De socialisten gebruikten dat symbool vaak."
      },
      {
        "x": 93,
        "y": 46,
        "naam": "Stemt rood!",
        "stap": 4,
        "vraag": "Wat roept de tekening op om te doen?",
        "hints": [
          "Welke kleur hoort bij de socialisten?",
          "Waarom zou er 'rood' staan en niet de naam van een partij?"
        ],
        "uitleg": "'Stemt rood!' betekent: stem op de socialisten (rood was hun kleur). Dat is de oproep en dus de boodschap van de tekening."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de drie teksten op de tekening van boven naar beneden.",
          "Wie maakte de tekening, en voor welke krant?"
        ],
        "punten": [
          {
            "t": "De tekening gaat over verkiezingen/het stemmen: de socialisten willen de stem van de 'kleine luyden' en arbeiders.",
            "p": 1
          },
          {
            "t": "Bewijs uit de bron: de tekst 'Stemt rood!' of de vraag aan de 'kleine luyden' over het kiezen van hun heersers.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist / de tekening is van de socialisten.",
            "p": 1
          }
        ],
        "model": "De tekening gaat over de verkiezingen: de socialisten vragen de 'kleine luyden' en de arbeiders om op hen te stemmen. Dat zie je aan de tekst 'Stemt rood!' en aan de vraag 'zult gij nog langer uw eigen heerschers kiezen?'. De tekenaar, Albert Hahn, was socialist."
      },
      {
        "stap": 2,
        "hints": [
          "Vergelijk de mannen in de kleine plaatjes met de man in de grote tekening.",
          "Wie is positief getekend en wie negatief?"
        ],
        "punten": [
          {
            "t": "De mannen bovenaan zijn 'kleine luyden' (gewone protestantse mensen, ARP-stemmers); ze liggen onderdrukt op de grond.",
            "p": 1
          },
          {
            "t": "De grote man is een arbeider; hij staat sterk en vrij rechtop.",
            "p": 1
          },
          {
            "t": "De arbeider is positief getekend, de 'kleine luyden' als zielig en onderdrukt.",
            "p": 1
          }
        ],
        "model": "Bovenaan liggen twee 'kleine luyden' gebukt op de grond, met een groot been boven hen: ze worden onderdrukt. Onderaan staat een sterke arbeider trots rechtop. Hahn tekent de arbeider positief en de 'kleine luyden' als zielig."
      },
      {
        "stap": 3,
        "hints": [
          "Wat houdt de arbeider vast en waar staat hij op?",
          "Waar staan boeien en een opkomende zon voor?"
        ],
        "punten": [
          {
            "t": "De verbroken boeien betekenen dat de arbeider vrij is / niet meer onderdrukt wordt.",
            "p": 1
          },
          {
            "t": "De opkomende zon staat voor een nieuwe, betere tijd.",
            "p": 1
          }
        ],
        "model": "De arbeider houdt verbroken boeien vast: hij is vrij en wordt niet meer onderdrukt. Hij staat op een opkomende zon, een symbool voor een nieuwe, betere tijd."
      },
      {
        "stap": 4,
        "hints": [
          "Wat moeten de 'kleine luyden' volgens de tekening doen?",
          "Wat gebeurt er volgens Hahn als ze dat doen?"
        ],
        "punten": [
          {
            "t": "Boodschap: stem niet langer op je eigen 'heersers' (de ARP), maar op de socialisten ('Stemt rood!').",
            "p": 1
          },
          {
            "t": "Uitleg: dan word je vrij en niet meer onderdrukt (verbroken boeien), of: de arbeiders worden dan sterker.",
            "p": 1
          }
        ],
        "model": "Hahn wil zeggen: 'kleine luyden', stem niet langer op de partij die jullie onderdrukt, maar stem op de socialisten. Dan worden jullie vrij en sterk, net als de arbeider met de verbroken boeien."
      }
    ],
    "examen": [
      {
        "code": "2025-1",
        "nr": 5,
        "p": 2,
        "type": "open",
        "vraag": "In de tekening worden de ‘kleine luyden’ opgeroepen om in plaats van op hun eigen partij op de socialisten te stemmen. Noem eerst de naam van de politieke partij waar de ‘kleine luyden’ normaal gesproken op stemden. Geef daarna een reden waarom de ‘kleine luyden’ volgens de tekening op de socialisten zouden moeten stemmen.",
        "cv": [
          {
            "t": "ARP (Anti-Revolutionaire Partij)",
            "p": 1
          },
          {
            "t": "Een reden volgens de tekening, bijvoorbeeld: omdat ze dan vrij zullen zijn / niet meer onderdrukt zullen worden / de arbeiders sterker of machtiger worden.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2025/vmbo-gl/documenten/cse-1/gt-0125-a-25-1-o"
      }
    ]
  },
  {
    "id": "jute",
    "titel": "In de jute-industrie",
    "maker": "Albert Hahn",
    "jaar": 1906,
    "onderwerp": "De sociale kwestie: werken in de fabriek",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/jute-1906.jpg",
    "formaat": [
      1187,
      704
    ],
    "bronvermelding": "Albert Hahn, 1906. Afbeelding uit het centraal examen 2023-2 (bron 2); originele tekening in de collectie van het IISG (N30051002461348). Publiek domein.",
    "intro": "Een spotprent uit 1906 over het werk in een jutefabriek. Jute is een grove stof waarvan bijvoorbeeld zakken worden gemaakt. Deze prent stond in het centraal examen van 2023. Bij de prent hoort de tekst: De fabrieksdirecteur: “Ik las in de krant dat jullie erg veel jutevezels inademen als jullie aan het werk zijn in mijn jutefabriek. Stop daarmee. Denken jullie dat de jute gratis is voor mij?”",
    "beschrijving": "Spotprent van Albert Hahn uit 1906. Bij de prent hoort de tekst (in modern Nederlands): De fabrieksdirecteur: 'Ik las in de krant dat jullie erg veel jutevezels inademen als jullie aan het werk zijn in mijn jutefabriek. Stop daarmee. Denken jullie dat de jute gratis is voor mij?' Wat je ziet: links een arbeidersgezin in een eenvoudig huis: een magere, oude vader met holle wangen, een vermoeide moeder in een schort en twee magere kinderen met grote ogen. Ze zien er ziek en bleek uit. Rechts staat de fabrieksdirecteur: een dikke man met bolhoed, bril, een sigaar in zijn mond, een net pak en een vest. Hij kijkt het gezin streng aan.",
    "hotspots": [
      {
        "x": 13,
        "y": 55,
        "naam": "De vader",
        "stap": 2,
        "vraag": "Hoe ziet de vader eruit? Wat zegt dat over zijn werk?",
        "hints": [
          "Kijk naar zijn gezicht en zijn lichaam.",
          "In de tekst staat dat de arbeiders jutevezels inademen. Wat doet dat met je longen?"
        ],
        "uitleg": "De vader is mager en ziet er ziek en uitgeput uit. Hahn laat zien wat het werk in de jutefabriek met de arbeiders doet: ze ademen vezels in en worden ziek."
      },
      {
        "x": 55,
        "y": 60,
        "naam": "De moeder",
        "stap": 2,
        "vraag": "Hoe kijkt de moeder? Wat zou ze denken?",
        "hints": [
          "Kijk naar haar ogen en haar houding.",
          "Is ze blij met de directeur?"
        ],
        "uitleg": "De moeder kijkt moe en verdrietig naar beneden. Het hele gezin ziet er arm en ziek uit."
      },
      {
        "x": 40,
        "y": 72,
        "naam": "De kinderen",
        "stap": 3,
        "vraag": "Waarom tekent Hahn ook de kinderen? Hoe zien zij eruit?",
        "hints": [
          "Zijn de kinderen gezond en vrolijk?",
          "Wat wil Hahn laten zien als ook de kinderen er zo uitzien?"
        ],
        "uitleg": "De kinderen zijn mager en bleek, net als hun ouders. Zo laat Hahn zien dat de armoede en het slechte werk het hele gezin treffen."
      },
      {
        "x": 85,
        "y": 60,
        "naam": "De fabrieksdirecteur",
        "stap": 2,
        "vraag": "Wie is deze man? Hoe heeft Hahn hem getekend?",
        "hints": [
          "Kijk naar zijn kleding en zijn buik.",
          "Is hij negatief of positief getekend? Waaraan zie je dat?"
        ],
        "uitleg": "Dit is de fabrieksdirecteur: dik, goed gekleed, met bolhoed en sigaar. Hij is rijk, terwijl het gezin arm en mager is. Hahn tekent hem negatief: hij kijkt streng en denkt alleen aan zijn geld."
      },
      {
        "x": 73,
        "y": 30,
        "naam": "De sigaar",
        "stap": 3,
        "vraag": "Waarom heeft de directeur een sigaar in zijn mond?",
        "hints": [
          "Wie kon in 1906 sigaren betalen?",
          "Vergelijk: de arbeiders ademen stof in, de directeur ademt …?"
        ],
        "uitleg": "De sigaar is een teken van rijkdom en gemak. De directeur rookt rustig een sigaar, terwijl zijn arbeiders ziek worden van het stof. Zo maakt Hahn de tegenstelling tussen rijk en arm extra duidelijk."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de tekst bij de prent. Wie praat er en waarover?",
          "Wie maakte de prent? Bij welke groep hoorde hij?"
        ],
        "punten": [
          {
            "t": "De prent gaat over de slechte (ongezonde) werkomstandigheden in de fabriek / de sociale kwestie.",
            "p": 1
          },
          {
            "t": "Bewijs: de tekst over de jutevezels die de arbeiders inademen, of het arme, zieke gezin.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist.",
            "p": 1
          }
        ],
        "model": "De prent gaat over de slechte werkomstandigheden in een jutefabriek, een voorbeeld van de sociale kwestie. Dat zie je aan de tekst: de arbeiders ademen veel jutevezels in. De tekenaar, Albert Hahn, was socialist."
      },
      {
        "stap": 2,
        "hints": [
          "Wie staan links en wie staat rechts?",
          "Hoe zien ze eruit: mager of dik, ziek of gezond?"
        ],
        "punten": [
          {
            "t": "Links staat een arbeidersgezin; ze zijn mager, ziek en arm getekend.",
            "p": 1
          },
          {
            "t": "Rechts staat de fabrieksdirecteur; hij is dik, rijk en goed gekleed.",
            "p": 1
          },
          {
            "t": "De directeur is negatief getekend: hij denkt alleen aan zijn jute/zijn geld, niet aan de gezondheid van de arbeiders.",
            "p": 1
          }
        ],
        "model": "Links staat een arbeidersgezin: vader, moeder en twee kinderen. Ze zijn mager en zien er ziek uit. Rechts staat de fabrieksdirecteur: dik, goed gekleed, met een sigaar. Hahn tekent hem negatief: hij vindt het alleen erg dat hij jute kwijtraakt."
      },
      {
        "stap": 3,
        "hints": [
          "Let op details: de sigaar, de kleding, de grootte van de personen.",
          "Wat betekent de vraag 'Denken jullie dat de jute gratis is voor mij?'"
        ],
        "punten": [
          {
            "t": "De sigaar/het dure pak staan voor de rijkdom van de directeur (tegenover de armoede van het gezin).",
            "p": 1
          },
          {
            "t": "De vraag van de directeur laat zien dat hij de jute (zijn winst) belangrijker vindt dan de gezondheid van de arbeiders.",
            "p": 1
          }
        ],
        "model": "De sigaar en het dure pak laten zien dat de directeur rijk is, terwijl het gezin arm is. Zijn vraag 'Denken jullie dat de jute gratis is voor mij?' laat zien dat hij alleen aan zijn geld denkt en niet aan de gezondheid van zijn arbeiders."
      },
      {
        "stap": 4,
        "hints": [
          "Wat vindt Hahn van deze directeur?",
          "Wat wil Hahn dat de lezer gaat vinden van het werk in de fabriek?"
        ],
        "punten": [
          {
            "t": "Boodschap: de arbeiders hebben het slecht / werken in ongezonde omstandigheden / worden uitgebuit; de winst van de directeur is belangrijker dan hun gezondheid.",
            "p": 1
          },
          {
            "t": "Uitleg met een goed argument uit de prent (bijvoorbeeld het zieke gezin, of de uitspraak van de directeur).",
            "p": 1
          }
        ],
        "model": "Hahn wil zeggen dat de arbeiders worden uitgebuit: ze werken in ongezonde omstandigheden en de fabrieksdirecteur vindt zijn winst belangrijker dan hun gezondheid. Dat zie je aan het zieke, magere gezin en aan wat de directeur zegt."
      }
    ],
    "examen": [
      {
        "code": "2023-2",
        "nr": 7,
        "p": 1,
        "type": "open",
        "vraag": "In de prent is een boodschap te herkennen. Welke boodschap wil de tekenaar duidelijk maken?",
        "cv": [
          {
            "t": "Uit het antwoord moet blijken dat de arbeiders het slecht hebben / er sprake is van slechte of ongezonde werkomstandigheden / de winst van de fabrieksdirecteur belangrijker is dan de gezondheid van de arbeiders / de arbeiders uitgebuit worden.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2023/vmbo-gl/documenten/cse-2/gt-0125-a-23-2-o"
      }
    ]
  },
  {
    "id": "hier-met-het-kiesrecht",
    "titel": "Hier met het kiesrecht!",
    "maker": "Albert Hahn",
    "jaar": 1906,
    "onderwerp": "Censuskiesrecht en de strijd voor algemeen kiesrecht",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/hier-met-het-kiesrecht-1906.jpg",
    "formaat": [
      1106,
      1500
    ],
    "bronvermelding": "Albert Hahn, 'Hier met het kiesrecht!', Zondagsblad van Het Volk, 16 september 1906. Collectie IISG Amsterdam (N30051000964178). Publiek domein. Deze prent stond in het centraal examen 2023-1 (bron 2).",
    "intro": "In 1906 mochten alleen mannen met genoeg geld of bezit stemmen: censuskiesrecht. De socialisten wilden algemeen kiesrecht. Deze prent stond in het centraal examen van 2023.",
    "beschrijving": "Voorpagina van het Zondagsblad van Het Volk, 16 september 1906, tekening van Albert Hahn. Kop: 'Hier met het kiesrecht!' Onderschrift: '…Het kiesrecht aan banden, vastgeklonken aan den geldzak…' Wat je ziet: een hoge, steile rots. Bovenop de rots staat een vrouw in een lange jurk; zij staat symbool voor het kiesrecht (op haar jurk/voet staat 'kiesrecht'). Ze is met een ketting vastgemaakt aan een enorme geldzak waarop 1.000.000.000 staat. Onderaan de rots staat een grote menigte arbeiders met borden. Een paar arbeiders proberen de rots op te klimmen en steken hun hand omhoog naar het kiesrecht. Links achter de rots komt de zon op, met stralen over de hele prent.",
    "hotspots": [
      {
        "x": 64,
        "y": 17,
        "naam": "De vrouw op de rots",
        "stap": 3,
        "vraag": "Waar staat deze vrouw voor? Kijk wat er bij haar staat.",
        "hints": [
          "Een vrouw in een spotprent staat vaak voor een idee, zoals vrijheid of vrede.",
          "Lees de kop van de krant: 'Hier met het …!'"
        ],
        "uitleg": "De vrouw staat symbool voor het kiesrecht. Ze staat hoog en ver weg op de rots: de arbeiders kunnen er niet bij."
      },
      {
        "x": 78,
        "y": 13,
        "naam": "De geldzak met de ketting",
        "stap": 3,
        "vraag": "Waaraan is het kiesrecht vastgemaakt? Wat betekent dat?",
        "hints": [
          "Lees het getal op de zak en het onderschrift.",
          "Wie mocht er in 1906 stemmen: iedereen, of alleen mannen met genoeg geld?"
        ],
        "uitleg": "Het kiesrecht zit met een ketting vast aan een geldzak (1.000.000.000). Dat betekent: alleen wie geld heeft, mag stemmen. Dat heet censuskiesrecht. Het onderschrift zegt het ook: 'Het kiesrecht aan banden, vastgeklonken aan den geldzak'."
      },
      {
        "x": 72,
        "y": 45,
        "naam": "De steile rots",
        "stap": 3,
        "vraag": "Waarom staat het kiesrecht op een hoge, steile rots?",
        "hints": [
          "Is het makkelijk om daar te komen?",
          "Wie moeten er naar boven klimmen?"
        ],
        "uitleg": "De steile rots laat zien hoe moeilijk het voor de arbeiders is om kiesrecht te krijgen. Ze moeten een zware klim maken."
      },
      {
        "x": 66,
        "y": 72,
        "naam": "De klimmende arbeiders",
        "stap": 2,
        "vraag": "Wat doen deze mannen?",
        "hints": [
          "Kijk naar hun armen.",
          "Wat willen ze pakken?"
        ],
        "uitleg": "Een paar arbeiders klimmen de rots op en steken hun hand uit naar het kiesrecht. Ze willen het kiesrecht veroveren."
      },
      {
        "x": 22,
        "y": 72,
        "naam": "De menigte",
        "stap": 2,
        "vraag": "Wie staan er onderaan in de menigte? Wat hebben ze bij zich?",
        "hints": [
          "Dit lijkt op een demonstratie. Wat hebben demonstranten vaak bij zich?",
          "Zijn het mannen of vrouwen? Rijk of arm?"
        ],
        "uitleg": "Onderaan staat een grote menigte arbeiders met borden: een demonstratie. Ze willen allemaal kiesrecht. Hahn laat zien dat heel veel mensen nog niet mogen stemmen."
      },
      {
        "x": 25,
        "y": 58,
        "naam": "De opkomende zon",
        "stap": 3,
        "vraag": "Wat gebeurt er op de achtergrond? Wat zou dat betekenen?",
        "hints": [
          "Wat gebeurt er als de zon opkomt?",
          "De socialisten gebruikten de opkomende zon vaak als symbool. Waarvoor?"
        ],
        "uitleg": "Achter de rots komt de zon op. Dat staat voor een nieuwe tijd die eraan komt: de tijd van algemeen kiesrecht."
      },
      {
        "x": 8,
        "y": 3,
        "naam": "Het Volk",
        "stap": 1,
        "vraag": "In welke krant stond deze tekening, en wanneer?",
        "hints": [
          "Lees de kop en de datum.",
          "Het Volk was de krant van de sociaaldemocraten. Wat vonden zij van het censuskiesrecht?"
        ],
        "uitleg": "De tekening stond op 16 september 1906 op de voorpagina van het Zondagsblad van Het Volk, de krant van de sociaaldemocraten. Zij wilden algemeen kiesrecht."
      },
      {
        "x": 20,
        "y": 93,
        "naam": "Het onderschrift",
        "stap": 4,
        "vraag": "Lees het onderschrift. Wat bedoelt Hahn ermee?",
        "hints": [
          "Wat betekent 'aan banden' en 'vastgeklonken'?",
          "Waarom staat er 'geldzak'?"
        ],
        "uitleg": "'Het kiesrecht aan banden, vastgeklonken aan den geldzak' betekent: het kiesrecht zit vast aan geld. Alleen rijke mannen mogen stemmen. Daar is Hahn het niet mee eens."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de kop en het onderschrift.",
          "Wie mocht er in 1906 stemmen? Zoek op wat censuskiesrecht is."
        ],
        "punten": [
          {
            "t": "De tekening gaat over het kiesrecht: censuskiesrecht en de strijd voor algemeen kiesrecht.",
            "p": 1
          },
          {
            "t": "Bewijs uit de bron: 'Hier met het kiesrecht!', of het onderschrift over de geldzak.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist / de tekening stond in Het Volk, de krant van de sociaaldemocraten.",
            "p": 1
          }
        ],
        "model": "De tekening gaat over het kiesrecht in 1906: alleen mannen met genoeg geld mochten stemmen (censuskiesrecht). Dat zie je aan de kop 'Hier met het kiesrecht!' en aan de geldzak. De tekenaar, Albert Hahn, was socialist; de tekening stond in Het Volk."
      },
      {
        "stap": 2,
        "hints": [
          "Wie staat er boven op de rots, en wie staan er onderaan?",
          "Wat doen de mensen onderaan?"
        ],
        "punten": [
          {
            "t": "De vrouw boven op de rots staat symbool voor het kiesrecht.",
            "p": 1
          },
          {
            "t": "De mensen onderaan zijn arbeiders die (nog) geen kiesrecht hebben; ze demonstreren en proberen het kiesrecht te bereiken.",
            "p": 1
          }
        ],
        "model": "De vrouw boven op de rots staat voor het kiesrecht. Onderaan staan heel veel arbeiders: ze demonstreren en een paar proberen de rots op te klimmen. Ze willen het kiesrecht, maar kunnen er niet bij."
      },
      {
        "stap": 3,
        "hints": [
          "Waaraan is het kiesrecht vastgemaakt?",
          "Waarom staat het op een steile rots?"
        ],
        "punten": [
          {
            "t": "Het kiesrecht zit vast aan een geldzak: alleen wie geld heeft, mag stemmen (censuskiesrecht).",
            "p": 1
          },
          {
            "t": "De steile rots laat zien dat het voor arbeiders heel moeilijk is om kiesrecht te krijgen (of: de opkomende zon staat voor een nieuwe tijd).",
            "p": 1
          }
        ],
        "model": "Het kiesrecht zit met een ketting vast aan een geldzak. Dat betekent: alleen wie geld heeft, mag stemmen. Dat is censuskiesrecht. De steile rots laat zien hoe moeilijk het voor arbeiders is om het kiesrecht te bereiken."
      },
      {
        "stap": 4,
        "hints": [
          "Wat vindt Hahn van het censuskiesrecht?",
          "Wat moet er volgens hem komen?"
        ],
        "punten": [
          {
            "t": "Boodschap: kritiek op het censuskiesrecht; het kiesrecht moet los van geld, er moet algemeen kiesrecht komen (ook voor arbeiders).",
            "p": 1
          },
          {
            "t": "Uitleg met een argument uit de prent (de geldzak, de ketting, de kop 'Hier met het kiesrecht!').",
            "p": 1
          }
        ],
        "model": "Hahn heeft kritiek op het censuskiesrecht: het kiesrecht zit vast aan geld, dus arbeiders mogen niet stemmen. Hij wil algemeen kiesrecht. Dat zie je aan de geldzak met de ketting en aan de kop 'Hier met het kiesrecht!'."
      }
    ],
    "examen": [
      {
        "code": "2023-1",
        "nr": 8,
        "p": 1,
        "type": "open",
        "vraag": "De tekening laat kritiek zien op het kiesrecht. Het kiesrecht wordt afgebeeld als een vrouw die is vastgemaakt aan een zak geld. Geef een politieke verklaring waarom het kiesrecht in de tekening is vastgemaakt aan een zak geld.",
        "cv": [
          {
            "t": "Een politieke verklaring, bijvoorbeeld: omdat het kiesrecht gekoppeld is aan het vermogen/inkomen van een man (censuskiesrecht) / omdat rijke mensen het stemrecht tegenhouden / omdat arbeiders niet genoeg geld hebben om kiesrecht te krijgen / omdat er gepleit wordt voor algemeen kiesrecht.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2023/vmbo-gl/documenten/cse-1/gt-0125-a-23-1-o"
      },
      {
        "code": "2023-1",
        "nr": 9,
        "p": 1,
        "type": "open",
        "vraag": "Stel, je wilt deze bron gebruiken voor een werkstuk, maar je twijfelt nog bij welke periode je deze bron moet plaatsen. Je kunt kiezen uit de volgende perioden: 1 vóór 1848, 2 tussen 1848 en 1919, 3 na 1919. Bij welke periode hoort de bron? Verklaar je keuze met behulp van een onderdeel van de bron. Doe het zo: De bron hoort bij periode … (vul nummer in), omdat … (geef verklaring).",
        "cv": [
          {
            "t": "Periode 2 (tussen 1848 en 1919), met een juiste verklaring uit de bron, bijvoorbeeld: in de tekening willen (mannelijke) arbeiders algemeen kiesrecht bereiken, terwijl er op dat moment censuskiesrecht was. Alleen met periode 2 én een juiste verklaring is het punt verdiend.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2023/vmbo-gl/documenten/cse-1/gt-0125-a-23-1-o"
      }
    ]
  },
  {
    "id": "ongevallenwet",
    "titel": "“De Tijd” en de Ongevallenwet",
    "maker": "Albert Hahn",
    "jaar": 1908,
    "onderwerp": "De Ongevallenwet: een uitkering na een ongeluk op het werk",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/ongevallenwet-1908.jpg",
    "formaat": [
      703,
      1500
    ],
    "bronvermelding": "Albert Hahn, '“De Tijd” en de Ongevallenwet', De Notenkraker, 2 februari 1908. Collectie IISG Amsterdam (N30051000764800). Publiek domein. Deze prent stond in het centraal examen 2018-2 (bron 6).",
    "intro": "Door de Ongevallenwet (1901) kregen arbeiders die op het werk een ongeluk kregen een kleine uitkering. Niet iedereen was daar blij mee. Deze prent stond in het centraal examen van 2018. De toekijkers zeggen: “Kijk, daar valt weer iemand die de overheid wil oplichten.”",
    "beschrijving": "Spotprent van Albert Hahn in De Notenkraker, 2 februari 1908. Titel: '“De Tijd” en de Ongevallenwet'. Onderschrift: '“Kijkt, daar gaat weer zoo'n oplichter van den Staat.”' (modern: 'Kijk, daar valt weer iemand die de overheid wil oplichten.') Wat je ziet: tegen een hoge muur staat een lange ladder. Een bouwvakker valt ondersteboven van grote hoogte naar beneden; zijn pet vliegt van zijn hoofd. Op het plein beneden staan twee heren in lange zwarte kleding met een hoed en een wandelstok rustig toe te kijken. Op de achtergrond huizen en een paar kleine figuurtjes die geschrokken hun armen in de lucht steken.",
    "hotspots": [
      {
        "x": 67,
        "y": 33,
        "naam": "De vallende man",
        "stap": 2,
        "vraag": "Wat gebeurt er met deze man?",
        "hints": [
          "Waar komt hij vandaan? Kijk naar de ladder.",
          "Wat voor werk zou hij doen?"
        ],
        "uitleg": "Een arbeider valt van grote hoogte van een ladder: een ernstig ongeluk op het werk. Precies voor zulke ongelukken was de Ongevallenwet bedoeld: dan kreeg je een kleine uitkering."
      },
      {
        "x": 35,
        "y": 55,
        "naam": "De ladder",
        "stap": 3,
        "vraag": "Waarom tekent Hahn zo'n hoge, lange ladder?",
        "hints": [
          "Was het werk van bouwvakkers toen veilig?",
          "Wat kan er gebeuren als je van zo hoog valt?"
        ],
        "uitleg": "De lange ladder laat zien hoe gevaarlijk het werk was. Een val betekende vaak dat je niet meer kon werken."
      },
      {
        "x": 57,
        "y": 60,
        "naam": "De twee toekijkers",
        "stap": 2,
        "vraag": "Wie zijn deze twee heren, en wat zeggen ze?",
        "hints": [
          "Lees het onderschrift. Helpen ze de man?",
          "Wat bedoelen ze met 'oplichter van de Staat'?"
        ],
        "uitleg": "Twee heren in het zwart kijken rustig toe en zeggen: 'Kijk, daar valt weer iemand die de overheid wil oplichten.' Ze denken dat de man expres valt om een uitkering te krijgen. Hahn tekent hen heel negatief: ze helpen niet en hebben geen medelijden."
      },
      {
        "x": 90,
        "y": 9,
        "naam": "De titel",
        "stap": 1,
        "vraag": "Lees de titel. Over welke wet gaat de prent?",
        "hints": [
          "Wat regelde de Ongevallenwet?",
          "'De Tijd' was een katholieke krant. Hahn laat zien wat volgens hem 'De Tijd' van de wet vond."
        ],
        "uitleg": "De titel is '“De Tijd” en de Ongevallenwet'. De Ongevallenwet gaf arbeiders een kleine uitkering als ze op het werk een ongeluk kregen. 'De Tijd' was een katholieke krant. De twee toekijkers staan voor de mening die Hahn aan die krant toeschrijft."
      },
      {
        "x": 10,
        "y": 88,
        "naam": "Het onderschrift",
        "stap": 4,
        "vraag": "Wat vinden de toekijkers van de Ongevallenwet? En wat vindt Hahn van de toekijkers?",
        "hints": [
          "Zijn de toekijkers positief of negatief over de wet?",
          "Denkt Hahn dat de man echt wil oplichten?"
        ],
        "uitleg": "De toekijkers zijn negatief over de wet: ze denken dat arbeiders er te makkelijk een uitkering mee krijgen, zelfs door expres te vallen. Hahn vindt dat belachelijk: iedereen ziet dat het een echt ongeluk is. Hij maakt de critici van de wet belachelijk."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de titel en het onderschrift.",
          "Welke wet uit je boekje hoort hierbij? Wat regelde die wet?"
        ],
        "punten": [
          {
            "t": "De prent gaat over de Ongevallenwet (een uitkering voor arbeiders na een ongeluk op het werk).",
            "p": 1
          },
          {
            "t": "Bewijs: de titel noemt de Ongevallenwet, of: je ziet een arbeider die een ongeluk krijgt op het werk.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist.",
            "p": 1
          }
        ],
        "model": "De prent gaat over de Ongevallenwet: arbeiders die op het werk een ongeluk kregen, kregen daardoor een kleine uitkering. Dat staat in de titel en je ziet een arbeider die van een ladder valt. De tekenaar, Albert Hahn, was socialist."
      },
      {
        "stap": 2,
        "hints": [
          "Wie valt er, en wie kijken er toe?",
          "Wat zeggen de toekijkers? Helpen ze?"
        ],
        "punten": [
          {
            "t": "De vallende man is een arbeider die een ongeluk krijgt op het werk.",
            "p": 1
          },
          {
            "t": "De toekijkers denken dat hij de overheid wil oplichten (om een uitkering te krijgen); ze zijn negatief over de wet.",
            "p": 1
          },
          {
            "t": "Hahn tekent de toekijkers negatief: ze kijken rustig toe en helpen niet.",
            "p": 1
          }
        ],
        "model": "De vallende man is een arbeider die op het werk een ongeluk krijgt. De twee heren kijken rustig toe en zeggen dat hij de overheid wil oplichten. Ze zijn dus negatief over de Ongevallenwet. Hahn tekent hen negatief, want ze helpen niet en hebben geen medelijden."
      },
      {
        "stap": 3,
        "hints": [
          "Waarom is de ladder zo hoog getekend?",
          "Wat betekent 'oplichter van den Staat'?"
        ],
        "punten": [
          {
            "t": "De hoge ladder/de val laat zien hoe gevaarlijk het werk van arbeiders was.",
            "p": 1
          },
          {
            "t": "'Oplichter van den Staat' betekent dat de toekijkers denken dat arbeiders te makkelijk (of expres) een uitkering krijgen.",
            "p": 1
          }
        ],
        "model": "De hoge ladder laat zien hoe gevaarlijk het werk was. Met 'oplichter van den Staat' bedoelen de toekijkers dat arbeiders te makkelijk een uitkering krijgen, alsof ze expres een ongeluk krijgen."
      },
      {
        "stap": 4,
        "hints": [
          "Wat vindt Hahn van de toekijkers?",
          "Is Hahn voor of tegen de Ongevallenwet?"
        ],
        "punten": [
          {
            "t": "Boodschap: Hahn maakt de tegenstanders van de Ongevallenwet belachelijk; arbeiders krijgen echte ongelukken en verdienen hulp (Hahn is vóór de wet).",
            "p": 1
          },
          {
            "t": "Uitleg met een argument uit de prent, bijvoorbeeld: de man valt echt, maar de toekijkers noemen hem een oplichter.",
            "p": 1
          }
        ],
        "model": "Hahn wil zeggen: de tegenstanders van de Ongevallenwet zijn harteloos. Arbeiders krijgen echte, ernstige ongelukken en hebben hulp nodig. Dat zie je doordat de man echt van de ladder valt, terwijl de toekijkers hem een oplichter noemen."
      }
    ],
    "examen": [
      {
        "code": "2018-2",
        "nr": 7,
        "p": 1,
        "type": "mk",
        "vraag": "Deze prent is gemaakt naar aanleiding van de Ongevallenwet. Zijn de personen die toekijken positief of negatief over de Ongevallenwet? En welk argument past daarbij?",
        "opties": [
          "Positief, want de wet helpt arbeiders bij blijvende arbeidsongeschiktheid.",
          "Positief, want de wet voorkomt dat arbeiders ongelukken zullen krijgen op hun werk.",
          "Negatief, want de wet zorgt ervoor dat arbeiders sneller zullen worden ontslagen.",
          "Negatief, want de wet zorgt ervoor dat arbeiders te gemakkelijk een uitkering kunnen aanvragen."
        ],
        "antwoord": "D",
        "url": "https://examenblad.nl/2018/vmbo-gl/documenten/cse-2/gt-0125-a-18-2-o"
      }
    ]
  },
  {
    "id": "dilemma",
    "titel": "Dilemma",
    "maker": "Albert Hahn",
    "jaar": 1910,
    "onderwerp": "Armoede en zwaar werk zonder sociale zekerheid",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/dilemma-1910.jpg",
    "formaat": [
      1500,
      1263
    ],
    "bronvermelding": "Albert Hahn, 'Dilemma', 1910. Collectie IISG Amsterdam (N30051000763984). Publiek domein. Deze prent stond in het centraal examen 2022-2 (bron 3).",
    "intro": "Een prent over armoede in een arbeidersgezin, uit 1910. Een dilemma is een moeilijke keuze. Deze prent stond in het centraal examen van 2022. Op de achtergrond ligt de echtgenoot van de vrouw dood op bed.",
    "beschrijving": "Spotprent van Albert Hahn uit 1910. Titel: 'Dilemma.' (= een moeilijke keuze). Onderschrift: '„Hij zou misschien nog leven, als hij niet zoo hard had moeten werken. Maar als hij niet zoo hard had gewerkt, had hij niet kunnen leven.”' Wat je ziet: een donkere, kale kamer in een arm huis. Rechts zit een oude vrouw met een omslagdoek en een muts op een stoel; ze kijkt verdrietig en moe voor zich uit. Links op de achtergrond, achter een gordijn, staat een bed: daar ligt haar man dood. Op de vloer staat een klein kistje. Linksonder de signatuur 'Hahn'.",
    "hotspots": [
      {
        "x": 75,
        "y": 45,
        "naam": "De oude vrouw",
        "stap": 2,
        "vraag": "Wie is deze vrouw en hoe voelt ze zich?",
        "hints": [
          "Kijk naar haar gezicht, haar kleding en haar houding.",
          "Wat is er met haar man gebeurd? Kijk naar de achtergrond."
        ],
        "uitleg": "Een arme, oude arbeidersvrouw. Ze kijkt verdrietig en moe voor zich uit. Haar man is net overleden. Ze is nu alleen en arm."
      },
      {
        "x": 30,
        "y": 40,
        "naam": "Het bed op de achtergrond",
        "stap": 3,
        "vraag": "Wat zie je op de achtergrond, achter het gordijn?",
        "hints": [
          "Lees de toelichting bij de prent.",
          "Waarom tekent Hahn de man niet duidelijk, maar in het donker?"
        ],
        "uitleg": "Op het bed ligt de man van de vrouw: hij is dood. Volgens het onderschrift heeft hij zich doodgewerkt."
      },
      {
        "x": 30,
        "y": 3,
        "naam": "De titel: Dilemma",
        "stap": 1,
        "vraag": "Wat betekent 'dilemma'? Welk dilemma had de man?",
        "hints": [
          "Een dilemma is een keuze waarbij beide keuzes slecht zijn.",
          "Lees het onderschrift: wat waren de twee keuzes?"
        ],
        "uitleg": "Een dilemma is een moeilijke keuze waarbij beide keuzes slecht zijn. De man moest kiezen: heel hard werken (en daardoor ziek worden en sterven), of minder werken (en dan niet genoeg geld hebben om te leven)."
      },
      {
        "x": 97,
        "y": 95,
        "naam": "Het onderschrift",
        "stap": 4,
        "vraag": "Leg het onderschrift uit in je eigen woorden.",
        "hints": [
          "Waarom is hij gestorven?",
          "Waarom kon hij niet minder werken?"
        ],
        "uitleg": "'Hij zou misschien nog leven, als hij niet zo hard had moeten werken. Maar als hij niet zo hard had gewerkt, had hij niet kunnen leven.' Het werk was zo zwaar dat het hem doodde, maar zonder dat werk had hij geen geld voor eten en huur. Er waren toen nog geen goede uitkeringen of pensioenen."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de titel en het onderschrift.",
          "Bij welk onderwerp uit je boekje hoort een arbeider die zich doodwerkt?"
        ],
        "punten": [
          {
            "t": "De prent gaat over armoede en zware arbeid van arbeiders (de sociale kwestie).",
            "p": 1
          },
          {
            "t": "Bewijs: het onderschrift over de man die zo hard moest werken, of de arme kamer en de dode man.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist.",
            "p": 1
          }
        ],
        "model": "De prent gaat over de armoede en het zware werk van arbeiders rond 1910: de sociale kwestie. Dat zie je aan het onderschrift over de man die zo hard moest werken en aan de arme kamer. De tekenaar, Albert Hahn, was socialist."
      },
      {
        "stap": 2,
        "hints": [
          "Wie zie je op de prent? Kijk ook naar de achtergrond.",
          "Hoe heeft Hahn de vrouw getekend?"
        ],
        "punten": [
          {
            "t": "De oude vrouw is de weduwe van een arbeider; ze is arm en verdrietig.",
            "p": 1
          },
          {
            "t": "Op de achtergrond ligt haar man dood op bed; hij heeft zich doodgewerkt.",
            "p": 1
          }
        ],
        "model": "Rechts zit een arme, oude vrouw. Ze kijkt verdrietig. Op de achtergrond ligt haar man dood op bed: hij heeft zich doodgewerkt. Hahn tekent haar met medelijden."
      },
      {
        "stap": 3,
        "hints": [
          "Wat zegt het onderschrift? Wat betekent het woord 'dilemma'?",
          "Kijk naar de kamer: hoe ziet die eruit?"
        ],
        "punten": [
          {
            "t": "Het dilemma: als de man minder had gewerkt, had hij geen geld gehad om te leven; door hard te werken is hij gestorven.",
            "p": 1
          },
          {
            "t": "De kale, donkere kamer laat de armoede van het gezin zien.",
            "p": 1
          }
        ],
        "model": "Het dilemma is: als de man minder had gewerkt, had hij niet genoeg geld gehad om te leven. Maar door zo hard te werken is hij gestorven. De kale, donkere kamer laat zien hoe arm het gezin is."
      },
      {
        "stap": 4,
        "hints": [
          "Bij welke politieke stroming past deze boodschap?",
          "Wat moet er volgens Hahn veranderen?"
        ],
        "punten": [
          {
            "t": "Boodschap: kritiek op de slechte leef- en werkomstandigheden van arbeiders; ze moeten zich doodwerken om te kunnen leven.",
            "p": 1
          },
          {
            "t": "De boodschap past bij het socialisme/de sociaaldemocraten, met een uitleg uit de prent.",
            "p": 1
          }
        ],
        "model": "Hahn heeft kritiek op de slechte werk- en leefomstandigheden van arbeiders: ze moeten zich doodwerken om te kunnen leven. Die boodschap past bij het socialisme. De socialisten wilden betere arbeidsomstandigheden en een uitkering bij ziekte en ouderdom."
      }
    ],
    "examen": [
      {
        "code": "2022-2",
        "nr": 6,
        "p": 1,
        "type": "open",
        "vraag": "Bij welke politieke stroming past de boodschap van de politieke prent? Licht je antwoord toe met behulp van de bron.",
        "cv": [
          {
            "t": "De prent past bij het socialisme / de sociaaldemocraten (ook goed: communisme, sociaal-liberalen), omdat er kritiek wordt geleverd op de slechte leef- en werkomstandigheden van arbeiders / omdat de man zich letterlijk heeft doodgewerkt. Alleen met een juiste stroming én een juiste toelichting is het punt verdiend.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2022/vmbo-gl/documenten/cse-2/gt-0125-a-22-2-o"
      }
    ]
  },
  {
    "id": "zaken-gaan-voor",
    "titel": "Zaken gaan vóór",
    "maker": "Albert Hahn",
    "jaar": 1913,
    "onderwerp": "De sociale kwestie: de macht van de patroon",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/zaken-gaan-voor-1913.jpg",
    "formaat": [
      1086,
      1500
    ],
    "bronvermelding": "Albert Hahn, 'Zaken gaan vóór', De Notenkraker, 4 januari 1913. Collectie IISG Amsterdam (N30051000840204). Publiek domein. Deze prent stond in het centraal examen 2024-2 (bron 2).",
    "intro": "Een tekening uit 1913 over een arbeider en zijn baas, de patroon. Deze prent stond in het centraal examen van 2024. Bij de tekening hoort de tekst: “Voor deze keer mag je die zwager van je nog begraven. Maar denk er voortaan aan: in deze drukke tijd kunnen wij geen begrafenissen hebben.”",
    "beschrijving": "Voorpagina van De Notenkraker, 4 januari 1913, tekening van Albert Hahn. Titel: 'Zaken gaan vóór.' Onderschrift (modern): 'Voor deze keer mag je die zwager van je nog begraven. Maar denk er voortaan aan: in deze drukke tijd kunnen wij geen begrafenissen hebben.' Wat je ziet: links een lange, magere arbeider in eenvoudige gestreepte kleding en klompen. Hij staat met gebogen hoofd en houdt zijn pet in zijn handen. Rechts een enorme, dikke patroon in een duur pak, met een snor en een sigaar waaruit rook kringelt. Hij heeft een hand op zijn dikke buik en wijst met de andere hand. De vloer is een geblokte tegelvloer.",
    "hotspots": [
      {
        "x": 22,
        "y": 50,
        "naam": "De arbeider",
        "stap": 2,
        "vraag": "Hoe staat de arbeider erbij? Wat zegt dat over hem?",
        "hints": [
          "Kijkt hij de patroon aan of naar beneden?",
          "Waarom houdt hij zijn pet in zijn handen?"
        ],
        "uitleg": "De arbeider is lang en mager, staat met gebogen hoofd en houdt zijn pet in zijn handen. Hij is onderdanig: hij moet om toestemming vragen en durft niets terug te zeggen."
      },
      {
        "x": 62,
        "y": 50,
        "naam": "De patroon",
        "stap": 2,
        "vraag": "Hoe heeft Hahn de patroon getekend?",
        "hints": [
          "Vergelijk zijn grootte en buik met die van de arbeider.",
          "Is hij positief of negatief getekend?"
        ],
        "uitleg": "De patroon is enorm groot en dik, in een duur pak. Hij is rijk en machtig. Hahn tekent hem negatief: hij denkt alleen aan zijn zaken, niet aan het verdriet van zijn arbeider."
      },
      {
        "x": 22,
        "y": 80,
        "naam": "De klompen",
        "stap": 3,
        "vraag": "Wat draagt de arbeider aan zijn voeten? En de patroon?",
        "hints": [
          "Klompen of nette schoenen: wat hoort bij arm en wat bij rijk?",
          "Waarom tekent Hahn zulke details?"
        ],
        "uitleg": "De arbeider draagt klompen, de patroon nette schoenen. Met zulke details laat Hahn het verschil tussen arm en rijk zien."
      },
      {
        "x": 40,
        "y": 27,
        "naam": "De sigaar en de rook",
        "stap": 3,
        "vraag": "Wat doet de patroon terwijl hij praat?",
        "hints": [
          "Wie kon in 1913 dure sigaren roken?",
          "Wat laat de rook zien over zijn houding: druk of op zijn gemak?"
        ],
        "uitleg": "De patroon rookt op zijn gemak een sigaar. Dat is een teken van rijkdom. Hij heeft het goed, terwijl de arbeider verdriet heeft."
      },
      {
        "x": 30,
        "y": 22,
        "naam": "De titel",
        "stap": 1,
        "vraag": "Wat betekent 'Zaken gaan vóór'?",
        "hints": [
          "Wat is voor de patroon belangrijker: zijn bedrijf of zijn arbeider?",
          "Lees het onderschrift erbij."
        ],
        "uitleg": "'Zaken gaan vóór' betekent: het bedrijf en de winst zijn belangrijker dan al het andere, zelfs dan een begrafenis in de familie van een arbeider."
      },
      {
        "x": 95,
        "y": 90,
        "naam": "Het onderschrift",
        "stap": 4,
        "vraag": "Wat zegt de patroon tegen de arbeider? Wat vind je daarvan?",
        "hints": [
          "Mag de arbeider de volgende keer weer naar een begrafenis?",
          "Wat laat dit zien over de macht van de patroon in 1913?"
        ],
        "uitleg": "De patroon zegt: 'Voor deze keer mag je je zwager nog begraven. Maar in deze drukke tijd kunnen wij geen begrafenissen hebben.' Hij bepaalt dus zelfs of zijn arbeider naar een begrafenis mag. Arbeiders hadden toen heel weinig rechten."
      },
      {
        "x": 95,
        "y": 5,
        "naam": "De Notenkraker",
        "stap": 1,
        "vraag": "In welk blad stond deze tekening?",
        "hints": [
          "Lees de kop bovenaan.",
          "De Notenkraker was een spotblad van de sociaaldemocraten (bij Het Volk). Wat betekent dat voor de mening van de tekenaar?"
        ],
        "uitleg": "De tekening stond op 4 januari 1913 op de voorpagina van De Notenkraker, het spotblad dat bij Het Volk hoorde, de krant van de sociaaldemocraten. De tekenaar staat dus aan de kant van de arbeider."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de titel en het onderschrift.",
          "Bij welke maatschappelijke discussie uit je boekje past een arbeider die nauwelijks vrij krijgt?"
        ],
        "punten": [
          {
            "t": "De tekening gaat over de sociale kwestie: de slechte positie van arbeiders tegenover de patroon.",
            "p": 1
          },
          {
            "t": "Bewijs: de patroon die bijna geen vrij geeft voor een begrafenis, of de titel 'Zaken gaan vóór'.",
            "p": 1
          },
          {
            "t": "De maker (Albert Hahn) was socialist / de tekening stond in De Notenkraker.",
            "p": 1
          }
        ],
        "model": "De tekening gaat over de sociale kwestie: de slechte positie van arbeiders tegenover hun baas. De patroon geeft zijn arbeider bijna geen vrij voor een begrafenis. De tekenaar, Albert Hahn, was socialist; de tekening stond in De Notenkraker."
      },
      {
        "stap": 2,
        "hints": [
          "Wie staat links en wie staat rechts?",
          "Vergelijk hun grootte, kleding en houding."
        ],
        "punten": [
          {
            "t": "Links staat een arbeider: arm, mager en onderdanig (pet in de hand, hoofd gebogen).",
            "p": 1
          },
          {
            "t": "Rechts staat de patroon: rijk, dik en machtig.",
            "p": 1
          },
          {
            "t": "De patroon is negatief getekend: hij denkt alleen aan zijn zaken.",
            "p": 1
          }
        ],
        "model": "Links staat een arbeider: arm en mager, met zijn pet in zijn handen en zijn hoofd gebogen. Rechts staat de patroon: enorm, dik en rijk, met een sigaar. Hahn tekent de patroon negatief: hij denkt alleen aan zijn zaken."
      },
      {
        "stap": 3,
        "hints": [
          "Let op details: klompen, sigaar, pak.",
          "Wat betekent de titel 'Zaken gaan vóór'?"
        ],
        "punten": [
          {
            "t": "Details zoals klompen tegenover nette schoenen, of de sigaar, laten het verschil tussen arm en rijk zien.",
            "p": 1
          },
          {
            "t": "'Zaken gaan vóór': winst/het bedrijf is voor de patroon belangrijker dan zijn arbeiders.",
            "p": 1
          }
        ],
        "model": "De arbeider draagt klompen, de patroon nette schoenen en hij rookt een sigaar: zo laat Hahn het verschil tussen arm en rijk zien. De titel 'Zaken gaan vóór' betekent dat het bedrijf voor de patroon belangrijker is dan zijn arbeiders."
      },
      {
        "stap": 4,
        "hints": [
          "Wat vindt Hahn van deze patroon?",
          "Bij welke politieke stroming past die mening?"
        ],
        "punten": [
          {
            "t": "Boodschap: arbeiders worden slecht behandeld / patroons denken alleen aan winst en niet aan hun arbeiders.",
            "p": 1
          },
          {
            "t": "De boodschap past bij het socialisme, met een uitleg uit de prent.",
            "p": 1
          }
        ],
        "model": "Hahn wil laten zien dat arbeiders slecht behandeld worden: de patroon denkt alleen aan zijn winst, zelfs als zijn arbeider iemand moet begraven. Die boodschap past bij het socialisme."
      }
    ],
    "examen": [
      {
        "code": "2024-2",
        "nr": 6,
        "p": 1,
        "type": "mk",
        "vraag": "De tekening past bij een maatschappelijke discussie. Welke maatschappelijke discussie wordt bedoeld? En bij welke politieke stroming past de boodschap van de tekening?",
        "opties": [
          "de schoolstrijd + liberalisme",
          "de schoolstrijd + socialisme",
          "de sociale kwestie + liberalisme",
          "de sociale kwestie + socialisme"
        ],
        "antwoord": "D",
        "url": "https://examenblad.nl/2024/vmbo-gl/documenten/cse-2/gt-0125-a-24-2-o"
      }
    ]
  },
  {
    "id": "vrouwenkiesrecht",
    "titel": "Op den landdag van den Bond voor Vrouwenkiesrecht",
    "maker": "Willy Sluiter",
    "jaar": 1916,
    "onderwerp": "De strijd voor vrouwenkiesrecht",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/vrouwenkiesrecht-1916.jpg",
    "formaat": [
      1068,
      1351
    ],
    "bronvermelding": "Willy Sluiter, 'Op den landdag van den Bond voor Vrouwenkiesrecht', De Nieuwe Amsterdammer, 1916. Afbeelding uit het centraal examen 2024-2 (bron 5); origineel in de collectie van het IISG (N30051000987138). Publiek domein (Sluiter overleed in 1949).",
    "intro": "Een politieke tekening uit 1916 over een bijeenkomst van de Bond voor Vrouwenkiesrecht. In die tijd mochten vrouwen nog niet stemmen; dat kwam pas in 1919. Deze prent stond in het centraal examen van 2024.",
    "beschrijving": "Politieke tekening van Willy Sluiter uit De Nieuwe Amsterdammer, 1916, over een landdag (grote bijeenkomst) van de Bond voor Vrouwenkiesrecht. Wat je ziet: een bijeenkomst buiten in een park, met bomen, vlaggen en een grote tent. Links staat een spreker op een houten podium. Een grote menigte, vooral vrouwen met hoeden en lange jurken, staat te luisteren. Op de voorgrond, ver van de menigte, staat een kinderwagen alleen op het gras. Daarin ligt een baby die huilt en met zijn beentjes en armpjes zwaait. Niemand let op de baby.",
    "hotspots": [
      {
        "x": 75,
        "y": 85,
        "naam": "De kinderwagen",
        "stap": 3,
        "vraag": "Wat zie je op de voorgrond? Waarom is dat het grootst getekend?",
        "hints": [
          "Is er iemand bij de baby?",
          "Wat zou de tekenaar vinden van moeders die naar deze bijeenkomst gaan?"
        ],
        "uitleg": "Op de voorgrond staat een kinderwagen met een huilende baby, helemaal alleen. Niemand let op hem, want alle vrouwen luisteren naar de spreker. De tekenaar zet de baby het grootst neer: dit is het belangrijkste deel van de prent."
      },
      {
        "x": 55,
        "y": 45,
        "naam": "De menigte vrouwen",
        "stap": 2,
        "vraag": "Wie staan er te luisteren? Wat doen ze?",
        "hints": [
          "Kijk naar hun kleding.",
          "Waarom zijn ze hier?"
        ],
        "uitleg": "Een grote groep vrouwen staat te luisteren op een bijeenkomst van de Bond voor Vrouwenkiesrecht. Ze willen dat vrouwen ook mogen stemmen."
      },
      {
        "x": 17,
        "y": 22,
        "naam": "De spreker",
        "stap": 2,
        "vraag": "Wat gebeurt er op het podium?",
        "hints": [
          "Waar luistert iedereen naar?",
          "Hoe groot is de spreker vergeleken met de baby?"
        ],
        "uitleg": "Op het podium houdt iemand een toespraak voor het vrouwenkiesrecht. De spreker is heel klein getekend, ver weg op de achtergrond. De baby op de voorgrond is veel groter."
      },
      {
        "x": 75,
        "y": 15,
        "naam": "De tent en de vlaggen",
        "stap": 1,
        "vraag": "Wat voor bijeenkomst is dit?",
        "hints": [
          "Kijk naar de tent, de vlaggen en de titel.",
          "Wat is een 'landdag'?"
        ],
        "uitleg": "Het is een landdag: een grote bijeenkomst, hier van de Bond voor Vrouwenkiesrecht. Met tent en vlaggen, buiten in een park. Leden uit het hele land kwamen erop af."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de titel. Wat is de Bond voor Vrouwenkiesrecht?",
          "Wanneer kregen vrouwen in Nederland kiesrecht?"
        ],
        "punten": [
          {
            "t": "De tekening gaat over de strijd voor vrouwenkiesrecht (een bijeenkomst van de Bond voor Vrouwenkiesrecht).",
            "p": 1
          },
          {
            "t": "Bewijs: de titel noemt de Bond voor Vrouwenkiesrecht, of: je ziet een grote bijeenkomst met vooral vrouwen.",
            "p": 1
          },
          {
            "t": "In 1916 mochten vrouwen nog niet stemmen (vrouwenkiesrecht kwam in 1919).",
            "p": 1
          }
        ],
        "model": "De tekening gaat over de strijd voor vrouwenkiesrecht: een grote bijeenkomst van de Bond voor Vrouwenkiesrecht in 1916. Dat staat in de titel en je ziet heel veel vrouwen die luisteren. In 1916 mochten vrouwen nog niet stemmen; dat kwam pas in 1919."
      },
      {
        "stap": 2,
        "hints": [
          "Wie zie je op de achtergrond, en wie op de voorgrond?",
          "Wie let er op de baby?"
        ],
        "punten": [
          {
            "t": "Op de achtergrond luistert een grote groep vrouwen naar een spreker.",
            "p": 1
          },
          {
            "t": "Op de voorgrond ligt een baby alleen te huilen in de kinderwagen; niemand let op hem.",
            "p": 1
          }
        ],
        "model": "Op de achtergrond staat een grote groep vrouwen te luisteren naar een spreker. Op de voorgrond ligt een baby alleen te huilen in een kinderwagen. Niemand let op hem."
      },
      {
        "stap": 3,
        "hints": [
          "Wat is het grootst getekend? Waarom zou dat zijn?",
          "Wat zegt het over de moeder dat de baby alleen is?"
        ],
        "punten": [
          {
            "t": "De huilende baby alleen in de kinderwagen betekent dat de moeder haar kind verwaarloost omdat ze naar de bijeenkomst is.",
            "p": 1
          },
          {
            "t": "De baby is het grootst/op de voorgrond getekend, dus dat vindt de tekenaar het belangrijkst.",
            "p": 1
          }
        ],
        "model": "De baby is het grootst getekend, op de voorgrond. Hij ligt alleen te huilen, omdat zijn moeder naar de bijeenkomst is. De tekenaar laat zien dat de moeder haar kind in de steek laat."
      },
      {
        "stap": 4,
        "hints": [
          "Is de tekenaar vóór of tegen vrouwen die voor kiesrecht strijden?",
          "Hoe zie je dat aan de baby?"
        ],
        "punten": [
          {
            "t": "Boodschap: het is niet goed dat vrouwen voor kiesrecht strijden, want dan zorgen ze slecht voor hun kinderen.",
            "p": 1
          },
          {
            "t": "Uitleg: de baby ligt alleen te huilen terwijl de vrouwen naar de bijeenkomst luisteren.",
            "p": 1
          }
        ],
        "model": "De tekenaar vindt het niet goed dat vrouwen voor kiesrecht strijden: dan zorgen ze slecht voor hun kinderen. Dat zie je aan de baby die alleen ligt te huilen terwijl alle vrouwen naar de spreker luisteren."
      }
    ],
    "examen": [
      {
        "code": "2024-2",
        "nr": 11,
        "p": 1,
        "type": "mk",
        "vraag": "In de tekening is een mening te herkennen over vrouwen die voor kiesrecht strijden. Welke mening wordt bedoeld?",
        "opties": [
          "Het is goed dat vrouwen voor het kiesrecht strijden, want dan hoeven ze niet de hele tijd voor hun kinderen te zorgen.",
          "Het is goed dat vrouwen voor het kiesrecht strijden, want dan krijgen ze dezelfde rechten als mannen.",
          "Het is niet goed dat vrouwen voor het kiesrecht strijden, want dan zorgen ze slecht voor hun kinderen.",
          "Het is niet goed dat vrouwen voor het kiesrecht strijden, want mannen hebben meer verstand van politiek."
        ],
        "antwoord": "C",
        "url": "https://examenblad.nl/2024/vmbo-gl/documenten/cse-2/gt-0125-a-24-2-o"
      }
    ]
  },
  {
    "id": "gelijkstelling",
    "titel": "Gelijkstelling van bijzonder en openbaar onderwijs",
    "maker": "Johan Braakensiek",
    "jaar": 1919,
    "onderwerp": "De Pacificatie van 1917 en het einde van de schoolstrijd",
    "h": [
      "SZ",
      "H3"
    ],
    "img": "img/spotprenten/gelijkstelling-1919.jpg",
    "formaat": [
      1500,
      1205
    ],
    "bronvermelding": "Johan Braakensiek, 'Gelijkstelling van bijzonder en openbaar onderwijs', De Amsterdammer, 21 juni 1919. Collectie IISG Amsterdam (N30051000989340). Publiek domein. Deze prent stond in het centraal examen 2022-1 (bron 3).",
    "intro": "Door de Pacificatie van 1917 kwam er een einde aan de schoolstrijd: bijzondere (christelijke) scholen kregen evenveel geld van de overheid als openbare scholen. Johan Braakensiek tekende dat als een huwelijk. Deze prent stond in het centraal examen van 2022.",
    "beschrijving": "Tekening van Johan Braakensiek uit De Amsterdammer, weekblad voor Nederland, 21 juni 1919. Titel: 'Gelijkstelling van bijzonder en openbaar onderwijs'. Onderschrift: '„Heden verschenen voor mij, de Visser, ambtenaar van den Burgerlijken Stand… enz… enz…” „En hiermede verklaar ik het huwelijk tusschen het Bijzonder en het Openbaar Onderwijs gesloten…”' Wat je ziet: een trouwerij op het gemeentehuis. In het midden een bruid in een witte trouwjurk met sluier; op haar jurk staat 'Openbaar onderwijs'. Ze geeft een man in een zwart pak de hand: de bruidegom. Uit zijn achterzak steekt een papier met 'Bijzonder onderwijs'. Rechts achter een tafel met een hamer staat een oudere heer met een bril: de ambtenaar van de burgerlijke stand, volgens het onderschrift De Visser. Links zitten heren in deftige pakken als getuigen. Linksonder de signatuur 'Joh. Braakensiek'.",
    "hotspots": [
      {
        "x": 50,
        "y": 45,
        "naam": "De bruid",
        "stap": 2,
        "vraag": "Wie stelt de bruid voor? Lees wat er op haar jurk staat.",
        "hints": [
          "Er staan twee woorden op haar jurk.",
          "Wie is dan de bruidegom?"
        ],
        "uitleg": "Op de trouwjurk staat 'Openbaar onderwijs'. De bruid staat dus voor het openbaar onderwijs: de scholen van de overheid."
      },
      {
        "x": 33,
        "y": 45,
        "naam": "De bruidegom",
        "stap": 2,
        "vraag": "Wie stelt de bruidegom voor?",
        "hints": [
          "Kijk wat er uit zijn achterzak steekt.",
          "Als de bruid het openbaar onderwijs is, wat is dan de bruidegom?"
        ],
        "uitleg": "Uit de achterzak van de bruidegom steekt een papier met 'Bijzonder onderwijs'. Hij staat voor het bijzonder onderwijs: de scholen op godsdienstige grondslag, zoals christelijke scholen."
      },
      {
        "x": 24,
        "y": 62,
        "naam": "Het papier: bijzonder onderwijs",
        "stap": 3,
        "vraag": "Wat staat er op het papier in de achterzak?",
        "hints": [
          "Lees de tekst op de rol.",
          "Wat is het verschil tussen bijzonder en openbaar onderwijs?"
        ],
        "uitleg": "Op het papier staat 'Bijzonder onderwijs'. Bijzondere scholen zijn scholen op godsdienstige grondslag. Vóór 1917 kregen die geen geld van de overheid; daar ging de schoolstrijd over."
      },
      {
        "x": 82,
        "y": 45,
        "naam": "De ambtenaar",
        "stap": 2,
        "vraag": "Wie is deze man achter de tafel, en wat doet hij?",
        "hints": [
          "Lees het onderschrift: wie 'verklaart het huwelijk gesloten'?",
          "Wat doet een ambtenaar van de burgerlijke stand?"
        ],
        "uitleg": "Dit is de ambtenaar van de burgerlijke stand die het huwelijk sluit. Volgens het onderschrift is het De Visser. Hij was in 1919 minister van Onderwijs. Hij 'trouwt' het openbaar en het bijzonder onderwijs: vanaf nu horen ze bij elkaar en worden ze gelijk behandeld."
      },
      {
        "x": 8,
        "y": 45,
        "naam": "De getuigen",
        "stap": 2,
        "vraag": "Wie zitten er links? Wat doen ze bij een huwelijk?",
        "hints": [
          "Bij een huwelijk zijn er altijd getuigen.",
          "Wie moesten het in de politiek met elkaar eens worden over de Pacificatie?"
        ],
        "uitleg": "Links zitten deftige heren als getuigen, zoals bij een echte trouwerij. Ze lijken op politici: de Pacificatie was een akkoord tussen de politieke partijen."
      },
      {
        "x": 5,
        "y": 95,
        "naam": "Het onderschrift",
        "stap": 4,
        "vraag": "Wat verklaart de ambtenaar in het onderschrift?",
        "hints": [
          "Lees de laatste zin.",
          "Waarom zou Braakensiek de Pacificatie als een huwelijk tekenen?"
        ],
        "uitleg": "De ambtenaar zegt: 'En hiermede verklaar ik het huwelijk tusschen het Bijzonder en het Openbaar Onderwijs gesloten.' Een huwelijk betekent: samen, gelijkwaardig en voor altijd. Zo laat Braakensiek zien dat bijzonder en openbaar onderwijs voortaan gelijk worden behandeld."
      },
      {
        "x": 97,
        "y": 1.5,
        "naam": "De Amsterdammer",
        "stap": 1,
        "vraag": "In welk blad stond de tekening, en wanneer?",
        "hints": [
          "Lees de kop bovenaan.",
          "Wat gebeurde er twee jaar eerder, in 1917?"
        ],
        "uitleg": "De tekening stond op 21 juni 1919 in De Amsterdammer, een weekblad. Twee jaar eerder, in 1917, was de Pacificatie gesloten. Daarin werd onder andere de financiële gelijkstelling van bijzonder en openbaar onderwijs geregeld."
      }
    ],
    "stappen": [
      {
        "stap": 1,
        "hints": [
          "Lees de titel. Welke twee soorten onderwijs worden genoemd?",
          "Wat werd er in 1917 afgesproken over het onderwijs?"
        ],
        "punten": [
          {
            "t": "De tekening gaat over de financiële gelijkstelling van bijzonder en openbaar onderwijs (de Pacificatie van 1917 / het einde van de schoolstrijd).",
            "p": 1
          },
          {
            "t": "Bewijs: de titel 'Gelijkstelling van bijzonder en openbaar onderwijs', of de woorden op de jurk en het papier.",
            "p": 1
          },
          {
            "t": "De maker is Johan Braakensiek; de tekening stond in De Amsterdammer (1919).",
            "p": 1
          }
        ],
        "model": "De tekening gaat over de financiële gelijkstelling van bijzonder en openbaar onderwijs: een onderdeel van de Pacificatie van 1917 en het einde van de schoolstrijd. Dat staat in de titel en op de jurk en het papier. De tekening is van Johan Braakensiek, uit De Amsterdammer van 1919."
      },
      {
        "stap": 2,
        "hints": [
          "Wie trouwen er? Lees de teksten op de jurk en het papier.",
          "Wie sluit het huwelijk?"
        ],
        "punten": [
          {
            "t": "De bruid is het openbaar onderwijs (tekst op de jurk).",
            "p": 1
          },
          {
            "t": "De bruidegom is het bijzonder onderwijs (papier in zijn achterzak).",
            "p": 1
          },
          {
            "t": "De man achter de tafel is de ambtenaar (De Visser, minister van Onderwijs) die het huwelijk sluit.",
            "p": 1
          }
        ],
        "model": "De bruid staat voor het openbaar onderwijs: dat staat op haar jurk. De bruidegom staat voor het bijzonder onderwijs: dat staat op het papier in zijn achterzak. De ambtenaar achter de tafel, De Visser, sluit het huwelijk."
      },
      {
        "stap": 3,
        "hints": [
          "Waarom een huwelijk? Wat betekent trouwen?",
          "Wat zegt de ambtenaar in het onderschrift?"
        ],
        "punten": [
          {
            "t": "Het huwelijk betekent dat bijzonder en openbaar onderwijs voortaan gelijk(waardig) zijn en samengaan / gelijk door de overheid worden betaald.",
            "p": 1
          },
          {
            "t": "Het onderschrift/de ambtenaar verklaart het huwelijk gesloten: de gelijkstelling is nu officieel.",
            "p": 1
          }
        ],
        "model": "Het huwelijk betekent dat het bijzonder en het openbaar onderwijs voortaan gelijkwaardig zijn: ze worden allebei door de overheid betaald. In het onderschrift verklaart de ambtenaar het huwelijk gesloten: nu is het officieel."
      },
      {
        "stap": 4,
        "hints": [
          "Wat wil Braakensiek laten zien?",
          "Is de schoolstrijd nu voorbij?"
        ],
        "punten": [
          {
            "t": "Boodschap: met de Pacificatie zijn bijzonder en openbaar onderwijs gelijkgesteld; de schoolstrijd is voorbij.",
            "p": 1
          },
          {
            "t": "Uitleg met een argument uit de prent (het huwelijk, de teksten op jurk en papier, het onderschrift).",
            "p": 1
          }
        ],
        "model": "Braakensiek laat zien dat bijzonder en openbaar onderwijs door de Pacificatie gelijk zijn geworden: ze worden allebei door de overheid betaald, alsof ze met elkaar trouwen. De schoolstrijd is daarmee voorbij."
      }
    ],
    "examen": [
      {
        "code": "2022-1",
        "nr": 9,
        "p": 1,
        "type": "open",
        "vraag": "In de tekening is een onderdeel te zien van de Pacificatie van 1917. Welk onderdeel van de Pacificatie wordt bedoeld?",
        "cv": [
          {
            "t": "Uit het antwoord moet blijken dat het gaat om de financiële gelijkstelling tussen openbaar en bijzonder onderwijs / het einde van de schoolstrijd.",
            "p": 1
          }
        ],
        "url": "https://examenblad.nl/2022/vmbo-gl/documenten/cse-1/gt-0125-a-22-1-o"
      }
    ]
  }
];
