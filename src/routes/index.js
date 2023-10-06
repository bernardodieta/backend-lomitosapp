const {Router} = require('express');
const pool = require("../services/database");
const {sheltersControllers} = require('../controllers');
const validateName = require('../middlewares/validateName');
const controller  = require('../controllers/uploadControl');


const router = Router();



router.get('/shelters',validateName,sheltersControllers.getShelters);

router.get('/shelters/component',sheltersControllers.getShelterForComponent);

router.get('/shelters/:id', sheltersControllers.getShelterById);

router.post('/register',
controller.upload,
controller.uploadFile);

  

module.exports = router;
