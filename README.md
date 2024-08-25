/* Existing header styles remain unchanged for large screens */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap; /* Prevent wrapping of the header items */
    padding: 20px 40px;
    background-color: transparent;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: background-color 0.5s ease-in-out, padding 0.3s ease-in-out;
}

header.scrolled {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Logo Styles */
.logo {
    font-size: 28px;
    font-weight: bold;
    color: #fd2f00;
    line-height: 1;
    transition: transform 0.3s ease-in-out;
    align-self: center;
}

.logo::before {
    content: 'ALL';
    font-size: 28px;
}

.logo::after {
    content: 'NIGHT';
    font-size: 28px;
}

.logo span {
    font-size: 34px;
    font-weight: bold;
    color: #fd2f00;
}

/* Navigation Styles */
nav ul {
    display: flex;
    list-style: none;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
    flex-wrap: nowrap; /* Prevent wrapping */
}

header.scrolled nav ul {
    opacity: 0.8;
}

nav ul li {
    margin-right: 30px;
    white-space: nowrap; /* Prevent text wrapping */
}

nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 14px;
    transition: color 0.3s ease;
}

nav ul li a:hover {
    color: #fd2f00;
}

/* Icon Styles */
.nav-icons {
    display: flex;
    align-items: center;
}

.nav-icons a {
    margin-left: 20px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 14px;
}

.nav-icons a:hover {
    color: #fd2f00;
}

.search-box {
    margin-left: 20px;
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    outline: none;
    color: black;
    transition: transform 0.3s ease;
}

.search-box:focus {
    transform: scale(1.05);
}

.search-box::placeholder {
    color: #666;
}

/* Hamburger Menu Styles */
.hamburger {
    display: none;
}

/* Responsive Styles for Small Screens */
@media (max-width: 768px) {
    header {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 15px 20px;
    }

    .logo {
        margin-bottom: 15px;
    }

    nav ul,
    .nav-icons {
        display: none;
    }

    .hamburger {
        display: block;
        cursor: pointer;
        margin-top: 10px;
    }

    .hamburger div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 5px 0;
        transition: all 0.3s ease;
    }

    .show {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        animation: slideDown 0.5s ease-in-out;
        justify-content: center;
    }

    .show nav ul li,
    .show .nav-icons a,
    .show .search-box {
        margin-bottom: 20px; /* Adjust spacing between nav items, icons, and search box */
    }

    .show .nav-icons {
        margin-top: 15px; /* Add spacing before icons */
        margin-bottom: 15px; /* Add spacing after icons */
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
}

/* Adjustments for Medium-Sized Screens (700px - 780px) */
@media (max-width: 780px) and (min-width: 700px) {
    nav ul li {
        margin-right: 20px;
    }

    nav ul li a {
        font-size: 13px;
    }

    .logo {
        font-size: 26px; /* Adjust logo size if necessary */
    }
}
