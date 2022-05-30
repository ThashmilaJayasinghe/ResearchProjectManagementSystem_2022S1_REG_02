import axios from 'axios';
import TextField from "@mui/material/TextField";
import React,{useState,useEffect} from 'react'
import {Button} from "@mui/material";
import { useSelector } from 'react-redux';

export default function TopicRequestPanalForm() {

    const { user } = useSelector((state) => state.auth);

    const [title,setTopic] = useState("");
    const [massege,setMassege] = useState("");
    const [panalID,setPanelID] = useState("");

    useEffect(()=>{
    setPanelID(localStorage.getItem("_id"))
    })
    const handleSubmit = () =>{
        const newRequest = {
            panalID,
            title,
            massege
        }
        axios.post('http://localhost:5000/topic/' + user._id ,newRequest)
        .then(()=>{
            alert('Topic request added');
        }).catch(()=>{
            alert(err)
        })
    }

  return (
    <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                
            <center><h1>Request Topic</h1></center>
                    <h4>Research Topic</h4>
                    <TextField fullWidth type="text" id="topic" label="topic....." onChange={(e)=>(setTopic(e.target.value))}/>
                
                
                    {/* <h4>Research Document</h4>
                    <TextField fullWidth type="text" id="topic" label="Topic....." onChange={(e)=>(setTopic(e.target.value))}/>
                 */}
                
                    <h4>Massege</h4>
                    <TextField fullWidth type="text" id="massege" label="Massege....." onChange={(e)=>(setMassege(e.target.value))}/>
                
                    <div style={{paddingTop: "20px"}}>
                        <Button type="submit"  variant="contained" color="info" style={{marginRight: "5px"}} onClick={handleSubmit}>Set Request</Button>
                </div>
                </div> 
        </div>
  )
}
