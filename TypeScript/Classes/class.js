"use strict";
// A class is a blueprint for creating objects with properties and methods. It is an enhanced version of JavaScript classes that includes type safety, making the code more predictable and easier to work with.
class Persons {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
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
    constructor(name) {
        this.name = "German Shepherd";
    }
    makeSound() {
        console.log(`${this.name} makes a sound.`);
    }
}
class Dogy extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log(`${this.name} barks.`);
    }
}
const myDogy = new Dogy("Babar");
myDogy.makeSound();
console.log(myDogy.name);
