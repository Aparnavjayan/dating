import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';


const RegisterPage = () => {
  
  const navigate = useNavigate();

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [userExists, setUserExists] = useState(false); 

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setIsGoogleUser(true);
      setName(storedUser.name);
      setEmail(storedUser.email);
      
    }
  }, []);
  // useEffect(() => {
  //   if (email || phone) {
  //     fetchUserData();
  //   }
  // }, [email, phone]);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get('/api/user', {
  //       params: { email, phone }
  //     });
  //     if (response.data.success && response.data.user) {
  //       setName(response.data.user.name);
  //       setPhone(response.data.user.phone);
  //       setPassword(''); 
  //       setUserExists(true);
  //     } else {
  //       setUserExists(false);
  //     }
  //   } catch (error) {
  //     console.error('There was an error fetching user data!', error);
  //   }
  // };

  // const nextButton = () =>{
  //   navigate('/relationship')
  // }
  // const validateForm = () => {
  //   if (!name || !email || !phone || !password) {
  //     alert('All fields are required');
  //     return false;
  //   }
  //   return true;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   return;
    // }
    setIsLoading(true);
    const formData = {
      name,
      email,
      phone,
      password,
    };

    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post('/api/register', formData);
      setIsLoading(false);
      if (response.data.success) {
        navigate('/moreabout');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('There was an error!', error);
      alert('There was an error: ' + error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.registerPage}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2>Fill your data</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.showPassword}>
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="show-password">{showPassword ? 'Hide' : 'Show'}</label>
            </div>
          </div>
        </div>
        <button type="submit" className={styles.nextBtn} disabled={isLoading}>{isLoading ? 'Submitting...' : 'Next'}</button>
      </form>
    </div>
  );
};

export default RegisterPage;
