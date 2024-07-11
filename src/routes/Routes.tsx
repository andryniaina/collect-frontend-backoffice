import { Routes, Route } from "react-router-dom";
import HomeScreen from "../presentations/screens/HomeScreen";
import AuthenticatedLayout from "@/presentations/layouts/AuthenticatedLayout";
import DashBoard from "@/presentations/screens/DashBoard";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route element={<AuthenticatedLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
