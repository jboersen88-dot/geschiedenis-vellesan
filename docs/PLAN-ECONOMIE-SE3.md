# Plan: Economie jaar 4 SE3 (H1, H2) bouwen zoals boekje 1

Doel: de pagina `economie/h.html?p=jaar-4/se-h1-h2-h8` krijgt dezelfde leeromgeving als `app.html` (boekje 1): zelfde opmaak en tabs, dia's van de eigen PowerPoints, Oefenlab, quiz, games, toets op maat met AI, en daarbovenop wat Economie nodig heeft (formule- en rekenlab). Geschreven 2026-10-20.

## Onderzoek (wat er al ligt)

- Huidige pagina = een iframe met de oude lesapp (`economie/apps/jaar-4_se-h1-h2-h8.html`) plus de EDU-Racer. Zelfde sjabloon als `app.html` van een eerdere ronde, maar zonder de nieuwe opmaak en functies.
- In die oude app zit alle inhoud al: 8 paragrafen (1.1 t/m 2.4) met Drive-PowerPoints, 8 lijsten leerdoelen, 90 begrippen, 139 meerkeuzevragen (voldoen aan de regels), 11 sorteersets, 4 toetsversies (Drive-PDF), 6 films, en twee Economie-labs (`formule`, `reken`).
- `app.html` is nu het voorbeeld: tabs Start, Lesstof, Oefenlab, Oefentoetsen, Oefenmateriaal, Filmpjes; dia-viewer; toets op maat (Worker, Haiku 5.5).
- Boekje 2 laat zien hoe je een tweede boekje uit `app.html` bouwt (`boekje-2/bouw.py` + data). Dat hergebruiken we: **bouwen met een script, niet met de hand**. Daardoor kosten de andere Economie-hoofdstukken straks bijna niets meer.

## Aanpak: weinig tokens

1. Alles wat mechanisch is, doet een script (data halen uit de oude app, app bouwen, dia's omzetten). Modellen schrijven alleen de scripts en de stukjes die oordeel vragen.
2. Goedkoopste model dat het aankan: Haiku voor mechanisch en controle, Sonnet voor bouwen en logica. Opus en Fable niet nodig.
3. Elk stuk krijgt een brief met bestandsnamen en "klaar =", zodat niemand de hele repo hoeft te lezen. Geen screenshots als de DOM genoeg is.
4. De drie bouwstukken zijn onafhankelijk en lopen tegelijk; ik (coördinator) doe de controle en de koppeling.

## Stukken

| # | Stuk | Model | Klaar = |
|---|---|---|---|
| 0 | Data uit de oude app halen (`economie/se3/bron/extract.mjs` → `data.json`, `reken.js`, `lab-html.html`) | coördinator (script) | **klaar** |
| A | `economie/bouw-eco.py` bouwt `economie/se3/app.html` uit `app.html` + data + reken-labs; Economie-opmaak en -teksten, geen Geschiedenis-onderdelen, dia's of Drive-voorbeeld, toets op maat ingesteld voor 8 paragrafen | Sonnet | opent op 375 en 820 px, alle tabs en labs zonder consolefouten, vragencheck groen |
| B | Worker: `vak:"eco4"` voor de toets op maat en het nakijken (lesstof uit de data, 8 onderwerpen), uitrollen, live testen | Sonnet | echte toets gemaakt en nagekeken, bestaande Geschiedenis-toets en -nakijker werken nog |
| C | Dia's: 8 PowerPoints van de docent → `economie/se3/slides/<paragraaf>/NN.jpg` + `deck.json` | Haiku | alle 8 omgezet, < 300 KB per dia, of gemeld waarom niet |
| D | Koppeling in de Economie-site (`h.html` voor deze pagina, knoppen, kruimelpad) | coördinator | pagina leidt naar de nieuwe leeromgeving |
| E | Controle: scripts, browsertest, changelog, README, pushen | coördinator (Haiku voor het draaien) | 0 fouten, live gecontroleerd |

## Daarna (niet nu)

Dezelfde `bouw-eco.py` met een andere `data.json` voor jaar 4 H1, H2, H3 en jaar 2 H1 t/m H4. Havo/vwo jaar 3 heeft nog geen materiaal.

## Randvoorwaarden

Besluiten in `docs/besluiten.md` gelden: dia's mogen openbaar, geen leerlingdata, geen verzonnen feiten, meerkeuzeregels (4 opties, even lang, juiste niet vaker dan 25% het langste).
