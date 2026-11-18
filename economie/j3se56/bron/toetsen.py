# Oefen-SE voor het SE H5 + H6 van 3 mavo. Draai: python3 -I economie/j3se56/bron/toetsen.py
# Zelfde soort vragen als in de hoofdstukken, andere situaties. Geen vragen uit een echt SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

WLH = ["Conjunctureel", "Structureel", "Frictie", "Seizoen"]
VORM = ["Eenmanszaak", "Vof", "Bv", "Nv"]
KOST = ["Vaste kosten", "Variabele kosten"]
mc_a = mc(56, [
 ("Fatima werkt graag omdat ze dan elke dag op tijd opstaat en een vast ritme heeft. Welk arbeidsmotief is dat?", ["Regelmaat in je leven", "Contact met collega's", "Nieuwe dingen leren", "Geld verdienen"], "Werk geeft structuur aan je dag."),
 ("Wie spreken samen een cao af?", ["Vakbonden en werkgevers", "Werknemers en de gemeente", "Werkgevers en het UWV", "Vakbonden en de klanten"], "De cao geldt daarna voor de hele bedrijfstak."),
 ("Op de loonstrook van Ruben staat €2.100 bruto en €1.560 netto. Wat is het verschil?", ["De loonbelasting en premies", "De winst van de werkgever", "Het vakantiegeld van Ruben", "De btw op het loon"], "Die worden van het brutoloon afgehaald."),
 ("Oma past elke woensdag gratis op de kleinkinderen. Wat voor werk is dat?", ["Grijs werk", "Wit werk", "Zwart werk", "Geschoold werk"], "Onbetaald en toegestaan."),
 ("In welke sector werkt een docent op een middelbare school?", ["Quartaire sector", "Tertiaire sector", "Secundaire sector", "Primaire sector"], "Een dienst zonder winstdoel."),
 ("Twee zussen hebben samen een vof. Het bedrijf heeft een schuld die het niet kan betalen. Wat is het gevolg?", ["Zij moeten met privégeld betalen", "Zij verliezen alleen hun aandelen", "De schuld vervalt na één jaar", "De klanten betalen de schuld"], "Bij een vof ben je met je privégeld aansprakelijk."),
 ("Wat is de werkgelegenheid?", ["De vraag naar arbeid", "Het aanbod van arbeid", "De beroepsbevolking", "De arbeidsparticipatie"], "Alle banen bij werkgevers samen."),
 ("Wie telt mee bij de beroepsbevolking?", ["Een werkloze timmerman die solliciteert", "Een gepensioneerde lerares van 70 jaar", "Een kind van 12 met een krantenwijk", "Een student die geen bijbaan wil"], "Je werkt of je zoekt werk, en je bent 15 jaar of ouder."),
 ("Een cd-fabriek sluit omdat bijna niemand nog cd's koopt. Welke werkloosheid ontstaat er?", ["Structurele werkloosheid", "Conjuncturele werkloosheid", "Seizoenswerkloosheid", "Frictiewerkloosheid"], "Het product is verouderd. Deze banen komen niet terug."),
 ("Welke beloning hoort bij de productiefactor kapitaal?", ["Huur of rente", "Loon", "Pacht", "Winst"], "Voor het gebruik van kapitaal betaal je huur of rente."),
 ("Een drukkerij vervangt tien werknemers door één grote machine. Wat wordt het bedrijf?", ["Meer kapitaalintensief", "Meer arbeidsintensief", "Een abstracte markt", "Een bedrijfskolom"], "Machines worden belangrijker dan mensen."),
 ("Wat blijft over als van de brutowinst de bedrijfskosten af zijn?", ["Het nettoresultaat", "De omzet", "De inkoopwaarde", "De afzet"], "Is het negatief, dan is er verlies."),
 ("Over welke prijs berekent een winkel de btw?", ["De verkoopprijs", "De inkoopprijs", "De kostprijs", "De consumentenprijs"], "Verkoopprijs + btw = consumentenprijs."),
 ("Er komt een grote oogst appels op de markt. De vraag blijft gelijk. Wat gebeurt er met de prijs?", ["De prijs daalt", "De prijs stijgt", "De prijs blijft gelijk", "De prijs verdubbelt"], "Meer aanbod bij dezelfde vraag: een lagere prijs."),
 ("Een bedrijf geeft het personeel een cursus. Daardoor maakt elke werknemer meer producten per uur. Wat stijgt er?", ["De arbeidsproductiviteit", "De productiecapaciteit van de markt", "De vaste kosten per product", "De maatschappelijke kosten"], "De productie per werknemer."),
 ("Welk voorbeeld is een maatschappelijke opbrengst van een nieuwe fabriek?", ["Er komen banen bij in de regio", "De buurt heeft last van stank", "De lucht in de omgeving wordt vuiler", "Er rijden meer vrachtwagens door het dorp"], "Een voordeel voor de samenleving."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een cao geldt voor één werknemer.", False),
   gf("Zwart werk is verboden.", True),
   gf("Aandelen van een bv kan iedereen op de beurs kopen.", False),
   gf("Conjuncturele werkloosheid is tijdelijk.", True),
   gf("De omzet is de afzet keer de verkoopprijs.", True),
   gf("Variabele kosten blijven gelijk als de productie stijgt.", False)],
   ["Een cao geldt voor iedereen in een bedrijfstak.", "Alleen aandelen van een nv zijn vrij te koop.", "Variabele kosten stijgen mee met de productie."])]),
 opgave(2, "Het loon van Sam", [
   deel("a", "Bereken het nettoloon van Sam per maand.", [num(1684.8, "Nettoloon", "€", tol=0.005)], "brutoloon − (loonbelasting + premies) = 2.340 − (468 + 187,20) = €1.684,80"),
   deel("b", "Bereken het brutoloon van Sam per week.", [num(540, "Weekloon", "€", tol=0.005)], "(maandloon × 12) : 52 = (2.340 × 12) : 52 = €540,00"),
   deel("c", "Bereken het bruto-uurloon van Sam.", [num(15, "Uurloon", "€", tol=0.005)], "weekloon : aantal uren per week = 540 : 36 = €15,00"),
   deel("d", "Sam wordt werkloos. De WW-uitkering is de eerste twee maanden 75% van het brutoloon. Bereken de uitkering per maand.", [num(1755, "WW-uitkering", "€", tol=0.005)], "(75 : 100) × 2.340 = €1.755,00"),
  ], tekst="Sam is monteur. Zijn brutoloon is €2.340,00 per maand. Hij werkt 36 uur per week. Per maand wordt €468,00 loonbelasting en €187,20 aan premies ingehouden."),
 opgave(3, "De arbeidsmarkt van Bergdorp", [
   deel("a", "Bereken de beroepsbevolking van Bergdorp.", [num(18000, "Beroepsbevolking", "mensen", tol=0.5)], "werkenden + werklozen = 17.100 + 900 = 18.000 mensen"),
   deel("b", "Bereken de arbeidsparticipatie.", [num(72, "Arbeidsparticipatie", "%", tol=0.05)], "(beroepsbevolking : bevolking van 15 jaar tot pensioenleeftijd) × 100 = (18.000 : 25.000) × 100 = 72,0%"),
   deel("c", "Bereken hoeveel procent van de beroepsbevolking werkloos is.", [num(5, "Werkloosheid", "%", tol=0.05)], "(werklozen : beroepsbevolking) × 100 = (900 : 18.000) × 100 = 5,0%"),
   deel("d", "Kies bij elk voorbeeld de soort werkloosheid.", [keuze("Een camping ontslaat in oktober het personeel van het zwembad", WLH, 3), keuze("Door een crisis kopen mensen minder meubels en ontslaat de meubelzaak twee verkopers", WLH, 0), keuze("De kassa's van de supermarkt zijn vervangen door zelfscankassa's", WLH, 1), keuze("Mo is net klaar met zijn opleiding en zoekt een paar weken naar een baan", WLH, 2)], "Seizoen: werk in een deel van het jaar. Conjunctureel: mensen kopen minder. Structureel: het werk verdwijnt blijvend. Frictie: kort zoeken."),
  ], tekst="In Bergdorp wonen 25.000 mensen van 15 jaar tot de pensioenleeftijd. Daarvan werken er 17.100. Nog eens 900 mensen hebben geen baan en zoeken werk."),
 opgave(4, "Werken voor een baas of voor jezelf", [
   deel("a", "Kies bij elk bedrijf de ondernemingsvorm.", [keuze("Een tegelzetter werkt alleen en is de enige eigenaar", VORM, 0), keuze("Drie vrienden zijn samen eigenaar van een escaperoom, zonder aandelen", VORM, 1), keuze("Een groot energiebedrijf met aandelen op de beurs", VORM, 3), keuze("Een familiebedrijf met aandelen die niet vrij te koop zijn", VORM, 2)], "Eén eigenaar: eenmanszaak. Vennoten: vof. Aandelen niet vrij te koop: bv. Aandelen op de beurs: nv."),
   deel("b", "Noem een voordeel en een nadeel van werken als zelfstandige, vergeleken met werken in loondienst.", [open_("4b", "Noem een voordeel en een nadeel van werken als zelfstandige, vergeleken met werken in loondienst.", "Zelfstandige of loondienst", "Voordeel: je bent je eigen baas en bepaalt zelf je uren en regels. Nadeel: je inkomen is onzeker en je moet zelf zorgen voor je pensioen en verzekeringen.", ["voordeel: eigen baas / zelf uren en regels bepalen", "nadeel: onzeker inkomen / zelf pensioen en verzekeringen regelen"])], "Eigen baas, maar minder zekerheid."),
  ]),
 opgave(5, "Fietsenwinkel Van Rijn", [
   deel("a", "Bereken de afschrijving van de bestelbus per jaar.", [num(2700, "Afschrijving", "€", tol=0.005)], "(aanschafprijs − restwaarde) : aantal gebruiksjaren = (24.000 − 2.400) : 8 = €2.700,00"),
   deel("b", "Bereken de verkoopprijs van een fietshelm.", [num(38, "Verkoopprijs", "€", tol=0.005)], "inkoopprijs + ((opslagpercentage : 100) × inkoopprijs) = 20 + (90 : 100) × 20 = 20 + 18 = €38,00"),
   deel("c", "Bereken de consumentenprijs van een fietshelm. De btw is 21%.", [num(45.98, "Consumentenprijs", "€", tol=0.005)], "38 + (21 : 100) × 38 = 38 + 7,98 = €45,98"),
   deel("d", "Bereken de omzet van de fietshelmen per maand.", [num(11400, "Omzet", "€", tol=0.005)], "afzet × verkoopprijs = 300 × 38 = €11.400,00"),
   deel("e", "Bereken de brutowinst op de fietshelmen per maand.", [num(5400, "Brutowinst", "€", tol=0.005)], "Inkoopwaarde: 300 × 20 = 6.000. omzet − inkoopwaarde = 11.400 − 6.000 = €5.400,00"),
   deel("f", "Bereken het nettoresultaat per maand.", [num(1250, "Nettoresultaat", "€", tol=0.005)], "brutowinst − bedrijfskosten = 5.400 − 4.150 = €1.250,00"),
  ], tekst="Fietsenwinkel Van Rijn koopt een bestelbus voor €24.000,00. De bus gaat 8 jaar mee. Daarna is de restwaarde €2.400,00. De winkel koopt fietshelmen in voor €20,00 per stuk. De brutowinstopslag is 90% van de inkoopprijs. Per maand verkoopt de winkel 300 helmen. De bedrijfskosten zijn €4.150,00 per maand."),
 opgave(6, "De helmenfabriek", [
   deel("a", "Kies bij elke kostensoort: vaste of variabele kosten.", [keuze("Het plastic voor de helmen", KOST, 1), keuze("De huur van de fabriek", KOST, 0), keuze("Het loon van de directeur", KOST, 0)], "Vaste kosten blijven gelijk. Variabele kosten stijgen als je meer maakt."),
   deel("b", "Bereken de kostprijs van één helm.", [num(14, "Kostprijs", "€", tol=0.005)], "Variabele kosten: 15.000 × 8 = 120.000. (vaste kosten + variabele kosten) : productie = (90.000 + 120.000) : 15.000 = €14,00"),
   deel("c", "In de fabriek werken 12 mensen. Bereken de arbeidsproductiviteit per werknemer per jaar.", [num(1250, "Arbeidsproductiviteit", "helmen", tol=0.5)], "productie : aantal werknemers = 15.000 : 12 = 1.250 helmen"),
   deel("d", "In het hele land worden 120.000 helmen per jaar verkocht. Bereken het marktaandeel van de fabriek.", [num(12.5, "Marktaandeel", "%", tol=0.05)], "(afzet van het bedrijf : totale afzet) × 100 = (15.000 : 120.000) × 100 = 12,5%"),
   deel("e", "De fabriek koopt een machine waardoor elke werknemer meer helmen maakt. Leg uit wat er met de kostprijs van een helm gebeurt.", [open_("6e", "De fabriek koopt een machine waardoor elke werknemer meer helmen maakt. Leg uit wat er met de kostprijs van een helm gebeurt.", "Arbeidsproductiviteit en kostprijs", "De kostprijs daalt. De arbeidsproductiviteit stijgt, dus de loonkosten worden over meer helmen verdeeld.", ["de kostprijs daalt", "de (loon)kosten worden over meer producten verdeeld / hogere arbeidsproductiviteit"])], "Een hogere arbeidsproductiviteit geeft een lagere kostprijs."),
  ], tekst="Een fabriek maakt 15.000 fietshelmen per jaar en verkoopt ze allemaal. De vaste kosten zijn €90.000,00 per jaar. De variabele kosten zijn €8,00 per helm."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H5 en H6", min=75, mc="mc_a", open=None, rek="rek_a")))
