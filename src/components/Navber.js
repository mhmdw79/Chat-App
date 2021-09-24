import React from 'react';
import styles from "./Navbar.module.css"
const Navber = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>
                Chat-Test
            </div>
            <div className={styles.logout}onClick={props.logoutHandler}>
                Logout
            </div>
        </div>
    );
};

export default Navber;