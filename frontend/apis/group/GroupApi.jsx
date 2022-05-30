import axios from 'axios'

// get student details according to the group and supervisor
export const getGroupDetails = async(studentId) => {
    try{
        const response = await axios.get('http://localhost:5000/group/getGroupDetails', {params:{regNum:studentId}})
        .then((res) => 
        {
            console.log("success!!!")
            if(res){
                console.log("responce exists")
            }
        })
    }catch(err){
        console.log(err)
    }
}