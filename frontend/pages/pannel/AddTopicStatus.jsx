import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Axios from "axios";
import fileDownload from "js-file-download";




export default function AddTopicStatus(){

    const {user} = useSelector((state) => state.auth)

    const {id} = useParams();

    const [title, setTitle] = useState("")
    const [grp_ID, setGrpID] = useState("")
    const [status, setStatus] = useState("")
    const [feedback, setFeedback] = useState("")
    const [supervisorName, setSuprvName] = useState('');
    const [message, setMassage] = useState('');
    const [topicDocument, setDocument] = useState('');

    useEffect(()=>{
        setTitle(localStorage.getItem('title'))
        setGrpID(localStorage.getItem('grp_ID'))
        setStatus(localStorage.getItem('status'))
        setMassage(localStorage.getItem('message'))
        setDocument(localStorage.getItem('topicDocument'))
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

    const handleClick = (file) => {

        let filePath = "../../public/TopicEvaluation/" + file;

        Axios.get(`${filePath}`, {
            responseType: 'blob',
        }).then((res) => {
            let filename = filePath.replace(/^.*[\\\/]/, '')
            let fileExtension;
            fileExtension= filePath.split('.');
            fileExtension =fileExtension[fileExtension.length -1];
            fileDownload(res.data, `${filename}.${fileExtension}`);
        });
    }

    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
            <center><h1>Evaluate Topic</h1></center>

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

                    <h4>Document</h4>
                    <TextField fullWidth type="text" id="message" value={topicDocument}
                               onChange={(e)=>{
                                   setDocument(e.target.value)
                               }}
                               inputProps={{readOnly:true}}/>
                    <br/><br/>

                    <Button
                        variant="contained"
                        style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                        onClick={() => {handleClick(topicDocument)}}
                    >
                        Download Document
                    </Button>

                <h4>Status</h4>
                <Select native fullWidth type="text" id="status" value={status}
                       onChange={(e)=>{
                           setStatus(e.target.value)
                       }}>
                    <option value="#">Select Status</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </Select>


                <h4>Feedback</h4>
                <TextField fullWidth type="text" id="feedback" value={feedback}
                       onChange={(e)=>{
                           setFeedback(e.target.value)
                       }}
                />

                <br/><br/>

                <Link to='/panelMember'>
                    <Button variant="contained" color="info" style={{marginRight: "5px"}} onClick={handleSubmit}>Submit</Button>
                </Link>

                    <br/>
                    <br/><br/>
                </div>
            </form>
                </div>


        </div>
        </div>
    )
}