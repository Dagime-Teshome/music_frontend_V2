import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, SongsState } from "./types";

const initialState: SongsState = {
  data: [],
  genres: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.data = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.data.push(action.payload);
    },
    updateSong: (state, action: PayloadAction<Song>) => {
      const index = state.data.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((song) => song.id !== action.payload);
    },
    setGenres: (state, action: PayloadAction<string[]>) => {
      state.genres = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  setGenres,
} = songsSlice.actions;
export default songsSlice.reducer;
