import React, { forwardRef } from 'react';
import './Marker.css';

interface MarkerProps {
  color: string;
  count: number;
  onClick: () => void;
}

const Marker = forwardRef<HTMLButtonElement, MarkerProps>(
  ({ color, count, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className="marker"
        onClick={onClick}
        style={{ backgroundColor: color }}
      >
        {count}
      </button>
    );
  }
);

export default Marker;