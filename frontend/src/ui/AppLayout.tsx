import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const AppLayout = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  return (
    <div className="dark:bg-slate-700">
      <div className="w-screen overflow-hidden bg-white antialiased drop-shadow-lg dark:bg-slate-800">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
      <div className="w-screen dark:bg-slate-700">
        <main className="mx-auto max-w-screen-xl antialiased">
          <Outlet />
        </main>
      </div>
      <div className="w-screen dark:bg-slate-700">
        <div className="mx-auto max-w-screen-xl antialiased dark:bg-slate-700">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
