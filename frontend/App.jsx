import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import Register from "./pages/Register"
import HomePage from "./pages/supervisor/HomePage";
import Admin from "./pages/admin/AdminDash";
import Login from "./pages/Login";
import Request_ResearchField from "./pages/supervisor/Request_ResearchField";
import RequestRF from "./pages/student/RequestRF";
import ViewRequests from "./pages/student/ViewRequests";
import Sup_profile from './pages/supervisor/Sup_profile';
import Sup_chat from './pages/supervisor/Sup_chat';
import Stu_chat from './pages/student/Stu_chat';
import StaffProfile from './pages/staff/StaffProfile';


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
                    <Route exact path = '/student/addRequest' element = {<RequestRF/>} />
                    <Route exact path= '/student/requests' element = {<ViewRequests/>} />
                    <Route exact path='/staff/profile' element = {<StaffProfile/>} />
                    <Route exact path = '/supervisor/chat' element = {<Sup_chat/>}/>
                    <Route exact path='/student/chat' element = {<Stu_chat/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;