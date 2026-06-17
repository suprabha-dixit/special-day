function hasTimezoneOffset(iso) {
  return /(?:Z|[+-]\d{2}:\d{2})$/i.test(iso.trim());
}

function parseBirthdayInTimezone(iso, timeZone) {
  const parts = iso.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!parts) return null;

  const target = {
    year: Number(parts[1]),
    month: Number(parts[2]),
    day: Number(parts[3]),
    hour: Number(parts[4] ?? 0),
    minute: Number(parts[5] ?? 0),
    second: Number(parts[6] ?? 0),
  };

  let utc = Date.UTC(
    target.year,
    target.month - 1,
    target.day,
    target.hour,
    target.minute,
    target.second
  );

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  for (let i = 0; i < 5; i++) {
    const read = Object.fromEntries(
      formatter
        .formatToParts(new Date(utc))
        .filter((p) => p.type !== "literal")
        .map((p) => [p.type, Number(p.value)])
    );

    const readHour = read.hour === 24 ? 0 : read.hour;
    const readMs = Date.UTC(read.year, read.month - 1, read.day, readHour, read.minute, read.second);
    const targetMs = Date.UTC(
      target.year,
      target.month - 1,
      target.day,
      target.hour,
      target.minute,
      target.second
    );
    const delta = targetMs - readMs;
    if (delta === 0) break;
    utc += delta;
  }

  const date = new Date(utc);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseBirthday() {
  const iso = SITE_CONFIG.birthdayISO;
  if (!iso) return null;

  if (hasTimezoneOffset(iso)) {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const timeZone = SITE_CONFIG.timezone || "Europe/Rome";
  return parseBirthdayInTimezone(iso, timeZone);
}

function isBirthdayUnlocked() {
  const target = parseBirthday();
  if (!target) return true;
  return Date.now() >= target.getTime();
}

function isEarlyCelebrationActive() {
  const ec = SITE_CONFIG.earlyCelebration;
  if (!ec?.enabled) return false;
  if (isBirthdayUnlocked()) return false;
  const indiaStart = new Date(ec.birthdayISO);
  if (Number.isNaN(indiaStart.getTime())) return false;
  return Date.now() >= indiaStart.getTime();
}

const NAV_ICONS = {
  home: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 16l-5.5-5.5L5 20"/></svg>`,
  message: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"/></svg>`,
};

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
}

function injectNav() {
  const page = currentPage();
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Main navigation");

  const links = SITE_CONFIG.nav
    .map(
      (item) => `
      <a href="${item.href}" class="site-nav__link${page === item.href ? " site-nav__link--active" : ""}" ${page === item.href ? 'aria-current="page"' : ""}>
        <span class="site-nav__icon">${NAV_ICONS[item.icon] || ""}</span>
        <span class="site-nav__label">${item.label}</span>
      </a>
    `
    )
    .join("");

  nav.innerHTML = links;
  document.body.appendChild(nav);
}

function injectFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="laurel-divider laurel-divider--bottom" aria-hidden="true">
      <svg viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12 Q50 24 100 12 T200 12 T300 12 T400 12" fill="none" stroke="currentColor" stroke-width="1"/>
        <circle cx="200" cy="12" r="4" fill="currentColor"/>
      </svg>
    </div>
    <p class="footer__text">Celebrating ${SITE_CONFIG.recipientName}.</p>
    <p class="footer__hint">Share this link when it goes live — spread the celebration.</p>
  `;

  const placeholder = document.getElementById("site-footer");
  if (placeholder) placeholder.replaceWith(footer);
  else document.body.appendChild(footer);
}

function applyRecipientName() {
  document.querySelectorAll("[data-recipient]").forEach((el) => {
    el.textContent = SITE_CONFIG.recipientName;
  });
  const nameEl = document.getElementById("recipient-name");
  if (nameEl) nameEl.textContent = SITE_CONFIG.recipientName;
  const subtitle = document.getElementById("hero-subtitle");
  if (subtitle) subtitle.textContent = SITE_CONFIG.heroSubtitle;
  const eyebrow = document.getElementById("hero-eyebrow");
  if (eyebrow) eyebrow.textContent = SITE_CONFIG.heroEyebrow;
}

let revealObserver = null;

function getRevealObserver() {
  if (revealObserver) return revealObserver;

  if (prefersReducedMotion()) return null;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  return revealObserver;
}

function observeReveals(root = document) {
  if (prefersReducedMotion()) {
    root.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = getRevealObserver();
  if (!observer) return;

  root.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
}

function initScrollReveal() {
  observeReveals();
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("toast--visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("toast--visible"), 4000);
}

function initShared() {
  document.body.classList.add("page-enter");

  if (typeof enforceBirthdayGate === "function" && enforceBirthdayGate()) {
    return;
  }

  injectNav();
  injectFooter();
  applyRecipientName();
  initMusic();
  initScrollReveal();
}