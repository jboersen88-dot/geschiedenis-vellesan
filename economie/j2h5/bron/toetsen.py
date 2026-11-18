# Bron van toetsen.json. Draai: python3 -I economie/j2h5/bron/toetsen.py
# Oefentoets A bij jaar 2 mavo H5 "Is handel iets voor jou?". Nieuw geschreven bij het materiaal van de docent: zelfde stof, andere situaties.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

mc_a = mc(25, [
 ("Er zijn dit jaar veel meer aardbeien geoogst dan mensen willen kopen. Wat gebeurt er met de prijs?", ["De prijs daalt", "De prijs stijgt", "De prijs blijft gelijk", "De prijs verdubbelt"], "Bij een overschot daalt de prijs."),
 ("Welke markt is een abstracte markt?", ["De arbeidsmarkt", "De weekmarkt", "De supermarkt", "De bouwmarkt"], "Een abstracte markt kun je niet bezoeken."),
 ("Je neef vertelt dat zijn nieuwe schoenen heel fijn lopen. Daarom koop jij ze ook. Welke invloed is dat?", ["Sociale invloed", "Commerciële invloed", "Invloed van reclame", "Invloed van de prijs"], "Je neef wil niets aan jou verdienen."),
 ("Een bakker verhuist naar een drukke winkelstraat. Bij welke P van marketing hoort dat?", ["Plaats", "Prijs", "Product", "Promotie"], "Plaats gaat over waar je het product verkoopt."),
 ("Een bedrijf koopt duizenden pakken koffie bij fabrieken en verkoopt die door aan supermarkten. Wat is dit bedrijf?", ["Een groothandel", "Een detailhandel", "Een consument", "Een webwinkel"], "De groothandel koopt groot in en verkoopt aan winkels."),
 ("Wat betaalt een winkelier met de brutowinstopslag?", ["Zijn kosten en zijn winst", "Alleen zijn inkoopprijs", "De btw voor de overheid", "De prijs van de fabriek"], "Met de opslag betaalt hij zijn kosten. Wat overblijft is winst."),
 ("Welke kosten heeft een webwinkel wel en een gewone winkel bijna niet?", ["Verzendkosten", "Inkoopkosten", "Loonkosten", "Energiekosten"], "Een webwinkel verstuurt pakketten en krijgt retouren."),
 ("Welk btw-tarief geldt voor een brood?", ["9%", "21%", "0%", "19%"], "Eten en drinken valt onder het lage tarief van 9%."),
 ("Voor wie is de btw die een klant in de winkel betaalt?", ["Voor de overheid", "Voor de winkelier", "Voor de fabriek", "Voor de groothandel"], "De winkelier draagt de btw af aan de Belastingdienst."),
 ("Op een bon staat: 'totaal inclusief btw'. Hoe heet deze prijs?", ["De consumentenprijs", "De verkoopprijs", "De inkoopprijs", "De inkoopwaarde"], "De consumentenprijs is de verkoopprijs plus btw."),
 ("Een winkel verkoopt 80 jassen. Wat is die 80?", ["De afzet", "De omzet", "De brutowinst", "De nettowinst"], "De afzet is het aantal verkochte producten."),
 ("Welke kosten horen bij de bedrijfskosten van een winkel?", ["De huur van het pand", "De inkoop van de producten", "De btw op de kassabon", "De winst van de eigenaar"], "Huur, loon, energie en reclame zijn bedrijfskosten."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Bij een tekort stijgt de prijs.", True),
   gf("Een webshop is een concrete markt.", True),
   gf("De verkoopprijs is de prijs inclusief btw.", False),
   gf("De omzet is het aantal producten dat je verkoopt.", False),
   gf("De nettowinst is het inkomen van de ondernemer.", True)],
   ["De verkoopprijs is zonder btw. Met btw heet het de consumentenprijs.", "Het aantal producten is de afzet. De omzet is het geld dat je ontvangt."])]),
 opgave(2, "De stepwinkel", [
   deel("a", "Bereken de brutowinstopslag in euro's.", [num(54, "Brutowinstopslag", "€")], "(percentage : 100) × inkoopprijs = (60 : 100) × €90 = €54."),
   deel("b", "Bereken de verkoopprijs.", [num(144, "Verkoopprijs", "€")], "Verkoopprijs = inkoopprijs + brutowinstopslag = €90 + €54 = €144."),
   deel("c", "Bereken het btw-bedrag. Het btw-tarief is 21%.", [num(30.24, "Btw", "€")], "(percentage : 100) × verkoopprijs = (21 : 100) × €144 = €30,24."),
   deel("d", "Bereken de consumentenprijs.", [num(174.24, "Consumentenprijs", "€")], "Consumentenprijs = verkoopprijs + btw = €144 + €30,24 = €174,24."),
   deel("e", "Een andere winkel in de straat verkoopt dezelfde step goedkoper. Hoe noem je zo'n winkel? En wat kan Sem doen om toch klanten te houden? Noem één ding.",
        [open_("2e", "Een andere winkel in de straat verkoopt dezelfde step goedkoper. Hoe noem je zo'n winkel? En wat kan Sem doen om toch klanten te houden? Noem één ding.", "Concurrentie",
               "Dat is een concurrent. Sem kan bijvoorbeeld zijn prijs verlagen, reclame maken of betere service geven.",
               ["een concurrent", "een juist voorbeeld (prijs verlagen, reclame maken, betere service of kwaliteit)"])],
        "Een concurrent biedt dezelfde soort producten aan. Met de vier P's kun je klanten trekken."),
  ], tekst="Sem heeft een winkel in steps. Hij koopt een step in voor €90. Zijn brutowinstopslag is 60% van de inkoopprijs."),
 opgave(3, "Terug naar de verkoopprijs", [
   deel("a", "Hoeveel procent is de verkoopprijs en hoeveel procent is de consumentenprijs?", [num(100, "Verkoopprijs", "%"), num(121, "Consumentenprijs", "%")], "De verkoopprijs is altijd 100%. Met 21% btw is de consumentenprijs 121%."),
   deel("b", "Bereken de verkoopprijs van de tablet.", [num(300, "Verkoopprijs", "€")], "(consumentenprijs : 121) × 100 = (€363 : 121) × 100 = €300."),
   deel("c", "Bereken hoeveel btw er in de prijs van de tablet zit.", [num(63, "Btw", "€")], "Btw = consumentenprijs − verkoopprijs = €363 − €300 = €63."),
   deel("d", "Een kookboek kost in de winkel €21,80. Dat is inclusief 9% btw. Bereken de verkoopprijs.", [num(20, "Verkoopprijs", "€")], "(consumentenprijs : 109) × 100 = (€21,80 : 109) × 100 = €20,00."),
  ], tekst="Een tablet kost in de winkel €363. Dat is inclusief 21% btw."),
 opgave(4, "Kopen en verkopen", [
   deel("a", "Kies bij elk voorbeeld de juiste invloed.", [keuze("Een influencer laat een drankje zien", ["Sociale invloed", "Commerciële invloed"], 1), keuze("Je zus raadt een serie aan", ["Sociale invloed", "Commerciële invloed"], 0), keuze("Een poster in het bushokje", ["Sociale invloed", "Commerciële invloed"], 1)],
        "Bij commerciële invloed wil iemand aan je verdienen. Bij sociale invloed niet."),
   deel("b", "Noem de vier P's van marketing.",
        [open_("4b", "Noem de vier P's van marketing.", "De vier P's", "Prijs, product, plaats en promotie.", ["prijs", "product", "plaats", "promotie"])],
        "Prijs, product, plaats en promotie."),
   deel("c", "Er komt een nieuwe spelcomputer uit. Veel mensen willen hem, maar er zijn er weinig. Wat gebeurt er met de prijs? Leg uit.",
        [open_("4c", "Er komt een nieuwe spelcomputer uit. Veel mensen willen hem, maar er zijn er weinig. Wat gebeurt er met de prijs? Leg uit.", "Vraag en aanbod", "De prijs stijgt. De vraag is groter dan het aanbod: er is een tekort.", ["de prijs stijgt", "de vraag is groter dan het aanbod (een tekort)"])],
        "Bij een tekort stijgt de prijs. Dat is marktwerking."),
  ]),
 opgave(5, "De boekhouding van Esra", [
   deel("a", "Bereken de omzet.", [num(9600, "Omzet", "€")], "Omzet = afzet × verkoopprijs = 240 × €40 = €9.600."),
   deel("b", "Bereken de inkoopwaarde.", [num(4320, "Inkoopwaarde", "€")], "Inkoopwaarde = aantal × inkoopprijs = 240 × €18 = €4.320."),
   deel("c", "Bereken de brutowinst.", [num(5280, "Brutowinst", "€")], "Brutowinst = omzet − inkoopwaarde = €9.600 − €4.320 = €5.280."),
   deel("d", "Bereken de nettowinst.", [num(1830, "Nettowinst", "€")], "Bedrijfskosten: €1.400 + €1.650 + €400 = €3.450. Nettowinst = brutowinst − bedrijfskosten = €5.280 − €3.450 = €1.830."),
   deel("e", "De maand erna is de omzet €7.200. De verkoopprijs blijft €40. Bereken de afzet.", [num(180, "Afzet", "", tol=0.5)], "Afzet = omzet : verkoopprijs = €7.200 : €40 = 180 tassen."),
   deel("f", "Leg uit wat het verschil is tussen brutowinst en nettowinst.",
        [open_("5f", "Leg uit wat het verschil is tussen brutowinst en nettowinst.", "Bruto en netto", "Bij de brutowinst is alleen de inkoopwaarde van de omzet af. Bij de nettowinst zijn ook de bedrijfskosten eraf.", ["brutowinst = omzet − inkoopwaarde", "nettowinst = brutowinst − bedrijfskosten (wat de ondernemer echt overhoudt)"])],
        "Van de brutowinst moeten de bedrijfskosten nog af. Wat overblijft is de nettowinst."),
  ], tekst="Esra verkoopt tassen. Deze maand verkoopt zij 240 tassen voor €40 per stuk (zonder btw). Zij koopt de tassen in voor €18 per stuk. Haar bedrijfskosten: huur €1.400, loon €1.650 en reclame €400."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 5", min=45, mc="mc_a", open=None, rek="rek_a")))
