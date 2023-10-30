document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Sample cart items
    const cartItems = [
        { name: 'Sample Item 1', price: 20.00 },
        { name: 'Sample Item 2', price: 30.00 }
    ];

    // Function to update the cart view
    function updateCartView() {
        const cartTable = document.querySelector('.cart-page table');
        const cartItemsElement = cartTable.querySelector('#cart-items');

        // Clear the existing items
        cartItemsElement.innerHTML = '';

        let total = 0;

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;

            const quantityCell = document.createElement('td');
            quantityCell.textContent = cart[item.name] || 0;

            const subtotalCell = document.createElement('td');
            const subtotal = (cart[item.name] || 0) * item.price;
            subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
            total += subtotal;

            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(subtotalCell);

            cartItemsElement.appendChild(row);
        });

        // Update the total price
        const totalCell = cartTable.querySelector('#total-price');
        totalCell.textContent = `$${total.toFixed(2)}`;
    }

    // Call the updateCartView function to populate the cart initially
    updateCartView();
});

// Sample HTML for "Buy Now" button
// Replace this with your actual HTML structure
const buyNowButton = document.querySelector(".buy-now-button");

buyNowButton.addEventListener("click", function () {
    const productKey = buyNowButton.getAttribute("data-product");

    if (cart[productKey]) {
        cart[productKey]++;
    } else {
        cart[productKey] = 1;
    }

    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Calculate and display the total price
    updateCartView();
});
