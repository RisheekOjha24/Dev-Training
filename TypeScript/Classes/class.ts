// A class is a blueprint for creating objects with properties and methods. It is an enhanced version of JavaScript classes that includes type safety, making the code more predictable and easier to work with.

class Persons {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    
    sayHello(): void {
        console.log(`Hello, my name is ${this.name}`);
    }
}

// Creating an instance of the class
const person1 = new Persons('Alice');
person1.sayHello();

// =================================================================
// Extending a class
// =================================================================
class Animal {
    name: string;

    constructor(name: string) {
        this.name = "German Shepherd";
    }

    makeSound(): void {
        console.log(`${this.name} makes a sound.`);
    }
}

class Dogy extends Animal {
    constructor(name: string) {
        super(name);
    }

    bark(): void {
        console.log(`${this.name} barks.`);
    }
}

const myDogy = new Dogy("Babar");
myDogy.makeSound()
console.log(myDogy.name);
