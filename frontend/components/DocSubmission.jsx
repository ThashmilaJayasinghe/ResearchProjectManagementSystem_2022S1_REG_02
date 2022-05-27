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


    const onMSChangeFile = e => {
        setMarkingScheme(e.target.files[0]);
    }

    const onTChangeFile = e => {
        setTemplate(e.target.files[0]);
    }

    // const onChangeFile = e => {
    //     const file = e.target.files[0]
    //     this.setState(() => ({ file }));
    // }


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();


        formData.append("title", title);
        formData.append("type", type);
        formData.append("instructions", instructions);
        formData.append("dueDate", dueDate);
        formData.append("markingScheme", markingScheme);
        formData.append("template", template);


        axios.post('http://localhost:5000/api/admin/addAssignment', formData).then(()=>{
            alert('Submission added')
            window.location.href = "/admin";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className='container'>
            <form encType={"multipart/form-data"}>

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
                <div className="form-group">
                    <label htmlFor="markingScheme" className="form-label">Upload Marking Scheme</label>
                    <br />
                    <input
                        type="file"
                        required
                        accept=".doc, .docx, .pdf"
                        className="markingScheme"
                        id="markingScheme"
                        name="markingScheme"
                        onChange={onMSChangeFile}
                    />
                </div>
                <br/>
                {/*<div className="form-group col-md-6">*/}
                {/*    <label><b>Template</b> </label>*/}
                {/*    <input type="text" id="template" className="form-control" placeholder="Upload file"*/}
                {/*           value={template}*/}
                {/*           onChange={(e) => (*/}
                {/*               setTemplate(e.target.value)*/}
                {/*           )}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="template" className="form-label">Upload Template</label>
                    <br />
                    <input
                        type="file"
                        required
                        accept=".ppt, .pptx, .doc"
                        className="template"
                        id="template"
                        name="template"
                        onChange={onTChangeFile}

                    />
                </div>
                <br/>
                <br/>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}