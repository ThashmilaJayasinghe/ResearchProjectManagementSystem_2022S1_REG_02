import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SelectUser from '../../components/SelectUser'
import SelectGroup from '../../components/SelectGroup'
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function AddPanel(){

    const [name, setName] = useState("");
    const [staff1, setStaff1] = useState("");
    const [staff2, setStaff2] = useState("");
    const [staff3, setStaff3] = useState("");
    const [group, setGroup] = useState("");

    const {user} = useSelector((state) => state.auth) //used to get the user

    const navigate = useNavigate()

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate]);


    const handleSubmit = () => {

        if(staff1 === staff2 || staff1 === staff3 || staff2 ===staff3) {
            alert('Please select 3 different staff members')
        } else {
            const formData = {
                name,
                staff1,
                staff2,
                staff3,
                group
            }

            console.log(formData)

            axios.post('http://localhost:5000/api/admin/addPanel', formData).then(()=>{
                alert('Panel allocated')
                window.location.href = "/admin";

            }).catch((err)=>{
                alert(err)
            })
        }

    }

    const handleMember1 = (member) => {
        setStaff1(member)
        console.log(staff1)
    }

    const handleMember2 = (member) => {
        setStaff2(member)
    }

    const handleMember3 = (member) => {
        setStaff3(member)
    }

    const handleGroup = (chosen) => {
        setGroup(chosen)
    }

    return(
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <div style={{paddingBottom:"40px"}}>
                <center>
                    <Typography variant="h4">
                        Allocate Panel
                    </Typography>
                </center>
            </div>
            <div
                style={{
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                }}
            >
                <form>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel id="name-label">Enter Panel name</InputLabel>
                        <TextField
                            labelId="name-label"
                            type="text"
                            id="name"
                            placeholder="Panel name"
                            value={name}
                            size= "small"
                            fullWidth
                            style = {{marginTop: "0.5rem"}}
                            required="required"
                            onChange={(e) =>(
                                setName(e.target.value)
                            )}
                        />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel>Select Panel member 1</InputLabel>
                        < SelectUser handleMember={handleMember1} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel>Select Panel member 2</InputLabel>
                        < SelectUser handleMember={handleMember2} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel>Select Panel member 3</InputLabel>
                        < SelectUser handleMember={handleMember3} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <InputLabel>Select Group</InputLabel>
                        <SelectGroup handleSelected={handleGroup} />
                    </div>
                    <div style={{padding: "3rem" }}>
                        <center>
                            <Link to={'/admin'} style={{ textDecoration: 'none' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "0.5rem" }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Link>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )
}