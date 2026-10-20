'use strict';
document.documentElement.classList.add('has-js');
// [CONFIRMAR CON LA CLIENTA: completar datos oficiales. No se crean contactos ficticios.]
const SITE_CONFIG = {
  whatsapp: '5492212046310', // Código de país y número, solo dígitos.
  email: '',
  instagram: 'https://www.instagram.com/dobleraiz_/', // URL https://www.instagram.com/... oficial.
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  navigation.classList.toggle('is-open', opening);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Reveal individual content items on each entry, preserving image rotations and sticky cards.
const revealItems = [...document.querySelectorAll(
  'main h1, main h2, main h3, main p, main img:not(.hen), main figcaption, main summary, ' +
  'main .button, main .text-link, main .hero-secondary, main .hand-note, ' +
  'main .process-num, main .values-ribbon > span, main .care-art > .eyebrow, ' +
  '.footer h3, .footer p, .footer a'
)].filter(element => !element.closest('.day-steps, .maples-list, .hero'));
document.querySelectorAll('.reveal').forEach(element => element.classList.remove('reveal', 'waiting'));
let revealObserver;
function updateRevealDirections() {
  const midpoint = window.innerWidth / 2;
  for (const element of revealItems) {
    const rect = element.getBoundingClientRect();
    // Subtract the running entry translation so resizing cannot flip its direction.
    const offset = parseFloat(getComputedStyle(element).translate) || 0;
    const center = rect.left + rect.width / 2 - offset;
    element.style.setProperty('--reveal-direction', center > midpoint + 12 ? '1' : '-1');
  }
}
function configureReveals() {
  revealObserver?.disconnect();
  revealItems.forEach(element => element.classList.remove('reveal-item', 'is-visible'));
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  updateRevealDirections();
  revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-visible', entry.isIntersecting || entry.target.matches(':focus-within'));
    }
  }, { threshold: 0, rootMargin: '0px 0px -14% 0px' });
  revealItems.forEach(element => {
    element.classList.add('reveal-item');
    revealObserver.observe(element);
  });
}
reducedMotion.addEventListener('change', configureReveals);
configureReveals();
let directionFrame = 0;
function queueRevealDirections() {
  if (directionFrame || reducedMotion.matches) return;
  directionFrame = requestAnimationFrame(() => {
    directionFrame = 0;
    updateRevealDirections();
  });
}
window.addEventListener('resize', queueRevealDirections);
window.addEventListener('load', queueRevealDirections);
if (document.fonts) document.fonts.ready.then(queueRevealDirections);

// Scroll storytelling: native scroll and small decorative motion.
// Content never depends on animation; reduced motion disables decorative transforms.
const scrollArt = [...document.querySelectorAll('[data-scroll-art]')];
const storyLinks = [...document.querySelectorAll('.chapter-index a')];
const storyChapters = storyLinks.map(link => document.querySelector(link.getAttribute('href')));
const header = document.querySelector('.site-header');
let scrollFrame = 0;
function updateStory() {
  scrollFrame = 0;
  const viewport = window.innerHeight;
  for (const art of scrollArt) {
    if (reducedMotion.matches) {
      art.style.removeProperty('--art-y');
      art.style.removeProperty('--art-rotate');
      continue;
    }
    const rect = art.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > viewport + 100) continue;
    const phase = Math.max(-1, Math.min(1, (viewport / 2 - rect.top - rect.height / 2) / viewport));
    const travel = window.innerWidth <= 760 ? 12 : 24;
    art.style.setProperty('--art-y', (phase * travel).toFixed(2) + 'px');
    art.style.setProperty('--art-rotate', (phase * 5).toFixed(2) + 'deg');
  }
  let active = -1;
  storyChapters.forEach((chapter, index) => {
    if (chapter.getBoundingClientRect().top < viewport * .55) active = index;
  });
  storyLinks.forEach((link, index) => {
    link.classList.toggle('is-current', index === active);
    if (index === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function queueStory() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateStory);
}
window.addEventListener('scroll', queueStory, { passive: true });
window.addEventListener('resize', queueStory);
window.addEventListener('load', queueStory);
reducedMotion.addEventListener('change', queueStory);
queueStory();

function updateHeaderBg() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
window.addEventListener('scroll', updateHeaderBg, { passive: true });
updateHeaderBg();

// Process: each arched window plays its moment once when it comes into view.
const daySteps = [...document.querySelectorAll('.day-step')];
if (daySteps.length && !reducedMotion.matches && 'IntersectionObserver' in window) {
  const dayObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.replace('is-waiting', 'is-in');
      dayObserver.unobserve(entry.target);
    }
  }, { threshold: .45 });
  daySteps.forEach(step => {
    step.classList.add('is-waiting');
    dayObserver.observe(step);
  });
}

const contactLinks = document.querySelector('#contact-links');
function addContact(label, href) {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  contactLinks.append(link);
}
if (/^\d{8,15}$/.test(SITE_CONFIG.whatsapp)) {
  const url = 'https://wa.me/' + SITE_CONFIG.whatsapp;
  addContact('WhatsApp', url);
  document.querySelector('#trade-contact').href = url + '?text=' + encodeURIComponent('Hola, me interesa comercializar Doble Raíz. Mi comercio está en: ');
}
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) addContact('Correo', 'mailto:' + SITE_CONFIG.email);
if (/^https:\/\/(www\.)?instagram\.com\//.test(SITE_CONFIG.instagram)) addContact('Instagram', SITE_CONFIG.instagram);
if (contactLinks.children.length) document.querySelector('#contact-status').textContent = 'Conversemos.';
