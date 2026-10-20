# Niveau-indeling Economie SE3 (tools/niveau.py is voor Geschiedenis). Wordt door bouw-eco.py geladen en levert niveaus(bank).
# B = Basis: kennen/herkennen en eenvoudig (een-staps) rekenen.
# U = Uitdaging: gevolgen/oorzaken, waarom, vergelijken, toepassen in een situatie, meerstaps rekenen.
import re

UITDAGING = re.compile(
    r"waarom|\bverschil\b|verschilt|gevolg|oorzaak|wat gebeurt|wat zal|wat verwacht|hoe ontstaat|hoe kan|hoe helpt|hoe verdient|"
    r"wat betekent|wat zegt|wat laat|wat kan er gebeuren|wat mag|voordeel|nadeel|gevaar|verstandig|"
    r"welke twee|welke conclusie|welke uitspraak|bij welk .* het (hoogst|laagst)|(in )?welk land|welke kredietvorm past|eerst .* daarna|wie heeft|"
    r"wat is er gebeurd|het meest\?|wat laat dit zien|hoe werkt", re.I)
OPS = (" × ", " : ", " + ", " − ", "²")

def niveau(q):
    vraag, uitleg = q[1], (q[3] if len(q) > 3 else "")
    if UITDAGING.search(vraag):
        return "U"
    # meerstaps rekenen: minstens twee getallen in de vraag en twee soorten bewerkingen in de uitleg
    if len(re.findall(r"\d[\d.,]*", vraag)) >= 2 and sum(o in uitleg for o in OPS) >= 2:
        return "U"
    return "B"

def niveaus(bank):
    return "".join(niveau(q) for q in bank)
