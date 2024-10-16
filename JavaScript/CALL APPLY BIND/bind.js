// The bind method is a powerful tool in JavaScript for creating new functions with a specified this context and optional pre-filled arguments.

//bind creates a new function which can be invoked later.

function sumNum(a,b){
    console.log(this);
    console.log(a+b);
}

const obj={name:"Add two numbers"}

let newfn= sumNum.bind(obj,4); // the newfn is now a function with its this is set to object obj and first parameter is set to 4.
newfn(5); // output is 9.
