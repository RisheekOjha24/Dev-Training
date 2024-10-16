const fruits = ['apple','mango','pineapple','litchi'];

//for loop in array ============================================

// Normal For loop
for(let i=0;i<fruits.length;i++){
    console.log(fruits[i]);
}

// for loop for array
for(const ele of fruits){
    console.log(ele);
}

// Do while loop
let x=0
do {
    console.log(fruits[x]);
    x++;
} while (x<fruits.length);

//for loop in string ====================================
// it prints character by chracter

let str="hellow world";
for(let j of str){
    console.log(j);
}
for(let k=0;k<str.length;k++)
{
    console.log(str[k]);
}

// for loop in objects ==================================
let person = { name: 'John', age: 30, city: 'New York' };
for (const key in person) {
    console.log(key, person[key]);
}
// we cannot access it using person["key"] or person.key



