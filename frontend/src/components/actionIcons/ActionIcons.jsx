import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEnvelope, faPaperPlane, faCheck, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import styles from './actionicons.module.css';

function ActionIcons({ userId, onMessageClick }) { 
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const fetchRequestStatus = async () => {
      try {
        const response = await axios.get(`/api/requestStatus/${userId}`, { withCredentials: true });
        console.log('status', response.data.status)
        setRequestStatus(response.data.status);

      } catch (error) {
        console.log('Error fetching request status:', error);
      }
    };

    fetchRequestStatus();
  }, [userId]);

  const handleShortlist = async () => {
    try {
      await axios.post(`/api/shortlist/${userId}`, {}, { withCredentials: true });
      alert('Profile shortlisted');
    } catch (error) {
      console.log('Error shortlisting profile:', error);
    }
  };

  const handleSendRequest = async () => {
    try {
      await axios.post(`/api/sendRequest/${userId}`, {}, { withCredentials: true });
      alert('Request sent');
      setRequestStatus('sent');
    } catch (error) {
      console.log('Error sending request:', error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await axios.post(`/api/acceptRequest/${userId}`, {}, { withCredentials: true });
      alert('Request accepted');
      setRequestStatus('accepted');
    } catch (error) {
      console.log('Error accepting request:', error);
    }
  };

  const handleHideProfile = async () => {
    try {
      await axios.post(`/api/hideProfile/${userId}`, {}, { withCredentials: true });
      alert('Profile hidden');
    } catch (error) {
      console.log('Error hiding profile:', error);
    }
  };

  return (
    <div className={styles.iconContainer}>
      <FontAwesomeIcon icon={faHeart} className={styles.icon} title="Shortlist" onClick={handleShortlist} />
      <FontAwesomeIcon icon={faEnvelope} className={styles.icon} title="Messages" onClick={onMessageClick} />
      {requestStatus === 'received' ? (
        <FontAwesomeIcon icon={faCheck} className={styles.icon} title="Request Accepted" onClick={handleAcceptRequest} />
      ) : (
        <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} title="Request Sent" onClick={handleSendRequest} />
      )}
      <FontAwesomeIcon icon={faEyeSlash} className={styles.icon} title="Don't Show Profile" onClick={handleHideProfile} />
    </div>
  );
}

export default ActionIcons;
