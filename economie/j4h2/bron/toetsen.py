# Bron van toetsen.json. Draai: python3 -I economie/j4h2/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

UITG = ["Dagelijkse uitgave", "Vaste last", "Incidentele uitgave"]
mc_a = mc(21, [
 ("Je wilt weten hoeveel andere jongeren uitgeven aan kleding. Welke organisatie geeft daar voorlichting over?", ["Het Nibud", "De ECB", "Het CBS", "De ACM"], "Het Nibud geeft voorlichting over omgaan met geld."),
 ("Mila zet elke maand €40 opzij voor als haar telefoon stukgaat. Welk spaarmotief is dat?", ["Sparen uit voorzorg", "Sparen voor de rente", "Sparen voor een doel", "Sparen voor dividend"], "Een buffer voor onverwachte uitgaven."),
 ("Bij welke spaarvorm krijg je rente over je rente?", ["Samengestelde rente", "Enkelvoudige rente", "Nominale rente", "Variabele rente"], "De rente wordt bijgeschreven en levert daarna zelf ook rente op."),
 ("De bank geeft 1,5% rente. De inflatie is 3%. Wat gebeurt er met de koopkracht van je spaargeld?", ["Die daalt", "Die stijgt", "Die blijft gelijk", "Die verdubbelt"], "Reële rente = 1,5% − 3% = −1,5%."),
 ("Wat is een nadeel van beleggen in aandelen?", ["De koers kan dalen, dus je kunt geld verliezen", "De rente staat vast, dus je verdient nooit meer", "Je moet het geld altijd dertig jaar laten staan", "Je betaalt elke maand een termijn aan de bank"], "Beleggen geeft kans op meer rendement, maar ook meer risico."),
 ("Welke lening heeft een vaste looptijd, een vaste rente en vaste termijnen?", ["Persoonlijke lening", "Doorlopend krediet", "Salariskrediet", "Creditcard"], "Bij een persoonlijke lening ligt alles vooraf vast."),
 ("Je koopt een bank op afbetaling. Bij huurkoop was dat anders gegaan. Wat is het verschil?", ["Bij huurkoop ben je pas eigenaar na de laatste termijn", "Bij huurkoop betaal je nooit rente over het bedrag", "Bij huurkoop betaal je alles in één keer vooraf", "Bij huurkoop wordt de bank nooit jouw eigendom"], "Bij koop op afbetaling ben je meteen eigenaar."),
 ("Waarom is de rente op een hypotheek lager dan op een persoonlijke lening?", ["Het huis is het onderpand voor de bank", "De overheid betaalt de helft van de rente", "Een hypotheek los je sneller helemaal af", "De bank mag op huizen geen winst maken"], "Met een onderpand loopt de bank minder risico."),
 ("Je vergelijkt de prijzen van twee laptops. Welke functie van geld gebruik je?", ["Rekenmiddel", "Ruilmiddel", "Spaarmiddel", "Leenmiddel"], "Je drukt de waarde van iets uit in geld."),
 ("Je betaalt met je telefoon in de kantine. Met wat voor geld betaal je?", ["Giraal geld", "Chartaal geld", "Contant geld", "Geleend geld"], "Geld op je bankrekening is giraal geld."),
 ("Hoe verdient een bank geld aan sparen en lenen?", ["De rente op leningen is hoger dan op spaargeld", "De rente op spaargeld is hoger dan op leningen", "De bank krijgt subsidie voor elke spaarrekening", "De bank houdt een deel van het spaargeld zelf"], "Het renteverschil is de winst van de bank."),
 ("De inflatie is te hoog. Wat doet de ECB met de rente?", ["De ECB verhoogt de rente", "De ECB verlaagt de rente", "De ECB schaft de rente af", "De ECB bevriest de rente"], "Bij een hogere rente lenen mensen minder en sparen ze meer. Er wordt minder gekocht."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een begroting is in balans als de inkomsten en de uitgaven gelijk zijn.", True),
   gf("Bij een debetsaldo heb je geld tegoed van de bank.", False),
   gf("Dividend is een deel van de winst voor de aandeelhouders.", True),
   gf("Bij private lease wordt de auto na de laatste termijn van jou.", False),
   gf("Kredietkosten zijn alles wat je meer terugbetaalt dan je hebt geleend.", True)],
   ["Bij een debetsaldo sta je rood.", "Bij private lease huur je de auto. Hij wordt nooit van jou."])]),
 opgave(2, "Het budget van Sem", [
   deel("a", "Kies bij elke uitgave de juiste soort.", [keuze("Huur van zijn kamer", UITG, 1), keuze("Boodschappen", UITG, 0), keuze("Een nieuwe fiets", UITG, 2), keuze("Sportschoolabonnement", UITG, 1)],
        "Vaste lasten komen met vaste regelmaat terug. Een fiets koop je af en toe."),
   deel("b", "Bereken het loon van Sem per maand. Rond af op 2 decimalen.", [num(1300.00, "Loon per maand", "€")], "(weekbedrag × 52) : 12 = (300 × 52) : 12 = €1.300,00."),
   deel("c", "Sem geeft per maand €1.215 uit. Bereken zijn overschot of tekort. Typ een min-teken bij een tekort.", [num(85.00, "Overschot of tekort", "€")], "inkomsten − uitgaven = 1.300 − 1.215 = €85,00 overschot."),
   deel("d", "Over 8 maanden wil Sem een fiets van €760 kopen. Hij heeft al €120. Bereken wat hij per maand moet reserveren.", [num(80.00, "Reserveren per maand", "€")], "(benodigd bedrag − al gespaard) : aantal maanden = (760 − 120) : 8 = €80,00."),
  ], tekst="Sem (19) woont op kamers. Hij verdient netto €300 per week."),
 opgave(3, "Sparen en beleggen", [
   deel("a", "Oma zet €2.000 voor 3 jaar vast tegen 2,5% enkelvoudige rente. Bereken de rente die zij in totaal krijgt.", [num(150.00, "Rente in totaal", "€")], "(percentage : 100) × bedrag × aantal jaren = (2,5 : 100) × 2.000 × 3 = €150,00."),
   deel("b", "Noor zet €1.000 op een spaarrekening met 3% samengestelde rente. Bereken het bedrag na 2 jaar.", [num(1060.90, "Bedrag na 2 jaar", "€")], "Groeifactor = 1 + (3 : 100) = 1,03. 1.000 × 1,03 × 1,03 = €1.060,90."),
   deel("c", "Tom koopt 50 aandelen voor €20 per stuk. Hij verkoopt ze voor €23 per stuk. Hij kreeg €0,60 dividend per aandeel. Bereken zijn rendement in euro's.", [num(180.00, "Rendement", "€")], "Koerswinst: (23 − 20) × 50 = €150. Dividend: 0,60 × 50 = €30. Samen €180,00."),
   deel("d", "Leg uit waarom sparen minder risico geeft dan beleggen.", [open_("3d", "Leg uit waarom sparen minder risico geeft dan beleggen.", "Sparen of beleggen", "Bij sparen blijft je bedrag staan en krijg je rente. Bij beleggen kan de koers dalen, dus je kunt een deel van je geld verliezen.", ["bij sparen houd je je bedrag en krijg je rente", "bij beleggen kan de waarde (koers) dalen"])], "Spaargeld daalt niet in bedrag, een koers wel."),
  ]),
 opgave(4, "Een lening voor een scooter", [
   deel("a", "Bereken de kredietkosten.", [num(432.00, "Kredietkosten", "€")], "(termijn × aantal termijnen) − krediet = (112 × 36) − 3.600 = 4.032 − 3.600 = €432,00."),
   deel("b", "Bereken de kredietkosten in procenten van het geleende bedrag. Rond af op 1 decimaal.", [num(12.0, "Kredietkosten", "%")], "(kredietkosten : krediet) × 100 = (432 : 3.600) × 100 = 12,0%."),
   deel("c", "Noem twee risico's van lenen.", [open_("4c", "Noem twee risico's van lenen.", "Risico's van lenen", "Bijvoorbeeld: je betaalt meer terug dan je leent (kredietkosten), je kunt de termijnen niet meer betalen als je inkomen daalt, en je kunt in de schulden komen.", ["een eerste juist risico (kredietkosten, termijnen niet kunnen betalen, schulden)", "een tweede juist risico"])], "Lenen kost geld en je zit vast aan de termijnen."),
  ], tekst="Yara leent €3.600 met een persoonlijke lening. Ze betaalt 36 termijnen van €112."),
 opgave(5, "De betaalrekening van Jens", [
   deel("a", "Bereken het nieuwe saldo. Typ een min-teken als Jens rood staat.", [num(-25.00, "Nieuw saldo", "€")], "oud saldo + ontvangsten − betalingen = 140 + 85 − 250 = −€25,00."),
   deel("b", "Heeft Jens nu een creditsaldo of een debetsaldo?", [keuze("Jens heeft een", ["Creditsaldo", "Debetsaldo"], 1)], "Een negatief saldo is een debetsaldo: hij staat rood."),
   deel("c", "Leg uit waarom rood staan duur is.", [open_("5c", "Leg uit waarom rood staan duur is.", "Rood staan", "Als je rood staat, leen je geld van de bank. Over dat bedrag betaal je een hoge rente.", ["je leent dan geld van de bank", "je betaalt daarover een hoge rente"])], "Rood staan is lenen tegen een hoge rente."),
  ], tekst="Jens heeft €140 op zijn rekening. Hij ontvangt €85 loon en betaalt €250 voor een jas."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 2", min=50, mc="mc_a", open=None, rek="rek_a")))
