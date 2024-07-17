<<<<<<< HEAD
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomeScreen from "../presentations/screens/HomeScreen";
=======
import { Routes, Route,useLocation,Navigate } from "react-router-dom";
>>>>>>> 7a7efcc2d1389d50af9365e8aa90d95413e30665
import AuthenticatedLayout from "@/presentations/layouts/AuthenticatedLayout";
import DashBoard from "@/presentations/screens/DashBoard";
import Project from "@/presentations/screens/DashBoard/Project";
import Login from "@/presentations/screens/Login";
import { AuthContext, AuthProvider } from "../services/AuthContext";
import { useContext } from "react";
<<<<<<< HEAD
import { AddUser } from "@/presentations/screens/Users";
import CreateProject from "@/presentations/screens/DashBoard/Project/Create";
=======
import { AddUser } from "@/presentations/screens/Users/addUser";
import { ListUser } from "@/presentations/screens/Users";
>>>>>>> 7a7efcc2d1389d50af9365e8aa90d95413e30665

const MainRoutes = () => {
  return (
    <AuthProvider>
<<<<<<< HEAD
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/dashboard" element={<AuthenticatedLayout />}>
          <Route path="" element={<DashBoard />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:id" element={<CreateProject />} />
          <Route
            path="users"
            element={
              <RequireAuth>
                <AddUser />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
=======
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path = "/dashboard" element={<AuthenticatedLayout />}>
        <Route path="" element={<DashBoard />} />
        <Route path="project" element={<Project/>}/>
        <Route path="users" element={<RequireAuth><ListUser/></RequireAuth>}/>
        <Route path="adduser" element={<RequireAuth><AddUser/></RequireAuth>}/>
      </Route>
    </Routes>
>>>>>>> 7a7efcc2d1389d50af9365e8aa90d95413e30665
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
