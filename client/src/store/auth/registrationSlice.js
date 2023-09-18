// src/features/registration/registrationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    registrationStatus: null, // To track the registration status
  },
  reducers: {
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload;
    },
    clearRegistrationStatus: (state) => {
      state.registrationStatus = null;
    },
  },
});

export const { setRegistrationStatus, clearRegistrationStatus } =
  registrationSlice.actions;

export default registrationSlice.reducer;
