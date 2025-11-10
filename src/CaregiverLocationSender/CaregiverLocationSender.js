// src/components/CaregiverLocationSender.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const CaregiverLocationSender = () => {
  const [status, setStatus] = useState("Waiting...");

  useEffect(() => {
    const caregiverCoords = { lat: 28.6139, lng: 77.2090 }; // Delhi

    const sendLocation = () => {
      socket.emit("location-update", caregiverCoords);
      setStatus("📡 Sending Caregiver Location: Delhi");
    };

    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Caregiver Location Simulator</h2>
      <p>{status}</p>
    </div>
  );
};

export default CaregiverLocationSender;
