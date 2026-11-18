# Oefen-SE voor het SE H5 + H6 + H7 (3 mavo) van 4 mavo. Draai: python3 -I economie/se56/bron/toetsen.py
# Zelfde soort vragen als in de hoofdstukken, andere situaties. Geen vragen uit een echt SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

SOORT = ["Volksverzekering", "Werknemersverzekering", "Sociale voorziening"]
DI = ["Directe belasting", "Indirecte belasting"]
mc_a = mc(567, [
 ("Welke voorziening is een collectief goed?", ["De dijken langs de kust", "De bioscoop in de stad", "De bakker op de hoek", "De sportschool in de wijk"], "Voor dijken kun je mensen niet apart laten betalen."),
 ("De overheid verkoopt een busbedrijf aan een particulier bedrijf. Hoe heet dat?", ["Privatisering", "Nationalisering", "Aanbesteding", "Nivellering"], "Een taak gaat van de collectieve naar de particuliere sector."),
 ("Hoe ontmoedigt de overheid het drinken van alcohol?", ["Met accijns", "Met subsidie", "Met leges", "Met toeslag"], "Accijns maakt het product duurder."),
 ("In welk soort economie bepaalt de overheid wat er gemaakt wordt?", ["Planeconomie", "Vrijemarkteconomie", "Sociale markteconomie", "Markteconomie"], "De overheid bepaalt wat, hoeveel en tegen welke prijs."),
 ("Welke instelling onderzoekt de gevolgen van plannen van de overheid?", ["Het CPB", "Het CBS", "De SER", "De ACM"], "CPB = Centraal Planbureau."),
 ("Wanneer is er een recessie?", ["Twee kwartalen lagere groei", "Twee jaar hogere prijzen", "Twee jaar een overschot", "Twee kwartalen meer banen"], "De groei is twee kwartalen lager dan ervoor en lager dan gemiddeld."),
 ("Wie betaalt mee aan de uitkering van een werkloze? Denk aan het solidariteitsbeginsel.", ["Mensen met een inkomen", "Alleen de werkloze zelf", "Alleen de gemeente", "Alleen de bedrijven"], "Wie een inkomen heeft, staat een deel af."),
 ("Wat vormen de sociale verzekeringen en de sociale voorzieningen samen?", ["De sociale zekerheid", "De collectieve goederen", "De rijksbegroting", "De staatsschuld"], "Samen: de sociale zekerheid."),
 ("Waar leent de overheid geld als er een begrotingstekort is?", ["Bij banken en pensioenfondsen", "Bij het CBS en het CPB", "Bij de gemeenteraad", "Bij de Tweede Kamer"], "Ook bij burgers en verzekeraars, ook uit het buitenland."),
 ("Wat staat er op een loonstrook tussen het brutoloon en het nettoloon?", ["De inhoudingen", "De aftrekposten", "De heffingskortingen", "Het eigenwoningforfait"], "Loonheffing en bijvoorbeeld pensioenpremie."),
 ("Wat doet het eigenwoningforfait met je belastbaar inkomen?", ["Dat wordt hoger", "Dat wordt lager", "Dat blijft gelijk", "Dat wordt nul"], "Je telt het bij je inkomen op."),
 ("Welk tarief heeft de Nederlandse inkomstenbelasting?", ["Progressief", "Degressief", "Proportioneel", "Fictief"], "Schijf 2 heeft een hoger percentage dan schijf 1."),
 ("Wat is het fictief rendement?", ["Rendement dat de overheid aanneemt", "Rendement dat je bank uitbetaalt", "Rente die je betaalt op een lening", "Winst die een bedrijf uitkeert"], "In box 3 rekent de overheid met een vast percentage."),
 ("De hoge inkomens stijgen 4%, de lage inkomens 1%. Hoe heet dit?", ["Denivellering", "Nivellering", "Herverdeling", "Vergrijzing"], "De verschillen worden in verhouding groter."),
 ("Wie stemt als laatste over een wetsvoorstel?", ["De Eerste Kamer", "De Tweede Kamer", "De gemeenteraad", "De Provinciale Staten"], "De Eerste Kamer controleert de Tweede Kamer."),
 ("Welke overheid haalt het vuilnis op?", ["De gemeente", "De provincie", "Het Rijk", "Het waterschap"], "Een taak van de gemeente."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De particuliere sector bestaat uit burgers en bedrijven.", True),
   gf("De SER is een overheidsinstelling.", False),
   gf("De bijstand wordt betaald uit premies.", False),
   gf("Aftrekposten maken je belastbaar inkomen lager.", True),
   gf("De motorrijtuigenbelasting past bij het draagkrachtbeginsel.", False),
   gf("Door vergrijzing krijgen steeds meer mensen AOW.", True)],
   ["De SER is onafhankelijk.", "De bijstand wordt betaald uit belastinggeld.", "De motorrijtuigenbelasting past bij het profijtbeginsel."])]),
 opgave(2, "Het huishoudboekje van het Rijk", [
   deel("a", "Bereken het begrotingssaldo in miljard euro. Typ een min-teken bij een tekort.", [num(-16, "Saldo (miljard euro)", tol=0.5)], "Inkomsten − uitgaven = 408 − 424 = −16: een tekort van €16 miljard."),
   deel("b", "Hoeveel miljoen euro is dat tekort?", [num(16000, "Tekort (miljoen euro)", tol=0.5)], "16 × 1.000 = 16.000 miljoen."),
   deel("c", "Van de uitgaven gaat €106 miljard naar de zorg. Bereken hoeveel procent dat is. Rond af op 1 decimaal.", [num(25, "Zorg", "%")], "(deel : geheel) × 100 = (106 : 424) × 100 = 25,0%"),
   deel("d", "Kies bij elke belasting de juiste soort.", [keuze("Btw", DI, 1), keuze("Inkomstenbelasting", DI, 0), keuze("Accijns", DI, 1), keuze("Vennootschapsbelasting", DI, 0)], "Direct: over inkomen, winst en vermogen. Indirect: in de prijs van een product."),
   deel("e", "Leg uit wat er met de staatsschuld gebeurt door dit saldo.", [open_("2e", "Leg uit wat er met de staatsschuld gebeurt door dit saldo.", "Staatsschuld", "Er is een tekort, dus de overheid moet lenen. Daardoor wordt de staatsschuld groter.", ["de overheid moet lenen", "de staatsschuld wordt groter"])], "Tekort → lenen → hogere staatsschuld."),
  ], tekst="Het Rijk verwacht €408 miljard aan inkomsten en €424 miljard aan uitgaven."),
 opgave(3, "Een vangnet", [
   deel("a", "Kies bij elke uitkering de juiste soort.", [keuze("AOW", SOORT, 0), keuze("WIA", SOORT, 1), keuze("Bijstand", SOORT, 2), keuze("WW", SOORT, 1), keuze("Anw", SOORT, 0)], "Volks: AOW, Anw, Wlz. Werknemers: WW, WIA. Voorziening: bijstand."),
   deel("b", "Jamal verdiende €3.000 bruto per maand en wordt werkloos. Zijn WW-uitkering is 75% van zijn laatste loon. Bereken zijn uitkering per maand.", [num(2250, "WW per maand", "€", tol=0.5)], "(75 : 100) × 3.000 = €2.250"),
   deel("c", "Leg uit waarom Nederland een verzorgingsstaat wordt genoemd.", [open_("3c", "Leg uit waarom Nederland een verzorgingsstaat wordt genoemd.", "Verzorgingsstaat", "De overheid zorgt voor sociale zekerheid en maakt voor iedere burger gezondheidszorg, huisvesting en onderwijs mogelijk.", ["de overheid zorgt voor sociale zekerheid / een bestaansminimum voor iedereen", "en voor zorg, huisvesting en onderwijs voor iedere burger"])], "Sociale zekerheid plus zorg, huisvesting en onderwijs."),
  ]),
 opgave(4, "De aangifte van Sven", [
   deel("a", "Schrijf eerst de formule op. Bereken daarna het belastbaar inkomen.", [num(74000, "Belastbaar inkomen", "€", tol=0.5)], ["Belastbaar inkomen = inkomsten + eigenwoningforfait + bijtelling − aftrekposten", "76.200 + 1.500 − 3.700 = €74.000"]),
   deel("b", "Bereken de belasting in schijf 1 en in schijf 2. Rond elke schijf naar beneden af op hele euro's.", [num(25416, "Schijf 1", "€", tol=0.5), num(2718, "Schijf 2", "€", tol=0.5)], ["Schijf 1: (37,1 : 100) × 68.508 = 25.416,47 → €25.416", "In schijf 2: 74.000 − 68.508 = €5.492", "Schijf 2: (49,5 : 100) × 5.492 = 2.718,54 → €2.718"]),
   deel("c", "Sven heeft een vermogen van €70.000. Het heffingsvrij vermogen is €50.000, het fictief rendement 1,9% en de belasting 31%. Bereken de belasting in box 3. Rond naar beneden af op hele euro's.", [num(117, "Belasting box 3", "€", tol=0.5)], ["70.000 − 50.000 = €20.000", "(1,9 : 100) × 20.000 = €380", "(31 : 100) × 380 = 117,80 → €117"]),
   deel("d", "Sven heeft €2.500 aan heffingskortingen. Bereken de verschuldigde inkomstenbelasting.", [num(25751, "Te betalen", "€", tol=0.5)], "Box 1: 25.416 + 2.718 = 28.134. Totaal: 28.134 + 117 − 2.500 = €25.751"),
  ], tekst="Sven verdient €76.200 loon. Eigenwoningforfait: €1.500. Hypotheekrente: €3.700. Schijf 1 loopt tot €68.508 (37,1%). Daarboven geldt schijf 2 (49,5%)."),
 opgave(5, "Eerlijk?", [
   deel("a", "Bereken met hoeveel procent elk inkomen daalt. Rond af op 1 decimaal. Typ een min-teken.", [num(-1, "Laag inkomen", "%"), num(-3, "Hoog inkomen", "%")], ["(nieuw − oud) : oud × 100", "(1.980 − 2.000) : 2.000 × 100 = −1,0%", "(4.850 − 5.000) : 5.000 × 100 = −3,0%"]),
   deel("b", "Is deze maatregel nivellerend of denivellerend?", [keuze("De maatregel is", ["Nivellerend", "Denivellerend"], 0)], "Het lage inkomen gaat er in procenten minder op achteruit: nivellering."),
   deel("c", "Leg uit wat het draagkrachtbeginsel is en noem een belasting die erbij past.", [open_("5c", "Leg uit wat het draagkrachtbeginsel is en noem een belasting die erbij past.", "Draagkrachtbeginsel", "Wie veel kan betalen, moet in verhouding ook meer betalen. Voorbeeld: de inkomstenbelasting met het progressieve tarief.", ["wie meer kan betalen, betaalt in verhouding meer", "voorbeeld: inkomstenbelasting / loonbelasting (progressief tarief)"])], "Hoger inkomen, hoger percentage."),
  ], tekst="Door een nieuwe belastingregel gaat een laag inkomen van €2.000 naar €1.980. Een hoog inkomen gaat van €5.000 naar €4.850."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H5, H6 en H7 (3 mavo)", min=60, mc="mc_a", open=None, rek="rek_a")))
