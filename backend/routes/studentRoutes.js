const express = require('express');
const set_data = require('../controllers/studentController').set_data

const router = express.Router();

router.post('/:id',set_data);

module.exports = router;

