const express = require('express');
const router = express.Router();

let topicStatus = require('../models/topicStatus');

router.route("/add").post((req, res) =>{
    const status = req.body.status;
    const message = req.body.message;

    const newTopicStatus = new topicStatus({
        status,
        message
    });

    newTopicStatus.save().then(()=>{
        res.json("Status updated");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route('/').get((req,res)=>{
    topicStatus.find()
        .then((topicStatues)=>{
            res.json(topicStatues)
        })
        .catch((err)=>{
            console.log(err);
        })
})
