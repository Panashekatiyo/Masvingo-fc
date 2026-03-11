/* =========================================
   MASVINGO UNITED FC — main.js
   ========================================= */

/* ---- PRELOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600);
  }, 1800);
});

/* ---- YEAR ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- PAGE SWITCHING ---- */
function showPage(page) {
  document.getElementById('main-page').classList.remove('active');
  document.getElementById('login-page').classList.remove('active');
  const mainNav = document.getElementById('main-nav');
  if (page === 'main') {
    document.getElementById('main-page').classList.add('active');
    if (mainNav) mainNav.style.display = '';
  } else {
    document.getElementById('login-page').classList.add('active');
    if (mainNav) mainNav.style.display = 'none';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ---- MOBILE MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
}

/* ---- SCROLL ANIMATIONS ---- */
const animateEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animateEls.forEach(el => observer.observe(el));

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.querySelector('.stat-num').textContent = count + suffix;
  }, 40);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(el => statObserver.observe(el));

/* ---- SQUAD DATA ---- */
const squadData = [
  { name: 'T. Moyo', pos: 'Goalkeeper', num: 1, role: 'goalkeeper', emoji: '🧤' },
  { name: 'F. Chuma', pos: 'Goalkeeper', num: 16, role: 'goalkeeper', emoji: '🧤' },
  { name: 'K. Sibanda', pos: 'Defender', num: 2, role: 'defender', emoji: '🛡️' },
  { name: 'L. Nhamo', pos: 'Defender', num: 3, role: 'defender', emoji: '🛡️' },
  { name: 'P. Dube', pos: 'Defender', num: 5, role: 'defender', emoji: '🛡️' },
  { name: 'R. Chikwanda', pos: 'Defender', num: 6, role: 'defender', emoji: '🛡️' },
  { name: 'S. Marange', pos: 'Midfielder', num: 8, role: 'midfielder', emoji: '⚽' },
  { name: 'G. Mutasa', pos: 'Midfielder', num: 10, role: 'midfielder', emoji: '⚽' },
  { name: 'B. Nyoni', pos: 'Midfielder', num: 14, role: 'midfielder', emoji: '⚽' },
  { name: 'C. Zvobgo', pos: 'Midfielder', num: 7, role: 'midfielder', emoji: '⚽' },
  { name: 'M. Machava', pos: 'Forward', num: 9, role: 'forward', emoji: '🔥' },
  { name: 'J. Chirisa', pos: 'Forward', num: 11, role: 'forward', emoji: '🔥' },
  { name: 'A. Munyaradzi', pos: 'Forward', num: 17, role: 'forward', emoji: '🔥' },
  { name: 'D. Maziwisa', pos: 'Forward', num: 19, role: 'forward', emoji: '🔥' },
];

function renderSquad(filter = 'all') {
  const grid = document.getElementById('squad-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? squadData : squadData.filter(p => p.role === filter);
  filtered.forEach(player => {
    const card = document.createElement('div');
    card.className = 'squad-card';
    card.innerHTML = `
      <div class="squad-card-img">
        <span>${player.emoji}</span>
        <span class="squad-num">${player.num}</span>
      </div>
      <div class="squad-card-info">
        <h4>${player.name}</h4>
        <p>${player.pos}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderSquad();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSquad(btn.dataset.filter);
  });
});

/* ---- GALLERY LIGHTBOX ---- */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
let currentImg = 0;
const imgSrcs = [];

galleryItems.forEach((item, i) => {
  const src = item.querySelector('img').src;
  imgSrcs.push(src);
  item.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  currentImg = index;
  lightboxImg.src = imgSrcs[currentImg];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev?.addEventListener('click', () => {
  currentImg = (currentImg - 1 + imgSrcs.length) % imgSrcs.length;
  lightboxImg.src = imgSrcs[currentImg];
});

lightboxNext?.addEventListener('click', () => {
  currentImg = (currentImg + 1) % imgSrcs.length;
  lightboxImg.src = imgSrcs[currentImg];
});

document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev?.click();
  if (e.key === 'ArrowRight') lightboxNext?.click();
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('f-name');
  const email = document.getElementById('f-email');
  const message = document.getElementById('f-message');

  // Reset errors
  ['err-name', 'err-email', 'err-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  if (!name?.value.trim()) {
    document.getElementById('err-name').textContent = 'Name is required.';
    valid = false;
  }

  if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('err-email').textContent = 'Valid email is required.';
    valid = false;
  }

  if (!message?.value.trim() || message.value.trim().length < 10) {
    document.getElementById('err-message').textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (!valid) return;

  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1500);
});

/* ---- LOGIN FORM ---- */
const loginForm = document.getElementById('login-form');
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value;
  const password = document.getElementById('login-password')?.value;
  const errorEl = document.getElementById('login-error');

  // Demo validation — replace with real auth
  if (!email || !password || password.length < 6) {
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';
  // Simulate login success
  alert('Login successful! Welcome to Masvingo United FC members area.');
});

/* ---- SHOW PASSWORD TOGGLE ---- */
const showPass = document.getElementById('show-pass');
showPass?.addEventListener('change', () => {
  const passField = document.getElementById('login-password');
  if (passField) passField.type = showPass.checked ? 'text' : 'password';
});

/* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
