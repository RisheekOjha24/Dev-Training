# Definition
Hoisting is the behavior in JavaScript where variable and function declarations are moved to the top of their containing scope (global or function) during the compilation phase, before the code is executed.

1. Variables declared with var are hoisted to the top of their scope, but only their declaration is hoisted, not their initialization and assigned value undefined.

2. Variables declared with let and const are also hoisted, but they are not initialized, leading to a "Temporal Dead Zone" until they are declared in the code.Accessing them during this time leads to a ReferenceError.