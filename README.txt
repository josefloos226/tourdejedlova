TDJ Production V1.1
===================

Zdroj: TDJ-index-v20.5 MASTER
Účel V1.1: oprava produkčního převodu fotografií.

- index.html = struktura webu
- assets/css/style.css = vzhled
- assets/js/app.js = funkce
- assets/images/embedded = fotografie a grafika vytažená z původních data:image URI
- data/ = připraveno pro další fázi editovatelného obsahu

Při tomto kroku nebyl měněn obsah ani design MASTERU.
Vytaženo unikátních vložených obrázků: 52

Kontrola:
1. Rozbalit celý adresář.
2. Otevřít index.html.
3. Zkontrolovat HERO, historii, fotogalerii, TDJ pomáhá, partnery a mapu.


TDJ Production V1.2
===================
Napojeno na data/settings.js:
- datum / měsíc závodu v HERO
- číslo ročníku
- stav registrace
- text tlačítka registrace
- odkaz registrace

Příklad otevření registrace:
status: "open"
url: "https://..."

Pro zavření:
status: "closed"

Po změně settings.js soubor ulož a obnov index.html v prohlížeči.


TDJ Production V1.3
===================
settings.js nyní ovládá:
1. datum závodu v HERO
2. číslo ročníku
3. registraci – otevřeno/zavřeno, text a URL
4. aktuální výsledky – označení ročníku a URL
5. čtyři odkazy ve fotogalerii

Archivní výsledky 2025/2024 a samotné fotografie zatím zůstávají beze změny.
Historie a TDJ pomáhá zatím nejsou datově převedeny.


TDJ Production V1.4
===================
Dočasná úprava sekce HISTORIE:
- zachován nadpis 28 LET NA CESTĚ K JEDLOVÉ
- zachována fotografie a vizuální styl
- zachován odkaz PŘÍBĚH TDJ
- nahrazen pouze úvodní odstavec dočasným textem o připravovaném příběhu


TDJ Production V1.5
===================
Historie:
- na hlavní stránce vrácen původní text:
  „Tour de Jedlová vyrostla z místní cyklistiky...“
- odkaz PŘÍBĚH TDJ zůstává aktivní
- po kliknutí se otevře připravená detailní stránka historie
- detail zatím obsahuje pouze titul a informaci, že příběh připravujeme
- původní provizorní dlouhé texty, rekordy a fakta jsou z detailu dočasně skryty


TDJ Production V1.6
===================
Optimalizace obrazku pro rychlejsi web; nazvy a cesty zachovany.


TDJ Production V1.7
===================
Optimalizace nacitani: dalsi komprese obrazku/log, priorita prvniho obrazku a lazy loading ostatnich obrazku.


TDJ Production V1.8
===================
5 schvalenych uprav: mobilni menu, mobilni galerie, centrovani mapy/profilu, ZAVRENO pres QR, odsazeni obou pribehu Pomahame.


TDJ Production V1.10
====================
Fotogalerie 2025: 6 optimalizovanych fotografii, automaticky slider, Lubos Bakus + 4 galerie Marian Mastrla. Zachovana mobilni HERO z V1.8 a oprava centrovani mapy/profilu.
