import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './moreabout.module.css'

function MoreAbout() {
  
  // const [username, setUsername] = useState('User');  
  const [userDetails, setUserDetails] = useState({
    dateOfBirth: '',
    age: '',
    gender: '',
    education: '',
    occupation: '',
    hobby: '',
    preferences: {
      interest: '',
      smokingHabits: '',
      drinkingHabits: '',
      fitnessInterest: '',
      genderPreference: '',
      shortBio: ''
    }
  
  });
 const navigate = useNavigate()

// const nextButton =() => {
//   navigate('/addphoto')
// }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserDetails({
        ...userDetails,
        preferences: {
          ...userDetails.preferences,
          [name]: checked
        }
      });
    }else if (name in userDetails.preferences) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        preferences: {
          ...prevDetails.preferences,
          [name]: value
        }
      }));
    }  else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('User Details:', userDetails);
    try {
      const response = await axios.post('/api/user-details', userDetails, {
        withCredentials: true
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
            {/* <h2>Basic Details</h2> */}
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={userDetails.age}
                onChange={handleInputChange}
              />
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
            </label>
            <label>
              Education:
              <input
                type="text"
                name="education"
                value={userDetails.education}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Occupation:
              <input
                type="text"
                name="occupation"
                value={userDetails.occupation}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Hobbies:
              <input
                type="text"
                name="hobby"
                value={userDetails.hobby}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.preferences}>
            {/* <h2>Preferences</h2> */}
            <label>
            Interests:
              <input
                type="text"
                name="interest"
                value={userDetails.preferences.interest}
                onChange={handleInputChange}
              />
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
            </label>
            <label>
              Interest in Fitness:
              <input
                type="text"
                name="fitnessInterest"
                value={userDetails.preferences.fitnessInterest}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Gender Preference:
              <select
                 name="genderPreference"
                 value={userDetails.preferences.genderPreference}
                 onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="non-drinker">Men</option>
                <option value="occasional-drinker">Women</option>
                <option value="regular-drinker">Both</option>
              </select>
            </label>
            <label>
              Short Bio:
              <textarea
                name="shortBio"
                value={userDetails.preferences.shortBio}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <button type="submit"  className={styles.nextbutton} >Next</button>
      </form>
    </div>
  );
  
}

export default MoreAbout