import React, { useEffect, useState } from 'react';
import {
  getRequestsSentProfiles,
  getRequestsInProfiles,
  getRequestsAcceptedProfiles,
  getRequestsRejectedProfiles,
  acceptRequest,
  rejectRequest,
  cancelRequest
} from '../../api/requestAndShortApi';
import styles from './requestPage.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';

const RequestPage = () => {
  const [requestsSentProfiles, setRequestsSentProfiles] = useState([]);
  const [requestsInProfiles, setRequestsInProfiles] = useState([]);
  const [requestsAcceptedProfiles, setRequestsAcceptedProfiles] = useState([]);
  const [requestsRejectedProfiles, setRequestsRejectedProfiles] = useState([]);
  const [activeSection, setActiveSection] = useState('requestsSent');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const requestsSent = await getRequestsSentProfiles();
        setRequestsSentProfiles(Array.isArray(requestsSent) ? requestsSent : []);

        const requestsIn = await getRequestsInProfiles();
        setRequestsInProfiles(Array.isArray(requestsIn) ? requestsIn : []);

        const requestsAccept = await getRequestsAcceptedProfiles();
        setRequestsAcceptedProfiles(Array.isArray(requestsAccept) ? requestsAccept : []);

        const requestsReject = await getRequestsRejectedProfiles();
        setRequestsRejectedProfiles(Array.isArray(requestsReject) ? requestsReject : []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profile) => {
    // Redirect to profile page or show profile details
  };

  const handleAcceptRequest = async (profileId) => {
    try {
      await acceptRequest(profileId);
      setRequestsInProfiles(prev => prev.filter(profile => profile._id !== profileId));
      setRequestsAcceptedProfiles(prev => [...prev, profileId]); // Update accordingly
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (profileId) => {
    try {
      await rejectRequest(profileId);
      setRequestsInProfiles(prev => prev.filter(profile => profile._id !== profileId));
      setRequestsRejectedProfiles(prev => [...prev, profileId]); // Update accordingly
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleCancelRequest = async (profileId) => {
    try {
      await cancelRequest(profileId);
      setRequestsSentProfiles(prev => prev.filter(profile => profile._id !== profileId));
      setRequestsAcceptedProfiles(prev => prev.filter(profile => profile._id !== profileId));
      setRequestsRejectedProfiles(prev => prev.filter(profile => profile._id !== profileId));
    } catch (error) {
      console.error('Error canceling request:', error);
    }
  };

  const renderProfile = (profile, isRequest = false, showCancel = false) => (
    <div className={styles.profileContainer} key={profile._id} onClick={() => handleProfileClick(profile)}>
      <div className={styles.profileContent}>
        <img src={profile.photoUrls[0]} alt={profile.name} className={styles.profileImage} />
        <p>{profile.name}</p>
        {isRequest && (
          <div className={styles.buttons}>
            <button onClick={(e) => { e.stopPropagation(); handleAcceptRequest(profile._id); }}>Accept</button>
            <button onClick={(e) => { e.stopPropagation(); handleRejectRequest(profile._id); }}>Reject</button>
          </div>
        )}
        {showCancel && (
          <button onClick={(e) => { e.stopPropagation(); handleCancelRequest(profile._id); }}>Cancel</button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <UserNavbar />
      <div className={styles.profileDisplayPage}>
        <div className={styles.header}>
          <button onClick={() => setActiveSection('requestsSent')} className={activeSection === 'requestsSent' ? styles.active : ''}>Requests Sent</button>
          <button onClick={() => setActiveSection('requestsIn')} className={activeSection === 'requestsIn' ? styles.active : ''}>Incoming Requests</button>
          <button onClick={() => setActiveSection('requestsAccept')} className={activeSection === 'requestsAccept' ? styles.active : ''}>Requests Accepted</button>
          <button onClick={() => setActiveSection('requestsReject')} className={activeSection === 'requestsReject' ? styles.active : ''}>Requests Rejected</button>
        </div>

        <div className={styles.section}>
          {activeSection === 'requestsSent' && (
            <>
              <h2>Requests Sent</h2>
              {requestsSentProfiles.map(profile => renderProfile(profile, false, true))}
            </>
          )}
          {activeSection === 'requestsIn' && (
            <>
              <h2>Incoming Requests</h2>
              {requestsInProfiles.map(profile => renderProfile(profile, true))}
            </>
          )}
          {activeSection === 'requestsAccept' && (
            <>
              <h2>Requests Accepted</h2>
              {requestsAcceptedProfiles.map(profile => renderProfile(profile, false, true))}
            </>
          )}
          {activeSection === 'requestsReject' && (
            <>
              <h2>Requests Rejected</h2>
              {requestsRejectedProfiles.map(profile => renderProfile(profile, false, true))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestPage;
