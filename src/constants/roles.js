export const UserRoles = {
  ADMINISTRATOR: 0,
  ORGANIZER: 1,
  JUDGE: 2,
  PLAYER: 3,
};

export const roleLabels = {
  [UserRoles.ADMINISTRATOR]: "Administrator",
  [UserRoles.ORGANIZER]: "Organizer",
  [UserRoles.JUDGE]: "Judge",
  [UserRoles.PLAYER]: "Player",
};

export const roleOptions = Object.values(UserRoles).map((value) => ({
  value,
  label: roleLabels[value],
}));
