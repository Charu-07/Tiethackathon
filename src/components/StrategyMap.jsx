import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const AP_BOUNDS = [
  [12.6, 78.8],
  [19.9, 85.5],
];

const CELL_SIZE = 0.15; // larger spacing for spots

/* 🎨 Fish population color */
function fishColor(score) {
  if (score > 0.7) return "#22c55e"; // green
  if (score > 0.4) return "#eab308"; // yellow
  return "#ef4444";                 // red
}

export default function StrategyMap({ spots, selectedRoute }) {
  return (
    <MapContainer
      center={[15.9, 79.7]}
      zoom={7}
      style={{ height: "400px", marginTop: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {(selectedRoute ? [selectedRoute.spot] : spots).map((spot, i) => (
        <Circle
          key={i}
          center={spot.center}
          radius={14000}
          pathOptions={{
            color: spot.color,
            fillColor: spot.color,
            fillOpacity: 0.4,
            weight: 0,
          }}
        />
      ))}
    </MapContainer>
  );
}

