# Bron van toetsen.json. Draai: python3 -I economie/j4h3/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

PF = ["Natuur", "Arbeid", "Kapitaal", "Ondernemerschap"]
KOST = ["Vaste kosten", "Variabele kosten"]
mc_a = mc(31, [
 ("Een meubelmaker koopt hout voor €80 en verkoopt de tafel voor €300. Hoe heet het verschil van €220?", ["Toegevoegde waarde", "Brutowinstopslag", "Nettoresultaat", "Consumentenprijs"], "De extra waarde die ontstaat door het hout te bewerken."),
 ("Welke beloning hoort bij de productiefactor natuur?", ["Pacht", "Loon", "Rente", "Winst"], "Natuur: pacht. Arbeid: loon. Kapitaal: huur en rente. Ondernemerschap: winst."),
 ("Een bakker bakt deze maand twee keer zoveel brood. Welke kosten stijgen mee?", ["De kosten van meel", "De huur van de winkel", "De rente op de lening", "De verzekering"], "Meel is een variabele kost: meer productie, meer kosten."),
 ("Hoe heet het aantal producten dat een bedrijf verkoopt?", ["De afzet", "De omzet", "De winst", "De marge"], "Afzet is een aantal. Omzet is een bedrag."),
 ("Een bedrijf geeft werknemers een bonus als ze meer produceren. Wat wil het bedrijf verhogen?", ["De arbeidsproductiviteit", "De productiecapaciteit", "De brutowinstopslag", "De maatschappelijke kosten"], "Prestatiebeloning kan de productie per werknemer verhogen."),
 ("Waar staan de drie P's van maatschappelijk verantwoord ondernemen voor?", ["People, planet, profit", "Prijs, product, plaats", "Pacht, premie, productie", "Personeel, promotie, prijs"], "Rekening houden met mensen, het milieu en de winst."),
 ("De oogst van aardappelen mislukt. Wat gebeurt er op de markt voor aardappelen?", ["Het aanbod daalt en de prijs stijgt", "Het aanbod stijgt en de prijs daalt", "De vraag daalt en de prijs daalt", "De vraag stijgt en de prijs daalt"], "Minder aanbod: de aanbodlijn schuift naar links en de prijs stijgt."),
 ("De overheid stelt een maximumprijs in onder de evenwichtsprijs. Wat is het gevolg?", ["Een tekort", "Een overschot", "Een kartel", "Een fusie"], "Bij een lagere prijs is de vraag groter dan het aanbod."),
 ("Op een markt zijn veel aanbieders. Hun producten lijken op elkaar, maar verschillen in merk en smaak. Welke marktvorm is dit?", ["Monopolistische concurrentie", "Volkomen concurrentie", "Oligopolie", "Monopolie"], "Veel aanbieders met heterogene producten."),
 ("Vier bedrijven spreken stiekem af om dezelfde hoge prijs te vragen. Hoe heet zo'n afspraak?", ["Een kartel", "Een fusie", "Een monopolie", "Een aanbesteding"], "Een kartel is verboden. De ACM kan boetes geven."),
 ("Wat is een voordeel van een fusie voor de bedrijven?", ["Ze besparen op de vaste kosten", "Ze betalen geen btw meer", "Ze krijgen meer concurrenten", "Ze hoeven niet meer af te schrijven"], "Samen heb je bijvoorbeeld maar één kantoor en één directie nodig."),
 ("Wanneer is een markt transparant?", ["Als je prijzen en producten goed kunt vergelijken", "Als er maar één aanbieder van het product is", "Als de overheid de prijs van het product bepaalt", "Als alle aanbieders precies dezelfde prijs vragen"], "Transparant betekent doorzichtig: je kunt alles vergelijken."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De consumentenprijs is de verkoopprijs inclusief btw.", True),
   gf("Vaste kosten stijgen als een bedrijf meer produceert.", False),
   gf("Brutowinst is omzet min inkoopwaarde.", True),
   gf("Bij een monopolie zijn er veel aanbieders.", False),
   gf("Een minimumprijs beschermt de producenten.", True)],
   ["Vaste kosten veranderen niet meteen als de productie verandert.", "Bij een monopolie is er maar één aanbieder."])]),
 opgave(2, "De fietsenwinkel van Sanne", [
   deel("a", "Kies bij elk voorbeeld de juiste productiefactor.", [keuze("De monteur in de werkplaats", PF, 1), keuze("De kassa en het gereedschap", PF, 2), keuze("Sanne bedenkt een nieuwe actie", PF, 3), keuze("De grond onder de winkel", PF, 0)],
        "Mensen: arbeid. Hulpmiddelen: kapitaal. Leiden en organiseren: ondernemerschap. Grond: natuur."),
   deel("b", "Kies bij elke kostenpost de juiste soort.", [keuze("Huur van het pand", KOST, 0), keuze("Inkoop van fietsbanden", KOST, 1), keuze("Afschrijving op de kassa", KOST, 0)],
        "Huur en afschrijving blijven gelijk. De inkoop hangt af van de verkoop."),
   deel("c", "Sanne koopt een bestelbus van €28.000. Na 6 jaar is de restwaarde €4.000. Bereken de afschrijving per jaar.", [num(4000.00, "Afschrijving per jaar", "€")], "(aanschafprijs − restwaarde) : aantal gebruiksjaren = (28.000 − 4.000) : 6 = €4.000,00."),
  ]),
 opgave(3, "Van inkoopprijs naar consumentenprijs", [
   deel("a", "Bereken de verkoopprijs van de fietshelm (exclusief btw).", [num(35.00, "Verkoopprijs", "€")], "(inkoopprijs : 100) × (100 + opslag) = (20 : 100) × 175 = €35,00."),
   deel("b", "Bereken de consumentenprijs (inclusief 21% btw).", [num(42.35, "Consumentenprijs", "€")], "(verkoopprijs : 100) × (100 + btw) = (35 : 100) × 121 = €42,35."),
   deel("c", "Een fietstas kost in de winkel €60,50 inclusief 21% btw. Bereken de prijs exclusief btw.", [num(50.00, "Prijs exclusief btw", "€")], "(prijs inclusief btw : 121) × 100 = (60,50 : 121) × 100 = €50,00."),
  ], tekst="Sanne koopt een fietshelm in voor €20. Haar brutowinstopslag is 75%."),
 opgave(4, "Omzet en winst", [
   deel("a", "Bereken de omzet.", [num(18000.00, "Omzet", "€")], "afzet × verkoopprijs = 400 × 45 = €18.000,00."),
   deel("b", "Bereken de brutowinst.", [num(8000.00, "Brutowinst", "€")], "omzet − inkoopwaarde = 18.000 − (400 × 25) = 18.000 − 10.000 = €8.000,00."),
   deel("c", "Bereken het nettoresultaat. Typ een min-teken bij een verlies.", [num(1500.00, "Nettoresultaat", "€")], "brutowinst − bedrijfskosten = 8.000 − 6.500 = €1.500,00 nettowinst."),
   deel("d", "In de regio worden 2.500 fietssloten per maand verkocht. Bereken het marktaandeel van Sanne.", [num(16.0, "Marktaandeel", "%")], "(eigen afzet : totale afzet) × 100 = (400 : 2.500) × 100 = 16,0%."),
  ], tekst="Sanne verkoopt in een maand 400 fietssloten voor €45 per stuk (exclusief btw). De inkoopprijs is €25 per stuk. De bedrijfskosten zijn €6.500."),
 opgave(5, "De markt voor aardbeien", [
   deel("a", "Wat is de evenwichtsprijs?", [num(3.00, "Evenwichtsprijs", "€")], "Bij €3,00 zijn de vraag en het aanbod gelijk: 500 bakjes."),
   deel("b", "De overheid stelt een minimumprijs in van €4,00. Bereken het overschot in bakjes.", [num(400, "Overschot (bakjes)", tol=0.5)], "Bij €4,00: aangeboden 700, gevraagd 300. 700 − 300 = 400 bakjes overschot."),
   deel("c", "Het wordt mooi weer en veel mensen willen aardbeien. Leg uit wat er gebeurt met de vraaglijn en met de prijs.", [open_("5c", "Het wordt mooi weer en veel mensen willen aardbeien. Leg uit wat er gebeurt met de vraaglijn en met de prijs.", "Verschuiving van de vraaglijn", "De vraag neemt toe, dus de vraaglijn schuift naar rechts. Daardoor stijgt de evenwichtsprijs.", ["de vraaglijn schuift naar rechts (meer vraag)", "de prijs stijgt"])], "Meer vraag: lijn naar rechts, prijs omhoog."),
  ], tekst="De tabel laat de vraag naar en het aanbod van aardbeien op een markt zien.",
  tabel=[["Prijs per bakje", "Gevraagd", "Aangeboden"], ["€2,00", "700", "300"], ["€3,00", "500", "500"], ["€4,00", "300", "700"]]),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 3", min=50, mc="mc_a", open=None, rek="rek_a")))
