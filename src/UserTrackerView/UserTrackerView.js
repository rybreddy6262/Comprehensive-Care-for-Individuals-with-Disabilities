import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issues (sometimes needed)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const socket = io("http://localhost:5000");

const UserTrackerView = () => {
  const [location, setLocation] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    socket.on("location-update", (loc) => {
      setLocation(loc);
    });

    return () => socket.off("location-update");
  }, []);

  // Open popup when location updates
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [location]);

  return (
    <div>
      <h2>👀 Tracking Caregiver</h2>
      <MapContainer
        center={location ? [location.lat, location.lng] : [20.5937, 78.9629]}
        zoom={15}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <Marker position={[location.lat, location.lng]} ref={markerRef}>
            <Popup>Caregiver's Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default UserTrackerView;
