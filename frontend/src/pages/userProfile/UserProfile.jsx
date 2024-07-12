import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './userprofile.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';
import ActionIcons from '../../components/actionIcons/ActionIcons';
import MessageComponent from '../../components/message/MessageComponent';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMessageComponent, setShowMessageComponent] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${userId}`, {
          withCredentials: true
        });
        console.log('user:', userResponse.data);
        setUser(userResponse.data);

        const userDataResponse = await axios.get(`/api/userData/${userId}`, {
          withCredentials: true
        });
        console.log('userdata:', userDataResponse.data);
        setUserData(userDataResponse.data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleMessageClick = () => {
    setShowMessageComponent(true);
  };

  if (!user || !userData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <UserNavbar />
      <div className={styles.container}>
        <div className={styles.profileContent}>
          <div className={styles.imageCard}>
            <button className={styles.prevButton} onClick={prevImage}>❮</button>
            <img
              src={userData.photoUrls ? userData.photoUrls[currentImageIndex] : userData.image}
              alt="User"
              className={styles.image}
            />
            <button className={styles.nextButton} onClick={nextImage}>❯</button>
            <div className={styles.imageCaption}>
              <h2>{user.name}, {userData.age}, {userData.location}</h2>
              <p>{userData.preferences.shortBio}</p>
            </div>
            <div className={styles.actionButtons}>
              <ActionIcons userId={userId} onMessageClick={handleMessageClick} />
            </div>
          </div>
          <div className={styles.userInfo}>
            <h3>About Me</h3>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Education:</strong> {userData.education}</p>
            <p><strong>Occupation:</strong> {userData.occupation}</p>
            <p><strong>Hobbies:</strong> {userData.preferences.hobby}</p>
            <p><strong>Interests:</strong> {userData.preferences.interest}</p>
            <p><strong>Smoking Habits:</strong> {userData.preferences.smokingHabits}</p>
            <p><strong>Drinking Habits:</strong> {userData.preferences.drinkingHabits}</p>
            <p><strong>Interest in Fitness:</strong> {userData.preferences.fitnessInterest}</p>
          </div>
        </div>
        
        {showMessageComponent && (
          <div className={styles.messageComponentContainer}>
            <MessageComponent userId={userId} onClose={() => setShowMessageComponent(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
