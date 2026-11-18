# Bron van toetsen.json. Draai: python3 -I economie/j2h6/bron/toetsen.py
# Oefentoets A bij jaar 2 mavo H6 "Wat doet de overheid?". Nieuw geschreven: zelfde stof als de leeromgeving, eigen situaties.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

LAAG = ["Gemeente", "Provincie", "Rijk"]
mc_a = mc(26, [
 ("Mila is 14 en wil haar eerste identiteitskaart. Waar vraagt zij die aan?", ["Bij de gemeente", "Bij de provincie", "Bij het Rijk", "Bij de regering"], "De gemeente regelt de zaken in je woonplaats."),
 ("Wie maakt wetten die in heel Nederland gelden?", ["De rijksoverheid", "De gemeenteraad", "De provincie", "De ambtenaren"], "Het Rijk bestuurt het hele land en maakt de wetten."),
 ("Een nieuwe weg tussen twee steden in dezelfde regio. Welke laag van de overheid is daar vooral verantwoordelijk voor?", ["De provincie", "De gemeente", "De regering", "De gemeenteraad"], "De provincie zorgt voor wegen en andere infrastructuur in de regio."),
 ("Wat is een voorbeeld van infrastructuur?", ["Een haven", "Een boete", "Een toeslag", "Een wet"], "Infrastructuur: voorzieningen voor vervoer en communicatie."),
 ("Welk voorbeeld hoort bij de particuliere sector?", ["Een bakker met een eigen winkel", "De gemeente waar je woont", "De provincie met haar bestuur", "Het Rijk met alle ministers"], "Burgers en bedrijven vormen de particuliere sector."),
 ("Wat is een voorbeeld van een collectieve voorziening?", ["Het elektriciteitsnet", "Een nieuwe telefoon", "Een eigen auto", "Een zak chips"], "De overheid levert en betaalt collectieve voorzieningen voor iedereen."),
 ("De opa van Finn is 70 jaar. Welke uitkering krijgt hij van de overheid?", ["AOW", "WW", "Btw", "Accijns"], "De AOW is de uitkering voor ouderen."),
 ("Waarmee worden de WW en de AOW betaald?", ["Met sociale premies", "Met accijns op tabak", "Met boetes van burgers", "Met winst van winkels"], "Sociale premies worden ingehouden op het brutoloon."),
 ("Welke belasting is een directe belasting?", ["Inkomstenbelasting", "Btw", "Accijns", "Omzetbelasting"], "Die betaal je rechtstreeks aan de overheid."),
 ("In de prijs van een liter benzine zit btw en nog een extra belasting. Hoe heet die extra belasting?", ["Accijns", "Subsidie", "Loonbelasting", "Sociale premie"], "Accijns zit op alcohol, brandstof en tabak."),
 ("De overheid verwacht meer uit te geven dan er binnenkomt. Hoe heet dat?", ["Een begrotingstekort", "Een begrotingsoverschot", "Een miljoenennota", "Een rijksbegroting"], "Uitgaven hoger dan inkomsten: een tekort."),
 ("Wat is de miljoenennota?", ["De toelichting bij de rijksbegroting", "De rekening van de Belastingdienst", "De lijst met alle soorten uitkeringen", "De wet over het hoge btw-tarief"], "In de miljoenennota legt de regering haar keuzes uit."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De overheid bestaat uit drie lagen: gemeente, provincie en Rijk.", True),
   gf("Een ambtenaar werkt bij een bedrijf dat winst wil maken.", False),
   gf("Btw is een indirecte belasting.", True),
   gf("Een boete is een belasting.", False),
   gf("Bij een begrotingsoverschot stijgt de staatsschuld.", False)],
   ["Een ambtenaar is in dienst van de overheid.", "Een boete hoort bij de niet-belastingontvangsten.", "De staatsschuld stijgt bij een tekort. Met een overschot kan de overheid schuld aflossen."])]),
 opgave(2, "Wie doet wat?", [
   deel("a", "Kies bij elke taak de juiste laag van de overheid.", [keuze("Het vuilnis ophalen", LAAG, 0), keuze("Wetten maken", LAAG, 2), keuze("Natuurbeheer", LAAG, 1), keuze("Een paspoort geven", LAAG, 0), keuze("Toezicht houden op gemeenten", LAAG, 1)],
        "Gemeente: zaken in je woonplaats. Provincie: zaken in de regio. Rijk: zaken voor het hele land."),
   deel("b", "Wat is een ambtenaar? Geef ook één voorbeeld.",
        [open_("2b", "Wat is een ambtenaar? Geef ook één voorbeeld.", "Ambtenaar", "Een ambtenaar is een werknemer in dienst van de overheid. Bijvoorbeeld iemand die bij de gemeente paspoorten maakt.", ["een werknemer in dienst van de overheid", "een juist voorbeeld"])],
        "Ambtenaren werken voor de gemeente, de provincie of het Rijk."),
   deel("c", "Leg uit wat het verschil is tussen de collectieve sector en de particuliere sector.",
        [open_("2c", "Leg uit wat het verschil is tussen de collectieve sector en de particuliere sector.", "Twee sectoren", "De collectieve sector is de overheid met de sociale zekerheid. De particuliere sector zijn de burgers en de bedrijven. Bedrijven willen winst maken.", ["collectief: de overheid (en de sociale zekerheid)", "particulier: burgers en bedrijven (bedrijven willen winst maken)"])],
        "Collectief: overheid en sociale zekerheid. Particulier: burgers en bedrijven."),
  ]),
 opgave(3, "De nieuwe sportschoenen", [
   deel("a", "Bereken het btw-bedrag.", [num(16.8, "Btw", "€")], "(percentage : 100) × prijs zonder btw = (21 : 100) × €80 = €16,80."),
   deel("b", "Bereken de consumentenprijs.", [num(96.8, "Consumentenprijs", "€")], "Consumentenprijs = prijs zonder btw + btw = €80 + €16,80 = €96,80."),
   deel("c", "Een trui kost in de winkel €60,50. Dat is inclusief 21% btw. Bereken de prijs zonder btw.", [num(50, "Prijs zonder btw", "€")], "(consumentenprijs : 121) × 100 = (€60,50 : 121) × 100 = €50,00."),
   deel("d", "Een zak aardappelen kost €2,00 zonder btw. Het btw-tarief is 9%. Bereken de consumentenprijs.", [num(2.18, "Consumentenprijs", "€")], "(9 : 100) × €2,00 = €0,18. €2,00 + €0,18 = €2,18."),
   deel("e", "Is btw een directe of een indirecte belasting? Leg uit.",
        [keuze("Btw is een", ["Indirecte belasting", "Directe belasting"], 0),
         open_("3e", "Leg uit waarom btw een indirecte belasting is.", "Btw", "De btw zit in de prijs. Je betaalt de btw aan de verkoper. De verkoper betaalt het door aan de overheid.", ["de btw zit in de prijs (je betaalt via de verkoper)"])],
        "Indirect: de belasting is in de prijs verwerkt."),
  ], tekst="Een paar sportschoenen kost €80 zonder btw. Het btw-tarief is 21%."),
 opgave(4, "Geld voor de overheid", [
   deel("a", "Kies bij elke belasting: direct of indirect.", [keuze("Accijns op tabak", ["Direct", "Indirect"], 1), keuze("Inkomstenbelasting", ["Direct", "Indirect"], 0), keuze("Vennootschapsbelasting", ["Direct", "Indirect"], 0)],
        "Direct: rechtstreeks aan de overheid. Indirect: in de prijs van een product."),
   deel("b", "Noem twee voorbeelden van uitkeringen of toeslagen uit de sociale zekerheid.",
        [open_("4b", "Noem twee voorbeelden van uitkeringen of toeslagen uit de sociale zekerheid.", "Sociale zekerheid", "Bijvoorbeeld: de WW, de AOW, een uitkering bij ziekte, huurtoeslag of zorgtoeslag.", ["een eerste juist voorbeeld (WW, AOW, ziekte, huurtoeslag, zorgtoeslag)", "een tweede juist voorbeeld"])],
        "De sociale zekerheid helpt mensen met geen of te weinig inkomen."),
   deel("c", "Wat is een subsidie? Waarom geeft de overheid subsidie?",
        [open_("4c", "Wat is een subsidie? Waarom geeft de overheid subsidie?", "Subsidie", "Een subsidie is een bijdrage in geld van de overheid. De overheid wil daarmee bepaald gedrag stimuleren.", ["een bijdrage in geld van de overheid", "om bepaald gedrag te stimuleren"])],
        "Met een subsidie maakt de overheid gewenst gedrag aantrekkelijker."),
  ]),
 opgave(5, "De begroting van Zuidland", [
   deel("a", "Bereken het saldo van de begroting in miljarden euro's. Typ een min-teken bij een tekort.", [num(-12, "Saldo (miljard euro)", "", tol=0.05)], "Saldo = inkomsten − uitgaven = 248 − 260 = −12 miljard euro."),
   deel("b", "Heeft Zuidland een tekort of een overschot?", [keuze("Zuidland heeft een", ["Begrotingstekort", "Begrotingsoverschot"], 0)], "Het saldo is negatief: de uitgaven zijn hoger dan de inkomsten."),
   deel("c", "Zuidland geeft 39 miljard euro uit aan onderwijs. Bereken hoeveel procent van de uitgaven dat is. Rond af op 1 decimaal.", [num(15, "Onderwijs", "%")], "(deel : geheel) × 100 = (39 : 260) × 100 = 15,0%."),
   deel("d", "Zuidland geeft 6,5 miljard euro uit aan wegen. Hoeveel miljoen euro is dat?", [num(6500, "Miljoen euro", "", tol=0.5)], "1 miljard = 1.000 miljoen. 6,5 × 1.000 = 6.500 miljoen euro."),
   deel("e", "Het gaat slecht met de economie van Zuidland. Leg uit waardoor het tekort dan groter wordt. Noem twee oorzaken.",
        [open_("5e", "Het gaat slecht met de economie van Zuidland. Leg uit waardoor het tekort dan groter wordt. Noem twee oorzaken.", "Slechte economie", "Er komt minder belasting binnen. En er zijn meer uitkeringen nodig, dus de uitgaven stijgen.", ["minder inkomsten uit belasting", "meer uitgaven aan uitkeringen"])],
        "Minder belasting en meer uitkeringen: het tekort groeit."),
   deel("f", "Wat gebeurt er met de staatsschuld van Zuidland? En wat kan de overheid doen om het tekort kleiner te maken? Noem één ding.",
        [open_("5f", "Wat gebeurt er met de staatsschuld van Zuidland? En wat kan de overheid doen om het tekort kleiner te maken? Noem één ding.", "Staatsschuld", "De staatsschuld stijgt. De overheid kan bezuinigen (minder uitgeven) of meer belasting innen.", ["de staatsschuld stijgt", "bezuinigen of de belasting verhogen"])],
        "Bij een tekort leent de overheid geld. De staatsschuld stijgt."),
  ], tekst="Zuidland is een verzonnen land. De overheid verwacht volgend jaar 248 miljard euro aan inkomsten en 260 miljard euro aan uitgaven."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 6", min=45, mc="mc_a", open=None, rek="rek_a")))
