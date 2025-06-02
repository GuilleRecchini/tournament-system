import { Route, Routes } from "react-router";
import FeaturesSection from "../views/FeaturesSection";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Index from "../views/Index";
import Login from "../views/Login";
import PlayerCards from "../views/PlayerCards";
import CreateUser from "../views/CreateUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/features" element={<FeaturesSection />} />
      <Route
        path="/playercards"
        element={
          <ProtectedRoute>
            <PlayerCards />
          </ProtectedRoute>
        }
      />
      <Route path="/createuser" element={<CreateUser />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/" element={<Index />} />
    </Routes>
  );
};

export default AppRoutes;
