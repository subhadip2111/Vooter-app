// src/components/Registration.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../store/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setRegistrationStatus,
  clearRegistrationStatus,
} from "../store/auth/registrationSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const registrationStatus = useSelector(
    (state) => state.registration.registrationStatus
  );
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      dispatch(setRegistrationStatus("Please log out first."));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/register",
        formData
      );

      if (response.status === 201) {
        const { username, token } = response.data;

        // Dispatch actions to store user data and registration status
        dispatch(setUser(username));
        dispatch(setToken(token));
        dispatch(setRegistrationStatus("Registration successful"));

        // Clear the registration status after a certain time
        setTimeout(() => {
          dispatch(clearRegistrationStatus());
        }, 3000);

        // Log in the user after successful registration and redirect to the login page
        dispatch(setUser(username)); // This logs in the user
        dispatch(setToken(token)); // This sets the token
        navigate("/login"); // Redirect to the login page
      } else {
        dispatch(setRegistrationStatus("Registration failed"));
      }
    } catch (error) {
      dispatch(setRegistrationStatus("Registration failed"));
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">
          Registration
        </h2>
        {registrationStatus && (
          <p className="text-red-500 mb-2 text-center">
            {registrationStatus}
          </p>
        )}
        {registrationStatus === "Please log out first." ? (
          // Display message if the user is already logged in
          <p className="text-red-500 mb-2 text-center">
            Please log out first to register.
          </p>
        ) : (
          // Display the registration form
          <form onSubmit={handleSubmit}>
            {/* Form inputs for username and password */}
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
//Now, the code correctly displays a message if the user is already logged in, asking them to log out first before registering. If the user is not logged in, it displays the registration form as expected.





