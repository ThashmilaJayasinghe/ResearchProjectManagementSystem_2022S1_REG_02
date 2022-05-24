import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"
import HomePage from "./pages/supervisor/HomePage";
import AddMarks from "./pages/supervisor/AddMarks";
import AddTopicStatus from "./pages/pannel/AddTopicStatus";
import ViewTopics from "./pages/pannel/ViewTopics";

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
                        <Route exact path= '/addMArk' element={<AddMarks/>}/>
                        <Route exact path= '/addTopicStatus/:id' element={<AddTopicStatus/>}/>
                        <Route exact path= '/view' element ={<ViewTopics/>}/>
                    </Routes>
                </div>

            </Router>
        )
    }
}