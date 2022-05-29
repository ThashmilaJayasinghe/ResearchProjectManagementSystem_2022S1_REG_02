import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Supervisor_Home from "./pages/supervisor/Supervisor_Home";
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
// import Instructor from './pages/student/Instructor';
// import TopicRequestPanalForm from './pages/student/TopicRequestPanalForm';

import StaffProfile from './pages/staff/StaffProfile'
import SupervisorChat from './pages/supervisor/SupervisorChat'
import Stu_chat from './pages/student/Stu_chat'
import PanelHomePage from './pages/panelMemeber/PanelHomePage'
import CoSupervisor_Home from './pages/coSupervisor/CoSupervisor_Home';
import Request_ResearchField_coSupervisor from './pages/coSupervisor/Request_ResearchField_coSupervisor';

function App(){

    return(
        <div>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element ={<Register/>}/>
                    <Route path="/login" element ={<Login/>}/>

                    <Route path="/supervisor" element={<Supervisor_Home/>}/>
                    <Route exact path = '/supervisor/requestedresearchField' element = {<Request_ResearchField/>} />
                    <Route exact path = '/supervisor/chat' element = {<SupervisorChat/>}/>

                    <Route path = '/co-supervisor' element = {< CoSupervisor_Home/>} />
                    <Route exact path = '/co-supervisor/requestedresearchField' element = {<Request_ResearchField_coSupervisor/>} />
                    <Route exact path = '/supervisor/chat' element = {<SupervisorChat/>}/>

                    <Route path="/admin" element={<Admin/>}/>

                    <Route path = '/updateuser' element = {<UpdateUser/>} />
                    <Route path = '/managesubmissions' element = {<ManageSubmissions/>} />
                    <Route path="/group" element = {<Group/>}/>
                    <Route path="/submissions" element = {<Submission/>}/>
                    <Route path="/student" element = {<Student/>}/>
                    <Route path="/researchFields" element = {<ResearchFields/>}/>
                    <Route path="/request" element = {<RequestForm/>}/>
                    <Route path="/request/co" element = {<RequestCoSupForm/>}/>
                    {/* <Route path="/instructor" element = {<Instructor/>} /> */}
                    {/* <Route path='/topicRequest' element = {<TopicRequestPanalForm/>}/> */}
                    <Route exact path='/staff/profile' element = {<StaffProfile/>} />
                    <Route exact path='/student/chat' element = {<Stu_chat/>} />
                    <Route exact path = '/panelMember' element = {<PanelHomePage/>} />


                </Routes>
            </Router>
        </div>
    )
}

export default App;