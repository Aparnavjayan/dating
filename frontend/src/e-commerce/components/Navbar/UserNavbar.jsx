import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './userNavbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/userData');
        console.log('response',response)
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light ${styles.ecomnavbar}`}>
        <div className="container-fluid">
          <a className={`navbar-brand ${styles.brand}`} href="#">
            <img
              src=""
              height="30"
              alt="Logo"
              loading="lazy"
            />
           
          </a>
          <form className={`d-flex ${styles.searchForm}`}>
            <input
             className={`form-control ${styles.searchInput}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className={`btn btn-outline-success ${styles.searchButton}`} type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
           
            {user && (
              <a className="text-reset me-3" href="#">
                <img
                  src={user.photoUrls[0] || 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'}
                  className={`rounded-circle ${styles.avatar}`}
                  height="30"
                  alt="Avatar"
                  loading="lazy"
                />
              </a>
            )}
          </div>
        </div>
      </nav>
      <nav className={`navbar navbar-expand-lg navbar-light ${styles.ecomnav}`}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/facewash">Face Wash</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/creams">Creams</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
