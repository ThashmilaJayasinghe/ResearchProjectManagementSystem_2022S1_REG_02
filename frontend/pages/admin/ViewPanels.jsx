import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {List, ListItem, TextField} from "@mui/material";
import {useState, useEffect, useRef} from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #053769',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};


export default function SelectUser() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

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
                                                handleOpen()
                                            })

                                    }

                                    const viewStaff = (staff) => {

                                            staff.map((smember) => {

                                                Axios.get("http://localhost:5000/api/users/" + smember, config)
                                                    .then((res) => {
                                                        setStaffNames(res.data)
                                                        console.log(res.data)
                                                        handleOpen2()
                                                    })
                                            })
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
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {viewStaff(panel.staff)}}
                                                >
                                                    View Staff Members
                                                </Button>
                                                <Modal
                                                    open={open2}
                                                    onClose={handleClose2}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            Staff Members:
                                                        </Typography>
                                                        <List>
                                                            <ListItem disablePadding>
                                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                    Harry Potter
                                                                </Typography>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                    Mary Smith
                                                                </Typography>
                                                            </ListItem>
                                                            <ListItem disablePadding>
                                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                    Ann Murray
                                                                </Typography>
                                                            </ListItem>
                                                        </List>
                                                    </Box>
                                                </Modal>

                                            </TableCell>
                                            <TableCell sx={{ width: "30%" }}>
                                                <Button
                                                    variant="contained"
                                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                                    onClick={() => {viewGroup(panel.groups[0])}}
                                                >
                                                    View Group
                                                </Button>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            Group Name: {groupName}
                                                        </Typography>
                                                    </Box>
                                                </Modal>
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