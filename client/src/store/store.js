// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import pollReducer from "../store/auth/pollSlice"

 import registrationReducer from "../store/auth/registrationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    poll: pollReducer,
  },
});
