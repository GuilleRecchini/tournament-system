import { UserRoles } from "./roles";

export const menuRoutes = [
  {
    path: "/index",
    label: "Index",
    roles: null,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    roles: Object.values(UserRoles),
  },
  {
    path: "/users/create",
    label: "Create User",
    roles: [UserRoles.ADMINISTRATOR, UserRoles.ORGANIZER],
  },
  {
    path: "/admin/users",
    label: "Manage Users",
    roles: [UserRoles.ADMINISTRATOR],
  },
  {
    path: "/cards/assign",
    label: "Card Assignment",
    roles: [UserRoles.ADMINISTRATOR],
  },
  {
    path: "/playercards",
    label: "Player Cards",
    roles: Object.values(UserRoles),
  },
];

export const settingsRoutes = [
  {
    path: "/profile",
    label: "Profile",
    roles: null,
  },
  {
    path: "/account",
    label: "Account",
    roles: null,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    roles: null,
  },
  {
    path: "/logout",
    label: "Logout",
    roles: null,
  },
];
