interface Users {
    readonly id: number;  // Readonly property
    name: string;
    age?: number;         // Optional property
}

// Example usage
const user10:Users={
    id:10,
    name:"cosmic",
    age:20,
}
console.log(user10);


//2. Declaration Merging
// If the same interface is declared multiple times, TypeScript will merge the properties together
interface Users {
    lname?:string
};

const user11:Users={
    id:11,
    name:"cosmic",
    age:20,
    lname:"universe"
}

// interface ca be used to extend another interface 
interface Company extends Users {
    companyName:string
}

const Company212:Company={
    companyName:"luminous",
    id:11,
    name:"cosmic",
    age:20,
    lname:"universe"
}
console.log(Company212);

// Implementing Interfaces in Classes
// Interfaces can be implemented by classes, ensuring that the class adheres to the structure defined by the interface.
interface Animal {
    name: string;
    makeSound():void;
}
// In classs when defining a function we don't use function keyword

class Dog implements Animal {
    name:string;
    constructor(name:string){
        this.name=name;
    }
    makeSound(): void {
        console.log("A cow says Mauuu");
    }
}

const mydog=new Dog("WoW!");
