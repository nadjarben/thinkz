import { combineReducers } from "@reduxjs/toolkit";
import markersReducer, { increment } from "./markerSlice";

const rootReducer = combineReducers({
  markers: markersReducer,
});

type ApplicationState = ReturnType<typeof rootReducer>;

describe("markersSlice", () => {
  it("should handle incrementing the count", () => {
    let state: ApplicationState = { markers: { "1": 0, "2": 0, "3": 0 } };

    state = rootReducer(state, increment("1"));

    expect(state.markers["1"]).toEqual(1);

    state = rootReducer(state, increment("1"));

    expect(state.markers["1"]).toEqual(2);

    const previousState = state;
    state = rootReducer(state, increment("4"));

    expect(state).toEqual(previousState);
  });
});
