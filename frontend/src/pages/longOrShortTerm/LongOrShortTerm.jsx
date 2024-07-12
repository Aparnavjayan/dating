import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import styles from './longorshort.module.css';

function LongOrShortTerm() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const cookies = new Cookies();
    const userEmail = cookies.get('email');
    const userid = cookies.get('_id');
    console.log('Stored Email:', userEmail);
    console.log('Stored id:', userid);
    setEmail(userEmail);
    setUserid(userid);
  }, []);

  const nextButton = async () => {
    if (selectedOption === '') {
      alert('Please select an option.');
      return;
    }

    try {
      const response = await axios.post('/api/relationship-type', {
        relationshipType: selectedOption,
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        if (selectedOption === 'shortTerm') {
          navigate('/gender');
        } else if (selectedOption === 'longTerm') {
          if (window.confirm('Do you want to visit the matrimony page?')) {
            navigate('/matrimony');
          }
        }
      } else {
        alert('Failed to save data: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Choose your option</h2>
      <div className={styles.options}>
        <div className={styles.option}>
          <label>
            <input
              type="radio"
              id="longTerm"
              name="relationship"
              value="longTerm"
              onChange={handleOptionChange}
            />
            Long term relationship
          </label>
        </div>
        <div className={styles.option}>
          <label>
            <input
              type="radio"
              id="shortTerm"
              name="relationship"
              value="shortTerm"
              onChange={handleOptionChange}
            />
            Short term relationship
          </label>
        </div>
      </div>
      <button className={styles.button} onClick={nextButton}>Next</button>
    </div>
  );
}

export default LongOrShortTerm;
