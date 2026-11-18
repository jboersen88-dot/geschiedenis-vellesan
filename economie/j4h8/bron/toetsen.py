# Bron van toetsen.json. Draai: python3 -I economie/j4h8/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

HULP = ["Noodhulp", "Structurele hulp"]
mc_a = mc(81, [
 ("Land A en land B hebben hetzelfde inkomen per hoofd. Toch is de welvaart in land A hoger. Wat kan de reden zijn?", ["In land A zijn de prijzen lager", "In land A wonen meer mensen", "In land A is meer corruptie", "In land A is minder onderwijs"], "Bij lagere prijzen is de koopkracht van het inkomen hoger."),
 ("Een vrouw verbouwt groente voor haar eigen gezin. Waarom telt dat niet mee in het nationaal inkomen?", ["Het is informele productie", "Het is een collectieve voorziening", "Het is een monocultuur", "Het is gebonden hulp"], "Zelfvoorziening wordt niet geregistreerd."),
 ("Door armoede gaan kinderen niet naar school. Daardoor vinden ze later slecht werk en blijven ze arm. Hoe heet dit?", ["Een vicieuze cirkel", "Een monocultuur", "Een ruilvoet", "Een buffervoorraad"], "Het ene probleem veroorzaakt het andere."),
 ("Een land verdient bijna al zijn exportinkomsten met koffiebonen. Wat is het risico?", ["Bij een lage koffieprijs dalen de inkomsten sterk", "Bij een lage koffieprijs stijgen de inkomsten sterk", "Het land mag geen andere producten invoeren", "Het land krijgt geen hulp van andere landen"], "Bij een monocultuur ben je afhankelijk van één product."),
 ("Welke oorzaak van onderontwikkeling komt door rijke landen?", ["Protectiemaatregelen", "Natuurrampen", "Analfabetisme", "Bevolkingsgroei"], "Protectie gaat ten koste van de export van ontwikkelingslanden."),
 ("De prijs van exportproducten van een land stijgt. De prijs van de import blijft gelijk. Wat gebeurt er met de ruilvoet?", ["Die wordt beter", "Die wordt slechter", "Die blijft gelijk", "Die halveert"], "Met dezelfde export kan het land meer import betalen."),
 ("Nederland betaalt een school in Senegal. Senegal moet de schoolbanken in Nederland kopen. Wat voor hulp is dit?", ["Gebonden hulp", "Ongebonden hulp", "Noodhulp", "Een microkrediet"], "Het geld moet besteed worden in het land dat de hulp geeft."),
 ("Amina wil een naaiatelier beginnen, maar de bank geeft haar geen lening. Wat kan haar helpen?", ["Een microkrediet", "Een buffervoorraad", "Een invoerrecht", "Een handelsverdrag"], "Een kleine lening voor kleine ondernemers."),
 ("Er is dit jaar een groot overschot aan tin. Wat doen de landen met een grondstoffenovereenkomst?", ["Ze slaan het overschot op in een buffervoorraad", "Ze verkopen alles meteen voor een lage prijs", "Ze stoppen een jaar lang met de productie", "Ze geven het tin gratis weg aan rijke landen"], "Bij tekorten verkopen ze de voorraad weer."),
 ("Welke organisatie is afhankelijk van giften van burgers?", ["Cordaid", "De Wereldbank", "Het IMF", "De Europese Unie"], "Cordaid is een goededoelenorganisatie."),
 ("Waarom loont het vooral bij arbeidsintensieve productie om naar een lagelonenland te gaan?", ["De loonkosten zijn een groot deel van de kosten", "De machines zijn daar veel beter dan hier", "De klanten wonen allemaal in dat land", "De belasting is daar altijd nul procent"], "Bij veel handwerk bespaar je veel met lage lonen."),
 ("Wat garandeert Fairtrade aan boeren?", ["Een minimumprijs die de kosten dekt", "Een lening zonder rente van de bank", "Een vaste baan in een fabriek", "Een subsidie van hun regering"], "Daarbovenop komt de fairtradepremie."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Het inkomen per hoofd laat zien hoe het inkomen over de bevolking verdeeld is.", False),
   gf("Bij een monocultuur is een land afhankelijk van één of enkele exportproducten.", True),
   gf("Noodhulp is bedoeld om een land economisch zelfstandig te maken.", False),
   gf("Bij de Wereldbank kunnen ontwikkelingslanden lenen tegen een lage rente.", True),
   gf("Een voorwaarde van Fairtrade is dat boeren samenwerken in een coöperatie.", True)],
   ["Het inkomen per hoofd is alleen een gemiddelde.", "Noodhulp is bedoeld om te overleven na een ramp. Structurele hulp maakt een land zelfstandiger."])]),
 opgave(2, "Twee landen vergelijken", [
   deel("a", "Bereken het inkomen per hoofd van land A.", [num(2500, "Inkomen per hoofd land A", "€", tol=0.5)], "nationaal inkomen : aantal inwoners = 50.000.000.000 : 20.000.000 = €2.500."),
   deel("b", "Bereken het inkomen per hoofd van land B.", [num(40000, "Inkomen per hoofd land B", "€", tol=0.5)], "400.000.000.000 : 10.000.000 = €40.000."),
   deel("c", "Hoeveel procent van het inkomen verdient de rijkste 20% in land A?", [num(60, "Rijkste 20% in land A", "%", tol=0.5)], "100% − 40% = 60%."),
   deel("d", "Noem twee dingen, naast het inkomen per hoofd, die meetellen voor de welvaart van een land.", [open_("2d", "Noem twee dingen, naast het inkomen per hoofd, die meetellen voor de welvaart van een land.", "Welvaart is meer dan inkomen", "De verdeling van het inkomen, de hoogte van de prijzen (koopkracht), de grootte van de informele productie en de collectieve voorzieningen zoals onderwijs en zorg.", ["een eerste juist punt (inkomensverdeling, prijzen of koopkracht, informele productie, collectieve voorzieningen)", "een tweede juist punt"])], "Verdeling, prijzen, informele productie en voorzieningen."),
  ], tekst="Land A heeft een nationaal inkomen van €50 miljard en 20 miljoen inwoners. Land B heeft een nationaal inkomen van €400 miljard en 10 miljoen inwoners. In land A verdient de armste 80% van de bevolking samen 40% van het inkomen."),
 opgave(3, "Een land met alleen katoen", [
   deel("a", "Hoe heet het als een land voor zijn export afhankelijk is van één product?", [keuze("Dit heet", ["Monocultuur", "Ruilvoet", "Vicieuze cirkel", "Contingentering"], 0)], "Monocultuur: één of enkele exportproducten."),
   deel("b", "Bereken met hoeveel procent de prijs van katoen is gedaald. Rond af op 1 decimaal. Typ een min-teken.", [num(-12.5, "Verandering", "%")], "(nieuw − oud) : oud × 100 = (1.400 − 1.600) : 1.600 × 100 = −12,5%."),
   deel("c", "De prijs van machines die het land invoert blijft gelijk. Leg uit wat er met de ruilvoet gebeurt en wat dat betekent voor het land.", [open_("3c", "De prijs van machines die het land invoert blijft gelijk. Leg uit wat er met de ruilvoet gebeurt en wat dat betekent voor het land.", "Ruilvoet", "De ruilvoet wordt slechter, want de exportprijs daalt en de importprijs blijft gelijk. Het land moet meer katoen exporteren om dezelfde machines te kunnen betalen.", ["de ruilvoet wordt slechter", "het land moet meer exporteren om dezelfde import te betalen"])], "Lagere exportprijs, dezelfde importprijs: een slechtere ruilvoet."),
  ], tekst="De wereldmarktprijs van katoen daalt van €1.600 naar €1.400 per ton."),
 opgave(4, "Hulp aan ontwikkelingslanden", [
   deel("a", "Kies bij elk voorbeeld de juiste soort hulp.", [keuze("Tenten en dekens na een aardbeving", HULP, 0), keuze("Een project om leraren op te leiden", HULP, 1), keuze("Drinkwater bij extreme droogte", HULP, 0), keuze("De aanleg van een spoorlijn", HULP, 1)],
        "Noodhulp is om te overleven. Structurele hulp maakt een land zelfstandiger."),
   deel("b", "Het nationaal inkomen van een land is €900 miljard. Bereken hoeveel miljard euro 0,7% daarvan is.", [num(6.3, "Bedrag (miljard euro)", tol=0.05)], "(0,7 : 100) × 900 = €6,3 miljard."),
   deel("c", "Leg uit hoe een microkrediet iemand in een ontwikkelingsland kan helpen.", [open_("4c", "Leg uit hoe een microkrediet iemand in een ontwikkelingsland kan helpen.", "Microkrediet", "Met een microkrediet (een kleine lening) kan iemand die niet bij een grote bank kan lenen een eigen bedrijfje starten en zo zelf een inkomen verdienen.", ["het is een kleine lening voor iemand die niet bij de bank kan lenen", "daarmee kan die persoon een bedrijfje starten en inkomen verdienen"])], "Een kleine lening om een bedrijfje te beginnen."),
  ]),
 opgave(5, "Een eerlijke prijs", [
   deel("a", "Bereken wat de coöperatie in totaal ontvangt.", [num(13000, "Totaal", "€", tol=0.5)], "minimumprijs + fairtradepremie = 2.400 + 200 = €2.600 per ton. 5 × 2.600 = €13.000."),
   deel("b", "Noem twee redenen waarom bedrijven hun productie naar lagelonenlanden verplaatsen.", [open_("5b", "Noem twee redenen waarom bedrijven hun productie naar lagelonenlanden verplaatsen.", "Lagelonenlanden", "De loonkosten zijn laag, er zijn geen afspraken over minimumloon, arbeidstijden en arbeidsomstandigheden, er zijn geen vakbonden en er zijn geen milieuregels.", ["een eerste juiste reden (lage lonen, geen regels voor arbeid, geen vakbonden, geen milieuregels)", "een tweede juiste reden"])], "Lage kosten en weinig regels."),
   deel("c", "Leg uit wat jij als consument kunt doen voor mensen in ontwikkelingslanden.", [open_("5c", "Leg uit wat jij als consument kunt doen voor mensen in ontwikkelingslanden.", "Jouw koopgedrag", "Je kunt producten kopen waarvoor de boer een eerlijke prijs krijgt of de werknemer een leefbaar loon, bijvoorbeeld producten van Fairtrade.", ["producten kiezen met een eerlijke prijs voor de boer of een leefbaar loon (bijvoorbeeld Fairtrade)"])], "Kies voor producten met een eerlijke prijs."),
  ], tekst="Een coöperatie van boeren verkoopt 5 ton cacao via Fairtrade. De minimumprijs is €2.400 per ton. De fairtradepremie is €200 per ton."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 8", min=45, mc="mc_a", open=None, rek="rek_a")))
