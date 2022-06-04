import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";


export default function ViewTopicEvaluated(){
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
        setFeedback(localStorage.getItem('feedback'))
    },[])

    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                <center><h1>Evaluated Topic Details</h1></center>

                <div
                    style={{
                        borderRadius: "10px",
                        margin: "10px",
                        padding: "",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                    }}
                >

                    <form>

                        <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>

                            <h4>Group ID</h4>

                            <TextField fullWidth type="text" id="grp_ID" value={grp_ID}
                                       onChange={(e)=>{
                                           setGrpID(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>


                            <h4>Evaluator Name</h4>
                            <TextField fullWidth type="text" id="supervisorName" value={user.name}
                                       onChange={(e)=>{
                                           setSuprvName(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>

                            <h4>Title</h4>
                            <TextField fullWidth type="text" id="title" value={title}
                                       onChange={(e)=>{
                                           setTitle(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>

                            <h4>Message</h4>
                            <TextField fullWidth type="text" id="message" value={message}
                                       onChange={(e)=>{
                                           setMassage(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>
                            <br/><br/>

                            <h4>Status</h4>
                            <TextField fullWidth type="text" id="status" value={status}
                                       onChange={(e)=>{
                                           setStatus(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>

                            <h4>Feedback</h4>
                            <TextField fullWidth type="text" id="feedback" value={feedback}
                                       onChange={(e)=>{
                                           setFeedback(e.target.value)
                                       }}
                                       inputProps={{readOnly:true}}/>

                            <br/><br/>


                            <br/><br/>
                            <Link to='/panelMember'>
                                <Button variant="contained" color="info" style={{marginRight: "5px"}}>Back</Button>
                            </Link>
                            <br/><br/>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}