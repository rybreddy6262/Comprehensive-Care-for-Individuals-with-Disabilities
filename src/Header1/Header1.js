import React from 'react';
import {
  Heart,
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import './Header1.css';

const Header1 = () => {
  return (
    <div className="page-container">
      <header className="header">
        <div className="header-content">
          <div className="header-inner">
            <div className="logo">
              <Heart className="logo-icon" />
              <span className="logo-text">CareConnect</span>
            </div>
            <nav className="navigation">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About Us</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Comprehensive Care for
              <span className="hero-title-accent">Independent Living</span>
            </h1>
            <p className="hero-description">
              Empowering individuals with disabilities and elderly through personalized care, 
              assistive support, and dignified independence in daily life.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn">I Need  Support</Link>
             <Link to="/caregiver-Login" className="btn">I'm a Caregiver</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">Comprehensive care tailored to your unique needs</p>
          </div>
          <div className="services-grid">
            {[
              { 
                icon: <Shield className="service-icon" />, 
                title: 'Exam Assistance', 
                text: 'Professional support during examinations and academic assessments', 
                color: 'blue' 
              },
              { 
                icon: <Heart className="service-icon" />, 
                title: 'Daily Living Support', 
                text: 'Assistance with daily activities and personal care needs', 
                color: 'green' 
              },
              { 
                icon: <Users className="service-icon" />, 
                title: 'Emergency Response', 
                text: '24/7 emergency alert system with rapid response capabilities', 
                color: 'purple' 
              },
              { 
                icon: <Clock className="service-icon" />, 
                title: 'Scheduled Care', 
                text: 'Flexible scheduling for therapy sessions and medical appointments', 
                color: 'orange' 
              },
              { 
                icon: <Star className="service-icon" />, 
                title: 'Personalized Plans', 
                text: 'Customized care plans based on individual needs and preferences', 
                color: 'teal' 
              },
              { 
                icon: <Phone className="service-icon" />, 
                title: 'Virtual Sessions', 
                text: 'Remote care sessions through secure video conferencing', 
                color: 'red' 
              },
            ].map((service, idx) => (
              <div key={idx} className={`service-card service-${service.color}`}>
                <div className={`service-icon-container service-icon-${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-text">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="section-content">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">About CareConnect</h2>
              <p className="about-description">
                CareConnect is dedicated to empowering individuals with disabilities and the elderly 
                through comprehensive, personalized care solutions. Our platform connects care recipients 
                with qualified caregivers to ensure dignity, independence, and quality of life.
              </p>
              <div className="about-features">
                {[
                  'Professional and certified caregivers',
                  '24/7 emergency response system',
                  'Personalized care plans',
                  'Secure and accessible platform'
                ].map((item, index) => (
                  <div key={index} className="feature-item">
                    <CheckCircle className="feature-icon" />
                    <span className="feature-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-grid">
                {[
                  { stat: '500+', label: 'Care Recipients', color: 'blue' },
                  { stat: '200+', label: 'Caregivers', color: 'green' },
                  { stat: '98%', label: 'Satisfaction Rate', color: 'purple' },
                  { stat: '24/7', label: 'Support Available', color: 'orange' },
                ].map((info, idx) => (
                  <div key={idx} className="stat-item">
                    <div className={`stat-number stat-${info.color}`}>{info.stat}</div>
                    <div className="stat-label">{info.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-description">Get in touch for more information about our services</p>
          </div>
          <div className="contact-grid">
            {[
              { 
                icon: <Phone className="contact-icon" />, 
                title: 'Phone', 
                detail: '+1 (555) 123-4567', 
                color: 'blue' 
              },
              { 
                icon: <Mail className="contact-icon" />, 
                title: 'Email', 
                detail: 'support@careconnect.com', 
                color: 'green' 
              },
              { 
                icon: <MapPin className="contact-icon" />, 
                title: 'Address', 
                detail: '123 Care Street, City, State 12345', 
                color: 'purple' 
              },
            ].map((info, idx) => (
              <div key={idx} className="contact-card">
                <div className={`contact-icon-container contact-icon-${info.color}`}>
                  {info.icon}
                </div>
                <h3 className="contact-title">{info.title}</h3>
                <p className="contact-detail">{info.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-inner">
            <div className="footer-logo">
              <Heart className="footer-logo-icon" />
              <span className="footer-logo-text">CareConnect</span>
            </div>
            <div className="footer-info">
              <p className="footer-copyright">© 2024 CareConnect. All rights reserved.</p>
              <p className="footer-tagline">Empowering independence through comprehensive care</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Header1;