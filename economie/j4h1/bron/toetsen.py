# Bron van toetsen.json. Draai: python3 -I economie/j4h1/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

SOORT = ["Inkomen uit arbeid", "Inkomen uit bezit", "Overdrachtsinkomen"]
mc_a = mc(11, [
 ("Daan heeft aandelen en krijgt daarover elk jaar dividend. Wat voor inkomen is dat?", ["Inkomen uit bezit", "Inkomen uit arbeid", "Overdrachtsinkomen", "Besteedbaar inkomen"], "Je krijgt dividend omdat je aandelen bezit."),
 ("Een sportmerk laat een bekende voetballer zijn schoenen dragen. Bij welke P hoort dat?", ["Promotie", "Plaats", "Prijs", "Personeel"], "Reclame en sponsoring horen bij promotie."),
 ("Een campagne roept op om bloed te geven. Wat voor reclame is dit?", ["Ideële reclame", "Merkreclame", "Sluikreclame", "Winkelreclame"], "Reclame voor een goed doel of idee, zonder winstdoel."),
 ("Een fabriek loost afval in de rivier. De schoonmaak betaalt de gemeente. Hoe heten deze kosten?", ["Maatschappelijke kosten", "Verplichte bestedingen", "Collectieve voorzieningen", "Incidentele uitgaven"], "De kosten zijn voor de samenleving en zitten niet in de prijs."),
 ("Wat houd je over als je van het brutoloon de loonbelasting en premies aftrekt?", ["Het nettoloon", "Het modaal inkomen", "Het reële inkomen", "Het primair inkomen"], "Bruto min belasting en premies is netto."),
 ("In land A ligt de Lorenzcurve dicht bij de diagonaal. In land B ligt hij er ver vanaf. Wat weet je nu?", ["In land B zijn de inkomens ongelijker verdeeld", "In land B zijn de inkomens gelijker verdeeld", "In land B is het inkomen per inwoner hoger", "In land B is het inkomen per inwoner lager"], "Hoe verder van de diagonaal, hoe ongelijker de verdeling."),
 ("Een bedrag stijgt met 4%. Met welke groeifactor reken je?", ["1,04", "0,96", "1,4", "0,04"], "Groeifactor = 1 + (4 : 100) = 1,04."),
 ("Waarom is een gratis krant een schaars goed?", ["Er zijn productiemiddelen nodig om hem te maken", "Er worden er elke dag te weinig van gedrukt", "Je kunt hem alleen op het station meenemen", "De overheid betaalt alle kosten van de krant"], "Schaars betekent: er zijn arbeid, kapitaal of natuur voor nodig."),
 ("Welk voorbeeld hoort bij welzijn en niet bij welvaart?", ["Je veilig voelen in je buurt", "Een hoger loon krijgen", "Een nieuwe scooter kopen", "Meer zakgeld ontvangen"], "Welzijn gaat over de kwaliteit van je leven, niet over geld."),
 ("Het indexcijfer van de huur is 108 (2015 = 100). Wat betekent dat?", ["De huur is 8% hoger dan in 2015", "De huur is 108% hoger dan in 2015", "De huur is 8 euro hoger dan in 2015", "De huur is 108 euro per maand"], "108 − 100 = 8% hoger dan in het basisjaar."),
 ("De prijzen dalen een jaar lang. Waarom is dat slecht voor de economie?", ["Mensen stellen aankopen uit", "Mensen gaan meer lenen", "De lonen stijgen te snel", "Het geld wordt minder waard"], "Bij deflatie wachten mensen tot het nog goedkoper is."),
 ("Wie berekent in Nederland het consumentenprijsindexcijfer?", ["Het CBS", "De vakbond", "Het Nibud", "De gemeente"], "Het Centraal Bureau voor de Statistiek berekent het CPI."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Kinderbijslag is een overdrachtsinkomen.", True),
   gf("Het modaal inkomen is het hoogste inkomen van Nederland.", False),
   gf("Zonlicht is een vrij goed.", True),
   gf("Bij inflatie kun je met hetzelfde geld meer kopen.", False),
   gf("Een indexcijfer van 95 betekent een daling van 5% sinds het basisjaar.", True)],
   ["Het modaal inkomen is het inkomen dat het meest voorkomt.", "Bij inflatie stijgen de prijzen: je kunt minder kopen."])]),
 opgave(2, "Het inkomen van Noor", [
   deel("a", "Kies bij elk inkomen de juiste soort.", [keuze("Loon van de bijbaan", SOORT, 0), keuze("Rente op spaargeld", SOORT, 1), keuze("Zakgeld", SOORT, 2), keuze("Huur van een garagebox", SOORT, 1)],
        "Loon is inkomen uit arbeid. Rente en huur krijg je uit bezit. Zakgeld is een overdracht."),
   deel("b", "Bereken hoeveel Noor per maand verdient met haar bijbaan. Rond af op 2 decimalen.", [num(208.00, "Loon per maand", "€")], "(weekbedrag × 52) : 12 = (48 × 52) : 12 = €208,00. Niet keer 4."),
   deel("c", "Het loon van Noor stijgt met 5%. Bereken haar nieuwe weekloon.", [num(50.40, "Nieuw weekloon", "€")], "Groeifactor = 1 + (5 : 100) = 1,05. 48 × 1,05 = €50,40."),
  ], tekst="Noor (16) verdient €48 per week met haar bijbaan in de supermarkt."),
 opgave(3, "De inkomensverdeling in land X", [
   deel("a", "Hoeveel procent van het inkomen verdient de rijkste 20%?", [num(42, "Rijkste 20%", "%", tol=0.5)], "100% − 58% = 42%."),
   deel("b", "Hoeveel procent van het inkomen verdient de groep van 40% tot 60%?", [num(16, "Middelste 20%", "%", tol=0.5)], "cumulatief − vorig cumulatief = 34% − 18% = 16%."),
   deel("c", "Het BBP van land X is €450 miljard. Er wonen 9 miljoen mensen. Bereken het BBP per inwoner.", [num(50000, "BBP per inwoner", "€", tol=0.5)], "BBP : aantal inwoners = 450.000.000.000 : 9.000.000 = €50.000."),
   deel("d", "Noem twee oorzaken van inkomensverschillen tussen mensen.", [open_("3d", "Noem twee oorzaken van inkomensverschillen tussen mensen.", "Inkomensverschillen", "Bijvoorbeeld: verschil in opleiding, het soort werk, de verantwoordelijkheid die je draagt, en vraag en aanbod op de arbeidsmarkt.", ["een eerste juiste oorzaak (opleiding, soort werk, verantwoordelijkheid, vraag en aanbod)", "een tweede juiste oorzaak"])], "Opleiding, soort werk, verantwoordelijkheid, vraag en aanbod."),
  ], tekst="De tabel laat zien welk deel van het totale inkomen de bevolking verdient, opgeteld van arm naar rijk.",
  tabel=[["Bevolking", "Cumulatief % van het inkomen"], ["armste 20%", "6%"], ["armste 40%", "18%"], ["armste 60%", "34%"], ["armste 80%", "58%"], ["alle 100%", "100%"]]),
 opgave(4, "Rekenen met indexcijfers", [
   deel("a", "Bereken het indexcijfer van de prijs van nu. Rond af op 1 decimaal.", [num(125.0, "Indexcijfer")], "(nieuw getal : getal basisjaar) × 100 = (3,00 : 2,40) × 100 = 125,0."),
   deel("b", "Met hoeveel procent is de prijs gestegen sinds het basisjaar?", [num(25, "Stijging", "%")], "125 − 100 = 25%."),
   deel("c", "Een pizza kost nu €11,50. Het indexcijfer is 115 (2015 = 100). Bereken de prijs in 2015.", [num(10.00, "Prijs in 2015", "€")], "(prijs : indexcijfer) × 100 = (11,50 : 115) × 100 = €10,00."),
  ], tekst="Een brood kostte in het basisjaar 2015 €2,40. Nu kost hetzelfde brood €3,00."),
 opgave(5, "Help, de prijzen stijgen", [
   deel("a", "Bereken met hoeveel procent de koopkracht verandert. Typ een min-teken bij een daling.", [num(-1.5, "Verandering koopkracht", "%")], "nominale verandering − inflatie = 2,5% − 4% = −1,5%. De koopkracht daalt."),
   deel("b", "De vakbond eist prijscompensatie. Leg uit wat prijscompensatie is.", [open_("5b", "De vakbond eist prijscompensatie. Leg uit wat prijscompensatie is.", "Prijscompensatie", "Een loonsverhoging die even groot is als de prijsstijging, zodat de koopkracht gelijk blijft.", ["een loonsverhoging", "om de prijsstijging (inflatie) goed te maken"])], "De lonen stijgen mee met de prijzen."),
   deel("c", "Leg uit hoe hogere lonen kunnen zorgen voor nog hogere prijzen. Gebruik het woord kosten.", [open_("5c", "Leg uit hoe hogere lonen kunnen zorgen voor nog hogere prijzen. Gebruik het woord kosten.", "Loon-prijsspiraal", "Door hogere lonen stijgen de kosten van bedrijven. Bedrijven rekenen die kosten door in hogere prijzen. Daarna vragen werknemers weer meer loon: de loon-prijsspiraal.", ["hogere lonen betekenen hogere kosten voor bedrijven", "bedrijven verhogen daardoor hun prijzen"])], "Lonen omhoog, kosten omhoog, prijzen omhoog."),
  ], tekst="De lonen stijgen dit jaar met 2,5%. De inflatie is 4%."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 1", min=45, mc="mc_a", open=None, rek="rek_a")))
