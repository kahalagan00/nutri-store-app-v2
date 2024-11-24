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
    <div className="mx-auto max-w-screen-xl">
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
