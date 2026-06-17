const $ = (sel) => document.querySelector(sel);

function galleryLabel(photo) {
  return photo.caption || photo.phrase || photo.alt || "Photo";
}

function renderGallery() {
  const grid = $("#gallery-grid");
  const empty = $("#gallery-empty");
  if (!grid) return;

  if (!SITE_CONFIG.gallery?.length) {
    if (empty) empty.hidden = false;
    return;
  }

  SITE_CONFIG.gallery.forEach((photo, i) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item reveal";
    item.style.setProperty("--stagger", i);
    item.setAttribute("aria-label", `View photo: ${galleryLabel(photo)}`);

    const captionHtml = photo.caption
      ? `<span class="gallery-item__caption">${photo.caption}</span>`
      : "";

    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy" class="gallery-item__img">
      ${captionHtml}
      <span class="gallery-item__fallback" hidden>Missing: ${photo.src.split("/").pop()}</span>
    `;

    const img = item.querySelector(".gallery-item__img");
    const fallback = item.querySelector(".gallery-item__fallback");
    img.addEventListener("error", () => {
      img.hidden = true;
      if (fallback) fallback.hidden = false;
      item.classList.add("gallery-item--missing");
    });

    item.addEventListener("click", () => openLightbox(photo, i));
    grid.appendChild(item);
  });

  if (empty) empty.hidden = true;
  observeReveals(grid);
}

function openLightbox(photo, index) {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", galleryLabel(photo));

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "lightbox__close";
  closeBtn.setAttribute("aria-label", "Close photo");
  closeBtn.innerHTML = "&times;";

  const img = document.createElement("img");
  img.className = "lightbox__img";

  const phrase = document.createElement("p");
  phrase.className = "lightbox__phrase";
  phrase.hidden = true;

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "lightbox__nav lightbox__nav--prev";
  prev.setAttribute("aria-label", "Previous photo");
  prev.innerHTML = "&#8249;";

  const next = document.createElement("button");
  next.type = "button";
  next.className = "lightbox__nav lightbox__nav--next";
  next.setAttribute("aria-label", "Next photo");
  next.innerHTML = "&#8250;";

  overlay.append(closeBtn, prev, img, phrase, next);
  document.body.appendChild(overlay);
  document.body.classList.add("lightbox-open");
  closeBtn.focus();

  let current = index;

  function show(idx) {
    current = (idx + SITE_CONFIG.gallery.length) % SITE_CONFIG.gallery.length;
    const p = SITE_CONFIG.gallery[current];
    img.src = p.src;
    img.alt = p.alt;

    if (p.phrase) {
      phrase.textContent = p.phrase;
      phrase.hidden = false;
      overlay.classList.add("lightbox--with-phrase");
    } else {
      phrase.textContent = "";
      phrase.hidden = true;
      overlay.classList.remove("lightbox--with-phrase");
    }

    overlay.setAttribute("aria-label", galleryLabel(p));
  }

  function close() {
    overlay.remove();
    document.body.classList.remove("lightbox-open");
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  }

  show(index);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  prev.addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
  next.addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
  document.addEventListener("keydown", onKey);
}

function init() {
  initShared();
  if (document.body.classList.contains("birthday-gate--active")) return;
  renderGallery();
}

init();