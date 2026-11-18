# Bron van toetsen.json. Draai: python3 -I economie/j4h5/bron/toetsen.py
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

SOORT = ["Volksverzekering", "Werknemersverzekering", "Sociale voorziening"]
mc_a = mc(51, [
 ("De gemeente laat het ophalen van afval doen door het bedrijf met het beste aanbod. Hoe heet deze manier van kiezen?", ["Aanbesteding", "Nationalisatie", "Privatisering", "Subsidie"], "De overheid maakt de opdracht bekend en bedrijven doen een aanbod."),
 ("Waarom betaalt de overheid het leger?", ["Het leger is van belang voor iedereen", "Het leger levert de overheid winst op", "Bedrijven mogen geen wapens hebben", "Soldaten willen ambtenaar zijn"], "Veiligheid is voor iedereen van belang: een collectief goed."),
 ("Een energiebedrijf was van de overheid en wordt verkocht aan een particulier bedrijf. Wat verwacht de overheid daarvan?", ["Meer concurrentie en een lagere prijs", "Minder concurrentie en een hogere prijs", "Meer ambtenaren en meer regels", "Minder klanten en minder winst"], "Na privatisering moeten bedrijven concurreren."),
 ("In land X bepaalt de regering hoeveel brood er gebakken wordt en wat het kost. Wat voor economie is dit?", ["Planeconomie", "Vrijemarkteconomie", "Sociale markteconomie", "Verzorgingsstaat"], "De overheid bepaalt wat, hoeveel en tegen welke prijs."),
 ("Welke instelling is geen overheidsinstelling?", ["De SER", "Het CBS", "Het CPB", "De Belastingdienst"], "De SER is onafhankelijk: werkgevers, werknemers en deskundigen."),
 ("De economie krimpt. Wat gebeurt er met de uitgaven van de overheid aan uitkeringen?", ["Die stijgen", "Die dalen", "Die blijven gelijk", "Die stoppen"], "Meer werklozen betekent meer uitkeringen."),
 ("Fatima is 70 jaar. Welke uitkering krijgt zij van de overheid?", ["AOW", "WW", "WIA", "Bijstand"], "De AOW is de volksverzekering voor ouderen."),
 ("Wat is het verschil tussen een sociale verzekering en een sociale voorziening?", ["Verzekering uit premies, voorziening uit belasting", "Verzekering uit belasting, voorziening uit premies", "Verzekering voor armen, voorziening voor rijken", "Verzekering van de gemeente, voorziening van het Rijk"], "Sociale voorzieningen betaalt de overheid met belastinggeld."),
 ("De regering legt uit waarom er volgend jaar meer geld naar defensie gaat. Waar staat die uitleg?", ["In de miljoenennota", "In de aangifte", "In het Gemeentefonds", "In het cao-akkoord"], "De miljoenennota is de toelichting bij de rijksbegroting."),
 ("Welke belasting betaal je via de prijs van een product?", ["Accijns", "Loonbelasting", "Ozb", "Inkomstenbelasting"], "Accijns en btw zijn indirecte belastingen."),
 ("De overheid heeft al jaren een begrotingstekort. Wat gebeurt er met de staatsschuld?", ["Die wordt groter", "Die wordt kleiner", "Die blijft gelijk", "Die verdwijnt"], "Bij elk tekort moet de overheid lenen."),
 ("Welke heffing betalen alle inwoners van een gemeente?", ["Afvalstoffenheffing", "Toeristenbelasting", "Hondenbelasting", "Parkeerbelasting"], "Alle inwoners betalen rioolheffing en afvalstoffenheffing."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("De collectieve sector probeert zo veel mogelijk winst te maken.", False),
   gf("In een sociale markteconomie bepalen vraag en aanbod de prijzen, maar grijpt de overheid in als dat nodig is.", True),
   gf("De WW is een volksverzekering.", False),
   gf("Btw is een indirecte belasting.", True),
   gf("Bij een begrotingsoverschot moet de overheid geld lenen.", False)],
   ["De collectieve sector streeft niet naar winst.", "De WW is een werknemersverzekering.", "Lenen moet bij een begrotingstekort."])]),
 opgave(2, "De begroting van het Rijk", [
   deel("a", "Bereken het begrotingssaldo in miljard euro. Typ een min-teken bij een tekort.", [num(-19, "Begrotingssaldo (miljard euro)", tol=0.5)], "Saldo = inkomsten − uitgaven = 372 − 391 = −19. Een tekort van €19 miljard."),
   deel("b", "Hoeveel miljoen euro is €19 miljard?", [num(19000, "Bedrag (miljoen euro)", tol=0.5)], "1 miljard = 1.000 miljoen. 19 × 1.000 = 19.000 miljoen."),
   deel("c", "De staatsschuld is €480 miljard. De overheid betaalt €7,2 miljard rente. Bereken het rentepercentage. Rond af op 1 decimaal.", [num(1.5, "Rentepercentage", "%")], "(deel : geheel) × 100 = (7,2 : 480) × 100 = 1,5%."),
   deel("d", "Noem twee dingen die de overheid kan doen om een begrotingstekort te voorkomen.", [open_("2d", "Noem twee dingen die de overheid kan doen om een begrotingstekort te voorkomen.", "Tekort voorkomen", "Bezuinigen op de uitgaven (bijvoorbeeld minder geld naar onderwijs of zorg) en de inkomsten verhogen (bijvoorbeeld hogere belastingen).", ["bezuinigen op de uitgaven", "de inkomsten verhogen, bijvoorbeeld hogere belastingen"])], "Minder uitgeven of meer binnenhalen."),
  ], tekst="Het Rijk verwacht volgend jaar €372 miljard aan inkomsten en €391 miljard aan uitgaven."),
 opgave(3, "Wie krijgt wat?", [
   deel("a", "Kies bij elke uitkering de juiste soort.", [
     keuze("AOW", SOORT, 0), keuze("WW", SOORT, 1), keuze("Bijstand", SOORT, 2), keuze("Wlz", SOORT, 0), keuze("WIA", SOORT, 1), keuze("Huurtoeslag", SOORT, 2)],
     "Volksverzekeringen: AOW, Anw, Wlz. Werknemersverzekeringen: WW, WIA. Sociale voorzieningen: bijstand, huurtoeslag, zorgtoeslag."),
   deel("b", "Leg uit wat het solidariteitsbeginsel is. Gebruik de woorden inkomen en afstaan.", [open_("3b", "Leg uit wat het solidariteitsbeginsel is. Gebruik de woorden inkomen en afstaan.", "Solidariteitsbeginsel", "Iedereen met een inkomen staat een deel daarvan af voor mensen zonder inkomen of met een laag inkomen.", ["mensen met een inkomen staan een deel af", "voor mensen zonder inkomen of met een laag inkomen"])], "De sterken helpen de zwakkeren."),
  ]),
 opgave(4, "Roken wordt duurder", [
   deel("a", "Bereken met hoeveel procent de accijns is gestegen. Rond af op 1 decimaal.", [num(12.5, "Stijging", "%")], "(nieuw − oud) : oud × 100 = (9,00 − 8,00) : 8,00 × 100 = 12,5%."),
   deel("b", "Leg uit waarom de overheid de accijns op sigaretten verhoogt.", [open_("4b", "Leg uit waarom de overheid de accijns op sigaretten verhoogt.", "Doel van accijns", "Door de accijns worden sigaretten duurder. De overheid wil zo roken ontmoedigen, omdat ze wil dat mensen gezonder leven.", ["sigaretten worden duurder", "de overheid wil roken ontmoedigen / mensen gezonder laten leven"])], "Accijns ontmoedigt ongewenst gedrag."),
   deel("c", "Is accijns een directe of een indirecte belasting?", [keuze("Accijns is een", ["Directe belasting", "Indirecte belasting"], 1)], "Accijns zit in de prijs van het product: indirect."),
  ], tekst="De accijns op een pakje sigaretten gaat van €8,00 naar €9,00."),
 opgave(5, "De economie groeit", [
   deel("a", "Bereken het bbp van dit jaar in miljard euro.", [num(820, "Bbp dit jaar (miljard euro)", tol=0.5)], "(2,5 : 100) × 800 = 20. Nieuw bbp = 800 + 20 = €820 miljard."),
   deel("b", "Leg uit waarom economische groei goed is voor de begroting van de overheid. Noem een gevolg voor de inkomsten en een gevolg voor de uitgaven.", [open_("5b", "Leg uit waarom economische groei goed is voor de begroting van de overheid. Noem een gevolg voor de inkomsten en een gevolg voor de uitgaven.", "Groei en de begroting", "De inkomsten stijgen: er komt meer belasting binnen (btw, inkomstenbelasting, vennootschapsbelasting). De uitgaven dalen: er zijn minder werklozen, dus minder uitkeringen.", ["inkomsten stijgen door meer belastingopbrengst", "uitgaven dalen doordat er minder uitkeringen nodig zijn"])], "Meer belasting erin, minder uitkeringen eruit."),
   deel("c", "Een jaar later is er een recessie. Noem één maatregel waarmee de overheid de economie kan stimuleren.", [open_("5c", "Een jaar later is er een recessie. Noem één maatregel waarmee de overheid de economie kan stimuleren.", "Economie stimuleren", "Bijvoorbeeld: meer investeren in de infrastructuur, de inkomstenbelasting verlagen, subsidie geven aan bedrijven die investeren in vernieuwende producten, of investeren in beter onderwijs.", ["een juiste maatregel: investeren in infrastructuur of onderwijs, inkomstenbelasting verlagen of subsidie aan bedrijven"])], "Investeren, belasting verlagen of subsidie geven."),
  ], tekst="Vorig jaar was het bbp €800 miljard. Dit jaar groeit de economie met 2,5%."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 5", min=45, mc="mc_a", open=None, rek="rek_a")))
