# Oefen-SE voor het SE H3 + H4 van 4 mavo. Draai: python3 -I economie/se34/bron/toetsen.py
# Zelfde soort vragen als in de hoofdstukken, andere situaties. Geen vragen uit een echt SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

KOST = ["Vaste kosten", "Variabele kosten"]
VORM = ["Eenmanszaak", "Vof", "Bv", "Nv"]
WL = ["Conjuncturele werkloosheid", "Structurele werkloosheid", "Frictiewerkloosheid", "Seizoenswerkloosheid"]
mc_a = mc(34, [
 ("Een kweker huurt een stuk grond van een boer. Hoe heet de beloning die de boer daarvoor krijgt?", ["Pacht", "Loon", "Rente", "Winst"], "Pacht is de beloning voor de productiefactor natuur."),
 ("Een drukkerij koopt een nieuwe drukpers. Hoe heet dat?", ["Investeren", "Afschrijven", "Fuseren", "Omscholen"], "Investeren is geld besteden aan productiemiddelen."),
 ("Een pizzeria verkoopt deze week minder pizza's. Welke kosten dalen mee?", ["De kosten van deeg en kaas", "De huur van het restaurant", "De afschrijving op de oven", "De premie van de verzekering"], "Ingrediënten zijn variabele kosten."),
 ("Wat betaalt de klant in de winkel?", ["De consumentenprijs", "De inkoopprijs", "De kostprijs", "De verkoopprijs zonder btw"], "De consumentenprijs is de verkoopprijs inclusief btw."),
 ("Een winkel verkocht vorig jaar 9.000 spijkerbroeken. Wat is dat getal?", ["De afzet", "De omzet", "De brutowinst", "Het marktaandeel"], "De afzet is het aantal verkochte producten."),
 ("Een fabriek loost afvalwater in de rivier. De vissers in de buurt vangen daardoor minder. Hoe noem je dat nadeel?", ["Maatschappelijke kosten", "Bedrijfskosten", "Variabele kosten", "Arbeidsproductiviteit"], "Negatieve gevolgen van productie voor de samenleving."),
 ("Door een nieuwe trend willen veel meer mensen een elektrische step. Wat gebeurt er op de markt?", ["De vraaglijn schuift naar rechts en de prijs stijgt", "De vraaglijn schuift naar links en de prijs daalt", "De aanbodlijn schuift naar links en de prijs daalt", "De aanbodlijn schuift naar rechts en de prijs stijgt"], "Meer vraag: de vraaglijn schuift naar rechts."),
 ("De overheid stelt een minimumprijs in boven de evenwichtsprijs. Wat is het gevolg?", ["Een overschot", "Een tekort", "Een kartel", "Een monopolie"], "Bij een hogere prijs is het aanbod groter dan de vraag."),
 ("In een land is er maar één bedrijf dat treinen laat rijden. Welke marktvorm is dat?", ["Monopolie", "Oligopolie", "Volkomen concurrentie", "Monopolistische concurrentie"], "Bij een monopolie is er maar één aanbieder."),
 ("Welke organisatie kan een boete geven voor een kartel?", ["De ACM", "Het UWV", "De vakbond", "De effectenbeurs"], "Een kartel is een verboden afspraak tussen bedrijven."),
 ("Waarin staan de afspraken over loon en werktijden voor een hele bedrijfstak?", ["In de cao", "In de Arbowet", "In de statuten van een bv", "In het dividend"], "Cao: collectieve arbeidsovereenkomst."),
 ("Daan klust elke zaterdag bij mensen thuis. Hij krijgt contant betaald en betaalt geen belasting. Wat voor werk is dat?", ["Zwart werk", "Onbetaald werk", "Mantelzorg", "Uitzendwerk"], "Zwart werk is strafbaar."),
 ("Wat is een voordeel van een vaste baan voor een werknemer?", ["Je kunt niet zo makkelijk ontslagen worden", "Je mag zelf bepalen wanneer je werkt", "Je hoeft geen belasting te betalen", "Je krijgt altijd een deel van de winst"], "Een vaste baan is een contract voor onbepaalde tijd."),
 ("In welke sector werkt een vrachtwagenchauffeur van een transportbedrijf?", ["De tertiaire sector", "De primaire sector", "De secundaire sector", "De quartaire sector"], "Transport is commerciële dienstverlening."),
 ("Op één vacature komen tweehonderd sollicitanten af. Wat zegt dat over de arbeidsmarkt?", ["De arbeidsmarkt is ruim", "De arbeidsmarkt is krap", "De werkgelegenheid is te hoog", "De beroepsbevolking is te klein"], "Bij een ruime arbeidsmarkt is het aanbod van arbeid groter dan de vraag."),
 ("In een streek sluit de grootste fabriek. De werkloosheid is er daarna veel hoger dan in de rest van het land. Hoe heet dat?", ["Regionale werkloosheid", "Seizoenswerkloosheid", "Frictiewerkloosheid", "Verborgen werkloosheid"], "Werkloosheid die in een bepaald gebied hoger is dan gemiddeld."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De afschrijving op een machine hoort bij de vaste kosten.", True),
   gf("De omzet is het aantal verkochte producten.", False),
   gf("Bij een maximumprijs onder de evenwichtsprijs ontstaat een tekort.", True),
   gf("De vennoten van een vof betalen vennootschapsbelasting over de winst.", False),
   gf("De beroepsbevolking bestaat uit alle werkenden en werkzoekenden samen.", True),
   gf("Seizoenswerkloosheid ontstaat doordat mensen minder gaan kopen.", False)],
   ["De omzet is een bedrag: afzet × verkoopprijs. Het aantal is de afzet.", "De winst van een vof is inkomen van de eigenaren. Zij betalen inkomstenbelasting.", "Seizoenswerkloosheid ontstaat doordat werk alleen in een deel van het jaar gedaan kan worden."])]),
 opgave(2, "De koffiebar van Lina", [
   deel("a", "Kies bij elke kostenpost de juiste soort.", [keuze("Koffiebonen en melk", KOST, 1), keuze("Huur van het pand", KOST, 0), keuze("Kartonnen bekers", KOST, 1), keuze("Afschrijving op de koffiemachine", KOST, 0)],
        "Vaste kosten veranderen niet meteen als je meer of minder verkoopt. Variabele kosten wel."),
   deel("b", "De koffiemachine kost €9.000. Na 5 jaar is de restwaarde €1.500. Bereken de afschrijving per jaar.", [num(1500.00, "Afschrijving per jaar", "€")], "(aanschafprijs − restwaarde) : aantal gebruiksjaren = (9.000 − 1.500) : 5 = €1.500,00."),
   deel("c", "In een maand zijn de vaste kosten €4.200 en de variabele kosten €1.800. Lina verkoopt 3.000 koppen koffie. Bereken de kostprijs per kop.", [num(2.00, "Kostprijs per kop", "€", tol=0.005)], "(vaste kosten + variabele kosten) : aantal producten = (4.200 + 1.800) : 3.000 = €2,00."),
  ]),
 opgave(3, "Sportschoenen in de winkel", [
   deel("a", "Bereken de verkoopprijs van de schoenen (exclusief btw).", [num(64.00, "Verkoopprijs", "€")], "(inkoopprijs : 100) × (100 + opslag) = (40 : 100) × 160 = €64,00."),
   deel("b", "Bereken de consumentenprijs (inclusief 21% btw).", [num(77.44, "Consumentenprijs", "€")], "(verkoopprijs : 100) × (100 + btw) = (64 : 100) × 121 = €77,44."),
   deel("c", "De winkel verkoopt 250 paar per maand. Bereken de omzet (exclusief btw).", [num(16000.00, "Omzet", "€")], "afzet × verkoopprijs = 250 × 64 = €16.000,00."),
   deel("d", "Bereken de brutowinst per maand.", [num(6000.00, "Brutowinst", "€")], "omzet − inkoopwaarde = 16.000 − (250 × 40) = €6.000,00."),
   deel("e", "In de stad worden 2.000 paar sportschoenen per maand verkocht. Bereken het marktaandeel van de winkel.", [num(12.5, "Marktaandeel", "%")], "(eigen afzet : totale afzet) × 100 = (250 : 2.000) × 100 = 12,5%."),
  ], tekst="Een winkel koopt sportschoenen in voor €40 per paar. De brutowinstopslag is 60%."),
 opgave(4, "De markt voor kaartjes", [
   deel("a", "Wat is de evenwichtsprijs?", [num(30.00, "Evenwichtsprijs", "€")], "Bij €30,00 zijn de vraag en het aanbod gelijk: 600 kaartjes."),
   deel("b", "De overheid stelt een maximumprijs in van €20,00. Bereken het tekort in kaartjes.", [num(500, "Tekort (kaartjes)", tol=0.5)], "Bij €20,00: gevraagd 900, aangeboden 400. 900 − 400 = 500 kaartjes tekort."),
   deel("c", "Twee van de drie verkopers van kaartjes gaan samen verder als één bedrijf. Hoe heet dat?", [keuze("Dit heet", ["Een fusie", "Een kartel", "Een monopolie", "Een stichting"], 0)], "Bij een fusie vormen twee bedrijven samen één nieuw bedrijf."),
   deel("d", "Leg uit waarom een kartel nadelig is voor consumenten.", [open_("4d", "Leg uit waarom een kartel nadelig is voor consumenten.", "Kartel", "Bij een kartel spreken bedrijven af om de concurrentie te beperken, bijvoorbeeld door dezelfde hoge prijs te vragen. Consumenten betalen daardoor een hogere prijs.", ["bedrijven beperken met een afspraak de concurrentie", "consumenten betalen daardoor een hogere prijs"])], "Minder concurrentie betekent hogere prijzen."),
  ], tekst="De tabel laat de vraag naar en het aanbod van kaartjes voor een festival zien.",
  tabel=[["Prijs per kaartje", "Gevraagd", "Aangeboden"], ["€20,00", "900", "400"], ["€30,00", "600", "600"], ["€40,00", "350", "800"]]),
 opgave(5, "Werken en ondernemen", [
   deel("a", "Kies bij elke beschrijving de juiste ondernemingsvorm.", [keuze("Eén eigenaar die zelf de leiding heeft", VORM, 0), keuze("Aandelen die op de effectenbeurs worden verhandeld", VORM, 3), keuze("Twee vennoten die samen de leiding hebben", VORM, 1), keuze("Aandeelhouders, maar de aandelen zijn niet vrij te koop", VORM, 2)],
        "Eenmanszaak: één eigenaar. Vof: vennoten. Bv: aandelen niet vrij verhandelbaar. Nv: aandelen op de beurs."),
   deel("b", "Een vof maakt €120.000 winst. Vennoot Kim krijgt 45% van de winst. Bereken het bedrag voor Kim.", [num(54000, "Winst voor Kim", "€", tol=0.5)], "(percentage : 100) × totaal = (45 : 100) × €120.000 = €54.000."),
   deel("c", "Eva werkt 24 uur per week voor €16,50 per uur. Bereken haar loon per maand. Een jaar heeft 52 weken.", [num(1716.00, "Loon per maand", "€")], "24 × €16,50 = €396,00 per week. (weekloon × 52) : 12 = (€396,00 × 52) : 12 = €1.716,00."),
   deel("d", "Noem twee manieren waarop de wet werknemers beschermt.", [open_("5d", "Noem twee manieren waarop de wet werknemers beschermt.", "Bescherming van werknemers", "Het wettelijk minimumloon, loon doorbetaald bij ziekte, toestemming nodig voor ontslag, en wetten voor gezondheid en veiligheid (Arbowet, Arbeidstijdenwet).", ["een eerste juiste manier (minimumloon, loon bij ziekte, ontslagbescherming, Arbowet of Arbeidstijdenwet)", "een tweede juiste manier"])], "Minimumloon, loon bij ziekte, ontslagbescherming, Arbowet en Arbeidstijdenwet."),
  ]),
 opgave(6, "De arbeidsmarkt in cijfers", [
   deel("a", "Bereken hoeveel procent van de beroepsbevolking werkloos is. Rond af op 1 decimaal.", [num(4, "Werkloosheid", "%")], "(deel : geheel) × 100 = (3.200 : 80.000) × 100 = 4,0%."),
   deel("b", "Een jaar later zijn er 3.600 werklozen. Bereken met hoeveel procent het aantal werklozen is gestegen. Rond af op 1 decimaal.", [num(12.5, "Stijging", "%")], "(nieuw − oud) : oud × 100 = (3.600 − 3.200) : 3.200 × 100 = 12,5%."),
   deel("c", "Bij een bedrijf werken 10 mensen in voltijd (40 uur) en 6 mensen 20 uur per week. Bereken het aantal arbeidsjaren.", [num(13, "Arbeidsjaren", "")], "10 × 40 + 6 × 20 = 520 uur. 520 : 40 = 13 arbeidsjaren."),
   deel("d", "Kies bij elk voorbeeld de juiste soort werkloosheid.", [keuze("Een skileraar heeft in de zomer geen werk", WL, 3), keuze("Kassamedewerkers worden vervangen door zelfscankassa's", WL, 1), keuze("Door minder bestedingen ontslaan bedrijven personeel", WL, 0)],
        "Seizoen: werk in een deel van het jaar. Structureel: de aanbodkant, zoals machines. Conjunctureel: minder bestedingen."),
   deel("e", "Leg uit wat het verschil is tussen geregistreerde en verborgen werkloosheid.", [open_("6e", "Leg uit wat het verschil is tussen geregistreerde en verborgen werkloosheid.", "Geregistreerd of verborgen", "Wie geregistreerd werkloos is, staat als werkzoekende ingeschreven bij het UWV en telt mee in de cijfers. Wie verborgen werkloos is, heeft ook geen werk, maar staat niet ingeschreven en telt niet mee.", ["geregistreerd: ingeschreven bij het UWV", "verborgen: niet ingeschreven, telt niet mee in de cijfers"])], "Het verschil is de inschrijving bij het UWV."),
  ], tekst="De beroepsbevolking van een regio bestaat uit 80.000 mensen. Daarvan zijn 3.200 mensen werkloos."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H3 en H4", min=60, mc="mc_a", open=None, rek="rek_a")))
