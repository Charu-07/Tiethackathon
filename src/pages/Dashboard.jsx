import { useState } from "react";
import MapView from "../components/MapView";
import LayerToggle from "../components/LayerToggle";
import InfoPanel from "../components/InfoPanel";

export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState("temp");
  const [selectedCell, setSelectedCell] = useState(null);
  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <MapView
        activeLayer={activeLayer}
        onSelectCell={setSelectedCell}
      />

      <LayerToggle
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
      />

      <InfoPanel data={selectedCell} />
    </div>
  );
}
