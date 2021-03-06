import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {addQualification, addResearchField, getStaff} from '../../apis/staff/StaffApi'

const qualificationsArr = [
  "Bsc IT", "MSC Cloud computing", "Bsc in BA"
]

const researchInterestsArr = [
  "Cloud computing", "AI", "Robotics"
]

const Sup_profile = () => {

  const {user} = useSelector((state) => state.auth) //used to get the user

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [qualifications, setQualifications] = useState(qualificationsArr);
  const [researchInterests, setResearchInterests] = useState(researchInterestsArr);
  const [registeredDate, setRegisteredDate] = useState('2020/10/20')
  const [newQualification, setNewQualification] = useState("");
  const [newResearchField, setNewResearchField] = useState("");
  const [staffDetails, setStaffDetails] = useState()

  const [isAddQualification, setIsAddQualification] = useState(false);
  const [isAddResearchField, setIsAddResearchField] = useState(false);

  const onAddQualification = () => {
    console.log(newQualification)

    addQualification(email, newQualification).then(() => console.log("new qualification added"))
  }

  const onAddResearchField = () => {
    console.log(newResearchField)

    addResearchField(email, newResearchField).then(() => console.log("new research field added"))
  }

  useEffect(() => {

    getStaff(email, setStaffDetails).then(() => console.log("staff data retrieved"))


  }, [])

  console.log(staffDetails)

  return (
    <div>
       <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center><h1>My profile</h1></center>


            <div style={{border: "1px solid black", borderRadius: "10px", margin: "10px", padding: "10px"}}>

                <table width={'100%'}>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Name</b></td>
                        <td style={{paddingTop: "10px"}}>: {name}</td>
                    </tr>
                    <hr/>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Email address</b></td>
                        <td style={{paddingTop: "10px"}}>: {email}</td>
                    </tr>
                    <hr/>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Password</b></td>
                        <td style={{paddingTop: "10px"}}>: *****10</td>
                    </tr>
                    <hr/>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Registered date</b></td>
                        <td style={{paddingTop: "10px"}}>: {registeredDate}</td>
                    </tr>
                    <hr/>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Quealifications</b></td>
                        <td style={{paddingTop: "10px"}}>                        
                        {
                          qualifications.map((item) => {
                            return <p>{item}</p>
                          })
                        }

                        {
                          isAddQualification ? (
                            <>
                              {/* <input type="text" placeholder='Input new qualification...' /> */}
                              
                                <TextField
                                    label="Input new qualification..."
                                    type="text"
                                    onChange={(e) => setNewQualification(e.target.value)}
                                    size= "small"
                                    fullWidth
                                />

                                <Button variant="contained"
                                  style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "10px"}}
                                  onClick={() => (setIsAddQualification(false), onAddQualification())}
                                >Save</Button>
                              
                            </>
                          ): (
                            <>
                              <Button variant="contained"
                                style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "##053769"}}
                                onClick={() => setIsAddQualification(true)}
                              >+ Add new qualification</Button>
                            </>
                          )
                        }
                        </td>
                    </tr>
                    <hr/>
                    <tr>
                        <td style={{paddingTop: "10px"}}><b>Research Interests</b></td>
                        <td style={{paddingTop: "10px"}}>
                          {
                            researchInterests.map((item) => {
                              return <p>{item}</p>
                              
                            })
                          }

                          {
                            isAddResearchField ? (
                              <>
                                  <TextField
                                    label="Input new research interest..."
                                    type="text"
                                    onChange={(e) => setNewResearchField(e.target.value)}
                                    size= "small"
                                    fullWidth
                                  />
                                 <Button variant="contained"
                                  style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769", marginTop: "10px"}}
                                  onClick={() => (setIsAddResearchField(false), onAddResearchField())}
                                  >Save</Button>
                              </>
                            ) : (
                              <>
                                <Button variant="contained"
                                style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#053769"}}
                                onClick={() => setIsAddResearchField(true)}
                                >+ Add new research field</Button>
                              </>
                            )
                          }
                         
                        </td>
                    </tr>

                </table>

                {/*<p><b>Requested Topic</b> : {request.topic}</p>*/}
                {/*<p><b>Group name</b> : {request.requestedGroup}</p>*/}
                {/*<p><b>Group ID</b> : {request.requestedGroupID}</p>*/}
                {/*<p><b>Supervisor Email</b> : {request.supervisorEmail}</p>*/}
                {/*<p><b>Supervisor Name</b> : {request.supervisorName}</p>*/}
                {/*<p><b>Evaluated at</b> : {request.evalueatedAt}</p>*/}
                {/*<p><b>States</b> : {request.requestedStates}</p>*/}



            </div>

        </div>
    </div>
  )
}

export default Sup_profile