const express = require('express');
const {get_Marks: getMarks} = require("../controllers/marksController");

const addMark = require('../controllers/marksController').add_Mark
const get_grps_Marks = require('../controllers/marksController').get_Marks

const router = express.Router();

//Mark add & get routes
router.post('/', addMark);
router.get('/', get_grps_Marks);

module.exports = router;