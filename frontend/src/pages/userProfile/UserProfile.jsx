import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './userprofile.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';
import ActionIcons from '../../components/actionIcons/ActionIcons';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('/api/users', {
          withCredentials: true 
        });
        console.log('user:', userResponse.data);
        setUser(userResponse.data);

        const userDataResponse = await axios.get('/api/userData', {
          withCredentials: true 
        });
        console.log('userdata:', userDataResponse.data);
        setUserData(userDataResponse.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const nextImage = () => {
    if (userData && userData.photoUrls) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % userData.photoUrls.length);
    }
  };

  const prevImage = () => {
    if (userData && userData.photoUrls) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + userData.photoUrls.length) % userData.photoUrls.length);
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
            src={userData.photoUrls ? userData.photoUrls[currentImageIndex] : userData.image}
            alt="User"
            className={styles.image}
          />
          <button className={styles.nextButton} onClick={nextImage}>❯</button>
          <div className={styles.imageCaption}>
            <h2>{user.name}, {userData.age}, {user.location}</h2>
            <p>{userData.preferences.shortBio}</p>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.likeButton}>👍 Like</button>
            <button className={styles.dislikeButton}>👎 Dislike</button>
          </div>
          {userData && (
            <ActionIcons />
          )}
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

export default UserProfile;
