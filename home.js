window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Adjust scrollY value based on when you want the effect to trigger
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function setContrastingTextColor(element) {
    const backgroundImage = getComputedStyle(element).backgroundImage;
    if (backgroundImage !== 'none') {
        const img = new Image();
        img.src = backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
        img.crossOrigin = "Anonymous"; // Handle potential CORS issues
        img.onload = function() {
            const avgColor = getAverageRGB(img);
            console.log("Average Color:", avgColor); // Debugging
            const textColor = getContrastYIQ(avgColor);
            console.log("Chosen Text Color:", textColor); // Debugging
            element.style.color = textColor;

            // Apply the text color to child elements if necessary
            const childElements = element.querySelectorAll('*');
            childElements.forEach(child => {
                child.style.color = textColor;
            });
        }
    }
}

function goToProductDetails(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product-details.html';
}

window.onload = function() {
    const heroSection = document.querySelector('.hero');
    const headerSection = document.querySelector('header');

    setContrastingTextColor(heroSection);
    setContrastingTextColor(headerSection);
}
