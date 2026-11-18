# Bron van toetsen.json. Draai: python3 -I economie/j3h1/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

BEH = ["Primaire behoefte", "Secundaire behoefte"]
PS = ["Product", "Prijs", "Plaats", "Promotie", "Personeel", "Presentatie"]
RECL = ["Informatieve reclame", "Merkreclame", "Ideële reclame"]
UITG = ["Dagelijkse uitgave", "Vaste last", "Incidentele uitgave"]
INK = ["Inkomen uit arbeid", "Inkomen uit bezit", "Overdrachtsinkomen"]
mc_a = mc(31, [
 ("Na de training koopt Bram een flesje water en een nieuw voetbalshirt van zijn club. Wat klopt?", ["Alleen het water is een primaire behoefte", "Alleen het shirt is een primaire behoefte", "Beide zijn een primaire behoefte", "Beide zijn een secundaire behoefte"], "Drinken heb je nodig om te leven. Een clubshirt is luxe."),
 ("Regenwater dat op je hoofd valt, is een vrij goed. Waarom?", ["Er zijn geen middelen voor nodig", "Er is heel veel van in Nederland", "Het is voor iedereen heel gezond", "Je mag het niet verkopen"], "Het is er vanzelf: niemand hoeft er iets voor te doen."),
 ("Een schilderij van een beroemde schilder is er maar één keer. Hoe noem je dat?", ["Zeldzaam", "Vrij", "Primair", "Ideëel"], "Er is weinig van: zeldzaam. Het is ook schaars, want er zijn middelen voor gebruikt."),
 ("Familie Smit krijgt een hoger inkomen. De prijzen blijven gelijk. Wat gebeurt er met hun welvaart?", ["Die stijgt", "Die daalt", "Die blijft gelijk", "Die verdwijnt"], "Zij kunnen in meer behoeften voorzien."),
 ("Zoë bestelt een trui omdat een bekende vlogger er geld voor krijgt om hem te dragen. Wat is dit?", ["Commerciële beïnvloeding", "Sociale beïnvloeding", "Ideële reclame", "Inkomen in natura"], "Een bedrijf betaalt de vlogger om meer te verkopen."),
 ("Een supermarkt verkoopt cola met de eigen naam erop. Hoe heet zo'n merk?", ["Een huismerk", "Een A-merk", "Een B-merk", "Een keurmerk"], "Het eigen merk van de winkel."),
 ("Een winkel neemt alleen verkopers aan die alles van laptops weten. Welke P is dat?", ["Personeel", "Presentatie", "Promotie", "Product"], "Het gaat om de mensen die er werken."),
 ("De huur, de zorgverzekering en het abonnement op de sportschool. Wat zijn dit?", ["Vaste lasten", "Dagelijkse uitgaven", "Incidentele uitgaven", "Overdrachtsinkomens"], "Ze komen op een vast moment terug."),
 ("Opa krijgt elke maand AOW. Welk inkomen is dat?", ["Overdrachtsinkomen", "Inkomen uit arbeid", "Inkomen uit bezit", "Inkomen in natura"], "Hij hoeft er nu niets voor terug te doen."),
 ("Waarom reserveer je geld?", ["Voor grote of onverwachte uitgaven", "Voor de dagelijkse boodschappen", "Om meer belasting te betalen", "Om minder loon te krijgen"], "Bijvoorbeeld voor een reparatie of een doel."),
 ("De prijzen dalen een jaar lang gemiddeld. Hoe heet dat?", ["Deflatie", "Inflatie", "Koopkracht", "Schaarste"], "Deflatie is het tegenovergestelde van inflatie."),
 ("Het indexcijfer van de huur is 107. Wat betekent dat?", ["De huur is 7% hoger dan in het basisjaar", "De huur is €7 hoger dan in het basisjaar", "De huur is 107% hoger dan in het basisjaar", "De huur is 7% lager dan in het basisjaar"], "107 − 100 = 7% stijging."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een schaars goed is altijd zeldzaam.", False),
   gf("Zonlicht is een vrij goed.", True),
   gf("Ideële reclame is bedoeld om winst te maken.", False),
   gf("Zakgeld is een overdrachtsinkomen.", True),
   gf("Bij inflatie kun je met hetzelfde geld meer kopen.", False)],
   ["Schaars betekent dat er middelen voor nodig zijn. Brood is schaars, maar niet zeldzaam.", "Ideële reclame wil het gedrag van mensen verbeteren.", "Bij inflatie stijgen de prijzen: je kunt minder kopen."])]),
 opgave(2, "Behoeften en schaarste", [
   deel("a", "Kies bij elk voorbeeld de juiste soort behoefte.", [keuze("Een warme maaltijd", BEH, 0), keuze("Een kaartje voor een concert", BEH, 1), keuze("Een slaapplek", BEH, 0), keuze("Een smartwatch", BEH, 1)], "Primair: nodig om te leven. Secundair: luxe."),
   deel("b", "Een fiets is schaars, maar niet zeldzaam. Leg uit waarom een fiets schaars is en waarom een fiets niet zeldzaam is.", [open_("2b", "Een fiets is schaars, maar niet zeldzaam. Leg uit waarom een fiets schaars is en waarom een fiets niet zeldzaam is.", "Schaars en zeldzaam", "Een fiets is schaars, want er zijn middelen nodig om hem te maken (werk, machines, materiaal). Een fiets is niet zeldzaam, want er zijn er heel veel van.", ["schaars: er zijn middelen nodig om een fiets te maken", "niet zeldzaam: er zijn veel fietsen"])], "Schaars zegt iets over de middelen die nodig zijn. Zeldzaam zegt iets over de hoeveelheid."),
  ]),
 opgave(3, "Een nieuwe sportwinkel", [
   deel("a", "Kies bij elke keuze van de eigenaar de juiste P van de marketingmix.", [keuze("De winkel komt naast het station", PS, 2), keuze("De winkel deelt flyers uit op het schoolplein", PS, 3), keuze("De winkel verkoopt alleen bekende merken", PS, 0), keuze("De winkel is altijd iets goedkoper dan de rest", PS, 1)], "Plaats: waar. Promotie: aandacht trekken. Product: wat. Prijs: hoe duur."),
   deel("b", "Kies bij elke reclame de juiste soort.", [keuze("Een poster met alleen het logo van een schoenenmerk", RECL, 1), keuze("Een folder met de maten en prijzen van voetbalschoenen", RECL, 0), keuze("Een spotje dat je oproept om meer te bewegen", RECL, 2)], "Merkreclame: naamsbekendheid. Informatief: eigenschappen en prijs. Ideëel: beter gedrag."),
   deel("c", "De winkel richt zich op jongeren. Geef twee redenen waarom jongeren een interessante doelgroep zijn.", [open_("3c", "De winkel richt zich op jongeren. Geef twee redenen waarom jongeren een interessante doelgroep zijn.", "Jongeren als doelgroep", "Jongeren zijn makkelijk te beïnvloeden. Zij hebben geld te besteden. Wie jong een merk kiest, blijft dat merk vaak kopen. Zij willen graag nieuwe dingen.", ["eerste goede reden (bijvoorbeeld: makkelijk te beïnvloeden of geld te besteden)", "tweede goede reden (bijvoorbeeld: blijven een merk lang trouw of willen nieuwe dingen)"])], "Makkelijk te beïnvloeden, geld te besteden, lang trouw aan een merk, gek op nieuwe dingen."),
  ], tekst="In het centrum opent een nieuwe sportwinkel. De eigenaar denkt na over de marketingmix."),
 opgave(4, "Opruiming", [
   deel("a", "Bereken hoeveel euro korting je krijgt op de hardloopschoenen.", [num(42, "Korting", "€", tol=0.005)], "(35 : 100) × 120 = €42,00"),
   deel("b", "Bereken de prijs van de hardloopschoenen na de korting.", [num(78, "Nieuwe prijs", "€", tol=0.005)], "120 − 42 = €78,00"),
   deel("c", "Een trainingspak kostte €80,00. Je krijgt €20,00 korting. Bereken hoeveel procent korting dat is.", [num(25, "Korting", "%", tol=0.05)], "(deel : geheel) × 100 = (20 : 80) × 100 = 25,0%"),
  ], tekst="De sportwinkel houdt opruiming. Hardloopschoenen van €120,00 krijgen 35% korting."),
 opgave(5, "De begroting van familie De Vries", [
   deel("a", "Bereken het totaal van de inkomsten.", [num(2430, "Inkomsten", "€", tol=0.005)], "2.150,00 + 95,50 + 184,50 = €2.430,00"),
   deel("b", "Bereken het totaal van de uitgaven.", [num(1874.5, "Uitgaven", "€", tol=0.005)], "765,00 + 185,00 + 520,00 + 210,00 + 74,50 + 120,00 = €1.874,50"),
   deel("c", "Bereken hoeveel de familie per maand kan reserveren.", [num(555.5, "Reserveren", "€", tol=0.005)], "Inkomsten − uitgaven = 2.430,00 − 1.874,50 = €555,50"),
   deel("d", "Kies bij elke uitgave de juiste soort.", [keuze("Huur", UITG, 1), keuze("Boodschappen", UITG, 0), keuze("De koelkast gaat stuk: een nieuwe kopen", UITG, 2)], "Huur komt vast terug. Boodschappen doe je steeds. Een nieuwe koelkast is onverwacht."),
   deel("e", "Kies bij elk inkomen de juiste soort.", [keuze("Loon", INK, 0), keuze("Kinderbijslag", INK, 2)], "Loon is een beloning voor werk. Voor kinderbijslag lever je geen tegenprestatie."),
  ], tekst="Dit is de begroting van familie De Vries voor één maand.",
  tabel=[["Inkomsten", "", "Uitgaven", ""], ["Loon", "€2.150,00", "Huur", "€765,00"], ["Kinderbijslag", "€95,50", "Energie en water", "€185,00"], ["Huurtoeslag", "€184,50", "Boodschappen", "€520,00"], ["", "", "Verzekeringen", "€210,00"], ["", "", "Abonnementen", "€74,50"], ["", "", "Kleding", "€120,00"]]),
 opgave(6, "De bijbaan van Sanne", [
   deel("a", "Bereken hoeveel Sanne per maand verdient.", [num(227.5, "Per maand", "€", tol=0.005)], "(weekbedrag × 52) : 12 = (52,50 × 52) : 12 = €227,50"),
   deel("b", "Sanne wil over 2 jaar een scooter van €1.850,00 kopen. Zij heeft al €650,00 gespaard. Bereken hoeveel zij per maand moet reserveren.", [num(50, "Per maand", "€", tol=0.005)], "2 jaar = 24 maanden. (1.850 − 650) : 24 = €50,00"),
   deel("c", "De broer van Sanne verdient €240,00 per maand. Bereken hoeveel hij per week verdient.", [num(55.38, "Per week", "€", tol=0.01)], "(maandbedrag × 12) : 52 = (240 × 12) : 52 = €55,38"),
  ], tekst="Sanne werkt bij een bakker. Zij verdient €52,50 per week."),
 opgave(7, "Prijzen en koopkracht", [
   deel("a", "Bereken het indexcijfer van de prijs in jaar 3.", [num(115, "Indexcijfer jaar 3", "", tol=0.05)], "(nieuw getal : getal basisjaar) × 100 = (9,20 : 8,00) × 100 = 115,0"),
   deel("b", "Bereken het indexcijfer van de prijs in jaar 5.", [num(122.5, "Indexcijfer jaar 5", "", tol=0.05)], "(9,80 : 8,00) × 100 = 122,5"),
   deel("c", "Bereken met hoeveel procent de prijs is gestegen van jaar 3 naar jaar 5.", [num(6.5, "Stijging", "%", tol=0.05)], "(nieuw − oud) : oud × 100 = (9,80 − 9,20) : 9,20 × 100 = 6,5%"),
   deel("d", "Een bioscoopkaartje kostte in het basisjaar €11,00. Het indexcijfer is nu 108. Bereken de prijs van nu.", [num(11.88, "Prijs nu", "€", tol=0.005)], "(indexcijfer : 100) × bedrag basisjaar = (108 : 100) × 11,00 = €11,88"),
   deel("e", "Het loon van Kees stijgt met 3%. De prijzen stijgen met 5%. Leg uit wat er gebeurt met de koopkracht van Kees.", [open_("7e", "Het loon van Kees stijgt met 3%. De prijzen stijgen met 5%. Leg uit wat er gebeurt met de koopkracht van Kees.", "Koopkracht", "De koopkracht van Kees daalt. De prijzen stijgen harder dan zijn loon, dus hij kan minder kopen.", ["de koopkracht daalt", "de prijzen stijgen harder dan het loon"])], "De prijzen stijgen harder dan het loon: Kees kan minder kopen."),
  ], tekst="De tabel laat de prijs van een pizza bij dezelfde pizzeria zien. Jaar 1 is het basisjaar.",
  tabel=[["Jaar", "Prijs van een pizza"], ["Jaar 1 (basisjaar)", "€8,00"], ["Jaar 3", "€9,20"], ["Jaar 5", "€9,80"]]),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 1", min=60, mc="mc_a", open=None, rek="rek_a")))
