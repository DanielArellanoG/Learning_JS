let pElement = document.querySelector(".message"); //Gets the first element that matches with indicated selector.
let pElement = document.querySelectorAll(".message"); //Gets a NodeList, not exactly as an array


//Use element by id supposedly be faster than querySelector
const score0 = document.querySelector("#score--0"); //hash for css id
const score1 = document.getElementById("score--0");

//Once selected this elements (i think are also called nodes) you can add an event listener and look for events like click, hover, etc.
pElement.addEventListener('click',function () {
    console.log("I received a cick");
});
//When retrieving a node from querySelector, we can see list of css classes.
//modal.classList. we can apply some methods here: i.e. modal.classList.remove('class-name')


//Working with classes and manipulating them is a common strategy for hidding and displaying things.


//Keyboard events are global events (they don't happen on specific elements, happen on whole document)


//Js high level, garbage-collected, interpreted (just in time compiled)
//Multi paradigm: functional, procedural, oop
//First class functions, dynamic
// single-threaded and non-blocking event loop.

// Js engine: the program that executes js code. ie Google V8.
// It always contains a call stack and a heap
// Call stack is where code executed using execution context.
// Heap memory pool storing all objects in memory

//Jus-in-time (JIT) compilation: entire code is compiled, immediatly executed


//JIT process
//When parsing is done, code is parsing on a data strcuture called AST (abstract syntax tree). This step checks for syntax errors.
//In compilation, AST is transformed in machine code
//Execution is done in the call stack.
// Optimization is done and code is recompiled in an already running program.

//These steps happen in separate threads different than main thread running on the call stack.
//They are not accessible by our code.

//Runtime in the browser, its heart is a js engine
//Web apis ie. dom, timers, fetch api, console.log are functionalities provided to engine, 
//Accessible through window object.

//Callback queue, a data structure containing all callback functions ready to be executed
// i.e. event handler functions, when event happens a call back function is called into callback queue.
// After event, callback function is put in callback queue. When call stack is empty, callback function is passed on the call stack.
// this is achieved with event loop, who passes functions from the callback queue to the call stack




// How is code executed in call stack?
// Just after compilation a global execution context is created for top level code (NOT inside any function)
// Execution context, like a box storing all necessary information to be executed as variables or arguments passed on a function.
// then, top-level code is executed inside the global EC
//then functions are executed and we'll wait for callbacks

//for each function, a execution context is created, methods are functions attached to an object, so the same applies

//Inside execution context:
// 1. Variable Environment: functions, let,const and var declarations and the "arguments" object (the arguments passed in function that current execution context belongs to)
// 2. Scope chain: references to variables outside current function.
// 3. this keyword.

//These components generated in creation phase
//ECs on arrow functions dont get arguments object and this keyword.
//Instead they use arguments object and this keyword from closest regular function parent?

//Call stack is a place where ECs get stacked on top of each other in order to keep track where we are in the program.
// EC on top is the one currently running, when it's finished it'll be removed and execution will come back to previous EC.


//Scoping: how variables are organized and accessed. Where do variables live? Where they an be accessible
// Lexical scoping: controlled by placements of functions and blocks in the code
//scope: place where certain variables are declared, in functions scope is variable environment
// Global scope, function scope and block scope
// scope of a variable: region of code where a variable can be accessed
//Global: outside any function or block, accessible everywhere
// function: accessible only inside function, also called local scope
// block: inside if or for loops, block scope only applies to let and const, not var

//With ES6, functions are now also block scoped. if declared inside a block it will be only accessible on that block.

//Scope chain: Scopes can access variables and functions from parent scope, not the other way around
//variable lookup: if a variable is not found, look on the next upper context

// Hoisting and temporal dead zone (TDZ)
// hoisting: some types of variables accesible or usable before they are declared. as if they were sent to the top of the code
//before execution, code is scanned for variable declarations, for each variable a property is created in the variable environment

// function declaration: hoisted, value is the actual function code
// var variable: hoisted, but with undefined value
// let and const variable: not hoisted (technically yes), uninitialized value, TDZ -> trying to use before declaration marks error
// function expressions and arrows: if var, hoisted to undefined. if let or const, not hoisted.

// TDZ: region of scope where a variable is defined but can't be used in any way (as if it didn't exist)
// tdz is for avoiding and catching errors, also for consts to work as they are supposed to do 


//window as global object in browser js runtime
// is a variable declared with var, it gets registered as property of window object.

//this: special variable created on every EC (every function). Takes the value of (points to) the owner of the function in which "this" is used
// depends on how function is called, and is assigned only when function is actually called


//In a method, this points to object calling the method
// simple function call, this is undefined (if strict mode is not used, this points to window object)
// arrow function get the "this" from the surrounding function (lexical this)
//Event listener, this keyboard will point to dom element the handler is attached to
// new, call, apply, bind -> other behaviors

// this does not point to the function itself, nor the variable environment


//method borrowing?? object.method = object.method

const jonas = {
    firstName: "Daniel",
    year: 1998,
    greet: () => console.log(`Hey ${this.firstName}`),
};

jonas.greet(); // wont work since this doesnt get its context in arrow function, it takes parents context.
//Parent's context in this case would be window object since the declaration of an object doesnt create a context.
// as a best practice, do not use arrow function as an object method

//Primitives called primitive types -> stored in the call stack (the execution contexts where they are declared)
//Objects called reference types -> stored in heap.
//let age = 30; let oldAge = age; age=31;
//const me = {name: "Dan"}; const friend = me; friend.name = "Hugo"; -> friend and me will modify the same object

// const as immutable only in primitives, not objects, because const implies we can not change values of the call stack with a given address.
// but since when declaring objects the value is a memory reference of the heap, not the call stack

// prototypal inheritance?



//Copying object
const jess2 = {firstName:"Jess"};
const jessCopy = Object.assign({},jess2); //shallow copy (first level)
// how to create a deep clone object? not so straight forward





//ADVANCED DOM CONCEPTS
//Every node on dom tree is node type. Represented in js as a object
//Has properties and methods, such as .textContent .childNodes .parentNode .cloeNode()
// so to speak, they have child types:
// element, text, comment, document
// review: node -> element -> HTMLElement -> HTMLButtonElement
//INHERITANCE: all child types get access to methods and properties from their parent ndoes types
//We can think as if htmlbuttonelement is also a htmlelement and a element

//There's a node type called eventTarget, parent of document node type and window node type.
//Thanks to inheritance, the rest of node types can have event listeners for example.

console.log(document.documentElement); //document itselft is not the html element

// document.getEelementsByTagName("button") returns a html collection
//unlike querySelectorAll that returns a Node list
// The htmlcollection is also a "live collection". If elements are modified, it will be reflected on the code
// getElementsByClassName() 
// Creating elements
// insertAdjacentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it! </button>';
const header = document.querySelector('.header');
header.prepend(message);
header.append(message); //now that message is a live element in the DOM, it only appears on the end

message.style.backGroundColor = '#37383d' //as inline styles
console.log(message.style.height) //Wont work since it'll look for inline style
//To get computed styles:
console.log(getComputedStyle(message))







// Concepts:
// https://www.google.com/search?q=js+function+declaration+vs+expression&oq=js+function+decla&aqs=chrome.2.0i512j69i57j0i22i30l8.3988j0j1&sourceid=chrome&ie=UTF-8
// https://betterprogramming.pub/difference-between-regular-functions-and-arrow-functions-f65639aba256
// https://maksimivanov.com/posts/statements-expressions-js
// https://stackoverflow.com/questions/12703214/javascript-difference-between-a-statement-and-an-expression
// https://developer.mozilla.org/es/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
// https://www.freecodecamp.org/espanol/news/que-es-la-zona-muerta-temporal-temporal-dead-zone-tdz/


// https://webdesign.tutsplus.com/es/articles/what-is-the-dom-api-for-javascript--cms-35650
// https://yousaf.hashnode.dev/detailed-guide-to-coercion-in-javascript

