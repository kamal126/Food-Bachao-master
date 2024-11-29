// Function to submit form data
document.getElementById('foodForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const foodData = {
        foodName: document.getElementById('foodName').value,
        quantity: document.getElementById('quantity').value,
        location: document.getElementById('location').value,
        expiry: document.getElementById('expiry').value,
        notes: document.getElementById('notes').value,
    };

    try {
        await fetch('http://localhost:5000/addFood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodData),
        });
        alert("Food added successfully!");
        loadFoodData();
    } catch (err) {
        console.error("Error adding food:", err);
    }
});

// Function to fetch and display food data
async function loadFoodData() {
    const response = await fetch('http://localhost:5000/getFood');
    const foods = await response.json();
    
    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // Clear previous cards

    foods.forEach(food => {
        const card = document.createElement('div');
        card.classList.add('food-card');
        
        card.innerHTML = `
            <div class="food-card-img">
                <img src="default.jpg" alt="${food.foodName}">
                <span class="status">Available</span>
            </div>
            <div class="food-card-content">
                <h2>${food.foodName}</h2>
                <div class="details">
                    <div><strong>Food Quantity:</strong> ${food.quantity}</div>
                    <div><strong>Pickup Location:</strong> ${food.location}</div>
                    <div><strong>Expired Time:</strong> ${food.expiry} hr</div>
                </div>
                <div class="notes">
                    <strong>Donor Notes:</strong>
                    <p>${food.notes}</p>
                </div>
                <button class="view-details-btn">View Details</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load food data on page load
document.addEventListener('DOMContentLoaded', loadFoodData);
