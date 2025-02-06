document.addEventListener('DOMContentLoaded', () => {
  // Obtener parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const equipment = params.get('equipment');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const totalPrice = params.get('totalPrice');
  const days = params.get('days');
  const name = params.get('name');
  const email = params.get('email');
  const phone = params.get('phone');

  // Mostrar resumen de la reserva
  const summaryContainer = document.querySelector('.reservation-summary');
  summaryContainer.innerHTML = `
    <div class="summary-details">
      <h3>Detalles de la Reserva</h3>
      <p><strong>Equipo:</strong> ${equipment}</p>
      <p><strong>Fecha inicio:</strong> ${startDate}</p>
      <p><strong>Fecha fin:</strong> ${endDate}</p>
      <p><strong>Días:</strong> ${days}</p>
      <p><strong>Total a pagar:</strong> $${totalPrice}</p>
      <hr>
      <p><strong>Cliente:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
    </div>
  `;

  // Configurar Mercado Pago
  const mp = new MercadoPago('TU_PUBLIC_KEY', {
    locale: 'es-AR'
  });

  // Botón de Mercado Pago
  document.querySelector('.payment-method-btn.mercadopago').addEventListener('click', () => {
    mp.checkout({
      preference: {
        items: [{
          title: `Alquiler ${equipment}`,
          unit_price: parseFloat(totalPrice),
          quantity: 1,
        }]
      },
      render: {
        container: '#wallet_container',
        label: 'Pagar ahora'
      }
    });
  });

  // Botón de pago en efectivo
  document.querySelector('.payment-method-btn.cash').addEventListener('click', () => {
    // Enviar email de confirmación
    sendConfirmationEmail({
      equipment,
      startDate,
      endDate,
      totalPrice,
      days,
      name,
      email,
      phone,
      paymentMethod: 'cash'
    });

    // Mostrar mensaje de confirmación
    alert('¡Reserva confirmada! Te hemos enviado un email con los detalles. Por favor, presenta el email al momento de retirar el equipo.');
    window.location.href = 'index.html';
  });
});

async function sendConfirmationEmail(data) {
  // Aquí implementarías la lógica para enviar el email
  // Por ahora solo simulamos el envío
  console.log('Enviando email de confirmación:', data);
}