# Bron van toetsen.json. Draai: python3 -I economie/j3h3/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

FUNC = ["Ruilmiddel", "Rekenmiddel", "Spaarmiddel"]
GELD = ["Chartaal geld", "Giraal geld"]
mc_a = mc(33, [
 ("Een bakker geeft de kapper elke week brood. In ruil knipt de kapper zijn haar. Wat is dit?", ["Directe ruil", "Indirecte ruil", "Giraal betalen", "Koop op afbetaling"], "Er komt geen geld aan te pas."),
 ("Fleur betaalt in de kantine met haar telefoon. Met welk geld betaalt zij?", ["Giraal geld", "Chartaal geld", "Vreemd geld", "Geleend geld"], "Het geld gaat van haar betaalrekening af."),
 ("Op het rekeningoverzicht van Tim staat −€32,10. Wat klopt?", ["Tim heeft een debetsaldo", "Tim heeft een creditsaldo", "Tim heeft een spaardeposito", "Tim heeft een hypotheek"], "Een negatief saldo is een debetsaldo: Tim staat rood."),
 ("Welk geld hoort níét bij het girale geld?", ["Geld op je spaarrekening", "Geld op je betaalrekening", "Geld op een lopende rekening", "Geld op een rekening-courant"], "Giraal geld is geld op een betaalrekening."),
 ("Oma zet €8.000 drie jaar vast. Zij krijgt elk jaar hetzelfde percentage. Wat is dit?", ["Een spaardeposito", "Een salariskrediet", "Een doorlopend krediet", "Een aandeel"], "Het geld staat vast tegen een vaste rente."),
 ("Kim spaart voor een reis naar Spanje. Welk spaarmotief is dat?", ["Sparen voor een doel", "Sparen uit voorzorg", "Sparen voor de rente", "Sparen voor dividend"], "Zij weet waarvoor zij spaart."),
 ("De rente is 2,4%. Met welke groeifactor reken je bij samengestelde rente?", ["1,024", "1,24", "0,024", "2,4"], "(2,4 : 100) + 1 = 1,024."),
 ("De spaarrente is 1,5%. De prijzen stijgen met 4%. Wat gebeurt er?", ["De koopkracht van het spaargeld daalt", "De koopkracht van het spaargeld stijgt", "Het spaargeld wordt minder in euro's", "De bank verhoogt meteen de rente"], "De prijzen stijgen harder dan het spaargeld groeit."),
 ("Sven koopt een laptop en betaalt de winkel in 12 termijnen. Hoe heet dat?", ["Koop op afbetaling", "Salariskrediet", "Spaardeposito", "Directe ruil"], "Hij leent eigenlijk geld van de winkelier."),
 ("Waarom vraagt de bank bij een hypothecaire lening minder rente dan bij een persoonlijke lening?", ["Het huis is het onderpand", "Het bedrag is veel kleiner", "De looptijd is veel korter", "De lening is voor een auto"], "Met een onderpand loopt de bank minder risico."),
 ("Een bedrijf maakt winst en keert een deel uit aan de aandeelhouders. Hoe heet die uitkering?", ["Dividend", "Provisie", "Aflossing", "Rente"], "Dividend is winst per aandeel."),
 ("Je wisselt euro's voor Britse ponden. De bank rekent daar kosten voor. Hoe heten die kosten?", ["Provisie", "Dividend", "Aflossing", "Premie"], "Ook wel transactiekosten."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Bij indirecte ruil gebruik je geld.", True),
   gf("Bankbiljetten zijn giraal geld.", False),
   gf("Bij een variabele rente kan de bank het percentage veranderen.", True),
   gf("Bij enkelvoudige rente krijg je rente op rente.", False),
   gf("Beleggen is zonder risico.", False)],
   ["Bankbiljetten zijn chartaal geld.", "Rente op rente is samengestelde rente.", "Bij beleggen kan je inleg minder waard worden."])]),
 opgave(2, "Geld in het dagelijks leven", [
   deel("a", "Kies bij elke situatie de juiste geldfunctie.", [keuze("Je rekent een ijsje af", FUNC, 0), keuze("Je kijkt welke fiets het goedkoopst is", FUNC, 1), keuze("Je bewaart geld voor je rijbewijs", FUNC, 2), keuze("Je rekent uit hoeveel korting je krijgt", FUNC, 1)], "Betalen is ruilen. Waarde uitdrukken in geld is rekenen. Bewaren voor later is sparen."),
   deel("b", "Kies bij elk voorbeeld de juiste soort geld.", [keuze("Een briefje van €20", GELD, 0), keuze("Het saldo op je betaalrekening", GELD, 1), keuze("Muntgeld in een spaarpot", GELD, 0)], "Chartaal geld is contant geld. Giraal geld staat op een betaalrekening."),
  ]),
 opgave(3, "De rekening van Jip", [
   deel("a", "Bereken het totaal van de uitgaven.", [num(105.85, "Uitgaven", "€", tol=0.005)], "27,50 + 59,95 + 18,40 = €105,85"),
   deel("b", "Bereken het nieuwe saldo van Jip.", [num(306.75, "Nieuw saldo", "€", tol=0.005)], "Nieuw saldo = oud saldo + ontvangsten − uitgaven = 248,60 + 164,00 − 105,85 = €306,75"),
   deel("c", "Is het nieuwe saldo een creditsaldo of een debetsaldo?", [keuze("Het saldo is een", ["Creditsaldo", "Debetsaldo"], 0)], "Het saldo is positief: een creditsaldo."),
   deel("d", "Het nieuwe saldo van Tess is €412,30. Er kwam €85,00 bij en er ging €126,45 af. Bereken het oude saldo van Tess.", [num(453.75, "Oud saldo", "€", tol=0.005)], "Oud saldo = nieuw saldo − ontvangsten + uitgaven = 412,30 − 85,00 + 126,45 = €453,75"),
  ], tekst="Jip heeft een oud saldo van €248,60. Deze week komt het loon van zijn bijbaan binnen: €164,00. Hij betaalt €27,50 aan de sportschool, €59,95 aan een webshop en €18,40 in de supermarkt."),
 opgave(4, "Twee manieren van sparen", [
   deel("a", "Bereken hoeveel rente Omar per jaar krijgt.", [num(80, "Rente per jaar", "€", tol=0.005)], "(2,5 : 100) × 3.200 = €80"),
   deel("b", "Bereken hoeveel rente Omar in totaal krijgt.", [num(400, "Totale rente", "€", tol=0.005)], "80 × 5 = €400"),
   deel("c", "Welke groeifactor gebruikt Lina?", [num(1.025, "Groeifactor", "", tol=0.0001)], "(2,5 : 100) + 1 = 1,025"),
   deel("d", "Bereken hoeveel er na 5 jaar op de rekening van Lina staat.", [num(3620.51, "Eindbedrag", "€", tol=0.01)], "3.200 × (1,025 ^ 5) = €3.620,51"),
   deel("e", "Lina heeft na 5 jaar meer rente gekregen dan Omar. Leg uit hoe dat komt.", [open_("4e", "Lina heeft na 5 jaar meer rente gekregen dan Omar. Leg uit hoe dat komt.", "Uitleg", "Bij Lina komt de rente elk jaar bij het spaargeld. Zij krijgt daarna ook rente over die rente. Omar krijgt elk jaar rente over hetzelfde bedrag.", ["bij Lina wordt de rente bij het spaargeld opgeteld (rente op rente)", "Omar krijgt elk jaar rente over hetzelfde bedrag"])], "Samengestelde rente is rente op rente."),
  ], tekst="Omar zet €3.200 op een spaardeposito. Het geld staat 5 jaar vast tegen 2,5% enkelvoudige rente per jaar. Zijn zus Lina zet ook €3.200 op de bank, op een spaarrekening met 2,5% samengestelde rente per jaar. Ook zij laat het geld 5 jaar staan."),
 opgave(5, "Lenen voor een scooter", [
   deel("a", "Bereken hoeveel Roos in totaal terugbetaalt.", [num(2604, "Totaal terugbetaald", "€", tol=0.005)], "24 × 108,50 = €2.604"),
   deel("b", "Bereken de kredietkosten.", [num(204, "Kredietkosten", "€", tol=0.005)], "Kredietkosten = (termijnbedrag × aantal termijnen) − krediet = 2.604 − 2.400 = €204"),
   deel("c", "Bereken hoeveel procent de kredietkosten zijn van het geleende bedrag. Rond af op 1 decimaal.", [num(8.5, "Kredietkosten", "%")], "(kredietkosten : krediet) × 100 = (204 : 2.400) × 100 = 8,5%"),
   deel("d", "Welke vorm van krediet heeft Roos?", [keuze("Roos heeft een", ["Persoonlijke lening", "Doorlopend krediet", "Hypothecaire lening"], 0)], "Zij krijgt het bedrag in één keer en betaalt het in een vast aantal maanden terug."),
   deel("e", "Roos kan de lening ook in 36 maanden terugbetalen. Wat gebeurt er dan met de kredietkosten? Leg uit waarom.", [open_("5e", "Roos kan de lening ook in 36 maanden terugbetalen. Wat gebeurt er dan met de kredietkosten? Leg uit waarom.", "Langere looptijd", "De kredietkosten worden hoger, want Roos betaalt dan langer rente.", ["de kredietkosten worden hoger", "zij betaalt langer rente"])], "Hoe langer de looptijd, hoe meer rente je betaalt."),
  ], tekst="Roos leent €2.400 voor een scooter. Zij krijgt het hele bedrag in één keer. Zij betaalt 24 maanden lang €108,50 per maand terug."),
 opgave(6, "Aandelen en vreemd geld", [
   deel("a", "Bereken de winst van Bas in euro's.", [num(67.5, "Winst", "€", tol=0.005)], "(verkoopprijs − aankoopprijs) × aantal aandelen = (21,10 − 18,40) × 25 = €67,50"),
   deel("b", "Bereken hoeveel procent winst dat is van zijn inleg. Rond af op 1 decimaal.", [num(14.7, "Winst", "%")], "Inleg: 25 × 18,40 = €460. (67,50 : 460) × 100 = 14,7%"),
   deel("c", "Bas had zijn geld ook op een spaarrekening kunnen zetten. Noem een nadeel van beleggen tegenover sparen.", [open_("6c", "Bas had zijn geld ook op een spaarrekening kunnen zetten. Noem een nadeel van beleggen tegenover sparen.", "Nadeel van beleggen", "Bij beleggen loop je risico: de aandelen kunnen minder waard worden, zodat je een deel van je inleg kwijt bent.", ["je loopt risico: de inleg kan minder waard worden"])], "Spaargeld is veilig, de koers van een aandeel kan dalen."),
   deel("d", "Bas gaat naar Zwitserland en wisselt €250. Voor €1 krijgt hij 0,95 Zwitserse frank. Bereken hoeveel frank hij krijgt.", [num(237.5, "Zwitserse frank", "", tol=0.005)], "250 × 0,95 = 237,50 frank"),
   deel("e", "Na de vakantie heeft Bas nog 38 frank over. De koers is weer 0,95. Bereken hoeveel euro hij terugkrijgt.", [num(40, "Terug in euro", "€", tol=0.005)], "38 : 0,95 = €40,00"),
  ], tekst="Bas koopt 25 aandelen voor €18,40 per aandeel. Een jaar later verkoopt hij ze voor €21,10 per aandeel."),
 opgave(7, "De bank in het midden", [
   deel("a", "Kies bij elke persoon: vraag naar geld of aanbod van geld.", [keuze("Een gezin zet €5.000 op een spaarrekening", ["Aanbod van geld", "Vraag naar geld"], 0), keuze("Een bakker leent geld voor een nieuwe oven", ["Aanbod van geld", "Vraag naar geld"], 1), keuze("Een student leent geld voor een laptop", ["Aanbod van geld", "Vraag naar geld"], 1)], "Spaarders bieden geld aan. Leners vragen geld."),
   deel("b", "Leg uit hoe een bank geld verdient aan sparen en lenen. Gebruik het woord rente.", [open_("7b", "Leg uit hoe een bank geld verdient aan sparen en lenen. Gebruik het woord rente.", "Verdienen aan rente", "De bank leent het spaargeld uit. Leners betalen een hogere rente dan spaarders krijgen. Het verschil is voor de bank.", ["leners betalen meer rente dan spaarders krijgen", "het verschil in rente is voor de bank"])], "Lage rente voor spaarders, hogere rente voor leners."),
  ]),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 3", min=60, mc="mc_a", open=None, rek="rek_a")))
