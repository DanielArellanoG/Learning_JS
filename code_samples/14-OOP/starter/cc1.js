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
