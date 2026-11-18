# Bron van toetsen.json. Draai: python3 -I economie/j3h2/bron/toetsen.py
# Nieuw geschreven: zelfde soort vragen als de toetsen van de docent, andere situaties. Niets overgenomen uit een proefwerk of SE.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

WET = ["Warenwet", "Wet koop op afstand", "Colportagewet", "Wet productaansprakelijkheid"]
CC = ["Consumeren", "Consuminderen"]
mc_a = mc(32, [
 ("De Consumentenbond test twintig fietssloten van verschillende merken. Hoe heet zo'n test?", ["Vergelijkend warenonderzoek", "Productaansprakelijkheid", "Colportage", "Consumer power"], "Verschillende merken van hetzelfde product worden vergeleken."),
 ("In een test staat bij een fietsslot: 'goed slot voor een lage prijs'. Welk oordeel past daarbij?", ["Beste koop", "Beste uit de test", "Keurmerk", "Energielabel"], "Beste koop: de beste verhouding tussen prijs en kwaliteit."),
 ("Een pot van 400 gram kost €1,60. Wat kost 100 gram?", ["€0,40", "€0,25", "€0,64", "€4,00"], "(1,60 : 400) × 100 = €0,40."),
 ("Op een doos eieren staat een logo voor dierenwelzijn. Wat is dat logo?", ["Een keurmerk", "Een energielabel", "Een garantiebewijs", "Een koopcontract"], "Een keurmerk laat zien dat een product aan eisen voldoet."),
 ("Noah koopt online een jas. Na 10 dagen wil hij de jas terugsturen. Mag dat?", ["Ja, binnen 14 dagen mag dat", "Nee, de koop is definitief", "Ja, maar alleen als de jas stuk is", "Nee, dat mag alleen in een winkel"], "Bij een koop op afstand heb je 14 dagen bedenktijd."),
 ("Wie controleert of het eten in een snackbar veilig is?", ["De NVWA", "De ACM", "Het kadaster", "De notaris"], "De NVWA houdt toezicht op voedsel en producten."),
 ("Welke organisatie let erop dat bedrijven consumenten eerlijk behandelen?", ["De ACM", "Het Nibud", "Het CBS", "Het kadaster"], "ACM: Autoriteit Consument & Markt."),
 ("Een gezin met een laag inkomen huurt bij een woningcorporatie. Welke woning is dat?", ["Een sociale huurwoning", "Een woning in de vrije sector", "Een koopwoning", "Een vakantiewoning"], "Sociale huurwoningen zijn bedoeld voor mensen met een lager inkomen."),
 ("Koper en verkoper zijn het eens over de prijs van een huis. Wat tekenen zij eerst?", ["Het voorlopig koopcontract", "De akte bij de notaris", "De inschrijving bij het kadaster", "De aanvraag voor huurtoeslag"], "Daarna volgt de bedenktijd en later de notaris."),
 ("Welke belasting betaalt alleen de eigenaar van een woning?", ["Onroerendezaakbelasting", "Afvalstoffenheffing", "Rioolheffing", "Hondenbelasting"], "Huurders betalen geen ozb."),
 ("Door de uitstoot van CO₂ warmt de aarde op. Hoe heet schade zoals deze?", ["Milieuschade", "Gevolgschade", "Waterschade", "Schermschade"], "Ons gedrag heeft nadelige gevolgen voor het milieu."),
 ("De gemeente betaalt het opruimen van zwerfafval met belastinggeld. Wat zijn dit?", ["Maatschappelijke kosten", "Kosten koper", "Vaste lasten", "Kredietkosten"], "De hele samenleving betaalt mee."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een consumentenorganisatie komt op voor de producenten.", False),
   gf("De 'beste koop' is altijd het duurste product uit de test.", False),
   gf("De uitspraak van de Geschillencommissie is bindend.", True),
   gf("Een huurder betaalt onroerendezaakbelasting.", False),
   gf("Een energielabel is verplicht voor woningen.", True)],
   ["Een consumentenorganisatie komt op voor de consumenten.", "De 'beste koop' heeft de beste verhouding tussen prijs en kwaliteit.", "Alleen de eigenaar van een woning betaalt ozb."])]),
 opgave(2, "Sta je in je recht?", [
   deel("a", "Kies bij elke situatie de wet die de consument beschermt.", [keuze("In een pak koekjes zit een stukje glas", WET, 0), keuze("Een verkoper aan de deur verkoopt je een krantenabonnement", WET, 2), keuze("Je bestelt een spel in een webshop en stuurt het terug", WET, 1), keuze("De accu van een nieuwe e-bike ontploft en je schuur brandt af", WET, 3)], "Warenwet: veilige producten. Colportagewet: verkoop aan de deur. Koop op afstand: internet en telefoon. Productaansprakelijkheid: schade door een fout in het product."),
   deel("b", "Sam koopt in een winkel nieuwe oortjes. Na twee maanden doen ze het niet meer. Sam heeft ze normaal gebruikt. De winkel zegt: 'Pech gehad.' Leg uit of de winkel gelijk heeft.", [open_("2b", "Sam koopt in een winkel nieuwe oortjes. Na twee maanden doen ze het niet meer. Sam heeft ze normaal gebruikt. De winkel zegt: 'Pech gehad.' Leg uit of de winkel gelijk heeft.", "Garantie", "De winkel heeft geen gelijk. Een product moet deugdelijk zijn: bij normaal gebruik moet het een redelijke tijd meegaan. Sam heeft recht op garantie, dus de winkel moet het oplossen.", ["de winkel heeft geen gelijk: Sam heeft recht op garantie", "een product moet bij normaal gebruik een redelijke tijd meegaan (deugdelijk)"])], "Een product moet deugdelijk zijn. De verkoper moet het oplossen."),
  ]),
 opgave(3, "Rijst vergelijken", [
   deel("a", "Bereken wat 100 gram kost van het kleine pak.", [num(0.37, "Klein pak, per 100 gram", "€", tol=0.005)], "(prijs : aantal gram) × 100 = (1,48 : 400) × 100 = €0,37"),
   deel("b", "Bereken wat 100 gram kost van het grote pak.", [num(0.32, "Groot pak, per 100 gram", "€", tol=0.005)], "(3,20 : 1.000) × 100 = €0,32"),
   deel("c", "Welk pak is per 100 gram het goedkoopst?", [keuze("Het goedkoopst is", ["Het kleine pak", "Het grote pak"], 1)], "€0,32 is minder dan €0,37."),
   deel("d", "Een gids test twee merken rijst. Merk A krijgt een 8,9 en kost €3,90. Merk B krijgt een 8,1 en kost €1,60. Welk merk is 'beste uit de test'?", [keuze("Beste uit de test", ["Merk A", "Merk B"], 0)], "Beste uit de test is het merk met de hoogste kwaliteit."),
  ], tekst="In de supermarkt ligt rijst in twee maten. Het kleine pak van 400 gram kost €1,48. Het grote pak van 1.000 gram kost €3,20."),
 opgave(4, "De huur van Emma", [
   deel("a", "Bereken hoeveel huur Emma zelf betaalt.", [num(456, "Zelf betalen", "€", tol=0.005)], "648 − 192 = €456,00"),
   deel("b", "De huur stijgt van €648,00 naar €673,92. Bereken met hoeveel procent de huur stijgt.", [num(4, "Stijging", "%", tol=0.05)], "(nieuw − oud) : oud × 100 = (673,92 − 648) : 648 × 100 = 4,0%"),
   deel("c", "Hoe wordt de huur van een sociale huurwoning bepaald?", [keuze("De huur wordt bepaald", ["Met een puntensysteem", "Door de makelaar", "Door de notaris"], 0)], "Punten voor onder andere de oppervlakte en het energielabel."),
  ], tekst="Emma huurt een sociale huurwoning van een woningcorporatie. De huur is €648,00 per maand. Zij krijgt €192,00 huurtoeslag per maand."),
 opgave(5, "Een huis kopen", [
   deel("a", "Bereken de kosten koper.", [num(11400, "Kosten koper", "€", tol=0.005)], "(percentage : 100) × koopprijs = (4 : 100) × 285.000 = €11.400,00"),
   deel("b", "Bereken wat de familie in totaal betaalt (koopprijs + kosten koper).", [num(296400, "Totaal", "€", tol=0.005)], "285.000 + 11.400 = €296.400,00"),
   deel("c", "De makelaar van de verkoper krijgt 1,5% van de verkoopprijs. Bereken hoeveel de makelaar krijgt.", [num(4275, "Makelaar", "€", tol=0.005)], "(1,5 : 100) × 285.000 = €4.275,00"),
   deel("d", "De WOZ-waarde van het huis is €270.000. De gemeente rekent 0,11% ozb per jaar. Bereken de ozb.", [num(297, "Ozb", "€", tol=0.005)], "(0,11 : 100) × 270.000 = €297,00"),
   deel("e", "Welke stap komt het laatst?", [keuze("De laatste stap", ["Een bod uitbrengen", "Het voorlopig koopcontract tekenen", "De inschrijving bij het kadaster"], 2)], "Eerst bieden, dan het contract, dan de notaris en het kadaster."),
  ], tekst="Familie Jansen koopt een huis voor €285.000. De kosten koper zijn 4% van de koopprijs."),
 opgave(6, "Zuinig met energie", [
   deel("a", "Kies bij elke keuze: consumeren of consuminderen.", [keuze("Een kapotte rits laten maken", CC, 1), keuze("Elk seizoen een nieuwe jas kopen", CC, 0), keuze("Een tweedehands fiets kopen in plaats van een nieuwe", CC, 1)], "Consuminderen: bewust minder nieuw kopen en langer gebruiken."),
   deel("b", "Bereken hoeveel euro de nieuwe droger per jaar bespaart.", [num(51, "Besparing per jaar", "€", tol=0.005)], "(verbruik oud − verbruik nieuw) × prijs per kWh = (420 − 250) × 0,30 = €51,00"),
   deel("c", "De nieuwe droger kost €459,00. Bereken na hoeveel jaar de droger is terugverdiend.", [num(9, "Aantal jaren", "jaar", tol=0.05)], "459 : 51 = 9 jaar"),
   deel("d", "Leg uit wat maatschappelijke kosten zijn. Geef ook een voorbeeld.", [open_("6d", "Leg uit wat maatschappelijke kosten zijn. Geef ook een voorbeeld.", "Maatschappelijke kosten", "Maatschappelijke kosten zijn nadelen waar de hele samenleving last van heeft en aan meebetaalt. Bijvoorbeeld de kosten van het opruimen van afval of het beschermen van de natuur.", ["nadelen of kosten voor de hele samenleving", "een goed voorbeeld (afval opruimen, natuur beschermen, vervuiling herstellen)"])], "Nadelen voor de hele samenleving, zoals de kosten van afval opruimen."),
  ], tekst="Een oude droger verbruikt 420 kWh per jaar. Een nieuwe droger met een beter energielabel verbruikt 250 kWh per jaar. Stroom kost €0,30 per kWh."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 2", min=50, mc="mc_a", open=None, rek="rek_a")))
