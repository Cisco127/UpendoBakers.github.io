// Handle order submission
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const deliveryDate = document.getElementById('delivery-date').value;

  if (!deliveryDate) {
    alert('Please select a delivery date.');
    return;
  }

  console.log(`Order placed with delivery date: ${deliveryDate}`);
  sendOrderEmail(deliveryDate);
});

// Send email via EmailJS
function sendOrderEmail(deliveryDate) {
  if (cart.length === 0) {
    alert('Your cart is empty! Please add items before placing an order.');
    return;
  }

  emailjs.send('service_le4lkf5', 'template_of6il3c', {
    cart: JSON.stringify(cart),
    totalPrice,
    deliveryDate,
  })
    .then(() => {
      alert('Order placed successfully! A confirmation email has been sent.');
      console.log('Email sent successfully');

      // Clear cart after successful order
      cart = [];
      totalPrice = 0;
      localStorage.removeItem('cart');
      localStorage.removeItem('totalPrice');
      updateCart();
    })
    .catch(err => {
      alert('Failed to place order. Please try again later.');
      console.error('Email sending failed:', err);
    });
}

// Initialize EmailJS
emailjs.init('Ysp1AqXg3LAEEV5RD');

// Update cart on page load
updateCart();
