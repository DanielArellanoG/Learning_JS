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

// ES6 CLASSES
// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        console.log(`Constructor called`);
        this.fullName = fullName;
        this.birthYear = birthYear;
        console.log(`Created PersonCl name:${this.fullName}, birth:${this.birthYear}`);
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


    // PENDING: setter for a property that already exists?
    // setters and getters executed immediatly? several times?
    set fullName(name){
        console.log(`Setter was called: ${name}`);
        if (name.includes(' ')) this._fullName = name;
        else alert (`${name} is not a full name`)
    }
    get fullName(){
        console.log(`Getter called. _fullName value: ${this._fullName}`);
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
// const jess = new PersonCl('Jessica Davis', 1996);
console.log(jess.fullName);
jess.fullName = "XD LMAO";
console.log(jess.fullName);
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







// INHERITANCE BETWEEN CLASSES
console.log("INHERITANCE BETWEEN CLASSES");

//Using constructor function
console.log("Inheritance w constructor functions");
const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear); // This lets us call Person constructor, but Student.prototype.__proto__ is not Person.prototype.
    this.course = course
}
//Student.prototype = Person.prototype // This will cause student to be the same as person
Student.prototype = Object.create(Person.prototype); // We connect prototypes, now Student.prototype.__proto__ is Person.prototype but constructor will be Person
console.dir(Student.prototype.constructor); //Constructor is Person constructor
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}
const mike = new Student('Mike', 2020, 'CS');

console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);



console.log(mike instanceof Student);
console.log(mike instanceof Person);


//Using ES6 classes
console.log("Inheritance w classes");
class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        super(fullName, birthYear); //First, calls parent constructor and sets this keyword, we can omit it if we don't use this. 
        this.course = course;
    }

    introduce() {
        console.log(`Name's ${this.fullName} and I study ${this.course}`);
    }
}

const martha = new StudentCl('Martha Jones', 2012, 'CS');
martha.introduce();


// Using object.create objects
console.dir(PersonProto.init);
console.log("Inheritance between object.create objects");
const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}
StudentProto.introduce = function (){
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}
const jay = Object.create(StudentProto);
jay.init('Jaay',2010, 'More CS');
jay.introduce();
jay.calcAge();






class Account {
    // public fields
    locale = navigator.language;
    //Private 
    #movements = [];
    #pin; //needs to be declared in class body first


    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin; //#pin needs to be declared on class body
        // this.movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening account, ${owner}`);
    }

    getMovements() {
        return this.#movements;
    }
    deposit (val){
        this.#movements.push(val)
    }
    withdraw (val){
        this.deposit(-val);
    }

    requestLoan(val){
        if(this.#approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }


    // Private methods
    #approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.movements.push(250);
acc1.deposit(30);
acc1.withdraw(140);
console.log(acc1);
// console.log(acc1.#approveLoan()); 

