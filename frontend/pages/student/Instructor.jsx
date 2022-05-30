import React, { useEffect, useState } from 'react'
import {Button} from "@mui/material"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Instructor() {

  const { user } = useSelector((state) => state.auth);

  const [supervisor,setSupervisor] = useState([]);
  const [coSupervisor,setCoSupervisor] = useState([]);
  const [panel,setPannel] = useState([]);

  useEffect(()=>{
    const getSupervisor=()=>{
    axios.get('http://localhost:5000/request/grouprequest/'+ user._id)
    .then((res)=>{
      const supervisorData = res.data;
      console.log("nnn",supervisorData)
      setSupervisor(supervisorData);
    }).catch(()=>{
      alert('Error in retrieving data')
    })
  }
  getSupervisor();
  },[])

  useEffect(()=>{
    axios.get('http://localhost:5000/request/groupcorequest/'+ user._id)
    .then((res)=>{
      const cosupervisorData = res.data;
      setCoSupervisor(cosupervisorData);
    }).catch(()=>{
      alert('Error in retrieving data')
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:5000/panel/'+ user._id)
    .then((res)=>{
      const panel = res.data;
      setPannel(panel);
      // localStorage.setItem(panel._id);
    }).catch(()=>{
      alert('Error in retrieving data')
    })
  },[])

  const handleClick = ()=>{
      localStorage.setItem('_id',panel._id)
  }
  return (
    <div style={{paddingTop:"20px"}}>
      <div style={{marginTop: "50px", width: "50%", margin: "auto"}}>

<center><h1>Instructors</h1></center>

<div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Supervisor</h3></center>
    
      {/* {
        supervisor.map((data)=>{
          return( */}
            <table width={'100%'}>
            <div>
                <tr>
            <td><b>Supervisor Name</b></td>
            <td>: {supervisor.supervisorName}</td>
            <td> &nbsp;  &nbsp;  &nbsp;  &nbsp;</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Supervisor Email</b></td>
            <td style={{paddingTop: "10px"}}>: {supervisor.supervisorEmail}</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Research Field</b></td>
            <td style={{paddingTop: "10px"}}>: {supervisor.researchField}</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Research Topic</b></td>
            <td style={{paddingTop: "10px"}}>: {supervisor.topic}</td>
        </tr>

        <tr>
            <td style={{paddingTop: "10px"}}><b>Status</b></td>
            {
                supervisor.requestStates == "rejected" &&
                <td style={{paddingTop: "10px", color: "red"}}>: Rejected</td>
            }
            {
                supervisor.requestStates == "accepted" &&
                <td style={{paddingTop: "10px", color: "green"}}>: Acceppted</td>
            }
            {
                supervisor.requestStates == "Pending" &&
                <td style={{paddingTop: "10px"}}>: Pending</td>
            }

        </tr>
            </div>
            </table>
            </div>
          {/* )
        })
      } */}
      <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Co-Supervisor</h3></center>
      <table width={'100%'}>
            <div>
                <tr>
            <td><b>Co-Supervisor Name</b></td>
            <td>: {coSupervisor.supervisorName}</td>
            <td> &nbsp;  &nbsp;  &nbsp;  &nbsp;</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Co-Supervisor Email</b></td>
            <td style={{paddingTop: "10px"}}>: {coSupervisor.supervisorEmail}</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Research Field</b></td>
            <td style={{paddingTop: "10px"}}>: {coSupervisor.researchField}</td>
        </tr>
        <tr>
            <td style={{paddingTop: "10px"}}><b>Research Topic</b></td>
            <td style={{paddingTop: "10px"}}>: {coSupervisor.topic}</td>
        </tr>

        <tr>
            <td style={{paddingTop: "10px"}}><b>Status</b></td>
            {
                coSupervisor.requestStates == "rejected" &&
                <td style={{paddingTop: "10px", color: "red"}}>: Rejected</td>
            }
            {
                coSupervisor.requestStates == "accepted" &&
                <td style={{paddingTop: "10px", color: "green"}}>: Acceppted</td>
            }
            {
                coSupervisor.requestStates == "Pending" &&
                <td style={{paddingTop: "10px"}}>: Pending</td>
            }

        </tr>
            </div>
            </table>
            </div>

            <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Panal</h3></center>
    
            <table width={'100%'}>
              
          <div>
                <tr>
            <td style={{paddingTop: "10px"}}><b>Panal Name</b></td>
            <td style={{paddingTop: "10px"}}>: {panel.name}</td>
            <td> &nbsp;  &nbsp;  &nbsp;  &nbsp;</td>
              </tr>
              </div>
            </table>
            </div>
            <Link to="/topicRequest">
      <Button variant="contained" color="info" onClick={handleClick}>Panel Members</Button>
      </Link>
    

</div>
      
    </div>
  )
}


  


      




