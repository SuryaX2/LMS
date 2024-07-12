import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
