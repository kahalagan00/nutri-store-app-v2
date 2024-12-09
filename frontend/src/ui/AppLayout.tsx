import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  return (
    <div>
      <div className="w-screen overflow-hidden bg-white drop-shadow-lg">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
      <div className="w-screen">
        <main className="mx-auto max-w-screen-xl">
          <Outlet />
        </main>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
