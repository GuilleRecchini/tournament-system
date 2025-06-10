import { UserRoles } from "../constants/roles";
import api from "./api";

export const getPlayerCards = async (playerId) => {
  const response = await api.get(`/Player/${playerId}/cards`);
  return response;
};

export const assignCardsToPlayer = async (playerId, cards) => {
  const response = await api.post(`/Player/${playerId}/cards`, cards);
  return response;
};

export const getAllPlayers = async () => {
  const response = await api.get(`/user?role=${UserRoles.PLAYER}`);
  return response;
};
