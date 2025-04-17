// Initialize cart and total price from localStorage (if available)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Add to cart function
function addToCart(item, price) {
  console.log(`Adding to cart: ${item} - KSH ${price}`);
  cart.push({ item, price });
  totalPrice += price;

  // Persist cart and total price in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('totalPrice', totalPrice);

  updateCart();
}

// Update cart dynamically
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  if (!cartItems || !totalPriceEl) {
    console.error("Cart elements not found in the DOM.");
    return;
  }

  cartItems.innerHTML = '';
  cart.forEach(({ item, price }) => {
    const li = document.createElement('li');
    li.textContent = `${item} - KSH ${price}`;
    cartItems.appendChild(li);
  });

  totalPriceEl.textContent = totalPrice.toFixed(2); // Format total price to 2 decimal places
}

// Handle order submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const deliveryDate = document.getElementById('delivery-date').value;
  if (!deliveryDate) {
    alert('Please select a delivery date.');
    return;
  }

  sendOrderEmail(deliveryDate);
  alert('Order placed successfully!');

  // Clear cart after order submission
  cart = [];
  totalPrice = 0;
  localStorage.removeItem('cart');
  localStorage.removeItem('totalPrice');
  updateCart();
});

// Send email via EmailJS
function sendOrderEmail(deliveryDate) {
  emailjs.send('service_le4lkf5', 'template_of6il3c', {
    cart: JSON.stringify(cart),
    totalPrice,
    deliveryDate,
  })
    .then(() => {
      console.log('Email sent successfully');
    })
    .catch(err => console.error('Email sending failed', err));
}

// Initialize EmailJS
emailjs.init('R7o5vXZj4pDkmFH_B');

// Update cart on page load
updateCart();
