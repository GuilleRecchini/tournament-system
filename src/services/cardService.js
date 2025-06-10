import api from "./api";

export const getAllCards = async () => {
  const response = await api.get(`/card`);
  return response;
};

export const assignCardsToPlayer = async (playerId, cards) => {
  const response = await api.post(`/Player/${playerId}/cards`, cards);
  return response;
};
