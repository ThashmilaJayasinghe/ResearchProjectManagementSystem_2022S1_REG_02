import axios from 'axios'

//get all co-supervisor requests
export const getAllCoSupervisorRequests = async (setRequestDetails) => {

    try{
        const response = await axios.get("http://localhost:5000/api/")
            .then(res => setRequestDetails(res.data.response))

        return response;
    }catch (err){
        console.log("Error occurred in getAllRequest")
        console.error('Error')
    }
}

//get data according to the co-supervisor
export const getCoSupervisorRequests = async (staffEmail,setSupRequests) => {
    try {
        const response = await axios.get("http://localhost:5000/api/reqCoSupervisor/requestedCoSupervisor",{params:{supervisorEmail:staffEmail}})
            .then((res) => setSupRequests(res.data))
    }catch (err){
        console.log(err)
    }
}

//change the states of the request
export const changeCoSupervisorRequestStates = async (id, state) => {

    try{
        const response = await axios.put(`http://localhost:5000/api/reqCoSupervisor/updateCoSupervisorRequest/${id}`, {requestStates: state})
            .then((res) => console.log(res.data))
    }catch (err) {
        console.log(err)
    }
}
