export default function Legend({ activeLayer }) {
  if (activeLayer === "temp") {
    return (
      <div className="legend">
        <b>Temperature (°C)</b>
        <div><span className="c blue"></span> ≤ 26</div>
        <div><span className="c yellow"></span> 26 – 30</div>
        <div><span className="c red"></span> ≥ 30</div>
      </div>
    );
  }

  if (activeLayer === "fish") {
    return (
      <div className="legend">
        <b>Fish Probability</b>
        <div><span className="c green"></span> High</div>
        <div><span className="c yellow"></span> Medium</div>
        <div><span className="c red"></span> Low</div>
      </div>
    );
  }

  if (activeLayer === "water") {
    return (
      <div className="legend">
        <b>Water Quality</b>
        <div><span className="c blue"></span> Good</div>
        <div><span className="c light"></span> Moderate</div>
        <div><span className="c brown"></span> Poor</div>
      </div>
    );
  }

  return null;
}
