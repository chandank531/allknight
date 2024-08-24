document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer partials
    loadComponent('header-container', 'header.html', () => {
        const cartIcon = document.querySelector('.icon-cart');
        if (cartIcon) {
            updateCartCount();
        } else {
            console.error('Cart icon element not found in header.');
        }
    });

    loadComponent('footer-container', 'footer.html');

    // Handle scroll behavior
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) { // Adjust scrollY value based on when you want the effect to trigger
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

function loadPartial(partialPath, elementId, callback) {
    fetch(partialPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback(); // Execute callback after loading
        })
        .catch(error => console.error('Error loading partial:', error));
}

function updateCartCount() {
    const cartIcon = document.querySelector('.icon-cart');
    if (!cartIcon) {
        console.error('Cart icon not found.');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartIcon.textContent = `🛒 CART (${itemCount})`;
}
