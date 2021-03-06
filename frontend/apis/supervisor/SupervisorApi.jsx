import axios from 'axios'
import React from 'react'

const BACKEND_URL = 'http://localhost:5000/api'

//get all the supervisor requests
export const getAllRequests = async (setRequestDetails) => {

    try{
        const response = await axios.get("http://localhost:5000/api/reqSupervisor/requests")
            .then(res => setRequestDetails(res.data.response))

        return response;
    }catch (err){
        console.log("Error occurred in getAllRequest")
        console.error('Error')
    }
}

//get data according to the supervisor
export const getSupRequests = async (supEmail,setSupRequests) => {
    try {
        const response = await axios.get("http://localhost:5000/api/reqSupervisor/requestedSupervisor",{params:{supervisorEmail:supEmail}})
            .then((res) => setSupRequests([res.data]))
    }catch (err){
        console.log(err)
    }
}

//change the states of the request
export const changeRequestStates = async (id, state) => {

    //########### after add to add a state to a topic it should remove from the requests and add it to another colloection in a DB

    try{
        const response = await axios.put(`http://localhost:5000/api/reqSupervisor/updateRequest/${id}`, {requestStates: state})
            .then((res) => console.log(res.data))
    }catch (err) {
        console.log(err)
    }
}

// ####################### with sample backend ############# this route should change
export const addQualification = async (supEmail, newQualification) => {
    console.log(supEmail)
    try {
        const response = await axios.put("http://localhost:5000/api/reqSupervisor/updateQual",{email:supEmail, qualifications: newQualification})
            .then((res) => console.log("success: " + res))
    }catch (err){
        console.log(err)
    }
}

export const addResearchField = async (supEmail, newResearchField) => {
    console.log(supEmail)
    try {
        const response = await axios.put("http://localhost:5000/api/reqSupervisor/updateResearch",{email:supEmail, researchInterests: newResearchField})
            .then((res) => console.log("success: " + res))
    }catch (err){
        console.log(err)
    }
}