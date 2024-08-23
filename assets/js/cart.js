// cart.js

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = button.dataset.name;
            const itemPrice = button.dataset.price;
            const itemImage = button.dataset.image;
            const itemQuantity = 1; // Default quantity

            addToCart(itemName, itemPrice, itemImage, itemQuantity);
        });
    });

    function addToCart(name, price, image, quantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, image, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    }

    // Display Cart Items on Cart Page
    const cartSection = document.querySelector('.cart-section');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h2>${item.name}</h2>
                    <p class="price">${item.price}</p>
                    <p class="description">Brief description of the product goes here.</p>
                    <div class="cart-item-quantity">
                        <label for="quantity-${item.name}">Quantity:</label>
                        <input type="number" id="quantity-${item.name}" name="quantity" value="${item.quantity}" min="1">
                    </div>
                    <button class="remove-item" data-name="${item.name}">Remove Item</button>
                </div>
            `;

            cartSection.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(button.dataset.name);
            });
        });

        function removeFromCart(productName) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.filter(item => item.name !== productName);

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            location.reload();
        }
    }
});
