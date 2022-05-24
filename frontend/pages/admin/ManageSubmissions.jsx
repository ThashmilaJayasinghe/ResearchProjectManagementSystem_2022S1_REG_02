import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


function ManageSubmissions() {

    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) //used to get the user

    const [staffs, setStaffs] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        // Axios.get("http://localhost:5000/api/admin/staff/")
        //     .then((res) => {
        //         setStaffs(res.data)
        //         console.log(res.data);
        //     })


    }, [user, navigate]);


    return (
        <div>
            <h1>Submission Management</h1>
        </div>
    )

}

export default ManageSubmissions
