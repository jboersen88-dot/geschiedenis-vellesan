# Bron van toetsen.json. Draai: python3 -I economie/j4h7/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

MAATR = ["Invoerrechten", "Contingentering", "Invoerverbod", "Exportsubsidie"]
VERKEER = ["Goederen en diensten", "Personen", "Kapitaal"]
mc_a = mc(71, [
 ("In de haven komen sinaasappels uit Brazilië aan. Ze worden opnieuw verpakt en doorverkocht aan Polen. Hoe heet dit?", ["Wederuitvoer", "Contingentering", "Harmonisatie", "Specialisatie"], "Invoeren en bijna onbewerkt weer uitvoeren."),
 ("Land A heeft een exportquote van 12%. Land B heeft een exportquote van 70%. Wat klopt?", ["Land B heeft een meer open economie", "Land A heeft een meer open economie", "Land B heeft een handelstekort", "Land A heeft een handelsoverschot"], "Een hoge quote hoort bij een open economie."),
 ("Een Nederlander werkt in België en krijgt daar loon. Waar zie je dat loon terug?", ["Op de betalingsbalans", "Op de rijksbegroting", "In de miljoenennota", "In de exportquote"], "De betalingsbalans telt ook lonen over de grens mee."),
 ("De koers van de euro stijgt ten opzichte van het Britse pond. Wat merkt een Nederlandse exporteur?", ["Zijn producten worden duurder voor Britten", "Zijn producten worden goedkoper voor Britten", "Hij krijgt subsidie van de overheid", "Hij betaalt meer invoerrechten"], "Britten moeten meer ponden betalen voor dezelfde euro's."),
 ("Waarom maakt een land niet alles zelf?", ["Specialiseren levert meer welvaart op", "Zelf maken is door de WTO verboden", "Importeren is altijd gratis", "Elk land heeft dezelfde grondstoffen"], "Je maakt waar je relatief goed in bent en importeert de rest."),
 ("Wat is een gevolg van invoerrechten voor bedrijven in het eigen land?", ["Ze krijgen minder last van buitenlandse concurrentie", "Ze moeten hun eigen producten goedkoper maken", "Ze mogen niet meer naar het buitenland exporteren", "Ze krijgen meer concurrentie uit het buitenland"], "Buitenlandse producten worden duurder."),
 ("Welke organisatie let erop dat landen afspraken over invoerrechten nakomen?", ["De WTO", "De ECB", "De EMU", "De SER"], "De Wereldhandelsorganisatie."),
 ("De btw-tarieven in de EU-landen worden meer gelijk gemaakt. Hoe heet dat?", ["Harmonisatie", "Globalisering", "Protectie", "Wederuitvoer"], "Regels en tarieven op elkaar afstemmen."),
 ("Een Nederlands bedrijf koopt onderdelen in Italië. Welk voordeel heeft de euro?", ["Geen risico dat de wisselkoers verandert", "Geen btw over de onderdelen", "Geen vervoerskosten naar Nederland", "Geen concurrentie van andere bedrijven"], "Beide landen betalen met dezelfde munt."),
 ("De inflatie in de eurozone is veel hoger dan 2%. Wie moet dan iets doen?", ["De ECB", "De WTO", "Het CBS", "De ACM"], "De ECB bewaakt de prijsstabiliteit."),
 ("In een handelsverdrag staan ook eisen over arbeidsomstandigheden. Waarom wil de EU dat?", ["Een akkoord moet bijdragen aan een eerlijkere wereld", "Een akkoord moet de import zo duur mogelijk maken", "Een akkoord moet de export van de EU beperken", "Een akkoord moet de WTO overbodig maken"], "Nederland en de EU willen een betere en eerlijkere wereld."),
 ("Een kledingbedrijf verhuist zijn fabriek van Nederland naar een lagelonenland. Wat is een gevolg in Nederland?", ["Productiemedewerkers verliezen hun baan", "De invoerrechten op kleding stijgen", "De koers van de euro daalt meteen", "De exportquote wordt nul procent"], "Een nadeel van globalisering."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Nederland heeft een open economie.", True),
   gf("Bij een handelsoverschot is de import groter dan de export.", False),
   gf("Contingentering betekent dat er een beperkt aantal producten mag worden ingevoerd.", True),
   gf("Alle landen van de EU betalen met de euro.", False),
   gf("De EU sluit handelsverdragen namens Nederland.", True)],
   ["Bij een handelsoverschot is de export groter dan de import.", "De meeste EU-landen hebben de euro, niet alle."])]),
 opgave(2, "De handel van land X", [
   deel("a", "Bereken de exportquote. Rond af op 1 decimaal.", [num(62.5, "Exportquote", "%")], "(exportwaarde : nationaal inkomen) × 100 = (500 : 800) × 100 = 62,5%."),
   deel("b", "Bereken het handelssaldo in miljard euro. Typ een min-teken bij een tekort.", [num(60, "Handelssaldo (miljard euro)", tol=0.5)], "exportwaarde − importwaarde = 500 − 440 = 60. Een handelsoverschot van €60 miljard."),
   deel("c", "Heeft land X een open of een gesloten economie?", [keuze("Land X heeft een", ["Open economie", "Gesloten economie"], 0)], "De exportquote is hoog: veel uitvoer in verhouding tot het nationaal inkomen."),
   deel("d", "Noem twee redenen waarom een land producten importeert.", [open_("2d", "Noem twee redenen waarom een land producten importeert.", "Redenen voor import", "Bijvoorbeeld: sommige landbouwproducten groeien niet in ons klimaat, sommige grondstoffen zijn er niet of weinig, buitenlandse producten zijn goedkoper of beter, en consumenten willen meer keuze.", ["een eerste juiste reden (klimaat, grondstoffen, goedkoper of beter, meer keuze)", "een tweede juiste reden"])], "Klimaat, grondstoffen, prijs of kwaliteit, en keuze."),
  ], tekst="Het nationaal inkomen van land X is €800 miljard. De exportwaarde is €500 miljard en de importwaarde is €440 miljard."),
 opgave(3, "Staal van buiten de EU", [
   deel("a", "Kies bij elke maatregel de juiste naam.", [keuze("Belasting van 25% op ingevoerd staal", MAATR, 0), keuze("Hooguit 2 miljoen ton staal per jaar invoeren", MAATR, 1), keuze("Staal uit land Y mag de EU niet meer in", MAATR, 2), keuze("Geld van de overheid voor bedrijven die staal uitvoeren", MAATR, 3)],
        "Belasting: invoerrechten. Beperkt aantal: contingentering. Niets erin: invoerverbod. Geld voor uitvoer: exportsubsidie."),
   deel("b", "Een partij staal kost €6.000. Bereken de prijs met 25% invoerrechten.", [num(7500.00, "Prijs met invoerrechten", "€")], "(25 : 100) × 6.000 = 1.500. 6.000 + 1.500 = €7.500,00."),
   deel("c", "Leg uit waarom de EU invoerrechten op staal heft. Gebruik het woord concurrentie.", [open_("3c", "Leg uit waarom de EU invoerrechten op staal heft. Gebruik het woord concurrentie.", "Doel van invoerrechten", "Door invoerrechten wordt staal van buiten de EU duurder. Zo beschermt de EU de productie en de banen bij eigen staalbedrijven tegen concurrentie van buitenaf.", ["ingevoerd staal wordt duurder", "eigen bedrijven en banen worden beschermd tegen buitenlandse concurrentie"])], "Protectie beschermt de eigen productie en werkgelegenheid."),
  ]),
 opgave(4, "Europa zonder grenzen", [
   deel("a", "Kies bij elk voorbeeld het juiste vrije verkeer.", [keuze("Een Poolse timmerman gaat in Nederland werken", VERKEER, 1), keuze("Een Nederlandse bakker koopt meel in Frankrijk", VERKEER, 0), keuze("Je belegt in een Spaans bedrijf", VERKEER, 2)],
        "Werken: personen. Meel kopen: goederen. Beleggen: kapitaal."),
   deel("b", "Noem twee taken van de ECB.", [open_("4b", "Noem twee taken van de ECB.", "Taken van de ECB", "De waarde van de euro bewaken (prijsstabiliteit), het rentepeil bepalen en nieuwe bankbiljetten in omloop brengen.", ["een eerste juiste taak (waarde van de euro bewaken, rentepeil bepalen, bankbiljetten uitgeven)", "een tweede juiste taak"])], "Prijsstabiliteit, rente en bankbiljetten."),
  ]),
 opgave(5, "De wereld wordt kleiner", [
   deel("a", "Bereken met hoeveel procent de export is gestegen. Rond af op 1 decimaal.", [num(4.0, "Stijging", "%")], "(nieuw − oud) : oud × 100 = (676 − 650) : 650 × 100 = 4,0%."),
   deel("b", "Noem twee dingen waar Nederland voor moet zorgen om een sterke internationale concurrentiepositie te houden.", [open_("5b", "Noem twee dingen waar Nederland voor moet zorgen om een sterke internationale concurrentiepositie te houden.", "Concurrentiepositie", "Goed onderwijs, goede gezondheidszorg, een goede infrastructuur en innovaties.", ["een eerste juist punt (onderwijs, gezondheidszorg, infrastructuur, innovaties)", "een tweede juist punt"])], "Onderwijs, zorg, infrastructuur en innovatie."),
   deel("c", "Noem een nadeel van globalisering voor het milieu.", [open_("5c", "Noem een nadeel van globalisering voor het milieu.", "Globalisering en milieu", "Meer handel en productie is slecht voor het milieu: er worden bossen gekapt en soorten planten en dieren sterven uit.", ["een juist nadeel voor het milieu (bossen kappen, soorten sterven uit)"])], "Bossen verdwijnen en soorten sterven uit."),
  ], tekst="De export van Nederland stijgt in een jaar van €650 miljard naar €676 miljard."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 7", min=45, mc="mc_a", open=None, rek="rek_a")))
