import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {ThemeProvider} from "@mui/material";
import {theme} from "./styling/theme";

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
import AddPanel from './pages/admin/AddPanel';
import Instructor from './pages/student/Instructor';
import TopicRequestPanalForm from './pages/student/TopicRequestPanalForm';
import Submit from './pages/student/Submit';
import StaffProfile from './pages/staff/StaffProfile'
import SupervisorChat from './pages/supervisor/SupervisorChat'
import StudentChat from './pages/student/StudentChat'
import PanelHomePage from './pages/panelMemeber/PanelHomePage'
import CoSupervisor_Home from './pages/coSupervisor/CoSupervisor_Home';
import Request_ResearchField_coSupervisor from './pages/coSupervisor/Request_ResearchField_coSupervisor';
import Supervisor_Home from './pages/supervisor/Supervisor_Home'
import MarkingSchemes from './pages/staff/MarkingSchemes'
import AddSubmissions from "./pages/admin/AddSubmissionTypes";
import ViewSubmissions from "./pages/admin/ViewSubmissionTypes";
import ManagePanels from './pages/admin/ManagePanels';
import ViewPanels from './pages/admin/ViewPanels';

function App(){
    return(
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element ={<Register/>}/>
                    <Route path="/login" element ={<Login/>}/>
                    <Route path="/admin" element={<Admin/>}/>

                    <Route path = '/updateuser' element = {<UpdateUser/>} />
                    <Route path = '/managesubmissions' element = {<ManageSubmissions/>} />
                    <Route path="/group" element = {<Group/>}/>
                    <Route path="/submissions" element = {<Submission/>}/>
                    <Route path="/student" element = {<Student/>}/>
                    <Route path="/researchFields" element = {<ResearchFields/>}/>
                    <Route path="/request" element = {<RequestForm/>}/>
                    <Route path="/request/co" element = {<RequestCoSupForm/>}/>
                    <Route path="/addPanel" element = {<AddPanel/>}/>
                    <Route path="/instructor" element = {<Instructor/>} />
                    <Route path='/topicRequest' element = {<TopicRequestPanalForm/>}/>
                    <Route path='/submit' element = {<Submit/>}/>
                    <Route path='/markingSchemes' element = {<MarkingSchemes/>}/>

                    <Route path = '/staff/profile' element = {<StaffProfile />} />
                    <Route path="/supervisor" element={<Supervisor_Home/>}/>
                    <Route exact path = '/supervisor/requestedresearchField' element = {<Request_ResearchField/>} />
                    <Route exact path = '/supervisor/chat' element = {<SupervisorChat/>}/>
                    <Route path = '/co-supervisor' element = {< CoSupervisor_Home/>} />
                    <Route exact path = '/co-supervisor/requestedresearchField' element = {<Request_ResearchField_coSupervisor/>} />
                    <Route exact path = '/supervisor/chat' element = {<SupervisorChat/>}/>
                    {/* <Route exact path = '/student/chat' element = {<StudentChat/>}/> */}
                    <Route path = '/addSubmissions' element = {<AddSubmissions/>} />
                    <Route path = '/viewSubmissions' element = {<ViewSubmissions/>} />
                    <Route path = '/viewPanels' element = {<ViewPanels/>} />
                    <Route path = '/managePanels' element = {<ManagePanels/>} />

                </Routes>
            </Router>

            {
                localStorage.getItem("coSupChat") &&
                    <StudentChat />
            }
            {
                localStorage.getItem("supChat") &&
                    <StudentChat />
            }
        </div>
    )
}

export default App;