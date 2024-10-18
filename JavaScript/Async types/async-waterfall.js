const async = require('async');

// async working
// Sequential Execution: async.waterfall runs each function in the array one at a time. When one function finishes (using callback()), the control moves to the next function. This ensures the order of execution is maintained.

// Passing Data: Each function can pass its result to the next one by calling callback(null, result). The result is passed as an argument to the next function in the sequence, ensuring smooth data flow.

// Error Handling: The first argument in callback() is reserved for errors. If an error occurs, the control is transferred directly to a final error handler, skipping the remaining functions.

// async.waterfall, the final callback function is placed outside the array of functions because it is meant to handle the final result or any error after all the tasks in the waterfall have been executed.

async.waterfall([
  function(callback) {
    // Step 1: Fetch user data
    console.log("Step 1: Fetching user data...");
    const user = { id: 1, name: 'John' };
    
    // Simulate an async operation (e.g., database request)
    setTimeout(() => {
      callback(null, user);  // Calling the callback with 'null' (no error) and 'user'
    }, 1000);
  },
  function(user, callback) {
    // Step 2: Fetch user's orders using the 'user' data from Step 1
    console.log(`Step 2: Fetching orders for user ${user.name}...`);
    const orders = ['Order1', 'Order2'];
    
    // Simulate another async operation
    setTimeout(() => {
      callback(null, user, orders);  // Calling the callback with 'user' and 'orders'
    }, 1000);
  },
  function(user, orders, callback) {
    // Step 3: Process orders and notify user
    console.log(`Step 3: Processing orders for ${user.name}: ${orders.join(', ')}`);
    
    // Simulate final async operation
    setTimeout(() => {
      callback(null, `Orders processed and notification sent to ${user.name}`);  // Final result
    }, 1000);
  }
], function(err, result) {
  // Final callback
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Final result:", result);  // Output: "Orders processed and notification sent to John"
  }
});

