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

function fireConfetti(canvas, count = 120) {
  if (!canvas || prefersReducedMotion()) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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
      opacity: 0.28 + Math.random() * 0.22,
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
      opacity: 0.22 + Math.random() * 0.18,
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
      opacity: 0.25 + Math.random() * 0.2,
      rotate: -15 + Math.random() * 30,
    });
  }

  specs.forEach((spec) => {
    const { type, ...config } = spec;
    spawnFestiveItem(container, type, config);
  });

  for (let i = 0; i < 6; i++) {
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

function resizeCanvas(canvas) {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}