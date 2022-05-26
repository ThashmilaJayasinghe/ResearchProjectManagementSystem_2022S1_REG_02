const express = require('express')
const set_group = require('../controllers/groupController').set_group
const create_group = require('../controllers/groupController').create_group

const router = express.Router();

router.post('/create',create_group)
router.post('/:id',set_group);

module.exports = router;