import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import Forgot from './Pages/Forgot.js';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <ProtectedRoute path="/user-dashboard" component={UserDashboard} requiredRole="user" />
        <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} requiredRole="admin" />
        <Route path="/forgot" element={<Forgot />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
