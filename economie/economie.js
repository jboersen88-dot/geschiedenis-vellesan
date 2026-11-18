/* Economie · bouwt index.html, jaar.html en h.html op uit data/paginas.json
   (alle pagina's die in het menu van meneerboersen.nl staan, opgehaald met crawl.py; zie changelog.md). */
(function(){
/* jaar → niveau → hoofdstukken. Een niveau zonder pre heeft nog geen inhoud ("volgt"). */
var JAREN=[
  {id:"jaar-2",titel:"Jaar 2",img:"geld",intro:"Geld, kopen, werken, produceren, de markt en de overheid: de basis van economie.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-2/mavo/"}]},
  {id:"jaar-3",titel:"Jaar 3",img:"welvaart",intro:"Welvaart, consumeren, bankieren, verzekeren, productie, de overheid en de wereld.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-3/mavo/"},{id:"havo-vwo",titel:"Havo/vwo",pre:"jaar-3/havo-vwo/",img:"j3vh2/goudstandaard",alt:"Goudstaven in een kluis, vastgeketend aan een bankbiljet",intro:"Hoe geld is ontstaan, wat het waard is en wat je ermee kunt kopen. Hoofdstuk 2 staat klaar, de andere hoofdstukken volgen.",beeld:"Beelden: gemaakt voor deze site"}]},
  {id:"jaar-4",titel:"Jaar 4",img:"inkomen",intro:"Inkomen, geld, winst, werk, de overheid, handel en ontwikkeling: op weg naar het eindexamen.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-4/"}]}];
var THEMA={"jaar-2/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-2/mavo/hoofdstuk-1":"consument","jaar-2/mavo/kopie-van-hoofdstuk-1":"consument","jaar-2/mavo/hoofdstuk-2":"j2h2/sparen","jaar-2/mavo/hoofdstuk-3-aan-het-werk":"werk","jaar-2/mavo/hoofdstuk-4":"productie","jaar-2/mavo/hoofdstuk-5":"markt","jaar-2/mavo/hoofdstuk-6":"overheid","jaar-2/mavo/proefwerkweek-rekenvaardigheden-eindtoets":"toets",
  "jaar-3/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart":"welvaart","jaar-3/mavo/hoofdstuk-2-wat-voor-consument-ben-jij":"consument","jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld":"bank","jaar-3/mavo/hoofdstuk-4-ben-je-verzekerd":"verzekeren","jaar-3/mavo/se-1":"toets","jaar-3/mavo/hoofdstuk-5-werkt-dat-zo":"werk","jaar-3/mavo/hoofdstuk-6-productie-en-markt":"productie","jaar-3/mavo/se-3-h5-h6":"toets","jaar-3/mavo/hoofdstuk-7-de-overheid-voor-ons-allemaal":"overheid","jaar-3/mavo/hoofdstuk-8-over-economische-grenzen":"wereldhandel","jaar-3/mavo/se4-h7-h8":"toets",
  "jaar-4/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-4/hoofdstuk-1-verdien-je-genoeg":"inkomen","jaar-4/hoofdstuk-2-geld-moet-rollen":"geld","jaar-4/se-h1-h2-h8":"toets","jaar-4/hoofdstuk-3":"winst","jaar-4/hoofdstuk-4-aan-het-werk":"werk","jaar-4/hoofdstuk-5-kan-de-overheid-dat-regelen":"overheid","jaar-4/hoofdstuk-6-de-overheid-en-ons-inkomen":"inkomen","jaar-4/se-h5-en-h6":"toets","jaar-4/hoofdstuk-7":"wereldhandel","jaar-4/hoofdstuk-8":"welvaart","jaar-4/se4":"toets","jaar-4/se6":"toets","jaar-4/eindexamen":"toets"};
/* pagina's waar op meneerboersen.nl een eigen lesapp in staat (kopie in apps/) */
var APPS={"jaar-2/mavo/hoofdstuk-1":[["Lesapp","jaar-2_mavo_hoofdstuk-1.html"]],"jaar-2/mavo/hoofdstuk-2":[["Lesapp","jaar-2_mavo_hoofdstuk-2.html"]],"jaar-2/mavo/hoofdstuk-3-aan-het-werk":[["Lesapp","jaar-2_mavo_hoofdstuk-3-aan-het-werk.html"]],"jaar-2/mavo/hoofdstuk-4":[["Lesapp","jaar-2_mavo_hoofdstuk-4.html"]],
  "jaar-4/hoofdstuk-1-verdien-je-genoeg":[["Lesapp","jaar-4_hoofdstuk-1-verdien-je-genoeg.html"]],"jaar-4/hoofdstuk-2-geld-moet-rollen":[["Lesapp","jaar-4_hoofdstuk-2-geld-moet-rollen.html"]],"jaar-4/hoofdstuk-3":[["Lesapp","jaar-4_hoofdstuk-3.html"]]};
/* pagina's met een eigen volledige leeromgeving (zelfde opzet als de Geschiedenis-boekjes): [link, titel, tekst] */
var LEEROMG={"jaar-4/se-h1-h2-h8":["se3/app.html","Open de leeromgeving SE3","Dia's per paragraaf, begrippen, leerdoelen, rekenen en formules, quiz, games en een toets op maat die de AI voor je nakijkt. Werkt ook op je telefoon en iPad."]};
/* hoofdstukken met een eigen pagina op volle breedte (opzet van Geschiedenis boekje 1): hoofdstukpagina, per paragraaf een leeromgeving
   (h.html?p=...&par=2.1) en een oefenomgeving. De inhoud staat in <map>/data.json en <map>/oefen.html, gemaakt door bouw-oefen.py
   uit de oude lesapp. Hier alleen de vormgeving: hero, kaartbeeld (als het niet het eerste beeld is) en kleuren [op de kaart, op de lichte band]. */
var RIJK={"jaar-3/mavo/hoofdstuk-0-rekenvaardigheden":{map:"j3h0",soort:"reken",kop:["Reken","vaardigheden"],hero:"../rekenen",
  alt:"Een agenda, een rekenmachine en een pen op een houten tafel",
  intro:"Alle formules van jaar 3 op één plek: procenten, btw, je eigen bedrijf en je saldo, met instructiefilms en oefenstof.",
  beeld:"Foto: Unsplash (gratis licentie)"},
  "jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart":{map:"j3h1",kop:["Hoe ","welvarend"," ben jij?"],hero:"../welvaart",
  alt:"Grachtenpanden met fietsen langs het water in Amsterdam",
  intro:"Behoeften en schaarste, beïnvloeding en reclame, budgetteren en inflatie: vier paragrafen over wat jij met je geld kunt.",
  par:"Vier paragrafen over jouw welvaart.",beeld:"Foto's: Unsplash (gratis licentie)",
  kleur:{"1.1":["var(--coral)","var(--berry)"],"1.2":["#7fd4c9","var(--teal)"],"1.3":["#f2c46b","var(--ochre)"],"1.4":["#b9d6cb","var(--green)"]}},
  "jaar-3/mavo/hoofdstuk-2-wat-voor-consument-ben-jij":{map:"j3h2",kop:["Wat voor ","consument"," ben jij?"],hero:"../consument",
  alt:"Een hand houdt een bundel kleurige boodschappentassen vast",
  intro:"Vergelijken en keurmerken, je rechten als consument, huren of kopen en consuminderen: vier paragrafen over slim consumeren.",
  par:"Vier paragrafen over slim consumeren.",beeld:"Foto's: Unsplash (gratis licentie)",
  kleur:{"2.1":["var(--coral)","var(--berry)"],"2.2":["#7fd4c9","var(--teal)"],"2.3":["#f2c46b","var(--ochre)"],"2.4":["#b9d6cb","var(--green)"]}},
  "jaar-3/havo-vwo/hoofdstuk-2-de-rol-van-geld":{map:"j3vh2",kop:["De rol van ","geld"],hero:"ruilhandel",
  alt:"Dorpelingen ruilen spullen op een markt, zonder geld",
  intro:"Hoe geld is ontstaan, wat geld waard is en waarom je met dezelfde euro steeds minder koopt: drie paragrafen over de rol van geld.",
  par:"Drie paragrafen over geld.",beeld:"Beelden: gemaakt voor deze site",reken:"Geldhoeveelheid, procenten, indexcijfers, reëel inkomen en reële rente.",games:"Swipe & Scoor en begrippen-memory.",
  kaart:{"2.2":"kruiwagen"},/* cash-digitaal.jpg heeft tekst in beeld, die door de kaarttekst heen loopt */
  kleur:{"2.1":["var(--coral)","var(--berry)"],"2.2":["#7fd4c9","var(--teal)"],"2.3":["#f2c46b","var(--ochre)"]}},
  "jaar-2/mavo/hoofdstuk-1":{map:"j2h1",kop:["Wat heb je ","nodig?"],hero:"markt",
  alt:"Een overdekte markt met kraampjes vol groente en fruit, waar mensen boodschappen doen",
  intro:"Keuzes maken, geld en betalen, behoeften en slim kopen: vier paragrafen over jou als consument.",
  par:"Vier paragrafen over keuzes en geld.",beeld:"Foto's: Unsplash (gratis licentie)",reken:"Saldo, afronden, week naar maand, gemiddelde en procenten.",games:"Edu-Racer, Swipe & Scoor en begrippen-memory.",
  kleur:{"1.1":["var(--coral)","var(--berry)"],"1.2":["#7fd4c9","var(--teal)"],"1.3":["#b9d6cb","var(--green)"],"1.4":["#f2c46b","var(--ochre)"]}},
  "jaar-2/mavo/kopie-van-hoofdstuk-1":{map:"j2h1gl",kop:["Wat heb je ","nodig?"],versie:"GL-versie",van:"jaar-2/mavo/hoofdstuk-1",/* tweede versie: niet als eigen hoofdstuk op de jaarpagina, wel via een knop op het hoofdstuk */hero:"../j2h1/shoppen",
  alt:"Een meisje zoekt in een kledingwinkel tussen de jurken aan het rek",
  intro:"De GL-versie van hoofdstuk 1: wat wil je kopen, waarom koop je dat, sta je sterk als consument en kom je uit met je geld?",
  par:"Vier paragrafen over jou als consument.",beeld:"Foto's: Unsplash (gratis licentie)",
  kleur:{"1.1":["var(--coral)","var(--berry)"],"1.2":["#7fd4c9","var(--teal)"],"1.3":["#f2c46b","var(--ochre)"],"1.4":["#b9d6cb","var(--green)"]}},
  "jaar-2/mavo/hoofdstuk-2":{map:"j2h2",kop:["Jij en je ","geld"],hero:"begroting",
  alt:"Een vrouw maakt 's avonds aan een bureau een jaarbegroting, met rekenmachine, bonnetjes en een laptop met bankapp",
  intro:"Inkomsten en uitgaven, sparen, lenen en verzekeren: vier paragrafen om slim met je geld om te gaan.",
  par:"Vier paragrafen over jouw geld.",reken:"Begroting, saldo, rente, lening en procenten, met de juiste formule.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kaart:{"2.2":"bankapp"},/* sparen.jpg is een drieluik */
  kleur:{"2.1":["var(--coral)","var(--berry)"],"2.2":["#7fd4c9","var(--teal)"],"2.3":["#f2c46b","var(--ochre)"],"2.4":["#b9d6cb","var(--green)"]}},
  /* jaar 2 mavo H3 t/m H6 (18 nov 2026): H3 en H4 uit de lesapps van de docent, H5 en H6 uit de PowerPoints en leerdoelen */
  "jaar-2/mavo/hoofdstuk-3-aan-het-werk":{map:"j2h3",kop:["Aan het ","werk?"],hero:"werk-h",kaart:{"3.1":"contract-k","3.2":"sectoren-k","3.3":"veilig-k","3.4":"uitkering-k"},
  alt:"Illustratie van twee mensen met een werktas tussen hen in",
  intro:"Geld verdienen, een baan kiezen, de regels op het werk en wat er gebeurt als er geen werk is: vier paragrafen over werken.",
  par:"Vier paragrafen over werk en loon.",beeld:"Beelden: gemaakt voor deze site",reken:"Bruto en netto, loon per week en maand, minimumjeugdloon, WW en procenten.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"3.1":["var(--coral)","var(--berry)"],"3.2":["#7fd4c9","var(--teal)"],"3.3":["#f2c46b","var(--ochre)"],"3.4":["#b9d6cb","var(--green)"]}},
  "jaar-2/mavo/hoofdstuk-4":{map:"j2h4",kop:["Hoe maken we ","het?"],hero:"maken-h",kaart:{"4.1":"kolom-k","4.2":"kringloop-k","4.3":"investeren-k","4.4":"winst-k"},
  alt:"Illustratie van een fabriek en een doos",
  intro:"Van grondstof tot eindproduct, de kosten voor het milieu, investeren en winst maken: vier paragrafen over produceren.",
  par:"Vier paragrafen over produceren.",beeld:"Beelden: gemaakt voor deze site",reken:"Kostprijs, toegevoegde waarde, afschrijving, arbeidsproductiviteit, omzet en winst.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"4.1":["var(--coral)","var(--berry)"],"4.2":["#7fd4c9","var(--teal)"],"4.3":["#f2c46b","var(--ochre)"],"4.4":["#b9d6cb","var(--green)"]}},
  "jaar-2/mavo/hoofdstuk-5":{map:"j2h5",kop:["Is handel iets voor ","jou?"],hero:"markt-h",kaart:{"5.1":"vraag-k","5.2":"prijs-k","5.3":"bon-k","5.4":"nettowinst-k"},
  alt:"Illustratie van een winkel en een winkelwagen",
  intro:"Vraag en aanbod, de verkoopprijs, btw en wat een winkelier echt overhoudt: vier paragrafen over kopen en verkopen.",
  par:"Vier paragrafen over kopen en verkopen.",beeld:"Beelden: gemaakt voor deze site",reken:"Verkoopprijs, btw, consumentenprijs, omzet, brutowinst en nettowinst.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"5.1":["var(--coral)","var(--berry)"],"5.2":["#7fd4c9","var(--teal)"],"5.3":["#f2c46b","var(--ochre)"],"5.4":["#b9d6cb","var(--green)"]}},
  "jaar-2/mavo/hoofdstuk-6":{map:"j2h6",kop:["Wat doet de ","overheid?"],hero:"bestuur-h",kaart:{"6.1":"lagen-k","6.2":"zekerheid-k","6.3":"belasting-k","6.4":"begroting-k"},
  alt:"Illustratie van een overheidsgebouw met een vlag",
  intro:"Rijk, provincie en gemeente, sociale zekerheid, belasting en de begroting: vier paragrafen over wat de overheid regelt.",
  par:"Vier paragrafen over de overheid.",beeld:"Beelden: gemaakt voor deze site",reken:"Btw en consumentenprijs, procenten en het saldo van de begroting.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"6.1":["var(--coral)","var(--berry)"],"6.2":["#7fd4c9","var(--teal)"],"6.3":["#f2c46b","var(--ochre)"],"6.4":["#b9d6cb","var(--green)"]}},
  /* jaar 4 mavo (18 nov 2026): H1 t/m H3 en H5 t/m H8 in de opzet van jaar 2 H2; H4 volgt */
  "jaar-4/hoofdstuk-1-verdien-je-genoeg":{map:"j4h1",kop:["Verdien je ","genoeg?"],hero:"inkomen",
  alt:"Een stapel eurobiljetten van 20, 100 en 200 euro",
  intro:"Waar komt je inkomen vandaan, hoe is het verdeeld en wat kun je ervan kopen? Vier paragrafen over inkomen, welvaart en stijgende prijzen.",
  par:"Vier paragrafen over je inkomen.",beeld:"Foto's: Unsplash (gratis licentie)",reken:"Procenten, indexcijfers, koopkracht, BBP per inwoner en de Lorenzcurve.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"1.1":["var(--coral)","var(--berry)"],"1.2":["#7fd4c9","var(--teal)"],"1.3":["#f2c46b","var(--ochre)"],"1.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-2-geld-moet-rollen":{map:"j4h2",kop:["Geld moet ","rollen"],hero:"geld-h",kaart:{"2.1":"budget-k","2.2":"sparen-k","2.3":"lenen-k","2.4":"betalen-k"},
  alt:"Illustratie van een stapel munten en een euromunt",
  intro:"Hoe geef je je geld uit, wat levert sparen op en wat kost lenen? Vier paragrafen over budgetteren, sparen, beleggen, lenen en de bank.",
  par:"Vier paragrafen over jouw geld.",beeld:"Beelden: gemaakt voor deze site",reken:"Budgetplan, week en maand, rente, rendement, kredietkosten en saldo.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"2.1":["var(--coral)","var(--berry)"],"2.2":["#7fd4c9","var(--teal)"],"2.3":["#f2c46b","var(--ochre)"],"2.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-3":{map:"j4h3",kop:["We gaan voor ","winst"],hero:"winst-h",kaart:{"3.1":"kosten-k","3.2":"omzet-k","3.3":"markt-k","3.4":"macht-k"},
  alt:"Illustratie van een fabriek en een stapel munten",
  intro:"Wat kost het om iets te maken, wat levert het op en wie bepaalt de prijs? Vier paragrafen over kosten, winst, vraag en aanbod en macht op de markt.",
  par:"Vier paragrafen over bedrijven en de markt.",beeld:"Beelden: gemaakt voor deze site",reken:"Kostprijs, afschrijving, verkoopprijs en btw, omzet en winst, marktaandeel.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"3.1":["var(--coral)","var(--berry)"],"3.2":["#7fd4c9","var(--teal)"],"3.3":["#f2c46b","var(--ochre)"],"3.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-4-aan-het-werk":{map:"j4h4",kop:["Aan het ","werk"],hero:"werk-h",kaart:{"4.1":"bescherming-k","4.2":"vormen-k","4.3":"arbeidsmarkt-k","4.4":"zoeken-k"},
  alt:"Illustratie van een bouwhelm en een werktas",
  intro:"Welke rechten heb je als werknemer, waar kun je werken en waarom is er soms te weinig werk? Vier paragrafen over werk, bedrijven, de arbeidsmarkt en werkloosheid.",
  par:"Vier paragrafen over werk en werkloosheid.",beeld:"Beelden: gemaakt voor deze site",reken:"Loon per maand, winst verdelen, arbeidsjaren, werkloosheid in procenten.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"4.1":["var(--coral)","var(--berry)"],"4.2":["#7fd4c9","var(--teal)"],"4.3":["#f2c46b","var(--ochre)"],"4.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-5-kan-de-overheid-dat-regelen":{map:"j4h5",kop:["Kan de overheid dat ","regelen?"],hero:"overheid-h",kaart:{"5.1":"sectoren-k","5.2":"systemen-k","5.3":"zekerheid-k","5.4":"begroting-k"},
  alt:"Illustratie van een overheidsgebouw met zuilen en een vlag",
  intro:"Wat regelt de overheid, hoe stuurt ze de economie, wie krijgt een uitkering en waar komt het geld vandaan? Vier paragrafen over de overheid.",
  par:"Vier paragrafen over de overheid.",beeld:"Beelden: gemaakt voor deze site",reken:"Begrotingssaldo, miljoenen en miljarden, procenten, bbp en uitkeringen.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"5.1":["var(--coral)","var(--berry)"],"5.2":["#7fd4c9","var(--teal)"],"5.3":["#f2c46b","var(--ochre)"],"5.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-6-de-overheid-en-ons-inkomen":{map:"j4h6",kop:["De overheid en ons ","inkomen"],hero:"belasting-h",kaart:{"6.1":"loonstrook-k","6.2":"schijven-k","6.3":"verdelen-k","6.4":"draagkracht-k"},
  alt:"Illustratie van een aangifteformulier en een euromunt",
  intro:"Hoeveel belasting betaal je over je loon en je spaargeld, en is dat eerlijk verdeeld? Vier paragrafen over belasting en inkomen.",
  par:"Vier paragrafen over belasting.",beeld:"Beelden: gemaakt voor deze site",reken:"Nettoloon, belastbaar inkomen, box 1, box 3, heffingskorting en nivelleren.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"6.1":["var(--coral)","var(--berry)"],"6.2":["#7fd4c9","var(--teal)"],"6.3":["#f2c46b","var(--ochre)"],"6.4":["#b9d6cb","var(--green)"]}},
  /* 3 mavo H7: hoort bij het SE H5 + H6 van 4 mavo */
  "jaar-4/hoofdstuk-7":{map:"j4h7",kop:["Nederland ","handelsland"],hero:"handel-h",kaart:{"7.1":"haven-k","7.2":"wereld-k","7.3":"euro-k","7.4":"globaal-k"},
  alt:"Illustratie van een containerschip en een wereldbol",
  intro:"Waarom handelt Nederland zo veel met het buitenland, en wie maakt de regels? Vier paragrafen over export en import, vrijhandel, de EU en globalisering.",
  par:"Vier paragrafen over handel met het buitenland.",beeld:"Beelden: gemaakt voor deze site",reken:"Export- en importquote, handelssaldo, invoerrechten en procenten.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"7.1":["var(--coral)","var(--berry)"],"7.2":["#7fd4c9","var(--teal)"],"7.3":["#f2c46b","var(--ochre)"],"7.4":["#b9d6cb","var(--green)"]}},
  "jaar-4/hoofdstuk-8":{map:"j4h8",kop:["Welvaart ","wereldwijd"],hero:"welvaart-h",kaart:{"8.1":"verdeling-k","8.2":"monocultuur-k","8.3":"krediet-k","8.4":"fairtrade-k"},dias:{"8.2":"8.1","8.4":"8.3"},/* de PowerPoints van de docent zijn per twee paragrafen */
  alt:"Illustratie van een wereldbol en een weegschaal",
  intro:"Waarom is het ene land rijk en het andere arm, en wat kun je daaraan doen? Vier paragrafen over welvaart, ontwikkelingslanden, hulp en eerlijke handel.",
  par:"Vier paragrafen over arm en rijk in de wereld.",beeld:"Beelden: gemaakt voor deze site",reken:"Inkomen per hoofd, inkomensverdeling, de norm van 0,7% en de fairtradeprijs.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"8.1":["var(--coral)","var(--berry)"],"8.2":["#7fd4c9","var(--teal)"],"8.3":["#f2c46b","var(--ochre)"],"8.4":["#b9d6cb","var(--green)"]}},
  "jaar-3/mavo/hoofdstuk-7-de-overheid-voor-ons-allemaal":{map:"j3h7",kop:["De overheid voor ons ","allemaal"],hero:"bestuur-h",kaart:{"7.1":"overheid-k","7.2":"zekerheid-k","7.3":"sectoren-k","7.4":"begroting-k"},
  alt:"Illustratie van een overheidsgebouw met zuilen en een vlag",
  intro:"Wie bestuurt ons land, wie krijgt een uitkering en hoe komt het Rijk aan zijn geld? Vier paragrafen over de overheid.",
  par:"Vier paragrafen over de overheid.",beeld:"Beelden: gemaakt voor deze site",reken:"Procenten, WW-uitkering, belasting in een prijs en het begrotingssaldo.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"7.1":["var(--coral)","var(--berry)"],"7.2":["#7fd4c9","var(--teal)"],"7.3":["#f2c46b","var(--ochre)"],"7.4":["#b9d6cb","var(--green)"]}},
  /* jaar 3 mavo in de nieuwe opzet (18 nov 2026) */
  "jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld":{map:"j3h3",kop:["De bank en jouw ","geld"],hero:"bank-h",kaart:{"3.1":"betalen-k","3.2":"sparen-k","3.3":"lenen-k","3.4":"beleggen-k"},
  alt:"Illustratie van een bankgebouw met een stapel munten",
  intro:"Betalen, sparen, lenen en beleggen: wat doet de bank met jouw geld, en wat kost of levert het op? Vier paragrafen met veel rekenwerk.",
  par:"Vier paragrafen over de bank en jouw geld.",beeld:"Beelden: gemaakt voor deze site",reken:"Saldo, enkelvoudige en samengestelde rente, kredietkosten, aandelen en wisselkoersen.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"3.1":["var(--coral)","var(--berry)"],"3.2":["#7fd4c9","var(--teal)"],"3.3":["#f2c46b","var(--ochre)"],"3.4":["#b9d6cb","var(--green)"]}},
  "jaar-3/mavo/hoofdstuk-4-ben-je-verzekerd":{map:"j3h4",kop:["Kies je voor ","zekerheid?"],hero:"verzekeren-h",kaart:{"4.1":"polis-k","4.2":"inboedel-k","4.3":"auto-k","4.4":"zorg-k"},
  alt:"Illustratie van een paraplu boven een huis",
  intro:"Verzekeren, je huis en je spullen, de auto en de zorg: waarvoor verzeker je je, en wat kost dat? Vier paragrafen met veel rekenwerk.",
  par:"Vier paragrafen over verzekeren.",beeld:"Beelden: gemaakt voor deze site",reken:"Premie uit een tabel, verzekeringskosten, kans op schade, onderverzekering, de bonus-malusladder en zorgkosten.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"4.1":["var(--coral)","var(--berry)"],"4.2":["#7fd4c9","var(--teal)"],"4.3":["#f2c46b","var(--ochre)"],"4.4":["#b9d6cb","var(--green)"]}},
  "jaar-3/mavo/hoofdstuk-5-werkt-dat-zo":{map:"j3h5",kop:["Is er werk ","voor jou?"],hero:"werk-h",kaart:{"5.1":"loon-k","5.2":"bedrijf-k","5.3":"markt-k","5.4":"robot-k"},
  alt:"Illustratie van een werknemer met een helm naast een fabriek",
  intro:"Waarom werken mensen, wat houd je over van je loon, bij wat voor bedrijf kun je werken en wat als er geen werk is? Vier paragrafen over werk.",
  par:"Vier paragrafen over werk en de arbeidsmarkt.",beeld:"Beelden: gemaakt voor deze site",reken:"Van bruto naar netto, loon omrekenen, deeltijd, arbeidsparticipatie, werkloosheid en de WW-uitkering.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kleur:{"5.1":["var(--coral)","var(--berry)"],"5.2":["#7fd4c9","var(--teal)"],"5.3":["#f2c46b","var(--ochre)"],"5.4":["#b9d6cb","var(--green)"]}}};
/* SE-pagina's in de nieuwe opzet: de hoofdstukken van het SE (leren) en de oefenstof (oefenen) op één plek */
var SE={"jaar-4/se-h1-h2-h8":{naam:"SE hoofdstuk 1 en 2",kort:"H1 + H2",kop:["SE hoofdstuk 1 ","en 2"],hero:"j4h1/inkomen",
  intro:"Alles voor het schoolexamen over inkomen en geld: hoofdstuk 1 en 2. Leer eerst per hoofdstuk, oefen daarna en maak als laatste het oefen-SE.",
  delen:["jaar-4/hoofdstuk-1-verdien-je-genoeg","jaar-4/hoofdstuk-2-geld-moet-rollen"],
  toets:["se3/toets.html","Oefen-SE","Eén toets over beide hoofdstukken, met klok. Meerkeuze en rekenen kijkt de site na."],
  extra:[["se3/app.html","Oefenlab SE","Quiz, games, rekenen en een toets op maat over hoofdstuk 1 en 2 samen.",""]],beeld:"Foto's: Unsplash (gratis licentie) · beelden gemaakt voor deze site"},
  "jaar-4/se-h5-en-h6":{naam:"SE hoofdstuk 5, 6 en 7",kort:"H5 + H6 + H7 (3 mavo)",kop:["SE hoofdstuk 5, 6 ","en 7"],hero:"j4h5/overheid-h",
  intro:"Alles voor het schoolexamen over de overheid: hoofdstuk 5 en 6 van dit jaar en hoofdstuk 7 uit 3 mavo. Leer eerst per hoofdstuk, oefen daarna en maak als laatste het oefen-SE.",
  delen:["jaar-4/hoofdstuk-5-kan-de-overheid-dat-regelen","jaar-4/hoofdstuk-6-de-overheid-en-ons-inkomen","jaar-3/mavo/hoofdstuk-7-de-overheid-voor-ons-allemaal"],
  toets:["se56/toets.html","Oefen-SE","Eén toets over alle drie de hoofdstukken, met klok. Meerkeuze en rekenen kijkt de site na."],beeld:"Beelden: gemaakt voor deze site"},
  "jaar-3/mavo/se-1":{naam:"SE hoofdstuk 1 en 3",kort:"H1 + H3",kop:["SE hoofdstuk 1 ","en 3"],hero:"j3h3/bank-h",
  intro:"Alles voor het schoolexamen over welvaart en de bank: hoofdstuk 1 en 3. Leer eerst per hoofdstuk, oefen daarna en maak als laatste het oefen-SE.",
  delen:["jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart","jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld"],
  toets:["se13/toets.html","Oefen-SE","Eén toets over beide hoofdstukken, met klok. Meerkeuze en rekenen kijkt de site na."],
  extra:[["https://drive.google.com/file/d/1MyiM_9hov8xVy91OMxwA7AkZEdVA5qT1/view","Oefentoets hoofdstuk 1 op papier","De oefentoets uit de les. Het nakijkblad staat onderaan het document.",""],
    ["https://drive.google.com/file/d/1z6ric2rTNplNUFT2kDkqbGNQav-ixfCs/view","Herhalingsvragen hoofdstuk 1","Het nakijkblad bij de herhalingsvragen uit de les.",""]],beeld:"Foto's: Unsplash (gratis licentie) · beelden gemaakt voor deze site"},
  "jaar-4/se4":{naam:"SE hoofdstuk 3 en 4",kort:"H3 + H4",kop:["SE hoofdstuk 3 ","en 4"],hero:"j4h3/winst-h",
  intro:"Alles voor het schoolexamen over bedrijven en werk: hoofdstuk 3 en 4. Leer eerst per hoofdstuk, oefen daarna en maak als laatste het oefen-SE.",
  delen:["jaar-4/hoofdstuk-3","jaar-4/hoofdstuk-4-aan-het-werk"],
  toets:["se34/toets.html","Oefen-SE","Eén toets over beide hoofdstukken, met klok. Meerkeuze en rekenen kijkt de site na."],beeld:"Beelden: gemaakt voor deze site"}};
var NAAM={"jaar-3/mavo/hoofdstuk-5-werkt-dat-zo":"Hoofdstuk 5: Is er werk voor jou?","jaar-3/mavo/hoofdstuk-4-ben-je-verzekerd":"Hoofdstuk 4: Kies je voor zekerheid?","jaar-3/mavo/se-1":"SE H1 + H3","jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart":"Hoofdstuk 1: Hoe welvarend ben jij?","jaar-4/se4":"SE H3 + H4","jaar-4/se-h1-h2-h8":"SE H1 + H2","jaar-4/se-h5-en-h6":"SE H5 + H6 + H7 (3 mavo)","jaar-2/mavo/kopie-van-hoofdstuk-1":"Hoofdstuk 1 · lesstof en PowerPoints"};

var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
var $=function(id){return document.getElementById(id);};
var PAGE=document.body.dataset.page,Q=new URLSearchParams(location.search),P=[];
function titel(p){return NAAM[p.pad]||p.titel.replace(/\s+/g," ").trim();}
/* geeft [jaar, niveau] van een pagina */
function jaarVan(pad){for(var a=0;a<JAREN.length;a++)for(var b=0;b<JAREN[a].niv.length;b++){var n=JAREN[a].niv[b];if(n.pre&&pad.indexOf(n.pre)===0)return [JAREN[a],n];}return [JAREN[0],JAREN[0].niv[0]];}
function hoofdstukken(n){if(!n.pre)return [];return P.filter(function(p){return p.pad.indexOf(n.pre)===0&&p.pad!==n.pre.replace(/\/$/,"");});}
function jaarTotaal(j){return j.niv.reduce(function(s,n){return s+hoofdstukken(n).length;},0);}
function naam(j,n){return j.titel+" · "+n.titel.toLowerCase();}
function jaarUrl(j,n){return "jaar.html?j="+j.id+(n?"&n="+n.id:"");}
function isSE(pad){return /\/(se|eindexamen|proefwerk)/.test(pad);}
function blokken(p){var b=[];p.secties.forEach(function(s){b=b.concat(s);});return b;}
function telling(p){var b=blokken(p),t={ppt:0,doc:0,vid:0,act:0};b.forEach(function(x){if(x.t==="drive"){var e=ext(x.naam);if(e==="ppt")t.ppt++;else if(e==="vid")t.vid++;else t.doc++;}else if(x.t==="youtube")t.vid++;else if(x.t==="link")t.act++;});
  var s=[];if(APPS[p.pad])s.push("lesapp");if(t.ppt)s.push(t.ppt+" PowerPoint"+(t.ppt>1?"s":""));if(t.vid)s.push(t.vid+" film"+(t.vid>1?"s":""));if(t.doc)s.push(t.doc+" oefenstof");if(t.act)s.push(t.act+" online oefening"+(t.act>1?"en":""));return s.join(" · ");}
function ext(n){var e=(/\.(\w{2,4})$/.exec(n||"")||[])[1]||"";e=e.toLowerCase();return /pptx?|key/.test(e)?"ppt":/docx?|pages|odt/.test(e)?"doc":e==="pdf"?"pdf":/mp4|mov|m4v|webm/.test(e)?"vid":/xlsx?|csv/.test(e)?"xls":"doc";}
var ICON={ppt:["PPT","PowerPoint"],doc:["DOC","Document"],pdf:["PDF","PDF"],vid:["▶","Film"],xls:["XLS","Spreadsheet"]};
function nette(n){return (n||"Bestand").replace(/\.(\w{2,4})$/,"").replace(/^Economie\s+jaar\s+\d\s+(hoofdstuk|Hoofdstuk|H)\s*/i,"").replace(/\s+/g," ").trim()||n;}
function linkSoort(h){var d=(h.split("/")[2]||"").replace(/^www\./,"");return /nearpod/.test(d)?["nearpod","Nearpod"]:/edpuzzle/.test(d)?["edpuzzle","Edpuzzle"]:/socrative/.test(d)?["socrative","Socrative"]:/schooltv/.test(d)?["web","Schooltv"]:["web",d];}
function top(extra){return '<div class="top"><div class="wrap"><a class="brand" href="../index.html">Meneer <span>Boersen</span></a><nav class="crumbs" aria-label="Kruimelpad"><a href="index.html">Economie</a>'+(extra||"")+'</nav></div></div>';}
function voet(){return '<footer><div class="wrap">Economie mavo · Vellesan College · J. Boersen. Foto\'s: Unsplash (gratis licentie). PowerPoints, opdrachten en films openen vanuit Google Drive.</div></footer>';}

/* ---------- overzicht: zelfde opzet als de hoofdstukpagina's (body.rijk) ---------- */
function index(){
  var KL=[["var(--coral)"],["#7fd4c9"],["#f2c46b"]],
  jaar=function(j,i){var nv=j.niv.filter(function(n){return n.pre;});return '<a class="rchap io" style="--c:'+KL[i%3][0]+';--d:'+i+'" href="'+jaarUrl(j,nv.length===1&&j.niv.length===1?nv[0]:null)+'"><img src="img/'+j.img+'.jpg" alt="" loading="lazy"><span class="glare"></span><span class="num">'+j.id.slice(-1)+'</span><div class="body"><span class="tag">'+esc(j.niv.map(function(n){return n.titel;}).join(" · "))+'</span><h3>'+esc(j.titel)+'</h3><p>'+esc(j.intro)+'</p><div class="links">'+rSpans([jaarTotaal(j)+" onderdelen"].concat(j.niv.filter(function(n){return !n.pre;}).map(function(n){return n.titel+" volgt";})))+'</div></div></a>';},
  /* uitgelicht: de hoofdstukken met een eigen leeromgeving en oefenomgeving */
  nieuw=Object.keys(RIJK).filter(function(pad){return !RIJK[pad].van;}).map(function(pad){var c=RIJK[pad],jn=jaarVan(pad),p=P.filter(function(x){return x.pad===pad;})[0];return ["h.html?p="+encodeURIComponent(pad),naam(jn[0],jn[1])+(p?" · "+titel(p).toLowerCase():""),c.kop.join(""),c.intro];})
    .concat(Object.keys(LEEROMG).map(function(pad){var jn=jaarVan(pad),p=P.filter(function(x){return x.pad===pad;})[0];return [LEEROMG[pad][0],naam(jn[0],jn[1]),p?titel(p):"Leeromgeving",LEEROMG[pad][2]];}));
  document.title="Economie · Meneer Boersen";
  document.body.className="rijk";
  document.body.innerHTML=rNav([["../geschiedenis.html","Geschiedenis"]],"#jaren","Kies je jaar")
  +'<section class="rhero"><div class="rhero-img" id="rimg" style="background-image:url(img/wereldhandel.jpg)" role="img" aria-label="Een containerhaven met kranen en duizenden containers aan het water"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">Economie · mavo · Vellesan College</div><h1 class="rv" style="--i:1">Snap hoe <em>geld</em> werkt.</h1><p class="rv" style="--i:2">Alle hoofdstukken van jaar 2, 3 en 4: PowerPoints, uitleg, oefenstof, filmpjes, lesapps en voorbereiding op je SE\'s.</p><div class="rbtns rv" style="--i:3"><a class="rbtn primary" href="#jaren">Kies je jaar <span class="arr">→</span></a><a class="rbtn ghost" href="../geschiedenis.html">Naar Geschiedenis</a></div></div><div class="rscroll" aria-hidden="true"></div></section>'
  +'<section class="rblk" id="jaren"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Stap 1 · In welk jaar zit je?</div><h2>Kies je jaar.</h2></div><p>Daarna kies je je niveau en je hoofdstuk. Per hoofdstuk vind je de PowerPoints, de uitleg en alles om te oefenen.</p></div><div class="rchaps drie">'+JAREN.map(jaar).join("")+'</div></div></section>'
  +rGolf(" top")+'<section class="rblk rapp" id="nieuw"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Nieuw</div><h2>Leren en oefenen op één plek.</h2></div><p>Deze hoofdstukken hebben een eigen leeromgeving met klikbare PowerPoints, de vragen die je moet kunnen beantwoorden en alles om te oefenen.</p></div><div class="roef'+(nieuw.length===3?" n3":"")+'">'
  +nieuw.map(function(g,i){return '<a class="io" style="--d:'+i+'" href="'+g[0]+'"><b>'+(i+1)+'</b><small>'+esc(g[1])+'</small><h3>'+esc(g[2])+'</h3><p>'+esc(g[3])+'</p><span class="arr">→</span></a>';}).join("")
  +'</div></div></section>'+rGolf("")
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Ook Geschiedenis?</div><h2>Alles van meneer Boersen.</h2><p>De leeromgevingen van Geschiedenis staan op dezelfde site, met dezelfde opzet.</p><div class="rbtns"><a class="rbtn primary" href="../geschiedenis.html">Naar Geschiedenis <span class="arr">→</span></a><a class="rbtn ghost" href="../index.html">Naar de homepage</a></div></div></section>'
  +rVoet("mavo","Foto's: Unsplash (gratis licentie)");
  rijkGedrag({},false);}

/* ---------- jaar: eerst het niveau, daarna de hoofdstukken (opzet van de hoofdstukpagina's, body.rijk) ---------- */
var KLEUREN=["var(--coral)","#7fd4c9","#f2c46b","#b9d6cb"];
function rKop(j,n,extra){return rNav([["index.html","Economie"]].concat(extra||[]),"#hoofdstukken","Kies je hoofdstuk");}
function rHero(img,alt,eyebrow,kop,em,tekst,knoppen){return '<section class="rhero klein"><div class="rhero-img" id="rimg" style="background-image:url('+img+')" role="img" aria-label="'+esc(alt)+'"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">'+esc(eyebrow)+'</div><h1 class="rv" style="--i:1">'+esc(kop)+(em?'<em>'+esc(em)+'</em>':'')+'</h1><p class="rv" style="--i:2">'+esc(tekst)+'</p><div class="rbtns rv" style="--i:3">'+knoppen+'</div></div></section>';}
/* kaartbeeld: de hero van een hoofdstuk met eigen opzet, anders het thema */
function kaartImg(p,j){var c=RIJK[p.pad];return c?"img/"+c.map+"/"+c.hero+".jpg":"img/"+(THEMA[p.pad]||j.img)+".jpg";}
/* "Hoofdstuk 3: De bank en jouw geld" -> [3, "De bank en jouw geld"] */
function hNum(p){var t=titel(p),m=/^Hoofdstuk\s*(\d+)\s*[:\-–]?\s*(.*)$/i.exec(t);return m?[+m[1],m[2]?m[2].charAt(0).toUpperCase()+m[2].slice(1):"Hoofdstuk "+m[1]]:[null,t];}
function jaar(){
  var j=JAREN.filter(function(x){return x.id===Q.get("j");})[0]||JAREN[1];
  var n=j.niv.filter(function(x){return x.id===Q.get("n");})[0];
  if(!n||!n.pre){niveau(j);return;}
  var L=hoofdstukken(n),se=L.filter(function(p){return isSE(p.pad);}),rest=L.filter(function(p){return !isSE(p.pad);}),
  nul=rest.filter(function(p){return hNum(p)[0]===0;}),hs=rest.filter(function(p){return hNum(p)[0]!==0&&!(RIJK[p.pad]&&RIJK[p.pad].van);});
  hs.sort(function(a,b){return (hNum(a)[0]===null?99:hNum(a)[0])-(hNum(b)[0]===null?99:hNum(b)[0]);});
  document.title=naam(j,n)+" · Economie";document.body.className="rijk";
  var url=function(p){return "h.html?p="+encodeURIComponent(p.pad);},
  tags=function(p){return rSpans((RIJK[p.pad]?["Nieuwe leeromgeving"]:[]).concat(telling(p).split(" · ").filter(Boolean).slice(0,3)));},
  kaart=function(p,i){var h=hNum(p);return '<a class="rchap io" style="--c:'+KLEUREN[i%4]+';--d:'+(i%4)+'" href="'+url(p)+'"><img src="'+kaartImg(p,j)+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+(h[0]===null?"·":h[0])+'</span><div class="body"><span class="tag">'+(RIJK[p.pad]?"Nieuw · ":"")+(h[0]===null?"Extra":"Hoofdstuk "+h[0])+'</span><h3>'+esc(RIJK[p.pad]?RIJK[p.pad].kop.join(""):h[1])+'</h3><div class="links">'+tags(p)+'</div></div></a>';};
  var een=hs.length===1&&RIJK[hs[0].pad]?hs[0]:null;
  var h=rKop(j,n,[[jaarUrl(j),j.titel]])
  +rHero("img/"+(n.img||j.img)+".jpg",n.alt||"",'Economie · '+j.titel+' · '+n.titel.toLowerCase(),j.titel+" ",n.titel.toLowerCase(),n.intro||j.intro,'<a class="rbtn primary" href="#hoofdstukken">'+(een?"Naar hoofdstuk "+hNum(een)[0]:"Naar de hoofdstukken")+' <span class="arr">→</span></a>'+(se.length?'<a class="rbtn ghost" href="#toetsen">Toetsen en SE\'s</a>':''));
  if(nul.length)h+='<section class="rblk rnul"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Begin hier</div><h2>Eerst de rekenvaardigheden.</h2></div><p>De formules die je het hele jaar nodig hebt, met instructiefilms en oefenopgaven. Kom hier terug als je bij een hoofdstuk vastloopt met rekenen.</p></div>'
    +nul.map(function(p){return '<a class="rchap breed io" style="--c:var(--coral)" href="'+url(p)+'"><img src="'+kaartImg(p,j)+'" alt="" loading="lazy"><span class="glare"></span><span class="num">0</span><div class="body"><span class="tag">Hoofdstuk 0</span><h3>'+esc(hNum(p)[1])+'</h3><div class="links">'+tags(p)+'</div></div></a>';}).join("")+'</div></section>';
  if(een)h+=rUitgelicht(een,j,n);
  else h+='<section class="rblk" id="hoofdstukken"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">'+esc(naam(j,n))+'</div><h2>'+(hs.length===1?"Het hoofdstuk.":"De "+hs.length+" hoofdstukken.")+'</h2></div><p>Per hoofdstuk de PowerPoints, de uitleg, de filmpjes en de oefenstof. Kies het hoofdstuk waar je in de les mee bezig bent.</p></div><div class="rchaps vier">'+hs.map(kaart).join("")+'</div></div></section>';
  if(se.length)h+=rGolf(" top")+'<section class="rblk rapp" id="toetsen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Toetsen en SE\'s</div><h2>Bereid je voor op de toets.</h2></div><p>Per SE de stof die je moet kennen, met oefentoetsen en nakijkbladen.</p></div><div class="roef'+(se.length===3?" n3":"")+'">'
    +se.map(function(p,i){var z=SE[p.pad];if(z)return '<a class="io" style="--d:'+i+'" href="'+url(p)+'"><b>SE</b><small>'+esc(z.kort)+'</small><h3>'+esc(z.naam)+'</h3><p>Nieuw: leren per hoofdstuk, oefenen en een oefen-SE.</p><span class="arr">→</span></a>';var t=titel(p),m=/\(([^)]*)\)|(H\s*\d+\s*\+\s*H?\s*\d+.*)$/i.exec(t);return '<a class="io" style="--d:'+i+'" href="'+url(p)+'"><b>'+esc((/SE\s*\d+/i.exec(t)||[t.split(" ")[0]])[0].replace(/\s+/,""))+'</b><small>'+esc(m?(m[1]||m[2]).replace(/\s+/g," "):"Toetsvoorbereiding")+'</small><h3>'+esc(/\d/.test(t)?"Schoolexamen "+(/SE\s*(\d+)/i.exec(t)||[,""])[1]:t)+'</h3><p>'+esc(telling(p)||"Toetsvoorbereiding")+'</p><span class="arr">→</span></a>';}).join("")+'</div></div></section>'+rGolf("");
  h+='<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Verkeerde plek?</div><h2>Ander jaar of niveau.</h2><p>Kies een ander jaar of ga terug naar het overzicht van Economie.</p><div class="rbtns">'+(j.niv.length>1?'<a class="rbtn primary" href="'+jaarUrl(j)+'">Ander niveau <span class="arr">→</span></a>':'')+'<a class="rbtn '+(j.niv.length>1?"ghost":"primary")+'" href="index.html">Ander jaar</a></div></div></section>'+rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),n.beeld||"Foto's: Unsplash (gratis licentie)");
  document.body.innerHTML=h;rijkGedrag({},false);
  if(een)rUitgelichtVul(een);}
/* een niveau met één hoofdstuk: geen losse kaart in een leeg raster, maar het hoofdstuk uitgelicht met de twee delen (leren, oefenen) en de paragrafen */
function rUitgelicht(p,j,n){var c=RIJK[p.pad],h=hNum(p),u="h.html?p="+encodeURIComponent(p.pad);
  return '<section class="rblk" id="hoofdstukken"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">'+esc(naam(j,n))+'</div><h2>Hoofdstuk '+h[0]+' staat klaar.</h2></div><p>Eerst leer je de stof per paragraaf, daarna oefen je tot je het kunt. De andere hoofdstukken van '+esc(n.titel.toLowerCase())+' volgen later.</p></div>'
  +'<div class="ruit"><a class="rchap io" style="--c:var(--coral)" href="'+u+'"><img src="'+rSrc(c,c.hero)+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+h[0]+'</span><div class="body"><span class="tag">Hoofdstuk '+h[0]+'</span><h3>'+esc(c.kop.join(""))+'</h3><p>'+esc(c.intro)+'</p></div></a>'
  +'<div class="ruit-tx io" style="--d:1"><a class="rdeel" href="'+u+'#paragrafen"><b>1</b><span><strong>Leren</strong><small>Per paragraaf de leerdoelen, de dia\'s uit de les, de filmpjes en de begrippen.</small></span><i aria-hidden="true">→</i></a>'
  +'<div class="rdeel-pars" id="ruitpars"></div>'
  +'<a class="rdeel" href="'+u+'#oefenen"><b>2</b><span><strong>Oefenen</strong><small>Begrippen, rekenen, quiz, games en oefentoetsen die je zelf nakijkt.</small></span><i aria-hidden="true">→</i></a></div></div></div></section>';}
function rUitgelichtVul(p){var c=RIJK[p.pad],el=$("ruitpars");fetch(c.map+"/data.json").then(function(r){return r.json();}).then(function(D){
  el.innerHTML=D.pars.map(function(x){var d=rTel(D,x);return '<a href="'+rUrl(p,x.id)+'" style="--k:'+c.kleur[x.id][1]+'"><b>'+x.id+'</b><span>'+esc(x.t)+'</span>'+(d?'<em>'+d+' van '+x.q.length+'</em>':'')+'</a>';}).join("");
  var o=document.querySelectorAll(".ruit .rdeel")[1];if(o&&D.oefen)o.href=D.oefen;}).catch(function(){});}

function niveau(j){
  document.title=j.titel+" · Economie";document.body.className="rijk";
  var h=rNav([["index.html","Economie"]],"#niveau","Kies je niveau")
  +rHero("img/"+j.img+".jpg","","Economie · "+j.titel,j.titel,"",j.intro,'<a class="rbtn primary" href="#niveau">Kies je niveau <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Ander jaar</a>')
  +'<section class="rblk" id="niveau"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Stap 2</div><h2>Op welk niveau zit je?</h2></div><p>Daarna kies je je hoofdstuk.</p></div><div class="rchaps">'+j.niv.map(function(n,i){
    var c=hoofdstukken(n).length,binnen='<span class="glare"></span><span class="num">'+esc(n.titel.charAt(0))+'</span><div class="body"><span class="tag">'+(n.pre?c+" onderdelen":"Volgt binnenkort")+'</span><h3>'+esc(n.titel)+'</h3><p>'+(n.pre?esc(naam(j,n))+": alle hoofdstukken, PowerPoints, oefenstof, filmpjes en lesapps.":"De lesstof voor "+esc(n.titel.toLowerCase())+" komt later op de site.")+'</p></div>';
    return n.pre?'<a class="rchap io" style="--c:'+KLEUREN[i]+';--d:'+i+'" href="'+jaarUrl(j,n)+'"><img src="img/'+(n.img||j.img)+'.jpg" alt="" loading="lazy">'+binnen+'</a>':'<div class="rchap volgt io" style="--c:'+KLEUREN[i]+';--d:'+i+'" aria-disabled="true">'+binnen+'</div>';}).join("")+'</div></div></section>'
  +rVoet(j.titel.toLowerCase(),"Foto's: Unsplash (gratis licentie)");
  document.body.innerHTML=h;rijkGedrag({},false);}

/* ---------- hoofdstuk op volle breedte (RIJK) ---------- */
function rijk(p,j,n,c){
  fetch(c.map+"/data.json").then(function(r){return r.json();}).then(function(D){
    if(c.soort==="reken"){rekenen(p,j,n,c,D);rijkGedrag(D,false);return;}
    var x=D.pars.filter(function(y){return y.id===Q.get("par");})[0];
    document.body.className="rijk";
    if(x)paragraaf(p,j,n,c,D,x);else hoofdpagina(p,j,n,c,D);
    if(x)rLicht(c,x);
    var dv=x&&c.dias&&c.dias[x.id]||x&&x.id;if(x&&D.deck[dv])rDeck($("rdeck"),c.map+"/slides/"+dv+"/",D.deck[dv],D.steps[dv]||{},"deck-"+c.map+"-"+dv);
    rijkGedrag(D,!!x);
  }).catch(function(){document.body.innerHTML='<main class="wrap"><p>De pagina kon niet laden. Probeer het opnieuw.</p></main>';});}
function rUrl(p,id){return "h.html?p="+encodeURIComponent(p.pad)+(id?"&par="+id:"");}
/* hoofdstuk 0 rekenvaardigheden: keuzehulp, formulekaart, instructiefilms en oefenstof (inhoud met de hand geschreven in j3h0/data.json) */
function rekenen(p,j,n,c,D){
  var t=rKort(p),bn=jaarUrl(j,n),alle=[].concat.apply([],D.groepen.map(function(g){return g.f;})),F=function(id){return alle.filter(function(f){return f.id===id;})[0];},
  kaart=function(f,i){return '<div class="rform io" id="f-'+f.id+'" style="--d:'+(i%4)+'"><div class="eyebrow">'+esc(f.naam)+'</div><div class="rform-f">'+esc(f.f)+'</div><p>'+esc(f.w)+'</p><p class="rform-vb"><b>Voorbeeld</b>'+esc(f.vb)+'</p></div>';},
  film=function(f){return '<div class="rfilm io"><div class="yt"><img src="https://drive.google.com/thumbnail?id='+esc(f.film)+'&sz=w1200" alt="" loading="lazy" onerror="this.remove()"><button data-film="'+esc(f.film)+'" aria-label="Speel film af: '+esc(f.t)+'"><span></span></button></div><div class="rfilm-tx"><div class="eyebrow">Instructiefilm</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p></div></div>';},
  bestand=function(b,soort){return '<a class="file" href="'+rLink(b[1])+'" target="_blank" rel="noopener"><span class="ic '+(soort==="PPT"?"ppt":"doc")+'">'+soort+'</span><span>'+esc(b[0])+'<small>Opent in Google Drive</small></span></a>';};
  /* keuzehulp volgens het schema van de docent: eerst € of %, daarna stijging/daling */
  var stap=function(id,vraag,knoppen){return '<div class="rkies-stap" data-stap="'+id+'"'+(id==="1"?"":" hidden")+'><p class="rkies-v">'+vraag+'</p><div class="rkies-k">'+knoppen.map(function(k){return '<button data-kies="'+k[1]+'">'+k[0]+'</button>';}).join("")+'</div></div>';};
  document.title=c.kop.join("")+" · Economie "+naam(j,n);document.body.className="rijk";
  document.body.innerHTML=rNav([["index.html","Economie"],[bn,j.titel]],"#oefenstof","Oefenstof")
  +'<section class="rhero"><div class="rhero-img" id="rimg" style="background-image:url('+rSrc(c,c.hero)+')" role="img" aria-label="'+esc(c.alt)+'"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">Economie · '+esc(naam(j,n))+' · '+esc(t.toLowerCase())+'</div><h1 class="rv" style="--i:1">'+esc(c.kop[0])+'<em>'+esc(c.kop[1])+'</em></h1><p class="rv" style="--i:2">'+esc(c.intro)+'</p><div class="rbtns rv" style="--i:3"><a class="rbtn primary" href="#kies">Welke formule? <span class="arr">→</span></a><a class="rbtn ghost" href="#formules">Alle formules</a></div></div><div class="rscroll" aria-hidden="true"></div></section>'
  +'<section class="rblk" id="kies"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Stap voor stap</div><h2>Welke formule kies je?</h2></div><p>Lees de vraag goed. Kijk eerst wat er achter je antwoord moet staan: euro\'s of procenten. Dit schema moet je voor de toets uit je hoofd kennen.</p></div>'
  +'<div class="rkiesgrid"><div class="rkies io" id="rkies">'
  +stap("1","Wat moet er achter je antwoord staan?",[["€ of een aantal","euro"],["%","2"]])
  +stap("2","Gaat het om een stijging of een daling?",[["Ja, iets wordt duurder of goedkoper","verandering"],["Nee","procent"]])
  +'<div class="rkies-uit" hidden></div></div>'+film(D.films[0])+'</div></div></section>'
  +'<section class="rblk ralt" id="formules"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Formulekaart</div><h2>Alle formules van jaar 3.</h2></div><p>'+esc(D.afronden)+'</p></div>'
  +D.groepen.map(function(g){return '<div class="rgroep"><h3 class="io">'+esc(g.t)+'</h3><p class="rgroep-sub io">'+esc(g.sub)+'</p><div class="rforms">'+g.f.map(kaart).join("")+'</div></div>';}).join("")+'</div></section>'
  +'<section class="rblk" id="films"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Instructiefilms</div><h2>Kijk hoe het moet.</h2></div><p>Bij elke film hoort een formule van de formulekaart. Kijk de film en maak daarna de oefenstof.</p></div><div class="rfilms">'+D.films.slice(1).map(film).join("")+'</div>'
  +'<div class="files" style="margin-top:22px">'+bestand(D.ppt,"PPT")+bestand(D.schema,"DOC")+'</div></div></section>'
  +rGolf(" top")+rOefenstof(D,t)+rGolf("")
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Formules in je hoofd?</div><h2>Door naar de hoofdstukken.</h2><p>Kom hier terug als je bij een hoofdstuk vastloopt met rekenen.</p><div class="rbtns"><a class="rbtn primary" href="'+jaarUrl(j,n)+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Economie</a></div></div></section>'
  +rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),c.beeld);
  $("rkies").addEventListener("click",function(e){var b=e.target.closest("[data-kies]");if(!b)return;var k=b.dataset.kies,box=$("rkies"),uit=box.querySelector(".rkies-uit");
    if(k==="opnieuw"){box.querySelectorAll(".rkies-stap").forEach(function(s){s.hidden=s.dataset.stap!=="1";});uit.hidden=true;return;}
    if(k==="2"){box.querySelector('[data-stap="1"]').hidden=true;box.querySelector('[data-stap="2"]').hidden=false;return;}
    var f=F(k);box.querySelectorAll(".rkies-stap").forEach(function(s){s.hidden=true;});uit.hidden=false;
    uit.innerHTML='<p class="rkies-v">Gebruik deze formule:</p><div class="rform-f">'+esc(f.f)+'</div><p>'+esc(f.w)+'</p><div class="rkies-k"><a href="#f-'+f.id+'">Bekijk het voorbeeld ↓</a><button data-kies="opnieuw">Opnieuw</button></div>';});}

/* groene band met opgaven, nakijkbladen en oefentoetsen (D.extra) voor hoofdstukken zonder oefenomgeving */
function rOefenstof(D,t){return '<section class="rblk rapp" id="oefenstof"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">'+(D.pars?"Deel 2 · Oefenen":"Oefenstof")+'</div><h2>Oefen tot je het kunt.</h2></div><p>Opgaven, nakijkbladen en een oefentoets bij '+esc(t.toLowerCase())+'. Maak eerst de opgaven zonder hulp en kijk ze daarna zelf na.</p></div><div class="roef'+(D.extra.length===3?" n3":"")+'">'
    +D.extra.map(function(m,i){var M=D.mat[m];return '<div class="io rmat" style="--d:'+i+'"><b>'+(i+1)+'</b><h3>'+esc(M[0])+'</h3>'+(M[2]?'<p>'+esc(M[2])+'</p>':'')+'<div class="rmat-l">'+M[1].map(function(l){return '<a href="'+rLink(l[1])+'" target="_blank" rel="noopener">'+esc(l[0])+' ↗</a>';}).join("")+'</div></div>';}).join("")+'</div></div></section>';}
/* korte naam van een hoofdstuk voor koppen en kruimels: "Hoofdstuk 2" */
function rKort(p){var h=hNum(p);return h[0]!==null?"Hoofdstuk "+h[0]:titel(p);}
function rLink(id){return /^https?:/.test(id)?id:"https://drive.google.com/file/d/"+id+"/view";}
function rSrc(c,f){return "img/"+c.map+"/"+f+".jpg";}
/* voortgang staat onder dezelfde sleutel als in de oefenomgeving, zodat afvinken op beide plekken meetelt */
function rStaat(D){try{return JSON.parse(localStorage.getItem(D.key))||{};}catch(e){return {};}}
function rTel(D,x){var q=rStaat(D).qs||{};return x.q.filter(function(_,i){return q[x.id+"-"+i];}).length;}
function rTags(D,x){var nf=D.films.filter(function(f){return f.par===x.id;}).length,d=rTel(D,x);
  return [(d?d+" van ":"")+x.q.length+" vragen"].concat(nf?[nf+" filmpje"+(nf>1?"s":"")]:[]);}
function rSpans(a){return a.map(function(g){return '<span>'+esc(g)+'</span>';}).join("");}
function rNav(links,cta,ctx){return '<header class="rnav" id="rnav"><div class="wrap"><a class="brand" href="../index.html" aria-label="Meneer Boersen, naar de homepage"><b class="bfull">Meneer <span>Boersen</span></b><b class="bshort" aria-hidden="true">M<span>B</span></b></a><nav class="rlinks" aria-label="Menu">'+links.map(function(l){return '<a href="'+l[0]+'"'+(l[2]?' aria-current="page"':'')+'>'+esc(l[1])+'</a>';}).join("")+'<a class="cta" href="'+cta+'">'+(ctx||"Oefenomgeving")+'</a></nav></div></header>';}
function rGolf(m){return '<svg class="rwave'+m+'" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0,36 C200,70 400,4 600,30 C800,56 1000,12 1200,40 L1200,70 L0,70 Z"/></svg>';}
function rVoet(w,beeld){return '<footer class="rfoot"><div class="wrap"><span>Meneer Boersen · Vellesan College · Economie'+(w?" "+esc(w):"")+'</span><span>'+esc(beeld||"Beelden: AI-illustraties, gemaakt door de docent")+'</span></div></footer>';}
function rGal(c,x){var l=x.imgs.slice(0,3);return '<div class="rgal n'+l.length+' io" style="--d:1">'+l.map(function(b,m){return '<a href="'+rSrc(c,b[0])+'" data-lb="'+m+'" target="_blank" rel="noopener"><img src="'+rSrc(c,b[0])+'" alt="" loading="lazy"><span>'+esc(b[1])+'</span></a>';}).join("")+'</div>';}
/* alle beelden van de paragraaf, groot genoeg om te lezen; een tik opent de viewer (rLicht) */
function rBeelden(c,x){return '<section class="rblk ralt" id="beelden"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">In beeld</div><h2>'+x.id+' in '+x.imgs.length+' beelden.</h2></div><p>De belangrijkste plaatjes uit de les. Tik op een beeld om het groot te bekijken en leg bij elk beeld in je eigen woorden uit wat je ziet.</p></div><div class="rbeeld io">'
  +x.imgs.map(function(b,m){return '<a href="'+rSrc(c,b[0])+'" data-lb="'+m+'" target="_blank" rel="noopener"><img src="'+rSrc(c,b[0])+'" alt="" loading="lazy"><span><b>'+(m+1)+'</b>'+esc(b[1])+'</span></a>';}).join("")+'</div></div></section>';}
function rLicht(c,x){
  var d=document.createElement("dialog"),i=0,N=x.imgs.length;d.className="rlb";d.setAttribute("aria-label","Beeld bekijken");
  d.innerHTML='<div class="rlb-bar"><span class="rlb-n"></span><button class="rlb-x" aria-label="Sluiten">Sluiten ✕</button></div><div class="rlb-st"><button class="rlb-p" aria-label="Vorig beeld">‹</button><img alt=""><button class="rlb-v" aria-label="Volgend beeld">›</button></div><p class="rlb-c"></p>';
  document.body.appendChild(d);
  var im=d.querySelector("img"),cap=d.querySelector(".rlb-c"),nr=d.querySelector(".rlb-n");
  function go(n){i=(n+N)%N;im.src=rSrc(c,x.imgs[i][0]);im.alt=x.imgs[i][1];cap.textContent=x.imgs[i][1];nr.textContent=(i+1)+" / "+N;}
  document.addEventListener("click",function(e){var a=e.target.closest("[data-lb]");if(a&&d.showModal){e.preventDefault();go(+a.dataset.lb);d.showModal();return;}
    if(e.target.closest(".rlb-x")||e.target===d){d.close();return;}
    if(e.target.closest(".rlb-p"))go(i-1);else if(e.target.closest(".rlb-v"))go(i+1);});
  d.addEventListener("keydown",function(e){if(e.key==="ArrowLeft")go(i-1);else if(e.key==="ArrowRight")go(i+1);});}

/* dia-viewer met klikstappen, overgenomen uit app.html (mountDeck). STEPS: per dia het aantal klikstappen k;
   stap s<k = NN-s.jpg (toestand na s klikken), stap k = de volledige dia NN.jpg. Gemaakt met tools/dias/stappen.py. */
function rDeck(el,dir,N,STEPS,key){
  var i=1,s=0,tok=0;try{i=Math.min(Math.max(1,+localStorage.getItem(key)||1),N);}catch(e){}
  function K(n){return STEPS[n]||0;}
  function src(n,st){var nn=(n<10?"0":"")+n;return dir+nn+(st<K(n)?"-"+st:"")+".jpg";}
  el.innerHTML='<div class="sdeck" tabindex="0" aria-roledescription="presentatie" aria-label="Presentatie">'+
   '<div class="deck-stage"><img alt=""><img alt=""><button class="deck-nav l" aria-label="Vorige"><span>‹</span></button><button class="deck-nav r" aria-label="Volgende"><span>›</span></button></div>'+
   '<div class="deck-bar"><span class="cnt"></span><div class="deck-prog"><i></i></div><button data-act="fs">⛶ Schermvullend</button></div>'+
   '<div class="deck-thumbs">'+Array.from({length:N},function(_,k){return '<button data-n="'+(k+1)+'" aria-label="Dia '+(k+1)+'"><img loading="lazy" alt="" src="'+src(k+1,K(k+1))+'"></button>';}).join("")+'</div></div>';
  var d=el.querySelector(".sdeck"),stg=d.querySelector(".deck-stage"),imgs=stg.querySelectorAll("img"),front=0,cnt=d.querySelector(".cnt"),bar=d.querySelector(".deck-prog i"),th=d.querySelectorAll(".deck-thumbs button"),eerst=true;
  function go(n,st,dir2){
    n=Math.min(Math.max(1,n),N);st=Math.min(Math.max(0,st),K(n));
    var same=n===i&&!eerst,nextImg=imgs[1-front],curImg=imgs[front],t=++tok;eerst=false;
    stg.classList.toggle("stp",same);
    nextImg.style.transition="none";nextImg.className="";void nextImg.offsetWidth;nextImg.style.transition="";
    nextImg.onload=function(){if(t!==tok)return;nextImg.className="on";curImg.className=same?"under":(dir2<0?"":"prev-out");front=1-front;};
    nextImg.src=src(n,st);nextImg.alt="Dia "+n+" van "+N+(K(n)?", stap "+(st+1)+" van "+(K(n)+1):"");
    i=n;s=st;cnt.textContent=n+" / "+N;bar.style.width=(n/N*100)+"%";
    th.forEach(function(b){b.setAttribute("aria-current",String(+b.dataset.n===n));});
    var tb=th[n-1];if(tb&&!same)tb.parentNode.scrollTo({left:tb.offsetLeft-tb.parentNode.clientWidth/2,behavior:"smooth"});
    var pre=new Image();pre.src=st<K(n)?src(n,st+1):(n<N?src(n+1,0):"");
    try{localStorage.setItem(key,n);}catch(e){}
  }
  function next(){if(s<K(i))go(i,s+1,1);else if(i<N)go(i+1,0,1);}
  function prev(){if(s>0)go(i,s-1,-1);else if(i>1)go(i-1,K(i-1),-1);}
  d.querySelector(".deck-nav.l").onclick=prev;
  d.querySelector(".deck-nav.r").onclick=next;
  d.querySelector(".deck-thumbs").onclick=function(e){var b=e.target.closest("[data-n]");if(b)go(+b.dataset.n,0,+b.dataset.n>i?1:-1);};
  d.querySelector('[data-act="fs"]').onclick=function(){if(document.fullscreenElement)document.exitFullscreen();else if(d.requestFullscreen)d.requestFullscreen().catch(function(){});};
  d.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"){e.preventDefault();next();}else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();prev();}else if(e.key==="Home")go(1,0,-1);else if(e.key==="End")go(N,K(N),1);});
  var sx=null;
  stg.addEventListener("pointerdown",function(e){sx=e.clientX;});
  stg.addEventListener("pointerup",function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40){if(dx<0)next();else prev();}});
  go(i,i===1?K(1):0,1);}

function hoofdpagina(p,j,n,c,D){
  var t=rKort(p),bn=jaarUrl(j,n),oef=D.oefen||"#oefenstof",zonder=!D.oefen,ver=Object.keys(RIJK).filter(function(k){return RIJK[k].van===p.pad;})[0],w=esc(j.titel.toLowerCase()+" "+n.titel.toLowerCase()),S=rStaat(D),last=rLaatst(c),verder=last&&D.pars.filter(function(y){return y.id===last.par;})[0];
  var kaart=function(x,i){var d=rTel(D,x),pct=Math.round(d/x.q.length*100);return '<a class="rchap io" style="--c:'+c.kleur[x.id][0]+';--d:'+i+'" href="'+rUrl(p,x.id)+'"><img src="'+rSrc(c,(c.kaart||{})[x.id]||x.imgs[0][0])+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+x.id+'</span>'+(d?'<span class="rring" style="--v:'+pct+'" aria-label="'+d+' van '+x.q.length+' vragen"><i>'+(pct===100?"✓":pct+"%")+'</i></span>':'')+'<div class="body"><span class="tag">Paragraaf '+x.id+'</span><h3>'+esc(x.t)+'</h3><p>'+esc(x.sum)+'</p><div class="links">'+rSpans(rTags(D,x))+'</div></div></a>';};
  /* korte stand per onderdeel uit dezelfde opslag als de oefenomgeving */
  var nk=Object.keys(S.known||{}).length,nw=Object.keys(S.qwrong||{}).length,nc=Object.keys(S.check||{}).length;
  var RS=null;try{RS=JSON.parse(localStorage.getItem("eco-route-"+c.map+"-v1"));}catch(e){}
  var r3=RS&&RS.lvl?Object.keys(RS.lvl).filter(function(k){return RS.lvl[k]===3;}).length:0;
  var tegels=[D.route?["#route","Mijn route","Vragen op jouw niveau: elk leerdoel van één naar drie sterren.",RS&&RS.tot?(r3?r3+" leerdoel"+(r3>1?"en":"")+" op drie sterren":RS.tot+" vragen gemaakt"):""]:["#lab/reken","Rekenen",c.reken,""],["#lab/begrippen","Begrippen","Flash cards en Leg uit: oefen alle "+D.cards.length+" begrippen van dit hoofdstuk.",nk?nk+" van "+D.cards.length+" gekend":""],["#lab/"+(nw?"quiz":"games"),"Quiz en games",c.games,nw?nw+" fout"+(nw>1?"en":"")+" om te oefenen":""],["#toets","Oefentoetsen","Met klok en nakijkblad, of als Word-bestand voor je iPad.",nc?nc+" onderdelen afgevinkt":""]];
  var nq=D.pars.reduce(function(a,y){return a+y.q.length;},0),tot=D.pars.reduce(function(a,y){return a+rTel(D,y);},0);
  /* leerdoelen van het hele hoofdstuk, per paragraaf uitklapbaar */
  var doelen=D.pars.some(function(y){return y.g&&y.g.length;})?'<div class="rdoelen io"><div class="rdoelen-k"><div class="eyebrow">Leerdoelen</div><h3>Dit kun je na '+esc(t.toLowerCase())+'.</h3><p>Klap een paragraaf open en kijk wat je moet kunnen. Dezelfde leerdoelen staan bovenaan elke paragraaf.</p></div><div class="rdoelen-l">'
    +D.pars.map(function(y,m){return y.g&&y.g.length?'<details style="--k:'+c.kleur[y.id][1]+'"'+(m?'':' open')+'><summary><b>'+y.id+'</b><span>'+esc(y.t)+'</span><small>'+y.g.length+' leerdoelen</small></summary><ul class="rq doel">'+y.g.map(function(g){return '<li>'+esc(g)+'</li>';}).join("")+'</ul><a class="rlink" href="'+rUrl(p,y.id)+'">Leer '+y.id+' →</a></details>':'';}).join("")+'</div></div>':'';
  document.title=c.kop.join("")+" · Economie "+naam(j,n);
  document.body.innerHTML=rNav([["index.html","Economie"],[bn,j.titel]],oef,zonder?"Oefenstof":"")
  +'<section class="rhero"><div class="rhero-img" id="rimg" style="background-image:url('+rSrc(c,c.hero)+')" role="img" aria-label="'+esc(c.alt)+'"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">Economie · '+esc(naam(j,n))+' · '+esc(t.toLowerCase())+'</div><h1 class="rv" style="--i:1">'+esc(c.kop[0])+'<em>'+esc(c.kop[1])+'</em>'+esc(c.kop[2]||"")+'</h1><p class="rv" style="--i:2">'+esc(c.intro)+'</p><div class="rbtns rv" style="--i:3">'+(verder?'<a class="rbtn primary" href="'+rUrl(p,verder.id)+'">Ga verder met '+verder.id+' <span class="arr">→</span></a>':'<a class="rbtn primary" href="'+rUrl(p,D.pars[0].id)+'">Begin met '+D.pars[0].id+' <span class="arr">→</span></a>')+'<a class="rbtn ghost" href="'+oef+'">'+(zonder?"Naar de oefenstof":"Naar de oefenomgeving")+'</a>'+(ver?'<a class="rbtn ghost" href="h.html?p='+encodeURIComponent(ver)+'">'+esc(RIJK[ver].versie)+'</a>':c.van?'<a class="rbtn ghost" href="h.html?p='+encodeURIComponent(c.van)+'">Andere versie</a>':'')+'</div>'
  +'<nav class="rhero-pars rv" style="--i:4" aria-label="Paragrafen">'+D.pars.map(function(y){var d=rTel(D,y);return '<a href="'+rUrl(p,y.id)+'" style="--k:'+c.kleur[y.id][0]+'"'+(verder&&verder.id===y.id?' aria-current="true"':'')+'><b>'+y.id+'</b><span>'+esc(y.t)+'</span>'+(d?'<i style="--v:'+Math.round(d/y.q.length*100)+'"></i>':'')+'</a>';}).join("")+'</nav></div><div class="rscroll" aria-hidden="true"></div></section>'
  /* de twee delen van elk hoofdstuk: eerst leren (informatie en leerdoelen), dan oefenen (verwerken) */
  +'<nav class="rsteps rdelen" id="rsteps" aria-label="De twee delen van dit hoofdstuk"><div class="wrap"><ol><li><a href="#paragrafen"><b>1</b>Leren<span> · '+D.pars.length+' paragrafen</span></a></li><li><a href="#'+(zonder?"oefenstof":"oefenen")+'"><b>2</b>Oefenen<span> · '+(zonder?"opgaven en nakijkbladen":"oefenlab en oefentoetsen")+'</span></a></li></ol>'+(tot?'<span class="rdelen-st">'+tot+' van '+nq+' vragen afgevinkt</span>':'')+'</div></nav>'
  +'<section class="rblk" id="paragrafen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Deel 1 · Leren</div><h2>'+esc(c.par)+'</h2></div><p>Open een paragraaf voor de leerdoelen, de PowerPoint uit de les, de filmpjes en de begrippen. Oefenen doe je daarna in deel 2'+(zonder?", met de oefenstof onderaan deze pagina":"")+'.</p></div><div class="rchaps'+(D.pars.length===3?" drie":"")+'">'+D.pars.map(kaart).join("")+'</div>'+doelen+'</div></section>'
  +rGolf(" top")+(zonder?rOefenstof(D,t):'<section class="rblk rapp" id="oefenen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Deel 2 · Oefenen</div><h2>Oefen tot je het kunt.</h2></div><p>Alles om '+esc(t.toLowerCase())+' te oefenen op één plek. Je voortgang wordt op dit apparaat bewaard.</p></div><div class="roef">'
  +tegels.map(function(g,i){return '<a class="io" style="--d:'+i+'" href="'+oef+g[0]+'"><b>'+(i+1)+'</b><h3>'+esc(g[1])+'</h3><p>'+esc(g[2])+'</p>'+(g[3]?'<span class="rlive">'+esc(g[3])+'</span>':'')+'<span class="arr">→</span></a>';}).join("")
  +'</div><div class="rbtns" style="justify-content:center;margin-top:30px"><a class="rbtn primary" href="'+oef+'">Naar de oefenomgeving <span class="arr">→</span></a></div></div></section>')+rGolf("")
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met dit hoofdstuk?</div><h2>Verder met Economie.</h2><p>Kies een ander hoofdstuk van '+w+' of ga terug naar het overzicht.</p><div class="rbtns"><a class="rbtn primary" href="'+bn+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Ander jaar</a></div></div></section>'+rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),c.beeld);}

/* leeromgeving: alles om de stof van één paragraaf te leren; oefenen gebeurt in de oefenomgeving */
function paragraaf(p,j,n,c,D,x){
  try{localStorage.setItem("eco-laatst-"+c.map,JSON.stringify({par:x.id,at:Date.now()}));}catch(e){}
  var t=rKort(p),dvp=c.dias&&c.dias[x.id]||x.id,kanik=(x.g||[]).every(function(g){return /^Ik kan /.test(g);}),zonder=!D.oefen,oef=D.oefen||rUrl(p)+"#oefenstof",oq=zonder?oef:oef+"#lab/quiz/"+x.id,k=c.kleur[x.id][1],i=D.pars.indexOf(x),vor=D.pars[i-1],na=D.pars[i+1],S=rStaat(D),qs=S.qs||{},films=D.films.filter(function(f){return f.par===x.id;}),d=rTel(D,x),
  doel=function(f){return f.lab==="reken"?"#lab/reken"+(f.mode?"/"+f.mode:""):f.lab==="quiz"?"#lab/quiz/"+(f.qpar||x.id):"#lab/"+f.lab;},
  cards=(D.cards||[]).map(function(cd,m){return {i:m,c:cd};}).filter(function(o){return o.c[0]===x.id;}),known=S.known||{},nk=cards.filter(function(o){return known[o.i];}).length,
  /* stappen van deze paragraaf: dia's, filmpjes, begrippen, check jezelf, oefenen */
  geen=!D.deck[dvp]&&!x.file,stappen=(geen?[]:[["#lesstof","Dia's",""]]).concat(films.length?[["#films","Filmpjes",""]]:[]).concat(x.imgs.length>3?[["#beelden","In beeld",""]]:[]).concat(cards.length?[["#begrippen","Begrippen",nk===cards.length?"af":""]]:[]).concat([["#vragen","Check jezelf",d===x.q.length?"af":""],[oq,"Oefen","oef"]]),
  film=function(f){var id=f.yt||f.film;return '<div class="rfilm io"><div class="yt"><img src="'+(f.yt?"https://i.ytimg.com/vi/"+esc(id)+"/hqdefault.jpg":"https://drive.google.com/thumbnail?id="+esc(id)+"&sz=w1200")+'" alt="" loading="lazy" onerror="this.remove()"><button '+(f.yt?'data-yt':'data-film')+'="'+esc(id)+'" aria-label="Speel film af: '+esc(f.t)+'"><span></span></button></div><div class="rfilm-tx"><div class="eyebrow">'+esc(f.k)+'</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p><a class="rlink" href="'+(zonder?oef:oef+doel(f))+'">'+esc(f.btn)+' →</a></div></div>';},
  mat=x.x.map(function(m){var M=D.mat[m];return M[1].map(function(l){var url=/^https?:/.test(l[1]);return '<a class="file" href="'+rLink(l[1])+'" target="_blank" rel="noopener"><span class="ic '+(url?"web\">WEB":/powerpoint/i.test(l[0])?"ppt\">PPT":"doc\">DOC")+'</span><span>'+esc(M[0])+'<small>'+esc(l[0])+(url?' · opent in een nieuw tabblad':' · opent in Google Drive')+'</small></span></a>';}).join("");}).join("");
  document.title=x.id+" "+x.t+" · Leeromgeving · Economie";
  document.body.innerHTML=rNav([[rUrl(p),t],[rUrl(p,x.id),"Leeromgeving",1]],oef,zonder?"Oefenstof":"")
  /* de band van de paragraaf, zoals op de hoofdstukpagina */
  +'<section class="rpar rtop" style="--k:'+k+'"><div class="wrap"><div class="rpills"><div class="eyebrow">Leeromgeving · '+esc(t)+' · '+esc(c.kop.join(""))+'</div><nav aria-label="Paragrafen">'+D.pars.map(function(y){return '<a href="'+rUrl(p,y.id)+'"'+(y===x?' aria-current="page"':'')+' style="--k:'+c.kleur[y.id][1]+'">'+y.id+'<span> '+esc(y.t)+'</span></a>';}).join("")+'</nav></div>'
  +'<div class="rpar-in"><div class="io"><div class="rnum">'+x.id+'</div><div class="eyebrow">Paragraaf '+x.id+'</div><h1>'+esc(x.t)+'</h1><p class="rpar-sum">'+esc(x.sum)+'</p>'+(x.g&&x.g.length?'<div class="rqh">'+(kanik?'Na '+x.id+' kan ik':'Leerdoelen van '+x.id)+'</div><ul class="rq doel">'+x.g.map(function(g){return '<li>'+esc(kanik?g.replace(/^Ik kan /,""):g)+'</li>';}).join("")+'</ul>':'<div class="rqh">Kun jij dit beantwoorden?</div><ul class="rq">'+x.q.slice(0,4).map(function(q){return '<li>'+esc(q)+'</li>';}).join("")+'</ul>')+'<div class="rtags">'+rSpans(rTags(D,x))+'</div><div class="rbtns">'+(geen?'<a class="rbtn primary" href="'+(films.length?'#films">Start met het filmpje':'#begrippen">Start met de begrippen')+' <span class="arr">↓</span></a>':'<a class="rbtn primary" href="#lesstof">Start met de dia\'s <span class="arr">↓</span></a>')+'<a class="rbtn line" href="'+oq+'">Oefen '+x.id+' →</a></div></div>'+rGal(c,x)+'</div></div></section>'
  +'<nav class="rsteps" id="rsteps" aria-label="Stappen van deze paragraaf"><div class="wrap"><ol>'+stappen.map(function(st,m){return '<li'+(st[2]==="af"?' class="af"':st[2]==="oef"?' class="oef"':'')+'><a href="'+st[0]+'"><b>'+(m+1)+'</b>'+st[1]+'</a></li>';}).join("")+'</ol></div></nav>'
  +(geen?'':'<section class="rblk" id="lesstof"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Lesstof</div><h2>De PowerPoint van '+(dvp!==x.id?dvp+' en '+x.id:x.id)+'.</h2></div><p>'+(D.deck[dvp]?(dvp!==x.id?'Deze PowerPoint hoort bij '+dvp+' en '+x.id+' samen. ':'')+'Klik of tik door de presentatie, met dezelfde animaties als in de les. Pijltjestoetsen werken ook.':'Blader door de dia\'s. Wil je hem groter? Open hem in Google Drive.')+'</p></div>'+(D.deck[dvp]?'<div id="rdeck" class="io"></div>':'<div class="rppt io"><iframe src="https://drive.google.com/file/d/'+esc(x.file)+'/preview" allow="autoplay" loading="lazy" title="PowerPoint '+x.id+' '+esc(x.t)+'"></iframe></div>')+'<div class="files" style="margin-top:14px">'+(x.file?'<a class="file" href="https://drive.google.com/file/d/'+esc(x.file)+'/view" target="_blank" rel="noopener"><span class="ic ppt">PPT</span><span>PowerPoint '+x.id+'<small>Open in Google Drive</small></span></a>':'')+mat+'</div></div></section>')
  +(films.length?'<section class="rblk ralt" id="films"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Filmpjes</div><h2>Kijk en luister.</h2></div><p>Bekijk de uitleg en oefen daarna meteen hetzelfde in de oefenomgeving.</p></div><div class="rfilms">'+films.map(film).join("")+'</div></div></section>':'')
  +(x.imgs.length>3?rBeelden(c,x):'')
  +(cards.length?'<section class="rblk'+(films.length||x.imgs.length>3?'':' ralt')+'" id="begrippen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Begrippen</div><h2>De woorden van '+x.id+'.</h2></div><p>Tik op een kaart en bedenk eerst zelf wat het betekent. Dan zie je de uitleg.</p></div>'
  +'<div class="rflips io" id="rflips">'+cards.map(function(o,m){return rFlip(o.i,o.c,known[o.i],m);}).join("")+'</div><p class="rbar-tx" id="rknown">'+rKnownTx(nk,cards.length)+'</p></div></section>':'')
  +'<section class="rblk" id="vragen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Check jezelf</div><h2>Wat weet je na '+x.id+'?</h2></div><p>Je krijgt de vragen één voor één. Weet je het antwoord? Tik op <b>Weet ik</b>. Je voortgang telt ook mee in de oefenomgeving.</p></div>'
  +'<div class="rcard io" id="rcheck" data-par="'+x.id+'" data-n="'+x.q.length+'"><div class="rbar"><i id="rbar" style="width:'+(d/x.q.length*100)+'%;background:'+k+'"></i></div><p class="rbar-tx" id="rbartx">'+d+' van '+x.q.length+' vragen kun je beantwoorden</p>'
  +'<div class="rone" id="rone"></div><div class="rvragen" id="rvragen" hidden>'+x.q.map(function(q,m){var key=x.id+"-"+m;return '<button class="rvraag'+(qs[key]?" on":"")+'" data-vraag="'+key+'" aria-pressed="'+!!qs[key]+'"><i aria-hidden="true"></i>'+esc(q)+'</button>';}).join("")+'</div>'
  +'<p class="rbar-tx" style="margin:14px 0 0"><button class="rlink-btn" id="rtoon">Toon alle vragen</button></p></div></div></section>'
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met '+x.id+'?</div><h2>Ga oefenen.</h2><p>'+(zonder?"Maak de opgaven van "+x.id+" en kijk ze na met het nakijkblad":"Oefen de begrippen en sommen van "+x.id+" in de oefenomgeving")+(na?', of ga door met '+na.id+' '+esc(na.t)+'.':'.')+'</p><div class="rbtns"><a class="rbtn primary" href="'+oq+'">'+(zonder?"Naar de oefenstof":"Naar de oefenomgeving")+' <span class="arr">→</span></a>'+(na?'<a class="rbtn ghost" href="'+rUrl(p,na.id)+'">Volgende: '+na.id+' →</a>':'<a class="rbtn ghost" href="'+rUrl(p)+'">Terug naar het hoofdstuk</a>')+'</div>'+(vor?'<p style="margin:22px auto 0"><a class="rterug" href="'+rUrl(p,vor.id)+'">← Vorige: '+vor.id+' '+esc(vor.t)+'</a></p>':'')+'</div></section>'+rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),c.beeld);}

/* laatst bezochte paragraaf van dit hoofdstuk (voor "Ga verder") */
function rLaatst(c){try{return JSON.parse(localStorage.getItem("eco-laatst-"+c.map));}catch(e){return null;}}
function rKnownTx(k,n){return k===n?"Alle "+n+" begrippen gekend. Goed zo!":k+" van "+n+" begrippen gekend";}
/* begrippenkaart: voorkant het woord, achterkant de uitleg en een voorbeeld; "Ik wist het" telt mee als gekend (zelfde opslag als de oefenomgeving) */
function rFlip(i,c,known,m){return '<div class="rflip'+(known?" known":"")+'" data-flip="'+i+'" tabindex="0" role="button" aria-label="Begrip: '+esc(c[1])+', tik om om te draaien" style="--d:'+(m%6)+'"><div class="rflip-in"><div class="rflip-f">'+(known?'<span class="rchk">✓ gekend</span>':'')+'<strong>'+esc(c[1])+'</strong><small>Tik om om te draaien</small></div><div class="rflip-b"><p>'+esc(c[2])+'</p><em>Voorbeeld: '+esc(c[3])+'</em><button class="rknow'+(known?" on":"")+'" data-know="'+i+'">'+(known?"Toch nog oefenen":"✓ Ik wist het")+'</button></div></div></div>';}
function rijkGedrag(D,vast){
  var RM=matchMedia("(prefers-reduced-motion: reduce)").matches,nav=$("rnav"),img=$("rimg");
  function onScroll(){nav.classList.toggle("solid",vast||scrollY>40);if(img&&!RM&&scrollY<1200)img.style.setProperty("--py",scrollY*.28+"px");}
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".io").forEach(function(el){io.observe(el);});
  /* tilt op de paragraafkaarten (alleen met muis) */
  if(!RM&&matchMedia("(hover:hover) and (pointer:fine)").matches)document.querySelectorAll(".rchap").forEach(function(k){
    k.addEventListener("pointermove",function(e){var r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;k.classList.add("tilting");k.style.setProperty("--ry",((x-.5)*7)+"deg");k.style.setProperty("--rx",((.5-y)*6)+"deg");k.style.setProperty("--gx",(x*100)+"%");k.style.setProperty("--gy",(y*100)+"%");});
    k.addEventListener("pointerleave",function(){k.classList.remove("tilting");k.style.setProperty("--ry","0deg");k.style.setProperty("--rx","0deg");});});
  /* vragen afvinken: lezen en schrijven in dezelfde opslag als de oefenomgeving */
  function zet(veld,key,aan){var S=rStaat(D);S.goals=S.goals||{};S[veld]=S[veld]||{};if(aan)S[veld][key]=1;else delete S[veld][key];try{localStorage.setItem(D.key,JSON.stringify(S));}catch(e){}}
  function stand(){var l=document.querySelectorAll("[data-vraag]").length,a=document.querySelectorAll("[data-vraag].on").length;$("rbar").style.width=(a/l*100)+"%";$("rbartx").textContent=a+" van "+l+" vragen kun je beantwoorden";
    var st=document.querySelector('#rsteps a[href="#vragen"]');if(st)st.parentNode.classList.toggle("af",a===l);}
  /* check jezelf: één vraag tegelijk; begint bij de eerste die nog niet is afgevinkt */
  var one=$("rone"),alle=document.querySelectorAll("[data-vraag]"),oi=0;
  function toon(){if(!one)return;var n=alle.length,b=alle[oi];if(!b){one.innerHTML='<div class="rone-klaar"><b>Dat was de laatste.</b><p>'+document.querySelectorAll("[data-vraag].on").length+' van '+n+' vragen weet je. Oefen nu verder in de oefenomgeving.</p><button class="rbtn line" data-one="0">Nog een keer</button></div>';return;}
    one.innerHTML='<div class="rone-k">Vraag '+(oi+1)+' van '+n+'</div><p class="rone-q">'+b.textContent+'</p><div class="rbtns"><button class="rbtn primary" data-weet="1">Weet ik <span class="arr">✓</span></button><button class="rbtn line" data-weet="0">Nog niet</button></div>'+(b.classList.contains("on")?'<p class="rone-tip">Je had deze al afgevinkt.</p>':'<p class="rone-tip">Twijfel je? Kijk nog eens naar de <a href="#lesstof">dia\'s</a>'+($("films")?' of het <a href="#films">filmpje</a>':'')+'.</p>');}
  if(one){for(oi=0;oi<alle.length&&alle[oi].classList.contains("on");oi++);if(oi>=alle.length)oi=0;toon();}
  document.addEventListener("click",function(e){
    var w=e.target.closest("[data-weet]");if(w){var b=alle[oi],aan=w.dataset.weet==="1";if(b){zet("qs",b.dataset.vraag,aan);b.classList.toggle("on",aan);b.setAttribute("aria-pressed",aan);}oi++;stand();toon();return;}
    var o=e.target.closest("[data-one]");if(o){oi=+o.dataset.one;toon();return;}
    if(e.target.closest("#rtoon")){var l=$("rvragen");l.hidden=!l.hidden;one.hidden=!l.hidden;$("rtoon").textContent=l.hidden?"Toon alle vragen":"Eén voor één";return;}
    var kn=e.target.closest("[data-know]");if(kn){var i=kn.dataset.know,S2=rStaat(D),aan2=!(S2.known||{})[i];zet("known",i,aan2);var f=kn.closest(".rflip");f.classList.toggle("known",aan2);kn.classList.toggle("on",aan2);kn.textContent=aan2?"Toch nog oefenen":"✓ Ik wist het";
      var ch=f.querySelector(".rchk");if(aan2&&!ch){f.querySelector(".rflip-f").insertAdjacentHTML("afterbegin",'<span class="rchk">✓ gekend</span>');}else if(!aan2&&ch)ch.remove();
      var alleF=document.querySelectorAll(".rflip").length,k=document.querySelectorAll(".rflip.known").length;$("rknown").textContent=rKnownTx(k,alleF);var st=document.querySelector('#rsteps a[href="#begrippen"]');if(st)st.parentNode.classList.toggle("af",k===alleF);return;}
    var fl=e.target.closest("[data-flip]");if(fl){fl.classList.toggle("open");return;}
    var b=e.target.closest("[data-vraag]");if(!b)return;var aan=!b.classList.contains("on");zet("qs",b.dataset.vraag,aan);b.classList.toggle("on",aan);b.setAttribute("aria-pressed",aan);stand();});
  document.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("rflip")){e.preventDefault();e.target.classList.toggle("open");}});
  /* stappenbalk: markeer de stap die in beeld is */
  var steps=$("rsteps");if(steps){var so=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){steps.querySelectorAll("a").forEach(function(a){a.toggleAttribute("aria-current",a.getAttribute("href")==="#"+en.target.id);});}});},{rootMargin:"-40% 0px -50% 0px"});
    ["lesstof","films","beelden","begrippen","vragen","paragrafen","oefenen","oefenstof"].forEach(function(id){if($(id))so.observe($(id));});}}

/* ---------- hoofdstuk ---------- */
var K;try{K=JSON.parse(localStorage.getItem("gv-eco-kunnen"))||{};}catch(e){K={};}
function hoofdstuk(){
  var p=P.filter(function(x){return x.pad===Q.get("p");})[0];if(!p){location.href="index.html";return;}
  var jn=jaarVan(p.pad),j=jn[0],n=jn[1],t=titel(p);document.title=t+" · Economie "+naam(j,n);
  if(RIJK[p.pad]){rijk(p,j,n,RIJK[p.pad]);return;}
  if(SE[p.pad]){sePagina(p,j,n,SE[p.pad]);return;}
  var secs=p.secties.filter(function(s){return !s.every(function(b){return b.t==="kop"||(b.t==="p"&&b.tekst.length<3);});});
  if(secs.length&&secs[0].every(function(b){return b.t==="kop";}))secs.shift();
  /* Google Sites zet het bestand links en de kop ernaast: de kop komt hier boven het bestand */
  secs=secs.map(function(s){var k=-1;for(var q=0;q<s.length&&k<0;q++)if(s[q].t==="kop")k=q;else if(!/^(drive|link|youtube)$/.test(s[q].t))break;
    return k>0?[s[k]].concat(s.slice(0,k),s.slice(k+1)):s;});
  var chips=[],body="";
  secs=groepeer(secs);
  secs.forEach(function(s,si){var id="s"+si,eerste=s.filter(function(b){return b.t==="kop"&&echteKop(b.tekst);})[0];
    if(eerste&&PARKOP.test(eerste.tekst))chips.push('<a href="#'+id+'">'+esc(kort(eerste.tekst.replace(/:$/,""),34))+'</a>');
    else if(si===0)chips.push('<a href="#'+id+'">Start</a>');
    body+='<section class="rblk rsec'+(si%2?" ralt":"")+'" id="'+id+'"><div class="wrap"><div class="rsec-in io">'+sectie(s,p.pad,si)+'</div></div></section>';});
  var apps=(APPS[p.pad]||[]).map(function(a){return '<section class="rblk rsec"><div class="wrap"><h2>'+esc(a[0])+'</h2><iframe class="app" src="apps/'+a[1]+'" title="'+esc(a[0]+" "+t)+'" loading="lazy"></iframe><p><a class="rbtn line" href="apps/'+a[1]+'" target="_blank" rel="noopener">Open op volledig scherm</a></p></div></section>';}).join("");
  var hn=hNum(p),lo=LEEROMG[p.pad];
  document.body.className="rijk";
  var h=rNav([["index.html","Economie"],[jaarUrl(j,n),naam(j,n)]],"#inhoud","Naar de lesstof")
  +rHero(kaartImg(p,j),"","Economie · "+naam(j,n)+(hn[0]!==null?" · hoofdstuk "+hn[0]:""),hn[1].replace(/\s+/g," "),"",telling(p)?telling(p).charAt(0).toUpperCase()+telling(p).slice(1)+".":"De lesstof van dit onderdeel.",
     '<a class="rbtn primary" href="#inhoud">Naar de lesstof <span class="arr">→</span></a><a class="rbtn ghost" href="'+jaarUrl(j,n)+'">Alle hoofdstukken</a>');
  if(chips.length>1)h+='<div class="rchips"><div class="wrap"><nav class="chips" aria-label="Onderdelen van deze pagina">'+chips.join("")+'</nav></div></div>';
  h+='<div id="inhoud">';
  if(lo)h+='<section class="rblk rsec"><div class="wrap"><div class="leerkaart"><div><div class="eyebrow">Nieuw · alles op één plek</div><h2>'+esc(lo[1])+'</h2><p>'+esc(lo[2])+'</p></div><a class="btn" href="'+lo[0]+'">Open de leeromgeving →</a></div></div></section>';
  if(lo){var lz=blokken(p).filter(function(b){return b.t==="drive"||b.t==="link";});/* lesstof-links uit paginas.json, of een verwijzing naar de leeromgeving */
    h+='<section class="rblk rsec ralt"><div class="wrap"><div class="rsec-in"><h2>Lesstof</h2>'+(lz.length?sectie(lz,p.pad,0):'<p>De lesstof vind je in de leeromgeving: <a href="'+lo[0]+'#les">tabblad Lesstof</a>.</p>')+'</div></div></section>';}
  h+=apps+body+'</div><section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar hiermee?</div><h2>Verder met '+esc(naam(j,n))+'.</h2><p>Kies het volgende hoofdstuk of ga terug naar het overzicht.</p><div class="rbtns"><a class="rbtn primary" href="'+jaarUrl(j,n)+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Economie</a></div></div></section>'
   +rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),"Foto's: Unsplash (gratis licentie). Bestanden openen vanuit Google Drive.");
  h+='<dialog class="viewer" id="viewer" aria-label="Bestand bekijken"><div class="bar"><b id="vtitel"></b><a class="btn ghost" id="vopen" target="_blank" rel="noopener">Open in Drive</a><button class="btn" id="vdicht">Sluiten</button></div><iframe id="vframe" title="Bestand" allow="autoplay; fullscreen"></iframe></dialog>';
  document.body.innerHTML=h;rijkGedrag({},false);
  var lk=document.querySelector(".leerkaart");/* kaart pas tonen als de leeromgeving er echt is */
  if(lk){lk.hidden=true;fetch(lo[0],{method:"HEAD"}).then(function(r){if(r.ok)lk.hidden=false;}).catch(function(){});}}
/* SE-pagina: deel 1 de hoofdstukken (leren), deel 2 oefenen per hoofdstuk en het oefen-SE */
function sePagina(p,j,n,s){
  var bn=jaarUrl(j,n),D=s.delen.map(function(pad){var c=RIJK[pad],q=P.filter(function(x){return x.pad===pad;})[0],jn=jaarVan(pad);return {pad:pad,c:c,nr:hNum(q)[0],uit:jn[0]!==j?" · "+naam(jn[0],jn[1]):""};});
  document.title=s.naam+" · Economie "+naam(j,n);document.body.className="rijk";
  var kaart=function(d,i){return '<a class="rchap io" style="--c:'+KLEUREN[i%4]+';--d:'+i+'" href="h.html?p='+encodeURIComponent(d.pad)+'"><img src="'+rSrc(d.c,d.c.hero)+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+d.nr+'</span><div class="body"><span class="tag">Hoofdstuk '+d.nr+esc(d.uit)+'</span><h3>'+esc(d.c.kop.join(""))+'</h3><p>'+esc(d.c.intro)+'</p><div class="links" id="separs'+i+'"></div></div></a>';};
  var tegels=[[s.toets[0],s.toets[1],s.toets[2],"Start hier als je alles geleerd hebt"]].concat(D.map(function(d){return [d.c.map+"/oefen.html","Oefenen hoofdstuk "+d.nr,"Begrippen, rekenen, quiz en games"+(d.uit?" van hoofdstuk "+d.nr+" uit 3 mavo.":" van hoofdstuk "+d.nr+"."),""];}),D.map(function(d){return [d.c.map+"/toets.html","Oefentoets hoofdstuk "+d.nr,"Een oefentoets over alleen dit hoofdstuk.",""];}),s.extra||[]);
  document.body.innerHTML=rNav([["index.html","Economie"],[bn,j.titel]],"#oefenen","Oefenen")
  +rHero("img/"+s.hero+".jpg","","Economie · "+naam(j,n)+" · schoolexamen",s.kop[0],s.kop[1],s.intro,'<a class="rbtn primary" href="#leren">Naar de hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="'+s.toets[0]+'">'+esc(s.toets[1])+'</a>')
  +'<nav class="rsteps rdelen" id="rsteps" aria-label="De twee delen van dit SE"><div class="wrap"><ol><li><a href="#leren"><b>1</b>Leren<span> · '+D.length+' hoofdstukken</span></a></li><li><a href="#oefenen"><b>2</b>Oefenen<span> · oefenlab en oefen-SE</span></a></li></ol></div></nav>'
  +'<section class="rblk" id="leren"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Deel 1 · Leren</div><h2>'+(D.length===2?"Twee":D.length===3?"Drie":D.length)+' hoofdstukken voor dit SE.</h2></div><p>Open een hoofdstuk en loop de paragrafen na: de leerdoelen, de dia\'s uit de les, de filmpjes en de begrippen.</p></div><div class="rchaps se'+(D.length===3?" drie":"")+'">'+D.map(kaart).join("")+'</div></div></section>'
  +rGolf(" top")+'<section class="rblk rapp" id="oefenen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Deel 2 · Oefenen</div><h2>Oefen tot je het kunt.</h2></div><p>Oefen eerst per hoofdstuk. Maak daarna het oefen-SE in één keer, zonder je boek. Je voortgang wordt op dit apparaat bewaard.</p></div><div class="roef">'
  +tegels.map(function(g,i){return '<a class="io" style="--d:'+(i%4)+'" href="'+g[0]+'"><b>'+(i+1)+'</b><h3>'+esc(g[1])+'</h3><p>'+esc(g[2])+'</p>'+(g[3]?'<span class="rlive">'+esc(g[3])+'</span>':'')+'<span class="arr">→</span></a>';}).join("")+'</div></div></section>'+rGolf("")
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met dit SE?</div><h2>Verder met Economie.</h2><p>Kies een ander hoofdstuk van '+esc(naam(j,n))+' of ga terug naar het overzicht.</p><div class="rbtns"><a class="rbtn primary" href="'+bn+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Ander jaar</a></div></div></section>'+rVoet(j.titel.toLowerCase()+" "+n.titel.toLowerCase(),s.beeld);
  rijkGedrag({},false);
  D.forEach(function(d,i){fetch(d.c.map+"/data.json").then(function(r){return r.json();}).then(function(X){var el=$("separs"+i);if(el)el.innerHTML=rSpans(X.pars.map(function(y){return y.id+" "+y.t;}));}).catch(function(){});});}
/* Google Sites gebruikt koppen ook voor gewone zinnen: alleen korte koppen of paragraafkoppen tellen als kop */
var PARKOP=/^((paragraaf|hoofdstuk|h)\s*\d|\d+(\.\d+)+|se\s*\d)/i;
function echteKop(t){return PARKOP.test(t)||(t.length<=40&&!/[.!]$/.test(t)&&!/^(link|klik)/i.test(t)&&!/=/.test(t));}
function schoon(t){return String(t).toLowerCase().replace(/[^a-z0-9]+/g,"");}
function linkNaam(t){var x=t.replace(/^klik\s+(hier\s+)?op\s+(deze|onderstaande|de)\s+link\s*(voor\s+|om\s+)?/i,"").replace(/\s+te\s+kunnen\b/i,"").replace(/^het\s+/i,"").replace(/\.$/,"");return x?x.charAt(0).toUpperCase()+x.slice(1):t;}
function kort(t,n){return t.length>n?t.slice(0,n-1)+"…":t;}
function groepeer(secs){var g=[];secs.forEach(function(s){var k=s.filter(function(b){return b.t==="kop";})[0];
  if(!g.length||(k&&PARKOP.test(k.tekst)))g.push(s.slice());else g[g.length-1]=g[g.length-1].concat(s);});return g;}
function sectie(s,pad,si){var h="",kop=0,i=0;
  // generieke linkteksten ("link", "klik hier") krijgen de zin ervoor als naam; die zin vervalt dan
  s=s.slice();for(var q=0;q<s.length;q++){var b0=s[q];if(b0.t==="link"&&/^(link|klik hier|hier)$/i.test(b0.tekst)){for(var r=q-1;r>=0;r--){if(s[r].t==="kop"||s[r].t==="p"){s[q]={t:"link",href:b0.href,tekst:s[r].tekst.replace(/[:.]$/,"")};s.splice(r,1);q--;break;}if(s[r].t!=="link")break;}}}
  var namen=s.filter(function(b){return b.t==="link";}).map(function(b){return schoon(b.tekst);});
  s=s.filter(function(b){return !((b.t==="kop"||b.t==="p")&&(/^link$/i.test(b.tekst)||namen.indexOf(schoon(b.tekst))>-1));});
  s=s.map(function(b){return b.t==="link"?{t:"link",href:b.href,tekst:linkNaam(b.tekst)}:b;});
  while(i<s.length){var b=s[i];
    if(b.t==="kop"&&echteKop(b.tekst)){h+=(kop++?"<h3>":"<h2>")+esc(b.tekst)+(kop>1?"</h3>":"</h2>");i++;continue;}
    if(b.t==="kop"){h+='<p class="note">'+esc(b.tekst)+'</p>';i++;continue;}
    if(b.t==="li"){var l=[];while(i<s.length&&s[i].t==="li")l.push(s[i++].tekst);
      h+='<ul class="kunnen">'+l.map(function(x,n){var key=pad+"|"+si+"|"+x.slice(0,60),id="k"+si+"_"+i+"_"+n,af=!!K[key];
        return '<li'+(af?' class="af"':'')+'><input type="checkbox" id="'+id+'" data-k="'+esc(key)+'"'+(af?" checked":"")+'><label for="'+id+'">'+esc(x)+'</label></li>';}).join("")+'</ul>';continue;}
    if(b.t==="drive"||b.t==="link"){var f=[];while(i<s.length&&(s[i].t==="drive"||s[i].t==="link"))f.push(s[i++]);
      var vid=function(x){return x.t==="drive"&&ext(x.naam)==="vid";};
      if(f.some(vid))h+='<div class="rfilms">'+f.filter(vid).map(function(x){return '<div class="rfilm"><div class="yt"><img src="https://drive.google.com/thumbnail?id='+esc(x.id)+'&sz=w1200" alt="" loading="lazy" onerror="this.remove()"><button data-film="'+esc(x.id)+'" aria-label="Speel film af: '+esc(nette(x.naam))+'"><span></span></button></div><div class="rfilm-tx"><div class="eyebrow">Instructiefilm</div><h3>'+esc(nette(x.naam))+'</h3></div></div>';}).join("")+'</div>';
      f=f.filter(function(x){return !vid(x);});if(!f.length)continue;
      h+='<div class="files">'+f.map(function(x){
        if(x.t==="link"){var ls=linkSoort(x.href);return '<a class="file" href="'+esc(x.href)+'" target="_blank" rel="noopener"><span class="ic '+ls[0]+'">'+esc(ls[1].slice(0,3).toUpperCase())+'</span><span>'+esc(x.tekst)+'<small>'+esc(ls[1])+' · opent in nieuw tabblad</small></span></a>';}
        var e=ext(x.naam);return '<button class="file" data-drive="'+esc(x.id)+'" data-naam="'+esc(nette(x.naam))+'"><span class="ic '+e+'">'+ICON[e][0]+'</span><span>'+esc(nette(x.naam))+'<small>'+ICON[e][1]+'</small></span></button>';}).join("")+'</div>';continue;}
    if(b.t==="youtube"){var v=[];while(i<s.length&&s[i].t==="youtube")v.push(s[i++]);
      h+='<div class="vids">'+v.map(function(x){return '<div><div class="yt"><img src="https://i.ytimg.com/vi/'+esc(x.id)+'/hqdefault.jpg" alt="" loading="lazy"><button data-yt="'+esc(x.id)+'" aria-label="Speel film af: '+esc(x.naam||"YouTube")+'"><span></span></button></div>'+(x.naam?'<p class="ytcap">'+esc(x.naam.replace(/^Video,\s*/,""))+'</p>':'')+'</div>';}).join("")+'</div>';continue;}
    if(b.t==="p"){var nx=s[i+1];h+=(nx&&nx.t==="li"&&/:$/.test(b.tekst)?'<p class="kopkunnen">':'<p>')+esc(b.tekst)+'</p>';i++;continue;}
    i++;}
  return h;}

document.addEventListener("click",function(e){
  var d=e.target.closest("[data-drive]");if(d){var v=$("viewer");$("vtitel").textContent=d.dataset.naam;$("vframe").src="https://drive.google.com/file/d/"+d.dataset.drive+"/preview";$("vopen").href="https://drive.google.com/file/d/"+d.dataset.drive+"/view";v.showModal();return;}
  if(e.target.closest("#vdicht")||e.target.id==="viewer"){$("viewer").close();return;}
  var fm=e.target.closest("[data-film]");if(fm){fm.parentNode.innerHTML='<iframe src="https://drive.google.com/file/d/'+fm.dataset.film+'/preview" title="Film" allow="autoplay; fullscreen" allowfullscreen></iframe>';return;}
  var y=e.target.closest("[data-yt]");if(y){y.parentNode.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+y.dataset.yt+'?autoplay=1&rel=0" title="Film" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';}
});
document.addEventListener("close",function(e){if(e.target.id==="viewer")$("vframe").src="about:blank";},true);
document.addEventListener("change",function(e){var c=e.target.closest("[data-k]");if(!c)return;if(c.checked)K[c.dataset.k]=1;else delete K[c.dataset.k];c.closest("li").classList.toggle("af",c.checked);try{localStorage.setItem("gv-eco-kunnen",JSON.stringify(K));}catch(x){}});

fetch("data/paginas.json").then(function(r){return r.json();}).then(function(d){P=d;({index:index,jaar:jaar,hoofdstuk:hoofdstuk})[PAGE]();})
  .catch(function(){document.body.innerHTML='<main class="wrap"><p>De pagina kon niet laden. Probeer het opnieuw.</p></main>';});
})();
