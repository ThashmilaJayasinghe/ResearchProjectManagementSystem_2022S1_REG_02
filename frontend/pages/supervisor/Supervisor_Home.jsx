import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ViewRequest from './ViewRequest';

import Lottie from 'react-lottie'
import viewRequestAnimation from '../../components/looties/viewRequest.json'
import documentEvaluationAnimation from '../../components/looties/documentEvaluation.json'
import supervisorChat from '../../components/looties/chat.json'

const HomePage = () => {

    const {user} = useSelector((state) => state.auth) //used to get the user
    localStorage.setItem("agent-uid", user.name)

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

    const chat_supervisor = {
        loop: true,
        autoplay: true,
        animationData: supervisorChat,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{paddingTop: "2rem"}}>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
                style={{fontFamily: "Arial, Helvetica, sans-serif"}}
            >
                
                <div 
                    style={{
                    borderRadius: "10px", 
                    margin: "10px", 
                    paddingTop: "", 
                    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                    height: "4rem",
                    width: "30rem",
                    alignItems:"center",
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor:"#f2f2f2"
                }}
                >
                    <h2>Supervisor</h2>
                </div>


                <ButtonGroup variant="text" aria-label="text button group" >
                    <Link to = "/supervisor/requestedresearchField" style={{ textDecoration: 'none' }}>
                        <div 
                            style={{
                            borderRadius: "10px", 
                            margin: "10px", 
                            paddingTop: "", 
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            height: "14rem",
                            width: "10rem",
                            alignItems:"center",
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor:"#f7e9df"
                        }}
                        >
                                {/* <Link  to = '/supervisor/requestedresearchField'>
                                    <Button>View Requests</Button>
                                </Link> */}

                                <div style={{paddingTop: "0.5rem"}}>
                                    <Lottie 
                                        options={viewRequest}
                                        height={150}
                                        width={150}
                                    />
                                </div>
                                <div style={{paddingTop: "1rem"}}>
                                    <p style={{color: "#331601"}}>View Requests</p>
                                </div>
                        </div>
                    </Link>

                    <Link to = '#' style={{ textDecoration: 'none' }}>
                        <div 
                            style={{
                            borderRadius: "10px", 
                            margin: "10px", 
                            padding: "", 
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            height: "14rem",
                            width: "10rem",
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
                                <p style={{color: "#012904"}}>Document Evaluation</p>
                            </div>
                        </div>
                    </Link>

                    <Link to = '/supervisor/chat' style={{ textDecoration: 'none' }}>
                        <div 
                            style={{
                            borderRadius: "10px", 
                            margin: "10px", 
                            padding: "", 
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            height: "14rem",
                            width: "10rem",
                            alignItems:"center",
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: "#dfeaf7"
                        }}>
                                
                            <div style={{paddingTop: "0.5rem"}}>
                                <Lottie 
                                    options={chat_supervisor}
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <div style={{paddingTop: "1rem"}}>
                                <p style={{color: "#021936"}}>Chat</p>
                            </div>
                                
                        </div>  
                    </Link>
                </ButtonGroup>

            </Box>

            {/* <div>
                    <ViewRequest />
            </div> */}
            
        </div>
    )
}
export default HomePage;