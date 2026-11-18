# Bron van toetsen.json. Draai: python3 -I economie/j2h3/bron/toetsen.py
# Oefentoets A bij jaar 2 mavo H3 "Aan het werk?". Nieuw geschreven bij de lesapp van de docent: zelfde stof, andere situaties.
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
from toetshulp import *

SECT = ["Agrarisch", "Industrieel", "Dienstverlenend"]
mc_a = mc(23, [
 ("Ali heeft een eigen fietsenwinkel. Hoe heet het inkomen dat hij daarmee verdient?", ["Winst", "Loon", "Uitkering", "Zakgeld"], "Het inkomen van iemand met een eigen bedrijf is winst."),
 ("Noor heeft een nieuwe baan. Na drie weken stopt haar baas de arbeidsovereenkomst. Waarom mag dat meteen?", ["Zij zit nog in haar proeftijd", "Zij heeft al een vaste baan", "Zij valt onder een andere cao", "Zij werkt nog in deeltijd"], "In de proeftijd mogen werkgever en werknemer meteen stoppen."),
 ("In de horeca gelden voor alle koks dezelfde afspraken over loon en vakantiedagen. Waar staan die afspraken?", ["In de cao", "In de Arbowet", "In de vacature", "In de WW"], "Een cao geldt voor een hele bedrijfstak."),
 ("Kim werkt 20 uur per week in een kledingwinkel. Een volledige werkweek is daar 38 uur. Wat voor baan heeft Kim?", ["Een deeltijdbaan", "Een voltijdbaan", "Een eigen bedrijf", "Een proeftijd"], "Bij een deeltijdbaan werk je minder uren dan een volledige werkweek."),
 ("Een bedrijf kweekt tomaten in kassen. Bij welk soort bedrijven hoort dat?", ["Agrarische bedrijven", "Industriële bedrijven", "Dienstverlenende bedrijven", "Technologische bedrijven"], "Tuinbouw heeft de natuur nodig: agrarisch."),
 ("In een pizzeria maakt één persoon het deeg, één belegt de pizza en één bakt. Hoe heet dat?", ["Arbeidsverdeling", "Bijscholing", "Flexibel werk", "Proeftijd"], "Het werk is verdeeld in taken."),
 ("Welke wet regelt hoe lang een jongere van 15 jaar op een dag mag werken?", ["De Arbeidstijdenwet", "De Arbowet", "De Werkloosheidswet", "De cao"], "De Arbeidstijdenwet gaat over werk- en rusttijden."),
 ("Een schilder volgt een cursus over nieuwe verf. Hij blijft gewoon werken. Hoe heet dat?", ["Bijscholing", "Solliciteren", "Ontslag", "Ongeschoold werk"], "Bijscholing is een cursus volgen terwijl je al werkt."),
 ("Daan is 17 jaar en Eva is 19 jaar. Ze krijgen allebei het minimumjeugdloon. Wie verdient per uur het meest?", ["Eva, want zij is ouder", "Daan, want hij is jonger", "Ze verdienen evenveel", "Dat bepaalt het UWV"], "Hoe jonger je bent, hoe lager het minimumjeugdloon."),
 ("Sara neemt zelf ontslag, omdat ze haar werk saai vindt. Krijgt zij een WW-uitkering?", ["Nee, het ontslag is haar eigen keus", "Ja, want zij heeft nu geen loon meer", "Ja, maar alleen de eerste maand", "Nee, want zij is jonger dan 21"], "Het ontslag mag niet je eigen schuld zijn."),
 ("Tom heeft geen baan. Hij zoekt ook geen werk. Is Tom officieel werkloos?", ["Nee, want hij zoekt geen werk", "Ja, want hij heeft geen baan", "Ja, want hij krijgt geen loon", "Nee, want hij is te jong"], "Je bent pas werkloos als je actief werk zoekt."),
 ("Je wilt laten zien hoe het aantal werklozen in tien jaar is veranderd. Welk diagram kies je?", ["Een lijndiagram", "Een cirkeldiagram", "Een legenda", "Een cao"], "Een lijndiagram laat zien hoe iets stijgt of daalt in de tijd."),
])
rek_a = [
 opgave(1, "Goed of fout?", [deel("", "Goed of fout?", [
   gf("Een proeftijd mag maximaal twee maanden duren.", True),
   gf("Je nettoloon is hoger dan je brutoloon.", False),
   gf("Een bakkerij die brood maakt, hoort bij de dienstverlenende bedrijven.", False),
   gf("Het minimumloon staat in de wet.", True),
   gf("Na de eerste twee maanden is de WW-uitkering 70% van je laatste brutoloon.", True)],
   ["Nettoloon = brutoloon − inhoudingen. Het nettoloon is dus lager.", "Een bakkerij maakt een product van grondstoffen. Dat is een industrieel bedrijf."])]),
 opgave(2, "De loonstrook van Yara", [
   deel("a", "Bereken hoeveel er in totaal wordt ingehouden.", [num(387, "Inhoudingen", "€")], "€258 + €129 = €387."),
   deel("b", "Bereken het nettoloon van Yara.", [num(1763, "Nettoloon", "€")], "Nettoloon = brutoloon − inhoudingen = €2.150 − €387 = €1.763."),
   deel("c", "Bereken hoeveel procent van het brutoloon wordt ingehouden. Rond af op 1 decimaal.", [num(18, "Ingehouden", "%")], "(deel : geheel) × 100 = (387 : 2.150) × 100 = 18,0%."),
   deel("d", "Wie betaalt de inhoudingen aan de overheid? En waarvoor gebruikt de overheid dit geld? Noem één voorbeeld.",
        [open_("2d", "Wie betaalt de inhoudingen aan de overheid? En waarvoor gebruikt de overheid dit geld? Noem één voorbeeld.", "Inhoudingen",
               "De werkgever betaalt de inhoudingen aan de overheid. De overheid gebruikt het geld onder andere voor uitkeringen, bijvoorbeeld bij werkloosheid of arbeidsongeschiktheid.",
               ["de werkgever betaalt de inhoudingen", "een juist voorbeeld, zoals uitkeringen bij werkloosheid of arbeidsongeschiktheid"])],
        "De werkgever houdt loonbelasting en sociale premies in en betaalt die aan de overheid."),
  ], tekst="Yara werkt in een bloemenwinkel. Haar brutoloon is €2.150 per maand. Er wordt €258 loonbelasting en €129 aan sociale premies ingehouden."),
 opgave(3, "De bijbaan van Mees", [
   deel("a", "Bereken het loon van Mees per week.", [num(57.6, "Loon per week", "€")], "Loon = uurloon × aantal uren = €6,40 × 9 = €57,60."),
   deel("b", "Bereken het loon van Mees per maand.", [num(249.6, "Loon per maand", "€")], "(weekbedrag × 52) : 12 = (€57,60 × 52) : 12 = €249,60. Niet × 4!"),
   deel("c", "Stel: het minimumloon is €14,00 per uur. Een 18-jarige krijgt 50% daarvan. Bereken het minimumjeugdloon per uur voor een 18-jarige.", [num(7, "Minimumjeugdloon", "€")], "(percentage : 100) × minimumloon = (50 : 100) × €14,00 = €7,00."),
   deel("d", "Leg uit waarom de overheid een minimumloon heeft.",
        [open_("3d", "Leg uit waarom de overheid een minimumloon heeft.", "Minimumloon", "Zo verdienen werknemers genoeg om van te kunnen leven. Een werkgever mag niet minder betalen.", ["werknemers verdienen dan genoeg om van te leven (of: een werkgever mag niet te weinig betalen)"])],
        "Het minimumloon beschermt werknemers tegen een te laag loon."),
  ], tekst="Mees is 16 jaar. Hij werkt 9 uur per week in een supermarkt. Hij verdient €6,40 per uur."),
 opgave(4, "Werk in de stad", [
   deel("a", "Bereken hoeveel procent van de mensen bij een dienstverlenend bedrijf werkt.", [num(79, "Dienstverlenend", "%")], "De hele cirkel is 100%. 100% − 4% − 17% = 79%."),
   deel("b", "Bereken hoeveel mensen bij een industrieel bedrijf werken.", [num(2040, "Aantal mensen", "", tol=0.5)], "(percentage : 100) × totaal = (17 : 100) × 12.000 = 2.040 mensen."),
   deel("c", "Kies bij elk bedrijf de juiste soort.", [keuze("Een melkveehouderij", SECT, 0), keuze("Een fietsenfabriek", SECT, 1), keuze("Een kapperszaak", SECT, 2), keuze("Een supermarkt", SECT, 2)],
        "Agrarisch: grondstoffen met hulp van de natuur. Industrieel: goederen maken. Dienstverlenend: diensten leveren."),
  ], tekst="In een stad werken 12.000 mensen. In een cirkeldiagram staat: 4% werkt bij een agrarisch bedrijf en 17% bij een industrieel bedrijf. De rest werkt bij een dienstverlenend bedrijf."),
 opgave(5, "Bram zoekt werk", [
   deel("a", "Bereken de WW-uitkering van Bram per maand in de eerste twee maanden.", [num(1950, "WW eerste twee maanden", "€")], "(percentage : 100) × laatste brutoloon = (75 : 100) × €2.600 = €1.950."),
   deel("b", "Bereken de WW-uitkering van Bram per maand na de eerste twee maanden.", [num(1820, "WW daarna", "€")], "(70 : 100) × €2.600 = €1.820."),
   deel("c", "Het ontslag is niet de schuld van Bram. Noem nog twee regels waaraan Bram moet voldoen om WW te krijgen.",
        [open_("5c", "Het ontslag is niet de schuld van Bram. Noem nog twee regels waaraan Bram moet voldoen om WW te krijgen.", "Regels voor de WW",
               "Hij heeft minstens 26 weken gewerkt. Hij schrijft zich binnen een week in bij het UWV. Hij kan direct beginnen met nieuw werk.",
               ["een eerste juiste regel (minstens 26 weken gewerkt, binnen een week ingeschreven bij het UWV, direct kunnen beginnen)", "een tweede juiste regel"])],
        "Drie regels: minstens 26 weken gewerkt, binnen een week inschrijven bij het UWV en direct kunnen beginnen."),
   deel("d", "In de stad van Bram daalt het aantal werklozen van 1.250 naar 1.175. Bereken met hoeveel procent het aantal werklozen is gedaald. Rond af op 1 decimaal.", [num(6, "Daling", "%")],
        "(nieuw − oud) : oud × 100 = (1.175 − 1.250) : 1.250 × 100 = −6,0%. Een daling van 6,0%."),
   deel("e", "Leg uit waarom de werkloosheid vaak stijgt bij een economische crisis.",
        [open_("5e", "Leg uit waarom de werkloosheid vaak stijgt bij een economische crisis.", "Crisis en werkloosheid", "Bij een crisis gaan bedrijven bezuinigen. Ze ontslaan personeel. Daardoor zijn er minder banen.", ["bedrijven bezuinigen of hebben minder werk", "zij ontslaan personeel, dus zijn er minder banen"])],
        "Bedrijven bezuinigen bij een crisis en ontslaan personeel."),
  ], tekst="Bram werkte drie jaar bij een meubelzaak. De zaak heeft geen werk meer voor hem. Bram wordt ontslagen. Zijn laatste brutoloon was €2.600 per maand."),
]
schrijf(__file__, dict(mc_a=mc_a, rek_a=rek_a), dict(t1=dict(n=1, t="oefentoets A", sub="Hoofdstuk 3", min=45, mc="mc_a", open=None, rek="rek_a")))
