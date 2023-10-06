const express = require("express");
const morgan = require("morgan");
const path = require("path");
const resError = require("./utils/resError");
const cors = require("cors");
const multer = require("multer");
const {storage} = require('./routes/index')


const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


const upload = multer({ storage: storage });
server.use(require("./routes"));

server.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400; // Por defecto, usar 500 si no se proporciona un código de estado
  const message = err.message || "Error interno del servidor"; // Por defecto, usar un mensaje genérico
  res.status(statusCode).json({ error: message });
});



module.exports = server;
