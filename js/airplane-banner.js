function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function planeSvg(uniqueId) {
  return `
<svg class="airplane-banner__scene" viewBox="0 0 220 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="body-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fffdf8"/>
      <stop offset="50%" stop-color="#f2ead8"/>
      <stop offset="100%" stop-color="#cfc4b0"/>
    </linearGradient>
    <linearGradient id="wing-${uniqueId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0dea0"/>
      <stop offset="100%" stop-color="#b8922a"/>
    </linearGradient>
    <linearGradient id="glass-${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9ec0d4"/>
      <stop offset="100%" stop-color="#5a8498"/>
    </linearGradient>
  </defs>

  <ellipse class="airplane-banner__cloud airplane-banner__cloud--1" cx="34" cy="68" rx="20" ry="7" fill="white" opacity="0.3"/>
  <ellipse class="airplane-banner__cloud airplane-banner__cloud--2" cx="62" cy="72" rx="14" ry="5" fill="white" opacity="0.22"/>

  <path d="M168 46 L186 28 L190 48 L186 68 L168 58 Z" fill="#6b2d3c"/>
  <path d="M162 52 L188 50 L188 54 L162 56 Z" fill="#5c5347" opacity="0.75"/>

  <path d="M16 50 L24 42 Q42 38 62 40 L108 40 Q148 40 172 44 L184 48 L188 52 L184 56 L172 58 Q148 62 108 62 L62 62 Q42 64 28 60 L16 54 Z"
        fill="url(#body-${uniqueId})" stroke="#b5a998" stroke-width="0.7"/>

  <path d="M62 44 L138 44" stroke="#6b2d3c" stroke-width="2.2" stroke-linecap="round" opacity="0.9"/>

  <line x1="54" y1="26" x2="54" y2="44" stroke="#8a7f6e" stroke-width="1.2"/>
  <line x1="98" y1="26" x2="98" y2="44" stroke="#8a7f6e" stroke-width="1.2"/>

  <path d="M36 22 L142 18 L146 24 L142 30 L36 34 Z" fill="url(#wing-${uniqueId})" stroke="#9a7820" stroke-width="0.6"/>
  <path d="M36 30 L142 26 L144 28 L36 32 Z" fill="#c9a227" opacity="0.45"/>

  <ellipse cx="68" cy="46" rx="11" ry="8" fill="url(#glass-${uniqueId})" opacity="0.93"/>
  <path d="M58 46 Q68 40 78 46" fill="none" stroke="#fffdf8" stroke-width="1.4" opacity="0.55"/>

  <circle cx="78" cy="62" r="4" fill="#3d3830" stroke="#2c2420" stroke-width="0.8"/>
  <path d="M78 58 L78 62" stroke="#5c5347" stroke-width="1.3"/>
  <circle cx="178" cy="58" r="2.5" fill="#3d3830" stroke="#2c2420" stroke-width="0.6"/>

  <circle cx="18" cy="50" r="3.2" fill="#4a4540"/>
  <g class="airplane-banner__propeller">
    <line x1="18" y1="50" x2="6" y2="50" stroke="#3d3830" stroke-width="2.4" stroke-linecap="round" opacity="0.8"/>
    <line x1="18" y1="50" x2="18" y2="36" stroke="#3d3830" stroke-width="2.4" stroke-linecap="round" opacity="0.8"/>
    <line x1="18" y1="50" x2="28" y2="58" stroke="#3d3830" stroke-width="2.4" stroke-linecap="round" opacity="0.8"/>
  </g>

  <path class="airplane-banner__rope" d="M186 54 Q198 60 208 66 L220 70" fill="none" stroke="#5c5347" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="186" cy="54" r="1.6" fill="#c9a227"/>
</svg>`;
}

function buildFlyer(message, journeyLabel) {
  const id = `p${Math.random().toString(36).slice(2, 8)}`;
  const journeyTag = journeyLabel
    ? `<span class="airplane-banner__journey">${escapeHtml(journeyLabel)}</span>`
    : "";
  const flyer = document.createElement("div");
  flyer.className = "airplane-banner__flyer";
  flyer.innerHTML = `
    <div class="airplane-banner__ribbon">
      <span class="airplane-banner__ribbon-wave" aria-hidden="true"></span>
      <span class="airplane-banner__text">${message}</span>
    </div>
    <div class="airplane-banner__plane-wrap">
      ${planeSvg(id)}
      ${journeyTag}
    </div>
  `;
  return flyer;
}

function initAirplaneBanner() {
  if (document.body.dataset.page !== "gallery") return;
  if (SITE_CONFIG.birthdayGate?.enabled && !isBirthdayUnlocked()) return;

  const config = SITE_CONFIG.airplaneBanner;
  if (!config?.enabled || prefersReducedMotion()) return;

  const message = escapeHtml(
    (config.message || "Happy Birthday, {name}!").replace("{name}", SITE_CONFIG.recipientName)
  );
  const journeyLabel = config.journeyLabel || "";

  const banner = document.createElement("div");
  banner.className = "airplane-banner";
  banner.setAttribute("aria-hidden", "true");
  banner.appendChild(buildFlyer(message, journeyLabel));

  document.body.appendChild(banner);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAirplaneBanner);
} else {
  initAirplaneBanner();
}