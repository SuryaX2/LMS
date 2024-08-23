import React from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Footer from "../Components/Footer";
import BookCardSlider from "../Components/BookCardSlider";

function Home() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <Navbar />
                <Carousel />
                <BookCardSlider />
                <Footer />
            </div>
        </>
    );
}

export default Home;