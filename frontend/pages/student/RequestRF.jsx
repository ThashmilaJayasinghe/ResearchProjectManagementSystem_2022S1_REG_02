import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const supervisors = [
    {id: 1, name: "abc", email: "abc@gmail.com"},
    {id: 2, name: "abc2", email: "abc@gmail.com2"},
    {id: 3, name: "abc3", email: "abc@gmail.com3"},
    {id: 4, name: "abc4", email: "abc@gmail.com4"},
    {id: 5, name: "abc5", email: "abc@gmail.com5"},
    {id: 6, name: "abc6", email: "abc@gmail.com6"},
]

const RequestRF = () => {

    const [age, setAge] = useState('');

    const [groupId, setGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [leaderId, setLeaderId] = useState("");
    const [selectedSupervisor, setSelectedSupervisor] = useState("");
    const [researchField, setResearchField] = useState("");
    const [researchDetails, setResearchDetails] = useState("");

    const onSubmitClicked = () => {
        console.log(groupId)
        console.log(groupName)
        console.log(leaderId)
        console.log(selectedSupervisor)
        console.log(researchField)
        console.log(researchDetails)
    }

    return (
        <div style={{paddingTop:"20px"}}>
            <div style={{width: "60%", margin: "auto", }}>

                <center><h1>Request supervisor</h1></center>

                <p>Enter your Group ID : </p>
                <TextField
                    id="outlined-groupId-input"
                    label="Group ID..."
                    type="text"
                    autoComplete="current-groupId"
                    fullWidth={true}
                    onChange={(e) => setGroupId(e.target.value)}
                    required={true}
                />

                <p style={{paddingTop: "20px"}}>Enter your Group Name : </p>
                <TextField
                    id="outlined-groupName-input"
                    label="Group Name..."
                    type="text"
                    autoComplete="current-groupName"
                    fullWidth={true}
                    onChange={(e) => setGroupName(e.target.value)}
                    required={true}
                />

                <p style={{paddingTop: "20px"}}>Enter Leader registration number : </p>
                <TextField
                    id="outlined-groupName-input"
                    label="Student Id..."
                    type="text"
                    autoComplete="current-groupName"
                    fullWidth={true}
                    onChange={(e) => setLeaderId(e.target.value)}
                    required={true}
                />

                <p style={{paddingTop: "20px"}}>Enter your Research Interest Field: </p>
                <TextField
                    id="outlined-researchInterest-input"
                    label="Research Interest..."
                    type="text"
                    autoComplete="current-researchInterest"
                    fullWidth={true}
                    onChange={(e) => setResearchField(e.target.value)}
                    required={true}
                />

                <p style={{paddingTop: "20px"}}>Select a supervisor: </p>
                <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSupervisor}
                        label="Supervisor"
                        onChange={(e) => setSelectedSupervisor(e.target.value)}

                    >
                        {
                            supervisors.map((supervisor) => {
                                return (
                                    <MenuItem value={10}>{supervisor.email}</MenuItem>
                                    )
                            })
                        }
                    </Select>
                </FormControl>

                <p style={{paddingTop: "20px"}}>Enter details about the research field: </p>
                <TextField
                    id="outlined-researchInterest-input"
                    label="Research details..."
                    type="text"
                    autoComplete="current-researchInterest"
                    fullWidth={true}
                    onChange={(e) => setResearchDetails(e.target.value)}
                />

                <div style={{paddingTop: "20px"}}>
                    <Button
                        variant="contained"
                        color="info"
                        style={{marginRight: "5px"}}
                        onClick = {() => onSubmitClicked()}
                    >
                        Submit
                    </Button>
                </div>

            </div>
        </div>
    )
}
export default RequestRF;