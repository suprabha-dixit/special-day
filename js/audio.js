const STORAGE_KEY = "birthday-music-playing";

let audio = null;
let btn = null;
let musicPrompt = null;
let userPaused = false;
let gestureFallbackActive = false;

function createButton() {
  btn = document.createElement("button");
  btn.type = "button";
  btn.className = "music-toggle";
  btn.setAttribute("aria-label", "Play birthday background music");
  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = `
    <span class="music-toggle__icon" aria-hidden="true">♪</span>
    <span class="music-toggle__label">Birthday music</span>
  `;
  document.body.appendChild(btn);

  btn.addEventListener("click", toggleMusic);
}

function initAudio() {
  audio = new Audio(SITE_CONFIG.musicFile);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = "auto";
  audio.addEventListener("error", () => {
    if (btn) {
      btn.classList.add("music-toggle--unavailable");
      btn.setAttribute("aria-label", "Music file not found — add italian-piano.mp3 to assets/audio/");
      btn.querySelector(".music-toggle__label").textContent = "Add piano MP3";
    }
    removeGestureFallback();
    hideMusicPrompt();
  });
}

function setMusicPlaying(isPlaying) {
  if (!btn) return;
  btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  btn.setAttribute(
    "aria-label",
    isPlaying ? "Pause birthday background music" : "Play birthday background music"
  );
  btn.classList.toggle("music-toggle--playing", isPlaying);
  localStorage.setItem(STORAGE_KEY, isPlaying ? "true" : "false");
}

function showMusicPrompt() {
  if (musicPrompt) return;

  const message = SITE_CONFIG.musicPromptMessage || "Tap anywhere for music";
  musicPrompt = document.createElement("div");
  musicPrompt.className = "music-prompt";
  musicPrompt.setAttribute("role", "status");
  musicPrompt.innerHTML = `
    <p class="music-prompt__text">${message}</p>
    <p class="music-prompt__hint" aria-hidden="true">♪</p>
  `;
  document.body.appendChild(musicPrompt);

  if (btn) btn.classList.add("music-toggle--awaiting-gesture");
  if (typeof showToast === "function") showToast(message);
}

function hideMusicPrompt() {
  if (musicPrompt) {
    musicPrompt.remove();
    musicPrompt = null;
  }
  if (btn) btn.classList.remove("music-toggle--awaiting-gesture");
}

function onGestureStart(e) {
  if (e.target.closest(".music-toggle")) return;
  startMusic();
}

function addGestureFallback() {
  if (gestureFallbackActive || userPaused) return;
  gestureFallbackActive = true;
  showMusicPrompt();

  const opts = { capture: true };
  document.addEventListener("pointerdown", onGestureStart, opts);
  document.addEventListener("click", onGestureStart, opts);
}

function removeGestureFallback() {
  if (!gestureFallbackActive) return;
  document.removeEventListener("pointerdown", onGestureStart, { capture: true });
  document.removeEventListener("click", onGestureStart, { capture: true });
  gestureFallbackActive = false;
  hideMusicPrompt();
}

async function startMusic() {
  if (!audio || userPaused) return false;

  try {
    await audio.play();
    setMusicPlaying(true);
    removeGestureFallback();
    return true;
  } catch {
    return false;
  }
}

async function toggleMusic() {
  if (!audio) return;

  try {
    if (audio.paused) {
      userPaused = false;
      await audio.play();
      setMusicPlaying(true);
      removeGestureFallback();
    } else {
      audio.pause();
      userPaused = true;
      setMusicPlaying(false);
      removeGestureFallback();
    }
  } catch {
    btn.classList.add("music-toggle--unavailable");
  }
}

function whenAudioReady(callback) {
  if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    callback();
  } else {
    audio.addEventListener("canplaythrough", callback, { once: true });
    audio.load();
  }
}

function tryAutoplayOnHome() {
  if (document.body.dataset.page !== "home") return;
  if (SITE_CONFIG.musicAutoplayHome === false) return;

  whenAudioReady(() => {
    startMusic().then((started) => {
      if (!started && !userPaused) addGestureFallback();
    });
  });
}

function initMusic() {
  createButton();
  initAudio();
  tryAutoplayOnHome();
}