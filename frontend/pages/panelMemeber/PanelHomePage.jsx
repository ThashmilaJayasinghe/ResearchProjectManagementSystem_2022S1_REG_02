import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Lottie from 'react-lottie'
import viewRequestAnimation from '../../components/looties/viewRequest.json'
import documentEvaluationAnimation from '../../components/looties/documentEvaluation.json'
import AcceptTopicAnimation from '../../components/looties/AcceptTopic.json'
import RejectTopicAnimation from '../../components/looties/RejectTopic.json'


const PanelHomePage = () => {

    const documentEvaluation = {
        loop: true,
        autoplay: true,
        animationData: documentEvaluationAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const RejectTopic = {
        loop: true,
        autoplay: true,
        animationData: RejectTopicAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const AcceptTopic = {
        loop: true,
        autoplay: true,
        animationData: AcceptTopicAnimation,
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


    console.log("this is panel memeber")

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
                    <h2>Panel Member</h2>
                </div>


                <ButtonGroup variant="text" aria-label="text button group" >
                    <Link to = "/panelTopics" style={{ textDecoration: 'none' }}>
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
                                <p style={{color: "#331601"}}>Topic Evaluation</p>
                            </div>
                        </div>
                    </Link>

                    <Link to = '/evaluatePresentations' style={{ textDecoration: 'none' }}>
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
                                <p style={{color: "#012904"}}>Presentation Evaluation</p>
                            </div>
                        </div>
                    </Link>


                    <Link to = '/panelTopicsAccepted' style={{ textDecoration: 'none' }}>
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
                                    options={AcceptTopic}
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <div style={{paddingTop: "1rem"}}>
                                <p style={{color: "#012904"}}>Accepted Topic Evaluations</p>
                            </div>
                        </div>
                    </Link>


                    <Link to = '/panelTopicsRejected' style={{ textDecoration: 'none' }}>
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
                                    options={RejectTopic}
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <div style={{paddingTop: "1rem"}}>
                                <p style={{color: "#012904"}}>Rejected Topic Evaluations</p>
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

    // return (
    //     <div style={{paddingTop: "2rem"}}>
    //
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 '& > *': {
    //                     m: 1,
    //                 },
    //             }}
    //         >
    //             <ButtonGroup variant="text" aria-label="text button group">
    //                 <Link to = '/evaluatePresentations'>
    //                     <Button>Presentation evaluation</Button>
    //                 </Link>
    //
    //                 <Link  to = '/panelTopics'>
    //                     <Button>Topic evaluation</Button>
    //                 </Link>
    //
    //                 <Link  to = '/panelTopicsAccepted'>
    //                     <Button>Accepted Topic Evaluations</Button>
    //                 </Link>
    //
    //                 <Link  to = '/panelTopicsRejected'>
    //                     <Button>Rejected Topic Evaluations</Button>
    //                 </Link>
    //
    //             </ButtonGroup>
    //
    //         </Box>
    //
    //     </div>
    // )
}
export default PanelHomePage;