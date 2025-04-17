// Initialize cart and total price from localStorage (if available)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Add to cart function
function addToCart(item, price) {
  console.log(`Adding item to cart: ${item} - KSH ${price}`);
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

  cartItems.innerHTML = ''; // Clear existing cart items
  cart.forEach(({ item, price }) => {
    const li = document.createElement('li');
    li.textContent = `${item} - KSH ${price}`;
    cartItems.appendChild(li);
  });

  totalPriceEl.textContent = totalPrice.toFixed(2); // Format total price to 2 decimal places
}

// Manual item addition
document.getElementById('manual-item-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const itemName = document.getElementById('manual-item-name').value.trim();
  const itemPrice = parseFloat(document.getElementById('manual-item-price').value);

  if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
    alert('Please provide valid item details.');
    return;
  }

  addToCart(itemName, itemPrice);

  // Clear the input fields
  document.getElementById('manual-item-name').value = '';
  document.getElementById('manual-item-price').value = '';
});

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
emailjs.init('Ysp1AqXg3LAEEV5RD');

// Update cart on page load
updateCart();
