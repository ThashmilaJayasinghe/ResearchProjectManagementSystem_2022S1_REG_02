import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SelectUser from '../../components/SelectUser'
import SelectGroup from '../../components/SelectGroup'


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
        <div className='container'>
            <form>

                <div className="form-group col-md-6">
                    <label><b>Name</b> </label>
                    <input type="text" id="name" className="form-control" placeholder="Enter panel name" value={name} required="required"
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
                    <label><b>Group</b></label>
                    <SelectGroup handleSelected={handleGroup} />
                </div>
                <br/>
                <br/>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}