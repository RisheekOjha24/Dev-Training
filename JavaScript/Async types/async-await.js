// async/await is a simpler way to handle asynchronous code (like Promises) without using .then() and .catch().

async function fetchData() {
    try {
      let response = await fetch('https://api.example.com/data');
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
  fetchData();
  