import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './interestedgender.module.css';

function InterestedGender() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedOption === '') {
      alert('Please select an option.');
      return;
    }
    try {
      const response = await axios.post('/api/gender', {
        selectedGender: selectedOption,
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        navigate('/userHome');
      } else {
        alert('Failed to save data: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className={styles.genderSelection}>
      <h1 className={styles.heading}>Looking For...</h1>
      <div className={styles.genderFields}>
        <label className={styles.option}>
          <input
            type="radio"
            id="men"
            name="gender"
            value="men"
            checked={selectedOption === 'men'}
            onChange={handleOptionChange}
          />
          Men
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            id="women"
            name="gender"
            value="women"
            checked={selectedOption === 'women'}
            onChange={handleOptionChange}
          />
          Women
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            id="both"
            name="gender"
            value="both"
            checked={selectedOption === 'both'}
            onChange={handleOptionChange}
          />
          Both
        </label>
      </div>
      <button onClick={handleSubmit} className={styles.nxtButton}>Next</button>
    </div>
  )
}

export default InterestedGender;
