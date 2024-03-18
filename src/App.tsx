import React from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { increment } from "./store/slice/markerSlice";
import Map from "./components/Map";
import { Coordinates } from "./types/coordinates";

const initialCoordinates: Coordinates = {
  lng: 34.781800515,
  lat: 32.088777452,
  zoom: 12,
};

function App() {
  // I moved the logic into App, not sure if the map component should be reusable
  const dispatch = useAppDispatch();
  const markers = useAppSelector((state) => state.markers);

  const handleIncrementMarkers = React.useCallback(
    (id: string) => {
      dispatch(increment(id));
    },
    [dispatch]
  );

  return (
    <div>
      <Map
        coordinates={initialCoordinates}
        markers={markers}
        onMarkerClick={handleIncrementMarkers}
      />
    </div>
  );
}

export default App;
