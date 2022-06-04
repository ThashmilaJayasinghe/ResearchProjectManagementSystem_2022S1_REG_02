const express = require('express');
const upload = require('../controllers/topicStatusController').upload;

const post_topicStatus =
	require('../controllers/topicStatusController').post_topic_Status;
const get_topicStatus =
	require('../controllers/topicStatusController').get_topic_Status;
const update_topic_status =
	require('../controllers/topicStatusController').update_topic_status;

const router = express.Router();

// router.post('/:id',post_topicStatus);
router.post('/:id', upload.single('topicDocument'), post_topicStatus);
router.get('/', get_topicStatus);
router.put('/updateTopic', update_topic_status);

module.exports = router;
