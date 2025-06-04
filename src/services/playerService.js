import api from "./api";

export const getPlayerCards = async (playerId) => {
  const response = await api.get(`/Player/${playerId}/cards`);
  return response;
};
