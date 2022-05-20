const express = require('express')

const post_topicStatus = require('../controllers/topicStatusController').post_topic_Status
const get_topicStatus = require('../controllers/topicStatusController').get_topic_Status

const router = express.Router();

router.post('/',post_topicStatus);
router.get('/',get_topicStatus);

module.exports = router;