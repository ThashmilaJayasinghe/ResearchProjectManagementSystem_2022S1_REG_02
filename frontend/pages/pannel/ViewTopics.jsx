import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";


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


export default function ViewTopics(){

    const {user} = useSelector((state) => state.auth)
    console.log(user)

    const [topics, setTopics] = useState([])
    const [userID, setUserID] = useState(user._id)



    useEffect(()=>{

        function getTopics(){

            axios.get('http://localhost:5000/topic/panelTopics',{params:{id:userID}})
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
                     let {_id, grp_ID, title, status, message} = topic;

                     localStorage.setItem('_id', _id)
                     localStorage.setItem('grp_ID', grp_ID)
                     localStorage.setItem('title', title)
                     localStorage.setItem('status',status)
                     localStorage.setItem('message', message)
                     }

                    return(
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row" align="center" key={index}>{index+1}</StyledTableCell>
                            <StyledTableCell align="center">{topic.grp_ID}</StyledTableCell>
                            <StyledTableCell align="center">{topic.title}</StyledTableCell>
                            <StyledTableCell align="center">{topic.evaluated_Date.substring(0,10)}</StyledTableCell>
                            <StyledTableCell align="center">{topic.status}</StyledTableCell>

                            <StyledTableCell align="center">
                                <Link to={'/addTopicStatus/'+topic._id}>
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