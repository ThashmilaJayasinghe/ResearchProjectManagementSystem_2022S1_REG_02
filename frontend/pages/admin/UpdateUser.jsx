import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";


export default function UpdateUser(){

    const [id, setID] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const {user} = useSelector((state) => state.auth) //used to get the user

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


        axios.put('http://localhost:5000/api/users/' + id, formData).then(()=>{
            alert('User Updated')
            window.location.href = "/admin";

        }).catch((err)=>{
            alert(err)
        })
    }

    return(

        <div>
            <form id="updateform">
                <div className="input-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" required="required" value={name} onChange={(e)=>{

                        setName(e.target.value);

                    }}/>
                </div>
                <div className="input-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" required="required"
                           value={email} onChange={(e) => {

                        setEmail(e.target.value);

                    }}/>
                </div>
                <Link to={'/admin'}>
                    <button type="submit" className="btn btn-primary" onClick={updateUser}>Update</button>
                </Link>
            </form>
        </div>
    )
}
