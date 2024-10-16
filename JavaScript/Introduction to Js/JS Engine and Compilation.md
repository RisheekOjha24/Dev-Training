# About Javascript
JavaScript is a programming language used to create interactive and dynamic content on websites.JavaScript was created by Brendan Eich in 1995. JavaScript is single-threaded,meaning it executes code sequentially, one line at a time.

Modern JavaScript engines use a combination of interpretation and Just-In-Time (JIT) compilation to enhance performance.

# JavaScript engine Working

1. Source Code: You write JavaScript code (the source code).

2. Parser: The source code goes into parser. 
The parser reads the source code.It checks for syntax errors and converts the source code into an Abstract Syntax Tree (AST). The AST is a tree-like representation of the structure of the code.

3. Compiler

The compiler takes the AST and translates it into bytecode.
This bytecode is a lower-level representation that is more efficient for execution.

4. Interpreter:

The interpreter executes the bytecode. It reads and processes the bytecode instructions line by line.
For most code, the interpreter handles this execution directly

5. Just-In-Time (JIT) Compiler:

While the interpreter is executing bytecode, it monitors which functions and code paths are frequently executed (known as "hot" code).example of hot code is loops.
When hot code is identified, the JIT compiler kicks in. It compiles this frequently executed bytecode into optimized machine code.

6. Execution of Bytecode:

During the bytecode execution, synchronous code runs immediately. This is the normal, linear flow of the program, where functions and statements are executed sequentially.
If there are asynchronous tasks (like callbacks, promises, timers, or event listeners), these tasks are offloaded to APIs (like Web APIs in browsers or Node.js APIs in a server environment). This offloading step triggers the JavaScript runtime.

