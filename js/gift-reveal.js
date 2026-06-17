let giftAudioCtx = null;

function bouquetSvg() {
  return `
<svg class="gift-reveal__bouquet-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="roseDeep" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#e8a0a8"/>
      <stop offset="55%" stop-color="#c45c3e"/>
      <stop offset="100%" stop-color="#6b2d3c"/>
    </radialGradient>
    <radialGradient id="roseWine" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#d4737a"/>
      <stop offset="100%" stop-color="#6b2d3c"/>
    </radialGradient>
    <radialGradient id="roseGold" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#f0d890"/>
      <stop offset="100%" stop-color="#c9a227"/>
    </radialGradient>
    <linearGradient id="kraftWrap" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c4a574"/>
      <stop offset="100%" stop-color="#8b6914"/>
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e8d48b"/>
      <stop offset="100%" stop-color="#c9a227"/>
    </linearGradient>
  </defs>

  <!-- Stems -->
  <g class="bouquet-stems">
    <path d="M148 380 C140 320 135 260 130 200" stroke="#5c6b4a" stroke-width="3" fill="none"/>
    <path d="M152 380 C160 310 165 250 170 190" stroke="#4a5c3a" stroke-width="2.5" fill="none"/>
    <path d="M150 380 C145 300 155 220 162 180" stroke="#5c6b4a" stroke-width="2" fill="none"/>
    <path d="M120 370 C110 300 105 230 100 200" stroke="#5c6b4a" stroke-width="2" fill="none"/>
    <path d="M180 370 C190 290 195 220 200 195" stroke="#4a5c3a" stroke-width="2" fill="none"/>
  </g>

  <!-- Eucalyptus leaves -->
  <g class="bouquet-foliage" opacity="0.9">
    <ellipse cx="95" cy="240" rx="18" ry="8" fill="#5c6b4a" transform="rotate(-35 95 240)"/>
    <ellipse cx="205" cy="250" rx="16" ry="7" fill="#6b7f58" transform="rotate(25 205 250)"/>
    <ellipse cx="88" cy="280" rx="14" ry="6" fill="#5c6b4a" transform="rotate(-20 88 280)"/>
    <ellipse cx="212" cy="270" rx="15" ry="6" fill="#4a5c3a" transform="rotate(30 212 270)"/>
    <ellipse cx="115" cy="310" rx="12" ry="5" fill="#5c6b4a" transform="rotate(-15 115 310)"/>
    <ellipse cx="185" cy="305" rx="13" ry="5" fill="#6b7f58" transform="rotate(18 185 305)"/>
  </g>

  <!-- Kraft paper wrap -->
  <path d="M75 340 Q150 320 225 340 L210 395 Q150 410 90 395 Z" fill="url(#kraftWrap)" opacity="0.95"/>
  <path d="M90 350 Q150 335 210 350" stroke="#8b6914" stroke-width="1" fill="none" opacity="0.4"/>

  <!-- Baby's breath -->
  <g class="bouquet-filler" fill="#faf7f2" opacity="0.85">
    <circle cx="108" cy="195" r="2"/><circle cx="115" cy="188" r="1.5"/><circle cx="102" cy="182" r="1.8"/>
    <circle cx="192" cy="190" r="2"/><circle cx="198" cy="198" r="1.5"/><circle cx="185" cy="200" r="1.6"/>
    <circle cx="125" cy="175" r="1.5"/><circle cx="175" cy="178" r="1.8"/><circle cx="150" cy="168" r="2"/>
    <circle cx="140" cy="210" r="1.5"/><circle cx="160" cy="205" r="1.7"/>
  </g>

  <!-- Roses -->
  <g class="bouquet-rose bouquet-rose--1" style="--bloom-delay: 0s">
    <circle cx="150" cy="155" r="28" fill="url(#roseDeep)"/>
    <path d="M150 127 Q162 135 158 148 Q150 142 142 148 Q138 135 150 127" fill="#e8a0a8" opacity="0.6"/>
    <path d="M150 133 Q145 140 150 148 Q155 140 150 133" fill="#6b2d3c" opacity="0.3"/>
  </g>
  <g class="bouquet-rose bouquet-rose--2" style="--bloom-delay: 0.15s">
    <circle cx="115" cy="175" r="22" fill="url(#roseWine)"/>
    <path d="M115 153 Q124 160 121 170 Q115 165 109 170 Q106 160 115 153" fill="#d4737a" opacity="0.5"/>
  </g>
  <g class="bouquet-rose bouquet-rose--3" style="--bloom-delay: 0.3s">
    <circle cx="185" cy="172" r="24" fill="url(#roseDeep)"/>
    <path d="M185 148 Q195 156 192 167 Q185 162 178 167 Q175 156 185 148" fill="#e8a0a8" opacity="0.5"/>
  </g>
  <g class="bouquet-rose bouquet-rose--4" style="--bloom-delay: 0.45s">
    <circle cx="135" cy="130" r="18" fill="url(#roseGold)"/>
    <path d="M135 112 Q142 118 140 126 Q135 122 130 126 Q128 118 135 112" fill="#f0d890" opacity="0.5"/>
  </g>
  <g class="bouquet-rose bouquet-rose--5" style="--bloom-delay: 0.6s">
    <circle cx="168" cy="128" r="20" fill="url(#roseWine)"/>
    <path d="M168 108 Q177 115 174 125 Q168 120 162 125 Q159 115 168 108" fill="#d4737a" opacity="0.5"/>
  </g>
  <g class="bouquet-rose bouquet-rose--6" style="--bloom-delay: 0.75s">
    <circle cx="150" cy="105" r="16" fill="url(#roseDeep)"/>
  </g>
  <g class="bouquet-rose bouquet-rose--7" style="--bloom-delay: 0.9s">
    <circle cx="128" cy="148" r="14" fill="url(#roseGold)"/>
  </g>

  <!-- Ribbon bow -->
  <g class="bouquet-ribbon">
    <path d="M150 330 C130 310 110 320 115 340 C120 355 135 345 150 350 C165 345 180 355 185 340 C190 320 170 310 150 330" fill="url(#ribbonGrad)"/>
    <circle cx="150" cy="340" r="8" fill="#c9a227"/>
    <path d="M115 340 C105 350 95 345 100 360" stroke="#c9a227" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M185 340 C195 350 205 345 200 360" stroke="#c9a227" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}

function getAudioContext() {
  if (!giftAudioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) giftAudioCtx = new Ctx();
  }
  if (giftAudioCtx?.state === "suspended") giftAudioCtx.resume();
  return giftAudioCtx;
}

function playSyntheticPop(delayMs = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delayMs / 1000;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(180 + Math.random() * 120, start);
  osc.frequency.exponentialRampToValueAtTime(40, start + 0.15);
  gain.gain.setValueAtTime(0.25, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + 0.25);
}

function playSyntheticChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99];
  notes.forEach((freq, i) => {
    const start = ctx.currentTime + i * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.55);
  });
}

function tryPlayMp3(src, volume = 0.5) {
  if (!src) return Promise.resolve(false);
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.addEventListener("error", () => resolve(false), { once: true });
    audio.play().then(() => resolve(true)).catch(() => resolve(false));
  });
}

function playGiftSounds() {
  if (prefersReducedMotion()) return;

  const { cheerSound, fireworkSound } = SITE_CONFIG.giftReveal;

  tryPlayMp3(cheerSound, 0.45);
  tryPlayMp3(fireworkSound, 0.35);

  playSyntheticChime();
  for (let i = 0; i < 5; i++) {
    playSyntheticPop(200 + i * 350);
  }
}

function closeGiftReveal(overlay) {
  if (overlay._canvas) stopContinuousFireworks(overlay._canvas);
  if (typeof overlay._onClose === "function") overlay._onClose();
  overlay.remove();
  document.body.classList.remove("gift-reveal-open");
  document.removeEventListener("keydown", overlay._onKey);
}

function showGiftModal(message, closeLabel, canvas, onClose) {
  const overlay = document.createElement("div");
  overlay.className = "gift-reveal";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Birthday gift reveal");

  overlay.innerHTML = `
    <div class="gift-reveal__backdrop"></div>
    <div class="gift-reveal__content">
      <div class="gift-reveal__bouquet">${bouquetSvg()}</div>
      <p class="gift-reveal__message">${message}</p>
      <button type="button" class="btn gift-reveal__close">${closeLabel}</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("gift-reveal-open");
  overlay._canvas = canvas || null;
  overlay._onClose = onClose;

  const closeBtn = overlay.querySelector(".gift-reveal__close");
  closeBtn.focus();

  closeBtn.addEventListener("click", () => closeGiftReveal(overlay));

  overlay._onKey = (e) => {
    if (e.key === "Escape") closeGiftReveal(overlay);
  };
  document.addEventListener("keydown", overlay._onKey);
}

function openGiftExperience({ box, btn, messageEl, canvas }) {
  if (!box || !btn) return;

  box.classList.add("gift-box--open");
  btn.hidden = true;
  if (messageEl) messageEl.hidden = true;

  const { hiddenMessage, closeLabel } = SITE_CONFIG.giftReveal;
  const reduced = prefersReducedMotion();

  setTimeout(() => {
    showGiftModal(hiddenMessage, closeLabel || "Continue celebrating", canvas, () => {
      box.classList.remove("gift-box--open");
      btn.hidden = false;
      if (messageEl) messageEl.hidden = true;
    });

    if (!reduced && canvas) {
      startContinuousFireworks(canvas);
    }

    playGiftSounds();
  }, 400);
}