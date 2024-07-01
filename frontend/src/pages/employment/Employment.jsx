import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './employment.module.css';

const Employment = () => {
  const [userType, setUserType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPhone = localStorage.getItem('phone');
    setEmail(storedEmail);
    setPhone(storedPhone);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      phone,
      userType,
      companyName,
      designation,
      location,
      expertiseLevel,
    };

    try {
      const response = await axios.post('/api/employment', userData);

      if (response.data.success) {
        navigate('/relationship');
      } else {
        alert(' failed saving data: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.userTypeSelection}>
      <h1>Select Your Role</h1>
      <div className={styles.radioButtons}>
        <label>
          <input
            type="radio"
            value="employer"
            checked={userType === 'employer'}
            onChange={() => setUserType('employer')}
          />
          Employer/Employee
        </label>
        <label>
          <input
            type="radio"
            value="jobseeker"
            checked={userType === 'jobseeker'}
            onChange={() => setUserType('jobseeker')}
          />
          Jobseeker
        </label>
      </div>

      {userType === 'employer' && (
        <div className={styles.employerFields}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      )}

      {userType === 'jobseeker' && (
        <div className={styles.jobseekerFields}>
          <label>
            <input
              type="radio"
              value="beginner"
              checked={expertiseLevel === 'beginner'}
              onChange={() => setExpertiseLevel('beginner')}
            />
            Beginner
          </label>
          <label>
            <input
              type="radio"
              value="intermediate"
              checked={expertiseLevel === 'intermediate'}
              onChange={() => setExpertiseLevel('intermediate')}
            />
            Intermediate
          </label>
          <label>
            <input
              type="radio"
              value="expert"
              checked={expertiseLevel === 'expert'}
              onChange={() => setExpertiseLevel('expert')}
            />
            Expert
          </label>
        </div>
      )}

      <button onClick={handleSubmit} className={styles.nxtButton}>Next</button>
    </div>
  );
};

export default Employment;
