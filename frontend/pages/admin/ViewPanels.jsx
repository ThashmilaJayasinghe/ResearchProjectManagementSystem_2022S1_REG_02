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


export default function SelectUser() {

    const [panels, setPanels] = useState([]);

    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:5000/api/admin/allPanels")
            .then((res) => {
                setPanels(res.data)
            })

    }, [user, navigate]);


    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center>
                <Typography variant="h4">
                    Panel Details
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
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Staff Members</TableCell>
                                <TableCell>Group</TableCell>
                                {/*<TableCell>Actions</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {panels
                                .map((panel, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ width: "30%" }}>
                                                {panel.name}
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }}>
                                                {panel.staff.map((pmember) => {

                                                    Axios.get("http://localhost:5000/api/admin/allPanels")
                                                        .then((res) => {
                                                            setPanels(res.data)
                                                        })

                                                    return (
                                                        <li>{pmember}</li>

                                                    )
                                            })}
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }}>
                                                {panel.groups.map((group) => {
                                                    return (
                                                        <li>{group}</li>

                                                    )
                                                })}
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