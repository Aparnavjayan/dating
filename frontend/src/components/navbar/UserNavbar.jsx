import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './usernav.module.css';

const UserNavbar = () => {
  const [profileImage, setProfileImage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/userData', { withCredentials: true });
        console.log('navbar userdata', response);
        if (response.data.photoUrls && response.data.photoUrls.length > 0) {
          setProfileImage(response.data.photoUrls[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      // Clear authentication tokens
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      // Redirect to login page
      navigator('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    console.log('User logged out');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="" alt="Website Logo" className={styles.logo} />
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li className={styles.navItem}>
          <Link to="/userHome" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/request" className={styles.navLink}>Request</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/messages" className={styles.navLink}>Messages</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/shortlist" className={styles.navLink}>ShortList</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/notification" className={styles.navLink}>Notification</Link>
        </li>
        <li className={styles.navItem}>
          <div className={styles.profileContainer} onClick={toggleDropdown}>
            <img src={profileImage} alt="Profile" className={styles.profileImage} />
            {dropdownVisible && (
              <div className={styles.dropdown}>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                <button onClick={() => {navigator('/editprofile')}} className={styles.logoutButton}>Edit Profile</button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
