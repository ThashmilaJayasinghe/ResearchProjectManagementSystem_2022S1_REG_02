import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#093e94",
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


export default function DocumentEvalCoSupervisor(){

    const {user} = useSelector((state)=> state.auth)
    const [userID, setUserID] = useState(user._id)

    const[documents, setDocuments] = useState([])

    useEffect(()=>{

        function getDocuments() {

            axios.get('http://localhost:5000/api/submissions/co-supervisorDocuments', {params: {id: userID}})
                .then((res) => {
                    console.log(res.data);
                    setDocuments(res.data)
                })
                .catch((err) => {
                    alert(err.message)
                })
        }

        getDocuments();
    },[])

    return(
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center> <h1>Documents Evaluations / co-supervisor</h1></center>

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
                {documents.map((documentt, index)=>{

                    const passDocument = (documentt)=>{
                        let{_id, submissionstitle, type, groupId, document,status}=documentt;

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
                         <StyledTableCell align="center">{documentt.groupId}</StyledTableCell>
                         <StyledTableCell align="center">{documentt.submissionstitle}</StyledTableCell>
                         <StyledTableCell align="center">{documentt.document}</StyledTableCell>
                         <StyledTableCell align="center">{documentt.status}</StyledTableCell>
                            <StyledTableCell align="center">
                             <Link to={'/addmark/'+documentt._id}>
                             <Button variant="contained" onClick={()=>{passDocument(documentt)}}>View</Button>
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