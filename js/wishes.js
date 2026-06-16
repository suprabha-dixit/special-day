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

function renderJokes() {
  const grid = document.getElementById("jokes-grid");
  if (!grid) return;

  SITE_CONFIG.phdJokes.forEach((joke, i) => {
    const card = document.createElement("article");
    card.className = "joke-card reveal";
    card.style.setProperty("--stagger", i);
    card.innerHTML = `
      <h3 class="joke-card__title">${joke.title}</h3>
      <p class="joke-card__text">${joke.text}</p>
    `;
    grid.appendChild(card);
  });
}

function init() {
  initShared();
  renderPhdSection();
  renderWishes();
  renderJokes();
  observeReveals(document.getElementById("wishes-grid"));
  observeReveals(document.getElementById("jokes-grid"));
}

init();