// Especificaciones detalladas de las máquinas
const specifications = [
  {
    id: 1,
    name: "Generador Lusqtoff LG7500EX",
    image: "grupo%20electrogeno.PNG",
    specs: {
      "Potencia Máxima": "7500W",
      "Voltaje": "220V",
      "Frecuencia": "50Hz",
      "Tipo de Motor": "4 tiempos OHV",
      "Capacidad de Tanque": "25L",
      "Autonomía": "8-10 horas",
      "Nivel de Ruido": "74dB",
      "Peso": "85kg",
      "Dimensiones": "68 x 52 x 56 cm",
      "Características Especiales": "Panel digital, Arranque eléctrico, Protección por bajo nivel de aceite"
    }
  },
  {
    id: 2,
    name: "Rotomartillo Demoledor DeWalt",
    image: "rotomartillo.PNG",
    specs: {
      "Potencia": "1500W",
      "Energía de Impacto": "8.8 Joules",
      "Golpes por Minuto": "2900 GPM",
      "Sistema Anti-Vibración": "Sí",
      "Peso": "6.1 kg",
      "Longitud": "477 mm",
      "Mango": "Lateral ajustable",
      "Velocidad Variable": "Sí",
      "Portaherramienta": "SDS-Max",
      "Incluye": "Maletín, puntas y cinceles"
    }
  },
  {
    id: 3,
    name: "Motobomba Lusqtoff 3\"",
    image: "motobomba.PNG",
    specs: {
      "Diámetro": "3 pulgadas",
      "Caudal Máximo": "1000 L/min",
      "Altura Máxima": "30m",
      "Motor": "7HP 4 tiempos",
      "Capacidad Tanque": "3.6L",
      "Autonomía": "2.5 horas",
      "Succión Máxima": "8m",
      "Peso": "28kg",
      "Dimensiones": "47 x 38 x 40 cm",
      "Uso Recomendado": "Agua limpia o poco sucia"
    }
  },
  {
    id: 4,
    name: "Vibroapisonador",
    image: "vibroapisonador.PNG",
    specs: {
      "Potencia": "6.5HP",
      "Fuerza de Impacto": "13.7 kN",
      "Frecuencia de Golpes": "450-650/min",
      "Tamaño de Zapata": "33 x 28 cm",
      "Velocidad de Avance": "10-13 m/min",
      "Capacidad Tanque": "2.8L",
      "Peso Operativo": "78kg",
      "Motor": "4 tiempos",
      "Profundidad Compactación": "Hasta 60cm",
      "Rendimiento": "225 m²/h"
    }
  },
  {
    id: 5,
    name: "Desmalezadora Profesional",
    image: "desmalezadora.PNG",
    specs: {
      "Potencia": "2.2HP",
      "Cilindrada": "43cc",
      "Capacidad Tanque": "1.1L",
      "Peso": "7.5kg",
      "Diámetro de Corte": "25.4cm",
      "RPM Máximas": "7500",
      "Sistema Anti-Vibración": "Sí",
      "Manillar": "Tipo Bicicleta",
      "Incluye": "Arnés profesional, herramientas",
      "Garantía": "1 año"
    }
  }
];

function renderSpecifications() {
  const container = document.getElementById('specs-container');
  specifications.forEach(item => {
    const card = document.createElement('div');
    card.className = 'specs-card';
    
    let specsList = '';
    for (const [key, value] of Object.entries(item.specs)) {
      specsList += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="specs-image">
      <div class="specs-details">
        <h3>${item.name}</h3>
        <ul class="specs-list">
          ${specsList}
        </ul>
      </div>
    `;
    container.appendChild(card);
  });
}

// Update index.html machine cards to include a link to specifications
document.addEventListener('DOMContentLoaded', () => {
  renderSpecifications();
});