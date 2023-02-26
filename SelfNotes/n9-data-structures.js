//Array destructuring
let arr = [2, 3, 4];
let [x, y, z] = arr; //Destructuring assignment
console.log(x, y, z); //Separate variables

//Expand (spread) operator: works on all iterables (strings, maps, sets, arrays, NOT objects).
let ar = [7,8,9];
let badNewArr = [1,2,ar[0],ar[1],ar[2]];
console.log(badNewArr);
let NewArr = [1, 2, ...ar];
console.log(newArr);
//Normally used in places where we would use values separated by a comma
//Passing arguments to a function, building an array, etc.

//Rest pattern and rest parameters: pack several elements into an array
//SPREAD, because of RIGHT side of =
arr = [1,2, ...[3,4]];
// REST, because LEFT side of =
let [a,b, ...others] = [1,2,3,4,5];
console.log(a,b, others);

//Short circuiting && and ||
console.log(3 || 'Daniel'); //If the first operand in or operator is true, return this first value
console.log(0 && 'yes'); // 0 will be returned



//ES2020 nulish coallecing operator
const restaurant = {
    name: "DanRestaurant",
};
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);
// Nullish: null and undefined, (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);


//For loops on arrays
const menu = [1,2,3,4,5,6,7,8,9];
for (const item of menu) console.log(item);


//optional chaining
//console.log(restaurant.openingHours.mon?.open);
//console.log(restaurant.order?.(0,1)); //if methos exists call it


//looping over keys:
for (const day of Object.keys(openingHours)){ //Returns an array, same as values
    console.log(day);
}


// ES6 sets and maps
//Sets: collection of unique values
const ordersSet = new Set(['Pasta','Pizza','Risotto','Pasta','Pizza']);
console.log(ordersSet);
//sets are iterables, order is irrelevant

//Maps: keys can be any type (in objects, keys are strings)

// Strings:
// methods: slice(), indexOf(), lastIndexOf(), indexOf()
//Since strings are primitives and primitives are immutable, these methods always retrieve a new string
//js does "boxing": takes a primitive object and creates a string object to being able to use methods
// toLowerCase(), toUpperCase(), trim(), includes(), startsWith(), split()
//replace() -> str.replace(/substring/g,'othersubstr'); -> str.replaceAll(); 
//message = "Hi XD"

// Fill a string with desired character
//message.padStart(10,'+') -> "+++++Hi XD"
//padEnd()
const maskCreditCard = function(number){
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length,'*');
}

console.log(maskCreditCard(123445052131234));


//repeat
//let str = "XD"; console.log(str.repeat(10));
