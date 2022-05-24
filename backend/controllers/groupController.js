const Group = require('../models/groupModel')
const Student = require("../models/studentModel");

const set_group = (req,res)=> {
    // const members = req.body.members[(regNumber,leader,email)];
    //
    // const newGroup = new Group({
    //     members
    // })
    //
    // newGroup.save()
    //     .then(()=>{
    //         res.json('Members are added')
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })

    const members = req.body;

    console.log(members)
    console.log(members.regNumber)
    // const newGroup = new Group({
    //     members
    // })
    // console.log(newGroup)

    try {

        // const newGroup = new Group({
        //         members
        //     })
       // newGroup.members.push({regNumber,leader,email})
        const data = members.save();
        JSON.parse(members).map((value) => {
            data.members.push({
                regNumber: value.regNumber,
                leader: value.leader,
                email: value.email
            })
        })
       data.save()

        res.send("Group added")

    } catch (err) {
        res.send(err);
    }

}

const update_group = (req,res) =>{

}

module.exports = {set_group}