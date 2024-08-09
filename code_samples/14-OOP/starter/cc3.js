
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function (){
    this.speed = this.speed+10;
    console.log(`Going faster at ${this.speed}`);
};
Car.prototype.brake = function (){
    this.speed = this.speed-5;
    console.log(`Going slower at ${this.speed}`);
};

const EV = function (make, speed, charge) {
    Car.call(this, make,speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype); // Link prototypes, Car constructor
EV.prototype.constructor = EV; // Indicate EV constructor
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
    console.log(`${this.make} battery charged to ${this.charge}%`);
}
EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed} km/h, with ${this.charge}% charge`);
}

const teslaEV = new EV('Tesla',120, 23);
teslaEV.chargeBattery(98);
teslaEV.accelerate();
teslaEV.brake();
console.log(teslaEV);
console.log(teslaEV.__proto__ === EV.prototype);
console.dir(EV.prototype);
console.dir(EV.prototype.__proto__);
console.dir(EV.prototype.__proto__.__proto__);
console.dir(EV.prototype.__proto__.__proto__.__proto__);


