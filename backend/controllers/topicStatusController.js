const topic = require('../models/topicStatusModel')
const Group = require('../models/groupModel')
const Student = require('../models/studentModel')

module.exports.get_topic_Status = (req,res) => {
    topic.find()
        .then((topics)=>{
            res.json({success:true,existingPost:topics});
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports.post_topic_Status = (req,res) => {
    // let user = req.params.id;
    // console.log(user)
    // let student = Student.findOne({user})
    // console.log(student);
    //const {_id} = Group.findOne({"members":{regNumber:regNumber}});


    // const grp_ID = _id;
    const grp_ID = req.params.id;
    const title = req.body.title;
    const message = req.body.message;
    const supervisorID = req.body.supervisorID;
    const coSupervisorID = req.body.coSupervisorID;
    const status = req.body.status;
    const feedback = req.body.feedback;
    const evaluated_Date = req.body.evaluated_Date;

    const newTopicS = new topic( {
        grp_ID,
        title,
        message,
        supervisorID,
        coSupervisorID,
        status,
        feedback,
        evaluated_Date
    })

    newTopicS.save()
        .then(()=>{
            res.json('Topic Evaluated')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports.update_topic_status = (req,res) =>{
    let {grp_ID, title, message, supervisorID, coSupervisorID, status, feedback} = req.body

    const updateTopic = {
        grp_ID,
        title,
        message,
        supervisorID,
        coSupervisorID,
        status,
        feedback
    }
    const update = topic.findByIdAndUpdate(grp_ID,updateTopic)
        .then(()=>{
            res.status(200).send({
                status:'Updated'
            });
        }).catch((err)=>{
            console.log(err);
            res.status(200).send({status:'error with updating data', error:err.message});
        })
}
// module.exports.update_item = (req,res) => {
//     let itemID = req.params.id;
//     const {title, description, price} = req.body;
//
//     const updatePost = {
//         title,
//         description,
//         price
//     };
//
//     const update = item.findByIdAndUpdate(itemID,updatePost)
//         .then(()=>{
//             res.status(200).send({
//                 status:'post updated'
//             });
//         }).catch((err)=>{
//             console.log(err);
//             res.status(200).send({status:'error with updating data', error:err.message});
//         })
// }
//
// module.exports.delete_item = (req,res) => {
//     let itemID = req.params.id;
//     item.findByIdAndDelete(itemID)
//         .then(() => {
//             res.status(200).send({ status: 'item deleted' });
//         })
//         .catch((err) => {
//             console.log(err.message);
//             res
//                 .status(500)
//                 .send({ status: 'Error with delete user', error: err.message });
//         });
// }