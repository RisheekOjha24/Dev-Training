// In JavaScript there are 8 types of Operators

// 1. Arithmetic Operators (6)
let a = 10, b = 5;
console.log(a + b); // Addition: 15
console.log(a - b); // Subtraction: 5
console.log(a * b); // Multiplication: 50
console.log(a / b); // Division: 2
console.log(a % b); // Modulus: 0
console.log(a ** b); // Exponentiation: 100000

// 2. Assignment Operators
let x = 5;
x += 2; // x = x + 2
console.log(x); // 7
x *= 3; // x = x * 3
console.log(x); // 21

// 3. Comparsion Operators (5)
console.log(5 == '5');  // true (type coercion)
console.log(5 === '5'); // false (strict comparison)
console.log(5 != 6);    // true
console.log(5 > 3);     // true
console.log(5<3) //false;

// 4. Logical Operators (3)

let isTrue = true;
let isFalse = false;
// below are logical operator
console.log(isTrue && isFalse); // false
console.log(isTrue || isFalse);  // true
console.log(!isTrue);             // false

// 5. Bitwise Operators (4)

console.log(5 & 3);  // Bitwise AND: 1
console.log(5 | 3);  // Bitwise OR: 7
console.log(5 ^ 3);  // Bitwise XOR: 6
console.log(~5);     // Bitwise NOT: -6

// 6. Unary Operators
let num = 5;
console.log(++num); // Increment: 6
console.log(--num); // Decrement: 5
console.log(-num);  // Negation: -5


// 7. Ternary Operator

let age = 18;
let status = (age >= 18) ? 'Adult' : 'Minor';
console.log(status); // Adult

//8. Type Operators
console.log(typeof 5);          // "number"
console.log(typeof 'Hello');    // "string"

//9. Comma Operator
let result = (1 + 2, 3 + 4);
console.log(result); // 7 (evaluates both expressions, returns the last)



