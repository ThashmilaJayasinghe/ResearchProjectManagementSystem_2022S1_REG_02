const express = require('express')
const set_group = require('../controllers/groupController').set_group

const router = express.Router();

router.post('/',set_group);

module.exports = router;