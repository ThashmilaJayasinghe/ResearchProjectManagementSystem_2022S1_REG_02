import React from "react";
import {useState} from "react";
import axios from "axios";
export default function AddTopicStatus(){

    const [title, setTitle] = useState("Hybrid Architecture")
    const [grp_ID, setGrpID] = useState("grp 20")
    const [status, setStatus] = useState("Accepted")
    const [feedback, setFeedback] = useState("Continue the project")
    const [supervisorName, setSuprvName] = useState('Viny');

    const handleSubmit = ((event)=>{
        const newTopicStatus = {
            title,
            grp_ID,
            status,
            feedback,
            supervisorName
        }

        axios.post('http://localhost:5000/topic', newTopicStatus)
            .then(()=>{
                alert('Succesfully added topic status')
            })
            .catch((err)=>{
                alert(err)
            })
     })

    return(
        <div>
            <h1>Evaluate Topic</h1>

            <form onSubmit={handleSubmit}>
                <label>Group ID</label>
                <input type="text" id="grp_ID" value={grp_ID}/>
                <br/><br/>

                <label>Supervisor Name</label>
                <input type="text" id="supervisorName" value={supervisorName}/>
                <br/><br/>

                <label>Title</label>
                <input type="text" id="title" value={title}/>
                <br/><br/>

                <label>Status</label>
                <input type="text" id="status" value={status}/>
                <br/><br/>

                <label>Feedback</label>
                <input type="text" id="feedback" value={feedback}/>
                <br/><br/>

                <input type={"submit"}/>
            </form>
        </div>
    )
}