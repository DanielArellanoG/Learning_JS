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
  //alert('addEventListener: reading header');
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


// Operations tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  //Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu Fade
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // Robust navigation if the order of these child elements changes
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
// Passing "argument" into handler 
// handler function only gets 1 real argument??
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords.top);

// //Scroll event not efficient, avoid
// window.addEventListener('scroll',function (){
//   //console.log(window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function (entries,observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// };

// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);


const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
//already defined //const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //Stop observing sections once revealed
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.30,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});


// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px',
})
imgTargets.forEach(img => imgObserver.observe(img));

// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;

//const slider = document.querySelector('.slider');
//slider.style.transform = 'scale(0.2) translateX(-800px)';
//slider.style.overflow = 'visible';
slides.forEach((s, i) => s.style.transform = `translateX(${100* i}%)`);
// 0%, 100%, 200%, 300%

const dotContainer = document.querySelector('.dots');
const createDots = function (){
  slides.forEach(function (_,i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
}


const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}


const goToSlide = function(slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};



//Slides movement
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
  }
});
const nextSlide = function () {
  if(curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
}
const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide -1;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
}
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e){
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});


