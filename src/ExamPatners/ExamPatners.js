import React, { useEffect, useState } from 'react';
import './ExamPatners.css';
import Header from '../Header/Header';

const ExamPartners = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await fetch('http://localhost:5000/examcenters');
        const data = await res.json();
        setCenters(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch exam centers:', error);
        setLoading(false);
      }
    };
    fetchCenters();
  }, []);

  if (loading) {
    return <p>Loading Exam Center Data...</p>;
  }

  return (
    <>
    <Header/>
    <div className="exam-partners-container">
      <h1>Trusted Exam Center Partners</h1>
      <div className="exam-grid">
        {centers.map(center => (
          <div key={center.id} className="exam-card">
            <img src={center.imageUrl} alt={center.centerName} />
            <h2>{center.centerName}</h2>
            <p><strong>Location:</strong> {center.location}</p>
            <p><strong>Contact:</strong> {center.contactPhone}</p>
            <p><strong>Email:</strong> {center.contactEmail}</p>
            <p><strong>Exam Types:</strong> {center.examTypes.join(', ')}</p>
            <p><strong>Facilities:</strong> {center.accessibleFacilities.join(', ')}</p>
            <p className={center.caregiverTrusted ? 'trusted' : 'not-trusted'}>
              {center.caregiverTrusted ? '✅ Trusted for Caregivers' : '❌ Not Trusted Yet'}
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ExamPartners;
