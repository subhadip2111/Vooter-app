import React from "react";
import ReactDOM from "react-dom/client";
import { appRouter } from "./App";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import "./tailwind.css";
import {store} from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);