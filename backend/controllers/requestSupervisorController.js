const asyncHandler = require('express-async-handler')
const requestSupervisor = require('../models/requestSupervisorModel');
const RequestCOSupervisor = require('../models/requestCOSupervisorModel');
const Group = require('../models/groupModel');
const Student = require('../models/studentModel');


//accept or reject student groups according to the research field
const getAllRequestedSupervisors = asyncHandler(async (req, res) => {
    const result = await requestSupervisor.find()

    if(result){
        res.json({
            response: result
        })
    }else{
        res.status(400)
        throw new Error("Empty requests!")
    }
})

//get requests according to the supervisor
const getSupervisorRequest  = asyncHandler(async (req, res) => {

    // const supervisorEmail = req.body.supervisorEmail;

    const supervisorEmail = req.query.supervisorEmail

    try{
        const result = await requestSupervisor.find({supervisorEmail})
        res.status(200).json(result)

    }catch (err){
        console.error("supervisor request getting not success")
        console.log("Error in supervisor requests")
    }

})

//accept or reject request
const requestCheck = asyncHandler(async (req, res) => {

    const reqId = req.params.id;
    const reqStates = req.body.requestStates;

    try{
        const updatedResult = await requestSupervisor.findByIdAndUpdate(reqId, {requestStates:reqStates})
        res.status(200).json(updatedResult);
    }catch (err){
        console.log(err)
    }

})


module.exports.post_request = async (req, res) => {
	let id = req.params.id;
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	const requestedGroupID = gid;
	const supervisorName = req.body.supervisorName;
	const supervisorEmail = req.body.supervisorEmail;
	const researchField = req.body.researchField;
	const topic = req.body.topic;
	const message = req.body.message;
	const requestStates = req.body.requestStates;

	const newRequest = new requestSupervisor({
		requestedGroupID,
		supervisorName,
		supervisorEmail,
		researchField,
		topic,
		message,
		requestStates,
	});

	newRequest
		.save()
		.then(() => {
			res.json('Requested');
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.post_Co_request = async (req, res) => {
	let id = req.params.id;
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	const requestedGroupID = gid;
	const supervisorName = req.body.supervisorName;
	const supervisorEmail = req.body.supervisorEmail;
	const researchField = req.body.researchField;
	const topic = req.body.topic;
	const message = req.body.message;
	const requestStates = req.body.requestStates;

	const newRequest = new RequestCOSupervisor({
		requestedGroupID,
		supervisorName,
		supervisorEmail,
		researchField,
		topic,
		message,
		requestStates,
	});

	newRequest
		.save()
		.then(() => {
			res.json('Requested');
		})
		.catch((err) => {
			console.log(err);
		});
};

// module.exports.get_requests = (req,res) => {
//     requestSupervisor.find()
//         .then((requests)=>{
//             res.json({success:true,existingPost:requests});
//         })
//         .catch((err) =>{
//             console.log(err);
//         })
// }

// module.exports.update_request = (req,res) => {
//     let requestedGroupID = req.params.id;//Have to think about how to get group id
//     const { supervisorName, supervisorEmail, topic, message} = req.body;
//
//     const updateRequest = {
//         supervisorName,
//         supervisorEmail,
//         topic,
//         message
//     };
//
//     const update = requestSupervisor.findByIdAndUpdate(requestedGroupID,updateRequest)
//         .then(()=>{
//             res.status(200).send({
//                 status:'New request added'
//             });
//         }).catch((err)=>{
//             console.log(err);
//             res.status(200).send({status:'error with updating request', error:err.message});
//         })
// }


module.exports.get_Group_Sup_request = async (req, res) => {
	let id = req.params.id;
	// let id = '62910bfdaaed76cedd411ae3';
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	requestSupervisor
		.findOne({ requestedGroupID: gid })
		.then((requestSupervisor) => {
			console.log(requestSupervisor);
			res.json(requestSupervisor);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports.get_Group_COSup_request = async (req, res) => {
	let id = req.params.id;
	// let id = '62910bfdaaed76cedd411ae3';
	console.log(id);
	let student = await Student.findOne({ user: id });
	const regNum = student.regNumber;
	console.log(regNum);
	const group = await Group.findOne({ 'members.regNumber': regNum });
	const gid = group._id.toString();
	console.log(gid);

	RequestCOSupervisor.findOne({ requestedGroupID: gid })
		.then((RequestCOSupervisor) => {
			console.log(RequestCOSupervisor);
			res.json(RequestCOSupervisor);
		})
		.catch((err) => {
			console.log(err);
		});
};



module.exports.getAllRequestedSupervisors = getAllRequestedSupervisors
module.exports.getSupervisorRequest = getSupervisorRequest
module.exports.requestCheck = requestCheck