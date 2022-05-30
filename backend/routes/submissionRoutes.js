const express = require('express');
const router = express.Router();

const addSubmission =
	require('../controllers/submissionController').addSubmission;
const upload = require('../controllers/submissionController').upload;
const get_Group_Submissions =
	require('../controllers/submissionController').get_Group_Submissions;
const download = require('../controllers/submissionController').download;

router.post('/:id', upload.single('document'), addSubmission);
router.get('/:id', get_Group_Submissions);
router.get('/download/:id', download);

module.exports = router;
