TDJ V4.2 — HISTORIE
====================
- Dokončena samostatná stránka Příběh TDJ.
- Doplněn vznik závodu v roce 1999 a původní cesty přes sjezdovku, Tolštejn a Křížovou horu.
- Doplněn zakladatel a dlouholetý organizátor Miloš Javůrek.
- Doplněno převzetí organizace Terkou a Tomášem v roce 2024.
- Milníky: rekord Jana Strože 23:04 (2021), 118 účastníků (2025) a 28. ročník (2026).
- Upravená upoutávka Historie na hlavní stránce a znalost historie v ISABEL.

TDJ Production V1.12

Změna proti V1.11:
- Fotogalerie 2025 sjednocena 1:1 s layoutem Fotogalerie 2026 na desktopu i mobilu.
- Ostatní části webu beze změny.

TDJ Production V1.11
- Fotogalerie 2025 je samostatná podstránka stejně jako 2026.
- 6 fotografií v automatickém slideru + šipky + tečky.
- Luboš Bakus + 4 galerie Mariana Maštrly.
- Sjednocená šířka galerií 2025/2026.
- Desktop HERO používá start závodu pod novým názvem souboru kvůli cache.
- Mobilní HERO a opravené centrování mapy/profilu zůstávají beze změny.


TDJ Production V1.14
====================
Upraveny Propozice: startovne a prezentace, nove kategorie, pravidla a bezpecnost, zvyrazneni Poharu CC Varnsdorf. Ostatni casti V1.13 beze zmeny.

V1.16.8
- Google Analytics 4: G-8ENY2HMGCP
- Consent-first integration: analytics disabled until explicit approval
- Analytics consent is shown on first visit only; after accept/reject the banner disappears and no floating cookie settings button remains
- No marketing/ad consent is enabled


V4.1
- ISABEL napojena na Cloudflare Worker tdj-isabel-api.
- Dotazy se posilaji pres POST JSON {question: ...}.
- Odpoved API {answer: ...} se zobrazi v chatu.
- Pri nedostupnosti API zustava lokalni V3.3 znalostni engine jako fallback.
- Gemini API klic neni ulozen ve webu; zustava jako Cloudflare Secret.

V4.1: ISABEL posílá Workeru krátkodobou historii dialogu (max. 10 zpráv / cca 5 výměn).
TDJ V4.3 — HISTORICKÝ VODOZNAK
- Jemné šedé kontury historické fotografie jsou vložené pod úvod historie a blok roku 1999.
- Průhledná vrstva nezasahuje do textu a na mobilu se automaticky zeslabuje.

TDJ V4.3.1 — OPRAVA HISTORICKÉHO VODOZNAKU
- Fotografie už není samostatným prvkem stránky a nezvětšuje výšku obsahu.
- Je vykreslená jako průhledné pozadí přímo pod úvodem a příběhem roku 1999.
- Aktualizované označení stylů zajišťuje načtení opravy i při dříve uložené verzi v prohlížeči.

TDJ V4.3.2 — BARVA HISTORICKÝCH MILNÍKŮ
- Žlutá čísla roků v části Rok po roce byla nahrazena značkovou modrou TDJ.

TDJ V4.3.3 — POLOHA HISTORICKÉHO VODOZNAKU
- Historický vodoznak je posunutý přibližně o 50 px níže, aby obličeje navazovaly na dělicí linku mezi úvodem a příběhem roku 1999.
- Letopočty v části Rok po roce používají jemnou světle modrou barvu historie.
- Na mobilu je fotografie posunutá níže při zachování slabší intenzity.

TDJ V4.3.4 — KOMPLETNÍ BALÍČEK PRO GITHUB PAGES
- Do kořenové složky byl doplněn soubor CNAME bez přípony s doménou tourdejedlova.cz.
- Balíček lze nahrát jako kompletní obsah repozitáře bez ztráty propojení vlastní domény.

TDJ V4.3.5 — TABLO TDJ
- Ve fotogalerii bylo přidáno první zlaté tlačítko TABLO TDJ.
- Přidána podstránka VŠICHNI VÍTĚZOVÉ se 30 poli pro ročníky 1999–2028.
- Dostupné fotografie ročníků 1999, 2004–2007 a 2019–2026 jsou vložené; ostatní roky mají připravené zlaté pozice.
- Tablo má čtyři sloupce na desktopu, dva na mobilu a fotografie lze otevřít ve zvětšeném náhledu.

TDJ V4.3.6 — OPRAVA ZLATÉHO TLAČÍTKA
- Tlačítko TABLO TDJ má výraznou zlatou výplň, tmavý text a zlatý hover.
- Opraveno přepsání barvy obecným stylem ostatních tlačítek fotogalerie.

TDJ V4.3.7 — BÍLÁ STRÁNKA TABLA
- Podstránka VŠICHNI VÍTĚZOVÉ používá bílé pozadí stejně jako ostatní podstránky TDJ.
- Nadpis je tmavě modrý; zlatá zůstává na letopočtech, linkách, rámečcích a navigaci.
- Černozlatá fotografie ročníku 1999 zůstává beze změny.
