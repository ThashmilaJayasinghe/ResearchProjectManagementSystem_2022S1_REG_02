const express = require('express')

const post_topicStatus = require('../controllers/topicStatusController').post_topic_Status
const get_topicStatus = require('../controllers/topicStatusController').get_topic_Status
const update_topic_status = require('../controllers/topicStatusController').update_topic_status

const router = express.Router();

router.post('/:id',post_topicStatus);
router.get('/',get_topicStatus);
router.put('/updateTopic',update_topic_status);

module.exports = router;