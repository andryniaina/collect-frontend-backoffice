import Header from "@/components/header";
import Sidebar from "@/components/SideBar";
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
