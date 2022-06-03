const express = require('express');
const set_data = require('../controllers/studentController').set_data;
const getAllFiles = require('../controllers/studentController').getAllFiles;
const isAStudent = require('../controllers/studentController').isAStudent;

const router = express.Router();

router.post('/:id', set_data);
router.get('/isAvailabale/:email', isAStudent);
router.get('/allSubmitTypes', getAllFiles);

module.exports = router;
