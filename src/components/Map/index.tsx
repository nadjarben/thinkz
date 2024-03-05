import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { Coordinates } from "../../types/coordinates";
import { MarkerData } from "../../types/markers";
import Marker from "../Marker";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";

interface MapProps {
  coordinates: Coordinates;
  markers: MarkerData[];
  markerClicks: { [key: string]: number };
  onMarkerClick: (id: string) => void;
}
const Map: React.FC<MapProps> = ({
  coordinates,
  markers,
  markerClicks,
  onMarkerClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

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

    markers.forEach((marker) => {
      const markerElement = document.createElement("div");

      const root = createRoot(markerElement);
      root.render(
        <Marker
          color={marker.properties.color}
          count={markerClicks[marker.id] || 0}
          id={marker.id}
          onClick={() => onMarkerClick(marker.id)}
        />
      );

      new mapboxgl.Marker(markerElement)
        .setLngLat([marker.coordinates.lng, marker.coordinates.lat])
        .addTo(mapRef.current!);
    });
  }, [markerClicks, markers, onMarkerClick]);

  return (
    <div
      className="map-container"
      data-testid="map-container"
      ref={mapContainerRef}
    />
  );
};

export default Map;
