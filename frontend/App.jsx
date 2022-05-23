import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import HomePage from "./pages/supervisor/HomePage";
import Request_ResearchField from "./pages/supervisor/Request_ResearchField";
import RequestRF from "./pages/student/RequestRF";
import ViewRequests from "./pages/student/ViewRequests";

const studentpages = [
    'Students',
    'Submissions',
    'Marks',
    'Supervisor',
    'Contact Us',

];

const supervisorPages = [
    'Students',
    'Research field requests',
    'Topic evaluation',
    'Document evaluation',
    'Chat',
]

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userRole: "supervisor"};
    }
    render() {
        return (
            <Router>
                {
                    this.state.userRole == "student" ? (
                        <Header pages = {studentpages}/>
                    ):
                        (
                            <Header pages = {supervisorPages}/>
                        )
                }

                <div style={{paddingTop:"40px"}}>
                    <Routes>
                        <Route exact path='/' element={<Home/>} />
                        <Route exact path = '/supervisor/requestedresearchField' element = {<Request_ResearchField/>} />
                        <Route exact path = '/student/addRequest' element = {<RequestRF/>} />
                        <Route exact path= '/student/requests' element = {<ViewRequests/>} />

                    </Routes>
                </div>

            </Router>
        )
    }
}