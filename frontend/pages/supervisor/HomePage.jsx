import React from 'react';
import TextField from '@mui/material/TextField';


const HomePage = () => {

    console.log("this is supervisor")

    return (
        <div style={{paddingTop: "20px"}}>

            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
            />

        </div>
    )
}
export default HomePage;