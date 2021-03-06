import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Typography from "@mui/material/Typography";

export default function UpdateUser(){

    const [id, setID] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const {user} = useSelector((state) => state.auth) //used to get the user
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    const navigate = useNavigate()

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('Name'));
        setEmail(localStorage.getItem('Email'));

    }, [user, navigate]);


    const updateUser = () => {

        const formData = {
            name,
            email
        }


        axios.put('http://localhost:5000/api/users/' + id, formData, config).then(()=>{
            alert('User Updated')
            // window.location.href = "/admin";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(

        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center>
                <Typography variant="h4">
                    Update User
                </Typography>
            </center>
            <div
                style={{
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                }}
            >
                <form id="updateform">
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel id="name-label" >Name</InputLabel>
                        <TextField labelId="name-label" type="text"
                                   id="name" placeholder="Enter Name"
                                   required="required"
                                   size= "small"
                                   fullWidth
                                   style = {{marginTop: "0.5rem"}}
                                   value={name} onChange={(e)=>{
                                       setName(e.target.value);

                        }}/>
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel id="email-label">Email</InputLabel>
                        <TextField labelId="email-label" type="email"
                                   className="form-control"
                                   id="email"
                                   placeholder="Enter Email"
                                   required="required"
                                   size= "small"
                                   fullWidth
                                   style = {{marginTop: "0.5rem"}}
                                   value={email}
                                   onChange={(e) => {
                                      setEmail(e.target.value);

                        }}/>
                    </div>
                    <div style={{padding: "3rem" }}>
                        <center>
                            <Link to={'/admin'} style={{ textDecoration: 'none' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                    onClick={updateUser}
                                >
                                    Update
                                </Button>
                            </Link>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )
}
