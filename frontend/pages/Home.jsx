import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div>
            <div>
                <h1>WELCOME TO RESEARCH PROJECT MANAGEMEN </h1>
            </div>

            <Link to = "/supervisor/requestedresearchField">
                click to navigate
            </Link>

        </div>
    )
}

export default Home
