import axios from 'axios'



export const getStaff = async (staffEmail, setStaffDetails) => {

    try{
        const response = await axios.get("http://localhost:5000/api/staff/getStaff", {params:{email:staffEmail}})
        .then((res) => setStaffDetails(res.data[0]))

    }catch(err){
        console.log("Staff details is not getting success")
    }
}

export const addQualification = async (staffEmail, newQualification) => {
    console.log(staffEmail)
    try {
        const response = await axios.put("http://localhost:5000/api/staff/updateQual",{email:staffEmail, qualifications: newQualification})
            .then((res) => console.log("success: " + res))
    }catch (err){
        console.log(err)
    }
}

export const addResearchField = async (staffEmail, newResearchField) => {
    console.log(staffEmail)
    try {
        const response = await axios.put("http://localhost:5000/api/staff/updateResearch",{email:staffEmail, researchInterests: newResearchField})
            .then((res) => console.log("success: " + res))
    }catch (err){
        console.log(err)
    }
}

export const deleteQualification = async(staffEmail, arrayValue) => {
    try{
        const response = await axios.put("http://localhost:5000/api/staff/deleteQual", {email: staffEmail, value: arrayValue})
            .then((res) => console.log("Qualification suceesfully deleted"))
    }catch(err) {
        console.log(err)
    }
}

export const deleteResearchInterest = async(staffEmail, arrayValue) => {
    try{
        const response = await axios.put("http://localhost:5000/api/staff/deleteResearch", {email: staffEmail, value: arrayValue})
            .then((res) => console.log("Research interest suceesfully deleted"))
    }catch(err) {
        console.log(err)
    }
}