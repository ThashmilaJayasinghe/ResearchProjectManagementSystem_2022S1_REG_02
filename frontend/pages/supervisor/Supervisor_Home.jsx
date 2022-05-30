import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const HomePage = () => {

    const {user} = useSelector((state) => state.auth) //used to get the user
    localStorage.setItem("agent-uid", user.name)

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
            >
                <ButtonGroup variant="text" aria-label="text button group">
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
                    
                    }}
                    >
                            <Link  to = '/supervisor/requestedresearchField'>
                                <Button>View Requests</Button>
                            </Link>
                    </div>
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
                    }}>
                            <Link to = '#'>
                                <Button>Document evalueation</Button>
                            </Link>
                    </div>
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
                    }}>
                            <Link to = '/supervisor/chat'>
                                <Button>Chat</Button>
                            </Link>
                    </div>  
                </ButtonGroup>

            </Box>
            
        </div>
    )
}
export default HomePage;