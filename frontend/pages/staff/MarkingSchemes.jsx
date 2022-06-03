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
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export default function SelectUser(props) {

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
                    Marking Schemes
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
                                .map((subType) => {
                                    return (
                                        <TableRow
                                            key={subType.title}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ width: "50%" }}>
                                                {subType.title}
                                            </TableCell>
                                            <TableCell sx={{ width: "50%" }} align="center">
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#646FD4", marginTop: "0.5rem" }}
                                                    onClick={() => {handleClick(subType.markingScheme)}}
                                                >
                                                    Download Marking Scheme
                                                </Button>
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