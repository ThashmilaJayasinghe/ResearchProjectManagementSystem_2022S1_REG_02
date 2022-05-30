const express = require('express');
const isAStudent = require('../controllers/studentController').isAStudent
const set_data = require('../controllers/studentController').set_data

const router = express.Router();

router.post('/:id',set_data);
router.get('/isAvailabale/:id', isAStudent);

module.exports = router;

