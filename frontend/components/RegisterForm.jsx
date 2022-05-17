// import React ,{useState,useEffect} from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
//
// export default function RegisterForm(){
//     const [name , setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [password2, setPassword2] = useState('');
//
//     useEffect(()=>{
//         setName(localStorage.getItem('name'));
//         setEmail(localStorage.getItem('email'));
//         setPassword(localStorage.getItem('password'));
//         setPassword2(localStorage.getItem('password2'));
//
//     },[])
//     function sendData(e){
//         e.preventDefault();
//
//         if (password !== password2) {
//             alert('Passwords do not match')
//         } else {
//             const user = {
//                 name, email, password
//             }
//             axios
//                 .post('http://localhost:5000/api/users',user)
//                 .then(()=>{
//                     alert('User Registered')
//                 }).finally(()=>{
//                 setName('');
//                 setEmail('');
//                 setPassword('');
//                 setPassword2('');
//
//             })
//         }
//     }
//
//
//
//     return(
//         <div>
//             <h1>Register User</h1>
//             <form onSubmit={sendData}>
//                 <div>
//                     <label>Name</label>
//                     <input type="text" id="name" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
//                 </div>
//                 <br/>
//                 <div>
//                     <label>Email</label>
//                     <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
//                 </div>
//                 <br/>
//                 <div>
//                     <label>Password</label>
//                     <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
//                 </div>
//                 <br/>
//                 <div>
//                     <label>Confirm Password</label>
//                     <input type="password" id="password2" placeholder="Enter Password Again" value={password2} onChange={(e)=>{setPassword2(e.target.value)}}/>
//                 </div>
//                 <br/>
//                 <button type="submit">Sumbit</button>
//             </form>
//             <br/>
//             <br/>
//             <Link to="/">
//                 <button>Back to Home</button>
//             </Link>
//         </div>
//     )
// }