import React from 'react';
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


function ManageSubmissions() {


    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate]);


    return (
        // <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
        //     <div style={{paddingBottom:"40px"}}>
        //         <center>
        //             <Typography variant="h4">
        //                 Add Submission
        //             </Typography>
        //         </center>
        //     </div>
        //     <div>
        //         <Box sx={{ width: '100%' }}>
        //             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        //                     <Tab label="Document Submission" {...a11yProps(0)} />
        //                     <Tab label="Presentation Submission" {...a11yProps(1)} />
        //                 </Tabs>
        //             </Box>
        //             <TabPanel value={value} index={0}>
        //                 <DocSubmissions type={'document'} />
        //             </TabPanel>
        //             <TabPanel value={value} index={1}>
        //                 <PresSubmissions type={'presentation'} />
        //             </TabPanel>
        //         </Box>
        //     </div>
        // </div>


   <div>
       <Link to='/addSubmissions'>
           Add Submissions
       </Link>

       <Link to='/viewSubmissions'>
           View Submissions
       </Link>
   </div>


)

}

export default ManageSubmissions
