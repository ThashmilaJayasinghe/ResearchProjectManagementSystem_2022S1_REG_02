const express = require('express');
const get_Group_Pannel =
	require('../controllers/panelController').get_Group_Pannel;

const router = express.Router();

router.get('/:id', get_Group_Pannel);

module.exports = router;
