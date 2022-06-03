import axios from "axios";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {Button} from "@mui/material";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function RegisterNumber() {

    const { user } = useSelector((state) => state.auth);

    const [regNumber,setRegNumber] = useState("");
    // const [registered, setRegistered] = useState("");
    //
    // const isAvailable=()=>{
    //     axios.get('http://localhost:5000/student/isAvailabale/'+user._id)
    //         .then((res)=>{
    //             setRegistered(res.data);
    //             console.log(res.data)
    //         }).catch((err)=>{
    //         console.log(err);
    //     })
    //
    // }

    const handleSubmit = ()=>{
        axios.post('http://localhost:5000/student/'+user._id, {regNumber})
        .then(()=>{
            alert('Register Number Added');
            setRegNumber("")
        })
    }
    return(
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>
                
            <center><h1>Add Your Register Number</h1></center>
                    <h4>Register Number</h4>
                    <TextField fullWidth type="text" id="register" label="Register Number....." onChange={(e)=>(setRegNumber(e.target.value))}/>
                
                    <div style={{paddingTop: "20px"}}>
                        <Link to='/'>
                        <Button type="submit"  variant="contained" color="info" style={{marginRight: "5px"}} onClick={handleSubmit}>Register</Button>
                        </Link>
                </div>
                </div> 
        </div>
    )
}
