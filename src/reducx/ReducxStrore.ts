import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/AuthnicationSlices";
import modalReducer from "./slices/modelslices";
import bookReducer from "./slices/BookSlices";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    modal: modalReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
