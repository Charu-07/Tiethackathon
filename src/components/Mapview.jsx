import {
  MapContainer,
  TileLayer,
  Rectangle,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

/* ================= ANDHRA PRADESH BOUNDS ================= */

const AP_BOUNDS = [
  [12.6, 78.8], // South-West
  [19.9, 85.5], // North-East
];

const CELL_SIZE = 0.1; // smaller = finer grid

/* ================= MAP BOUND LOCK ================= */

function LockBounds() {
  const map = useMap();

  useEffect(() => {
    map.setMaxBounds(AP_BOUNDS);
    map.on("drag", () => {
      map.panInsideBounds(AP_BOUNDS, { animate: false });
    });

    return () => map.off("drag");
  }, [map]);

  return null;
}

/* ================= COLOR LOGIC ================= */

function getColor(value, layer) {
    if (layer === "temp") {
    if (value < 24) return "#2c7bb6";   // Cold (Blue)
    if (value < 26) return "#abd9e9";   // Cool
    if (value < 28) return "#ffffbf";   // Normal
    if (value < 30) return "#fdae61";   // Warm
    return "#d7191c";                   // Hot
  }

  if (layer === "wind") {
    if (value < 5) return "#d4f0ff";
    if (value < 10) return "#74add1";
    return "#313695";
  }

  if (layer === "water") {
    if (value > 80) return "#1a9850";
    if (value > 50) return "#fee08b";
    return "#d73027";
  }

  if (layer === "oxygen") {
    if (value > 7) return "#2166ac";
    if (value > 4) return "#67a9cf";
    return "#fddbc7";
  }

  return "#ccc";
}

/* ================= MAP VIEW ================= */

export default function MapView({ activeLayer,onSelectCell }) {
  const [cells, setCells] = useState([]);

  /* Generate grid ONCE with ALL data */
  useEffect(() => {
    const grid = [];

    for (let lat = 12.6; lat < 19.9; lat += CELL_SIZE) {
      for (let lon = 78.8; lon < 85.5; lon += CELL_SIZE) {
        grid.push({
          bounds: [
            [lat, lon],
            [lat + CELL_SIZE, lon + CELL_SIZE],
          ],

          // 🔢 Simulated data (replace with real API later)
          temp: 26 + Math.random() * 8,      // °C
          wind: Math.random() * 15,          // m/s
          water: Math.random() * 100,        // %
          oxygen: 3 + Math.random() * 6,     // mg/L
        });
      }
    }

    setCells(grid);
  }, []);

  return (
    <MapContainer
      center={[15.9, 79.7]}
      zoom={7}
      minZoom={6}
      maxZoom={10}
      maxBounds={AP_BOUNDS}
      maxBoundsViscosity={1.0}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LockBounds />

      {cells.map((cell, idx) => {
        const value = cell[activeLayer];

        return (
          <Rectangle
  key={idx}
  bounds={cell.bounds}
  eventHandlers={{
    click: () => {
      onSelectCell(cell);
    }
  }}
  pathOptions={{
    fillColor: getColor(cell[activeLayer], activeLayer),
    fillOpacity: 0.85,
    weight: 0,
  }}
/>

        );
      })}
    </MapContainer>
  );
}
