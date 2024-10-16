class Car {
    public brand: string;          // Accessible anywhere
    private engineNumber: string;  // Only accessible within Car
    protected mileage: number;     // Accessible within Car and subclasses

    constructor(brand: string, engineNumber: string, mileage: number) {
        this.brand = brand;
        this.engineNumber = engineNumber;
        this.mileage = mileage;
    }

    private getEngineDetails(): void {   // Private method, only within Car
        console.log(`Engine Number: ${this.engineNumber}`);
    }

    public showCarInfo(): void {         // Public method, accessible anywhere
        console.log(`Car: ${this.brand}, Mileage: ${this.mileage}`);
        this.getEngineDetails();         // Calling private method
    }
}

class ElectricCar extends Car {
    private batteryLife: number;

    constructor(brand: string, engineNumber: string, mileage: number, batteryLife: number) {
        super(brand, engineNumber, mileage);
        this.batteryLife = batteryLife;
    }

    public showBatteryStatus(): void {
        console.log(`Battery Life: ${this.batteryLife} hours`);
        console.log(`Mileage: ${this.mileage} km`);  // Accessing protected member
    }
}

const myCar = new ElectricCar('Tesla', 'ENG123456', 500, 10);
myCar.showCarInfo();           // Accessible (public method)
// myCar.engineNumber;          // Error: 'engineNumber' is private
// myCar.getEngineDetails();    // Error: 'getEngineDetails' is private
myCar.showBatteryStatus();      // Accessible (public method)
