import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './serviceSelection.module.css';

function ServiceSelection() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');

  const handleOptionChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedService === 'dating') {
      navigate('/userhome')
    } else if (selectedService === 'matrimonial') {
      navigate('/matrimony')
    } else if (selectedService === 'jobportal') {
      navigate('/jobportal')
    } else if (selectedService === 'ecommerce') {
      window.location.href = 'http://localhost:3001';
    } else {
      navigate('/studyabroad')
    }
  };

  return (
    <div className={styles.servicecontainer}>
      <h1>Select a Service</h1>
      <div className={styles.serviceFields}>
        <div className={styles.serviceOption}>
          <input
            type="radio"
            name="service"
            value="dating"
            onChange={handleOptionChange}
          />
          <label>Dating</label>
        </div>
        <div className={styles.serviceOption}>
          <input
            type="radio"
            name="service"
            value="matrimonial"
            onChange={handleOptionChange}
          />
          <label>Matrimonial</label>
        </div>
        <div className={styles.serviceOption}>
          <input
            type="radio"
            name="service"
            value="jobportal"
            onChange={handleOptionChange}
          />
          <label>Job Portal</label>
        </div>
        <div className={styles.serviceOption}>
          <input
            type="radio"
            name="service"
            value="ecommerce"
            onChange={handleOptionChange}
          />
          <label>E-commerce</label>
        </div>
        <div className={styles.serviceOption}>
          <input
            type="radio"
            name="service"
            value="studyabroad"
            onChange={handleOptionChange}
          />
          <label>Study Abroad</label>
        </div>
      </div>
      <button onClick={handleSubmit} className={styles.servicenxtButton}>Next</button>
    </div>
  );
}

export default ServiceSelection;
