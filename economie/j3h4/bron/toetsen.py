# Bron van toetsen.json. Draai: python3 -I economie/j3h4/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
# De tabel met kortingen is een eigen voorbeeld.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

VERZ = ["AVP", "Inboedelverzekering", "Opstalverzekering", "WA-verzekering", "Cascoverzekering", "Zorgverzekering"]
ZORG = ["Basisverzekering", "Aanvullende verzekering"]
mc_a = mc(34, [
 ("Mila betaalt elke maand €12 aan haar verzekeraar. Hoe heet dat bedrag?", ["Premie", "Polis", "Dekking", "Uitkering"], "De premie betaal je om verzekerd te zijn."),
 ("Waar lees je precies wat er verzekerd is?", ["In de polis", "In de premie", "In de claim", "In de ladder"], "In de polis staan de afspraken met de verzekeraar."),
 ("Bij schade betaalt Finn de eerste €100 zelf. Hoe heet dat?", ["Eigen risico", "Poliskosten", "Nettopremie", "Zorgtoeslag"], "Het eigen risico is het deel van de schade dat je zelf betaalt."),
 ("De hond van Sofie bijt de jas van de buurman kapot. Welke verzekering vergoedt de jas?", ["De AVP van Sofie", "De inboedel van Sofie", "De opstal van de buurman", "De zorgverzekering"], "De AVP vergoedt schade die je aan anderen toebrengt."),
 ("Bij een storm waait een boom op het dak van een koophuis. Welke verzekering vergoedt het dak?", ["Opstalverzekering", "Inboedelverzekering", "Cascoverzekering", "Zorgverzekering"], "De opstalverzekering dekt schade aan het huis zelf."),
 ("Een inboedel is verzekerd voor €30.000, maar is €40.000 waard. Wat is hier aan de hand?", ["Onderverzekering", "Indexering", "Solidariteit", "No-claimkorting"], "Het verzekerde bedrag is lager dan de echte waarde."),
 ("Je auto wordt gestolen. Met welke verzekering krijg je de auto vergoed?", ["Cascoverzekering", "WA-verzekering", "AVP", "Opstalverzekering"], "Casco vergoedt schade aan en diefstal van je eigen auto."),
 ("Op de bonus-malusladder zak je een paar treden. Wat is er gebeurd?", ["Je hebt een schade geclaimd", "Je hebt een jaar schadevrij gereden", "Je hebt een nieuwe auto gekocht", "Je hebt je premie te laat betaald"], "Na een claim krijg je minder korting."),
 ("De brutopremie is €1.000. De korting is 30%. Wat is de nettopremie?", ["€700", "€300", "€970", "€1.300"], "1.000 − (30 : 100) × 1.000 = €700."),
 ("Lars gaat naar de huisarts. Hij heeft dit jaar nog geen zorgkosten gehad. Wat betaalt hij voor het bezoek?", ["Niets", "Het hele eigen risico", "De helft van de rekening", "De hele rekening"], "Voor de huisarts geldt het eigen risico niet."),
 ("Een verzekeraar weigert iemand voor de basisverzekering omdat hij ziek is. Mag dat?", ["Nee, er geldt een acceptatieplicht", "Ja, bij een dure ziekte mag dat", "Ja, bij een laag inkomen mag dat", "Nee, alleen bij kinderen mag dat"], "Voor de basisverzekering moet de verzekeraar iedereen aannemen."),
 ("Naar wie gaat de assurantiebelasting?", ["Naar het Rijk", "Naar de verzekeraar", "Naar de gemeente", "Naar de polishouder"], "Het is een belasting van de overheid op verzekeringen."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Met een hoger eigen risico betaal je meer premie.", False),
   gf("Een WA-verzekering is verplicht voor elke auto.", True),
   gf("Een huurder heeft een opstalverzekering nodig.", False),
   gf("Malus betekent een toeslag op de premie.", True),
   gf("De basisverzekering voor zorg is verplicht.", True)],
   ["Met een hoger eigen risico wordt de premie lager.", "Het huis is van de verhuurder. De huurder verzekert alleen de inboedel."])]),
 opgave(2, "Welke verzekering?", [
   deel("", "Kies bij elke schade de verzekering die de schade vergoedt.", [keuze("Inbrekers stelen je spelcomputer uit huis", VERZ, 1), keuze("Je fietst per ongeluk een deuk in een geparkeerde auto", VERZ, 0), keuze("Je breekt je been en moet naar het ziekenhuis", VERZ, 5), keuze("Met je auto rijd je tegen de auto van een ander", VERZ, 3), keuze("Door kortsluiting brandt de keuken van je koophuis uit", VERZ, 2)], "Spullen in huis: inboedel. Schade aan anderen: AVP, met de auto de WA-verzekering. Zorgkosten: zorgverzekering. Het huis zelf: opstal."),
  ]),
 opgave(3, "De scooter van Tim", [
   deel("a", "Tel de premie en de poliskosten bij elkaar op.", [num(190, "Premie + poliskosten", "€", tol=0.005)], "184,00 + 6,00 = €190,00"),
   deel("b", "Bereken de assurantiebelasting.", [num(39.9, "Assurantiebelasting", "€", tol=0.005)], "(21 : 100) × 190 = €39,90"),
   deel("c", "Bereken de verzekeringskosten voor het eerste jaar.", [num(229.9, "Verzekeringskosten", "€", tol=0.005)], "(premie + poliskosten) + assurantiebelasting = 190,00 + 39,90 = €229,90"),
   deel("d", "Tim heeft een eigen risico van €75,00. Na een val is de schade aan de scooter van een ander €430,00. Bereken hoeveel de verzekeraar betaalt.", [num(355, "Uitkering", "€", tol=0.005)], "430 − 75 = €355,00"),
  ], tekst="Tim verzekert zijn scooter. De premie is €184,00 per jaar. De poliskosten zijn eenmalig €6,00. De assurantiebelasting is 21%."),
 opgave(4, "Brand bij familie Peters", [
   deel("a", "Bereken voor welk bedrag de familie onderverzekerd is.", [num(20000, "Onderverzekerd", "€", tol=0.005)], "80.000 − 60.000 = €20.000,00"),
   deel("b", "Bereken hoeveel de verzekeraar uitkeert.", [num(9000, "Uitkering", "€", tol=0.005)], "(verzekerd bedrag : werkelijke waarde) × schade = (60.000 : 80.000) × 12.000 = €9.000,00"),
   deel("c", "Bereken hoeveel de familie zelf moet betalen.", [num(3000, "Zelf betalen", "€", tol=0.005)], "12.000 − 9.000 = €3.000,00"),
   deel("d", "Leg uit wat indexering is en waarom het helpt tegen onderverzekering.", [open_("4d", "Leg uit wat indexering is en waarom het helpt tegen onderverzekering.", "Indexering", "Bij indexering gaat het verzekerde bedrag elk jaar automatisch mee omhoog met de prijzen. Zo blijft het verzekerde bedrag gelijk aan de waarde van je spullen.", ["het verzekerde bedrag stijgt (automatisch) mee met de prijzen", "daardoor blijft het verzekerde bedrag hoog genoeg"])], "Het verzekerde bedrag stijgt mee met de prijzen."),
  ], tekst="De inboedel van familie Peters is €80.000 waard. De familie is verzekerd voor €60.000. Door een brand is er €12.000 schade."),
 opgave(5, "De verzekeraar rekent", [
   deel("a", "Een verzekeraar heeft 12.500 klanten met een inboedelverzekering. In één jaar melden 350 klanten schade. Bereken de kans op schade.", [num(2.8, "Kans op schade", "%", tol=0.05)], "(aantal schades : aantal verzekerden) × 100 = (350 : 12.500) × 100 = 2,8%"),
   deel("b", "Een huis heeft een herbouwwaarde van €320.000. De premie van de opstalverzekering is 0,09% per jaar. Bereken de premie per jaar.", [num(288, "Premie", "€", tol=0.005)], "(percentage : 100) × verzekerd bedrag = (0,09 : 100) × 320.000 = €288,00"),
   deel("c", "In een wijk wordt vaker ingebroken dan in andere wijken. Wat betekent dat voor de premie van de inboedelverzekering in die wijk?", [keuze("De premie is daar", ["Hoger", "Lager", "Gelijk"], 0)], "Hoe groter de kans op schade, hoe hoger de premie."),
  ]),
 opgave(6, "De autoverzekering van Iris", [
   deel("a", "Bereken de korting van Iris in euro's.", [num(432, "Korting", "€", tol=0.005)], "Bij 5 schadevrije jaren hoort 45%. (45 : 100) × 960 = €432,00"),
   deel("b", "Bereken de nettopremie van Iris.", [num(528, "Nettopremie", "€", tol=0.005)], "brutopremie − korting = 960 − 432 = €528,00"),
   deel("c", "Iris claimt een schade. Daardoor valt zij terug naar 3 schadevrije jaren. Bereken haar nieuwe nettopremie.", [num(672, "Nieuwe nettopremie", "€", tol=0.005)], "Bij 3 jaar hoort 30%. 960 − (30 : 100) × 960 = €672,00"),
   deel("d", "Bereken hoeveel premie Iris door de claim per jaar meer betaalt.", [num(144, "Meer premie", "€", tol=0.005)], "672 − 528 = €144,00"),
   deel("e", "De schade was een kras van €120,00. Leg met de bedragen uit of Iris de schade beter zelf had kunnen betalen.", [open_("6e", "De schade was een kras van €120,00. Leg met de bedragen uit of Iris de schade beter zelf had kunnen betalen.", "Claimen of zelf betalen", "Ja. Zelf betalen kost €120. Door de claim betaalt zij €144 per jaar meer premie. Zelf betalen is dus goedkoper.", ["zelf betalen is goedkoper / zij had beter zelf kunnen betalen", "vergelijking van €120 schade met €144 meer premie"])], "€120 schade is minder dan €144 extra premie per jaar."),
  ], tekst="De brutopremie van de autoverzekering van Iris is €960,00 per jaar. Iris heeft 5 schadevrije jaren.",
  tabel=[["Schadevrije jaren", "Korting op de brutopremie"], ["2", "20%"], ["3", "30%"], ["4", "40%"], ["5", "45%"], ["6", "50%"]]),
 opgave(7, "De zorg van mevrouw Visser", [
   deel("a", "Kies bij elke zorg: basisverzekering of aanvullende verzekering.", [keuze("Een operatie in het ziekenhuis", ZORG, 0), keuze("Fysiotherapie", ZORG, 1), keuze("Een bezoek aan de huisarts", ZORG, 0), keuze("De tandarts", ZORG, 1)], "Huisarts, ziekenhuis en medicijnen zitten in de basisverzekering."),
   deel("b", "Dit jaar zijn de kosten van het ziekenhuis €1.240,00. Bereken hoeveel mevrouw Visser dit jaar zelf betaalt aan premie en eigen risico samen.", [num(2131, "Zelf betalen", "€", tol=0.005)], "(maandpremie × 12) + betaald eigen risico = (145,50 × 12) + 385 = 1.746 + 385 = €2.131,00"),
   deel("c", "Mevrouw Visser krijgt €96,00 zorgtoeslag per maand. Bereken hoeveel premie zij per maand zelf betaalt.", [num(49.5, "Per maand", "€", tol=0.005)], "145,50 − 96,00 = €49,50"),
   deel("d", "Leg uit wat solidariteit betekent bij de zorgverzekering.", [open_("7d", "Leg uit wat solidariteit betekent bij de zorgverzekering.", "Solidariteit", "Iedereen betaalt dezelfde premie voor de basisverzekering, ook wie weinig zorg nodig heeft. Gezonde mensen betalen zo mee voor mensen die ziek zijn.", ["iedereen betaalt (dezelfde) premie voor de basisverzekering", "gezonde mensen betalen mee voor zieke mensen"])], "Gezonde mensen betalen mee voor mensen die zorg nodig hebben."),
  ], tekst="Mevrouw Visser betaalt €145,50 premie per maand voor de basisverzekering. Haar eigen risico is €385,00 per jaar."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 4", min=60, mc="mc_a", open=None, rek="rek_a")))
