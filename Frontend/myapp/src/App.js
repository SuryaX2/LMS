import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import Forgot from './Components/Forgot.js';
import UserDashboard from './Pages/Dashboards/User-Dashboard.js';
import AdminDashboard from './Pages/Dashboards/Admin-Dashboard.js';
import AddBook from './Components/AddBook.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<BrowserRouter>
			<ToastContainer position="top-center" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot" element={<Forgot />} />
				<Route path="/user-dashboard" element={<UserDashboard />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route path="/add-book" element={<AddBook />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
