// A Map is a collection of key-value pairs where keys can be of any data type (including objects). It maintains the insertion order of keys and allows easy retrieval, addition, and deletion of items.
const map=new Map();
map.set("name","Varun");
map.set(1,"WFH");
console.log(map);
console.log(map.get(1));
console.log(map.get("name"));