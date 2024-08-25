document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (product) {
        document.querySelector('.product-info h1').innerText = product.name;
        document.querySelector('.product-info .price').innerText = product.price;
        document.querySelector('.product-info .description').innerText = product.description;
        document.querySelector('.product-image img').src = product.image;
    } else {
        console.error('No product selected');
    }

    const addToCartButton = document.querySelector('.add-to-cart');
    const quantityInput = document.getElementById('quantity');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productName = document.querySelector('.product-info h1').textContent;
            const productPrice = document.querySelector('.product-info .price').textContent;
            const productImage = document.querySelector('.product-image img').src;
            const quantity = parseInt(quantityInput.value, 10);

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity
            };

            addToCart(product);
        });
    } else {
        console.error('Add to Cart button not found.');
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.name === product.name);

        if (existingProductIndex !== -1) {
            // Update quantity if product already exists in the cart
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart!');
    }

    function updateCartCount() {
        const cartIcon = document.querySelector('.icon-cart');
        if (!cartIcon) {
            console.error('Cart icon not found in product details page.');
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
        cartIcon.textContent = `🛒 CART (${itemCount})`;
    }

});

function changeMedia(src, type) {
    console.log(`Changing media to: ${src}, type: ${type}`); // Debugging line
    const mediaImg = document.getElementById('main-media');
    const mediaVideo = document.getElementById('main-video');
    
    if (type === 'image') {
        if (mediaImg) {
            mediaImg.src = src;
            mediaImg.classList.add('media-active');
            mediaImg.classList.remove('media-inactive');
        }
        if (mediaVideo) {
            mediaVideo.classList.remove('media-active');
            mediaVideo.classList.add('media-inactive');
            mediaVideo.pause(); // Stop video if it's playing
        }
    } else if (type === 'video') {
        console.log('Video source:', src); // Debugging line
        if (mediaVideo) {
            const videoSource = mediaVideo.querySelector('source');
            if (videoSource) {
                videoSource.src = src;
                mediaVideo.load(); // Load the new video source
                mediaVideo.classList.add('media-active');
                mediaVideo.classList.remove('media-inactive');
                mediaVideo.play(); // Automatically play video if desired
            }
        }
        if (mediaImg) {
            mediaImg.classList.remove('media-active');
            mediaImg.classList.add('media-inactive');
        }
    }
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



