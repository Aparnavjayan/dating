import React from "react"
import { useNavigate } from "react-router-dom"


function Boarding() {
    const navigate = useNavigate()
    const submitButton = () => {
        navigate('/login')
    }
  return (
   
    <div className="App">
        <h1>Welcome</h1>
        <button type="button"  onClick={submitButton}>Start</button>
    </div>
  )
}

export default Boarding