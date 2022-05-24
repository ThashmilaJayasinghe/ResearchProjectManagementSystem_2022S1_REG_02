// import React, {useState, useEffect} from 'react'
// import Axios from 'axios'
// import {useDispatch, useSelector} from "react-redux";
// import useNavigate from 'react-router-dom'
//
//
// export default function UpdateUser(){
//
//     const [id, setID] = useState(null);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//
//     const {user} = useSelector((state) => state.auth) //used to get the user
//
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//
//     useEffect(() => {
//
//         if(!user) {
//             navigate('/')
//         }
//
//         setID(localStorage.getItem('ID'))
//         setName(localStorage.getItem('Name'));
//         setEmail(localStorage.getItem('Email'));
//
//     }, [user, navigate]);
//
//
//     const updateData = () => {
//
//         const formData = new FormData();
//
//         formData.append("name", name);
//         formData.append("email", email);
//
//         Axios.put("http://localhost:5000/api/users/" +id, formData)
//             .then(() => {
//                 alert("User Updated");
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//     }
//
//
//     return(
//
//         <div>
//             <form id="updateform" onSubmit={updateData}>
//                 <div className="input-group">
//                     <label for="name" className="form-label">Name</label>
//                     <input type="text" className="form-control" id="name" placeholder="Enter Name" required="required" value={name} onChange={(e)=>{
//
//                         setName(e.target.value);
//
//                     }}/>
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor="email" className="form-label">Email</label>
//                     <input type="email" className="form-control" id="email" placeholder="Enter Email" required="required"
//                            value={email} onChange={(e) => {
//
//                         setName(e.target.value);
//
//                     }}/>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Update</button>
//             </form>
//         </div>
//
//
//     )
// }
