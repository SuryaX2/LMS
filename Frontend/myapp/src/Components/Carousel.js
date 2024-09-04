import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CarouselComponent() {
    return (
        <Carousel className="mb-6">
            <Carousel.Item>
                <img
                    className="d-block w-100 h-[32rem] object-cover opacity-80"
                    src="https://images.unsplash.com/photo-1560693478-dfdb32f2176a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="First slide"
                />
                <Carousel.Caption className="text-start">
                    <h1>Learn, Grow, Succeed with Us</h1>
                    <p className="opacity-75">Join our LMS to access diverse courses, interactive content, and a supportive learning community. Start your journey to success today.</p>
                    <Link to="/signup">
                        <Button variant="outline-light" size="lg">Sign up today</Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 h-[32rem] object-cover opacity-80"
                    src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h1>Discover. Learn. Achieve.</h1>
                    <p>Explore our LMS to find courses that match your goals. Learn at your own pace and achieve your dreams with our innovative tools.</p>
                    <Button variant="outline-light" size="lg" href="#home">Learn more</Button>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100 h-[32rem] object-cover opacity-80"
                    src="https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Third slide"
                />
                <Carousel.Caption className="text-end">
                    <h1>Elevate Your Learning Experience</h1>
                    <p>Experience top-notch education with our cutting-edge LMS. Enhance your skills and knowledge in a seamless, engaging environment.</p>
                    <Button variant="outline-light" size="lg" href="#home">Browse gallery</Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;
