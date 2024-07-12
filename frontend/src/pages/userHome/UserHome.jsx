import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './userhome.module.css';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/navbar/UserNavbar';


const UserHome = () => {
    const [profiles, setProfiles] = useState({
        qualificationProfiles: [],
        occupationProfiles: [],
        locationProfiles: []
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
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

    const handleProfileClick = (userId) => {
        navigate(`/userprofile/${userId}`);
    };

    const handleLike = async (profileId) => {
        try {
            console.log('Liking profile with ID:', profileId);
            await axios.post(`/api/like/${ profileId }`, { withCredentials: true });
            alert('Profile Liked');
        } catch (error) {
            setError('Error liking profile. Please try again later.');
            console.error('Error liking profile:', error);
        }
    };

    const handleDislike = async (profileId) => {
        try {
            console.log('Disliking profile with ID:', profileId);
            await axios.post(`/api/dislike/${profileId}`, { withCredentials: true });
            fetchProfiles();
            alert('Profile Disliked'); 
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
                    <div key={profile._id} className={styles.profileCard} onClick={() => handleProfileClick(profile.userId._id)}>
                        <img src={`/uploads/${profile.photoUrls[0]}`} alt={`${profile.userId.name}'s photo`} />
                        <div className={styles.profileInfo}>
                            <h3>{profile.userId.name}</h3>
                            <p>{profile.age}</p>
                        </div>
                        <div className={styles.profileActions}>
                            <button onClick={(e) => { e.stopPropagation(); handleLike(profile.userId._id); }}>✔️</button>
                            <button onClick={(e) => { e.stopPropagation(); handleDislike(profile.userId._id); }}>❌</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.userHome}>
            <UserNavbar/>
            {error && <div className={styles.error}>{error}</div>}
            {renderProfiles(profiles.qualificationProfiles, 'Profiles with Matching Qualification')}
            {renderProfiles(profiles.occupationProfiles, 'Profiles with Matching Occupation')}
            {renderProfiles(profiles.locationProfiles, 'Profiles Nearby')}
        </div>
    );
};

export default UserHome;
