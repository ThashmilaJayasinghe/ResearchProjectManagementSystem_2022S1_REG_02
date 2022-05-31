import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addQualification, addResearchField, deleteQualification, deleteResearchInterest, getStaff } from '../../apis/staff/StaffApi'

const StaffProfile = () => {
    const {user} = useSelector((state) => state.auth) //used to get the user

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [qualifications, setQualifications] = useState("");
    const [researchInterests, setResearchInterests] = useState("");
    const [registeredDate, setRegisteredDate] = useState('2020/10/20')
    const [newQualification, setNewQualification] = useState("");
    const [newResearchField, setNewResearchField] = useState("");
    const [staffDetails, setStaffDetails] = useState()
    const [isDataAdded, setIsDataAdded] = useState(false)
  
    const [isAddQualification, setIsAddQualification] = useState(false);
    const [isAddResearchField, setIsAddResearchField] = useState(false);
  
    const onAddQualification = async() => {  
      await addQualification(email, newQualification)
      .then(async() => {
          console.log("new qualification added")
         
          await getStaff(email, setStaffDetails)
            .then((res) => {
                console.log("staff data retrieved")
            })
        })
    }
  
    const onAddResearchField = async() => {
      await addResearchField(email, newResearchField)
      .then(async() => { 
        console.log("new research field added")

        await getStaff(email, setStaffDetails)
            .then((res) => {
                console.log("staff data retrieved")
            })
        })
    }

    useEffect(() => {
        async function storeDetails() {
            await getStaff(email, setStaffDetails)
            .then((res) => {
                console.log("staff data retrieved")
            })
        }
        storeDetails().then(() => console.log("called"))
    }, [])

    useEffect(() => {
        if(staffDetails){
            setQualifications(staffDetails.qualifications)
            setResearchInterests(staffDetails.researchInterests)
        }
       
    }, [staffDetails])

    const onQualificationDelete = async(arrItem) => {
      await deleteQualification(email, arrItem)
        .then(async() => 
          {
            console.log("Delete success")
            
            await getStaff(email, setStaffDetails)
            .then((res) => {
                console.log("staff data retrieved")
            })
          })

    }

    const onResearchInterestDelete = async(arrItem) => {
      await deleteResearchInterest(email, arrItem)
      .then(async() => 
        {
          console.log("Delete success")
          
          await getStaff(email, setStaffDetails)
          .then((res) => {
              console.log("staff data retrieved")
          })
        })
    }


    return (
      <div> 
         <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
              <center><h1>My profile</h1></center>
  
              <div 
                style={{
                  borderRadius: "10px", 
                  margin: "10px", 
                  padding: "", 
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

              }}>
                  
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                      <TableBody>

                        <TableRow  >
                            <TableCell component="th" scope="row"  style={{paddingLeft: "2rem", paddingTop: "2rem"}} >
                              Name
                            </TableCell>
                            <TableCell style={{ width: "70%"}} align="left">
                              {name}
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell component="th" scope="row" style={{paddingLeft: "2rem"}}>
                            Email address
                          </TableCell>
                          <TableCell style={{ width: "70%"}} align="left">
                            {email}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" style={{paddingLeft: "2rem"}}>
                            Password
                          </TableCell>
                          <TableCell style={{ width: "70%"}} align="left">
                            password here...
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row" style={{paddingLeft: "2rem"}}>
                            Registered date
                          </TableCell>
                          <TableCell style={{ width: "70%"}} align="left">
                            date...
                          </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row" style={{paddingLeft: "2rem"}}>
                              Qualifications
                            </TableCell>
                            <TableCell style={{ width: "70%"}} align="left">

                              {
                                qualifications ?
                                  <>
                                    {
                                      qualifications.map((item, idx) => {
                                        return (
                                            <TableRow>
                                              <TableCell>
                                                  {item}
                                              </TableCell>
                                              <TableCell>
                                                <div style={{cursor: "pointer"}} onClick={() => onQualificationDelete(item)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width='1.2rem' height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="#ed2121" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                  </svg>
                                                </div>
                                              </TableCell>
                                            </TableRow>         
                                        )
                                      }) 
                                    }
                                  </>
                                  : (
                                    <div style={{padding: "3rem" }}>
                                      <CircularProgress color="inherit" />
                                    </div>
                                  )
                                }
                                {
                                  isAddQualification ? (
                                    <>                                
                                        <TextField
                                            label="Input new qualification..."
                                            type="text"
                                            onChange={(e) => setNewQualification(e.target.value)}
                                            size= "small"
                                            fullWidth
                                            style = {{marginTop: "0.5rem"}}
                                        />
        
                                        <Button variant="contained"
                                          style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#577BC1", marginTop: "10px"}}
                                          onClick={() => (setIsAddQualification(false), onAddQualification())}
                                        >Save</Button>
                                        <Button variant="outlined"
                                          style={{maxHeight: "30px", fontSize: "12px", marginTop: "10px", marginLeft: "0.5rem"}}
                                          onClick={() => (setIsAddQualification(false))}
                                        >Cancel</Button>
                                      
                                    </>
                                  ): (
                                    <>
                                      <Button variant="contained"
                                        style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#646FD4", marginTop: "0.5rem" }}
                                        onClick={() => setIsAddQualification(true)}
                                      >+ Add new qualification</Button>
                                    </>
                                  )
                                }


                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" style={{paddingLeft: "2rem"}}>
                              Research interest
                            </TableCell>
                            <TableCell style={{ width: "70%"}} align="left">
                              {
                                researchInterests ? 
                                  <>
                                    {
                                      researchInterests.map((item, idx) => {
                                        return (
                                            <TableRow>
                                              <TableCell>
                                                  {item}
                                              </TableCell>
                                              <TableCell>
                                                <div style={{cursor: "pointer"}} onClick={() => onResearchInterestDelete(item)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width='1.2rem' height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="#ed2121" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                  </svg>
                                                </div>
                                              </TableCell>
                                            </TableRow>
                                        )
                                      }) 
                                    }
                                  </>
                                  : (
                                    <div style={{padding: "3rem" }}>
                                      <CircularProgress color="inherit" />
                                    </div>
                                  )
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
                                        style={{marginTop:"0.5rem"}}
                                      />
                                    <Button variant="contained"
                                      style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#577BC1", marginTop: "10px"}}
                                      onClick={() => (setIsAddResearchField(false), onAddResearchField())}
                                    >Save</Button>
                                    <Button variant="outlined"
                                      style={{maxHeight: "30px", fontSize: "12px", marginTop: "10px", marginLeft: "0.5rem"}}
                                      onClick={() => (setIsAddResearchField(false))}
                                    >Cancel</Button>
                                  </>
                                ) : (
                                  <>
                                    <Button variant="contained"
                                    style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#646FD4", marginTop:"0.5rem"}}
                                    onClick={() => setIsAddResearchField(true)}
                                    >+ Add new research field</Button>
                                  </>
                                )
                              }

                            </TableCell>
                        </TableRow>
                      </TableBody> 
                    </Table>
                  </TableContainer>




              </div>
  
          </div>
      </div>
    )
}

export default StaffProfile