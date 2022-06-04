import React,{useEffect,useState} from 'react'
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Submit() {

    const { user } = useSelector((state) => state.auth);
    useEffect(()=>{
        setSubmissionstitle(localStorage.getItem("title"))
        setType(localStorage.getItem("type"))
    })

    const [submissionstitle,setSubmissionstitle] = useState("")
    const [type,setType] = useState("");
    const [document, setDocument] = useState("")

    const handleSubmit = ()=>{
        const formData = new FormData();
        formData.append('document',document)
        formData.append('submissionstitle',submissionstitle)
        formData.append('type',type)
        formData.append('status','Pending')

        axios.post('http://localhost:5000/submit/'+user._id,formData)
        .then(()=>{
            alert('Submission has done')
        }).catch((err)=>{
            alert(err);
        })
    }
  return (
    <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                
            <center><h1>Submission</h1></center>
                    <h4>Submission Title</h4>
                    <TextField readOnly fullWidth type="text" id="field" label="Field....." value={submissionstitle} onChange={(e)=>{setSubmissionstitle(e.target.value)}}/>
                
                
                    <h4>Submission Type</h4>
                    <TextField readOnly fullWidth type="text" id="topic" label="Topic....." value={type} onChange={(e)=>{setType(e.target.value)}}/>
                
                    
                    <h4>Submit</h4>
                    <TextField type="file" onChange={(e)=>{setDocument(e.target.files[0])}}/>
                    <div style={{paddingTop: "20px"}}>
                        <Button type="submit"  variant="contained" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={handleSubmit}>Sumbit</Button>
                </div>
                </div> 
        </div>
  )
}
