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
