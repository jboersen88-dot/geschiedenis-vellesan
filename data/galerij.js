/* Interactieve plaatjes voor de Lesstof-tab (app.html, mountGal).
   Sleutel = het plaatje in PARS[..].imgs (een pad in de repo of een Drive-id).
   Plaatjes zonder blok hier (of met hotspots: []) worden gewoon groot getoond, zonder bolletjes.
   Nieuw plaatje: zet het (≤ 200 KB, 1024 px breed) in img/galerij/, vervang in PARS de Drive-id door het pad, kopieer een blok.
   w, h = pixels van het plaatje. alt = beschrijving voor screenreaders.
   intro = tekst bij het begin ({tekst, dia}), slot = tekst als alle bolletjes bekeken zijn ({tekst, vraag, dia}).
   hotspots: x en y in procenten van het plaatje (0 = links/boven, 100 = rechts/onder),
     naam, tekst (alleen wat in de lesstof staat; leeg laten als de lesstof er niets over zegt),
     vraag (een vraag aan de leerling), dia (nummer van de dia waar de tekst vandaan komt).
   Regel: geen eigen feiten. Staat het niet in de lesstof, dan alleen een vraag.

   NIEUW PLAATJE MET BOLLETJES TOEVOEGEN (ook voor boekje 2)
   1. Zet het plaatje in img/ (boekje 2: img/flow/). De sleutel hieronder moet EXACT gelijk zijn aan imgs[i][0]
      zoals het in app.html (boekje 1) of boekje-2/app.html (gebouwd uit boekje-2/data-bron.py) staat, bv. "../img/flow/loket.jpg".
   2. Kijk naar het plaatje (verklein het eerst: sips -Z 760 plaat.jpg) en zet x en y (procenten) van elk bolletje op een onderdeel dat iets te leren geeft. 3 tot 5 bolletjes.
   3. Nieuwe optionele velden:
      per plaatje:  hk = sleutel van de lesstof voor de AI-nakijker (boekje 2: "SZ", boekje 1: "H1".."H4"). Zonder hk is er geen AI-knop.
      per bolletje: punten = [{t:"nakijkpunt in eigen woorden", p:1}, ...] (2 of 3; staan ook onder 'Dit hadden we gezocht' als de AI niet bereikbaar is).
                    Zonder punten krijgt het bolletje alleen een denkvraag, zonder invulvak.
                    films = ["sleutel", ...] uit GALERIJ_FILMS hieronder (1 of 2); alleen als de film inhoudelijk past.
   4. Nieuwe Schooltv-film: zoek hem op, controleer met curl -sL -o /dev/null -w "%{http_code}" dat de pagina bestaat en dat de titel klopt, en zet hem in GALERIJ_FILMS.
   5. Boekje 2 opnieuw bouwen: python3 -I boekje-2/bouw.py   (boekje-2/app.html nooit met de hand aanpassen).
   Wat de leerling ziet: klik op een bolletje -> inzoomen, de rest vaag, tekst + vraag met invulvak ('Kijk na met AI') en 'Kijk verder'-films. */
window.GALERIJ_FILMS = {
  kinderarbeid: { t: "Afschaffing van de kinderarbeid (1874)", u: "https://schooltv.nl/video-item/afschaffing-van-de-kinderarbeid-het-kinderwetje-van-van-houten" },
  kinderwetje: { t: "Wat is het kinderwetje van Van Houten?", u: "https://schooltv.nl/video-item/high-speed-history-wat-is-het-kinderwetje-van-van-houten" },
  fabriek: { t: "Fabrieksarbeiders: zwaar en onveilig werk", u: "https://schooltv.nl/video-item/fabrieksarbeiders-dikke-wolkenstof-en-onveilige-machines" },
  weldadigheid: { t: "De Maatschappij van Weldadigheid", u: "https://schooltv.nl/video-item/de-maatschappij-van-weldadigheid-een-nieuw-leven-voor-armen-in-drenthe" },
  vakbond: { t: "De geschiedenis van de vakbond", u: "https://schooltv.nl/video-item/de-geschiedenis-van-de-vakbond-werknemers-gingen-zich-organiseren" },
  socialisme: { t: "Wat is socialisme?", u: "https://schooltv.nl/video-item/clipphanger-wat-is-socialisme" },
  kiesrecht: { t: "Kiesrecht voor man en vrouw", u: "https://schooltv.nl/video-item/kiesrecht-kiesrecht-voor-man-en-vrouw" },
  crisisjaren: { t: "De crisisjaren: armoede in Nederland", u: "https://schooltv.nl/video-item/de-crisisjaren-armoede-in-nederland" },
  aletta: { t: "Wie was Aletta Jacobs?", u: "https://schooltv.nl/video-item/clipphanger-wie-was-aletta-jacobs" }
};
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
  ,
  // ===== Boekje 2, hoofdstuk 1 (sleutel = imgs[i][0] in boekje-2/data-bron.py). Dia's = slides/SZ1. =====
  "../img/flow/voedseluitdeling.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een zaal waar arme mensen soep en brood krijgen: een priester schept soep uit een grote pan, een man deelt brood uit, een moeder met een kind op haar arm en kinderen staan in de rij, aan de muur hangt een kruisbeeld.",
    intro: { tekst: "Zo zag hulp aan armen eruit in de negentiende eeuw: liefdadigheid. Kijk goed rond in deze zaal. Tik dan op de bolletjes.", dia: 10 },
    slot: { tekst: "Arme, zieke, oude en werkloze mensen waren afhankelijk van liefdadigheid. In 1854 kwam de Armenwet: de liefdadigheidsinstellingen moesten de armen helpen en de gemeente alleen in uiterste nood. De armoede nam toe, dus de instellingen konden niet alle armen meer helpen.",
      vraag: "Waarom was liefdadigheid op den duur niet genoeg? Wat zou de overheid kunnen doen?", dia: 10 },
    hotspots: [
      { x: 16, y: 27, naam: "Het kruisbeeld", dia: 10,
        tekst: "Arme mensen konden vaak terecht bij liefdadigheidsinstellingen van de kerk.",
        vraag: "Wie hielp arme mensen in de negentiende eeuw? Wat laat dit plaatje daarvan zien?",
        punten: [{ t: "Noemt liefdadigheid / hulp van liefdadigheidsinstellingen", p: 1 }, { t: "Noemt de kerk als helper (kruisbeeld, priester)", p: 1 }],
        films: ["weldadigheid"] },
      { x: 73, y: 40, naam: "De soep en het brood", dia: 10,
        tekst: "In de negentiende eeuw waren arme, zieke, oude en werkloze mensen afhankelijk van liefdadigheid.",
        vraag: "Wat is liefdadigheid en wie krijgt hier hulp? Noem twee soorten mensen die afhankelijk waren van liefdadigheid.",
        punten: [{ t: "Liefdadigheid is hulp aan arme mensen", p: 1 }, { t: "Noemt twee van: arme, zieke, oude of werkloze mensen", p: 1 }] },
      { x: 36, y: 53, naam: "De moeder met het kind", dia: 0,
        tekst: "Het loon van de man was meestal niet genoeg voor de huur en het eten van het gezin. Een zieke arbeider kreeg geen loon.",
        vraag: "Waarom hadden hele gezinnen soms hulp nodig, ook als de vader werkte?",
        punten: [{ t: "Het loon van de man was te laag voor huur en eten", p: 1 }, { t: "Als hij ziek was, kreeg hij geen loon (nog minder eten)", p: 1 }] },
      { x: 18, y: 78, naam: "De kinderen", dia: 9,
        tekst: "Arme kinderen groeien straatarm op, net als hun ouders. Zonder hulp zijn hun eigen kinderen later ook arm.",
        vraag: "Jacob, de man van het huisbezoek, ziet voor deze kinderen geen hoop als er niet meer hulp komt. Wat bedoelt hij?",
        punten: [{ t: "Zonder hulp blijven arme kinderen arm, net als hun ouders", p: 1 }, { t: "Hun kinderen zullen later ook arm zijn", p: 1 }] }
    ]
  },
  "../img/flow/inspecteur-fabriek.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Twee foto's naast elkaar: links een man met zwarte hoed en papieren bij een bakstenen huis met ventilatieroosters, een arbeider kijkt toe; rechts twee arbeiders bij een grote machine met tandwielen in een fabriek.",
    intro: { tekst: "Links een huis, rechts een machine in een fabriek: wonen en werken van arbeiders. Tik op de bolletjes.", dia: 13 },
    slot: { tekst: "Aan het begin van de twintigste eeuw kwamen er wetten die arbeiders het een beetje beter maakten: de Ongevallenwet, de Woningwet en de Leerplichtwet.",
      vraag: "Waarom duurde het zo lang voordat zulke wetten er kwamen? Denk aan wat de conservatief-liberalen vonden.", dia: 42 },
    hotspots: [
      { x: 32, y: 41, naam: "De man met de papieren", dia: 0,
        tekst: "Na 1870 waren er geen regels over arbeidstijden, veiligheid en de hoogte van lonen.",
        vraag: "Een man kijkt met papieren in de hand rond. Welke regels waren er in de fabrieken na 1870 nog niet?",
        punten: [{ t: "Noemt arbeidstijden, veiligheid of de hoogte van lonen", p: 1 }, { t: "Noemt er nog een van die drie", p: 1 }],
        films: ["fabriek"] },
      { x: 15, y: 31, naam: "Het huis met ventilatie", dia: 42,
        tekst: "Arbeiderswoningen werden snel en goedkoop gebouwd. De Woningwet legde vast aan welke minimale eisen een woning moest voldoen.",
        vraag: "Waarom was een Woningwet nodig? Noem twee problemen van arbeiderswoningen.",
        punten: [{ t: "Noemt een probleem: klein, donker, gehorig, dicht op elkaar of heel veel mensen in één kamer", p: 1 }, { t: "Noemt geen riolering, elektriciteit of waterleiding, of besmettelijke ziekten zoals cholera", p: 1 }] },
      { x: 67, y: 58, naam: "De machine", dia: 42,
        tekst: "Arbeiders werkten vaak met onveilige machines. Er gebeurden veel ongelukken. De Ongevallenwet regelde een kleine uitkering voor arbeiders met een ongeluk tijdens het werk.",
        vraag: "Waarom gebeurden er zoveel ongelukken bij de machines? En wat regelde de Ongevallenwet?",
        punten: [{ t: "De machines waren onveilig en de arbeiders waren oververmoeid", p: 1 }, { t: "De Ongevallenwet gaf een (kleine) uitkering bij een ongeluk tijdens het werk", p: 1 }],
        films: ["fabriek"] },
      { x: 82, y: 66, naam: "De arbeiders", dia: 13,
        tekst: "Arbeiders maakten werkdagen van soms wel 14 uur voor een laag loon. Ook vrouwen en kinderen werkten in de fabriek.",
        vraag: "Waarom werkten ook vrouwen en kinderen in de fabriek?",
        punten: [{ t: "Het loon van de man was niet genoeg", p: 1 }, { t: "Het gezin had geld nodig voor huur en eten", p: 1 }] }
    ]
  },
  "../img/flow/kinderwetje.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een fabriekshal met spinmachines: een man met een vuile schort krijgt een document met een zegel van een heer in een zwart pak. Rechts staat een jongen in vuile kleren met een klos in de buurt.",
    intro: { tekst: "Een heer geeft een man in een fabriek een document met een zegel. Het gaat over kinderen in de fabriek. Tik op de bolletjes.", dia: 43 },
    slot: { tekst: "Het Kinderwetje van Van Houten verbood in 1874 om kinderen onder de twaalf jaar in dienst te nemen. Aan het begin van de twintigste eeuw kwam daar de Leerplichtwet bij.",
      vraag: "Waarom is er een wet nodig om kinderen te beschermen? Waarom deed niet elke fabrikant dit zelf?", dia: 43 },
    hotspots: [
      { x: 42, y: 46, naam: "Het document met zegel", dia: 43,
        tekst: "Het Kinderwetje van Van Houten verbiedt kinderen onder de twaalf jaar in dienst te nemen. Wie zich er niet aan houdt, krijgt een geldboete.",
        vraag: "Wat staat er in het Kinderwetje en uit welk jaar komt het?",
        punten: [{ t: "Kinderen onder de twaalf jaar mogen niet in dienst genomen worden / niet werken", p: 1 }, { t: "Het jaar is 1874", p: 1 }],
        films: ["kinderarbeid", "kinderwetje"] },
      { x: 84, y: 58, naam: "Het kind", dia: 14,
        tekst: "Een man vertelde dat hij op zijn tiende al in een glasblazerij werkte: 's nachts, helemaal zwart en bijna niet meer kunnen staan van vermoeidheid.",
        vraag: "Waarom stuurden arme gezinnen hun kind naar de fabriek, ook al was het werk zwaar?",
        punten: [{ t: "Het loon van de man was niet genoeg voor huur en eten", p: 1 }, { t: "Het gezin had het geld van het kind nodig", p: 1 }],
        films: ["kinderarbeid"] },
      { x: 13, y: 60, naam: "De spinmachines", dia: 13,
        tekst: "Het werk in de fabriek was zwaar, gevaarlijk en eentonig. Veel arbeiders werkten met machines die onveilig waren.",
        vraag: "Waarom was een fabriek een gevaarlijke plek, zeker voor kinderen?",
        punten: [{ t: "De machines waren onveilig", p: 1 }, { t: "Arbeiders waren oververmoeid door lange werkdagen, dus er gebeurden ongelukken", p: 1 }],
        films: ["fabriek"] },
      { x: 72, y: 78, naam: "De klos op de vloer", dia: 43,
        tekst: "Het verbod gold niet voor huishoudelijke en persoonlijke diensten en niet voor veldarbeid.",
        vraag: "Voor welk werk gold het verbod van 1874 niet? Noem er twee.",
        punten: [{ t: "Noemt twee van: huishoudelijke diensten, persoonlijke diensten, veldarbeid", p: 1 }] }
    ]
  },
  "../img/flow/kinderen-school.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Kinderen met leien lopen over een modderige straat naar een schooltje met een torentje. Op de achtergrond staan fabrieksschoorstenen met rook.",
    intro: { tekst: "Kinderen met een lei lopen naar school, op de achtergrond rookt een fabriek. Tik op de bolletjes.", dia: 42 },
    slot: { tekst: "De Leerplichtwet verplichtte kinderen tussen de zes en twaalf jaar om naar school te gaan.",
      vraag: "Wat verandert er voor een gezin als de kinderen naar school gaan en niet meer in de fabriek werken?", dia: 42 },
    hotspots: [
      { x: 49, y: 58, naam: "De kinderen met leien", dia: 42,
        tekst: "De Leerplichtwet kwam aan het begin van de twintigste eeuw. Kinderen van zes tot twaalf jaar moesten naar school.",
        vraag: "Voor welke kinderen was de Leerplichtwet en wat verplichtte die wet?",
        punten: [{ t: "Voor kinderen tussen de zes en twaalf jaar", p: 1 }, { t: "Ze moesten verplicht naar school", p: 1 }],
        films: ["kinderarbeid"] },
      { x: 74, y: 38, naam: "Het schooltje", dia: 9,
        tekst: "In het verhaal van Jacob gaan zijn eigen kinderen naar school, lezen boeken en hebben een mooie toekomst voor zich. Voor arme kinderen is er geen hoop zonder meer hulp.",
        vraag: "Waarom kan school arme kinderen helpen om niet arm te blijven?",
        punten: [{ t: "Kinderen die naar school gaan krijgen een betere toekomst (zoals Jacobs kinderen)", p: 1 }, { t: "Zonder hulp blijven arme kinderen arm, net als hun ouders", p: 1 }] },
      { x: 86, y: 18, naam: "De fabrieksschoorsteen", dia: 11,
        tekst: "Na 1870 kwamen er in veel Nederlandse steden fabrieken: de industrialisatie. Vrouwen en kinderen werkten ook in de fabriek.",
        vraag: "Wat gebeurde er na 1870 in veel steden en wat deden kinderen vaak in zo'n fabriek?",
        punten: [{ t: "Er kwamen fabrieken: de industrialisatie kwam op gang", p: 1 }, { t: "Kinderen werkten ook in de fabriek", p: 1 }],
        films: ["fabriek"] },
      { x: 78, y: 85, naam: "De modderige straat", dia: 0,
        tekst: "Arbeiderswoningen stonden dicht op elkaar en dicht bij de fabrieken, vaak zonder riolering. Daardoor kwamen er besmettelijke ziekten voor, zoals cholera.",
        vraag: "Waarom was wonen zonder riolering slecht voor de gezondheid? Welke ziekte noemt de lesstof?",
        punten: [{ t: "Onhygiënische omstandigheden zorgden voor besmettelijke ziekten", p: 1 }, { t: "Noemt cholera", p: 1 }] }
    ]
  },
  "../img/flow/demonstratie.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een menigte op een kade. Boven de mensen hangt het vaandel van de SDAP met de tekst Algemeen kiesrecht vraagt onze kracht. Borden vragen om kiesrecht voor man en vrouw en zeggen Stemrecht is recht. Een spreker staat op een kist.",
    intro: { tekst: "Een menigte demonstreert. Lees de teksten op het vaandel en de borden. Tik dan op de bolletjes.", dia: 41 },
    slot: { tekst: "De vraag wat er aan de slechte leef- en werkomstandigheden van arbeiders gedaan moet worden, heet de sociale kwestie. De sociaaldemocraten wilden algemeen kiesrecht, zodat arbeiders konden meebeslissen over sociale wetten.",
      vraag: "Wat is de sociale kwestie? En waarom helpt kiesrecht om de sociale kwestie op te lossen?", dia: 41 },
    hotspots: [
      { x: 51, y: 26, naam: "Het vaandel van de SDAP", dia: 41,
        tekst: "De sociaaldemocraten kwamen speciaal op voor de belangen van de arbeiders. Zij vonden dat de overheid alles moest doen om arbeiders te beschermen.",
        vraag: "Wat eisen de sociaaldemocraten op dit vaandel? Waarom vonden ze dat zo belangrijk?",
        punten: [{ t: "Algemeen kiesrecht", p: 1 }, { t: "Dan kunnen arbeiders meebeslissen over de invoering van sociale wetten", p: 1 }],
        films: ["socialisme"] },
      { x: 25, y: 44, naam: "De borden", dia: 0,
        tekst: "Op de borden staat dat het kiesrecht ook voor vrouwen moet zijn. In 1917 kregen mannen algemeen kiesrecht, twee jaar later de vrouwen.",
        vraag: "Wanneer kregen mannen algemeen kiesrecht en wanneer vrouwen?",
        punten: [{ t: "Mannen in 1917", p: 1 }, { t: "Vrouwen in 1919", p: 1 }],
        films: ["kiesrecht"] },
      { x: 53, y: 53, naam: "De spreker op de kist", dia: 26,
        tekst: "Arbeiders spraken af om samen hun doel te bereiken: hogere lonen en betere werkomstandigheden. Dat kon met vakbonden, demonstraties en stakingen.",
        vraag: "Waarom protesteerden de meeste arbeiders eerst niet? En wat deden ze later wel?",
        punten: [{ t: "Protesteren was gevaarlijk: je kon ontslagen worden en dan had je geen geld meer", p: 1 }, { t: "Later kwamen ze samen in verzet: vakbonden, demonstraties, stakingen", p: 1 }],
        films: ["vakbond"] },
      { x: 42, y: 72, naam: "De menigte", dia: 0,
        tekst: "Door de groei van de arbeiderswijken zagen steeds meer mensen in welke armoede arbeiders leefden. Ook de rijken zagen dat er iets moest gebeuren.",
        vraag: "Waarom vonden ook rijke mensen dat er iets moest gebeuren aan de omstandigheden van arbeiders?",
        punten: [{ t: "Ze zagen de armoede in de arbeiderswijken", p: 1 }, { t: "Besmettelijke ziekten in die wijken waren ook voor hen een gevaar", p: 1 }] }
    ]
  },
  "../img/flow/stemlokaal-1917.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een stemlokaal met een rij mannen. Een man doet een stembiljet in de stembus. Twee heren aan een tafel schrijven in een groot boek. Boven de deur hangt een bordje Stemlokaal.",
    intro: { tekst: "Mannen in de rij in een stemlokaal. Dit is 1917, het jaar van het algemeen kiesrecht voor mannen. Tik op de bolletjes.", dia: 0 },
    slot: { tekst: "In 1917 werd het algemeen kiesrecht voor mannen aangenomen. Twee jaar later, in 1919, kregen ook vrouwen algemeen kiesrecht.",
      vraag: "Waarom duurde het voor vrouwen twee jaar langer, denk jij?", dia: 0 },
    hotspots: [
      { x: 14, y: 17, naam: "Het bordje Stemlokaal", dia: 0,
        tekst: "In 1917 werd het algemeen kiesrecht voor mannen aangenomen. De sociaaldemocraten en sommige confessionelen zetten zich daarvoor in.",
        vraag: "In welk jaar kregen mannen algemeen kiesrecht en wie zette zich daarvoor in?",
        punten: [{ t: "In 1917", p: 1 }, { t: "Sociaaldemocraten (en sommige confessionelen)", p: 1 }],
        films: ["kiesrecht"] },
      { x: 47, y: 60, naam: "De stembus", dia: 41,
        tekst: "Om mee te praten over de sociale kwestie moesten arbeiders kiesrecht krijgen. Dan konden ze meebeslissen over sociale wetten.",
        vraag: "Waarom was de stem van een arbeider zo belangrijk? Noem iets wat hij met zijn stem wilde bereiken.",
        punten: [{ t: "Hij kon meebeslissen over de invoering van sociale wetten", p: 1 }, { t: "Noemt een doel: bijvoorbeeld hogere lonen, betere werkomstandigheden, een uitkering bij ziekte, pensioen of een werkdag van acht uur", p: 1 }] },
      { x: 82, y: 45, naam: "De rij mannen", dia: 0,
        tekst: "Op het plaatje staan alleen mannen in de rij. Vrouwen kregen pas in 1919 algemeen kiesrecht.",
        vraag: "Wat valt je op aan de rij? En hoeveel jaar later mochten vrouwen stemmen?",
        punten: [{ t: "Er staan alleen mannen in de rij", p: 1 }, { t: "Vrouwen mochten twee jaar later (1919) stemmen", p: 1 }],
        films: ["kiesrecht"] },
      { x: 20, y: 66, naam: "De heren met het boek", tekst: "", dia: 0,
        vraag: "Twee heren schrijven iets op in een groot boek. Wat denk je dat ze opschrijven, en waarom moet dat bij verkiezingen netjes gebeuren?" }
    ]
  },
  "../img/flow/stemlokaal-vrouwen.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een vrouw met een hoed doet haar stembiljet in de stembus. Achter haar staat een rij vrouwen. Aan de muur hangt een affiche: Algemene verkiezingen 1919, Vrouwenkiesrecht. Twee heren schrijven in een boek.",
    intro: { tekst: "In 1919 stemmen ook vrouwen. Kijk goed rond in het stemlokaal. Tik op de bolletjes.", dia: 0 },
    slot: { tekst: "In 1917 kregen mannen algemeen kiesrecht en twee jaar later, in 1919, ook vrouwen.",
      vraag: "Vrouwen stemden pas in 1919. Wat veranderde er voor hen door dit kiesrecht, denk je?", dia: 0 },
    hotspots: [
      { x: 52, y: 52, naam: "De vrouw met de hoed", dia: 0,
        tekst: "In 1919 kregen vrouwen algemeen kiesrecht, twee jaar na de mannen.",
        vraag: "In welk jaar kregen vrouwen algemeen kiesrecht? Hoeveel jaar na de mannen was dat?",
        punten: [{ t: "In 1919", p: 1 }, { t: "Twee jaar na de mannen (1917)", p: 1 }],
        films: ["kiesrecht", "aletta"] },
      { x: 88, y: 34, naam: "Het affiche", dia: 0,
        tekst: "Op het affiche staat 1919 en Vrouwenkiesrecht: dat is het jaar waarin vrouwen algemeen kiesrecht kregen.",
        vraag: "Waarom zijn de verkiezingen van 1919 anders dan die van 1917? Gebruik beide jaartallen.",
        punten: [{ t: "In 1917 kregen mannen algemeen kiesrecht", p: 1 }, { t: "In 1919 kregen ook vrouwen algemeen kiesrecht", p: 1 }] },
      { x: 14, y: 48, naam: "De rij vrouwen", dia: 41,
        tekst: "De sociaaldemocraten en sommige confessionelen zetten zich in voor algemeen kiesrecht. Arbeiders moesten kunnen meebeslissen over sociale wetten.",
        vraag: "Wie zette zich in voor algemeen kiesrecht en wat wilden arbeiders daarmee bereiken?",
        punten: [{ t: "Sociaaldemocraten (en sommige confessionelen)", p: 1 }, { t: "Meebeslissen over sociale wetten", p: 1 }] },
      { x: 83, y: 58, naam: "De heren met de boeken", tekst: "", dia: 0,
        vraag: "Twee heren zitten aan tafel met hun boeken. Wat denk je dat zij ervan vinden dat vrouwen nu mogen stemmen? Waarom denk je dat?" }
    ]
  }
  ,
  // ===== Boekje 2, hoofdstuk 2 (dia's = slides/SZ2) =====
  "../img/flow/wallstreet-1.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Zwart-witfoto van een enorme mensenmassa op straat en op de trap voor een groot gebouw met Amerikaanse vlaggen. Mannen in hoeden lezen kranten, rechts staan oude auto's.",
    intro: { tekst: "Paniek bij de beurs van New York op Zwarte Donderdag, 24 oktober 1929. Kijk goed rond. Tik op de bolletjes.", dia: 5 },
    slot: { tekst: "Na de beurskrach gingen veel bedrijven en banken failliet en werden massa's mensen ontslagen. De crisis in Amerika had ook gevolgen voor Nederland.",
      vraag: "Wat zou jij doen als je op deze dag aandelen had? Leg uit waarom.", dia: 5 },
    hotspots: [
      { x: 43, y: 55, naam: "De mensenmassa", dia: 4,
        tekst: "Op 24 oktober 1929 daalden de koersen van alle aandelen, steeds sneller. Voor de deuren van de beurs stond een enorme mensenmassa.",
        vraag: "Waarom wilde iedereen tegelijk zijn aandelen verkopen? Wat gebeurde er met de koersen?",
        punten: [{ t: "De koersen van de aandelen daalden (steeds sneller)", p: 1 }, { t: "Mensen raakten in paniek en wilden allemaal van hun aandelen af", p: 1 }],
        films: ["crisisjaren"] },
      { x: 46, y: 84, naam: "De mannen met de krant", dia: 4,
        tekst: "Het nieuws ging als een lopend vuurtje door de stad. Deze dag heet Zwarte Donderdag.",
        vraag: "Hoe heet de dag van 24 oktober 1929 en wat gebeurde er daarna met bedrijven, banken en werknemers?",
        punten: [{ t: "Zwarte Donderdag", p: 1 }, { t: "Veel bedrijven en banken gingen failliet en massa's mensen werden ontslagen", p: 1 }] },
      { x: 32, y: 18, naam: "De Amerikaanse vlaggen", dia: 7,
        tekst: "Amerikanen hadden na de crisis geen geld meer voor Europese producten. Daarom moesten ook in Nederland bedrijven en fabrieken sluiten.",
        vraag: "Hoe kwam het dat de crisis in Amerika ook werkloosheid in Nederland veroorzaakte?",
        punten: [{ t: "Amerikanen hadden geen geld meer voor Europese producten", p: 1 }, { t: "Daardoor sloten Nederlandse bedrijven en fabrieken, dus mensen verloren hun werk", p: 1 }] }
    ]
  },
  "../img/flow/beurskrach-auto.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een man in een jas en hoed leunt tegen een oude auto in een straat in New York. Op een bord staat dat de auto voor 100 dollar te koop is omdat hij alles verloren heeft op de beurs.",
    intro: { tekst: "Een man verkoopt zijn auto, in 1929 in New York. Lees het bord. Tik op de bolletjes.", dia: 4 },
    slot: { tekst: "Joe kocht aandelen en leende geld voor nog meer aandelen. Na de beurskrach waren zijn aandelen waardeloos en had hij schulden.",
      vraag: "Wat is het risico als je geld leent om aandelen te kopen?", dia: 3 },
    hotspots: [
      { x: 73, y: 79, naam: "Het bord", dia: 4,
        tekst: "Op het bord staat dat de auto 100 dollar kost, dat de man geld nodig heeft en dat hij alles heeft verloren op de beurs.",
        vraag: "Waarom verkoopt deze man zijn auto zo goedkoop?",
        punten: [{ t: "Hij heeft geld nodig", p: 1 }, { t: "Hij heeft alles verloren op de beurs (beurskrach)", p: 1 }] },
      { x: 53, y: 35, naam: "De man", dia: 3,
        tekst: "Joe in het verhaal kocht steeds meer aandelen. De bank wilde hem zelfs geld lenen voor nog meer aandelen.",
        vraag: "Waarom kocht Joe steeds meer aandelen?",
        punten: [{ t: "De aandelen werden steeds meer waard", p: 1 }, { t: "Hij dacht dat hij er rijk van kon worden (nu of nooit); de bank leende hem geld", p: 1 }] },
      { x: 24, y: 42, naam: "De voorbijgangers", dia: 0,
        tekst: "Na de beurskrach gingen veel bedrijven en banken failliet. Massa's mensen werden ontslagen.",
        vraag: "Wat betekende de beurskrach voor mensen die werk hadden?",
        punten: [{ t: "Veel bedrijven en banken gingen failliet", p: 1 }, { t: "Massa's mensen werden ontslagen", p: 1 }] }
    ]
  },
  "../img/flow/arbeidsbeurs.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een zaal vol wachtende mannen met petten en jassen. Links hangt een groot krijtbord met de titel Gemeentelijke Arbeidsbeurs, rechts zitten ambtenaren achter een loket.",
    intro: { tekst: "Werklozen wachten bij de gemeentelijke arbeidsbeurs. Kijk goed rond. Tik op de bolletjes.", dia: 8 },
    slot: { tekst: "Door de crisis steeg de werkloosheid enorm. De overheid hielp maar weinig: niet iedere werkloze kreeg steun.",
      vraag: "Hoe zou het voelen om hier elke dag in de rij te staan?", dia: 8 },
    hotspots: [
      { x: 20, y: 27, naam: "Het krijtbord", dia: 7,
        tekst: "Na de beurskrach moesten ook in Nederland bedrijven en fabrieken sluiten. Het aantal werklozen steeg sterk.",
        vraag: "Waarom moesten in Nederland bedrijven en fabrieken sluiten? Leg uit in twee stappen.",
        punten: [{ t: "Amerikanen hadden geen geld meer voor Europese producten", p: 1 }, { t: "Daardoor sloten bedrijven en fabrieken en kwamen er werklozen bij", p: 1 }] },
      { x: 43, y: 62, naam: "De wachtende mannen", dia: 12,
        tekst: "Alleen werklozen tussen de 21 en 60 jaar die buiten hun schuld zonder werk zaten, kregen steun. Slechts de helft van de werklozen kon dit gebruiken.",
        vraag: "Wie kreeg steun en wie niet? Noem twee voorwaarden.",
        punten: [{ t: "Tussen de 21 en 60 jaar oud", p: 1 }, { t: "Buiten eigen schuld zonder werk", p: 1 }],
        films: ["crisisjaren"] },
      { x: 93, y: 49, naam: "Het loket", dia: 0,
        tekst: "Sommige arbeiders hadden een werkloosheidsverzekering en kregen ongeveer zestig dagen een uitkering. Daarna kregen ze de veel lagere steunuitkering.",
        vraag: "Wat gebeurde er na zestig dagen met een werkloze die een werkloosheidsverzekering had?",
        punten: [{ t: "De uitkering van de verzekering hield op", p: 1 }, { t: "Hij moest aankloppen bij de overheid voor de veel lagere steunuitkering", p: 1 }] }
    ]
  },
  "../img/flow/loket.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een man in een versleten jas geeft een briefje aan een ambtenaar aan een houten loket. Achter hem staat een lange rij mannen te wachten. Aan de muur hangen bordjes Stilte en Dienst voor Sociale Zorg.",
    intro: { tekst: "Een werkloze man staat aan het loket. Kijk goed naar de rij achter hem. Tik op de bolletjes.", dia: 13 },
    slot: { tekst: "Werklozen kregen weinig steun en werden streng gecontroleerd. Veel mensen vonden de hulp vernederend.",
      vraag: "Waarom willen veel mensen liever geen hulp vragen als ze zich schamen?", dia: 12 },
    hotspots: [
      { x: 43, y: 44, naam: "De man met het briefje", dia: 13,
        tekst: "Werklozen moesten elke dag, soms twee keer per dag, in de rij staan voor een stempel.",
        vraag: "Waarom moesten werklozen elke dag in de rij staan voor een stempel?",
        punten: [{ t: "Zo kon de gemeente controleren dat ze niet stiekem iets bijverdienden", p: 1 }, { t: "Ze moesten elke dag, soms twee keer per dag, komen", p: 1 }],
        films: ["crisisjaren"] },
      { x: 86, y: 53, naam: "De ambtenaar", dia: 12,
        tekst: "De gemeente controleerde of mensen niet stiekem 's nachts werkten of thuiswerk deden, en of ze geen luxe spullen thuis hadden.",
        vraag: "Waarom controleerde de gemeente of werklozen luxe spullen thuis hadden? En wat gebeurde er bij fraude?",
        punten: [{ t: "Een arme werkloze kan geen luxe spullen betalen, dus misschien verdiende hij stiekem bij", p: 1 }, { t: "Wie betrapt werd op steunfraude verloor zijn uitkering en moest in een werkkamp werken", p: 1 }] },
      { x: 18, y: 44, naam: "De rij wachtenden", dia: 0,
        tekst: "Voor eerste levensbehoeften kon je een speciale uitkering aanvragen. Kleren en schoenen kregen dan een stempel.",
        vraag: "Waarom vonden werklozen het vernederend om kleding met een stempel te krijgen?",
        punten: [{ t: "Iedereen kon aan de stempel zien dat ze werkloos waren", p: 1 }, { t: "Daarom gebruikten veel mensen liever geen hulp", p: 1 }] }
    ]
  },
  "../img/flow/polder-werk.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Veel mannen met schoppen werken in de modder aan een kanaal in een polder. Op smalle rails staan kiepwagens vol aarde. Op de achtergrond staat een klein treintje.",
    intro: { tekst: "Werklozen graven een kanaal in de Wieringermeerpolder. Kijk goed: welke machines zie je niet? Tik op de bolletjes.", dia: 16 },
    slot: { tekst: "Werkverschaffing was verplicht werk voor werklozen voor een laag loon, bijvoorbeeld het aanleggen van kanalen en dijken.",
      vraag: "Zou jij dit werk willen doen als je geen andere keus had?", dia: 16 },
    hotspots: [
      { x: 20, y: 53, naam: "De schoppen", dia: 16,
        tekst: "Bij werkverschaffingsprojecten werden vaak bewust geen graafmachines gebruikt.",
        vraag: "Waarom gebruikte men schoppen en geen graafmachines?",
        punten: [{ t: "Zo konden zoveel mogelijk werklozen aan het werk", p: 1 }] },
      { x: 43, y: 55, naam: "De kiepwagen", dia: 16,
        tekst: "De vrijgekomen grond werd weggevoerd op een wagon van een smalspoortreintje.",
        vraag: "Wat is werkverschaffing? Geef een voorbeeld.",
        punten: [{ t: "De overheid laat werklozen aan het werk gaan in grote projecten", p: 1 }, { t: "Voorbeeld: een kanaal, een dijk of de Afsluitdijk", p: 1 }],
        films: ["crisisjaren"] },
      { x: 57, y: 26, naam: "De rij arbeiders", dia: 16,
        tekst: "De werkomstandigheden waren erg zwaar. Het loon was net iets hoger dan de steunuitkering.",
        vraag: "Hoe was het werk en wat verdienden de werklozen vergeleken met steun?",
        punten: [{ t: "Het werk was erg zwaar", p: 1 }, { t: "Het loon was net iets hoger dan de steunuitkering", p: 1 }] }
    ]
  },
  "../img/flow/dijk-1.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Veel mannen leggen stenen en dragen manden op een dijk in aanbouw in de zee. Rechts rijden kiepwagens over rails, op het water liggen schepen en houten steigers.",
    intro: { tekst: "De aanleg van de Afsluitdijk in 1932. Kijk goed naar het werk en het weer. Tik op de bolletjes.", dia: 17 },
    slot: { tekst: "De Afsluitdijk is het bekendste werkverschaffingsproject. Het werk was zwaar en het loon lag net boven de steun.",
      vraag: "Waarom was een dijk een goed project om veel werklozen aan het werk te zetten?", dia: 17 },
    hotspots: [
      { x: 57, y: 58, naam: "De stenen", dia: 17,
        tekst: "Werkverschaffingsprojecten waren grote projecten, zoals het aanleggen van kanalen en dijken.",
        vraag: "Waarom bedacht de overheid werkverschaffing?",
        punten: [{ t: "Om werklozen aan het werk te helpen", p: 1 }, { t: "Het waren grote projecten zoals kanalen en dijken", p: 1 }] },
      { x: 86, y: 46, naam: "De kiepwagens", dia: 17,
        tekst: "De werkomstandigheden waren erg zwaar. Werklozen kregen een loon dat net iets hoger was dan hun steunuitkering.",
        vraag: "Hoe zwaar was het werk en wat kregen de werklozen ervoor?",
        punten: [{ t: "Het werk was erg zwaar", p: 1 }, { t: "Het loon was net iets hoger dan de steunuitkering", p: 1 }] },
      { x: 44, y: 22, naam: "De dijk in de verte", dia: 17,
        tekst: "De Afsluitdijk (1932) verbindt Noord-Holland en Friesland.",
        vraag: "Welk werkverschaffingsproject is dit en welke twee provincies verbindt het?",
        punten: [{ t: "De Afsluitdijk (1932)", p: 1 }, { t: "Noord-Holland en Friesland", p: 1 }],
        films: ["crisisjaren"] }
    ]
  },
  "../img/flow/jordaan.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een straat in de Jordaan in Amsterdam. Boze mensen gooien met straatstenen, een man hurkt bij een kar vol stenen. Rechts staan mannen in uniform met helmen en knuppels.",
    intro: { tekst: "De Jordaanrellen in Amsterdam in 1934. Kijk goed rond. Tik op de bolletjes.", dia: 0 },
    slot: { tekst: "De Jordaanrellen kostten vijf mensen het leven. De verlaging van de uitkering bleef.",
      vraag: "Wat denk je: waarom zochten mensen toch geweld in plaats van een andere manier van protesteren?", dia: 0 },
    hotspots: [
      { x: 20, y: 55, naam: "De boze mensen", dia: 24,
        tekst: "In 1934 brak er een opstand uit in de Jordaan. Mensen waren boos over de verlaging van de steunuitkeringen.",
        vraag: "Waarom waren de mensen in de Jordaan zo boos? Waarom verlaagde de regering de steun?",
        punten: [{ t: "De steunuitkeringen werden verlaagd", p: 1 }, { t: "De overheid kreeg door de crisis minder belasting binnen, dus gaf ze minder uit (aanpassingspolitiek)", p: 1 }] },
      { x: 36, y: 70, naam: "De straatstenen", dia: 0,
        tekst: "Na de rellen werden de straten in de Jordaan geasfalteerd.",
        vraag: "Wat veranderde er in de straten van de Jordaan na de rellen, en waarom?",
        punten: [{ t: "De straten werden geasfalteerd", p: 1 }, { t: "Zodat relschoppers bij een nieuwe opstand niet meer met straatstenen konden gooien", p: 1 }] },
      { x: 75, y: 58, naam: "De mannen in uniform", dia: 0,
        tekst: "Uiteindelijk moest het leger de rellen beëindigen. De rellen kostten vijf mensen het leven, maar de verlaging van de uitkering bleef.",
        vraag: "Wie beëindigde de rellen, en wat bereikten de relschoppers met hun protest?",
        punten: [{ t: "Het leger beëindigde de rellen", p: 1 }, { t: "Ze bereikten niets: de verlaging van de uitkering bleef", p: 1 }] }
    ]
  },
  "../img/flow/sdap-affiche-1.jpg": {
    w: 1200, h: 896, hk: "SZ",
    alt: "Een rood-zwart affiche van de SDAP: een gespierde arm breekt een ketting met het woord Crisis. Rechts steken vuisten met een hamer en een schop omhoog voor bruggen en fabrieken. Onderaan staat Plan van de Arbeid, tegen crisis en werkloosheid. Dit is een AI-beeld.",
    intro: { tekst: "Een affiche van de SDAP uit de jaren dertig (AI-beeld). Lees de tekst en bekijk de plaatjes. Tik op de bolletjes.", dia: 27 },
    slot: { tekst: "De SDAP kwam in 1935 met het Plan van de Arbeid. Omdat de SDAP niet in de regering zat, kwam er weinig van terecht.",
      vraag: "Wat zou je op een affiche zetten om mensen van dit plan te overtuigen?", dia: 27 },
    hotspots: [
      { x: 38, y: 53, naam: "De ketting", dia: 27,
        tekst: "In het Plan van de Arbeid stond dat de overheid juist geld moest uitgeven om de werkloosheid en de crisis op te lossen.",
        vraag: "Wat moest de overheid volgens het Plan van de Arbeid doen om de crisis op te lossen?",
        punten: [{ t: "Juist geld uitgeven (niet bezuinigen)", p: 1 }, { t: "Om de werkloosheid en de crisis op te lossen", p: 1 }] },
      { x: 84, y: 23, naam: "De kranen en bruggen", dia: 27,
        tekst: "Door meer werkverschaffingsprojecten en hogere lonen zouden arbeiders meer geld te besteden hebben.",
        vraag: "Hoe zouden meer werkverschaffing en hogere lonen de crisis kunnen oplossen?",
        punten: [{ t: "Meer werkverschaffing en hogere lonen", p: 1 }, { t: "Dan hebben arbeiders meer geld te besteden", p: 1 }] },
      { x: 50, y: 78, naam: "De titel", dia: 27,
        tekst: "De sociaaldemocratische partij SDAP kwam in 1935 met het Plan van de Arbeid. Zij vonden dat verder bezuinigen de problemen alleen maar erger zou maken.",
        vraag: "Welke partij kwam met het plan en wat vond die partij van bezuinigen?",
        punten: [{ t: "De SDAP (sociaaldemocraten)", p: 1 }, { t: "Verder bezuinigen maakt de problemen alleen maar erger", p: 1 }] },
      { x: 76, y: 44, naam: "De vuisten", dia: 27,
        tekst: "De SDAP zat niet in de regering. Toen ze in 1939 voor het eerst in de regering kwam, was het te laat: de Tweede Wereldoorlog brak uit.",
        vraag: "Waarom kwam er van het Plan van de Arbeid weinig terecht?",
        punten: [{ t: "De SDAP zat niet in de regering", p: 1 }, { t: "In 1939 kwam de SDAP in de regering, maar toen was het te laat door de oorlog", p: 1 }] }
    ]
  }

};
