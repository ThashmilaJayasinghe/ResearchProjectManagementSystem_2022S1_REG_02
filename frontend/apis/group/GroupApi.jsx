import axios from 'axios'

// get student details according to the group and supervisor
export const getGroupDetails = async(studentId, setGroupDetails) => {
    try{
        const response = await axios.get('http://localhost:5000/group/getGroupDetails', {params:{regNum:studentId}})
        .then((res) => 
        {
            console.log("success!!!")
            if(res.data){
                console.log("responce exists")
                setGroupDetails(res.data)
            }
            else{
                console.log("No data to view")
            }
        })
    }catch(err){
        console.log(err)
    }
}