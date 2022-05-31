import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const HomePage = () => {

    console.log("this is co-supervisor")

    const {user} = useSelector((state) => state.auth) //used to get the user

    console.log(user)

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

                    <Link to = '/documentsEvaluationCoSupervisor' style={{}}>
                        <Button>Documents evaluation/ co-supervisor</Button>
                    </Link>

                </ButtonGroup>

            </Box>
            
        </div>
    )
}
export default HomePage;