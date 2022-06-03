import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/authSlice'
import Spinner from '../components/Spinner'
import Button from '@mui/material/Button'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'


function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: ''
    })

    const {name, email, password, password2, role} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {

        if(isError) {
            alert(message)
        }

        //*********************************************
        if(isSuccess || user){
            user.roles.includes('admin') ? navigate('/admin')
                : user.roles.includes('staff') ? navigate('/supervisor')
                    : navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            alert('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                role
            }

            dispatch(register(userData))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <center>
                <Typography variant="h4">
                    Register
                </Typography>
            </center>

            <div
                style={{
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

                }}
            >
                <form onSubmit={onSubmit}>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <TextField type="text"
                               name="name"
                               id="name"
                               value={name}
                               required="required"
                               placeholder='Enter your name'
                               size= "small"
                               fullWidth
                               style = {{marginTop: "0.5rem"}}
                               onChange={onChange} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <TextField type="email"
                               className='form-control'
                               name="email"
                               id="email"
                               value={email}
                               required="required"
                               placeholder='Enter your email'
                                   size= "small"
                                   fullWidth
                                   style = {{marginTop: "0.5rem"}}
                               onChange={onChange} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Please select user role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                required="required"
                                label="Member"
                                onChange={onChange}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="staff">Staff</MenuItem>
                                <MenuItem value="student">Student</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <TextField type="password"
                               className='form-control'
                               name="password"
                               id="password"
                               required="required"
                               value={password}
                               placeholder='Enter password'
                               size= "small"
                               fullWidth
                               style = {{marginTop: "0.5rem"}}
                               onChange={onChange} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <TextField type="password"
                               className='form-control'
                               name="password2"
                               id="password2"
                               value={password2}
                               required="required"
                               placeholder='Confirm password'
                               size= "small"
                               fullWidth
                               style = {{marginTop: "0.5rem"}}
                               onChange={onChange} />
                    </div>
                    <div style={{padding: "3rem" }}>
                        <center>
                            <Button
                                type='submit'
                                variant="contained"
                                style={{maxHeight: "30px", fontSize: "12px", backgroundColor: "#646FD4", marginTop: "0.5rem" }}
                            >
                                Register
                            </Button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register