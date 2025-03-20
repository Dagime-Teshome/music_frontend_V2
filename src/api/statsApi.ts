import api from "./api";
const baseUrl = "stats/all";

export const getAllStats = async () => {
  const response = await api.get(baseUrl);
  return response.data;
};
