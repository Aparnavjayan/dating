import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './userhome.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';

function UserHome() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/users');
        setUser(userResponse.data);

        const userDataResponse = await axios.get('/api/userData');
        setUserData(userDataResponse.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const nextImage = () => {
    if (user && user.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
    }
  };

  const prevImage = () => {
    if (user && user.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.images.length) % user.images.length);
    }
  };

  if (!user || !userData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <UserNavbar />
      <div className={styles.container}>
        <div className={styles.imageCard}>
          <button className={styles.prevButton} onClick={prevImage}>❮</button>
          <img
            src={user.images ? user.images[currentImageIndex] : user.image}
            alt="User"
            className={styles.image}
          />
          <button className={styles.nextButton} onClick={nextImage}>❯</button>
          <div className={styles.imageCaption}>
            <h2>{user.name}, {userData.age}, {user.location}</h2>
            <p>{user.bio}</p>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.likeButton}>👍 Like</button>
            <button className={styles.dislikeButton}>👎 Dislike</button>
          </div>
        </div>
        <div className={styles.userInfo}>
          <h3>About Me</h3>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Education:</strong> {userData.education}</p>
          <p><strong>Occupation:</strong> {userData.occupation}</p>
          <p><strong>Hobbies:</strong> {userData.hobby}</p>
          <p><strong>Interests:</strong> {userData.preferences.interests}</p>
          <p><strong>Smoking Habits:</strong> {userData.preferences.smokingHabits}</p>
          <p><strong>Drinking Habits:</strong> {userData.preferences.drinkingHabits}</p>
          <p><strong>Interest in Fitness:</strong> {userData.preferences.fitnessInterest}</p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
