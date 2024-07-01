import React from 'react';
import styles from './usernav.module.css';
 

const UserNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="" alt="Website Logo" className={styles.logo} />
      </div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem}>Request</li>
        <li className={styles.navItem}>Messages</li>
        <li className={styles.navItem}>Notification</li>
        <li className={styles.navItem}>Profile</li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
