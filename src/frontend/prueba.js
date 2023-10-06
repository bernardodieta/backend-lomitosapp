// let contenido = document.getElementById('contenido');
// const data = [];

// const traerDatos = () => {
//   fetch('http://localhost:3000/shelters/2')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('La solicitud no se pudo completar.');
//     }
//     return response.json();
//   })
//   .then(data => {
   
//     let newData = JSON.stringify(data);
//     contenido.innerHTML = `${newData}`
//     // Aquí puedes usar los datos recibidos en tu frontend
//     console.log(data);
//     return data
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// traerDatos();


// document.getElementById('uploadForm').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   const imagenInput = document.getElementById('imagenInput');
//   formData.append('imagen', imagenInput.files[0]);

//   fetch('http://localhost:3000/shelters/register', {
//       method: 'POST',
//       body: formData,
//   })
//   .then(response => response.json())
//   .then(data => {
//       document.getElementById('respuesta').textContent = `Imagen subida a: ${data.ruta}`;
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// });