import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './loginuser.module.css';

function Loginuser() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('phone'); 
  const navigate = useNavigate()

  const createAccount = () => {
   navigate('/signup')
  };

  const handleLogin = async () => {
    try {
      const loginData = loginMethod === 'phone' ? { phoneNumber, password } : { email, password };
      const response = await axios.post('http://localhost:3000/login', loginData);
      if (response.data.message === 'Login successful') {
        alert('Login successful!');
       
      } else {
        alert('Invalid credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in.');
    }
  };

  return (
    <div>
      
      <div className={styles.container}>
        <h2>Login</h2>
        <form>
          {loginMethod === 'phone' ? (
            <input
              type="tel"
              placeholder="Phone Number/Gmail id"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Phone Number/Gmail id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.verify}
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className={styles.orLine}>
            
          </div>
          <a
            href="/forgot-password"
            className={styles.forgotPassword}
          >
            Forgot Password
          </a>
          <button
            type="button"
            className={styles.createAccount}
            onClick={createAccount}
          >
            Create new account
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default Loginuser;
