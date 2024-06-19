import React from 'react'


function Loginuser() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };
  return (
    <div className="App">
    <header className="App-header">
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </header>
  </div>
  )
}

export default Loginuser