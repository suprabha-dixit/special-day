const COLORS = ["#c45c3e", "#c9a227", "#5c6b4a", "#6b2d3c", "#e8d48b"];

function balloonSvg(uniqueId) {
  return `
  <svg viewBox="0 0 40 56" class="festive-item__svg">
    <defs>
      <radialGradient id="balloon-shine-${uniqueId}" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stop-color="white" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="var(--festive-color)" stop-opacity="1"/>
      </radialGradient>
    </defs>
    <ellipse cx="20" cy="22" rx="16" ry="20" fill="url(#balloon-shine-${uniqueId})"/>
    <path d="M20 42 Q18 48 20 52 Q22 48 20 42" fill="var(--festive-color)"/>
    <line x1="20" y1="52" x2="20" y2="56" stroke="var(--festive-color)" stroke-width="0.8" opacity="0.7"/>
  </svg>
`;
}

const CHOCOLATE_SVG = `
  <svg viewBox="0 0 48 32" class="festive-item__svg">
    <rect x="4" y="6" width="40" height="20" rx="4" fill="var(--festive-color)" opacity="0.92"/>
    <line x1="4" y1="14" x2="44" y2="14" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <line x1="4" y1="20" x2="44" y2="20" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
    <line x1="24" y1="6" x2="24" y2="26" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
    <rect x="6" y="8" width="8" height="6" rx="1" fill="white" opacity="0.12"/>
  </svg>
`;

const CRACKER_SVG = `
  <svg viewBox="0 0 56 40" class="festive-item__svg">
    <rect x="8" y="16" width="36" height="10" rx="5" fill="var(--festive-color)" opacity="0.9"/>
    <path d="M8 21 L2 14 M8 21 L2 28" stroke="var(--festive-accent)" stroke-width="2" stroke-linecap="round"/>
    <path d="M44 21 L50 12 M44 21 L50 30 M44 21 L52 21" stroke="var(--festive-accent)" stroke-width="2" stroke-linecap="round"/>
    <circle cx="14" cy="12" r="2" fill="var(--festive-accent)" opacity="0.8"/>
    <circle cx="42" cy="10" r="1.5" fill="var(--festive-accent)" opacity="0.7"/>
    <circle cx="38" cy="30" r="1.5" fill="var(--festive-accent)" opacity="0.6"/>
  </svg>
`;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const celebrationStates = new WeakMap();

function getCelebrationState(canvas) {
  if (!celebrationStates.has(canvas)) {
    celebrationStates.set(canvas, {
      confetti: [],
      fireworks: [],
      pendingBursts: [],
      rafId: null,
      continuous: false,
      continuousTimer: null,
      confettiInterval: null,
    });
  }
  return celebrationStates.get(canvas);
}

function spawnFireworkBurst(state, x, y) {
  const count = 40 + Math.floor(Math.random() * 21);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
    const speed = 2 + Math.random() * 4;
    state.fireworks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
      decay: 0.012 + Math.random() * 0.008,
      size: 2 + Math.random() * 2.5,
    });
  }
}

function runCelebrationLoop(canvas) {
  const state = getCelebrationState(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const now = performance.now();
  state.pendingBursts = state.pendingBursts.filter((burst) => {
    if (now >= burst.at) {
      spawnFireworkBurst(state, burst.x, burst.y);
      return false;
    }
    return true;
  });

  state.fireworks = state.fireworks.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.vx *= 0.98;
    p.life -= p.decay;
    if (p.life <= 0) return false;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return true;
  });

  state.confetti = state.confetti.filter((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.rot += p.vr;
    p.opacity -= 0.008;

    if (p.opacity <= 0) return false;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
    return true;
  });

  if (state.confetti.length || state.fireworks.length || state.pendingBursts.length || state.continuous) {
    state.rafId = requestAnimationFrame(() => runCelebrationLoop(canvas));
  } else {
    state.rafId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function scheduleFireworkBurst(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const state = getCelebrationState(canvas);
  state.pendingBursts.push({
    at: performance.now(),
    x: canvas.width * (0.15 + Math.random() * 0.7),
    y: canvas.height * (0.15 + Math.random() * 0.45),
  });
  ensureCelebrationLoop(canvas);
}

function startContinuousFireworks(canvas) {
  if (!canvas || prefersReducedMotion()) return;

  const state = getCelebrationState(canvas);
  state.continuous = true;

  function tick() {
    if (!state.continuous) return;
    scheduleFireworkBurst(canvas);
    state.continuousTimer = setTimeout(tick, 700);
  }

  tick();
  state.confettiInterval = setInterval(() => addConfettiToCelebration(canvas, 15), 2000);
  addConfettiToCelebration(canvas, 120);
}

function stopContinuousFireworks(canvas) {
  if (!canvas) return;

  const state = getCelebrationState(canvas);
  state.continuous = false;
  clearTimeout(state.continuousTimer);
  clearInterval(state.confettiInterval);
  state.continuousTimer = null;
  state.confettiInterval = null;
  state.pendingBursts = [];
}

function ensureCelebrationLoop(canvas) {
  const state = getCelebrationState(canvas);
  if (!state.rafId) runCelebrationLoop(canvas);
}

function addConfettiToCelebration(canvas, count) {
  const state = getCelebrationState(canvas);
  for (let i = 0; i < count; i++) {
    state.confetti.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * -0.5,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 8,
      opacity: 1,
    });
  }
  ensureCelebrationLoop(canvas);
}

function fireFireworks(canvas, durationMs = 4000) {
  if (!canvas || prefersReducedMotion()) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const state = getCelebrationState(canvas);
  const burstCount = 5 + Math.floor(Math.random() * 4);
  const start = performance.now();

  for (let i = 0; i < burstCount; i++) {
    const at = start + (durationMs / burstCount) * i + Math.random() * 200;
    state.pendingBursts.push({
      at,
      x: canvas.width * (0.15 + Math.random() * 0.7),
      y: canvas.height * (0.15 + Math.random() * 0.45),
    });
  }

  ensureCelebrationLoop(canvas);
}

function fireConfetti(canvas, count = 120) {
  if (!canvas || prefersReducedMotion()) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const state = getCelebrationState(canvas);
  if (state.rafId || state.fireworks.length || state.pendingBursts.length) {
    addConfettiToCelebration(canvas, count);
    return;
  }

  const ctx = canvas.getContext("2d");
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * -0.5,
    w: Math.random() * 8 + 4,
    h: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 3 + 2,
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 8,
    opacity: 1,
  }));

  let frame = 0;
  const maxFrames = 150;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rot += p.vr;
      if (frame > maxFrames * 0.6) p.opacity -= 0.025;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (frame < maxFrames) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(animate);
}

function spawnFestiveItem(container, type, config) {
  const el = document.createElement("div");
  el.className = `festive-item festive-item--${type}`;
  el.style.setProperty("--festive-color", config.color);
  el.style.setProperty("--festive-accent", config.accent || config.color);
  el.style.setProperty("--festive-size", `${config.size}px`);
  el.style.setProperty("--drift-duration", `${config.duration}s`);
  el.style.setProperty("--drift-delay", `${config.delay}s`);
  el.style.setProperty("--sway-amount", `${config.sway}px`);
  el.style.setProperty("--start-x", `${config.x}%`);
  el.style.setProperty("--start-y", `${config.y}%`);
  el.style.setProperty("--festive-opacity", String(config.opacity));
  el.style.setProperty("--festive-rotate", `${config.rotate}deg`);
  el.setAttribute("aria-hidden", "true");

  const svgs = {
    balloon: balloonSvg(`b${Math.random().toString(36).slice(2, 8)}`),
    chocolate: CHOCOLATE_SVG,
    cracker: CRACKER_SVG,
  };
  el.innerHTML = svgs[type];
  container.appendChild(el);
}

function createFestiveBackground(container) {
  if (!container || prefersReducedMotion()) return;

  const palette = [
    { color: "#c45c3e", accent: "#e8d48b" },
    { color: "#c9a227", accent: "#faf7f2" },
    { color: "#6b2d3c", accent: "#c9a227" },
    { color: "#5c6b4a", accent: "#e8d48b" },
    { color: "#e8d48b", accent: "#c45c3e" },
  ];

  const specs = [];

  for (let i = 0; i < 12; i++) {
    const p = palette[i % palette.length];
    specs.push({
      type: "balloon",
      color: p.color,
      accent: p.accent,
      size: 32 + Math.random() * 28,
      duration: 18 + Math.random() * 14,
      delay: -(Math.random() * 20),
      sway: 12 + Math.random() * 20,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      opacity: 0.33 + Math.random() * 0.22,
      rotate: -12 + Math.random() * 24,
    });
  }

  for (let i = 0; i < 10; i++) {
    const p = palette[(i + 2) % palette.length];
    specs.push({
      type: "chocolate",
      color: i % 2 === 0 ? "#6b2d3c" : "#4a3528",
      accent: p.accent,
      size: 22 + Math.random() * 18,
      duration: 22 + Math.random() * 16,
      delay: -(Math.random() * 25),
      sway: 18 + Math.random() * 24,
      x: Math.random() * 100,
      y: 105 + Math.random() * 15,
      opacity: 0.27 + Math.random() * 0.18,
      rotate: -20 + Math.random() * 40,
    });
  }

  for (let i = 0; i < 8; i++) {
    const p = palette[(i + 1) % palette.length];
    specs.push({
      type: "cracker",
      color: p.color,
      accent: p.accent,
      size: 26 + Math.random() * 20,
      duration: 20 + Math.random() * 12,
      delay: -(Math.random() * 18),
      sway: 14 + Math.random() * 18,
      x: Math.random() * 100,
      y: 108 + Math.random() * 12,
      opacity: 0.3 + Math.random() * 0.2,
      rotate: -15 + Math.random() * 30,
    });
  }

  specs.forEach((spec) => {
    const { type, ...config } = spec;
    spawnFestiveItem(container, type, config);
  });

  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "festive-sparkle";
    sparkle.style.setProperty("--sparkle-x", `${10 + Math.random() * 80}%`);
    sparkle.style.setProperty("--sparkle-y", `${10 + Math.random() * 80}%`);
    sparkle.style.setProperty("--sparkle-delay", `${Math.random() * 6}s`);
    sparkle.style.setProperty("--sparkle-duration", `${3 + Math.random() * 4}s`);
    container.appendChild(sparkle);
  }
}

/** Simple balloons for secondary pages (e.g. fun.html) */
function createBalloons(container, count = 6) {
  if (!container || prefersReducedMotion()) return;

  const balloonColors = ["#c45c3e", "#c9a227", "#6b2d3c", "#5c6b4a", "#e8d48b"];

  for (let i = 0; i < count; i++) {
    spawnFestiveItem(container, "balloon", {
      color: balloonColors[i % balloonColors.length],
      accent: "#e8d48b",
      size: 32 + Math.random() * 16,
      duration: 14 + Math.random() * 10,
      delay: -(Math.random() * 15),
      sway: 10 + Math.random() * 14,
      x: 5 + Math.random() * 90,
      y: 105,
      opacity: 0.35 + Math.random() * 0.2,
      rotate: -10 + Math.random() * 20,
    });
  }
}

function createInteractiveWishBalloons(container, options = {}) {
  if (!container || prefersReducedMotion()) return;

  const phrases = options.phrases || ["Cheers!", "Happy birthday!"];
  const canvas = options.canvas || null;
  const balloonColors = ["#c45c3e", "#c9a227", "#6b2d3c", "#5c6b4a", "#e8d48b"];
  const motifs = ["★", "♥", "✦", "•"];

  for (let i = 0; i < 12; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wish-balloon";
    btn.setAttribute("aria-label", "Pop balloon for a birthday cheer");
    const color = balloonColors[i % balloonColors.length];
    btn.style.setProperty("--balloon-color", color);
    btn.style.setProperty("--balloon-x", `${5 + Math.random() * 90}%`);
    btn.style.setProperty("--balloon-delay", `${-(Math.random() * 18)}s`);
    btn.style.setProperty("--balloon-duration", `${16 + Math.random() * 12}s`);
    btn.style.setProperty("--balloon-sway", `${10 + Math.random() * 16}px`);
    btn.innerHTML = `
      <span class="wish-balloon__motif" aria-hidden="true">${motifs[i % motifs.length]}</span>
      <svg viewBox="0 0 40 56" class="wish-balloon__svg" aria-hidden="true">
        <ellipse cx="20" cy="22" rx="16" ry="20" fill="var(--balloon-color)"/>
        <path d="M20 42 Q18 48 20 52 Q22 48 20 42" fill="var(--balloon-color)"/>
        <line x1="20" y1="52" x2="20" y2="56" stroke="var(--balloon-color)" stroke-width="0.8" opacity="0.7"/>
      </svg>
    `;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("wish-balloon--popped")) return;
      btn.classList.add("wish-balloon--popped");
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      if (typeof showToast === "function") showToast(phrase);
      if (canvas) fireConfetti(canvas, 30);
    });

    container.appendChild(btn);
  }
}

function resizeCanvas(canvas) {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}