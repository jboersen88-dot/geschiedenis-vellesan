# Maakt economie/<naam>/data.json voor een hoofdstuk zonder lesapp (alleen een pagina op meneerboersen.nl), in dezelfde vorm
# als bouw-oefen.py, zodat economie.js er de hoofdstukpagina en per paragraaf een leeromgeving van maakt (RIJK in economie.js).
# Zonder oefenomgeving: "oefen" is leeg en de oefenstof (opgaven, nakijkbladen, oefentoets) staat in "extra".
# De kernvragen per paragraaf staan hier; bij jaar 3 H2 had de oude pagina er geen, die zijn geschreven uit de PowerPoints.
# Gebruik: python3 -I economie/bouw-pagina.py j3h1   (vanuit de root van de repo)
import json, os, sys

ECO = os.path.dirname(os.path.abspath(__file__))

CONFIG = {
    "j3h1": dict(
        key="eco-j3h1-v1",
        pars=[
            dict(id="1.1", t="Waar heb jij behoefte aan?", file="16dvcf2LugMrDrctNJqPoh3OxQfwAfA7A", x=["pr"],
                 sum="Behoeften, middelen en schaarste, vrije goederen, welvaart en rekenen met procenten.",
                 imgs=[["eten", "Samen eten: een primaire behoefte"], ["wensen", "Een lijstje met wensen: secundaire behoeften"]],
                 q=["Wat zijn behoeften?", "Je hebt twee soorten behoeften. Noem ze allebei en geef van allebei minimaal twee voorbeelden.",
                    "Geef drie redenen waarom mensen verschillende behoeften hebben.", "Leg uit dat technologische ontwikkelingen invloed hebben op onze behoeften.",
                    "Wat wordt er bedoeld met e-commerce?", "Welke invloed heeft e-commerce op onze economie? Leg je antwoord uit.",
                    "Wat wordt er bedoeld met middelen?", "Wat zijn de twee belangrijkste middelen?", "Bij economie heeft het begrip schaars twee betekenissen. Geef ze allebei.",
                    "Leg uit dat brood in Nederland ook een schaars product is, ook al hebben wij er genoeg van.", "Wat wordt er bedoeld met vrije goederen?",
                    "Leg het belangrijkste verschil uit tussen vrije goederen en schaarse goederen.", "Wat wordt er bedoeld met welvaart?",
                    "Leg uit dat de welvaart in Nederland hoog is in vergelijking met andere landen.", "Hoe reken je met procenten? Oefen met de opgaven bij de oefenstof."]),
            dict(id="1.2", t="Hoe word jij beïnvloed?", file="1RJJ_d47_8eG1rauDGDNuFjaYyPQy7mKw", x=[],
                 sum="Consumenten, sociale en commerciële beïnvloeding, de marketingmix, reclame, A- en B-merken en jongeren als doelgroep.",
                 imgs=[["vlogger", "Een vlogger filmt zichzelf: commerciële beïnvloeding via social media"], ["reclamebord", "Een reclamebord langs de weg"]],
                 q=["Wanneer ben je een consument?", "Op welke twee manieren worden consumenten beïnvloed? Geef van beide manieren twee voorbeelden.",
                    "Wat is de marketingmix?", "Welke onderdelen van de marketingmix zie je vaak terug in commerciële reclames?", "Wat wordt er bedoeld met ideële reclame?",
                    "Wat is het grootste verschil tussen commerciële en ideële reclame?", "Wat is het verschil tussen A-merken en B-merken?",
                    "Welk onderdeel van de marketingmix past bij de keuze voor een A- of B-merk?", "Waarom zijn jongeren een goede doelgroep?"]),
            dict(id="1.3", t="Budgetteren moet je leren", file="12JU4_E6djDz6Br_iLhLfIjp3vokRTTNL", x=[],
                 sum="Het Nibud, budgetteren en een begroting, soorten inkomsten en uitgaven, en geld reserveren.",
                 imgs=[["begroting", "Rekeningen en een rekenmachine: een begroting maken"], ["spaarvarken", "Sparen: geld reserveren voor later"]],
                 q=["Wat doet het Nibud?", "Wat wordt er bedoeld met budgetteren?", "Wat staat er in een begroting?",
                    "Welke drie soorten inkomsten kan een mens hebben? Geef van alle drie een voorbeeld.", "Welke drie soorten uitgaven hebben wij?",
                    "Op welke van de drie soorten uitgaven heb jij het minste invloed? Leg je antwoord uit.", "Wat wordt er bedoeld met geld reserveren?",
                    "Welke redenen kun je hebben om geld te reserveren?"]),
            dict(id="1.4", t="Alles wordt duurder", file="1_9io8UfS1lePjo6u7FOefjZoTIAEAnex", x=["ix"],
                 sum="Koopkracht, inflatie en deflatie, het CBS en rekenen met indexcijfers.",
                 imgs=[["prijzen", "Boodschappen doen: wat kun je kopen voor je geld?"], ["munten", "Muntjes stapelen: hoeveel is je geld waard?"]],
                 q=["Wat wordt er bedoeld met koopkracht?", "Welke twee factoren hebben invloed op de koopkracht?", "Wat wordt er bedoeld met inflatie?",
                    "Wat is het nut van het CBS?", "Wat is het tegenovergestelde van inflatie?", "Hoe bereken je een indexcijfer? Welke formule gebruik je daarvoor?"]),
        ],
        # mat: [titel, [[soort, Drive-id of https-link]], uitleg]
        mat={"pr": ["Rekenen met procenten", [["Oefenvragen", "1x5AiahR3ovH7sj5Ume42EMAA7d9lj5X_"], ["Antwoorden", "1E-y3vuU1vIHXJGsgpvN9-jnVWk1_8sjA"]]],
             "ix": ["Werken met indexcijfers", [["Oefenopgave", "1-ndk4XI1u81UTS__S4YRTdlLuwgA6AGc"], ["Antwoorden", "1bFGFbUIm1crzj0t0CT7SxlEgQf52kD2B"]]],
             "ot": ["Oefentoets hoofdstuk 1", [["Oefentoets", "1RbgXqWzkvSJ3p8GJAM-oa8tF5yNyvvZn"], ["Antwoorden", "1a77esOSHANf3IoLhKFsxW566aVe_5LPg"]]]},
        extra=["pr", "ix", "ot"],
        # dia's die alleen over de les gingen (planning, regels, huiswerk met oude data) staan niet in de presentatie
        weg={"1.1": [1, 2, 3], "1.2": [7, 11], "1.3": [1]},
    ),
    "j3h2": dict(
        key="eco-j3h2-v1",
        pars=[
            dict(id="2.1", t="Kijk en vergelijk!", file="1Cgw--aLJ9HJpz1gc5LagrZBagGMBB8TG", x=["n21", "p21"],
                 sum="Consumentenorganisaties, vergelijkend warenonderzoek, de prijs per eenheid, consumer power en keurmerken.",
                 imgs=[["winkel", "Een supermarkt vol producten om te vergelijken"], ["keurmerk", "Potten met een label: let op het keurmerk"]],
                 q=["Wat doet een consumentenorganisatie, zoals de Consumentenbond? Noem drie taken.", "Waarom staan consumentenorganisaties vaak tegenover producenten?",
                    "Wat is een vergelijkend warenonderzoek?", "Wat is het verschil tussen 'beste uit de test' en 'beste koop'?",
                    "Hoe reken je uit wat 100 gram van een product kost, als je de prijs en het gewicht weet?",
                    "Waarom moet je oppassen met onderzoeken en reviews waar een bedrijf zelf achter zit?",
                    "Hoe kunnen consumenten samen invloed uitoefenen op producenten (consumer power)?", "Wat is een keurmerk? Noem drie soorten keurmerken."]),
            dict(id="2.2", t="Sta je in je recht?", file="1lziMBvIENMM7vHUmgTmj0WzkegUqoaIK", x=["n22", "p22"],
                 sum="Garantie, wetten die consumenten beschermen (Warenwet, koop op afstand, colportage, productaansprakelijkheid) en de Geschillencommissie.",
                 imgs=[["kapot", "Een kapot scherm: heb je nog garantie?"], ["bon", "Bewaar je kassabon"]],
                 q=["Hoe lang heb je garantie op een product? Wat betekent het dat een product deugdelijk moet zijn?",
                    "Noem twee uitzonderingen waarvoor je bij een mobiel geen garantie krijgt.",
                    "Waarom gelden de consumentenwetten niet als je iets van een particulier koopt, bijvoorbeeld op Marktplaats?",
                    "Wat regelt de Warenwet en wat doet de NVWA?", "Wat regelt de Wet koop op afstand? Hoe lang is de bedenktijd?",
                    "Wat regelt de Colportagewet?", "Wat betekent de Wet productaansprakelijkheid? Geef een voorbeeld.",
                    "Wat doet de Geschillencommissie en wat betekent het dat de uitspraak bindend is?"]),
            dict(id="2.3", t="Een huur- of koopwoning?", file="1IfrcDoFrXBkpXm4WGYGrtfUsBF3Tmeu7", x=["n23", "p23"],
                 sum="De woningmarkt, sociale huur en de vrije sector, de makelaar, de stappen van het kopen van een huis en de kosten die erbij horen.",
                 imgs=[["sleutels", "De sleutels van je nieuwe huis"], ["huizen", "Een straat met rijtjeshuizen"]],
                 q=["Wat is de woningmarkt?", "Wat is het verschil tussen een huurwoning in de vrije sector en een sociale huurwoning?",
                    "Voor wie zijn sociale huurwoningen bedoeld? Wat is huurtoeslag?", "Hoe wordt de huurprijs van een sociale huurwoning bepaald?",
                    "Wat doet een makelaar?", "Noem de stappen van het kopen van een huis, van bezichtiging tot eigenaar.", "Wat zijn ontbindende voorwaarden?",
                    "Wat zijn de kosten koper? Noem twee onderdelen.", "Wat doet de notaris en wat is het kadaster?",
                    "Welke belastingen betaal je als eigenaar van een huis, zoals de ozb?"]),
            dict(id="2.4", t="Consumeren of consuminderen?", file="15-6_thBru4Fa1cVRATYr41X3p82P3-DE", x=["n24"],
                 sum="Milieuschade, energielabels en keurmerken, en de maatschappelijke kosten van consumeren.",
                 imgs=[["afval", "Afval scheiden"], ["plantje", "Zorgen voor het milieu"]],
                 q=["Wat is het verschil tussen consumeren en consuminderen?", "Wat is milieuschade? Geef drie voorbeelden.",
                    "Welke doelen zijn er om milieuschade tegen te gaan?", "Wat is een energielabel en voor welke producten is het verplicht?",
                    "Noem drie andere keurmerken die over het milieu of over dierenwelzijn gaan.", "Wat zijn maatschappelijke kosten? Geef twee voorbeelden."]),
        ],
        mat={"n21": ["Nakijkblad 2.1", [["Nakijkblad", "1e3V0aQv9F2Fi3qrHJLlhhTATTalcRbaI"]]],
             "n22": ["Nakijkblad 2.2", [["Nakijkblad", "1zrXg-iPy6o4YEinLA-r7oFHPlcDPjwAF"]]],
             "n23": ["Nakijkblad 2.3", [["Nakijkblad", "1xcUX0d8cgDCjxwAdx-pSRWV54bJ1xi7F"]]],
             "n24": ["Nakijkblad 2.4", [["Nakijkblad", "1GoP9IKiTMW2VNS5JFlnvi16Jfu15-WiO"]]],
             "p21": ["Nearpod-les 2.1", [["Nearpod", "https://app.nearpod.com/?pin=6LJ2P"]]],
             "p22": ["Nearpod-les 2.2", [["Nearpod", "https://app.nearpod.com/?pin=HKPEG"]]],
             "p23": ["Nearpod-les 2.3", [["Nearpod", "https://app.nearpod.com/?pin=SMZJB"]]],
             "ot": ["Oefentoets hoofdstuk 2", [["Socrative", "https://b.socrative.com/login/student/"]], "Kamernaam: 771044. Vul je eigen naam in."]},
        extra=["ot", "n21", "n22", "n23", "n24"],
        weg={"2.1": [1], "2.2": [1], "2.3": [1, 5]},
    ),
    # jaar 2 H1, de GL-versie (pagina "kopie-van-hoofdstuk-1"); foto's van jaar 3 hergebruikt
    "j2h1gl": dict(
        key="eco-j2h1gl-v1",
        pars=[
            dict(id="1.1", t="Wat wil je kopen?", file="1aPLEShv2ifJdN7_vmJeqnV3SaHJcuErh", x=["nr"],
                 sum="Behoeften, goederen en diensten, consumeren, zelfvoorziening, geldbedragen noteren en het gemiddelde berekenen.",
                 imgs=[["../j3h1/wensen", "Een lijstje met wensen: wat heb jij nodig?"], ["../j3h1/eten", "Samen eten: een behoefte"]],
                 q=["Wat zijn behoeften?", "Behoeften kun je in twee groepen verdelen. Welke twee? Geef van allebei twee voorbeelden.",
                    "Geef drie voorbeelden van goederen.", "Geef drie voorbeelden van diensten.",
                    "Met welke twee dingen moet je rekening houden als je een geldbedrag opschrijft?", "Wat is consumeren?",
                    "Wat wordt er bedoeld met zelfvoorziening?", "Hoe bereken je het gemiddelde van iets? Schrijf de formule op."]),
            dict(id="1.2", t="Waarom koop je dat?", file="1jQt0b_jB1aK8rkfIm6s1GYLNPhVpwUnk", x=["nr"],
                 sum="Je budget, sociale en commerciële beïnvloeding, commerciële en ideële reclame en rekenen met korting.",
                 imgs=[["../j3h1/vlogger", "Een vlogger filmt zichzelf: beïnvloeding via social media"], ["../j3h1/reclamebord", "Een reclamebord langs de weg"]],
                 q=["Wat wordt er bedoeld met een budget?", "Hoe heet het als je beïnvloed wordt door vrienden?",
                    "Hoe heet het als je beïnvloed wordt door grote bedrijven?", "Geef een voorbeeld van commerciële reclame.",
                    "Wat wordt er bedoeld met ideële reclame?", "Noem drie manieren (media) waarop bedrijven hun reclame verspreiden.",
                    "Een tv kost €300 en je krijgt 20% korting. Hoe bereken je hoeveel korting je krijgt?"]),
            dict(id="1.3", t="Sta je sterk als consument?", file="1snOhw2ldCy_a2ZhU2Ktlg5dtdNOfAzV6", x=["nh"],
                 sum="Consumentenorganisaties, vergelijkend warenonderzoek en garantie.",
                 imgs=[["../j3h2/winkel", "Een supermarkt vol producten om te vergelijken"], ["../j3h2/kapot", "Een kapot scherm: heb je nog garantie?"]],
                 q=["Wat is een consumentenorganisatie?", "Noem drie dingen die consumentenorganisaties doen.",
                    "Leg uit waarom een vergelijkend warenonderzoek handig kan zijn.", "Wat is garantie?"]),
            dict(id="1.4", t="Kom je uit met je geld?", file="1HAZgct64wPetMVPTdGhOFfXy8WjpTp7_", x=["nr"],
                 sum="Soorten inkomsten en uitgaven, van week naar maand rekenen, een begroting maken en geld reserveren.",
                 imgs=[["../j3h1/begroting", "Rekeningen en een rekenmachine: een begroting maken"], ["../j3h1/spaarvarken", "Sparen: geld reserveren voor later"]],
                 q=["Welke soorten inkomsten heb je? Geef van elke soort minstens twee voorbeelden.",
                    "Welke soorten uitgaven heb je? Geef van elke soort minstens twee voorbeelden.",
                    "Je verdient €50 per week. Hoeveel verdien je dan per maand? Hoe bereken je dat?", "Wat staat er in een begroting?",
                    "Hoe maak je een begroting?", "Waarom is het handig om een begroting te maken?", "Wat betekent geld reserveren?",
                    "Met welke formule bereken je hoeveel geld je moet reserveren?"]),
        ],
        mat={"ot": ["Oefentoets hoofdstuk 1", [["Oefentoets", "13pJeEmldejfE6TNaKlrxl-hkFkJess5L"], ["Met antwoorden", "15Smp4iqHeYIZZENDP3PiGDyRrDXWgJOp"]]],
             "no": ["Nakijkblad oefentoets", [["Nakijkblad", "1946XgRIBFYOxd_Bimo2Z5p0WPVvN9y9H"]]],
             "nh": ["Nakijkblad herhalingsvragen", [["Nakijkblad", "1ZsEMwlwcs2w4VuGiFyv3cRSQmg3n7lc0"]]],
             "nr": ["Nakijkblad rekenen", [["Nakijkblad", "1JOahNgKIJwAEEKjgQwyRfjdB5l63GxTP"]]]},
        extra=["ot", "no", "nh", "nr"],
        films=[dict(par="1.2", film="1EN_S_SEca6zPTW3gp4XepzGCes8qs4-y", k="Instructiefilm", t="De juiste formule kiezen",
                    d="Gemiddelde, korting of procent: welke formule gebruik je wanneer?", btn="Naar de oefenstof"),
               dict(par="1.4", film="16N5D3Uk7W3dtGwI9u8KE6zPuN2LAx5CF", k="Instructiefilm", t="Van week naar maand",
                    d="Keer 52 en gedeeld door 12. Niet keer 4!", btn="Naar de oefenstof")],
        weg={"1.2": [1]},
    ),
}

if len(sys.argv) != 2 or sys.argv[1] not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/bouw-pagina.py <" + "|".join(CONFIG) + ">")
name = sys.argv[1]
C = CONFIG[name]
OUT = os.path.join(ECO, name)
for p in C["pars"]:
    assert all(k in C["mat"] for k in p["x"]), p["id"]
    for b, _ in p["imgs"]:
        assert os.path.exists(os.path.normpath(os.path.join(ECO, "img", name, b + ".jpg"))), b
assert all(k in C["mat"] for k in C["extra"])
sl = lambda f: json.load(open(os.path.join(OUT, "slides", f), encoding="utf-8")) if os.path.exists(os.path.join(OUT, "slides", f)) else {}
pars = [dict(p, g=[], gi=[]) for p in C["pars"]]
data = dict(key=C["key"], oefen=None, pars=pars, cards=[], films=C.get("films", []), mat=C["mat"], extra=C["extra"], deck=sl("deck.json"), steps=sl("steps.json"))
os.makedirs(OUT, exist_ok=True)
json.dump(data, open(os.path.join(OUT, "data.json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
print("economie/%s/data.json:" % name, len(pars), "paragrafen,", sum(len(p["q"]) for p in pars), "kernvragen,", len(data["deck"]), "presentaties")
