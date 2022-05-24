const express = require('express')

const post_topicStatus = require('../controllers/topicStatusController').post_topic_Status
const get_topicStatus = require('../controllers/topicStatusController').get_topic_Status
const gettopicAccepted = require('../controllers/topicStatusController').get_topic_Accepted
const gettopicRejected = require('../controllers/topicStatusController').get_topic_Rejected
const updatetopicStatus = require('../controllers/topicStatusController').update_topic_Status

const router = express.Router();

router.post('/',post_topicStatus);
router.get('/',get_topicStatus);
router.get('/accepted', gettopicAccepted);
router.get('/rejected', gettopicRejected);
router.put('/update/:id', updatetopicStatus);

module.exports = router;