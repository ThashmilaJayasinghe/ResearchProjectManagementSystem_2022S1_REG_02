const grp_mark = require('../models/MarkModel')

//get marks
const get_Marks =async (req, res) =>{
    grp_mark.find()
        .then((marks) =>{
            res.json({success:true, existingPost: marks});
        })
        .catch((err)=>{
            console.log(err)
        })
}

//add marks
const add_Mark = async (req, res) =>{

    const grp_ID = req.body.grp_ID;
    const submission = req.body.submission;
    const submissionType = req.body.submissionType;
    const mark = req.body.mark;
    const evaluator_ID = req.body.evaluator_ID;
    const submissionID = req.body.submissionID;
    const document = req.body.document;


    let group = await grp_mark.findOne({grp_ID});

    try{
        if(group){
            console.log(`Found group : ${grp_ID}`);
            group.submissions.push({submissionID, submission, submissionType, mark, evaluator_ID,document});
            group = await group.save();
            return res.status(201).send(group);
        }
        else{
            const newMarks = await new grp_mark({
                grp_ID,
                submissions : [{
                    submissionID,
                    submission,
                    submissionType,
                    mark,
                    evaluator_ID,
                    document
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
    }
    catch (err){
        console.log(err);
        res.status(500).send("Something get wrong when adding group marks")
    }
}

module.exports = {
    get_Marks,
    add_Mark
}