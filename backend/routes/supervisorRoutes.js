const express = require('express')
const getAllSupervisors = require('../controllers/supervisorController').getAllSupervisors

const router = express.Router();

router.get("/",getAllSupervisors);


module.exports = router;