import React from 'react';
import './Services.css';
import Header from '../Header/Header';

const Services= () => {
  return (
    <>
  <Header/>
    <div className="container">
      <h1>🌟 Our Services Flow</h1>

      <div className="service-block">
        <div className="image">
          <img
            src="images/photo3.jpg"
            alt="Exam Assistance"
          />
        </div>
        <div className="text">
          <h2>📝 Exam Assistance</h2>
          <p>
            We provide professional scribe, reader, and exam-day assistance for students with
            disabilities. Our trained caregivers ensure a stress-free and ethical experience by
            coordinating with exam centers and assisting with mobility, vision/audio support, and
            emergency preparedness.
          </p>
        </div>
      </div>

      <div className="service-block reverse">
        <div className="image">
          <img
            src="images/photo2.jpg"
            alt="Personal Care"
          />
        </div>
        <div className="text">
          <h2>🤝 Personal Care</h2>
          <p>
            Our personal care service supports individuals with daily activities like grooming,
            feeding, hygiene, and emotional well-being. Care plans are personalized and our
            caregivers ensure dignity, empathy, and regular progress follow-ups.
          </p>
        </div>
      </div>

      <div className="service-block">
        <div className="image">
          <img
            src="images/photo1.jpg"
            alt="Event Assistance"
          />
        </div>
        <div className="text">
          <h2>🎉 Event Assistance</h2>
          <p>
            We help individuals with mobility or communication challenges enjoy events
            stress-free. From transportation to on-site support, we ensure safety, comfort, and
            active participation in all types of events.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Services;