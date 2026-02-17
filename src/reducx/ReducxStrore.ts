import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/AuthnicationSlices";
import modalReducer from "./slices/modelslices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    modeal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
