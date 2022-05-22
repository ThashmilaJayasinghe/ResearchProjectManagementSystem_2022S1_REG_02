const express = require('express');
const grp_mark = require('../models/MarkModel')


module.exports.get_Marks = (req, res) =>{
    grp_mark.find()
        .then((marks) =>{
            res.json({success:true, existingPost: marks});
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports.add_Mark = (req, res) =>{

    const grp_ID = req.body.grp_ID;
    const submission = req.body.submission;
    const submissionType = req.body.submissionType;
    const mark = req.body.mark;
    const evaluator_ID = req.body.evaluator_ID;

    const newMarks = new grp_mark({
        grp_ID,
        submissions : [{
            submission,
            submissionType,
            mark,
            evaluator_ID,
        }]
    })

    newMarks.save()
        .then(()=>{
            res.json("Group marks added!")
        })
        .catch((err)=>{
            console.log(err)
        })
}