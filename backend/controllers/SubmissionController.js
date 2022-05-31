// const Group = require('../models/groupModel');
// const Student = require('../models/studentModel');
const Submissions = require('../models/submissionModel');
const Panel = require('../models/panel_model');
// const multer = require('multer');
// const path = require('path');

// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, callback) {
//             callback(null, 'frontend/submissions');
//         },
//
//         filename(req, file, callback) {
//             callback(null, Date.now() + file.originalname);
//         },
//     }),
//     limits: {
//         fileSize: 2000000,
//     },
//     fileFilter(req, file, callback) {
//         const ext = path.extname(file.originalname);
//
//         if (
//             ext !== '.ppt' &&
//             ext !== '.pptx' &&
//             ext !== '.doc' &&
//             ext !== '.docx' &&
//             ext !== '.pdf'
//         ) {
//             return callback(
//                 new Error('Please upload a .ppt, .pptx, .doc or .docx file')
//             );
//         }
//         callback(null, true);
//     },
// });
//
// const addSubmission = async (req, res) => {
//     let id = req.params.id;
//     console.log(id);
//     let student = await Student.findOne({ user: id });
//     const regNum = student.regNumber;
//     console.log(regNum);
//     const group = await Group.findOne({ 'members.regNumber': regNum });
//     const gid = group._id.toString();
//     console.log(gid);
//     const groupId = gid;
//     const sID = group.supervisorID;
//     const coSID = group.coSupervisorID;
//
//     const panel = await Panel.findOne({ groups: gid });
//     const pID = panel._id.toString();
//
//     const type = req.body.type;
//     if (type == 'document') {
//         const submissionstitle = req.body.submissionstitle;
//         const document = req.file.filename;
//         const path = req.file.path;
//         const mimetype = req.file.mimetype;
//         const submission = await new Submissions({
//             groupId,
//             submissionstitle,
//             type,
//             document,
//             file_path: path,
//             file_mimetype: mimetype,
//             supervisorID: sID,
//             coSupervisorID: coSID,
//         });
//
//         submission
//             .save()
//             .then(() => {
//                 res.json(submission);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     } else {
//         const submissionstitle = req.body.submissionstitle;
//         const document = req.file.filename;
//         const path = req.file.path;
//         const mimetype = req.file.mimetype;
//         const submission = await new Submissions({
//             groupId,
//             submissionstitle,
//             type,
//             document,
//             file_path: path,
//             file_mimetype: mimetype,
//             panelID: pID,
//         });
//         submission
//             .save()
//             .then(() => {
//                 res.json(submission);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// };
//
// const get_Group_Submissions = async (req, res) => {
//     let id = req.params.id;
//     console.log(id);
//     let student = await Student.findOne({ user: id });
//     const regNum = student.regNumber;
//     console.log(regNum);
//     const group = await Group.findOne({ 'members.regNumber': regNum });
//     const gid = group._id.toString();
//     console.log(gid);
//     Submissions.find({ groupId: gid })
//         .then((Submissions) => {
//             res.json(Submissions);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
//
// const download = async (res, req) => {
//     // Submissions.find({ _id: req.params.id }),
//     // 	(err, data) => {
//     // 		if (err) {
//     // 			console.log(err);
//     // 		} else {
//     // 			var x = __dirname + '/submissiond/' + data.file_path;
//     // 			res.download(x);
//     // 		}
//     // 	};
// };


// Get panel presentation evaluation
module.exports.get_Panel_Presentations = async (req, res) => {

    let userID = req.query.id;
    console.log(`Pannel member ID : ${userID}`)
    let getpanel = await Panel.findOne({'staff': userID})
    const panelID =  getpanel._id.toString();
    console.log(`panel ID ${panelID}`)

    const getPresentations = await Submissions.find({'panelID':panelID, type: "presentation", status: 'Pending'})

    try{
        if(getPresentations){
            return res.json(getPresentations)
        }
        else{
            console.log("Still, not presentations to evaluate")
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send("Something get wrong when getting presentations")
    }
}

module.exports.get_Supervisor_documents = async (req, res) =>{

    let userID = req.query.id;
    console.log(`Supervisor ID : ${userID}`)


    const getDocuments = await Submissions.find({supervisorID:userID,status:"Pending"})

    try{
        if(getDocuments){
            return res.json(getDocuments)
        }
        else{
            console.log("Still, not submitted supervisor document")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send("Something get wrong when getting supervisor documents")
    }
}

module.exports.get_co_Supervisor_Documents = async (req, res) =>{

    let userID = req.query.id;

    console.log(`co-supervisor ID : ${userID}`)

    const getCoDocuments = await Submissions.find({coSupervisorID:userID, status: "Pending"})

    try{
        if(getCoDocuments){
            return res.json(getCoDocuments)
        }
        else{
            console.log("Still, not submitted co-supervisor document")
        }
    }
    catch (err){
        console.log(err)
        res.status(500).send("Something get wrong when getting co-supervisor documents")
    }

}
//updateSubmission Status
module.exports.update_Submission_Status = async (req, res)=>{

    let submissionID = req.body.submissionID;
    const status = req.body.status;

    const updatedValue = await Submissions.findByIdAndUpdate(submissionID,{status:status})
    return res.status(201).json(updatedValue);

}

// module.exports.get_Marked_Documents_Co_Sup = async (req, res)=>{
//     let userID = req.query.id;
//
//     const markedDocuments = await Submissions.find({coSupervisorID:userID, status:"Marked"})
//     return res.status(201).json(markedDocuments);
// }

// module.exports = { upload, addSubmission, get_Group_Submissions, download };
