const express = require('express')
const getAllSupervisors = require('../controllers/supervisorController').getAllRequestedSupervisors


const router = express.Router();

router.get("/",getAllSupervisors);

module.exports = router;