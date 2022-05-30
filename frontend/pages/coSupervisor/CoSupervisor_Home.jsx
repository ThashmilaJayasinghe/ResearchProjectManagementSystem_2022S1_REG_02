import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const CoSupervisor_Home = () => {
  return (        
        <div style={{paddingTop: "2rem"}}>
            co supervisor
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

                    <Link  to = '/co-supervisor/requestedresearchField'>
                        <Button>View Requests</Button>
                    </Link>
                    <Link to = '#' style={{}}>
                        <Button>Document evalueation</Button>
                    </Link>

                    <Link to = '/supervisor/chat' >
                        <Button>Chat</Button>
                    </Link>
                    
                </ButtonGroup>

            </Box>
        </div>


  )
}

export default CoSupervisor_Home