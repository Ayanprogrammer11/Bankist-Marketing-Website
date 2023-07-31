'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const sections = document.querySelectorAll('.section');
const imgs = document.querySelectorAll('img[data-src]');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const checkCommand = [];
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Old School way
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth' 
  });
  */
  // Modern Way
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////
/////////////////////////
// Page Navigation
/////////////////////////

// Inefficient solution when there are many elements as it will result in assigning the same function copy to every element
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    if (id.length > 1 && id.startsWith('#')) {
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
*/

// Using the Event Propagation/Bubbling mechanism to achieve our result

// 1. Add event listener to common parent element.
// 2. Determine where the event was originated.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    if (id === '#') return;
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabsContainer.addEventListener('click', e => {
  let clicked = e.target.closest('.operations__tab');
  let tabNumber = clicked.dataset.tab;
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // Remove Class in all others
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Make the tab active
  clicked.classList.toggle(`operations__tab--active`);

  // Displaying the respective content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e, s) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation

// Inefficient approach
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// Efficient Approach
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-' + getComputedStyle(nav).height,
});
headerObs.observe(header);

// Revealing elements on scroll

const revealElements = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Removing Observer
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealElements, {
  root: null,
  threshold: 0.1,
});

sections.forEach(s => {
  sectionObserver.observe(s);
  s.classList.add('section--hidden');
});

// Lazy Loading Image

const lazyLoadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  const img = entry.target;
  img.setAttribute('src', img.dataset.src);
  img.classList.remove('lazy-img');
  observer.unobserve(img);
};

const imgObserver = new IntersectionObserver(lazyLoadImg, {
  root: null,
  threshold: 1,
});

imgs.forEach(img => imgObserver.observe(img));

/* 
//////////////////////////////////
/////////////////////////////////
*/
/*
console.log(document.documentElement);
console.log(document.styleSheets);
console.log(document.head);
console.log(document.body);

*/

// Selecting
/*
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

const header = document.querySelector('.header');

// Creating and Inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// header.prepend(message);
// One element can't be present at two places at the same time, so we first clone the Node and set it to true (optional) which means to do a deep copy
// header.append(message.cloneNode(true));
header.append(message);

// Removing Elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // This remove method is a new addition to Javascript
    // message.remove();
    // Before this new addition people does it like this by going to Parent Node and then removing its child by passing the element
    message.parentElement.removeChild(message);
  });
*/
// Styles
/*
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

console.log(message.style.width);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');




// const h1 = document.querySelector('h1');

// const h1Event = function (e) {
// alert('mouseenter: Great!');
// h1.removeEventListener('mouseenter', h1Event);
// };
// h1.addEventListener('mouseenter', h1Event);
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);

  // Stop propagation
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Links Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
});


const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
*/
// Progress Bar
let progressBar = document.querySelector('.loader');
window.addEventListener('scroll', function (e) {
  const windowScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percentage = (windowScroll / height) * 100;
  progressBar.style.width = `${percentage}%`;
});
