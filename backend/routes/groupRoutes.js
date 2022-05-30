const express = require('express');
const set_group = require('../controllers/groupController').set_group;
const create_group = require('../controllers/groupController').create_group;
const get_Group = require('../controllers/groupController').get_Group;
const update_group_supervisor = require('../controllers/groupController').update_group_supervisor;
const update_group_coSupervisor = require('../controllers/groupController').update_group_coSupervisor;

const router = express.Router();

router.post('/create', create_group);
router.post('/', set_group);
router.get('/:id', get_Group);

router.put('/updateSupervisor', update_group_supervisor)
router.put('/updateCoSupervisor', update_group_coSupervisor)

module.exports = router;
