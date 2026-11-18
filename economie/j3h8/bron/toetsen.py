# Bron van toetsen.json. Draai: python3 -I economie/j3h8/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
# De landen en bedragen zijn verzonnen voor de som.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

HANDEL = ["Import", "Export", "Wederuitvoer"]
PROT = ["Importheffing", "Contingentering", "Invoerverbod", "Exportsubsidie"]
VRIJ = ["Goederen en diensten", "Personen", "Kapitaal"]
HULP = ["Noodhulp", "Structurele hulp"]
mc_a = mc(38, [
 ("Een Nederlandse kweker verkoopt paprika's aan supermarkten in Duitsland. Wat is dat voor Nederland?", ["Export", "Import", "Wederuitvoer", "Protectie"], "Verkopen aan het buitenland."),
 ("Waarom is veel export goed voor de overheid?", ["De overheid krijgt meer belasting", "De overheid krijgt meer invoerrechten", "De overheid hoeft minder te importeren", "De overheid mag de prijzen bepalen"], "Meer productie en winst leveren meer belasting op."),
 ("Telefoons uit Azië komen aan in Rotterdam en gaan meteen door naar Polen. Hoe heet dat?", ["Wederuitvoer", "Contingentering", "Vrijhandel", "Globalisering"], "Invoeren en bijna onbewerkt weer uitvoeren."),
 ("Een land heeft een hoge exportquote en een hoge importquote. Wat voor economie is dat?", ["Een open economie", "Een gesloten economie", "Een arme economie", "Een eenzijdige economie"], "Veel handel met het buitenland."),
 ("Een land zet een maximum op de invoer van staal. Welke maatregel is dat?", ["Contingentering", "Importheffing", "Exportsubsidie", "Invoerverbod"], "Er mag maar een maximale hoeveelheid binnenkomen."),
 ("Wat is het doel van protectiemaatregelen?", ["De eigen bedrijven beschermen", "De consument lagere prijzen geven", "De vrijhandel in de wereld vergroten", "De export van andere landen helpen"], "Buitenlandse concurrentie wordt moeilijker gemaakt."),
 ("Welke organisatie wil dat landen vrij met elkaar kunnen handelen?", ["De WTO", "De ECB", "De EMU", "Het UWV"], "De Wereldhandelsorganisatie."),
 ("Kleding wordt gemaakt in landen waar dat goedkoop kan. Machines worden gemaakt in landen met veel kennis. Hoe heet dat?", ["Internationale arbeidsverdeling", "Internationale concurrentiepositie", "Economische en Monetaire Unie", "Maatschappelijk verantwoord ondernemen"], "Elk land maakt waar het het beste in is."),
 ("Een Belgische student gaat in Nederland wonen en werken. Welk vrij verkeer is dat?", ["Personen", "Kapitaal", "Goederen", "Diensten"], "In elk EU-land mag je wonen en werken."),
 ("Welke instelling bepaalt de rente in de eurolanden?", ["De ECB", "De WTO", "De EU", "De EMU"], "De Europese Centrale Bank."),
 ("Een land verdient bijna al zijn geld met de export van koffie. Hoe heet dat?", ["Monocultuur", "Wederuitvoer", "Vrijhandel", "Contingentering"], "Het land is afhankelijk van één product."),
 ("Na een overstroming sturen landen tenten en schoon drinkwater. Welke hulp is dat?", ["Noodhulp", "Structurele hulp", "Gebonden hulp", "Fairtrade"], "Snelle hulp om te overleven."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Import is het verkopen van producten aan het buitenland.", False),
   gf("Wederuitvoer levert weinig toegevoegde waarde op.", True),
   gf("Een importheffing maakt buitenlandse producten duurder.", True),
   gf("Alle landen van de EU betalen met de euro.", False),
   gf("Structurele hulp is bedoeld voor de lange termijn.", True)],
   ["Import is kopen uit het buitenland. Verkopen aan het buitenland is export.", "Alleen de landen van de EMU hebben de euro."])]),
 opgave(2, "Import, export of wederuitvoer?", [
   deel("", "Kies bij elk voorbeeld wat het voor Nederland is.", [keuze("Een supermarkt koopt sinaasappels in Spanje", HANDEL, 0), keuze("Een fabriek in Eindhoven verkoopt machines aan Japan", HANDEL, 1), keuze("Schoenen uit Vietnam gaan via Rotterdam door naar Duitsland", HANDEL, 2), keuze("Een garage koopt auto's in Frankrijk", HANDEL, 0)], "Import: kopen uit het buitenland. Export: verkopen aan het buitenland. Wederuitvoer: invoeren en weer doorvoeren."),
  ]),
 opgave(3, "De handel van Noordland", [
   deel("a", "Bereken de exportquote van Noordland.", [num(70, "Exportquote", "%", tol=0.05)], "(export : nationaal inkomen) × 100 = (630 : 900) × 100 = 70,0%"),
   deel("b", "Bereken de importquote van Noordland.", [num(60, "Importquote", "%", tol=0.05)], "(import : nationaal inkomen) × 100 = (540 : 900) × 100 = 60,0%"),
   deel("c", "Bereken het handelssaldo van Noordland, in miljard euro.", [num(90, "Handelssaldo", "miljard euro", tol=0.5)], "export − import = 630 − 540 = 90 miljard euro. De export is groter: een overschot."),
   deel("d", "Heeft Noordland een open of een gesloten economie?", [keuze("Noordland heeft", ["Een open economie", "Een gesloten economie"], 0)], "De export- en importquote zijn hoog."),
   deel("e", "Noem twee redenen waarom een land producten importeert.", [open_("3e", "Noem twee redenen waarom een land producten importeert.", "Redenen voor import", "Het klimaat is niet geschikt om het product zelf te maken. In het buitenland kan het goedkoper worden gemaakt. Of: consumenten krijgen een ruimere keuze.", ["eerste juiste reden (klimaat niet geschikt / goedkopere productie in het buitenland / ruimere keuze)", "tweede juiste reden"])], "Klimaat, goedkopere productie in het buitenland of een ruimere keuze."),
  ], tekst="Het nationaal inkomen van Noordland is €900 miljard. De export is €630 miljard. De import is €540 miljard."),
 opgave(4, "Bescherming van eigen bedrijven", [
   deel("a", "Kies bij elk voorbeeld de protectiemaatregel.", [keuze("Op kaas van buiten de EU komt 12% belasting", PROT, 0), keuze("Er mag hoogstens 20.000 ton rijst per jaar het land in", PROT, 1), keuze("Speelgoed met gevaarlijke stoffen mag het land niet in", PROT, 2), keuze("Boeren krijgen geld voor elke ton graan die zij uitvoeren", PROT, 3)], "Importheffing: belasting. Contingentering: een maximum. Invoerverbod: helemaal niet. Exportsubsidie: geld voor export."),
   deel("b", "Een e-bike van buiten de EU kost €1.200,00. De importheffing is 6%. Bereken de importheffing in euro's.", [num(72, "Importheffing", "€", tol=0.005)], "(percentage : 100) × prijs = (6 : 100) × 1.200 = €72,00"),
   deel("c", "Bereken de prijs van de e-bike met de importheffing.", [num(1272, "Prijs met heffing", "€", tol=0.005)], "1.200 + 72 = €1.272,00"),
   deel("d", "Leg uit wat het nadeel van een importheffing is voor de consument.", [open_("4d", "Leg uit wat het nadeel van een importheffing is voor de consument.", "Nadeel van protectie", "Producten uit het buitenland worden duurder. De consument betaalt dus meer, of heeft minder keuze.", ["producten uit het buitenland worden duurder / de consument betaalt meer (of heeft minder keuze)"])], "De consument betaalt een hogere prijs."),
  ]),
 opgave(5, "De Europese Unie", [
   deel("a", "Kies bij elk voorbeeld het soort vrij verkeer.", [keuze("Een Nederlandse bakker verkoopt brood in België zonder invoerrechten", VRIJ, 0), keuze("Een Spaanse verpleegkundige gaat in Nederland werken", VRIJ, 1), keuze("Je opent een spaarrekening bij een bank in Duitsland", VRIJ, 2), keuze("Een Poolse aannemer bouwt een huis in Nederland", VRIJ, 0)], "Handel en bouwen: goederen en diensten. Wonen en werken: personen. Sparen en investeren: kapitaal."),
   deel("b", "Noem twee voordelen van de euro.", [open_("5b", "Noem twee voordelen van de euro.", "De euro", "Je hoeft geen geld te wisselen als je naar een ander euroland gaat of ermee handelt. Je kunt de prijzen in verschillende landen makkelijk vergelijken.", ["geen geld wisselen / geen wisselkosten", "prijzen makkelijk vergelijken / makkelijker handelen"])], "Geen geld wisselen en prijzen makkelijk vergelijken."),
   deel("c", "De ECB verhoogt de rente. Wat doen consumenten dan meestal?", [keuze("Consumenten gaan", ["Meer sparen en minder lenen", "Meer lenen en minder sparen"], 0)], "Sparen levert meer op en lenen wordt duurder."),
  ]),
 opgave(6, "Arm en rijk", [
   deel("a", "Bereken het inkomen per hoofd van de bevolking in Zuidland.", [num(4000, "Zuidland", "€", tol=0.5)], "nationaal inkomen : aantal inwoners = 48.000.000.000 : 12.000.000 = €4.000"),
   deel("b", "Bereken het inkomen per hoofd van de bevolking in Westland.", [num(45000, "Westland", "€", tol=0.5)], "900.000.000.000 : 20.000.000 = €45.000"),
   deel("c", "Kies bij elk voorbeeld het soort hulp.", [keuze("Voedselpakketten na een aardbeving", HULP, 0), keuze("Geld om leraren op te leiden", HULP, 1), keuze("Een nieuwe weg naar de haven", HULP, 1), keuze("Medicijnen bij een uitbraak van een ziekte", HULP, 0)], "Noodhulp is snelle hulp om te overleven. Structurele hulp is voor de lange termijn."),
   deel("d", "In Zuidland gaan veel kinderen niet naar school. Leg uit hoe dat ervoor zorgt dat het land arm blijft.", [open_("6d", "In Zuidland gaan veel kinderen niet naar school. Leg uit hoe dat ervoor zorgt dat het land arm blijft.", "De vicieuze cirkel", "Zonder onderwijs kunnen mensen alleen ongeschoold werk doen. Daarmee verdienen ze weinig. Door de armoede kunnen hun kinderen ook niet naar school. Zo blijft het doorgaan.", ["zonder onderwijs alleen ongeschoold werk / een laag loon", "door de armoede is er weer geen geld voor onderwijs: het blijft doorgaan (vicieuze cirkel)"])], "Geen onderwijs, laag loon, armoede, weer geen onderwijs."),
  ], tekst="Zuidland heeft een nationaal inkomen van €48 miljard en 12 miljoen inwoners. Westland heeft een nationaal inkomen van €900 miljard en 20 miljoen inwoners."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 8", min=50, mc="mc_a", open=None, rek="rek_a")))
