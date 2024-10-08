import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomeScreen from "../presentations/screens/HomeScreen";
import AuthenticatedLayout from "@/presentations/layouts/AuthenticatedLayout";
import DashBoard from "@/presentations/screens/DashBoard";
import Project from "@/presentations/screens/DashBoard/Project";
import Login from "@/presentations/screens/Login";
import { AuthContext, AuthProvider } from "../services/AuthContext";
import { useContext } from "react";
import { ListUser } from "@/presentations/screens/Users";
import { AddUser } from "@/presentations/screens/Users/addUser";
import CreateProject from "@/presentations/screens/DashBoard/Project/Create";
import FormBuilder from "@/components/FormItem";
import FormBuilderPage from "@/presentations/screens/DashBoard/Project/FormBuilder";
import Map from "@/presentations/screens/DashBoard/Project/Stats/Map";
import Table from "@/presentations/screens/DashBoard/Project/Stats/Table";

const MainRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AuthenticatedLayout />}>
          <Route path="" element={<DashBoard />} />
          <Route path="project" element={<Project />} />
          <Route path="project/builder/:id" element={<FormBuilderPage/>} />
          <Route path="project/new" element={<CreateProject />} />
          <Route path="project/stats/table/:id" element={<Table />} />
          <Route path="project/stats/map/:id" element={<Map />} />
          <Route
            path="users"
            element={
              <RequireAuth>
                <ListUser />
              </RequireAuth>
            }
          />
          <Route
            path="adduser"
            element={
              <RequireAuth>
                <AddUser />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default MainRoutes;

function RequireAuth({ children }: any) {
  let { isAuthenticated } = useContext(AuthContext);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }
  return children;
}
