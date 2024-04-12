//Metodo que lee la API en formato JSON y carga las imagenes de las propias marcas.

function cargarImagenes() {
    const apiUrl = 'https://raw.githubusercontent.com/Ecka2304/json.github.io/A/marcas.json'; // URL directa al archivo JSON
    const contenedor = document.querySelector(".swiper-wrapper1");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(marca => {
                const imagen = marca.imagen;
                const imagenMarca = document.createElement("img");
                imagenMarca.src = imagen;
                contenedor.appendChild(imagenMarca);
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

cargarImagenes();