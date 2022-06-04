import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function AddMarkPanel(){

    const {user} = useSelector((state)=> state.auth)
    const {id} = useParams();

    const [evaluator_ID, setUserID] = useState(user._id)
    const [grp_ID, setGrpID] = useState("");
    const [submissionID, setSubmisionID] = useState("")
    const [submission, setSubmision] = useState("")
    const [submissionType, setSubmisionType] = useState("")
    const [document, setDocument] = useState("")
    const [mark, setmark] = useState("")
    const [status, setStatus] = useState("")


    useEffect(()=>{
        setGrpID(localStorage.getItem('grp_ID'));
        setSubmisionID(localStorage.getItem('submissionID'));
        setSubmision(localStorage.getItem('submission'))
        setSubmisionType(localStorage.getItem('submissionType'))
        setDocument(localStorage.getItem('document'))
        setStatus(localStorage.getItem('status'))
    },[])


    const addMark = ((event)=>{
        const grouppmark = {
            grp_ID,
            evaluator_ID,
            submissionID,
            submission,
            submissionType,
            document,
            mark
        }

        const updateStatus = {
            submissionID,
            status : "Marked"
        }



        axios.post('http://localhost:5000/marks', grouppmark)
            .then(()=>{
                axios.put('http://localhost:5000/api/submissions/updateSubmissionStatus', updateStatus)
                    .then(()=>{

                    })
                    .catch((err)=>{
                        alert(err);
                    })
                alert("Successfully added group mark.")
            })
            .catch((err)=>{
                alert(err)
            })
    })

    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>

                <center><h1>Add Presentation Mark - Panel</h1></center>


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
                    <h4>Group ID  </h4>
                    <TextField fullWidth type='text' id='grp_ID' value={grp_ID}
                               onChange={(e)=>{
                                   setGrpID(e.target.value)
                               }}
                               readOnly/>

                    <h4>Submission   </h4>
                    <TextField fullWidth type='text' id='submission' value={submission}
                               onChange={(e)=>{
                                   setGrpID(e.target.value)
                               }}
                    />

                    <h4>Submission Type   </h4>
                    <TextField fullWidth type='text' id='submissionType' value={submissionType}
                               onChange={(e)=>{
                                   setGrpID(e.target.value)
                               }}
                    />

                    <h4>Document </h4>
                    <TextField fullWidth type='text' id='document' value={document}
                               onChange={(e)=>{
                                   setDocument(e.target.value)
                               }}
                    />


                    <h4>Marks   </h4>
                    <TextField fullWidth type='number' id='marks' value={mark}
                               onChange={(e)=>{
                                   setmark(e.target.value)
                               }}
                    />

                    <br/><br/>
                    <Link to={'/documentsEvaluationCoSupervisor'} >
                        <Button variant="contained" color="info" style={{marginRight: "5px"}} onClick={addMark}>Add Mark</Button>
                    </Link>
                    </div>
                </form>
                    </div>
            </div>
        </div>
    )
}