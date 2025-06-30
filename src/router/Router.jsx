import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);