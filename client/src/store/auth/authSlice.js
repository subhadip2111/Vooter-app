// // authSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
// };

// // Check if user data exists in local storage
// const storedUser = localStorage.getItem("user");
// if (storedUser) {
//   try {
//     initialState.user = JSON.parse(storedUser);
//   } catch (error) {
//     console.error("Error parsing stored user data:", error);
//   }
// }


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//       localStorage.setItem("userToken", action.payload); // Store the token in local storage
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user"); // Remove user data from local storage
//       localStorage.removeItem("userToken"); // Remove token from local storage
//     },
//   },
// });

// export const { setUser, setToken, logout } = authSlice.actions;

// export default authSlice.reducer;
// authSlice.js

// authSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
// };

// // Check if user data exists in local storage
// const storedUser = localStorage.getItem("user");
// if (storedUser) {
//   try {
//     initialState.user = JSON.parse(storedUser);
//   } catch (error) {
//     console.error("Error parsing stored user data:", error);
//   }
// }

// const storedToken = localStorage.getItem("userToken");
// if (storedToken) {
//   initialState.token = storedToken;
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//       localStorage.setItem("userToken", action.payload); // Store the token in local storage
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("user"); // Remove user data from local storage
//       localStorage.removeItem("userToken"); // Remove token from local storage
//     },
//   },
// });

// export const { setUser, setToken, logout } = authSlice.actions;

// export default authSlice.reducer;
// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token:null, //
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;

      console.log("action.payload",action.payload)
      // Store the token in localStorage
      //localStorage.setItem("userToken", action.payload);
      localStorage.setItem("userToken", state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken"); // Remove the token from localStorage
    },
  },
});

// Export actions and reducer
export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
