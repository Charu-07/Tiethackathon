export default function LayerToggle({ activeLayer, setActiveLayer }) {
  return (
    <div className="layer-toggle">
      <button
        className={activeLayer === "temp" ? "active" : ""}
        onClick={() => setActiveLayer("temp")}
      >
        🌡 Temperature
      </button>

      <button
        className={activeLayer === "wind" ? "active" : ""}
        onClick={() => setActiveLayer("wind")}
      >
        💨 Wind
      </button>

      <button
        className={activeLayer === "water" ? "active" : ""}
        onClick={() => setActiveLayer("water")}
      >
        💧 Water Quality
      </button>

      <button
        className={activeLayer === "oxygen" ? "active" : ""}
        onClick={() => setActiveLayer("oxygen")}
      >
        🫧 Oxygen
      </button>
    </div>
  );
}
