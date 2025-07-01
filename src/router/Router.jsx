import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Errorpage from "../errorpage/Errorpage";
import Home from "../pages/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
        {
            path:"/",
            element: <Home />
        },
        {
          path:"/login",
          element: <Login />
        }
    ]
  },
  {
    path:"/register",
    element: <Register />
  }
]);