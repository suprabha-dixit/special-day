const $ = (sel) => document.querySelector(sel);

let confettiFired = false;

function formatBirthdayDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: SITE_CONFIG.timezone || undefined,
  }).format(date);
}

function updateCountdown() {
  const countdownEl = $("#countdown");
  const messageEl = $("#countdown-message");
  const dateEl = $("#countdown-date");
  const headingEl = $("#countdown-heading");
  const target = parseBirthday();

  if (!target) {
    countdownEl.classList.add("countdown--error");
    $("#days").textContent = "!";
    $("#hours").textContent = "!";
    $("#minutes").textContent = "!";
    $("#seconds").textContent = "!";
    dateEl.textContent = "Set your date in js/config.js";
    messageEl.hidden = false;
    messageEl.textContent = "Configure birthdayISO to start the countdown.";
    return;
  }

  dateEl.textContent = formatBirthdayDate(target);
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    countdownEl.classList.add("countdown--finished");
    if (headingEl) headingEl.textContent = "The big day is here!";
    $("#days").textContent = "0";
    $("#hours").textContent = "0";
    $("#minutes").textContent = "0";
    $("#seconds").textContent = "0";
    messageEl.hidden = false;
    messageEl.textContent = "It's the day! Tanti Auguri!";
    if (!confettiFired) {
      confettiFired = true;
      fireConfetti($("#confetti-canvas"), 150);
    }
    return;
  }

  const seconds = Math.floor(diff / 1000);
  $("#days").textContent = String(Math.floor(seconds / 86400));
  $("#hours").textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
  $("#minutes").textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  $("#seconds").textContent = String(seconds % 60).padStart(2, "0");
}

function initGiftReveal() {
  const btn = $("#gift-btn");
  const box = $("#gift-box");
  const message = $("#gift-message");
  if (!btn || !box) return;

  btn.addEventListener("click", () => {
    openGiftExperience({
      box,
      btn,
      messageEl: message,
      canvas: $("#confetti-canvas"),
    });
  });
}

function initQuickNav() {
  const grid = $("#quick-nav");
  if (!grid) return;

  const cards = [
    {
      href: "gallery.html",
      title: "Memories",
      desc: `${SITE_CONFIG.recipientName}'s photo album — snapshots and moments picked for you`,
      accent: "Photos",
    },
    { href: "wishes.html", title: "Wishes", desc: "Cheers & birthday messages", accent: "Cheers" },
    { href: "fun.html", title: "Treats", desc: "Cakes, chocolates & surprises", accent: "Treats" },
  ];

  cards.forEach((card, i) => {
    const el = document.createElement("a");
    el.href = card.href;
    el.className = "quick-card reveal";
    el.style.setProperty("--stagger", i);
    el.innerHTML = `
      <span class="quick-card__accent">${card.accent}</span>
      <span class="quick-card__title">${card.title}</span>
      <span class="quick-card__desc">${card.desc}</span>
    `;
    grid.appendChild(el);
  });

  observeReveals(grid);
}

function fireWelcomeConfetti() {
  if (prefersReducedMotion()) return;
  try {
    if (sessionStorage.getItem("home-welcome-confetti") === "1") return;
    sessionStorage.setItem("home-welcome-confetti", "1");
  } catch (_) { /* ignore */ }

  const canvas = $("#confetti-canvas");
  if (!canvas) return;
  setTimeout(() => fireConfetti(canvas, 80), 400);
}

function init() {
  initShared();
  if (document.body.classList.contains("birthday-gate--active")) return;

  createFestiveBackground($("#festive-field"));
  fireWelcomeConfetti();
  initQuickNav();
  initGiftReveal();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  window.addEventListener("resize", () => resizeCanvas($("#confetti-canvas")));
  resizeCanvas($("#confetti-canvas"));
}

init();