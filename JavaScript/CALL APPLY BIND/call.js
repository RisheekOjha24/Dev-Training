// The call method is a built-in JavaScript function that allows you to invoke a function with a specified this value and individual arguments.

// Syntax: function.call(thisArg, arg1, arg2, ...)

// thisArg: The value to use as this when calling the function. This can be any JavaScript object or primitive value (like null, undefined, or a number).

// arg1, arg2, ...: Arguments passed to the function, specified individually.
function welcome(greet){
    console.log(this);
    console.log(greet);
}
let obj={
    name:"radha",
    age:20
}
welcome.call(obj,"hello welcome to Ksolves")