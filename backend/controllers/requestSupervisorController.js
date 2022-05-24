const requestSupervisor = require('../models/requestSupervisorModel')

module.exports.post_request = (req,res) => {
    const requestedGroupID = req.body.title;
    const supervisorName = req.body.title;
    const supervisorEmail = req.body.title;
    const topic = req.body.title;
    const message = req.body.description;

    const newRequest = new requestSupervisor( {
        requestedGroupID,
        supervisorName,
        supervisorEmail,
        topic,
        message
    })

    newRequest.save()
        .then(()=>{
            res.json('Requested')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports.get_requests = (req,res) => {
    requestSupervisor.find()
        .then((requests)=>{
            res.json({success:true,existingPost:requests});
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports.update_request = (req,res) => {
    let requestedGroupID = req.params.id;//Have to think about how to get group id
    const { supervisorName, supervisorEmail, topic, message} = req.body;

    const updateRequest = {
        supervisorName,
        supervisorEmail,
        topic,
        message
    };

    const update = requestSupervisor.findByIdAndUpdate(requestedGroupID,updateRequest)
        .then(()=>{
            res.status(200).send({
                status:'New request added'
            });
        }).catch((err)=>{
            console.log(err);
            res.status(200).send({status:'error with updating request', error:err.message});
        })
}

module.exports.get_one_request = (res,req)=>{

}

