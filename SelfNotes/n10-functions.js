 //Passing by value? Passing by reference?
 //JS only pass value, does not have passing by reference
 //When passing an object, we pass the address, which is a value


 //First class functions: treated as first-class citizens
 // Treated as values, functions are another type of object
 //We can pass functions as arguments for other functions
 //We can return functions from functions

 //Functions are objects. Arrays are objects and have methods
 //Functions can also have methods

 //Higher order functions: a function receiving another function as argument, return new function, or both
 //this is only possible thanks to first-class functions

//Call back function: functions passed as parameters of another function
// this name because the function will be called later by the higher function.
//call back functions enable abstractions.

//Call apply bind to modify this keyword.

//Immediatly invoked function expressions

// Closures
const secureBooking = function (){
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(passengerCount);
    }
}
const booker = secureBooking();
booker();
booker();
booker();

//Closure makes a function remember all variables that existed at the functions birth place.
//Any function always has access to variable environment of EC in which the function was created.

//Booker was created in the EC of secureBooking, which was popped by the call stack.
//Since passengerCount existed in the secureBooking context, booker has access.
//Closure has priority over the scope chain.
//fucntion scope -> closure -> scope chain
//We cannot explicitely access close over variables since closures are not tangible like an object.

//look into scopes array: the double bracktes indicate it's a property unacessible to our code
console.dir(booker);

