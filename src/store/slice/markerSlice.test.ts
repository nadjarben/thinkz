import { combineReducers } from "@reduxjs/toolkit";
import markersReducer, { increment } from "./markerSlice";
import { MarkersState } from "../types/markers";

const rootReducer = combineReducers({
  markers: markersReducer,
});

type ApplicationState = ReturnType<typeof rootReducer>;

describe("markersSlice", () => {
  it("should handle incrementing the count", () => {
    const initialMarkers: MarkersState[] = [
      {
        id: "1",
        count: 0,
        properties: { color: "red" },
        coordinates: { lat: 0, lng: 0 },
      },
      {
        id: "2",
        count: 0,
        properties: { color: "green" },
        coordinates: { lat: 0, lng: 0 },
      },
      {
        id: "3",
        count: 0,
        properties: { color: "yellow" },
        coordinates: { lat: 0, lng: 0 },
      },
    ];
    let state: ApplicationState = { markers: initialMarkers };

    state = rootReducer(state, increment("1"));

    expect(state.markers[0].count).toEqual(1);

    state = rootReducer(state, increment("1"));

    expect(state.markers[0].count).toEqual(2);

    const previousState = state;
    state = rootReducer(state, increment("4"));

    expect(state).toEqual(previousState);
  });
});
