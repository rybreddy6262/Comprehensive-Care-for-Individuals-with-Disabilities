// BookService.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookService.css";

const BookService = () => {
  const location = useLocation();
  const caregiver = location.state?.caregiver;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    location: "",
    duration: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        caregiver,
        formData,
        amount: formData.duration * 200, // Example: ₹200/hour
      },
    });
  };

  return (
    <div className="book-service-wrapper">
      <div className="book-service-card caregiver-card">
        <h2>📋 Selected Caregiver</h2>
        {caregiver && (
          <div className="book-service-caregiver-info">
            <img
              src={caregiver.imageUrl || "/images/photo1.png"}
              alt={caregiver.name}
              className="book-service-caregiver-photo"
            />
            <p><strong>Name:</strong> {caregiver.name}</p>
            <p><strong>Specialty:</strong> {caregiver.specialty}</p>
            <p><strong>Location:</strong> {caregiver.location}</p>
          </div>
        )}
      </div>

      <div className="book-service-card form-card">
        <h2>📄 Book a Care Service</h2>
        <form onSubmit={handleNext}>
          <div className="book-service-field">
            <label htmlFor="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="service">Service Type*</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="exam">Exam Assistance</option>
              <option value="personal">Personal Care</option>
              <option value="event">Event Assistance</option>
            </select>
          </div>
          <div className="book-service-field">
            <label htmlFor="date">Date*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="duration">Duration (in hours)*</label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="book-service-field">
            <label htmlFor="requirements">Special Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              placeholder="Any special needs..."
              value={formData.requirements}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="book-service-submit-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookService;
