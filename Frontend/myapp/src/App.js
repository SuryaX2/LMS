import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Forgot from './Pages/Forgot.js';
import ProtectedRoute from './Pages/Dashboards/ProtectedRoute';
import userDashboard from './Pages/Dashboards/User-Dashboard.js';
import adminDashboard from './Pages/Dashboards/Admin-Dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/forgot" element={<Forgot />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
