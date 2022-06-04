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
    const [staffNames, setStaffNames] = useState([]);
    const [groupName, setGroupName] = useState("")

    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:5000/api/admin/allPanels", config)
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
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {panels
                                .map((panel, index) => {

                                    const getPanels = () => {
                                        Axios.get("http://localhost:5000/api/admin/allPanels", config)
                                            .then((getPanels) => {
                                                setPanels(getPanels.data);
                                            })
                                            .catch((err) => {
                                                alert(err)
                                            })
                                    }

                                    const onDelete = (id) => {

                                        if (window.confirm('Do you wish to delete this panel?')) {
                                            Axios.delete("http://localhost:5000/api/admin/deletePanel/" + id, config)
                                                .then(() => {
                                                    getPanels();
                                                    alert("Panel Deleted");
                                                })
                                        }
                                    }

                                    const viewGroup = (id) => {

                                        Axios.get("http://localhost:5000/api/admin/group/" + id, config)
                                            .then((res) => {
                                                setGroupName(res.data)
                                                console.log(res.data)
                                                console.log(groupName)
                                            })
                                    }

                                    const viewStaff = (staff) => {

                                            staff.map((smember) => {

                                                Axios.get("http://localhost:5000/api/users/" + smember, config)
                                                    .then((res) => {
                                                        setStaffNames(res.data)
                                                        console.log(res.data)
                                                        // console.log(staffNames)
                                                    })
                                            })

                                        // console.log(staff)
                                    }


                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ width: "30%" }}>
                                                {panel.name}
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }}>
                                                {/*{panel.staff.map((pmem) => {*/}
                                                {/*    return (*/}
                                                {/*        <li>{pmem}</li>*/}

                                                {/*    )*/}
                                                {/*})}*/}
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {viewStaff(panel.staff)}}
                                                >
                                                    View Staff Members
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }}>
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {viewGroup(panel.groups[0])}}
                                                >
                                                    View Group
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{ width: "10%" }} align="center">
                                                <div style={{ display: "flex", gap: "1rem" }}>
                                                    <div style={{cursor: "pointer"}} onClick={() => onDelete(panel._id)}>
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