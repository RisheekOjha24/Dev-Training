// 1.  Function Declaration
function greet() {
    console.log("Hello, world!");
}

greet(); // Output: "Hello, world!"

// 2. Function Expression:

// A function can also be assigned to a variable. This type of function cannot be called before it is defined.

const greet = function() {
    console.log("Hello, world!");
};

greet(); // Output: "Hello, world!"


// 3. Arrow Functions
// Arrow functions provide a shorter syntax for writing functions.
const greet = () => {
    console.log("Hello, world!");
};

greet(); // Output: "Hello, world!"


// 4. Anonymous Functions
// Functions without a name are called anonymous functions. They are usually used as function expressions or passed as arguments to other functions.
setTimeout(function() {
    console.log("This runs after 2 seconds");
}, 2000);


