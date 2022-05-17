import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home"
import Register from "./pages/Register"


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route exact path='/register' element={<Register/>} />
                </Routes>
            </Router>
        )
    }
}