// Avoiding Global Scope Pollution:
// Variables declared inside an IIFE are confined to the IIFE's local scope. This prevents variables from leaking into the global scope, which could otherwise lead to conflicts with other scripts.
(function() {
    let a = 5;
    console.log(a); // Output: 5
})();