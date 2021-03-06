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
import {changeRequestStates, getAllRequests, getSupRequests} from "../../apis/staff/RequestSupervisorApi";
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress} from "@mui/material";
import { useSelector } from 'react-redux';
import { AlignHorizontalCenter } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Lottie from 'react-lottie'
import notFountAnimation from '../../components/looties/notFoundError.json'
// import noDataAvailableAnimation from '../../components/looties/noData.json'

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

const data = [
    {groupName: "groupName1", groupId: "g001", topic: "Cloud computing1", supervisor: "nuwan1"},
    {groupName: "groupName2", groupId: "g002", topic: "Cloud computing2", supervisor: "nuwan2"},
    {groupName: "groupName3", groupId: "g003", topic: "Cloud computin3", supervisor: "nuwan3"},
    {groupName: "groupName4", groupId: "g004", topic: "Cloud computing4", supervisor: "nuwan4"},
    {groupName: "groupName5", groupId: "g005", topic: "Cloud computing5", supervisor: "nuwan5"}
]

const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
});

const unableToResolve = {
    loop: true,
    autoplay: true,
    animationData: notFountAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

// const noDataAvailable = {
//     loop: true,
//     autoplay: true,
//     animationData: noDataAvailableAnimation,
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice"
//     }
// }

const Request_ResearchField = () => {

    const {user} = useSelector((state) => state.auth) //used to get the user

    const [requestDetails, setRequestDetails] = useState([]);
    const [supEmail, setSupEmail] = useState(user.email);
    const [supRequests, setSupRequests] = useState([]);
    const [open, setOpen] = useState(false);
    const [onViewClick, setOnViewClick] = useState({});
    const [reqState, setReqState] = useState("");
    const [isTimeOut, setIsTimeOut] = useState(false);

    const handleClickModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const onAcceptClick = (groupId, actualGroupId) => {

        toast.success('Request accepted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const accept  = "accepted"
        setReqState(accept);
        changeRequestStates(groupId, accept, actualGroupId, user._id).then(res => console.log("successfully changed!"))
    }

    const onRejectClick = (groupId) => {

        toast.info('Request Rejected!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        const reject  = "rejected"
        setReqState(reject);
        const actualGroupId = ""
        changeRequestStates(groupId, reject, actualGroupId, user._id).then(res => console.log("successfully changed!"))
    }

    useEffect(() => {
        async function getData() {
            await getSupRequests(supEmail, setSupRequests)
                .then(res => console.log("success"))
                .catch(err => console.log(err))
        }
        getData().then(() => console.log("loading..."))

    }, [reqState])

    useEffect(() => {
        const timer = setTimeout(() => {
            if(supRequests.length > 0){
                setIsTimeOut(false)
            }
            else{
                setIsTimeOut(true)
            }
        }, 5000);
        return () => clearTimeout(timer)
    }, [supRequests])

    console.log(supRequests)

    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                {/* Same as */}
            <ToastContainer />
            {
                !isTimeOut ?
                <>
                    <center><h1>Requests as Supervisor</h1></center>
                    {
                        !supRequests.length < 1 ? 
                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Group Id</StyledTableCell>
                                            <StyledTableCell align="center">Topic&nbsp;</StyledTableCell>
                                            <StyledTableCell align="center">Added date&nbsp;</StyledTableCell>
                                            <StyledTableCell align="center">Checked&nbsp;</StyledTableCell>
                                            <StyledTableCell align="center">&nbsp;</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {supRequests.map((data) => (
                                        <>
                                            <StyledTableRow key={data.requestedGroupID}>
                                                <StyledTableCell component="th" scope="row" align="center">
                                                    {data.requestedGroupID}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{data.topic}</StyledTableCell>
                                                <StyledTableCell align="center">{formatter.format(Date.parse(data.createdAt))}</StyledTableCell>
                                                <StyledTableCell align="center">

                                                    {
                                                        data.requestStates ? (
                                                            <>
                                                            {
                                                                data.requestStates == "rejected" ?
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-1 w-1" fill="none"
                                                                            viewBox="-14 0 60 24" stroke="#d4503b" stroke-width="1">
                                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                                                                        </svg>
                                                                    </>
                                                                    : (
                                                                        <>
                                                                            {
                                                                                data.requestStates == "accepted" ?
                                                                                <>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                                                                        viewBox="-14 0 60 24" stroke="#49de73" stroke-width="1">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                                                                    </svg>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <div style={{color: "#f5c425"}}>Not marked</div>
                                                                                </>
                                                                            }
                                                                        </>
                                                                    )
                                                            }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div style={{color: "#f5c425"}}>Not marked</div>
                                                            </>
                                                            )
                                                    }


                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    <Button variant="contained"
                                                            onClick={() => (setOnViewClick(data), handleClickModalOpen())}
                                                    >View</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <div>
                                <Dialog
                                    open={open}
                                    onClose={handleModalClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    fullWidth={true}

                                >
                                    <DialogTitle id="alert-dialog-title">
                                        <b> {onViewClick.topic}</b>
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <table width="100%">
                                                <tr style={{height: "40px"}}>
                                                    <td>Group ID</td>
                                                    <td>: {onViewClick.requestedGroupID}</td>
                                                </tr>
                                                <tr style={{height: "40px"}}>
                                                    <td>Added date</td>
                                                    {/* <td>: {formatter.format(Date.parse(onViewClick.createdAt))}</td> */}
                                                    <td>: {onViewClick.createdAt}</td>
                                                </tr>
                                                {/* <tr style={{height: "40px"}} >
                                                    <td >Details</td>
                                                    <td>: {onViewClick.details}</td>
                                                </tr> */}
                                                <tr style={{height: "40px"}}>
                                                    <td>Current status</td>
                                                    <td>: {onViewClick.requestStates}</td>
                                                </tr>
                                            </table>
                                            {/*<h2>Group ID : {onViewClick.requestedGroupID}</h2>*/}
                                            {/*<h4>Added date : {onViewClick.createdAt}</h4>*/}
                                            {/*<h4>Details :</h4>*/}
                                            {/*<p>{onViewClick.details}</p>*/}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            style={{marginRight: "5px"}}
                                            onClick = {() => (onAcceptClick(onViewClick._id, onViewClick.requestedGroupID), handleModalClose())}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick = {() => (onRejectClick(onViewClick._id), handleModalClose())}
                                        >
                                            Reject
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                    </div> : (
                            <div style={{paddingTop: "4rem"}}>
                                <Box sx={{ width: '50%', margin: "auto"}}>
                                    <LinearProgress />
                                </Box>
                            </div> 
                        )
                    }

                </>
                : (
                    <>
                        <div>
                            <Lottie 
                                options={unableToResolve}
                                height={450}
                                width={450}
                            />
                        </div>
                    </>
                )
            }


        </div>
    )
}
export default Request_ResearchField;