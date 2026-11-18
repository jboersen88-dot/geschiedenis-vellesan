# Bron van toetsen.json. Draai: python3 -I economie/j3h6/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
# De tabel met vraag en aanbod is een eigen voorbeeld.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

PF = ["Natuur", "Arbeid", "Kapitaal", "Ondernemerschap"]
KOST = ["Vaste kosten", "Variabele kosten"]
MK = ["Maatschappelijke kosten", "Maatschappelijke opbrengsten"]
mc_a = mc(36, [
 ("Een visser gebruikt een boot om vis te vangen. Bij welke productiefactor hoort de boot?", ["Kapitaal", "Natuur", "Arbeid", "Ondernemerschap"], "Een hulpmiddel waarmee je produceert."),
 ("Welke beloning hoort bij de productiefactor natuur?", ["Pacht", "Loon", "Rente", "Winst"], "Voor het gebruik van grond betaal je pacht."),
 ("Een kaasmaker koopt melk van de boer en verkoopt kaas aan de winkel. Hoe heet deze rij bedrijven?", ["Een bedrijfskolom", "Een abstracte markt", "Een productiefactor", "Een marktaandeel"], "Van grondstof tot eindproduct."),
 ("Een tandartspraktijk heeft vooral kosten aan personeel. Wat voor bedrijf is dat?", ["Arbeidsintensief", "Kapitaalintensief", "Een bedrijfskolom", "Een concrete markt"], "De productie hangt vooral af van mensen."),
 ("Waarom schrijft een bedrijf af op een machine?", ["De machine wordt elk jaar minder waard", "De machine wordt elk jaar meer waard", "De machine levert elk jaar meer btw op", "De machine kost elk jaar minder energie"], "Kapitaalgoederen slijten en verouderen."),
 ("Wat houdt een winkel over als van de omzet alleen de inkoopwaarde af is?", ["De brutowinst", "Het nettoresultaat", "De bedrijfskosten", "De consumentenprijs"], "Daarna gaan de bedrijfskosten er nog af."),
 ("Welke prijs staat op het prijskaartje in de winkel?", ["De consumentenprijs", "De inkoopprijs", "De kostprijs", "De evenwichtsprijs"], "De prijs met btw."),
 ("Wat is een voorbeeld van een abstracte markt?", ["De markt voor spelcomputers", "De bloemenmarkt op het plein", "De kerstmarkt in het centrum", "De vlooienmarkt in de sporthal"], "Alle vraag en aanbod van een product bij elkaar."),
 ("Door een hittegolf willen veel meer mensen een ventilator kopen. Het aanbod blijft gelijk. Wat gebeurt er met de prijs?", ["De prijs stijgt", "De prijs daalt", "De prijs blijft gelijk", "De prijs halveert"], "Meer vraag bij hetzelfde aanbod: een hogere prijs."),
 ("Welke kosten van een pizzeria zijn variabel?", ["De ingrediënten", "De huur", "De verzekering", "De afschrijving"], "Meer pizza's maken kost meer ingrediënten."),
 ("Een bedrijf krijgt meer bestellingen dan het kan maken. Hoe heet dat?", ["Overbezetting", "Onderbezetting", "Mechanisatie", "Afschrijving"], "Er is te weinig personeel of te weinig kapitaal."),
 ("Een fabriek plaatst zonnepanelen en gebruikt minder verpakking. Hoe heet dat?", ["Maatschappelijk verantwoord ondernemen", "Maatschappelijke kosten veroorzaken", "Kapitaalintensief gaan produceren", "De productiecapaciteit verhogen"], "Ondernemen met oog voor mens en milieu."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De beloning voor ondernemerschap is winst.", True),
   gf("De afzet is een bedrag in euro's.", False),
   gf("In de verkoopprijs zit de btw.", False),
   gf("Bij de evenwichtsprijs zijn vraag en aanbod even groot.", True),
   gf("Vaste kosten stijgen als een bedrijf meer produceert.", False)],
   ["De afzet is het aantal verkochte producten.", "De btw zit in de consumentenprijs.", "Vaste kosten blijven gelijk. De variabele kosten stijgen."])]),
 opgave(2, "Welke productiefactor?", [
   deel("", "Kies bij elk voorbeeld de productiefactor.", [keuze("De kok in een restaurant", PF, 1), keuze("De grond van een akkerbouwer", PF, 0), keuze("De kassa in een winkel", PF, 2), keuze("De eigenaar besluit een tweede winkel te openen", PF, 3), keuze("De vrachtwagen van een transportbedrijf", PF, 2)], "Natuur: wat de natuur levert. Arbeid: het werk van mensen. Kapitaal: hulpmiddelen. Ondernemerschap: beslissen en risico nemen."),
  ]),
 opgave(3, "Van katoen tot spijkerbroek", [
   deel("a", "Bereken de toegevoegde waarde van de kledingfabriek.", [num(21, "Toegevoegde waarde fabriek", "€", tol=0.005)], "verkoopwaarde − inkoopwaarde = 32 − 11 = €21,00"),
   deel("b", "Bereken de toegevoegde waarde van de winkel.", [num(38, "Toegevoegde waarde winkel", "€", tol=0.005)], "70 − 32 = €38,00"),
   deel("c", "De klant betaalt 21% btw over de verkoopprijs van de winkel. Bereken de consumentenprijs.", [num(84.7, "Consumentenprijs", "€", tol=0.005)], "verkoopprijs + ((btw-percentage : 100) × verkoopprijs) = 70 + (21 : 100) × 70 = 70 + 14,70 = €84,70"),
   deel("d", "Leg uit waarom de klant geen waarde toevoegt.", [open_("3d", "Leg uit waarom de klant geen waarde toevoegt.", "De klant", "De klant produceert niet. Hij koopt de broek om te gebruiken en verkoopt hem niet bewerkt door.", ["de klant (consument) produceert niet / bewerkt het product niet"])], "De consument produceert niet."),
  ], tekst="Een katoenboer verkoopt katoen voor €4,00 aan een weverij. De weverij verkoopt de stof voor €11,00 aan een kledingfabriek. De fabriek verkoopt de spijkerbroek voor €32,00 aan een winkel. De winkel verkoopt de broek voor €70,00, zonder btw."),
 opgave(4, "De koffiemachine", [
   deel("a", "Bereken de afschrijving per jaar.", [num(1600, "Afschrijving per jaar", "€", tol=0.005)], "(aanschafprijs − restwaarde) : aantal gebruiksjaren = (9.600 − 1.600) : 5 = €1.600,00"),
   deel("b", "Bereken de waarde van de machine na 3 jaar.", [num(4800, "Waarde na 3 jaar", "€", tol=0.005)], "3 × 1.600 = 4.800. 9.600 − 4.800 = €4.800,00"),
   deel("c", "Bereken de afschrijving per maand.", [num(133.33, "Afschrijving per maand", "€", tol=0.005)], "1.600 : 12 = €133,33"),
  ], tekst="Een koffiebar koopt een koffiemachine voor €9.600,00. De machine gaat 5 jaar mee. Daarna is de restwaarde €1.600,00."),
 opgave(5, "De rugzakken van De Sportzaak", [
   deel("a", "Bereken de verkoopprijs van een rugzak.", [num(36, "Verkoopprijs", "€", tol=0.005)], "inkoopprijs + ((opslagpercentage : 100) × inkoopprijs) = 16 + (125 : 100) × 16 = 16 + 20 = €36,00"),
   deel("b", "Bereken de consumentenprijs van een rugzak. De btw is 21%.", [num(43.56, "Consumentenprijs", "€", tol=0.005)], "36 + (21 : 100) × 36 = 36 + 7,56 = €43,56"),
   deel("c", "Bereken de omzet per maand.", [num(16200, "Omzet", "€", tol=0.005)], "afzet × verkoopprijs = 450 × 36 = €16.200,00"),
   deel("d", "Bereken de brutowinst per maand.", [num(9000, "Brutowinst", "€", tol=0.005)], "Inkoopwaarde: 450 × 16 = 7.200. omzet − inkoopwaarde = 16.200 − 7.200 = €9.000,00"),
   deel("e", "Bereken het nettoresultaat per maand.", [num(2650, "Nettoresultaat", "€", tol=0.005)], "brutowinst − bedrijfskosten = 9.000 − 6.350 = €2.650,00"),
  ], tekst="De Sportzaak koopt rugzakken in voor €16,00 per stuk. De brutowinstopslag is 125% van de inkoopprijs. De winkel verkoopt 450 rugzakken per maand. De bedrijfskosten zijn €6.350,00 per maand."),
 opgave(6, "De markt voor aardbeien", [
   deel("a", "Lees de evenwichtsprijs af.", [num(3, "Evenwichtsprijs", "€", tol=0.005)], "Bij €3,00 zijn de vraag en het aanbod gelijk: allebei 600 kg."),
   deel("b", "Bereken de omzet op deze markt bij de evenwichtsprijs.", [num(1800, "Omzet", "€", tol=0.005)], "evenwichtshoeveelheid × evenwichtsprijs = 600 × 3,00 = €1.800,00"),
   deel("c", "Kweker Van Dam verkoopt 150 kg van de 600 kg. Bereken zijn marktaandeel.", [num(25, "Marktaandeel", "%", tol=0.05)], "(afzet van het bedrijf : totale afzet) × 100 = (150 : 600) × 100 = 25,0%"),
   deel("d", "Door veel regen mislukt een deel van de oogst. De vraag blijft gelijk. Wat gebeurt er met de evenwichtsprijs?", [keuze("De evenwichtsprijs", ["Stijgt", "Daalt", "Blijft gelijk"], 0)], "Minder aanbod bij dezelfde vraag: de prijs stijgt."),
  ], tekst="Op een markt worden aardbeien verkocht. In de tabel staan de vraag en het aanbod bij vier prijzen.",
  tabel=[["Prijs per kg", "Vraag", "Aanbod"], ["€2,00", "900 kg", "300 kg"], ["€2,50", "700 kg", "500 kg"], ["€3,00", "600 kg", "600 kg"], ["€3,50", "400 kg", "800 kg"]]),
 opgave(7, "De lampenfabriek", [
   deel("a", "Kies bij elke kostensoort: vaste of variabele kosten.", [keuze("De huur van de fabriekshal", KOST, 0), keuze("Het glas voor de lampen", KOST, 1), keuze("De afschrijving van de machines", KOST, 0), keuze("De stroom voor de machines", KOST, 1)], "Vaste kosten blijven gelijk. Variabele kosten stijgen als je meer maakt."),
   deel("b", "Bereken de kostprijs van één lamp.", [num(11, "Kostprijs", "€", tol=0.005)], "Variabele kosten: 40.000 × 6,50 = 260.000. (vaste kosten + variabele kosten) : productie = (180.000 + 260.000) : 40.000 = €11,00"),
   deel("c", "De fabriek gaat 60.000 lampen per jaar maken. Bereken de nieuwe kostprijs van één lamp.", [num(9.5, "Nieuwe kostprijs", "€", tol=0.005)], "Variabele kosten: 60.000 × 6,50 = 390.000. (180.000 + 390.000) : 60.000 = €9,50"),
   deel("d", "Leg uit waarom de kostprijs daalt als de fabriek meer lampen maakt.", [open_("7d", "Leg uit waarom de kostprijs daalt als de fabriek meer lampen maakt.", "Kostprijs", "De vaste kosten blijven gelijk. Ze worden over meer lampen verdeeld. Per lamp zijn de vaste kosten dus lager.", ["de vaste kosten blijven gelijk", "ze worden over meer lampen verdeeld / de vaste kosten per lamp dalen"])], "De vaste kosten worden over meer lampen verdeeld."),
   deel("e", "In de fabriek werken 25 mensen. Zij maken samen 40.000 lampen per jaar. Bereken de arbeidsproductiviteit per werknemer per jaar.", [num(1600, "Arbeidsproductiviteit", "lampen", tol=0.5)], "productie : aantal werknemers = 40.000 : 25 = 1.600 lampen"),
  ], tekst="Een fabriek maakt 40.000 lampen per jaar. De vaste kosten zijn €180.000,00 per jaar. De variabele kosten zijn €6,50 per lamp."),
 opgave(8, "Goed voor de samenleving?", [
   deel("a", "Kies bij elk gevolg: maatschappelijke kosten of maatschappelijke opbrengsten.", [keuze("De buurt heeft last van het lawaai van de fabriek", MK, 0), keuze("De fabriek zorgt voor 200 banen in de regio", MK, 1), keuze("De rivier raakt vervuild door afvalwater", MK, 0)], "Kosten zijn nadelen voor de samenleving, opbrengsten zijn voordelen."),
   deel("b", "Noem twee manieren waarop een fabriek maatschappelijk verantwoord kan ondernemen.", [open_("8b", "Noem twee manieren waarop een fabriek maatschappelijk verantwoord kan ondernemen.", "Mvo", "Bijvoorbeeld: zelf stroom opwekken met zonnepanelen, afval recyclen, minder verpakking gebruiken of zorgen voor goede arbeidsomstandigheden.", ["eerste manier die past bij mens of milieu (bijvoorbeeld zonnepanelen, recyclen, minder verpakking)", "tweede manier die past bij mens of milieu"])], "Denk aan het milieu en aan de mensen die er werken."),
  ]),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 6", min=60, mc="mc_a", open=None, rek="rek_a")))
