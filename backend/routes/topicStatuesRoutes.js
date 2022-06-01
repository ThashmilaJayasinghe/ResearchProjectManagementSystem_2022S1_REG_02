const express = require('express');

const post_topicStatus =
	require('../controllers/topicStatusController').post_topic_Status;
const get_topicStatus =
	require('../controllers/topicStatusController').get_topic_Status;
const update_topic_status =
	require('../controllers/topicStatusController').update_topic_status;


const updatetopicStatusPannel = require('../controllers/topicStatusController').update_topic_Status_Pannel
const get_topic_StatusPanel  = require('../controllers/topicStatusController').get_topic_Status_panel
const get_topic_Status_panelAccepted  = require('../controllers/topicStatusController').get_topic_Status_panel_Accepted
const get_topic_Status_panelRejected  = require('../controllers/topicStatusController').get_topic_Status_panel_Rejected


const router = express.Router();

//student topic evaluate routes
router.post('/:id', post_topicStatus);
router.get('/', get_topicStatus);
 router.put('/updateTopic', update_topic_status);

 //Panel topic evaluate routes
router.put('/update/:id', updatetopicStatusPannel);
router.get('/panelTopics', get_topic_StatusPanel)
router.get('/panelTopicsAccepted', get_topic_Status_panelAccepted)
router.get('/panelTopicsRejected', get_topic_Status_panelRejected)


module.exports = router;
