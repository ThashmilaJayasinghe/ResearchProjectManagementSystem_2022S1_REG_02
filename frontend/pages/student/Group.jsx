import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {Checkbox,Button} from "@mui/material"
// import { useSelector} from "react-redux";

export default function Group(){

    // const {user} = useSelector((state) => state.auth)

    const [subMemberRegNumber,setSubMemberRegNumber] = useState("")
    const [regNumber, setRegNumber] = useState("")
    const [leader, setLeader] = useState(false)
    const [email,setEmail] = useState("")
    // const [groupDetails,setGroupDetails] = useState([])

    const handleSubmit = ()=>{
        console.log('hi')
        axios.post('http://localhost:5000/group/create',{subMemberRegNumber})
        .then((res)=>{ 
           console.log("calling",res)
           localStorage.setItem("subMemberRegNumber",res.data.subMemberRegNumber)
           
        })
        .catch((err)=>{
            alert(err)
        })
        console.log('tooo')
    }
   
    console.log(subMemberRegNumber)
    const submitMembers = ()=>{
        const temp = localStorage.getItem('subMemberRegNumber')
        const newMember = {
            temp,
            regNumber,
            leader,
            email
        }
        axios.post('http://localhost:5000/group/',newMember)
        .then(()=>{
            setRegNumber('')
            setLeader(false)
            setEmail('')
        }).catch((err)=>{
            alert(err)
        })
    }
    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                <div>
                
                    <h4>Group Submitters Register Number</h4>
                    <TextField fullWidth type="text" id="subMemberRegNumber" label="Submitters Register Number....." onChange={(e)=>(setSubMemberRegNumber(e.target.value))}/>
            
                    <div style={{paddingTop: "20px"}}>
                <Button type="submit" variant="contained" color="info" onClick={handleSubmit} >create Group</Button> 
                </div>             
                </div>
    

                <div>
                
                    <h4>Group Member Registration Number</h4>
                    <TextField fullWidth type="text" id="regNumber"  label="Member Registration Number...." value={regNumber} onChange={(e)=>(setRegNumber(e.target.value))}/>
                
                    <h4>Leader</h4>
                    <Checkbox id="leader" label="leader" value={leader} onChange={(e)=>(setLeader(!leader))}/>
                
                    <h4>Group Member Email</h4>
                    <TextField fullWidth type="email" label="Member Email...." id="email" value={email}  onChange={(e)=>(setEmail(e.target.value))}/>
                
                    <div style={{paddingTop: "20px"}}>
                <Button type="submit" variant="contained" color="info" onClick={submitMembers}>Add Member</Button>
                </div>
                </div>
        </div>
        </div>
    )
}
