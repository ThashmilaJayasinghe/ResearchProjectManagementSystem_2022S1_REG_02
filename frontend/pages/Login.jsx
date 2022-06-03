import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/authSlice'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import Typography from "@mui/material/Typography";


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const isAvailable=()=>{
        const res =  axios.get('http://localhost:5000/student/isAvailabale/'+user._id)
        return res;
    }
    //     .then((res)=>{
    //         console.log(res)
    //         const regNO = res.data.regNumber
    //       console.log(regNO)
    //         if(regNO != null){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //      })
        
    // }

    useEffect(() => {

        if(isError) {
            alert('Incorrect Credentials')
        }

        //*********************************************
        if(isSuccess || user){
            user.roles.includes('admin') ? navigate('/admin')
                : user.roles.includes('staff') ? navigate('/supervisor')
                        // : (res !=null) ? navigate('/')
                        //     :navigate('/registerNo')
                    : isAvailable() ? navigate('/')
                        : navigate('/registerNo')
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

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div style={{width: "60%", margin: "auto", paddingTop:"40px"}}>
            <div>
                <center>
                    <Typography variant="h4">
                        Login
                    </Typography>
                </center>
            </div>
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
                        <TextField type="email"
                               className='form-control'
                               name="email"
                               id="email"
                               value={email}
                               placeholder='Enter your email'
                               size= "small"
                               fullWidth
                               style = {{marginTop: "0.5rem"}}
                               onChange={onChange} />
                    </div>
                    <div style={{paddingInline: "3rem", paddingTop: "3rem"}}>
                        <TextField type="password"
                               className='form-control'
                               name="password"
                               id="password"
                               value={password}
                               placeholder='Enter password'
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
                                Login
                            </Button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login