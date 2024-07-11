import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Carousel from './Carousel.js';
import Cards from './Cards.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <>
            <Home />
            <Carousel />
            <Cards/>
        </>
        }></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
