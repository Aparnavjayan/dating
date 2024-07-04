import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './userhome.module.css';
import { getCookie } from '../../utils/cookies';

const UserHome = () => {
    const [profiles, setProfiles] = useState({
        qualificationProfiles: [],
        occupationProfiles: [],
        locationProfiles: []
    });
    const [error, setError] = useState('');
    

    


    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async (userId) => {
        try {
            
            const response = await axios.get('/api/profiles', {
                withCredentials: true 
              });
            console.log('Response:', response.data);
            setProfiles(response.data);
        } catch (error) {
            setError('Error fetching profiles. Please try again later.');
            console.error('Error fetching profiles:', error);
        }
    };

    const handleLike = async (profileId) => {
        try {
            await axios.post('/api/like', { userId, profileId });
            fetchProfiles(userId);
        } catch (error) {
            setError('Error liking profile. Please try again later.');
            console.error('Error liking profile:', error);
        }
    };

    const handleDislike = async (profileId) => {
        try {
            await axios.post('/api/dislike', { userId, profileId });
            fetchProfiles(userId);
        } catch (error) {
            setError('Error disliking profile. Please try again later.');
            console.error('Error disliking profile:', error);
        }
    };

    const renderProfiles = (profiles, sectionTitle) => (
        <div className={styles.profileSection}>
            <h2>{sectionTitle}</h2>
            <div className={styles.profileGrid}>
                {profiles.map(profile => (
                    <div key={profile._id} className={styles.profileCard}>
                        <img src={profile.photo} alt={`${profile.name}'s photo`} />
                        <div className={styles.profileInfo}>
                            <h3>{profile.name}</h3>
                            <p>{profile.age}</p>
                        </div>
                        <div className={styles.profileActions}>
                            <button onClick={() => handleLike(profile._id)}>✔️</button>
                            <button onClick={() => handleDislike(profile._id)}>❌</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.userHome}>
            {error && <div className={styles.error}>{error}</div>}
            {renderProfiles(profiles.qualificationProfiles, 'Profiles with Matching Qualification')}
            {renderProfiles(profiles.occupationProfiles, 'Profiles with Matching Occupation')}
            {renderProfiles(profiles.locationProfiles, 'Profiles Nearby')}
        </div>
    );
};

export default UserHome;
