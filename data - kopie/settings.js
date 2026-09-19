// ============================================================
// TDJ – RYCHLÉ PROVOZNÍ NASTAVENÍ WEBU
// ============================================================
// Toto je hlavní soubor pro běžné změny během sezóny.
// Měň pouze hodnoty v uvozovkách. HTML ani CSS není potřeba upravovat.
// Po uložení souboru obnov stránku pomocí Ctrl+F5.
//
// registration.status:
//   "closed" = REGISTRACE ZAVŘENA
//   "open"   = REGISTRACE + aktivní externí odkaz
//
// results.active:
//   true  = odkaz na aktuální výsledky je aktivní
//   false = tlačítko zůstane v sekci, ale vede jen na sekci výsledků
//
// gallery.links:
//   label = text odkazu
//   url   = externí galerie nebo interní kotva (#...)
// ============================================================

const TDJ_SETTINGS = {
  race: {
    date: "SRPEN 2027",
    edition: "29. ROČNÍK MTB ZÁVODU"
  },

  registration: {
    status: "closed",
    closedText: "REGISTRACE ZAVŘENA",
    openText: "REGISTRACE",
    url: "#info"
  },

  results: {
    active: true,
    label: "TDJ 2026",
    buttonText: "VÝSLEDKY →",
    url: "https://www.sportt.cz/racesResults/resultlist/1536"
  },

  gallery: {
    links: [
      { label: "2026 →", url: "#fotogalerie-2026" },
      { label: "2025 →", url: "#fotogalerie-2025" },
      { label: "2024 →", url: "#fotogalerie-2024" },
      { label: "FOTOARCHIV →", url: "#fotogalerie-ostatni" }
    ]
  }
};

function TDJ_setLink(el, url, externalAllowed = true) {
  if (!el) return;
  el.href = url || "#";
  const external = externalAllowed && url && !url.startsWith("#");
  if (external) {
    el.target = "_blank";
    el.rel = "noopener";
  } else {
    el.removeAttribute("target");
    el.removeAttribute("rel");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const date = document.getElementById("raceDate");
  const edition = document.getElementById("raceEdition");
  const registration = document.getElementById("registrationButton");

  if (date) date.textContent = TDJ_SETTINGS.race.date;
  if (edition) edition.textContent = TDJ_SETTINGS.race.edition;

  if (registration) {
    const isOpen = TDJ_SETTINGS.registration.status === "open";
    registration.textContent = isOpen
      ? TDJ_SETTINGS.registration.openText
      : TDJ_SETTINGS.registration.closedText;
    TDJ_setLink(registration, isOpen ? TDJ_SETTINGS.registration.url : "#info");
  }

  const resultsLabel = document.getElementById("currentResultsLabel");
  const resultsLink = document.getElementById("currentResultsLink");
  if (resultsLabel) resultsLabel.textContent = TDJ_SETTINGS.results.label;
  if (resultsLink) {
    resultsLink.textContent = TDJ_SETTINGS.results.buttonText;
    TDJ_setLink(
      resultsLink,
      TDJ_SETTINGS.results.active ? TDJ_SETTINGS.results.url : "#vysledky"
    );
  }

  const galleryIds = ["galleryLink1", "galleryLink2", "galleryLink3", "galleryLinkOther"];
  galleryIds.forEach((id, i) => {
    const el = document.getElementById(id);
    const cfg = TDJ_SETTINGS.gallery.links[i];
    if (el && cfg) {
      el.textContent = cfg.label;
      TDJ_setLink(el, cfg.url);
    }
  });
});
