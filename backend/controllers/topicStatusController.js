const express = require('express')
const topic = require('../models/topicStatus')

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
    const status = req.body.status;
    const message = req.body.message;

    const newTopicS = new topic( {
        status,
        message
    })

    newTopicS.save()
        .then(()=>{
            res.json('Topic Status Added')
        })
        .catch((err)=>{
            console.log(err)
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