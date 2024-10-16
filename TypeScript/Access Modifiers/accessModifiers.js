"use strict";
class Car {
    constructor(brand, engineNumber, mileage) {
        this.brand = brand;
        this.engineNumber = engineNumber;
        this.mileage = mileage;
    }
    getEngineDetails() {
        console.log(`Engine Number: ${this.engineNumber}`);
    }
    showCarInfo() {
        console.log(`Car: ${this.brand}, Mileage: ${this.mileage}`);
        this.getEngineDetails(); // Calling private method
    }
}
class ElectricCar extends Car {
    constructor(brand, engineNumber, mileage, batteryLife) {
        super(brand, engineNumber, mileage);
        this.batteryLife = batteryLife;
    }
    showBatteryStatus() {
        console.log(`Battery Life: ${this.batteryLife} hours`);
        console.log(`Mileage: ${this.mileage} km`); // Accessing protected member
    }
}
const myCar = new ElectricCar('Tesla', 'ENG123456', 500, 10);
myCar.showCarInfo(); // Accessible (public method)
// myCar.engineNumber;          // Error: 'engineNumber' is private
// myCar.getEngineDetails();    // Error: 'getEngineDetails' is private
myCar.showBatteryStatus(); // Accessible (public method)
