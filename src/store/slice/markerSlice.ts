import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkersState } from "../types/markers";
import markers from "../../markers.json";

const initialState: MarkersState[] = markers.map((marker) => ({
  id: marker.id,
  count: 0,
  properties: marker.properties,
  coordinates: marker.coordinates,
}));

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const markerId = action.payload;
      const index = state.findIndex((marker) => marker.id === markerId);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          count: state[index].count + 1,
        };
      }
    },
  },
});

export const { increment } = markersSlice.actions;
export default markersSlice.reducer;
