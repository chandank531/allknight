document.addEventListener("DOMContentLoaded", () => {
    // Load header and footer partials
    loadPartial('header.html', 'header-container', () => {
        // Initialize header functionalities
        updateCartCount();
        initDropdownMenu();
        setupSearchBar();
        initHamburgerMenu(); // Make sure this is called after the DOM is ready
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

    // Initialize sidebar functionality
    initSidebar();
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
    const nav = document.querySelector('nav ul');
    const navIcons = document.querySelector('.nav-icons');
    
    if (hamburger && nav && navIcons) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
            navIcons.classList.toggle('show');
            hamburger.classList.toggle('active');
        });
    } else {
        console.error('Hamburger menu, nav, or nav-icons element not found.');
    }
}

function initSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar'); // Add a close button if necessary

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        if (closeSidebar) {
            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('show');
            });
        }

        // Close sidebar when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        });
    } else {
        console.error('Sidebar or hamburger menu element not found.');
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
