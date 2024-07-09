import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
// import Login from './components/Login';
// import Signup from './components/Signup';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" exact component={Home} />
                {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}
            </Routes>
        </Router>
    );
}

export default App;
