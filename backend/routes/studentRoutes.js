const express = require('express');
const set_data = require('../controllers/studentController').set_data;
const getAllFiles = require('../controllers/studentController').getAllFiles;
const isAStudent = require('../controllers/studentController').isAStudent;

const router = express.Router();

router.post('/:id', set_data);
router.get('/allSubmitTypes', getAllFiles);
router.get('/isAvailabale/:id', isAStudent);

module.exports = router;
