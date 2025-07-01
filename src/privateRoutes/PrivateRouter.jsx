import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Loading from "../loading/Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;

  return user ? children : <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRouter;
