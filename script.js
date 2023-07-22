'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* 
//////////////////////////////////
/////////////////////////////////
*/

console.log(document.documentElement);
console.log(document.styleSheets);
console.log(document.head);
console.log(document.body);

// Selecting

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
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  // This remove method is a new addition to Javascript
  // message.remove();
  // Before this new addition people does it like this by going to Parent Node and then removing its child by passing the element
  message.parentElement.removeChild(message);
});


// Styles




















/*
Example Function:
function getComputedStyles(element, extraInfo = false, ...properties) {
  if(!properties.length) return false;
  const wrong = { property: [], count: 0 };
  const info = {message: ''};
  const computed = [];
  const computedStyles = window.getComputedStyle(element);
  properties.forEach(property => {
    if(computedStyles.getPropertyValue(property)) {
      computed.push(computedStyles.getPropertyValue(property));
    }
    else {
      wrong.property.push(property);
      wrong.count++;
    }
  });
  const computedFiltered = computed.filter(val => val !== false);
  info.message = `${computedFiltered.length} properties were correct out of ${properties.length} properties.`;
  return extraInfo ? {values: computedFiltered, info, wrong} :  {values: computedFiltered, wrong };
};

// Example Test Case
const check = ['margin', 'padding', 'backgrou-imge', 'box-sizing'];

const styleValues = getComputedStyles(header, true, ...check);
console.log(styleValues);

*/