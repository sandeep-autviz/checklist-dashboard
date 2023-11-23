import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Root from "./routes/root";
import ErrorPage from "./pages/Error-page";
import AddTask from "./pages/AddTask";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import Task from "./pages/Task";
import Config from "./pages/Config";

const PrivateRoute = ({ element }) => {
  window.localStorage.setItem("token","One");
  const auth = localStorage.getItem("token");
  return auth && auth !== null ? element : <Login />;
};

const AuthRoute = ({ element }) => {
  window.localStorage.setItem("token","One");
  const auth = localStorage.getItem("token");
  return auth && auth !== null ? <Redirect to="/dashboard" /> : element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "add-tasks",
        element: <AddTask />,
      },
      {
        path: "tasks",
        element: <Task />,
      },
      {
        path: "config",
        element: <Config />,
      },
    ],
  },

  {
    path: <AuthRoute element={<Login />} />,
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
