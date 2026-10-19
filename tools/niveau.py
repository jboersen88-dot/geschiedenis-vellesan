# Deelt quizvragen in op niveau, alleen op basis van de vraagtekst (verandert geen vraag of antwoord).
# B = Basis (kennen, herkennen: wat is, wie, welk jaar), U = Uitdaging (uitleggen, oorzaak-gevolg, waarom, vergelijken, bron duiden).
import re

UITDAGING = re.compile(
    r"^(waarom|hoe (veranderde|ontstond|kwam|zorgde)|wat zorgde)|verschil|overeenkomst|\bbron\b|bedoel|oorzaken|juiste volgorde|"
    r"dubbel probleem|taakverdeling|kenmerkend|wat zegt|wat laat|niet geschikt|kon(den)? .* wel .* niet",
    re.I)

def niveau(vraag):
    return "U" if UITDAGING.search(vraag) else "B"

def niveaus(bank):
    return "".join(niveau(q[1]) for q in bank)
