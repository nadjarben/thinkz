import { configureStore } from '@reduxjs/toolkit';
import markersReducer from './slice/markerSlice';

const store = configureStore({
  reducer: {
    markers: markersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
