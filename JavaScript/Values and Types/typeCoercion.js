// Type Coercion is the automatic conversion of one data type to another when performing operations. This can happen implicitly, without the programmer's intervention.

// Examples of Type Coercion

// 1. String Concatenation: When you add a string to a number, JavaScript converts the number to a string
let num = 42;
let str = " is the answer";
let result = num + str;  // Number is coerced to string
console.log(result);      // Output: "42 is the answer"

// 2. Logical Operations
let val = 0;
if (val) {
    console.log("This won't be printed"); // 0 is falsy
}

