// A Set is a collection of unique values. It automatically removes duplicate entries and can store values of any type, including objects.
const set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add("hello");
console.log(set);

console.log(set.has(1)); // Output: true
console.log(set.size); 