import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './interestedgender.module.css';

function InterestedGender() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

    const handleSubmit = async()=>{
        
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
              
                navigate('/userhome');
              } 
              
             else {
              alert('Failed to save data: ' + response.data.message);
            }
          } catch (error) {
            console.log('Error:', error);
          }
    }
  return (
    <div className={styles.genderSelection}>
        <h1>Looking For...</h1>
        <div className={styles.genderFields}>
          <label>
            <input
              type="radio"
              id="men"
              value="men"
              
              onChange={handleOptionChange}
              
            />
            Men
          </label>
          <label>
            <input
              type="radio"
              id="women"
              value="women"
              
              onChange={handleOptionChange}
            />
            Women
          </label>
          <label>
            <input
              type="radio"
              id="both"
              value="both"
              
              onChange={handleOptionChange}
            />
            Both
          </label>
          </div>
          <button onClick={handleSubmit} className={styles.nxtButton}>Next</button>
    </div>
  )
}

export default InterestedGender