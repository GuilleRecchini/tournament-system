import api from "./api";

export const getPlayerCards = async (playerId) => {
  const response = await api.get(`api/Player/${playerId}/cards`);
  return response;
};
