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
import download from 'downloadjs';

import fileDownload from 'js-file-download'

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
const Submissions = () =>{

    const { user } = useSelector((state) => state.auth);
    const [submission,setSubmissions] = useState([]);
    const [marks,setMarks] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/submit/getGroupSubmissions/'+user._id)
        .then((res)=>{
            const submission = res.data;
            setSubmissions(submission)
        }).catch(()=>{
            alert('Error in retrieving data');
        })
    
    },[])

   useEffect(()=>{
       const getMarks=()=>{
        axios.get('http://localhost:5000/marks/groupmarks/'+user._id)
        .then((res)=>{
            const data = res.data;
            setMarks(data)
            console.log(data)
        }).catch(()=>{
            alert('Error in retrieving data');
        })
    }
    getMarks()
   },[])

    return(
        <div>
            <div>
            <h1>Our Submissions</h1>
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
                        <StyledTableCell>Assingment</StyledTableCell>
                        <StyledTableCell>Assingment</StyledTableCell>
                        <StyledTableCell>Remove</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        submission.map((data)=>{

                            const onClickDown=(id,path,mimetype) =>{
                                try{
                                const res = axios.get('http://localhost:5000/submit/download/'+id , {
                                    responseType: "blob", 
                                })
                                // const file = new Blob([res.data]);
                                // return download(file, fileName, "image/png");
                                const split = path.split('/');
                                const filename = split[split.length - 1];
                                return download(res.data, filename, mimetype);
                              } catch (error) {
                                if (error.response && error.response.status === 400) {
                                }
                            }
                            }
                            const getGroupSubmissions=()=>{
                                axios.get('http://localhost:5000/submit/getGroupSubmissions/'+user._id)
                                .then((res)=>{
                                    const submissions = res.data;
                                    setSubmissions(submissions)
                                }).catch(()=>{
                                    alert('Error in retrieving data');
                                })
                            }

                            const onDelete = (id) =>{
                                if(window.confirm('Are you sure you want to delete this Submission?')){
                                axios.delete('http://localhost:5000/submit/delete/'+id)
                                .then(()=>{
                                    getGroupSubmissions();
                                })
                                .catch((err)=>{
                                    alert(err)
                                })
                            }
                            }
                            return(
                                <StyledTableRow>
                                    <StyledTableCell>{data.submissionstitle}</StyledTableCell>
                                    <StyledTableCell>{data.type}</StyledTableCell>
                                    <StyledTableCell>{data.document}</StyledTableCell>
                                    <StyledTableCell><Button variant="contained" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={()=>{handleClick(data.document)}}>Download </Button></StyledTableCell>
                                    <StyledTableCell><Button variant="contained" style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }} onClick={()=>onDelete(data._id)}>Remove</Button></StyledTableCell>
                                                                      
                                </StyledTableRow>
                            )
                        })
                    }
                </TableBody>
                </Table>
                </TableContainer>
                </div>
                </div> 
                <div>
                <h1>Our Submission Marks</h1>
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
                        <StyledTableCell>Marks</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        marks.map((data)=>{
                            console.log(data)
                            return(
                            data.submissions.map((datas)=>{
                                console.log(datas.submission)
                            return(
                                <StyledTableRow>
                                    <StyledTableCell>{datas.submission}</StyledTableCell>
                                    <StyledTableCell>{datas.submissionType}</StyledTableCell>
                                    <StyledTableCell>{datas.mark}</StyledTableCell>                                     
                                </StyledTableRow>
                            )
                        })
                            )
                        })
                    }
                </TableBody>
                </Table>
                </TableContainer>
                    </div>
                    </div>          
        </div>

        
    )
}

export default Submissions;