// # Definition
// A callback is simply a function that is passed into another function as an argument, and then invoked within that function.
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function sayGoodbye(a=10) {
    console.log("Goodbye!");
}

greet("Risheek", sayGoodbye);


// Callbacks are especially useful in asynchronous operations like reading a file, fetching data from an API, or waiting for a timeout. 

//  setTimeout ==================================
// Define a function to run after a delay
let timeoutID = setTimeout(function() {
    console.log("This runs after 3 seconds.");
}, 3000);

// Clear the timeout before it executes
clearTimeout(timeoutID); // The function will never run

// setInterval =====================================
// Define a function that runs every 2 seconds
let intervalID = setInterval(function() {
    console.log("This runs every 2 seconds.");
}, 2000);

// Clear the interval after 6 seconds, stopping the repeated execution
setTimeout(function() {
    clearInterval(intervalID);
    console.log("Interval stopped!");
}, 6000);
