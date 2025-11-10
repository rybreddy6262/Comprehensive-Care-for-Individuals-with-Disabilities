import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import CareExpertsOffer from '../CareExpertsOffer/CareExpertsOffer';



const Home = () => {
  return (
    <>
    <Header/>
      <div className="home-container">
        <div className="left-box">
          <h1>
            Care You Can Trust,<br /> Anytime You Need.
          </h1>
          <p className="subheading">GAIN PEACE OF MIND WITH</p>

          <div className="features">
            <div className="feature">
              <span className="icon">🕐</span>
              <span className="text">24/7 Dedicated Care</span>
            </div>
            <div className="feature">
              <span className="icon">🔒</span>
              <span className="text">Enhanced Security</span>
            </div>
            <div className="feature">
              <span className="icon">❤</span>
              <span className="text">Trusted Caregivers</span>
            </div>
            <div className="feature">
              <span className="icon">✅</span>
              <span className="text">Reliable & Experienced</span>
            </div>
          </div>

          <p className="footer-text">Trusted Caregivers for Individuals with Disabilities</p>
        </div>

        <div className="right-box">
          <img src="/images/caregiving.jpg" alt="Caregiving" />
        </div>
      </div>
      <CareExpertsOffer/>
    </>
  );
};

export default Home;
