// TypeScript's powerful features is type aliases, which allow developers to create custom names for types

// 1. Type alias in variables
type userID = string|number;
let num:userID=109;
console.log(109);

// 2. Type alias in objects
type Person = {
    name: string;
    age: number;
};


const emp:Person={
    name:"Abhinav",
    age:20
}
console.log(emp);

//3. Combining typeAlias using &
// When you create an intersection type, the resulting type will have all the properties from all the combined types.
type Employee={
    empId:number,
    age:number
}

type empDetails=Employee & Person;

const newEmp:empDetails={
    name:"Jatin",
    age:20,
    empId:232,

}
console.log(newEmp);

// 4. Combining typeAlias using |
// Union types are created using the | operator. A union type allows a variable to hold values of different types. A value of a union type can be any one of the specified types but not both

type empDetails2=Employee | Person;

const newEmp2:empDetails2 = {
    name:"Arvind",
    age:20
    // empId:19,
}


