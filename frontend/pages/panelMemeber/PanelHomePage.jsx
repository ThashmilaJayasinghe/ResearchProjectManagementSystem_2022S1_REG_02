import React from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PanelHomePage = () => {

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
            >
                <ButtonGroup variant="text" aria-label="text button group">
                    <Link to = '#'>
                        <Button>Presenttaion evaluation</Button>
                    </Link>
                    
                    <Link  to = '#'>
                        <Button>Topic evaluation</Button>
                    </Link>
                    
                </ButtonGroup>

            </Box>
            
        </div>
    )
}
export default PanelHomePage;