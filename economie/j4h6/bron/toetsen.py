# Bron van toetsen.json. Draai: python3 -I economie/j4h6/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

BEG = ["Draagkrachtbeginsel", "Profijtbeginsel"]
mc_a = mc(61, [
 ("Op de loonstrook van Kim staat €412 loonheffing. Aan wie draagt haar werkgever dat bedrag af?", ["De Belastingdienst", "De gemeente", "Het pensioenfonds", "De vakbond"], "De werkgever draagt de loonheffing af aan de fiscus."),
 ("Welke premie zit niet in de loonheffing?", ["Premie werknemersverzekeringen", "Premie volksverzekeringen", "Loonbelasting", "Premie voor de AOW"], "Die premie betaalt de werkgever zelf."),
 ("Daan krijgt een brief waarin staat hoeveel inkomstenbelasting hij moet betalen. Hoe heet die brief?", ["Aanslag", "Aangifte", "Loonstrook", "Miljoenennota"], "Na je aangifte stuurt de Belastingdienst een aanslag."),
 ("Lotte koopt een huis. Wat verandert er in haar aangifte?", ["Ze telt het eigenwoningforfait op", "Ze telt een bijtelling op", "Ze krijgt een arbeidskorting", "Ze betaalt voortaan bpm"], "Daar staat tegenover dat ze de hypotheekrente mag aftrekken."),
 ("Wat gebeurt er met de belasting als je meer aftrekposten hebt?", ["Je betaalt minder belasting", "Je betaalt meer belasting", "Je betaalt evenveel belasting", "Je betaalt geen belasting meer"], "Aftrekposten maken je belastbaar inkomen lager."),
 ("Iemand verdient €40.000. Hij krijgt €1.000 loonsverhoging. In welke schijf valt die verhoging?", ["Schijf 1", "Schijf 2", "In beide schijven", "In geen van beide"], "Schijf 1 loopt tot €68.508."),
 ("Waarom is het Nederlandse tarief progressief?", ["Schijf 2 heeft een hoger percentage", "Iedereen betaalt hetzelfde percentage", "Schijf 1 heeft een hoger percentage", "Hoge inkomens betalen geen belasting"], "Hoe hoger het inkomen, hoe hoger het percentage."),
 ("Sara heeft €20.000 spaargeld. Het heffingsvrij vermogen is €50.000. Wat betaalt zij in box 3?", ["Niets", "1,9% van €20.000", "31% van €20.000", "31% van €50.000"], "Haar vermogen is lager dan het heffingsvrij vermogen."),
 ("Wat gaat er als laatste van de berekende belasting af?", ["De heffingskortingen", "De aftrekposten", "Het eigenwoningforfait", "De bijtelling"], "Box 1 + box 3 − heffingskortingen."),
 ("Het aantal AOW'ers stijgt sneller dan het aantal werkenden. Wat gebeurt er met de i/a-ratio?", ["Die stijgt", "Die daalt", "Die blijft gelijk", "Die wordt nul"], "Meer inactieven per actieve."),
 ("De overheid verhoogt alleen het tarief van schijf 2. Wat is het gevolg?", ["Nivellering", "Denivellering", "Vergrijzing", "Privatisering"], "Hoge inkomens gaan meer betalen: de verschillen worden kleiner."),
 ("Iemand verzwijgt met opzet inkomsten bij zijn aangifte. Hoe heet dat?", ["Belastingontduiking", "Belastingaftrek", "Heffingskorting", "Naheffing"], "Dat is strafbaar."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Loonheffing is inkomstenbelasting die je vooruit betaalt.", True),
   gf("De bijtelling is een aftrekpost.", False),
   gf("Bij een proportioneel tarief betaalt iedereen hetzelfde percentage.", True),
   gf("Bij nivellering worden de verschillen tussen inkomens in verhouding groter.", False),
   gf("De motorrijtuigenbelasting betaal je voor het bezit van een auto.", True)],
   ["De bijtelling tel je bij je inkomen op.", "Bij nivellering worden de verschillen kleiner."])]),
 opgave(2, "De aangifte van Yara", [
   deel("a", "Schrijf eerst de formule op. Bereken daarna het belastbaar inkomen van Yara.", [num(42300, "Belastbaar inkomen", "€", tol=0.5)], ["Belastbaar inkomen = inkomsten + eigenwoningforfait + bijtelling − aftrekposten", "38.500 + 1.300 + 9.000 = 48.800", "Aftrekposten: 5.600 + 900 = 6.500", "48.800 − 6.500 = €42.300"]),
   deel("b", "Bereken de belasting in box 1. Yara's hele inkomen valt in schijf 1 (37,1%). Rond naar beneden af op hele euro's.", [num(15693, "Belasting box 1", "€", tol=0.5)], "(37,1 : 100) × 42.300 = 15.693,30 → €15.693"),
   deel("c", "Yara heeft €2.900 aan heffingskortingen en betaalt niets in box 3. Bereken de verschuldigde inkomstenbelasting.", [num(12793, "Te betalen", "€", tol=0.5)], "15.693 + 0 − 2.900 = €12.793"),
   deel("d", "Op het loon van Yara is dit jaar €13.400 loonheffing ingehouden. Krijgt ze geld terug of moet ze bijbetalen? Bereken ook het bedrag.", [keuze("Yara", ["Krijgt geld terug", "Moet bijbetalen"], 0), num(607, "Bedrag", "€", tol=0.5)], "Ze heeft €13.400 betaald en moest €12.793 betalen. 13.400 − 12.793 = €607 terug."),
  ], tekst="Yara verdient €38.500 loon. Eigenwoningforfait: €1.300. Bijtelling auto van de zaak: €9.000. Hypotheekrente: €5.600. Studiekosten: €900."),
 opgave(3, "Een hoog inkomen", [
   deel("a", "Hoeveel euro van het inkomen valt in schijf 2?", [num(11492, "In schijf 2", "€", tol=0.5)], "80.000 − 68.508 = €11.492"),
   deel("b", "Bereken de belasting in schijf 1 en in schijf 2. Rond elke schijf naar beneden af op hele euro's.", [num(25416, "Schijf 1", "€", tol=0.5), num(5688, "Schijf 2", "€", tol=0.5)], ["(37,1 : 100) × 68.508 = 25.416,47 → €25.416", "(49,5 : 100) × 11.492 = 5.688,54 → €5.688"]),
   deel("c", "Bereken de totale belasting in box 1.", [num(31104, "Belasting box 1", "€", tol=0.5)], "25.416 + 5.688 = €31.104"),
  ], tekst="Het belastbaar inkomen van meneer De Wit is €80.000. Schijf 1 loopt tot €68.508 (37,1%). Daarboven geldt schijf 2 (49,5%)."),
 opgave(4, "Spaargeld in box 3", [
   deel("a", "Bereken het belastbaar vermogen.", [num(40000, "Belastbaar vermogen", "€", tol=0.5)], "90.000 − 50.000 = €40.000"),
   deel("b", "Bereken het fictief rendement.", [num(760, "Fictief rendement", "€", tol=0.5)], "(1,9 : 100) × 40.000 = €760"),
   deel("c", "Bereken de belasting in box 3. Rond naar beneden af op hele euro's.", [num(235, "Belasting box 3", "€", tol=0.5)], "(31 : 100) × 760 = 235,60 → €235"),
  ], tekst="Mevrouw Bakker heeft een vermogen van €90.000. Het heffingsvrij vermogen is €50.000. Het fictief rendement is 1,9% en de belasting is 31%."),
 opgave(5, "Eerlijk verdeeld?", [
   deel("a", "Bereken met hoeveel procent elk inkomen stijgt. Rond af op 1 decimaal.", [num(6, "Laag inkomen", "%"), num(2, "Hoog inkomen", "%")], ["(nieuw − oud) : oud × 100", "(2.120 − 2.000) : 2.000 × 100 = 6,0%", "(6.120 − 6.000) : 6.000 × 100 = 2,0%"]),
   deel("b", "Is deze maatregel nivellerend of denivellerend? Leg uit met de procenten.", [keuze("De maatregel is", ["Nivellerend", "Denivellerend"], 0), open_("5b", "Is deze maatregel nivellerend of denivellerend? Leg uit met de procenten.", "Uitleg", "Nivellerend: het lage inkomen stijgt in procenten meer (6%) dan het hoge inkomen (2%). De verschillen worden in verhouding kleiner.", ["het lage inkomen stijgt in procenten meer dan het hoge inkomen"])], "Lage inkomens gaan er in procenten meer op vooruit: nivellering."),
   deel("c", "Kies bij elke belasting het juiste beginsel.", [keuze("Inkomstenbelasting met een progressief tarief", BEG, 0), keuze("Motorrijtuigenbelasting", BEG, 1), keuze("Extra heffingskorting voor AOW'ers", BEG, 0)], "Draagkracht: wie meer kan betalen, betaalt meer. Profijt: je betaalt voor wat je gebruikt."),
   deel("d", "Leg uit waarom de overheid de AOW-leeftijd heeft verhoogd. Gebruik het woord vergrijzing.", [open_("5d", "Leg uit waarom de overheid de AOW-leeftijd heeft verhoogd. Gebruik het woord vergrijzing.", "AOW-leeftijd", "Door de vergrijzing krijgen steeds meer mensen AOW, terwijl de actieven de premies betalen. Door de AOW-leeftijd te verhogen blijft de AOW betaalbaar.", ["door vergrijzing hebben steeds meer mensen recht op AOW", "een hogere AOW-leeftijd houdt de AOW betaalbaar"])], "Meer ouderen, dus meer uitkeringen. Later met pensioen houdt het betaalbaar."),
  ], tekst="De overheid geeft iedereen €120 per maand extra. Een laag inkomen gaat van €2.000 naar €2.120. Een hoog inkomen gaat van €6.000 naar €6.120."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 6", min=50, mc="mc_a", open=None, rek="rek_a")))
