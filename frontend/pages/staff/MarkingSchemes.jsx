import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect, useRef} from "react";
import Axios from "axios";
import fileDownload from 'js-file-download'


export default function SelectUser(props) {

    const [member, setMember] = useState('');
    const [subTypes, setSubTypes] = useState([]);


    const handleClick = (file) => {

        let filePath = "../../public/Marking_Schemes/" + file;

        Axios.get(`${filePath}`, {
            responseType: 'blob',
        }).then((res) => {
            let filename = filePath.replace(/^.*[\\\/]/, '')
            let fileExtension;
            fileExtension= filePath.split('.');
            fileExtension =fileExtension[fileExtension.length -1];
            fileDownload(res.data, `${filename}.${fileExtension}`);
        });
    }

    useEffect(() => {

        Axios.get("http://localhost:5000/student/allSubmitTypes")
            .then((res) => {
                setSubTypes(res.data)
            })

    }, [member]);


    return (
        <div>
            {subTypes
                .map((subType) => {
                    return (
                        <div>
                            <p>{subType.title}</p>
                            <button onClick={() => {handleClick(subType.markingScheme)}}>
                                Download Here</button>
                        </div>
                    )
                })}
        </div>
    );
}