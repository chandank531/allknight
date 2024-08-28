document.addEventListener('DOMContentLoaded', function() {
    // Function to handle adding items to cart
    function addToCart(name, price, image, quantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price: parseFloat(price.replace('$', '')), image, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
        displayCart(); // Refresh cart display after adding item
    }

    // Function to display cart items in the table
    function displayCart() {
        const cartTableBody = document.querySelector('.cart-table tbody');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        } else {
            cartTableBody.innerHTML = ''; // Clear any previous content

            cart.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        ${item.description || 'No description'}
                        <div class="dropdowns">
                            <!-- Sample dropdowns, update as needed -->
                            <label>What Color Magneton (H80) do I want?
                                <select>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                </select>
                            </label>
                            <label>NEW - Make my Hardwear Magneton (H80) a half size tighter?
                                <select>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </label>
                        </div>
                    </td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><a href="#" class="remove-item" data-name="${item.name}">Remove</a></td>
                `;

                cartTableBody.appendChild(row);
            });

            // Attach event listeners for remove buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default link behavior
                    removeFromCart(button.dataset.name);
                });
            });

            // Update the total
            updateTotal();
        }
    }

    // Function to handle removal of items from cart
    function removeFromCart(productName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== productName);

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(); // Refresh cart display
    }

    // Function to update the total amount
    function updateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const totalElement = document.querySelector('.total');
        if (totalElement) {
            totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
        }
    }

    // Initial display of cart items when page loads
    displayCart();

    // Example event listener setup for adding items to cart
    // Make sure you have elements with the class 'add-to-cart' and data attributes in your actual HTML
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price.replace('$', ''));
            const itemImage = button.dataset.image;
            const itemQuantity = 1; // Default quantity

            addToCart(itemName, itemPrice, itemImage, itemQuantity);
        });
    });
});
