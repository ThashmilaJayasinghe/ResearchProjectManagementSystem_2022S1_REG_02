import axios from 'axios'

//get all the supervisor requests
export const getAllRequests = async (setRequestDetails) => {

    try{
        const response = await axios.get("http://localhost:5000/request/requests")
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
        const response = await axios.get("http://localhost:5000/request/requestedSupervisor",{params:{supervisorEmail:supEmail}})
            .then((res) => 
            {
                setSupRequests(res.data)
            })
        
    }catch (err){
        console.log(err)
    }
}

//change the states of the request
export const changeRequestStates = async (id, state, groupID, staffId) => {

    try{
        const response = await axios.put(`http://localhost:5000/request/updateRequest/${id}`, {requestStates: state})
            .then((res) => console.log(res.data))

        if(state == "accepted"){
            const updateGroup = await axios.put('http://localhost:5000/group/updateSupervisor', {supervisorID: staffId, groupId: groupID})
                .then((res) => console.log(res.data))
        }
    }catch (err) {
        console.log(err)
    }
}