import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  return (
    <div>
      <div className="w-screen bg-white drop-shadow-lg">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
      <div className="w-screen bg-slate-200">
        <main className="mx-auto max-w-screen-xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
