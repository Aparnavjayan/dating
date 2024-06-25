import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';


const RegisterPage = ({ user }) => {
  const [isGoogleUser, setIsGoogleUser] = useState(!!user);
  const [name, setName] = useState(isGoogleUser ? user.name : '');
  const [email, setEmail] = useState(isGoogleUser ? user.email : '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      password,
    };

    try {
      const response = await axios.post('/api/register', formData);
      if (response.data.success) {
        navigate('/');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
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
            readOnly={isGoogleUser}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={isGoogleUser}
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
        <button type="submit" className={styles.nextBtn}>Next</button>
      </form>
    </div>
  );
};

export default RegisterPage;
