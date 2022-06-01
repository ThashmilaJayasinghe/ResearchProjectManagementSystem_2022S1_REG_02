import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect, useRef} from "react";
import Axios from "axios";


export default function SelectUser(props) {

    const [member, setMember] = useState('');
    const [staffs, setStaffs] = useState([]);
    const notInitialRender = useRef(false)


    const handleChange = (event) => {

        setMember(event.target.value);

    };

    useEffect(() => {

        Axios.get("http://localhost:5000/api/admin/staff/")
            .then((res) => {
                setStaffs(res.data)
            })

        if (notInitialRender.current) {
            props.handleMember(member);
            console.log(member)
        } else {
            notInitialRender.current = true
        }

    }, [member]);


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Member</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={member}
                    label="Member"
                    onChange={handleChange}
                >

                    {staffs
                        .map((staff) => {
                            return (
                                <MenuItem key={staff._id} value={staff._id}>
                                    {staff.email}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    );
}