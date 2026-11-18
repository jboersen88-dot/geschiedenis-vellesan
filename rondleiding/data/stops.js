window.RONDLEIDING = {
  basisUrl: "https://jboersen88-dot.github.io/geschiedenis-vellesan/rondleiding/",
  qrVerplicht: true,
  titel: "Ontdek het Vellesan",
  welkom: "Welkom op het Vellesan College! Volg de kaart van stop naar stop en kijk bij elke stop het filmpje. Kies zelf welke opdrachten je wilt doen. Kun jij alle 15 stops verzamelen?",
  etages: [
    { naam: "Begane grond", kaart: "img/kaart-0.jpg", w: 1100, h: 700 },
    { naam: "1e etage", kaart: "img/kaart-1.jpg", w: 1233, h: 800 },
    { naam: "2e etage", kaart: "img/kaart-2.jpg", w: 1210, h: 760 }
  ],
  stops: [
    {
      id: "s01", code: "ZON", naam: "Ingang en receptie", etage: 0, x: 35, y: 74,
      clip: "media/s01.mp4", poster: "media/s01.jpg",
      uitleg: "Hier begin je. Je komt binnen door de glazen schuifdeuren. Bij de receptie zitten de conciërges. Je kunt hier alles vragen en je meldt je hier ook als je te laat of ziek bent.",
      loop: "Je start bij de hoofdingang. Loop door de glazen schuifdeuren naar binnen en blijf bij de receptie staan.",
      opdrachten: [
        { type: "mc", vraag: "Waar meld je je als je te laat of ziek bent?", opties: ["Bij de conciërges aan de receptie", "In de aula", "Bij de kluisjes"], goed: 0, uitleg: "Precies. De conciërges aan de receptie helpen je verder." },
        { type: "zoek", vraag: "Zoek de glazen schuifdeuren waar je net doorheen kwam. Gevonden? Tik op de knop!" },
        { type: "foto", vraag: "Maak een foto van de ronde houten balie van de receptie (geen mensen op de foto)." }
      ]
    },
    {
      id: "s02", code: "BOOT", naam: "Hal 1", etage: 0, x: 46, y: 55,
      clip: "media/s02.mp4", poster: "media/s02.jpg",
      uitleg: "Dit is de grote hal. In de pauze zitten leerlingen hier op de gele zitelementen met planten. Er staan ook waterkoelers. Op het scherm aan de muur zie je berichten.",
      loop: "Loop vanaf de receptie de grote hal in. Je ziet al snel de gele zitelementen.",
      opdrachten: [
        { type: "mc", vraag: "Wat staat er op het scherm aan de muur?", opties: ["Het weer van morgen", "Berichten, zoals lessen die niet doorgaan of verplaatst zijn", "Het menu van de aula"], goed: 1, uitleg: "Ja. Zo weet je meteen als een les anders is." },
        { type: "tel", vraag: "Tel de gele zitelementen die je in de hal ziet. Hoeveel zijn het er?" },
        { type: "open", vraag: "Op welke plek in de hal zou jij het liefst zitten in de pauze? Schrijf het kort op." }
      ]
    },
    {
      id: "s03", code: "KAAS", naam: "De kluisjes", etage: 0, x: 27, y: 56,
      clip: "media/s03.mp4", poster: "media/s03.jpg",
      uitleg: "Op het Vellesan krijgt elke leerling een eigen kluisje. Daar leg je je jas, je tas en je boeken in. De kluisjes hebben oranje deuren in een houten kader.",
      loop: "Loop vanuit de hal naar de kant van de oranje kluisjes.",
      opdrachten: [
        { type: "mc", vraag: "Wat leg je in je kluisje?", opties: ["Je fiets", "Je huisdier", "Je jas, tas en boeken"], goed: 2, uitleg: "Juist. Dan hoef je niet alles de hele dag mee te sjouwen." },
        { type: "tel", vraag: "Tel de oranje kluisdeuren in één rij. Hoeveel zijn het er?" },
        { type: "open", vraag: "Wat zou jij als eerste in je eigen kluisje leggen?" }
      ]
    },
    {
      id: "s04", code: "MAAN", naam: "De aula", etage: 0, x: 16, y: 59,
      clip: "media/s04.mp4", poster: "media/s04.jpg",
      uitleg: "In de aula eet en drink je in de pauzes. Er staan lange tafels met rode, groene en grijze stoelen. Je ziet ook een wenteltrap en een gele piano. Dans en muziek gebruiken de aula ook.",
      loop: "Loop langs de kluisjes verder naar de aula, de grote ruimte met de lange tafels.",
      opdrachten: [
        { type: "mc", vraag: "Welke kleur heeft de piano in de aula?", opties: ["Rood", "Geel", "Zwart"], goed: 1, uitleg: "Goed gekeken. De gele piano valt echt op." },
        { type: "zoek", vraag: "Zoek de wenteltrap. Gevonden? Tik op de knop!" },
        { type: "tel", vraag: "Tel de rode stoelen aan één lange tafel. Hoeveel zijn het er?" }
      ]
    },
    {
      id: "s05", code: "TAART", naam: "Eten en drinken", etage: 0, x: 33, y: 42,
      clip: "media/s05.mp4", poster: "media/s05.jpg",
      uitleg: "Honger of dorst? Hier staan twee automaten, een voor drinken en een voor snacks. In de aula kun je ook eten kopen bij een balie. Je mag ook gewoon je eigen lunch meenemen.",
      loop: "Loop vanuit de aula terug richting de hal. Bij de automaten kom je langs.",
      opdrachten: [
        { type: "mc", vraag: "Wat mag je ook doen als je geen eten wilt kopen?", opties: ["Naar huis gaan om te eten", "Alleen bij de receptie eten", "Je eigen lunch meenemen"], goed: 2, uitleg: "Klopt. Je eigen lunch mag altijd." },
        { type: "zoek", vraag: "Zoek de twee automaten. Gevonden? Tik op de knop!" },
        { type: "open", vraag: "Kies: wat zou jij uit de automaat halen, een drankje of een snack? Schrijf op wat je kiest." }
      ]
    },
    {
      id: "s06", code: "HAAS", naam: "Handvaardigheid (B12)", etage: 0, x: 53, y: 69,
      clip: "media/s06.mp4", poster: "media/s06.jpg",
      uitleg: "Dit lokaal is een echte werkplaats. Er staan werkbanken, bankschroeven en krukken. Hier maak je dingen met je handen. In de vitrine staat werk van leerlingen.",
      loop: "Loop terug naar de hal en ga naar het lokaal met nummer B12. Daar is de werkplaats.",
      opdrachten: [
        { type: "zoek", vraag: "Zoek de bankschroeven op de werkbanken. Gevonden? Tik op de knop!" },
        { type: "tel", vraag: "Tel de krukken in het lokaal. Hoeveel zijn het er?" },
        { type: "foto", vraag: "Maak een foto van het werkstuk dat jij het mooist vindt (geen mensen op de foto)." }
      ]
    },
    {
      id: "s07", code: "BEER", naam: "Hal 2: het oude gebouw", etage: 0, x: 37, y: 27,
      clip: "media/s07.mp4", poster: "media/s07.jpg",
      uitleg: "Hier stap je het oude gebouw in. Het is van 1926 en een monument. Kijk naar de vloer met tegels en naar het glas-in-loodraam. Hier vlakbij zijn de kamers van de rector, de docentenkamer en de leerlingcoördinator. Die helpt je als er iets niet goed gaat.",
      loop: "Loop terug naar de hal en ga verder het oude gebouw in. Let op de tegelvloer.",
      opdrachten: [
        { type: "mc", vraag: "Uit welk jaar komt het oude gebouw?", opties: ["1826", "1926", "2006"], goed: 1, uitleg: "Ja, 1926. Daarom is het een monument." },
        { type: "zoek", vraag: "Zoek het glas-in-loodraam. Gevonden? Tik op de knop!" },
        { type: "open", vraag: "Kijk naar de tegelvloer. Welke vormen of kleuren zie je in het patroon?" }
      ]
    },
    {
      id: "s08", code: "DRAAK", naam: "De gang met B01 tot B07", etage: 0, x: 60, y: 27,
      clip: "media/s08.mp4", poster: "media/s08.jpg",
      uitleg: "In deze gang liggen de lokalen B01 tot en met B07. Je vindt hier economie, wiskunde, biologie en natuur- en scheikunde. Aan de muur hangt kunstwerk van leerlingen. Anders dan op de basisschool loop je elke les naar een ander lokaal.",
      loop: "Loop vanuit de oude hal door de gang. Aan beide kanten zie je lokalen met een B en een nummer.",
      opdrachten: [
        { type: "mc", vraag: "Welk vak krijg je in lokaal B03?", opties: ["Economie", "Biologie", "Wiskunde"], goed: 2, uitleg: "Goed. B03 is een wiskundelokaal." },
        { type: "tel", vraag: "Tel de kunstwerken die aan de muur hangen. Hoeveel zijn het er?" },
        { type: "open", vraag: "Bedenk: wat is leuk en wat is lastig aan elke les een ander lokaal?" }
      ]
    },
    {
      id: "s09", code: "PAARD", naam: "Biologielokaal (B05)", etage: 0, x: 67, y: 6,
      clip: "media/s09.mp4", poster: "media/s09.jpg",
      uitleg: "Dit is een biologielokaal. Er staat een skelet. De stoelen staan in rijen die omhoog lopen, net als in een klein theater. Er is ook een proeftafel voor experimenten.",
      loop: "Loop de gang door tot het einde. Het biologielokaal B05 is aan het eind van de gang.",
      opdrachten: [
        { type: "zoek", vraag: "Zoek het skelet. Gevonden? Tik op de knop!" },
        { type: "mc", vraag: "Waar lijkt dit lokaal met de oplopende stoelenrijen op?", opties: ["Een klein theater", "Een zwembad", "Een bakkerij"], goed: 0, uitleg: "Ja. Zo kan iedereen goed zien wat de docent laat zien." },
        { type: "open", vraag: "Verzin een grappige naam voor het skelet." }
      ]
    },
    {
      id: "s10", code: "SOEP", naam: "Eerste etage: de talen", etage: 1, x: 53, y: 30,
      clip: "media/s10.mp4", poster: "media/s10.jpg",
      uitleg: "Op de eerste etage vind je veel talen: Engels, Frans en Duits. Ook geschiedenis, natuurkunde, wiskunde, Nederlands en aardrijkskunde hebben hier lokalen. Jassen blijven in de gang aan de kapstokken, niet in het lokaal.",
      loop: "Loop terug naar de hal en ga de trap op naar de eerste etage. Volg de gang met de oranje deuren.",
      opdrachten: [
        { type: "mc", vraag: "Welke taal krijg je in lokaal B18?", opties: ["Frans", "Duits", "Engels"], goed: 1, uitleg: "Goed. B18 is een Duits lokaal." },
        { type: "tel", vraag: "Tel de kapstokken in de gang. Hoeveel zijn het er?" },
        { type: "zoek", vraag: "Zoek lokaal B15. Welk vak wordt daar gegeven? Gevonden? Tik op de knop!" }
      ]
    },
    {
      id: "s11", code: "KAT", naam: "Het computerlokaal", etage: 1, x: 32, y: 41,
      clip: "media/s11.mp4", poster: "media/s11.jpg",
      uitleg: "Dit is het computerlokaal. Er staan rijen computers met blauwe schotten ertussen. Je gebruikt ze voor lessen en voor toetsen op de computer.",
      loop: "Blijf op de eerste etage en loop naar het computerlokaal.",
      opdrachten: [
        { type: "tel", vraag: "Tel de computers in één rij. Hoeveel zijn het er?" },
        { type: "zoek", vraag: "Zoek de blauwe schotten tussen de computers. Gevonden? Tik op de knop!" },
        { type: "open", vraag: "Kies: een toets op de computer of op papier? Schrijf op wat jij kiest en waarom." }
      ]
    },
    {
      id: "s14", code: "VIS", naam: "De nieuwbouw (B22 tot B25)", etage: 1, x: 67, y: 47,
      clip: "media/s14.mp4", poster: "media/s14.jpg",
      uitleg: "Nu ben je in het nieuwe deel van de school. Alles ziet er hier anders uit: een gladde vloer, grote ramen en gele deuren. In deze gang liggen de lokalen B22 tot en met B25. Hier krijg je onder andere wiskunde, Engels en Nederlands.",
      loop: "Loop door de gang van het oude gebouw naar de overgang met het nieuwe gebouw. Je merkt het aan de vloer: die wordt glad en grijs.",
      opdrachten: [
        { type: "mc", vraag: "Welke kleur hebben de deuren in de nieuwbouw?", opties: ["Blauw", "Geel", "Groen"], goed: 1, uitleg: "Klopt. In de nieuwbouw zijn de deuren geel." },
        { type: "zoek", vraag: "Zoek lokaal B24. Gevonden? Tik op de knop!" },
        { type: "open", vraag: "Wat is het grootste verschil tussen het oude en het nieuwe gebouw? Schrijf één ding op." }
      ]
    },
    {
      id: "s15", code: "UIL", naam: "De lift, B26 en B27", etage: 1, x: 49, y: 60,
      clip: "media/s15.mp4", poster: "media/s15.jpg",
      uitleg: "Aan het eind van de gang is de lift. Die is er voor leerlingen die niet goed kunnen traplopen. Hier vind je ook de lokalen B26 en B27. Door het grote raam kijk je naar buiten.",
      loop: "Loop de gang van de nieuwbouw helemaal uit, langs B25. Aan het eind zie je een grijze liftdeur.",
      opdrachten: [
        { type: "mc", vraag: "Voor wie is de lift bedoeld?", opties: ["Voor iedereen die haast heeft", "Voor leerlingen die niet goed kunnen traplopen", "Alleen voor docenten"], goed: 1, uitleg: "Goed. Zo kan iedereen overal in de school komen." },
        { type: "zoek", vraag: "Zoek de lokalen B26 en B27. Allebei gevonden? Tik op de knop!" },
        { type: "tel", vraag: "Tel de gele deuren die je vanaf de lift kunt zien. Hoeveel zijn het er?" }
      ]
    },
    {
      id: "s12", code: "TAS", naam: "De tekenzolder (B29)", etage: 2, x: 47, y: 33,
      clip: "media/s12.mp4", poster: "media/s12.jpg",
      uitleg: "Dit lokaal ligt onder het dak. Je ziet oranjerode balken en dakramen. Hier krijg je tekenen en CKV. Er staan ezels om op te werken.",
      loop: "Loop terug naar de trap en ga naar de tweede etage, de bovenste verdieping. Zoek lokaal B29.",
      opdrachten: [
        { type: "mc", vraag: "Waar in het gebouw ligt de tekenzolder?", opties: ["Onder het dak", "In de kelder", "Naast de ingang"], goed: 0, uitleg: "Juist. Daarom heet het een zolder." },
        { type: "zoek", vraag: "Zoek de dakramen in het schuine dak. Gevonden? Tik op de knop!" },
        { type: "foto", vraag: "Maak een foto van een ezel (geen mensen op de foto)." }
      ]
    },
    {
      id: "s13", code: "GOUD", naam: "Bibliotheek en studiezaal (B31)", etage: 2, x: 73, y: 20,
      clip: "media/s13.mp4", poster: "media/s13.jpg",
      uitleg: "Dit is de bibliotheek, onder houten dakbalken. Je kunt hier boeken en tijdschriften lenen. In de huiswerkklas kun je je huiswerk maken. Hier krijg je ook extra hulp, zoals bij dyslexie, begeleiding, mentoraat en decanaat. Gefeliciteerd, je hebt alle 15 stops gehaald!",
      loop: "Blijf op de tweede etage en loop naar de bibliotheek en studiezaal, lokaal B31.",
      opdrachten: [
        { type: "mc", vraag: "Wat kun je in de bibliotheek doen?", opties: ["Een auto lenen", "Een kluisje huren", "Boeken en tijdschriften lenen"], goed: 2, uitleg: "Klopt. Lezen kan hier prima." },
        { type: "zoek", vraag: "Zoek de collegezaal met de oranje stoelen. Gevonden? Tik op de knop!" },
        { type: "open", vraag: "Welk boek of tijdschrift zou jij als eerste lenen?" }
      ]
    }
  ],
  bonus: [
    { id: "b1", code: "RAKET", naam: "De grote trap", clip: "media/b1.mp4", poster: "media/b1.jpg", uitleg: "Dit is de monumentale trap uit 1926. Let op de koperen leuning en de getrapte zwarte stenen." },
    { id: "b2", code: "DONUT", naam: "De toren", clip: "media/b2.mp4", poster: "media/b2.jpg", uitleg: "Dit is het trappenhuis in de toren. Kijk omhoog: het plafond heeft acht kanten." },
    { id: "b3", code: "BRUG", naam: "Van oud naar nieuw", clip: "media/b3.mp4", poster: "media/b3.jpg", uitleg: "Bij deze deur gaat het oude gebouw van 1926 over in de nieuwe vleugel. Kijk naar de vloer: eerst tegels, daarna glad grijs." }
  ]
};
