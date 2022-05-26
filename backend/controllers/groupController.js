const Group = require('../models/groupModel')

const create_group = (req,res) =>{
    const subMemberRegNumber = req.body.subMemberRegNumber;

    const newGroup = new Group({
        subMemberRegNumber,
    })
    newGroup.save()
        .then(() => {
            res.json('Group has created.')
        })
        .catch((err) => {
            console.log(err);
        })
}

const set_group = async (req,res)=> {
    const groupID = req.params.id;
    const regNumber = req.body.regNumber;
    const leader = req.body.leader;
    // const email = req.body.email;

    let group = await Group.findOne({_id:groupID})

    let i = group.members.length;
    console.log(i);
    try {
        if (group) {
            if(i<7) {
                group.members.push({regNumber, leader});
                group = await group.save();
                return res.status(201).send(group);
            }
            else {
                console.log("Limitted"+i);
                res.status(500).send("Limit exceded")
            }
        }
        else {
            const newGroup = new Group({
                groupID,
                members: [{
                    regNumber,
                    leader
                }]

            })

            newGroup.save()
                .then(() => {
                    res.json('Members are added')
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send("Something went wrong")
    }



}

const update_group = (req,res) =>{

}

module.exports = {set_group, create_group};