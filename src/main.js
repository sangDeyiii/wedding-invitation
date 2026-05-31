const WEDDING_DATE = new Date('2026-12-22T17:00:00+07:00');
window.__weddingInvitationStarted = true;

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });
revealItems.forEach((item) => observer.observe(item));

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  const safeDiff = Math.max(diff, 0);
  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDiff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const startOverlay = document.getElementById('startOverlay');
const startExperience = document.getElementById('startExperience');
let musicPlaying = false;

function syncMusicButton() {
  musicToggle.textContent = musicPlaying ? '\u266b' : '\u266a';
  musicToggle.setAttribute(
    'aria-label',
    musicPlaying ? 'Tat nhac' : 'Bat nhac'
  );
}

async function tryPlayMusic() {
  try {
    music.muted = false;
    music.volume = 1;
    await music.play();
    musicPlaying = true;
    syncMusicButton();
    return true;
  } catch (error) {
    return false;
  }
}

function pauseMusic() {
  music.pause();
  musicPlaying = false;
  syncMusicButton();
}

function showStartOverlay() {
  startOverlay?.classList.add('show');
  startOverlay?.setAttribute('aria-hidden', 'false');
}

function hideStartOverlay() {
  startOverlay?.classList.remove('show');
  startOverlay?.setAttribute('aria-hidden', 'true');
}

function startSlowAutoScroll(speed = 46) {
  let lastTime;
  let currentY = window.scrollY || document.documentElement.scrollTop || 0;
  let isCancelled = false;

  const cancelAutoScroll = () => {
    isCancelled = true;
  };

  window.addEventListener('wheel', cancelAutoScroll, { passive: true, once: true });
  window.addEventListener('touchmove', cancelAutoScroll, { passive: true, once: true });
  window.addEventListener('keydown', cancelAutoScroll, { once: true });

  function step(currentTime) {
    if (isCancelled) return;
    if (!lastTime) lastTime = currentTime;

    const elapsedSeconds = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    const maxScroll = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    ) - window.innerHeight;
    const nextY = Math.min(currentY + speed * elapsedSeconds, maxScroll);
    currentY = nextY;

    window.scrollTo(0, nextY);

    if (nextY < maxScroll) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

function scheduleAutoScroll() {
  if (window.location.hash || window.scrollY >= 10) return;

  window.setTimeout(() => {
    startSlowAutoScroll();
  }, 900);
}

musicToggle.addEventListener('click', async () => {
  if (musicPlaying) {
    pauseMusic();
    return;
  }

  const played = await tryPlayMusic();
  if (played) hideStartOverlay();
});

startExperience?.addEventListener('click', async () => {
  const played = await tryPlayMusic();
  if (played) hideStartOverlay();
});

async function initMusic() {
  const played = await tryPlayMusic();
  if (played) {
    hideStartOverlay();
    return;
  }

  showStartOverlay();

  const playAfterInteraction = async () => {
    const started = await tryPlayMusic();
    if (!started) return;

    hideStartOverlay();
    window.removeEventListener('pointerdown', playAfterInteraction);
    window.removeEventListener('keydown', playAfterInteraction);
    window.removeEventListener('touchstart', playAfterInteraction);
  };

  window.addEventListener('pointerdown', playAfterInteraction);
  window.addEventListener('keydown', playAfterInteraction);
  window.addEventListener('touchstart', playAfterInteraction, { passive: true });
}

scheduleAutoScroll();
if (document.readyState === 'complete') {
  initMusic();
} else {
  window.addEventListener('load', initMusic, { once: true });
}

const rsvpForm = document.getElementById('rsvpForm');
const formNote = document.getElementById('formNote');

rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(rsvpForm).entries());

  const saved = JSON.parse(localStorage.getItem('wedding_rsvp') || '[]');
  saved.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('wedding_rsvp', JSON.stringify(saved));

  formNote.textContent = 'Cam on ban! Thong tin xac nhan da duoc ghi nhan tren trinh duyet.';
  rsvpForm.reset();
});
