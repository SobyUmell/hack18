import { configureStore } from "@reduxjs/toolkit";
import { tempReducer } from "../model";

const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
