import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <header className={styles.p3 + ' ' + styles.textBgDark}>
            <div className={styles.container}>
                <div className={`${styles.dFlex} ${styles.flexWrap} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.justifyContentLgStart}`}>
                    <img width="9%" src="https://lmsonline.com/wp-content/uploads/2022/01/cropped-LMS_Logo_FullColor_2017.png" alt="Logo" />
                    <ul className={`${styles.nav} ${styles.col12} ${styles.colLgAuto} ${styles.meLgAuto} ${styles.mb2} ${styles.justifyContentCenter} ${styles.mbMd0}`}>
                        <li><a href="#home" id="home" className={`${styles.navLink} ${styles.px2} ${styles.textSecondary}`}>Home</a></li>
                        <li><a href="#about" id="about" className={`${styles.navLink} ${styles.px2} ${styles.textWhite}`}>About</a></li>
                    </ul>
                    <form className={`${styles.col12} ${styles.colLgAuto} ${styles.mb3} ${styles.mbLg0} ${styles.meLg3}`} role="search">
                        <input type="search" className={`${styles.formControlDark} ${styles.textBgDark}`} placeholder="Search..." aria-label="Search" />
                    </form>
                    <div className={styles.textEnd}>
                        <Link to="/login">
                            <button type="button" className={`btn btn-outline-light ${styles.me2}`}>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button type="button" className="btn btn-warning">Sign-up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
