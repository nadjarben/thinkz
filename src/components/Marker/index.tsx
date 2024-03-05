import React from "react";
import "./Marker.css";

interface MarkerProps {
  color: string;
  count: number;
  id: string;
  onClick: () => void;
}
const Marker: React.FC<MarkerProps> = ({ color, count, id, onClick }) => {
  return (
    <button
      className="marker"
      data-testid={`marker-${id}`}
      onClick={onClick}
      style={{ background: color }}
    >
      {count}
    </button>
  );
};

export default Marker;
