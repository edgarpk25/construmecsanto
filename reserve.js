// Initialize page with URL parameters
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const equipment = params.get('equipment');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const totalPrice = params.get('totalPrice');
  const days = params.get('days');
  
  if (equipment) {
    const equipmentSelect = document.getElementById('equipment');
    equipmentSelect.value = equipment;
  }
  
  if (startDate && endDate) {
    const datesInput = document.getElementById('dates');
    datesInput.value = `${startDate} - ${endDate}`;
  }

  // Add total price display if available
  if (totalPrice && days) {
    const priceInfo = document.createElement('div');
    priceInfo.className = 'price-info';
    priceInfo.innerHTML = `
      <p>Período de alquiler: ${days} días</p>
      <p>Precio total: $${totalPrice}</p>
    `;
    document.querySelector('.reservation-container').insertBefore(
      priceInfo,
      document.querySelector('.submit-button')
    );
  }
});

// Initialize date picker
const picker = new Litepicker({
  element: document.getElementById('dates'),
  singleMode: false,
  tooltipText: {
    one: 'día',
    other: 'días'
  },
  tooltipNumber: (totalDays) => totalDays,
  minDate: new Date(),
  maxDays: 30,
  lang: 'es-ES',
  format: 'DD/MM/YYYY',
  selectForward: true
});

// Update form submission to redirect to payment page
document.getElementById('email-reservation-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const params = new URLSearchParams(window.location.search);
  
  // Combine form data with URL parameters
  const paymentParams = new URLSearchParams({
    equipment: formData.get('equipment'),
    startDate: params.get('startDate'),
    endDate: params.get('endDate'),
    totalPrice: params.get('totalPrice'),
    days: params.get('days'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone')
  });

  // Redirect to payment page
  window.location.href = `payment.html?${paymentParams.toString()}`;
});