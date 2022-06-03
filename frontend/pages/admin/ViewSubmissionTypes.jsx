import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {useState, useEffect, useRef} from "react";
import Axios from "axios";
import fileDownload from 'js-file-download'
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export default function ViewSubmissionTypes() {

    const [subTypes, setSubTypes] = useState([]);


    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    const handleClick = (file) => {

        let filePath = "../../public/Marking_Schemes/" + file;

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

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:5000/student/allSubmitTypes")
            .then((res) => {
                setSubTypes(res.data)
            })

    }, [user, navigate]);


    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center>
                <Typography variant="h4">
                    Submission Types
                </Typography>
            </center>
            <div
                style={{
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableBody>
                            {subTypes
                                .map((subType, index) => {

                                    const getSubTypes = () => {
                                        Axios.get("http://localhost:5000/student/allSubmitTypes")
                                            .then((getSubTypes) => {
                                                setSubTypes(getSubTypes.data);
                                            })
                                            .catch((err) => {
                                                alert(err)
                                            })
                                    }

                                    const onDelete = (id) => {

                                        if (window.confirm('Do you wish to delete this submission type?')) {
                                            Axios.delete("http://localhost:5000/api/admin/deleteAssignment/" + id)
                                                .then(() => {
                                                    getSubTypes();
                                                    alert("Submission Type Deleted");
                                                })
                                        }
                                    }

                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ width: "30%" }}>
                                                {subType.title}
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }} align="center">
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {handleClick(subType.markingScheme)}}
                                                >
                                                    Download Marking Scheme
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }} align="center">
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {handleClick(subType.template)}}
                                                >
                                                    Download Template
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ width: "10%" }} align="center">
                                                <div style={{ display: "flex", gap: "1rem" }}>
                                                    <div style={{cursor: "pointer"}} onClick={() => onDelete(subType._id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width='1.2rem' height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="#ed2121" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}