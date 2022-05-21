import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import Register from "./pages/Register"
import HomePage from "./pages/supervisor/HomePage";
import Admin from "./pages/admin/AdminDash";


const studentpages = [
    'Students',
    'Submissions',
    'Marks',
    'Supervisor',
    'Contact Us',

];

const supervisorPages = [
    'Students',
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
<<<<<<< HEAD
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/register' element={<Register/>} />
                    <Route exact path='/admin' element={<Admin/>} />
                </Routes>
=======
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
                        <Route exact path = '/supervisor' element = {<HomePage/>} />
                    </Routes>
                </div>

>>>>>>> master
            </Router>
        )
    }
}