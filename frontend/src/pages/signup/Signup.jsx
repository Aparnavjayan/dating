import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';

function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    sessionStorage.clear();
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleSendOtp = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/verify/send-verification', { phone });
      if (response.data.success) {
        setOtpSent(true);
        alert('OTP sent successfully!');
      } else {
        alert('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify/check-verification', { phone, code: otp });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setIsVerified(true);
        alert('OTP verified successfully!');
        navigate('/register');
      } else {
        alert('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    return errors;
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Register for free</h1>
        <div className={styles.container}>
          <h2>Create account</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            <button
              type="button"
              className={styles.verify}
              onClick={handleSendOtp}
              disabled={otpSent}
            >
              Sign Up
            </button>
            {otpSent && (
              <div style={{ marginTop: '20px' }}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
              </div>
            )}
            {isVerified && <p>Phone number verified successfully!</p>}
            <div className={styles.orLine}>
              <span>or</span>
            </div>
            <button
              type="button"
              className={styles.google}
              onClick={handleGoogleLogin}
            >
              Sign up with Google
            </button>
            <button
              type="button"
              className={styles.login}
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
