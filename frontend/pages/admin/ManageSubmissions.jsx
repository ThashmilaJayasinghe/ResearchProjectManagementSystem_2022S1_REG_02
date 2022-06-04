import React from 'react';
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";

import Lottie from 'react-lottie'
import documentEvaluationAnimation from "../../components/looties/documentEvaluation.json";
import viewRequestAnimation from "../../components/looties/viewRequest.json";
import {ButtonGroup} from "@mui/material";


const documentEvaluation = {
    loop: true,
    autoplay: true,
    animationData: documentEvaluationAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const viewRequest = {
    loop: true,
    autoplay: true,
    animationData: viewRequestAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


function ManageSubmissions() {


    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate]);


    return (
   <div>
       <center>
           <ButtonGroup variant="text" aria-label="text button group" style={{ paddingTop:"120px" }}>
               <Link to='/addSubmissions' style={{ textDecoration: 'none' }}>
                   <div
                       style={{
                           borderRadius: "10px",
                           margin: "10px",
                           padding: "",
                           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                           height: "14rem",
                           width: "14rem",
                           alignItems:"center",
                           display: 'flex',
                           flexDirection: 'column',
                           backgroundColor: "#daf7dc"
                       }}>
                       <div style={{paddingTop: "0.5rem"}}>
                           <Lottie
                               options={documentEvaluation}
                               height={150}
                               width={150}
                           />
                       </div>
                       <div style={{paddingTop: "1rem"}}>
                           <Typography variant="h6" style={{color: "#2e7d32"}}>Add Submission Type</Typography>
                       </div>
                   </div>
               </Link>
               <Link to='/viewSubmissions' style={{ textDecoration: 'none' }}>
                   <div
                       style={{
                           borderRadius: "10px",
                           margin: "10px",
                           paddingTop: "",
                           boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                           height: "14rem",
                           width: "14rem",
                           alignItems:"center",
                           display: 'flex',
                           flexDirection: 'column',
                           backgroundColor:"#f7e9df"
                       }}
                   >
                       <div style={{paddingTop: "0.5rem"}}>
                           <Lottie
                               options={viewRequest}
                               height={150}
                               width={150}
                           />
                       </div>
                       <div style={{paddingTop: "1rem"}}>
                           <Typography variant="h6" style={{color: "#e65100"}}>View Submission Types</Typography>
                       </div>
                   </div>
               </Link>
           </ButtonGroup>
       </center>
   </div>
)

}

export default ManageSubmissions
