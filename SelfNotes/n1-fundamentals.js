let lol = "XD"; // in js semi colon not mandatory, but a good practice.
let thisIsMyVariable = "XD"; //Standard for variables camel case
//let Variable_XD; //By convention do not start variables with upper case


//Every value in js is either an OBJECT or a PRIMITIVE
//Primitives: number, string, boolean, undefined, null, symbol and big int.
let age = 24; // Always floats
let firstName = "Dan"; // sequence of characters, quote or double quote
let fullAge = true;
let children; //Not yet defined (empty value)
//null is empty as well
//symbol introduce on ES2015
//BigInt larger integers that number can hold
//JS is dynamic typed: define the type is not mandatory

/* Multi-line comment LMAO */

//JS executed sequentially: from top to bottom

const birthYear = 1991;
// birthYear = 1998; //Won't work since const make this value immutable
// const job; //Since this is const, this has to always be initialized
//var lol = "XD"; var keyword is replace in ES6 with let.  

// Operators: mathematical, logical, comparison, assigment
//// RESEARCH: Template strings
//// RESEARCH: typeof operator

// Assignment operators:
let x = 1 + 1;
x += 10;
x *= 4;
x++;
x--;
//Comparison operators: < > <= >=
//// IN-DEPTH: Operator Precedence

//// IN-DEPTH: type cohersion
// i.e. when using strings and numbers mixed, + operator normally converts to strings and other operators like - / > to numbers.
//// IN-DEPTH: template literals: use backticks -> `Text and suddenly a ${variable}`
//${} any expression or js code?


// Truthy and falsy values:
// 5 falsy values: 0, '', undefined, null, NaN
//note: empty objects are not falsy lmao -> {}
//type cohersion on booleans happends using logical operators or conditional statements like an if

// if an if block has one line, we can omit curly braces
age = 18;
if (age === 18) console.log("Ya eres un young adult");
//Strict and loose equality operator. Loose one doesn't do cohersion
console.log("18" == 18); // true
console.log("19" === 19); // false

/*Boolean operators: 
and -> && 
or -> || 
not -> !
*/

//switch does strict comparison

//Statements vs expressions??
//Ternary operator
age >= 18 ? console.log("I'm young adult"): console.log("I'm chiquitin")




//// JS FUNDAMENTALS PART 2
// Strict mode, forbids certain things and show errors other mode would not show.
//'use strict';

// Function declarations vs expressions
//Declaration: functions can be used before being declared (HOISTING)
function calcAge1 (birthYear) {
    return 2022 - birthYear;
}
const age1 = calcAge1(1998);
console.log(age1);
//Expression: anonymous function (this is an expression (produces a value))
const calcAge2 = function (birthYear) {
    return 2022 - birthYear;
}
const age2 = calcAge2(1991);
// In JS, functions are values so we can store them on variables


// Arrow function (function expression): arrow functions do not get "this" keyword
const calcAge3 = birthYear => 2037 - birthYear;

const yearsUntilRetirement = (birthYear) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return retirement;
}
console.log(yearsUntilRetirement(1991));

// Data Structures: the most important in JS are arrays and objects
//only primitive values are immutable, so we can modify arrays even when declared with 'const' but we can't modify its length
const f1 = "Brau";
const f2 = "Hugo";
const f3 = "Coco";

const friends = [f1,f2,f3];
friends[2] = "Brandon";
// friends = ["Re", "Mike"]; //const error
console.log(friends[friends.length - 1]);

friends.push("Brandon"); //Add element at the end of array
friends.unshift("Mike"); //Add element at the beginning of array
console.log(friends);
const popped = friends.pop(); //Remove last element of array, returns popped element
friends.shift(); //Remove first element of array

console.log(friends.indexOf("Hugo"));
console.log(friends.includes("Hugo")); //return true or false


//Objects 
const dan = {
    firstName: "Dan",
    lastName: "Arellano",
    birthYear: 1998,
    job: "DevOps Engineer",
    friends: ["Hugo", "David", "Brauni"],
    //calcAge: birthYear => 2022-birthYear, //Methods for objects
    //calcAge: () => 2022-this.birthYear, Not wirking since arrow functions do not get this keyword i think
    calcAge: function () {
        console.log(this); //Whole dan object
        return 2022 - this.birthYear;
    },
};
console.log(this);
console.log(dan.lastName); //Dot notation to look for properties
console.log(dan["lastName"]); //Bracket notation
//Bracket is more flexible (When we need to compute the property name, use bracket)
const nameKey = "Name";
console.log(dan["first"+nameKey]); //expression
console.log(dan["last"+nameKey]);

//object methods 
console.log(dan.calcAge(1998));
console.log(dan['calcAge'](1998));
console.log(dan.calcAge());

//For loops
for (let i = 1; i <= 10; i++ ){ //use i-- for backwards loops
    console.log(`Iteration number ${i}`);
}

// while
let lmao=1;
while (lmao<10){
    console.log(`Iteration: ${lmao}`);
    lmao++;
}
