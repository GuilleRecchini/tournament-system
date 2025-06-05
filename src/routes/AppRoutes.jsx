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

      <Route element={<ProtectedRoute />}>
        <Route path="/playercards" element={<PlayerCards />} />
      </Route>

      {/* Solo Admin (0) y Organizador (1) */}
      <Route element={<ProtectedRoute allowedRoles={[0, 1]} />}>
        <Route path="/createuser" element={<CreateUser />} />
      </Route>

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
