// Coding Challengue 2
class CarCl {
    constructor (make, speed) {
        this.make = make
        this.speed = speed
    }

    //Instance methods
    accelerate() {
        this.speed += 10;
        console.log(this.speed)
    }
    brake() {
        this.speed -= 5;
        console.log(this.speed);
    }
    //Getters y setters
    get speedUS() {
        return this.speed / 1.6;
    }
    set speedUS(usSpeed) {
        this.speed = usSpeed * 1.6;
    }
}

const ford = new CarCl('Ford',120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford)


const audi = new CarCl('Audi',100);


audi.brake();

audi.speedUS = 55;
console.log(audi.speedUS);