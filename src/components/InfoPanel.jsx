export default function InfoPanel({ data }) {
  if (!data) {
    return (
      <div className="info-panel">
        <h3>Location Info</h3>
        <p>Click anywhere on the map</p>
      </div>
    );
  }

  return (
    <div className="info-panel">
      <h3>Location Info</h3>

      <div className="info-item">🌡 Temperature: <b>{data.temp.toFixed(1)} °C</b></div>
      <div className="info-item">💨 Wind: <b>{data.wind.toFixed(1)} m/s</b></div>
      <div className="info-item">💧 Water Quality: <b>{data.water.toFixed(0)} %</b></div>
      <div className="info-item">🫧 Oxygen Level: <b>{data.oxygen.toFixed(1)} mg/L</b></div>
    </div>
  );
}
