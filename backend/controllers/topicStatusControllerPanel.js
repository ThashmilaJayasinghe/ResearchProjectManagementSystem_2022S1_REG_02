const topic = require('../models/topicStatusModel');
const Group = require('../models/groupModel');
const Student = require('../models/studentModel');
const { json } = require('express');
const Panel = require('../models/panelModel')

//get all evaluate topics
module.exports.get_topic_Status = (req, res) =>{
    topic
        .find()
        .then((topics) => {
            res.json({ success: true, existingPost: topics });
        })
        .catch((err) => {
            console.log(err);
        });
}

//add evaluate topic
module.exports.post_topic_Status = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let student = await Student.findOne({ user: id });
    const regNum = student.regNumber;
    console.log(regNum);
    const group = await Group.findOne({ 'members.regNumber': regNum });
    const gid = group._id.toString();
    console.log(gid);

    const grp_ID = gid;
    const title = req.body.title;
    const message = req.body.message;
    const supervisorID = req.body.supervisorID;
    const coSupervisorID = req.body.coSupervisorID;
    const status = req.body.status;
    const feedback = req.body.feedback;
    const evaluated_Date = req.body.evaluated_Date;

    const newTopicS = new topic({
        grp_ID,
        title,
        message,
        supervisorID,
        coSupervisorID,
        status,
        feedback,
        evaluated_Date,
    });

    newTopicS
        .save()
        .then(() => {
            res.json('Topic Evaluated');
        })
        .catch((err) => {
            console.log(err);
        });
};

//update evaluate topic
module.exports.update_topic_status = (req, res) => {
    let {
        grp_ID,
        title,
        message,
        supervisorID,
        coSupervisorID,
        status,
        feedback,
    } = req.body;

    const updateTopic = {
        grp_ID,
        title,
        message,
        supervisorID,
        coSupervisorID,
        status,
        feedback,
    };
    const update = topic
        .findByIdAndUpdate(grp_ID, updateTopic)
        .then(() => {
            res.status(200).send({
                status: 'Updated',
            });
        })
        .catch((err) => {
            console.log(err);
            res
                .status(200)
                .send({ status: 'error with updating data', error: err.message });
        });
};

//update evaluate topic by panel
module.exports.update_topic_Status_Pannel = (req,res) => {
    let topicID = req.params.id;
    const status = req.body.status;
    const feedback = req.body.feedback;
    const grp_ID = req.body.grp_ID;
    const supervisorName = req.body.supervisorName;
    const title = req.body.title;
    const evaluated_Date = req.body.evaluated_Date;

    const updateTopicStatus = {
        grp_ID,
        supervisorName,
        title,
        status,
        feedback,
        evaluated_Date
    };

    const update = topic.findByIdAndUpdate(topicID,updateTopicStatus)
        .then(()=>{
            res.status(200).send({
                status:'Topic updated'
            });
        }).catch((err)=>{
            console.log(err);
            res.status(200).send({status:'error with updating topic status', error:err.message});
        })
}

//get evaluate topic by panel
module.exports.get_topic_Status_panel = async (req, res) => {

    let userID = req.query.id;
    console.log(userID)

     let getpanel = await Panel.findOne({'staff': userID})
    const panelID =  getpanel._id.toString();
     console.log(panelID)

     const getAllocateGroups = await topic.find({panalID:panelID, status: 'Pending'})


    try {
        if (getAllocateGroups) {
            return res.json(getAllocateGroups)
        } else {
            console.log("Still. not submitted topics to evaluate")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send("Something get wrong when getting topics to evaluate")
    }
};

//get accepted evaluated topic by panel
module.exports.get_topic_Status_panel_Accepted = async (req, res) => {

    let userID = req.query.id;
    console.log(userID)

    let getpanel = await Panel.findOne({'staff': userID})
    const panelID =  getpanel._id.toString();
    console.log(panelID)

    const getAllocateGroups = await topic.find({'panalID':panelID, 'status': 'Accepted'})

    try {
        if (getAllocateGroups) {
            return res.json(getAllocateGroups)
        } else {
            console.log("Still. not accepted topics")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send("Something get wrong when getting Accepted topics")
    }
};

//get rejected evaluated topic by panel
module.exports.get_topic_Status_panel_Rejected = async (req, res) => {

    let userID = req.query.id;
    console.log(userID)

    let getpanel = await Panel.findOne({'staff': userID})
    const panelID =  getpanel._id.toString();
    console.log(panelID)

    const getAllocateGroups = await topic.find({'panalID':panelID, 'status': 'Rejected'})

    try {
        if (getAllocateGroups) {
            return res.json(getAllocateGroups)
        } else {
            console.log("Still. not rejected topics")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send("Something get wrong when getting rejected topics")
    }
};
