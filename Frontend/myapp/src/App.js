import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Forgot from './Pages/Forgot.js';
import ProtectedRoute from './ProtectedRoute';
import userDashboard from './Pages/Dashboards/User-Dashboard.js';
import adminDashboard from './Pages/Dashboards/Admin-Dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <ProtectedRoute path="/user-dashboard" component={userDashboard} requiredRole="user" />
        <ProtectedRoute path="/admin-dashboard" component={adminDashboard} requiredRole="admin" />
        <Route path="/forgot" element={<Forgot />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
