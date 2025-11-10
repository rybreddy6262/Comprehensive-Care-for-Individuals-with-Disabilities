import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log(result); // ✅ Check what the backend sends

      // Ensure the token exists
      if (response.ok && result.token) {
        Cookies.set('jwt_token', result.token, { expires: 7 }); // Store token in cookies
        alert('✅ Signin successful!');
        navigate('/home');
      } else {
        alert(`${result.error || 'Signin failed. Token not received.'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;