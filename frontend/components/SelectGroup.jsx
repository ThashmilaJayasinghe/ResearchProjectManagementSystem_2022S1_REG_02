import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect, useRef} from "react";
import Axios from "axios";


export default function SelectGroup(props) {

    const [chosen, setChosen] = useState('');
    const [groups, setGroups] = useState([]);
    const notInitialRender = useRef(false)


    const handleChange = (event) => {

        setChosen(event.target.value);

    };

    useEffect(() => {

        Axios.get("http://localhost:5000/api/admin/groups/")
            .then((res) => {
                setGroups(res.data)
            })

        if (notInitialRender.current) {
            props.handleSelected(chosen);
            console.log(chosen)
        } else {
            notInitialRender.current = true
        }

    }, [chosen]);


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chosen}
                    label="Group"
                    onChange={handleChange}
                >
                    {groups
                        .map((group) => {
                            return (
                                <MenuItem key={group._id} value={group._id}>
                                    {group.groupName}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    );
}