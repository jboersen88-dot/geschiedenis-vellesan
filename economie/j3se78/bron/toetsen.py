# Oefen-SE voor het SE H7 + H8 (stof van 4 mavo, gegeven in 3 mavo). Draai: python3 -I economie/j3se78/bron/toetsen.py
# Zelfde soort vragen als in de hoofdstukken, andere situaties. Geen vragen uit een echt SE. De landen en bedragen zijn verzonnen.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

PROT = ["Invoerrechten", "Contingentering", "Invoerverbod", "Exportsubsidie"]
VRIJ = ["Goederen en diensten", "Personen", "Kapitaal"]
HULP = ["Noodhulp", "Structurele hulp", "Gebonden hulp"]
mc_a = mc(78, [
 ("Een Nederlands bedrijf verkoopt chipmachines aan Zuid-Korea. Wat is dat voor Nederland?", ["Export", "Import", "Wederuitvoer", "Contingentering"], "Verkopen aan het buitenland."),
 ("Ananassen uit Costa Rica krijgen in Rotterdam een nieuwe sticker en gaan door naar Zweden. Hoe heet dat?", ["Wederuitvoer", "Harmonisatie", "Globalisering", "Vrijhandel"], "Invoeren en bijna onbewerkt weer uitvoeren."),
 ("Wat staat er op de betalingsbalans?", ["Ontvangsten uit en betalingen aan het buitenland", "De inkomsten en uitgaven van de rijksoverheid", "De winst en het verlies van alle bedrijven", "De spaartegoeden en schulden van gezinnen"], "Geld dat de grens over gaat."),
 ("De koers van de euro stijgt ten opzichte van de dollar. Wat gebeurt er met onze producten in Amerika?", ["Die worden daar duurder", "Die worden daar goedkoper", "Die blijven daar even duur", "Die worden daar verboden"], "Amerikanen moeten meer dollars betalen voor dezelfde euro's."),
 ("Elk land maakt de producten die het het beste en goedkoopste kan maken. Hoe heet dat?", ["Internationale arbeidsverdeling", "Internationale concurrentiepositie", "Europese Monetaire Unie", "Maatschappelijk ondernemen"], "Daardoor stijgt de welvaart."),
 ("Wat is het doel van protectiemaatregelen?", ["De eigen productie en banen beschermen", "De prijzen voor consumenten verlagen", "De handel tussen landen vrijer maken", "De export van andere landen vergroten"], "Ze beschermen tegen concurrentie uit andere landen."),
 ("Welke organisatie controleert of landen zich aan handelsafspraken houden?", ["De WTO", "De ECB", "Het IMF", "De EMU"], "De Wereldhandelsorganisatie."),
 ("In alle EU-landen gelden dezelfde veiligheidseisen voor speelgoed. Hoe heet dat?", ["Harmonisatie", "Contingentering", "Globalisering", "Monocultuur"], "Regels op elkaar afstemmen."),
 ("Wat is prijsstabiliteit?", ["De prijzen stijgen niet te veel", "De prijzen zijn in elk land gelijk", "De prijzen dalen elk jaar een beetje", "De prijzen worden door de EU bepaald"], "De euro houdt zo zijn koopkracht."),
 ("Een schoenenfabriek verhuist van Nederland naar een land met lage lonen. Welk gevolg van globalisering zie je?", ["Hier verdwijnen banen in de productie", "Hier stijgen de lonen in de fabriek", "Hier worden schoenen veel duurder", "Hier komen meer fabrieken bij"], "Productie verhuist naar lagelonenlanden."),
 ("Waarom zegt het inkomen per hoofd niet alles over de welvaart?", ["Je ziet niet hoe het inkomen verdeeld is", "Het wordt alleen in rijke landen gemeten", "Het telt de inkomens van rijken niet mee", "Het is in elk land ongeveer even hoog"], "Het is een gemiddelde."),
 ("Een land is voor zijn export afhankelijk van alleen katoen. Hoe heet dat?", ["Monocultuur", "Ruilvoet", "Harmonisatie", "Wederuitvoer"], "Daalt de prijs van katoen, dan daalt het inkomen van het hele land."),
 ("De prijs van koffie daalt en de prijs van machines stijgt. Wat gebeurt er met de ruilvoet van een koffieland?", ["Die verslechtert", "Die verbetert", "Die blijft gelijk", "Die verdwijnt"], "Het land moet meer koffie exporteren voor dezelfde machines."),
 ("Een vrouw in Kenia leent een klein bedrag om een naaimachine te kopen. Hoe heet zo'n lening?", ["Microkrediet", "Noodhulp", "Gebonden hulp", "Exportsubsidie"], "Een kleine lening voor kleine ondernemers."),
 ("Uit welke twee delen bestaat de fairtradeprijs?", ["Een minimumprijs en een premie", "Een inkoopprijs en de btw", "Een lening en de rente", "Een subsidie en een heffing"], "Zo krijgt de boer een gegarandeerde prijs."),
 ("Wat is een vicieuze cirkel?", ["Het ene probleem veroorzaakt steeds het andere", "Een groep landen die samen handel drijft", "Een afspraak over de prijs van grondstoffen", "Een lening die nooit terugbetaald wordt"], "Daardoor blijft een arm land arm."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Nederland heeft een open economie.", True),
   gf("Bij een handelsoverschot is de import groter dan de export.", False),
   gf("Invoerrechten maken producten uit het buitenland duurder.", True),
   gf("De ECB int de belasting in de eurolanden.", False),
   gf("Bij gebonden hulp bepaalt het land zelf waaraan het geld opgaat.", False),
   gf("Structurele hulp is erop gericht dat een land zelfstandiger wordt.", True)],
   ["Bij een handelsoverschot is de export groter.", "Belasting innen doet elk land zelf.", "Bij gebonden hulp moet het geld besteed worden in het land dat de hulp geeft."])]),
 opgave(2, "De handel van Oostland", [
   deel("a", "Bereken de exportquote van Oostland.", [num(64, "Exportquote", "%", tol=0.05)], "(exportwaarde : nationaal inkomen) × 100 = (480 : 750) × 100 = 64,0%"),
   deel("b", "Bereken de importquote van Oostland.", [num(58, "Importquote", "%", tol=0.05)], "(importwaarde : nationaal inkomen) × 100 = (435 : 750) × 100 = 58,0%"),
   deel("c", "Bereken het handelssaldo van Oostland, in miljard euro.", [num(45, "Handelssaldo", "miljard euro", tol=0.5)], "exportwaarde − importwaarde = 480 − 435 = 45 miljard euro: een handelsoverschot"),
   deel("d", "Een jaar later is de export €504 miljard. Bereken met hoeveel procent de export is gestegen.", [num(5, "Stijging", "%", tol=0.05)], "(nieuw − oud) : oud × 100 = (504 − 480) : 480 × 100 = 5,0%"),
   deel("e", "Leg uit waarom export belangrijk is voor de werkgelegenheid in een land.", [open_("2e", "Leg uit waarom export belangrijk is voor de werkgelegenheid in een land.", "Export en banen", "Door te exporteren verkopen bedrijven meer. Ze moeten dan meer produceren en hebben meer personeel nodig. Dat levert banen op.", ["bedrijven verkopen/produceren meer door export", "daarvoor is meer personeel nodig / dat levert banen op"])], "Meer verkopen betekent meer productie en meer banen."),
  ], tekst="Het nationaal inkomen van Oostland is €750 miljard. De exportwaarde is €480 miljard. De importwaarde is €435 miljard."),
 opgave(3, "Vrij handelen of beschermen?", [
   deel("a", "Kies bij elk voorbeeld de protectiemaatregel.", [keuze("Op staal van buiten de EU komt 25% belasting", PROT, 0), keuze("Er mogen hoogstens 50.000 auto's per jaar worden ingevoerd", PROT, 1), keuze("Hout uit beschermde bossen mag het land niet in", PROT, 2), keuze("Boeren krijgen geld voor elke ton melkpoeder die zij uitvoeren", PROT, 3)], "Invoerrechten: belasting. Contingentering: een maximum. Invoerverbod: helemaal niet. Exportsubsidie: geld voor export."),
   deel("b", "Een winkelier koopt een partij fietsen van buiten de EU voor €40.000,00. De invoerrechten zijn 14%. Bereken de invoerrechten.", [num(5600, "Invoerrechten", "€", tol=0.005)], "(percentage : 100) × totaal = (14 : 100) × 40.000 = €5.600,00"),
   deel("c", "Bereken wat de partij fietsen de winkelier kost met de invoerrechten.", [num(45600, "Totaal", "€", tol=0.005)], "40.000 + 5.600 = €45.600,00"),
   deel("d", "Leg uit wat het nadeel van invoerrechten is voor de consument.", [open_("3d", "Leg uit wat het nadeel van invoerrechten is voor de consument.", "Nadeel van protectie", "Producten uit het buitenland worden duurder. De consument betaalt een hogere prijs of heeft minder keuze.", ["producten worden duurder / de consument betaalt meer (of heeft minder keuze)"])], "De consument betaalt een hogere prijs."),
  ]),
 opgave(4, "Nederland en de EU", [
   deel("a", "Kies bij elk voorbeeld het soort vrij verkeer.", [keuze("Een Nederlandse student gaat in Italië studeren", VRIJ, 1), keuze("Een Franse kaasmaker verkoopt kaas in Nederland zonder invoerrechten", VRIJ, 0), keuze("Je belegt in aandelen van een Duits bedrijf", VRIJ, 2)], "Wonen, werken en studeren: personen. Handel: goederen en diensten. Sparen en beleggen: kapitaal."),
   deel("b", "Noem twee voordelen van de euro voor bedrijven die handelen met andere eurolanden.", [open_("4b", "Noem twee voordelen van de euro voor bedrijven die handelen met andere eurolanden.", "De euro", "Bedrijven hebben geen kosten voor het omwisselen van geld. Ze lopen geen risico dat de wisselkoers verandert. Prijzen zijn ook makkelijk te vergelijken.", ["geen kosten voor het wisselen van geld", "geen wisselkoersrisico / prijzen makkelijk vergelijken"])], "Geen wisselkosten, geen wisselkoersrisico, prijzen makkelijk vergelijken."),
   deel("c", "De ECB verlaagt de rente. Wat doen consumenten dan meestal?", [keuze("Consumenten gaan", ["Meer lenen en meer kopen", "Meer sparen en minder kopen"], 0)], "Lenen wordt goedkoper en sparen levert minder op."),
  ]),
 opgave(5, "Welvaart in de wereld", [
   deel("a", "Bereken het inkomen per hoofd van de bevolking in Bergland.", [num(4000, "Inkomen per hoofd", "€", tol=0.5)], "nationaal inkomen : aantal inwoners = 36.000.000.000 : 9.000.000 = €4.000"),
   deel("b", "Rijkland besteedt 0,7% van het nationaal inkomen aan ontwikkelingssamenwerking. Bereken hoeveel miljard euro dat is.", [num(5.6, "Ontwikkelingssamenwerking", "miljard euro", tol=0.005)], "(percentage : 100) × totaal = (0,7 : 100) × 800 = 5,6 miljard euro"),
   deel("c", "Kies bij elk voorbeeld het soort hulp.", [keuze("Dekens en tenten na een orkaan", HULP, 0), keuze("Geld voor de bouw van scholen", HULP, 1), keuze("Hulpgeld dat besteed moet worden bij bedrijven uit het land dat de hulp geeft", HULP, 2), keuze("Voedsel bij een hongersnood door droogte", HULP, 0)], "Noodhulp: snel na een ramp. Structurele hulp: voor de lange termijn. Gebonden hulp: met een voorwaarde over de besteding."),
   deel("d", "Leg uit waarom een monocultuur riskant is voor een land.", [open_("5d", "Leg uit waarom een monocultuur riskant is voor een land.", "Monocultuur", "Het land is afhankelijk van één of enkele exportproducten. Als de prijs daarvan daalt of de oogst mislukt, dalen de inkomsten van het hele land.", ["afhankelijk van één of enkele (export)producten", "bij een lagere prijs of een mislukte oogst dalen de inkomsten van het land sterk"])], "Eén product: bij een lage prijs of slechte oogst daalt het inkomen sterk."),
  ], tekst="Bergland heeft een nationaal inkomen van €36 miljard en 9 miljoen inwoners. Rijkland heeft een nationaal inkomen van €800 miljard."),
 opgave(6, "Eerlijke cacao", [
   deel("a", "Bereken de fairtradeprijs per ton cacao.", [num(2640, "Prijs per ton", "€", tol=0.5)], "minimumprijs + fairtradepremie = 2.400 + 240 = €2.640"),
   deel("b", "De coöperatie verkoopt 15 ton cacao. Bereken hoeveel de coöperatie in totaal krijgt.", [num(39600, "Totaal", "€", tol=0.5)], "15 × 2.640 = €39.600"),
   deel("c", "Op de wereldmarkt is de prijs €2.150 per ton. Bereken hoeveel de boeren per ton meer krijgen via Fairtrade.", [num(490, "Verschil per ton", "€", tol=0.5)], "2.640 − 2.150 = €490"),
   deel("d", "Hoe kan een consument in Nederland deze boeren helpen?", [open_("6d", "Hoe kan een consument in Nederland deze boeren helpen?", "De consument", "Door producten te kopen met een eerlijke prijs voor de boer, bijvoorbeeld chocolade van Fairtrade.", ["producten kopen waarvoor de boer een eerlijke prijs krijgt (Fairtrade)"])], "Kies producten met een eerlijke prijs voor de boer."),
  ], tekst="Een coöperatie van cacaoboeren verkoopt via Fairtrade. De minimumprijs is €2.400 per ton. De fairtradepremie is €240 per ton."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H7 en H8", min=75, mc="mc_a", open=None, rek="rek_a")))
