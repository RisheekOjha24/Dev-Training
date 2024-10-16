// Apply methodis similar to call but it takes arguments in form of array.
function welcome(greet,salt){
    console.log(this);
    console.log(greet);
    console.log(salt);
}
let obj={
    name:"radha",
    age:20
}
let salty="This is salty"
welcome.apply(obj,["hello welcome to Ksolves",salty])