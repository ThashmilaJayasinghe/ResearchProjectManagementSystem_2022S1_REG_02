import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function EvaluatePresentation(){

    const {user} = useSelector((state)=> state.auth)
    const [userID, setUserID] = useState(user._id)

    const[presentations, setPresentations] = useState([]);

    useEffect(()=>{

        function getPresentations() {
            axios.get('http://localhost:5000/api/submissions/panelPresentations', {params: {id: userID}})
                .then((res) => {
                    console.log(res.data);
                    setPresentations(res.data);
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
        getPresentations();
    },[])

    return(
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center><h1>Presentations Evaluation</h1></center>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Index</StyledTableCell>
                    <StyledTableCell align="center">Group ID</StyledTableCell>
                    <StyledTableCell align="center">Title</StyledTableCell>
                    <StyledTableCell align="center">Document</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {presentations.map((presentation, index)=>{

                    const passDocument = (presentation)=>{
                        let{_id, submissionstitle, type, groupId, document,status}=presentation;

                        localStorage.setItem('submissionID', _id)
                        localStorage.setItem('submission', submissionstitle)
                        localStorage.setItem('submissionType', type)
                        localStorage.setItem('document', document)
                        localStorage.setItem('grp_ID', groupId)
                        localStorage.setItem('status', status)
                    }


                    return(
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row" align="center" key={index}>{index+1}</StyledTableCell>
                            <StyledTableCell align="center">{presentation.groupId}</StyledTableCell>
                            <StyledTableCell align="center">{presentation.submissionstitle}</StyledTableCell>
                            <StyledTableCell align="center">{presentation.document}</StyledTableCell>
                            <StyledTableCell align="center">{presentation.status}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Link to={'/AddMarkPanel/'+presentation._id}>
                                    <Button variant="contained" onClick={()=>{passDocument(presentation)}}>View</Button>
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    )
                })}
                </TableBody>

            </Table>
            </TableContainer>
        </div>
    )
}