// this keyword refers to the context in which it is invoked

// 1. Global Context (this in the global scope):

// In the global execution context (outside any function), this refers to the global object, which is window in browsers.
console.log(this); // In a browser, this will log the Window object

// ==============================================================================

// 2.Function Context (this inside regular functions):
// In a regular function, this refers to the global object (window in browsers) if the function is called in the global scope

function show() {
    console.log(this);
}
show();



// ==============================================================================
//3. Object Method
function show() {
    console.log(this);
}

const obj = {
    name: "Object",
    show: show
};
obj.show();  // Here, `this` refers to obj

//4. Inside Arrow Fuction
// Arrow functions do not have their own this. Instead, they inherit this from the lexical scope where they were defined.

const obj2= {
    name:"This is an objecyt",
    greet: function() {
        const af=()=>{
            console.log(this);
        }
        af();
    }
}

obj2.greet();

// 5. In constructors, this refers to the new object being created
function Person(name, age) {
    this.name = name;  // `this` refers to the new object
    this.age = age;    // `this` refers to the new object
}

// Create a new object using the constructor
const object = new Person("John", 30);
