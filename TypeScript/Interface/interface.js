"use strict";
// In TypeScript, interfaces are a fundamental feature that allows you to define the shape of objects, enforce type safety, and create more maintainable and readable code. 
// Example usage
const user10 = {
    id: 10,
    name: "cosmic",
    age: 20,
};
console.log(user10);
;
const user11 = {
    id: 11,
    name: "cosmic",
    age: 20,
    lname: "universe"
};
const Company212 = {
    companyName: "luminous",
    id: 11,
    name: "cosmic",
    age: 20,
    lname: "universe"
};
console.log(Company212);
// In classs when defining a function we don't use function keyword
class Dog {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log("A cow says Mauuu");
    }
}
const mydog = new Dog("WoW!");
