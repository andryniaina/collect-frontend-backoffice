import { Routes, Route } from "react-router-dom";
import HomeScreen from "../presentations/screens/HomeScreen";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
  );
};

export default MainRoutes;
