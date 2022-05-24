import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";


export default function AddTopicStatus(){

    const {id} = useParams();

    const [title, setTitle] = useState("")
    const [grp_ID, setGrpID] = useState("")
    const [status, setStatus] = useState("")
    const [feedback, setFeedback] = useState("")
    const [supervisorName, setSuprvName] = useState('');

    useEffect(()=>{
        setTitle(localStorage.getItem('title'))
        setGrpID(localStorage.getItem('grp_ID'))
        setStatus(localStorage.getItem('status'))
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
        <div>
            <h1>Evaluate Topic</h1>

            <form>
                <label>Group ID</label>

                <input type="text" id="grp_ID" value={grp_ID}
                onChange={(e)=>{
                    setGrpID(e.target.value)
                }}
                />
                <br/><br/>

                <label>Supervisor Name</label>
                <input type="text" id="supervisorName" value={supervisorName}
                       onChange={(e)=>{
                           setSuprvName(e.target.value)
                       }}
                />
                <br/><br/>

                <label>Title</label>
                <input type="text" id="title" value={title}
                       onChange={(e)=>{
                           setTitle(e.target.value)
                       }}
                />
                <br/><br/>

                <label>Status</label>
                <select type="text" id="status" value={status}
                       onChange={(e)=>{
                           setStatus(e.target.value)
                       }}>
                    <option value="#">Select Status</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>


                <br/><br/>

                <label>Feedback</label>
                <input type="text" id="feedback" value={feedback}
                       onChange={(e)=>{
                           setFeedback(e.target.value)
                       }}
                />
                <br/><br/>

                <Link to='/view'>
                    <button onClick={handleSubmit}>Submit</button>
                </Link>
            </form>
        </div>
    )
}