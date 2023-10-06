const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },
  filename: function (req, file, cb) {
    let nuevoNombre = Date.now() + path.extname(file.originalname);
    cb(null, nuevoNombre);
  },
});
const upload = multer({ storage: storage });

exports.upload = upload.single("imagen");

exports.uploadFile = (req, res) => {
  res.send({ data: "Enviando foto" });
};

//Middleware de manejo de errores anterior a multer

server.use((err, req, res, next) => {
  const { statusCode, message } = err;
  resError(res, statusCode, message);
});
