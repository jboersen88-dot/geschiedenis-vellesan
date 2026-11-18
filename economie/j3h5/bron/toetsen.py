# Bron van toetsen.json. Draai: python3 -I economie/j3h5/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

WERK = ["Wit werk", "Grijs werk", "Zwart werk"]
SECT = ["Primaire sector", "Secundaire sector", "Tertiaire sector", "Quartaire sector"]
VORM = ["Eenmanszaak", "Vof", "Bv", "Nv"]
WLH = ["Conjunctureel", "Structureel", "Frictie", "Seizoen", "Regionaal"]
mc_a = mc(35, [
 ("Jesse werkt op zaterdag in een fietsenwinkel. Hij vindt het vooral leuk om klanten te helpen. Welk arbeidsmotief is dat?", ["Contact met andere mensen", "Regelmaat in je leven", "Sparen voor een scooter", "Een hoger minimumloon"], "Werken is meer dan geld verdienen."),
 ("In de cao van de bouw staat een loonsverhoging. Voor wie geldt die?", ["Voor iedereen in de bouw", "Voor alle vakbondsleden", "Voor één bouwbedrijf", "Voor alle werknemers"], "Een cao geldt voor een hele bedrijfstak."),
 ("Wat gaat er van het brutoloon af?", ["Loonbelasting en premies", "Vakantiegeld en dividend", "De winst van de werkgever", "De kosten van de vakbond"], "Wat overblijft is het nettoloon."),
 ("Aan welke uitkering betaal je mee met de sociale premies?", ["De AOW", "De zorgtoeslag", "Het dividend", "De huurtoeslag"], "Ook uitkeringen bij werkloosheid en ziekte."),
 ("Een loodgieter repareert een kraan en vraagt contant geld zonder bon. Wat voor werk is dat?", ["Zwart werk", "Grijs werk", "Wit werk", "Flexibel werk"], "Er wordt geen belasting en premie betaald."),
 ("Een bedrijf verdeelt het werk: de een verkoopt, de ander doet de administratie. Hoe heet dat?", ["Arbeidsverdeling", "Arbeidsparticipatie", "Werkgelegenheid", "Loondienst"], "Door de verdeling specialiseert iedereen zich."),
 ("Noah en Lina beginnen samen een bloemenwinkel. Zij zijn allebei eigenaar en hebben geen aandelen. Welke vorm is dat?", ["Vof", "Eenmanszaak", "Bv", "Nv"], "Een vof heeft twee of meer eigenaren, de vennoten."),
 ("Van welk bedrijf kun je aandelen kopen op de beurs?", ["Een nv", "Een bv", "Een vof", "Een eenmanszaak"], "Aandelen van een nv zijn vrij te koop."),
 ("Een bouwbedrijf plaatst tien vacatures. Waar hoort dat bij?", ["De vraag naar arbeid", "Het aanbod van arbeid", "De beroepsbevolking", "De werkloosheid"], "Werkgevers vragen arbeid."),
 ("Wie hoort níét bij de beroepsbevolking?", ["Een scholier van 16 die geen werk zoekt", "Een kok van 30 met een vaste baan", "Een werkloze van 50 die solliciteert", "Een zzp'er van 45 met weinig klussen"], "Je moet werken of werk zoeken."),
 ("Een oproepkracht wordt in een rustige maand niet opgeroepen. Welk nadeel van flexibel werk zie je hier?", ["Geen zekerheid over het inkomen", "Geen recht op gelijke behandeling", "Geen kans op een andere baan", "Geen contact met de werkgever"], "Geen uren betekent geen loon."),
 ("Wat is een taak van het UWV?", ["Beoordelen of iemand een WW-uitkering krijgt", "Afspraken maken over de lonen in een cao", "Bepalen wie er bij een bedrijf ontslagen wordt", "Aandelen uitgeven voor startende bedrijven"], "Het UWV helpt ook bij het zoeken naar werk."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Het nettoloon is hoger dan het brutoloon.", False),
   gf("Vrijwilligerswerk is grijs werk.", True),
   gf("De eigenaar van een eenmanszaak mag personeel hebben.", True),
   gf("De werkgelegenheid is het aanbod van arbeid.", False),
   gf("Bij structurele werkloosheid komen de banen niet terug.", True)],
   ["Het nettoloon is lager: de belasting en premies zijn eraf.", "De werkgelegenheid is de vraag naar arbeid."])]),
 opgave(2, "Wit, grijs of zwart?", [
   deel("", "Kies bij elk voorbeeld het soort werk.", [keuze("Amira werkt met een contract in een bakkerij", WERK, 0), keuze("Tom traint gratis de jeugd van de hockeyclub", WERK, 1), keuze("Een tuinman krijgt contant geld en geeft dat niet op", WERK, 2), keuze("Sanne doet thuis de was voor het gezin", WERK, 1), keuze("Een kapster knipt thuis klanten en betaalt geen belasting", WERK, 2)], "Wit: geregistreerd en betaald. Grijs: onbetaald en toegestaan. Zwart: betaald zonder belasting en premies, dus verboden."),
  ]),
 opgave(3, "Het loon van Nora", [
   deel("a", "Bereken hoeveel euro er per maand wordt ingehouden.", [num(848, "Inhoudingen", "€", tol=0.005)], "(percentage : 100) × brutoloon = (32 : 100) × 2.650 = €848,00"),
   deel("b", "Bereken het nettoloon per maand.", [num(1802, "Nettoloon", "€", tol=0.005)], "brutoloon − inhoudingen = 2.650 − 848 = €1.802,00"),
   deel("c", "Bereken het brutoloon per week.", [num(611.54, "Weekloon", "€", tol=0.005)], "(maandloon × 12) : 52 = (2.650 × 12) : 52 = €611,54"),
   deel("d", "Bereken het bruto-uurloon. Reken verder met je antwoord bij c.", [num(16.09, "Uurloon", "€", tol=0.011)], "weekloon : aantal uren per week = 611,54 : 38 = €16,09"),
   deel("e", "Nora gaat 24 uur per week werken. Bereken haar nieuwe brutoloon per maand.", [num(1673.68, "Loon bij deeltijd", "€", tol=0.011)], "(voltijdloon : uren voltijd) × uren deeltijd = (2.650 : 38) × 24 = €1.673,68"),
  ], tekst="Nora is verkoper. Haar brutoloon is €2.650,00 per maand. Zij werkt 38 uur per week. Aan loonbelasting en premies wordt samen 32% van het brutoloon ingehouden."),
 opgave(4, "Welke sector?", [
   deel("", "Kies bij elk bedrijf de sector.", [keuze("Een tulpenkweker", SECT, 0), keuze("Een fietsenfabriek", SECT, 1), keuze("Een gemeentehuis", SECT, 3), keuze("Een reisbureau", SECT, 2), keuze("Een zoutwinning", SECT, 0), keuze("Een huisartsenpraktijk", SECT, 3)], "Primair: landbouw, visserij en delfstoffen. Secundair: industrie. Tertiair: commerciële diensten. Quartair: diensten zonder winstdoel."),
  ]),
 opgave(5, "Een eigen bedrijf", [
   deel("a", "Kies bij elke zin de ondernemingsvorm.", [keuze("Altijd één eigenaar", VORM, 0), keuze("De eigenaren heten vennoten", VORM, 1), keuze("Iedereen kan aandelen kopen op de beurs", VORM, 3), keuze("Aandeelhouders, maar de aandelen zijn niet vrij te koop", VORM, 2)], "Eenmanszaak: één eigenaar. Vof: vennoten. Bv: aandelen niet vrij te koop. Nv: aandelen op de beurs."),
   deel("b", "Yara en Daan hebben een vof. Zij denken erover om er een bv van te maken. Leg uit welk risico zij in een vof lopen en in een bv niet.", [open_("5b", "Yara en Daan hebben een vof. Zij denken erover om er een bv van te maken. Leg uit welk risico zij in een vof lopen en in een bv niet.", "Vof of bv", "In een vof moeten zij de schulden van het bedrijf ook met hun privégeld betalen. In een bv hoeft dat niet: daar kunnen zij alleen het geld verliezen dat in hun aandelen zit.", ["in een vof betaal je schulden van het bedrijf (ook) met privégeld", "in een bv loopt je privégeld geen risico / je verliest hoogstens je aandelen"])], "In een vof ben je met je privégeld aansprakelijk, in een bv niet."),
   deel("c", "Een nv keert €0,35 dividend per aandeel uit. Mees heeft 240 aandelen. Bereken hoeveel dividend Mees krijgt.", [num(84, "Dividend", "€", tol=0.005)], "aantal aandelen × dividend per aandeel = 240 × 0,35 = €84,00"),
  ]),
 opgave(6, "De arbeidsmarkt van Waterstad", [
   deel("a", "Bereken de beroepsbevolking van Waterstad.", [num(48000, "Beroepsbevolking", "mensen", tol=0.5)], "werkenden + werklozen = 44.800 + 3.200 = 48.000 mensen"),
   deel("b", "Bereken de arbeidsparticipatie.", [num(75, "Arbeidsparticipatie", "%", tol=0.05)], "(beroepsbevolking : bevolking van 15 jaar tot pensioenleeftijd) × 100 = (48.000 : 64.000) × 100 = 75,0%"),
   deel("c", "Bereken hoeveel procent van de beroepsbevolking werkloos is.", [num(6.7, "Werkloosheid", "%", tol=0.05)], "(werklozen : beroepsbevolking) × 100 = (3.200 : 48.000) × 100 = 6,7%"),
   deel("d", "In Waterstad opent een groot distributiecentrum. Wat gebeurt er met de werkgelegenheid?", [keuze("De werkgelegenheid", ["Stijgt", "Daalt", "Blijft gelijk"], 0)], "Er komen banen bij: de vraag naar arbeid stijgt."),
  ], tekst="In Waterstad wonen 64.000 mensen van 15 jaar tot de pensioenleeftijd. Daarvan werken er 44.800. Nog eens 3.200 mensen hebben geen baan en zoeken werk. De rest werkt niet en zoekt geen werk."),
 opgave(7, "Welke werkloosheid?", [
   deel("a", "Kies bij elk voorbeeld de soort werkloosheid.", [keuze("Een skileraar heeft in de zomer geen werk", WLH, 3), keuze("Kaartjesverkopers op het station zijn vervangen door automaten", WLH, 1), keuze("Door een crisis gaan mensen minder uit eten en ontslaat een restaurant personeel", WLH, 0), keuze("Lisa heeft ontslag genomen en begint over drie weken bij haar nieuwe baan", WLH, 2), keuze("In één streek sluit de grootste werkgever, daar is de werkloosheid nu het hoogst van het land", WLH, 4), keuze("Een kledingfabriek verhuist naar een lagelonenland", WLH, 1)], "Seizoen: werk in een deel van het jaar. Structureel: het werk verdwijnt blijvend. Conjunctureel: mensen kopen minder. Frictie: kort tussen twee banen. Regionaal: hoger in één gebied."),
   deel("b", "Leg het verschil uit tussen conjuncturele en structurele werkloosheid.", [open_("7b", "Leg het verschil uit tussen conjuncturele en structurele werkloosheid.", "Conjunctureel en structureel", "Conjuncturele werkloosheid ontstaat doordat mensen minder kopen. Die is tijdelijk: als het beter gaat, komen de banen terug. Bij structurele werkloosheid verdwijnt of verandert het werk blijvend. Die banen komen niet terug.", ["conjunctureel: mensen kopen minder / tijdelijk, de banen komen terug", "structureel: het werk verdwijnt blijvend / de banen komen niet terug"])], "Conjunctureel is tijdelijk, structureel is blijvend."),
  ]),
 opgave(8, "Bram wordt werkloos", [
   deel("a", "Bereken de uitkering van Bram in de eerste maand.", [num(1680, "Uitkering eerste maand", "€", tol=0.005)], "(75 : 100) × 2.240 = €1.680,00"),
   deel("b", "Bereken de uitkering van Bram in de derde maand.", [num(1568, "Uitkering derde maand", "€", tol=0.005)], "(70 : 100) × 2.240 = €1.568,00"),
   deel("c", "Noem de twee dingen die het UWV voor Bram doet.", [open_("8c", "Noem de twee dingen die het UWV voor Bram doet.", "Het UWV", "Het UWV helpt Bram bij het zoeken naar een nieuwe baan. Het UWV beoordeelt ook of Bram recht heeft op een WW-uitkering.", ["helpen bij het zoeken naar werk / een nieuwe baan", "beoordelen of hij recht heeft op een WW-uitkering"])], "Helpen zoeken naar werk en de WW-uitkering beoordelen."),
  ], tekst="Bram wordt ontslagen. Zijn laatste loon was €2.240,00 per maand. De WW-uitkering is de eerste twee maanden 75% van het laatste loon. Daarna is het 70%."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 5", min=60, mc="mc_a", open=None, rek="rek_a")))
