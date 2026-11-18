# Bron van toetsen.json. Draai: python3 -I economie/j2h4/bron/toetsen.py
# Oefentoets A bij jaar 2 mavo H4 "Hoe maken we het?". Nieuw geschreven bij de lesapp van de docent: zelfde stof, andere situaties.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

mc_a = mc(24, [
 ("Een zagerij verkoopt planken aan een meubelfabriek. De fabriek verkoopt tafels aan een winkel. Hoe heet deze rij bedrijven?", ["De bedrijfskolom", "De kringloopeconomie", "De arbeidsverdeling", "De productiefactoren"], "Alle bedrijven die na elkaar aan een product werken."),
 ("Welk bedrijf staat bovenaan in de bedrijfskolom van een houten tafel?", ["Het bedrijf dat de bomen kapt", "De winkel die de tafel verkoopt", "De fabriek die de tafel maakt", "De klant die de tafel koopt"], "Bovenaan staat het bedrijf dat de grondstof uit de natuur haalt."),
 ("Een pizzabakker gebruikt een oven. Bij welke productiefactor hoort de oven?", ["Kapitaal", "Arbeid", "Natuur", "Winst"], "Een oven is een kapitaalgoed."),
 ("Een fabriek loost afval in een rivier. De gemeente maakt het water schoon met belastinggeld. Hoe heten deze kosten?", ["Maatschappelijke kosten", "Bedrijfskosten", "Afschrijvingskosten", "Scholingskosten"], "De samenleving betaalt, niet het bedrijf."),
 ("Welk voorbeeld past bij een lineaire economie?", ["Een wegwerpbeker die na gebruik in de afvalbak gaat", "Een oud shirt waar een nieuw shirt van wordt gemaakt", "Een telefoon die je laat repareren en weer gebruikt", "Een jas die je tweedehands koopt in een winkel"], "Lineair: grondstof, product, weggooien."),
 ("Een bedrijf koopt een nieuwe bestelbus om sneller te bezorgen. Hoe heet dat?", ["Investeren", "Afschrijven", "Recycling", "Specialiseren"], "Investeren is kapitaalgoederen kopen."),
 ("In een magazijn rijden robots die zelf de pakketten pakken. Waar is dit een voorbeeld van?", ["Robotisering", "Mechanisering", "Arbeidsintensief werk", "Een lineaire economie"], "Robots doen het werk: robotisering."),
 ("Een bakkerij maakt met dezelfde vijf bakkers meer broden dan vorig jaar. Wat is er gebeurd?", ["De arbeidsproductiviteit is gestegen", "De arbeidsproductiviteit is gedaald", "De restwaarde is nu gestegen", "De afzet is gedaald"], "Elke bakker maakt nu meer broden."),
 ("In een autofabriek doen machines bijna al het werk. Hoe noem je deze manier van produceren?", ["Kapitaalintensief", "Arbeidsintensief", "Dienstverlenend", "Agrarisch"], "Naar verhouding meer machines dan mensen."),
 ("Een ijssalon verkoopt op een dag 300 ijsjes. Wat is die 300?", ["De afzet", "De omzet", "De winst", "De kostprijs"], "De afzet is het aantal verkochte producten."),
 ("De kosten van een winkel zijn hoger dan de omzet. Wat maakt de winkel?", ["Verlies", "Winst", "Omzet", "Afzet"], "Kosten hoger dan de omzet is verlies."),
 ("Wat is een nadeel van een eigen bedrijf, vergeleken met loondienst?", ["Je hebt geen zeker inkomen", "Je hebt een vast loon", "Je hebt altijd een baas", "Je mag geen winst maken"], "Een ondernemer heeft geen vast inkomen en loopt risico."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De consument hoort bij de bedrijfskolom.", False),
   gf("Natuur, arbeid en kapitaal zijn de drie productiefactoren.", True),
   gf("Recycling is van afval nieuwe materialen maken.", True),
   gf("De zelfscankassa is een voorbeeld van mechanisering.", False),
   gf("Een hoge omzet betekent altijd een hoge winst.", False)],
   ["De consument is geen bedrijf en bewerkt het product niet.", "De zelfscankassa is automatisering: een computer stuurt het werk aan.", "Van de omzet gaan eerst alle kosten af."])]),
 opgave(2, "Een houten kast", [
   deel("a", "Bereken de toegevoegde waarde van de meubelmaker.", [num(135, "Toegevoegde waarde meubelmaker", "€")], "Toegevoegde waarde = verkoopprijs − inkoopprijs = €180 − €45 = €135."),
   deel("b", "Bereken de toegevoegde waarde van de winkel.", [num(80, "Toegevoegde waarde winkel", "€")], "€260 − €180 = €80."),
   deel("c", "De meubelmaker maakt in een maand 25 kasten. De totale productiekosten zijn €3.250. Bereken de kostprijs per kast.", [num(130, "Kostprijs per kast", "€")], "Kostprijs per product = totale productiekosten : aantal producten = €3.250 : 25 = €130."),
   deel("d", "Uit welke twee onderdelen bestaat de toegevoegde waarde?",
        [open_("2d", "Uit welke twee onderdelen bestaat de toegevoegde waarde?", "Toegevoegde waarde", "De kosten van de bewerking en de winst.", ["de kosten van de bewerking", "de winst"])],
        "De toegevoegde waarde bestaat uit de kosten van de bewerking en de winst."),
  ], tekst="Een zagerij verkoopt hout voor €45 aan een meubelmaker. De meubelmaker maakt er een kast van en verkoopt die voor €180 aan een winkel. De winkel verkoopt de kast voor €260."),
 opgave(3, "De nieuwe oven", [
   deel("a", "Bereken de afschrijving per jaar.", [num(2000, "Afschrijving per jaar", "€")], "(aanschafprijs − restwaarde) : aantal gebruiksjaren = (€18.400 − €2.400) : 8 = €2.000."),
   deel("b", "Wat voor kosten zijn afschrijvingskosten?", [keuze("Afschrijvingskosten zijn", ["Bedrijfskosten", "Maatschappelijke kosten"], 0)], "Het bedrijf betaalt ze zelf: bedrijfskosten."),
   deel("c", "Leg uit waarom een bedrijf investeert.",
        [open_("3c", "Leg uit waarom een bedrijf investeert.", "Investeren", "Om meer, beter of goedkoper te kunnen produceren.", ["om meer, beter of goedkoper te produceren (één van de drie is genoeg)"])],
        "Een bedrijf investeert om meer, beter of goedkoper te produceren."),
   deel("d", "Met de oude oven bakten 4 bakkers samen 2.400 broden per week. Bereken de arbeidsproductiviteit.", [num(600, "Broden per bakker", "", tol=0.5)], "Arbeidsproductiviteit = totale productie : aantal werknemers = 2.400 : 4 = 600 broden per bakker."),
   deel("e", "Met de nieuwe oven bakken de 4 bakkers 3.000 broden per week. Bereken met hoeveel procent de arbeidsproductiviteit is gestegen. Rond af op 1 decimaal.", [num(25, "Stijging", "%")],
        "Nieuw: 3.000 : 4 = 750 broden. (nieuw − oud) : oud × 100 = (750 − 600) : 600 × 100 = 25,0%."),
  ], tekst="Bakker Jamal koopt een nieuwe oven voor €18.400. De oven gaat 8 jaar mee. Daarna is de restwaarde €2.400."),
 opgave(4, "Schoon produceren", [
   deel("a", "Leg uit wat 'de vervuiler betaalt' betekent.",
        [open_("4a", "Leg uit wat 'de vervuiler betaalt' betekent.", "De vervuiler betaalt", "Wie milieuschade veroorzaakt, moet die zelf oplossen en betalen.", ["wie de schade veroorzaakt, betaalt (of lost het op)"])],
        "Wie milieuschade veroorzaakt, moet het zelf oplossen en betalen."),
   deel("b", "De buren hebben last van de vieze lucht van de fabriek. Wat is dat?", [keuze("De vieze lucht is", ["Een negatief extern effect", "Een toegevoegde waarde", "Een restwaarde"], 0)], "Een nadelig gevolg van productie voor anderen."),
   deel("c", "Noem twee dingen die de fabriek kan doen om duurzamer te produceren.",
        [open_("4c", "Noem twee dingen die de fabriek kan doen om duurzamer te produceren.", "Duurzaam produceren", "Bijvoorbeeld: groene stroom gebruiken, minder afval maken, afval recyclen of bomen laten planten.", ["een eerste juist voorbeeld (groene stroom, minder afval, recycling, bomen planten)", "een tweede juist voorbeeld"])],
        "Duurzaam produceren is produceren met geen of minder schade voor mens en milieu."),
   deel("d", "De fabriek maakt nieuwe flessen van ingeleverde flessen. Bij welke economie past dat?", [keuze("Dat past bij een", ["Kringloopeconomie", "Lineaire economie"], 0)], "Afval is de grondstof voor nieuwe producten."),
  ], tekst="Een frisdrankfabriek gebruikt veel energie. Daarbij komt CO₂ vrij."),
 opgave(5, "De saladebar van Lotte", [
   deel("a", "Bereken de omzet van deze week.", [num(3150, "Omzet", "€")], "Omzet = afzet × verkoopprijs = 420 × €7,50 = €3.150."),
   deel("b", "Bereken de totale kosten.", [num(2500, "Totale kosten", "€")], "€1.300 + €450 + €600 + €150 = €2.500."),
   deel("c", "Bereken de winst.", [num(650, "Winst", "€")], "Winst = omzet − kosten = €3.150 − €2.500 = €650."),
   deel("d", "De week erna is de omzet €2.250. De kosten blijven €2.500. Maakt Lotte winst of verlies? Hoeveel?", [keuze("Lotte maakt", ["Verlies", "Winst"], 0), num(250, "Bedrag", "€")], "€2.250 − €2.500 = −€250. Dat is €250 verlies."),
   deel("e", "Bereken de afzet in die tweede week.", [num(300, "Afzet", "", tol=0.5)], "Afzet = omzet : verkoopprijs = €2.250 : €7,50 = 300 salades."),
   deel("f", "Wanneer gaat een bedrijf failliet?",
        [open_("5f", "Wanneer gaat een bedrijf failliet?", "Failliet", "Als het bedrijf lange tijd verlies maakt en zijn schulden niet meer kan betalen.", ["lange tijd verlies", "de schulden niet meer kunnen betalen"])],
        "Een bedrijf dat lang verlies lijdt en zijn schulden niet kan betalen, gaat failliet."),
  ], tekst="Lotte heeft een saladebar. Deze week verkoopt zij 420 salades voor €7,50 per stuk. Haar kosten: inkoop €1.300, huur €450, loon €600 en energie €150."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 4", min=45, mc="mc_a", open=None, rek="rek_a")))
