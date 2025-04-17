// Initialize cart and total price
let cart = [];
let totalPrice = 0;

// Add to cart function
function addToCart(item, price) {
  cart.push({ item, price });
  totalPrice += price;
  updateCart();
}

// Update cart dynamically
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  cartItems.innerHTML = '';

  cart.forEach(({ item, price }) => {
    const li = document.createElement('li');
    li.textContent = `${item} - KSH ${price}`;
    cartItems.appendChild(li);
  });

  totalPriceEl.textContent = totalPrice;
}

// Handle order submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('customer-name').value;
  const email = document.getElementById('customer-email').value;
  const deliveryDate = document.getElementById('delivery-date').value;

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  sendOrderEmail(name, email, deliveryDate);
});

// Send email via EmailJS
function sendOrderEmail(name, email, deliveryDate) {
  emailjs.send('service_le4lkf5', 'template_of6il3c', {
    customer_name: name,
    customer_email: email,
    cart: JSON.stringify(cart),
    total_price: totalPrice,
    delivery_date: deliveryDate,
  })
    .then(() => {
      alert('Order placed successfully!');
      cart = []; // Clear the cart
      totalPrice = 0; // Reset the total price
      updateCart(); // Update the UI
    })
    .catch(err => console.error('Failed to send email:', err));
}

// Initialize EmailJS
emailjs.init('R7o5vXZj4pDkmFH_B');
