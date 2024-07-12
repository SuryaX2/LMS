import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Navbar.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Carousel />
            <Cards />
            <Footer />
          </>
        }></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
