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

//DatePicker
$('#fechaNacimiento').datepicker();

//Validaciones de formulario 

function sumaTotal() {
  // Validaciones de formulario
  var nombre = document.forms["Formulario"]["nombre"].value;
  var email = document.forms["Formulario"]["email"].value;
  var fnace = document.forms["Formulario"]["fnace"].value;
  var telefono = document.forms["Formulario"]["telefono"].value;

  if (nombre == "") {
      alert("Por favor, ingresa tu nombre.");
      return false;
  }

  if (email == "") {
      alert("Por favor, ingresa tu correo electrónico.");
      return false;
  }

  if (fnace == "") {
    alert("Por favor, ingresa tu fecha de nacimiento.");
    return false;
  }

  if (telefono == "") {
    alert("Por favor, ingresa tu número de teléfono.");
    return false;
  }

  // Calcular precio total
  var plan = document.querySelector('input[name="plan"]:checked').value;
  var matricula = 5000;
  var precio;

  switch (plan) {
    case "clase":
          precio = 3000;
          break;
      case "individual":
          precio = 26000 + matricula;
          break;
      case "familiar":
      case "empresarial":
          precio = 22500 + matricula;
          break;
      case "estudiante":
      case "adulto_mayor":
          precio = 18500 + matricula;
          break;
      default:
          precio = 0;
          break;
  }

  // Mostrar el precio total en el formulario
  document.getElementById("precioTotal").innerHTML = "Precio total a pagar: ₡" + precio;

  // Aquí puedes enviar el formulario al correo electrónico
  document.getElementById("Formulario").submit();
}

function limpiarFormulario() {
  document.forms["Formulario"]["nombre"].value = "";
  document.forms["Formulario"]["email"].value = "";
  document.forms["Formulario"]["fnace"].value = "";
  document.forms["Formulario"]["telefono"].value = "";
}

function guardarLocal(){
  localStorage.setItem("fnace", fnace);
  localStorage.setItem("nombre", nombre);
  localStorage.setItem("email", email);
  localStorage.setItem("telefono", telefono);
}
function recuperarLocal(){
  var getlocal = localStorage.getItem("fnace");

  if(getlocal != null && getlocal != "" && getlocal != false && getlocal != undefined){
      document.getElementByName("nombre")[0].value = localStorage.getItem("nombre");
      document.getElementByName("email")[0].value = localStorage.getItem("email");
      document.getElementByName("fnace")[0].value = localStorage.getItem("fnace");
      document.getElementByName("telefono")[0].value = localStorage.getItem("telefono");
      sumaTotal();
  }
}
