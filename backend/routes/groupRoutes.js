const express = require('express');
const set_group = require('../controllers/groupController').set_group;
const create_group = require('../controllers/groupController').create_group;
// const get_id = require('../controllers/groupController').get_id;

const router = express.Router();

router.post('/create', create_group);
router.post('/', set_group);
// router.get('/', get_id);

module.exports = router;
