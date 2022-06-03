import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {Checkbox,Button, TableCell,TableRow, TableBody} from "@mui/material"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector} from "react-redux";

export default function Group(){

    const {user} = useSelector((state) => state.auth)

    const [subMemberRegNumber,setSubMemberRegNumber] = useState("")
    const [groupName,setGroupName] = useState("")
    const [regNumber, setRegNumber] = useState("")
    const [leader, setLeader] = useState(false)
    const [email,setEmail] = useState("")
    const [groupDetails,setGroupDetails] = useState([])

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleSubmit = ()=>{
        console.log('hi')
        axios.post('http://localhost:5000/group/create',{subMemberRegNumber,groupName})
        .then((res)=>{ 
           console.log("calling",res)
           alert("Group Created")
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
        .then((res)=>{
            alert(res);
            setRegNumber('')
            setLeader(false)
            setEmail('')
        }).catch((err)=>{
            alert("You cannot add more than 4 members")
        })
    }

    
        useEffect(()=>{
            axios.get('http://localhost:5000/group/getGroup/'+user._id)
            .then((res)=>{
                const group = res.data.members;
                setGroupDetails(group);
            }).catch((err)=>{
                alert('Error in retrieving data')
            })
        },[])
    
   
    return(
        <div style={{paddingTop:"20px"}}>

            <div>
                <Button variant="contained" onClick={handleClickOpen}>My Group</Button>
                <Dialog open={open} onClose={()=>(handleClose)}>
                    <DialogTitle>My Group Details</DialogTitle>
                        <DialogContent>
                            <TableBody>
                                {
                                    groupDetails.map((data)=>{
                                        return(
                                            <TableRow>
                                            
                                                <TableCell>
                                                    <b>Register Number</b>
                                                </TableCell>
                                                <TableCell>
                                                   :{data.regNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <b>Email</b>
                                                </TableCell>
                                                <TableCell>
                                                   : {data.email}
                                                </TableCell>                                                                                                  
                                            </TableRow>
                                                )
                                    
                                    })
                                }
                            </TableBody>
                            
                            
                        </DialogContent>
                    <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
            </div>
            
            <div style={{width: "60%", margin: "auto", }}>
                <div>
                
                    <h4>Group Submitters Register Number</h4>
                    
                    <TextField fullWidth type="text" id="subMemberRegNumber" label="Submitters Register Number....." onChange={(e)=>(setSubMemberRegNumber(e.target.value))}/>
                    
                    <h4>Group Name</h4>
                    
                    <TextField fullWidth type="text" id="groupName" label="Group Name....." onChange={(e)=>(setGroupName(e.target.value))}/>
                    
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
