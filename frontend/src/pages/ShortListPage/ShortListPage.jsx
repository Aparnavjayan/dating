import React, { useEffect, useState } from 'react';
import { getShortlistedProfiles, getShortlistedByProfiles } from '../../api/requestAndShortApi';
import styles from './shortListPage.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';

const ShortListPage = () => {
  const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
  const [shortlistedByProfiles, setShortlistedByProfiles] = useState([]);
  const [activeSection, setActiveSection] = useState('shortlisted');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const shortlisted = await getShortlistedProfiles();
        console.log('shortlisted',fetchProfiles)
        setShortlistedProfiles(Array.isArray(shortlisted) ? shortlisted : []);

        const shortlistedBy = await getShortlistedByProfiles();
        setShortlistedByProfiles(Array.isArray(shortlistedBy) ? shortlistedBy : []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (profileId) => {
    // Redirect to profile page or show profile details
  };

  const renderProfile = (profile) => (
    <div className={styles.profileContainer} key={profile._id} onClick={() => handleProfileClick(profile._id)}>
      <div className={styles.profileContent}>
      <img src={profile.photoUrls[0]} alt={profile.name} className={styles.profileImage} />
        <p>{profile.name}</p>
      </div>
    </div>
  );

  return (
    <>
      <UserNavbar/>
      <div className={styles.profileDisplayPage}>
        <div className={styles.header}>
          <button onClick={() => setActiveSection('shortlisted')} className={activeSection === 'shortlisted' ? styles.active : ''}>Shortlisted Profiles</button>
          <button onClick={() => setActiveSection('shortlistedBy')} className={activeSection === 'shortlistedBy' ? styles.active : ''}>Profiles Shortlisted By</button>
        </div>

        <div className={styles.section}>
          {activeSection === 'shortlisted' && (
            <>
              <h2>Shortlisted Profiles</h2>
              {shortlistedProfiles.map(profile => renderProfile(profile))}
            </>
          )}
          {activeSection === 'shortlistedBy' && (
            <>
              <h2>Profiles Shortlisted By</h2>
              {shortlistedByProfiles.map(profile => renderProfile(profile))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShortListPage;
