// frontend/src/components/MapPicker.js
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(`${e.latlng.lat}, ${e.latlng.lng}`);
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}></Marker>
  );
}

export default function MapPicker({ setLocation }) {
  return (
    <div style={{ height: "300px", width: "100%", borderRadius: 8 }}>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}

