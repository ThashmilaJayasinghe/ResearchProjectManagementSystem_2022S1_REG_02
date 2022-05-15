import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from "./components/Header";
import Home from "./pages/Home"



export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                </Routes>
            </Router>
        )

    }
}