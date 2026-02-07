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
    if (value < 26.0) return "#fee8c8";   // Slightly cool
    if (value < 27.0) return "#fdbb84";   // Good
    if (value < 28.0) return "#fc8d59";   // Optimal
    if (value < 29.0) return "#ef6548";   // Warm
    return "#d7301f";                     // Stressful
  }

   if (layer === "wind") {
    if (value < 5) return "#edf8e9";      // Calm
    if (value < 8) return "#bae4b3";      // Safe
    if (value < 12) return "#74c476";     // Moderate
    if (value < 16) return "#31a354";     // Risky
    return "#006d2c";                     // Dangerous
  }

  if (layer === "water") {
    if (value < 20) return "#ffffe5";     // Very clean
    if (value < 40) return "#fee391";     // Clean
    if (value < 60) return "#fec44f";     // Moderately polluted
    if (value < 80) return "#fe9929";     // Polluted
    return "#cc4c02";                     // Highly polluted
  }

   if (layer === "oxygen") {
    if (value < 3) return "#f7fbff";      // Critical
    if (value < 5) return "#deebf7";      // Low
    if (value < 7) return "#9ecae1";      // Fair
    if (value < 9) return "#4292c6";      // Good
    return "#08519c";                     // Healthy
  }

  return "#cccccc";
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
    fillOpacity: 0.4045,
    weight: 0,
    stroke: false,
  }}
/>

        );
      })}
    </MapContainer>
  );
}
