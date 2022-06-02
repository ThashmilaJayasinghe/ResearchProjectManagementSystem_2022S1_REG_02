const express = require('express');
const router = express.Router();

const addSubmission =
	require('../controllers/submissionController').addSubmission;
const upload = require('../controllers/submissionController').upload;
const get_Group_Submissions =
	require('../controllers/submissionController').get_Group_Submissions;
const download = require('../controllers/submissionController').download;
const delete_submission =
	require('../controllers/submissionController').delete_submission;

router.post('/:id', upload.single('document'), addSubmission);
router.get('/getGroupSubmissions/:id', get_Group_Submissions);
// router.get('/:id', get_Group_Submissions);
router.get('/download/:id', download);

router.delete('/delete/:id', delete_submission);

module.exports = router;
