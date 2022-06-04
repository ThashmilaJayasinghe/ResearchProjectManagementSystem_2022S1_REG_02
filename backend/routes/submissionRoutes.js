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

//require Panel submission routes
const get_PanelPresentations = require('../controllers/SubmissionController').get_Panel_Presentations;
const get_SupervisorDocuments = require('../controllers/submissionController').get_Supervisor_documents;
const get_co_SupervisorDocuments = require('../controllers/submissionController').get_co_Supervisor_Documents;
const update_SubmissionStatus = require('../controllers/submissionController').update_Submission_Status;

router.post('/:id', upload.single('document'), addSubmission);
router.get('/getGroupSubmissions/:id', get_Group_Submissions);
// router.get('/:id', get_Group_Submissions);
router.get('/download/:id', download);

router.delete('/delete/:id', delete_submission);

//panel submission routes
router.get('/panelPresentations', get_PanelPresentations)
router.get('/SupervisorDocuments', get_SupervisorDocuments);
router.get('/co-supervisorDocuments', get_co_SupervisorDocuments);
router.put('/updateSubmissionStatus', update_SubmissionStatus);


module.exports = router;
