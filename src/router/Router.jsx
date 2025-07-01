import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Errorpage from "../errorpage/Errorpage";
import Home from "../pages/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Events from "../pages/Events";
import AddEvents from "../pages/AddEvents";
import MyEvents from "../pages/MyEvents";
import PrivateRouter from "../privateRoutes/PrivateRouter";
import UpdateEvent from "../pages/UpdateEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: (
          <PrivateRouter>
            <Events />
          </PrivateRouter>
        ),
      },
      {
        path: "/add-event",
        element: (
          <PrivateRouter>
            <AddEvents />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-event",
        element: (
          <PrivateRouter>
            <MyEvents />
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/update-event/:id",
    element: <UpdateEvent />
  }
]);
