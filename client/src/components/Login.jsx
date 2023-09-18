import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  setToken, setUser } from "../store/auth/authSlice"; // Corrected import paths
import { useDispatch } from "react-redux";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Define the URL for your login endpoint
    const apiUrl = "http://localhost:4000/api/v1/login"; // Replace with your backend URL

    try {

      const userToken=localStorage.getItem("userToken")
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formData),
      });

    if (response.ok) {
      // Login successful, navigate to the home page
      const data = await response.json();
      const { token, username } = data;
      console.log("Token: from login", token);
      dispatch(setToken(token));
      dispatch(setUser(username));
      localStorage.setItem("userToken", token);
      navigate("/");
    } else {
      // Handle login failure
      console.error("Login failed. Status:", response.status);
      const errorData = await response.json();
      console.error("Error message:", errorData.error);
    }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4 text-center text-blue-500">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      
    </>
  );
}

export default Login;
