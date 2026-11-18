# Bron van toetsen.json. Draai: python3 -I economie/j4h4/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

SECT = ["Primaire sector", "Secundaire sector", "Tertiaire sector", "Quartaire sector"]
WL = ["Conjuncturele werkloosheid", "Structurele werkloosheid", "Frictiewerkloosheid", "Seizoenswerkloosheid"]
mc_a = mc(41, [
 ("Een werkgever wil een werknemer met een vaste baan ontslaan. Welke instantie kan daar toestemming voor geven?", ["Het UWV", "De vakbond", "De gemeente", "De effectenbeurs"], "Het UWV geeft toestemming voor ontslag."),
 ("In een fabriek moeten werknemers gehoorbescherming dragen. Welke wet regelt de veiligheid op het werk?", ["De Arbowet", "De Algemene wet gelijke behandeling", "De wet op het minimumloon", "De vennootschapsbelasting"], "De Arbowet beschermt de gezondheid en veiligheid van werknemers."),
 ("Wie onderhandelen met elkaar over een nieuwe cao?", ["Vakbonden en werkgevers", "Vakbonden en het UWV", "Werkgevers en de overheid", "Werknemers en aandeelhouders"], "In de cao staan de arbeidsvoorwaarden per bedrijfstak."),
 ("Een bedrijf wil alleen mannen aannemen voor een kantoorbaan. Waarom mag dat niet?", ["Dat verbiedt de Algemene wet gelijke behandeling", "Dat verbiedt de Arbeidstijdenwet voor kantoren", "Dat staat in de cao van elke bedrijfstak", "Dat mag alleen met toestemming van het UWV"], "De wet verbiedt onderscheid op onder andere gender."),
 ("Jesse helpt elke zaterdag gratis bij de voedselbank. Wat voor werk is dat?", ["Onbetaald werk", "Zwart werk", "Loondienst", "Uitzendwerk"], "Vrijwilligerswerk is onbetaald werk."),
 ("Mila werkt alleen als de supermarkt haar belt. Wat voor baan heeft zij?", ["Een flexibele baan", "Een vaste baan", "Een voltijdbaan", "Een eigen bedrijf"], "Een oproepkracht werkt alleen als de werkgever haar nodig heeft."),
 ("Wat is een nadeel van werken als zelfstandige?", ["Je hebt minder zekerheid over je inkomen", "Je mag zelf geen klanten uitkiezen", "Je moet altijd personeel aannemen", "Je mag niet meer dan 36 uur werken"], "Een zelfstandige heeft meer vrijheid, maar minder zekerheid."),
 ("Van welke onderneming kan iedereen aandelen kopen op de effectenbeurs?", ["Een nv", "Een bv", "Een vof", "Een stichting"], "De aandelen van een nv worden op de beurs verhandeld."),
 ("In welke sector werkt een docent op een middelbare school?", ["De quartaire sector", "De tertiaire sector", "De secundaire sector", "De primaire sector"], "Onderwijs is niet-commerciële dienstverlening."),
 ("Wie horen bij de beroepsbevolking?", ["Alle werkenden en werkzoekenden samen", "Alle mensen met een betaalde baan", "Alle inwoners van achttien jaar en ouder", "Alle mensen met een uitkering van het UWV"], "De beroepsbevolking zorgt voor het aanbod van arbeid."),
 ("Een restaurant zoekt al maanden een kok, maar niemand solliciteert. Wat zegt dat over de arbeidsmarkt?", ["De arbeidsmarkt is krap", "De arbeidsmarkt is ruim", "De beroepsbevolking is te groot", "De werkgelegenheid is te laag"], "Bij een krappe arbeidsmarkt is de vraag naar arbeid groter dan het aanbod."),
 ("Robin is ontslagen en zoekt werk, maar staat niet ingeschreven bij het UWV. Hoe heet dat?", ["Verborgen werkloos", "Geregistreerd werkloos", "Regionaal werkloos", "Arbeidsparticipatie"], "Wie niet is ingeschreven, telt niet mee in de cijfers."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Je hebt vanaf 21 jaar recht op het wettelijk minimumloon.", True),
   gf("Zwart werk is hetzelfde als onbetaald werk.", False),
   gf("De eigenaar van een eenmanszaak mag geen personeel in dienst hebben.", False),
   gf("Een bv en een nv betalen vennootschapsbelasting over de winst.", True),
   gf("Bij een ruime arbeidsmarkt is er veel werkloosheid.", True)],
   ["Bij zwart werk krijg je wel loon, maar betaal je geen belasting en premies. Dat is strafbaar.", "Een eenmanszaak heeft één eigenaar. Personeel mag wel."])]),
 opgave(2, "Een bijbaan in de bouwmarkt", [
   deel("a", "Bereken het loon van Tim per week.", [num(210, "Loon per week", "€")], "15 × €14,00 = €210,00."),
   deel("b", "Bereken het loon van Tim per maand. Een jaar heeft 52 weken.", [num(910, "Loon per maand", "€")], "(weekloon × 52) : 12 = (€210,00 × 52) : 12 = €910,00."),
   deel("c", "Heeft Tim een voltijdbaan of een deeltijdbaan?", [keuze("Tim heeft een", ["Deeltijdbaan", "Voltijdbaan"], 0)], "Een voltijdbaan is 36 uur of meer per week. Tim werkt 15 uur."),
   deel("d", "Noem twee arbeidsmotieven, naast geld verdienen.", [open_("2d", "Noem twee arbeidsmotieven, naast geld verdienen.", "Arbeidsmotieven", "Sociale contacten, nuttig bezig zijn, regelmaat en nieuwe dingen leren.", ["een eerste juist motief (sociale contacten, nuttig bezig zijn, regelmaat, nieuwe dingen leren)", "een tweede juist motief"])], "Mensen werken niet alleen voor het geld."),
  ], tekst="Tim werkt 15 uur per week bij een bouwmarkt. Hij verdient €14,00 per uur."),
 opgave(3, "Samen een fietsenwinkel", [
   deel("a", "Bereken hoeveel winst Sara krijgt.", [num(48000, "Winst voor Sara", "€", tol=0.5)], "(percentage : 100) × totaal = (60 : 100) × €80.000 = €48.000."),
   deel("b", "Bereken hoeveel winst Omar krijgt.", [num(32000, "Winst voor Omar", "€", tol=0.5)], "€80.000 − €48.000 = €32.000. Of: (40 : 100) × €80.000."),
   deel("c", "De winkel krijgt grote schulden. Leg uit waarom dat bij een vof een risico is voor Sara en Omar zelf.", [open_("3c", "De winkel krijgt grote schulden. Leg uit waarom dat bij een vof een risico is voor Sara en Omar zelf.", "Privé aansprakelijk", "De vennoten van een vof zijn privé aansprakelijk. Zij moeten de schulden van het bedrijf ook met hun eigen geld en spullen betalen.", ["de vennoten zijn privé aansprakelijk", "zij betalen de schulden ook met hun eigen geld of spullen"])], "Bij een eenmanszaak en een vof ben je privé aansprakelijk."),
   deel("d", "Sara en Omar maken van hun winkel een bv. Wat kunnen zij dan hoogstens kwijtraken als de bv failliet gaat?", [keuze("Zij raken hoogstens kwijt", ["Hun aandeel in de bv", "Hun eigen huis", "Al hun spaargeld", "Hun loon van vroeger"], 0)], "Bij een bv ben je bij faillissement hoogstens je aandeel kwijt."),
  ], tekst="Sara en Omar hebben samen een fietsenwinkel. Het is een vof. Dit jaar is de winst €80.000. Ze hebben afgesproken dat Sara 60% van de winst krijgt en Omar de rest."),
 opgave(4, "Werk in de regio", [
   deel("a", "Kies bij elk bedrijf de juiste sector.", [keuze("Een melkveehouderij", SECT, 0), keuze("Een transportbedrijf", SECT, 2), keuze("Een meubelfabriek", SECT, 1), keuze("Een ziekenhuis", SECT, 3)],
        "Primair: landbouw en visserij. Secundair: industrie en bouw. Tertiair: commerciële diensten. Quartair: niet-commerciële diensten."),
   deel("b", "Bereken de beroepsbevolking van de regio.", [num(50000, "Beroepsbevolking", "", tol=0.5)], "Werkenden + werkzoekenden = 47.500 + 2.500 = 50.000."),
   deel("c", "Bereken hoeveel procent van de beroepsbevolking werkloos is. Rond af op 1 decimaal.", [num(5, "Werkloosheid", "%")], "(deel : geheel) × 100 = (2.500 : 50.000) × 100 = 5,0%."),
   deel("d", "Bij een bedrijf werken 6 mensen in voltijd (36 uur) en 4 mensen 18 uur per week. Bereken het aantal arbeidsjaren.", [num(8, "Arbeidsjaren", "")], "6 × 36 + 4 × 18 = 288 uur. 288 : 36 = 8 arbeidsjaren."),
  ], tekst="In een regio werken 47.500 mensen. Er zijn 2.500 mensen werkloos."),
 opgave(5, "Zonder werk", [
   deel("a", "Kies bij elk voorbeeld de juiste soort werkloosheid.", [keuze("Mensen kopen minder, daardoor ontslaat een winkelketen personeel", WL, 0), keuze("Een bank vervangt medewerkers door een app", WL, 1), keuze("Een strandtent heeft in de winter geen werk", WL, 3), keuze("Noa is net klaar met haar opleiding en zoekt een baan", WL, 2)],
        "Conjunctureel: minder bestedingen. Structureel: de aanbodkant, zoals robots. Seizoen: een deel van het jaar. Frictie: korte tijd tussen school of baan en een nieuwe baan."),
   deel("b", "Het aantal werklozen in een stad stijgt van 4.000 naar 4.300. Bereken met hoeveel procent het aantal werklozen is gestegen. Rond af op 1 decimaal.", [num(7.5, "Stijging", "%")], "(nieuw − oud) : oud × 100 = (4.300 − 4.000) : 4.000 × 100 = 7,5%."),
   deel("c", "Leg uit hoe omscholen helpt tegen structurele werkloosheid.", [open_("5c", "Leg uit hoe omscholen helpt tegen structurele werkloosheid.", "Omscholen", "Door omscholen leer je een ander beroep. Daardoor pas je beter bij de banen die er wel zijn en vind je sneller werk.", ["door omscholen leer je iets anders of een ander beroep", "daardoor pas je beter bij de banen die er zijn"])], "Met een andere opleiding pas je beter bij de banen die er zijn."),
  ]),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 4", min=45, mc="mc_a", open=None, rek="rek_a")))
