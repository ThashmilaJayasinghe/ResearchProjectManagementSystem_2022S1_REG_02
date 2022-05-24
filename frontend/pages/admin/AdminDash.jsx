import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function AdminDashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth) //used to get the user

    const [staffs, setStaffs] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:5000/api/admin/staff/")
            .then((res) => {
                setStaffs(res.data)
                console.log(res.data);
            })


    }, [user, navigate]);


    return (
        <div>
            <div>
                {/* code below: if user (i.e. logged in), show name */}
                <h1>Welcome {user && user.name}</h1>
                <p>Admin Dashboard</p>
                <br/>
                <h2>Staff Details</h2>
                <br/>
            </div>
            <div>
                <input type="text" placeholder='Search By Name...' onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
                <i className='bx bx-search'></i>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {staffs
                                    .filter(staff => {
                                        if (search == "") {
                                            return staff
                                        } else if (staff.name.toLowerCase().includes(search.toLowerCase())) {
                                            return staff
                                        }
                                    })
                                    .map((staff) => {

                                        const setStaff = (staff) => {
                                            let {
                                                _id,
                                                name,
                                                email
                                            } = staff;
                                            console.log(_id);
                                            localStorage.setItem('ID', _id);
                                            console.log(localStorage.getItem('id'));
                                            localStorage.setItem('Name', name);
                                            localStorage.setItem('Email', email);
                                        }

                                        const getStaff = () => {
                                            Axios.get("http://localhost:5000/api/admin/staff/")
                                                .then((getStaff) => {
                                                    setStaffs(getStaff.data);
                                                })
                                                .catch((err) => {
                                                    alert(err)
                                                })
                                        }

                                        const onDelete = (id) => {

                                            if (window.confirm('Do you wish to delete this staff member?')) {
                                                Axios.get("http://localhost:5000/api/users/" + id)
                                                    .then(() => {
                                                        getStaff();
                                                        alert("Staff Member Deleted");
                                                    })
                                            }
                                        }

                                        return (
                                            <tr>
                                                <td>{staff.name}</td>
                                                <td>{staff.email}</td>
                                                <td>
                                                    <Link to='/updateuser'>
                                                        <button className='btnIcon' onClick={() => setStaff(staff)}>
                                                            <EditIcon/></button>
                                                    </Link>
                                                    <button className='btnIcon btnsecond'
                                                            onClick={() => onDelete(staff._id)}><DeleteIcon/>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminDashboard
