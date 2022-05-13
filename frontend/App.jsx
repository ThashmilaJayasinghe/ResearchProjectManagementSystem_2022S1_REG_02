import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/Home"


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                </Routes>
            </Router>
        )

    }
}