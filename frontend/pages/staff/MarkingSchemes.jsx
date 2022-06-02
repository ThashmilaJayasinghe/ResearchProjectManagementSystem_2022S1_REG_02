import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect, useRef} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";


export default function SelectUser(props) {

    const [member, setMember] = useState('');
    const [subTypes, setSubTypes] = useState([]);
    const notInitialRender = useRef(false)


    const handleChange = (event) => {

        setMember(event.target.value);

    };

    useEffect(() => {

        Axios.get("http://localhost:5000/student/allSubmitTypes")
            .then((res) => {
                setSubTypes(res.data)
            })

        // if (notInitialRender.current) {
        //     props.handleMember(member);
        //     console.log(member)
        // } else {
        //     notInitialRender.current = true
        // }

    }, [member]);


    return (
        <div>
            {subTypes
                .map((subType) => {
                    return (
                        <div>
                            <p>{subType.title}</p>
                            {/*<a*/}
                            {/*    href="./1653677313310AF_A02.doc"*/}
                            {/*    download="newfilename"*/}
                            {/*>*/}
                            {/*    {subType.markingScheme}*/}
                            {/*</a>*/}
                        </div>
                    )
                })}
            <div>
                <Link to="./1653677313310AF_A02.doc" target="_blank">Download</Link>
            </div>
        </div>
    );
}