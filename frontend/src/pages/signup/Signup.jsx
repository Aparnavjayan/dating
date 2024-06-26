import React, { useState } from 'react';
import axios from 'axios';
import styles from './signup.module.css';


function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify/send-verification', { phone });
      if (response.data.message === 'Verification sent') {
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
      if (response.data.message === 'Verification successful') {
        setIsVerified(true);
        alert('OTP verified successfully!');
        await axios.post('http://localhost:3000/update-phone', { phone, name });
      } else {
        alert('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    }
  };

  return (
    <div>
      
    < div className={styles.wrapper}>
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
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
              <button onClick={handleVerifyOtp}>Verify OTP</button>
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
        </form>
      </div>
    </div>
    </div>
  );
}

export default Signup;
