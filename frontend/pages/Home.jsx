import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStudentId } from './student/studentAPI'
import StudentChat from './student/StudentChat'

import Lottie from 'react-lottie'
import welcomeAnimation from '../components/looties/welcomePage.json'
import studentAnimation from '../components/looties/student.json'
import adminAnimation from '../components/looties/admin.json'
import adminAnimation2 from '../components/looties/admin2.json'
import supervisorAnimation from '../components/looties/supervisor.json'
import { ButtonGroup } from '@mui/material'
import { Box } from '@mui/system'

const welcomePage = {
    loop: true,
    autoplay: true,
    animationData: welcomeAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const studentLootie = {
    loop: true,
    autoplay: true,
    animationData: studentAnimation,
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

const adminLootie = {
    loop: true,
    autoplay: true,
    animationData: adminAnimation2,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const Home = () => {

    console.log("value : " + localStorage.getItem("coSupChat"))
    const {user} = useSelector((state) => state.auth) //used to get the user
    const [userDetails, setUserDetails] = useState()

    useEffect(() => {
        if(user){
            setUserDetails(user)
        }
    }, [user])

    return (
        <div>
            <div style={{margin: "30px"}}>
                <div 
                        style={{
                        borderRadius: "10px", 
                        margin: "", 
                        padding: "", 
                        boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                        height: "23rem",
                        width: "100%",
                        alignItems:"center",
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor:"#f0f6fa"
                    }}
                    >

                    <table width="100%">
                        <tr>
                            <td style = {{maxWidth: "60%",  fontFamily: "Arial, Helvetica, sans-serif"}}>
                                <div style={{width: "100%"}}>
                                    <div style={{height: "100%", backgroundColor: "#c1dbf5", padding: "1rem", borderRadius: "0rem 1rem"}}>
                                        <h2 style={{ fontSize:"34px"}}>Hi&nbsp;
                                            {
                                                user && (
                                                    <>
                                                        {user.name} !
                                                    </>
                                                )
                                            }
                                         </h2>
                                        <p>This is the research gate of SLIIT for everyone one who are Students, Supervisors, Co-supervisors and Admins</p>
                                    </div>
                                </div>
                            </td>
                            <td width = '50%' >
                                <div style={{width: "100%"}}>
                                    <Lottie 
                                        options={welcomePage}
                                        height={450}
                                        width={450}
                                        style = {{width: "100%"}}
                                    />
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>



            </div>
            <div style={{ paddingTop: "",paddingLeft: "2rem", paddingRight: "2rem" , fontFamily: "Arial, Helvetica, sans-serif"}}>
                <h1 style = {{color: "#027d9c", textShadow: "2px 2px 12px #a3a3a3"}}>User Roles</h1>

                    <div
                        // sx={{
                        //     display: 'flex',
                        //     flexDirection: 'column',
                        //     alignItems: 'center',
                        //     '& > *': {
                        //     m: 1,
                        //     },
                        // }}
                        
                        style = {{width:"90%", margin: "auto"}}
                    >

                        <div style={{display: "flex", flexDirection: "row",alignItems: 'center', margin: "auto"}}>  
                       
                            <div 
                                style={{
                                borderRadius: "10px", 
                                margin: "10px", 
                                paddingTop: "", 
                                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15)",
                                height: "12rem",
                                width: "26rem",
                                alignItems:"center",
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor:"#e4f5f7"
                                // backgroundColor: "#75ecfa"
                            }}
                            >
                                <Lottie 
                                    options={studentLootie}
                                    height={170}
                                    width={170}
                                />
                                <p style={{color: "#0373a3"}} > <b>Student</b></p>
                            </div>

                            <div 
                                style={{
                                borderRadius: "10px", 
                                margin: "10px", 
                                paddingTop: "", 
                                boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                                height: "12rem",
                                width: "26rem",
                                alignItems:"center",
                                display: 'flex',
                                flexDirection: 'column',
                                // backgroundColor:"#847ffa"
                                backgroundColor: "#d2d6fa"
                            }}
                            >
                            
                                <Lottie 
                                    options={supervisorLootie}
                                    height={140}
                                    width={140}
                                />
                                <p style={{color: "#062d8a"}}><b>Supervisor</b></p>
                            </div>

                            <div 
                                style={{
                                borderRadius: "10px", 
                                margin: "10px", 
                                paddingTop: "", 
                                boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
                                height: "12rem",
                                width: "26rem",
                                alignItems:"center",
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor:"#fad4f4"
                                // backgroundColor: "#fa7f7f"
                            }}
                            >
                                
                                <Lottie 
                                    options={adminLootie}
                                    height={180}
                                    width={180}
                                />
                                <p style={{color: "#8a0670"}}><b>Admin</b></p>
                            </div>
                        </div>
                    </div>
            </div>
            

        </div>
    )
}

export default Home
