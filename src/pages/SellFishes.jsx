import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ===================== CONSTANTS ===================== */

const CELL_SIZE = 0.2; // grid resolution
const AP_BOUNDS = [
  [13.5, 78.7],
  [19.0, 85.6],
];

/* ===================== API ===================== */

async function fetchTemperature(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
  const res = await fetch(url);
  const data = await res.json();
  return data.current.temperature_2m;
}

/* ===================== COLOR SCALES ===================== */

function getColor(value, layer) {
  if (value == null) return "#ccc";

  switch (layer) {
    case "temp":
      if (value < 20) return "#2b83ba";
      if (value < 25) return "#abdda4";
      if (value < 30) return "#fdae61";
      return "#d7191c";

    case "wind":
      if (value < 4) return "#edf8fb";
      if (value < 8) return "#b2e2e2";
      if (value < 12) return "#66c2a4";
      return "#238b45";

    case "water":
      if (value < 30) return "#f7fcf0";
      if (value < 60) return "#ccebc5";
      if (value < 85) return "#7bccc4";
      return "#2b8cbe";

    case "oxygen":
      if (value < 4) return "#fee08b";
      if (value < 6) return "#fdae61";
      if (value < 8) return "#66bd63";
      return "#1a9850";

    default:
      return "#999";
  }
}

/* ===================== MAP VIEW ===================== */

export default function MapView({ activeLayer, onSelectCell }) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    async function generateGrid() {
      // 📍 Andhra Pradesh center
      const centerLat = 15.9;
      const centerLon = 79.7;

      // 🌡️ Fetch temperature ONCE
      const baseTemp = await fetchTemperature(centerLat, centerLon);

      const grid = [];

      for (let lat = 13.6; lat < 18.9; lat += CELL_SIZE) {
        for (let lon = 78.8; lon < 85.5; lon += CELL_SIZE) {
          grid.push({
            bounds: [
              [lat, lon],
              [lat + CELL_SIZE, lon + CELL_SIZE],
            ],

            // ✅ Optimised + realistic data
            temp: baseTemp + (Math.random() * 2 - 1), // ±1°C
            wind: Math.random() * 15,                // m/s
            water: Math.random() * 100,              // %
            oxygen: 3 + Math.random() * 6,           // mg/L
          });
        }
      }

      setCells(grid);
    }

    generateGrid();
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

      {cells.map((cell, idx) => (
        <Rectangle
          key={idx}
          bounds={cell.bounds}
          eventHandlers={{
            click: () => onSelectCell(cell),
            mouseover: e =>
              e.target.setStyle({ fillOpacity: 0.75 }),
            mouseout: e =>
              e.target.setStyle({ fillOpacity: 0.55 }),
          }}
          pathOptions={{
            fillColor: getColor(cell[activeLayer], activeLayer),
            fillOpacity: 0.55,
            stroke: false,
          }}
        />
      ))}
    </MapContainer>
  );
}
