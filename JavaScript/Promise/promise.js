// A Promise in JavaScript is a constructor function that represents the eventual completion (or failure) of an asynchronous operation. 
// A Promise can be in one of three states:
// Pending: The operation is ongoing.
// Fulfilled: The operation completed successfully.
// Rejected: The operation failed.

let myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
      resolve("Task completed");
    } else {
      reject("Task failed");
    }
  });
  
  myPromise.then(result => {
    console.log(result);  // "Task completed"
}).catch(error => {
    console.log(error);  // "Task failed"
});

