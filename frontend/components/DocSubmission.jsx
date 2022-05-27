import React, {useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function DocSubmission(props){

    const [title, setTitle] = useState("");
    const [type, setType] = useState(props.type);
    const [instructions, setInstructions] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [markingScheme, setMarkingScheme] = useState("");
    const [template, setTemplate] = useState("");


    const handleSubmit = () => {

        const newItem = {
            title,
            type,
            instructions,
            dueDate,
            markingScheme,
            template
        }

        axios.post('http://localhost:5000/api/admin/addAssignment', newItem).then(()=>{
            alert('Submission added')
            window.location.href = "/admin";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className='container'>
            <form>

                <div className="form-group col-md-6">
                    <label><b>Title</b> </label>
                    <input type="text" id="title" className="form-control" placeholder="Enter assignment title" value={title}
                           onChange={(e) =>(
                               setTitle(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Instructions</b> </label>
                    <input type="text" id="title" className="form-control" placeholder="Enter instructions"
                           value={instructions}
                           onChange={(e) => (
                               setInstructions(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Due Date</b> </label>
                    <input type="date" id="dueDate" className="form-control" placeholder="Select due date"
                           value={dueDate}
                           onChange={(e) => (
                               setDueDate(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Marking Scheme</b> </label>
                    <input type="text" id="markingScheme" className="form-control" placeholder="Upload file" value={markingScheme}
                           onChange={(e)=>(
                               setMarkingScheme(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Template</b> </label>
                    <input type="text" id="template" className="form-control" placeholder="Upload file"
                           value={template}
                           onChange={(e) => (
                               setTemplate(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <br/>
                <Link to={'/admin'}>
                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                </Link>
            </form>
        </div>
    )
}