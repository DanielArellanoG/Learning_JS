'use strict';


// CONSTRUCTOR FUNCTION
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    

    // Never create methods under a constructor function, this will be costly on performance
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // } 
}
const danObject = new Person('Dan','1998');
console.log(danObject);
/*
1. An object {} is created
2. function is called.  this = {} (new object)
3. {} linked to prototype
4. functin automatically return {}
*/
const matilda = new Person('Matilda', 2017);
console.log(matilda instanceof Person);
const jack = new Person('Jack', 1975);


//Static method (not accessible by instances)
Person.hey = function() {
    console.log('Hey there! 👋');
    console.log(this);
}
Person.hey();
// matilda.hey(); //Not a function


// Prototypes
console.log(Person.prototype);
//console.log(matilda.calcAge())
Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};
console.log(Person.prototype);
matilda.calcAge();

console.log(matilda.__proto__ === Person.prototype); // True

console.log(Person.prototype.isPrototypeOf(matilda)); // True
console.log(Person.prototype.isPrototypeOf(Person)); //False


Person.prototype.species = 'Homo Sapiens';
console.log(matilda);
console.log(matilda.hasOwnProperty('firstName'));
console.log(matilda.hasOwnProperty('species'));


//Prototype chain
//Every object in js has a prototype
console.log(Person.prototype.__proto__) //Prototype of Person.prototype is an object, with prototype being Object.prototype
console.log(matilda.__proto__.__proto__)
//Built-in constructor function for objects. {} shortcut for new Object()
console.log(Object.prototype.__proto__); // Prototype of Object.prototype is null
console.log(matilda.__proto__.__proto__.__proto__); // Prototype of Object.prototype id null

console.dir(Person.prototype.constructor);


const arr = [3, 6, 6, 4, 7, 5, 9, 9];
console.log(arr.__proto__ === Array.prototype); //True
console.log(arr.__proto__.__proto__ === Object.prototype);  //True
const obj = {lol:"XD"};
console.log(obj.__proto__ === Object.prototype); //True
const sampleSet = new Set([4,5,6]);
console.log(sampleSet.__proto__ === Set.prototype); // True

// Best to not extend built-in prototypes
// Array.prototype.unique = function(){
//     return [...new Set(this)]
// }
// console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.log(h1.__proto__); // HTMLHeadingElement
console.log(h1.__proto__.__proto__); // HTMLElement
console.log(h1.__proto__.__proto__.__proto__); // Element
console.log(h1.__proto__.__proto__.__proto__.__proto__); // Node
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // EventTarget
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // null

console.dir(x => x + 1);



// Coding Challenge #1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function (){
    this.speed = this.speed+10;
    console.log(this.speed);
};
Car.prototype.brake = function (){
    this.speed = this.speed-5;
    console.log(this.speed);
};
const BMW = new Car('',120);
const Mercedes = new Car('',95);
BMW.accelerate();
BMW.brake();


// ES6 CLASSES
// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
        // console.log(`Created PersonCl name:${this.firstName}, birth:${birthYear}`);
    }

    // Instance methods
    // Methods added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }
    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }


    // PENDING: setter for a property that already exists? setters and getters executed immediatly? several times?
    set fullName(name){
        // console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert (`${name} is not a full name`)
    }
    get fullName(){
        return this._fullName;
    }


    static hey(){
        console.log('Hey there! 👋');
        console.log(this);
    }
}
// const PersonCl = class {} // class expression
//classes are just a special type of function
// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }
const jess = new PersonCl('Jessica Davis', 1996);

// console.log(jess);
// jess.calcAge();
// jess.greet();

// Setters & getters
const account = {
    owner: 'Dan',
    movements: [100, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov){
        this.movements.push(mov);
    }
}
console.log(account.latest);
// account.latest(50); //Is not a function error
account.latest = 50;
console.log(account.movements);

console.log(jess.age);

//Static method
const walter = new PersonCl('Walter White', 1965);
PersonCl.hey();
// walter.hey();



// OBJECT.CREATE
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
};
const steven = Object.create(PersonProto); // Setting directly the prototype of this object
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979); // Manual way to initialize object
sarah.calcAge();






