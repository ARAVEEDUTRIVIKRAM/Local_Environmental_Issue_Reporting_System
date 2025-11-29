import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

/* Fix leaflet default icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Status based icon color */
const iconByStatus = (status) => {
  const colors = {
    OPEN: "green",
    IN_PROGRESS: "orange",
    RESOLVED: "blue",
  };

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${colors[status] || "grey"}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

export default function IssueMap({ issues }) {
  const nav = useNavigate();

  return (
    <MapContainer
      center={[17.385044, 78.486671]}   // Hyderabad default
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: 12 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {issues.map((issue) =>
        issue.latitude && issue.longitude ? (
          <Marker
            key={issue.id}
            position={[issue.latitude, issue.longitude]}
            icon={iconByStatus(issue.status)}
            eventHandlers={{
              click: () => nav(`/issues/${issue.id}`)
            }}
          >
            <Popup>
              <strong>{issue.title}</strong>
              <br />
              Status: {issue.status}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
