// Catálogo de máquinas
const machines = [
  {
    id: 1,
    name: "Generador Lusqtoff LG7500EX",
    description: "Generador a explosión ideal para obras y eventos. Potencia máxima 7500W.",
    price: 5000,
    image: `<img src="grupo%20electrogeno.PNG" alt="Generador" class="machine-image">`,
    category: "generadores"
  },
  {
    id: 2,
    name: "Rotomartillo Demoledor DeWalt",
    description: "Rotomartillo profesional DeWalt para trabajos pesados de demolición y perforación.",
    price: 3500,
    image: `<img src="rotomartillo.PNG" alt="Rotomartillo" class="machine-image">`,
    category: "rotomartillos"
  },
  {
    id: 3,
    name: "Motobomba Lusqtoff 3\"",
    description: "Motobomba para extracción de agua, ideal para construcción y jardinería.",
    price: 2800,
    image: `<img src="motobomba.PNG" alt="Motobomba" class="machine-image">`,
    category: "motobombas"
  },
  {
    id: 4,
    name: "Vibroapisonador",
    description: "Compactador de suelo profesional para construcción y obras viales.",
    price: 4500,
    image: `<img src="vibroapisonador.PNG" alt="Vibroapisonador" class="machine-image">`,
    category: "compactadores"
  },
  {
    id: 5,
    name: "Desmalezadora Profesional",
    description: "Desmalezadora potente para trabajos de jardinería y limpieza de terrenos.",
    price: 2000,
    image: `<img src="desmalezadora.PNG" alt="Desmalezadora" class="machine-image">`,
    category: "desmalezadoras"
  }
];

// Renderizar catálogo
function renderCatalog() {
  const container = document.getElementById('catalog-container');
  container.innerHTML = '';

  machines.forEach(machine => {
    const card = document.createElement('div');
    card.className = 'machine-card';
    card.innerHTML = `
      <div class="machine-image">${machine.image}</div>
      <div class="machine-info">
        <h3 class="machine-title">${machine.name}</h3>
        <p class="machine-description">${machine.description}</p>
        <p class="machine-price">$${machine.price} / día</p>
        <button class="reserve-button" onclick="showDatePicker(${machine.id})">Reservar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Inicializar date picker
let picker = null;

function showDatePicker(machineId) {
  const datePickerContainer = document.querySelector('.date-picker-container');
  datePickerContainer.classList.add('active');
  
  if (!picker) {
    picker = new Litepicker({
      element: document.getElementById('date-range'),
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
      selectForward: true,
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
          if (date1 && date2) {
            showReservationForm(machineId, date1, date2);
          }
        });
      }
    });
  }
  
  document.querySelector('.date-picker-container').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function showReservationForm(machineId, startDate, endDate) {
  const reservationForm = document.getElementById('reservation-form');
  reservationForm.style.display = 'block';
  const machine = machines.find(m => m.id === machineId);
  
  // Calculate number of days
  const timeDiff = endDate.getTime() - startDate.getTime();
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const totalPrice = machine.price * days;

  // Format dates for display
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formHtml = `
    <div class="reservation-form-container">
      <h2>Reservar ${machine.name}</h2>
      <div class="form-group">
        <label for="dni">DNI:</label>
        <input type="text" id="dni" name="dni" required>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="startDate">Fecha de inicio:</label>
        <input type="text" id="startDate" name="startDate" value="${formatDate(startDate)}" readonly>
      </div>
      <div class="form-group">
        <label for="endDate">Fecha de fin:</label>
        <input type="text" id="endDate" name="endDate" value="${formatDate(endDate)}" readonly>
      </div>
      <div class="form-group">
        <label for="days">Días de alquiler:</label>
        <input type="text" id="days" name="days" value="${days}" readonly>
      </div>
      <div class="form-group">
        <label for="totalPrice">Precio total:</label>
        <input type="text" id="totalPrice" name="totalPrice" value="$${totalPrice}" readonly>
      </div>
      <button type="submit" class="reserve-button">Reservar</button>
      <input type="hidden" id="machineId" name="machineId" value="${machineId}">
    </div>
  `;
  reservationForm.innerHTML = formHtml;
}

function showConfirmationModal() {
  const modal = document.querySelector('.confirmation-modal');
  const confirmationContent = modal.querySelector('.confirmation-content');
  confirmationContent.innerHTML = `
    <h2>¡Gracias por tu reserva!</h2>
    <p>Enseguida nuestro asesor se comunicará contigo.</p>
    <button class="close-button" onclick="this.closest('.confirmation-modal').style.display='none'">Cerrar</button>
  `;
  modal.style.display = 'flex';
}

// Update the form submission handler
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    dni: e.target.dni.value,
    email: e.target.email.value,
    name: e.target.name.value,
    machineId: e.target.machineId.value,
    startDate: e.target.startDate.value,
    endDate: e.target.endDate.value,
    price: e.target.totalPrice.value 
  };

  try {
    // Here you would normally send the data to your server
    // For now, we'll just show the confirmation
    showConfirmationModal();
    e.target.reset();
  } catch (error) {
    console.error("Error:", error);
  }
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
});