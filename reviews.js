// Initial reviews data
const initialReviews = [
  {
    name: "Carlos Rodríguez",
    rating: 5,
    comment: "Excelente servicio y equipos en perfecto estado. El generador Lusqtoff que alquilé funcionó de maravilla durante todo el evento. El proceso de alquiler fue muy sencillo y el equipo de Construmec fue muy profesional.",
    equipment: "Generador Lusqtoff LG7500EX",
    date: "2024-01-15"
  },
  {
    name: "María Fernández",
    rating: 5,
    comment: "Primera vez que alquilo con ellos y quedé muy satisfecha. El rotomartillo DeWalt estaba como nuevo y me ayudaron a elegir el equipo adecuado para mi proyecto. Definitivamente volveré a alquilar con ellos.",
    equipment: "Rotomartillo Demoledor DeWalt",
    date: "2024-01-20"
  },
  {
    name: "Juan Pérez",
    rating: 4,
    comment: "Muy buena atención y equipos de calidad. La motobomba funcionó perfectamente para drenar el área de construcción. El personal fue muy amable y me explicó todo el funcionamiento del equipo.",
    equipment: "Motobomba Lusqtoff 3\"",
    date: "2024-01-25"
  },
  {
    name: "Laura Gómez",
    rating: 5,
    comment: "Servicio excepcional. El vibroapisonador estaba en excelentes condiciones y el rendimiento fue mejor de lo esperado. El proceso de entrega y devolución fue muy eficiente.",
    equipment: "Vibroapisonador",
    date: "2024-01-28"
  }
];

// Load reviews from localStorage or use initial reviews
let reviews = JSON.parse(localStorage.getItem('reviews')) || initialReviews;

// Star rating functionality
const starRating = document.querySelector('.star-rating');
const ratingInput = document.getElementById('rating');
const stars = starRating.querySelectorAll('.fa-star');

stars.forEach(star => {
  star.addEventListener('mouseover', function() {
    const rating = this.dataset.rating;
    highlightStars(rating);
  });

  star.addEventListener('click', function() {
    const rating = this.dataset.rating;
    ratingInput.value = rating;
    highlightStars(rating);
  });
});

starRating.addEventListener('mouseout', function() {
  const rating = ratingInput.value || 0;
  highlightStars(rating);
});

function highlightStars(rating) {
  stars.forEach(star => {
    const starRating = star.dataset.rating;
    star.classList.toggle('active', starRating <= rating);
  });
}

// Form submission
document.getElementById('review-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const newReview = {
    name: this.name.value,
    rating: parseInt(this.rating.value),
    comment: this.comment.value,
    equipment: this.equipment.value,
    date: new Date().toISOString().split('T')[0]
  };

  reviews.unshift(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  
  renderReviews();
  this.reset();
  highlightStars(0);
  
  alert('¡Gracias por tu reseña!');
});

// Render reviews
function renderReviews() {
  const container = document.getElementById('reviews-container');
  container.innerHTML = '';
  
  updateAverageRating();
  
  reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-card';
    
    const starsHTML = Array(5).fill('').map((_, i) => 
      `<i class="fas fa-star ${i < review.rating ? 'active' : ''}"></i>`
    ).join('');
    
    reviewElement.innerHTML = `
      <div class="review-header">
        <h4>${review.name}</h4>
        <div class="review-stars">${starsHTML}</div>
      </div>
      <p class="review-equipment">Equipo: ${review.equipment}</p>
      <p class="review-comment">${review.comment}</p>
      <p class="review-date">${formatDate(review.date)}</p>
    `;
    
    container.appendChild(reviewElement);
  });
}

// Update average rating
function updateAverageRating() {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = totalRating / reviews.length;
  
  document.getElementById('average-rating').textContent = average.toFixed(1);
  document.getElementById('total-reviews').textContent = reviews.length;
  
  const averageStars = document.getElementById('average-stars');
  averageStars.innerHTML = Array(5).fill('').map((_, i) => 
    `<i class="fas fa-star ${i < Math.round(average) ? 'active' : ''}"></i>`
  ).join('');
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Initial render
document.addEventListener('DOMContentLoaded', renderReviews);