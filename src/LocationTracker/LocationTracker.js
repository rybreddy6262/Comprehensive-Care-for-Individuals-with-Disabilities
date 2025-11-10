// src/components/LocationTracker.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix Leaflet marker icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Auto-fit map bounds to both markers
const FitBounds = ({ userLocation, caregiverLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation && caregiverLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [caregiverLocation.lat, caregiverLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userLocation, caregiverLocation, map]);

  return null;
};

const LocationTracker = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [caregiverLocation, setCaregiverLocation] = useState(null);
  const userRef = useRef(null);
  const caregiverRef = useRef(null);

  // ✅ Track user's own live location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("User location updated:", coords);
        setUserLocation(coords);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ✅ Set dummy caregiver location (Hyderabad)
  useEffect(() => {
    setCaregiverLocation({
      lat: 17.385044, // Hyderabad latitude
      lng: 78.486671, // Hyderabad longitude
    });
  }, []);

  // ✅ Auto-open popups
  useEffect(() => {
    if (userRef.current) userRef.current.openPopup();
    if (caregiverRef.current) caregiverRef.current.openPopup();
  }, [userLocation, caregiverLocation]);

  // ✅ Default map center
  const center = caregiverLocation || userLocation || [20.5937, 78.9629];

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "10px" }}>🗺️ Real-Time Tracking (Your Location + Dummy Caregiver)</h2>
      <MapContainer center={center} zoom={5} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ✅ Auto-fit both markers */}
        <FitBounds userLocation={userLocation} caregiverLocation={caregiverLocation} />

        {/* ✅ User marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} ref={userRef}>
            <Popup>📍 Your Current Location</Popup>
          </Marker>
        )}

        {/* ✅ Dummy caregiver marker */}
        {caregiverLocation && (
          <Marker position={[caregiverLocation.lat, caregiverLocation.lng]} ref={caregiverRef}>
            <Popup>👨‍⚕️ Dummy Caregiver (Hyderabad)</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LocationTracker;
