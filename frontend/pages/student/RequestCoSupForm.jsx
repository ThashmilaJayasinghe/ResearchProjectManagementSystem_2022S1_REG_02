import axios from "axios";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {Button} from "@mui/material";
import { useSelector } from 'react-redux';

export default function RequestCoSupForm(){

    const { user } = useSelector((state) => state.auth);

    useEffect(()=>{
        setSupervisorName(localStorage.getItem("name"))
        setSupervisorEmail(localStorage.getItem("email"))
    })

    const [supervisorName,setSupervisorName] = useState("")
    const [supervisorEmail,setSupervisorEmail] = useState("")
    const [researchField, setResearchField] = useState("");
    const [topic,setTopic] = useState("");
    const [massege,setMassege] = useState("");

    const handleSubmit = () =>{
        const newRequest = {
            supervisorName,
            supervisorEmail,
            researchField,
            topic,
            massege,
            requestStates:"Pending"
        }

        axios.post('http://localhost:5000/request/coSupervisor/'+user._id,newRequest)
        .then(()=>{
            alert('Request Sent')
            setResearchField("")
            setTopic("");
            setMassege("");
        })
        .catch((err)=>{
            alert(err)
        })
    }
    
    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>

            <center><h1>Request Co-Supervisor</h1></center>
                
                    <h4>Research Field</h4>
                    <TextField fullWidth type="text" id="field" label="Field....." onChange={(e)=>(setResearchField(e.target.value))}/>                
                
                    <h4>Research Topic</h4>
                    <TextField fullWidth type="text" id="topic" label="Topic....." onChange={(e)=>(setTopic(e.target.value))}/>                
                
                    <h4>Massege</h4>
                    <TextField fullWidth type="text" id="massege" label="Massege....." onChange={(e)=>(setMassege(e.target.value))}/>                

                    <div style={{paddingTop: "20px"}}>
                <Button type="submit" variant="contained" color="info" onClick={handleSubmit}>Set Request</Button>
                </div>
            </div>
        </div>
    )
}