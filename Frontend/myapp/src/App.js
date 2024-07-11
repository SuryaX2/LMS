import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home.js';
import Carousel from './Components/Carousel.js';
import Cards from './Components/Cards.js';
import Footer from './Components/Footer.js';

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
