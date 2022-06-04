import axios from 'axios';
import TextField from "@mui/material/TextField";
import React,{useState,useEffect} from 'react'
import {Button} from "@mui/material";
import { useSelector } from 'react-redux';

export default function TopicRequestPanalForm() {

    const { user } = useSelector((state) => state.auth);

    const [title,setTopic] = useState("");
    const [massege,setMassege] = useState("");
    const [topicDocument, setTopicDocument] = useState("")
    const [panalID,setPanelID] = useState("");

    useEffect(()=>{
    setPanelID(localStorage.getItem('pid'))
    })
    const handleSubmit = () =>{
        const formData = new FormData();
        formData.append('panalID',panalID)
        formData.append('topicDocument',topicDocument)
        formData.append('title',title)
        formData.append('massege',massege)
        formData.append('status','Pending')

        axios.post('http://localhost:5000/topic/' + user._id ,formData)
        .then(()=>{
            alert('Topic request added');

        }).catch((err)=>{
            alert(err)
            // alert("Please upload a .ppt, .pptx, .doc or .docx file")
        })
    }

  return (
    <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                
            <center><h1>Request Topic</h1></center>
                    <h4>Research Topic</h4>
                    <TextField  required fullWidth type="text" id="topic" label="topic....." onChange={(e)=>(setTopic(e.target.value))}/>
                
                
                    {/* <h4>Research Document</h4>
                    <TextField fullWidth type="text" id="topic" label="Topic....." onChange={(e)=>(setTopic(e.target.value))}/>
                 */}
                
                    <h4>Massege</h4>
                    <TextField  required fullWidth type="text" id="massege" label="Massege....." onChange={(e)=>(setMassege(e.target.value))}/>

                    <h4>Submit</h4>
                    <TextField   required type="file" onChange={(e)=>{setTopicDocument(e.target.files[0])}}/>
                
                    <div style={{paddingTop: "20px"}}>
                        <Button type="submit"  variant="contained" color="info" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={handleSubmit}>Set Request</Button>
                </div>
                </div> 
        </div>
  )
}
