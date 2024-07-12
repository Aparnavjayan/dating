import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './moreabout.module.css';

function MoreAbout() {
  const [userDetails, setUserDetails] = useState({
    dateOfBirth: '',
    age: '',
    gender: '',
    education: '',
    occupation: '',
    location: '',
    preferences: {
      hobby: '',
      interest: '',
      smokingHabits: '',
      drinkingHabits: '',
      fitnessInterest: '',
      shortBio: '',
    },
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserDetails({
        ...userDetails,
        preferences: {
          ...userDetails.preferences,
          [name]: checked,
        },
      });
    } else if (name in userDetails.preferences) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        preferences: {
          ...prevDetails.preferences,
          [name]: value,
        },
      }));
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }
    if (!userDetails.age) {
      newErrors.age = 'Age is required';
    }
    if (!userDetails.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!userDetails.education) {
      newErrors.education = 'Education is required';
    }
    if (!userDetails.occupation) {
      newErrors.occupation = 'Occupation is required';
    }
    if (!userDetails.location) {
      newErrors.location = 'Location is required';
    }
    if (!userDetails.preferences.hobby) {
      newErrors.hobby = 'Hobby is required';
    }
    if (!userDetails.preferences.interest) {
      newErrors.interest = 'Interest is required';
    }
    if (!userDetails.preferences.smokingHabits) {
      newErrors.smokingHabits = 'Smoking Habits are required';
    }
    if (!userDetails.preferences.drinkingHabits) {
      newErrors.drinkingHabits = 'Drinking Habits are required';
    }
    if (!userDetails.preferences.fitnessInterest) {
      newErrors.fitnessInterest = 'Fitness Interest is required';
    }
    if (!userDetails.preferences.shortBio) {
      newErrors.shortBio = 'Short Bio is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post('/api/user-details', userDetails, {
        withCredentials: true,
      });

      if (response.data.success) {
        navigate('/addphoto');
      } else {
        alert('Failed to save data: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className={styles.about}>
      <h1>More about you</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.basicDetails}>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleInputChange}
              />
              {errors.dateOfBirth && (
                <span className={styles.error}>{errors.dateOfBirth}</span>
              )}
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={userDetails.age}
                onChange={handleInputChange}
              />
              {errors.age && <span className={styles.error}>{errors.age}</span>}
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className={styles.error}>{errors.gender}</span>
              )}
            </label>
            <label>
              Education:
              <input
                type="text"
                name="education"
                value={userDetails.education}
                onChange={handleInputChange}
              />
              {errors.education && (
                <span className={styles.error}>{errors.education}</span>
              )}
            </label>
            <label>
              Occupation:
              <input
                type="text"
                name="occupation"
                value={userDetails.occupation}
                onChange={handleInputChange}
              />
              {errors.occupation && (
                <span className={styles.error}>{errors.occupation}</span>
              )}
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={userDetails.location}
                onChange={handleInputChange}
              />
              {errors.location && (
                <span className={styles.error}>{errors.location}</span>
              )}
            </label>
          </div>
          <div className={styles.preferences}>
            <label>
              Hobbies:
              <input
                type="text"
                name="hobby"
                value={userDetails.preferences.hobby}
                onChange={handleInputChange}
              />
              {errors.hobby && (
                <span className={styles.error}>{errors.hobby}</span>
              )}
            </label>
            <label>
              Interests:
              <input
                type="text"
                name="interest"
                value={userDetails.preferences.interest}
                onChange={handleInputChange}
              />
              {errors.interest && (
                <span className={styles.error}>{errors.interest}</span>
              )}
            </label>
            <label>
              Smoking Habits:
              <select
                name="smokingHabits"
                value={userDetails.preferences.smokingHabits}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="non-smoker">Non-Smoker</option>
                <option value="occasional-smoker">Occasional Smoker</option>
                <option value="regular-smoker">Regular Smoker</option>
              </select>
              {errors.smokingHabits && (
                <span className={styles.error}>{errors.smokingHabits}</span>
              )}
            </label>
            <label>
              Drinking Habits:
              <select
                name="drinkingHabits"
                value={userDetails.preferences.drinkingHabits}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="non-drinker">Non-Drinker</option>
                <option value="occasional-drinker">Occasional Drinker</option>
                <option value="regular-drinker">Regular Drinker</option>
              </select>
              {errors.drinkingHabits && (
                <span className={styles.error}>{errors.drinkingHabits}</span>
              )}
            </label>
            <label>
              Interest in Fitness:
              <input
                type="text"
                name="fitnessInterest"
                value={userDetails.preferences.fitnessInterest}
                onChange={handleInputChange}
              />
              {errors.fitnessInterest && (
                <span className={styles.error}>{errors.fitnessInterest}</span>
              )}
            </label>
            <label>
              Short Bio:
              <textarea
                name="shortBio"
                value={userDetails.preferences.shortBio}
                onChange={handleInputChange}
              />
              {errors.shortBio && (
                <span className={styles.error}>{errors.shortBio}</span>
              )}
            </label>
          </div>
        </div>
        <button type="submit" className={styles.nextbutton}>
          Next
        </button>
      </form>
    </div>
  );
}

export default MoreAbout;
