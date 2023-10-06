const multer = require("multer");
const path = require("path");
const sharp = require("sharp"); // Importa la biblioteca sharp
const fs = require("fs"); // Importa el módulo 'fs' para trabajar con archivos
const { sheltersServices } = require("../services");
const rutaImagenProcesada = [];
const nuevaR = [];
// Configuración para permitir solo archivos .jpg y .png
const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // Aceptar el archivo si es de tipo imagen JPEG o PNG
    cb(null, true);
  } else {
    // Rechazar el archivo si no es de tipo imagen JPEG o PNG
    cb(new Error("Solo se permiten archivos JPG y PNG"), false);
  }
};

const storage = multer.memoryStorage(); // Almacena las imágenes en la memoria antes de procesarlas

const upload = multer({
  storage: storage,
  fileFilter: imageFilter, // Aplicar el filtro de archivos de imagen
  limits: { files: 5 }, // Límite de 5 archivos por solicitud
});

exports.upload = (req, res, next) => {
  // Declarar un objeto para almacenar las rutas de las imágenes procesadas
  const rutasImagenesProcesadas = {};

  upload.array("imagen", 5)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Si es un error de Multer, convertirlo en un objeto de error personalizado
      const customError = new Error("Error al subir el archivo");
      customError.statusCode = 400; // Puedes definir el código de estado que desees
      next(customError);
    } else if (err) {
      // Si es un error desconocido, pasar el error al siguiente middleware de errores
      next(err);
    } else {
      // Si no hay errores, procesar y redimensionar cada imagen
      try {
        let imagenesProcesadas = 0; // Contador de imágenes procesadas con éxito

        if (req.files && req.files.length > 0) {
          for (const file of req.files) {
            const imagen = sharp(file.buffer); // Utilizar el buffer de la imagen en memoria
            // Redimensionar la imagen a un tamaño máximo (por ejemplo, 800x800 píxeles)
            imagen.resize(800, 800);
            // Comprimir la imagen (ajusta la calidad según sea necesario)
            imagen.jpeg({ quality: 80 });

            // Generar un nombre de archivo único para la imagen procesada
            const nuevoNombre = Date.now() + "_procesada.jpg"; // Por ejemplo, cambiar la extensión a .jpg
            const rutaImagenProcesada = path.join(
              "./src/public/uploads",
              nuevoNombre
            );

            await imagen.toFile(rutaImagenProcesada); // Guardar la imagen procesada en un archivo diferente

            // Almacenar la ruta de la imagen procesada en el objeto
            rutasImagenesProcesadas[`imagen${imagenesProcesadas + 1}`] = rutaImagenProcesada;
            imagenesProcesadas++;

            // Borra la imagen original del buffer de la solicitud para que no se almacene
            // const index = req.files.indexOf(file);
            // if (index > -1) {
            //   req.files.splice(index, 1);
            // }
          }
        }

        // Continuar con el procesamiento después de que todas las imágenes se hayan procesado con éxito
        if (imagenesProcesadas === req.files.length) {
          const {
            nombre,
            apellido,
            email,
            candog,
            canper,
            nombrevet,
            apellvet,
            celular,
            veterinaria,
            textarea1,
            nombrerefu,
            direccion,
            cp,
            ciudad,
            estado,
            bank,
            bankc,
            titularcuenta,
          } = req.body;

          const refugioData = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            candog: candog,
            canper: canper,
            nombrevet: nombrevet,
            apellvet: apellvet,
            celular: celular,
            veterinaria: veterinaria,
            textarea1: textarea1,
            nombrerefu: nombrerefu,
            direccion: direccion,
            cp: cp,
            ciudad: ciudad,
            estado: estado,
            bank: bank,
            bankc: bankc,
            titularcuenta: titularcuenta,
            imagen1 : rutasImagenesProcesadas.imagen1,
            imagen2 : rutasImagenesProcesadas.imagen2,
            imagen3 : rutasImagenesProcesadas.imagen3,
            imagen4 : rutasImagenesProcesadas.imagen4,
            imagen5 : rutasImagenesProcesadas.imagen5, // Agregar las rutas de las imágenes procesadas al objeto refugioData
          };
          await sheltersServices.saveShelters(refugioData);
          // Continuar con la próxima función de middleware
          next();
        } else {
          // Si no se procesaron todas las imágenes con éxito, generar un error
          const customError = new Error("No se procesaron todas las imágenes con éxito");
          customError.statusCode = 400;
          console.log(customError)
          next(customError);
        }
      } catch (error) {
        // Manejar errores durante el procesamiento de las imágenes
        next(error);
      }
    }
  });
};

exports.uploadFile = (req, res) => {
  res.send({ data: "Enviando fotos" });
};
