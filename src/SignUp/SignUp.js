import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Signup successful!');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage(`❌ ${result.error || 'Signup failed.'}`);
      }
    } catch (err) {
      setMessage('❌ Server error. Try again later.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
