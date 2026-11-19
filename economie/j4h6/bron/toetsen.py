# Bron van toetsen.json. Draai: python3 -I economie/j4h6/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

BEG = ["Draagkrachtbeginsel", "Profijtbeginsel"]
mc_a = mc(61, [
 ("Op de loonstrook van Kim staat €412 loonheffing. Aan wie draagt haar werkgever dat bedrag af?", ["De Belastingdienst", "De gemeente", "Het pensioenfonds", "De vakbond"], "De werkgever draagt de loonheffing af aan de fiscus."),
 ("Welke premie zit niet in de loonheffing?", ["Premie werknemersverzekeringen", "Premie volksverzekeringen", "Loonbelasting", "Premie voor de AOW"], "Die premie betaalt de werkgever zelf."),
 ("Daan krijgt een brief waarin staat hoeveel inkomstenbelasting hij moet betalen. Hoe heet die brief?", ["Aanslag", "Aangifte", "Loonstrook", "Miljoenennota"], "Na je aangifte stuurt de Belastingdienst een aanslag."),
 ("Lotte koopt een huis. Wat verandert er in haar aangifte?", ["Ze telt het eigenwoningforfait op", "Ze trekt haar loon ervan af", "Ze krijgt een arbeidskorting", "Ze betaalt voortaan bpm"], "Daar staat tegenover dat ze de hypotheekrente mag aftrekken."),
 ("Wat gebeurt er met de belasting als je meer aftrekposten hebt?", ["Je betaalt minder belasting", "Je betaalt meer belasting", "Je betaalt evenveel belasting", "Je betaalt geen belasting meer"], "Aftrekposten maken je belastbaar inkomen lager."),
 ("Schijf 1 loopt t/m €38.400. Schijf 2 loopt t/m €76.800. Iemand verdient €40.000 en krijgt €1.000 loonsverhoging. In welke schijf valt die verhoging?", ["Schijf 2", "Schijf 1", "Schijf 3", "In alle schijven"], "€40.000 is meer dan €38.400 en minder dan €76.800."),
 ("Waarom is het Nederlandse tarief progressief?", ["Een hogere schijf heeft een hoger percentage", "Iedereen betaalt precies hetzelfde percentage", "Een lagere schijf heeft een hoger percentage", "Mensen met een hoog inkomen betalen niets"], "Hoe hoger het inkomen, hoe hoger het percentage."),
 ("Sara heeft €20.000 spaargeld. Het heffingsvrij vermogen is €57.000. Wat betaalt zij in box 3?", ["Niets", "1,4% van €20.000", "36% van €20.000", "36% van €57.000"], "Haar vermogen is lager dan het heffingsvrij vermogen."),
 ("Wat gaat er als laatste van de berekende belasting af?", ["De heffingskortingen", "De aftrekposten", "Het eigenwoningforfait", "Het fictief rendement"], "Box 1 + box 3 − heffingskortingen."),
 ("Het aantal AOW'ers stijgt sneller dan het aantal werkenden. Wat gebeurt er met de i/a-ratio?", ["Die stijgt", "Die daalt", "Die blijft gelijk", "Die wordt nul"], "Meer inactieven per actieve."),
 ("De overheid verhoogt alleen het tarief van de hoogste schijf. Wat is het gevolg?", ["Nivellering", "Denivellering", "Vergrijzing", "Privatisering"], "Hoge inkomens gaan meer betalen: de verschillen worden kleiner."),
 ("Iemand verzwijgt met opzet inkomsten bij zijn aangifte. Hoe heet dat?", ["Belastingontduiking", "Belastingaftrek", "Heffingskorting", "Naheffing"], "Dat is strafbaar."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Loonheffing is inkomstenbelasting die je vooruit betaalt.", True),
   gf("Het eigenwoningforfait is een aftrekpost.", False),
   gf("Bij een proportioneel tarief betaalt iedereen hetzelfde percentage.", True),
   gf("Bij nivellering worden de verschillen tussen inkomens in verhouding groter.", False),
   gf("De motorrijtuigenbelasting betaal je voor het bezit van een auto.", True)],
   ["Het eigenwoningforfait tel je bij je inkomen op.", "Bij nivellering worden de verschillen kleiner."])]),
 opgave(2, "De aangifte van Yara", [
   deel("a", "Bereken het eigenwoningforfait van Yara.", [num(1330, "Eigenwoningforfait", "€", tol=0.5)], "(0,35 : 100) × 380.000 = €1.330"),
   deel("b", "Schrijf eerst de formule op. Bereken daarna het belastbaar inkomen van Yara.", [num(33330, "Belastbaar inkomen", "€", tol=0.5)], ["Belastbaar inkomen = inkomsten + eigenwoningforfait − aftrekposten", "38.500 + 1.330 = 39.830", "Aftrekposten: 5.600 + 900 = 6.500", "39.830 − 6.500 = €33.330"]),
   deel("c", "Bereken de belasting in box 1. Yara's hele inkomen valt in schijf 1 (35,8%). Rond naar beneden af op hele euro's.", [num(11932, "Belasting box 1", "€", tol=0.5)], "(35,8 : 100) × 33.330 = 11.932,14 → €11.932"),
   deel("d", "Yara heeft €2.900 aan heffingskortingen en betaalt niets in box 3. Bereken de verschuldigde inkomstenbelasting.", [num(9032, "Te betalen", "€", tol=0.5)], "11.932 + 0 − 2.900 = €9.032"),
   deel("e", "Op het loon van Yara is dit jaar €9.600 loonheffing ingehouden. Krijgt ze geld terug of moet ze bijbetalen? Bereken ook het bedrag.", [keuze("Yara", ["Krijgt geld terug", "Moet bijbetalen"], 0), num(568, "Bedrag", "€", tol=0.5)], "Ze heeft €9.600 betaald en moest €9.032 betalen. 9.600 − 9.032 = €568 terug."),
  ], tekst="Yara verdient €38.500 loon. Haar huis heeft een WOZ-waarde van €380.000. Het eigenwoningforfait is 0,35% van de WOZ-waarde. Hypotheekrente: €5.600. Giften aan goede doelen: €900."),
 opgave(3, "Een hoog inkomen", [
   deel("a", "Hoeveel euro van het inkomen valt in schijf 2? En hoeveel in schijf 3?", [num(38400, "In schijf 2", "€", tol=0.5), num(13200, "In schijf 3", "€", tol=0.5)], ["Schijf 2: 76.800 − 38.400 = €38.400", "Schijf 3: 90.000 − 76.800 = €13.200"]),
   deel("b", "Bereken de belasting in elke schijf. Rond elke schijf naar beneden af op hele euro's.", [num(13747, "Schijf 1", "€", tol=0.5), num(14400, "Schijf 2", "€", tol=0.5), num(6534, "Schijf 3", "€", tol=0.5)], ["(35,8 : 100) × 38.400 = 13.747,20 → €13.747", "(37,5 : 100) × 38.400 = €14.400", "(49,5 : 100) × 13.200 = €6.534"]),
   deel("c", "Bereken de totale belasting in box 1.", [num(34681, "Belasting box 1", "€", tol=0.5)], "13.747 + 14.400 + 6.534 = €34.681"),
  ], tekst="Het belastbaar inkomen van meneer De Wit is €90.000. Schijf 1 loopt t/m €38.400 (35,8%). Schijf 2 loopt van €38.400 t/m €76.800 (37,5%). Daarboven geldt schijf 3 (49,5%)."),
 opgave(4, "Vermogen in box 3", [
   deel("a", "Bereken het vermogen van mevrouw Bakker. Bereken daarna haar belastbaar vermogen.", [num(95000, "Vermogen", "€", tol=0.5), num(38000, "Belastbaar vermogen", "€", tol=0.5)], ["75.000 + 30.000 − 10.000 = €95.000", "95.000 − 57.000 = €38.000"]),
   deel("b", "Bereken het fictief rendement. Het rendement op de schulden trek je eraf.", [num(2590, "Fictief rendement", "€", tol=0.5)], ["Spaargeld: (1,4 : 100) × 75.000 = €1.050", "Beleggingen: (6,0 : 100) × 30.000 = €1.800", "Schulden: (2,6 : 100) × 10.000 = €260", "1.050 + 1.800 − 260 = €2.590"]),
   deel("c", "Van het fictief rendement telt 40% mee. Daarover betaalt mevrouw Bakker 36% belasting. Bereken de belasting in box 3. Rond naar beneden af op hele euro's.", [num(372, "Belasting box 3", "€", tol=0.5)], ["(40 : 100) × 2.590 = €1.036", "(36 : 100) × 1.036 = 372,96 → €372"]),
  ], tekst="Mevrouw Bakker heeft €75.000 spaargeld, €30.000 beleggingen en €10.000 schulden. Het heffingsvrij vermogen is €57.000. Fictief rendement: spaargeld 1,4%, beleggingen 6,0%, schulden 2,6%."),
 opgave(5, "Eerlijk verdeeld?", [
   deel("a", "Bereken met hoeveel procent elk inkomen stijgt. Rond af op 1 decimaal.", [num(6, "Laag inkomen", "%"), num(2, "Hoog inkomen", "%")], ["(nieuw − oud) : oud × 100", "(2.120 − 2.000) : 2.000 × 100 = 6,0%", "(6.120 − 6.000) : 6.000 × 100 = 2,0%"]),
   deel("b", "Is deze maatregel nivellerend of denivellerend? Leg uit met de procenten.", [keuze("De maatregel is", ["Nivellerend", "Denivellerend"], 0), open_("5b", "Is deze maatregel nivellerend of denivellerend? Leg uit met de procenten.", "Uitleg", "Nivellerend: het lage inkomen stijgt in procenten meer (6%) dan het hoge inkomen (2%). De verschillen worden in verhouding kleiner.", ["het lage inkomen stijgt in procenten meer dan het hoge inkomen"])], "Lage inkomens gaan er in procenten meer op vooruit: nivellering."),
   deel("c", "Kies bij elke belasting het juiste beginsel.", [keuze("Inkomstenbelasting met een progressief tarief", BEG, 0), keuze("Motorrijtuigenbelasting", BEG, 1), keuze("Extra heffingskorting voor AOW'ers", BEG, 0)], "Draagkracht: wie meer kan betalen, betaalt meer. Profijt: je betaalt voor wat je gebruikt."),
   deel("d", "Leg uit waarom de overheid de AOW-leeftijd heeft verhoogd. Gebruik het woord vergrijzing.", [open_("5d", "Leg uit waarom de overheid de AOW-leeftijd heeft verhoogd. Gebruik het woord vergrijzing.", "AOW-leeftijd", "Door de vergrijzing krijgen steeds meer mensen AOW, terwijl de actieven de premies betalen. Door de AOW-leeftijd te verhogen blijft de AOW betaalbaar.", ["door vergrijzing hebben steeds meer mensen recht op AOW", "een hogere AOW-leeftijd houdt de AOW betaalbaar"])], "Meer ouderen, dus meer uitkeringen. Later met pensioen houdt het betaalbaar."),
  ], tekst="De overheid geeft iedereen €120 per maand extra. Een laag inkomen gaat van €2.000 naar €2.120. Een hoog inkomen gaat van €6.000 naar €6.120."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 6", min=50, mc="mc_a", open=None, rek="rek_a")))
