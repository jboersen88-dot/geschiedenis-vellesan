# Bron van toetsen.json. Draai: python3 -I economie/j3h7/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

NIV = ["Rijk", "Provincie", "Gemeente"]
SEC = ["Collectieve sector", "Particuliere sector"]
mc_a = mc(71, [
 ("De minister van Financiën bedenkt een nieuwe belastingwet. Wie moet het voorstel als eerste goedkeuren?", ["De Tweede Kamer", "De gemeenteraad", "De Provinciale Staten", "Het waterschap"], "Daarna stemt de Eerste Kamer er nog over."),
 ("Wie controleert de Tweede Kamer?", ["De Eerste Kamer", "De gemeenteraad", "De burgemeester", "Het waterschap"], "De Eerste Kamer heeft 75 leden."),
 ("In jouw wijk komt een nieuw bestemmingsplan. Wie maakt dat?", ["De gemeente", "De provincie", "Het Rijk", "Het waterschap"], "De gemeente bepaalt waar wat gebouwd wordt."),
 ("Drie bedrijven spreken stiekem af dezelfde hoge prijs te vragen. Wie houdt daar toezicht op?", ["De ACM", "De SER", "Het CBS", "De ANWB"], "De ACM gaat kartelvorming tegen."),
 ("Waarom geeft de overheid subsidie op groene energie?", ["Om gewenst gedrag aan te moedigen", "Om meer belasting op te halen", "Om bedrijven te straffen", "Om de staatsschuld te verhogen"], "Subsidie is positieve beïnvloeding."),
 ("Noor neemt zelf ontslag. Krijgt zij WW?", ["Nee, het ontslag is haar eigen keuze", "Ja, twee maanden lang 75%", "Ja, maar alleen 70%", "Ja, zolang zij wil"], "WW is er voor ontslag buiten je schuld."),
 ("Ali is twee jaar ziek geweest en kan nog niet werken. Welke regeling volgt na de Ziektewet?", ["WIA", "WW", "AOW", "Anw"], "De Ziektewet duurt maximaal 2 jaar."),
 ("Uit welk geld wordt de bijstand betaald?", ["Algemeen belastinggeld", "Premies van werknemers", "Winst van bedrijven", "Leges van gemeenten"], "De bijstand is een sociale voorziening."),
 ("Waarom is er in de collectieve sector weinig marktwerking?", ["Er is weinig concurrentie", "Er is te veel winst", "Er zijn te veel bedrijven", "Er zijn geen ambtenaren"], "De overheid heeft bijna geen concurrenten."),
 ("Een gemeente verkoopt haar zwembad aan een bedrijf. Hoe heet dat?", ["Privatisering", "Nationalisering", "Subsidiëring", "Kartelvorming"], "Van de collectieve naar de particuliere sector."),
 ("Je koopt een spijkerbroek. Welke belasting betaal je via de winkel?", ["Btw", "Loonbelasting", "Ozb", "Leges"], "Btw is een indirecte belasting."),
 ("De overheid lost een deel van de staatsschuld af. Wat betekent dat voor de uitgaven?", ["Minder rentelasten", "Meer rentelasten", "Meer uitkeringen", "Minder subsidies"], "Over een kleinere schuld betaal je minder rente."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De regering bestaat uit de koning en de ministers.", True),
   gf("De Eerste Kamer heeft 150 leden.", False),
   gf("De AOW is een sociale voorziening.", False),
   gf("In de particuliere sector willen bedrijven winst maken.", True),
   gf("Accijns is een directe belasting.", False)],
   ["De Eerste Kamer heeft 75 leden, de Tweede Kamer 150.", "De AOW is een volksverzekering.", "Accijns is een indirecte belasting."])]),
 opgave(2, "Wie doet wat?", [
   deel("a", "Kies bij elke taak het juiste niveau van de overheid.", [keuze("Nieuwe wetten maken", NIV, 0), keuze("Paspoorten uitgeven", NIV, 2), keuze("Natuurbeheer", NIV, 1), keuze("Vuilnis ophalen", NIV, 2), keuze("Toezicht houden op gemeenten", NIV, 1)], "Rijk: wetten en veiligheid. Provincie: wegen, natuur, toezicht op gemeenten. Gemeente: vuilnis, paspoorten, trouwen."),
   deel("b", "Kies bij elk kenmerk de juiste sector.", [keuze("Geen winstoogmerk", SEC, 0), keuze("Veel concurrentie", SEC, 1), keuze("Veel baanzekerheid", SEC, 0), keuze("Makkelijker ontslag", SEC, 1)], "De collectieve sector maakt geen winst en heeft weinig concurrentie."),
  ]),
 opgave(3, "Ontslagen", [
   deel("a", "Bereken de WW-uitkering van Thomas in de eerste maand.", [num(2100, "WW maand 1", "€", tol=0.5)], "(75 : 100) × 2.800 = €2.100"),
   deel("b", "Bereken de WW-uitkering van Thomas in de vierde maand.", [num(1960, "WW maand 4", "€", tol=0.5)], "(70 : 100) × 2.800 = €1.960"),
   deel("c", "Hoeveel maanden heeft Thomas recht op WW?", [num(8, "Aantal maanden", "", tol=0.1)], "Elk gewerkt jaar geeft 1 maand WW: 8 jaar = 8 maanden."),
   deel("d", "Na die maanden heeft Thomas nog geen werk. Welke uitkering kan hij dan krijgen, en waaruit wordt die betaald?", [open_("3d", "Na die maanden heeft Thomas nog geen werk. Welke uitkering kan hij dan krijgen, en waaruit wordt die betaald?", "Na de WW", "De bijstand. Die wordt betaald uit het algemene belastinggeld.", ["bijstand", "betaald uit belastinggeld"])], "Na de WW volgt de bijstand, een sociale voorziening."),
  ], tekst="Thomas heeft 8 jaar gewerkt. Hij verdiende €2.800 bruto per maand. Hij wordt buiten zijn schuld ontslagen. De eerste twee maanden is de WW 75% van het brutoloon, daarna 70%."),
 opgave(4, "Aan de pomp", [
   deel("a", "Bereken hoeveel euro belasting er in een liter benzine zit.", [num(1.1, "Belasting per liter", "€", tol=0.005)], "Accijns + btw = 0,78 + 0,32 = €1,10"),
   deel("b", "Bereken hoeveel procent van de literprijs belasting is. Rond af op 1 decimaal.", [num(59.5, "Belasting", "%")], "(deel : geheel) × 100 = (1,10 : 1,85) × 100 = 59,5%"),
   deel("c", "Is de belasting op benzine een directe of een indirecte belasting? Leg uit.", [keuze("De belasting is", ["Direct", "Indirect"], 1), open_("4c", "Is de belasting op benzine een directe of een indirecte belasting? Leg uit.", "Uitleg", "Indirect: je betaalt de belasting via de pomphouder. De pomphouder brengt de belasting naar de overheid.", ["je betaalt via de pomphouder, die de belasting afdraagt aan de overheid"])], "Je betaalt haar bij de aankoop, via het bedrijf."),
   deel("d", "Bij welk beginsel past accijns op benzine?", [keuze("Accijns op benzine", ["Draagkrachtbeginsel", "Profijtbeginsel"], 1)], "Je betaalt omdat je de wegen gebruikt."),
  ], tekst="Een liter benzine kost €1,85. Daarin zit €0,55 kale prijs, €0,20 voor de pomphouder, €0,78 accijns en €0,32 btw."),
 opgave(5, "De begroting van het Rijk", [
   deel("a", "Bereken het begrotingssaldo in miljard euro. Typ een min-teken bij een tekort.", [num(-23, "Saldo (miljard euro)", tol=0.5)], "Inkomsten − uitgaven = 395 − 418 = −23: een tekort van €23 miljard."),
   deel("b", "Leg uit wat dit saldo betekent voor de staatsschuld en voor de rentelasten.", [open_("5b", "Leg uit wat dit saldo betekent voor de staatsschuld en voor de rentelasten.", "Gevolgen van het tekort", "Bij een tekort moet de overheid lenen, dus de staatsschuld loopt op. Over een hogere schuld betaalt de overheid meer rente.", ["de staatsschuld loopt op", "de rentelasten worden hoger"])], "Tekort → lenen → hogere schuld → meer rente."),
  ], tekst="Het Rijk heeft €395 miljard aan inkomsten en €418 miljard aan uitgaven."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 7", min=45, mc="mc_a", open=None, rek="rek_a")))
