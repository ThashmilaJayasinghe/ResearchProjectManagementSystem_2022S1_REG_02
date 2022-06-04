import React from 'react';
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Typography from "@mui/material/Typography";
import {ButtonGroup} from "@mui/material";

import Lottie from 'react-lottie'
import adminAnimation2 from "../../components/looties/admin2.json";
import supervisorAnimation from "../../components/looties/supervisor.json";


const panelLootie = {
    loop: true,
    autoplay: true,
    animationData: adminAnimation2,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const supervisorLootie = {
    loop: true,
    autoplay: true,
    animationData: supervisorAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};


function ManagePanels() {

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
                    <Link to='/addPanel' style={{ textDecoration: 'none' }}>
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
                                backgroundColor: "#fad4f4"
                            }}>
                            <div style={{paddingTop: "0.5rem"}}>
                                <Lottie
                                    options={panelLootie}
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <div style={{paddingTop: "1rem"}}>
                                <Typography variant="h6" style={{color: "#7b1fa2"}}>Allocate Panel</Typography>
                            </div>
                        </div>
                    </Link>

                    <Link to='/viewPanels' style={{ textDecoration: 'none' }}>
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
                                backgroundColor:"#d2d6fa"
                            }}
                        >
                            <div style={{paddingTop: "0.5rem"}}>
                                <Lottie
                                    options={supervisorLootie}
                                    height={150}
                                    width={150}
                                />
                            </div>
                            <div style={{paddingTop: "1rem"}}>
                                <Typography variant="h6" style={{color: "#01579b"}}>View Panels</Typography>
                            </div>
                        </div>
                    </Link>
                </ButtonGroup>
            </center>
        </div>

    )

}

export default ManagePanels
