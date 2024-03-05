import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkersState } from "../types/markers";
import markers from "../../markers.json";

const initialState: MarkersState = markers.reduce((acc, marker) => {
  acc[marker.id] = 0;
  return acc;
}, {} as MarkersState);

const markersSlice = createSlice({
  name: "markers",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const markerId = action.payload;
      if (state[markerId] !== undefined) {
        // we could write this mutable code thanks to immer, state[markerId]++;
        const newState = { ...state };
        newState[markerId] = state[markerId] + 1;
        return newState;
      }
    },
  },
});

export const { increment } = markersSlice.actions;
export default markersSlice.reducer;
