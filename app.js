'use strict';
document.documentElement.classList.add('has-js');
// [CONFIRMAR CON LA CLIENTA: completar datos oficiales. No se crean contactos ficticios.]
const SITE_CONFIG = {
  whatsapp: '', // Código de país y número, solo dígitos.
  email: '',
  instagram: '', // URL https://www.instagram.com/... oficial.
  retailers: [] // { name: '...', address: '...', mapUrl: 'https://...' }
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
)].filter(element => !element.closest('.day, .hero'));
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

// Process: one day in the field. Scroll drives the sky, sun, moon and hen; the list stays readable without it.
const day = document.querySelector('.day');
if (day) {
  const track = day.querySelector('.day-track');
  const steps = [...day.querySelectorAll('.day-step')];
  const hen = day.querySelector('.day-hen');
  const dotsWrap = day.querySelector('.day-dots');
  const skies = ['#f3d9a4', '#d4eadf', '#c1e6ee', '#f0d98a', '#193a59', '#f5f0e3'];
  const henStops = [30, 42, 54, 47, 33, 24];
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const mix = (a, b, t) => a + (b - a) * t;
  const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const lerpStops = (stops, f, toColor) => {
    const x = clamp(f - .5, 0, stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(x));
    const t = x - i;
    if (!toColor) return mix(stops[i], stops[i + 1], t);
    const a = rgb(stops[i]), b = rgb(stops[i + 1]);
    return 'rgb(' + a.map((v, k) => Math.round(mix(v, b[k], t))).join(',') + ')';
  };
  const orbit = angle => [50 + 46 * Math.cos(angle), 100 - 92 * Math.sin(angle)];
  let live = false;
  let current = -1;
  let dayFrame = 0;

  const dots = steps.map((step, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'day-dot';
    dot.setAttribute('aria-label', 'Paso ' + (index + 1) + ': ' + step.querySelector('h3').textContent);
    dot.addEventListener('click', () => {
      const range = track.offsetHeight - window.innerHeight;
      const top = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + range * (index + .5) / steps.length, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
    dotsWrap.append(dot);
    return dot;
  });

  function setStep(index) {
    if (index === current) return;
    current = index;
    day.dataset.step = index;
    steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    hen.classList.remove('is-pecking');
    void hen.offsetWidth;
    hen.classList.add('is-pecking');
  }

  function updateDay() {
    dayFrame = 0;
    if (!live) return;
    const rect = track.getBoundingClientRect();
    const progress = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight), 0, 1);
    const f = progress * steps.length;
    const night = clamp(1 - Math.abs(f - 4.5) / .75, 0, 1);
    const sunDay = clamp(f / 4.3, 0, 1);
    const sunNext = clamp(f - 5, 0, 1) * .3;
    const sunAngle = f < 5 ? Math.PI * (1 - sunDay) : Math.PI * (1 - sunNext);
    const sunOpacity = f < 5 ? clamp((4.3 - f) / .3, 0, 1) : clamp((f - 5) / .3, 0, 1);
    const moonAngle = Math.PI * (1 - clamp((f - 3.8) / 1.4, 0, 1)) * .8 + Math.PI * .1;
    const [sunX, sunY] = orbit(sunAngle);
    const [moonX, moonY] = orbit(moonAngle);
    const style = day.style;
    style.setProperty('--sky', lerpStops(skies, f, true));
    style.setProperty('--night', night.toFixed(3));
    style.setProperty('--sun-x', sunX.toFixed(2) + '%');
    style.setProperty('--sun-y', sunY.toFixed(2) + '%');
    style.setProperty('--sun-o', sunOpacity.toFixed(3));
    style.setProperty('--moon-x', moonX.toFixed(2) + '%');
    style.setProperty('--moon-y', moonY.toFixed(2) + '%');
    style.setProperty('--moon-o', night.toFixed(3));
    style.setProperty('--hen-x', lerpStops(henStops, f).toFixed(2) + '%');
    day.classList.toggle('is-night', night > .45);
    setStep(Math.min(steps.length - 1, Math.floor(f)));
  }
  function queueDay() {
    if (!dayFrame) dayFrame = requestAnimationFrame(updateDay);
  }
  function configureDay() {
    live = !reducedMotion.matches && window.innerHeight >= 560;
    day.classList.toggle('is-live', live);
    dotsWrap.hidden = !live;
    if (!live) {
      day.removeAttribute('style');
      day.removeAttribute('data-step');
      day.classList.remove('is-night');
      steps.forEach(step => step.classList.remove('is-active'));
      current = -1;
      return;
    }
    queueDay();
  }
  window.addEventListener('scroll', queueDay, { passive: true });
  window.addEventListener('resize', configureDay);
  reducedMotion.addEventListener('change', configureDay);
  configureDay();
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
  document.querySelector('#retail-contact').href = url + '?text=' + encodeURIComponent('Hola, quisiera saber dónde conseguir Doble Raíz.');
  document.querySelector('#retail-contact').firstChild.textContent = 'Consultar por WhatsApp ';
  document.querySelector('#trade-contact').href = url + '?text=' + encodeURIComponent('Hola, me interesa comercializar Doble Raíz. Mi comercio está en: ');
}
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.email)) addContact('Correo', 'mailto:' + SITE_CONFIG.email);
if (/^https:\/\/(www\.)?instagram\.com\//.test(SITE_CONFIG.instagram)) addContact('Instagram', SITE_CONFIG.instagram);
if (contactLinks.children.length) document.querySelector('#contact-status').textContent = 'Conversemos.';
if (SITE_CONFIG.retailers.length) {
  const list = document.querySelector('#retail-list');
  list.hidden = false;
  document.querySelector('#retail-status').textContent = 'Encontrá el comercio más cercano.';
  for (const retailer of SITE_CONFIG.retailers) {
    const item = document.createElement('li');
    const name = document.createElement('strong');
    name.textContent = retailer.name;
    item.append(name, document.createElement('br'), document.createTextNode(retailer.address));
    if (/^https:\/\//.test(retailer.mapUrl || '')) {
      const map = document.createElement('a');
      map.textContent = ' · Ver ubicación';
      map.href = retailer.mapUrl;
      item.append(map);
    }
    list.append(item);
  }
}
