import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SelectUser from '../../components/SelectUser'


export default function AddPanel(){

    const [name, setName] = useState("");
    const [staff1, setStaff1] = useState("");
    const [staff2, setStaff2] = useState("6291079f2e08bfaa647de898");
    const [staff3, setStaff3] = useState("6291078b2e08bfaa647de895");
    const [group, setGroup] = useState("628ffd844d56899c00a91485");

    const {user} = useSelector((state) => state.auth) //used to get the user

    const navigate = useNavigate()

    useEffect(() => {

        if(!user) {
            navigate('/')
        }

    }, [user, navigate]);


    const handleSubmit = () => {

        const formData = {
            name,
            staff1,
            staff2,
            staff3,
            group
        }

        console.log(formData)
        alert("staff1")

        axios.post('http://localhost:5000/api/admin/addPanel', formData).then(()=>{
            alert('Panel allocated')
            window.location.href = "/admin";

        }).catch((err)=>{
            alert(err)
        })
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

    return(
        <div className='container'>
            <form>

                <div className="form-group col-md-6">
                    <label><b>Name</b> </label>
                    <input type="text" id="name" className="form-control" placeholder="Enter panel name" value={name}
                           onChange={(e) =>(
                               setName(e.target.value)
                           )}
                    />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Panel member 1</b> </label>
                    < SelectUser handleMember={handleMember1} />
                </div>
                <br/>
                <div className="form-group col-md-6">
                    <label><b>Panel member 2</b> </label>
                    < SelectUser handleMember={handleMember2} />
                </div>
                <br/>
                <div className="form-group">
                    <label><b>Panel member 3</b> </label>
                    < SelectUser handleMember={handleMember3} />
                </div>
                <br/>
                <div className="form-group">

                </div>
                <br/>
                <br/>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}