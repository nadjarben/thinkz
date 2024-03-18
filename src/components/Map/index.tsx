import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Coordinates } from "../../types/coordinates";
import { MarkersState } from "../../store/types/markers";
import Marker from "../Marker";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";

interface MapProps {
  coordinates: Coordinates;
  markers: MarkersState[];
  onMarkerClick: (id: string) => void;
}
const Map: React.FC<MapProps> = ({ coordinates, markers, onMarkerClick }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates.lng, coordinates.lat],
      doubleClickZoom: false,
      zoom: coordinates.zoom,
    });

    mapRef.current = mapInstance;

    return () => mapInstance.remove();
  }, [coordinates]);

  useEffect(() => {
    if (!mapRef.current) return;

    markers.forEach((marker, index) => {
      const markerElement = markerRefs.current[index];
      if (!markerElement) return;

      new mapboxgl.Marker(markerElement)
        .setLngLat([marker.coordinates.lng, marker.coordinates.lat])
        .addTo(mapRef.current!);

      return () => markerElement.remove();
    });
  }, [markers]);

  return (
    <div ref={mapContainerRef} className="map-container">
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          ref={(el) => (markerRefs.current[index] = el)}
          color={marker.properties.color}
          count={marker.count}
          onClick={() => onMarkerClick(marker.id)}
        />
      ))}
    </div>
  );
};

export default Map;
