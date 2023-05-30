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

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  // btnsOpenModal[i].addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); //NodeList
console.log(allSections);
const allButtons = document.getElementsByTagName('button'); //HTMLcollection
console.log(allButtons);


/*
//Create and insert elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = "We use cookies for improved functionality";
message.innerHTML = 'We use cookies for improved functionality. <button class="btn btn--close-cookie">Got it!</button>';

//Add children to the elements
header.prepend(message);
//header.append(message); //This will "move" the element, not duplicated. Live element. DOM elements are unique.
//header.append(message.cloneNode(true));

//Add an element before or after another element, as a sibling
//header.before(message);
//header.after(message);


//Delete elements
document.querySelector('.btn--close-cookie');
addEventListener('click', function(){
  message.remove();
  // message.parentElement.removeChild(message); //before
});


//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); //This won't print anything since this obtains inline styles only.
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px';


document.documentElement.style.setProperty('--color-primary','orangered');


// Attributes
const logo = document.querySelector('.nav__logo');
//Since these are standard attributes of html elements, js automatically creates them.
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
logo.setAttribute('company','PayPal');
console.log(logo.company);
console.log(logo.getAttribute('company'));


console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes: special attributes starting with word data
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c1','c2');
logo.classList.remove('c1','c2');
logo.classList.toggle('c');
logo.classList.contains('c'); // Not includes
// logo.className = "c" //This will override all classes
*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function (e){
  const s1coords = section1.getBoundingClientRect(); //Relative to the viewport
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log("Current scroll (X/Y)",window.pageXOffset,window.pageYOffset);
  console.log("Height/Width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  //window.scrollTo(s1coords.left+window.pageXOffset,s1coords.top+window.pageYOffset);
  /*window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior:'smooth',
  });*/
  section1.scrollIntoView({behavior:'smooth'}); //Modern way
});


//This attaches same event handler three times, better attach it to parent container thanks to bubbling (event delegation)
/*
document.querySelectorAll('.nav__link').forEach( 
  function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
);
*/

document.querySelector('.nav__links').addEventListener('click',function(e){
  //console.log(e.target); //Take actual element clicked
  //if (e.target.classList.contains('nav__link')) console.log("BUBBLING");
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
})




const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert('addEventListener: reading header');
  h1.removeEventListener('mouseenter',alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// on<event> also works, but addEventListener is better:
/*h1.onmouseenter = function(e){
  alert('addEventListener: reading header');
}*/


// rgb(255,255,255)
const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;


//e.target is not always the same as this === e.currentTarget
document.querySelector('.nav__link').addEventListener('click',function (e) {
  console.log('LINK',e.target,e.currentTarget);
  this.style.backgroundColor = randomColor();
  //Stop propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click',function (e) {
  console.log('CONTAINER',e.target,e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click',function (e) {
  console.log('NAV',e.target,e.currentTarget);
  this.style.backgroundColor = randomColor();
});

