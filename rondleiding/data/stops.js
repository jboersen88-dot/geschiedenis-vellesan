/* Inhoud van de rondleiding "Missie Vellesan". Zie SCHEMA.md voor alle velden.
   Feiten komen uit de films en uitleg van meneer Boersen en de plattegrond (jan 2025).
   Een filmpje toevoegen bij een stop zonder film: zet media/<id>.mp4 en media/<id>.jpg neer
   en vul bij die stop clip en poster in. Meer hoeft niet. */
window.RONDLEIDING = {
  basisUrl: "https://jboersen88-dot.github.io/geschiedenis-vellesan/rondleiding/",
  qrVerplicht: true,
  titel: "Missie Vellesan",
  intro: { clip: "media/intro.mp4", poster: "media/intro.jpg" },
  voiceover: "voiceover/",            // map met <id>.mp3 van de vertelstem (mag leeg zijn)
  kluis: { code: "1926", hint: "Het is het jaar waarin het oude gebouw is gebouwd." },
  etages: [
    { naam: "Begane grond", kort: "BG", kaart: "img/vloer-0.webp", w: 1100, h: 700 },
    { naam: "1e etage", kort: "1", kaart: "img/vloer-1.webp", w: 1233, h: 800 },
    { naam: "2e etage", kort: "2", kaart: "img/vloer-2.webp", w: 1210, h: 760 }
  ],
  stops: [
    {
      id: "s01", item: ["🪪", "Schoolpas"], code: "ZON", naam: "Ingang en receptie", sub: "Hier begint je missie", etage: 0, x: 35, y: 74,
      clip: "media/s01.mp4", poster: "media/s01.jpg",
      uitleg: "Je komt binnen door de glazen schuifdeuren. Bij de receptie zitten de conciërges. Ben je ziek of te laat? Dan meld je je hier.",
      loop: "Start bij de hoofdingang. Loop door de schuifdeuren naar de receptie.",
      opdrachten: [
        { type: "mc", vraag: "Waar meld je je als je te laat bent?", opties: ["Bij de receptie", "In de aula", "Bij de kluisjes", "In de bibliotheek"], goed: 0, uitleg: "Precies. De conciërges helpen je verder." },
        { type: "foto", vraag: "Maak een foto van de ronde houten balie. Zorg dat er geen mensen op staan." }
      ]
    },
    {
      id: "s02", item: ["📅", "Rooster"], code: "BOOT", naam: "Hal 1", sub: "Het hart van de school", etage: 0, x: 46, y: 55,
      clip: "media/s02.mp4", poster: "media/s02.jpg",
      uitleg: "In de pauze zit je hier op de gele zitplekken. Op het scherm aan de muur staat of een les uitvalt of verplaatst is.",
      loop: "Loop vanaf de receptie de grote hal in.",
      opdrachten: [
        { type: "scherm", vraag: "Lees het scherm. Welke les gaat vandaag niet door?" },
        { type: "tel", vraag: "Tel de gele zitplekken in de hal. Hoeveel zie je er?" }
      ]
    },
    {
      id: "s03", item: ["🔑", "Kluissleutel"], code: "KAAS", naam: "De kluisjes", sub: "Jouw eigen kluisje", etage: 0, x: 27, y: 56,
      clip: "media/s03.mp4", poster: "media/s03.jpg",
      uitleg: "Iedere leerling krijgt een eigen kluisje. Daar gaan je jas, je tas en je boeken in. Zo hoef je niet alles mee te sjouwen.",
      loop: "Loop vanuit de hal naar de oranje kluisjes.",
      opdrachten: [
        { type: "kluis", vraag: "Kraak het kluisje! Los drie raadsels op. Elk antwoord is één cijfer.",
          raadsels: [
            { v: "Hoeveel etages heeft dit gebouw?", a: 3 },
            { v: "Hoeveel geheime cijfers zoek je voor de grote kluis?", a: 4 },
            { v: "Het oude gebouw is van 1926. Wat is het laatste cijfer?", a: 6 }
          ] }
      ]
    },
    {
      id: "s04", item: ["🎹", "Bladmuziek"], code: "MAAN", naam: "De aula", sub: "Eten, muziek en dans", etage: 0, x: 16, y: 59, cijfer: 1,
      clip: "media/s04.mp4", poster: "media/s04.jpg",
      uitleg: "In de aula eet en drink je in de pauze. Er staat een gele piano. Ook dans en muziek gebruiken deze ruimte.",
      loop: "Loop langs de kluisjes naar de grote ruimte met de lange tafels.",
      opdrachten: [
        { type: "piano", vraag: "Speel de melodie na op de piano. Luister goed en tik dezelfde toetsen." },
        { type: "mc", vraag: "Welke kleur heeft de piano in de aula?", opties: ["Geel", "Rood", "Zwart", "Blauw"], goed: 0, uitleg: "Goed gezien. Die gele piano valt echt op." }
      ]
    },
    {
      id: "s05", item: ["🥤", "Drinkfles"], code: "TAART", naam: "Eten en drinken", sub: "Even pauze", etage: 0, x: 33, y: 42,
      clip: "media/s05.mp4", poster: "media/s05.jpg",
      uitleg: "Hier staan twee automaten: één voor drinken en één voor snacks. Je mag ook je eigen lunch meenemen.",
      loop: "Loop vanuit de aula terug richting de hal. Je komt langs de automaten.",
      opdrachten: [
        { type: "automaat", vraag: "Je hebt 3 euro spelgeld. Kies een drankje en een snack, maar geef niet te veel uit!" },
        { type: "zoek", vraag: "Zoek de twee automaten. Gevonden? Tik op de knop." }
      ]
    },
    {
      id: "s06", item: ["🔨", "Hamer"], code: "HAAS", naam: "Handvaardigheid", sub: "Lokaal B12", etage: 0, x: 53, y: 69,
      clip: "media/s06.mp4", poster: "media/s06.jpg",
      uitleg: "Dit lokaal is een echte werkplaats, met werkbanken en bankschroeven. Hier maak je dingen met je handen. In de vitrine staat werk van leerlingen.",
      loop: "Loop terug naar de hal en zoek lokaal B12.",
      opdrachten: [
        { type: "schuif", vraag: "Schuif de stukjes zo dat de foto van de werkplaats weer klopt.", beeld: "media/s06.jpg" },
        { type: "foto", vraag: "Maak een foto van het werkstuk dat jij het mooist vindt. Zonder mensen erop." }
      ]
    },
    {
      id: "s07", item: ["🏛️", "Monumentsteen"], code: "BEER", naam: "Hal 2", sub: "Het oude gebouw uit 1926", etage: 0, x: 37, y: 27,
      clip: "media/s07.mp4", poster: "media/s07.jpg",
      uitleg: "Hier stap je het oude gebouw in. Het is van 1926 en een monument. Kijk naar de tegelvloer en het glas-in-loodraam.",
      loop: "Loop vanuit de hal verder het oude gebouw in. Let op de tegelvloer.",
      opdrachten: [
        { type: "tegels", vraag: "Draai de tegels tot het patroon klopt, net als de oude vloer." },
        { type: "zoek", vraag: "Zoek het glas-in-loodraam. Gevonden? Tik op de knop." }
      ]
    },
    {
      id: "s20", item: ["🤝", "Hulpkaart"], code: "STER", naam: "Rector en docentenkamer", sub: "Wie helpt jou?", etage: 0, x: 44, y: 22,
      clip: "media/s20.mp4", poster: "media/s20.jpg",
      uitleg: "Bij Hal 2 zitten de rector, de leerlingcoördinator en de docentenkamer. De rector is de baas van de school. De leerlingcoördinator helpt je als er iets niet goed gaat.",
      loop: "Blijf in Hal 2. Kijk naar de deuren van de kamers.",
      opdrachten: [
        { type: "koppel", vraag: "Wie helpt je? Koppel elk probleem aan de goede persoon.",
          links: ["Je bent ziek en blijft thuis", "Je hebt ruzie in de klas", "Je wilt iets vragen over je klas", "Wie is de baas van de school?"],
          rechts: ["Receptie", "Leerlingcoördinator", "Mentor", "Rector"] }
      ]
    },
    {
      id: "s08", item: ["🧮", "Rekenmachine"], code: "DRAAK", naam: "De gang met B01 tot B07", sub: "Elke les een ander lokaal", etage: 0, x: 60, y: 27,
      clip: "media/s08.mp4", poster: "media/s08.jpg",
      uitleg: "In deze gang krijg je economie, wiskunde, biologie, natuurkunde en scheikunde. Anders dan op de basisschool loop je elke les naar een ander lokaal.",
      loop: "Loop vanuit Hal 2 de gang in. Je ziet lokalen met een B en een nummer.",
      opdrachten: [
        { type: "koppel", vraag: "Rooster-puzzel: welk vak hoort bij welk lokaal?",
          links: ["B01", "B03", "B05", "B06"],
          rechts: ["Economie", "Wiskunde", "Biologie", "Scheikunde"] },
        { type: "tel", vraag: "Tel de kunstwerken aan de muur. Hoeveel zijn het er?" }
      ]
    },
    {
      id: "s09", item: ["🦴", "Botje"], code: "PAARD", naam: "Biologie", sub: "Lokaal B05", etage: 0, x: 67, y: 6,
      clip: "media/s09.mp4", poster: "media/s09.jpg",
      uitleg: "In dit biologielokaal staat een skelet. De stoelen lopen omhoog, net als in een klein theater. Zo ziet iedereen de proeftafel goed.",
      loop: "Loop de gang door tot het einde. Daar is B05.",
      opdrachten: [
        { type: "skelet", vraag: "Het skelet is uit elkaar gevallen! Sleep elk bot naar de goede plek." },
        { type: "open", vraag: "Verzin een grappige naam voor het skelet." }
      ]
    },
    {
      id: "s16", item: ["🥽", "Labbril"], code: "KROON", naam: "Het lab", sub: "Natuur- en scheikunde, B06 en B07", etage: 0, x: 77, y: 15, cijfer: 9,
      clip: "media/s16.mp4", poster: "media/s16.jpg",
      uitleg: "In B06 en B07 krijg je natuurkunde en scheikunde. Daar doe je zelf proefjes. In de gang staan glazen kasten met spullen om te bekijken.",
      loop: "Loop vanaf de biologie de hoek om, langs de glazen kasten.",
      opdrachten: [
        { type: "lab", vraag: "Maak je eigen bruisbal! Doe de stoffen in de kolf en schud de iPad." },
        { type: "mc", vraag: "Wat doe je vaak bij natuurkunde en scheikunde?", opties: ["Zelf proefjes", "Zingen", "Voetballen", "Koken"], goed: 0, uitleg: "Ja. Daarom heet dit het lab." }
      ]
    },
    {
      id: "s17", item: ["📐", "Geodriehoek"], code: "WOLK", naam: "Nieuwbouw beneden", sub: "B08 tot B11", etage: 0, x: 78, y: 46,
      clip: "media/s17.mp4", poster: "media/s17.jpg",
      uitleg: "Dit is de begane grond van het nieuwe gebouw. In B08 en B09 krijg je wiskunde. Door de grote ramen kijk je op de binnentuin.",
      loop: "Loop naar het nieuwe gebouw aan de andere kant van de binnentuin.",
      opdrachten: [
        { type: "getal", vraag: "Wiskunde-uitdaging: raad het geheime getal tussen 1 en 100. Je krijgt hints!" },
        { type: "zoek", vraag: "Zoek de lokalen B08, B09, B10 en B11. Alle vier gevonden? Tik op de knop." }
      ]
    },
    {
      id: "s19", item: ["🍃", "Blaadje"], code: "BLAD", naam: "De binnentuin", sub: "Buiten pauze houden", etage: 0, x: 66, y: 38,
      clip: "media/s19.mp4", poster: "media/s19.jpg",
      uitleg: "Midden tussen het oude en het nieuwe gebouw ligt de binnentuin. Is het mooi weer? Dan kun je hier in de pauze zitten.",
      loop: "Kijk door de grote ramen van de nieuwbouw, of loop naar de deur van de binnentuin.",
      opdrachten: [
        { type: "vang", vraag: "Pauze-spel! Vang zo veel mogelijk vallende blaadjes in 20 seconden." },
        { type: "tel", vraag: "Tel de bankjes in de binnentuin. Hoeveel zie je er?" }
      ]
    },
    {
      id: "s10", item: ["📖", "Woordenboek"], code: "SOEP", naam: "1e etage: de talen", sub: "Engels, Frans en Duits", etage: 1, x: 53, y: 30,
      clip: "media/s10.mp4", poster: "media/s10.jpg",
      uitleg: "Op de eerste etage krijg je talen, zoals Engels, Frans en Duits. Ook geschiedenis heeft hier lokalen. Je jas hangt aan de kapstok in de gang, niet in het lokaal.",
      loop: "Ga de trap op naar de eerste etage. Volg de gang met de oranje deuren.",
      opdrachten: [
        { type: "koppel", spreek: true, vraag: "Zeg hallo in vier talen! Tik op een woord om het te horen en koppel het aan de taal.",
          links: ["Hello", "Bonjour", "Guten Tag", "Hallo"],
          rechts: ["Engels", "Frans", "Duits", "Nederlands"],
          talen: ["en-GB", "fr-FR", "de-DE", "nl-NL"] },
        { type: "mc", vraag: "Welke taal krijg je in lokaal B18?", opties: ["Duits", "Frans", "Engels", "Spaans"], goed: 0, uitleg: "Goed. B18 is een lokaal voor Duits." }
      ]
    },
    {
      id: "s18", item: ["💡", "Lampje"], code: "VONK", naam: "B19, B20 en B21", sub: "Natuurkunde en Nederlands", etage: 1, x: 62, y: 13,
      clip: "media/s18.mp4", poster: "media/s18.jpg",
      uitleg: "In B19 krijg je natuurkunde en scheikunde. Daar laat de docent proefjes zien. In B20 en B21 krijg je Nederlands.",
      loop: "Loop op de eerste etage door de gang van het oude gebouw tot het einde.",
      opdrachten: [
        { type: "stroom", vraag: "B19: maak de stroomkring dicht, zodat het lampje gaat branden." },
        { type: "woord", vraag: "B20 en B21: zet de letters in de goede volgorde. Het zijn woorden van school.", woorden: ["ROOSTER", "MENTOR", "KLUISJE", "PAUZE"] }
      ]
    },
    {
      id: "s11", item: ["💻", "Laptop"], code: "KAT", naam: "Het computerlokaal", sub: "Toetsen op de computer", etage: 1, x: 32, y: 41,
      clip: "media/s11.mp4", poster: "media/s11.jpg",
      uitleg: "Hier staan rijen computers met blauwe schotten ertussen. Je gebruikt ze voor lessen en voor toetsen op de computer.",
      loop: "Blijf op de eerste etage en loop naar het computerlokaal.",
      opdrachten: [
        { type: "typen", vraag: "Typ-race! Typ de woorden zo snel als je kunt.", woorden: ["school", "kluisje", "aula", "rooster", "pauze", "mentor", "lokaal", "huiswerk"] },
        { type: "tel", vraag: "Tel de computers in één rij. Hoeveel zijn het er?" }
      ]
    },
    {
      id: "s14", item: ["🚪", "Gele deur"], code: "VIS", naam: "De nieuwbouw", sub: "B22 tot B25", etage: 1, x: 67, y: 47, cijfer: 2,
      clip: "media/s14.mp4", poster: "media/s14.jpg",
      uitleg: "Nu ben je in het nieuwe deel van de school: een gladde vloer, grote ramen en gele deuren. Hier krijg je onder andere Nederlands, Engels en wiskunde.",
      loop: "Loop van het oude gebouw naar de nieuwbouw. De vloer wordt glad en grijs.",
      opdrachten: [
        { type: "sorteer", vraag: "Oud of nieuw? Sleep alles naar het goede gebouw.",
          bakken: ["Oud gebouw", "Nieuwbouw"],
          items: [ ["Tegelvloer", 0], ["Glas-in-loodraam", 0], ["Monument uit 1926", 0], ["Gele deuren", 1], ["Gladde grijze vloer", 1], ["Grote ramen", 1] ] },
        { type: "zoek", vraag: "Zoek lokaal B24. Gevonden? Tik op de knop." }
      ]
    },
    {
      id: "s15", item: ["🌍", "Wereldbol"], code: "UIL", naam: "De lift, B26 en B27", sub: "Geschiedenis en aardrijkskunde", etage: 1, x: 49, y: 60,
      clip: "media/s15.mp4", poster: "media/s15.jpg",
      uitleg: "Aan het eind van de gang is de lift, voor leerlingen die niet goed kunnen traplopen. In B26 krijg je geschiedenis. In B27 krijg je aardrijkskunde.",
      loop: "Loop de gang van de nieuwbouw helemaal uit. Aan het eind zie je de liftdeur.",
      opdrachten: [
        { type: "lift", vraag: "Lift-geheugen! Onthoud de knoppen die oplichten en druk ze in dezelfde volgorde." },
        { type: "mc", vraag: "Welk vak krijg je in B27?", opties: ["Aardrijkskunde", "Geschiedenis", "Wiskunde", "Muziek"], goed: 0, uitleg: "Klopt. In B26 is het geschiedenis." }
      ]
    },
    {
      id: "s12", item: ["🎨", "Penseel"], code: "TAS", naam: "De tekenzolder", sub: "Tekenen en CKV, B29 en B30", etage: 2, x: 47, y: 33, cijfer: 6,
      clip: "media/s12.mp4", poster: "media/s12.jpg",
      uitleg: "Dit lokaal ligt onder het dak, met oranjerode balken en dakramen. Hier krijg je tekenen en CKV. Je werkt aan een ezel.",
      loop: "Ga de trap op naar de tweede etage, de bovenste verdieping.",
      opdrachten: [
        { type: "teken", vraag: "Jij bent de kunstenaar! Teken je droomlokaal. Wat staat er allemaal in?" },
        { type: "zoek", vraag: "Zoek de dakramen in het schuine dak. Gevonden? Tik op de knop." }
      ]
    },
    {
      id: "s13", item: ["📚", "Bibliotheekpas"], code: "GOUD", naam: "Bibliotheek en studiezaal", sub: "B31, de finale", etage: 2, x: 73, y: 20,
      clip: "media/s13.mp4", poster: "media/s13.jpg",
      uitleg: "Hier leen je boeken en tijdschriften. In de huiswerkklas maak je je huiswerk. Hier krijg je ook extra hulp, bijvoorbeeld bij dyslexie.",
      loop: "Blijf op de tweede etage en loop naar B31.",
      opdrachten: [
        { type: "woord", vraag: "Zet de letters goed. Het zijn woorden uit de bibliotheek.", woorden: ["BOEK", "LEZEN", "HUISWERK"] },
        { type: "mc", vraag: "Wat kun je in de bibliotheek doen?", opties: ["Boeken lenen", "Een fiets lenen", "Een kluisje huren", "Gymmen"], goed: 0, uitleg: "Klopt. Lezen kan hier prima." }
      ]
    }
  ],
  bonus: [
    { id: "b1", code: "RAKET", naam: "De grote trap", clip: "media/b1.mp4", poster: "media/b1.jpg", uitleg: "De monumentale trap uit 1926. Let op de koperen leuning en de zwarte stenen treden." },
    { id: "b2", code: "DONUT", naam: "De toren", clip: "media/b2.mp4", poster: "media/b2.jpg", uitleg: "Het trappenhuis in de toren. Kijk omhoog: het plafond heeft acht kanten." },
    { id: "b3", code: "BRUG", naam: "Van oud naar nieuw", clip: "media/b3.mp4", poster: "media/b3.jpg", uitleg: "Hier gaat het oude gebouw over in de nieuwbouw. Kijk naar de vloer: eerst tegels, daarna glad en grijs." }
  ]
};
