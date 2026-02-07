import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ===================== CONSTANTS ===================== */

const CELL_SIZE = 0.1; // degrees (~20–25 km)
const AP_BOUNDS = [
  [13.5, 78.7],
  [19.0, 85.6],
];

/* ===================== API ===================== */

async function fetchWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    temp: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
  };
}

/* ===================== COLOR LOGIC ===================== */

function getColor(value, layer) {
  if (value == null) return "#000";

  /* 🌡️ TEMPERATURE (°C) - Finer gradations */
  if (layer === "temp") {
    if (value < 20) return "#08519c";   // Very Cold (Dark Blue)
    if (value < 22) return "#3182bd";   // Cold (Blue)
    if (value < 24) return "#6baed6";   // Cool Blue
    if (value < 25) return "#9ecae1";   // Light Cool
    if (value < 26) return "#c6dbef";   // Very Light Blue
    if (value < 27) return "#ffffcc";   // Pale Yellow
    if (value < 28) return "#ffeda0";   // Light Yellow
    if (value < 29) return "#fed976";   // Yellow
    if (value < 30) return "#feb24c";   // Orange-Yellow
    if (value < 31) return "#fd8d3c";   // Orange
    if (value < 32) return "#fc4e2a";   // Red-Orange
    if (value < 33) return "#e31a1c";   // Red
    if (value < 34) return "#bd0026";   // Dark Red
    return "#800026";                   // Very Hot (Darkest Red)
  }

  /* 🌬️ WIND SPEED (m/s) - Finer gradations */
  if (layer === "wind") {
    if (value < 2) return "#006837";    // Very Calm (Dark Green)
    if (value < 4) return "#1a9850";    // Calm (Green)
    if (value < 5) return "#66bd63";    // Light Breeze
    if (value < 6) return "#a6d96a";    // Gentle Breeze
    if (value < 7) return "#d9ef8b";    // Moderate Breeze
    if (value < 8) return "#ffffbf";    // Fresh Breeze (Yellow)
    if (value < 9) return "#fee08b";    // Strong Breeze
    if (value < 10) return "#fdae61";   // Near Gale
    if (value < 11) return "#f46d43";   // Gale
    if (value < 12) return "#d73027";   // Strong Gale
    if (value < 14) return "#a50026";   // Storm
    return "#67001f";                   // Violent Storm (Darkest Red)
  }

  /* 💧 WATER (%) */
  if (layer === "water") {
    if (value < 20) return "#f7fcf5";
    if (value < 30) return "#e5f5e0";
    if (value < 40) return "#c7e9c0";
    if (value < 50) return "#a1d99b";
    if (value < 60) return "#74c476";
    if (value < 70) return "#41ab5d";
    if (value < 80) return "#238b45";
    return "#005a32";
  }

  /* 🫧 OXYGEN (mg/L) */
  if (layer === "oxygen") {
    if (value < 3) return "#ffffd4";
    if (value < 4) return "#fee391";
    if (value < 5) return "#fec44f";
    if (value < 6) return "#fe9929";
    if (value < 7) return "#ec7014";
    if (value < 8) return "#cc4c02";
    return "#8c2d04";
  }

  return "#999";
}

/* ===================== MAP VIEW ===================== */

export default function MapView({ activeLayer, onSelectCell }) {
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateGrid() {
      setLoading(true);
      
      /* 🌡️ Fetch temperature and wind ONCE for AP center */
      const centerData = await fetchWeatherData(15.9, 79.7);

      const grid = [];

      for (let lat = 13.6; lat < 18.9; lat += CELL_SIZE) {
        for (let lon = 78.8; lon < 85.5; lon += CELL_SIZE) {
          // Calculate distance from center for gradient effect
          const latDiff = Math.abs(lat - 15.9);
          const lonDiff = Math.abs(lon - 79.7);
          const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
          
          // Add variation based on position + randomness
          const tempVariation = (Math.random() - 0.5) * 10 + distance * 0.8;
          const windVariation = (Math.random() - 0.5) * 8 + distance * 0.5;
          
          grid.push({
            bounds: [
              [lat, lon],
              [lat + CELL_SIZE, lon + CELL_SIZE],
            ],

            /* ✅ Use center data with proper variation */
            temp: centerData.temp + tempVariation,  // ±5°C + distance variation
            wind: Math.max(0, centerData.wind + windVariation), // ±4 m/s + distance variation
            water: Math.random() * 100,              // %
            oxygen: 3 + Math.random() * 6,           // mg/L
          });
        }
      }

      setCells(grid);
      setLoading(false);
    }

    generateGrid();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-lg">Loading map data...</p>
      </div>
    );
  }

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
          }}
          pathOptions={{
            fillColor: getColor(cell[activeLayer], activeLayer),
            fillOpacity: 0.45,
            stroke: false,
          }}
        />
      ))}
    </MapContainer>
  );
}