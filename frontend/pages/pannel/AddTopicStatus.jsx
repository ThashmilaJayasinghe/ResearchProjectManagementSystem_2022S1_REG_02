import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";




export default function AddTopicStatus(){

    const {user} = useSelector((state) => state.auth)

    const {id} = useParams();

    const [title, setTitle] = useState("")
    const [grp_ID, setGrpID] = useState("")
    const [status, setStatus] = useState("")
    const [feedback, setFeedback] = useState("")
    const [supervisorName, setSuprvName] = useState('');
    const [message, setMassage] = useState('');

    useEffect(()=>{
        setTitle(localStorage.getItem('title'))
        setGrpID(localStorage.getItem('grp_ID'))
        setStatus(localStorage.getItem('status'))
        setMassage(localStorage.getItem('message'))
    },[])

    const handleSubmit = ((event)=>{
        const newTopicStatus = {
            title,
            grp_ID,
            status,
            feedback,
            supervisorName
        }

        axios.put('http://localhost:5000/topic/update/'+id, newTopicStatus)
            .then(()=>{
                alert('Succesfully added topic status')
            })
            .catch((err)=>{
                alert(err)
            })
     })

    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
            <center><h1>Evaluate Topic</h1></center>

            <form>
                <h4>Group ID</h4>

                <TextField fullWidth type="text" id="grp_ID" value={grp_ID}
                onChange={(e)=>{
                    setGrpID(e.target.value)
                }}
                />


                <h4>Supervisor Name</h4>
                <TextField fullWidth type="text" id="supervisorName" value={user.name}
                       onChange={(e)=>{
                           setSuprvName(e.target.value)
                       }}
                />

                <h4>Title</h4>
                <TextField fullWidth type="text" id="title" value={title}
                       onChange={(e)=>{
                           setTitle(e.target.value)
                       }}
                />

                <h4>Message</h4>
                <TextField fullWidth type="text" id="message" value={message}
                       onChange={(e)=>{
                           setMassage(e.target.value)
                       }}
               readOnly/>
                <br/><br/>

                <h4>Status</h4>
                <select fullWidth type="text" id="status" value={status}
                       onChange={(e)=>{
                           setStatus(e.target.value)
                       }}>
                    <option value="#">Select Status</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>


                <h4>Feedback</h4>
                <TextField fullWidth type="text" id="feedback" value={feedback}
                       onChange={(e)=>{
                           setFeedback(e.target.value)
                       }}
                />

                <br/><br/>

                <Link to='/panelTopics'>
                    <Button variant="contained" color="info" style={{marginRight: "5px"}} onClick={handleSubmit}>Submit</Button>
                </Link>
            </form>

            <br/><br/>
            <Link to='/panelTopics'>
                <Button variant="contained" color="info" style={{marginRight: "5px"}}>Back</Button>
            </Link>
        </div>
        </div>
    )
}