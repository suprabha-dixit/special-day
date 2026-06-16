const TREAT_SVG = {
  cake: `<svg viewBox="0 0 64 64" class="treat__svg"><rect x="12" y="28" width="40" height="24" rx="4" fill="#c45c3e"/><rect x="10" y="22" width="44" height="10" rx="3" fill="#e8d48b"/><circle cx="32" cy="18" r="4" fill="#c9a227"/><line x1="32" y1="14" x2="32" y2="8" stroke="#c9a227" stroke-width="2"/></svg>`,
  chocolate: `<svg viewBox="0 0 64 64" class="treat__svg"><rect x="14" y="18" width="36" height="28" rx="4" fill="#6b2d3c"/><line x1="14" y1="28" x2="50" y2="28" stroke="#4a1f28" stroke-width="1.5"/><line x1="14" y1="36" x2="50" y2="36" stroke="#4a1f28" stroke-width="1.5"/><line x1="32" y1="18" x2="32" y2="46" stroke="#4a1f28" stroke-width="1.5"/></svg>`,
  gift: `<svg viewBox="0 0 64 64" class="treat__svg"><rect x="14" y="28" width="36" height="26" rx="2" fill="#c9a227"/><rect x="12" y="22" width="40" height="8" rx="2" fill="#c45c3e"/><line x1="32" y1="22" x2="32" y2="54" stroke="#e8d48b" stroke-width="3"/><path d="M32 22 C28 14 20 14 20 20 C20 26 32 22 32 22 C32 22 44 26 44 20 C44 14 36 14 32 22" fill="none" stroke="#5c6b4a" stroke-width="2"/></svg>`,
  balloon: `<svg viewBox="0 0 64 64" class="treat__svg"><ellipse cx="32" cy="26" rx="18" ry="22" fill="#5c6b4a" opacity="0.9"/><path d="M32 48 Q30 54 32 58 Q34 54 32 48" fill="#5c6b4a"/><line x1="32" y1="58" x2="32" y2="62" stroke="#5c6b4a" stroke-width="1.5"/></svg>`,
};

function renderTreats() {
  const grid = document.getElementById("treats-grid");
  if (!grid) return;

  SITE_CONFIG.funSurprises.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "treat reveal";
    btn.style.setProperty("--stagger", i);
    btn.setAttribute("aria-label", item.label);
    btn.innerHTML = `
      ${TREAT_SVG[item.type] || TREAT_SVG.gift}
      <span class="treat__label">${item.label}</span>
    `;
    btn.addEventListener("click", () => {
      btn.classList.add("treat--pop");
      showToast(item.message);
      fireConfetti(document.getElementById("confetti-canvas"), 60);
      setTimeout(() => btn.classList.remove("treat--pop"), 500);
    });
    grid.appendChild(btn);
  });

  observeReveals(grid);
}

function init() {
  initShared();
  createBalloons(document.getElementById("balloon-field"), 6);
  renderTreats();
  window.addEventListener("resize", () => resizeCanvas(document.getElementById("confetti-canvas")));
  resizeCanvas(document.getElementById("confetti-canvas"));
}

init();