document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer partials
    loadPartial('header.html', 'header-container', () => {
        // Initialize header functionalities
        updateCartCount();
        initDropdownMenu();
        setupSearchBar();
        initHamburgerMenu();
    });

    loadPartial('footer.html', 'footer-container', () => {
        // Initialize footer functionalities
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
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('open');
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('open');
        });
    } else {
        console.error('Dropdown menu not found.');
    }
}

function setupSearchBar() {
    const searchBox = document.querySelector('.search-box');
    const searchIcon = document.querySelector('.icon-search');
    if (searchBox && searchIcon) {
        searchIcon.addEventListener('click', () => {
            searchBox.classList.toggle('active');
        });
    } else {
        console.error('Search box or icon element not found.');
    }
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
    } else {
        console.error('Hamburger menu or nav element not found.');
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

document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('open');
    document.querySelector('nav').classList.toggle('open');
});
