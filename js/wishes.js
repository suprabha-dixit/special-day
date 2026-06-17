function renderWishes() {
  const grid = document.getElementById("wishes-grid");
  if (!grid) return;

  SITE_CONFIG.wishes.forEach((wish, i) => {
    const card = document.createElement("article");
    card.className = "wish-card reveal";
    card.style.setProperty("--stagger", i);
    card.innerHTML = `
      <p class="wish-card__accent">${wish.accent}</p>
      <p class="wish-card__text">${wish.text}</p>
    `;
    grid.appendChild(card);
  });
}

function renderPhdSection() {
  const tribute = document.getElementById("phd-tribute");
  if (tribute) tribute.textContent = SITE_CONFIG.phdTribute;

  const list = document.getElementById("phd-wishes");
  if (!list) return;
  list.innerHTML = "";
  SITE_CONFIG.phdWishes.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
}

function init() {
  initShared();
  if (document.body.classList.contains("birthday-gate--active")) return;

  const balloonField = document.getElementById("wish-balloon-field");
  const canvas = document.getElementById("confetti-canvas");
  const balloonConfig = SITE_CONFIG.wishBalloons;

  if (balloonField && balloonConfig?.enabled !== false) {
    createInteractiveWishBalloons(balloonField, {
      phrases: balloonConfig?.popPhrases,
      canvas,
    });
  }

  renderPhdSection();
  renderWishes();
  observeReveals(document.getElementById("wishes-grid"));

  if (canvas) {
    window.addEventListener("resize", () => resizeCanvas(canvas));
    resizeCanvas(canvas);
  }
}

init();