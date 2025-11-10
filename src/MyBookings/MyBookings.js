import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();

  const bookingData = {
    id: 'BK1749664799203',
    caregiver: 'Emma Wilson',
    date: '2025-06-13',
    time: '10:10',
    duration: '1 hour(s)',
    location: 'University Exam Center - Main Campus',
    totalPaid: '$35',
    status: 'confirmed',
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Booking Confirmed!</h1>
        <p>Your session has been successfully booked and payment processed.</p>
      </div>

      <div className="booking-card">
        <h2>Session Details</h2>
        <p><strong>Booking ID:</strong> {bookingData.id}</p>
        <p><strong>Caregiver:</strong> {bookingData.caregiver}</p>
        <p><strong>Date & Time:</strong> {bookingData.date} at {bookingData.time}</p>
        <p><strong>Duration:</strong> {bookingData.duration}</p>
        <p><strong>Location:</strong> {bookingData.location}</p>
        <p><strong>Total Paid:</strong> {bookingData.totalPaid}</p>

        <div className="status-section">
          <span className="status-badge">Status: {bookingData.status}</span>
          <p className="tracking-note">
            Your caregiver will be notified and location tracking will be enabled 30 minutes before the session.
          </p>
        </div>
      </div>

      <div className="tracking-section">
        <h2>📍 Live Location Tracking</h2>
        <p>Track real-time location for your care session.</p>
        <div className="tracking-details">
          <p><strong>📅</strong> {bookingData.date} at {bookingData.time}</p>
          <p><strong>📍</strong> {bookingData.location}</p>
          <p><strong>👤</strong> {bookingData.caregiver}</p>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back to Dashboard</button>
    </div>
  );
};

export default MyBookings;
