import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./boarding.module.css";
import loginIcon from "../../assets/loginIcon.png";


function Boarding() {
    const navigate = useNavigate()
    const submitLoginButton = () => {
        navigate('/login')
    }
    const submitExploreButton = () => {
      navigate('/signup')
  }
  return (
    <>
      <div className={styles.pageContainer}>
        
        <button className={styles.loginButton} onClick={submitLoginButton}>
            <img src={loginIcon} alt="" className={styles.icon}/> Sign in
        </button>
        <div className={styles.textoverimage}>
          <h1>Welcome to HeartMatch!</h1>
          <p>Your heart's perfect match is just a click away. Explore a world of genuine connections and let your love story unfold with every interaction. Start your journey to find that special someone today!</p>
        </div>
        <button className={styles.exploreButton} onClick={submitExploreButton}>
             Explore Now
        </button>
      </div>

      {/* -----------------------------------------middle container-------------------------------------------- */}

      <div className={styles.midcontainer}>
        <section className={styles.featuresSection}>
          <h2>Features</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Genuine Profiles</h3>
              <p>Connect with real people verified through our robust system.</p>
            </div>
            <div className={styles.feature}>
              <h3>Intelligent Matching</h3>
              <p>Our advanced algorithms ensure you meet compatible partners.</p>
            </div>
            <div className={styles.feature}>
              <h3>Secure Messaging</h3>
              <p>Chat safely and securely with end-to-end encryption.</p>
            </div>
          </div>
        </section>

        <section className={styles.testimonialsSection}>
          <h2>Testimonials</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <p>
                "HeartMatch helped me find the love of my life! The experience
                was wonderful and seamless." - Jane D.
              </p>
            </div>
            <div className={styles.testimonial}>
              <p>
                "I never thought online dating could be this easy and effective.
                Highly recommend HeartMatch!" - John S.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2>Ready to Find Your Match?</h2>
          <button className={styles.ctaButton} onClick={submitExploreButton}>
            Join Now
          </button>
        </section>
      </div>
      {/* -------------------------------------------footer-------------------------------------------------- */}

      <footer className={styles.footer}>
      <div className={styles['container-f']}>
        <div className={styles['row-f']}>
          <div className={styles['footer-col']}>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="product.html">Our Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className={styles['footer-col']}>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="copyright text-center">
        <h5>
          <a href="#" aria-label="Shopify website">
            🌐
          </a>{' '}
          copyright © 2024 LearnBuds all rights reserved
        </h5>
      </div>
      <hr />
    </footer>
    </>
  )
}

export default Boarding
