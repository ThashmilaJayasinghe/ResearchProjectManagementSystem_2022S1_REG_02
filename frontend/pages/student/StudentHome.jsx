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
import { Link } from "react-router-dom";

import fileDownload from 'js-file-download'
import ReactQuill from "react-quill";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#064382',
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

const handleClick = (file) => {

    let filePath = "../../public/submissions/" + file;

    axios.get(`${filePath}`, {
        responseType: 'blob',
    }).then((res) => {
        let filename = filePath.replace(/^.*[\\\/]/, '')
        let fileExtension;
        fileExtension= filePath.split('.');
        fileExtension =fileExtension[fileExtension.length -1];
        fileDownload(res.data, `${filename}.${fileExtension}`);
    });
}

const StudentHome = () =>{

    const [submissionTypes,setSubmissionTypes] = useState([]);
   
    useEffect(()=>{
        axios.get('http://localhost:5000/student/allSubmitTypes')
        .then((res)=>{
            const data = res.data;

            setSubmissionTypes(data);
        }).catch(()=>{
            alert('Error in retrieving data')
        })
    },[])
    return(

        <div style={{paddingTop:"10px", margin: "20px"}}>

            <h1>Here your Assingments</h1>
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
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Instuctions</StyledTableCell>
                        <StyledTableCell>Due date</StyledTableCell>
                        <StyledTableCell>Assingment</StyledTableCell>
                        <StyledTableCell>Do Submission</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        submissionTypes.map((data)=>{

                            const setTypes = (data)=>{
                                let {title , type} = data;
                                localStorage.setItem('title',title);
                                localStorage.setItem('type',type)
                            }
                            return(
                                <StyledTableRow>
                                    <StyledTableCell>{data.title}</StyledTableCell>
                                    <StyledTableCell>{data.type}</StyledTableCell>
                                    {/*<StyledTableCell>{data.instructions}</StyledTableCell>*/}
                                    <StyledTableCell>
                                        <ReactQuill
                                            value={data.instructions}
                                            readOnly={true}
                                            style={{minHeight: '30px', marginTop: "0.5rem"}}
                                            theme={"bubble"}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>{data.dueDate}</StyledTableCell>
                                    <StyledTableCell><Button variant="contained" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={()=>{handleClick(data.template)}}>Download </Button></StyledTableCell>
    
                                    <StyledTableCell>
                                        <Link to={'/submit'}>
                                        <Button variant="contained" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={()=>setTypes(data)}>Submit</Button>
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

export default StudentHome;