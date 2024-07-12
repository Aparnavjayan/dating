import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./boarding.module.css";
import loginIcon from "../../assets/loginIcon.png";

function Boarding() {
  const navigate = useNavigate();

  const submitLoginButton = () => {
    navigate('/login');
  };

  const submitExploreButton = () => {
    navigate('/signup');
  };

  return (
    
      <div className={styles.pageContainer}>
        <button className={styles.loginButton} onClick={submitLoginButton}>
          <img src={loginIcon} alt="Login Icon" className={styles.icon} /> Sign in
        </button>
        <div className={styles.textOverImage}>
          <h1>Welcome to HeartMatch!</h1>
          <p>Connecting Hearts, Building Communities</p>
        </div>
        <button className={styles.exploreButton} onClick={submitExploreButton}>
          Explore Now
        </button>
      </div>
  
  );
}

export default Boarding;
