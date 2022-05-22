import React, {useState} from 'react';
import axios from "axios";

export default function AddMarks(){

    const [grp_ID, setGrpID] = useState('grp33')
    const [submission, setSubmission] = useState("submission 2");
    const [submissionType, setSubmissionType] = useState("document");
    const [mark, setMark] = useState(85)
    const [evaluator_ID, setEvaluatorID] = useState("superv3")

    const handleSubmit = (event)=>{

        const newMark = {
            grp_ID,
            submission,
            submissionType,
            mark,
            evaluator_ID
        }
        axios.post('http://localhost:5000/marks', newMark)
            .then(()=>{
            alert(`${grp_ID} : mark added successfully`)
        })
            .catch((err)=>{
                alert(err)
            })
    }

    return(
        <div>
            <h1>Add Marks</h1>
             <form onSubmit={handleSubmit}>
                 <lable>Group </lable>
                 <input type="text" id='grp_ID' value={grp_ID}/>
                 <br/><br/>

                 <lable>Submission </lable>
                 <input type="text" id='submission' value={submission}/>
                 <br/><br/>

                 <lable>Submission Type</lable>
                 <input type="text" id='submissionType' value={submissionType}/>
                 <br/><br/>

                 <lable>Add mark </lable>
                 <input type="Number" id='mark' value={mark}/>
                 <br/><br/>

                 <lable>Evaluator ID </lable>
                 <input type="text" id='evaluator_ID' value={evaluator_ID}/>
                 <br/><br/>

                 <input type="submit"/>
             </form>
        </div>

    )
}