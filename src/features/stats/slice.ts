import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatsReturnType, StatsState } from "./types";

const initialState: StatsState = {
  data: {},
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<StatsReturnType>) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const statsActions = statsSlice.actions;
export default statsSlice.reducer;
