import { Routes, Route } from "react-router-dom";
import HomeScreen from "../presentations/screens/HomeScreen";
import AuthenticatedLayout from "@/presentations/layouts/AuthenticatedLayout";
import DashBoard from "@/presentations/screens/DashBoard";
import Project from "@/presentations/screens/DashBoard/Project";
import Login from "@/presentations/screens/Login";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path = "/dashboard" element={<AuthenticatedLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="project" element={<Project/>}/>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
