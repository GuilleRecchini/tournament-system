import { UserRoles } from "./roles";

export const menuRoutes = [
  {
    path: "/index",
    label: "Index",
    roles: null,
  },
  {
    path: "/features",
    label: "Features",
    roles: null,
  },
  {
    path: "/playercards",
    label: "Player Cards",
    roles: Object.values(UserRoles),
  },
  {
    path: "/users/create",
    label: "Create User",
    roles: [UserRoles.ADMINISTRATOR, UserRoles.ORGANIZER],
  },
  {
    path: "/users",
    label: "Users",
    roles: [UserRoles.ADMINISTRATOR],
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
