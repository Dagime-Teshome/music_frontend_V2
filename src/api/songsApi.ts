import api from "./api";
import { Song } from "../features/songs/types";
import { SingleReturnType } from "../types/sharedTypes";

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await api.get("/songs");
  return response.data;
};
export const getSong = async (id: string): Promise<SingleReturnType> => {
  const response = await api.get(`/songs/${id}`);
  return response.data;
};
export const addSong = async (
  song: Omit<Song, "id" | "createdAt" | "updatedAt">
): Promise<Song> => {
  const response = await api.post("/songs", song);
  return response.data;
};

export const updateSong = async (
  song: Omit<Song, "id" | "createdAt" | "updatedAt">,
  id: string
): Promise<SingleReturnType> => {
  const response = await api.put(`/songs/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: string): Promise<void> => {
  await api.delete(`/songs/${id}`);
};
