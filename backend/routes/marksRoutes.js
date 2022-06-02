const express = require('express');
const { get_Marks: getMarks } = require('../controllers/marksController');

const addMark = require('../controllers/marksController').add_Mark;
const get_grps_Marks = require('../controllers/marksController').get_Marks;
const get_group_mark = require('../controllers/marksController').get_group_mark;

const router = express.Router();

router.post('/', addMark);
router.get('/', get_grps_Marks);
router.get('/groupmarks/:id', get_group_mark);

module.exports = router;
