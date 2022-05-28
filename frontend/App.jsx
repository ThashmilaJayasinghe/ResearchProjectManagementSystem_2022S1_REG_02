import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import Register from "./pages/Register"
import HomePage from "./pages/supervisor/HomePage";
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

import StaffProfile from './pages/staff/StaffProfile'
import Sup_chat from './pages/supervisor/Sup_chat'
import Stu_chat from './pages/student/Stu_chat'
import PanelHomePage from './pages/panelMemeber/PanelHomePage'

function App(){

    console.log("app called")

    return(
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element ={<Register/>}/>
                    <Route path="/login" element ={<Login/>}/>
                    <Route path="/supervisor" element={<HomePage/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route exact path = '/supervisor/requestedresearchField' element = {<Request_ResearchField/>} />
                    <Route path = '/updateuser' element = {<UpdateUser/>} />
                    <Route path = '/managesubmissions' element = {<ManageSubmissions/>} />
                    <Route path="/group" element = {<Group/>}/>
                    <Route path="/submissions" element = {<Submission/>}/>
                    <Route path="/student" element = {<Student/>}/>
                    <Route path="/researchFields" element = {<ResearchFields/>}/>
                    <Route path="/request" element = {<RequestForm/>}/>
                    <Route path="/request/co" element = {<RequestCoSupForm/>}/>
                    <Route exact path='/staff/profile' element = {<StaffProfile/>} />
                    <Route exact path = '/supervisor/chat' element = {<Sup_chat/>}/>
                    <Route exact path='/student/chat' element = {<Stu_chat/>} />
                    <Route exact path = '/panelMember' element = {<PanelHomePage/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;