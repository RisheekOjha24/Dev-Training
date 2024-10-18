// A polyfill is a piece of code that provides a fallback implementation for features that are not natively supported in a browser.

// Check if Array.prototype.includes is not defined

if (!Array.prototype.includes) {
    // Define the polyfill
    Array.prototype.includes = function(value) {
        return this.indexOf(value) !== -1;
    };
}

// Now you can use includes() safely
const fruits = ['apple', 'banana', 'mango'];

console.log(fruits.includes('banana')); // Output: true
console.log(fruits.includes('orange')); // Output: false

