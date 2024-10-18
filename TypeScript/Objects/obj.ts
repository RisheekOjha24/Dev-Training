    let obj={
        name:"Aarav",
        age:200,
        lifeLine:1
    };
// In TypeScript, you can define an object type using an interface or a type alias.

// 1. Defining object signature using interface
// in interface we can define the obect keys with its types

interface User {
   readonly username:string,
    email?:string,
    age:number
}

// when set a prop ofinterface as readonly then its object prop cannot be modified.
const newUser:User={
    username:"Manav Mittal",
    email:"manav.mittal@gmail.com",
    age:90
}
// newUser.username="aakash"
console.log(newUser);

// 2. Defining object using type alias
type person={
    name:string,
    empID?:number,
    yoj:number  //year of joining
}

const  empnew:person={
    name:"abhay",
    empID:212,
    yoj:2024
}
console.log(empnew);