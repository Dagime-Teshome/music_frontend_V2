import { Song } from "../features/songs/types";

export type ReturnType = {
  success: boolean;
  message: string;
  data: [];
};
export type SingleReturnType = {
  success: boolean;
  message: string;
  data: Song;
};

export interface SearchType {
  searchTerm: string;
  genre: string;
}
export type Theme = {
  background: string;
  surface: string;
  surfaceHover: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  border: string;
  shadow: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  error: string;
  errorBg: string;
  tag: string;
  tagText: string;
  modalOverlay: string;
};

export type UpdateSongAction = {
  type: string;
  id: string;
  song: Omit<Song, "id" | "createdAt" | "updated">;
};
