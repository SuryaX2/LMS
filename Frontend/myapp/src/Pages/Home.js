import React from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import BookCardSlider from "../Components/BookCardSlider";

function Home() {
    return (
        <>
            <Navbar />
            <Carousel />
            <BookCardSlider/>
            <Footer />
          </>
    );
}

export default Home;