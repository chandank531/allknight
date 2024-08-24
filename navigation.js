document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer partials
    loadPartial('header.html', 'header-container', () => {
        // Existing header functionality here
        const cartIcon = document.querySelector('.icon-cart');
        if (cartIcon) {
            updateCartCount();
        } else {
            console.error('Cart icon element not found in header.');
        }

        // Any other header-specific initialization
        initDropdownMenu();
        setupSearchBar();
    });

    loadPartial('footer.html', 'footer-container', () => {
        // Existing footer functionality here
        initFooterLinks();
    });

    // Handle scroll behavior for the header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        } else {
            console.error('Header element not found.');
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

function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
    });
}

function setupSearchBar() {
    const searchBar = document.querySelector('.search-bar');
    const searchIcon = document.querySelector('.icon-search');
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            searchBar.classList.toggle('active');
        });
    } else {
        console.error('Search icon element not found.');
    }
}

function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target section not found for link:', link.getAttribute('href'));
            }
        });
    });
}
