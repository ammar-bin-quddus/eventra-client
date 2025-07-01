import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Loading from "../loading/Loading";

const MainLayout = () => {
  const { loading } = useAuth();
  return (
    <div className="w-full">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full sticky top-0 left-0 z-40">
            <Nav />
          </div>
          <Outlet />
          <div className="w-full">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
