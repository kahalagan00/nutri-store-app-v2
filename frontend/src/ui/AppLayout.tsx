import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
