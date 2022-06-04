import React, {useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, InputLabel, TextField} from "@mui/material";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
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
    const [convertedText, setConvertedText] = useState("Some default content");

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
            // window.location.href = "/admin";

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
                        required="required"
                        id="title"
                        placeholder="Enter assignment title"
                        value={title}
                        size= "small"
                        fullWidth
                        style = {{marginTop: "0.5rem"}}
                        onChange={(e) =>(
                            setTitle(e.target.value)
                        )}
                    />
                </div>
                {/*<div>*/}
                {/*    <ReactQuill*/}
                {/*        theme='snow'*/}
                {/*        value={convertedText}*/}
                {/*        onChange={setConvertedText}*/}
                {/*        style={{minHeight: '300px'}}*/}
                {/*    />*/}
                {/*</div>*/}
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="instructions-label">Instructions</InputLabel>
                    <TextField
                        labelId="instructions-label"
                        type="text"
                        id="instructions"
                        required="required"
                        placeholder="Enter instructions"
                        value={instructions}
                        size= "small"
                        fullWidth
                        style = {{marginTop: "0.5rem"}}
                        onChange={(e) => (
                            setInstructions(e.target.value)
                        )}
                    />
                </div>
                <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                    <InputLabel id="date-label">Due Date</InputLabel>
                    <TextField
                        labelId="date-label"
                        type="date"
                        InputProps={{inputProps: { min: today} }}
                        id="dueDate"
                        required="required"
                        placeholder="Select due date"
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
                    <InputLabel id="markingScheme-label">Upload Marking Scheme</InputLabel>
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
                    <InputLabel id="template-label">Upload Template (.doc or .docx file)</InputLabel>
                    <input
                        labelId="template-label"
                        type="file"
                        required="required"
                        accept=".doc, .docx"
                        className="template"
                        id="template"
                        name="template"
                        style = {{marginTop: "0.5rem"}}
                        onChange={onChangeFileT}
                    />
                </div>
                <div style={{padding: "3rem" }}>
                    <center>
                        <Link to={'/admin'} style={{ textDecoration: 'none' }}>
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