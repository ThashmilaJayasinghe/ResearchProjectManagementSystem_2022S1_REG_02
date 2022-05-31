import axios from 'axios'



export const addSupervisorRequest = () => {

    console.log("data added", )
}

export const getStudentId = async(userId, setStudentDetails) => {
    try{
        const student = await axios.get(`http://localhost:5000/student/isAvailabale/${userId}`)
            .then((res) => {setStudentDetails(res.data)})
    }catch(err) {
        console.log(err)
        console.log("Error occured in getting student details")
    }
}