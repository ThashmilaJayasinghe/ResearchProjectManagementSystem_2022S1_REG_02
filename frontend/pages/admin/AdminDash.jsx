import {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


function AdminDashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth) //used to get the user


    const [staff, setStaff] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {

        if(!user) {
            navigate('/')
        }

        Axios.get("http://localhost:8070/current/view")
            .then((res) => {
                setCurrents(res.data)
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
                <h2>Current Advertisements</h2>
                <br/>
            </div>
            <div className="topnav__search">
                <input type="text" placeholder='Search By Title...' onChange={(e) => {
                    setSearch(e.target.value);
                }}/>
                <i className='bx bx-search'></i>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Placement</th>
                                    {/** <th scope="col">Duration</th> */}
                                    <th scope="col">StartDate</th>
                                    <th scope="col">EndDate</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currents
                                    .filter(current => {
                                        if (search == "") {
                                            return current
                                        } else if (current.title.toLowerCase().includes(search.toLowerCase())) {
                                            return current
                                        }
                                    })
                                    .map((current) => {

                                        const setCurrent = (current) => {
                                            let {
                                                _id,
                                                title,
                                                description,
                                                placement,
                                                startdate,
                                                enddate,
                                                image
                                            } = current;
                                            console.log(_id);
                                            localStorage.setItem('ID', _id);
                                            console.log(localStorage.getItem('ID'));
                                            localStorage.setItem('Title', title);
                                            localStorage.setItem('Description', description);
                                            localStorage.setItem('Placement', placement);
                                            {/** localStorage.setItem('Duration', duration); */
                                            }
                                            localStorage.setItem('Startdate', startdate);
                                            console.log(localStorage.getItem('Startdate'));
                                            localStorage.setItem('Enddate', enddate);
                                            console.log(localStorage.getItem('Enddate'));
                                            localStorage.setItem('Image', image);
                                        }

                                        const getCurrent = () => {
                                            Axios.get("http://localhost:8070/current/view")
                                                .then((getCurrent) => {
                                                    setCurrents(getCurrent.data);
                                                })
                                        }

                                        const onDelete = (id) => {

                                            if (window.confirm('Do you wish to delete this advertisement?')) {
                                                Axios.get("http://localhost:8070/current/delete/" + id)
                                                    .then(() => {
                                                        getCurrent();
                                                        // alert("Ad Deleted");
                                                    })
                                            }
                                        }

                                        const onOpenModal = (image) => {
                                            setModalState({
                                                ...modalState, mState: {
                                                    open: true,
                                                    modalImage: image
                                                }
                                            });
                                        };

                                        const onCloseModal = () => {
                                            setModalState({
                                                ...modalState, mState: {
                                                    open: false
                                                }
                                            });
                                        };

                                        const location = () => {
                                            if (current.placement == 'Horizontal Banner')
                                                return ('Horizontal_Banner')
                                            else
                                                return ('Medium_Banner')
                                        };

                                        const loc = location();

                                        return (
                                            <tr>
                                                <td>{current.title}</td>
                                                <td>{current.description}</td>
                                                <td>{current.placement}</td>
                                                {/** <td>{current.duration}</td> */}
                                                <td>{current.startdate.substring(0, 10)}</td>
                                                <td>{current.enddate.substring(0, 10)}</td>
                                                <td>
                                                    <div>
                                                        <button className='btnIcon btnshow'
                                                                onClick={() => onOpenModal(`/${loc}/${current.image}`)}>
                                                            <i className='bx bx-show'></i></button>
                                                        <Modal className="modal-mainR" isOpen={modalState.mState.open}>
                                                            <h2 className="Mh2C">Current Advertisement</h2>
                                                            <img className="modal-imgR"
                                                                 src={modalState.mState.modalImage} alt="ad"/>
                                                            <button className="btncloseC"
                                                                    onClick={() => onCloseModal()}>Close
                                                            </button>
                                                        </Modal>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link to='/updatecurrent'>
                                                        <button className='btnIcon' onClick={() => setCurrent(current)}>
                                                            <i className='bx bx-edit'></i></button>
                                                    </Link>
                                                    <button className='btnIcon btnsecond'
                                                            onClick={() => onDelete(current._id)}><i
                                                        className='bx bx-trash'></i></button>
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
