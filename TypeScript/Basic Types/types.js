"use strict";
// Common Types in TypeScript:
// 1. number
let age = 25;
console.log(age);
// 2. string
let names = "Ayushman";
console.log(names);
// 3. boolean
let isStudent = true;
console.log(isStudent);
// 4. array
// An array is a collection of values of the same type. In TypeScript, you can define arrays to hold specific types, ensuring type safety.
let scores = [85, 90, 92];
let fruits = [{ a: 10 }, { b: 20 }];
console.log(scores);
// 5. tuple: 
// A tuple is like an array, but with a fixed number of elements where each element can have a different type. Think of it as a way to store mixed-type data together in a specific order.
let person = ["Anshuman", 90];
console.log(person[0]);
//6. Enum
// Bidirectional Mapping: enums allow reverse mapping from numeric value back to the name and vice-versa
// in js enum is stored as an object
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let myColor = Color["0"];
console.log(myColor);
// Adding new elements in enum
(function (Color) {
    Color[Color["Violet"] = 5] = "Violet";
    Color[Color["Brown"] = 6] = "Brown";
    Color[Color["Yellow"] = 7] = "Yellow";
})(Color || (Color = {}));
console.log(Color);
//7. any
// any: Allows any type (avoid if possible):
let randomValue = "Could be anything!";
//8. void
//Usually used for functions that does not return a value
function logMsg() {
    console.log("Hello");
}
console.log(logMsg());
//9. undefined
// variable that has been declared but not yet assigned a value.
let x;
console.log(x); // Output: undefined
//10. null
// when variable is assigned as undefined that means it has not yet assigned a value but when we assign a value null that means we explicitly represents "no value" or "empty value." It's often assigned to variables to indicate that they intentionally have no value.
let y = null;
console.log(y);
