import React from 'react';
import styles from './userNavbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserNavbar = () => {
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
           
            <a className="text-reset me-3" href="#">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className={`rounded-circle ${styles.avatar}`}
                height="30"
                alt="Avatar"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </nav>
      <nav className={`navbar navbar-expand-lg navbar-light ${styles.ecomnav}`}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Bestsellers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Inspirations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
