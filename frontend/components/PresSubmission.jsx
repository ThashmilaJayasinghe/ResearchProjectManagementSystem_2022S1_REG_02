import React, {useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {InputLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";


export default function DocSubmission(props){

    const {user} = useSelector((state) => state.auth) //used to get the user
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }


    const [title, setTitle] = useState("");
    const [type, setType] = useState(props.type);
    const [instructions, setInstructions] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [markingScheme, setMarkingScheme] = useState("");
    const [template, setTemplate] = useState("");

    // Calculating min date for date picker
    const date = new Date();
    // adding a day
    date.setDate(date.getDate() + 1);
    const isoDate = date.toISOString()
    const today = isoDate.substring(0, 10)

    const onChangeFileMS = e => {
        setMarkingScheme(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const onChangeFileT = e => {
        setTemplate(e.target.files[0]);
        console.log(e.target.files[0])
    }


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();


        formData.append("title", title);
        formData.append("type", type);
        formData.append("instructions", instructions);
        formData.append("dueDate", dueDate);
        formData.append("markingScheme", markingScheme);
        formData.append("template", template);


        axios.post('http://localhost:5000/api/admin/addAssignment', formData, config).then(()=>{
            alert('Submission added')
            window.location.href = "/managesubmissions";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div
            style={{
                borderRadius: "10px",
                margin: "10px",
                padding: "",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

            }}
        >
            <form encType={"multipart/form-data"}>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="title-label">Title</InputLabel>
                    <TextField
                        labelId="title-label"
                        type="text"
                        id="title"
                        required="required"
                        placeholder="Enter assignment title"
                        size= "small"
                        fullWidth
                        style = {{marginTop: "0.5rem"}}
                        value={title}
                        onChange={(e) =>(
                            setTitle(e.target.value)
                        )}
                    />
                </div>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="instructions-label">Instructions</InputLabel>
                    <TextField
                        labelId="instructions-label"
                        type="text" id="instructions"
                        placeholder="Enter instructions"
                        required="required"
                        size= "small"
                        fullWidth
                        style = {{marginTop: "0.5rem"}}
                        value={instructions}
                        onChange={(e) => (
                            setInstructions(e.target.value)
                        )}
                    />
                </div>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="date-label">Viva Date</InputLabel>
                    <TextField
                        labelId="date-label"
                        type="date"
                        InputProps={{inputProps: { min: today} }}
                        id="dueDate"
                        required="required"
                        placeholder="Select viva date"
                        size= "small"
                        fullWidth
                        style = {{marginTop: "0.5rem"}}
                        value={dueDate}
                        onChange={(e) => (
                            setDueDate(e.target.value)
                        )}
                    />
                </div>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="markingScheme-label" className="form-label">Upload Marking Scheme</InputLabel>
                    <input
                        labelId="markingScheme-label"
                        type="file"
                        required="required"
                        accept=".doc, .docx, .pdf"
                        className="markingScheme"
                        id="markingScheme"
                        name="markingScheme"
                        style = {{marginTop: "0.5rem"}}
                        onChange={onChangeFileMS}

                    />
                </div>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="template-label">Upload Template (.ppt or .pptx file)</InputLabel>
                    <input
                        labelId="template-label"
                        type="file"
                        required="required"
                        accept=".ppt, .pptx"
                        className="template"
                        id="template"
                        name="template"
                        style = {{marginTop: "0.5rem"}}
                        onChange={onChangeFileT}
                    />
                </div>
                <div style={{padding: "3rem" }}>
                    <center>
                        <Link to={'/managesubmissions'} style={{ textDecoration: 'none' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Link>
                    </center>
                </div>
            </form>
        </div>
    )
}