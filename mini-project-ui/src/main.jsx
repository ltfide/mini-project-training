import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/tailwind.css";
import router from "./router/router";

ReactDOM.createRoot(document.getElementById("root")).render(
   <RouterProvider router={router} />
   // <React.StrictMode>
   // </React.StrictMode>
);
