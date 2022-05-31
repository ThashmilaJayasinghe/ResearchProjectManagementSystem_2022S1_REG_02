import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

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
const Submissions = () =>{

    const { user } = useSelector((state) => state.auth);
    const [submissions,setSubmissions] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/submit/'+user._id)
        .then((res)=>{
            const submissions = res.data;
            setSubmissions(submissions)
        }).catch(()=>{
            alert('Error in retrieving data');
        })
    })

   
    return(
        <div>
            <h1>Our Submissions</h1>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Assingment</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        submissions.map((data)=>{

                            const onClickDown=() =>{
                                axios.get('http://localhost:5000/submit/download/'+data._id)
                                .then(()=>{
                                    alert("Downloaded")
                                }).catch((err)=>{
                                    alert(err)
                                })
                            }
                            return(
                                <StyledTableRow>
                                    <StyledTableCell>{data.submissionstitle}</StyledTableCell>
                                    <StyledTableCell>{data.type}</StyledTableCell>
                                    <StyledTableCell><button onClick={onClickDown}>{data.document}</button></StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                </TableBody>
                </Table>
                </TableContainer>
        </div>
    )
}

export default Submissions;