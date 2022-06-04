import React from 'react';
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import DocSubmissions from '../../components/DocSubmission'
import PresSubmissions from '../../components/PresSubmission'
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function ManageSubmissions() {


    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <div style={{paddingBottom:"40px"}}>
                <center>
                    <Typography variant="h4">
                        Add Submission
                    </Typography>
                </center>
            </div>
            <div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Document Submission" {...a11yProps(0)} />
                            <Tab label="Presentation Submission" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <DocSubmissions type={'document'} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PresSubmissions type={'presentation'} />
                    </TabPanel>
                </Box>
            </div>
        </div>

    )

}

export default ManageSubmissions
