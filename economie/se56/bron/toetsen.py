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
 ("Welk tarief heeft de Nederlandse inkomstenbelasting?", ["Progressief", "Degressief", "Proportioneel", "Fictief"], "Een hogere schijf heeft een hoger percentage."),
 ("Wat doet een heffingskorting?", ["Je betaalt minder belasting", "Je krijgt een hoger brutoloon", "Je betaalt meer premies", "Je krijgt een hogere uitkering"], "Het is een korting op de inkomstenbelasting."),
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
   deel("a", "Schrijf eerst de formule op. Bereken daarna het belastbaar inkomen.", [num(74000, "Belastbaar inkomen", "€", tol=0.5)], ["Belastbaar inkomen = inkomsten + eigenwoningforfait − aftrekposten", "76.200 + 1.500 − 3.700 = €74.000"]),
   deel("b", "Bereken de belasting in schijf 1 en in schijf 2. Rond elke schijf naar beneden af op hele euro's.", [num(13747, "Schijf 1", "€", tol=0.5), num(13350, "Schijf 2", "€", tol=0.5)], ["Schijf 1: (35,8 : 100) × 38.400 = 13.747,20 → €13.747", "In schijf 2: 74.000 − 38.400 = €35.600", "Schijf 2: (37,5 : 100) × 35.600 = €13.350"]),
   deel("c", "Sven heeft €2.500 aan heffingskortingen. In box 3 betaalt hij niets. Bereken de verschuldigde inkomstenbelasting.", [num(24597, "Te betalen", "€", tol=0.5)], "Box 1: 13.747 + 13.350 = 27.097. Totaal: 27.097 + 0 − 2.500 = €24.597"),
  ], tekst="Sven verdient €76.200 loon. Eigenwoningforfait: €1.500. Hypotheekrente: €3.700. Schijf 1 loopt t/m €38.400 (35,8%). Schijf 2 loopt van €38.400 t/m €76.800 (37,5%)."),
 opgave(5, "Eerlijk?", [
   deel("a", "Bereken met hoeveel procent elk inkomen daalt. Rond af op 1 decimaal. Typ een min-teken.", [num(-1, "Laag inkomen", "%"), num(-3, "Hoog inkomen", "%")], ["(nieuw − oud) : oud × 100", "(1.980 − 2.000) : 2.000 × 100 = −1,0%", "(4.850 − 5.000) : 5.000 × 100 = −3,0%"]),
   deel("b", "Is deze maatregel nivellerend of denivellerend?", [keuze("De maatregel is", ["Nivellerend", "Denivellerend"], 0)], "Het lage inkomen gaat er in procenten minder op achteruit: nivellering."),
   deel("c", "Leg uit wat het draagkrachtbeginsel is en noem een belasting die erbij past.", [open_("5c", "Leg uit wat het draagkrachtbeginsel is en noem een belasting die erbij past.", "Draagkrachtbeginsel", "Wie veel kan betalen, moet in verhouding ook meer betalen. Voorbeeld: de inkomstenbelasting met het progressieve tarief.", ["wie meer kan betalen, betaalt in verhouding meer", "voorbeeld: inkomstenbelasting / loonbelasting (progressief tarief)"])], "Hoger inkomen, hoger percentage."),
  ], tekst="Door een nieuwe belastingregel gaat een laag inkomen van €2.000 naar €1.980. Een hoog inkomen gaat van €5.000 naar €4.850."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefen-SE", sub="H5, H6 en H7 (3 mavo)", min=60, mc="mc_a", open=None, rek="rek_a")))
