const topic = require('../models/topicStatusModel')

module.exports.get_topic_Status = (req,res) => {
    topic.find()
        .then((topics)=>{
            res.json({success:true,existingPost:topics});
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports.get_topic_Accepted = async (req, res) =>{

    const acceptGrp = await topic.find({status:'Accepted'})

    try {
        if (acceptGrp) {
            return res.json(acceptGrp);
        } else
            console.log("Unavailable Accept Topics")
    }
    catch (err){
        console.log(err);
        res.status(500).send("Something get wrong when getting Accepted topics")
    }
}

module.exports.get_topic_Rejected = async (req, res) =>{

    const rejectedGrp = await topic.find({status:'Rejected'})

    try {
        if (rejectedGrp) {
            return res.json(rejectedGrp);
        } else
            return res.status(500).send("Unavailable reject topics yet")
    }
    catch (err){
        console.log(err);
        res.status(500).send("Something get wrong when getting Accepted topics")
    }
}

module.exports.post_topic_Status = (req,res) => {
    const status = req.body.status;
    const feedback = req.body.feedback;
    const grp_ID = req.body.grp_ID;
    const supervisorName = req.body.supervisorName;
    const title = req.body.title;
    const evaluated_Date = req.body.evaluated_Date;

    const newTopicS = new topic( {
        grp_ID,
        supervisorName,
        title,
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

module.exports.update_topic_Status = (req,res) => {
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