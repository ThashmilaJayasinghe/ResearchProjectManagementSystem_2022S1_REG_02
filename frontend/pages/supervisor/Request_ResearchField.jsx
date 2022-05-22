import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {changeRequestStates, getAllRequests, getSupRequests} from "../../apis/supervisor/SupervisorApi";

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

const data = [
    {groupName: "groupName1", groupId: "g001", topic: "Cloud computing1", supervisor: "nuwan1"},
    {groupName: "groupName2", groupId: "g002", topic: "Cloud computing2", supervisor: "nuwan2"},
    {groupName: "groupName3", groupId: "g003", topic: "Cloud computin3", supervisor: "nuwan3"},
    {groupName: "groupName4", groupId: "g004", topic: "Cloud computing4", supervisor: "nuwan4"},
    {groupName: "groupName5", groupId: "g005", topic: "Cloud computing5", supervisor: "nuwan5"}
]

const Request_ResearchField = () => {

    const [requestDetails, setRequestDetails] = useState([]);
    const [supEmail, setSupEmail] = useState("Kushnaya@gmail.com");
    const [supRequests, setSupRequests] = useState([]);

    const onAcceptClick = (groupId) => {
        const accept  = "accepted"
        changeRequestStates(groupId, accept).then(res => console.log("successfully changed!"))
    }

    const onRejectClick = (groupId) => {
        const reject  = "rejected"
        changeRequestStates(groupId, reject).then(res => console.log("successfully changed!"))
    }

    useEffect(() => {
        getSupRequests(supEmail, setSupRequests)
            .then(res => console.log("success"))
            .catch(err => console.log(err))

    }, [])


    return (
        <div style={{paddingTop:"20px", margin: "40px"}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Group Id</StyledTableCell>
                            <StyledTableCell align="center">Group Name</StyledTableCell>
                            <StyledTableCell align="center">Topic&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Added date&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Decision&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {supRequests.map((data) => (
                            <StyledTableRow key={data.requestedGroupID}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {data.requestedGroupID}
                                </StyledTableCell>
                                <StyledTableCell align="center">{data.requestedGroup}</StyledTableCell>
                                <StyledTableCell align="center">{data.topic}</StyledTableCell>
                                <StyledTableCell align="center">{data.createdAt}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {/*<botton style = {{border: "1px solid black", padding: "5px", marginRight:"5px"}}>Accept</botton>*/}

                                    <button style={{padding:"10px", marginRight: "5px"}}>View</button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        style={{marginRight: "5px"}}
                                        onClick = {() => onAcceptClick(data._id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick = {() => onRejectClick(data._id)}
                                    >
                                        Reject
                                    </Button>
                                    {/*<botton style = {{border: "1px solid black", padding: "5px", marginRight:"5px"}}>Reject</botton>*/}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



        </div>
    )
}
export default Request_ResearchField;