import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStudentId } from './student/studentAPI'

const Home = () => {

    const {user} = useSelector((state) => state.auth) //used to get the user
    const [studentDetails, setStudentDetails] = useState("")

    useEffect(() => {
        // get student id
        console.log("Called")
        // async function getStudent() {
        //     await getStudentId(user._id, setStudentDetails)
        //         .then(() => console.log("Student got"))
        // }
        // getStudent()
    }, [])

    console.log("called here")

    return (
        <div>
            <div>
                <h1>WELCOME TO RESEARCH PROJECT MANAGEMENTS </h1>
            </div>
        </div>
    )
}

export default Home
