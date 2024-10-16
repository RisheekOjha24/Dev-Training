// You can specify types for function parameters and the return type.

//1. Normal function syntax
// function functionName(parameterName: parameterType): returnType { }


function greet(name: string):string{
    return `Hello ${name}`
}

console.log(greet("Risheek"));  // Output: Hello, Risheek!

// 2. Function with Optional Parameters
function greet2(name:string,age?:number){
    return age? `Hello ${name} and your age is ${age}`:`All good`;
}
console.log(greet2("Vipul"));

//3. Rest Parameter
// You can store any number of parameters
function sum(...numbers:number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1,2,3,4,5));

// 4. Arrow functions
const af=(num1:number,num2:number):number=>{
    
    return num1+num2;
}
console.log(af(2,9));

// using map, filter and reduce
// The method returns a new array and does not modify the original array.

//using map
const nums=[1,2,3,4,6];
const double:number[]=nums.map((ele:number)=> ele*2);
console.log(double);

//using filter
const mod2:number[]=nums.filter((ele:number)=>ele%2==0);
console.log(mod2);

//using reduce
const numReduce:number=nums.reduce((acc:number,curr:number)=>{
    return acc+curr;
},20)
console.log(numReduce);