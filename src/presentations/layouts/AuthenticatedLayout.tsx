import Header from "@/components/bars/header";
import Sidebar from "@/components/bars/SideBar";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
