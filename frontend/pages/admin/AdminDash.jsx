import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";


function AdminDashboard() {

    const navigate = useNavigate()

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
            <div style={{paddingTop:"20px"}}>
                <Typography variant="h3">
                    Welcome {user && user.name}!
                </Typography>
                <Typography variant="h6">
                    Admin Dashboard
                </Typography>
                <center>
                    <Typography variant="h4">
                        Staff Details
                    </Typography>
                </center>
            </div>
            <div style={{width: "60%", margin: "auto", paddingTop:"30px"}}>
                <TextField
                    type="text"
                    placeholder='Search By Name...'
                    size= "small"
                    fullWidth
                    onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
                <i className='bx bx-search'></i>
            </div>
            <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
                <div
                    style={{
                        borderRadius: "10px",
                        padding: "",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                    }}
                >
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
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
                                            <TableRow
                                                key={staff.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{staff.name}</TableCell>
                                                <TableCell>{staff.email}</TableCell>
                                                <TableCell>
                                                    <div style={{ display: "flex", gap: "1rem" }}>
                                                        <Link to='/updateuser'>
                                                            <div style={{cursor: "pointer"}} onClick={() => setStaff(staff)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width='1.2rem' height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="#ed2121" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                        <div style={{cursor: "pointer"}} onClick={() => onDelete(staff._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width='1.2rem' height="1.2rem" fill="none" viewBox="0 0 24 24" stroke="#ed2121" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminDashboard
