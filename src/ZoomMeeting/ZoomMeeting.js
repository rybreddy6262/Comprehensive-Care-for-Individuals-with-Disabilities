import React from "react";
import { useLocation } from "react-router-dom";
import "./ZoomMeeting.css";

const ZoomMeeting = ({ onClose }) => {
  const location = useLocation();
  const caregiver = location.state?.caregiver;

  const handleJoinMeet = () => {
    // You can replace this with a dynamic link or real integration
    window.open("https://meet.google.com/new", "_blank");
  };

  return (
    <div className="meet-overlay">
      <div className="meet-card">
        <button onClick={onClose} className="close-btn">&times;</button>

        <div className="caregiver-info">
          <img
            src={caregiver?.imageUrl || "images/photo1.png"}
            alt={caregiver?.name}
            className="caregiver-photo"
          />
          <div className="caregiver-details">
            <h2>{caregiver?.name}</h2>
            <p>{caregiver?.specialty}</p>
          </div>
        </div>

        <div className="meet-content">
          <h3>Google Meet Session</h3>
          <p>Click below to start your virtual session with {caregiver?.name}.</p>
          <button className="join-meet-btn" onClick={handleJoinMeet}>
            Join Google Meet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeeting;
