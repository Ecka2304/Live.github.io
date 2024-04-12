
// Obtener referencia al contenedor del slider
const slideContainer = document.querySelector('.slide-container');

// Duplicar las imágenes dentro del contenedor
const images = slideContainer.querySelectorAll('img');
const imagesClone = Array.from(images).map(img => img.cloneNode(true));

// Agregar las imágenes clonadas al final del contenedor
imagesClone.forEach(img => slideContainer.appendChild(img));

// Calcular la anchura total del slider
const totalWidth = images.length * images[0].clientWidth;

// Animar el desplazamiento
let currentPosition = 0;
function slide() {
  currentPosition -= 1;
  if (currentPosition <= -totalWidth) {
    currentPosition = 0;
  }
  slideContainer.style.transform = `translateX(${currentPosition}px)`;
}
setInterval(slide, 10);