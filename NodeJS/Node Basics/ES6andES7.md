
JavaScript ES7, also known as ECMAScript 2016, introduced a handful of new features aimed at making coding more efficient and readable. Here's a quick overview:

1. Async/await for simpler asynchronous code
2. Array.prototype.includes() to easily check for the presence of an element in an array
3. Exponentiation Operator (**) for easier math expressions
4. Object.entries() and Object.values() for better object property manipulation

Object.entries() gives you a list of key-value pairs from an object, making it easy to loop through them.
Object.values() gives you all the values from an object's properties in a list.

console.log(Object.entries(person)); 
// [["name", "John"], ["age", 30]]

console.log(Object.values(person));
// ["John", 30]