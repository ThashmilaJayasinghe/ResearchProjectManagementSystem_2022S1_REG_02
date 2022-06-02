import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/authSlice'
import Spinner from '../components/Spinner'
import axios from 'axios'



function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const [registered,setRegistered] = useState()

    useEffect(() => {
        console.log('3')
        if(isError) {
            alert('Incorrect Credentials')
        }
        console.log("tttt",registered)
        //*********************************************
        if(isSuccess || user){
            console.log(localStorage.getItem('res'))
            user.roles.includes('admin') ? navigate('/admin')
                : user.roles.includes('staff') ? navigate('/supervisor')
                            : (registered) ? navigate('/')
                                :navigate('/registerNo')

                                console.log("in",registered)
        }
        console.log('4')
        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log('1')
        const userData = {
            email,
            password
        }
        console.log(userData)
        await axios.get('http://localhost:5000/student/isAvailabale/'+email)
        .then((res)=>{
            setRegistered(res.data)
            localStorage.setItem('res',res.data)
            console.log('data',res.data)
        }).catch((err)=>{
            alert(err)
        })
        console.log('2')

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className='container'>
            <div>
                <h1>
                    Login
                </h1>
            </div>

            <div>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <input type="email"
                               className='form-control'
                               name="email"
                               id="email"
                               value={email}
                               placeholder='Enter your email'
                               onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                               className='form-control'
                               name="password"
                               id="password"
                               value={password}
                               placeholder='Enter password'
                               onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login