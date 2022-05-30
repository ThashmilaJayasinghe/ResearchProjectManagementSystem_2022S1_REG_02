const express = require('express');
// const { getAllSupervisors } = require('../controllers/supervisorController');
const addStaff = require('../controllers/staffController').addStaff;
const getAllSupervisors =
	require('../controllers/staffController').getAllSupervisors;

const router = express.Router();

router.post('/', addStaff);
router.get('/', getAllSupervisors);

module.exports = router;
