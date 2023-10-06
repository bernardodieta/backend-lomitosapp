const { ClientError } = require("../utils/errors");
const pool = require("../services/database");

const data = [
  { id: 1, title: "Refugio Animal" },
  { id: 2, title: "Animales Sagrados" },
  { id: 3, title: "La Casa del Perro" },
];

const getAllShelters = async () => {
  const shelters = pool.query('SELECT * FROM refugios');
  return shelters;
};

const getShelterById = async (id) => {
  const shelter = pool.query('SELECT * FROM refugios WHERE id = ?', [id]);
  if (!shelter) throw new ClientError("Invalid Id",400)
  return shelter;
};

const getShelterByName = async (name) => {
  const shelters = data.filter((e) => e.title == name);
  return shelters;
}

const saveShelters = async (refugioData) => {
  console.log(refugioData)
  const adding = pool.query("INSERT INTO refugios set ?", [refugioData]);
  if (!adding) throw new ClientError("Ocurrio un error al guardar",400)
  return adding;
};



module.exports={
getAllShelters,
getShelterById,
getShelterByName,
saveShelters,
}