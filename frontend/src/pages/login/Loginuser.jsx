import React , {useState} from 'react'
import axios from 'axios';


function Loginuser() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify/send-verification', { phoneNumber });
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
      const response = await axios.post('http://localhost:3000/verify/check-verification', { phoneNumber, code:otp });
      if (response.data.message === 'Verification successful') {
        setIsVerified(true);
        alert('OTP verified successfully!');
        // Handle successful verification (e.g., log in the user)
      } else {
        alert('Invalid OTP.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    }
  };


  return (
       <div className="App">
      <header className="App-header">
        <button onClick={handleGoogleLogin}>Login with Google</button>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Login with Mobile</h3>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSendOtp} disabled={otpSent}>Send OTP</button>
        </div>

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
      </header>
    </div>
  )
}

export default Loginuser