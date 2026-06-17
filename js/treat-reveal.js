let treatAudioCtx = null;

const DEFAULT_ACCENTS = {
  cake: "Enjoy!",
  chocolate: "Sweet!",
  gift: "Surprise!",
  balloon: "Float on!",
};

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getTreatAudioContext() {
  if (!treatAudioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) treatAudioCtx = new Ctx();
  }
  if (treatAudioCtx?.state === "suspended") treatAudioCtx.resume();
  return treatAudioCtx;
}

function playTone(freq, duration, type = "sine", volume = 0.15, delay = 0) {
  const ctx = getTreatAudioContext();
  if (!ctx) return;

  const start = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function playTreatSound(type) {
  if (prefersReducedMotion()) return;

  switch (type) {
    case "cake":
      playTone(523.25, 0.4, "triangle", 0.12);
      playTone(659.25, 0.4, "triangle", 0.1, 0.1);
      playTone(783.99, 0.5, "triangle", 0.08, 0.2);
      break;
    case "chocolate":
      playTone(80, 0.15, "sine", 0.2);
      playTone(880, 0.25, "sine", 0.08, 0.12);
      break;
    case "gift":
      playTone(120 + Math.random() * 80, 0.2, "sine", 0.18);
      playTone(60, 0.25, "sine", 0.12, 0.05);
      break;
    case "balloon":
      playTone(200 + Math.random() * 100, 0.12, "sine", 0.15);
      break;
    default:
      playTone(440, 0.2, "sine", 0.1);
  }
}

function cakeVisualSvg() {
  return `
<svg class="treat-visual treat-visual--cake" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="100" cy="195" rx="70" ry="12" fill="rgba(0,0,0,0.12)"/>
  <rect x="45" y="140" width="110" height="45" rx="6" fill="#c45c3e"/>
  <rect x="55" y="105" width="90" height="38" rx="5" fill="#e8d48b"/>
  <rect x="65" y="75" width="70" height="32" rx="4" fill="#c9a227"/>
  <rect x="50" y="148" width="100" height="6" rx="2" fill="#faf7f2" opacity="0.5"/>
  <rect x="60" y="112" width="80" height="5" rx="2" fill="#faf7f2" opacity="0.4"/>
  <line x1="100" y1="75" x2="100" y2="52" stroke="#c9a227" stroke-width="3"/>
  <ellipse class="treat-candle-flame" cx="100" cy="46" rx="6" ry="10" fill="#ff9f43"/>
  <ellipse cx="100" cy="50" rx="3" ry="5" fill="#ffd93d"/>
</svg>`;
}

function chocolateVisualSvg() {
  return `
<svg class="treat-visual treat-visual--chocolate treat-visual--chocolate-open" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="treat-chocolate-left">
    <rect x="30" y="60" width="65" height="90" rx="6" fill="#6b2d3c"/>
    <line x1="30" y1="85" x2="95" y2="85" stroke="#4a1f28" stroke-width="1"/>
    <line x1="30" y1="110" x2="95" y2="110" stroke="#4a1f28" stroke-width="1"/>
    <line x1="62" y1="60" x2="62" y2="150" stroke="#4a1f28" stroke-width="1"/>
  </g>
  <g class="treat-chocolate-right">
    <rect x="105" y="60" width="65" height="90" rx="6" fill="#6b2d3c"/>
    <line x1="105" y1="85" x2="170" y2="85" stroke="#4a1f28" stroke-width="1"/>
    <line x1="105" y1="110" x2="170" y2="110" stroke="#4a1f28" stroke-width="1"/>
    <line x1="137" y1="60" x2="137" y2="150" stroke="#4a1f28" stroke-width="1"/>
  </g>
  <circle class="treat-truffle" cx="100" cy="105" r="22" fill="#c9a227"/>
  <circle cx="94" cy="99" r="6" fill="#e8d48b" opacity="0.5"/>
  <path d="M100 83 Q108 88 100 93 Q92 88 100 83" fill="#8b6914" opacity="0.4"/>
</svg>`;
}

function giftVisualSvg() {
  return `
<div class="treat-mini-gift treat-mini-gift--open" aria-hidden="true">
  <div class="treat-mini-gift__lid"></div>
  <div class="treat-mini-gift__ribbon-v"></div>
  <div class="treat-mini-gift__ribbon-h"></div>
  <div class="treat-mini-gift__body"></div>
  <span class="treat-mini-gift__sparkle">&#10022;</span>
</div>`;
}

function balloonVisualSvg() {
  return `
<svg class="treat-visual treat-visual--balloon" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="treat-float-balloon" style="--float-delay: 0s">
    <ellipse cx="55" cy="120" rx="22" ry="28" fill="#c45c3e"/>
    <path d="M55 148 Q53 158 55 165 Q57 158 55 148" fill="#c45c3e"/>
    <line x1="55" y1="165" x2="55" y2="190" stroke="#c45c3e" stroke-width="1"/>
  </g>
  <g class="treat-float-balloon" style="--float-delay: 0.2s">
    <ellipse cx="100" cy="90" rx="26" ry="32" fill="#c9a227"/>
    <path d="M100 122 Q98 134 100 142 Q102 134 100 122" fill="#c9a227"/>
    <line x1="100" y1="142" x2="100" y2="175" stroke="#c9a227" stroke-width="1"/>
  </g>
  <g class="treat-float-balloon" style="--float-delay: 0.4s">
    <ellipse cx="145" cy="115" rx="20" ry="26" fill="#5c6b4a"/>
    <path d="M145 141 Q143 150 145 157 Q147 150 145 141" fill="#5c6b4a"/>
    <line x1="145" y1="157" x2="145" y2="185" stroke="#5c6b4a" stroke-width="1"/>
  </g>
  <g class="treat-float-balloon" style="--float-delay: 0.15s">
    <ellipse cx="125" cy="145" rx="16" ry="20" fill="#6b2d3c"/>
    <path d="M125 165 Q123 172 125 178 Q127 172 125 165" fill="#6b2d3c"/>
  </g>
</svg>`;
}

function visualForType(type) {
  switch (type) {
    case "cake": return cakeVisualSvg();
    case "chocolate": return chocolateVisualSvg();
    case "gift": return giftVisualSvg();
    case "balloon": return balloonVisualSvg();
    default: return giftVisualSvg();
  }
}

function triggerEffects(type, canvas) {
  if (!canvas || prefersReducedMotion()) return;

  switch (type) {
    case "gift":
      fireFireworks(canvas, 2500);
      fireConfetti(canvas, 80);
      break;
    case "cake":
    case "balloon":
      fireConfetti(canvas, 80);
      break;
    case "chocolate":
      fireConfetti(canvas, 70);
      break;
    default:
      fireConfetti(canvas, 60);
  }
}

function closeTreatReveal(overlay) {
  overlay.remove();
  document.body.classList.remove("treat-reveal-open");
  document.removeEventListener("keydown", overlay._onKey);
}

const VOUCHER_SESSION_KEY = "voucher-unlocked-chocolate";

function getAuthLabel(v) {
  return v.authLabel || v.mobileLabel || "Enter your answer";
}

function getAuthPlaceholder(v) {
  return v.authPlaceholder || v.mobilePlaceholder || "";
}

function matchesAuthValue(input, expected) {
  if (!expected || !String(expected).trim()) return false;
  return input.trim() === String(expected).trim();
}

function crackerVisualHtml() {
  return `
<div class="voucher-cracker voucher-cracker--burst" aria-hidden="true">
  <div class="voucher-cracker__spark"></div>
  <div class="voucher-cracker__half voucher-cracker__half--left">
    <span class="voucher-cracker__body"></span>
    <span class="voucher-cracker__frill"></span>
  </div>
  <div class="voucher-cracker__half voucher-cracker__half--right">
    <span class="voucher-cracker__body"></span>
    <span class="voucher-cracker__frill"></span>
  </div>
</div>`;
}

function bindTreatOverlayClose(overlay) {
  overlay.querySelectorAll(".treat-reveal__close").forEach((btn) => {
    btn.addEventListener("click", () => closeTreatReveal(overlay));
  });
  const focusTarget = overlay.querySelector(".treat-reveal__close:not([hidden])")
    || overlay.querySelector(".treat-reveal__close");
  focusTarget?.focus();
  overlay.querySelector("[data-close]")?.addEventListener("click", () => closeTreatReveal(overlay));
  overlay._onKey = (e) => {
    if (e.key === "Escape") closeTreatReveal(overlay);
  };
  document.addEventListener("keydown", overlay._onKey);
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function triggerVoucherEffects(canvas) {
  if (!canvas || prefersReducedMotion()) return;
  fireFireworks(canvas, 3500);
  fireConfetti(canvas, 120);
  playTreatSound("gift");
}

function getChocolateCode(v) {
  return v.chocolateCode || v.code || "";
}

function buildVoucherSweetStepsHtml(steps) {
  return (steps || [])
    .map((step, i) => {
      const label =
        typeof step === "object" && step?.label
          ? step.label
          : `Step ${i + 1}`;
      const text = typeof step === "object" && step?.text ? step.text : String(step);
      return `
        <div class="voucher-sweet-step" style="--step-i: ${i}">
          <span class="voucher-sweet-step__badge">${escapeHtml(label)}</span>
          <p class="voucher-sweet-step__text">${escapeHtml(text)}</p>
        </div>`;
    })
    .join("");
}

function renderVoucherRevealPanel(contentEl, item, v, closeLabel, reduced) {
  const surpriseCode = getChocolateCode(v);
  const revealMessage = v.revealMessage || "";
  const stepsHtml = buildVoucherSweetStepsHtml(v.redeemSteps);

  contentEl.innerHTML = `
    <div class="voucher-reveal__stage">
      ${reduced ? "" : crackerVisualHtml()}
      <p class="treat-reveal__accent">${escapeHtml(item.accent || "Sweet!")}</p>
      <h3 class="treat-reveal__title" id="treat-reveal-title">${escapeHtml(v.revealTitle || "Take your healthy-sweets steps!")}</h3>
      ${revealMessage ? `<p class="voucher-reveal__message">${escapeHtml(revealMessage)}</p>` : ""}
      <div class="voucher-code-row">
        <code class="voucher-code" id="voucher-code-value">${escapeHtml(surpriseCode)}</code>
        <button type="button" class="btn btn--secondary voucher-copy" data-copy-label="${escapeHtml(v.copyLabel || "Copy gift card code")}">${escapeHtml(v.copyLabel || "Copy gift card code")}</button>
      </div>
      <div class="voucher-redeem">
        <h4 class="voucher-redeem__title">${escapeHtml(v.redeemTitle || "Your sweet redemption path")}</h4>
        <div class="voucher-sweet-steps">${stepsHtml}</div>
        <p class="voucher-redeem__help">${escapeHtml(v.redeemHelp || "")}</p>
      </div>
      <button type="button" class="btn treat-reveal__close">${escapeHtml(closeLabel)}</button>
    </div>
  `;

  const copyBtn = contentEl.querySelector(".voucher-copy");
  const codeEl = contentEl.querySelector("#voucher-code-value");
  if (copyBtn && codeEl && surpriseCode) {
    const defaultLabel = v.copyLabel || "Copy gift card code";
    const copiedLabel = v.copiedLabel || "Copied!";
    copyBtn.addEventListener("click", () => {
      copyToClipboard(surpriseCode).then(() => {
        copyBtn.textContent = copiedLabel;
        setTimeout(() => {
          copyBtn.textContent = defaultLabel;
        }, 2000);
      }).catch(() => {
        copyBtn.textContent = "Select & copy";
      });
    });
  }
}

function showVoucherAuthStep(contentEl, item, v, closeLabel, canvas, overlay) {
  const intro = v.intro || item.message || "";
  const authLabel = getAuthLabel(v);
  const authPlaceholder = getAuthPlaceholder(v);
  const authError = v.authError || "Reviewer #2 rejected that — minor revision required. Try again!";
  const authValue = v.authValue ?? "";

  contentEl.innerHTML = `
    <div class="voucher-auth">
      <div class="treat-reveal__visual">${chocolateVisualSvg()}</div>
      <p class="treat-reveal__accent">${escapeHtml(item.accent || "Sweet!")}</p>
      <h3 class="treat-reveal__title" id="treat-reveal-title">${escapeHtml(item.label)}</h3>
      <p class="treat-reveal__message">${escapeHtml(intro)}</p>
      <form class="voucher-form" novalidate>
        <label class="voucher-form__label" for="voucher-auth-input">${escapeHtml(authLabel)}</label>
        <input
          class="voucher-form__input"
          id="voucher-auth-input"
          type="text"
          autocomplete="off"
          placeholder="${escapeHtml(authPlaceholder)}"
          required
        />
        <p class="voucher-form__error" id="voucher-auth-error" hidden>${escapeHtml(authError)}</p>
        <button type="submit" class="btn voucher-form__submit" disabled>${escapeHtml(v.verifyButton || "Verify & unlock")}</button>
      </form>
      <button type="button" class="btn btn--ghost treat-reveal__close">${escapeHtml(closeLabel)}</button>
    </div>
  `;

  bindTreatOverlayClose(overlay);

  const form = contentEl.querySelector(".voucher-form");
  const authInput = contentEl.querySelector("#voucher-auth-input");
  const submitBtn = contentEl.querySelector(".voucher-form__submit");
  const errorEl = contentEl.querySelector("#voucher-auth-error");
  const reduced = prefersReducedMotion();

  function updateAuthState() {
    submitBtn.disabled = !authInput.value.trim();
  }

  authInput.addEventListener("input", updateAuthState);
  authInput.focus();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!matchesAuthValue(authInput.value, authValue)) {
      errorEl.hidden = false;
      return;
    }

    errorEl.hidden = true;
    form.innerHTML = `
      <div class="voucher-form__spinner" role="status" aria-live="polite">
        <span class="voucher-form__spinner-icon" aria-hidden="true"></span>
        <span>${escapeHtml(v.verifyingText || "Running peer review on your digits… hold tight!")}</span>
      </div>
    `;

    const delay = reduced ? 0 : (v.verifyDelayMs ?? 1800);
    setTimeout(() => {
      try {
        sessionStorage.setItem(VOUCHER_SESSION_KEY, "1");
      } catch (_) { /* ignore */ }
      showVoucherRevealStep(contentEl, item, v, closeLabel, canvas, overlay);
    }, delay);
  });
}

function showVoucherRevealStep(contentEl, item, v, closeLabel, canvas, overlay) {
  const reduced = prefersReducedMotion();
  contentEl.innerHTML = "";
  renderVoucherRevealPanel(contentEl, item, v, closeLabel, reduced);
  bindTreatOverlayClose(overlay);
  triggerVoucherEffects(canvas);
}

function openVoucherReveal(item, canvas, triggerBtn) {
  if (triggerBtn) triggerBtn.classList.add("treat--opened");

  const v = item.voucher;
  const closeLabel = SITE_CONFIG.treatReveal?.closeLabel || "Got it!";
  const reduced = prefersReducedMotion();

  const overlay = document.createElement("div");
  overlay.className = "treat-reveal treat-reveal--chocolate treat-reveal--voucher";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "treat-reveal-title");

  overlay.innerHTML = `
    <div class="treat-reveal__backdrop" data-close></div>
    <div class="treat-reveal__content treat-reveal__content--voucher"></div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("treat-reveal-open");

  const contentEl = overlay.querySelector(".treat-reveal__content");

  let alreadyUnlocked = false;
  try {
    alreadyUnlocked = sessionStorage.getItem(VOUCHER_SESSION_KEY) === "1";
  } catch (_) { /* ignore */ }

  if (alreadyUnlocked) {
    showVoucherRevealStep(contentEl, item, v, closeLabel, canvas, overlay);
  } else {
    showVoucherAuthStep(contentEl, item, v, closeLabel, canvas, overlay);
    if (!reduced) playTreatSound("chocolate");
  }
}

function openGiftPuzzleReveal(item, canvas, triggerBtn) {
  if (triggerBtn) triggerBtn.classList.add("treat--opened");

  const p = item.puzzles;
  const closeLabel = SITE_CONFIG.treatReveal?.closeLabel || "Got it!";
  const reduced = prefersReducedMotion();
  const items = p.items || [];
  let currentIndex = 0;
  let lastMessage = "";
  let puzzleInstance = null;

  const overlay = document.createElement("div");
  overlay.className = "treat-reveal treat-reveal--gift treat-reveal--puzzle";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "treat-reveal-title");

  overlay.innerHTML = `
    <div class="treat-reveal__backdrop" data-close></div>
    <div class="treat-reveal__content treat-reveal__content--puzzle">
      <p class="treat-reveal__accent">${escapeHtml(item.accent || "Surprise!")}</p>
      <h3 class="treat-reveal__title" id="treat-reveal-title">${escapeHtml(item.label)}</h3>
      <p class="treat-reveal__message puzzle-intro">${escapeHtml(p.intro || item.message || "")}</p>
      <p class="puzzle-progress" id="puzzle-progress"></p>
      <div class="puzzle-stage" id="puzzle-stage"></div>
      <div class="puzzle-between" id="puzzle-between" hidden>
        <p class="puzzle-celebration-msg" id="puzzle-celebration-msg"></p>
        <button type="button" class="btn" id="puzzle-next-btn">${escapeHtml(p.nextPuzzleLabel || "Next surprise")}</button>
      </div>
      <div class="puzzle-finale" id="puzzle-finale" hidden>
        <p class="puzzle-finale__message" id="puzzle-finale-message"></p>
      </div>
      <button type="button" class="btn btn--ghost treat-reveal__close puzzle-skip-close">${escapeHtml(closeLabel)}</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("treat-reveal-open");

  const stageEl = overlay.querySelector("#puzzle-stage");
  const progressEl = overlay.querySelector("#puzzle-progress");
  const betweenEl = overlay.querySelector("#puzzle-between");
  const celebrationEl = overlay.querySelector("#puzzle-celebration-msg");
  const nextBtn = overlay.querySelector("#puzzle-next-btn");
  const accentEl = overlay.querySelector(".treat-reveal__accent");
  const titleEl = overlay.querySelector("#treat-reveal-title");
  const finaleEl = overlay.querySelector("#puzzle-finale");
  const finaleMessageEl = overlay.querySelector("#puzzle-finale-message");
  const introEl = overlay.querySelector(".puzzle-intro");
  const skipClose = overlay.querySelector(".puzzle-skip-close");

  function showPuzzleChrome() {
    accentEl.hidden = false;
    titleEl.hidden = false;
    introEl.hidden = false;
    progressEl.hidden = false;
    finaleEl.hidden = true;
    skipClose.hidden = false;
    skipClose.classList.add("btn--ghost");
  }

  function pickCelebrationMessage() {
    const pool = p.celebrationMessages || [];
    if (!pool.length) return "Happy birthday!";
    const choices = pool.length > 1 ? pool.filter((m) => m !== lastMessage) : pool;
    const msg = choices[Math.floor(Math.random() * choices.length)];
    lastMessage = msg;
    return msg;
  }

  function updateProgress() {
    progressEl.textContent = `Puzzle ${currentIndex + 1} of ${items.length}`;
  }

  function showFinaleCelebration() {
    accentEl.hidden = true;
    titleEl.hidden = true;
    introEl.hidden = true;
    progressEl.hidden = true;
    stageEl.hidden = true;
    betweenEl.hidden = true;
    finaleEl.hidden = false;
    skipClose.hidden = false;
    skipClose.classList.remove("btn--ghost");

    const fin = p.finaleCelebration || {};
    finaleMessageEl.textContent =
      fin.message ||
      "Here's to everything ahead — success, joy, and a future as bright as you are.";

    if (!reduced) {
      fireFireworks(canvas, 4000);
      fireConfetti(canvas, 150);
      playTreatSound("gift");
    }
    skipClose.focus();
  }

  function loadPuzzle(index) {
    puzzleInstance?.destroy();
    showPuzzleChrome();
    betweenEl.hidden = true;
    stageEl.hidden = false;
    updateProgress();

    const puzzleItem = items[index];
    puzzleInstance = createPhotoPuzzle(stageEl, {
      image: puzzleItem.image,
      alt: puzzleItem.alt || `Puzzle ${index + 1}`,
      gridSize: p.gridSize || 2,
      onSolved: () => {
        if (index >= items.length - 1) {
          showFinaleCelebration();
          return;
        }
        if (!reduced) fireConfetti(canvas, 60);
        stageEl.hidden = true;
        betweenEl.hidden = false;
        celebrationEl.textContent = pickCelebrationMessage();
        nextBtn.textContent = p.nextPuzzleLabel || "Next surprise";
        nextBtn.focus();
      },
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex += 1;
    loadPuzzle(currentIndex);
  });

  bindTreatOverlayClose(overlay);

  loadPuzzle(currentIndex);
  if (!reduced) playTreatSound("gift");
}

function openTreatReveal(item, canvas, triggerBtn) {
  if (item.voucher) {
    openVoucherReveal(item, canvas, triggerBtn);
    return;
  }

  if (item.puzzles?.items?.length) {
    openGiftPuzzleReveal(item, canvas, triggerBtn);
    return;
  }

  if (triggerBtn) triggerBtn.classList.add("treat--opened");

  const type = item.type || "gift";
  const accent = item.accent || DEFAULT_ACCENTS[type] || "Enjoy!";
  const closeLabel = SITE_CONFIG.treatReveal?.closeLabel || "Got it!";
  const reduced = prefersReducedMotion();

  const overlay = document.createElement("div");
  overlay.className = `treat-reveal treat-reveal--${type}`;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "treat-reveal-title");

  overlay.innerHTML = `
    <div class="treat-reveal__backdrop" data-close></div>
    <div class="treat-reveal__content">
      <div class="treat-reveal__visual">${visualForType(type)}</div>
      <p class="treat-reveal__accent">${escapeHtml(accent)}</p>
      <h3 class="treat-reveal__title" id="treat-reveal-title">${escapeHtml(item.label)}</h3>
      <p class="treat-reveal__message">${escapeHtml(item.message)}</p>
      <button type="button" class="btn treat-reveal__close">${escapeHtml(closeLabel)}</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("treat-reveal-open");

  const closeBtn = overlay.querySelector(".treat-reveal__close");
  closeBtn.focus();

  closeBtn.addEventListener("click", () => closeTreatReveal(overlay));
  overlay.querySelector("[data-close]").addEventListener("click", () => closeTreatReveal(overlay));

  overlay._onKey = (e) => {
    if (e.key === "Escape") closeTreatReveal(overlay);
  };
  document.addEventListener("keydown", overlay._onKey);

  if (!reduced) {
    triggerEffects(type, canvas);
    playTreatSound(type);
  }
}