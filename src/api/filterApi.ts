import api from "./api";
import { SearchType } from "../types/sharedTypes";
const baseUrl = "/filter";

export const filterSongs = async (searchTerms: SearchType) => {
  const response = await api.post(baseUrl, searchTerms);
  return response.data;
};
export const getGenres = async () => {
  const response = await api.get(`${baseUrl}/genres`);
  return response.data;
};
