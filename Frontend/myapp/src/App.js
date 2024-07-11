import './App.css';
import Home from './Home';
import Carousel from './Carousel.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <>
            <Home />
            <Carousel/>  
        </>
        }></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
