import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import Register from "./pages/Register"
// import HomePage from "./pages/supervisor/HomePage";
import Admin from "./pages/admin/AdminDash";
import Login from "./pages/Login";
import Request_ResearchField from "./pages/supervisor/Request_ResearchField";
import UpdateUser from "./pages/admin/UpdateUser";
import ManageSubmissions from "./pages/admin/ManageSubmissions";
import Group from "./pages/student/Group"
import ResearchFields from "./pages/student/ResearchFields"
import Submission from "./pages/student/Submissions"
import Student from "./pages/student/StudentHome"
import RequestForm from "./pages/student/RequestForm"
import RequestCoSupForm from './pages/student/RequestCoSupForm';
import Instructor from './pages/student/Instructor';
import TopicRequestPanalForm from './pages/student/TopicRequestPanalForm';
import Submit from './pages/student/Submit';
import RegisterNumber from './pages/student/RegisterNumber';

function App(){
    return(
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element ={<Register/>}/>
                    <Route path="/login" element ={<Login/>}/>
                    {/* <Route path="/supervisor" element={<HomePage/>}/> */}
                    <Route path="/admin" element={<Admin/>}/>
                    <Route exact path = '/requestedresearchField' element = {<Request_ResearchField/>} />
                    <Route path = '/updateuser' element = {<UpdateUser/>} />
                    <Route path = '/managesubmissions' element = {<ManageSubmissions/>} />
                    <Route path="/group" element = {<Group/>}/>
                    <Route path="/submissions" element = {<Submission/>}/>
                    <Route path="/student" element = {<Student/>}/>
                    <Route path="/researchFields" element = {<ResearchFields/>}/>
                    <Route path="/request" element = {<RequestForm/>}/>
                    <Route path="/request/co" element = {<RequestCoSupForm/>}/>
                    <Route path="/instructor" element = {<Instructor/>} />
                    <Route path='/topicRequest' element = {<TopicRequestPanalForm/>}/>
                    <Route path='/submit' element = {<Submit/>}/>
                    <Route path='/registerNo' element= {<RegisterNumber/>}/>

                </Routes>
            </Router>
        </div>
    )
}

export default App;