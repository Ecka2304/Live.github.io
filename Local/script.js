$(document).ready(function() {

 $('#carousel1').hide().fadeIn(3000);

});

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

//Google Maps Api



mapboxgl.accessToken = 'pk.eyJ1Ijoia2NoYXZlcyIsImEiOiJjbG8zM3ZkNXoxcHZ3MmxxZWl1a3NhYmh2In0.2i7RGPqWoXmnaQizvPGXvQ'; // Reemplaza 'TU_ACCESS_TOKEN' con tu Access Token de Mapbox

// Obtener ubicación del usuario
navigator.geolocation.getCurrentPosition(function(position) {
var userLocation = [position.coords.longitude, position.coords.latitude];

// Crear un mapa centrado en la ubicación del usuario
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9', // Estilo satelital
    center: userLocation,
    zoom: 15
});

// Agregar marcador personalizado para la ubicación del usuario
new mapboxgl.Marker({ color: 'blue' }) // Puedes cambiar el color o usar una imagen personalizada
    .setLngLat(userLocation)
    .addTo(map);

// Coordenadas de la sucursal de la empresa 
var empresaLocation = [-84.2996489221693, 10.120389159553955]; 

// Agregar marcador personalizado para el destino
map.loadImage(
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
    function(error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        map.addLayer({
            id: 'destination',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: empresaLocation
                        }
                    }]
                }
            },
            layout: {
                'icon-image': 'custom-marker',
                'icon-size': 0.5
            }
        });
    }
);

// Calcular ruta desde la ubicación del usuario hasta la sucursal
map.on('load', function() {
var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
    userLocation[0] + ',' + userLocation[1] + ';' +
    empresaLocation[0] + ',' + empresaLocation[1] +
    '?steps=true&geometries=geojson&alternatives=true&access_token=' + mapboxgl.accessToken;

fetch(directionsRequest)
    .then(response => response.json())
    .then(data => {
        // Obtener la ruta más corta (primera en la lista de alternativas)
        var route = data.routes[0];

        // Calcular el tiempo estimado de llegada (ETA) y la distancia de la ruta principal
        var duration = route.duration / 60; // Duración en minutos
        var distance = route.distance / 1000; // Distancia en kilómetros

        // Mostrar el tiempo estimado de llegada y la distancia en el DOM
        var etaText = (duration >= 1) ? Math.round(duration) + ' minutos' : '1 minuto';
        document.getElementById('eta').textContent = etaText;
        document.getElementById('distance').textContent = distance.toFixed(1) + ' km';

        // Mostrar la ruta en el mapa
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: route.geometry
                }
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 8
            }
        });
    });
  });
}); 