import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#064382",
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

export default function ResearchFields(){

    const [staffDetails,setStaffDetails] = useState([]);

    console.log(staffDetails)
    useEffect(()=>{
        const getStaffDetails=()=>{
            axios.get('http://localhost:5000/staff/')
                .then((res)=>{
                    const data = res.data;

                    setStaffDetails(data);
                    console.log("nnnn",res.data.name);
                }).catch(()=>{
                    alert('Error in retrieving data')
            })
        }
        getStaffDetails();

    },[])

    return(
        <div style={{paddingTop:"20px", margin: "40px"}}>
            <div  style={{
                borderRadius: "10px",
                margin: "10px",
                padding: "15px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

            }}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Qualifications</StyledTableCell>
                        <StyledTableCell>Research Interests</StyledTableCell>
                        <StyledTableCell>Supervisor</StyledTableCell>
                        <StyledTableCell>Co-Supervisor</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        staffDetails.map((data)=>{

                            const setSupervisor = (data)=>{
                                let {name , email} = data;
                                localStorage.setItem('name',name);
                                localStorage.setItem('email',email)
                            }
                            return(
                                <StyledTableRow>
                                    <StyledTableCell>{data.name}</StyledTableCell>
                                    <StyledTableCell>{data.email}</StyledTableCell>
                                    <StyledTableCell>{
                                        data.qualifications.map((quil)=>
                                            <li>{quil}</li>
                                        )
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {
                                            data.researchInterests.map((resI)=>
                                                <li>{resI}</li>
                                            )
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link to={'/request'}>
                                        <Button style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} variant="contained" onClick={()=>setSupervisor(data)}>Select</Button>
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link to={'/request/co'}>
                                        <Button style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} variant="contained" onClick={()=>setSupervisor(data)}>Select</Button>
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    )
}
