document.addEventListener('DOMContentLoaded', () => {
    const openIconCart = document.getElementById('icon-cart');
    const closeIconCart = document.getElementById('close-icon-cart');
    const cartTab = document.getElementById('cart-tab');
    const itemCountElement = document.getElementById('logo_count');
    const listCart = document.getElementById('listcart');

    // Cart Array to store items
    let cart = [];

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = button.getAttribute('data-price');
            const itemImage = button.getAttribute('data-image'); // Get image URL
            addItemToCart({ name: itemName, price: itemPrice, image: itemImage });
        });
    });

    function addItemToCart(item) {
        cart.push(item); // Add item to cart array
        updateCartDisplay(); // Update cart display
        updateCartCount();  // Update cart count
    }

    function updateCartDisplay() {
        listCart.innerHTML = ''; // Clear current list

        if (cart.length === 0) {
            listCart.innerHTML = 'No items in cart.';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name} - ${item.price}</span>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                listCart.appendChild(cartItem);
            });

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    removeItemFromCart(index);
                });
            });
        }
    }

    function removeItemFromCart(index) {
        cart.splice(index, 1); // Remove item from cart array
        updateCartDisplay(); // Update cart display
        updateCartCount();  // Update cart count
    }

    function updateCartCount() {
        itemCountElement.textContent = cart.length; // Update cart count
    }

    // Open Cart Tab
    openIconCart.addEventListener('click', () => {
        document.body.classList.add('activeTabCart'); // Show the cart tab
        updateCartDisplay(); // Update the cart tab contents
    });

    // Close Cart Tab
    closeIconCart.addEventListener('click', () => {
        document.body.classList.remove('activeTabCart'); // Hide the cart tab
    });
});
