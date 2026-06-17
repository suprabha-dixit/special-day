function createPhotoPuzzle(container, options) {
  const {
    image,
    alt = "Puzzle photo",
    gridSize = 2,
    onSolved,
  } = options;

  const n = Math.min(2, Math.max(2, gridSize));
  const total = n * n;
  let imageReady = false;
  let imageUrl = image;
  let selectedId = null;
  let solved = false;
  let boardSlots = Array(total).fill(null);
  let tray = [];

  const root = document.createElement("div");
  root.className = "photo-puzzle";
  root.style.setProperty("--puzzle-n", n);

  const hint = document.createElement("p");
  hint.className = "photo-puzzle__hint";
  hint.textContent = "Tap a piece, then tap an empty slot";

  const board = document.createElement("div");
  board.className = "photo-puzzle__board";
  board.setAttribute("role", "group");
  board.setAttribute("aria-label", alt);

  const trayEl = document.createElement("div");
  trayEl.className = "photo-puzzle__tray";
  trayEl.setAttribute("aria-label", "Puzzle pieces");

  container.innerHTML = "";
  container.appendChild(root);
  root.appendChild(hint);
  root.appendChild(board);
  root.appendChild(trayEl);

  function pieceStyle(pieceId) {
    const row = Math.floor(pieceId / n);
    const col = pieceId % n;
    const pct = n > 1 ? 100 / (n - 1) : 0;
    return {
      backgroundImage: imageReady ? `url("${imageUrl}")` : "linear-gradient(135deg, #c45c3e, #6b2d3c)",
      backgroundSize: `${n * 100}% ${n * 100}%`,
      backgroundPosition: `${col * pct}% ${row * pct}%`,
    };
  }

  function shuffleTray() {
    tray = Array.from({ length: total }, (_, i) => i);
    for (let i = tray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tray[i], tray[j]] = [tray[j], tray[i]];
    }
    if (tray.every((id, idx) => id === idx)) {
      [tray[0], tray[1]] = [tray[1], tray[0]];
    }
  }

  function isSolved() {
    return boardSlots.every((pieceId, slot) => pieceId === slot);
  }

  function shake(el) {
    if (!el || prefersReducedMotion()) return;
    el.classList.remove("photo-puzzle__shake");
    void el.offsetWidth;
    el.classList.add("photo-puzzle__shake");
    el.addEventListener("animationend", () => el.classList.remove("photo-puzzle__shake"), { once: true });
  }

  function checkSolved() {
    if (!isSolved() || boardSlots.some((p) => p === null)) return;
    solved = true;
    root.classList.add("photo-puzzle--solved");
    hint.textContent = "Perfect!";
    renderCompleteBoard();
    onSolved?.();
  }

  function renderCompleteBoard() {
    board.innerHTML = "";
    board.classList.add("photo-puzzle__board--complete");
    trayEl.hidden = true;

    const complete = document.createElement("div");
    complete.className = "photo-puzzle__complete";

    if (imageReady && imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = alt;
      complete.appendChild(img);
    } else {
      complete.style.background = "linear-gradient(135deg, #c45c3e, #6b2d3c)";
    }

    board.appendChild(complete);
  }

  function createPieceButton(pieceId, context) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "photo-puzzle__piece";
    btn.dataset.pieceId = String(pieceId);
    btn.setAttribute("aria-label", `Piece ${pieceId + 1}`);
    const bg = pieceStyle(pieceId);
    btn.style.backgroundImage = bg.backgroundImage;
    btn.style.backgroundSize = bg.backgroundSize;
    btn.style.backgroundPosition = bg.backgroundPosition;

    if (selectedId === pieceId) {
      btn.classList.add("photo-puzzle__piece--selected");
    }

    btn.addEventListener("click", () => {
      if (solved) return;
      if (context === "tray") {
        selectedId = pieceId;
        render();
        return;
      }
      if (context === "board") {
        const slotIndex = boardSlots.indexOf(pieceId);
        if (slotIndex === -1) return;
        boardSlots[slotIndex] = null;
        tray.push(pieceId);
        selectedId = null;
        render();
      }
    });

    return btn;
  }

  function handleSlotClick(slotIndex) {
    if (solved) return;

    const placed = boardSlots[slotIndex];
    if (placed !== null) {
      if (selectedId === null) {
        shake(board.children[slotIndex]);
      }
      return;
    }

    if (selectedId === null) {
      shake(board.children[slotIndex]);
      return;
    }

    const trayIdx = tray.indexOf(selectedId);
    if (trayIdx === -1) return;

    tray.splice(trayIdx, 1);
    boardSlots[slotIndex] = selectedId;
    selectedId = null;
    render();
    checkSolved();
  }

  function render() {
    board.innerHTML = "";
    trayEl.innerHTML = "";

    for (let slot = 0; slot < total; slot++) {
      const slotBtn = document.createElement("button");
      slotBtn.type = "button";
      slotBtn.className = "photo-puzzle__slot";
      slotBtn.dataset.slot = String(slot);
      slotBtn.setAttribute("aria-label", `Slot ${slot + 1}`);

      const pieceId = boardSlots[slot];
      if (pieceId !== null) {
        slotBtn.classList.add("photo-puzzle__slot--filled");
        slotBtn.appendChild(createPieceButton(pieceId, "board"));
      } else {
        slotBtn.classList.add("photo-puzzle__slot--empty");
        slotBtn.addEventListener("click", () => handleSlotClick(slot));
      }

      board.appendChild(slotBtn);
    }

    tray.forEach((pieceId) => {
      trayEl.appendChild(createPieceButton(pieceId, "tray"));
    });

    if (!tray.length && boardSlots.every((p) => p !== null) && !isSolved()) {
      hint.textContent = "Almost — swap a piece if needed (tap to return to tray)";
    } else if (!solved) {
      hint.textContent = selectedId === null
        ? "Tap a piece, then tap an empty slot"
        : "Now tap an empty slot on the board";
    }
  }

  function initPuzzle() {
    boardSlots = Array(total).fill(null);
    selectedId = null;
    solved = false;
    root.classList.remove("photo-puzzle--solved");
    board.classList.remove("photo-puzzle__board--complete");
    trayEl.hidden = false;
    shuffleTray();
    render();
  }

  function preloadImage() {
    if (!image) {
      imageReady = false;
      initPuzzle();
      const note = document.createElement("p");
      note.className = "photo-puzzle__fallback";
      note.textContent = "Photo missing — add image to gallery folder. Puzzle still works!";
      root.appendChild(note);
      return;
    }

    const img = new Image();
    img.onload = () => {
      imageReady = true;
      imageUrl = image;
      initPuzzle();
    };
    img.onerror = () => {
      imageReady = false;
      initPuzzle();
      const note = document.createElement("p");
      note.className = "photo-puzzle__fallback";
      note.textContent = "Photo missing — add image to gallery folder. Puzzle still works!";
      root.appendChild(note);
    };
    img.src = image;
  }

  preloadImage();

  return {
    destroy() {
      container.innerHTML = "";
    },
  };
}