let gateCountdownTimer = null;
let gateQuoteTimer = null;
let gateQuoteIndex = 0;
let gateUnlocking = false;

function buildGateDecor() {
  const sparkles = Array.from({ length: 6 }, (_, i) =>
    `<span class="birthday-gate__sparkle" style="--sparkle-i:${i}"></span>`
  ).join("");

  const balloons = ["#c45c3e", "#c9a227", "#6b2d3c"].map(
    (color, i) =>
      `<span class="birthday-gate__balloon" style="--balloon-i:${i};--balloon-color:${color}"></span>`
  ).join("");

  return `
    <div class="birthday-gate__decor" aria-hidden="true">
      <div class="birthday-gate__sparkles">${sparkles}</div>
      <div class="birthday-gate__balloons">${balloons}</div>
    </div>
  `;
}

function buildIndiaBanner() {
  const ec = SITE_CONFIG.earlyCelebration || {};
  if (!isEarlyCelebrationActive()) return "";

  const banner = ec.gateBanner || "From India with love — we've already started celebrating you!";
  const hint = ec.gateHint || "Your Turin birthday arrives soon. The countdown is for Italy time.";

  return `
    <div class="birthday-gate__india-banner">
      <p class="birthday-gate__india-banner-title">${banner}</p>
      <p class="birthday-gate__india-banner-hint">${hint}</p>
    </div>
  `;
}

function buildGateCountdown() {
  return `
    <div class="birthday-gate__countdown countdown" aria-live="polite" aria-atomic="true">
      <div class="countdown__unit">
        <span class="countdown__value" id="gate-days">--</span>
        <span class="countdown__label">Days</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value" id="gate-hours">--</span>
        <span class="countdown__label">Hours</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value" id="gate-minutes">--</span>
        <span class="countdown__label">Minutes</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__value" id="gate-seconds">--</span>
        <span class="countdown__label">Seconds</span>
      </div>
    </div>
  `;
}

function updateGateCountdown() {
  const target = parseBirthday();
  if (!target || gateUnlocking) return;

  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    unlockBirthdayGate();
    return;
  }

  const seconds = Math.floor(diff / 1000);
  const daysEl = document.getElementById("gate-days");
  const hoursEl = document.getElementById("gate-hours");
  const minutesEl = document.getElementById("gate-minutes");
  const secondsEl = document.getElementById("gate-seconds");

  if (daysEl) daysEl.textContent = String(Math.floor(seconds / 86400));
  if (hoursEl) hoursEl.textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds % 60).padStart(2, "0");
}

function rotateGateQuote(quotes) {
  const quoteEl = document.querySelector(".birthday-gate__quote");
  if (!quoteEl || !quotes.length) return;

  gateQuoteIndex = (gateQuoteIndex + 1) % quotes.length;
  quoteEl.classList.remove("birthday-gate__quote--visible");
  requestAnimationFrame(() => {
    quoteEl.textContent = quotes[gateQuoteIndex];
    quoteEl.classList.add("birthday-gate__quote--visible");
  });
}

function unlockBirthdayGate() {
  if (gateUnlocking) return;
  gateUnlocking = true;

  clearInterval(gateCountdownTimer);
  clearInterval(gateQuoteTimer);

  const gate = document.querySelector(".birthday-gate");
  const config = SITE_CONFIG.birthdayGate || {};
  const unlockLine = config.unlockLine || "Tanti Auguri! The celebration is ready.";

  if (gate) {
    gate.classList.add("birthday-gate--unlocking");
    const title = gate.querySelector(".birthday-gate__title");
    const subtitle = gate.querySelector(".birthday-gate__subtitle");
    const countdown = gate.querySelector(".birthday-gate__countdown");
    const quote = gate.querySelector(".birthday-gate__quote");
    const indiaBanner = gate.querySelector(".birthday-gate__india-banner");

    if (countdown) countdown.hidden = true;
    if (quote) quote.hidden = true;
    if (indiaBanner) indiaBanner.hidden = true;
    if (subtitle) subtitle.textContent = unlockLine;
    if (title) title.classList.add("birthday-gate__title--pulse");
  }

  setTimeout(() => location.reload(), 1800);
}

function enforceBirthdayGate() {
  const config = SITE_CONFIG.birthdayGate;
  if (!config?.enabled || isBirthdayUnlocked()) return false;

  document.body.classList.add("birthday-gate--active");

  const earlyActive = isEarlyCelebrationActive();
  const ec = SITE_CONFIG.earlyCelebration || {};
  const quotes =
    earlyActive && ec.quotes?.length
      ? ec.quotes
      : config.quotes?.length
        ? config.quotes
        : ["Something special is on its way…"];

  const gate = document.createElement("div");
  gate.className = earlyActive
    ? "birthday-gate birthday-gate--india-started"
    : "birthday-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "birthday-gate-title");
  gate.innerHTML = `
    ${buildGateDecor()}
    <div class="birthday-gate__card">
      <div class="laurel-divider" aria-hidden="true">
        <svg viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12 Q50 0 100 12 T200 12 T300 12 T400 12" fill="none" stroke="currentColor" stroke-width="1"/>
          <circle cx="200" cy="12" r="4" fill="currentColor"/>
        </svg>
      </div>
      <h1 class="birthday-gate__title" id="birthday-gate-title">${config.title || "Buon Compleanno"}</h1>
      <p class="birthday-gate__subtitle">${config.subtitle || "Something special is on its way…"}</p>
      ${buildIndiaBanner()}
      ${buildGateCountdown()}
      <blockquote class="birthday-gate__quote birthday-gate__quote--visible">${quotes[0]}</blockquote>
    </div>
  `;

  document.body.appendChild(gate);

  updateGateCountdown();
  gateCountdownTimer = setInterval(updateGateCountdown, 1000);
  gateQuoteTimer = setInterval(() => rotateGateQuote(quotes), 6000);

  if (config.musicOnGate !== false && typeof initMusic === "function") {
    initMusic();
  }

  return true;
}