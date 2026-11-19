# Elk jaar: de cijfers van de Miljoenennota in 5.4 (economie 4 mavo)

Paragraaf 5.4 "Geld genoeg?" van economie 4 mavo laat de inkomsten en uitgaven van het Rijk zien uit de nieuwste Miljoenennota. Na elke Prinsjesdag (derde dinsdag van september) moeten die beelden en cijfers opnieuw. Zo is het in november 2026 gedaan (Miljoenennota 2027).

## Bronnen (allemaal van het ministerie van Financiën, hergebruik toegestaan)

1. **Miljoenennotaposter**: rijksoverheid.nl › Prinsjesdag › Lesmateriaal › Miljoenennotaposter. Een JPG van 5000 × 3333 px met alle inkomsten en uitgaven, per post. Dit is het plaatje dat in de PowerPoint stond.
2. **Miljoenennota** op rijksfinancien.nl/miljoenennota/<jaar>: tabel "Budgettaire kerngegevens" (inkomsten, uitgaven, EMU-saldo, EMU-schuld, bbp) en de figuren "Ontwikkeling EMU-saldo" en "Ontwikkeling EMU-schuld".
3. **Samenvatting Miljoenennota** (pdf op rijksoverheid.nl): handig om de getallen van de poster als tekst te controleren.

## Werkwijze

1. Lees de PowerPoint van de docent (OneDrive: `Economie jaar 4 hoofdstuk 5.4 geld genoeg (nearpod).pptx`). Alleen lezen.
2. Haal de poster binnen. De cloud mocht rijksoverheid.nl niet bereiken; daarom is de poster in de ingebouwde browser op de Mac geopend, in een canvas getekend en per stuk van 800 × 600 px vastgelegd (inzoomen, schaal 1, dan is het een PNG). Uitsneden op ware grootte voor de vakken met kleine letters (indirecte en directe belastingen, sociale zekerheid, zorg, overheidsschuld), de hele poster op 2400 px.
3. Zet de uitsneden in één map met deze namen: `poster.png`, `ind_top.png`, `ind_bot.png`, `dir_top.png`, `dir_bot.png`, `werkn.png`, `volks.png`, `uitgaven.png`, `sz.png`, `zorg.png`, `saldo.png`, `schuld.png`, `schuldslide.png`.
4. `python3 -I tools/miljoenennota/maak54.py <oud.pptx> <map> <nieuw.pptx>` vervangt de beelden, zet ze in de goede verhouding, verschuift de rode kaders, past de teksten aan en zet op elke dia een bronregel. **De kaders (`INK`, `UIT`) en de teksten op dia 5, 13, 14 en 16 horen bij 2027**: pas ze aan voor een nieuw jaar.
5. Dia's voor de site: `python3 -I tools/dias/lo.py <nieuw.pptx> economie/j4h5/slides/5.4 weg=6,8,18,20` (dia 6 en 8 hebben een foto van een politicus, 18 is een link, 20 zijn de herhalingsvragen).
6. Controleer elk getal twee keer: lees de poster op ware grootte, leg hem naast de tekst van de samenvatting en de tabel met kerngegevens, en tel de posten op (afronding kan 0,1 tot 0,2 schelen; dat staat ook op de poster).
