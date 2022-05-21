import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth) //used to get the user


    useEffect(() => {

        if(!user) {
            navigate('/')
        }
    }, [user, navigate]);


    return (
        <div>
            <div>
                {/* code below: if user (i.e. logged in), show name */}
                <h1>Welcome {user && user.name}</h1>
                <p>Admin Dashboard</p>
            </div>
        </div>
    )

}

export default Dashboard