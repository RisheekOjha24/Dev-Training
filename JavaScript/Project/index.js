document.getElementById('btn1').addEventListener('click', function() {
    fetchData('https://demo4609591.mockable.io/fruits');
});

document.getElementById('btn2').addEventListener('click', function() {
    fetchData('https://demo4609591.mockable.io/animals');
});

document.getElementById('btn3').addEventListener('click', function() {
    fetchData('https://demo4609591.mockable.io/colors'); 
});

document.getElementById('btn4').addEventListener('click', function() {
    fetchData('https://demo4609591.mockable.io/laptops'); 
});

function fetchData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateDOM(data.items); // Assuming the structure is { items: [...] }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            updateDOM([]);
        });
}

function updateDOM(items) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear previous data
    if (items.length > 0) {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.classList.add('list-group-item');
            dataList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No data available"; // Show message if no items
        listItem.classList.add('list-group-item');
        dataList.appendChild(listItem);
    }
}
