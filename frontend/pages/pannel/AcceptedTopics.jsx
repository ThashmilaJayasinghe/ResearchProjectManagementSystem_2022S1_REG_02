import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

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


export default function AcceptedTopics(){

    const {user} = useSelector((state) => state.auth)
    console.log(user)

    const [topics, setTopics] = useState([])
    const [userID, setUserID] = useState(user._id)



    useEffect(()=>{

        function getTopics(){

            axios.get('http://localhost:5000/topic/panelTopicsAccepted',{params:{id:userID}})
                .then((res)=>{
                    console.log(res.data)
                    setTopics(res.data)
                })
                .catch((err)=>{
                    alert(err.message);
                })
        }

        getTopics();

    },[])

    return(
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center><h1>Topic Evaluation</h1></center>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"> index </StyledTableCell>
                            <StyledTableCell align="center"> Group ID</StyledTableCell>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Submitted Date</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topics.map((topic, index)=>{

                            const passTopic = (topic)=>{
                                let {_id, grp_ID, title, status, message, feedback} = topic;

                                localStorage.setItem('_id', _id)
                                localStorage.setItem('grp_ID', grp_ID)
                                localStorage.setItem('title', title)
                                localStorage.setItem('status',status)
                                localStorage.setItem('message', message)
                                localStorage.setItem('feedback', feedback)
                            }

                            return(
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row" align="center" key={index}>{index+1}</StyledTableCell>
                                    <StyledTableCell align="center">{topic.grp_ID}</StyledTableCell>
                                    <StyledTableCell align="center">{topic.title}</StyledTableCell>
                                    <StyledTableCell align="center">{topic.evaluated_Date.substring(0,10)}</StyledTableCell>
                                    <StyledTableCell align="center">{
                                        topic.status ? (
                                            <>
                                                {
                                                    topic.status == "Rejected" ?
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-1 w-1" fill="none"
                                                                 viewBox="-14 0 60 24" stroke="#d4503b" stroke-width="1">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                                                            </svg>
                                                        </>
                                                        : (
                                                            <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                                                     viewBox="-14 0 60 24" stroke="#49de73" stroke-width="1">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                                                </svg>
                                                            </>
                                                        )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <div style={{color: "yellow"}}>Not marked</div>
                                            </>
                                        )
                                    }</StyledTableCell>

                                    <StyledTableCell align="center">
                                        <Link to={'/viewTopicEvaluated'}>
                                            <Button variant="contained" onClick={()=>{passTopic(topic)}}>View</Button>
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