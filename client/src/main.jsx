// console.log("App initialization - main.jsx");
// console.log("API URL:", import.meta.env.VITE_APP_API_URL);
// console.log("API URL:", import.meta.env.VITE_APP_UPLOAD_URL);
// console.log("API URL:", import.meta.env.VITE_GRAPHQL_API_URL);

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/dist";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Error";
import DonatePage from "./pages/DonatePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/me",
        element: <Dashboard />,
      },
      {
        path: "/profiles/:profileId",
        element: <Dashboard />,
      },
      {
        path: "/donate",
        element: <DonatePage />,
      },
      {
        path: "/*",
        element: <Error />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
