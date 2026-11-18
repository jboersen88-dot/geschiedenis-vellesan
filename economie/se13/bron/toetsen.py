# Oefen-SE voor het SE H1 + H3 van 3 mavo. Draai: python3 -I economie/se13/bron/toetsen.py
# Zelfde soort vragen als in de hoofdstukken, andere situaties. Geen vragen uit een echt SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

BEINV = ["Sociale beïnvloeding", "Commerciële beïnvloeding"]
MERK = ["A-merk", "B-merk", "Huismerk"]
INK = ["Inkomen uit arbeid", "Inkomen uit bezit", "Overdrachtsinkomen"]
mc_a = mc(13, [
 ("Je hebt €20. Je wilt naar de film (€12) en een boek kopen (€15). Welk begrip past hierbij?", ["Schaarste", "Deflatie", "Zelfvoorziening", "Vrije goederen"], "Je middelen zijn te klein voor al je behoeften: je moet kiezen."),
 ("Welk voorbeeld is een vrij goed?", ["Wind op het strand", "Water uit de kraan", "Stroom van zonnepanelen", "Brood van gisteren"], "Wind is er vanzelf. Voor de andere drie zijn middelen ingezet."),
 ("Een kledingwinkel verlaagt alle prijzen om meer klanten te trekken. Welke P is dat?", ["Prijs", "Plaats", "Product", "Personeel"], "De winkel kiest voor een lage prijs."),
 ("Een bedrijf wil vooral dat je de naam van het merk onthoudt. Welke reclame is dat?", ["Merkreclame", "Informatieve reclame", "Ideële reclame", "Sluikreclame"], "Merkreclame draait om naamsbekendheid."),
 ("Lisa krijgt rente op haar spaargeld. Welk inkomen is dat?", ["Inkomen uit bezit", "Inkomen uit arbeid", "Overdrachtsinkomen", "Inkomen in natura"], "Zij verdient aan iets wat zij bezit: haar spaargeld."),
 ("Welke uitgave is een incidentele uitgave?", ["Een nieuwe wasmachine", "De maandelijkse huur", "De wekelijkse boodschappen", "De premie van de verzekering"], "Die uitgave komt maar af en toe voor."),
 ("De inflatie is 3%. Je loon stijgt ook met 3%. Wat gebeurt er met je koopkracht?", ["Die blijft gelijk", "Die stijgt", "Die daalt", "Die verdubbelt"], "Je loon stijgt even hard als de prijzen."),
 ("Het indexcijfer van een prijs is 96. Wat klopt?", ["De prijs is 4% gedaald", "De prijs is 4% gestegen", "De prijs is 96% gedaald", "De prijs is €4 gedaald"], "Onder de 100 is een daling: 100 − 96 = 4%."),
 ("Je bewaart geld om later een auto te kopen. Welke geldfunctie is dat?", ["Spaarmiddel", "Ruilmiddel", "Rekenmiddel", "Leenmiddel"], "Je bewaart geld voor later."),
 ("Welk geld is chartaal geld?", ["Een munt van €2", "Het saldo op je pas", "Geld op je rekening", "Een betaalverzoek"], "Chartaal geld is contant geld: munten en bankbiljetten."),
 ("Yara spaart, zodat zij een kapotte telefoon meteen kan vervangen. Welk spaarmotief is dat?", ["Sparen uit voorzorg", "Sparen voor een doel", "Sparen voor de rente", "Sparen voor dividend"], "Zij spaart voor onverwachte uitgaven."),
 ("Bij welke rente krijg je ook rente over de rente van eerdere jaren?", ["Samengestelde rente", "Enkelvoudige rente", "Variabele rente", "Vaste rente"], "Rente op rente."),
 ("Wat zijn kredietkosten?", ["Het bedrag dat je extra terugbetaalt", "Het bedrag dat je per maand aflost", "Het bedrag dat je in totaal leent", "Het bedrag dat de bank je uitleent"], "Alles wat je meer terugbetaalt dan je hebt geleend."),
 ("Een gezin koopt een huis en leent daarvoor bij de bank. Welke lening is dat?", ["Hypothecaire lening", "Persoonlijke lening", "Doorlopend krediet", "Koop op afbetaling"], "Het huis is het onderpand."),
 ("Wat is het risico van beleggen in aandelen?", ["De koers kan dalen", "De rente kan stijgen", "De bank kan sluiten", "De premie kan stijgen"], "Dan zijn je aandelen minder waard dan je inleg."),
 ("De wisselkoers is: voor €1 krijg je 1,10 dollar. Hoeveel dollar krijg je voor €200?", ["220 dollar", "181,82 dollar", "210 dollar", "201,10 dollar"], "200 × 1,10 = 220 dollar."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een vakantie is een primaire behoefte.", False),
   gf("Het Nibud geeft advies over omgaan met geld.", True),
   gf("Bij deflatie dalen de prijzen gemiddeld.", True),
   gf("Geld op je betaalrekening is giraal geld.", True),
   gf("Bij een debetsaldo sta je in de plus.", False),
   gf("Dividend is een deel van de winst van een bedrijf.", True)],
   ["Een vakantie is luxe: een secundaire behoefte.", "Bij een debetsaldo sta je rood."])]),
 opgave(2, "Een nieuw energiedrankje", [
   deel("a", "Kies bij elke situatie de juiste soort beïnvloeding.", [keuze("Je teamgenoten drinken het allemaal", BEINV, 0), keuze("Een bekende voetballer krijgt geld om het te drinken", BEINV, 1), keuze("De supermarkt zet het drankje bij de kassa", BEINV, 1), keuze("Je zus zegt dat het lekker is", BEINV, 0)], "Sociaal: mensen om je heen. Commercieel: een bedrijf wil eraan verdienen."),
   deel("b", "Kies bij elk drankje de juiste soort merk.", [keuze("Bekend van tv en het duurste in het schap", MERK, 0), keuze("De naam van de supermarkt staat op het blikje", MERK, 2), keuze("Een onbekend merk met weinig reclame en een lage prijs", MERK, 1)], "A-merk: bekend en duur. Huismerk: van de winkel zelf. B-merk: minder bekend en goedkoper."),
   deel("c", "De overheid maakt een spotje: 'Drink water in plaats van energiedrank.' Is dit commerciële of ideële reclame? Leg je antwoord uit.", [open_("2c", "De overheid maakt een spotje: 'Drink water in plaats van energiedrank.' Is dit commerciële of ideële reclame? Leg je antwoord uit.", "Soort reclame", "Dit is ideële reclame. Het doel is het gedrag van mensen verbeteren (gezonder drinken), niet winst maken.", ["het is ideële reclame", "het doel is beter gedrag, niet winst maken"])], "Ideële reclame wil het gedrag van mensen verbeteren."),
  ], tekst="Er komt een nieuw energiedrankje op de markt."),
 opgave(3, "Het geld van Ilse", [
   deel("a", "Bereken hoeveel Ilse per maand verdient met haar krantenwijk.", [num(166.83, "Loon per maand", "€", tol=0.01)], "(weekbedrag × 52) : 12 = (38,50 × 52) : 12 = €166,83"),
   deel("b", "Bereken de totale inkomsten van Ilse per maand.", [num(211.83, "Inkomsten", "€", tol=0.01)], "166,83 + 45,00 = €211,83"),
   deel("c", "Ilse geeft elke maand €136,83 uit. De rest reserveert zij. Bereken hoeveel zij per maand reserveert.", [num(75, "Reserveren", "€", tol=0.01)], "Inkomsten − uitgaven = 211,83 − 136,83 = €75,00"),
   deel("d", "Ilse wil een laptop van €1.150,00 kopen. Zij heeft al €400,00 gespaard. Bereken na hoeveel maanden zij de laptop kan kopen.", [num(10, "Aantal maanden", "maanden", tol=0.01)], "(benodigd bedrag − al gespaard) : bedrag per maand = (1.150 − 400) : 75 = 10 maanden"),
   deel("e", "Kies bij elk inkomen van Ilse de juiste soort.", [keuze("Het loon van de krantenwijk", INK, 0), keuze("Het kleedgeld", INK, 2)], "Loon is een beloning voor werk. Voor kleedgeld levert Ilse geen tegenprestatie."),
  ], tekst="Ilse heeft een krantenwijk. Zij verdient €38,50 per week. Van haar ouders krijgt zij €45,00 kleedgeld per maand."),
 opgave(4, "De sportschool wordt duurder", [
   deel("a", "Bereken het indexcijfer van de prijs van nu.", [num(114, "Indexcijfer", "", tol=0.05)], "(nieuw getal : getal basisjaar) × 100 = (28,50 : 25,00) × 100 = 114,0"),
   deel("b", "Volgend jaar is het indexcijfer 120. Bereken de prijs van volgend jaar.", [num(30, "Prijs", "€", tol=0.005)], "(indexcijfer : 100) × bedrag basisjaar = (120 : 100) × 25,00 = €30,00"),
   deel("c", "Het loon van de trainer gaat van €2.400,00 naar €2.520,00 per maand. Bereken met hoeveel procent het loon stijgt.", [num(5, "Stijging", "%", tol=0.05)], "(nieuw − oud) : oud × 100 = (2.520 − 2.400) : 2.400 × 100 = 5,0%"),
   deel("d", "In hetzelfde jaar stijgen de prijzen met 3,5%. Wat gebeurt er met de koopkracht van de trainer?", [keuze("De koopkracht", ["Stijgt", "Daalt", "Blijft gelijk"], 0)], "Het loon stijgt harder dan de prijzen."),
   deel("e", "Van het nieuwe loon van €2.520,00 gaat €831,60 naar de huur. Bereken hoeveel procent van het loon dat is.", [num(33, "Huur", "%", tol=0.05)], "(deel : geheel) × 100 = (831,60 : 2.520) × 100 = 33,0%"),
  ], tekst="Een abonnement op de sportschool kostte in het basisjaar €25,00 per maand. Nu kost het €28,50 per maand."),
 opgave(5, "De rekening van Mo", [
   deel("a", "Bereken het totaal van de ontvangsten.", [num(142.5, "Ontvangsten", "€", tol=0.005)], "30,00 + 112,50 = €142,50"),
   deel("b", "Bereken het totaal van de uitgaven.", [num(244.24, "Uitgaven", "€", tol=0.005)], "64,99 + 18,00 + 161,25 = €244,24"),
   deel("c", "Bereken het nieuwe saldo van Mo. Typ een min-teken bij een negatief saldo.", [num(-15.34, "Nieuw saldo", "€", tol=0.005)], "Nieuw saldo = oud saldo + ontvangsten − uitgaven = 86,40 + 142,50 − 244,24 = −€15,34"),
   deel("d", "Wat voor saldo heeft Mo nu?", [keuze("Het saldo is een", ["Creditsaldo", "Debetsaldo"], 1)], "Het saldo is negatief: Mo staat rood."),
   deel("e", "Mo betaalt de schoenen met zijn pinpas. Met welk geld betaalt hij?", [keuze("Mo betaalt met", ["Chartaal geld", "Giraal geld"], 1)], "Het geld gaat van zijn betaalrekening af."),
  ], tekst="Mo heeft een oud saldo van €86,40. Er komt €30,00 zakgeld bij en €112,50 loon. Hij betaalt €64,99 voor schoenen, €18,00 voor zijn abonnement en €161,25 voor de reparatie van zijn fiets."),
 opgave(6, "Sparen bij de bank", [
   deel("a", "Bereken hoeveel rente oma per jaar krijgt.", [num(126, "Rente per jaar", "€", tol=0.005)], "(percentage : 100) × spaarbedrag = (2,8 : 100) × 4.500 = €126,00"),
   deel("b", "Bereken hoeveel er na 4 jaar op het deposito van oma staat (spaarbedrag + rente).", [num(5004, "Eindbedrag", "€", tol=0.005)], "126 × 4 = €504,00 rente. 4.500 + 504 = €5.004,00"),
   deel("c", "Welke groeifactor gebruikt Bas?", [num(1.032, "Groeifactor", "", tol=0.0001)], "(3,2 : 100) + 1 = 1,032"),
   deel("d", "Bereken hoeveel er na 6 jaar op de rekening van Bas staat.", [num(2174.46, "Eindbedrag", "€", tol=0.01)], "beginbedrag × (groeifactor ^ aantal jaren) = 1.800 × (1,032 ^ 6) = €2.174,46"),
   deel("e", "Bereken hoeveel rente Bas in totaal heeft gekregen.", [num(374.46, "Rente", "€", tol=0.01)], "2.174,46 − 1.800,00 = €374,46"),
  ], tekst="Oma zet €4.500,00 op een spaardeposito. Het geld staat 4 jaar vast tegen 2,8% rente per jaar. De rente wordt aan het einde in één keer uitbetaald. Bas zet €1.800,00 op een spaarrekening tegen 3,2% rente per jaar. De rente wordt elk jaar bijgeschreven. Het geld blijft 6 jaar staan."),
 opgave(7, "Lenen voor een keuken", [
   deel("a", "Bereken hoeveel de familie in totaal terugbetaalt.", [num(10296, "Totaal", "€", tol=0.005)], "termijnbedrag × aantal termijnen = 214,50 × 48 = €10.296,00"),
   deel("b", "Bereken de kredietkosten.", [num(1296, "Kredietkosten", "€", tol=0.005)], "(termijnbedrag × aantal termijnen) − krediet = 10.296 − 9.000 = €1.296,00"),
   deel("c", "Bereken hoeveel procent de kredietkosten zijn van het geleende bedrag.", [num(14.4, "Kredietkosten", "%", tol=0.05)], "(kredietkosten : krediet) × 100 = (1.296 : 9.000) × 100 = 14,4%"),
   deel("d", "Wat voor lening is dit?", [keuze("Dit is een", ["Consumptief krediet", "Hypothecaire lening"], 0)], "De familie leent voor een aankoop, niet voor een huis."),
   deel("e", "De familie kan ook kiezen voor 72 maanden. Leg uit waarom de kredietkosten dan hoger zijn.", [open_("7e", "De familie kan ook kiezen voor 72 maanden. Leg uit waarom de kredietkosten dan hoger zijn.", "Langere looptijd", "Bij een langere looptijd betaal je langer rente over het geleende bedrag. In totaal betaal je dus meer rente.", ["je betaalt langer rente", "daardoor betaal je in totaal meer terug"])], "Hoe langer je leent, hoe langer je rente betaalt."),
  ], tekst="Familie Bakker leent €9.000,00 voor een nieuwe keuken. Zij betalen 48 maanden lang €214,50 per maand."),
 opgave(8, "Op reis en beleggen", [
   deel("a", "Je wisselt €350,00. Bereken hoeveel Zwitserse franken je krijgt.", [num(332.5, "Zwitserse franken", "", tol=0.005)], "euro's × wisselkoers = 350 × 0,95 = 332,50 Zwitserse franken"),
   deel("b", "Na de vakantie heb je nog 57 Zwitserse franken over. Bereken hoeveel euro je daarvoor terugkrijgt.", [num(60, "Euro", "€", tol=0.005)], "vreemd geld : wisselkoers = 57 : 0,95 = €60,00"),
   deel("c", "Tante Els koopt 40 aandelen voor €22,50 per aandeel. Later verkoopt zij ze voor €26,10 per aandeel. Bereken haar winst.", [num(144, "Winst", "€", tol=0.005)], "(verkoopprijs − aankoopprijs) × aantal aandelen = (26,10 − 22,50) × 40 = €144,00"),
   deel("d", "Bereken hoeveel procent de winst is van haar inleg.", [num(16, "Winst", "%", tol=0.05)], "Inleg: 40 × 22,50 = €900,00. (144 : 900) × 100 = 16,0%"),
  ], tekst="Je gaat op vakantie naar Zwitserland. De wisselkoers: voor €1 krijg je 0,95 Zwitserse frank."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H1 en H3", min=75, mc="mc_a", open=None, rek="rek_a")))
