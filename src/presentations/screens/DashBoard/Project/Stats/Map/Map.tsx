// src/MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css"; // Import CSS file to style the map container
import { LatLngExpression } from "leaflet";

const MapComponent: React.FC = () => {
    const initialPosition: LatLngExpression = [-18.9185, 47.5211];

  return (
    <div className="map-container">
      <MapContainer
        center={initialPosition} // Default center position [latitude, longitude]
        zoom={13}                // Default zoom level
        style={{ height: "78vh", width: "83vw" }} // Full-screen map
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
