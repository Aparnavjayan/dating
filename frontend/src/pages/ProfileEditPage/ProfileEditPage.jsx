import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './profileEditPage.module.css';
import UserNavbar from '../../components/navbar/UserNavbar';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [initialUser, setInitialUser] = useState({});
  const [initialUserDetails, setInitialUserDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUser(response.data);
        setInitialUser(response.data);
      })
      .catch(error => console.error('Error fetching user data:', error));

    axios.get('/api/userData')
      .then(response => {
        const userData = response.data;

        if (userData.dateOfBirth) {
          userData.dateOfBirth = new Date(userData.dateOfBirth).toISOString().split('T')[0];
        }
        setUserDetails(userData);
        setPhotos(userData.photoUrls || []);
        setVideo(userData.videoUrl || null);
        setInitialUserDetails(userData);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

  const handleUserUpdate = () => {
    axios.put('/api/user/profile', user)
      .then(response => console.log('User updated:', response.data))
      .catch(error => console.error('Error updating user:', error));
  };

  const handleUserDetailsUpdate = (event) => {
    event.preventDefault();
    axios.put('/api/user/details', userDetails)
      .then(response => console.log('User details updated:', response.data))
      .catch(error => console.error('Error updating user details:', error));
  };

  const handlePhotosAndVideoUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    photos.forEach((photo, index) => {
      if (photo) {
        formData.append('photo', photo);
      }
    });

    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        const { photoUrls, videoUrl } = response.data;
        setUserDetails(prevState => ({ ...prevState, photoUrls, videoUrl }));
        console.log('Photos and video updated:', response.data);
      } else {
        console.log('Failed to upload files');
      }
    } catch (error) {
      console.log('Error uploading files:', error);
    }
  };

  const handleDiscardChanges = () => {
    setUser(initialUser);
    setUserDetails(initialUserDetails);
    setPhotos(initialUserDetails.photoUrls || []);
    setVideo(initialUserDetails.videoUrl || null);
  };

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <>
      <UserNavbar/>
      <div className={styles.profileEditPage}>
        <h2>Edit Profile</h2>
        <div className={styles.profileSection}>
          <h3>User Information</h3>
          <input
            type="text"
            value={user.name || ''}
            onChange={e => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={user.email || ''}
            onChange={e => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={user.phone || ''}
            onChange={e => setUser({ ...user, phone: e.target.value })}
            placeholder="Phone"
          />
          <select
            value={user.userType || ''}
            onChange={e => setUser({ ...user, userType: e.target.value })}
            placeholder="User Type"
          >
            <option value=''>Select User Type</option>
            <option value='employer'>Employee/Employer</option>
            <option value='jobseeker'>Job Seeker</option>
          </select>
          <input
            type="text"
            value={user.companyName || ''}
            onChange={e => setUser({ ...user, companyName: e.target.value })}
            placeholder="Company Name"
          />
          <input
            type="text"
            value={user.designation || ''}
            onChange={e => setUser({ ...user, designation: e.target.value })}
            placeholder="Designation"
          />
          <input
            type="text"
            value={user.location || ''}
            onChange={e => setUser({ ...user, location: e.target.value })}
            placeholder="Location"
          />
          <select
            value={user.expertiseLevel || ''}
            onChange={e => setUser({ ...user, expertiseLevel: e.target.value })}
            placeholder="Expertise Level"
          >
            <option value=''>Select Expertise Level</option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
          </select>
          <input
            type="text"
            value={user.relationshipType || ''}
            onChange={e => setUser({ ...user, relationshipType: e.target.value })}
            placeholder="Relationship Type"
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleUserUpdate}>Save User Changes</button>
          </div>
        </div>
        <div className={styles.profileSection}>
          <h3>User Details</h3>
          <input
            type="date"
            value={userDetails.dateOfBirth || ''}
            onChange={e => setUserDetails({ ...userDetails, dateOfBirth: e.target.value })}
            placeholder="Date of Birth"
          />
          <input
            type="number"
            value={userDetails.age || ''}
            onChange={e => setUserDetails({ ...userDetails, age: e.target.value })}
            placeholder="Age"
          />
          <input
            type="text"
            value={userDetails.gender || ''}
            onChange={e => setUserDetails({ ...userDetails, gender: e.target.value })}
            placeholder="Gender"
          />
          <input
            type="text"
            value={userDetails.education || ''}
            onChange={e => setUserDetails({ ...userDetails, education: e.target.value })}
            placeholder="Education"
          />
          <input
            type="text"
            value={userDetails.occupation || ''}
            onChange={e => setUserDetails({ ...userDetails, occupation: e.target.value })}
            placeholder="Occupation"
          />
          <input
            type="text"
            value={userDetails.location || ''}
            onChange={e => setUserDetails({ ...userDetails, location: e.target.value })}
            placeholder="Location"
          />
          <input
            type="text"
            value={userDetails.preferences?.interest || ''}
            onChange={e => setUserDetails({ ...userDetails, preferences: { ...userDetails.preferences, interest: e.target.value } })}
            placeholder="Interest"
          />
          <input
            type="text"
            value={userDetails.preferences?.hobby || ''}
            onChange={e => setUserDetails({ ...userDetails, preferences: { ...userDetails.preferences, hobby: e.target.value } })}
            placeholder="Hobby"
          />
          <select
            value={userDetails.preferences?.smokingHabits || ''}
            onChange={e => setUserDetails({ ...userDetails, preferences: { ...userDetails.preferences, smokingHabits: e.target.value } })}
            placeholder="Smoking Habits"
          >
            <option value=''>Select Smoking Habits</option>
            <option value='non-smoker'>Non-Smoker</option>
            <option value='occasional'>Occasional</option>
            <option value='regular'>Regular</option>
          </select>
          <select
            value={userDetails.preferences?.drinkingHabits || ''}
            onChange={e => setUserDetails({ ...userDetails, preferences: { ...userDetails.preferences, drinkingHabits: e.target.value } })}
            placeholder="Drinking Habits"
          >
            <option value=''>Select Drinking Habits</option>
            <option value='non-drinker'>Non-Drinker</option>
            <option value='occasional'>Occasional</option>
            <option value='regular'>Regular</option>
          </select>
          <input
            type="text"
            value={userDetails.preferences?.fitnessInterest || ''}
            onChange={e => setUserDetails({ ...userDetails, preferences: { ...userDetails.preferences, fitnessInterest: e.target.value } })}
            placeholder="Fitness Interest"
          />
          <textarea
            value={userDetails.shortBio || ''}
            onChange={e => setUserDetails({ ...userDetails, shortBio: e.target.value })}
            placeholder="Short Bio"
          />
          <div className={styles.fileUpload}>
            <label>Photos</label>
            <input
              type="file"
              multiple
              onChange={handlePhotosChange}
            />
          </div>
          <div className={styles.fileUpload}>
            <label>Video</label>
            <input
              type="file"
              onChange={handleVideoChange}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleUserDetailsUpdate}>Save User Details</button>
            <button className={styles.discardButton} onClick={handleDiscardChanges}>Discard Changes</button>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handlePhotosAndVideoUpdate}>Save Photos and Video</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;