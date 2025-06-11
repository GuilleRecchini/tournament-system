import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Index from "../views/Index";
import Login from "../views/Login";
import PlayerCards from "../views/PlayerCards";
import CreateUser from "../views/CreateUser";
import UserManager from "../views/UserManager";
import { UserRoles } from "../constants/roles";
import Logout from "../views/Logout";
import CardAssignment from "../views/CardAssignment";
import MainDashboard from "../views/MainDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/index" element={<Index />} />

      {/* Usuario autenticado */}
      <Route element={<ProtectedRoute />}>
        <Route path="/playercards" element={<PlayerCards />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<MainDashboard />} />
      </Route>

      <Route
        element={<ProtectedRoute allowedRoles={UserRoles.ADMINISTRATOR} />}
      >
        <Route path="/admin/users" element={<UserManager />} />
        <Route path="/cards/assign" element={<CardAssignment />} />
      </Route>

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[UserRoles.ADMINISTRATOR, UserRoles.ORGANIZER]}
          />
        }
      >
        <Route path="/users/create" element={<CreateUser />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<Index />} />
    </Routes>
  );
};

export default AppRoutes;
