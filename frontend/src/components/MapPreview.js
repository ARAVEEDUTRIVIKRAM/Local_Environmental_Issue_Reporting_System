import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// small neon marker
const neonIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;border-radius:50%;background:linear-gradient(90deg,#00e5ff,#8a2be2);box-shadow:0 0 12px rgba(138,43,226,0.3);"></div>`
});

export default function MapPreview({ issues = [], center = [12.97,77.59], zoom = 12 }) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: 400, borderRadius: 8 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {issues.map(i => {
        if (!i.lat || !i.lng) return null;
        return (
          <Marker key={i.id} position={[i.lat, i.lng]} icon={neonIcon}>
            <Popup>
              <strong>{i.title}</strong><br/>
              {i.description?.slice(0, 140)}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
