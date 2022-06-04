import React, { useEffect, useState } from 'react'
import {Button} from "@mui/material"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getStudentId } from './studentAPI';
import { getGroupDetails } from '../../apis/group/GroupApi';
import StudentChat from './StudentChat';


export default function Instructor() {

  const { user } = useSelector((state) => state.auth);

  const [supervisor,setSupervisor] = useState([]);
  const [coSupervisor,setCoSupervisor] = useState([]);
  const [panel,setPannel] = useState([]);
  const [studentDetails, setStudentDetails] = useState("")
  const [groupDetails, setGroupDetails] = useState("")
  const [isCoSupervisorChat, setIsCoSupervisorChat] = useState(false)

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

  useEffect(() => {
  // get student id
  console.log("Called")
  async function getStudent() {
      await getStudentId(user._id, setStudentDetails)
          .then(async(res) => {
            console.log("Student got ")
          })
  }
  getStudent()
  }, [])

  // console.log(studentDetails)
  console.log(isCoSupervisorChat)

  useEffect(() => {
      if(studentDetails){
      localStorage.setItem("cc-uid", studentDetails.regNumber)
      async function getGroup() {

        await getGroupDetails(studentDetails.regNumber, setGroupDetails)
          .then(() => console.log("Group details successfully loaded"))
      }
      getGroup();

    }

  }, [studentDetails])

  const onSupervisorChat = (supervisor) => {
    console.log("Supervisor chat called")

    if(supervisor){
      const tempVal = supervisor.supervisorName;
      const tempName = tempVal.replace(/ /g, '')

      localStorage.setItem("agent-uid", tempName)
      localStorage.setItem("supChat", true)

      window.location.reload()
    }
  }

  const onCoSupervisorChat = (coSupervisor) => {
    if(coSupervisor){
      const tempVal = coSupervisor.supervisorName;
      const tempName = tempVal.replace(/ /g, '')

      localStorage.setItem("agent-uid", tempName)
      setIsCoSupervisorChat(true)
      localStorage.setItem("coSupChat", true)

      window.location.reload()
    }
  }

  return (
    <div style={{paddingTop:"20px"}}>
      <div style={{marginTop: "50px", width: "50%", margin: "auto"}}>

<center><h1>Instructors</h1></center>

<div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Supervisor</h3></center>
    
      {
        supervisor.map((supervisor)=>{
          return(
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
                <>
                  <td style={{paddingTop: "10px", color: "green"}}>: Accepted</td>
                  <td>
                    <div onClick={() => onSupervisorChat(supervisor)} style = {{cursor: "pointer"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#3db2d9" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </td>
                </>
            }
            {
                supervisor.requestStates == "Pending" &&
                <td style={{paddingTop: "10px"}}>: Pending</td>
            }
        </tr>

            </div>
            </table>
                )
              })
            } 
            </div>
       
      <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Co-Supervisor</h3></center>
      {
        coSupervisor.map((coSupervisor)=>{

          return(
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
                <>
                  <td style={{paddingTop: "10px", color: "green"}}>: Accepted</td>
                  <td>
                    <div onClick={() => onCoSupervisorChat(coSupervisor)} style = {{cursor: "pointer"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#3db2d9" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </td>
                </>
            }
            {
                coSupervisor.requestStates == "Pending" &&
                <td style={{paddingTop: "10px"}}>: Pending</td>
            }

        </tr>
            </div>
            </table>
          )
        })}
            </div>

            <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>
      <center><h3>Panal</h3></center>
      {
        panel.map((panel)=>{

          return(
    
            <table width={'100%'}>
              
          <div>
                <tr>
            <td style={{paddingTop: "10px"}}><b>Panal Name</b></td>
            <td style={{paddingTop: "10px"}}>: {panel.name}</td>
            <td> &nbsp;  &nbsp;  &nbsp;  &nbsp;</td>
              </tr>
              </div>
            </table>
          )
        })}
            </div>
            <Link to="/topicRequest">
      <Button variant="contained" color="info" onClick={handleClick}>Panel Members</Button>
      </Link>

      {/* {
        localStorage.getItem("coSupChat") && 
          
            <StudentChat />
          
      } */}
    

</div>
      
    </div>
  )
}


  


      




