import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getStudentId } from './student/studentAPI'
import StudentChat from './student/StudentChat'

const Home = () => {

    console.log("vlue : " + localStorage.getItem("coSupChat"))

    return (
        <div>
            <div>
                <h1>WELCOME TO RESEARCH PROJECT MANAGEMENTS </h1>
            </div>

           
        </div>
    )
}

export default Home
