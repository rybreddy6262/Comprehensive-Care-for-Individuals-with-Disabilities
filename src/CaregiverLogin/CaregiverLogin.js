import React, { useState } from 'react';
import './CaregiverLogin.css';
import { useNavigate } from 'react-router-dom';

function CaregiverLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/caregivers");
      const caregivers = await response.json();

      const caregiver = caregivers.find(
        (user) => user.username === username && user.password === password
      );

      if (caregiver) {
        setMessage(`Welcome, ${caregiver.name}!`);
        navigate('/CaregiverDashboard'); // ✅ redirect after login
      } else {
        setMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Error logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Caregiver Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p className="login-message">{message}</p>}
    </div>
  );
}

export default CaregiverLogin;