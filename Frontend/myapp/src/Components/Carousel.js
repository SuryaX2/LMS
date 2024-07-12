import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import styles from './Carousel.module.css';

function Carousel() {
    return (
        <div id="myCarousel" className={`${styles.carousel} ${styles.slide} ${styles.mb6}`} data-bs-ride="carousel">
            <div className={styles.carouselIndicators}>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className={styles.active} aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className={styles.carouselInner}>
                <div className={`${styles.carouselItem} ${styles.active}`}>
                    <img height="100%" width="100%" src='https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='img' />
                    <div className="container">
                        <div className={styles.carouselCaption + ' ' + styles.textStart}>
                            <h1>Learn, Grow, Succeed with Us</h1>
                            <p className={styles.opacity75}>Join our LMS to access diverse courses, interactive content, and a supportive learning community. Start your journey to success today.</p>
                            <Link to="/signup">
                                <p><a className="btn btn-lg btn-primary" href="#home">Sign up today</a></p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <img height="100%" width="100%" src='https://images.unsplash.com/photo-1588580000645-4562a6d2c839?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='img' />
                    <div className="container">
                        <div className={styles.carouselCaption}>
                            <h1>Discover. Learn. Achieve.</h1>
                            <p>Explore our LMS to find courses that match your goals. Learn at your own pace and achieve your dreams with our innovative tools.</p>
                            <p><a className="btn btn-lg btn-primary" href="#home">Learn more</a></p>
                        </div>
                    </div>
                </div>
                <div className={styles.carouselItem}>
                    <img height="100%" width="100%" src='https://images.unsplash.com/photo-1549383028-df014fa3a325?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='img' />
                    <div className="container">
                        <div className={`${styles.carouselCaption} ${styles.textEnd}`}>
                            <h1>Elevate Your Learning Experience</h1>
                            <p>Experience top-notch education with our cutting-edge LMS. Enhance your skills and knowledge in a seamless, engaging environment.</p>
                            <p><a className="btn btn-lg btn-primary" href='#home'>Browse gallery</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <button className={styles.carouselControlPrev} type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className={styles.carouselControlPrevIcon} aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className={styles.carouselControlNext} type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className={styles.carouselControlNextIcon} aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;
