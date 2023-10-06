const { sheltersServices } = require("../services");
const { catchedAsync } = require("../utils");
const { response } = require("../utils");
const pool = require("../services/database");

const getShelters = async (req, res, next) => {
  const { name } = req.query;
  const shelters = name
    ? await sheltersServices.getShelterByName(name)
    : await sheltersServices.getAllShelters();

  response(res, 200, shelters);
};

const getShelterById = async (req, res) => {
  const { id } = req.params;
  const shelter = await sheltersServices.getShelterById(id);
  response(res, 200, shelter);
};

const getShelterForComponent = async (req, res) => {
  const shelters = await sheltersServices.getAllShelters();
  console.log(shelters);
  for (let i = 0; i < shelters.index; i++) {
    let contador = contador + 1;
    if (i >= 3) {
      break;
    }
  }
  response(res, 200, shelters);
};

const addShelter = async (req, res) => { 
  
  //console.log(imgRecived)
  
  response(res, 200, 'ok');
};
module.exports = {
  getShelters: catchedAsync(getShelters),
  getShelterById: catchedAsync(getShelterById),
  getShelterForComponent: catchedAsync(getShelterForComponent),
  addShelter: catchedAsync(addShelter),
};
